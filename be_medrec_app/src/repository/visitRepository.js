import { prisma } from "./../config/database.js";
import * as queueRepository from"./../repository/queueRepository.js"
import { createQueueNumber } from "../lib/queueNumber.js";

export const getVisits = async () => {
  return prisma.visit.findMany({
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

      recepsionist: {
        select: {
          name: true,
        },
      },
    },
  });
};

export const createVisitWithQueue = async ({
  patientId,
  doctorId,
  poliId,
  receptionistId,
  visitDate,
  description,
}) => {
  return prisma.$transaction(async (tx) => {

    // membuat queue number
    const queueDate = new Date(visitDate);
    queueDate.setHours(0, 0, 0, 0);
    const lastQueue = await queueRepository.findLastQueueByDate(tx, queueDate);
    const queueNumber = await createQueueNumber(lastQueue);

    // insert data
    const visit = await tx.visit.create({
      data: {
        patientId,
        doctorId,
        poliId,
        receptionistId,
        visitDate,
        description,
        status: "MENUNGGU",
      },
    });

    const queue = await tx.queue.create({
      data: {
        visitId: visit.id,
        queueNumber,
        queueDate,
        status: "MENUNGGU",
      },
    });

    return {
      visit,
      queue,
    };
  });
};


export const findVisitById = async (id) => {
  return prisma.visit.findUnique({
    where: {
      id: Number(id),
    },
  });
};

export const updateVisitStatus = async (id, status) => {
  return prisma.visit.update({
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
