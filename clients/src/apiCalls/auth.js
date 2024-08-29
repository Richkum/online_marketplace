import axios from "axios";

const API_URL = `https://online-marketplace-server.onrender.com`;
async function signup(username, email, password) {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("signup failed", error);
    throw error;
  }
}

async function login(email, password) {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("login failed");
    throw error;
  }
}

export { signup, login };
