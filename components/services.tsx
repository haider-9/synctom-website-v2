"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Gallery images for services
const galleryImages = [
  {
    id: 1,
    url: "/services/services.png",
    title: "Web Development",
    description:
      "Build responsive, scalable websites and web applications using modern technologies and best practices.",
  },
  {
    id: 2,
    url: "/services/services(1).jpg",
    title: "UI/UX Design",
    description:
      "Create intuitive interfaces and engaging user experiences that drive conversions and user satisfaction.",
  },
  {
    id: 3,
    url: "/services/services(2).png",
    title: "App Development",
    description:
      "Develop native and cross-platform mobile applications that deliver seamless performance across devices.",
  },
  {
    id: 4,
    url: "/services/services(3).png",
    title: "Graphic Design",
    description:
      "Design compelling visual content that communicates your brand message and captivates your audience.",
  },
  {
    id: 5,
    url: "/services/services(4).png",
    title: "Branding",
    description:
      "Build strong brand identities that resonate with your target audience and differentiate you from competitors.",
  },
  {
    id: 6,
    url: "/services/services(5).png",
    title: "AI Automation",
    description:
      "Implement intelligent automation solutions that streamline processes and enhance business efficiency.",
  },
];

export default function ServicesSection() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 720);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-advance images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedImage((prev) => (prev + 1) % galleryImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedImage]); // Reset interval when selectedImage changes (on click)

  return (
    <div className="p-2 px-[3vw]">
      <div className="w-full mx-auto">
        <div className="flex flex-col-reverse md:flex-row gap-8 md:items-start">
          {/* Image Gallery - Now appears first on mobile/tablet */}
          <div className="flex gap-1 sm:gap-2 md:gap-1 flex-1 md:justify-start lg:justify-end overflow-x-auto md:overflow-x-visible order-1 md:order-2">
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                onClick={() => setSelectedImage(index)}
                className={`relative cursor-pointer transition-all duration-500 ease-in-out shrink-0 rounded-2xl overflow-hidden ${
                  selectedImage === index
                    ? "w-50 sm:w-60 md:w-80 lg:w-xs h-64 sm:h-72 md:h-80"
                    : "w-8 sm:w-10 md:w-10 h-64 sm:h-72 md:h-80 "
                }`}
              >
                <Image
                  src={image.url}
                  alt={image.title}
                  width={isMobile ? 300 : 400}
                  height={isMobile ? 300 : 400}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <AnimatePresence>
                  {selectedImage === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{
                        opacity: 0,
                        transition: { duration: 0 },
                      }}
                      transition={{
                        duration: 0.6,
                        delay: 0.3,
                      }}
                      className="absolute bottom-4 left-4 right-4 text-white z-10"
                    >
                      <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2">
                        {image.title}
                      </h3>
                      <p className="text-white/90 text-xs sm:text-sm leading-relaxed">
                        {image.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Text and Buttons - Now appears second on mobile/tablet */}
          <div className="shrink-0 flex flex-col justify-center w-full md:max-w-md lg:max-w-xl order-2 md:order-1">
            <p className="text-sm text-blue-400 mb-2 tracking-wide">
              Our Services
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">
              Transforming Ideas into Scalable Digital Solutions
            </h2>
            <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
              From design to development, Syncton provides end-to-end digital
              solutions that empower brands and startups to thrive. Our
              multidisciplinary team blends creativity with technology to
              deliver products that are functional, beautiful, and built to
              scale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="px-6 sm:px-8 py-3">
                <Link href="/services">Explore our Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
