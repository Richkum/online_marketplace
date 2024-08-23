import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./payment.css";

const stripePromise = loadStripe("pk_test_51PiwvH03EY8iFWqouJAo46L1UB15YMFOp94VoseVIVFVgqDHkoQijVdho1XEEAiEi8VDgoQtP6hMvdOkaQuFPS4e00tDBVqPyN");

function PaymentForm() {
  const location = useLocation();
  const { totalAmount, userId } = location.state || { totalAmount: 0, userId: null };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: totalAmount * 100 }), // amount in cents
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [totalAmount]);

  const handlePayment = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: userId,
          },
        },
      });

      if (error) {
        setError(error.message);
      } else if (paymentIntent.status === "succeeded") {
        console.log("Payment successful:", paymentIntent);
        alert("Payment processed successfully!");
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError("There was an error processing your payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-form">
      <h2 className="text-3xl font-bold mb-4">Payment Form</h2>
      {error && <p className="text-red-500">{error}</p>}
<div className="email" >
<input id="email" type="text" placeholder="Enter your Email.." /><br/>
</div>
      <form onSubmit={handlePayment}>

        <CardElement /><br/>
        <p>Total Amount: ${totalAmount.toFixed(2)}</p>

        <button
          className={`bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 focus:outline-none ${loading ? "cursor-not-allowed" : ""}`}
          type="submit"
          disabled={loading}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
}

export default function WrappedPaymentForm() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
}
