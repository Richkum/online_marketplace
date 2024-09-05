import express from "express";
import pool from "../db.config/index.js";
import authMiddleware from "../middleware/authIndex.js";
import stripe from "stripe";

const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

router.post("/create-payment-intent", authMiddleware, async (req, res) => {
  console.log("in payment route");
  const client = await pool.connect();

  try {
    const { product_id, amount } = req.body;

    const { rows: productRows } = await client.query(
      "SELECT * FROM products WHERE id = $1",
      [product_id]
    );

    if (productRows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    const product = productRows[0];
    const receiverId = product.user_id;
    const buyerId = req.user.id;

    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount: amount * 100, // Stripe expects amount in cents
      currency: "usd",
      payment_method_types: ["card"],
    });

    await client.query(
      "INSERT INTO payments (buyer_id, receiver_id, product_id, amount, status) VALUES ($1, $2, $3, $4, $5)",
      [buyerId, receiverId, product_id, amount, "pending"]
    );

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error.message);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    client.release();
  }
});

export default router;
