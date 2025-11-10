import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import CTASection from "@/components/cta-section";

// Reusable Expertise Card Component
interface ExpertiseCardProps {
  iconSvg: string;
  title: string;
  description: string;
}

function ExpertiseCard({ iconSvg, title, description }: ExpertiseCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 text-center">
      <div className="space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full  flex items-center justify-center p-3">
          <Image
            src={iconSvg}
            alt={`${title} icon`}
            width={32}
            height={32}
            className="w-8 pointer-events-none h-8"
          />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

// Reusable Industry Card Component
interface IndustryCardProps {
  iconSvg: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  imagePosition: "left" | "right";
}

function IndustryCard({
  iconSvg,
  title,
  description,
  tags,
  image,
  imagePosition,
}: IndustryCardProps) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
          imagePosition === "right" ? "" : "lg:grid-flow-col-dense"
        }`}
      >
        {/* Content */}
        <div
          className={`space-y-6 ${
            imagePosition === "right" ? "" : "lg:col-start-2"
          }`}
        >
          {/* Icon and Title */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16    rounded-full flex items-center justify-center p-2">
              <Image
                src={iconSvg}
                alt={`${title} icon`}
                width={24}
                height={24}
                className="size-full pointer-events-none"
              />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">{description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gradient-to-r from-[#0383CA] to-[#EF3A61] text-sm bg-clip-text text-transparent border rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Image */}
        <div className={`${imagePosition === "right" ? "" : "lg:col-start-1"}`}>
          <Image
            src={image}
            alt={title}
            width={400}
            height={250}
            className="w-full h-64 pointer-events-none object-cover rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}

export default function Industries() {
  const industries = [
    {
      iconSvg: "/industries/dollar.svg",
      title: "Finance & Tech",
      description:
        "From banking dashboards to fin-powered analytics, we create fintech platforms that combine performance, reliability, and compliance — enabling smarter financial experiences for modern users.",
      tags: ["Payments", "Blockchain", "Compliance"],
      image: "/industries/industries-1.jpg",
      imagePosition: "left" as const,
    },
    {
      iconSvg: "/industries/realestate.svg",
      title: "Real Estate",
      description:
        "From property dashboards to fin-powered analytics, we create fintech platforms that combine performance, reliability, and compliance — enabling smarter financial experiences for modern users.",
      tags: ["Analytics", "Blockchain", "Compliance"],
      image: "/industries/industries-2.jpg",
      imagePosition: "right" as const,
    },
    {
      iconSvg: "/industries/education.svg",
      title: "Education",
      description:
        "Our education solutions make learning engaging and accessible through beautifully designed platforms, personalized dashboards, and content management systems that empower educators and students alike.",
      tags: ["Analytics", "Blockchain", "Compliance"],
      image: "/industries/industries-3.jpg",
      imagePosition: "left" as const,
    },
    {
      iconSvg: "/industries/ecommerece.svg",
      title: "E-Commerce",
      description:
        "We design and develop e-commerce e-commerce systems that elevate customer experience, streamline operations, and drive conversions — empowering brands to thrive in the digital marketplace.",
      tags: ["Payments", "Blockchain", "Compliance"],
      image: "/industries/industries-4.jpg",
      imagePosition: "right" as const,
    },
    {
      iconSvg: "/industries/health.svg",
      title: "Health Care",
      description:
        "We build secure, intuitive, and patient-centered digital solutions for hospitals, clinics, and startups — ensuring technology enhances care delivery while maintaining the highest standards of privacy and compliance.",
      tags: ["Telemedicine", "Blockchain", "Compliance"],
      image: "/industries/industries-5.jpg",
      imagePosition: "left" as const,
    },
    {
      iconSvg: "/industries/saas.svg",
      title: "SAAS",
      description:
        "From MVPs to enterprise-grade products, we empower SaaS tech startups and established businesses to build scalable, high-performance SaaS solutions that deliver real impact.",
      tags: ["Analytics", "Blockchain", "Compliance"],
      image: "/industries/industries-6.jpg",
      imagePosition: "right" as const,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-block">
                <span className="px-6 py-2 rounded-full border-2 border-gray-200 bg-white">
                  <span className="bg-gradient-to-r from-[#0383CA] to-[#EF3A61] bg-clip-text text-transparent font-semibold">
                    Our Industries
                  </span>
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl font-black text-gray-900 leading-tight">
                Transforming Businesses Across Every Industry
              </h1>

              {/* Description */}
              <p className="text-gray-600 text-md leading-relaxed max-w-lg">
                At Synctom, we empower businesses from diverse sectors — from
                finance to healthcare, retail to SaaS with tailored digital
                solutions that drive innovation, scalability, and impact.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button asChild variant="default" size="lg">
                  <Link href="/portfolio">Explore Our Work</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">Get in Touch</Link>
                </Button>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex justify-center lg:justify-end">
              <Image
                src="/industries-image.jpg"
                alt="Team collaboration illustration"
                width={600}
                height={400}
                className="w-full max-w-lg h-auto pointer-events-none object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Industries Section */}
      <div className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="text-gray-500 text-sm uppercase tracking-wider mb-4">
              Industries We Serve
            </p>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Driving Impact Across Diverse Sectors
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We deliver tailored solutions across multiple industries, helping
              businesses innovate, scale, and lead in the digital age.
            </p>
          </div>

          {/* Industries Grid */}
          <div className="space-y-12">
            {industries.map((industry, index) => (
              <IndustryCard
                key={index}
                iconSvg={industry.iconSvg}
                title={industry.title}
                description={industry.description}
                tags={industry.tags}
                image={industry.image}
                imagePosition={industry.imagePosition}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Expertise Section */}
      <div className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="text-gray-500 text-sm uppercase tracking-wider mb-4">
              Our Expertise
            </p>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              How We Deliver Excellence Across Industries
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Each industry presents unique challenges; our flexible process
              ensures every project is built on strategy, creativity, and
              precision. From discovery to delivery, we tailor every step to
              your business goals.
            </p>
          </div>

          {/* Expertise Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ExpertiseCard
              iconSvg="/industries/reserch.svg"
              title="Research & Discovery"
              description="We dive deep into your industry's needs, studying trends, competitors, and user behavior to build a foundation."
            />
            <ExpertiseCard
              iconSvg="/industries/desgin.svg"
              title="Tailored Design Systems"
              description="Our designs aren't just beautiful; they're built to match your users, workflows, and brand identity."
            />
            <ExpertiseCard
              iconSvg="/industries/complience.svg"
              title="Industry Compliance"
              description="We integrate regulatory and security standards to ensure your product is compliant, safe, and reliable."
            />
            <ExpertiseCard
              iconSvg="/industries/deployment.svg"
              title="Scalable Development"
              description="From MVP to enterprise platforms, our codebase and infrastructure scale as your business grows."
            />
          </div>
        </div>
      </div>

      {/* CTA Footer Section */}
      <CTASection />
    </div>
  );
}
