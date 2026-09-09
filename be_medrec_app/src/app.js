import "dotenv/config";

import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import registrationRoutes from "./routes/registrationRoutes.js";
import visitRoutes from "./routes/visitRoutes.js";
import medicarRecordRoutes from "./routes/medicalRecordRoutes.js";
import queueRoutes from "./routes/queueRoutes.js";
import poliRoutes from "./routes/poliRoutes.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const port = 5000;

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(
  "/api",
  authRoutes,
  userRoutes,
  patientRoutes,
  registrationRoutes,
  visitRoutes,
  medicarRecordRoutes,
  queueRoutes,
  poliRoutes
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
