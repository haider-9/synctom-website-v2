import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const data = await request.json();
    
    // Generate slug from title
    const slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    const job = await prisma.job.create({
      data: {
        ...data,
        slug,
        deadline: new Date(data.deadline),
        userId: session.user.id,
      }
    });
    
    return NextResponse.json({ 
      success: true, 
      message: "Job posted successfully",
      job 
    });
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json(
      { success: false, message: "Failed to post job" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      where: { status: "active" },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          }
        },
        _count: {
          select: { applications: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });
    
    return NextResponse.json({ 
      success: true, 
      jobs 
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}
