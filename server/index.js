import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/product.js";
import categoryRoutes from "./routes/category.js";
import fileUpload from "express-fileupload";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/auth", authRoutes);

app.use("/product", productRoutes);

app.use("/category", categoryRoutes);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
