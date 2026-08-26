import React, { useState, useEffect, useMemo } from "react";
import { Loader2, CheckSquare, X, Check } from "lucide-react";
import { PageLayout } from "../../components/PageLayout";
import { StatusBadge } from "../../components/StatusBadge";
import { MetricCard } from "../../components/MetricCard";
import { Progress } from "../../components/ui/progress";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../components/ui/tabs";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import type { CollectorJob } from "./collectorTypes";

// Lazy-load the map to avoid importing Leaflet CSS globally
const BinLocatorMap = React.lazy(() =>
  import("../../components/BinLocatorMap").then((m) => ({
    default: m.BinLocatorMap,
  })),
);

const COLLECTOR_JOBS: CollectorJob[] = [
  {
    id: "JOB-1041",
    device: "#SN-4431-L",
    location: "Main Lobby Entrance",
    zone: "Level 1, Main",
    fill: 82,
    urgency: "High",
    status: "In Transit",
    isAssignedToMe: true,
  },
  {
    id: "JOB-1042",
    device: "#SN-9902-X",
    location: "North Wing Cafe - B3",
    zone: "Level 2, Zone A",
    fill: 94,
    urgency: "Critical",
    status: "Pending",
    isAssignedToMe: false,
  },
  {
    id: "JOB-1040",
    device: "#SN-1108-P",
    location: "West Parking B1",
    zone: "Basement 1, Zone C",
    fill: 78,
    urgency: "Normal",
    status: "Pending",
    isAssignedToMe: false,
  },
  {
    id: "JOB-1039",
    device: "#SN-8871-S",
    location: "Employee Breakroom",
    zone: "Level 4, South",
    fill: 71,
    urgency: "Normal",
    status: "Pending",
    isAssignedToMe: false,
  },
  {
    id: "JOB-1038",
    device: "#SN-5520-R",
    location: "South Lobby",
    zone: "Level 1, Zone B",
    fill: 65,
    urgency: "Normal",
    status: "Completed",
    isAssignedToMe: true,
  },
];

const KNUST_FACILITIES = [
  {
    id: "fac-sci",
    name: "College of Science",
    region: "KNUST",
    coords: [6.6735, -1.5658] as [number, number],
  },
  {
    id: "fac-pharm",
    name: "College of Pharmacy",
    region: "KNUST",
    coords: [6.6786, -1.5711] as [number, number],
  },
  {
    id: "fac-eng",
    name: "College of Engineering",
    region: "KNUST",
    coords: [6.6732, -1.5674] as [number, number],
  },
];

export default function CollectorDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    "my_jobs" | "available_jobs" | "map_view"
  >("available_jobs");
  const [selectedFacilityId, setSelectedFacilityId] =
    useState<string>("fac-sci");
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [facilities, setFacilities] = useState(KNUST_FACILITIES);

  // Sync state with localStorage
  const [jobs, setJobs] = useState<CollectorJob[]>(() => {
    const saved = localStorage.getItem("collector_jobs");
    if (saved) {
      try {
        return JSON.parse(saved) as CollectorJob[];
      } catch (e) {
        console.error(e);
      }
    }
    return COLLECTOR_JOBS;
  });

  useEffect(() => {
    localStorage.setItem("collector_jobs", JSON.stringify(jobs));
  }, [jobs]);

  // Fetch facilities from API to stay synced with Admin Dashboard if online
  useEffect(() => {
    const baseUrl =
      (import.meta as any).env?.VITE_API_BASE_URL ?? "http://localhost:5000";
    fetch(`${baseUrl}/api/admin/facilities`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((f: any) => ({
            id: f.id,
            name: f.name,
            region: f.region || "KNUST",
            coords: [f.latitude, f.longitude] as [number, number],
          }));
          setFacilities(mapped);
        }
      })
      .catch(() => {});
  }, []);

  const currentFacility = useMemo(() => {
    return (
      facilities.find((f) => f.id === selectedFacilityId) ||
      facilities[0] ||
      KNUST_FACILITIES[0]
    );
  }, [facilities, selectedFacilityId]);

  const [isOptimized, setIsOptimized] = useState(true);
  const [isOffline, setIsOffline] = useState(false);
  const [remindJobId, setRemindJobId] = useState<string | null>(null);

  // Sorting assignments: Critical first, then High, then Normal, then by fill level descending
  const getOptimizedRoute = (activeJobs: typeof COLLECTOR_JOBS) => {
    const urgencyWeight = { Critical: 3, High: 2, Normal: 1 };
    return [...activeJobs]
      .filter((j) => j.status !== "Completed")
      .sort((a, b) => {
        const aW = urgencyWeight[a.urgency as keyof typeof urgencyWeight] || 0;
        const bW = urgencyWeight[b.urgency as keyof typeof urgencyWeight] || 0;
        if (aW !== bW) return bW - aW;
        return b.fill - a.fill;
      });
  };

  const handleClaimJob = (id: string) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === id
          ? { ...job, isAssignedToMe: true, status: "In Transit" }
          : job,
      ),
    );
    setActiveTab("my_jobs");
  };

  const handleCompleteJob = (id: string) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === id ? { ...job, status: "Completed" } : job,
      ),
    );
  };

  // Get active assignments (assigned to me and not completed)
  const activeAssignments = jobs.filter(
    (j) => j.isAssignedToMe && j.status !== "Completed",
  );
  const completedToday = jobs.filter(
    (j) => j.isAssignedToMe && j.status === "Completed",
  ).length;
  const totalMyAssignments = jobs.filter((j) => j.isAssignedToMe).length;

  // Calculate quota percentage
  const quotaPercentage =
    totalMyAssignments > 0
      ? Math.round((completedToday / totalMyAssignments) * 100)
      : 0;

  // Create optimized sequence list
  const optimizedRoute = getOptimizedRoute(activeAssignments);

  // Determine which jobs to display in lists
  const displayedJobs = (() => {
    const baseList = jobs.filter((job) =>
      activeTab === "my_jobs"
        ? job.isAssignedToMe
        : !job.isAssignedToMe && job.status === "Pending",
    );
    if (activeTab === "my_jobs" && isOptimized) {
      const completed = baseList.filter((j) => j.status === "Completed");
      return [...optimizedRoute, ...completed];
    }
    return baseList;
  })();

  return (
    <PageLayout
      title="Collector Dashboard"
      description="Welcome back, Kwame. Here are your tasks for today."
      hideAlertsIcon={true}
    >
      {/* Quota & Facility Location Sync Bar */}
      <div className="flex flex-col md:flex-row items-slate-200 md:items-center justify-between gap-4 bg-card border border-border rounded-xl p-5 mb-6 shadow-sm">
        <div className="flex items-center gap-4">
          {/* Circular Quota Progress Ring */}
          <div className="relative h-14 w-14 flex items-center justify-center shrink-0">
            <svg className="h-full w-full transform -rotate-90">
              <circle
                cx="28"
                cy="28"
                r="24"
                strokeWidth="4"
                stroke="currentColor"
                className="text-slate-100 dark:text-slate-800"
                fill="transparent"
              />
              <circle
                cx="28"
                cy="28"
                r="24"
                strokeWidth="4"
                strokeDasharray={150.7}
                strokeDashoffset={150.7 - (150.7 * quotaPercentage) / 100}
                strokeLinecap="round"
                stroke="currentColor"
                className="text-[#006c49] dark:text-emerald-400 transition-all duration-1000"
                fill="transparent"
              />
            </svg>
            <span className="absolute text-[11px] font-black text-foreground dark:text-white">
              {quotaPercentage}%
            </span>
          </div>
          <div>
            <h2 className="text-sm font-bold text-foreground dark:text-white">
              Daily Quota Progress
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Completed {completedToday} of {totalMyAssignments} assigned bins
              today.
            </p>
          </div>
        </div>

        {/* Collector Assigned Facility Location Selector */}
        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              Assigned Collector Facility
            </span>
            <select
              value={selectedFacilityId}
              onChange={(e) => setSelectedFacilityId(e.target.value)}
              className="h-9 px-3 bg-background border border-border rounded-lg text-xs font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
            >
              {facilities.map((fac) => (
                <option key={fac.id} value={fac.id}>
                  📍 {fac.name} ({fac.region})
                </option>
              ))}
            </select>
          </div>

          {/* Offline Sync Mode Control */}
          <div className="flex items-center gap-2 border-l border-border pl-3 ml-1">
            <div className="flex flex-col text-right">
              <span className="text-xs font-bold text-foreground dark:text-white flex items-center gap-1.5 justify-end">
                <span
                  className={`h-2 w-2 rounded-full ${isOffline ? "bg-amber-500 animate-pulse" : "bg-emerald-500 animate-ping"}`}
                />
                {isOffline ? "Local Cache" : "Real-time Sync"}
              </span>
            </div>
            <button
              onClick={() => setIsOffline(!isOffline)}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                isOffline ? "bg-amber-500" : "bg-primary"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  isOffline ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Map-First Split Layout */}
      <div className="relative w-full h-[650px] border border-border rounded-2xl overflow-hidden shadow-md flex flex-col md:flex-row bg-card">
        {/* Left Side: Floating Panel HUD */}
        <div className="w-full md:w-[380px] bg-card border-b md:border-b-0 md:border-r border-border flex flex-col z-20 shrink-0 h-[280px] md:h-full overflow-hidden">
          {/* Tabs Selector Header */}
          <div className="bg-slate-50 dark:bg-secondary border-b border-border flex p-1 gap-1">
            <button
              onClick={() => setActiveTab("available_jobs")}
              className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === "available_jobs"
                  ? "bg-white dark:bg-card text-[#006c49] dark:text-emerald-400 shadow-sm border border-border/50"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Available Bins (
              {
                jobs.filter(
                  (j: any) => !j.isAssignedToMe && j.status === "Pending",
                ).length
              }
              )
            </button>
            <button
              onClick={() => setActiveTab("my_jobs")}
              className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === "my_jobs"
                  ? "bg-white dark:bg-card text-[#006c49] dark:text-emerald-400 shadow-sm border border-border/50"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              My Tasks (
              {
                jobs.filter(
                  (j: any) => j.isAssignedToMe && j.status !== "Completed",
                ).length
              }
              )
            </button>
          </div>

          {/* Job List Scrollable */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            {displayedJobs.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground text-xs">
                No active jobs to display for {currentFacility.name}.
              </div>
            ) : (
              displayedJobs.map((job: any) => {
                const isSelected = selectedJobId === job.id;
                return (
                  <div
                    key={job.id}
                    onClick={() => setSelectedJobId(job.id)}
                    className={`border rounded-xl p-3 bg-card flex flex-col gap-2 transition-all cursor-pointer ${
                      isSelected
                        ? "border-[#006c49] dark:border-emerald-400 ring-2 ring-[#006c49]/20 shadow-sm"
                        : "border-border/80 dark:border-border hover:border-[#0284c7]"
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <span className="text-xs font-extrabold text-foreground dark:text-white block">
                          {job.location}
                        </span>
                        <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500">
                          {job.device} • {job.zone}
                        </span>
                      </div>
                      <StatusBadge
                        label={job.urgency}
                        variant={
                          job.urgency === "Critical"
                            ? "danger"
                            : job.urgency === "High"
                              ? "warning"
                              : "success"
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between gap-3 mt-1">
                      <div className="flex items-center gap-1.5">
                        <Progress
                          value={job.fill}
                          className="w-12 h-1 bg-muted [&>[data-slot=progress-indicator]]:bg-[#ba1a1a] dark:[&>[data-slot=progress-indicator]]:bg-red-500"
                        />
                        <span className="text-[9px] font-bold text-[#ba1a1a] dark:text-red-400">
                          {job.fill}%
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        {activeTab === "available_jobs" ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleClaimJob(job.id);
                            }}
                            className="px-2.5 py-1 bg-primary text-white text-[10px] font-bold rounded-md hover:bg-primary/90 transition-all cursor-pointer"
                          >
                            Claim
                          </button>
                        ) : job.status !== "Completed" ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setRemindJobId(job.id);
                            }}
                            className="px-2.5 py-1 bg-primary text-white text-[10px] font-bold rounded-md hover:bg-primary/90 transition-all cursor-pointer"
                          >
                            Mark Done
                          </button>
                        ) : (
                          <span className="text-[10px] text-emerald-500 font-bold">
                            ✓ Done
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Side: Map Canvas backdrop */}
        <div className="flex-1 h-full relative z-10">
          <React.Suspense
            fallback={
              <div className="flex items-center justify-center h-full text-muted-foreground text-sm gap-2">
                <Loader2 className="animate-spin w-4 h-4" strokeWidth={2} />
                Loading campus map…
              </div>
            }
          >
            <BinLocatorMap
              jobs={displayedJobs}
              facilities={facilities}
              facilityName={currentFacility.name}
              facilityCoords={currentFacility.coords}
              activeTab={activeTab}
              selectedJobId={selectedJobId}
              onSelectJob={(job) => setSelectedJobId(job.id)}
              onClaimJob={handleClaimJob}
              onCompleteJob={(id) => setRemindJobId(id)}
            />
          </React.Suspense>
        </div>
      </div>

      <AnimatePresence>
        {remindJobId &&
          (() => {
            const job = jobs.find((j: any) => j.id === remindJobId);
            if (!job) return null;
            const checklist = [
              "Bin has been physically emptied",
              "Area around the bin is clean",
              "Bin lid is properly closed",
              "Device is functioning normally",
            ];
            return (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-card/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
              >
                <motion.div
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 60, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 28 }}
                  className="bg-card border border-border rounded-xl w-full max-w-sm p-6 shadow-md flex flex-col gap-5"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 text-[#006c49] dark:text-emerald-400 flex items-center justify-center shrink-0">
                        <CheckSquare className="w-5 h-5" strokeWidth={2.5} />
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-foreground dark:text-white">
                          Task Completion Checklist
                        </h3>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                          {job.location}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setRemindJobId(null)}
                      className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors mt-0.5"
                    >
                      <X className="w-[18px] h-[18px]" strokeWidth={2.5} />
                    </button>
                  </div>

                  {/* Job details strip */}
                  <div className="bg-slate-50 dark:bg-secondary rounded-xl px-4 py-3 flex justify-between items-center border border-slate-100 dark:border-border">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      Device
                    </span>
                    <span className="text-[11px] font-mono font-bold text-foreground dark:text-white">
                      {job.device}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      Fill
                    </span>
                    <span className="text-[11px] font-bold text-[#ba1a1a] dark:text-red-400">
                      {job.fill}%
                    </span>
                  </div>

                  {/* Reminder checklist */}
                  <div className="flex flex-col gap-2.5">
                    <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Before marking complete, confirm:
                    </p>
                    {checklist.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <div className="mt-0.5 h-4 w-4 rounded border border-[#006c49] dark:border-emerald-500 bg-primary/10 flex items-center justify-center shrink-0">
                          <Check
                            className="w-[9px] h-[9px] text-[#006c49] dark:text-emerald-400"
                            strokeWidth={3.5}
                          />
                        </div>
                        <span className="text-xs text-foreground dark:text-muted-foreground">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-3 pt-1 border-t border-slate-100 dark:border-[#0f2942]">
                    <button
                      onClick={() => setRemindJobId(null)}
                      className="flex-1 py-2.5 border border-slate-200 dark:border-border text-slate-500 dark:text-slate-400 text-xs font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-secondary transition-colors cursor-pointer"
                    >
                      Not Yet
                    </button>
                    <button
                      onClick={() => {
                        handleCompleteJob(job.id);
                        setRemindJobId(null);
                      }}
                      className="flex-1 py-2.5 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Check className="w-[13px] h-[13px]" strokeWidth={3} />
                      Confirm Complete
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            );
          })()}
      </AnimatePresence>
    </PageLayout>
  );
}
