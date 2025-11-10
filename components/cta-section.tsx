import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <div className="relative py-12 sm:py-16 md:py-20 mb-12 sm:mb-16 md:mb-20 px-4 sm:px-6 lg:px-8 mx-4 sm:mx-6 lg:mx-8 rounded-lg overflow-hidden mt-6">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/services-footer.png"
          alt="CTA Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-xs sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight px-2 sm:px-0">
          Ready to Build Something Amazing?
        </h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 mb-6 sm:mb-8 max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
          Let's collaborate to turn your ideas into reality. Our team is ready
          to bring your vision to life with scalable, user-focused digital
          solutions.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-2 sm:px-0">
          <Button
            asChild
            variant="default"
            size="lg"
            className="bg-[#0383CA] hover:bg-[#0267A3] w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base"
          >
            <Link href="/contact">Start a Project</Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="lg"
            className="border text-white hover:bg-white hover:text-gray-900 w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base"
          >
            <Link href="/portfolio">View our Work</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
