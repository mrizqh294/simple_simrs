import { prisma } from "./../config/database.js";

export const findUserByEmail = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
};

export const countUsers = async (where) => {
  return await prisma.user.count({
    where,
  });
};

export const getUsersByRole = async (role, poliId) => {
  const users = await prisma.user.findMany({
    where: {
      role,

      ...(poliId && {
        userPoli: {
          some: {
            poliId: Number(poliId),
          },
        },
      }),
    },
  });

  return users;
};

export const createUser = async (data) => {
  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,

      ...(data.poliIds && {
        userPoli: {
          create: data.poliIds.map((poliId) => ({
            poliId,
          })),
        },
      }),
    },

    include: {
      userPoli: {
        include: {
          poli: true,
        },
      },
    },
  });

  return user;
};

export const getUsers = async ({where, skip, take}) => {
  const users = await prisma.user.findMany({
    where,
    skip,
    take,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    }
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
