import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const skip = (page - 1) * limit;

  const [activities, totalCount] = await Promise.all([
    prisma.activityLog.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        module: true,
      },
    }),
    prisma.activityLog.count(),
  ]);

  return NextResponse.json({
    recentActivity: activities,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: page,
  });
}
