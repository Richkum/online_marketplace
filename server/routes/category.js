import express from "express";
import pool from "../db.config/index.js";

const router = express.Router();

router.get("/all-category", async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM categories");
  res.send(rows);
});

export default router;
