import * as patientRepository from "./../repository/patientRepository.js";

export const getPatients = async ({ page, limit, search }) => {
  const skip = (page - 1) * limit;

  const where = search
    ? {
        OR: [
          {
            name: {
              contains: search,
            },
          },
          {
            recordNumber: {
              contains: search,
            },
          },
          {
            nik: {
              contains: search,
            },
          },
        ],
      }
    : {};

  const [patients, total] = await Promise.all([
    patientRepository.getPatients({
      where,
      skip,
      take: limit,
    }),

    patientRepository.countPatients(where),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    data: patients,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
};

export const createPatient = async (data) => {
  const existingPatient = await patientRepository.findPatientByNik(data.nik);

  if (existingPatient) {
    const error = new Error("Pasien dengan NIK tersebut sudah terdaftar");

    error.statusCode = 409;

    throw error;
  }

  return patientRepository.createPatient({
    ...data,
    birthdate: new Date(data.birthdate),
  });
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
