import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

console.time("timer");

console.log(await prisma.voltageData.deleteMany());
console.log(await prisma.waterLevelData.deleteMany());
console.log(await prisma.soilMoistureData.deleteMany());
console.log(await prisma.activityLog.deleteMany());

console.timeEnd("timer");
