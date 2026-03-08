import { Router } from "express";
import { authenticateToken } from "../middleware/tokenAuthenticator.js";

const router = Router();

router.get("/", authenticateToken, (req, res) => {
  /* find the patient/doctor from the token and return data [username, role and userId] */
  /* if record not found, return invalid token */
});

export default router;
