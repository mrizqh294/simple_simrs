import * as z from "zod";
import { prisma } from "./../config/database.js";

// GET /patients
export const getPatients = async (req, res) => {
  try {
    const currentUserRole = req.current_user_role;

    if (currentUserRole !== "PENDAFTARAN" && currentUserRole !== "ADMIN") {
      return res.status(401).json({
        success: false,
        message: "Anda tidak memiliki izin untuk melakukan tindakan ini",
      });
    }

    const patients = await prisma.patient.findMany();
    return res.status(200).json({
      success: true,
      message : "Data pasien berhasil dimuat",
      data : patients,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server",
    });
  }
};

// POST /patients
export const createPatient = async (req, res) => {
  const patientSchema = z.object({
    name: z.string().min(2).max(100),
    nik: z.string().min(1).max(16),
    birthdate: z.coerce.date(),
    phone: z.string().min(1).max(16),
    address: z.string().min(10).max(250),
    age: z.number().min(1).max(150),
    gender: z.enum(["L", "P"]),
  });

  try {
    const currentUserRole = req.current_user_role;

    if (currentUserRole !== "ADMIN" && currentUserRole !== "PENDAFTARAN") {
      return res.status(401).json({
        success: false,
        message: "Anda tidak memiliki izin untuk melakukan tindakan ini",
      });
    }

    const { nik, name, age, gender, birthdate, phone, address } = req.body;

    const parsedData = patientSchema.safeParse({
      nik,
      name,
      age,
      gender,
      birthdate,
      phone,
      address,
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

    const patient = await prisma.patient.create({
      data: {
        nik,
        name,
        age,
        gender,
        birthdate: new Date(birthdate),
        phone,
        address,
        recordNumber: recordNumber,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Pasien berhasil dibuat",
      data: patient,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server",
    });
  }
};

// GET /patients/:id
export const getPatientById = async (req, res) => {
  try {
    const currentUserRole = req.current_user_role;

    if (currentUserRole !== "ADMIN" && currentUserRole !== "PENDAFTARAN") {
      return res.status(401).json({
        success: false,
        message: "Anda tidak memiliki izin untuk melakukan tindakan ini",
      });
    }

    const { id } = req.params;

    const patient = await prisma.patient.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Data pasien tidak ditemukan",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Data pasien ditemukan",
      patient,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server",
    });
  }
};

// DELETE /patients/:id
export const deletePatient = async (req, res) => {
  try {
    const currentUserRole = req.current_user_role;

    if (currentUserRole !== "ADMIN" && currentUserRole !== "PENDAFTARAN") {
      return res.status(401).json({
        success: false,
        message: "Anda tidak memiliki izin untuk melakukan tindakan ini",
      });
    }

    const { id } = req.params;

    const patient = await prisma.patient.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Data pasien tidak ditemukan",
      });
    }

    await prisma.patient.delete({
      where: {
        id: Number(id),
      },
    });

    return res.status(200).json({
      success: true,
      message: "Data pasien berhasil dihapus"
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server",
    });
  }
};

// PATCH /patients/:id
export const updatePatient = async (req, res) => {
  const patientSchema = z.object({
    name: z.string().min(2).max(100),
    nik: z.string().min(1).max(16),
    birthdate: z.coerce.date(),
    phone: z.string().min(1).max(16),
    address: z.string().min(10).max(250),
    age: z.number().min(1).max(150),
    gender: z.enum(["L", "P"]),
  });

  try {
    const currentUserRole = req.current_user_role;

    if (currentUserRole !== "ADMIN" && currentUserRole !== "PENDAFTARAN") {
      return res.status(401).json({
        success: false,
        message: "Anda tidak memiliki izin untuk melakukan tindakan ini",
      });
    }

    const { nik, name, age, gender, birthdate, phone, address } = req.body;

    const parsedData = patientSchema.safeParse({
      nik,
      name,
      age,
      gender,
      birthdate,
      phone,
      address,
    });

    if (!parsedData.success) {
      return res.status(400).json({
        success: false,
        message: "Data tidak valid",
        errors: parsedData.error.flatten().fieldErrors,
      });
    }

    const { id } = req.params;

    const patient = await prisma.patient.update({
      where: {
        id: Number(id),
      },
      data: {
        nik,
        name,
        age,
        gender,
        birthdate: new Date(birthdate),
        phone,
        address,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Data pasien berhasil diubah",
      patient,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server",
    });
  }
};
