"use client";
import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface CaseStudy {
  id: string;
  title: string;
  category: string;
  coverImage: string;
}

export default function CaseStudies() {
  const [projects, setProjects] = useState<CaseStudy[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const response = await fetch("/api/case-studies");
        const data = await response.json();

        if (data.success) {
          // Take only first 5 case studies for the homepage
          setProjects(data.caseStudies.slice(0, 5));
        }
      } catch (error) {
        console.error("Error fetching case studies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCaseStudies();
  }, []);

  if (isLoading) {
    return (
      <section className="py-12 sm:py-14 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600">Loading case studies...</p>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return null;
  }

  return (
    <section className="py-12 sm:py-14 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <p className="text-xs sm:text-sm bg-linear-to-r from-[#4F46E5] to-[#3B82F6] bg-clip-text text-transparent mb-2 tracking-[0.3em] sm:tracking-[0.5em] uppercase">
            Case Studies
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-4 sm:px-0">
            Our Defining Projects
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-xs sm:max-w-lg md:max-w-2xl mx-auto px-4 sm:px-0">
            Explore our latest work that blends design excellence with
            engineering precision to deliver measurable business results.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {projects.map((project, index) => {
            const isLarge = index === 0; // Make first project large
            const categoryColor =
              project.category === "Web App/SaaS"
                ? "bg-blue-400"
                : project.category === "Mobile App"
                ? "bg-green-400"
                : "bg-purple-400";

            return (
              <Link
                key={project.id}
                href={`/project/${project.id}`}
                className={`${
                  isLarge ? "sm:col-span-2 lg:col-span-2" : ""
                } bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300`}
              >
                <div className="relative h-48 sm:h-64 md:h-80 bg-gradient-to-br from-gray-800 to-gray-900">
                  {project.coverImage ? (
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      className="object-cover object-center"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white">
                      <span className="text-2xl font-bold">
                        {project.title}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div
                    className={`absolute bottom-0 left-0 ${
                      isLarge ? "w-full sm:w-[30rem]" : "w-full"
                    } text-white backdrop-blur-sm bg-zinc-900/60 rounded-tr-xl p-3 sm:p-4`}
                  >
                    <h3
                      className={`${
                        isLarge
                          ? "text-lg sm:text-xl md:text-2xl"
                          : "text-base sm:text-lg"
                      } font-bold mb-2 sm:mb-3`}
                    >
                      {project.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-2 sm:px-3 py-1 ${categoryColor} text-black text-xs rounded-xs`}
                      >
                        {project.category || "General"}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs sm:text-sm p-1 sm:p-2"
                      >
                        <span className="hidden sm:inline">
                          View Case Study
                        </span>
                        <span className="sm:hidden">View</span>
                        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* See Portfolio Button */}
        <div className="text-center">
          <Link href="/portfolio">
            <Button
              variant="default"
              className="px-6 sm:px-8 py-3 text-sm sm:text-base"
            >
              See Portfolio
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
