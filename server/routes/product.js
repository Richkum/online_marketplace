import express from "express";
import pool from "../db.config/index.js";
import { priceschema } from "../vallidation/index.js";
import uploadImageToCloudinary from "../middleware/multer.js";
import authMiddleware from "../middleware/authIndex.js";
import getUserProducts from "./utils.js";

const router = express.Router();

router.post("/add-product", authMiddleware, async (req, res) => {
  const client = await pool.connect();

  try {
    const { name, description, price, category } = req.body;
    // console.log(name, description, price, category);
    const userId = req.user.id;
    // console.log(userId);
    
    const images = req.files.images;

    if (!images) {
      return res.status(400).json({ message: "No images provided" });
    }
    

    if (!priceschema.validate(price)) {
      return res.status(400).json({ message: "Invalid price format" });
    }

    const imageFiles = Array.isArray(images) ? images : [images];
    const imageUrls = await Promise.all(
      imageFiles.map((file) => uploadImageToCloudinary(file))
    );

    await client.query("BEGIN");

    const insertProductQuery =
      "INSERT INTO products(name, price, category_id, description, user_id, image_urls) VALUES($1, $2, $3, $4, $5, $6) RETURNING id";
    const result = await client.query(insertProductQuery, [
      name,
      price,
      category,
      description,
      userId,
      imageUrls,
    ]);

    const { id: productId } = result.rows[0];
    await client.query("COMMIT");

    res.status(201).json({ productId });
    console.log("Product added successfully");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error adding product", err.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  } finally {
    client.release();
  }
});

router.get("/all-products", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM products");
    res.send(rows);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

router.get("/user-products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const productIds = await getUserProducts(id);
    const { rows } = await pool.query(
      "SELECT p.*, c.name FROM products p JOIN categories c ON p.category_id = c.id WHERE p.id = ANY($1::int[])",
      [productIds]
    );
    res.send(rows);
  } catch (err) {
    console.error("Error fetching user products:", err.stack);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

router.get("/search-products", async (req, res) => {
  const client = await pool.connect();

  try {
    const keyword = req.query.keyword || "";

    const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const result = await client.query(
      `SELECT * FROM products WHERE name ILIKE $1`,
      [`%${escapedKeyword}%`]
    );

    res.send(result.rows);
  } catch (error) {
    console.error("Error Searching products:", error.stack);
    return res.status(500).json({ message: "Internal server error" });
  } finally {
    client.release();
  }
});

export default router;
