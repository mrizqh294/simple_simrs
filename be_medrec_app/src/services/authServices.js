import bcrypt from "bcryptjs";
import * as userRepository from "./../repository/userRepository.js";
import { createToken } from "../lib/jwt.js";

export const login = async (data) => {
  const user = await userRepository.findUserByEmail(data.email);

  if (!user) {
    const error = new Error("Email atau password salah");
    error.statusCode = 401;

    throw error;
  }

  const passwordValid = await bcrypt.compare(data.password, user.password);

  if (!passwordValid) {
    const error = new Error("Email atau password salah");
    error.statusCode = 401;

    throw error;
  }

  const token = await createToken({
    userId: user.id,
    role: user.role,
  });

  return {
    user: {
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

export const getMe = async (id) => {

  const user = await userRepository.findUserById(id);

  if (!user) {
    const error = new Error("User tidak ditemukan");
    error.statusCode = 401;

    throw error;
  }

  return {
      id : user.id,
      name : user.name,
      email : user.email,
      role : user.role,
    };
};
