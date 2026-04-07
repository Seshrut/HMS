import { Router } from "express";
import { authLimiter } from "../../middleware/authLimiter.js";
import Joi from "joi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import pool from "../../config/db.js";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "example";

const LoginSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(6).max(128).required(),
});

const router = Router();

router.post("/login", authLimiter, async (req, res) => {
  const { error } = LoginSchema.validate(req.body);
  if (error) return res.status(400).json({ message: "invalid request format" });
  /* login a patient */
  const username = req.body.username;
  const password = req.body.password;
  try {
    const result = await pool.query("SELECT * FROM patients WHERE username = $1", [username]);
    const user = result.rows[0];
    //if user not found or password does not match hashed password(saved password)
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    //send user jwt token
    const token = jwt.sign(
      { username: username, role: "patient" },
      JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.json({ token });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/register", authLimiter, async (req, res) => {
  const { error } = LoginSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  /* register a patient */
  const username = req.body.username;
  const password = req.body.password;
  try {
    const existingUser = await pool.query("SELECT * FROM patients WHERE username = $1", [username]);

    //if user already exists [change the if statement]
    if (existingUser.rows.length > 0) {
      return res.status(401).json({ message: "User Already Exists" });
    }

    //add user to db [todo]
    const hashedPassword = await bcrypt.hash(password, 8);
    await pool.query(
      "INSERT INTO patients (username, password) VALUES ($1, $2)",
      [username, hashedPassword]
    );

    //send user jwt token
    const token = jwt.sign(
      { username: username, role: "patient" },
      JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    return res.json({ token });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
