import React, { useState, useEffect } from "react";
import Navbar from "../navbar/navbar";
import Footer from "../footer/Footer";
import ProductCard from "./ProductCard";
import { fetchUserProducts } from "../../apiCalls/fetchData";

function Listing() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getUserProducts = async () => {
      try {
        const userId = localStorage.getItem("user_id");
        const products = await fetchUserProducts(userId);
        console.log(products);
        setProducts(products);
      } catch (error) {
        console.error("Error fetching user products:", error);
      }
    };

    getUserProducts();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">
          Here are your listed products
        </h1>
        <div className="grid grid-cols-2 gap-4">
          <ProductCard />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Listing;
