import * as z from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "./../config/database.js";
import { createToken } from "./../lib/jwt.js";
import { getCurrentUser } from "../lib/auth.js";

export const login = async (req, res) => {
  try {
    const loginSchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { email, password } = req.body;

    const parsedData = loginSchema.safeParse({ email, password });

    if (!parsedData.success) {
      return res.status(400).json({
        success: false,
        message: "Data tidak valid",
        errors: parsedData.error.flatten().fieldErrors,
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Email atau password salah" });
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Email atau password salah" });
    }

    const token = await createToken({
      userId: user.id,
      role: user.role,
    });

    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Login berhasil",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });

    return res.status(200).json({ success: true, message: "Logout berhasil" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const currentUser = await getCurrentUser(req);

    const user = await prisma.user.findUnique({
      where: {
        id: Number(currentUser.userId),
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User tidak ditemukan",
      });
    }

    return res.status(200).json({
      success: true,
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
