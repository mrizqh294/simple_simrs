import express from "express";
import auth from "../middleware/auth.js";
import roleCheck from "../middleware/role.js";
import { getDoctors } from "../controllers/doctorController.js";

const router = express.Router();

router.get("/doctors", auth, roleCheck("ADMIN", "PENDAFTARAN"), getDoctors);

export default router;
