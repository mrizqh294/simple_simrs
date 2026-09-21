import { prisma } from "../config/database.js";
import { findLastPatient } from "./patientRepository.js";
import { createVisitWithQueue } from "./visitRepository.js";
import { createRecordNumber } from "../lib/recordNumber.js";

export const findPoliById = async (poliId) => {
  return prisma.poli.findUnique({
    where: {
      id: Number(poliId),
    },
  });
};

export const createRegistration = async ({ patientData, visitData }) => {
  return prisma.$transaction(async (tx) => {
    // membuat record number
    const lastPatient = await findLastPatient(tx);
    const recordNumber = await createRecordNumber(lastPatient);

    // insert data ke tabel
    const patient = await tx.patient.create({
      data: {
        ...patientData,
        recordNumber,
      },
    });

    //
    const result = await createVisitWithQueue(tx, {
      ...visitData,
      patientId: patient.id,
    });

    return {
      patient,
      visit: result.visit,
      queue: result.queue,
    };
  });
};
