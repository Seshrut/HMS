import { Router } from "express";
import { authenticateToken } from "../middleware/tokenAuthenticator";
import { allowRoles } from "../middleware/allowedRoles";

const router = Router();

router.post("/", authenticateToken, allowRoles("doctor"), (req, res) => {
  /* Allows doctors to add diagnosis and prescribed medications for a completed appointment. */
});

router.get(
  "/:id",
  authenticateToken,
  allowRoles("patient", "doctor"),
  (req, res) => {
    const prescriptionId = req.params.id;
    /* Retrieves the prescription associated with a specific appointment. */
  },
);

export default router;
