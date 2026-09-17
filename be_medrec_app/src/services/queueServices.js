import * as queueRepository from "./../repository/queueRepository.js";
import * as visitRepository from "./../repository/visitRepository.js";

export const createQueueNumber = async (date) => {
  const lastQueue = await queueRepository.findLastQueueByDate(date);

  let queueNumber = "A001";

  if (lastQueue) {
    const lastNumber = Number(lastQueue.queueNumber.substring(1));

    const nextNumber = lastNumber + 1;

    queueNumber = `A${String(nextNumber).padStart(3, "0")}`;
  }

  return queueNumber;
}

// create queue
export const createQueue = async (data) => {
  const date = new Date();

  const existingVisit = await visitRepository.findVisitById(data.visitId);

  if (!existingVisit) {
    const error = new Error("Data kunjungan tidak ditemukan");
    error.statusCode = 404;
    throw error;
  }

  const existingQueue = await queueRepository.findQueueByVisitId(data.visitId);

  if (existingQueue) {
    const error = new Error("Kunjungan ini sudah memiliki nomor antrean");
    error.statusCode = 409;
    throw error;
  }
  
  const queueNumber = await createQueueNumber(date);

  return queueRepository.createQueue({
    visitId: data.visitId,
    queueNumber,
    queueDate: date,
    status: "MENUNGGU",
  });
};

// get data queue
export const getQueues = async () => {
  const today = new Date();

  const startOfDay = new Date(today);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(today);
  endOfDay.setHours(23, 59, 59, 999);

  return queueRepository.getQueues(startOfDay, endOfDay);
};

// panggil queue
export const callQueue = async (id) => {
  const queue = await queueRepository.findQueueById(id);

  if (!queue) {
    const error = new Error("Data antrean tidak ditemukan");
    error.statusCode = 404;
    throw error;
  }

  if (queue.status !== "MENUNGGU") {
    const error = new Error("Antrean tidak dapat dipanggil");
    error.statusCode = 400;
    throw error;
  }

  return queueRepository.updateQueueStatus(id, "DIPANGGIL");
};

// update status queue
export const updateQueueStatus = async (id, status) => {
  const existingQueue = await queueRepository.findQueueById(id);

  if (!existingQueue) {
    const error = new Error("Data antrean tidak ditemukan");
    error.statusCode = 404;
    throw error;
  }

  return queueRepository.updateQueueStatus(id, status);
};
