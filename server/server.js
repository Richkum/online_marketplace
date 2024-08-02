// server.js
import axios from 'axios';
import  express from "express";


const app = express();
const port = 3000;

app.use(express.json());

app.post('/api/orange-money-payment', async (req, res) => {
  const { name, email, amount, phone } = req.body;

  try {
    // Step 1: Authenticate with Orange Money API
    const authResponse = await axios.post('/auth', {
      username: 'davykennang552@gmail.com',
      password: 'n9W5CYtGD@r7Fwy',
    });

    const accessToken = authResponse.data.access_token;

    // Step 2: Create the payment request
    const paymentRequest = {
      amount,
      currency: 'XOF', // Assuming the payment is in Africa CFA Franc
      customer: {
        fullName: name,
        email,
        phone,
      },
      // Add any other required payment details
    };

    const paymentResponse = await axios.post('/payments', paymentRequest, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Step 3: Handle the payment response
    if (paymentResponse.data.status === 'success') {
      res.json({ paymentUrl: paymentResponse.data.paymentUrl });
    } else {
      res.status(400).json({ error: paymentResponse.data.message });
    }
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ error: 'An error occurred while processing the payment.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});