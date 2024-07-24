import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../navbar/navbar";
import Footer from "../footer/Footer";
import { fetchProducts } from "../../apiCalls/fetchData";
import { Link } from "react-router-dom";

function DetailsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then((data) => setProducts(data));
  }, []);

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
      prevIndex === 0 ? product.image_urls.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.image_urls.length - 1 ? 0 : prevIndex + 1
    );
  };

  const similarProducts = products.filter(
    (p) => p.id !== product.id && p.category_id === product.category_id
  );

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-6">
          <div className="relative w-full lg:w-1/2">
            <img
              src={product.image_urls[currentImageIndex]}
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
            <p className="mt-4 text-xl text-gray-600 font-semibold">
              $ {product.price}
            </p>
            <p className="mt-6 text-gray-700">{product.description}</p>
            <button className="mt-6 px-6 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600">
              Add to Cart
            </button>
          </div>
        </div>
        <div className="mt-4 flex space-x-2">
          {product.image_urls.map((image, index) => (
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
          <h1 className="text-2xl font-bold text-gray-800">Similar Products</h1>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-6">
            <Link to={`/products/${products.id}`}>
              {" "}
              {similarProducts.map((similarProduct) => (
                <div
                  key={similarProduct.id}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
                >
                  <img
                    src={similarProduct.image_urls[0]}
                    alt={similarProduct.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="mt-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {similarProduct.name}
                    </h2>
                    <p className="mt-2 text-gray-600 font-semibold">
                      $ {similarProduct.price}
                    </p>
                  </div>
                </div>
              ))}
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default DetailsPage;
