import express from "express";
import pool from "../db.config/index.js";
import { reviewSchema } from "../vallidation/index.js";
import authMiddleware from "../middleware/authIndex.js";
import getUserProducts from "./utils.js";

const router = express.Router();

router.post("/add-review", authMiddleware, async (req, res) => {
  const client = await pool.connect();

  try {
    const { product_id, review, rating } = req.body;
    const user_id = req.user.id;

    const { error, value } = reviewSchema.validate({
      product_id,
      review,
      rating,
    });

    if (error) {
      return res
        .status(400)
        .json({ message: "Invalid review data", details: error.details });
    }

    const result = await client.query(
      `INSERT INTO reviews (user_id, product_id, rating, comment) VALUES (\$1, \$2, \$3, \$4) RETURNING id`,
      [user_id, product_id, rating, review]
    );
    res.status(201).json({ reviewId: result.rows[0].id });
  } catch (err) {
    console.error("Error adding review:", err.stack);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    client.release();
  }
});

router.get("/all-reviews", async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM reviews");
    res.send(result.rows);
  } catch (error) {
    console.error("Error fetching reviews:", error.stack);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    client.release();
  }
});

router.get("/review/:product_id", async (req, res) => {
  const client = await pool.connect();
  try {
    const product_id = req.params.product_id;

    const result = await client.query(
      `SELECT r.*, u.username FROM reviews r JOIN users u ON r.user_id = u.id WHERE r.product_id = \$1`,
      [product_id]
    );
    res.send(result.rows);
  } catch (err) {
    console.error("Error fetching reviews:", err.stack);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    client.release();
  }
});

router.get("/user-product-reviews/:id", authMiddleware, async (req, res) => {
  try {
    const id = req.params.id;
    const productIds = await getUserProducts(id);

    if (productIds.length === 0) {
      return res.json([]);
    }

    const { rows } = await pool.query(
      "SELECT r.*, p.name AS product_name, u.username AS reviewer_username FROM reviews r JOIN products p ON r.product_id = p.id JOIN users u ON r.user_id = u.id WHERE r.product_id = ANY($1::int[])",
      [productIds]
    );
    console.log(rows);
    res.send(rows);
  } catch (error) {
    console.error("Error fetching user's product reviews:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
