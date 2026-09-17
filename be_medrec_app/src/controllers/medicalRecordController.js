import * as medicalRecordServices from "./../services/medicalRecordServices.js";

// POST /medical-record

export const createMedicalRecord = async (req, res) => {
  try {
    const medicalRecord = await medicalRecordServices.createMedicalRecord(
      req.body,
    );

    return res.status(201).json({
      success: true,
      message: "Medical record berhasil dibuat",
      data: medicalRecord,
    });
  } catch (error) {
    console.error(error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Terjadi kesalahan server",
    });
  }
};

// GET /medical-record | /medical-record?patientId=id

export const getMedicalRecords = async (req, res) => {
  try {
    const { patientId } = req.query;

    const medicalRecords = await medicalRecordServices.getMedicalRecords(patientId);

    return res.status(200).json({
      success: true,
      message: "Data medical records berhasil dimuat",
      data: medicalRecords,
    });
  } catch (error) {
    console.error(error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Terjadi kesalahan server",
    });
  }
};
