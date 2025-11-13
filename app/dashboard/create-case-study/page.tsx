"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { ArrowLeft, Upload, Plus, X, Eye, Loader2 } from "lucide-react";
import dynamic from "next/dynamic";

const TiptapEditor = dynamic(() => import("@/components/editor/tiptap-editor"), {
  ssr: false,
});

interface CaseStudyData {
  title: string;
  client: string;
  industry: string;
  duration: string;
  content: string;
  coverImage: string;
}

export default function CreateCaseStudyPage() {
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [caseStudyData, setCaseStudyData] = useState<CaseStudyData>({
    title: "",
    client: "",
    industry: "",
    duration: "",
    content: "",
    coverImage: "",
  });

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      const response = await fetch("/api/case-studies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...caseStudyData, technologies: tags }),
      });
      
      if (response.ok) {
        alert("Case study published successfully!");
        window.location.href = "/dashboard";
      } else {
        alert("Failed to publish case study");
      }
    } catch (error) {
      console.error("Error publishing case study:", error);
      alert("Error publishing case study");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
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
              <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Case Study Preview</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {caseStudyData.coverImage && (
                    <img src={caseStudyData.coverImage} alt="Cover" className="w-full rounded-lg" />
                  )}
                  <h1 className="text-3xl font-bold">{caseStudyData.title || "Project Title"}</h1>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Client:</span>
                      <p className="font-medium">{caseStudyData.client || "N/A"}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Industry:</span>
                      <p className="font-medium">{caseStudyData.industry || "N/A"}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Duration:</span>
                      <p className="font-medium">{caseStudyData.duration || "N/A"}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: caseStudyData.content }} />
                </div>
              </SheetContent>
            </Sheet>
            <Button size="sm" onClick={handlePublish} disabled={isPublishing}>
              {isPublishing ? <Loader2 className="size-4 mr-2 animate-spin" /> : null}
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
                <label className="text-sm font-medium mb-2 block">Project Title</label>
                <Input 
                  placeholder="Enter project title"
                  value={caseStudyData.title}
                  onChange={(e) => setCaseStudyData({ ...caseStudyData, title: e.target.value })}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Client Name</label>
                <Input 
                  placeholder="Enter client name"
                  value={caseStudyData.client}
                  onChange={(e) => setCaseStudyData({ ...caseStudyData, client: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Industry</label>
                  <Input 
                    placeholder="e.g., E-commerce, Healthcare"
                    value={caseStudyData.industry}
                    onChange={(e) => setCaseStudyData({ ...caseStudyData, industry: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Duration</label>
                  <Input 
                    placeholder="e.g., 3 months"
                    value={caseStudyData.duration}
                    onChange={(e) => setCaseStudyData({ ...caseStudyData, duration: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cover Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                <Upload className="size-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
              </div>
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
                onChange={(content) => setCaseStudyData({ ...caseStudyData, content })}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Technologies Used</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-3">
                {tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-2">
                    {tag}
                    <button onClick={() => removeTag(tag)} className="hover:text-primary/70">
                      <X className="size-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <Input 
                  placeholder="Add technology (e.g., React, Node.js)" 
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <Button onClick={addTag} size="icon">
                  <Plus className="size-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Project Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="aspect-video border-2 border-dashed rounded-lg flex items-center justify-center hover:border-primary transition-colors cursor-pointer">
                    <Upload className="size-8 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button variant="outline" asChild className="flex-1">
              <Link href="/dashboard">Cancel</Link>
            </Button>
            <Button className="flex-1" onClick={handlePublish} disabled={isPublishing}>
              {isPublishing ? <Loader2 className="size-4 mr-2 animate-spin" /> : null}
              Publish Case Study
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
