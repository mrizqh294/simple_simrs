import { prisma } from "./../config/database.js";

export const findVisitById = async (visitId) => {
  return prisma.visit.findUnique({
    where: {
      id: Number(visitId),
    },
  });
};

export const findQueueByVisitId = async (visitId) => {
  return prisma.queue.findUnique({
    where: {
      visitId: Number(visitId),
    },
  });
};

export const findLastQueueByDate = async (queueDate) => {
  return prisma.queue.findFirst({
    where: {
      queueDate,
    },
    orderBy: {
      queueNumber: "desc",
    },
  });
};

export const createQueue = async (data) => {
  return prisma.queue.create({
    data,
  });
};

export const findQueueById = async (id) => {
  return prisma.queue.findUnique({
    where: {
      id: Number(id),
    },
  });
};

export const updateQueueStatus = async (id, status) => {
  return prisma.queue.update({
    where: {
      id: Number(id),
    },
    data: {
      status,
    },
  });
};

export const getQueues = async (startOfDay, endOfDay) => {
  return prisma.queue.findMany({
    where: {
      queueDate: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },

    select: {
      id: true,
      queueNumber: true,
      queueDate: true,
      status: true,

      visit: {
        select: {
          patient: {
            select: {
              id: true,
              name: true,
              recordNumber: true,
            },
          },

          poli: {
            select: {
              id: true,
              name: true,
            },
          },

          doctor: {
            select: {
              id: true,
              name: true,
            },
          },

          status: true,
          visitDate: true,
        },
      },
    },

    orderBy: [
      {
        queueDate: "desc",
      },
      {
        queueNumber: "asc",
      },
    ],
  });
};
