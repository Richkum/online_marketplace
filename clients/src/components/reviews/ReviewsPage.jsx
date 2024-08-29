import React, { useState, useEffect, useContext } from "react";
import Navbar from "../navbar/navbar";
import { AuthContext } from "../../contex/Authcontext";

function ReviewsPage() {
  const API_URL = "https://online-marketplace-server.onrender.com";

  const { user } = useContext(AuthContext);
  console.log(user.id);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `/api/reviews/user-product-reviews/${user.id}`,
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
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-6">
          Your Product Reviews
        </h1>
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : reviews.length === 0 ? (
          <p className="text-center text-gray-500">You have no reviews.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white shadow-lg rounded-lg p-6"
              >
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
                  Reviewed on:{" "}
                  {new Date(review.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default ReviewsPage;
