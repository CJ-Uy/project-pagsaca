import { PrismaClient } from "@prisma/client";

const main = async () => {
  const prisma = new PrismaClient();

  const modules = await prisma.modules.findMany({
    include: {
      voltage: true,
    },
  });
  console.dir(modules, { depth: null });
};

main();
