import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.set("trust proxy", 1);

// Health check
app.get("/ping", (req, res) => res.json({ status: "ok" }));

// Auth routes (login, register, /me, /doctors)
import authRoutes from "./routes/auth.js";
app.use("/api/auth", authRoutes);

// Appointment routes
import appointmentRoutes from "./routes/appointments.js";
app.use("/api/appointments", appointmentRoutes);

// Prescription routes
import prescriptionRoutes from "./routes/prescription.js";
app.use("/api/prescriptions", prescriptionRoutes);

// Dashboard stats routes
import dashboardRoutes from "./routes/dashboard.js";
app.use("/api/dashboard", dashboardRoutes);

// DB connectivity test
import pool from "./config/db.js";
app.get("/dbtest", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
