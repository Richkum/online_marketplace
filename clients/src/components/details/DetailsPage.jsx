import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../navbar/navbar";
import Footer from "../footer/Footer";

const products = [
  {
    id: 1,
    name: "iphone 15",
    price: "$1999.00",
    category: "phone",
    imageUrl: [
      "https://images.unsplash.com/photo-1695048132832-b41495f12eb4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    id: 2,
    name: "Gucci bag",
    price: "$2000.00",
    category: "bags",
    imageUrl: [
      "https://images.unsplash.com/photo-1682745230951-8a5aa9a474a0?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    id: 3,
    name: "prada shoes",
    price: "$115.00",
    category: "shoes",
    imageUrl: [
      "https://plus.unsplash.com/premium_photo-1669644856868-6613f6683346?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    id: 4,
    name: "jersy",
    price: "$40.00",
    category: "clothes",
    imageUrl: [
      "https://images.unsplash.com/photo-1718337799040-9c5e1051b67b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    id: 5,
    name: "nike boots",
    price: "$200.00",
    category: "shoes",
    imageUrl: [
      "https://images.unsplash.com/photo-1612387049695-637b743f80ad?q=80&w=1894&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    id: 6,
    name: "wigs",
    price: "$60.00",
    category: "wigs",
    imageUrl: [
      "https://images.unsplash.com/photo-1519421692594-d7a3f3e3fe5f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    id: 7,
    name: "mercedes",
    price: "$50000.00",
    category: "cars",
    imageUrl: [
      "https://images.unsplash.com/photo-1608994751987-e647252b1fd9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    id: 8,
    name: "honda",
    price: "$10000.00",
    category: "bikes",
    imageUrl: [
      "https://images.unsplash.com/photo-1610553556003-9b2ae8ef1b8e?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    id: 9,
    name: "beds",
    price: "$90.00",
    category: "furniture",
    imageUrl: [
      "https://plus.unsplash.com/premium_photo-1670076515907-2736a3492f23?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    id: 10,
    name: "bedsheets",
    price: "$10.00",
    category: "clothes",
    imageUrl: [
      "https://images.unsplash.com/photo-1486591038957-19e7c73bdc41?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    id: 11,
    name: "shirts",
    price: "$10.00",
    category: "clothes",
    imageUrl: [
      "https://images.unsplash.com/photo-1626497764746-6dc36546b388?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    id: 12,
    name: "couch",
    price: "$110.00",
    category: "furniture",
    imageUrl: [
      "https://images.unsplash.com/photo-1596900779744-2bdc4a90509a?q=80&w=1876&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    id: 13,
    name: "bycicles",
    price: "$75.00",
    category: "bikes",
    imageUrl: [
      "https://images.unsplash.com/photo-1484920274317-87885fcbc504?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1616257240427-07e5165722ca?q=80&w=2040&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1563460937-8e3fd7f161f6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1623574226937-0dad1c9a0495?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
];

function DetailsPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <h1 className="text-3xl font-bold">Product not found</h1>
        </div>
      </>
    );
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.imageUrl.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.imageUrl.length - 1 ? 0 : prevIndex + 1
    );
  };

  const similarProducts = products.filter(
    (p) => p.id !== product.id && p.category === product.category
  );

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-6">
          <div className="relative w-full lg:w-1/2">
            <img
              src={product.imageUrl[currentImageIndex]}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg shadow-md"
            />
            <button
              onClick={handlePrevImage}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-500 text-white px-2 py-1 rounded-l-lg hover:bg-gray-600"
            >
              {"<"}
            </button>
            <button
              onClick={handleNextImage}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-500 text-white px-2 py-1 rounded-r-lg hover:bg-gray-600"
            >
              {">"}
            </button>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
            <p className="mt-4 text-xl text-gray-600">{product.price}</p>
            <p className="mt-6 text-gray-700">
              This is a placeholder for the product description. Add details
              about the product here.
            </p>
            <button className="mt-6 px-6 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600">
              Add to Cart
            </button>
          </div>
        </div>
        <div className="mt-4 flex space-x-2">
          {product.imageUrl.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${product.name} ${index + 1}`}
              className={`w-16 h-16 object-cover rounded-lg cursor-pointer ${
                index === currentImageIndex ? "border-2 border-blue-500" : ""
              }`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800">Similar Products</h2>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-6">
            {similarProducts.map((similarProduct) => (
              <div
                key={similarProduct.id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
              >
                <img
                  src={similarProduct.imageUrl[0]}
                  alt={similarProduct.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="mt-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {similarProduct.name}
                  </h2>
                  <p className="mt-2 text-gray-600">{similarProduct.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default DetailsPage;
