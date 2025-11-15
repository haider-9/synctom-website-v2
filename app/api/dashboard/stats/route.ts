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

    // Get counts
    const [jobsCount, applicantsCount, certificatesCount, caseStudiesCount] = await Promise.all([
      prisma.job.count({ where: { userId: session.user.id } }),
      prisma.application.count({
        where: {
          job: { userId: session.user.id }
        }
      }),
      prisma.certificate.count(),
      prisma.caseStudy.count({ where: { userId: session.user.id } })
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        jobsPosted: jobsCount,
        totalApplicants: applicantsCount,
        certificatesGenerated: certificatesCount,
        caseStudies: caseStudiesCount
      }
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
