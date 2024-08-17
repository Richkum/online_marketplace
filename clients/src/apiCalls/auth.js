import axios from "axios";

async function signup(username, email, password) {
  try {
    const response = await axios.post("https://localhost:5432/signup", {
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
    const response = await axios.post("https://localhost:5432/login", {
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
