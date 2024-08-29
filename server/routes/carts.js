import express from "express";
import pool from "../db.config/index.js";
import authMiddleware from "../middleware/authIndex.js";

const router = express.Router();

router.post("/add-to-cart", async (req, res) => {
  const client = await pool.connect();
  const { user_id, product_id, quantity } = req.body;
  console.log(
    "user_id:",
    user_id,
    "product_id:",
    product_id,
    "quantity:",
    quantity
  );

  try {
    const { rows: existingCartItems } = await client.query(
      "SELECT * FROM cart WHERE user_id = $1 AND product_id = $2",
      [user_id, product_id]
    );

    if (existingCartItems.length > 0) {
      const updatedQuantity = existingCartItems[0].quantity + quantity;
      await client.query(
        "UPDATE cart SET quantity = $1, updated_at = CURRENT_TIMESTAMP WHERE user_id = $2 AND product_id = $3",
        [updatedQuantity, user_id, product_id]
      );
      res.status(200).json({ message: "Cart updated successfully" });
    } else {
      await client.query(
        "INSERT INTO cart (user_id, product_id, quantity, created_at, updated_at) VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)",
        [user_id, product_id, quantity]
      );
      res.status(201).json({ message: "Product added to cart successfully" });
    }
  } catch (err) {
    console.error("Error adding product to cart:", err.stack);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  } finally {
    client.release();
  }
});

router.get("/user-cart/:user_id", authMiddleware, async (req, res) => {
  const client = await pool.connect();
  const { user_id } = req.params;

  try {
    const { rows } = await client.query(
      `SELECT 
         c.id as cart_id, 
         c.user_id, 
         c.product_id, 
         c.quantity, 
         c.created_at, 
         c.updated_at, 
         p.name as product_name, 
         p.image_urls as product_image, 
         p.price as product_price 
       FROM cart c 
       JOIN products p ON c.product_id = p.id 
       WHERE c.user_id = $1`,
      [user_id]
    );
    res.send(rows);
  } catch (err) {
    console.error("Error fetching cart:", err.stack);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  } finally {
    client.release();
  }
});

router.delete("/remove-from-cart", authMiddleware, async (req, res) => {
  const client = await pool.connect();
  const { user_id, product_id } = req.body;

  try {
    const { rows } = await client.query(
      "SELECT quantity FROM cart WHERE user_id = $1 AND product_id = $2",
      [user_id, product_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    const currentQuantity = rows[0].quantity;

    if (currentQuantity > 1) {
      await client.query(
        "UPDATE cart SET quantity = quantity - 1, updated_at = CURRENT_TIMESTAMP WHERE user_id = $1 AND product_id = $2",
        [user_id, product_id]
      );
      res
        .status(200)
        .json({ message: "Product quantity decremented successfully" });
    } else {
      await client.query(
        "DELETE FROM cart WHERE user_id = $1 AND product_id = $2",
        [user_id, product_id]
      );
      res
        .status(200)
        .json({ message: "Product removed from cart successfully" });
    }
  } catch (err) {
    console.error("Error removing product from cart:", err.stack);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  } finally {
    client.release();
  }
});

export default router;
