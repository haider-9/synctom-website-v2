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
    
    const caseStudy = await prisma.caseStudy.create({
      data: {
        ...data,
        slug,
        images: data.images || [],
        userId: session.user.id,
      }
    });
    
    return NextResponse.json({ 
      success: true, 
      message: "Case study published successfully",
      caseStudy 
    });
  } catch (error) {
    console.error("Error creating case study:", error);
    return NextResponse.json(
      { success: false, message: "Failed to publish case study" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const caseStudies = await prisma.caseStudy.findMany({
      where: { status: "published" },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          }
        }
      },
      orderBy: { createdAt: "desc" }
    });
    
    return NextResponse.json({ 
      success: true, 
      caseStudies 
    });
  } catch (error) {
    console.error("Error fetching case studies:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch case studies" },
      { status: 500 }
    );
  }
}
