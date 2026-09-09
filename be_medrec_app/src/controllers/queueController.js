import * as z from "zod";
import { prisma } from "./../config/database.js";

// POST /queues

export const createQueue = async (req, res) => {
  const queueSchema = z.object({
    visitId: z.number().int(),
    queueDate: z.coerce.date(),
  });

  try {
    const currentUserRole = req.current_user_role;

    if (currentUserRole !== "ADMIN" && currentUserRole !== "PENDAFTARAN") {
      return res.status(401).json({
        success: false,
        message: "Anda tidak memiliki izin untuk melakukan tindakan ini",
      });
    }

    const { visitId, queueDate } = req.body;

    if (!visitId || !queueDate) {
      return res.status(400).json({
        success: false,
        message: "Semua field wajib diisi",
      });
    }

    const parsedData = queueSchema.safeParse({
      visitId,
      queueDate,
    });

    if (!parsedData.success) {
      return res.status(400).json({
        success: false,
        message: "Data tidak valid",
        errors: parsedData.error.flatten().fieldErrors,
      });
    }

    const existingVisit = await prisma.visit.findUnique({
      where: {
        id: visitId,
      },
    });

    if (!existingVisit) {
      return res.status(404).json({
        success: false,
        message: "Data kunjungan tidak ditemukan",
      });
    }

    const existingQueue = await prisma.queue.findUnique({
      where: {
        visitId,
      },
    });

    if (existingQueue) {
      return res.status(400).json({
        success: false,
        message: "Kunjungan ini sudah memiliki nomor antrean",
      });
    }

    const lastQueue = await prisma.queue.findFirst({
      where: {
        queueDate,
      },
      orderBy: {
        queueNumber: "desc",
      },
    });

    let queueNumber = "A001";

    if (lastQueue) {
      const lastNumber = Number(lastQueue.queueNumber.substring(1));
      const nextNumber = lastNumber + 1;

      queueNumber = `A${String(nextNumber).padStart(3, "0")}`;
    }

    const queue = await prisma.queue.create({
      data: {
        visitId,
        queueNumber,
        queueDate,
        status: "MENUNGGU",
      },
    });

    return res.status(201).json({
      success: true,
      message: "Data antrean berhasil dibuat",
      data: queue,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server",
    });
  }
};

// GET /queues

export const getQueues = async (req, res) => {
  try {
    const currentUserRole = req.current_user_role;

    if (
      currentUserRole !== "ADMIN" &&
      currentUserRole !== "DOKTER" &&
      currentUserRole !== "PENDAFTARAN"
    ) {
      return res.status(401).json({
        success: false,
        message: "Anda tidak memiliki izin untuk melakukan tindakan ini",
      });
    }

    const queues = await prisma.queue.findMany({
      include: {
        visit: true,
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

    return res.status(200).json({
      success: true,
      message: "Data antrean berhasil dimuat",
      data: queues,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server",
    });
  }
};

// PATCH /queues/:id/call
export const callQueue = async (req, res) => {
  try {
    const currentUserRole = req.current_user_role;

    if (currentUserRole !== "ADMIN" && currentUserRole !== "DOKTER") {
      return res.status(401).json({
        success: false,
        message: "Anda tidak memiliki izin untuk melakukan tindakan ini",
      });
    }

    const { id } = req.params;

    const queue = await prisma.queue.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!queue) {
      return res.status(404).json({
        success: false,
        message: "Data antrean tidak ditemukan",
      });
    }

    if (queue.status !== "MENUNGGU") {
      return res.status(400).json({
        success: false,
        message: "Antrean tidak dapat dipanggil",
      });
    }

    const updatedQueue = await prisma.queue.update({
      where: {
        id: Number(id),
      },
      data: {
        status: "DIPANGGIL",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Antrean berhasil dipanggil",
      data: updatedQueue,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server",
    });
  }
};

// PATCH /queues/:id/status
export const updateQueueStatus = async (req, res) => {
  const queueSchema = z.object({
    status: z.enum(["MENUNGGU", "DIPANGGIL", "SELESAI", "BATAL"]),
  });

  try {
    const currentUserRole = req.current_user_role;

    if (
      currentUserRole !== "ADMIN" &&
      currentUserRole !== "DOKTER" &&
      currentUserRole !== "PENDAFTARAN"
    ) {
      return res.status(401).json({
        success: false,
        message: "Anda tidak memiliki izin untuk melakukan tindakan ini",
      });
    }

    const { status } = req.body;

    const parsedData = queueSchema.safeParse({
      status,
    });

    if (!parsedData.success) {
      return res.status(400).json({
        success: false,
        message: "Data tidak valid",
        errors: parsedData.error.flatten().fieldErrors,
      });
    }

    const { id } = req.params;

    const existingQueue = await prisma.queue.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existingQueue) {
      return res.status(404).json({
        success: false,
        message: "Data antrean tidak ditemukan",
      });
    }

    const queue = await prisma.queue.update({
      where: {
        id: Number(id),
      },
      data: {
        status,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Status antrean berhasil diubah",
      data: queue,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server",
    });
  }
};
