import express from "express";
import { login, logout, getMe } from "../controllers/authController.js";
import auth from "../middleware/auth.js";
import validate from "../middleware/validator.js";
import loginSchema from "../validator/loginSchema.js";

const router = express.Router();

router.post("/auth/login", validate(loginSchema), login);
router.post("/auth/logout", logout);
router.get("/auth/me", auth, getMe);

export default router;
