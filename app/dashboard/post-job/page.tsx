"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { ArrowLeft, Eye, MapPin, Clock, Briefcase, DollarSign } from "lucide-react";
import dynamic from "next/dynamic";
import { toast } from "sonner";

const TiptapEditor = dynamic(() => import("@/components/editor/tiptap-editor"), {
  ssr: false,
});

interface JobData {
  title: string;
  location: string;
  type: string;
  salary: string;
  experience: string;
  description: string;
  requirements: string;
  responsibilities: string;
  benefits: string;
  deadline: string;
}

export default function PostJobPage() {
  const [jobData, setJobData] = useState<JobData>({
    title: "",
    location: "",
    type: "",
    salary: "",
    experience: "",
    description: "",
    requirements: "",
    responsibilities: "",
    benefits: "",
    deadline: "",
  });

  const handlePost = async () => {
    if (!jobData.title || !jobData.location || !jobData.type || !jobData.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    const postPromise = fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jobData),
    }).then(async (response) => {
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to post job");
      }
      return response.json();
    });

    toast.promise(postPromise, {
      loading: "Posting job...",
      success: () => {
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1000);
        return "Job posted successfully!";
      },
      error: (err) => err.message || "Failed to post job",
    });
  };

  return (
    <div className="min-h-screen ">
      <header className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="size-5" />
              </Link>
            </Button>
            <h1 className="text-xl sm:text-2xl font-bold">Post Job</h1>
          </div>
          <div className="flex gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <Eye className="size-4 mr-2" />
                  Preview
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Job Preview</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  <div>
                    <h1 className="text-3xl font-bold mb-4">{jobData.title || "Job Title"}</h1>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="size-4" />
                        {jobData.location || "Location"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="size-4" />
                        {jobData.type || "Job Type"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="size-4" />
                        {jobData.experience || "Experience"}
                      </span>
                      {jobData.salary && (
                        <span className="flex items-center gap-1">
                          <DollarSign className="size-4" />
                          {jobData.salary}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {jobData.description && (
                    <div>
                      <h3 className="font-semibold mb-2">Description</h3>
                      <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: jobData.description }} />
                    </div>
                  )}
                  
                  {jobData.responsibilities && (
                    <div>
                      <h3 className="font-semibold mb-2">Responsibilities</h3>
                      <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: jobData.responsibilities }} />
                    </div>
                  )}
                  
                  {jobData.requirements && (
                    <div>
                      <h3 className="font-semibold mb-2">Requirements</h3>
                      <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: jobData.requirements }} />
                    </div>
                  )}
                  
                  {jobData.benefits && (
                    <div>
                      <h3 className="font-semibold mb-2">Benefits</h3>
                      <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: jobData.benefits }} />
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
            <Button size="sm" onClick={handlePost}>
              Post Job
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Job Title</label>
                <Input 
                  placeholder="e.g., Frontend Developer Intern"
                  value={jobData.title}
                  onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Location</label>
                  <Input 
                    placeholder="e.g., Remote, Karachi"
                    value={jobData.location}
                    onChange={(e) => setJobData({ ...jobData, location: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Job Type</label>
                  <select 
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    value={jobData.type}
                    onChange={(e) => setJobData({ ...jobData, type: e.target.value })}
                  >
                    <option value="">Select type</option>
                    <option value="internship">Internship</option>
                    <option value="full-time">Full Time</option>
                    <option value="part-time">Part Time</option>
                    <option value="contract">Contract</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Experience Level</label>
                  <select 
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    value={jobData.experience}
                    onChange={(e) => setJobData({ ...jobData, experience: e.target.value })}
                  >
                    <option value="">Select level</option>
                    <option value="entry">Entry Level</option>
                    <option value="junior">Junior (1-2 years)</option>
                    <option value="mid">Mid Level (3-5 years)</option>
                    <option value="senior">Senior (5+ years)</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Salary Range (Optional)</label>
                  <Input 
                    placeholder="e.g., $50k - $70k"
                    value={jobData.salary}
                    onChange={(e) => setJobData({ ...jobData, salary: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Application Deadline</label>
                <Input 
                  type="date"
                  value={jobData.deadline}
                  onChange={(e) => setJobData({ ...jobData, deadline: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
            </CardHeader>
            <CardContent>
              <TiptapEditor 
                placeholder="Describe the role and what the candidate will be doing..."
                content={jobData.description}
                onChange={(content) => setJobData({ ...jobData, description: content })}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Responsibilities</CardTitle>
            </CardHeader>
            <CardContent>
              <TiptapEditor 
                placeholder="List the key responsibilities..."
                content={jobData.responsibilities}
                onChange={(content) => setJobData({ ...jobData, responsibilities: content })}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <TiptapEditor 
                placeholder="List the required skills and qualifications..."
                content={jobData.requirements}
                onChange={(content) => setJobData({ ...jobData, requirements: content })}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Benefits (Optional)</CardTitle>
            </CardHeader>
            <CardContent>
              <TiptapEditor 
                placeholder="List the benefits and perks..."
                content={jobData.benefits}
                onChange={(content) => setJobData({ ...jobData, benefits: content })}
              />
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button variant="outline" asChild className="flex-1">
              <Link href="/dashboard">Cancel</Link>
            </Button>
            <Button className="flex-1" onClick={handlePost}>
              Post Job
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
