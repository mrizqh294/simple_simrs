import * as queueRepository from "./../repository/queueRepository.js";

// get data queue
export const getQueues = async ({ page, limit, search }) => {
  const today = new Date();

  const startOfDay = new Date(today);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(today);
  endOfDay.setHours(23, 59, 59, 999);

  const skip = (page - 1) * limit;

  const queueDate = {
    queueDate: {
      gte: startOfDay,
      lte: endOfDay,
    },
  };

  const where = {
    ...queueDate,

    ...(search && {
      visit: {
        patient: {
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
          ],
        },
      },
    }),
  };

  const [queues, total] = await Promise.all([
    queueRepository.getQueues({
      where,
      skip,
      take: limit,
    }),

    queueRepository.countQueues(where),
  ]);

  const [totalQueues, totalCalled, totalWaiting, totalCompleted] =
    await Promise.all([
      queueRepository.countQueues(queueDate),

      queueRepository.countQueues({
        ...queueDate,
        status: "DIPANGGIL",
      }),

      queueRepository.countQueues({
        ...queueDate,
        status: "MENUNGGU",
      }),

      queueRepository.countQueues({
        ...queueDate,
        status: "SELESAI",
      }),
    ]);

  return {
    data: queues,
    stat: {
      totalQueues,
      totalCalled,
      totalWaiting,
      totalCompleted,
    },
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
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
