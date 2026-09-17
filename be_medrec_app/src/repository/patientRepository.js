import { prisma } from "./../config/database.js";

export const getPatients = async () => {
  return prisma.patient.findMany();
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

export const findLastPatient = async () => {
  return prisma.patient.findFirst({
    orderBy: {
      id: "desc",
    },
  });
};

export const findPatientByRecordNumber = async (recordNumber) => {
  return prisma.patient.findUnique({
    where: {
      recordNumber,
    },
  });
};

export const createPatient = async (data) => {
  return prisma.patient.create({
    data,
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
