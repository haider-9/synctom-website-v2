import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SynctomLanding() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="overflow-hidden relative">
      {/* Animated Floating Icons with Flower Bloom Effect - Responsive */}
      <motion.div
        className="absolute shadow-lg rotate-15 top-8 left-4 sm:top-15 sm:left-40 z-0"
        initial={{
          x: "calc(50vw - 160px)",
          y: "calc(16rem + 8rem + 3rem)",
          scale: 0,
          opacity: 0,
          rotate: 0,
        }}
        animate={{
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          rotate: 15,
        }}
        transition={{
          duration: 1.2,
          delay: 0.5,
          type: "spring",
          stiffness: 100,
          damping: 15,
        }}
      >
        <Image
          src="/herosection/figma.png"
          alt="Figma"
          width={30}
          height={36}
          className="sm:w-[50px] sm:h-[60px]"
        />
      </motion.div>
      <motion.div
        className="absolute top-32 left-2 sm:top-60 sm:left-20 z-0"
        initial={{
          x: "calc(50vw - 80px)",
          y: "calc(16rem + 8rem + 3rem - 240px)",
          scale: 0,
          opacity: 0,
        }}
        animate={{
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
        }}
        transition={{
          duration: 1.2,
          delay: 0.7,
          type: "spring",
          stiffness: 100,
          damping: 15,
        }}
      >
        <Image
          src="/herosection/javascripy.png"
          alt="JavaScript"
          width={30}
          height={30}
          className="sm:w-[50px] sm:h-[50px]"
        />
      </motion.div>
      <motion.div
        className="absolute top-56 left-8 sm:top-100 sm:left-40 z-0"
        initial={{
          x: "calc(50vw - 160px)",
          y: "calc(16rem + 8rem + 3rem - 400px)",
          scale: 0,
          opacity: 0,
        }}
        animate={{
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
        }}
        transition={{
          duration: 1.2,
          delay: 0.9,
          type: "spring",
          stiffness: 100,
          damping: 15,
        }}
      >
        <Image
          src="/herosection/code.png"
          alt="Code"
          width={33}
          height={33}
          className="sm:w-[55px] sm:h-[55px]"
        />
      </motion.div>
      {/* Right side icons - Responsive */}
      <motion.div
        className="absolute top-8 right-4 sm:top-15 sm:right-40 z-0"
        initial={{
          x: "calc(-50vw + 160px)",
          y: "calc(16rem + 8rem + 3rem)",
          scale: 0,
          opacity: 0,
        }}
        animate={{
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
        }}
        transition={{
          duration: 1.2,
          delay: 0.6,
          type: "spring",
          stiffness: 100,
          damping: 15,
        }}
      >
        <Image
          src="/herosection/code-2.png"
          alt="Code 2"
          width={39}
          height={39}
          className="sm:w-[65px] sm:h-[65px]"
        />
      </motion.div>
      <motion.div
        className="absolute top-56 right-2 sm:top-100 sm:right-30 z-0"
        initial={{
          x: "calc(-50vw + 80px)",
          y: "calc(16rem + 8rem + 3rem - 400px)",
          scale: 0,
          opacity: 0,
        }}
        animate={{
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
        }}
        transition={{
          duration: 1.2,
          delay: 0.8,
          type: "spring",
          stiffness: 100,
          damping: 15,
        }}
      >
        <Image
          src="/herosection/ai.png"
          alt="AI"
          width={54}
          height={42}
          className="sm:w-[90px] sm:h-[70px]"
        />
      </motion.div>
      {/* Main Content */}
      <div className="relative z-10 h-full container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        {/* Header Badge */}
        <div
          className={`text-center mb-6 sm:mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <span className="inline-block px-4 sm:px-6 py-2 sm:py-3 rounded-full border-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0383CA] to-[#EF3A61] font-semibold text-sm sm:text-base">
              Empowering Digital Transformation
            </span>
          </span>
        </div>

        {/* Hero Title */}
        <h1
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center mb-4 sm:mb-6 transition-all duration-700 delay-100 leading-tight px-2 sm:px-0 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="text-gray-900">
            We Design and Develop Scalable Digital{" "}
            <span className="relative inline-block">
              Experience
              <Image
                src="/herosection/brushstroke.svg"
                alt="brushstroke"
                width={200}
                height={20}
                className="absolute pointer-events-none -bottom-1 sm:-bottom-2 left-0 w-full h-auto"
              />
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className={`text-center text-gray-600 text-sm sm:text-base md:text-lg max-w-xs sm:max-w-2xl md:max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed transition-all duration-700 delay-200 px-4 sm:px-0 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          At Synctom, we craft powerful web and mobile solutions that help
          startups and enterprises grow faster, enhance user engagement, and
          achieve business excellence through innovative design and cutting-edge
          technology.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12 transition-all duration-700 delay-300 px-4 sm:px-0 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Button
            asChild
            variant={"default"}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base"
          >
            <Link href="/contact">Start a Project</Link>
          </Button>
          <Button
            asChild
            variant={"outline"}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base"
          >
            <Link href="/portfolio">View our Work</Link>
          </Button>
        </div>

        {/* Bottom Section */}
      </div>
    </div>
  );
}
