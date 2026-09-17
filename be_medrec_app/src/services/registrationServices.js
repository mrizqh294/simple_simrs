import * as registrationRepository from "./../repository/registrationRepository.js";
import * as patientRepository from "../repository/patientRepository.js";
import { createQueueNumber } from "./queueServices.js";
import { createRecordNumber } from "./patientServices.js";

export const registerPatient = async (data) => {
  const existingPatient = await patientRepository.findPatientByNik(data.nik);

  if (existingPatient) {
    const error = new Error("Pasien dengan NIK tersebut sudah terdaftar");

    error.statusCode = 409;

    throw error;
  }

  const recordNumber = await createRecordNumber();

  const visitDate = new Date();

  const queueDate = new Date(visitDate);

  queueDate.setHours(0, 0, 0, 0);

  const queueNumber = await createQueueNumber(queueDate);

  return registrationRepository.createRegistration({
    patientData: {
      nik: data.nik,
      name: data.name,
      age: data.age,
      gender: data.gender,
      birthdate: data.birthdate,
      phone: data.phone,
      address: data.address,
      recordNumber,
    },

    visitData: {
      doctorId: data.doctorId,
      poliId: data.poliId,
      recepsionistId: Number(data.recepsionistId),
      visitDate,
      description: data.description,
      status: "MENUNGGU",
    },

    queueData: {
      queueNumber,
      queueDate,
      status: "MENUNGGU",
    },
  });
};
