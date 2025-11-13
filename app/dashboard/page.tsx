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
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const stats = [
  { label: "Jobs Posted", value: "8", icon: Briefcase, color: "bg-blue-600" },
  { label: "Total Applicants", value: "47", icon: Users, color: "bg-purple-600" },
  { label: "Certificates Generated", value: "23", icon: Award, color: "bg-green-600" },
  { label: "Case Studies", value: "12", icon: FileText, color: "bg-orange-600" },
];

const jobsData = [
  { month: "Jan", jobs: 2, applicants: 12 },
  { month: "Feb", jobs: 1, applicants: 8 },
  { month: "Mar", jobs: 3, applicants: 15 },
  { month: "Apr", jobs: 1, applicants: 6 },
  { month: "May", jobs: 0, applicants: 0 },
  { month: "Jun", jobs: 1, applicants: 6 },
];

const recentApplicants = [
  { name: "Hassan Ali", job: "Frontend Developer", time: "2h ago", status: "pending" },
  { name: "Sarah Khan", job: "UI/UX Designer", time: "5h ago", status: "reviewed" },
  { name: "Ahmed Raza", job: "Backend Developer", time: "1d ago", status: "pending" },
  { name: "Fatima Noor", job: "Frontend Developer", time: "2d ago", status: "accepted" },
  { name: "Usman Sheikh", job: "Mobile Developer", time: "3d ago", status: "pending" },
];

const activeJobs = [
  { title: "Frontend Developer Intern", applicants: 12, location: "Remote", posted: "2 weeks ago" },
  { title: "UI/UX Designer Intern", applicants: 8, location: "Karachi", posted: "1 week ago" },
  { title: "Backend Developer Intern", applicants: 15, location: "Remote", posted: "3 days ago" },
];

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

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
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
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardHeader className="pb-3">
                <div className={`${stat.color} p-2.5 rounded-lg w-fit`}>
                  <stat.icon className="size-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
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
              <ChartContainer config={chartConfig} className="h-[280px]">
                <BarChart data={jobsData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="jobs" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="applicants" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Recent Applicants */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Applicants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentApplicants.map((applicant, i) => (
                  <div key={i} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                    <div className="size-9 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-sm font-semibold">
                      {applicant.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{applicant.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{applicant.job}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">{applicant.time}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          applicant.status === 'accepted' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                          applicant.status === 'reviewed' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                          'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                        }`}>
                          {applicant.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Jobs */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Active Job Posts</CardTitle>
            <Button asChild size="sm" variant="outline">
              <Link href="/dashboard/jobs">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeJobs.map((job, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors">
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
                  <Button size="sm" variant="ghost">
                    <Eye className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
