"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { getProjectById } from "@/lib/constants";
import { notFound } from "next/navigation";
import * as SiIcons from "react-icons/si";

export default function ProjectDetail() {
  const params = useParams();
  const projectId = params.id;

  // Get project data from constants
  const projectData = getProjectById(projectId);

  // If project not found, show 404
  if (!projectData) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Project Image */}
            <div className="relative">
              <div className="bg-gray-800 rounded-2xl shadow-2xl">
                <div className="relative aspect-[4/3] bg-white rounded-lg overflow-hidden">
                  <Image
                    src={projectData.heroImage}
                    alt={projectData.title}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      // Fallback placeholder
                      e.currentTarget.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%23f3f4f6'/%3E%3Ctext x='400' y='300' text-anchor='middle' dy='.3em' font-family='Arial' font-size='24' fill='%236b7280'%3EProject Image%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Project Info */}
            <div className="space-y-8">
              {/* Logo */}

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                {projectData.title}
              </h1>

              {/* Description */}
              <p className="text-gray-600 text-lg leading-relaxed">
                {projectData.description}
              </p>

              {/* Project Details */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">
                        Type
                      </h3>
                      <p className="text-gray-900">
                        {projectData.details.type}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">
                        Location
                      </h3>
                      <p className="text-gray-900">
                        {projectData.details.location}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">
                        Year
                      </h3>
                      <p className="text-gray-900">
                        {projectData.details.year}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">
                        Services
                      </h3>
                      <p className="text-gray-900">
                        {projectData.details.services}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">
                        Client
                      </h3>
                      <p className="text-gray-900">
                        {projectData.details.client}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">
                        Industry
                      </h3>
                      <p className="text-gray-900">
                        {projectData.details.industry}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technologies Used Section */}
      <div className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <p className="text-gray-400 text-sm uppercase tracking-wider mb-4">
              Technologies Used
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tools behind the Platform
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              A selection of design and development tools used to build a fast,
              scalable, and intuitive experience
            </p>
          </div>

          {/* Technology Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projectData.technologies.map((tech) => (
              <div
                key={tech.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              >
                <div className="mb-4">
                  <span className="text-[#0383CA] text-sm font-medium">
                    {tech.id}
                  </span>
                  <h3 className="text-xl font-semibold text-gray-900 mt-2">
                    {tech.category}
                  </h3>
                </div>
                <div className="space-y-3">
                  {tech.tools.map((tool, index) => {
                    const IconComponent = (SiIcons as any)[
                      tool.icon as keyof typeof SiIcons
                    ];
                    return (
                      <div key={index} className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 ${tool.color} rounded flex items-center justify-center`}
                        >
                          {IconComponent ? (
                            <IconComponent className="text-white text-sm" />
                          ) : (
                            <span className="text-white text-xs font-bold">
                              {tool.icon}
                            </span>
                          )}
                        </div>
                        <span className="text-gray-600">{tool.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <p className="text-gray-400 text-sm uppercase tracking-wider mb-4">
              Key Features
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What This Platform Delivers
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              A breakdown of the core functionalities designed to improve
              efficiency, control, and user experience.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projectData.features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Album Section */}
      <div className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <p className="text-gray-400 text-sm uppercase tracking-wider mb-4">
              Project Album
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore the Visual Experience
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              A curated collection of UI screens showcasing the platform's core
              design, user flow, and overall visual identity
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Large Image - Top Left */}
            {projectData.gallery && projectData.gallery[0] && (
              <div className="md:row-span-2">
                <div className="aspect-[4/5] bg-gray-200 rounded-xl overflow-hidden">
                  <Image
                    src={projectData.gallery[0]}
                    alt="Project gallery image 1"
                    width={600}
                    height={750}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='750' viewBox='0 0 600 750'%3E%3Crect width='600' height='750' fill='%23e5e7eb'/%3E%3Ctext x='300' y='375' text-anchor='middle' dy='.3em' font-family='Arial' font-size='18' fill='%236b7280'%3EGallery Image%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>
              </div>
            )}

            {/* Top Right */}
            {projectData.gallery && projectData.gallery[1] && (
              <div className="aspect-[4/3] bg-gray-200 rounded-xl overflow-hidden">
                <Image
                  src={projectData.gallery[1]}
                  alt="Project gallery image 2"
                  width={600}
                  height={450}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='450' viewBox='0 0 600 450'%3E%3Crect width='600' height='450' fill='%23e5e7eb'/%3E%3Ctext x='300' y='225' text-anchor='middle' dy='.3em' font-family='Arial' font-size='18' fill='%236b7280'%3EGallery Image%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
            )}

            {/* Bottom Right - Split into two */}
            <div className="grid grid-cols-2 gap-6">
              {projectData.gallery && projectData.gallery[2] && (
                <div className="aspect-square bg-gray-200 rounded-xl overflow-hidden">
                  <Image
                    src={projectData.gallery[2]}
                    alt="Project gallery image 3"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Crect width='300' height='300' fill='%23e5e7eb'/%3E%3Ctext x='150' y='150' text-anchor='middle' dy='.3em' font-family='Arial' font-size='14' fill='%236b7280'%3EImage%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>
              )}
              {projectData.gallery && projectData.gallery[3] && (
                <div className="aspect-square bg-gray-200 rounded-xl overflow-hidden">
                  <Image
                    src={projectData.gallery[3]}
                    alt="Project gallery image 4"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Crect width='300' height='300' fill='%23e5e7eb'/%3E%3Ctext x='150' y='150' text-anchor='middle' dy='.3em' font-family='Arial' font-size='14' fill='%236b7280'%3EImage%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Full Width Bottom Image */}
          {projectData.gallery && projectData.gallery[4] && (
            <div className="mt-6">
              <div className="aspect-[21/9] bg-gray-200 rounded-xl overflow-hidden">
                <Image
                  src={projectData.gallery[4]}
                  alt="Project gallery image 5"
                  width={1200}
                  height={514}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='514' viewBox='0 0 1200 514'%3E%3Crect width='1200' height='514' fill='%23e5e7eb'/%3E%3Ctext x='600' y='257' text-anchor='middle' dy='.3em' font-family='Arial' font-size='24' fill='%236b7280'%3EFull Width Gallery Image%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Client Testimonial Section */}
      <div className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <p className="text-gray-400 text-sm uppercase tracking-wider mb-4">
              Client Testimonial
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Client Said
            </h2>
            <p className="text-gray-600 text-lg">
              Real feedback from the people who used and trusted our work
            </p>
          </div>

          {/* Testimonial Card */}
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Client Photo */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden">
                  <Image
                    src={projectData.testimonial.photo}
                    alt={projectData.testimonial.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback placeholder with first letter of name
                      const firstLetter = projectData.testimonial.name
                        .charAt(0)
                        .toUpperCase();
                      e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 96 96'%3E%3Ccircle cx='48' cy='48' r='48' fill='%23dc2626'/%3E%3Ctext x='48' y='58' text-anchor='middle' dy='.3em' font-family='Arial' font-size='32' font-weight='bold' fill='white'%3E${firstLetter}%3C/text%3E%3C/svg%3E`;
                    }}
                  />
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
                  {projectData.testimonial.name}
                </h3>
                <blockquote className="text-gray-700 text-lg leading-relaxed mb-4">
                  "{projectData.testimonial.quote}"
                </blockquote>
                <p className="text-gray-500 text-sm">
                  {projectData.testimonial.date}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
