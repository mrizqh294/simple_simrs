import "dotenv/config";

import { PrismaClient } from "./path/to/generated/prisma";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  database: process.env.DB_NAME || "mydb",
  password: process.env.DB_PASSWORD || "password",
  port: parseInt(process.env.DB_PORT || "3306", 10),
});

export const prisma = new PrismaClient({ adapter });
