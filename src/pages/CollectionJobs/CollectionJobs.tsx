import React, { useState } from "react";
import { PageLayout } from "../../components/PageLayout";
import { StatusBadge } from "../../components/StatusBadge";
import { MetricCard } from "../../components/MetricCard";
import imgUserProfileAvatar from "../../assets/6c7b9dccb9925ee83b19c4f4237c7c6aa454950a.png";

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
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
    iconColorClass: "text-[#515f74] dark:text-[#cbd5e1]",
    iconBgClass: "bg-[#f1f5f9] dark:bg-[#1a365d]",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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

const getTypeColorClasses = (type: string) => {
  switch (type) {
    case "ORGANIC":
      return "bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 border border-amber-200/50 dark:border-amber-900/50";
    case "PLASTIC":
      return "bg-purple-50 dark:bg-purple-950/20 text-purple-700 dark:text-purple-400 border border-purple-200/50 dark:border-purple-900/50";
    case "GLASS":
      return "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900/50";
    case "PAPER":
      return "bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400 border border-blue-200/50 dark:border-blue-900/50";
    default:
      return "bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-800";
  }
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

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS_DATA);
  
  // Assigning collectors state
  const [localAssignments, setLocalAssignments] = useState<Record<string, string>>({});
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
    setLocalAssignments(prev => ({ ...prev, [jobId]: collector }));
  };

  // Accept job (moves Pending -> In Transit)
  const handleAcceptJob = (jobId: string) => {
    const assignedCollector = localAssignments[jobId];
    if (!assignedCollector || assignedCollector === "Unassigned") return;

    setJobs(prev =>
      prev.map(job =>
        job.id === jobId
          ? {
              ...job,
              status: "In Transit",
              assignedTo: assignedCollector,
              distance: "En route - 0.8 miles away",
              responseTime: "Awaiting Pick-up",
            }
          : job
      )
    );
  };

  // Complete job (moves In Transit -> Completed)
  const handleCompleteJob = (jobId: string) => {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setJobs(prev =>
      prev.map(job =>
        job.id === jobId
          ? {
              ...job,
              status: "Completed",
              responseTime: "Completed",
              completedTime: formattedTime,
            }
          : job
      )
    );
  };

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = { location: "", device: "", fill: "" };
    if (!newJob.location.trim()) newErrors.location = "Bin location is required";
    if (!newJob.device.trim()) newErrors.device = "Device ID is required";
    if (newJob.fill < 0 || newJob.fill > 100) newErrors.fill = "Fill % must be between 0 and 100";
    
    setErrors(newErrors);
    if (Object.values(newErrors).some((err) => err)) return;

    const newId = `JOB-${1043 + jobs.length}`;
    const job: Job = {
      id: newId,
      device: newJob.device.startsWith("UNIT SN:") ? newJob.device : `UNIT SN: ${newJob.device}`,
      type: newJob.type as any,
      location: newJob.location,
      zone: "New Zone Portal",
      fill: newJob.fill,
      urgency: newJob.urgency,
      responseTime: "Just Created",
      status: "Pending",
      assignedTo: null,
    };
    
    setJobs((prev) => [job, ...prev]);
    setIsCreateModalOpen(false);
    setNewJob({ location: "", device: "", fill: 0, urgency: "Normal", type: "MIXED" });
    setErrors({ location: "", device: "", fill: "" });
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

  const pendingJobs = filteredData.filter(j => j.status === "Pending");
  const inProgressJobs = filteredData.filter(j => j.status === "In Transit");
  const completedJobs = filteredData.filter(j => j.status === "Completed");

  return (
    <PageLayout
      title="Collectors Jobs"
      description="Manage real-time waste collection assignments across all active smart-unit clusters."
      hideAlertsIcon={false}
    >
      {/* ── BREADCRUMB AND HEADER NAVIGATION CONTROLS ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#cbd5e1]/30 dark:border-[#1e3a5f]/30 pb-5 -mt-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#64748b] uppercase tracking-wider">
          <span>Logistics</span>
          <span>&gt;</span>
          <span className="text-[#006c49] dark:text-[#6ffbbe]">Collection Jobs</span>
        </div>

        {/* View Switchers + Filters row */}
        <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
          {/* Segmented view switcher */}
          <div className="bg-slate-100 dark:bg-[#0f2942] p-1 rounded-xl flex gap-1 border border-slate-200/50 dark:border-[#1e3a5f]/50">
            <button
              onClick={() => setCurrentView("board")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                currentView === "board"
                  ? "bg-white dark:bg-[#0b1c30] shadow-sm text-[#006c49] dark:text-emerald-400"
                  : "text-[#64748b] dark:text-[#cbd5e1] hover:text-[#0f172a]"
              }`}
            >
              Board View
            </button>
            <button
              onClick={() => setCurrentView("list")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                currentView === "list"
                  ? "bg-white dark:bg-[#0b1c30] shadow-sm text-[#006c49] dark:text-emerald-400"
                  : "text-[#64748b] dark:text-[#cbd5e1] hover:text-[#0f172a]"
              }`}
            >
              List View
            </button>
          </div>

          <button className="px-4 py-2.5 bg-white dark:bg-[#0b1c30] border border-[#cbd5e1] dark:border-[#1e3a5f] hover:bg-slate-50 dark:hover:bg-[#0f2942] text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition-all active:scale-[0.98]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
            Filters
          </button>

          <button className="px-4 py-2.5 bg-[#006c49] hover:bg-[#005a3c] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-md transition-all active:scale-[0.98] cursor-pointer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
          <div className="flex flex-col gap-5 bg-slate-50/50 dark:bg-[#0b1c30]/20 border border-slate-200/40 dark:border-[#1e3a5f]/40 p-4.5 rounded-2xl min-h-[500px]">
            {/* Header */}
            <div className="flex items-center justify-between pb-2">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 bg-slate-400 dark:bg-[#94a3b8] rounded-full" />
                <span className="text-sm font-black tracking-wider text-[#0f172a] dark:text-white uppercase">Open</span>
                <span className="bg-slate-200/70 dark:bg-[#0f2942] text-[10px] font-black px-2 py-0.5 rounded-full text-slate-600 dark:text-[#cbd5e1]">
                  {String(pendingJobs.length).padStart(2, "0")}
                </span>
              </div>
              <button className="text-slate-400 hover:text-slate-600 font-extrabold text-sm tracking-wider">•••</button>
            </div>

            {/* Job Cards */}
            <div className="flex flex-col gap-4">
              {pendingJobs.map(job => (
                <div 
                  key={job.id} 
                  className="bg-white dark:bg-[#0b1c30] border border-slate-200/50 dark:border-[#1e3a5f]/50 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-[#006c49]/40 transition-all duration-300 relative flex flex-col gap-4 group"
                >
                  {/* Top Tags */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <span className="bg-blue-50 dark:bg-[#0f2942] text-blue-700 dark:text-blue-400 text-[9px] font-black px-2.5 py-1 rounded-md tracking-wider uppercase border border-blue-100/30">
                        {job.device}
                      </span>
                      <span className={`text-[9px] font-black px-2.5 py-1 rounded-md tracking-wider uppercase ${getTypeColorClasses(job.type)}`}>
                        {job.type}
                      </span>
                    </div>
                    {job.urgency === "Critical" && (
                      <span className="text-[#ba1a1a] animate-pulse flex items-center justify-center font-black text-sm" title="Critical Status">
                        ⚠️
                      </span>
                    )}
                  </div>

                  {/* Bin Name */}
                  <h3 className="text-base font-bold text-[#0f172a] dark:text-white tracking-tight">{job.location}</h3>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 gap-4 border-t border-slate-100 dark:border-[#1e3a5f]/20 pt-3">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Fill Level</span>
                      <span className={`text-sm font-extrabold ${job.fill >= 90 ? 'text-[#ba1a1a]' : 'text-slate-800 dark:text-white'}`}>
                        {job.fill}% Full
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Response Time</span>
                      <span className={`text-sm font-extrabold ${job.urgency === "Critical" ? 'text-[#ba1a1a]' : 'text-slate-800 dark:text-white'}`}>
                        {job.responseTime}
                      </span>
                    </div>
                  </div>

                  {/* Assign Controls */}
                  <div className="flex flex-col gap-2 pt-1.5 border-t border-slate-100 dark:border-[#1e3a5f]/20">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Assign Collector</span>
                    <select
                      value={localAssignments[job.id] || "Unassigned"}
                      onChange={(e) => handleCollectorSelection(job.id, e.target.value)}
                      className="w-full h-10 px-3 border border-slate-200 dark:border-[#1e3a5f] rounded-xl text-xs font-semibold bg-slate-50 dark:bg-[#0b1c30] text-[#0f172a] dark:text-white outline-none cursor-pointer focus:ring-2 focus:ring-[#006c49]/20"
                    >
                      <option value="Unassigned">Unassigned</option>
                      {AVAILABLE_COLLECTORS.map(collector => (
                        <option key={collector} value={collector}>{collector}</option>
                      ))}
                    </select>

                    <button
                      onClick={() => handleAcceptJob(job.id)}
                      disabled={!localAssignments[job.id] || localAssignments[job.id] === "Unassigned"}
                      className={`h-10 w-full rounded-xl text-xs font-bold tracking-wide transition-all active:scale-[0.98] ${
                        localAssignments[job.id] && localAssignments[job.id] !== "Unassigned"
                          ? "bg-[#006c49] hover:bg-[#005a3c] text-white cursor-pointer"
                          : "bg-[#006c49]/10 dark:bg-[#006c49]/20 text-[#006c49]/50 dark:text-emerald-500/50 cursor-not-allowed border border-transparent"
                      }`}
                    >
                      Accept Job
                    </button>
                  </div>
                </div>
              ))}

              {pendingJobs.length === 0 && (
                <div className="text-center py-12 text-xs text-[#94a3b8] dark:text-[#64748b] italic border-2 border-dashed border-slate-200 dark:border-[#1e3a5f] rounded-2xl">
                  No pending tasks in queue.
                </div>
              )}
            </div>
          </div>

          {/* COLUMN 2: IN PROGRESS */}
          <div className="flex flex-col gap-5 bg-slate-50/50 dark:bg-[#0b1c30]/20 border border-slate-200/40 dark:border-[#1e3a5f]/40 p-4.5 rounded-2xl min-h-[500px]">
            {/* Header */}
            <div className="flex items-center justify-between pb-2">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 bg-[#2563eb] rounded-full" />
                <span className="text-sm font-black tracking-wider text-[#0f172a] dark:text-white uppercase">In Progress</span>
                <span className="bg-blue-100/70 dark:bg-[#0f2942] text-[10px] font-black px-2 py-0.5 rounded-full text-blue-700 dark:text-blue-400">
                  {String(inProgressJobs.length).padStart(2, "0")}
                </span>
              </div>
              <button className="text-slate-400 hover:text-slate-600 font-extrabold text-sm tracking-wider">•••</button>
            </div>

            {/* Job Cards */}
            <div className="flex flex-col gap-4">
              {inProgressJobs.map(job => (
                <div 
                  key={job.id} 
                  className="bg-white dark:bg-[#0b1c30] border border-slate-200/50 dark:border-[#1e3a5f]/50 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-[#006c49]/40 transition-all duration-300 flex flex-col gap-4 group"
                >
                  {/* Top Tags */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <span className="bg-blue-50 dark:bg-[#0f2942] text-blue-700 dark:text-blue-400 text-[9px] font-black px-2.5 py-1 rounded-md tracking-wider uppercase border border-blue-100/30">
                        {job.device}
                      </span>
                      <span className={`text-[9px] font-black px-2.5 py-1 rounded-md tracking-wider uppercase ${getTypeColorClasses(job.type)}`}>
                        {job.type}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[9px] font-black text-green-600 tracking-wide bg-green-50 dark:bg-green-950/20 px-2 py-0.5 rounded-md border border-green-200/50 dark:border-green-900/50 uppercase">
                      <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                      Active Dispatch
                    </span>
                  </div>

                  {/* Bin Name */}
                  <h3 className="text-base font-bold text-[#0f172a] dark:text-white tracking-tight">{job.location}</h3>

                  {/* Assigned Collector Details Box */}
                  <div className="bg-slate-50 dark:bg-[#0f2942]/60 border border-slate-100 dark:border-[#1e3a5f]/30 p-3 rounded-xl flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden shrink-0 border border-white">
                      <img src={imgUserProfileAvatar} alt="Collector Profile" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-wider">Assigned Collector</span>
                      <span className="text-xs font-bold text-slate-800 dark:text-white leading-tight">{job.assignedTo}</span>
                      <span className="text-[9px] font-bold text-[#006c49] dark:text-emerald-400 italic mt-0.5 leading-none">{job.distance}</span>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <button className="h-10 border border-slate-200 dark:border-[#1e3a5f] hover:bg-slate-50 dark:hover:bg-[#0f2942] text-slate-600 dark:text-[#cbd5e1] text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all active:scale-[0.98]">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      View Map
                    </button>
                    <button
                      onClick={() => handleCompleteJob(job.id)}
                      className="h-10 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md shadow-green-600/10 active:scale-[0.98]"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Complete
                    </button>
                  </div>
                </div>
              ))}

              {inProgressJobs.length === 0 && (
                <div className="text-center py-12 text-xs text-[#94a3b8] dark:text-[#64748b] italic border-2 border-dashed border-slate-200 dark:border-[#1e3a5f] rounded-2xl">
                  No active dispatches.
                </div>
              )}
            </div>
          </div>

          {/* COLUMN 3: COMPLETE */}
          <div className="flex flex-col gap-5 bg-slate-50/50 dark:bg-[#0b1c30]/20 border border-slate-200/40 dark:border-[#1e3a5f]/40 p-4.5 rounded-2xl min-h-[500px]">
            {/* Header */}
            <div className="flex items-center justify-between pb-2">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 bg-green-500 rounded-full" />
                <span className="text-sm font-black tracking-wider text-[#0f172a] dark:text-white uppercase">Complete</span>
                <span className="bg-green-100/70 dark:bg-[#0f2942] text-[10px] font-black px-2 py-0.5 rounded-full text-green-700 dark:text-green-400">
                  {String(completedJobs.length).padStart(2, "0")}
                </span>
              </div>
              <button className="text-slate-400 hover:text-slate-600">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
              {completedJobs.map(job => (
                <div 
                  key={job.id} 
                  className="bg-white dark:bg-[#0b1c30] border border-slate-200/50 dark:border-[#1e3a5f]/50 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-[#006c49]/40 transition-all duration-300 flex flex-col gap-4 group"
                >
                  {/* Top tags */}
                  <div className="flex items-center justify-between">
                    <span className="bg-slate-50 dark:bg-[#0f2942] text-slate-500 dark:text-[#cbd5e1] text-[9px] font-black px-2.5 py-1 rounded-md tracking-wider uppercase border border-slate-200/20">
                      {job.device}
                    </span>
                    <span className="w-5 h-5 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-600" title="Completed">
                      ✓
                    </span>
                  </div>

                  {/* Bin Location */}
                  <h3 className="text-base font-bold text-[#0f172a] dark:text-white tracking-tight">{job.location}</h3>

                  {/* Completed by row */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-[#1e3a5f]/20">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-200 overflow-hidden border border-white">
                        <img src={imgUserProfileAvatar} alt="Collector Profile" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-xs text-slate-800 dark:text-white font-semibold">{job.assignedTo}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[7.5px] font-bold text-slate-400 uppercase tracking-wider">Time</span>
                      <span className="text-[10px] font-bold text-slate-800 dark:text-white mt-0.5">{job.completedTime}</span>
                    </div>
                  </div>
                </div>
              ))}

              {completedJobs.length > 0 && (
                <button className="w-full py-3 border border-dashed border-slate-300 dark:border-[#1e3a5f] hover:bg-slate-50 dark:hover:bg-[#0f2942]/40 rounded-2xl text-xs font-bold text-[#515f74] dark:text-[#cbd5e1] text-center transition-colors">
                  View 10 More Completed Jobs
                </button>
              )}

              {completedJobs.length === 0 && (
                <div className="text-center py-12 text-xs text-[#94a3b8] dark:text-[#64748b] italic border-2 border-dashed border-slate-200 dark:border-[#1e3a5f] rounded-2xl">
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
          <div className="bg-white dark:bg-[#0b1c30] border border-[#cbd5e1]/50 dark:border-[#1e3a5f] rounded-2xl shadow-sm flex flex-col overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4.5 border-b border-[#f1f5f9] dark:border-[#0f2942] bg-[#f8fafc]/50 dark:bg-[#0f2942]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="font-bold text-[#0b1c30] dark:text-white text-base">Job Queue</h3>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-white dark:bg-[#0b1c30] rounded-xl border border-[#cbd5e1] dark:border-[#1e3a5f] focus-within:border-[#006c49] transition-all overflow-hidden px-3.5 py-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.5" className="mr-2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search jobs..."
                    className="bg-transparent border-none outline-none text-xs font-semibold text-[#0b1c30] dark:text-white placeholder-[#94a3b8] w-48"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <select
                  className="bg-white dark:bg-[#0b1c30] border border-[#cbd5e1] dark:border-[#1e3a5f] text-[#515f74] dark:text-[#cbd5e1] text-xs font-bold rounded-xl px-3.5 py-2 hover:bg-[#f8fafc] dark:hover:bg-[#0f2942] cursor-pointer outline-none focus:ring-2 focus:ring-[#006c49]/20"
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
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-slate-50/50 dark:bg-[#0f2942] border-b border-[#cbd5e1]/40 dark:border-[#1e3a5f]/40">
                    <th className="px-6 py-4.5 text-[10px] font-bold text-slate-500 dark:text-[#cbd5e1] uppercase tracking-wider">Bin Location</th>
                    <th className="px-6 py-4.5 text-[10px] font-bold text-slate-500 dark:text-[#cbd5e1] uppercase tracking-wider">Device ID</th>
                    <th className="px-6 py-4.5 text-[10px] font-bold text-slate-500 dark:text-[#cbd5e1] uppercase tracking-wider">Fill Level</th>
                    <th className="px-6 py-4.5 text-[10px] font-bold text-slate-500 dark:text-[#cbd5e1] uppercase tracking-wider">Urgency</th>
                    <th className="px-6 py-4.5 text-[10px] font-bold text-slate-500 dark:text-[#cbd5e1] uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4.5 text-[10px] font-bold text-slate-500 dark:text-[#cbd5e1] uppercase tracking-wider">Assigned</th>
                    <th className="px-6 py-4.5 text-[10px] font-bold text-slate-500 dark:text-[#cbd5e1] uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#cbd5e1]/20 dark:divide-[#1e3a5f]/20">
                  {filteredData.map((job) => (
                    <tr key={job.id} className="hover:bg-slate-50/50 dark:hover:bg-[#0f2942]/30 transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-[#0b1c30] dark:text-white">{job.location}</span>
                          <span className="text-[10px] text-slate-500 dark:text-[#cbd5e1] mt-0.5">{job.zone}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[#515f74] dark:text-[#cbd5e1]">
                        {job.device}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div className={`h-full ${job.fill >= 90 ? 'bg-[#ba1a1a]' : job.fill >= 80 ? 'bg-amber-500' : 'bg-green-500'} rounded-full`} style={{ width: `${job.fill}%` }} />
                          </div>
                          <span className={`text-xs font-bold ${job.fill >= 90 ? 'text-[#ba1a1a]' : ''}`}>{job.fill}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge label={job.urgency} variant={getUrgencyVariant(job.urgency) as any} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge label={job.status} variant={getStatusVariant(job.status) as any} hasDot />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs">
                        {job.assignedTo ? (
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[9px] font-black text-slate-600">
                              {getInitials(job.assignedTo)}
                            </div>
                            <span className="font-semibold">{job.assignedTo}</span>
                          </div>
                        ) : (
                          <span className="text-slate-400 italic">Unassigned</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-xs">
                        {job.status !== "Completed" && (
                          <div className="flex gap-2 justify-end">
                            {job.status === "Pending" ? (
                              <button
                                onClick={() => handleCollectorSelection(job.id, AVAILABLE_COLLECTORS[0])}
                                className="px-3 py-1.5 bg-[#006c49]/10 text-[#006c49] font-bold rounded-lg hover:bg-[#006c49]/20 transition-all cursor-pointer"
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty view */}
            {filteredData.length === 0 && (
              <div className="py-12 text-center text-xs text-slate-400 italic">
                No collection tasks found matching current filters.
              </div>
            )}
          </div>

          {/* ── Bottom Bento Insights ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-[#0b1c30] text-white p-6 rounded-2xl relative overflow-hidden shadow-md">
              <div className="relative z-10 flex flex-col gap-2 max-w-md">
                <h4 className="font-bold text-base">Optimization Insight</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  3 bins in the <span className="text-[#10b981] font-semibold">North Wing</span> are reaching capacity. Suggesting a batch collection route to save 12 minutes of transit time.
                </p>
                <button className="w-fit mt-2 px-4 py-2 bg-[#006c49] hover:bg-[#005a3c] text-white text-[11px] font-bold rounded-lg transition-colors">
                  Deploy Batch Route
                </button>
              </div>
              <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-[#006c49]/20 rounded-full blur-[60px]" />
            </div>

            <div className="bg-white dark:bg-[#0b1c30] border border-[#cbd5e1]/50 dark:border-[#1e3a5f] p-6 rounded-2xl flex flex-col gap-4 shadow-sm">
              <h4 className="font-bold text-sm">Facility Load</h4>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between text-xs font-semibold">
                  <span>Sorting Capacity</span>
                  <span>92%</span>
                </div>
                <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-[#006c49] rounded-full" style={{ width: "92%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
}
