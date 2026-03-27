import { Router } from "express";
import { authenticateToken } from "../middleware/tokenAuthenticator.js";
import { allowRoles } from "../middleware/allowedRoles.js";
import pool from "../config/db.js";

const router = Router();

/*
Create a new appointment
Only patients should be able to book appointments
*/
router.post("/", authenticateToken, allowRoles("patient"), async (req, res) => {
  try {
    const patientId = req.userId;
    const { doctorId, appointmentDate } = req.body;

    const result = await pool.query(
      `INSERT INTO appointments (patient_id, doctor_id, appointment_date)
       VALUES ($1,$2,$3)
       RETURNING *`,
      [patientId, doctorId, appointmentDate],
    );

    res.status(201).json({
      message: "Appointment created",
      appointment: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/*
Get appointments for a specific patient
*/
router.get(
  "/patient/:id",
  authenticateToken,
  allowRoles("patient"),
  async (req, res) => {
    try {
      const patientId = req.params.id;

      const result = await pool.query(
        `SELECT * FROM appointments
         WHERE patient_id = $1
         ORDER BY appointment_date DESC`,
        [patientId],
      );

      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
);

/*
Get appointments for a specific doctor
*/
router.get(
  "/doctor/:id",
  authenticateToken,
  allowRoles("doctor"),
  async (req, res) => {
    try {
      const doctorId = req.params.id;

      const result = await pool.query(
        `SELECT * FROM appointments
         WHERE doctor_id = $1
         ORDER BY appointment_date DESC`,
        [doctorId],
      );

      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
);

/*
Update appointment status
Only doctors can update status
*/
router.put(
  "/:id/status",
  authenticateToken,
  allowRoles("doctor"),
  async (req, res) => {
    try {
      const appointmentId = req.params.id;
      const { status } = req.body;

      const result = await pool.query(
        `UPDATE appointments
         SET status = $1
         WHERE id = $2
         RETURNING *`,
        [status, appointmentId],
      );

      res.json({
        message: "Appointment status updated",
        appointment: result.rows[0],
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
);

export default router;
