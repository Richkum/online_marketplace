import React from "react";

function ProductCard({ product, onEdit }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6 transform transition duration-300 hover:scale-105">
      <div className="flex flex-col md:flex-row">
        <img
          alt={product.name}
          src={product.image_urls[0]}
          className="w-full md:w-1/2 object-cover h-64 md:h-auto"
        />
        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {product.name}
          </h2>
          <p className="text-lg text-gray-700 mb-2 font-semibold">
            ${product.price}
          </p>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="text-sm text-gray-500 mb-4">
            <p>Uploaded: {new Date(product.createdAt).toLocaleDateString()}</p>
            <p>
              Last Updated: {new Date(product.updatedAt).toLocaleDateString()}
            </p>
            <p>Status: {product.isSold ? "Sold" : "Available"}</p>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => onEdit(product.id)}
              className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg shadow"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
