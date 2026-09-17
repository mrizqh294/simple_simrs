import * as visitServices from "./../services/visitServices.js";
import { getCurrentUser } from "./../lib/auth.js";

// GET /visits

export const getVisits = async (req, res) => {
  try {
    const visits = await visitServices.getVisits();

    return res.status(200).json({
      success: true,
      visits,
    });
  } catch (error) {
    console.error(error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Terjadi kesalahan server",
    });
  }
};

// POST /visits

export const createVisit = async (req, res) => {
  try {
    const currentUser = await getCurrentUser(req);

    const receptionistId = currentUser.userId;

    const result = await visitServices.createVisit({
      ...req.body,
      receptionistId: Number(receptionistId),
    });

    return res.status(201).json({
      success: true,
      message: "Jadwal kunjungan berhasil dibuat",

      visit: {
        id: result.visit.id,
        patientId: result.visit.patientId,
        doctorId: result.visit.doctorId,
        recepsionistId: result.visit.recepsionistId,
        visitDate: result.visit.visitDate,
        status: result.visit.status,
      },

      queue: {
        id: result.queue.id,
        visitId: result.queue.visitId,
        queueNumber: result.queue.queueNumber,
        queueDate: result.queue.queueDate,
        status: result.queue.status,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Terjadi kesalahan server",
    });
  }
};

// PATCH /visits/:id/status

export const updateVisitStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const { status } = parsedData.data;

    await visitServices.updateVisitStatus(id, status);

    return res.status(200).json({
      success: true,
      message: "Status kunjungan berhasil diubah",
    });
  } catch (error) {
    console.error(error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Terjadi kesalahan server",
    });
  }
};

// PATCH /visits/:id

export const updateVisit = async (req, res) => {
  try {
    const { id } = req.params;

    const visit = await visitServices.updateVisit(id, req.body);

    return res.status(200).json({
      success: true,
      message: "Data kunjungan berhasil diubah",

      visit: {
        id: visit.id,
        patientId: visit.patientId,
        doctorId: visit.doctorId,
        recepsionistId: visit.recepsionistId,
        visitDate: visit.visitDate,
        description: visit.description,
        status: visit.status,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Terjadi kesalahan server",
    });
  }
};
