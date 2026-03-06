import { Router } from "express";
import { authenticateToken } from "../middleware/tokenAuthenticator";
import { allowRoles } from "../middleware/allowedRoles";

const router = Router();

router.get("/", authenticateToken, allowRoles("doctor"), (req, res) => {
  /* Create a new appointment request by linking a patient with a doctor and a selected date. */
});

router.get(
  "/patient/:id",
  authenticateToken,
  allowRoles("patient"),
  (req, res) => {
    const patientId = req.params.id;
    /* Retrieves all appointments booked by a specific patient. */
  },
);
router.get(
  "/doctor/:id",
  authenticateToken,
  allowRoles("doctor"),
  (req, res) => {
    const doctorId = req.params.id;
    /* Retrieves all appointments assigned to a specific doctor. */
  },
);
router.put(
  "/:id/status",
  authenticateToken,
  allowRoles("doctor"),
  (req, res) => {
    const appointmentId = req.params.id;
    /* Updates the status of an appointment (such as Pending, Approved, or Completed). */
  },
);

export default router;
