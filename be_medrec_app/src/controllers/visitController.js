import * as z from "zod";
import { prisma } from "./../config/database.js";
import { getCurrentUser } from "./../lib/auth.js";

const visitSchema = z.object({
  patientId: z.number().int().positive(),
  doctorId: z.number().int().positive(),
  description: z.string().min(2).max(1000),
});

// GET /visits
export const getVisits = async (req, res) => {
  try {
    const visits = await prisma.visits.findMany({
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

    return res.status(200).json({
      success: true,
      visits,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server",
    });
  }
};

// POST /visits
export const createVisit = async (req, res) => {
  try {
    const currentUser = await getCurrentUser(req);
    if (!currentUser) {
      return res.status(403).json({
        success: false,
        message: "Anda tidak memiliki izin untuk melakukan tindakan ini",
      });
    }

    if (currentUser.role !== "ADMIN" && currentUser.role !== "PENDAFTARAN") {
      return res.status(401).json({
        success: false,
        message: "Anda tidak memiliki izin untuk melakukan tindakan ini",
      });
    }

    const { patientId, doctorId, description } = req.body;
    const parsedData = visitSchema.safeParse({
      patientId,
      doctorId,
      description,
    });

    if (!parsedData.success) {
      return res.status(400).json({
        success: false,
        message: "Data tidak valid",
        errors: parsedData.error.flatten().fieldErrors,
      });
    }

    if (!patientId || !doctorId || !description) {
      return res.status(400).json({
        success: false,
        message: "Semua field wajib diisi",
      });
    }

    const receptionistId = currentUser.userId;
    const visit = await prisma.visits.create({
      data: {
        patientId,
        doctorId,
        recepsionistId: Number(receptionistId),
        visitDate: new Date(),
        description,
        status: "WAITING",
      },
    });

    return res.status(201).json({
      success: true,
      message: "Jadwal kunjungan berhasil dibuat",
      visit: {
        id: visit.id,
        patientId: visit.patientId,
        doctorId: visit.doctorId,
        recepsionistId: visit.recepsionistId,
        visitDate: visit.visitDate,
        status: visit.status,
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
