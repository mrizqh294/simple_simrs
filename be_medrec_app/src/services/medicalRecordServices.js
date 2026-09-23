import * as medicalRecordRepository from "./../repository/medicalRecordRepository.js";

export const getMedicalRecords = async (
  { page, limit, search },
  doctorId,
  patientId,
) => {
  const skip = (page - 1) * limit;

  let where = {};

  if (patientId) {
    where = {
      visit: {
        patientId: Number(patientId),
      },
    };

    const medicalRecords = await medicalRecordRepository.getMedicalRecords({
      where,
    });

    return {
      data: medicalRecords,
    };
  } else if (doctorId) {
    where = {
      doctor: {
        id: Number(doctorId),
      },
    };

    if (search) {
      where = {
        doctor: {
          id: Number(doctorId),
        },
        visit: {
          patient: {
            OR: [
              {
                name: {
                  contains: search,
                },
              },
              {
                nik: {
                  contains: search,
                },
              },
              {
                recordNumber: {
                  contains: search,
                },
              },
            ],
          },
        },
      };
    }
  }

  const [medicalRecords, total] = await Promise.all([
    medicalRecordRepository.getMedicalRecords({
      where,
      skip,
      take: limit,
    }),

    medicalRecordRepository.countMedicalRecords(where),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    data: medicalRecords,
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  };
};

export const createMedicalRecord = async (data) => {
  const existingMedicalRecord =
    await medicalRecordRepository.findMedicalRecordByVisitId(data.visitId);

  if (existingMedicalRecord) {
    const error = new Error(
      "Medical record untuk kunjungan ini sudah tersedia",
    );

    error.statusCode = 409;

    throw error;
  }

  const medicalRecord = await medicalRecordRepository.createMedicalRecord(data);

  return medicalRecord;
};
