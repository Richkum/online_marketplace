// import express from 'express';
// import Stripe from 'stripe';
// import cors from 'cors';
// import dotenv from 'dotenv';

// dotenv.config();

// const stripe = Stripe(process.env.sk_test_51PiwvH03EY8iFWqoOqrtdvbBAFVNjk1OGOyqBGKXVdFZhTNYab6uvKj6AV8bc5EDB9ZiQqKetOlOpvAZtndw1P9u00wpP1N4KL);
// const app = express();
// app.use(cors());
// app.use(express.json());

// app.post('/create-payment-intent', async (req, res) => {
//   const { amount } = req.body;

//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency: 'usd',
//     });
//     res.send({ client_secret: paymentIntent.client_secret });
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));