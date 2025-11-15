import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await prisma.blog.findUnique({
    where: { slug },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!blog) {
    notFound();
  }

  // Update view count
  await prisma.blog.update({
    where: { id: blog.id },
    data: { views: { increment: 1 } },
  });

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
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
    <div className="min-h-screen  ">
      {/* Hero Section */}
      <div className="relative">
        {blog.featuredImage ? (
          <div className="relative h-[50vh] sm:h-[60vh] rounded-3xl overflow-hidden">
            <Image
              src={blog.featuredImage}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            {/* Floating Back Button */}
            <div className="absolute top-6 left-6 z-10">
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full shadow-lg backdrop-blur-sm bg-white/90 dark:bg-neutral-900/90 hover:bg-white dark:hover:bg-neutral-800"
                asChild
              >
                <Link href="/blogs">
                  <ArrowLeft className="size-5" />
                </Link>
              </Button>
            </div>

            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-12">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <span className="px-4 py-1.5 bg-primary text-primary-foreground rounded-full text-sm font-semibold shadow-lg">
                    {blog.category}
                  </span>
                  {blog.tags && blog.tags.length > 0 && (
                    <>
                      {blog.tags.slice(0, 2).map((tag: string) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </>
                  )}
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                  {blog.title}
                </h1>
                {blog.excerpt && (
                  <p className="text-lg sm:text-xl text-white/90 max-w-3xl leading-relaxed">
                    {blog.excerpt}
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-transparent py-20 sm:py-32">
            <div className="max-w-4xl mx-auto px-6 sm:px-8">
              <Button variant="ghost" size="icon" className="mb-8" asChild>
                <Link href="/blogs">
                  <ArrowLeft className="size-5" />
                </Link>
              </Button>
              <div className="flex items-center gap-3 mb-6 flex-wrap">
                <span className="px-4 py-1.5 bg-primary text-primary-foreground rounded-full text-sm font-semibold">
                  {blog.category}
                </span>
                {blog.tags && blog.tags.length > 0 && (
                  <>
                    {blog.tags.slice(0, 3).map((tag: string) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-neutral-200 dark:bg-neutral-800 rounded-full text-xs font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </>
                )}
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
                {blog.title}
              </h1>
              {blog.excerpt && (
                <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
                  {blog.excerpt}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Article Content */}
      <article className="relative">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 py-12 sm:py-16">
          {/* Author & Meta Info Card */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl border shadow-sm p-6 mb-12 -mt-20 relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div>
                  <div className="font-semibold text-lg">{blog.user.name}</div>
                  <div className="text-sm text-muted-foreground">Author</div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="size-4" />
                  <span>{formatDate(blog.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="size-4" />
                  <span>{calculateReadTime(blog.content)}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Eye className="size-4" />
                  <span>{blog.views} views</span>
                </div>
              </div>
            </div>
          </div>

          {/* All Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-12">
              {blog.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-full text-sm font-medium transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Content with Enhanced Styling */}
          <div
            className="prose prose-lg prose-neutral dark:prose-invert max-w-none
              prose-headings:font-bold prose-headings:tracking-tight
              prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-12
              prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-10 prose-h2:pb-2 prose-h2:border-b
              prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-8
              prose-p:text-lg prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground prose-strong:font-semibold
              prose-img:rounded-2xl prose-img:shadow-lg prose-img:my-8 prose-img:border
              prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:font-medium
              prose-code:bg-neutral-100 dark:prose-code:bg-neutral-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-neutral-900 dark:prose-pre:bg-neutral-950 prose-pre:border prose-pre:shadow-lg prose-pre:rounded-xl prose-pre:p-6
              prose-ul:my-6 prose-ul:list-disc prose-ol:my-6 prose-ol:list-decimal
              prose-li:my-2 prose-li:leading-relaxed
              prose-hr:my-12 prose-hr:border-neutral-200 dark:prose-hr:border-neutral-800"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Bottom Navigation */}
          <div className="mt-16 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="gap-2 w-full sm:w-auto"
            >
              <Link href="/blogs">
                <ArrowLeft className="size-4" />
                All Articles
              </Link>
            </Button>
            <div className="text-sm text-muted-foreground text-center sm:text-right">
              Published on {formatDate(blog.createdAt)}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
