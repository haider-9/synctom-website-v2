import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const teamMembers = await prisma.teamMember.findMany({
      where: { status: "active" },
      orderBy: { order: "asc" },
    });
    
    return NextResponse.json({ 
      success: true, 
      teamMembers 
    });
  } catch (error) {
    console.error("Error fetching team members:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch team members" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const teamMember = await prisma.teamMember.create({
      data: {
        name: data.name,
        role: data.role,
        bio: data.bio,
        image: data.image,
        linkedin: data.linkedin,
        twitter: data.twitter,
        github: data.github,
        email: data.email,
        order: data.order || 0,
        status: "active",
      },
    });
    
    return NextResponse.json({ 
      success: true, 
      message: "Team member added successfully",
      teamMember 
    });
  } catch (error) {
    console.error("Error creating team member:", error);
    return NextResponse.json(
      { success: false, message: "Failed to add team member" },
      { status: 500 }
    );
  }
}
