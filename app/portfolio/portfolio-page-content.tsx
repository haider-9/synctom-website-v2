import ProcessSection from "@/components/process-section";
import CTASection from "@/components/cta-section";
import PortfolioClient from "./portfolio-client";

interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client: string;
  industry: string;
  duration: string;
  content: string;
  coverImage?: string | null;
  logo?: string | null;
  images: string[];
  technologies: any;
  category?: string | null;
}

interface PortfolioPageContentProps {
  caseStudies: CaseStudy[];
}

export default function PortfolioPageContent({
  caseStudies,
}: PortfolioPageContentProps) {
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
            Explore how Synctom&apos;s design and technology solutions have
            empowered businesses to scale, connect, and succeed
          </p>
        </div>
      </section>

      {/* Portfolio Content with Tabs */}
      <PortfolioClient initialCaseStudies={caseStudies} />

      {/* Process Section */}
      <ProcessSection />
      <CTASection />
    </main>
  );
}
