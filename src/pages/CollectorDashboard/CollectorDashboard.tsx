import React, { useState, useEffect } from "react";
import { PageLayout } from "../../components/PageLayout";
import { StatusBadge } from "../../components/StatusBadge";
import { MetricCard } from "../../components/MetricCard";
import { Progress } from "../../components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";

const COLLECTOR_JOBS = [
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

export default function CollectorDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"my_jobs" | "available_jobs">(
    "available_jobs",
  );
  
  // Sync state with localStorage
  const [jobs, setJobs] = useState(() => {
    const saved = localStorage.getItem("collector_jobs");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return COLLECTOR_JOBS;
  });

  useEffect(() => {
    localStorage.setItem("collector_jobs", JSON.stringify(jobs));
  }, [jobs]);

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
  const activeAssignments = jobs.filter((j) => j.isAssignedToMe && j.status !== "Completed");
  const completedToday = jobs.filter((j) => j.isAssignedToMe && j.status === "Completed").length;
  const totalMyAssignments = jobs.filter((j) => j.isAssignedToMe).length;
  
  // Calculate quota percentage
  const quotaPercentage = totalMyAssignments > 0 
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
      {/* Quota & Offline Sync Top Bar */}
      <div className="flex flex-col md:flex-row items-slate-200 md:items-center justify-between gap-4 bg-white dark:bg-[#0b1c30] border border-[#e2e8f0] dark:border-[#1e3a5f] rounded-2xl p-5 mb-6 shadow-sm">
        <div className="flex items-center gap-4">
          {/* Circular Quota Progress Ring */}
          <div className="relative h-14 w-14 flex items-center justify-center">
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
                className="text-[#006c49] transition-all duration-1000"
                fill="transparent"
              />
            </svg>
            <span className="absolute text-[11px] font-black text-[#0b1c30] dark:text-white">
              {quotaPercentage}%
            </span>
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#0b1c30] dark:text-white">Daily Quota Progress</h2>
            <p className="text-xs text-[#515f74] dark:text-[#cbd5e1] mt-0.5">
              Completed {completedToday} of {totalMyAssignments} assigned bins today.
            </p>
          </div>
        </div>

        {/* Offline Sync Mode Control */}
        <div className="flex items-center justify-between md:justify-end gap-3 border-t md:border-t-0 pt-3 md:pt-0 border-[#f1f5f9] dark:border-[#0f2942]">
          <div className="flex flex-col text-right">
            <span className="text-xs font-bold text-[#0b1c30] dark:text-white flex items-center gap-1.5 justify-end">
              <span className={`h-2 w-2 rounded-full ${isOffline ? "bg-amber-500 animate-pulse" : "bg-emerald-500 animate-ping"}`} />
              {isOffline ? "Local Cache Mode" : "Real-time Telemetry"}
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
              {isOffline ? "Syncing to local db" : "Syncing to cloud servers"}
            </span>
          </div>
          <button
            onClick={() => setIsOffline(!isOffline)}
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              isOffline ? "bg-amber-500" : "bg-[#006c49]"
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

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <MetricCard
          title="Active Jobs"
          value={activeAssignments.length.toString()}
          trend="Action required"
          trendDirection="neutral"
          iconColorClass="text-[#0284c7]"
          iconBgClass="bg-[#0284c7]/10"
        />
        <MetricCard
          title="Completed Today"
          value={completedToday.toString()}
          trend="Keep it up!"
          trendDirection="up"
          iconColorClass="text-[#006c49]"
          iconBgClass="bg-[#10b981]/10"
        />
        <MetricCard
          title="Available Jobs"
          value={jobs.filter((j) => !j.isAssignedToMe && j.status === "Pending").length.toString()}
          trend="In your area"
          trendDirection="neutral"
          iconColorClass="text-[#f59e0b]"
          iconBgClass="bg-[#f59e0b]/10"
        />
      </div>

      {/* Main Full-Width Section */}
      <div className="flex flex-col gap-6">
        
        {/* Optimized Route Panel / Map Navigation Banner */}
        {activeTab === "my_jobs" && activeAssignments.length > 0 && (
          <div className="bg-gradient-to-r from-[#0284c7]/10 to-[#0369a1]/5 dark:from-[#0c4a6e]/30 dark:to-[#082f49]/20 border border-[#0284c7]/20 dark:border-[#0284c7]/40 rounded-xl p-5 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#0284c7] text-white rounded-lg mt-0.5 shadow-sm animate-pulse">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0b1c30] dark:text-white">
                    🗺️ Logistics Map & Live Routing Ready
                  </h3>
                  <p className="text-xs text-[#515f74] dark:text-[#cbd5e1] mt-0.5">
                    Navigate your optimized sequences on the dedicated Live Logistics Map.
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 self-start md:self-center">
                {/* Auto Optimize Toggle */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#515f74] dark:text-[#cbd5e1]">Auto-Optimize</span>
                  <button
                    onClick={() => setIsOptimized(!isOptimized)}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      isOptimized ? "bg-[#0284c7]" : "bg-[#e2e8f0] dark:bg-[#1e3a5f]"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        isOptimized ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {/* Primary navigation button to map */}
                <button
                  onClick={() => navigate("/collector-map")}
                  className="px-4 py-2 bg-[#0284c7] text-white text-xs font-bold rounded-lg hover:bg-[#0369a1] transition-colors shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  Open Live Map
                </button>
              </div>
            </div>

            {isOptimized && (
              <div className="mt-4 pt-4 border-t border-[#0284c7]/10 dark:border-[#0284c7]/20">
                <h4 className="text-[11px] font-bold text-[#0284c7] dark:text-[#38bdf8] uppercase tracking-wider mb-3">
                  Routing Sequence
                </h4>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 overflow-x-auto pb-1">
                  {optimizedRoute.map((job, idx) => (
                    <React.Fragment key={job.id}>
                      <div 
                        onClick={() => navigate("/collector-map")}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#e2e8f0] dark:border-[#1e3a5f] bg-white/50 dark:bg-[#0b1c30]/50 hover:bg-white dark:hover:bg-[#0f2942] transition-all cursor-pointer"
                      >
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0284c7] text-white text-[10px] font-black">
                          {idx + 1}
                        </span>
                        <div className="flex flex-col">
                          <span className="text-[11px] font-bold text-[#0b1c30] dark:text-white truncate max-w-[100px]">
                            {job.location}
                          </span>
                          <span className="text-[9px] font-mono text-[#64748b] dark:text-[#94a3b8]">
                            {job.urgency} ({job.fill}%)
                          </span>
                        </div>
                      </div>
                      {idx < optimizedRoute.length - 1 && (
                        <div className="hidden sm:block text-[#94a3b8] dark:text-[#64748b]">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                          </svg>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Job List Tabs */}
        <div className="bg-white dark:bg-[#0b1c30] border border-[#e2e8f0] dark:border-[#1e3a5f] rounded-xl shadow-sm flex flex-col overflow-hidden">
          <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as any)} className="w-full gap-0">
            <TabsList className="flex w-full justify-start rounded-none bg-[#f8fafc] dark:bg-[#0f2942] border-b border-[#e2e8f0] dark:border-[#1e3a5f] p-0 h-auto gap-0">
              <TabsTrigger
                value="available_jobs"
                className={`px-6 py-4 text-sm font-bold rounded-none border-b-2 data-[state=active]:border-[#006c49] data-[state=active]:text-[#006c49] data-[state=active]:bg-white dark:data-[state=active]:bg-[#0b1c30] text-[#64748b] dark:text-[#94a3b8] hover:text-[#0b1c30] dark:text-white transition-all shadow-none border-t-0 border-x-0 cursor-pointer`}
              >
                Available Jobs ({jobs.filter((j) => !j.isAssignedToMe && j.status === "Pending").length})
              </TabsTrigger>
              <TabsTrigger
                value="my_jobs"
                className={`px-6 py-4 text-sm font-bold rounded-none border-b-2 data-[state=active]:border-[#006c49] data-[state=active]:text-[#006c49] data-[state=active]:bg-white dark:data-[state=active]:bg-[#0b1c30] text-[#64748b] dark:text-[#94a3b8] hover:text-[#0b1c30] dark:text-white transition-all shadow-none border-t-0 border-x-0 cursor-pointer`}
              >
                My Assignments ({jobs.filter((j) => j.isAssignedToMe && j.status !== "Completed").length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="p-0 m-0">
              <div className="p-4 flex flex-col gap-4">
                {displayedJobs.length === 0 ? (
                  <div className="text-center py-12 text-[#94a3b8] dark:text-[#64748b] text-sm">
                    No jobs to show here.
                  </div>
                ) : (
                  displayedJobs.map((job) => (
                    <div
                      key={job.id}
                      className="border border-[#e2e8f0] dark:border-[#1e3a5f] rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#0b1c30]"
                    >
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="text-base font-bold text-[#0b1c30] dark:text-white">
                            {job.location}
                          </span>
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
                        <span className="text-sm font-mono text-[#515f74] dark:text-[#cbd5e1]">
                          {job.device} • {job.zone}
                        </span>
                        <div className="flex items-center gap-2 mt-2">
                          <Progress
                            value={job.fill}
                            className="w-24 h-1.5 bg-[#f1f5f9] dark:bg-[#1a365d] [&>[data-slot=progress-indicator]]:bg-[#ba1a1a]"
                          />
                          <span className="text-xs font-bold text-[#ba1a1a]">
                            {job.fill}% Full
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center sm:justify-end gap-2">
                        {activeTab === "available_jobs" ? (
                          <button
                            onClick={() => handleClaimJob(job.id)}
                            className="px-4 py-2 bg-[#006c49] text-white text-sm font-bold rounded-lg hover:bg-[#005a3c] transition-colors cursor-pointer animate-[fade-in_0.2s_ease-out]"
                          >
                            Claim Job
                          </button>
                        ) : job.status !== "Completed" ? (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => navigate("/collector-map")}
                              className="px-3 py-2 bg-[#0284c7] text-white text-xs font-bold rounded-lg hover:bg-[#0369a1] transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
                            >
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                              </svg>
                              Open Map Route
                            </button>
                            <button
                              onClick={() => setRemindJobId(job.id)}
                              className="px-3 py-2 bg-[#0b1c30] text-white text-xs font-bold rounded-lg hover:bg-[#1e293b] transition-colors cursor-pointer"
                            >
                              Complete
                            </button>
                          </div>
                        ) : (
                          <StatusBadge label="Completed" variant="success" hasDot />
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

      </div>

      <AnimatePresence>
        {remindJobId && (() => {
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
              className="fixed inset-0 bg-[#0b1c30]/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
            >
              <motion.div
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 60, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                className="bg-white dark:bg-[#0b1c30] border border-[#e2e8f0] dark:border-[#1e3a5f] rounded-2xl w-full max-w-sm p-6 shadow-2xl flex flex-col gap-5"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-[#006c49]/10 text-[#006c49] flex items-center justify-center shrink-0">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 11l3 3L22 4"></path>
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-[#0b1c30] dark:text-white">Task Completion Checklist</h3>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{job.location}</p>
                    </div>
                  </div>
                  <button onClick={() => setRemindJobId(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors mt-0.5">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </button>
                </div>

                {/* Job details strip */}
                <div className="bg-slate-50 dark:bg-[#0f2942] rounded-xl px-4 py-3 flex justify-between items-center border border-slate-100 dark:border-[#1e3a5f]">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">Device</span>
                  <span className="text-[11px] font-mono font-bold text-[#0b1c30] dark:text-white">{job.device}</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">Fill</span>
                  <span className="text-[11px] font-bold text-[#ba1a1a]">{job.fill}%</span>
                </div>

                {/* Reminder checklist */}
                <div className="flex flex-col gap-2.5">
                  <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Before marking complete, confirm:</p>
                  {checklist.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className="mt-0.5 h-4 w-4 rounded border border-[#006c49] bg-[#006c49]/10 flex items-center justify-center shrink-0">
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#006c49" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span className="text-xs text-[#0b1c30] dark:text-[#cbd5e1]">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex gap-3 pt-1 border-t border-slate-100 dark:border-[#0f2942]">
                  <button
                    onClick={() => setRemindJobId(null)}
                    className="flex-1 py-2.5 border border-slate-200 dark:border-[#1e3a5f] text-slate-500 dark:text-slate-400 text-xs font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-[#0f2942] transition-colors cursor-pointer"
                  >
                    Not Yet
                  </button>
                  <button
                    onClick={() => {
                      handleCompleteJob(job.id);
                      setRemindJobId(null);
                    }}
                    className="flex-1 py-2.5 bg-[#006c49] text-white text-xs font-bold rounded-xl hover:bg-[#005a3c] transition-colors shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
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
