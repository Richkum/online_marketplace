import axios from "axios";

const fetchCategories = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/category/all-category"
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    throw error;
  }
};

const fetchProducts = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "http://localhost:3000/product/all-products",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", {
      message: error.message,
      config: error.config,
      request: error.request,
      response: error.response,
    });
    throw error;
  }
};

const fetchSearchProducts = async (keyword) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `http://localhost:3000/product/search-products?keyword=${keyword}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", {
      message: error.message,
      config: error.config,
      request: error.request,
      response: error.response,
    });
    throw error;
  }
};

const fetchReviews = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "http://localhost:3000/reviews/all-reviews",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews:", {
      message: error.message,
      config: error.config,
      request: error.request,
      response: error.response,
    });
    throw error;
  }
};

const fetchUserProducts = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    // if (!token) {
    //   throw new Error("Authentication token is missing");
    // }

    const response = await axios.get(
      `http://localhost:3000/product/user-products/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user products:", {
      message: error.message,
      config: error.config,
      request: error.request,
      response: error.response,
    });
    throw error;
  }
};

const usersAddedToCart = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `http://localhost:3000/carts/user-cart/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user products:", {
      message: error.message,
      config: error.config,
      request: error.request,
      response: error.response,
    });
    throw error;
  }
};

export {
  fetchCategories,
  fetchProducts,
  fetchReviews,
  fetchUserProducts,
  fetchSearchProducts,
  usersAddedToCart,
};
