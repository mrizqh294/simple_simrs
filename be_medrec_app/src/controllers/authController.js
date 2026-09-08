import * as z from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "./../config/database.js";
import { createToken } from "./../lib/jwt.js";

export const login = async (req, res) => {
  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email dan password wajib diisi" });
  }

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

  const response = res.status(200).json({
    success: true,
    message: "Login berhasil",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });

  return response;
};

export const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });

  return res.status(200).json({ success: true, message: "Logout berhasil" });
};
