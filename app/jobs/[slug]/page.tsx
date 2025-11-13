"use client";

import { use, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  MapPin,
  Clock,
  Briefcase,
  DollarSign,
  Calendar,
  ArrowLeft,
  Share2,
  Check,
} from "lucide-react";

interface Job {
  id: string;
  slug: string;
  title: string;
  location: string;
  type: string;
  salary: string;
  experience: string;
  deadline: string;
  postedDate: string;
  description: string;
  responsibilities: string;
  requirements: string;
  benefits: string;
  company: {
    name: string;
    logo: string;
    about: string;
  };
}

export default function JobDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [job, setJob] = useState<Job | null>(null);
  const [isShared, setIsShared] = useState(false);

  useEffect(() => {
    // Fetch job data
    const fetchJob = async () => {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/jobs/${params.slug}`);
      // const data = await response.json();
      // setJob(data.job);

      // Mock data for now
      setJob({
        id: "1",
        slug: slug,
        title: "Frontend Developer Intern",
        location: "Remote",
        type: "Internship",
        salary: "Unpaid",
        experience: "Entry Level",
        deadline: "2025-12-31",
        postedDate: "2025-11-01",
        description: `
          <p>We are looking for a passionate Frontend Developer Intern to join our team. This is a great opportunity to work on real-world projects and learn from experienced developers.</p>
          <p>You'll be working with modern technologies and contributing to our web applications that serve thousands of users.</p>
        `,
        responsibilities: `
          <ul>
            <li>Develop and maintain web applications using React and Next.js</li>
            <li>Collaborate with designers to implement UI/UX designs</li>
            <li>Write clean, maintainable, and efficient code</li>
            <li>Participate in code reviews and team meetings</li>
            <li>Learn and apply best practices in web development</li>
          </ul>
        `,
        requirements: `
          <ul>
            <li>Basic knowledge of HTML, CSS, and JavaScript</li>
            <li>Familiarity with React or similar frameworks</li>
            <li>Understanding of responsive design principles</li>
            <li>Good problem-solving skills</li>
            <li>Ability to work in a team environment</li>
            <li>Currently pursuing or recently completed a degree in Computer Science or related field</li>
          </ul>
        `,
        benefits: `
          <ul>
            <li>Work remotely from anywhere</li>
            <li>Flexible working hours</li>
            <li>Mentorship from senior developers</li>
            <li>Certificate upon completion</li>
            <li>Opportunity for full-time employment</li>
            <li>Real-world project experience</li>
          </ul>
        `,
        company: {
          name: "Synctom",
          logo: "/logo.png",
          about:
            "Synctom is a digital solutions company specializing in web development, mobile apps, and UI/UX design.",
        },
      });
    };

    fetchJob();
  }, [slug]);

  const handleShare = async () => {
    const shareData = {
      title: job?.title || "Job Opening",
      text: `Check out this job opportunity: ${job?.title} at ${job?.company.name}`,
      url: window.location.href,
    };

    try {
      // Check if Web Share API is available
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
      }
      setIsShared(true);
      setTimeout(() => setIsShared(false), 2000);
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  if (!job) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading job details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Header */}
      <header className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/jobs">
                <ArrowLeft className="size-4 mr-2" />
                Back to Jobs
              </Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="gap-2"
            >
              {isShared ? (
                <>
                  <Check className="size-4" />
                  {"share" in navigator ? "Shared!" : "Copied!"}
                </>
              ) : (
                <>
                  <Share2 className="size-4" />
                  Share
                </>
              )}
            </Button>
          </div>

          <div className="flex items-start gap-4 mb-6">
            <img
              src={job.company.logo}
              alt={job.company.name}
              className="size-16 rounded-lg border"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
              <p className="text-lg text-muted-foreground mb-4">
                {job.company.name}
              </p>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="size-4" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="size-4" />
                  {job.type}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="size-4" />
                  {job.experience}
                </span>
                {job.salary && (
                  <span className="flex items-center gap-1">
                    <DollarSign className="size-4" />
                    {job.salary}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Calendar className="size-4" />
                  Deadline: {new Date(job.deadline).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <Button size="lg" className="w-full sm:w-auto" asChild>
            <Link href={`/apply/${job.slug}`}>Apply Now</Link>
          </Button>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Job Description</h2>
                <div
                  className="prose prose-sm max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: job.description }}
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Responsibilities</h2>
                <div
                  className="prose prose-sm max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: job.responsibilities }}
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Requirements</h2>
                <div
                  className="prose prose-sm max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: job.requirements }}
                />
              </CardContent>
            </Card>

            {job.benefits && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Benefits</h2>
                  <div
                    className="prose prose-sm max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: job.benefits }}
                  />
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold mb-4">About {job.company.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {job.company.about}
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/">Visit Website</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold mb-4">Job Details</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Posted:</span>
                    <p className="font-medium">
                      {new Date(job.postedDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Deadline:</span>
                    <p className="font-medium">
                      {new Date(job.deadline).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Job Type:</span>
                    <p className="font-medium">{job.type}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Experience:</span>
                    <p className="font-medium">{job.experience}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Location:</span>
                    <p className="font-medium">{job.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6 text-center">
                <h3 className="font-bold mb-2">Ready to Apply?</h3>
                <p className="text-sm mb-4 opacity-90">
                  Submit your application and join our team
                </p>
                <Button variant="secondary" className="w-full" asChild>
                  <Link href={`/apply/${job.slug}`}>Apply Now</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
