import { authFetch } from "../../lib/authFetch";
import React, { useEffect, useState } from "react";
import { PageLayout } from "../../components/PageLayout";
import { StatusBadge } from "../../components/StatusBadge";
import { MetricCard } from "../../components/MetricCard";
import imgUserProfileAvatar from "../../assets/6c7b9dccb9925ee83b19c4f4237c7c6aa454950a.png";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "../../components/ui/breadcrumb";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../../components/ui/table";
import { JobCard } from "./JobCard";
import { usePollingFetch } from "../../hooks/usePollingFetch";

/* ── Static Mock Data (Enriched to match screenshot) ──────────────── */

interface Job {
  id: string;
  device: string;
  type: "ORGANIC" | "PLASTIC" | "GLASS" | "MIXED" | "PAPER";
  location: string;
  zone: string;
  fill: number;
  urgency: "Normal" | "Medium" | "Critical" | "High";
  responseTime: string;
  status: "Pending" | "In Transit" | "Completed";
  assignedTo: string | null;
  distance?: string;
  completedTime?: string;
}

const INITIAL_JOBS_DATA: Job[] = [
  {
    id: "JOB-8829",
    device: "UNIT SN: 8829-W",
    type: "ORGANIC",
    location: "North Sector Hub 04",
    zone: "North Hub, Sector 4",
    fill: 94,
    urgency: "Critical",
    responseTime: "18m Overdue",
    status: "Pending",
    assignedTo: null,
  },
  {
    id: "JOB-1042",
    device: "UNIT SN: 1042-P",
    type: "PLASTIC",
    location: "Downtown Plaza - East",
    zone: "Level 1, East Side",
    fill: 88,
    urgency: "High",
    responseTime: "04m Remaining",
    status: "Pending",
    assignedTo: null,
  },
  {
    id: "JOB-5542",
    device: "UNIT SN: 5542-G",
    type: "GLASS",
    location: "Industrial Park - West Ent.",
    zone: "West Entrance, Row B",
    fill: 75,
    urgency: "Medium",
    responseTime: "Awaiting Pick-up",
    status: "In Transit",
    assignedTo: "Marcus Aurelius",
    distance: "En route - 0.4 miles away",
  },
  {
    id: "JOB-9921",
    device: "UNIT SN: 9921-M",
    type: "MIXED",
    location: "Central Library Courtyard",
    zone: "Courtyard East",
    fill: 82,
    urgency: "Normal",
    responseTime: "Awaiting Route",
    status: "In Transit",
    assignedTo: "Sarah Chen",
    distance: "AWAITING ACTION",
  },
  {
    id: "JOB-2210",
    device: "UNIT SN: 2210-C",
    type: "PAPER",
    location: "Riverside Apartments B3",
    zone: "Block 3 Backdoor",
    fill: 100,
    urgency: "Normal",
    responseTime: "Completed",
    status: "Completed",
    assignedTo: "David Vane",
    completedTime: "14:22 PM",
  },
  {
    id: "JOB-1105",
    device: "UNIT SN: 1105-P",
    type: "PLASTIC",
    location: "Metro Station South",
    zone: "South Entrance Exit",
    fill: 100,
    urgency: "Normal",
    responseTime: "Completed",
    status: "Completed",
    assignedTo: "Marcus Aurelius",
    completedTime: "12:05 PM",
  },
];

const AVAILABLE_COLLECTORS = [
  "Marcus Aurelius",
  "Sarah Chen",
  "David Vane",
  "Kwame Mensah",
  "Abena Osei",
];

const KPIS = [
  {
    title: "Pending Jobs",
    value: "24",
    trend: "12% increase",
    trendDirection: "down" as const,
    iconColorClass: "text-[#006c49]",
    iconBgClass: "bg-[#10b981]/10",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: "Avg Response Time",
    value: "18m 24s",
    trend: "4m faster",
    trendDirection: "up" as const,
    iconColorClass: "text-[#0284c7]",
    iconBgClass: "bg-[#0284c7]/10",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: "Active Collectors",
    value: "08",
    trend: "/ 12 Total",
    trendDirection: "neutral" as const,
    iconColorClass: "text-muted-foreground",
    iconBgClass: "bg-muted",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Tonnage Goal",
    value: "82%",
    trend: "Critical Priority",
    trendDirection: "down" as const,
    iconColorClass: "text-[#ba1a1a]",
    iconBgClass: "bg-[#ffdad6]",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
];

/* ── Helpers ──────────────────────────────────────────────── */

const getUrgencyVariant = (urgency: string) => {
  if (urgency === "Critical" || urgency === "High") return "danger";
  if (urgency === "Medium") return "warning";
  return "success";
};

const getStatusVariant = (status: string) => {
  if (status === "Completed") return "success";
  if (status === "In Transit") return "info";
  return "warning";
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

/* ── Component ───────────────────────────────────────────── */

export default function CollectionJobs() {
  // Switched layouts: Board View vs List View
  const [currentView, setCurrentView] = useState<"board" | "list">("board");

  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS_DATA);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [page, setPage] = useState(1);
  const limit = 10;

  const baseUrl =
    (import.meta as any).env?.VITE_API_BASE_URL ?? "http://localhost:5000";

  const fetchJobs = async () => {
    const response = await authFetch(
      `${baseUrl}/api/jobs?page=${page}&limit=${limit}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch collection jobs");
    }
    return response.json();
  };

  const {
    data: jobsResponse,
    isLoading,
    refresh,
  } = usePollingFetch<any>(fetchJobs, {
    intervalMs: 5000,
  });

  const jobsData = jobsResponse?.data || [];
  const totalCount = jobsResponse?.totalCount || 0;
  const totalPages = jobsResponse?.totalPages || 1;

  useEffect(() => {
    if (jobsResponse?.data) {
      setJobs(jobsResponse.data);
    }
  }, [jobsResponse]);

  // Assigning collectors state
  const [localAssignments, setLocalAssignments] = useState<
    Record<string, string>
  >({});
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);

  const [newJob, setNewJob] = useState({
    location: "",
    device: "",
    fill: 0,
    urgency: "Normal" as const,
    type: "MIXED" as const,
  });

  const [editJob, setEditJob] = useState({
    location: "",
    device: "",
    fill: 0,
    urgency: "Normal" as const,
    type: "MIXED" as const,
  });

  const [errors, setErrors] = useState({
    location: "",
    device: "",
    fill: "",
  });

  // Assign dropdown state handler
  const handleCollectorSelection = (jobId: string, collector: string) => {
    setLocalAssignments((prev) => ({ ...prev, [jobId]: collector }));
  };

  // Accept job (moves Pending -> In Transit)
  const handleAcceptJob = async (jobId: string) => {
    const assignedCollector = localAssignments[jobId];
    if (!assignedCollector || assignedCollector === "Unassigned") return;

    try {
      const response = await authFetch(`${baseUrl}/api/jobs/${jobId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "In Transit",
          collectorId: assignedCollector,
        }),
      });

      if (response.ok) {
        await refresh();
      }
    } catch (error) {
      console.error("Error accepting job:", error);
    }
  };

  // Complete job (moves In Transit -> Completed)
  const handleCompleteJob = async (jobId: string) => {
    try {
      const response = await authFetch(`${baseUrl}/api/jobs/${jobId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "Completed",
        }),
      });

      if (response.ok) {
        await refresh();
      }
    } catch (error) {
      console.error("Error completing job:", error);
    }
  };

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = { location: "", device: "", fill: "" };
    if (!newJob.location.trim())
      newErrors.location = "Bin location is required";
    if (!newJob.device.trim()) newErrors.device = "Device ID is required";
    if (newJob.fill < 0 || newJob.fill > 100)
      newErrors.fill = "Fill % must be between 0 and 100";

    setErrors(newErrors);
    if (Object.values(newErrors).some((err) => err)) return;

    try {
      const response = await authFetch(`${baseUrl}/api/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          device: newJob.device.startsWith("UNIT SN:")
            ? newJob.device.replace("UNIT SN:", "").trim()
            : newJob.device,
          location: newJob.location,
          fill: newJob.fill,
          urgency: newJob.urgency,
          type: newJob.type,
        }),
      });

      if (response.ok) {
        setIsCreateModalOpen(false);
        setNewJob({
          location: "",
          device: "",
          fill: 0,
          urgency: "Normal",
          type: "MIXED",
        });
        setErrors({ location: "", device: "", fill: "" });
        await refresh();
      }
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  // Filter lists based on inputs
  const filteredData = jobs.filter((job) => {
    const matchesSearch =
      job.device.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const pendingJobs = filteredData.filter((j) => j.status === "Pending");
  const inProgressJobs = filteredData.filter((j) => j.status === "In Transit");
  const completedJobs = filteredData.filter((j) => j.status === "Completed");

  return (
    <PageLayout
      title="Collectors Jobs"
      description="Manage real-time waste collection assignments across all active smart-unit clusters."
      hideAlertsIcon={false}
    >
      {/* ── BREADCRUMB AND HEADER NAVIGATION CONTROLS ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/30 dark:border-border/30 pb-5 -mt-2">
        <Breadcrumb>
          <BreadcrumbList className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            <BreadcrumbItem>
              <BreadcrumbLink
                href="#"
                className="hover:text-[#006c49] transition-colors"
              >
                Logistics
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-slate-400">
              &gt;
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-[#006c49] dark:text-[#6ffbbe]">
                Collection Jobs
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* View Switchers + Filters row */}
        <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
          {/* Segmented view switcher */}
          <div className="bg-slate-100 dark:bg-secondary p-1 rounded-xl flex gap-1 border border-slate-200/50 dark:border-border/50">
            <button
              onClick={() => setCurrentView("board")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                currentView === "board"
                  ? "bg-card shadow-sm text-[#006c49] dark:text-emerald-400"
                  : "text-muted-foreground hover:text-[#0f172a]"
              }`}
            >
              Board View
            </button>
            <button
              onClick={() => setCurrentView("list")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                currentView === "list"
                  ? "bg-card shadow-sm text-[#006c49] dark:text-emerald-400"
                  : "text-muted-foreground hover:text-[#0f172a]"
              }`}
            >
              List View
            </button>
          </div>

          <button className="px-4 py-2.5 bg-card border border-border hover:bg-slate-50 dark:hover:bg-secondary text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition-all active:scale-[0.98]">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
            Filters
          </button>

          <button className="px-4 py-2.5 bg-primary hover:bg-primary/90 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-md transition-all active:scale-[0.98] cursor-pointer">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
              <polyline points="16 6 12 2 8 6"></polyline>
              <line x1="12" y1="2" x2="12" y2="15"></line>
            </svg>
            Export Data
          </button>
        </div>
      </div>

      {currentView === "board" ? (
        /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        /* 🗂️ KANBAN BOARD VIEW (Screenshot Match)                  */
        /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start mt-2">
          {/* COLUMN 1: OPEN */}
          <div className="flex flex-col gap-5 bg-slate-50/50 dark:bg-card/20 border border-slate-200/40 dark:border-border/40 p-4.5 rounded-xl min-h-[500px]">
            {/* Header */}
            <div className="flex items-center justify-between pb-2">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 bg-slate-400 dark:bg-[#94a3b8] rounded-full" />
                <span className="text-sm font-black tracking-wider text-foreground uppercase">
                  Open
                </span>
                <span className="bg-slate-200/70 dark:bg-secondary text-[10px] font-black px-2 py-0.5 rounded-full text-slate-600 dark:text-muted-foreground">
                  {String(pendingJobs.length).padStart(2, "0")}
                </span>
              </div>
              <button className="text-slate-400 hover:text-slate-600 font-extrabold text-sm tracking-wider">
                •••
              </button>
            </div>

            {/* Job Cards */}
            <div className="flex flex-col gap-4">
              {pendingJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  availableCollectors={AVAILABLE_COLLECTORS}
                  localAssignment={localAssignments[job.id]}
                  onCollectorSelect={handleCollectorSelection}
                  onAccept={handleAcceptJob}
                  onComplete={handleCompleteJob}
                />
              ))}

              {pendingJobs.length === 0 && (
                <div className="text-center py-12 text-xs text-muted-foreground italic border-2 border-dashed border-slate-200 dark:border-border rounded-xl">
                  No pending tasks in queue.
                </div>
              )}
            </div>
          </div>

          {/* COLUMN 2: IN PROGRESS */}
          <div className="flex flex-col gap-5 bg-slate-50/50 dark:bg-card/20 border border-slate-200/40 dark:border-border/40 p-4.5 rounded-xl min-h-[500px]">
            {/* Header */}
            <div className="flex items-center justify-between pb-2">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 bg-[#2563eb] rounded-full" />
                <span className="text-sm font-black tracking-wider text-foreground uppercase">
                  In Progress
                </span>
                <span className="bg-blue-100/70 dark:bg-secondary text-[10px] font-black px-2 py-0.5 rounded-full text-blue-700 dark:text-primary">
                  {String(inProgressJobs.length).padStart(2, "0")}
                </span>
              </div>
              <button className="text-slate-400 hover:text-slate-600 font-extrabold text-sm tracking-wider">
                •••
              </button>
            </div>

            {/* Job Cards */}
            <div className="flex flex-col gap-4">
              {inProgressJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  availableCollectors={AVAILABLE_COLLECTORS}
                  localAssignment={localAssignments[job.id]}
                  onCollectorSelect={handleCollectorSelection}
                  onAccept={handleAcceptJob}
                  onComplete={handleCompleteJob}
                />
              ))}

              {inProgressJobs.length === 0 && (
                <div className="text-center py-12 text-xs text-muted-foreground italic border-2 border-dashed border-slate-200 dark:border-border rounded-xl">
                  No active dispatches.
                </div>
              )}
            </div>
          </div>

          {/* COLUMN 3: COMPLETE */}
          <div className="flex flex-col gap-5 bg-slate-50/50 dark:bg-card/20 border border-slate-200/40 dark:border-border/40 p-4.5 rounded-xl min-h-[500px]">
            {/* Header */}
            <div className="flex items-center justify-between pb-2">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 bg-green-500 rounded-full" />
                <span className="text-sm font-black tracking-wider text-foreground uppercase">
                  Complete
                </span>
                <span className="bg-green-100/70 dark:bg-secondary text-[10px] font-black px-2 py-0.5 rounded-full text-green-700 dark:text-green-400">
                  {String(completedJobs.length).padStart(2, "0")}
                </span>
              </div>
              <button className="text-slate-400 hover:text-slate-600">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <line x1="4" y1="21" x2="4" y2="14"></line>
                  <line x1="4" y1="10" x2="4" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12" y2="3"></line>
                  <line x1="20" y1="21" x2="20" y2="16"></line>
                  <line x1="20" y1="12" x2="20" y2="3"></line>
                </svg>
              </button>
            </div>

            {/* Job Cards */}
            <div className="flex flex-col gap-4">
              {completedJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  availableCollectors={AVAILABLE_COLLECTORS}
                  localAssignment={localAssignments[job.id]}
                  onCollectorSelect={handleCollectorSelection}
                  onAccept={handleAcceptJob}
                  onComplete={handleCompleteJob}
                />
              ))}

              {completedJobs.length > 0 && (
                <button className="w-full py-3 border border-dashed border-slate-300 dark:border-border hover:bg-slate-50 dark:hover:bg-secondary/40 rounded-xl text-xs font-bold text-muted-foreground text-center transition-colors">
                  View 10 More Completed Jobs
                </button>
              )}

              {completedJobs.length === 0 && (
                <div className="text-center py-12 text-xs text-muted-foreground italic border-2 border-dashed border-slate-200 dark:border-border rounded-xl">
                  No completed jobs.
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        /* 📋 ORIGINAL LIST VIEW WITH TABLES & KPIS                 */
        /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        <div className="flex flex-col gap-6 animate-fade-in">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {KPIS.map((kpi, idx) => (
              <MetricCard
                key={idx}
                title={kpi.title}
                value={kpi.value}
                trend={kpi.trend}
                trendDirection={kpi.trendDirection}
                iconColorClass={kpi.iconColorClass}
                iconBgClass={kpi.iconBgClass}
                iconSvg={kpi.icon}
              />
            ))}
          </div>

          {/* Tabular Job Queue Card */}
          <div className="bg-card border border-border/50 dark:border-border rounded-xl shadow-sm flex flex-col overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4.5 border-b border-[#f1f5f9] dark:border-[#0f2942] bg-background/50 dark:bg-secondary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="font-bold text-foreground dark:text-white text-base">
                Job Queue
              </h3>

              <div className="flex items-center gap-2">
                <div className="flex items-center bg-card rounded-xl border border-border focus-within:border-[#006c49] transition-all overflow-hidden px-3.5 py-2">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#94A3B8"
                    strokeWidth="2.5"
                    className="mr-2"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search jobs..."
                    className="bg-transparent border-none outline-none text-xs font-semibold text-foreground dark:text-white placeholder-[#94a3b8] w-48"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <select
                  className="bg-card border border-border text-muted-foreground text-xs font-bold rounded-xl px-3.5 py-2 hover:bg-background dark:hover:bg-secondary cursor-pointer outline-none focus:ring-2 focus:ring-[#006c49]/20"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="ALL">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="In Transit">In Transit</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <Table className="min-w-[900px]">
                <TableHeader>
                  <TableRow className="hover:bg-transparent bg-slate-50/50 dark:bg-secondary border-b border-border/40 dark:border-border/40">
                    <TableHead className="px-6 py-4.5 text-[10px] font-bold text-slate-500 dark:text-muted-foreground uppercase tracking-wider">
                      Bin Location
                    </TableHead>
                    <TableHead className="px-6 py-4.5 text-[10px] font-bold text-slate-500 dark:text-muted-foreground uppercase tracking-wider">
                      Device ID
                    </TableHead>
                    <TableHead className="px-6 py-4.5 text-[10px] font-bold text-slate-500 dark:text-muted-foreground uppercase tracking-wider">
                      Fill Level
                    </TableHead>
                    <TableHead className="px-6 py-4.5 text-[10px] font-bold text-slate-500 dark:text-muted-foreground uppercase tracking-wider">
                      Urgency
                    </TableHead>
                    <TableHead className="px-6 py-4.5 text-[10px] font-bold text-slate-500 dark:text-muted-foreground uppercase tracking-wider">
                      Status
                    </TableHead>
                    <TableHead className="px-6 py-4.5 text-[10px] font-bold text-slate-500 dark:text-muted-foreground uppercase tracking-wider">
                      Assigned
                    </TableHead>
                    <TableHead className="px-6 py-4.5 text-[10px] font-bold text-slate-500 dark:text-muted-foreground uppercase tracking-wider text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((job) => (
                    <TableRow
                      key={job.id}
                      className="hover:bg-slate-50/50 dark:hover:bg-secondary/30 transition-colors border-b border-border/20 dark:border-border/20 group"
                    >
                      <TableCell className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-foreground dark:text-white">
                            {job.location}
                          </span>
                          <span className="text-[10px] text-slate-500 dark:text-muted-foreground mt-0.5">
                            {job.zone}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-mono text-muted-foreground">
                        {job.device}
                      </TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${job.fill >= 90 ? "bg-[#ba1a1a]" : job.fill >= 80 ? "bg-amber-500" : "bg-green-500"} rounded-full`}
                              style={{ width: `${job.fill}%` }}
                            />
                          </div>
                          <span
                            className={`text-xs font-bold ${job.fill >= 90 ? "text-[#ba1a1a]" : ""}`}
                          >
                            {job.fill}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge
                          label={job.urgency}
                          variant={getUrgencyVariant(job.urgency) as any}
                        />
                      </TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge
                          label={job.status}
                          variant={getStatusVariant(job.status) as any}
                          hasDot
                        />
                      </TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap text-xs">
                        {job.assignedTo ? (
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[9px] font-black text-slate-600">
                              {getInitials(job.assignedTo)}
                            </div>
                            <span className="font-semibold">
                              {job.assignedTo}
                            </span>
                          </div>
                        ) : (
                          <span className="text-slate-400 italic">
                            Unassigned
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap text-right text-xs">
                        {job.status !== "Completed" && (
                          <div className="flex gap-2 justify-end">
                            {job.status === "Pending" ? (
                              <button
                                onClick={() =>
                                  handleCollectorSelection(
                                    job.id,
                                    AVAILABLE_COLLECTORS[0],
                                  )
                                }
                                className="px-3 py-1.5 bg-primary/10 text-[#006c49] font-bold rounded-lg hover:bg-primary/20 transition-all cursor-pointer"
                              >
                                Select Collector
                              </button>
                            ) : (
                              <button
                                onClick={() => handleCompleteJob(job.id)}
                                className="px-3 py-1.5 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all cursor-pointer"
                              >
                                Complete
                              </button>
                            )}
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Empty view */}
            {filteredData.length === 0 && (
              <div className="py-12 text-center text-xs text-slate-400 italic">
                No collection tasks found matching current filters.
              </div>
            )}

            <div className="border-t border-border px-6 py-3 flex items-center justify-between bg-card">
              <span className="text-sm text-muted-foreground">
                Showing {jobs.length > 0 ? (page - 1) * limit + 1 : 0}-
                {Math.min(page * limit, totalCount)} of {totalCount} jobs
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-background cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>

                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages || totalPages === 0}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-background cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* ── Bottom Bento Insights ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-card text-white p-6 rounded-xl relative overflow-hidden shadow-md">
              <div className="relative z-10 flex flex-col gap-2 max-w-md">
                <h4 className="font-bold text-base">Optimization Insight</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  3 bins in the{" "}
                  <span className="text-[#10b981] font-semibold">
                    North Wing
                  </span>{" "}
                  are reaching capacity. Suggesting a batch collection route to
                  save 12 minutes of transit time.
                </p>
                <button className="w-fit mt-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white text-[11px] font-bold rounded-lg transition-colors">
                  Deploy Batch Route
                </button>
              </div>
              <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-primary/20 rounded-full blur-[60px]" />
            </div>

            <div className="bg-card border border-border/50 dark:border-border p-6 rounded-xl flex flex-col gap-4 shadow-sm">
              <h4 className="font-bold text-sm">Facility Load</h4>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between text-xs font-semibold">
                  <span>Sorting Capacity</span>
                  <span>92%</span>
                </div>
                <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: "92%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
}
