import { prisma } from "./../config/database.js";

export const findQueueByVisitId = async (visitId) => {
  return prisma.queue.findUnique({
    where: {
      visitId: Number(visitId),
    },
  });
};

export const countQueues = async (where) => {
  return await prisma.queue.count({
    where,
  });
};

export const findLastQueueByDate = async (tx, queueDate, poliId ) => {
  const result = await tx.$queryRaw`
    SELECT *
    FROM Queue
    WHERE queueDate = DATE(${queueDate})
    AND poliId = ${poliId}
    ORDER BY queueNumber DESC
    LIMIT 1
    FOR UPDATE
  `;

  return result[0];
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

export const updateQueueStatusbyVisitId = async (tx, id, status) => {
  return tx.queue.update({
    where: {
      visitId: Number(id),
    },
    data: {
      status,
    },
  });
};

export const getQueues = async ({ where, skip, take }) => {
  return prisma.queue.findMany({
    where,
    skip,
    take,

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
