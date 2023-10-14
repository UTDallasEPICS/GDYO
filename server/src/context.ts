import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const context = {
  prisma,
};

export default context;
