import { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ProcessSection from "@/components/process-section";
import {
  SiFigma,
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiTailwindcss,
  SiReact,
  SiHtml5,
  SiNextdotjs,
  SiJavascript,
  SiExpress,
  SiMongodb,
  SiMysql,
} from "react-icons/si";
import CTASection from "@/components/cta-section";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Portfolio | Synctom - Creative Projects That Inspire Innovation",
  description:
    "Explore how Synctom's design and technology solutions have empowered businesses to scale, connect, and succeed.",
  keywords: [
    "portfolio",
    "web development",
    "UI/UX design",
    "app development",
    "AI solutions",
    "digital marketing",
    "restaurant management platform",
    "business solutions",
    "React",
    "Next.js",
    "Figma",
    "MongoDB",
    "Express.js",
    "Synctom projects"
  ],
  authors: [{ name: "Synctom" }],
  creator: "Synctom",
  publisher: "Synctom",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://synctom.com/portfolio",
    title: "Portfolio | Synctom - Creative Projects That Inspire Innovation",
    description:
      "Explore how Synctom's design and technology solutions have empowered businesses to scale, connect, and succeed.",
    siteName: "Synctom",
    images: [
      {
        url: "/portfolio-og-image.png",
        width: 1200,
        height: 630,
        alt: "Synctom Portfolio - Creative Projects That Inspire Innovation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Synctom - Creative Projects That Inspire Innovation",
    description:
      "Explore how Synctom's design and technology solutions have empowered businesses to scale, connect, and succeed.",
    images: ["/portfolio-og-image.png"],
    creator: "@synctom",
  },
  alternates: {
    canonical: "https://synctom.com/portfolio",
  },
  category: "Technology",
};

export default function PortfolioPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Creative Projects That Inspire{" "}
            <span className="block mt-2">Innovation</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-10 md:mb-12 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto px-4 sm:px-0">
            Explore how Synctom's design and technology solutions have empowered
            businesses to scale, connect, and succeed
          </p>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-12 sm:mb-14 md:mb-16 px-2 sm:px-0">
            <Button variant="gradient" className="px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-lg text-xs sm:text-sm md:text-base">
              UI/UX Designing
            </Button>
            <Button variant="gradient" className="px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-lg text-xs sm:text-sm md:text-base">
              Web Development
            </Button>
            <Button variant="gradient" className="px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-lg text-xs sm:text-sm md:text-base">
              App Development
            </Button>
            <Button variant="gradient" className="px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-lg text-xs sm:text-sm md:text-base">
              AI Solutions
            </Button>
            <Button variant="gradient" className="px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-lg text-xs sm:text-sm md:text-base">
              Social Media
            </Button>
            <Button variant="gradient" className="px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-lg text-xs sm:text-sm md:text-base">
              Digital Marketing
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
            {/* First Column - Project Info */}
            <div className="space-y-6 sm:space-y-8 lg:col-span-1 order-1 md:order-1">
              {/* Title Section */}
              <div className="relative bg-white clipped-div p-4 sm:p-6 rounded-lg border">
                <h2 className="text-2xl font-bold text-gray-900 pr-12 sm:pr-16">
                  Diniiz : A Restaurant Management Platform
                </h2>
                <div className="absolute bottom-[-0.5px] right-[-1px] rounded-tl-xl border-t border-s bg-white py-2 px-6">
                  <Image
                    src="/diniiz.png"
                    alt="Diniiz Logo"
                    width={50}
                    height={40}
                    className="rounded-lg"
                  />
                </div>
              </div>

              {/* Details Section */}
              <div className="bg-white p-4 sm:p-6 rounded-lg border">
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6">
                  An all-in-one platform designed for modern restaurants —
                  manage reservations, track orders, payments, and inventory
                  from a single smart dashboard. Streamline operations, reduce
                  no-shows, and deliver a seamless customer experience.
                </p>
                <a href='https://www.diniiz.com' target="_blank" className="text-base sm:text-lg hover:underline flex items-center gap-1">
                  View Website <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5"/>
                </a>
              </div>
            </div>

            {/* Second Column - Project Image */}
            <div className="h-full order-2 md:order-2 lg:order-2">
              <div className="bg-gray-800 rounded-2xl h-full flex items-center justify-center min-h-[250px] sm:min-h-[300px] md:min-h-[400px]">
                <Image
                  src="/projects/diniiz.png"
                  alt="Diniiz Restaurant Management Platform"
                  width={800}
                  height={600}
                  className="rounded-lg shadow-2xl pointer-events-none w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Third Column - Tech Stack */}
            <div className="h-full flex flex-col gap-4 sm:gap-6 lg:col-span-1 order-3 md:order-3 md:col-span-2 lg:col-span-1">
              {/* Designing & Prototyping Tools */}
              <div className="bg-white p-4 sm:p-6 rounded-lg border flex-1">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                  Designing & Prototyping Tools
                </h3>
                <div className="flex gap-3 sm:gap-4">
                  <SiFigma className="text-purple-600 text-2xl sm:text-3xl" />
                  <SiAdobephotoshop className="text-blue-600 text-2xl sm:text-3xl" />
                  <SiAdobeillustrator className="text-orange-600 text-2xl sm:text-3xl" />
                </div>
              </div>

              {/* Front End Development Tools */}
              <div className="bg-white p-4 sm:p-6 rounded-lg border flex-1">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                  Front End Development Tools
                </h3>
                <div className="flex gap-3 sm:gap-4">
                  <SiTailwindcss className="text-cyan-500 text-2xl sm:text-3xl" />
                  <SiReact className="text-blue-500 text-2xl sm:text-3xl" />
                  <SiHtml5 className="text-orange-500 text-2xl sm:text-3xl" />
                  <SiNextdotjs className="text-black text-2xl sm:text-3xl" />
                </div>
              </div>

              {/* Back End Development Tools */}
              <div className="bg-white p-4 sm:p-6 rounded-lg border flex-1">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                  Back End Development Tools
                </h3>
                <div className="flex gap-3 sm:gap-4">
                  <SiJavascript className="text-yellow-500 text-2xl sm:text-3xl" />
                  <SiExpress className="text-gray-800 text-2xl sm:text-3xl" />
                  <SiMongodb className="text-green-600 text-2xl sm:text-3xl" />
                  <SiMysql className="text-blue-600 text-2xl sm:text-3xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Axion Project Section */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
            {/* First Column - Project Info */}
            <div className="space-y-6 sm:space-y-8 lg:col-span-1 order-1 md:order-1">
              {/* Title Section */}
              <div className="relative bg-white p-4 sm:p-6 rounded-lg border ">
                <h2 className="text-2xl font-bold text-gray-900 pr-12 sm:pr-16">
                  Axion : Modern Business Solutions
                </h2>
                <div className="absolute bottom-[-0.5px] right-[-1px] rounded-tl-xl border-t border-s bg-white px-6">
                  <Image
                    src="/axion.svg"
                    alt="Axion Logo"
                    width={40}
                    height={40}
                    className="rounded-lg"
                  />
                </div>
              </div>

              {/* Details Section */}
              <div className="bg-white p-4 sm:p-6 rounded-lg border">
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6">
                  A comprehensive business management platform that streamlines
                  operations, enhances productivity, and drives growth. Built
                  with cutting-edge technology to deliver seamless user
                  experiences and robust performance for modern enterprises.
                </p>
                 <a href='https://www.axionlights.com' target="_blank" className="text-base sm:text-lg hover:underline flex items-center gap-1 group">
                  View Website <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform"/>
                </a>
              </div>
            </div>

            {/* Second Column - Project Image */}
            <div className="h-full order-2 md:order-2 lg:order-2">
              <div className="bg-gray-800 rounded-2xl h-full flex items-center justify-center min-h-[250px] sm:min-h-[300px] md:min-h-[400px]">
                <Image
                  src="/projects/axion.png"
                  alt="Axion Business Management Platform"
                  width={800}
                  height={600}
                  className="rounded-lg pointer-events-none shadow-2xl w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Third Column - Tech Stack */}
            <div className="h-full flex flex-col gap-4 sm:gap-6 lg:col-span-1 order-3 md:order-3 md:col-span-2 lg:col-span-1">
              {/* Designing & Prototyping Tools */}
              <div className="bg-white p-4 sm:p-6 rounded-lg border flex-1">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                  Designing & Prototyping Tools
                </h3>
                <div className="flex gap-3 sm:gap-4">
                  <SiFigma className="text-purple-600 text-2xl sm:text-3xl" />
                  <SiAdobephotoshop className="text-blue-600 text-2xl sm:text-3xl" />
                  <SiAdobeillustrator className="text-orange-600 text-2xl sm:text-3xl" />
                </div>
              </div>

              {/* Front End Development Tools */}
              <div className="bg-white p-4 sm:p-6 rounded-lg border flex-1">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                  Front End Development Tools
                </h3>
                <div className="flex gap-3 sm:gap-4">
                  <SiReact className="text-blue-500 text-2xl sm:text-3xl" />
                  <SiTailwindcss className="text-cyan-500 text-2xl sm:text-3xl" />
                  <SiJavascript className="text-yellow-500 text-2xl sm:text-3xl" />
                  <SiNextdotjs className="text-black text-2xl sm:text-3xl" />
                </div>
              </div>

              {/* Back End Development Tools */}
              <div className="bg-white p-4 sm:p-6 rounded-lg border flex-1">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                  Back End Development Tools
                </h3>
                <div className="flex gap-3 sm:gap-4">
                  <SiExpress className="text-gray-800 text-2xl sm:text-3xl" />
                  <SiMongodb className="text-green-600 text-2xl sm:text-3xl" />
                  <SiJavascript className="text-yellow-500 text-2xl sm:text-3xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <ProcessSection />
      <CTASection/>
    </main>
  );
}
