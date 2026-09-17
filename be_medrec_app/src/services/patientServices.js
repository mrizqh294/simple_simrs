import * as patientRepository from "./../repository/patientRepository.js";

export const createRecordNumber = async () => {
  const lastPatient = await patientRepository.findLastPatient();

  const nextNumber = lastPatient ? lastPatient.id + 1 : 1;

  const recordNumber = `RM-${new Date().getFullYear()}-${String(
    nextNumber,
  ).padStart(6, "0")}`;

  return recordNumber;
};

export const createPatient = async (data) => {
  const existingPatient = await patientRepository.findPatientByNik(data.nik);

  if (existingPatient) {
    const error = new Error("Pasien dengan NIK tersebut sudah terdaftar");

    error.statusCode = 409;

    throw error;
  }

  const recordNumber = await createRecordNumber();

  return patientRepository.createPatient({
    ...data,
    birthdate: new Date(data.birthdate),
    recordNumber,
  });
};

export const getPatients = async () => {
  return patientRepository.getPatients();
};

export const getPatientById = async (id) => {
  const patient = await patientRepository.findPatientById(id);

  if (!patient) {
    const error = new Error("Data pasien tidak ditemukan");
    error.statusCode = 404;

    throw error;
  }

  return patient;
};

export const updatePatient = async (id, data) => {
  const patient = await patientRepository.findPatientById(id);

  if (!patient) {
    const error = new Error("Data pasien tidak ditemukan");
    error.statusCode = 404;

    throw error;
  }

  const existingPatient = await patientRepository.findPatientByNik(data.nik);

  if (existingPatient && existingPatient.id !== Number(id)) {
    const error = new Error("NIK tersebut sudah digunakan oleh pasien lain");

    error.statusCode = 409;

    throw error;
  }

  return patientRepository.updatePatient(id, {
    ...data,
    birthdate: new Date(data.birthdate),
  });
};

export const deletePatient = async (id) => {
  const patient = await patientRepository.findPatientById(id);

  if (!patient) {
    const error = new Error("Data pasien tidak ditemukan");
    error.statusCode = 404;

    throw error;
  }

  return patientRepository.deletePatient(id);
};
