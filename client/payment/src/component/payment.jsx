import React, { useState } from 'react';
import axios from 'axios';

const PaymentForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [isPaymentCompleted, setIsPaymentCompleted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!name || !email || !amount || !phone) {
      alert('Please fill in all the required fields.');
      return;
    }

    try {
      const response = await axios.post('/api/orange-money-payment', {
        name,
        email,
        amount,
        phone: `${countryCode}${phone}`,
      });

      window.location.href = response.data.paymentUrl;
      setIsPaymentCompleted(true); // Set payment completion flag
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('An error occurred while processing the payment. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container">
      <h1>Payment Form</h1>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="amount">Amount:</label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="phone">Phone:</label>
        
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="orange-money-pay">
        Pay with Orange Money
        <i className="icon-orange-money"></i>
        {isPaymentCompleted }
      </button>
    </form>
  );
};

export default PaymentForm;