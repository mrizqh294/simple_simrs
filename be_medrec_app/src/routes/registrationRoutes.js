import express from "express";
import { registerPatient } from "../controllers/registrationController.js";
import auth from "../middleware/auth.js";
import roleCheck from "../middleware/role.js";
import validate from "../middleware/validator.js";
import registrationSchema from "../validator/registrationSchema.js";

const router = express.Router();

router.post(
  "/registration",
  auth,
  roleCheck("PENDAFTARAN"),
  validate(registrationSchema),
  registerPatient,
);

export default router;
