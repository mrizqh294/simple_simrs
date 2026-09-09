import { prisma } from "./../config/database.js";

// GET /poli
export const getPoli = async (req, res) => {
  try {
    const currentUserRole = req.current_user_role;

    if (currentUserRole !== "PENDAFTARAN" && currentUserRole !== "ADMIN") {
      return res.status(401).json({
        success: false,
        message: "Anda tidak memiliki izin untuk melakukan tindakan ini",
      });
    }

    const poli = await prisma.poli.findMany();
    return res.status(200).json({
      success: true,
      message : "Data pasien berhasil dimuat",
      data : poli,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server",
    });
  }
};