import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      inquiryPurpose,
      description,
      fullName,
      email,
      organization,
      phoneNumber,
      message,
      // For the contact-form component
      firstName,
      lastName,
      budget,
      companyName,
      projectType
    } = body;

    // Create transporter
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Determine which form was submitted and create appropriate email content
    let emailSubject = '';
    let emailHtml = '';

    if (inquiryPurpose) {
      // Contact page form
      emailSubject = `New Contact Form Submission - ${inquiryPurpose}`;
      emailHtml = `
        <h2>New Contact Form Submission</h2>
        <p><strong>Inquiry Purpose:</strong> ${inquiryPurpose}</p>
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Organization:</strong> ${organization}</p>
        <p><strong>Phone Number:</strong> +92 ${phoneNumber}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p><em>Submitted at: ${new Date().toLocaleString()}</em></p>
      `;
    } else {
      // Contact form component
      emailSubject = `New Contact Form Submission - ${projectType || 'General Inquiry'}`;
      emailHtml = `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> +92 ${phoneNumber}</p>
        <p><strong>Company:</strong> ${companyName}</p>
        <p><strong>Budget:</strong> ${budget}</p>
        <p><strong>Project Type:</strong> ${projectType}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p><em>Submitted at: ${new Date().toLocaleString()}</em></p>
      `;
    }

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: emailSubject,
      html: emailHtml,
    });

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { message: 'Failed to send email' },
      { status: 500 }
    );
  }
}