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

    const applications = await prisma.application.findMany({
      where: {
        job: { userId: session.user.id }
      },
      include: {
        job: {
          select: {
            title: true
          }
        }
      },
      orderBy: { createdAt: "desc" },
      take: 5
    });

    const recentApplicants = applications.map(app => {
      const now = new Date();
      const diff = now.getTime() - app.createdAt.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const days = Math.floor(hours / 24);
      
      let timeAgo;
      if (days > 0) {
        timeAgo = `${days}d ago`;
      } else if (hours > 0) {
        timeAgo = `${hours}h ago`;
      } else {
        timeAgo = "Just now";
      }

      return {
        name: app.name,
        job: app.job.title,
        time: timeAgo,
        status: app.status
      };
    });

    return NextResponse.json({
      success: true,
      recentApplicants
    });
  } catch (error) {
    console.error("Error fetching recent applicants:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch recent applicants" },
      { status: 500 }
    );
  }
}
