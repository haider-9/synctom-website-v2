import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
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
  SiNodedotjs,
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

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const caseStudy = await prisma.caseStudy.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!caseStudy) {
    notFound();
  }

  interface Technology {
    name: string;
    icon: string;
    color: string;
    category: string;
  }

  const technologies = (caseStudy.technologies as Technology[]) || [];
  const designTools: Technology[] = technologies.filter(
    (t) => t.category === "design"
  );
  const frontendTools: Technology[] = technologies.filter(
    (t) => t.category === "frontend"
  );
  const backendTools: Technology[] = technologies.filter(
    (t) => t.category === "backend"
  );

  return (
    <div className="min-h-screen">
      {/* Header */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Project Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-start gap-4 sm:gap-6 mb-6">
            {caseStudy.logo && (
              <Image
                src={caseStudy.logo}
                alt={`${caseStudy.title} Logo`}
                width={80}
                height={80}
                className="rounded-lg object-contain border p-2"
              />
            )}
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
                {caseStudy.title}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground">
                {caseStudy.client}
              </p>
            </div>
          </div>

          {/* Cover Image */}
          {caseStudy.coverImage && (
            <div className="aspect-video w-full overflow-hidden rounded-xl border">
              <Image
                src={caseStudy.coverImage}
                alt={caseStudy.title}
                width={1200}
                height={675}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Project Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 sm:mb-12">
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg border">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Industry
            </h3>
            <p className="text-lg font-semibold">{caseStudy.industry}</p>
          </div>
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg border">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Duration
            </h3>
            <p className="text-lg font-semibold">{caseStudy.duration}</p>
          </div>
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg border">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Category
            </h3>
            <p className="text-lg font-semibold capitalize">
              {caseStudy.category
                ? caseStudy.category.replace("-", " ")
                : "General"}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-neutral-900 p-6 sm:p-8 rounded-lg border mb-8 sm:mb-12">
          <h2 className="text-2xl font-bold mb-6">Project Overview</h2>
          <div
            className="prose prose-neutral dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: caseStudy.content }}
          />
        </div>

        {/* Technologies */}
        {technologies.length > 0 && (
          <div className="bg-white dark:bg-neutral-900 p-6 sm:p-8 rounded-lg border mb-8 sm:mb-12">
            <h2 className="text-2xl font-bold mb-6">Technologies Used</h2>
            <div className="space-y-6">
              {designTools.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Design & Prototyping Tools
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {designTools.map((tech, index: number) => {
                      const Icon = iconMap[tech.icon] as React.ComponentType<{
                        className?: string;
                      }>;
                      return (
                        <div
                          key={index}
                          className="flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg"
                        >
                          {Icon && (
                            <Icon className={`${tech.color} text-2xl`} />
                          )}
                          <span className="font-medium">{tech.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {frontendTools.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Frontend Development Tools
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {frontendTools.map((tech, index: number) => {
                      const Icon = iconMap[tech.icon] as React.ComponentType<{
                        className?: string;
                      }>;
                      return (
                        <div
                          key={index}
                          className="flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg"
                        >
                          {Icon && (
                            <Icon className={`${tech.color} text-2xl`} />
                          )}
                          <span className="font-medium">{tech.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {backendTools.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Backend Development Tools
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {backendTools.map((tech, index: number) => {
                      const Icon = iconMap[tech.icon] as React.ComponentType<{
                        className?: string;
                      }>;
                      return (
                        <div
                          key={index}
                          className="flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg"
                        >
                          {Icon && (
                            <Icon className={`${tech.color} text-2xl`} />
                          )}
                          <span className="font-medium">{tech.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Project Images */}
        {caseStudy.images && caseStudy.images.length > 0 && (
          <div className="bg-white dark:bg-neutral-900 p-6 sm:p-8 rounded-lg border">
            <h2 className="text-2xl font-bold mb-6">Project Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {caseStudy.images.map((image: string, index: number) => (
                <div
                  key={index}
                  className="aspect-video overflow-hidden rounded-lg border"
                >
                  <Image
                    src={image}
                    alt={`${caseStudy.title} - Image ${index + 1}`}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className="mt-8 sm:mt-12">
          <Button asChild variant="outline" size="lg">
            <Link href="/portfolio">
              <ArrowLeft className="size-4 mr-2" />
              Back to Portfolio
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
