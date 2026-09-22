import { prisma } from "./../config/database.js";
import * as queueRepository from "./../repository/queueRepository.js";
import { createQueueNumber } from "../lib/queueNumber.js";

export const getVisits = async ({ where, skip, take }) => {
  return prisma.visit.findMany({
    where,
    skip,
    take,
    include: {
      patient: {
        select: {
          name: true,
          recordNumber: true,
          age: true,
          gender: true,
        },
      },

      doctor: {
        select: {
          name: true,
        },
      },

      receptionist: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const countVisit = async (where) => {
  return await prisma.visit.count({
    where,
  });
};

export const createVisitWithQueue = async (tx, visitData) => {
  const visit = await tx.visit.create({
    data: {
      ...visitData,
    },
  });

  const queueDate = new Date(visit.visitDate);

  queueDate.setHours(0, 0, 0, 0);

  const lastQueue = await queueRepository.findLastQueueByDate(
    tx,
    queueDate,
    visit.poliId,
  );

  const queueNumber = await createQueueNumber(lastQueue, visit.poliId);

  const queue = await tx.queue.create({
    data: {
      queueNumber,
      queueDate,
      status: "MENUNGGU",

      visit: {
        connect: {
          id: visit.id,
        },
      },

      poli: {
        connect: {
          id: visit.poliId,
        },
      },
    },
  });

  return {
    visit,
    queue,
  };
};

export const createVisit = async (visitData) => {
  const result = await prisma.$transaction(async (tx) => {
    return createVisitWithQueue(tx, visitData);
  });

  return result;
};

export const findVisitById = async (id) => {
  return prisma.visit.findUnique({
    where: {
      id: Number(id),
    },
  });
};

export const updateVisitStatus = async (tx, id, status) => {
  return tx.visit.update({
    where: {
      id: Number(id),
    },
    data: {
      status,
    },
  });
};

export const updateVisit = async (id, data) => {
  return prisma.visit.update({
    where: {
      id: Number(id),
    },
    data,
  });
};
