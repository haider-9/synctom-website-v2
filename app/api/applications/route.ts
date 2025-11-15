import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Get or create a guest user for applications
    let guestUser = await prisma.user.findUnique({
      where: { email: "guest@synctom.com" },
    });

    if (!guestUser) {
      guestUser = await prisma.user.create({
        data: {
          email: "guest@synctom.com",
          name: "Guest Applicant",
          role: "user",
        },
      });
    }
    
    // Create application
    const application = await prisma.application.create({
      data: {
        jobId: data.jobId,
        userId: guestUser.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        resume: data.resume,
        coverLetter: data.coverLetter,
        status: "pending",
      },
    });
    
    return NextResponse.json({ 
      success: true, 
      message: "Application submitted successfully",
      application: {
        id: application.id,
        status: application.status,
      }
    });
  } catch (error) {
    console.error("Error creating application:", error);
    return NextResponse.json(
      { success: false, message: "Failed to submit application" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const applications = await prisma.application.findMany({
      include: {
        job: {
          select: {
            title: true,
            location: true,
            type: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    
    return NextResponse.json({ 
      success: true, 
      applications 
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}
