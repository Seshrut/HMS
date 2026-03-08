import { Router } from "express";
import { authenticateToken } from "../../middleware/tokenAuthenticator.js";
import { allowRoles } from "../../middleware/allowedRoles.js";
import { authLimiter } from "../../middleware/authLimiter.js";
import Joi from "joi";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "example";

const LoginSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(6).max(128).required(),
});

const router = Router();

router.post("/login", authLimiter, (req, res) => {
  const { error } = LoginSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  /* login a patient */
  return res.status(501).json({
    message: "Login logic not implemented yet"
  });
});

router.post("/register", authLimiter, (req, res) => {
  const { error } = LoginSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  //uncomment this if u want to test if our post is working, use postman on this link: http://localhost:3000/api/patients/register
  //with some json content ex: 

  return res.status(501).json({
    message: "register logic not implemented yet"
  });
});

export default router;
