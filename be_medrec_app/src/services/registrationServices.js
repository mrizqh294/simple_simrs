import * as registrationRepository from "./../repository/registrationRepository.js";
import * as patientRepository from "../repository/patientRepository.js";

export const registerPatient = async (data) => {
  const existingPatient = await patientRepository.findPatientByNik(data.nik);

  if (existingPatient) {
    const error = new Error("Pasien dengan NIK tersebut sudah terdaftar");

    error.statusCode = 409;

    throw error;
  }

  const visitDate = new Date();

  return registrationRepository.createRegistration({
    patientData: {
      nik: data.nik,
      name: data.name,
      age: data.age,
      gender: data.gender,
      birthdate: data.birthdate,
      phone: data.phone,
      address: data.address,
    },

    visitData: {
      doctorId: data.doctorId,
      poliId: data.poliId,
      receptionistId: Number(data.receptionistId),
      description: data.description,
      visitDate,
      status: "MENUNGGU",
    },

    queueData: {
      status: "MENUNGGU",
    },
  });
};
