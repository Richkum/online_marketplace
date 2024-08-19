import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../navbar/navbar";
import { Link } from "react-router-dom";
import Footer from "../footer/Footer";
import {
  fetchProducts,
  fetchCategories,
  fetchSearchProducts,
} from "../../apiCalls/fetchData";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const getProducts = async () => {
      try {
        const products = await fetchProducts();
        setProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categories = await fetchCategories();
        setCategories(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    getCategories();
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchKeyDown = async (event) => {
    if (event.key === "Enter") {
      try {
        const searchResults = await fetchSearchProducts(
          searchTerm,
          selectedCategory
        );
        console.log("Search results:", searchResults);
        setProducts(searchResults);
        setCurrentPage(1);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }
  };

  const handleCategoryChange = async (event) => {
    setSelectedCategory(event.target.value);
    try {
      const filteredProducts = await fetchSearchProducts(
        searchTerm,
        event.target.value
      );
      setProducts(filteredProducts);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching category products:", error);
    }
  };

  return (
    <>
      <Navbar />
      <motion.div
        className="relative bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: "url('/images/blog-header.jpg')" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto flex items-center">
            <div className="relative flex-grow">
              <select
                className="block w-full px-4 py-2 border border-gray-300 rounded-l-md appearance-none bg-white text-gray-600 focus:outline-none focus:shadow-outline"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="w-4 h-4 fill-current text-gray-500"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            <input
              type="text"
              className="block w-full px-4 py-2 border border-l-0 border-gray-300 rounded-r-md bg-white text-gray-600 focus:outline-none focus:shadow-outline ml-[-1px]"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
            />
          </div>
        </div>
      </motion.div>
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-800 sm:text-5xl">
            Products
          </h1>
          <p className="mt-4 text-gray-600 sm:text-xl">
            Discover amazing products and deals just for you!
          </p>
          <div className="mt-8 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {currentItems.map((product) => (
              <Link to={`/products/${product.id}`} key={product.id}>
                <motion.div
                  className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={product.image_urls[0]}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="mt-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {product.name}
                    </h2>
                    <p className="mt-2 text-gray-600 font-semibold">
                      $ {product.price}
                    </p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <button
              onClick={handlePrevClick}
              disabled={currentPage === 1}
              className="px-3 py-1 mx-1 bg-blue-500 text-white font-medium text-lg rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline transition duration-300 ease-in-out disabled:bg-gray-400"
            >
              &lt;
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handleClick(index + 1)}
                className={`px-3 py-1 mx-1 bg-blue-500 text-white font-medium text-lg rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline transition duration-300 ease-in-out ${
                  currentPage === index + 1 ? "bg-blue-700" : ""
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={handleNextClick}
              disabled={currentPage === totalPages}
              className="px-3 py-1 mx-1 bg-blue-500 text-white font-medium text-lg rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline transition duration-300 ease-in-out disabled:bg-gray-400"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductsPage;