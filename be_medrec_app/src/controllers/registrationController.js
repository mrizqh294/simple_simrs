import * as registrationServices from "./../services/registrationServices.js";
import { getCurrentUser } from "./../lib/auth.js";

// POST /registration

export const registerPatient = async (req, res) => {
  try {
    const currentUser = await getCurrentUser(req);

    const registration =
      await registrationServices.registerPatient({
        ...req.body,
        recepsionistId: Number(currentUser.userId),
      });

    return res.status(201).json({
      success: true,
      message: "Registrasi pasien berhasil",
      data: registration,
    });
  } catch (error) {
    console.error(error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Terjadi kesalahan server",
    });
  }
};
