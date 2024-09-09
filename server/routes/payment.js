import express from "express";
import pool from "../db.config/index.js";
import authMiddleware from "../middleware/authIndex.js";
import stripe from "stripe";

const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

// router.post("/create-payment-intent", authMiddleware, async (req, res) => {
//   const client = await pool.connect();

//   try {
//     console.log("In payment route");

//     const { product_id, amount } = req.body;

//     // Validate required fields
//     if (!product_id || !amount) {
//       return res
//         .status(400)
//         .json({ message: "Product ID and amount are required" });
//     }

//     // Check if product exists
//     const { rows: productRows } = await client.query(
//       "SELECT * FROM products WHERE id = $1",
//       [product_id]
//     );

//     if (productRows.length === 0) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     const product = productRows[0];
//     const receiverId = product.user_id;
//     const buyerId = req.user.id;

//     // Create payment intent with Stripe
//     const paymentIntent = await stripeInstance.paymentIntents.create({
//       amount: amount * 100, // Convert to cents
//       currency: "usd",
//       payment_method_types: ["card"],
//     });

//     // Insert the payment record into the database
//     await client.query(
//       "INSERT INTO payments (buyer_id, receiver_id, product_id, amount, status) VALUES ($1, $2, $3, $4, $5)",
//       [buyerId, receiverId, product_id, amount, "pending"]
//     );

//     // Respond with the client secret for the payment intent
//     res.send({ clientSecret: paymentIntent.client_secret });
//   } catch (error) {
//     console.error("Error creating payment intent:", error.message, error.stack);

//     if (error.type === "StripeCardError") {
//       // Handle Stripe-specific errors
//       res.status(400).json({ message: "Payment failed: " + error.message });
//     } else {
//       // Internal server error
//       res.status(500).json({ message: "Internal server error" });
//     }
//   } finally {
//     client.release();
//   }
// });

router.post("/create-payment-intent", authMiddleware, async (req, res) => {
  try {
    const { amount } = req.body;

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe expects amount in cents
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
