import * as patientServices from "./../services/patientServices.js";
import * as patientRepository from "./../repository/patientRepository.js";

// GET /patients
export const getPatients = async (req, res) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);

    const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 100);

    const search = req.query.search?.trim() || "";

    const result = await patientServices.getPatients({
      page,
      limit,
      search,
    });

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Gagal mengambil data pasien",
    });
  }
};

// POST /patients
export const createPatient = async (req, res) => {
  try {
    const patient = await patientServices.createPatient(req.body);

    return res.status(201).json({
      success: true,
      message: "Pasien berhasil dibuat",
      data: patient,
    });
  } catch (error) {
    console.error(error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Terjadi kesalahan server",
    });
  }
};

// GET /patients/:id
export const getPatientById = async (req, res) => {
  try {
    const { id } = req.params;

    const patient = await patientServices.getPatientById(id);

    return res.status(200).json({
      success: true,
      message: "Data pasien ditemukan",
      data: patient,
    });
  } catch (error) {
    console.error(error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Terjadi kesalahan server",
    });
  }
};

// DELETE /patients/:id
export const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;

    await patientServices.deletePatient(id);

    return res.status(200).json({
      success: true,
      message: "Data pasien berhasil dihapus",
    });
  } catch (error) {
    console.error(error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Terjadi kesalahan server",
    });
  }
};

// PATCH /patients/:id
export const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;

    const patient = await patientServices.updatePatient(id, req.body);

    return res.status(200).json({
      success: true,
      message: "Data pasien berhasil diubah",
      data: patient,
    });
  } catch (error) {
    console.error(error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Terjadi kesalahan server",
    });
  }
};
