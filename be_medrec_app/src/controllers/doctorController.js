import * as userRepository from "../repository/userRepository.js";

export const getDoctors = async (req, res) => {
  try {
    const poliId = req.query.poliId;

    const users = await userRepository.getUsersByRole("DOKTER", poliId);

    return res.status(200).json({
      success: true,
      message: "Data dokter berhasil dimuat",
      data: users,
    });
  } catch (error) {
    console.error(error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Terjadi kesalahan pada server",
    });
  }
};
