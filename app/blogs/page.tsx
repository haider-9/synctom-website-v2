"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Search, Calendar, Clock, ArrowRight } from "lucide-react";

const blogs = [
  {
    id: 1,
    title: "Getting Started with React and TypeScript",
    excerpt: "Learn how to set up a modern React project with TypeScript and best practices for type safety.",
    category: "Tutorial",
    date: "Nov 10, 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
    author: "Admin"
  },
  {
    id: 2,
    title: "The Future of Web Development in 2025",
    excerpt: "Exploring emerging trends and technologies that are shaping the future of web development.",
    category: "Technology",
    date: "Nov 8, 2025",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop",
    author: "Admin"
  },
  {
    id: 3,
    title: "Building Scalable APIs with Node.js",
    excerpt: "Best practices and patterns for creating robust and scalable backend services.",
    category: "Backend",
    date: "Nov 5, 2025",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop",
    author: "Admin"
  },
  {
    id: 4,
    title: "UI/UX Design Principles for Developers",
    excerpt: "Essential design principles every developer should know to create better user experiences.",
    category: "Design",
    date: "Nov 3, 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop",
    author: "Admin"
  },
  {
    id: 5,
    title: "Mastering Git and GitHub Workflows",
    excerpt: "A comprehensive guide to version control and collaboration using Git and GitHub.",
    category: "Tutorial",
    date: "Nov 1, 2025",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&h=400&fit=crop",
    author: "Admin"
  },
  {
    id: 6,
    title: "Career Tips for Junior Developers",
    excerpt: "Practical advice and strategies to accelerate your career growth as a junior developer.",
    category: "Career",
    date: "Oct 28, 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop",
    author: "Admin"
  }
];

const categories = ["All", "Tutorial", "Technology", "Design", "Backend", "Career"];

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Header */}
      <header className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">Blog</h1>
              <p className="text-muted-foreground">Insights, tutorials, and updates from our team</p>
            </div>
            <Button asChild>
              <Link href="/">Home</Link>
            </Button>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input placeholder="Search articles..." className="pl-10" />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
              {categories.map((cat) => (
                <Button 
                  key={cat} 
                  variant={cat === "All" ? "default" : "outline"} 
                  size="sm"
                  className="whitespace-nowrap"
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Card key={blog.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="aspect-video overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                <img 
                  src={blog.image} 
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded-full">
                    {blog.category}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="size-3" />
                    {blog.date}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {blog.title}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {blog.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="size-3" />
                    {blog.readTime}
                  </span>
                  <Button variant="ghost" size="sm" className="gap-1 group-hover:gap-2 transition-all">
                    Read More
                    <ArrowRight className="size-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Articles
          </Button>
        </div>
      </div>
    </div>
  );
}
