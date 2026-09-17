import * as patientServices from "./../services/patientServices.js";

// GET /patients
export const getPatients = async (req, res) => {
  try {
    const patients = await patientServices.getPatients();

    return res.status(200).json({
      success: true,
      message: "Data pasien berhasil dimuat",
      data: patients,
    });
  } catch (error) {
    console.error(error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Terjadi kesalahan server",
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
