import { getCurrentUser } from "../lib/auth.js";
import * as authServices from "./../services/authServices.js"

export const login = async (req, res) => {
  try {
    const result = await authServices.login(req.body);

    res.cookie("token", result.token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Login berhasil",
      data: result.user,
    });

  } catch (error) {
    console.error(error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Terjadi kesalahan pada server",
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
    
    const user = await authServices.getMe(currentUser.userId);

    return res.status(200).json({
      success: true,
      message: "Data user ditemukan",
      data: user,
    });
  } catch (error) {
    console.error(error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Terjadi kesalahan pada server",
    });
  }
};
