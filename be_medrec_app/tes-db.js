import "dotenv/config";
import mariadb from "mariadb";

try {
  const connection = await mariadb.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
  });

  console.log("MariaDB connection berhasil");

  const result = await connection.query("SELECT 1 AS test");

  console.log("Query berhasil:", result);

  await connection.end();

  console.log("Connection ditutup");
} catch (error) {
  console.error("MariaDB connection gagal:");
  console.error(error);
}