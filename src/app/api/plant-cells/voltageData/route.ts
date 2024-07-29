import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await prisma.voltageData.findMany({
      orderBy: { createdAt: "asc" },
      select: {
        moduleId: true,
        createdAt: true,
        data: true,
      },
    });

    if (!Array.isArray(data)) {
      console.error("Unexpected data format:", data);
      return NextResponse.json(
        { error: "Unexpected data format from database" },
        { status: 500 }
      );
    }

    const formattedData = data.reduce((acc, item) => {
      if (!acc[item.moduleId]) {
        acc[item.moduleId] = [];
      }
      acc[item.moduleId].push({
        timestamp: item.createdAt.getTime(),
        voltage: item.data,
      });
      return acc;
    }, {});

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error("Error fetching voltage data:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching data" },
      { status: 500 }
    );
  }
}
