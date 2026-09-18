import { prisma } from "../config/database.js";
import { findLastPatient } from "./patientRepository.js";
import { findLastQueueByDate } from "./queueRepository.js";
import { createRecordNumber } from "../lib/recordNumber.js";
import { createQueueNumber } from "../lib/queueNumber.js";

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
    // membuat record number
    const lastPatient = await findLastPatient(tx);
    const recordNumber = await createRecordNumber(lastPatient);

    // membuat queue number
    const queueDate = new Date(visitData.visitDate);
    queueDate.setHours(0, 0, 0, 0);
    const lastQueue = await findLastQueueByDate(tx, queueDate);
    const queueNumber = await createQueueNumber(lastQueue);

    // insert data ke tabel
    const patient = await tx.patient.create({
      data: {
        ...patientData,
        recordNumber,
      },
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
        queueDate,
        queueNumber,
      },
    });

    return {
      patient,
      visit,
      queue,
    };
  });
};
