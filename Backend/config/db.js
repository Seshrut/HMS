import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "hms",
  password: "postgres123",
  port: 5432,
});

pool.connect((err, client, release) => {
  if (err) {
    console.error("Database connection error:", err.message);
  } else {
    console.log("Database connected successfully!");
    release();
  }
});

export default pool;