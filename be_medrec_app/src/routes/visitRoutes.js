import express from "express";
import auth from "../middleware/auth.js";
import roleCheck from "../middleware/role.js";
import validate from "../middleware/validator.js";

import {
  visitSchema,
  updateVisitStatusSchema
} from "../validator/visitSchema.js";

import {
  createVisit,
  getVisits,
  updateVisit,
  updateVisitStatus,
} from "../controllers/visitController.js";

const router = express.Router();

router.get(
  "/visits",
  auth,
  getVisits
)

router.post(
  "/visits",
  auth,
  roleCheck("PENDAFTARAN"),
  validate(visitSchema),
  createVisit,
);

router.patch(
  "/visits/:id/status",
  auth,
  roleCheck("PENDAFTARAN", "DOKTER"),
  validate(updateVisitStatusSchema),
  updateVisitStatus,
);

router.patch(
  "/visits/:id",
  auth,
  roleCheck("PENDAFTARAN"),
  validate(visitSchema),
  updateVisit,
);

export default router;
