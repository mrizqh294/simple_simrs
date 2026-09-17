import * as registrationRepository from "./../repository/registrationRepository.js";
import * as patientRepository from "../repository/patientRepository.js";
import * as userRepository from "../repository/userRepository.js";
import * as queueRepository from "../repository/queueRepository.js";

export const registerPatient = async (data) => {
  const existingPatient = await patientRepository.findPatientByNik(data.nik);

  if (existingPatient) {
    const error = new Error("Pasien dengan NIK tersebut sudah terdaftar");

    error.statusCode = 409;

    throw error;
  }

  const lastPatient = await patientRepository.findLastPatient();

  const nextNumber = lastPatient ? lastPatient.id + 1 : 1;

  const recordNumber = `RM-${new Date().getFullYear()}-${String(
    nextNumber,
  ).padStart(6, "0")}`;

  const existingRecordNumber =
    await patientRepository.findPatientByRecordNumber(recordNumber);

  if (existingRecordNumber) {
    const error = new Error("Nomor rekam medis sudah digunakan");

    error.statusCode = 409;

    throw error;
  }

  const doctor = await userRepository.findUserById(data.doctorId);

  if (!doctor || doctor.role !== "DOKTER") {
    const error = new Error("Dokter tidak ditemukan");

    error.statusCode = 404;

    throw error;
  }

  const poli = await registrationRepository.findPoliById(data.poliId);

  if (!poli) {
    const error = new Error("Poli tidak ditemukan");

    error.statusCode = 404;

    throw error;
  }

  const receptionist = await userRepository.findUserById(data.receptionistId);

  if (!receptionist || receptionist.role !== "PENDAFTARAN") {
    const error = new Error("Petugas pendaftaran tidak ditemukan");

    error.statusCode = 404;

    throw error;
  }

  const visitDate = new Date();

  const queueDate = new Date(visitDate);

  queueDate.setHours(0, 0, 0, 0);

  const lastQueue = await queueRepository.findLastQueueByDate(queueDate);

  let queueNumber = "A001";

  if (lastQueue) {
    const lastNumber = Number(lastQueue.queueNumber.substring(1));

    const nextQueueNumber = lastNumber + 1;

    queueNumber = `A${String(nextQueueNumber).padStart(3, "0")}`;
  }

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
      recepsionistId: Number(data.receptionistId),
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
