import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import dayjs from "dayjs";

export async function GET() {
  const user = (await prisma.users.findMany({}))[0]; // TODO: Fix this with auth next time

  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const voltageData = await prisma.voltageData.findMany({
    where: {
      module: {
        setup: {
          userId: user.id,
        },
      },
      createdAt: {
        gte: sevenDaysAgo,
      },
    },
    select: {
      createdAt: true,
      data: true,
    },
    orderBy: { createdAt: "desc" },
    take: 1000,
  });

  NextResponse.json({ voltageData });
}
