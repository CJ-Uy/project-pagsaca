import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

function generateTimestampzArray(intervalMinutes) {
  const timestamps = [];
  const now = new Date();

  for (let daysAgo = 0; daysAgo < 7; daysAgo++) {
    const currentDate = new Date(now);
    currentDate.setDate(currentDate.getDate() - daysAgo);

    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += intervalMinutes) {
        const timestamp = new Date(currentDate);
        timestamp.setHours(hour, minute);
        timestamps.push(timestamp.toISOString());
      }
    }
  }

  return timestamps;
}

const main = async () => {
  const prisma = new PrismaClient();
  const modules = await prisma.modules.findMany();
  const readingTimeStamps = generateTimestampzArray(30); // Read data from the ESP32 every 30 minutes

  for (const module of modules) {
    for (const date of readingTimeStamps) {
      const voltage = await prisma.voltageData.create({
        data: {
          createdAt: date,
          moduleId: module.id,
          data: faker.number.int({ min: 0, max: 80 }),
        },
      });
      console.log(voltage);

      const waterLevel = await prisma.waterLevelData.create({
        data: {
          createdAt: date,
          moduleId: module.id,
          data: faker.number.int({ min: 1950, max: 4095 }),
        },
      });
      console.log(waterLevel);

      const soilMoisture = await prisma.soilMoistureData.create({
        data: {
          createdAt: date,
          moduleId: module.id,
          data: faker.number.int({ min: 4000, max: 4095 }),
        },
      });
      console.log(soilMoisture);

      if (waterLevel.data < 2000) {
        const activity = await prisma.activityLog.create({
          data: {
            createdAt: date,
            moduleId: module.id,
            action: "Watered",
            description: "No Issues",
          },
        });
        console.log(activity);
      }

      const readActivity = await prisma.activityLog.create({
        data: {
          createdAt: date,
          moduleId: module.id,
          action: "Read Data",
          description: "Voltage, Water Level, and Soil Moisture",
        },
      });
      console.log(readActivity);

      const shockActivity = await prisma.activityLog.create({
        data: {
          createdAt: date,
          moduleId: module.id,
          action: "Applied Electroculture",
          description: "0.1 Volts for 5 minutes",
        },
      });
      console.log(shockActivity);
    }
  }
};

console.time("timer");
main();
console.timeEnd("timer");
