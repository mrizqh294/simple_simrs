import * as visitRepository from "./../repository/visitRepository.js";

export const getVisits = async ({ page, limit, filter }, userId, role) => {
  const today = new Date();

  const skip = (page - 1) * limit;

  const startOfDay = new Date(today);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(today);
  endOfDay.setHours(23, 59, 59, 999);

  let where = {};

  if (role === "DOKTER") {
    where = {
      doctorId: userId,
      visitDate: {
        gte: startOfDay,
        lte: endOfDay,
      },
    };

    if (filter) {
      where.status = filter;
    }
  } else if (role === "PENDAFTARAN") {
    where = {
      receptionistId: userId,
    };
  }

  const [visits, total] = await Promise.all([
    visitRepository.getVisits({
      where,
      skip,
      take: limit,
    }),

    visitRepository.countVisit(where),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    data: visits,
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  };
};

// create visit
export const createVisit = async (data) => {
  const visitDate = new Date();

  return visitRepository.createVisit({
    patientId: data.patientId,
    doctorId: data.doctorId,
    poliId: data.poliId,
    receptionistId: Number(data.receptionistId),
    description: data.description,
    visitDate,
  });
};

export const updateVisit = async (id, data) => {
  const existingVisit = await visitRepository.findVisitById(id);

  if (!existingVisit) {
    const error = new Error("Data kunjungan tidak ditemukan");

    error.statusCode = 404;

    throw error;
  }

  return visitRepository.updateVisit(id, {
    patientId: data.patientId,
    doctorId: data.doctorId,
    description: data.description,
  });
};

// update visists status
export const updateVisitStatus = async (id, status) => {
  const existingVisit = await visitRepository.findVisitById(id);

  if (!existingVisit) {
    const error = new Error("Data kunjungan tidak ditemukan");
    error.statusCode = 404;
    throw error;
  }

  return visitRepository.updateVisitStatus(id, status);
};
