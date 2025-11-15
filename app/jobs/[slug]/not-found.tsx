import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function JobNotFound() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Job Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The job you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild size="lg">
          <Link href="/apply">
            <ArrowLeft className="size-4 mr-2" />
            Back to Jobs
          </Link>
        </Button>
      </div>
    </div>
  );
}
