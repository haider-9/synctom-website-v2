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

    const jobs = await prisma.job.findMany({
      where: {
        userId: session.user.id,
        status: "active"
      },
      include: {
        _count: {
          select: { applications: true }
        }
      },
      orderBy: { createdAt: "desc" },
      take: 3
    });

    const activeJobs = jobs.map(job => {
      const now = new Date();
      const diff = now.getTime() - job.createdAt.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const weeks = Math.floor(days / 7);
      
      let posted;
      if (weeks > 0) {
        posted = `${weeks} week${weeks > 1 ? 's' : ''} ago`;
      } else if (days > 0) {
        posted = `${days} day${days > 1 ? 's' : ''} ago`;
      } else {
        posted = "Today";
      }

      return {
        id: job.id,
        title: job.title,
        applicants: job._count.applications,
        location: job.location,
        posted
      };
    });

    return NextResponse.json({
      success: true,
      activeJobs
    });
  } catch (error) {
    console.error("Error fetching active jobs:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch active jobs" },
      { status: 500 }
    );
  }
}
