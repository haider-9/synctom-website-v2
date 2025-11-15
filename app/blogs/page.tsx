"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Search, Calendar, Clock, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Blog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  featuredImage?: string;
  createdAt: string;
  user: {
    name: string;
  };
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<string[]>(["All"]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blogs");
        const data = await response.json();

        if (data.success) {
          setBlogs(data.blogs);
          setFilteredBlogs(data.blogs);

          // Extract unique categories
          const blogCategories = (data.blogs as Blog[]).map(
            (blog) => blog.category
          );
          const uniqueCategories = [
            "All",
            ...Array.from(new Set(blogCategories)),
          ] as string[];
          setCategories(uniqueCategories);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        toast.error("Failed to load blogs");
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    let filtered = blogs;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((blog) => blog.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredBlogs(filtered);
  }, [selectedCategory, searchQuery, blogs]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <div className="min-h-screen">
      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No blogs found</p>
            <p className="text-sm text-muted-foreground mt-2">
              Try adjusting your search or filter
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog, index) => (
              <Link
                key={blog.id}
                href={`/blogs/${blog.slug}`}
                className="group"
              >
                <article className="h-full bg-white dark:bg-neutral-900 rounded-2xl border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
                  {/* Image Container */}
                  <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-900">
                    {blog.featuredImage ? (
                      <img
                        src={blog.featuredImage}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-6xl font-bold text-neutral-400 dark:text-neutral-600">
                          {blog.title.charAt(0)}
                        </div>
                      </div>
                    )}
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Category Badge on Image */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 bg-primary text-primary-foreground rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm">
                        {blog.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    {/* Meta Info */}
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="size-3.5" />
                        <span>{formatDate(blog.createdAt)}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1.5">
                        <Clock className="size-3.5" />
                        <span>5 min read</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                      {blog.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed flex-1">
                      {blog.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t mt-auto">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white text-xs font-semibold">
                          {blog.user.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm font-medium">
                          {blog.user.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-primary font-medium text-sm group-hover:gap-2 transition-all">
                        Read
                        <ArrowRight className="size-4" />
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
