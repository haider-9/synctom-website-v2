"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Download, Eye } from "lucide-react";
import Link from "next/link";
import CertificatePreview from "@/components/certificate-preview";

export default function CertificateGeneratorPage() {
  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    startDate: "",
    endDate: "",
    position: "Intern AI & ML",
  });
  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePreview = () => {
    if (formData.name && formData.duration) {
      setShowPreview(true);
    }
  };

  const handleDownload = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
      {/* Header */}
      <header className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="size-5" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Certificate Generator</h1>
        </div>
      </header>

      <div className="h-[calc(100vh-73px)] flex">
        {/* Form Section - Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-80 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 p-6 overflow-y-auto"
        >
          <h2 className="text-xl font-bold mb-6">Internship Details</h2>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Intern Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter full name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                name="position"
                type="text"
                placeholder="e.g., Intern AI & ML"
                value={formData.position}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration (in months)</Label>
              <Input
                id="duration"
                name="duration"
                type="text"
                placeholder="e.g., 3 months"
                value={formData.duration}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <Button
                type="button"
                onClick={handlePreview}
                className="w-full shadow-[0_4px_0_#000] active:translate-y-[2px] active:shadow-[0_2px_0_#000]"
                disabled={!formData.name || !formData.duration}
              >
                <Eye className="size-4 mr-2" />
                Preview
              </Button>
              <Button
                type="button"
                onClick={handleDownload}
                variant="outline"
                className="w-full"
                disabled={!showPreview}
              >
                <Download className="size-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </form>
        </motion.div>

        {/* Preview Section - Full Width */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 bg-neutral-50 dark:bg-neutral-950 overflow-y-auto"
        >
          {showPreview ? (
            <div className="min-h-full flex items-center justify-center p-8">
              <div className="w-full max-w-4xl">
                <CertificatePreview formData={formData} />
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground text-lg">
                  Fill in the details and click Preview to see the certificate
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
