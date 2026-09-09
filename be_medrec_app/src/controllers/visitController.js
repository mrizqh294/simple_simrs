import * as z from "zod";
import { prisma } from "./../config/database.js";
import { getCurrentUser } from "../lib/auth.js";

// POST /visits
export const createVisit = async (req, res) => {
  const visitSchema = z.object({
    patientId: z.number().int().positive(),
    doctorId: z.number().int().positive(),
    poliId: z.number().int().positive(),
    description: z.string().min(2).max(1000),
  });

  try {
    const currentUserRole = req.current_user_role;

    if (currentUserRole !== "ADMIN" && currentUserRole !== "PENDAFTARAN") {
      return res.status(401).json({
        success: false,
        message: "Anda tidak memiliki izin untuk melakukan tindakan ini",
      });
    }

    const { patientId, doctorId, poliId, description } = req.body;

    const parsedData = visitSchema.safeParse({
      patientId,
      doctorId,
      poliId,
      description,
    });

    if (!parsedData.success) {
      return res.status(400).json({
        success: false,
        message: "Data tidak valid",
        errors: parsedData.error.flatten().fieldErrors,
      });
    }

    const currentUser = await getCurrentUser(req);

    const receptionistId = currentUser.userId;

    const visitDate = new Date();

    const result = await prisma.$transaction(async (tx) => {
      const visit = await tx.visit.create({
        data: {
          patientId,
          doctorId,
          poliId,
          recepsionistId: Number(receptionistId),
          visitDate: visitDate,
          description,
          status: "MENUNGGU",
        },
      });

      const queueDate = new Date();

      queueDate.setHours(0, 0, 0, 0);

      const lastQueue = await tx.queue.findFirst({
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

    return res.status(201).json({
      success: true,
      message: "Jadwal kunjungan berhasil dibuat",
      visit: {
        id: result.visit.id,
        patientId: result.visit.patientId,
        doctorId: result.visit.doctorId,
        recepsionistId: result.visit.recepsionistId,
        visitDate: result.visit.visitDate,
        status: result.visit.status,
      },
      queue: {
        id: result.queue.id,
        visitId: result.queue.visitId,
        queueNumber: result.queue.queueNumber,
        queueDate: result.queue.queueDate,
        status: result.queue.status,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server",
    });
  }
};

// PATCH /visits/:id/status
export const updateVisitStatus = async (req, res) => {
  const statusSchema = z.object({
    status: z.enum(["MENUNGGU", "CHECK_IN", "PEMERIKSAAN", "SELESAI", "BATAL"]),
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

    const parsedData = statusSchema.safeParse({
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

    const existingVisit = await prisma.visit.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existingVisit) {
      return res.status(404).json({
        success: false,
        message: "Data kunjungan tidak ditemukan",
      });
    }

    await prisma.visit.update({
      where: {
        id: Number(id),
      },
      data: {
        status,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Status kunjungan berhasil diubah",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server",
    });
  }
};
