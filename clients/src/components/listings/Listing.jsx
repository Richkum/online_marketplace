import React from "react";
import Navbar from "../navbar/navbar";
import Footer from "../footer/Footer";
import ProductCard from "./ProductCard";

function Listing() {
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
