import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.EXTERNAL_DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Database connected");
  }
});

export default pool;
