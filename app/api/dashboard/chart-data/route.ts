import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get last 6 months data
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const jobs = await prisma.job.findMany({
      where: {
        userId: session.user.id,
        createdAt: { gte: sixMonthsAgo }
      },
      include: {
        _count: {
          select: { applications: true }
        }
      },
      orderBy: { createdAt: "asc" }
    });

    // Group by month
    const monthlyData: Record<string, { jobs: number; applicants: number }> = {};
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    // Initialize last 6 months
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthKey = months[date.getMonth()];
      monthlyData[monthKey] = { jobs: 0, applicants: 0 };
    }

    // Populate with actual data
    jobs.forEach(job => {
      const monthKey = months[job.createdAt.getMonth()];
      if (monthlyData[monthKey]) {
        monthlyData[monthKey].jobs += 1;
        monthlyData[monthKey].applicants += job._count.applications;
      }
    });

    const chartData = Object.entries(monthlyData).map(([month, data]) => ({
      month,
      jobs: data.jobs,
      applicants: data.applicants
    }));

    return NextResponse.json({
      success: true,
      chartData
    });
  } catch (error) {
    console.error("Error fetching chart data:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch chart data" },
      { status: 500 }
    );
  }
}
