import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import dayjs from "dayjs";

export async function GET() {
  const user = (await prisma.users.findMany({}))[0]; // TODO: Fix this with auth next time

  const voltageData = await prisma.voltageData.findMany({
    where: {
      moduleId: "clyobkzyd0003nwedbirla2c9",
    },
    select: {
      createdAt: true,
      data: true,
    },
  });

  const waterLevelData = await prisma.waterLevelData.findMany({
    where: {
      moduleId: "clyobkzyd0003nwedbirla2c9",
    },
    select: {
      createdAt: true,
      data: true,
    },
  });

  const soilMoistureLevelData = await prisma.soilMoistureData.findMany({
    where: {
      moduleId: "clyobkzyd0003nwedbirla2c9",
    },
    select: {
      createdAt: true,
      data: true,
    },
  });

  // Create an object to store daily averages
  const averageVoltage = {};

  // Group measurements by date
  voltageData.forEach((entry) => {
    const date = dayjs(new Date(entry.createdAt)).format("MMM DD");

    if (!averageVoltage[date]) {
      averageVoltage[date] = {
        totalVoltage: 0,
        count: 0,
      };
    }
    averageVoltage[date].totalVoltage += entry.data;
    averageVoltage[date].count++;
  });

  // Calculate average for each date
  for (const date in averageVoltage) {
    averageVoltage[date].average = (
      averageVoltage[date].totalVoltage / averageVoltage[date].count
    ).toFixed(2);
    delete averageVoltage[date].totalVoltage;
  }

  // Create an object to store daily averages
  const averageWaterLevel = {};

  // Group measurements by date
  waterLevelData.forEach((entry) => {
    const date = dayjs(new Date(entry.createdAt)).format("MMM DD");

    if (!averageWaterLevel[date]) {
      averageWaterLevel[date] = {
        totalWaterLevel: 0,
        count: 0,
      };
    }
    averageWaterLevel[date].totalWaterLevel += entry.data;
    averageWaterLevel[date].count++;
  });

  // Calculate average for each date
  for (const date in averageWaterLevel) {
    averageWaterLevel[date].average = (
      averageWaterLevel[date].totalWaterLevel / averageWaterLevel[date].count
    ).toFixed(2);
    delete averageWaterLevel[date].totalWaterLevel;
  }

  // Create an object to store daily averages
  const averageSoilMoisture = {};

  // Group measurements by date
  soilMoistureLevelData.forEach((entry) => {
    const date = dayjs(new Date(entry.createdAt)).format("MMM DD");

    if (!averageSoilMoisture[date]) {
      averageSoilMoisture[date] = {
        totalSoilMoisture: 0,
        count: 0,
      };
    }
    averageSoilMoisture[date].totalSoilMoisture += entry.data;
    averageSoilMoisture[date].count++;
  });

  // Calculate average for each date
  for (const date in averageSoilMoisture) {
    averageSoilMoisture[date].average = (
      averageSoilMoisture[date].totalSoilMoisture /
      averageSoilMoisture[date].count
    ).toFixed(2);
    delete averageSoilMoisture[date].totalSoilMoisture;
  }

  // Sorting

  // Convert date strings to actual Date objects and sort chronologically
  const sortedVoltage = Object.keys(averageVoltage)
    .map((date) => ({
      date: dayjs(date, "MMM DD"), // Parse date using Day.js
      ...averageVoltage[date],
    }))
    .sort((a, b) => a.date.diff(b.date))
    .map((entry) => ({
      ...entry,
      date: entry.date.format("MMM DD"), // Format date back to "MMM DD"
    }));

  const sortedWaterLevel = Object.keys(averageWaterLevel)
    .map((date) => ({
      date: dayjs(date, "MMM DD"), // Parse date using Day.js
      ...averageWaterLevel[date],
    }))
    .sort((a, b) => a.date.diff(b.date))
    .map((entry) => ({
      ...entry,
      date: entry.date.format("MMM DD"), // Format date back to "MMM DD"
    }));

  const sortedSoilMoisture = Object.keys(averageSoilMoisture)
    .map((date) => ({
      date: dayjs(date, "MMM DD"), // Parse date using Day.js
      ...averageSoilMoisture[date],
    }))
    .sort((a, b) => a.date.diff(b.date))
    .map((entry) => ({
      ...entry,
      date: entry.date.format("MMM DD"), // Format date back to "MMM DD"
    }));

  return NextResponse.json({
    sortedVoltage,
    sortedWaterLevel,
    sortedSoilMoisture,
  });
}
