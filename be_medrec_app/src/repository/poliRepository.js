import { prisma } from "./../config/database.js";

export const getPoli = async () => {

    const poli = await prisma.poli.findMany();

    return poli;

}