import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Linkedin } from "lucide-react";
import CTASection from "@/components/cta-section";

export const metadata: Metadata = {
  title:
    "About Us | Synctom - Building Digital Solutions That Empower Businesses",
  description:
    "Learn about Synctom's 12+ years of excellence in digital innovation. Meet our expert team and discover our mission to create impactful digital solutions.",
  keywords:
    "about synctom, digital agency, web development team, UI/UX design experts, software development company",
  openGraph: {
    title:
      "About Us | Synctom - Building Digital Solutions That Empower Businesses",
    description:
      "Learn about Synctom's 12+ years of excellence in digital innovation and meet our expert team.",
    type: "website",
  },
};

interface TeamMember {
  id: number;
  name: string;
  position: string;
  email: string;
  image: string;
  linkedin: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Syed Ali Taqi",
    position: "Board Member",
    email: "alitaqi@syncton.com",
    image: "/teams/alitaqi.jpg",
    linkedin: "https://www.linkedin.com/in/syed-ali-taqi-hussnain/",
  },
  {
    id: 2,
    name: "Mehtab Khan Afridi",
    position: "Board Member",
    email: "mkafridi@syncton.com",
    image: "/teams/mehtab.png",
    linkedin: "https://www.linkedin.com/in/mehtab-khan-852a3928b/",
  },
  {
    id: 3,
    name: "Syed Ain Ali",
    position: "Board Member",
    email: "ainali@syncton.com",
    image: "/teams/ain.jpg",
    linkedin: "https://www.linkedin.com/in/ain-ali-a0a86b31b/",
  },
  {
    id: 4,
    name: "Haider Ahmad",
    position: "Web Developer",
    email: "haiderahmad352@gmail.com",
    image: "/teams/haider.jpg",
    linkedin: "https://www.linkedin.com/in/haider-ahmad-439317164/",
  },
  {
    id: 5,
    name: "Sharoon Shaleem",
    position: "Web Developer",
    email: "ssharoon166@gmail.com",
    image: "/teams/sharoon.jpg",
    linkedin: "https://www.linkedin.com/in/sharoon-shaleem-0a7a85226/",
  },
  {
    id: 6,
    name: "Raja Muhammad Zubair",
    position: "UI/UX Designer",
    email: "rajazubair5626573@gmail.com",
    image: "/teams/raja.png",
    linkedin: "https://www.linkedin.com/in/raja-zubair-664066294/",
  },
  {
    id: 7,
    name: "Ehtasham Ul Haq",
    position: "Web Developer",
    email: "ehteshamali@gmail.com",
    image: "/teams/ehtasham.jpg",
    linkedin: "https://www.linkedin.com/in/ehtasham-ul-haq-86069b274/",
  },
];
function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="relative bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group">
      <div className="relative h-110">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>

        {/* LinkedIn Icon */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
          <Link
            href="https://www.linkedin.com/company/synctom/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 sm:w-8 sm:h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <Linkedin className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
          </Link>
        </div>

        {/* Member Info */}
        <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 text-white">
          <h3 className="text-lg sm:text-xl font-bold mb-1">{member.name}</h3>
          <p className="text-white/90 text-xs sm:text-sm mb-1 sm:mb-2">
            {member.position}
          </p>
          <p className="text-white/70 text-xs">{member.email}</p>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <div className="min-h-screen">
      {/* About Hero Section */}
      <div className="py-12 sm:py-14 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Content */}
          <div className="text-center space-y-6 sm:space-y-8">
            {/* Badge */}
            <div className="inline-block">
              <span className="px-4 sm:px-6 py-2 sm:py-3 bg-clip-text text-transparent bg-linear-to-r from-[#0383CA] to-[#EF3A61] rounded-full border-2 border-gray-200 bg-white">
                <span className="font-semibold text-sm sm:text-base">
                  About Synctom
                </span>
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight max-w-xs sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-0">
              Building Digital Solutions That Empower Businesses
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-xs sm:max-w-2xl md:max-w-3xl mx-auto px-4 sm:px-0">
              At Synctom, we craft innovative web, app, and software experiences
              that help brands grow, engage audiences, and thrive in the digital
              world.
            </p>

            {/* Image */}
            <div className="mt-2">
              <Image
                src="/about-image.jpg"
                alt="Synctom office workspace"
                width={800}
                height={400}
                className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover rounded-xl sm:rounded-2xl shadow-lg"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Experience Section */}
      <div className="py-12 sm:py-14 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
              {/* Main Heading */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                12+ Years of Excellence in Digital Innovation
              </h2>

              {/* Description */}
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                At Synctom, we're passionate about redefining how businesses
                grow through technology. Our journey began with a vision to
                create solutions that bridge creativity and functionality. Over
                the years, we've delivered high-impact products that empower
                clients to scale, connect, and lead in their industries.
              </p>

              {/* Button */}
              <Button
                asChild
                variant="default"
                size="lg"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 text-sm sm:text-base"
              >
                <Link href="/services">Explore our Services</Link>
              </Button>
            </div>

            {/* Right Content - Mission & Vision */}
            <div className="space-y-6 sm:space-y-8 order-1 lg:order-2">
              {/* Our Mission */}
              <div className="flex gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
                  <Image
                    src="/about/mission.png"
                    alt="Mission icon"
                    width={24}
                    height={24}
                    className="w-5 h-5 sm:w-6 sm:h-6"
                  />
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                    Our Mission
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    To design and develop impactful digital solutions that drive
                    growth and transform ideas into meaningful experiences.
                  </p>
                </div>
              </div>

              {/* Our Vision */}
              <div className="flex gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <Image
                    src="/about/vision.png"
                    alt="Vision icon"
                    width={24}
                    height={24}
                    className="w-5 h-5 sm:w-6 sm:h-6"
                  />
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                    Our Vision
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    To be a global leader in digital innovation, helping
                    businesses evolve through technology and design excellence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Empowering Section */}
      <div className="py-12 sm:py-14 md:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-14 md:mb-16">
            <p className="text-xs sm:text-sm bg-linear-to-r from-[#4F46E5] to-[#EF3A61] bg-clip-text text-transparent mb-2 tracking-[0.3em] sm:tracking-[0.5em] uppercase">
              Why Choose Us
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 px-4 sm:px-0">
              Empowering Businesses Through Creativity & Technology
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-xs sm:max-w-2xl md:max-w-3xl mx-auto px-4 sm:px-0">
              We believe in building meaningful digital experiences through
              innovation, strategy, and precision. Every project we undertake is
              a reflection of our passion for excellence.
            </p>
          </div>

          {/* Features Grid - Zigzag Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* First Row - Top */}
            <div className="flex gap-3 sm:gap-4 lg:mt-0">
              <div className="w-1 h-8 sm:h-10 md:h-12 bg-linear-to-b from-[#0383CA] to-[#EF3A61] rounded-full shrink-0"></div>
              <div className="space-y-1 sm:space-y-2">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Expert Team
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  A group of dedicated professionals with deep experience in
                  design, development, and digital strategy.
                </p>
              </div>
            </div>

            {/* Second Row - Bottom */}
            <div className="flex gap-3 sm:gap-4 lg:mt-8 xl:mt-16">
              <div className="w-1 h-8 sm:h-10 md:h-12 bg-linear-to-b from-[#0383CA] to-[#EF3A61] rounded-full shrink-0"></div>
              <div className="space-y-1 sm:space-y-2">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Transparent Process
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  We believe in clear communication and consistent updates at
                  every stage of the project.
                </p>
              </div>
            </div>

            {/* Third Row - Top */}
            <div className="flex gap-3 sm:gap-4 lg:mt-0">
              <div className="w-1 h-8 sm:h-10 md:h-12 bg-linear-to-b from-[#0383CA] to-[#EF3A61] rounded-full shrink-0"></div>
              <div className="space-y-1 sm:space-y-2">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Data-Driven Process
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Every decision we make is backed by insights, analytics, and
                  user behavior data to ensure results.
                </p>
              </div>
            </div>

            {/* Fourth Row - Bottom */}
            <div className="flex gap-3 sm:gap-4 lg:mt-8 xl:mt-16">
              <div className="w-1 h-8 sm:h-10 md:h-12 bg-linear-to-b from-[#0383CA] to-[#EF3A61] rounded-full shrink-0"></div>
              <div className="space-y-1 sm:space-y-2">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  End to End Solutions
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  From ideation to post-launch support, we handle everything to
                  ensure your product's success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-12 sm:py-14 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <p className="text-xs sm:text-sm bg-linear-to-r from-[#4F46E5] to-[#EF3A61] bg-clip-text text-transparent mb-2 tracking-[0.3em] sm:tracking-[0.5em] uppercase">
              Our Team
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-4 sm:px-0">
              The Creative Minds Behind Synctom
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-xs sm:max-w-2xl md:max-w-3xl mx-auto px-4 sm:px-0">
              Our multidisciplinary team blends creativity, strategy, and
              technology to craft digital products that make a difference. Each
              member brings a unique skill set and shared passion for
              innovation.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {teamMembers.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
