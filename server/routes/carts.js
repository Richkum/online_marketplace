import express from "express";
import pool from "../db.config/index.js";
import authMiddleware from "../middleware/authIndex.js";

const router = express.Router();

router.post("/add-to-cart", async (req, res) => {
  console.log("Received request to add product to cart.");
  const client = await pool.connect();
  const { user_id, product_id, quantity } = req.body;

  console.log("Checking if data types are correct...");
  if (
    typeof user_id !== "number" ||
    typeof product_id !== "number" ||
    typeof quantity !== "number"
  ) {
    console.error("Invalid data types received:", {
      user_id,
      product_id,
      quantity,
    });
    client.release();
    return res.status(400).json({ message: "Invalid input data" });
  }

  console.log("Data types are valid:", { user_id, product_id, quantity });

  try {
    const { rows: existingCartItems } = await client.query(
      "SELECT * FROM cart WHERE user_id = $1 AND product_id = $2",
      [user_id, product_id]
    );

    if (!existingCartItems) {
      throw new Error("Error querying the cart");
    }

    if (existingCartItems.length > 0) {
      const updatedQuantity = existingCartItems[0].quantity + quantity;
      const updateResult = await client.query(
        "UPDATE cart SET quantity = $1, updated_at = CURRENT_TIMESTAMP WHERE user_id = $2 AND product_id = $3",
        [updatedQuantity, user_id, product_id]
      );

      if (updateResult.rowCount === 0) {
        throw new Error("Failed to update cart");
      }

      console.log("Cart updated successfully");
      res.status(200).json({ message: "Cart updated successfully" });
    } else {
      const insertResult = await client.query(
        "INSERT INTO cart (user_id, product_id, quantity, created_at, updated_at) VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)",
        [user_id, product_id, quantity]
      );

      if (insertResult.rowCount === 0) {
        throw new Error("Failed to add to cart");
      }

      console.log("Product added to cart successfully");
      res.status(201).json({ message: "Product added to cart successfully" });
    }
  } catch (err) {
    console.error("Error adding product to cart:", err.stack);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  } finally {
    console.log("Releasing client.");
    client.release();
  }
});

router.get("/user-cart/:user_id", authMiddleware, async (req, res) => {
  console.log("in user cart route");
  const client = await pool.connect();
  const userId = req.userId;
  console.log("userId from middleware:", userId);

  const user_id = isNaN(userId) ? null : parseInt(userId, 10);
  console.log("user_id:", user_id);

  if (!user_id) {
    console.error("Invalid user ID provided.");
    return res.status(400).json({ message: "Invalid user ID" });
  }

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
       WHERE c.user_id = \$1`,
      [user_id]
    );
    console.log("cart rows:");
    res.send(rows);
    console.log("cart sent successfully");
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
  console.log("in remove from cart route");
  const client = await pool.connect();
  const { user_id, product_id } = req.body;

  console.log("user_id:", user_id, "product_id:", product_id);

  try {
    if (!user_id || !product_id) {
      console.log("Invalid input data");
      return res.status(400).json({ message: "Invalid input data" });
    }

    const { rows } = await client.query(
      "SELECT quantity FROM cart WHERE user_id = $1 AND product_id = $2",
      [user_id, product_id]
    );
    console.log("user Id is:", user_id, "product id is:", product_id);
    // console.log("selecting quantity from cart:");

    if (rows.length === 0) {
      console.log("Item not found in cart");
      return res.status(404).json({ message: "Item not found in cart" });
    }

    const currentQuantity = rows[0].quantity;
    console.log("currentQuantity:", currentQuantity);

    if (currentQuantity > 1) {
      console.log("decrementing quantity");
      await client.query(
        "UPDATE cart SET quantity = quantity - 1, updated_at = CURRENT_TIMESTAMP WHERE user_id = $1 AND product_id = $2",
        [user_id, product_id]
      );
      console.log("quantity decremented successfully");
      res
        .status(200)
        .json({ message: "Product quantity decremented successfully" });
    } else {
      console.log("deleting product from cart");
      await client.query(
        "DELETE FROM cart WHERE user_id = $1 AND product_id = $2",
        [user_id, product_id]
      );
      console.log("product deleted from cart successfully");
      res
        .status(200)
        .json({ message: "Product removed from cart successfully" });
    }
  } catch (err) {
    console.log("Error removing product from cart:", err);
    console.error("Error removing product from cart:", err.stack);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  } finally {
    console.log("client released");
    client.release();
  }
});

export default router;
