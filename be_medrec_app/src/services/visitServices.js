import * as visitRepository from "./../repository/visitRepository.js";

export const getVisits = async () => {
  return visitRepository.getVisits();
};

// create visit
export const createVisit = async (data) => {
  const visitDate = new Date();

  return visitRepository.createVisitWithQueue({
    patientId: data.patientId,
    doctorId: data.doctorId,
    poliId: data.poliId,
    receptionistId: data.receptionistId,
    visitDate,
    description: data.description,
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
