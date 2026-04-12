import { Router } from "express";
import { authenticateToken } from "../middleware/tokenAuthenticator.js";
import { allowRoles } from "../middleware/allowedRoles.js";
import pool from "../config/db.js";

const router = Router();

// ─── POST /api/appointments — patient books an appointment ────
router.post("/", authenticateToken, allowRoles("patient"), async (req, res) => {
  const { doctorId, appointmentDate } = req.body;
  if (!doctorId || !appointmentDate)
    return res.status(400).json({ message: "doctorId and appointmentDate are required" });

  try {
    const result = await pool.query(
      `INSERT INTO appointments (patient_id, doctor_id, appointment_date)
       VALUES ($1, $2, $3) RETURNING *`,
      [req.userId, doctorId, appointmentDate]
    );
    return res.status(201).json({ message: "Appointment booked", appointment: result.rows[0] });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// ─── GET /api/appointments/patient — patient sees their appointments ─
router.get("/patient", authenticateToken, allowRoles("patient"), async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT a.id, a.appointment_date, a.status,
              d.username AS doctor_name, d.specialization
       FROM appointments a
       JOIN doctors d ON a.doctor_id = d.id
       WHERE a.patient_id = $1
       ORDER BY a.appointment_date DESC`,
      [req.userId]
    );
    return res.json(result.rows);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// ─── GET /api/appointments/doctor-patients ────────────────────
// Distinct patients who have had an appointment with this doctor
router.get("/doctor-patients", authenticateToken, allowRoles("doctor"), async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT DISTINCT ON (p.id)
              p.id,
              p.username            AS name,
              a.appointment_date    AS last_visit,
              a.status              AS last_status
       FROM   appointments a
       JOIN   patients p ON a.patient_id = p.id
       WHERE  a.doctor_id = $1
       ORDER  BY p.id, a.appointment_date DESC`,
      [req.userId]
    );
    return res.json(result.rows);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// ─── GET /api/appointments/doctor — doctor sees their appointments ─

router.get("/doctor", authenticateToken, allowRoles("doctor"), async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT a.id, a.appointment_date, a.status,
              p.username AS patient_name
       FROM appointments a
       JOIN patients p ON a.patient_id = p.id
       WHERE a.doctor_id = $1
       ORDER BY a.appointment_date DESC`,
      [req.userId]
    );
    return res.json(result.rows);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// ─── PUT /api/appointments/:id/status — doctor updates status ─
router.put("/:id/status", authenticateToken, allowRoles("doctor"), async (req, res) => {
  const { status } = req.body;
  const validStatuses = ["pending", "approved", "completed", "cancelled"];
  if (!validStatuses.includes(status))
    return res.status(400).json({ message: "Invalid status" });

  try {
    const result = await pool.query(
      `UPDATE appointments SET status = $1
       WHERE id = $2 AND doctor_id = $3
       RETURNING *`,
      [status, req.params.id, req.userId]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Appointment not found or access denied" });

    return res.json({ message: "Status updated", appointment: result.rows[0] });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
