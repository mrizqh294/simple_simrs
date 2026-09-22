import * as medicalRecordRepository from "./../repository/medicalRecordRepository.js";
import * as visitRepository from "./../repository/visitRepository.js"
import { updateQueueStatusbyVisitId } from "../repository/queueRepository.js";

export const createMedicalRecord = async (data) => {
  const existingMedicalRecord = await medicalRecordRepository.findMedicalRecordByVisitId(data.visitId);

  if (existingMedicalRecord) {
    const error = new Error(
      "Medical record untuk kunjungan ini sudah tersedia",
    );

    error.statusCode = 409;

    throw error;
  }

  const medicalRecord = await medicalRecordRepository.createMedicalRecord(data);

  await visitRepository.updateVisitStatus(data.visitId, "SELESAI");

  await updateQueueStatusbyVisitId(data.visitId, "SELESAI");

  return medicalRecord;
};