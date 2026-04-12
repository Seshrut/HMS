import { Router } from "express";
import { authenticateToken } from "../middleware/tokenAuthenticator.js";
import { allowRoles } from "../middleware/allowedRoles.js";
import pool from "../config/db.js";

const router = Router();

// ─── POST /api/prescriptions — doctor saves a prescription ───
router.post("/", authenticateToken, allowRoles("doctor"), async (req, res) => {
  const { appointmentId, patientName, complaint, diagnosis, medicines, advice, followUp } = req.body;
  if (!appointmentId || !diagnosis)
    return res.status(400).json({ message: "appointmentId and diagnosis are required" });

  try {
    // Verify this appointment belongs to this doctor
    const appt = await pool.query(
      `SELECT id FROM appointments WHERE id = $1 AND doctor_id = $2`,
      [appointmentId, req.userId]
    );
    if (appt.rows.length === 0)
      return res.status(403).json({ message: "Appointment not found or access denied" });

    const result = await pool.query(
      `INSERT INTO prescriptions
         (appointment_id, patient_name, complaint, diagnosis, medicines, advice, follow_up)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        appointmentId,
        patientName || "",
        complaint   || "",
        diagnosis,
        JSON.stringify(medicines || []),
        advice   || "",
        followUp || "",
      ]
    );

    // Auto-mark appointment as completed when prescription is written
    await pool.query(
      `UPDATE appointments SET status = 'completed' WHERE id = $1`,
      [appointmentId]
    );

    return res.status(201).json({ message: "Prescription saved", prescription: result.rows[0] });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// ─── GET /api/prescriptions/patient — all prescriptions for logged-in patient ─
router.get("/patient", authenticateToken, allowRoles("patient"), async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT pr.id, pr.appointment_id, pr.patient_name, pr.complaint,
              pr.diagnosis, pr.medicines, pr.advice, pr.follow_up, pr.created_at,
              d.username AS doctor_name, a.appointment_date
       FROM prescriptions pr
       JOIN appointments a ON pr.appointment_id = a.id
       JOIN doctors      d ON a.doctor_id = d.id
       WHERE a.patient_id = $1
       ORDER BY pr.created_at DESC`,
      [req.userId]
    );
    return res.json(result.rows);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// ─── GET /api/prescriptions/:appointmentId — prescription by appointment ─
router.get("/:appointmentId", authenticateToken, allowRoles("patient", "doctor"), async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM prescriptions WHERE appointment_id = $1`,
      [req.params.appointmentId]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "No prescription found for this appointment" });

    return res.json(result.rows[0]);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
