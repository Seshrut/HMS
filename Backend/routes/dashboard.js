import { Router } from "express";
import { authenticateToken } from "../middleware/tokenAuthenticator.js";
import { allowRoles } from "../middleware/allowedRoles.js";

const router = Router();

router.get("/stats", authenticateToken, allowRoles("doctor"), (req, res) => {
  /*
    Retrieves aggregated data such as
    total appointments, pending appointments, approved appointments, and completed consultations.
  */
 res.json({Todayappointments:24,patients:120,prescriptions:18,pendingReports:6});
});

export default router;
