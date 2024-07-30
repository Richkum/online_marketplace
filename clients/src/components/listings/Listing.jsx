import React, { useState, useEffect, useContext } from "react";
import Navbar from "../navbar/navbar";
import Footer from "../footer/Footer";
import ProductCard from "../listings/ProductCard";
import { fetchUserProducts } from "../../apiCalls/fetchData";
import { AuthContext } from "../../contex/Authcontext";

function Listing() {
  const [products, setProducts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getUserProducts = async () => {
      if (user && user.id) {
        try {
          const products = await fetchUserProducts(user.id);
          console.log(products);
          setProducts(products);
        } catch (error) {
          console.error("Error fetching user products:", error);
        }
      }
    };

    getUserProducts();
  }, []);

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
      <Footer />
    </div>
  );
}

export default Listing;
