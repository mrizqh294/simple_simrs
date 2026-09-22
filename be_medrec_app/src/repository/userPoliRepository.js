import { prisma } from "./../config/database.js";

export const getUserPoli = async (id) => {
  const userPoli = await prisma.userPoli.findFirst({
    where: {
      userId: id,
    },
  });

  return userPoli;
};
