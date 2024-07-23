import React, { useState, useEffect } from "react";
import Navbar from "../navbar/navbar";
import { Link } from "react-router-dom";
import Footer from "../footer/Footer";
import { fetchProducts } from "../../apiCalls/fetchData";

function ProductsPage() {
  const [productss, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productss = await fetchProducts();
        setProducts(productss);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();
  }, []);

  const categories = [
    { id: 1, name: "phone" },
    { id: 2, name: "bags" },
    { id: 3, name: "shoes" },
    { id: 4, name: "wigs" },
    { id: 5, name: "cars" },
    { id: 6, name: "bikes" },
    { id: 7, name: "furniture" },
    { id: 8, name: "clothes" },
  ];

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
        ,
        "https://images.unsplash.com/photo-1616257240427-07e5165722ca?q=80&w=2040&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1563460937-8e3fd7f161f6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1623574226937-0dad1c9a0495?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      ],
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productss.slice(indexOfFirstItem, indexOfLastItem);

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

  return (
    <>
      <Navbar />
      <div
        className="relative bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: "url('/images/blog-header.jpg')" }}
      >
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto flex items-center">
            <div className="relative flex-grow">
              <select className="block w-full px-4 py-2 border border-gray-300 rounded-l-md appearance-none bg-white text-gray-600 focus:outline-none focus:shadow-outline">
                <option>All Categories</option>
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
            />
          </div>
        </div>
      </div>
      <div className=" min-h-screen">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-800 sm:text-5xl">
            Products
          </h1>
          <p className="mt-4 text-gray-600 sm:text-xl">
            Discover amazing products and deals just for you!
          </p>
          <div className="mt-8 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {currentItems.map((product) => (
              <Link to={`/products/${product.id}`}>
                {" "}
                <div
                  key={product.id}
                  className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
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
                    <p className="mt-2 text-gray-600">{product.price}</p>
                  </div>
                </div>
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
