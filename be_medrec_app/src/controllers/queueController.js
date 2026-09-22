import * as queueServices from "./../services/queueServices.js"
import { getUserPoli } from "../repository/userPoliRepository.js";
import { getCurrentUser } from "../lib/auth.js";

// POST /queues

export const createQueue = async (req, res) => {
  try {
    const queue = await queueServices.createQueue(req.body);

    return res.status(201).json({
      success: true,
      message: "Data antrean berhasil dibuat",
      data: queue,
    });
  } catch (error) {
    console.error(error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Terjadi kesalahan server",
    });
  }
};

// GET /queues

export const getQueues = async (req, res) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);

    const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 100);

    const search = req.query.search?.trim() || "";

    const filter = req.query.filter?.trim() || "";

    const currentUser = await getCurrentUser(req);

    const userPoli = await getUserPoli(currentUser.userId);
  
    const result = await queueServices.getQueues({ page, limit, search, filter }, userPoli.poliId);

    return res.status(200).json({
      success: true,
      message: "Data antrean berhasil dimuat",
      ...result,
    });
  } catch (error) {
    console.error(error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Terjadi kesalahan server",
    });
  }
};

// PATCH /queues/:id/call

export const callQueue = async (req, res) => {
  try {
    const { id } = req.params;

    const queue = await queueServices.callQueue(id);

    return res.status(200).json({
      success: true,
      message: "Antrean berhasil dipanggil",
      data: queue,
    });
  } catch (error) {
    console.error(error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Terjadi kesalahan server",
    });
  }
};

// PATCH /queues/:id/status

export const updateQueueStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const queue = await queueServices.updateQueueStatus(id, status);

    return res.status(200).json({
      success: true,
      message: "Status antrean berhasil diubah",
      data: queue,
    });
  } catch (error) {
    console.error(error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Terjadi kesalahan server",
    });
  }
};
