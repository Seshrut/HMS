import { Router } from "express";
import { authenticateToken } from "../middleware/tokenAuthenticator.js";
import { allowRoles } from "../middleware/allowedRoles.js";

const router = Router();

router.get("/doctor", authenticateToken, allowRoles("doctor"), (req, res) => {
  /*
    Retrieves aggregated data such as
    total appointments, pending appointments, approved appointments, and completed consultations.
  */
  res.json({
    todayAppointments: 24,
    patients: 120,
    prescriptions: 18,
    pendingReports: 6,
  });
});

router.get("/patient", authenticateToken, allowRoles("patient"), (req, res) => {
  /*
    Retrieves aggregated data such as
    total appointments, pending appointments, approved appointments, and completed consultations.
  */
  res.json({
    totalAppointments: 120,
    pending: 32,
    completed: 88,
    doctorsAvailable: 15,
  });
});

export default router;
