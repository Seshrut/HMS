import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.set("trust proxy", 1);

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);


import pingRoutes from "./routes/ping";
app.use("/ping", pingRoutes);

//Auth routes

import patientAuthRoutes from "./routes/auth/patient";
app.use("/api/patients", patientAuthRoutes);
import doctorAuthRoutes from "./routes/auth/doctor";
app.use("/api/doctors", doctorAuthRoutes);

//Appointment routes

import appointmentRoutes from "./routes/appointments";
app.use("/api/appointments", appointmentRoutes);

//Prescription routes

import prescriptionRoutes from "./routes/prescription";
app.use("/api/prescriptions", prescriptionRoutes);

//Dashboard routes
import dashboardRoutes from "./routes/dashboard";
app.use("/api/dashboard", dashboardRoutes);

//Start Server
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
