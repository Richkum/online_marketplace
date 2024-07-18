import React from "react";
import Navbar from "../navbar/navbar";
import { Link } from "react-router-dom";

function ProductsPage() {
  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-gradient min-h-screen">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-800 sm:text-5xl">
            Products
          </h1>
          <p className="mt-4 text-gray-600 sm:text-xl">
            Discover our amazing products
          </p>
          <div className="mt-8 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <Link to={"/details"}>
              {" "}
              <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
                <img className="w-full h-48 object-cover rounded-t-lg" />
                <div className="mt-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Product Name
                  </h2>
                  <p className="mt-2 text-black-600">Price</p>
                </div>
              </div>
            </Link>
            <div className="mt-8 flex justify-center">
              <button className="px-3 py-1 mx-1 bg-blue-500 text-white font-medium text-lg rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline transition duration-300 ease-in-out">
                {" "}
              </button>
              <button className="px-3 py-1 mx-1 bg-blue-500 text-white font-medium text-lg rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline transition duration-300 ease-in-out "></button>
              <button className="px-3 py-1 mx-1 bg-blue-500 text-white font-medium text-lg rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline transition duration-300 ease-in-out disabled:bg-gray-400"></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductsPage;
