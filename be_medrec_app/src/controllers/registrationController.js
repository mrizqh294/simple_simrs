import * as z from "zod";
import { prisma } from "./../config/database.js";


// POST /registration

export const registerPatient = async (req, res) => {
  const registrationSchema = z.object({
    nik: z.string().min(1),
    name: z.string().min(2).max(100),
    age: z.number().int().min(0),
    gender: z.enum(["L", "P"]),
    birthdate: z.coerce.date(),
    phone: z.string().min(1),
    address: z.string().min(1),
    doctorId: z.number().int(),
    poliId: z.number().int(),
    recepsionistId: z.number().int(),
    visitDate: z.coerce.date(),
    description: z.string().min(1),
  });

  try {
    const currentUserRole = req.current_user_role;

    if (currentUserRole !== "ADMIN" && currentUserRole !== "PENDAFTARAN") {
      return res.status(401).json({
        success: false,
        message: "Anda tidak memiliki izin untuk melakukan tindakan ini",
      });
    }

    const {
      nik,
      name,
      age,
      gender,
      birthdate,
      phone,
      address,
      doctorId,
      poliId,
      recepsionistId,
      visitDate,
      description,
    } = req.body;

    const parsedData = registrationSchema.safeParse({
      nik,
      name,
      age,
      gender,
      birthdate,
      phone,
      address,
      doctorId,
      poliId,
      recepsionistId,
      visitDate,
      description,
    });

    if (!parsedData.success) {
      return res.status(400).json({
        success: false,
        message: "Data tidak valid",
        errors: parsedData.error.flatten().fieldErrors,
      });
    }

    const existingPatient = await prisma.patient.findUnique({
      where: {
        nik,
      },
    });

    if (existingPatient) {
      return res.status(400).json({
        success: false,
        message: "Pasien dengan NIK tersebut sudah terdaftar",
      });
    }

    const lastPatient = await prisma.patient.findFirst({
      orderBy: {
        id: "desc",
      },
    });

    const nextNumber = lastPatient ? lastPatient.id + 1 : 1;

    const recordNumber = `RM-${new Date().getFullYear()}-${String(
      nextNumber,
    ).padStart(6, "0")}`;

    const existingRecordNumber = await prisma.patient.findUnique({
      where: {
        recordNumber,
      },
    });

    if (existingRecordNumber) {
      return res.status(400).json({
        success: false,
        message: "Nomor rekam medis sudah digunakan",
      });
    }

    const doctor = await prisma.user.findUnique({
      where: {
        id: doctorId,
      },
    });

    if (!doctor || doctor !== "DOKTER") {
      return res.status(404).json({
        success: false,
        message: "Dokter tidak ditemukan",
      });
    }

    const poli = await prisma.poli.findUnique({
      where: {
        id: poliId,
      },
    });

    if (!poli) {
      return res.status(404).json({
        success: false,
        message: "Poli tidak ditemukan",
      });
    }

    const recepsionist = await prisma.user.findUnique({
      where: {
        id: recepsionistId,
      },
    });

    if (!recepsionist || recepsionist !== "PENDAFTARAN") {
      return res.status(404).json({
        success: false,
        message: "Petugas pendaftaran tidak ditemukan",
      });
    }

    const registration = await prisma.$transaction(async (tx) => {
      const patient = await tx.patient.create({
        data: {
          nik,
          name,
          age,
          gender,
          birthdate,
          phone,
          address,
          recordNumber,
        },
      });

      const visit = await tx.visit.create({
        data: {
          patientId: patient.id,
          doctorId,
          poliId,
          recepsionistId,
          visitDate,
          description,
          status: "MENUNGGU",
        },
      });

      const lastQueue = await tx.queue.findFirst({
        where: {
          queueDate: visitDate,
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
        patient,
        visit,
        queue,
      };
    });

    return res.status(201).json({
      success: true,
      message: "Registrasi pasien berhasil",
      data: registration,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server",
    });
  }
};

// GET /registration

export const getVisits = async (req, res) => {
  try {
    const currentUserRole = req.current_user_role;

    if (currentUserRole !== "ADMIN" && currentUserRole !== "PENDAFTARAN") {
      return res.status(401).json({
        success: false,
        message: "Anda tidak memiliki izin untuk melakukan tindakan ini",
      });
    }

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

// PATCH registtration/:id

export const updateVisit = async (req, res) => {
  try {
    const currentUserRole = req.current_user_role;

    if (currentUserRole !== "ADMIN" && currentUserRole !== "PENDAFTARAN") {
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

    const { id } = req.params;

    const existingVisit = await prisma.visits.findUnique({
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

    const visit = await prisma.visits.update({
      where: {
        id: Number(id),
      },
      data: {
        patientId,
        doctorId,
        description,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Data kunjungan berhasil diubah",
      visit: {
        id: visit.id,
        patientId: visit.patientId,
        doctorId: visit.doctorId,
        recepsionistId: visit.recepsionistId,
        visitDate: visit.visitDate,
        description: visit.description,
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
