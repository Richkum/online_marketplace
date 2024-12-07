import pool from "../db.config/index.js";

async function getCategoryIdByName(categoryName) {
  const query = `SELECT id from categories WHERE name = $1`;
  const result = await pool.query(query, [categoryName]);

  if (result.rows.length > 0) {
    return result.rows[0].id;
  } else {
    throw new Error("category not found");
  }
}

export default getCategoryIdByName;
