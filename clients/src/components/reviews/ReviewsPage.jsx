import React, { useState, useEffect } from "react";
import axios from "axios";

function ReviewsPage() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get("http://localhost:3000/reviews");
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Product Reviews</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Rating: {review.rating}</h2>
            <p className="text-gray-700 mb-4">{review.comment}</p>
            <p className="text-sm text-gray-500">Reviewed by User ID: {review.user_id}</p>
            <p className="text-sm text-gray-500">Product ID: {review.product_id}</p>
            <p className="text-sm text-gray-500">Reviewed on: {new Date(review.created_at).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewsPage;

// import React from "react";

// function ReviewsPage() {
//   return (
//     <>
//       <div>ReviewsPage</div>
//     </>
//   );
// }

// export default ReviewsPage;
