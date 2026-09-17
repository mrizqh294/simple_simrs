import express from "express";
import auth from "../middleware/auth.js";
import roleCheck from "../middleware/role.js";
import validate from "../middleware/validator.js";
import patientSchema from "../validator/patientSchema.js";

import {
  getPatients,
  createPatient,
  getPatientById,
  deletePatient,
  updatePatient,
} from "../controllers/patientController.js";


const router = express.Router();


router.get("/patients", auth, roleCheck("PENDAFTARAN", "ADMIN"), getPatients);

router.get(
  "/patients/:id",
  auth,
  roleCheck("PENDAFTARAN", "ADMIN"),
  getPatientById,
);

router.post(
  "/patients",
  auth,
  roleCheck("PENDAFTARAN", "ADMIN"),
  validate(patientSchema),
  createPatient,
);

router.delete(
  "/patients/:id",
  auth,
  roleCheck("PENDAFTARAN", "ADMIN"),
  deletePatient,
);

router.patch(
  "/patients/:id",
  auth,
  roleCheck("PENDAFTARAN", "ADMIN"),
  validate(patientSchema),
  updatePatient,
);

export default router;
