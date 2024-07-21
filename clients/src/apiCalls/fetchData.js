import axios from "axios";

export const fetchCategories = async () => {
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
