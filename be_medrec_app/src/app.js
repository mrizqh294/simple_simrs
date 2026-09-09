import "dotenv/config";

import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import registrationRoutes from "./routes/registrationRoutes.js";
import visitRoutes from "./routes/visitRoutes.js";
import medicarRecordRoutes from "./routes/medicalRecordRoutes.js";
import queueRoutes from "./routes/queueRoutes.js";
import express from "express";
import cookieParser from "cookie-parser";

const port = 5000;

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  "/api",
  authRoutes,
  userRoutes,
  patientRoutes,
  registrationRoutes,
  visitRoutes,
  medicarRecordRoutes,
  queueRoutes,
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
