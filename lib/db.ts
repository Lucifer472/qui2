import { PrismaClient } from "@prisma/client";
import prismaRandom from "prisma-extension-random";

const prismaClientSingleton = () => {
  return new PrismaClient().$extends(prismaRandom());
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const db = globalThis.prisma ?? prismaClientSingleton();

export default db;

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
