"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Search,
  FileText,
  Mail,
  Phone,
  Calendar,
  Download,
  Eye,
  Check,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Application {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  resume: string | null;
  coverLetter: string | null;
  status: string;
  createdAt: string;
  job: {
    title: string;
    location: string;
    type: string;
  };
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<
    Application[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    let filtered = applications;

    // Filter by status
    if (selectedStatus !== "all") {
      filtered = filtered.filter((app) => app.status === selectedStatus);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (app) =>
          app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          app.job.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredApplications(filtered);
  }, [searchQuery, selectedStatus, applications]);

  const fetchApplications = async () => {
    try {
      const response = await fetch("/api/applications");
      const data = await response.json();

      if (data.success) {
        setApplications(data.applications);
        setFilteredApplications(data.applications);
      } else {
        toast.error(data.message || "Failed to fetch applications");
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
      toast.error("Failed to fetch applications");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "reviewed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "accepted":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const downloadResume = (resume: string, name: string) => {
    const link = document.createElement("a");
    link.href = resume;
    link.download = `${name.replace(/\s+/g, "-")}-resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const updateStatus = async (applicationId: string, newStatus: string) => {
    setUpdatingId(applicationId);

    const updatePromise = (async () => {
      const response = await fetch(`/api/applications/${applicationId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to update status");
      }

      // Update local state
      setApplications((prev) =>
        prev.map((app) =>
          app.id === applicationId ? { ...app, status: newStatus } : app
        )
      );
      setFilteredApplications((prev) =>
        prev.map((app) =>
          app.id === applicationId ? { ...app, status: newStatus } : app
        )
      );

      return data;
    })();

    toast.promise(updatePromise, {
      loading: "Updating status...",
      success: "Status updated successfully",
      error: (err) => err.message || "Failed to update status",
      finally: () => setUpdatingId(null),
    });
  };

  const deleteApplication = async (applicationId: string) => {
    if (!confirm("Are you sure you want to delete this application?")) {
      return;
    }

    try {
      const response = await fetch(`/api/applications/${applicationId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        setApplications((prev) =>
          prev.filter((app) => app.id !== applicationId)
        );
        setFilteredApplications((prev) =>
          prev.filter((app) => app.id !== applicationId)
        );
        toast.success("Application deleted successfully");
      } else {
        toast.error(data.message || "Failed to delete application");
      }
    } catch (error) {
      console.error("Error deleting application:", error);
      toast.error("Failed to delete application");
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="size-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">
                Job Applications
              </h1>
              <p className="text-sm text-muted-foreground">
                {filteredApplications.length} application
                {filteredApplications.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by name, email, or job title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {["all", "pending", "reviewed", "accepted", "rejected"].map(
              (status) => (
                <Button
                  key={status}
                  variant={selectedStatus === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedStatus(status)}
                  className="capitalize"
                >
                  {status}
                </Button>
              )
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-muted-foreground">Loading applications...</div>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="text-center py-20">
            <FileText className="size-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              No applications found
            </h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery || selectedStatus !== "all"
                ? "Try adjusting your filters"
                : "Applications will appear here when candidates apply"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredApplications.map((application, index) => (
              <motion.div
                key={application.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-neutral-900 border rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">
                          {application.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Applied for:{" "}
                          <span className="font-medium text-foreground">
                            {application.job.title}
                          </span>
                        </p>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <Mail className="size-3.5" />
                            <a
                              href={`mailto:${application.email}`}
                              className="hover:text-primary"
                            >
                              {application.email}
                            </a>
                          </div>
                          {application.phone && (
                            <div className="flex items-center gap-1.5">
                              <Phone className="size-3.5" />
                              <a
                                href={`tel:${application.phone}`}
                                className="hover:text-primary"
                              >
                                {application.phone}
                              </a>
                            </div>
                          )}
                          <div className="flex items-center gap-1.5">
                            <Calendar className="size-3.5" />
                            <span>{formatDate(application.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(
                            application.status
                          )}`}
                        >
                          {application.status}
                        </span>
                        <Select
                          value={application.status}
                          onValueChange={(value) =>
                            updateStatus(application.id, value)
                          }
                        >
                          <SelectTrigger className="w-[140px] h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="reviewed">Reviewed</SelectItem>
                            <SelectItem value="accepted">Accepted</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded">
                        {application.job.location}
                      </span>
                      <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded">
                        {application.job.type}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {application.resume && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          downloadResume(application.resume!, application.name)
                        }
                        className="gap-2"
                      >
                        <Download className="size-4" />
                        Resume
                      </Button>
                    )}
                    {application.coverLetter && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedApplication(application)}
                        className="gap-2"
                      >
                        <Eye className="size-4" />
                        Cover Letter
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteApplication(application.id)}
                      className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                    >
                      <Trash2 className="size-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Cover Letter Modal */}
      {selectedApplication && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setSelectedApplication(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-neutral-900 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold">Cover Letter</h3>
              <p className="text-sm text-muted-foreground">
                {selectedApplication.name}
              </p>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <p className="whitespace-pre-wrap text-sm leading-relaxed">
                {selectedApplication.coverLetter}
              </p>
            </div>
            <div className="p-6 border-t flex justify-end">
              <Button onClick={() => setSelectedApplication(null)}>
                Close
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
