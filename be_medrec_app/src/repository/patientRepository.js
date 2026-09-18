import { prisma } from "./../config/database.js";
import { createRecordNumber } from "../lib/recordNumber.js";

export const getPatients = async ({ where, skip, take }) => {
  return await prisma.patient.findMany({
    where,
    skip,
    take,
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const countPatients = async (where) => {
  return await prisma.patient.count({
    where,
  });
};

export const findPatientById = async (id) => {
  return prisma.patient.findUnique({
    where: {
      id: Number(id),
    },
  });
};

export const findPatientByNik = async (nik) => {
  return prisma.patient.findUnique({
    where: {
      nik,
    },
  });
};

export const findLastPatient = async (tx) => {
  const result = await tx.$queryRaw`
    SELECT *
    FROM Patient
    ORDER BY id DESC
    LIMIT 1
    FOR UPDATE
  `;

  return result[0];
};

export const findPatientByRecordNumber = async (recordNumber) => {
  return prisma.patient.findUnique({
    where: {
      recordNumber,
    },
  });
};

export const createPatient = async (data) => {
  return prisma.$transaction(async (tx) => {
    const lastPatient = await findLastPatient(tx);

    const recordNumber = await createRecordNumber(lastPatient);

    const patient = await tx.patient.create({
      data: {
        ...data,
        recordNumber,
      },
    });

    return patient;
  });
};

export const updatePatient = async (id, data) => {
  return prisma.patient.update({
    where: {
      id: Number(id),
    },
    data,
  });
};

export const deletePatient = async (id) => {
  return prisma.patient.delete({
    where: {
      id: Number(id),
    },
  });
};
