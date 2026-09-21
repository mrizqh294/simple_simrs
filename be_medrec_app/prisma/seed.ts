import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient, Role } from "./../src/generated/prisma/client.ts";
import bcrypt from "bcryptjs";

const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const prisma = new PrismaClient({ adapter });

const polis = [
  { name: "Poli Umum" },
  { name: "Poli Gigi" },
  { name: "Poli Anak" },
  { name: "Poli Penyakit Dalam" },
];

const users = [
  {
    name: "Adnan Jalil",
    email: "admin1@gmail.com",
    role: Role.ADMIN,
  },
  {
    name: "Faizal Permana",
    email: "admin2@gmail.com",
    role: Role.ADMIN,
  },
  {
    name: "Ronal Adrian",
    email: "admin3@gmail.com",
    role: Role.ADMIN,
  },

  {
    name: "Dr. Muhammad Rizki Haikal",
    email: "dokter1@gmail.com",
    role: Role.DOKTER,
    poliIds: [1, 2],
  },
  {
    name: "Dr. Suci Indah Purnama",
    email: "dokter2@gmail.com",
    role: Role.DOKTER,
    poliIds: [3],
  },
  {
    name: "Dr. Anjasmmara",
    email: "dokter3@gmail.com",
    role: Role.DOKTER,
    poliIds: [4],
  },

  {
    name: "Siti Rahma",
    email: "perawat1@gmail.com",
    role: Role.PERAWAT,
    poliIds: [1],
  },
  {
    name: "Dewi Lestari",
    email: "perawat2@gmail.com",
    role: Role.PERAWAT,
    poliIds: [2, 3],
  },
  {
    name: "Nina Kurnia",
    email: "perawat3@gmail.com",
    role: Role.PERAWAT,
    poliIds: [4],
  },

  {
    name: "Tio Rahayu",
    email: "pendaftaran1@gmail.com",
    role: Role.PENDAFTARAN,
  },
  {
    name: "Ali Chandra",
    email: "pendaftaran2@gmail.com",
    role: Role.PENDAFTARAN,
  },
  {
    name: "Kunto Aji",
    email: "pendaftaran3@gmail.com",
    role: Role.PENDAFTARAN,
  },
];

const main = async () => {
  const password = await bcrypt.hash("12345678", 10);

  for (const { name } of polis) {
    await prisma.poli.upsert({
      where: { name },
      update: {},
      create: {
        name,
      },
    });
  }
  
  for (const user of users) {
    const { name, email, role, poliIds } = user;

    const poli = poliIds
      ? await prisma.poli.findMany({
          where: {
            id: {
              in: poliIds,
            },
          },
        })
      : [];

    await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        name,
        email,
        password,
        role,

        userPoli: {
          create: poli.map((poli) => ({
            poliId: poli.id,
          })),
        },
      },
    });
  }

  console.log(
    `Seeder berhasil: ${users.length} user dan ${polis.length} poli dibuat.`,
  );
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
