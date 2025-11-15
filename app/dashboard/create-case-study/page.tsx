"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { ArrowLeft, Plus, Eye } from "lucide-react";
import dynamic from "next/dynamic";
import ImageUpload from "@/components/image-upload";
import TechStackSelector, { TechStack } from "@/components/tech-stack-selector";
import { toast } from "sonner";

const TiptapEditor = dynamic(
  () => import("@/components/editor/tiptap-editor"),
  {
    ssr: false,
  }
);

interface CaseStudyData {
  title: string;
  client: string;
  industry: string;
  duration: string;
  content: string;
  coverImage: string;
  logo: string;
  images: string[];
  category: string;
}

export default function CreateCaseStudyPage() {
  const [designTools, setDesignTools] = useState<TechStack[]>([]);
  const [frontendTools, setFrontendTools] = useState<TechStack[]>([]);
  const [backendTools, setBackendTools] = useState<TechStack[]>([]);
  const [caseStudyData, setCaseStudyData] = useState<CaseStudyData>({
    title: "",
    client: "",
    industry: "",
    duration: "",
    content: "",
    coverImage: "",
    logo: "",
    images: [],
    category: "",
  });

  const handlePublish = async () => {
    if (
      !caseStudyData.title ||
      !caseStudyData.client ||
      !caseStudyData.content ||
      !caseStudyData.category
    ) {
      toast.error(
        "Please fill in all required fields (title, client, content, category)"
      );
      return;
    }

    const technologies = [
      ...designTools.map((t) => ({ ...t, category: "design" })),
      ...frontendTools.map((t) => ({ ...t, category: "frontend" })),
      ...backendTools.map((t) => ({ ...t, category: "backend" })),
    ];

    const publishPromise = fetch("/api/case-studies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...caseStudyData, technologies }),
    }).then(async (response) => {
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to publish case study");
      }
      return response.json();
    });

    toast.promise(publishPromise, {
      loading: "Publishing case study...",
      success: () => {
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1000);
        return "Case study published successfully!";
      },
      error: (err) => err.message || "Failed to publish case study",
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
            <h1 className="text-xl sm:text-2xl font-bold">Create Case Study</h1>
          </div>
          <div className="flex gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <Eye className="size-4 mr-2" />
                  Preview
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full sm:max-w-2xl overflow-y-auto"
              >
                <SheetHeader>
                  <SheetTitle>Case Study Preview</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {caseStudyData.coverImage && (
                    <img
                      src={caseStudyData.coverImage}
                      alt="Cover"
                      className="w-full rounded-lg"
                    />
                  )}
                  <div className="flex items-center gap-4">
                    {caseStudyData.logo && (
                      <img
                        src={caseStudyData.logo}
                        alt="Logo"
                        className="w-16 h-16 object-contain"
                      />
                    )}
                    <h1 className="text-3xl font-bold">
                      {caseStudyData.title || "Project Title"}
                    </h1>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Client:</span>
                      <p className="font-medium">
                        {caseStudyData.client || "N/A"}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Industry:</span>
                      <p className="font-medium">
                        {caseStudyData.industry || "N/A"}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Duration:</span>
                      <p className="font-medium">
                        {caseStudyData.duration || "N/A"}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Category:</span>
                      <p className="font-medium">
                        {caseStudyData.category || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: caseStudyData.content }}
                  />
                </div>
              </SheetContent>
            </Sheet>
            <Button size="sm" onClick={handlePublish}>
              Publish
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Project Title
                </label>
                <Input
                  placeholder="Enter project title"
                  value={caseStudyData.title}
                  onChange={(e) =>
                    setCaseStudyData({
                      ...caseStudyData,
                      title: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Client Name
                </label>
                <Input
                  placeholder="Enter client name"
                  value={caseStudyData.client}
                  onChange={(e) =>
                    setCaseStudyData({
                      ...caseStudyData,
                      client: e.target.value,
                    })
                  }
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Industry
                  </label>
                  <Input
                    placeholder="e.g., E-commerce, Healthcare"
                    value={caseStudyData.industry}
                    onChange={(e) =>
                      setCaseStudyData({
                        ...caseStudyData,
                        industry: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Duration
                  </label>
                  <Input
                    placeholder="e.g., 3 months"
                    value={caseStudyData.duration}
                    onChange={(e) =>
                      setCaseStudyData({
                        ...caseStudyData,
                        duration: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Category *
                </label>
                <select
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  value={caseStudyData.category}
                  onChange={(e) =>
                    setCaseStudyData({
                      ...caseStudyData,
                      category: e.target.value,
                    })
                  }
                >
                  <option value="">Select category</option>
                  <option value="web">Web Development</option>
                  <option value="app">App Development</option>
                  <option value="uiux">UI/UX Designing</option>
                  <option value="ai">AI Solutions</option>
                  <option value="social">Social Media</option>
                  <option value="marketing">Digital Marketing</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Project Logo</CardTitle>
            </CardHeader>
            <CardContent>
              <ImageUpload
                value={caseStudyData.logo}
                onChange={(url) =>
                  setCaseStudyData({ ...caseStudyData, logo: url })
                }
                onRemove={() =>
                  setCaseStudyData({ ...caseStudyData, logo: "" })
                }
              />
              <p className="text-xs text-muted-foreground mt-2">
                Upload a square logo (PNG recommended)
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cover Image</CardTitle>
            </CardHeader>
            <CardContent>
              <ImageUpload
                value={caseStudyData.coverImage}
                onChange={(url) =>
                  setCaseStudyData({ ...caseStudyData, coverImage: url })
                }
                onRemove={() =>
                  setCaseStudyData({ ...caseStudyData, coverImage: "" })
                }
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Project Story</CardTitle>
            </CardHeader>
            <CardContent>
              <TiptapEditor
                placeholder="Write your case study... Include the challenge, solution, and results."
                content={caseStudyData.content}
                onChange={(content) =>
                  setCaseStudyData({ ...caseStudyData, content })
                }
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Technologies Used</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <TechStackSelector
                value={designTools}
                onChange={setDesignTools}
                category="design"
                label="Design & Prototyping Tools"
              />

              <TechStackSelector
                value={frontendTools}
                onChange={setFrontendTools}
                category="frontend"
                label="Frontend Development Tools"
              />

              <TechStackSelector
                value={backendTools}
                onChange={setBackendTools}
                category="backend"
                label="Backend Development Tools"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Project Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {caseStudyData.images.map((img, index) => (
                  <div key={index} className="relative">
                    <ImageUpload
                      value={img}
                      onChange={(url) => {
                        const newImages = [...caseStudyData.images];
                        newImages[index] = url;
                        setCaseStudyData({
                          ...caseStudyData,
                          images: newImages,
                        });
                      }}
                      onRemove={() => {
                        const newImages = caseStudyData.images.filter(
                          (_, i) => i !== index
                        );
                        setCaseStudyData({
                          ...caseStudyData,
                          images: newImages,
                        });
                      }}
                    />
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setCaseStudyData({
                      ...caseStudyData,
                      images: [...caseStudyData.images, ""],
                    })
                  }
                  className="w-full"
                >
                  <Plus className="size-4 mr-2" />
                  Add Image
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button variant="outline" asChild className="flex-1">
              <Link href="/dashboard">Cancel</Link>
            </Button>
            <Button className="flex-1" onClick={handlePublish}>
              Publish Case Study
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
