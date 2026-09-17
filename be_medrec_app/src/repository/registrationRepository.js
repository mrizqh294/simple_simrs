import { prisma } from "../config/database.js";

export const findPoliById = async (poliId) => {
  return prisma.poli.findUnique({
    where: {
      id: Number(poliId),
    },
  });
};

export const createRegistration = async ({
  patientData,
  visitData,
  queueData,
}) => {
  return prisma.$transaction(async (tx) => {
    const patient = await tx.patient.create({
      data: patientData,
    });

    const visit = await tx.visit.create({
      data: {
        ...visitData,
        patientId: patient.id,
      },
    });

    const queue = await tx.queue.create({
      data: {
        ...queueData,
        visitId: visit.id,
      },
    });

    return {
      patient,
      visit,
      queue,
    };
  });
};
