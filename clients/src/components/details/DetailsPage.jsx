import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Navbar from "../navbar/navbar";
import Footer from "../footer/Footer";
import { fetchProducts } from "../../apiCalls/fetchData";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../contex/Authcontext";

function DetailsPage() {
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const { user } = useContext(AuthContext);
  console.log("user:", user);
  const quantitty = 1;

  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const products = await fetchProducts();
        setProducts(products);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getProducts();
  }, []);

  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  useEffect(() => {
    if (product) {
      fetchReviews(product.id);
    }
  }, [product]);

  const fetchReviews = async (productId) => {
    try {
      const response = await axios.get(
        `${API_URL}/reviews/review/${productId}`
      );
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleAddToCart = async () => {
    setMessage(null);
    console.log("Starting to add product to cart...");
    console.log("User ID:", user.id);
    console.log("Product ID:", product.id);
    console.log("Quantity:", quantitty);

    try {
      const response = await axios.post(`${API_URL}/carts/add-to-cart`, {
        user_id: parseInt(user.id, 10),
        product_id: product.id,
        quantity: quantitty,
      });

      console.log("Response from server:", response.data);
      setMessage({ type: "success", message: response.data.message });
    } catch (error) {
      console.error("Error adding product to cart:", error);
      setMessage({
        type: "error",
        message: "There was an error adding the product to the cart.",
      });
    } finally {
      console.log("Completed handleAddToCart function.");
    }
  };

  const handleReviewSubmit = async () => {
    setMessage(null);
    try {
      await axios.post(`${API_URL}/reviews/add-review`, {
        product_id: id,
        review: newReview,
        rating,
      });
      setNewReview("");
      setRating(0);
      fetchReviews(id);

      setMessage({ type: "success", message: "Review submitted successfully" });
    } catch (error) {
      console.error("Error submitting review:", error);
      setMessage({ type: "error", message: "Failed to submit review" });
    }
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  };

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

  setTimeout(() => {
    setMessage(null);
  }, 3000);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <h1 className="text-3xl font-bold">Loading... ⏳</h1>
        </div>
        <Footer />
      </>
    );
  }

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

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        {message && (
          <div
            className={`fixed left-0 top-1/4 p-4 rounded-md transition-all duration-1000 ${
              message.type === "success" ? "bg-green-100" : "bg-red-100"
            }`}
            style={{ zIndex: 1000, animation: "slideInOut 3s forwards" }}
          >
            <h3 className="font-bold">
              {message.type === "success" ? "Success!" : "Error:"}
            </h3>
            <p>{message.message}</p>
          </div>
        )}

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
            <div className="mt-6 text-gray-700 flex items-center">
              {Array.from({ length: 5 }, (_, index) => (
                <p
                  key={index}
                  className={`${
                    index < getAverageRating()
                      ? "text-yellow-400"
                      : "text-gray-100"
                  } text-4xl`}
                >
                  ★
                </p>
              ))}
            </div>
            <button
              onClick={handleAddToCart}
              className="mt-6 px-6 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center space-x-2 sm:space-x-4">
          {product.image_urls.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${product.name} ${index + 1}`}
              className={`w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-lg cursor-pointer ${
                index === currentImageIndex ? "border-2 border-blue-500" : ""
              }`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
        <div className="mt-12">
          <h2 className="text-2xl font-bold">Customer Reviews</h2>
          <div className="mt-4">
            {reviews.map((review) => (
              <div key={review.id} className="mb-4">
                <div className="flex items-center">
                  {Array.from({ length: 5 }, (_, index) => (
                    <span
                      key={index}
                      className={`${
                        index < review.rating
                          ? "text-yellow-400"
                          : "text-gray-100"
                      } text-3xl`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-500 font-sans">{review.comment}</p>
                <p className="text-black text-sm font-bold">
                  - {review.username}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-bold">Leave a Review</h3>
            <textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              className="w-full mt-2 p-2 border rounded-md"
              placeholder="Write your review here..."
            />
            <div className="mt-2">
              <span className="text-green-900 font-bold">Rating: </span>
              {Array.from({ length: 5 }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setRating(index + 1)}
                  className={`${
                    index < rating ? "text-yellow-400" : "text-gray-200"
                  } text-3xl p-2 rounded-full hover:bg-gray-100`}
                >
                  ★
                </button>
              ))}
            </div>
            <button
              onClick={handleReviewSubmit}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Submit Review
            </button>
          </div>
        </div>
        <div className="mt-12">
          <h1 className="text-2xl font-bold text-gray-800">Similar Products</h1>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {similarProducts.map((similarProduct) => (
              <Link
                to={`/products/${similarProduct.id}`}
                key={similarProduct.id}
              >
                <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
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
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default DetailsPage;
