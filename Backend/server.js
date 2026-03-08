import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.set("trust proxy", 1);

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

import pingRoutes from "./routes/ping.js";
app.use("/ping", pingRoutes);

//Auth routes

import patientAuthRoutes from "./routes/auth/patient.js";
app.use("/api/patients", patientAuthRoutes);
import doctorAuthRoutes from "./routes/auth/doctor.js";
app.use("/api/doctors", doctorAuthRoutes);

//Appointment routes

import appointmentRoutes from "./routes/appointments.js";
app.use("/api/appointments", appointmentRoutes);

//Prescription routes

import prescriptionRoutes from "./routes/prescription.js";
app.use("/api/prescriptions", prescriptionRoutes);

//Dashboard routes
import dashboardRoutes from "./routes/dashboard.js";
app.use("/api/dashboard", dashboardRoutes);

//Whoami routes
import whoamiRoutes from "./routes/whoami.js";
app.use("/api/whoami", whoamiRoutes);

import pool from "./config/db.js";

app.get("/dbtest", async (req,res)=>{
  try{
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  }catch(err){
    res.status(500).json({error:err.message});
  }
});

//Start Server
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
