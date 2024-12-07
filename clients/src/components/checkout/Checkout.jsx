import React, { useState } from "react";
import Navbar from "../navbar/navbar";
import Footer from "../footer/Footer";
import { useLocation } from "react-router-dom";
import PopUp from "./PopUp";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalPrice } = location.state || { totalPrice: 0 };
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(totalPrice);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [popUpMessage, setPopUpMessage] = useState("");
  const [showPopUp, setShowPopUp] = useState(false);

  const handlePaystackPayment = (e) => {
    e.preventDefault();

    const paystack = window.PaystackPop.setup({
      key: "pk_test_f639b7389545a784519673053811d1ea0b7e7b2b",
      email: email,
      amount: amount * 100,
      currency: "GHS",
      ref: `${Math.floor(Math.random() * 1000000000 + 1)}`,
      first_name: firstName,
      last_name: lastName,
      onClose: function () {
        setPopUpMessage("Payment window closed.");
        setShowPopUp(true);
      },
      callback: function (response) {
        setPopUpMessage(`Payment complete! Reference: ${response.reference}`);
        setShowPopUp(true);
        navigate("/dashboard");
      },
    });

    paystack.openIframe();
  };

  const closePopUp = () => {
    setShowPopUp(false);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Checkout</h1>
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg mx-auto">
          <form onSubmit={handlePaystackPayment} id="paymentForm">
            <div className="form-group mb-6">
              <label
                className="block font-semibold mb-2"
                htmlFor="email-address"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email-address"
                className="w-full p-2 border border-gray-300 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-6">
              <label className="block font-semibold mb-2" htmlFor="amount">
                Amount
              </label>
              <input
                type="tel"
                id="amount"
                className="w-full p-2 border border-gray-300 rounded"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-6">
              <label className="block font-semibold mb-2" htmlFor="first-name">
                First Name
              </label>
              <input
                type="text"
                id="first-name"
                className="w-full p-2 border border-gray-300 rounded"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-group mb-6">
              <label className="block font-semibold mb-2" htmlFor="last-name">
                Last Name
              </label>
              <input
                type="text"
                id="last-name"
                className="w-full p-2 border border-gray-300 rounded"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 w-full"
            >
              Pay with Paystack
            </button>
          </form>
        </div>
      </div>
      {showPopUp && <PopUp message={popUpMessage} closePopUp={closePopUp} />}{" "}
      <Footer />
    </>
  );
}

export default Checkout;
