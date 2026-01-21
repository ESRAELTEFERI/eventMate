//src/lib/prisma.ts
// import { PrismaClient, Prisma } from "@prisma/client";

// if (!process.env.PRISMA_CLIENT_ENGINE_TYPE) {
//   process.env.PRISMA_CLIENT_ENGINE_TYPE = "binary";
// }

// declare global {
//   var prisma: PrismaClient | undefined;
// }

// const globalForPrisma = global as unknown as {
//   prisma?: PrismaClient;
// };

// export function getPrisma() {
//   if (!globalForPrisma.prisma) {
//     const config: Prisma.PrismaClientOptions & { accelerateUrl?: string } = {
//       log: ["query", "error", "warn"],
//     };
//     if (process.env.PRISMA_ACCELERATE_URL) {
//       config.accelerateUrl = process.env.PRISMA_ACCELERATE_URL;
//     }

//     globalForPrisma.prisma = new PrismaClient(config);
//   }
//   return globalForPrisma.prisma!;
// }

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query", "error", "warn"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
