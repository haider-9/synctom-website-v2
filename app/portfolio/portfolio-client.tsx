"use client";

import Image from "next/image";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  SiFlutter,
  SiDart,
  SiFirebase,
  SiPython,
  SiTensorflow,
  SiOpenai,
  SiFacebook,
  SiInstagram,
  SiLinkedin,
  SiGoogleads,
} from "react-icons/si";

const iconMap: { [key: string]: React.ElementType } = {
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
  SiFlutter,
  SiDart,
  SiFirebase,
  SiPython,
  SiTensorflow,
  SiOpenai,
  SiFacebook,
  SiInstagram,
  SiLinkedin,
  SiGoogleads,
  SiNodedotjs,
};

import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { SiNodedotjs } from "react-icons/si";
import Loading from "../loading";

// Project data structure
interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  logo: string;
  image: string;
  website?: string;
  category: string;
  designTools: { icon: React.ElementType; color: string }[];
  frontendTools: { icon: React.ElementType; color: string }[];
  backendTools: { icon: React.ElementType; color: string }[];
}

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
function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start mb-12 sm:mb-16 md:mb-20">
      {/* First Column - Project Info */}
      <div className="space-y-6 sm:space-y-8 lg:col-span-1 order-1 md:order-1">
        {/* Title Section */}
        <div className="relative bg-white clipped-div p-4 sm:p-6 rounded-lg border">
          <h2 className="text-2xl font-bold text-gray-900 pr-12 sm:pr-16">
            {project.title}
          </h2>
          <div className="absolute -bottom-px -right-px rounded-tl-xl border-t border-s bg-white py-2 px-6">
            <Image
              src={project.logo}
              alt={`${project.title} Logo`}
              width={50}
              height={40}
              className="rounded-lg object-contain"
            />
          </div>
        </div>

        {/* Details Section */}
        <div className="bg-white p-4 sm:p-6 rounded-lg border">
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6">
            {project.description}
          </p>
          <div className="flex flex-col gap-2">
            <Link
              href={`/project/${project.id}`}
              className="text-base sm:text-lg hover:underline flex items-center gap-1 group text-primary font-medium"
            >
              View Full Details{" "}
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            {project.website && (
              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base sm:text-lg hover:underline flex items-center gap-1 group"
              >
                View Website{" "}
                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Second Column - Project Image */}
      <div className="h-full order-2 md:order-2 lg:order-2">
        <div className="bg-gray-800 rounded-2xl h-full flex items-center justify-center min-h-[250px] sm:min-h-[300px] md:min-h-[400px]">
          <Image
            src={project.image}
            alt={project.title}
            width={800}
            height={600}
            className="rounded-lg shadow-2xl pointer-events-none w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Third Column - Tech Stack */}
      <div className="h-full flex flex-col gap-4 sm:gap-6 lg:col-span-1 order-3 md:order-3 md:col-span-2 lg:col-span-1">
        {/* Designing & Prototyping Tools */}
        {project.designTools.length > 0 && (
          <div className="bg-white p-4 sm:p-6 rounded-lg border flex-1">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
              Designing & Prototyping Tools
            </h3>
            <div className="flex gap-3 sm:gap-4">
              {project.designTools.map((tool, index) => {
                const Icon = tool.icon as React.ComponentType<{
                  className?: string;
                }>;
                return (
                  <Icon
                    key={index}
                    className={`${tool.color} text-2xl sm:text-3xl`}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Front End Development Tools */}
        {project.frontendTools.length > 0 && (
          <div className="bg-white p-4 sm:p-6 rounded-lg border flex-1">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
              {project.category === "social" || project.category === "marketing"
                ? "Platforms & Tools"
                : "Front End Development Tools"}
            </h3>
            <div className="flex gap-3 sm:gap-4">
              {project.frontendTools.map((tool, index) => {
                const Icon = tool.icon as React.ComponentType<{
                  className?: string;
                }>;
                return (
                  <Icon
                    key={index}
                    className={`${tool.color} text-2xl sm:text-3xl`}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Back End Development Tools */}
        {project.backendTools.length > 0 && (
          <div className="bg-white p-4 sm:p-6 rounded-lg border flex-1">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
              Back End Development Tools
            </h3>
            <div className="flex gap-3 sm:gap-4">
              {project.backendTools.map((tool, index) => {
                const Icon = tool.icon as React.ComponentType<{
                  className?: string;
                }>;
                return (
                  <Icon
                    key={index}
                    className={`${tool.color} text-2xl sm:text-3xl`}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface PortfolioClientProps {
  initialCaseStudies: CaseStudy[];
}

export default function PortfolioClient({ initialCaseStudies }: PortfolioClientProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const convertCaseStudies = () => {
      setIsLoading(true);
      try {
        if (initialCaseStudies.length > 0) {
          // Convert case studies to project format
          const convertedProjects: Project[] = initialCaseStudies.map(
            (cs: CaseStudy) => {
                const designTools = (cs.technologies || [])
                  .filter((t: any) => t.category === "design")
                  .map((t: any) => ({
                    icon: iconMap[t.icon] || SiFigma,
                    color: t.color,
                  }));

                const frontendTools = (cs.technologies || [])
                  .filter((t: any) => t.category === "frontend")
                  .map((t: any) => ({
                    icon: iconMap[t.icon] || SiReact,
                    color: t.color,
                  }));

                const backendTools = (cs.technologies || [])
                  .filter((t: any) => t.category === "backend")
                  .map((t: any) => ({
                    icon: iconMap[t.icon] || SiNodedotjs,
                    color: t.color,
                  }));

                return {
                  id: cs.id,
                  title: cs.title,
                  subtitle: cs.client,
                  description:
                    cs.content.replace(/<[^>]*>/g, "").substring(0, 300) +
                    "...",
                  logo: cs.logo || "/logo.png",
                  image: cs.coverImage || "/projects/diniiz.png",
                  website: undefined,
                  category: cs.category || "web",
                  designTools,
                  frontendTools,
                  backendTools,
                };
              }
            );
          setProjects(convertedProjects);
        } else {
          setProjects([]);
        }
      } catch (error) {
        console.error("Error converting case studies:", error);
        toast.error("Failed to load case studies");
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };

    convertCaseStudies();
  }, [initialCaseStudies]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 md:pb-20">
      <div className="max-w-7xl mx-auto">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full justify-center flex-wrap h-auto gap-2 p-2 mb-8 sm:mb-12">
            <TabsTrigger value="all" className="px-4 py-2">
              All Projects
            </TabsTrigger>
            <TabsTrigger value="uiux" className="px-4 py-2">
              UI/UX Designing
            </TabsTrigger>
            <TabsTrigger value="web" className="px-4 py-2">
              Web Development
            </TabsTrigger>
            <TabsTrigger value="app" className="px-4 py-2">
              App Development
            </TabsTrigger>
            <TabsTrigger value="ai" className="px-4 py-2">
              AI Solutions
            </TabsTrigger>
            <TabsTrigger value="social" className="px-4 py-2">
              Social Media
            </TabsTrigger>
            <TabsTrigger value="marketing" className="px-4 py-2">
              Digital Marketing
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            {projects.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">
                  No projects available
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Check back soon for our latest work
                </p>
              </div>
            ) : (
              projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            )}
          </TabsContent>

          <TabsContent value="uiux" className="mt-0">
            {projects.filter((p) => p.category === "uiux").length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">
                  No UI/UX projects available
                </p>
              </div>
            ) : (
              projects
                .filter((p) => p.category === "uiux")
                .map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))
            )}
          </TabsContent>

          <TabsContent value="web" className="mt-0">
            {projects.filter((p) => p.category === "web").length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">
                  No web development projects available
                </p>
              </div>
            ) : (
              projects
                .filter((p) => p.category === "web")
                .map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))
            )}
          </TabsContent>

          <TabsContent value="app" className="mt-0">
            {projects.filter((p) => p.category === "app").length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">
                  No app development projects available
                </p>
              </div>
            ) : (
              projects
                .filter((p) => p.category === "app")
                .map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))
            )}
          </TabsContent>

          <TabsContent value="ai" className="mt-0">
            {projects.filter((p) => p.category === "ai").length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">
                  No AI solution projects available
                </p>
              </div>
            ) : (
              projects
                .filter((p) => p.category === "ai")
                .map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))
            )}
          </TabsContent>

          <TabsContent value="social" className="mt-0">
            {projects.filter((p) => p.category === "social").length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">
                  No social media projects available
                </p>
              </div>
            ) : (
              projects
                .filter((p) => p.category === "social")
                .map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))
            )}
          </TabsContent>

          <TabsContent value="marketing" className="mt-0">
            {projects.filter((p) => p.category === "marketing").length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">
                  No digital marketing projects available
                </p>
              </div>
            ) : (
              projects
                .filter((p) => p.category === "marketing")
                .map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
