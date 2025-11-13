"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Clock, Briefcase, ChevronRight } from "lucide-react";
import Link from "next/link";

const jobListings = [
  {
    id: "software-engineer",
    title: "Software Engineer",
    department: "Engineering",
    location: "Islamabad, Pakistan",
    type: "Full-time",
    experience: "2-4 years",
    description: "We're looking for a talented Software Engineer to join our growing team and help build scalable web applications.",
    requirements: ["React/Next.js", "Node.js", "TypeScript", "REST APIs"],
  },
  {
    id: "ui-ux-designer",
    title: "UI/UX Designer",
    department: "Design",
    location: "Islamabad, Pakistan",
    type: "Full-time",
    experience: "1-3 years",
    description: "Join our design team to create beautiful, user-friendly interfaces for web and mobile applications.",
    requirements: ["Figma", "Adobe XD", "User Research", "Prototyping"],
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    department: "AI & ML",
    location: "Islamabad, Pakistan",
    type: "Full-time",
    experience: "3-5 years",
    description: "Help us build intelligent solutions using machine learning and data analytics.",
    requirements: ["Python", "TensorFlow", "Data Analysis", "ML Algorithms"],
  },
  {
    id: "mobile-developer",
    title: "Mobile Developer",
    department: "Engineering",
    location: "Islamabad, Pakistan",
    type: "Full-time",
    experience: "2-4 years",
    description: "Build high-quality mobile applications for iOS and Android platforms.",
    requirements: ["React Native", "Flutter", "Mobile UI/UX", "API Integration"],
  },
  {
    id: "devops-engineer",
    title: "DevOps Engineer",
    department: "Infrastructure",
    location: "Islamabad, Pakistan",
    type: "Full-time",
    experience: "3-5 years",
    description: "Manage and optimize our cloud infrastructure and deployment pipelines.",
    requirements: ["AWS/Azure", "Docker", "Kubernetes", "CI/CD"],
  },
  {
    id: "intern-ai-ml",
    title: "Intern AI & ML",
    department: "AI & ML",
    location: "Islamabad, Pakistan",
    type: "Internship",
    experience: "0-1 years",
    description: "Learn and contribute to AI/ML projects while working with experienced professionals.",
    requirements: ["Python", "Basic ML Knowledge", "Eager to Learn", "Team Player"],
  },
];

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
      {/* Header */}
      <header className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <ArrowLeft className="size-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Careers at Synctom</h1>
            <p className="text-sm text-muted-foreground">Join our team and build the future</p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Open Positions</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're always looking for talented individuals to join our growing team. 
            Explore our current openings and find your next opportunity.
          </p>
        </motion.div>

        {/* Job Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {jobListings.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/jobs/${job.id}`}>
                <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-800 hover:border-primary transition-all duration-300 hover:shadow-lg group h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{job.department}</p>
                    </div>
                    <ChevronRight className="size-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 flex-1">
                    {job.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="size-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Briefcase className="size-4" />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="size-4" />
                      <span>{job.experience}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {job.requirements.slice(0, 3).map((req) => (
                      <span
                        key={req}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                      >
                        {req}
                      </span>
                    ))}
                    {job.requirements.length > 3 && (
                      <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 text-xs rounded-full">
                        +{job.requirements.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-neutral-900 rounded-xl p-8 border border-neutral-200 dark:border-neutral-800 text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Don't see a perfect fit?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We're always interested in meeting talented people. Send us your resume and we'll keep you in mind for future opportunities.
          </p>
          <Button asChild className="shadow-[0_4px_0_#000] active:translate-y-[2px] active:shadow-[0_2px_0_#000]">
            <a href="mailto:careers@synctom.com">Send Your Resume</a>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
