"use client";

import Image from "next/image";
import { forwardRef } from "react";

interface CertificatePreviewProps {
  formData: {
    name: string;
    duration: string;
    startDate: string;
    endDate: string;
    position: string;
  };
  certificateId?: string | null;
}

const CertificatePreview = forwardRef<HTMLDivElement, CertificatePreviewProps>(
  ({ formData, certificateId }, ref) => {
    const currentDate = new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const refNumber = certificateId || `${new Date().getFullYear()}-INT-XXX`;

    return (
      <div 
        ref={ref}
        id="certificate-preview" 
        className="relative w-full aspect-[8.5/14] bg-white rounded-lg shadow-lg overflow-hidden print:shadow-none print:rounded-none"
      >
      {/* Top Wave - Curves upward and ends before right edge */}
      <div className="absolute top-0 left-0 right-0 h-[32%] pointer-events-none">
        <svg
          viewBox="0 0 2480 1120"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="topGradient" x1="0%" y1="0%" x2="70%" y2="30%">
              <stop offset="0%" style={{ stopColor: "#8a3cfb", stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: "#e74eb9", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "#4eb7ff", stopOpacity: 0.3 }} />
            </linearGradient>
          </defs>
          <path
            d="M -100 -50 L 0 0 L 0 400 Q 620 650 1240 500 Q 1736 380 1736 100 L 1736 -50 Z"
            fill="url(#topGradient)"
          />
        </svg>
      </div>

      {/* Bottom Wave - Curves upward and ends before right edge */}
      <div className="absolute bottom-0 left-0 right-0 h-[32%] pointer-events-none">
        <svg
          viewBox="0 0 2480 1120"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="bottomGradient" x1="0%" y1="100%" x2="70%" y2="70%">
              <stop offset="0%" style={{ stopColor: "#8a3cfb", stopOpacity: 0.9 }} />
              <stop offset="50%" style={{ stopColor: "#e74eb9", stopOpacity: 0.9 }} />
              <stop offset="100%" style={{ stopColor: "#4eb7ff", stopOpacity: 0.25 }} />
            </linearGradient>
          </defs>
          <path
            d="M -100 1170 L 0 1120 L 0 720 Q 620 470 1240 620 Q 1736 740 1736 1020 L 1736 1170 Z"
            fill="url(#bottomGradient)"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 px-12 py-16 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2">
            <Image
              src="/loo.png"
              alt="Synctom"
              width={140}
              height={45}
              className="object-contain"
            />
          </div>
        </div>

        {/* Reference and Date */}
        <div className="flex justify-between text-sm text-gray-500 mb-16">
          <div>
            <span className="font-normal">Ref no</span>
            <span className="ml-3 border-b border-gray-300 inline-block min-w-[140px] pb-1">
              {refNumber}
            </span>
          </div>
          <div>
            <span className="font-normal">Date</span>
            <span className="ml-3 border-b border-gray-300 inline-block min-w-[140px] pb-1 text-right">
              {currentDate}
            </span>
          </div>
        </div>

        {/* Letter Content */}
        <div className="flex-1 space-y-6 text-gray-600 text-[15px]">
          <p className="font-normal">Dear {formData.name || "[Name]"},</p>

          <p className="leading-relaxed text-justify">
            We are pleased to extend this formal offer for the position of{" "}
            <span className="font-medium">{formData.position}</span> at Synctom,
            commencing on{" "}
            <span className="font-medium">
              {formData.startDate
                ? new Date(formData.startDate).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "[Start Date]"}
            </span>
            .
          </p>

          <p className="leading-relaxed text-justify">
            This internship opportunity will allow you to gain practical, hands-on experience in your
            area of interest and contribute meaningfully to impactful, high-quality work. You will collaborate
            with a professional team committed to innovation, continuous growth, and adherence to industry
            leading standards through virtual communication and coordination tools.
          </p>

          <p className="leading-relaxed text-justify">
            You are expected to maintain professionalism, adhere to company policies, and actively
            participate in the assigned tasks and team activities throughout your internship period.
          </p>

          <p className="leading-relaxed text-justify">
            We welcome you to Synctom and look forward to your valuable contributions.
          </p>

          <div className="mt-8 pt-4">
            <p className="font-normal">Sincerely,</p>
            <p className="text-sm mt-1">HR Team</p>
            <p className="text-sm">Synctom</p>
          </div>
        </div>

        {/* Footer with Signature */}
        <div className="mt-auto pt-6">
          <div className="flex justify-end mb-4">
            <div className="text-center">
              <div className="mb-1">
                <Image
                  src="/logo.png"
                  alt="Signature"
                  width={90}
                  height={45}
                  className="object-contain mx-auto"
                />
              </div>
              <div className="border-t border-gray-300 pt-1 mt-2">
                <p className="text-sm text-gray-500">Signature</p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-4 gap-4 text-[11px] text-gray-500 border-t border-gray-200 pt-3">
            <div className="flex items-start gap-1.5">
              <svg className="w-3.5 h-3.5 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
              <span>03144442599</span>
            </div>
            <div className="flex items-start gap-1.5">
              <svg className="w-3.5 h-3.5 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
              <span>info@synctom.com</span>
            </div>
            <div className="flex items-start gap-1.5">
              <svg className="w-3.5 h-3.5 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd"/>
              </svg>
              <span>www.synctom.com</span>
            </div>
            <div className="flex items-start gap-1.5">
              <svg className="w-3.5 h-3.5 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
              </svg>
              <span>Flat-11, Haroon Plaza, I-9/4, Islamabad</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

CertificatePreview.displayName = "CertificatePreview";

export default CertificatePreview;
