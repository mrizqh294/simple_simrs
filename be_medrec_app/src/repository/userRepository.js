import { prisma } from "./../config/database.js";

export const findUserByEmail = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
};

export const createUser = async (data) => {
  const user = await prisma.user.create({
    data,
  });

  return user;
};

export const getUsers = async (role) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      role: true,
    },
    where: role
      ? {
          role: role,
        }
      : undefined,
  });

  return users;
};

export const findUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });

  return user;
};

export const deleteUser = async (id) => {
  const user = await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });

  return user;
};

export const updateUser = async (id, data) => {
  const user = await prisma.user.update({
    where: {
      id: Number(id),
    },
    data,
  });

  return user;
};
