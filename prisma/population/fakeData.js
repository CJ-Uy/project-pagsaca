import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const main = async () => {
  const prisma = new PrismaClient();

  const currentDate = new Date().toString();
  const modules = await prisma.modules.findMany();
  for (const module of modules) {
    for (let i = 0; i < 100; i++) {
      const voltage = await prisma.voltageData.create({
        data: {
          createdAt: faker.date.recent({days: 14, refData: currentDate}),
          moduleId: module.id,
          voltage: faker.number.float({ min: 0, max: 1 }),
        },
      });
      console.log(voltage);

      const waterLevel = await prisma.waterLevelData.create({
        data: {
          createdAt: faker.date.recent({days: 14, refData: currentDate}),
          moduleId: module.id,
          waterLevel: faker.number.int({ min: 0, max: 100 }),
        },
      });
      console.log(waterLevel);
    }
  }
};

main();
