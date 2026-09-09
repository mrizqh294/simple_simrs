import * as z from "zod";
import { prisma } from "./../config/database.js";

// POST /medical-record

export const createMedicalRecord = async (req, res) => {
  const medicalRecordSchema = z.object({
    doctorId: z.number().int(),
    visitId: z.number().int(),
    bloodTension: z.string().min(1),
    temperature: z.string().min(1),
    height: z.number().positive(),
    weight: z.number().positive(),
    diagnosis: z.string().min(1),
    symptom: z.string().min(1),
    actionPlan: z.string().min(1),
    receipt: z.string().min(1),
  });

  try {
    const currentUserRole = req.current_user_role;

    if (currentUserRole !== "ADMIN" && currentUserRole !== "DOKTER") {
      return res.status(401).json({
        success: false,
        message: "Anda tidak memiliki izin untuk melakukan tindakan ini",
      });
    }

    const {
      doctorId,
      visitId,
      bloodTension,
      temperature,
      height,
      weight,
      diagnosis,
      symptom,
      actionPlan,
      receipt,
    } = req.body;

    const parsedData = medicalRecordSchema.safeParse({
      doctorId,
      visitId,
      bloodTension,
      temperature,
      height,
      weight,
      diagnosis,
      symptom,
      actionPlan,
      receipt,
    });

    if (!parsedData.success) {
      return res.status(400).json({
        success: false,
        message: "Data tidak valid",
        errors: parsedData.error.flatten().fieldErrors,
      });
    }

    const existingMedicalRecord = await prisma.medicalRecord.findUnique({
      where: {
        visitId,
      },
    });

    if (existingMedicalRecord) {
      return res.status(400).json({
        success: false,
        message: "Medical record untuk kunjungan ini sudah tersedia",
      });
    }

    const medicalRecord = await prisma.medicalRecord.create({
      data: {
        doctorId,
        visitId,
        bloodTension,
        temperature,
        height,
        weight,
        diagnosis,
        symptom,
        actionPlan,
        receipt,
      },
    });

    if (medicalRecord) {
        await prisma.visit.update({
            where: {
                id: visitId,
            },
            data : {
                status : "SELESAI"
            }
        })
    }

    return res.status(201).json({
      success: true,
      message: "Medical record berhasil dibuat",
      data: medicalRecord,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server",
    });
  }
};


// GET /medical-record | /medical-record?patientId=id

export const getMedicalRecords = async (req, res) => {
  try {
    const currentUserRole = req.current_user_role;

    if (currentUserRole !== "ADMIN" && currentUserRole !== "DOKTER") {
      return res.status(401).json({
        success: false,
        message: "Anda tidak memiliki izin untuk melakukan tindakan ini",
      });
    }

    const { patientId } = req.query;

    const where = {};

    if (patientId) {
      where.visit = {
        patientId: Number(patientId),
      };
    }

    const medicalRecords = await prisma.medicalRecord.findMany({
      where,
      include: {
        doctor: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        visit: {
          include: {
            patient: {
              select: {
                id: true,
                name: true,
                recordNumber: true,
                nik: true,
                age: true,
                gender: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Data medical records berhasil dimuat",
      data: medicalRecords,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server",
    });
  }
};

