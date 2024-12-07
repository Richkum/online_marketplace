import React, { useState, useEffect, useContext } from "react";
import Navbar from "../navbar/navbar";
import Footer from "../footer/Footer";
import ProductCard from "../listings/ProductCard";
import { fetchUserProducts } from "../../apiCalls/fetchData";
import { AuthContext } from "../../contex/Authcontext";

function Listing() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getUserProducts = async () => {
      if (user && user.id) {
        try {
          const products = await fetchUserProducts(user.id);
          console.log(products);
          setProducts(products);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching user products:", error);
        }
      }
    };

    getUserProducts();
  }, []);

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

  if (products.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <h1 className="text-3xl font-bold">
            You don't have any listed products
          </h1>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center md:text-left">
          Here are your listed products
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-6 rounded-lg shadow-md text-white text-center mb-8">
        <h2 className="text-2xl font-bold mb-4">Special Announcement</h2>
        <p className="text-lg">
          Don't miss out on our upcoming sale! Get ready to enjoy great
          discounts and offers on your favorite products.
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default Listing;
