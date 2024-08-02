import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../navbar/navbar";
import Footer from "../footer/Footer";
import { fetchProducts } from "../../apiCalls/fetchData";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../contex/Authcontext";

function DetailsPage() {
  const { user } = useContext(AuthContext);
  const quantitty = 1;

  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchProducts().then((data) => setProducts(data));
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
        `http://localhost:3000/reviews/review/${productId}`
      );
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleAddToCart = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/carts/add-to-cart",
        {
          user_id: user.id,
          product_id: product.id,
          quantity: quantitty,
        }
      );
      console.log(response.data);
      alert(response.data.message);
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("There was an error adding the product to the cart.");
    }
  };

  const handleReviewSubmit = async () => {
    try {
      await axios.post(`http://localhost:3000/reviews/add-review`, {
        product_id: id,
        review: newReview,
        rating,
      });
      setNewReview("");
      setRating(0);
      fetchReviews(id);
    } catch (error) {
      console.error("Error submitting review:", error);
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
