import React, { useState, useEffect, useContext } from "react";
import Navbar from "../navbar/navbar";
import Footer from "../footer/Footer";
import AddItemModal from "../item/AddItem";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contex/Authcontext";

function Dashboard() {
  const { logout } = useContext(AuthContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">MY DASHBOARD</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-bold mb-4">Total Products</h2>
            <p className="text-3xl font-bold text-blue-500">50</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-bold mb-4">Total Sales</h2>
            <p className="text-3xl font-bold text-green-500">$10,000</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-bold mb-4">Total Reviews</h2>
            <p className="text-3xl font-bold text-yellow-500">150</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/purchases"
              className="bg-blue-500 text-white p-4 rounded-md text-center font-semibold hover:bg-blue-700"
            >
              My Purchases
            </Link>
            <Link
              to="/listings"
              className="bg-green-500 text-white p-4 rounded-md text-center font-semibold hover:bg-green-700"
            >
              My Listings
            </Link>
            <Link
              to="/reviews"
              className="bg-yellow-500 text-white p-4 rounded-md text-center font-semibold hover:bg-yellow-700"
            >
              My Reviews
            </Link>
            <button
              onClick={openModal}
              className="bg-red-500 text-white p-4 rounded-md text-center font-semibold hover:bg-red-700"
            >
              Add Product
            </button>
          </div>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
          <p className="text-gray-700 text-lg">
            Welcome to your personalized dashboard. Here you can manage your
            products, track your sales, and read customer reviews. Use the quick
            links above to navigate through your account.
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-6 rounded-lg shadow-md text-white text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">Special Announcement</h2>
          <p className="text-lg">
            Don't miss out on our upcoming sale! Get ready to enjoy great
            discounts and offers on your favorite products.
          </p>
        </div>
      </div>
      <div className="container mx-auto p-4 flex justify-center">
        <Link to={"/"}>
          <button
            onClick={logout}
            className="w-full max-w-sm bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
          >
            <svg
              className="w-6 h-6 inline-block mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              ></path>
            </svg>
            Logout
          </button>
        </Link>
      </div>
      <AddItemModal isOpen={isModalOpen} onClose={closeModal} />
      <Footer />
    </>
  );
}

export default Dashboard;
