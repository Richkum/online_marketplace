import pg from "pg";
import dotenv from "dotenv";
import path from "path";

const envFile =
  process.env.NODE_ENV === "production" ? ".env" : ".env.development";
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`Database URL: ${process.env.INTERNAL_DB_URL}`);

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.INTERNAL_DB_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

pool.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    throw err;
  } else {
    console.log("Database connected");
  }
});

export default pool;
