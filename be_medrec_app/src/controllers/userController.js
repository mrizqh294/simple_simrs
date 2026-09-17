import * as userServices from "../services/userServices.js";
import * as userRepository from "../repository/userRepository.js"

export const createUser = async (req, res) => {
  try {
    const user = await userServices.createUser(req.body);

    return res.status(201).json({
      success: true,
      message: "User berhasil dibuat",
      data: user,
    });
  } catch (error) {
    console.log(error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Terjadi kesalahan pada server",
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const { role } = req.query;

    const users = await userRepository.getUsers(role);

    return res.status(200).json({
      success: true,
      message: "Data users berhasil dimuat",
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

// GET /users/:id
export const getUserById = async (req, res) => {
  try {

    const { id } = req.params;

    const user = await userRepository.getUserById(id);

    return res.status(200).json({
      success: true,
      message: "Data user ditemukan",
      data: user,
    });
  } catch (error) {
    console.error(error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Terjadi kesalahan pada server",
    });
  }
};

// DELETE /users/:id
export const deleteUser = async (req, res) => {
  try {

    const { id } = req.params;

    const user = await userRepository.deleteUser(id);

    return res.status(200).json({
      success: true,
      message: "Data berhasil dihapus",
      data: user,
    });
  } catch (error) {
    console.error(error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Terjadi kesalahan pada server",
    });
  }
};

// PATCH /users/:id
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userServices.updateUser(id, req.body);

    return res.status(201).json({
      success: true,
      message: "Data user berhasil diubah",
      user,
    });
  } catch (error) {
    console.error(error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Terjadi kesalahan pada server",
    });
  }
};
