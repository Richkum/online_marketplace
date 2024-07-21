import express from "express";
import pool from "./db.config/index.js";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/product.js";
import categoryRoutes from "./routes/category.js";
import authMiddleware from "./middleware/authIndex.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/auth", authRoutes);

app.use("/product", authMiddleware, productRoutes);

app.use("/category", authMiddleware, categoryRoutes);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
