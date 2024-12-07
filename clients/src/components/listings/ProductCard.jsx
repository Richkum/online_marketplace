import React from "react";

function ProductCard() {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mb-4">
      <div className="flex">
        <img alt="" src="/images/blog-header.jpg" className="w-1/2" />
        <div className="w-1/2 p-4">
          <h2 className="text-xl font-bold mb-2">Item Name</h2>
          <p className="text-gray-700 text-base mb-2 font-semibold">Price</p>
          <p className="text-gray-700 text-base mb-2">Description</p>
          <p className="text-gray-700 text-base mb-2">Uploaded: Date</p>
          <p className="text-gray-700 text-base mb-2">Last Updated: Date</p>
          <p className="text-gray-700 text-base mb-2">Reviews: Revies[array]</p>
          <p className="text-gray-700 text-base mb-2">
            Status: sold/stillavailable
          </p>
          <div className="flex justify-end">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
