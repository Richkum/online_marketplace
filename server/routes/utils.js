import pool from "../db.config/index.js";

async function getUserProducts(userId) {
  const result = await pool.query(
    "SELECT p.id FROM products p WHERE p.user_id = $1",
    [userId]
  );
  return result.rows.map((product) => product.id);
}

export default getUserProducts;
