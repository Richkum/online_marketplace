import axios from "axios";

const fetchCategories = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/category/all-category"
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", {
      message: error.message,
      config: error.config,
      request: error.request,
      response: error.response,
    });
    throw error;
  }
};

const fetchProducts = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/product/all-product"
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

export { fetchCategories, fetchProducts };
