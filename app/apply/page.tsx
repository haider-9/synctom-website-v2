"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Clock,
  Briefcase,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Job {
  id: string;
  slug: string;
  title: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string;
}

export default function ApplyPage() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("/api/jobs");
        const data = await response.json();
        
        if (data.success) {
          setJobs(data.jobs);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        toast.error("Failed to load jobs");
      }
    };

    fetchJobs();
  }, []);
  return (
    <div className="min-h-screen ">
      {/* Header */}
    

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Open Positions</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're always looking for talented individuals to join our growing
            team. Explore our current openings and find your next opportunity.
          </p>
        </motion.div>

        {/* Job Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {jobs.length === 0 ? (
            <div className="col-span-full text-center py-20">
              <p className="text-muted-foreground text-lg">No open positions at the moment</p>
              <p className="text-sm text-muted-foreground mt-2">Check back soon for new opportunities</p>
            </div>
          ) : (
            jobs.map((job, index) => {
              // Extract plain text from HTML
              const descriptionText = job.description.replace(/<[^>]*>/g, '').substring(0, 150);
              
              // Extract requirements from HTML list items
              const requirementsHtml = job.requirements;
              const liMatches = requirementsHtml.match(/<li[^>]*>(.*?)<\/li>/gi) || [];
              const requirementsList = liMatches
                .map(li => li.replace(/<[^>]*>/g, '').trim())
                .filter(r => r.length > 0);
              
              // Format experience level
              const experienceMap: Record<string, string> = {
                'entry': 'Entry Level',
                'junior': 'Junior (1-2 years)',
                'mid': 'Mid Level (3-5 years)',
                'senior': 'Senior (5+ years)',
              };
              const experienceLabel = experienceMap[job.experience] || job.experience;
              
              // Format job type
              const typeLabel = job.type.split('-').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ');
              
              return (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/jobs/${job.slug}`}>
                    <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-800 hover:border-primary transition-all duration-300 hover:shadow-lg group h-full flex flex-col">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                            {job.title}
                          </h3>
                        </div>
                        <ChevronRight className="size-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>

                      <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-3">
                        {descriptionText}...
                      </p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="size-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Briefcase className="size-4" />
                          <span>{typeLabel}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="size-4" />
                          <span>{experienceLabel}</span>
                        </div>
                      </div>

                      {requirementsList.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {requirementsList.slice(0, 3).map((req, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                            >
                              {req}
                            </span>
                          ))}
                          {requirementsList.length > 3 && (
                            <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 text-xs rounded-full">
                              +{requirementsList.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </Link>
                </motion.div>
              );
            })
          )}
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
            We're always interested in meeting talented people. Send us your
            resume and we'll keep you in mind for future opportunities.
          </p>
          <Button
            asChild
            className="shadow-[0_4px_0_#000] active:translate-y-[2px] active:shadow-[0_2px_0_#000]"
          >
            <a href="mailto:careers@synctom.com">Send Your Resume</a>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
