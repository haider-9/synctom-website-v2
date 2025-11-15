import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    
    const application = await prisma.application.update({
      where: { id },
      data: {
        status: data.status,
      },
    });
    
    return NextResponse.json({ 
      success: true, 
      message: "Application status updated successfully",
      application 
    });
  } catch (error) {
    console.error("Error updating application:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update application status" },
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
    
    await prisma.application.delete({
      where: { id },
    });
    
    return NextResponse.json({ 
      success: true, 
      message: "Application deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting application:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete application" },
      { status: 500 }
    );
  }
}
