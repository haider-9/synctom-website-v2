"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Upload, CheckCircle2, FileText, X, ZoomIn } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

const jobData: Record<string, { title: string; department: string }> = {
  "software-engineer": { title: "Software Engineer", department: "Engineering" },
  "ui-ux-designer": { title: "UI/UX Designer", department: "Design" },
  "data-scientist": { title: "Data Scientist", department: "AI & ML" },
  "mobile-developer": { title: "Mobile Developer", department: "Engineering" },
  "devops-engineer": { title: "DevOps Engineer", department: "Infrastructure" },
  "intern-ai-ml": { title: "Intern AI & ML", department: "AI & ML" },
};

export default function JobApplicationPage() {
  const params = useParams();
  const jobId = params.jobId as string;
  const job = jobData[jobId] || { title: "Position", department: "" };

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    experience: "",
    linkedIn: "",
    portfolio: "",
    coverLetter: "",
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [imageZoomed, setImageZoomed] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
      {/* Header */}
      <header className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/apply">
              <ArrowLeft className="size-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Apply for {job.title}</h1>
            <p className="text-sm text-muted-foreground">{job.department}</p>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-neutral-900 rounded-xl p-8 border border-neutral-200 dark:border-neutral-800"
          >
            <h2 className="text-xl font-bold mb-2">Application Form</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Fill in your details to apply for this position
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+92 300 1234567"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience *</Label>
                <Input
                  id="experience"
                  name="experience"
                  type="text"
                  placeholder="e.g., 3 years"
                  value={formData.experience}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedIn">LinkedIn Profile</Label>
                <Input
                  id="linkedIn"
                  name="linkedIn"
                  type="url"
                  placeholder="https://linkedin.com/in/yourprofile"
                  value={formData.linkedIn}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="portfolio">Portfolio/GitHub</Label>
                <Input
                  id="portfolio"
                  name="portfolio"
                  type="url"
                  placeholder="https://github.com/yourusername"
                  value={formData.portfolio}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cv">Upload CV/Resume *</Label>
                <div className="relative">
                  <Input
                    id="cv"
                    name="cv"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    required
                    className="cursor-pointer"
                  />
                  {cvFile && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                      <FileText className="size-4" />
                      <span>{cvFile.name}</span>
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  PDF, DOC, or DOCX (Max 5MB)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="coverLetter">Cover Letter</Label>
                <Textarea
                  id="coverLetter"
                  name="coverLetter"
                  placeholder="Tell us why you're a great fit for this position..."
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  rows={4}
                  className="resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full shadow-[0_4px_0_#000] active:translate-y-[2px] active:shadow-[0_2px_0_#000]"
                disabled={submitted}
              >
                {submitted ? (
                  <>
                    <CheckCircle2 className="size-4 mr-2" />
                    Application Submitted!
                  </>
                ) : (
                  <>
                    <Upload className="size-4 mr-2" />
                    Submit Application
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* FAANG CV Priority Notice */}
            <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-800">
              <h3 className="text-lg font-bold mb-3">CV Guidelines</h3>
              <div 
                className="relative w-full h-48 mb-4 rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => setImageZoomed(true)}
              >
                <Image
                  src="/faang.jpg"
                  alt="FAANG Style CV"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <ZoomIn className="size-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p className="font-medium text-foreground">
                  ⭐ FAANG-style CVs will be prioritized
                </p>
                <p>
                  We prefer clean, professional resumes that highlight:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Clear, quantifiable achievements</li>
                  <li>Technical skills and proficiencies</li>
                  <li>Relevant project experience</li>
                  <li>Education and certifications</li>
                  <li>Clean formatting and structure</li>
                </ul>
              </div>
            </div>

            {/* What to Expect */}
            <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-800">
              <h3 className="text-lg font-bold mb-3">What to Expect</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Application Review</p>
                    <p>Our team will review your application within 3-5 business days</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Initial Screening</p>
                    <p>Shortlisted candidates will be contacted for a phone screening</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Technical Interview</p>
                    <p>Technical assessment and team interviews</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                    4
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Final Decision</p>
                    <p>Offer letter for successful candidates</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-800">
              <h3 className="text-lg font-bold mb-3">Need Help?</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>If you have any questions about the application process:</p>
                <p className="flex items-center gap-2">
                  <span>📧</span>
                  <a href="mailto:careers@synctom.com" className="text-primary hover:underline">
                    careers@synctom.com
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <span>📞</span>
                  <span>03144442599</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Image Zoom Modal */}
      <AnimatePresence>
        {imageZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setImageZoomed(false)}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20"
              onClick={() => setImageZoomed(false)}
            >
              <X className="size-6" />
            </Button>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative w-full max-w-4xl aspect-3/4 max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src="/faang.jpg"
                alt="FAANG Style CV - Full View"
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
