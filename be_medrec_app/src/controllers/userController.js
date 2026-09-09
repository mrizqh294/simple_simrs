import bcrypt from "bcryptjs";
import * as z from "zod";
import { prisma } from "./../config/database.js";

export const createUser = async (req, res) => {
  try {

    const userSchema = z.object({
      name: z.string().min(2).max(100),
      email: z.string().email(),
      password: z.string().min(6).max(100),
      role: z.enum(["ADMIN", "DOKTER", "PENDAFTARAN"]),
    });

    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Semua field wajib diisi",
      });
    }

    const parsedData = userSchema.safeParse({
      name,
      email,
      password,
      role,
    });

    if (!parsedData.success) {
      return res.status(400).json({
        success: false,
        message: "Data tidak valid",
        errors: parsedData.error.flatten().fieldErrors,
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email sudah terdaftar",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        role,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      success: true,
      message: "User berhasil dibuat",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server",
    });
  }
};

export const getUsers = async (req, res) => {
  try {

    const currentUserRole = req.current_user_role;

    if (currentUserRole !== "ADMIN") {
      return res.status(401).json({
        success: false,
        message: "Anda tidak memiliki izin untuk melakukan tindakan ini",
      });
    }

    const { role } = req.query;

    if (role) {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
        },
        where: {
          role: role,
        },
      });
      return res.status(200).json({
        success: true,
        message: "Data users berhasil dimuat",
        data: users,
      });
    }

    const users = await prisma.user.findMany();
    return res.status(200).json({
      success: true,
      data: users,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server",
    });
  }
};

// GET /users/:id
export const getUserById = async (req, res) => {
  try {

    const currentUserRole = req.current_user_role;

    if (currentUserRole !== "ADMIN") {
      return res.status(401).json({
        success: false,
        message: "Anda tidak memiliki izin untuk melakukan tindakan ini",
      });
    }

    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });

    return res.status(200).json({
      success: true,
      message: "Data user ditemukan",
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server",
    });
  }
};

// DELETE /users/:id
export const deleteUser = async (req, res) => {
  try {
    const currentUserRole = req.current_user_role;

    if (currentUserRole !== "ADMIN") {
      return res.status(401).json({
        success: false,
        message: "Anda tidak memiliki izin untuk melakukan tindakan ini",
      });
    }

    const { id } = req.params;

    const user = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });

    return res.status(200).json({
      success: true,
      message: "Data berhasil dihapus",
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server",
    });
  }
};

// PATCH /users/:id
export const updateUser = async (req, res) => {
    const userSchema = z.object({
      name: z.string().min(2).max(100),
      email: z.string().email(),
      role: z.enum(["ADMIN", "DOKTER", "PENDAFTARAN"]),
    });

  try {
    const currentUserRole = req.current_user_role;

    if (currentUserRole.role !== "ADMIN") {
      return res.status(401).json({
        success: false,
        message: "Anda tidak memiliki izin untuk melakukan tindakan ini",
      });
    }

    const { name, email, role } = req.body;

    const parsedData = userSchema.safeParse({ name, email, role });

    if (!parsedData.success) {
      return res.status(400).json({
        success: false,
        message: "Data tidak valid",
        errors: parsedData.error.flatten().fieldErrors,
      });
    }

    const { id } = req.params;
    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        email,
        role,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Data user berhasil diubah",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server",
    });
  }
};
