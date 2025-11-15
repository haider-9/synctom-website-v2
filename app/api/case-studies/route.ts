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
        title: data.title,
        slug,
        client: data.client,
        industry: data.industry,
        duration: data.duration,
        content: data.content,
        coverImage: data.coverImage,
        logo: data.logo,
        images: data.images || [],
        technologies: data.technologies || [],
        category: data.category,
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
      where: { 
        status: "published"
      },
      orderBy: { createdAt: "desc" }
    });
    
    // Map to ensure category has a default value if null
    const sanitizedCaseStudies = caseStudies.map(study => ({
      ...study,
      category: study.category || "Uncategorized"
    }));
    
    return NextResponse.json({ 
      success: true, 
      caseStudies: sanitizedCaseStudies 
    });
  } catch (error) {
    console.error("Error fetching case studies:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch case studies" },
      { status: 500 }
    );
  }
}
