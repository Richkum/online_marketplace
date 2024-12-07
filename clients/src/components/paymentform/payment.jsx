import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./payment.css";

function PaymentForm() {
  const location = useLocation();
  const { totalAmount, userId } = location.state || { totalAmount: 0, userId: null };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulating a payment process
      const response = await simulatePaymentProcessing(userId, totalAmount);
      console.log("Payment successful:", response);
      alert("Payment processed successfully!");
    } catch (err) {
      console.error("Payment error:", err);
      setError("There was an error processing your payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // This is a mock function to represent payment processing
  const simulatePaymentProcessing = (userId, amount) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate a 90% success rate
        if (Math.random() > 0.1) {
          resolve({ userId, amount });
        } else {
          reject(new Error("Payment failed"));
        }
      }, 1000); // Simulate a delay
    });
  };

  return (
    <div className="payment-form">
      <h2 className="text-3xl font-bold mb-4">Payment Form</h2>
      <p>Total Amount: ${totalAmount.toFixed(2)}</p>
      {error && <p className="text-red-500">{error}</p>}
      <button
        className={`bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 focus:outline-none ${loading ? "cursor-not-allowed" : ""}`}
        onClick={handlePayment}
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}

export default PaymentForm;






// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import "./payment.css";

// function PaymentForm() {
//   const location = useLocation();
//   const { totalAmount, userId } = location.state || { totalAmount: 0, userId: null };
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const stripe = useStripe();
//   const elements = useElements();

//   const handlePayment = async (event) => {
//     event.preventDefault(); // Prevent the default form submission
//     setLoading(true);
//     setError(null);

//     // Ensure Stripe and Elements are loaded
//     if (!stripe || !elements) {
//       return;
//     }

//     const cardElement = elements.getElement(CardElement);

//     try {
//       const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment('{CLIENT_SECRET}', {
//         payment_method: {
//           card: cardElement,
//         },
//       });

//       if (stripeError) {
//         setError(stripeError.message);
//       } else {
//         console.log("Payment successful:", paymentIntent);
//         alert("Payment processed successfully!");
//       }
//     } catch (err) {
//       console.error("Payment error:", err);
//       setError("There was an error processing your payment. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="payment-form">
//       <h2 className="text-3xl font-bold mb-4">Payment Form</h2>
//       <p>Total Amount: ${totalAmount.toFixed(2)}</p>
//       {error && <p className="text-red-500">{error}</p>}
//       <form onSubmit={handlePayment}>
//         <CardElement className="card-element" />
//         <button
//           className={`bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 focus:outline-none ${loading ? "cursor-not-allowed" : ""}`}
//           type="submit"
//           disabled={!stripe || loading}
//         >
//           {loading ? "Processing..." : "Pay Now"}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default PaymentForm;