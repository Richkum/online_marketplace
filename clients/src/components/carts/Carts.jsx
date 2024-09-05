import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/navbar";
import Footer from "../footer/Footer";
import { usersAddedToCart } from "../../apiCalls/fetchData";
import { AuthContext } from "../../contex/Authcontext";
import axios from "axios";

function Carts() {
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const { user } = useContext(AuthContext);
  console.log("User from AuthContext:", user);

  if (!user || !user.id) {
    console.error("User ID is not defined, unable to fetch cart.");
  }

  const [carts, setCarts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarts = async () => {
      if (user && user.id) {
        try {
          const carts = await usersAddedToCart(user.id);
          console.log("Fetched carts:", carts);
          setCarts(carts);
        } catch (error) {
          console.error("Error fetching carts:", error.response?.data || error);
          setMessage({
            type: "error",
            message:
              error.response?.data?.message || "Failed to fetch cart items",
          });
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchCarts();
  }, [user?.id]);

  const handleRemoveFromCart = async (productId) => {
    setMessage(null);

    try {
      const response = await axios.delete(`${API_URL}/carts/remove-from-cart`, {
        data: {
          user_id: parseInt(user.id, 10),
          product_id: productId,
        },
      });
      setCarts((prevCarts) =>
        prevCarts.filter((cart) => cart.product_id !== productId)
      );

      setMessage({
        type: "success",
        message:
          response.data.message || "Product removed from cart successfully",
      });

      console.log("Product removed:", response.data);
    } catch (error) {
      console.error(
        "Error removing product from cart:",
        error.response?.data || error
      );
      setMessage({
        type: "error",
        message:
          error.response?.data?.message || "Failed to remove product from cart",
      });
    }
  };

  const calculateTotalPrice = () => {
    return carts.reduce(
      (total, cart) => total + cart.product_price * cart.quantity,
      0
    );
  };

  const handleCheckout = () => {
    const totalPrice = calculateTotalPrice();
    navigate("/checkout", { state: { totalPrice } });
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <h1 className="text-3xl font-bold">Loading... ⏳</h1>
        </div>
        <Footer />
      </>
    );
  }

  if (carts.length === 0) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center md:text-left">
            Your cart is empty 😕
          </h1>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 text-center">
        {message && (
          <div
            className={`fixed left-0 top-1/4 p-4 rounded-md transition-all duration-1000 ${
              message.type === "success" ? "bg-green-100" : "bg-red-100"
            }`}
            style={{ zIndex: 1000, animation: "slideInOut 3s forwards" }}
          >
            <h3 className="font-bold">
              {message.type === "success" ? "Success!" : "Error:"}
            </h3>
            <p>{message.message}</p>
          </div>
        )}
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center md:text-left">
          Your 🛒
        </h1>
        <div className="mt-8 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {carts.map((cart) => (
            <div
              key={cart.product_id}
              className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
            >
              <img
                src={cart.product_image[0]}
                alt={cart.product_name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-black font-bold">{cart.product_name}</p>
                <p className="text-gray-600">
                  Quantity: <strong>{cart.quantity}</strong>
                </p>
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-gray-600 font-semibold">
                  $ {cart.product_price}
                </p>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none"
                  onClick={() => {
                    handleRemoveFromCart(cart.product_id);
                    window.location.reload();
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-400">
            Total:{" "}
            <strong className="text-black">
              ${calculateTotalPrice().toFixed(2)}
            </strong>
          </h2>
          <button
            className="bg-green-500 text-white px-6 py-3 rounded-lg mt-4 hover:bg-green-600 focus:outline-none"
            onClick={handleCheckout}
          >
            Pay
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Carts;
