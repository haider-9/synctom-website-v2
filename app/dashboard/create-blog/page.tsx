"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { ArrowLeft, Plus, X, Eye } from "lucide-react";
import dynamic from "next/dynamic";
import ImageUpload from "@/components/image-upload";
import { toast } from "sonner";

const TiptapEditor = dynamic(() => import("@/components/editor/tiptap-editor"), {
  ssr: false,
});

interface BlogData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  featuredImage: string;
  metaDescription: string;
  focusKeyword: string;
}

export default function CreateBlogPage() {
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [blogData, setBlogData] = useState<BlogData>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    featuredImage: "",
    metaDescription: "",
    focusKeyword: "",
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
    if (!blogData.title || !blogData.content || !blogData.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    const publishPromise = fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...blogData, tags }),
    }).then(async (response) => {
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to publish blog");
      }
      return response.json();
    });

    toast.promise(publishPromise, {
      loading: "Publishing blog...",
      success: () => {
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1000);
        return "Blog published successfully!";
      },
      error: (err) => err.message || "Failed to publish blog",
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
            <h1 className="text-xl sm:text-2xl font-bold">Write Blog Post</h1>
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
                  <SheetTitle>Blog Preview</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {blogData.featuredImage && (
                    <img src={blogData.featuredImage} alt="Featured" className="w-full rounded-lg" />
                  )}
                  <h1 className="text-3xl font-bold">{blogData.title || "Untitled Blog"}</h1>
                  <p className="text-muted-foreground">{blogData.excerpt}</p>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: blogData.content }} />
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
              <CardTitle>Blog Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Title</label>
                <Input 
                  placeholder="Enter blog title" 
                  className="text-lg"
                  value={blogData.title}
                  onChange={(e) => setBlogData({ ...blogData, title: e.target.value })}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Slug</label>
                <Input 
                  placeholder="blog-post-url"
                  value={blogData.slug}
                  onChange={(e) => setBlogData({ ...blogData, slug: e.target.value })}
                />
                <p className="text-xs text-muted-foreground mt-1">This will be your blog URL</p>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Excerpt</label>
                <textarea 
                  className="w-full min-h-[80px] px-3 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Brief description for preview..."
                  value={blogData.excerpt}
                  onChange={(e) => setBlogData({ ...blogData, excerpt: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Featured Image</CardTitle>
            </CardHeader>
            <CardContent>
              <ImageUpload
                value={blogData.featuredImage}
                onChange={(url) => setBlogData({ ...blogData, featuredImage: url })}
                onRemove={() => setBlogData({ ...blogData, featuredImage: "" })}
              />
              <p className="text-xs text-muted-foreground mt-2">Recommended: 1200x630px</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
            </CardHeader>
            <CardContent>
              <TiptapEditor 
                placeholder="Write your blog content here..."
                content={blogData.content}
                onChange={(content) => setBlogData({ ...blogData, content })}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Categories & Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Category</label>
                <select 
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  value={blogData.category}
                  onChange={(e) => setBlogData({ ...blogData, category: e.target.value })}
                >
                  <option value="">Select category</option>
                  <option value="technology">Technology</option>
                  <option value="design">Design</option>
                  <option value="business">Business</option>
                  <option value="career">Career</option>
                  <option value="tutorial">Tutorial</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Tags</label>
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
                    placeholder="Add tag" 
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <Button onClick={addTag} size="icon">
                    <Plus className="size-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Meta Description</label>
                <textarea 
                  className="w-full min-h-[80px] px-3 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="SEO description (150-160 characters)"
                  maxLength={160}
                  value={blogData.metaDescription}
                  onChange={(e) => setBlogData({ ...blogData, metaDescription: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Focus Keyword</label>
                <Input 
                  placeholder="Main keyword for SEO"
                  value={blogData.focusKeyword}
                  onChange={(e) => setBlogData({ ...blogData, focusKeyword: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button variant="outline" asChild className="flex-1">
              <Link href="/dashboard">Cancel</Link>
            </Button>
            <Button className="flex-1" onClick={handlePublish}>
              Publish Blog
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
