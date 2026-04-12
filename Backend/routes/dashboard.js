import { Router } from "express";
import { authenticateToken } from "../middleware/tokenAuthenticator.js";
import { allowRoles } from "../middleware/allowedRoles.js";
import pool from "../config/db.js";

const router = Router();

// ─── GET /api/dashboard/doctor ───────────────────────────────
router.get("/doctor", authenticateToken, allowRoles("doctor"), async (req, res) => {
  try {
    const apptStats = await pool.query(
      `SELECT
         COUNT(*) FILTER (WHERE DATE(appointment_date) = CURRENT_DATE) AS today_appointments,
         COUNT(DISTINCT patient_id)                                     AS total_patients,
         COUNT(*) FILTER (WHERE status = 'pending')                    AS pending_count
       FROM appointments WHERE doctor_id = $1`,
      [req.userId]
    );
    const rxStats = await pool.query(
      `SELECT COUNT(*) AS total
       FROM prescriptions pr
       JOIN appointments a ON pr.appointment_id = a.id
       WHERE a.doctor_id = $1`,
      [req.userId]
    );

    const a = apptStats.rows[0];
    return res.json({
      todayAppointments: parseInt(a.today_appointments) || 0,
      patients:          parseInt(a.total_patients)     || 0,
      prescriptions:     parseInt(rxStats.rows[0].total)|| 0,
      pendingReports:    parseInt(a.pending_count)      || 0,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// ─── GET /api/dashboard/patient ──────────────────────────────
router.get("/patient", authenticateToken, allowRoles("patient"), async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT
         COUNT(*)                                                    AS total,
         COUNT(*) FILTER (WHERE status IN ('pending','approved'))   AS upcoming,
         COUNT(*) FILTER (WHERE status = 'completed')              AS completed
       FROM appointments WHERE patient_id = $1`,
      [req.userId]
    );
    const row = result.rows[0];
    return res.json({
      totalAppointments: parseInt(row.total)    || 0,
      upcoming:          parseInt(row.upcoming) || 0,
      completed:         parseInt(row.completed)|| 0,
      doctorsAvailable:  4, // no realtime availability system yet
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
