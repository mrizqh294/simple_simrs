import * as queueServices from "./../services/queueServices.js"

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
    const queues = await queueServices.getQueues();

    return res.status(200).json({
      success: true,
      message: "Data antrean berhasil dimuat",
      data: queues,
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
