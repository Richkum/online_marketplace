import React from "react";
import Navbar from "../navbar/navbar";
import Footer from "../footer/Footer";

function Checkout() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center md:text-left">
          Checkout
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Shipping Information Form */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Shipping Information
            </h2>
            <form className="bg-white p-8 rounded-lg shadow-md">
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-semibold mb-2"
                  htmlFor="name"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter your full name"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-semibold mb-2"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter your email address"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-semibold mb-2"
                  htmlFor="address"
                >
                  Shipping Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter your shipping address"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-semibold mb-2"
                  htmlFor="city"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter your city"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-semibold mb-2"
                  htmlFor="state"
                >
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter your state"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-semibold mb-2"
                  htmlFor="zip"
                >
                  ZIP Code
                </label>
                <input
                  type="text"
                  id="zip"
                  name="zip"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter your ZIP code"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Continue to Payment
              </button>
            </form>
          </div>
          {/* Order Summary */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="mb-4 flex justify-between items-center">
                <p className="text-gray-700">Product 1</p>
                <p className="text-gray-700">$50.00</p>
              </div>
              <div className="mb-4 flex justify-between items-center">
                <p className="text-gray-700">Product 2</p>
                <p className="text-gray-700">$30.00</p>
              </div>
              <div className="mb-4 flex justify-between items-center">
                <p className="text-gray-700">Product 3</p>
                <p className="text-gray-700">$20.00</p>
              </div>
              <div className="border-t border-gray-200 pt-4 mt-4 flex justify-between items-center">
                <p className="text-gray-700 font-semibold">Total</p>
                <p className="text-gray-700 font-semibold">$100.00</p>
              </div>
            </div>
            <button
              className="w-full bg-green-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-green-600 transition duration-200"
              onClick={() => alert("Proceed to Payment Gateway")}
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Checkout;
