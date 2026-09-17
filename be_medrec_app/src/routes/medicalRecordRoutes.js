import express from "express";
import auth from "../middleware/auth.js";
import validate from "../middleware/validator.js";
import roleCheck from "../middleware/role.js";
import medicalRecordSchema from "../validator/medicalRecordSchema.js";

import {
  createMedicalRecord,
  getMedicalRecords,
} from "../controllers/medicalRecordController.js";

const router = express.Router();

router.get("/medical-records", auth, roleCheck("DOKTER"), getMedicalRecords);
router.post(
  "/medical-records",
  auth,
  roleCheck("DOKTER"),
  validate(medicalRecordSchema),
  createMedicalRecord,
);


export default router;
