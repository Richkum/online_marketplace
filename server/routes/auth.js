import express from "express";
import dotenv from "dotenv";
import bycrpt from "bcrypt";
import jwt from "jsonwebtoken";
import { signupSchema, loginSchema } from "../vallidation/index.js";
import { createUser, getUserByEmail } from "../models/userModel.js";
import authMiddleware from "../middleware/authIndex.js";

dotenv.config();

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { error } = signupSchema.validate(req.body);
  if (error) {
    return res.status(404).json({ message: error.details[0].message });
  }

  const { username, email, password } = req.body;
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await createUser(username, email, password);
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(201).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    console.error("Validation error:", error.details[0].message);
    return res.status(404).json({ message: error.details[0].message });
  }

  const { email, password } = req.body;
  try {
    console.log("Attempting login with email:", email);
    const user = await getUserByEmail(email);
    if (!user) {
      console.log("User not found for email:", email);
      return res.status(400).json({ message: "Invalid email" });
    }

    const isMatch = await bycrpt.compare(password, user.password);
    if (!isMatch) {
      console.log("Invalid password for email:", email);
      return res.status(400).json({ message: "Invalid password" });
    }

    console.log("Login successful for email:", email);
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "5d",
    });
    res.status(200).json({ token, user });
  } catch (error) {
    console.error("Internal server error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/check-auth-status", authMiddleware, (req, res) => {
  res.status(200).json({ isAuthenticated: true, user: req.user });
});

router.post("/logout", (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
});

export default router;
