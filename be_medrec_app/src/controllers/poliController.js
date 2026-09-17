import * as poliRepository from "../repository/poliRepository.js";

// GET /poli
export const getPoli = async (req, res) => {
  try {
    const poli = await poliRepository.getPoli();

    return res.status(200).json({
      success: true,
      message: "Data poli klinik berhasil dimuat",
      data: poli,
    })


  } catch (error) {
    console.error(error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Terjadi kesalahan server",
    });
  }
};