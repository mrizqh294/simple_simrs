import { prisma } from "./../config/database.js";

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
  queueNumber,
}) => {
  return prisma.$transaction(async (tx) => {
    const visit = await tx.visit.create({
      data: {
        patientId,
        doctorId,
        poliId,
        recepsionistId: receptionistId,
        visitDate,
        description,
        status: "MENUNGGU",
      },
    });

    const queueDate = new Date(visitDate);

    queueDate.setHours(0, 0, 0, 0);

    const queue = await tx.queue.create({
      data: {
        visitId: visit.id,
        queueNumber,
        queueDate: visitDate,
        status: "MENUNGGU",
      },
    });

    return {
      visit,
      queue,
    };
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
