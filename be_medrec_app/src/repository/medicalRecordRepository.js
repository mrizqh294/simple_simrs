import { prisma } from "./../config/database.js";
import { updateVisitStatus } from "./visitRepository.js";
import { updateQueueStatusbyVisitId } from "./queueRepository.js";

export const findMedicalRecordByVisitId = async (visitId) => {
  return prisma.medicalRecord.findUnique({
    where: {
      visitId: Number(visitId),
    },
  });
};

export const createMedicalRecord = async (data) => {
  return await prisma.$transaction(async (tx) => {
    const result = await tx.medicalRecord.create({
      data,
    });
    await updateVisitStatus(tx, result.visitId, "SELESAI");
    await updateQueueStatusbyVisitId(tx, result.visitId, "SELESAI");

    return result;
  });
};

export const getMedicalRecords = async (patientId) => {
  const where = {};

  if (patientId) {
    where.visit = {
      patientId: Number(patientId),
    };
  }

  return prisma.medicalRecord.findMany({
    where,
    include: {
      doctor: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      visit: {
        include: {
          patient: {
            select: {
              id: true,
              name: true,
              recordNumber: true,
              nik: true,
              age: true,
              gender: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
