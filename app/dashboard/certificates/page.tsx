"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, FileText, Plus, Search } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface Certificate {
  id: string;
  internName: string;
  internshipTitle: string;
  startDate: string;
  endDate: string;
  duration: string;
  certificateId: string;
  sequenceNumber: number;
  createdAt: string;
}

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const response = await fetch("/api/certificates");
      const data = await response.json();

      if (data.success) {
        setCertificates(data.certificates);
      } else {
        toast.error(data.message || "Failed to fetch certificates");
      }
    } catch (error) {
      console.error("Error fetching certificates:", error);
      toast.error("Failed to fetch certificates");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Filter certificates based on search query
  const filteredCertificates = useMemo(() => {
    if (!searchQuery.trim()) return certificates;

    const query = searchQuery.toLowerCase();
    return certificates.filter(
      (cert) =>
        cert.internName.toLowerCase().includes(query) ||
        cert.internshipTitle.toLowerCase().includes(query) ||
        cert.certificateId.toLowerCase().includes(query) ||
        cert.sequenceNumber.toString().includes(query)
    );
  }, [certificates, searchQuery]);

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <header className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="size-5" />
              </Link>
            </Button>
            <h1 className="text-xl sm:text-2xl font-bold">Certificates</h1>
          </div>
          <Button asChild>
            <Link href="/certificate-generator">
              <Plus className="size-4 mr-2" />
              Generate New
            </Link>
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-muted-foreground">Loading certificates...</div>
          </div>
        ) : certificates.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="size-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No certificates yet</h3>
            <p className="text-muted-foreground mb-6">
              Generate your first certificate to get started
            </p>
            <Button asChild>
              <Link href="/certificate-generator">
                <Plus className="size-4 mr-2" />
                Generate Certificate
              </Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by name, position, or certificate ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              {searchQuery && (
                <p className="text-sm text-muted-foreground mt-2">
                  Found {filteredCertificates.length} certificate{filteredCertificates.length !== 1 ? "s" : ""}
                </p>
              )}
            </div>

            {filteredCertificates.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="size-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No certificates found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search query
                </p>
                <Button variant="outline" onClick={() => setSearchQuery("")}>
                  Clear Search
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCertificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-neutral-900 border rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FileText className="size-5 text-primary" />
                    <span className="font-mono text-sm font-medium">
                      {cert.certificateId}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    #{cert.sequenceNumber}
                  </span>
                </div>

                <h3 className="font-semibold text-lg mb-1">{cert.internName}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {cert.internshipTitle}
                </p>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium">{cert.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Period:</span>
                    <span className="font-medium">
                      {formatDate(cert.startDate)} - {formatDate(cert.endDate)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Generated:</span>
                    <span className="font-medium">
                      {formatDate(cert.createdAt)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
