import express from "express";
import auth from "../middleware/auth.js";
import roleCheck from "../middleware/role.js";
import validate from "../middleware/validator.js";

import {
  createQueue,
  getQueues,
  callQueue,
  updateQueueStatus,
} from "../controllers/queueController.js";

import {
  createQueueSchema,
  updateQueueStatusSchema,
} from "../validator/queueSchema.js";

const router = express.Router();

router.get("/queues", auth, roleCheck("PERAWAT", "ADMIN"), getQueues);
router.patch("/queues/:id/call", auth, roleCheck("PERAWAT"), callQueue);

router.post(
  "/queues",
  auth,
  roleCheck("PENDAFTARAN"),
  validate(createQueueSchema),
  createQueue,
);

router.patch(
  "/queues/:id/status",
  auth,
  roleCheck("PERAWAT"),
  validate(updateQueueStatusSchema),
  updateQueueStatus,
);

export default router;
