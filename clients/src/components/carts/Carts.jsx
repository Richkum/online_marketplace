import React, { useState, useEffect, useContext } from "react";
import Navbar from "../navbar/navbar";
import Footer from "../footer/Footer";
import { usersAddedToCart } from "../../apiCalls/fetchData";
import { AuthContext } from "../../contex/Authcontext";
import axios from "axios";

function Carts() {
  const { user } = useContext(AuthContext);
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    const fetchCarts = async () => {
      if (user && user.id) {
        try {
          const carts = await usersAddedToCart(user.id);
          console.log(carts);
          setCarts(carts);
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
        <div className="mt-8 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {carts.map((cart) => (
            <div className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
              <img
                src={cart.product_image[0]}
                alt={cart.product_name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-black font-bold">$ {cart.product_name}</p>
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
                  onClick={() => handleRemoveFromCart(cart.product_id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Carts;
