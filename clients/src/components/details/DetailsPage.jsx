import React from "react";
import Navbar from "../navbar/navbar";

function DetailsPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-6">
          <img className="w-full lg:w-1/2 h-64 object-cover rounded-lg shadow-md" />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800">Item Name</h1>
            <p className="mt-4 text-xl text-gray-600">Price</p>
            <p className="mt-6 text-gray-700">Product description</p>
            <button className="mt-6 px-6 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600">
              Add to Cart
            </button>
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800">Similar Products</h2>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-6">
            <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
              <img className="w-full h-48 object-cover rounded-t-lg" />
              <div className="mt-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Product Name
                </h2>
                <p className="mt-2 text-gray-600">Price</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailsPage;
