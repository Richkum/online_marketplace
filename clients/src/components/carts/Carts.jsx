import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Navbar from "../navbar/navbar";
import Footer from "../footer/Footer";
import { usersAddedToCart } from "../../apiCalls/fetchData";
import { AuthContext } from "../../contex/Authcontext";
import axios from "axios";

function Carts() {
  const { user } = useContext(AuthContext);
  const [carts, setCarts] = useState([]);
  const [error, setError] = useState(null); // Added for error handling
  const [success, setSuccess] = useState(null); // Added for success message
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchCarts = async () => {
      if (user && user.id) {
        try {
          const cartData = await usersAddedToCart(user.id);
          setCarts(cartData);
        } catch (error) {
          console.error("Error fetching carts:", error);
        }
      }
    };
    fetchCarts();
  }, [user]);

  const handleRemoveFromCart = async (productId) => {
    try {
      const response = await axios.delete(
        "http://localhost:3000/carts/remove-from-cart",
        {
          data: {
            user_id: user.id,
            product_id: productId,
          },
        }
      );
      alert(response.data.message);
      window.location.reload();
    } catch (error) {
      console.error("Error removing product from cart:", error);
      alert("There was an error removing the product from the cart.");
    }
  };

  const handleIncrement = (productId) => {
    setCarts((prevCarts) =>
      prevCarts.map((cart) =>
        cart.product_id === productId
          ? { ...cart, quantity: cart.quantity + 1 }
          : cart
      )
    );
  };

  const handleDecrement = (productId) => {
    setCarts((prevCarts) =>
      prevCarts.map((cart) =>
        cart.product_id === productId && cart.quantity > 1
          ? { ...cart, quantity: cart.quantity - 1 }
          : cart
      )
    );
  };

  const handleCheckout = () => {
    const totalAmount = carts.reduce((total, cart) => total + cart.product_price * cart.quantity, 0);
    navigate('/payment', { state: { totalAmount, userId: user.id } });
  };

  if (carts.length === 0) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center md:text-left">
            You don't have any carts
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
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center md:text-left">
          Here are your carts
        </h1>
        {error && <p className="text-red-500">{error}</p>} {/* Display error */}
        {success && <p className="text-green-500">{success}</p>} {/* Display success */}
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
                <p className="text-black font-bold">$ {cart.product_name}</p>
                <div className="flex items-center">
                  <button
                    className="bg-gray-300 text-black px-2 py-1 rounded"
                    onClick={() => handleDecrement(cart.product_id)}
                  >
                    -
                  </button>
                  <p className="mx-2">{cart.quantity}</p>
                  <button
                    className="bg-gray-300 text-black px-2 py-1 rounded"
                    onClick={() => handleIncrement(cart.product_id)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-gray-600 font-semibold">
                  $ {cart.product_price}
                </p>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none"
                  onClick={() => handleRemoveFromCart(cart.product_id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 focus:outline-none"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Carts;