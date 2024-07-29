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

  return timestamps.reverse(); // Reverse to simulate from past to present
}

console.time("timer");

const prisma = new PrismaClient();
const module = await prisma.modules.findFirst({
  where: { id: "clyobkzyd0003nwedbirla2c9" },
});
const modules = [module];
const readingTimeStamps = generateTimestampzArray(60); // Read data from the ESP32 every 60 minutes

async function performTransaction(
  module,
  date,
  waterLevel,
  soilMoisture,
  voltage,
  attempt = 1
) {
  try {
    await prisma.$transaction(async (prisma) => {
      // Create voltage data
      const voltageData = await prisma.voltageData.create({
        data: {
          createdAt: date,
          moduleId: module.id,
          data: voltage,
        },
      });
      console.log(voltageData);

      // Create water level data
      const waterLevelData = await prisma.waterLevelData.create({
        data: {
          createdAt: date,
          moduleId: module.id,
          data: waterLevel,
        },
      });
      console.log(waterLevelData);

      // Create soil moisture data
      // const soilMoistureData = await prisma.soilMoistureData.create({
      //   data: {
      //     createdAt: date,
      //     moduleId: module.id,
      //     data: soilMoisture,
      //   },
      // });
      // console.log(soilMoistureData);

      // Watering event
      // if (soilMoisture < 50) {
      //   const wateringAmount = faker.number.float({ min: 0.1, max: 0.3 });
      //   waterLevel += wateringAmount;
      //   soilMoisture = Math.min(100, soilMoisture + 30);

      //   const activity = await prisma.activityLog.create({
      //     data: {
      //       createdAt: date,
      //       moduleId: module.id,
      //       action: "Watered",
      //       description: `Added ${wateringAmount.toFixed(2)} cm of water`,
      //     },
      //   });
      //   console.log(activity);
      // }

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
          description: `0.1 Volts for 5 minutes`,
        },
      });
      console.log(shockActivity);
    });
  } catch (error) {
    console.error(`Transaction failed, retrying... Attempt: ${attempt}`, error);
    const backoffTime = Math.min(1000 * Math.pow(2, attempt), 30000); // Exponential backoff
    await new Promise((resolve) => setTimeout(resolve, backoffTime));
    await performTransaction(
      module,
      date,
      waterLevel,
      soilMoisture,
      voltage,
      attempt + 1
    ); // Retry the transaction
  }
}

async function processModulesInBatches(modules, batchSize) {
  for (let i = 0; i < modules.length; i += batchSize) {
    const batch = modules.slice(i, i + batchSize);
    await Promise.all(
      batch.map(async (module) => {
        let waterLevel = 0;
        let soilMoisture = 50;
        let voltage = 0;

        for (const date of readingTimeStamps) {
          // Simulate gradual increase in water level over days
          waterLevel = Math.min(0.75, waterLevel + 0.002);

          // Simulate gradual decrease in soil moisture
          soilMoisture = Math.max(40, soilMoisture - 0.1);

          // If water level is high, soil moisture should be high
          if (waterLevel > 0.25) {
            soilMoisture = Math.max(soilMoisture, 80);
          }

          // Simulate slight increase in voltage when there's more water
          voltage = waterLevel * 0.2 + faker.number.float({ min: 0.2, max: 2 });

          await performTransaction(
            module,
            date,
            waterLevel,
            soilMoisture,
            voltage
          );
        }
      })
    );
  }
}

await processModulesInBatches(modules, 5); // Adjust batch size as needed

console.timeEnd("timer");
