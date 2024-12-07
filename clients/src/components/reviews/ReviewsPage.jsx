import React, { useState, useEffect, useContext } from "react";
import Navbar from "../navbar/navbar";
import Footer from "../footer/Footer";
import { AuthContext } from "../../contex/Authcontext";

function ReviewsPage() {
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const { user } = useContext(AuthContext);
  console.log("User from AuthContext:", user);

  const [reviews, setReviews] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      setMessage(null);
      try {
        const response = await fetch(
          `${API_URL}/reviews/user-product-reviews/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        setReviews(data);
        setMessage({
          type: "success",
          message: "Reviews fetched successfully",
        });
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setMessage({ type: "error", message: "Failed to fetch reviews" });
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [user]);

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

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-4">
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
        <h1 className="text-2xl font-bold text-center mb-6">
          Your Product Reviews
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">
                {review.product_name}
              </h2>
              <p className="italic text-gray-700 mb-2">"{review.comment}"</p>
              <p className="font-bold text-yellow-500 mb-2">
                Rating: {review.rating} / 5
              </p>
              <p className="text-sm text-gray-500">
                By: {review.reviewer_username}
              </p>
              <p className="text-sm text-gray-500">
                Reviewed on: {new Date(review.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ReviewsPage;
