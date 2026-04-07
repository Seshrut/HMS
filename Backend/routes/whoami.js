import { Router } from "express";
import { authenticateToken } from "../middleware/tokenAuthenticator.js";
import pool from "../config/db.js";

const router = Router();

router.get("/", authenticateToken, async (req, res) => {
  /* find the patient/doctor from the token and return data [username, role and userId] */
  /* if record not found, return invalid token */
  try {
    const table = req.role === "doctor" ? "doctors" : "patients";
    const result = await pool.query(`SELECT id, username FROM ${table} WHERE username = $1`, [req.username]);
    
    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid token" });
    }
    
    const user = result.rows[0];
    res.json({ username: user.username, role: req.role, userId: user.id });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
