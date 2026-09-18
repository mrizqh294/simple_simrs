import express from "express";
import validate from "../middleware/validator.js";
import auth from "../middleware/auth.js";
import roleCheck from "../middleware/role.js";
import userSchema from "../validator/UserSchema.js";

import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/users", auth, roleCheck("ADMIN", "PENDAFTARAN"), getUsers);

router.get("/users/:id", auth, getUserById);

router.delete("/users/:id", auth, roleCheck("ADMIN"), deleteUser);

router.post(
  "/users",
  auth,
  roleCheck("ADMIN"),
  validate(userSchema),
  createUser,
);

router.patch(
  "/users/:id",
  auth,
  roleCheck("ADMIN"),
  validate(userSchema),
  updateUser,
);

export default router;
