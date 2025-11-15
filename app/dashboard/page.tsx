"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Briefcase,
  Users,
  Award,
  FileText,
  Settings,
  LogOut,
  Bell,
  Search,
  Plus,
  Eye,
  Clock,
  MapPin,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const chartConfig = {
  jobs: {
    label: "Jobs Posted",
    color: "hsl(var(--chart-1))",
  },
  applicants: {
    label: "Applicants",
    color: "hsl(var(--chart-2))",
  },
};

interface Stats {
  jobsPosted: number;
  totalApplicants: number;
  certificatesGenerated: number;
  caseStudies: number;
}

interface ChartData {
  month: string;
  jobs: number;
  applicants: number;
}

interface Applicant {
  name: string;
  job: string;
  time: string;
  status: string;
}

interface ActiveJob {
  id: string;
  slug: string;
  title: string;
  applicants: number;
  location: string;
  posted: string;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [recentApplicants, setRecentApplicants] = useState<Applicant[]>([]);
  const [activeJobs, setActiveJobs] = useState<ActiveJob[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, chartRes, applicantsRes, jobsRes] = await Promise.all([
          fetch("/api/dashboard/stats"),
          fetch("/api/dashboard/chart-data"),
          fetch("/api/dashboard/recent-applicants"),
          fetch("/api/dashboard/active-jobs"),
        ]);

        const [statsData, chartDataRes, applicantsData, jobsData] =
          await Promise.all([
            statsRes.json(),
            chartRes.json(),
            applicantsRes.json(),
            jobsRes.json(),
          ]);

        if (statsData.success) setStats(statsData.stats);
        if (chartDataRes.success) setChartData(chartDataRes.chartData);
        if (applicantsData.success)
          setRecentApplicants(applicantsData.recentApplicants);
        if (jobsData.success) setActiveJobs(jobsData.activeJobs);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast.error("Failed to load dashboard data");
      }
    };

    fetchDashboardData();
  }, []);

  const statsConfig = [
    {
      label: "Jobs Posted",
      value: stats?.jobsPosted || 0,
      icon: Briefcase,
      color: "bg-blue-600",
    },
    {
      label: "Total Applicants",
      value: stats?.totalApplicants || 0,
      icon: Users,
      color: "bg-purple-600",
    },
    {
      label: "Certificates Generated",
      value: stats?.certificatesGenerated || 0,
      icon: Award,
      color: "bg-green-600",
    },
    {
      label: "Case Studies",
      value: stats?.caseStudies || 0,
      icon: FileText,
      color: "bg-orange-600",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-10 w-64" />
            </div>
            <Button variant="ghost" size="icon">
              <Bell className="size-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="size-5" />
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/auth">
                <LogOut className="size-5" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3">
          <Button asChild className="gap-2">
            <Link href="/dashboard/post-job">
              <Plus className="size-4" />
              Post Job
            </Link>
          </Button>
          <Button asChild variant="outline" className="gap-2">
            <Link href="/certificate-generator">
              <Award className="size-4" />
              Generate Certificate
            </Link>
          </Button>
          <Button asChild variant="outline" className="gap-2">
            <Link href="/dashboard/certificates">
              <FileText className="size-4" />
              View Certificates
            </Link>
          </Button>
          <Button asChild variant="outline" className="gap-2">
            <Link href="/dashboard/applications">
              <Briefcase className="size-4" />
              Job Applications
            </Link>
          </Button>
          <Button asChild variant="outline" className="gap-2">
            <Link href="/dashboard/team">
              <Users className="size-4" />
              Manage Team
            </Link>
          </Button>
          <Button asChild variant="outline" className="gap-2">
            <Link href="/dashboard/create-case-study">
              <FileText className="size-4" />
              Create Case Study
            </Link>
          </Button>
          <Button asChild variant="outline" className="gap-2">
            <Link href="/dashboard/create-blog">
              <Plus className="size-4" />
              Write Blog
            </Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statsConfig.map((stat) => (
            <Card key={stat.label}>
              <CardHeader className="pb-3">
                <div className={`${stat.color} p-2.5 rounded-lg w-fit`}>
                  <stat.icon className="size-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Jobs & Applicants Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Jobs & Applicants Overview</CardTitle>
            </CardHeader>
            <CardContent>
              {chartData.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-20">
                  No data available
                </p>
              ) : (
                <ChartContainer config={chartConfig} className="h-full">
                  <BarChart data={chartData} barSize={20}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-muted"
                    />
                    <XAxis dataKey="month" className="text-xs" />
                    <YAxis className="text-xs" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                      dataKey="jobs"
                      fill="hsl(var(--chart-1))"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="applicants"
                      fill="hsl(var(--chart-2))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ChartContainer>
              )}
            </CardContent>
          </Card>

          {/* Recent Applicants */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Applicants</CardTitle>
            </CardHeader>
            <CardContent>
              {recentApplicants.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No recent applicants
                </p>
              ) : (
                <div className="space-y-3">
                  {recentApplicants.map((applicant, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0"
                    >
                      <div className="size-9 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-sm font-semibold">
                        {applicant.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">
                          {applicant.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {applicant.job}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">
                            {applicant.time}
                          </span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              applicant.status === "accepted"
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                : applicant.status === "reviewed"
                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                            }`}
                          >
                            {applicant.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Active Jobs */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Active Job Posts</CardTitle>
            <Button asChild size="sm" variant="outline">
              <Link href="/apply">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            {activeJobs.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No active jobs
              </p>
            ) : (
              <div className="space-y-4">
                {activeJobs.map((job, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{job.title}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="size-4" />
                          {job.applicants} applicants
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="size-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="size-4" />
                          {job.posted}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
