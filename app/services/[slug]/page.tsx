import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import CTASection from "@/components/cta-section";
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiTypescript,
  SiTailwindcss,
  SiMongodb,
  SiFigma,
  SiAdobexd,
  SiSketch,
  SiFramer,
  SiFlutter,
  SiSwift,
  SiKotlin,
  SiFirebase,
  SiAmazon,
  SiAdobecreativecloud,
  SiCanva,
  SiAdobeindesign,
  SiAdobeillustrator,
  SiPython,
  SiTensorflow,
  SiOpenai,
  SiGoogleanalytics,
  SiFacebook,
  SiInstagram,
  SiTiktok,
} from "react-icons/si";

export const services = {
  "web-development": {
    title: "Web Development",
    description:
      "Build responsive, scalable websites and web applications using modern technologies and best practices.",
    longDescription:
      "Our web development team creates high-performing, secure, and scalable websites tailored to your business goals. We ensure every line of code translates into a fast, responsive, and visually stunning online experience that drives results.",
    image: "/services/services.png",
    features: [
      "Responsive Design",
      "Modern Frameworks",
      "SEO Optimization",
      "Performance Optimization",
      "Security Implementation",
      "Cross-browser Compatibility",
    ],
    technologies: [
      { name: "React", icon: SiReact, color: "text-blue-500" },
      { name: "Next.js", icon: SiNextdotjs, color: "text-black" },
      { name: "Node.js", icon: SiNodedotjs, color: "text-green-600" },
      { name: "TypeScript", icon: SiTypescript, color: "text-blue-600" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-cyan-500" },
      { name: "MongoDB", icon: SiMongodb, color: "text-green-500" },
    ],
    process: [
      "Requirements Analysis",
      "UI/UX Design",
      "Development & Testing",
      "Deployment & Launch",
    ],
  },

  "ui-ux-design": {
    title: "UI/UX Design",
    description:
      "Create intuitive interfaces and engaging user experiences that drive conversions and user satisfaction.",
    longDescription:
      "We design seamless digital experiences that connect brands with users. From wireframes to pixel-perfect interfaces, every detail is carefully crafted to enhance usability, engagement, and overall satisfaction.",
    image: "/services/services(1).jpg",
    features: [
      "User Research",
      "Wireframing & Prototyping",
      "Visual Design",
      "Interaction Design",
      "Usability Testing",
      "Design Systems",
    ],
    technologies: [
      { name: "Figma", icon: SiFigma, color: "text-purple-500" },
      { name: "Adobe XD", icon: SiAdobexd, color: "text-pink-500" },
      { name: "Sketch", icon: SiSketch, color: "text-orange-500" },
      { name: "InVision", icon: SiFigma, color: "text-red-500" },
      { name: "Principle", icon: SiFramer, color: "text-blue-500" },
      { name: "Framer", icon: SiFramer, color: "text-black" },
    ],
    process: [
      "User Research",
      "Information Architecture",
      "Wireframing & Prototyping",
      "Visual Design & Testing",
    ],
  },

  "app-development": {
    title: "App Development",
    description:
      "Develop native and cross-platform mobile applications that deliver seamless performance across devices.",
    longDescription:
      "We transform your ideas into powerful mobile applications with modern UI, robust performance, and smooth functionality — delivering apps that users love on both Android and iOS platforms.",
    image: "/services/services(2).png",
    features: [
      "Native iOS & Android",
      "Cross-platform Development",
      "App Store Optimization",
      "Push Notifications",
      "Offline Functionality",
      "Third-party Integrations",
    ],
    technologies: [
      { name: "React Native", icon: SiReact, color: "text-blue-500" },
      { name: "Flutter", icon: SiFlutter, color: "text-blue-400" },
      { name: "Swift", icon: SiSwift, color: "text-orange-500" },
      { name: "Kotlin", icon: SiKotlin, color: "text-purple-600" },
      { name: "Firebase", icon: SiFirebase, color: "text-yellow-500" },
      { name: "AWS", icon: SiAmazon, color: "text-orange-600" },
    ],
    process: [
      "Concept & Strategy",
      "Design & Prototyping",
      "Development & Testing",
      "App Store Deployment",
    ],
  },

  "graphic-design": {
    title: "Graphic Design",
    description:
      "Design compelling visual content that communicates your brand message and captivates your audience.",
    longDescription:
      "Our graphic design services help you communicate your brand message through compelling visual content. We create designs that not only look great but also effectively convey your message and captivate your target audience.",
    image: "/services/services(3).png",
    features: [
      "Brand Identity Design",
      "Marketing Materials",
      "Digital Graphics",
      "Print Design",
      "Packaging Design",
      "Social Media Graphics",
    ],
    technologies: [
      {
        name: "Adobe Creative Suite",
        icon: SiAdobecreativecloud,
        color: "text-red-600",
      },
      { name: "Figma", icon: SiFigma, color: "text-purple-500" },
      { name: "Canva", icon: SiCanva, color: "text-blue-500" },
      { name: "Sketch", icon: SiSketch, color: "text-orange-500" },
      { name: "InDesign", icon: SiAdobeindesign, color: "text-pink-600" },
      {
        name: "Illustrator",
        icon: SiAdobeillustrator,
        color: "text-orange-600",
      },
    ],
    process: [
      "Brief & Research",
      "Concept Development",
      "Design Creation",
      "Refinement & Delivery",
    ],
  },

  branding: {
    title: "Branding",
    description:
      "Build strong brand identities that resonate with your target audience and differentiate you from competitors.",
    longDescription:
      "Your brand is your story. We create compelling brand identities — logos, visuals, and style systems — that communicate your values and set you apart in the digital landscape.",
    image: "/services/services(4).png",
    features: [
      "Brand Strategy",
      "Logo Design",
      "Brand Guidelines",
      "Visual Identity",
      "Brand Messaging",
      "Brand Implementation",
    ],
    technologies: [
      {
        name: "Adobe Creative Suite",
        icon: SiAdobecreativecloud,
        color: "text-red-600",
      },
      { name: "Figma", icon: SiFigma, color: "text-purple-500" },
      { name: "Style Guides", icon: SiAdobeillustrator, color: "text-orange-600" },
      { name: "Typography", icon: SiAdobeindesign, color: "text-pink-600" },
      { name: "Color Theory", icon: SiAdobecreativecloud, color: "text-green-500" },
    ],
    process: [
      "Brand Discovery",
      "Strategy Development",
      "Identity Creation",
      "Implementation & Guidelines",
    ],
  },

  "ai-automation": {
    title: "AI Automation",
    description:
      "Implement intelligent automation solutions that streamline processes and enhance business efficiency.",
    longDescription:
      "We implement intelligent automation solutions that streamline your business processes and enhance efficiency. Our AI-powered tools help you automate repetitive tasks, improve decision-making, and scale your operations.",
    image: "/services/services(5).png",
    features: [
      "Process Automation",
      "Machine Learning Models",
      "Chatbots & Virtual Assistants",
      "Data Analytics",
      "Workflow Optimization",
      "AI Integration",
    ],
    technologies: [
      { name: "Python", icon: SiPython, color: "text-blue-500" },
      { name: "TensorFlow", icon: SiTensorflow, color: "text-orange-500" },
      { name: "OpenAI", icon: SiOpenai, color: "text-green-600" },
      { name: "Machine Learning", icon: SiTensorflow, color: "text-purple-600" },
      {
        name: "Natural Language Processing",
        icon: SiPython,
        color: "text-blue-600",
      },
      { name: "Computer Vision", icon: SiTensorflow, color: "text-red-500" },
    ],
    process: [
      "Process Analysis",
      "AI Solution Design",
      "Development & Training",
      "Integration & Optimization",
    ],
  },

  "digital-marketing": {
    title: "Digital Marketing",
    description:
      "Grow your online presence through data-driven marketing strategies and impactful campaigns.",
    longDescription:
      "Our digital marketing experts craft tailored strategies to increase your visibility, engagement, and conversions. From SEO and content marketing to social media and paid ads, we help you grow sustainably in the digital world.",
    image: "/services/services(6).png",
    features: [
      "SEO & SEM",
      "Content Marketing",
      "Social Media Management",
      "Email Marketing",
      "Paid Advertising (PPC)",
      "Analytics & Optimization",
    ],
    technologies: [
      { name: "Google Analytics", icon: SiGoogleanalytics, color: "text-orange-500" },
      { name: "Facebook Ads", icon: SiFacebook, color: "text-blue-600" },
      { name: "Instagram", icon: SiInstagram, color: "text-pink-500" },
      { name: "TikTok Ads", icon: SiTiktok, color: "text-gray-800" },
      { name: "SEO Tools", icon: SiGoogleanalytics, color: "text-green-600" },
    ],
    process: [
      "Market Research",
      "Strategy Development",
      "Campaign Execution",
      "Tracking & Optimization",
    ],
  },
};

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services[slug as keyof typeof services];

  if (!service) {
    return {
      title: "Service Not Found | Synctom",
    };
  }

  return {
    title: `${service.title} | Synctom - Professional Digital Solutions`,
    description: service.description,
    keywords: `${service.title.toLowerCase()}, digital services, synctom, web development, design`,
    openGraph: {
      title: `${service.title} | Synctom`,
      description: service.description,
      type: "website",
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = services[slug as keyof typeof services];

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="py-12 sm:py-14 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
              {/* Badge */}
              <div className="inline-block">
                <span className="px-4 sm:px-6 py-2 sm:py-3 rounded-full border-2 border-gray-200 bg-white">
                  <span className="bg-linear-to-r from-[#0383CA] to-[#EF3A61] bg-clip-text text-transparent font-semibold text-sm sm:text-base">
                    {service.title}
                  </span>
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
                Professional {service.title} Services
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                {service.longDescription}
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button
                  asChild
                  variant="default"
                  size="lg"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 text-sm sm:text-base"
                >
                  <Link href="/contact">Start a Project</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 text-sm sm:text-base"
                >
                  <Link href="/portfolio">View our Work</Link>
                </Button>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex justify-center lg:justify-end order-1 lg:order-2">
              <Image
                src={service.image}
                alt={service.title}
                width={600}
                height={400}
                className="w-full max-w-xs pointer-events-none sm:max-w-sm md:max-w-md lg:max-w-lg h-auto object-contain rounded-xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 sm:py-14 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-14 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              What We Offer
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Our comprehensive {service.title.toLowerCase()} services cover
              everything you need to succeed.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {service.features.map((feature, index) => (
              <div
                key={index}
                className="flex gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#0383CA] to-[#EF3A61] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Professional {feature.toLowerCase()} services tailored to
                    your needs.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technologies Section */}
      <div className="py-12 sm:py-14 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-14 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Technologies We Use
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              We leverage the latest technologies and tools to deliver
              exceptional results.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {service.technologies.map((tech, index) => {
              const IconComponent = tech.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow"
                >
                  <IconComponent className={`w-5 h-5 ${tech.color}`} />
                  <span className="text-sm sm:text-base font-medium text-gray-700">
                    {tech.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="py-12 sm:py-14 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-14 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Our Process
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              We follow a proven process to ensure successful project delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {service.process.map((step, index) => (
              <div key={index} className="text-center">
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step}
                </h3>
                <p className="text-gray-600 text-sm">
                  Step {index + 1} in our comprehensive{" "}
                  {service.title.toLowerCase()} process.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}

export async function generateStaticParams() {
  return Object.keys(services).map((slug) => ({
    slug,
  }));
}
