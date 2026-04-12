import { Router } from "express";
import { authLimiter } from "../middleware/authLimiter.js";
import { authenticateToken } from "../middleware/tokenAuthenticator.js";
import Joi from "joi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

const router = Router();

const loginSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(6).max(128).required(),
});

// ─── POST /api/auth/:role/login ───────────────────────────────
router.post("/:role/login", authLimiter, async (req, res) => {
  const { role } = req.params;
  if (!["doctor", "patient"].includes(role))
    return res.status(400).json({ message: "Invalid role" });

  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { username, password } = req.body;
  const table = role === "doctor" ? "doctors" : "patients";

  try {
    const result = await pool.query(
      `SELECT * FROM ${table} WHERE username = $1`,
      [username]
    );
    const user = result.rows[0];
    if (!user || !bcrypt.compareSync(password, user.password))
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { username: user.username, role, userId: user.id },
      process.env.JWT_SECRET || "fallback_secret",
      { expiresIn: "7d" }
    );
    return res.json({ token });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ─── POST /api/auth/:role/register ───────────────────────────
router.post("/:role/register", authLimiter, async (req, res) => {
  const { role } = req.params;
  if (!["doctor", "patient"].includes(role))
    return res.status(400).json({ message: "Invalid role" });

  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { username, password } = req.body;
  const table = role === "doctor" ? "doctors" : "patients";

  try {
    const existing = await pool.query(
      `SELECT id FROM ${table} WHERE username = $1`,
      [username]
    );
    if (existing.rows.length > 0)
      return res.status(409).json({ message: "Username already taken" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO ${table} (username, password) VALUES ($1, $2) RETURNING id`,
      [username, hashedPassword]
    );
    const userId = result.rows[0].id;

    const token = jwt.sign(
      { username, role, userId },
      process.env.JWT_SECRET || "fallback_secret",
      { expiresIn: "7d" }
    );
    return res.status(201).json({ token });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ─── GET /api/auth/me ────────────────────────────────────────
router.get("/me", authenticateToken, async (req, res) => {
  try {
    const table = req.role === "doctor" ? "doctors" : "patients";
    const result = await pool.query(
      `SELECT id, username FROM ${table} WHERE id = $1`,
      [req.userId]
    );
    if (result.rows.length === 0)
      return res.status(401).json({ message: "Invalid token" });

    const user = result.rows[0];
    return res.json({ username: user.username, role: req.role, userId: user.id });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ─── GET /api/auth/doctors (public — for appointment booking) ─
router.get("/doctors", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, username, specialization FROM doctors ORDER BY username`
    );
    return res.json(result.rows);
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
