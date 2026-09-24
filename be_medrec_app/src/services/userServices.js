import bcrypt from "bcryptjs";
import * as userRepository from "../repository/userRepository.js";

export const getUsers = async ({ page, limit, search, filter }) => {
  const skip = (page - 1) * limit;
  
  const where = {
    ...(filter && {
      role: filter,
    }),

    ...(search && {
      OR: [
        {
          name: {
            contains: search,
          },
        },
        {
          email: {
            contains: search,
          },
        },
      ],
    }),
  };

  const [users, total] = await Promise.all([
    userRepository.getUsers({
      where,
      skip,
      take: limit,
    }),

    userRepository.countUsers(where),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    data: users,
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  };
};

export const createUser = async (data) => {
  const existingUser = await userRepository.findUserByEmail(data.email);

  if (existingUser) {
    const error = new Error("Email sudah terdaftar");
    error.statusCode = 409;

    throw error;
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  return userRepository.createUser({
    ...data,
    password: hashedPassword,
  });
};

export const updateUser = async (data, id) => {
  const existingUser = await userRepository.findUserByEmail(data.email);

  if (existingUser && existingUser.id !== Number(id)) {
    const error = new Error("Email sudah terdaftar");
    error.statusCode = 409;

    throw error;
  }

  return userRepository.updateUser(id, data);
};
