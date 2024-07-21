import express from "express";
import pool from "../db.config/index.js";
import getCategoryIdByName from "../middleware/index.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/add-product", upload.array("images", 10), async (req, res) => {
  const client = await pool.connect();

  try {
    const { name, description, price, category } = req.body;
    const imageUrls = req.files.map((file) => file.path);

    const categoryId = await getCategoryIdByName(category);

    await client.query("BEGIN");

    const insertProductQuery =
      "INSERT INTO products(name, price, category_id, description, imageurls) VALUES($1, $2, $3, $4, $5) RETURNING id";
    const result = await client.query(insertProductQuery, [
      name,
      price,
      categoryId,
      description,
      imageUrls,
    ]);

    const { id: productId } = result.rows[0];
    await client.query("COMMIT");

    res.status(201).json({ productId });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error adding product", err.stack);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    client.release();
  }
});

export default router;
