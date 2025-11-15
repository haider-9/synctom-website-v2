import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    
    const teamMember = await prisma.teamMember.update({
      where: { id },
      data: {
        name: data.name,
        role: data.role,
        bio: data.bio,
        image: data.image,
        linkedin: data.linkedin,
        twitter: data.twitter,
        github: data.github,
        email: data.email,
        order: data.order,
        status: data.status,
      },
    });
    
    return NextResponse.json({ 
      success: true, 
      message: "Team member updated successfully",
      teamMember 
    });
  } catch (error) {
    console.error("Error updating team member:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update team member" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    await prisma.teamMember.delete({
      where: { id },
    });
    
    return NextResponse.json({ 
      success: true, 
      message: "Team member deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting team member:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete team member" },
      { status: 500 }
    );
  }
}
