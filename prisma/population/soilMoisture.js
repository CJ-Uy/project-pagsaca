import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

console.time("timer");

console.log(await prisma.soilMoistureData.deleteMany());

const modules = await prisma.modules.findMany();
const readingTimeStamps = generateTimestampzArray(60); // Read data from the ESP32 every 60 minutes

// Starting parameters
let currentMoisture = 70; // Starting moisture level
const baseIncrement = 0.1; // Base increment for each reading
const maxDailyFluctuation = 3; // Maximum daily fluctuation in percentage points
let dailyFluctuation;

// Function to generate a random number between -1 and 1 with a bias towards extremes
function biasedRandom() {
  const r = Math.random();
  return Math.sign(r - 0.5) * Math.pow(Math.abs(r - 0.5) * 2, 0.5);
}

let prevDate = null;

for (const module of modules) {
  for (const timestamp of readingTimeStamps) {
    const currentDate = new Date(timestamp).toDateString();
    
    // Reset daily fluctuation on new day
    if (currentDate !== prevDate) {
      dailyFluctuation = (biasedRandom() * maxDailyFluctuation);
      prevDate = currentDate;
    }

    // Calculate moisture change with more variability
    const randomFactor = biasedRandom();
    const moistureChange = baseIncrement * (1 + randomFactor * 3) + dailyFluctuation / 24;

    currentMoisture += moistureChange;

    // Add extra noise
    const extraNoise = biasedRandom() * 2;
    let moistureValue = currentMoisture + extraNoise;

    // Ensure the value stays between 0 and 100
    moistureValue = Math.max(0, Math.min(100, moistureValue));

    const soilMoisture = await prisma.soilMoistureData.create({
      data: {
        createdAt: timestamp,
        moduleId: module.id,
        data: parseFloat(moistureValue.toFixed(2)), // Round to 2 decimal places
      },
    });
    console.log(soilMoisture);
  }
}

console.timeEnd("timer");


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