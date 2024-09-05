import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import Navbar from "../navbar/navbar";
import Footer from "../footer/Footer";

function Checkout() {
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const SRIPE_KEY = import.meta.env.STRIPE_PUBLISHABLE_KEY;
  const location = useLocation();
  const { totalPrice, productId } = location.state || {
    totalPrice: 0,
    productId: null,
  };
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  const handlePayment = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post(
        `${API_URL}/payment/create-payment-intent`,
        {
          product_id: productId,
          amount: totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // assuming you use token for auth
          },
        }
      );

      setClientSecret(response.data.clientSecret);
      setPaymentStatus("Payment initiated! Please complete payment.");
    } catch (error) {
      setPaymentStatus("Error initiating payment: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await handlePayment();
  };

  // Load Stripe.js
  const stripePromise = loadStripe(`${SRIPE_KEY}`);

  useEffect(() => {
    stripePromise.then((stripe) => {
      const elements = stripe.elements();
      const cardElement = elements.create("card");
      cardElement.mount("#card-element");
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Checkout</h1>
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold">
            Total Amount: ${totalPrice.toFixed(2)}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <label
                htmlFor="card-element"
                className="block text-sm font-medium text-gray-700"
              >
                Credit or debit card
              </label>
              <div className="mt-1">
                {/* Stripe.js injects the CardElement here */}
                <div id="card-element" className="StripeElement"></div>
              </div>
            </div>

            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-3 rounded-lg mt-4 hover:bg-green-600 focus:outline-none"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Pay with Stripe"}
            </button>

            {paymentStatus && <p className="mt-4">{paymentStatus}</p>}
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Checkout;
