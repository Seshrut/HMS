import { Router } from "express";
import { authenticateToken } from "../../middleware/tokenAuthenticator";
import { allowRoles } from "../../middleware/allowedRoles";
import { authLimiter } from "../../middleware/authLimiter";
import Joi from "joi";

const LoginSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(6).max(128).required(),
});

const router = Router();

router.get("/login", authenticateToken, allowRoles("doctor"), (req, res) => {
  const { error } = LoginSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  /* login a doctor */
});

router.get("/register", authLimiter, (req, res) => {
  const { error } = LoginSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  /* register a doctor */
});

export default router;
