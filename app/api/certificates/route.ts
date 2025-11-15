import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getNextSequence, generateCertificateId } from "@/lib/counter";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Get next sequence number
    const sequenceNumber = await getNextSequence("certificate");
    
    // Generate certificate ID
    const certificateId = generateCertificateId(sequenceNumber);
    
    // Create certificate
    const certificate = await prisma.certificate.create({
      data: {
        internName: data.internName,
        internshipTitle: data.internshipTitle,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        duration: data.duration,
        certificateId,
        sequenceNumber,
      },
    });
    
    return NextResponse.json({ 
      success: true, 
      message: "Certificate generated successfully",
      certificate 
    });
  } catch (error) {
    console.error("Error creating certificate:", error);
    return NextResponse.json(
      { success: false, message: "Failed to generate certificate" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const certificates = await prisma.certificate.findMany({
      orderBy: { sequenceNumber: "desc" },
    });
    
    return NextResponse.json({ 
      success: true, 
      certificates 
    });
  } catch (error) {
    console.error("Error fetching certificates:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch certificates" },
      { status: 500 }
    );
  }
}
