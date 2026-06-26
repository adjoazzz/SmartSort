import { authFetch } from "../../lib/authFetch";
import React, { useState, useEffect, lazy, Suspense } from "react";
import { PageLayout } from "../../components/PageLayout";
import { StatusBadge } from "../../components/StatusBadge";
import { MetricCard } from "../../components/MetricCard";
import { Progress } from "../../components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";
import { usePollingFetch } from "../../hooks/usePollingFetch";

// Lazy-load the map to avoid importing Leaflet CSS globally
const BinLocatorMap = lazy(() =>
  import("../../components/BinLocatorMap").then((m) => ({ default: m.BinLocatorMap }))
);

export default function CollectorDashboard() {
  const [activeTab, setActiveTab] = useState<"my_jobs" | "available_jobs" | "map_view">(
    "available_jobs",
  );
  const [jobs, setJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const baseUrl =
    (import.meta as any).env?.VITE_API_BASE_URL ?? "http://localhost:5000";

  const fetchJobs = async () => {
    const response = await authFetch(`${baseUrl}/api/jobs?limit=100`);
    if (!response.ok) {
      throw new Error("Failed to fetch jobs");
    }
    return response.json();
  };

  const {
    data: jobsResponse,
    refresh,
  } = usePollingFetch<any>(fetchJobs, {
    intervalMs: 5000,
  });

  useEffect(() => {
    if (jobsResponse?.data) {
      setJobs(jobsResponse.data);
      setIsLoading(false);
    }
  }, [jobsResponse]);

  // Filter displayed jobs based on status (for collector view)
  const displayedJobs = jobs.filter((job) =>
    activeTab === "my_jobs"
      ? job.status !== "Completed" // Show active jobs assigned to collector
      : job.status === "Pending", // Show available jobs not yet assigned
  );

  // Jobs shown on the map depend on the active tab context
  const mapJobs =
    activeTab === "map_view"
      ? jobs // show all jobs on the map
      : displayedJobs;

  const handleClaimJob = async (id: string) => {
    try {
      const response = await authFetch(`${baseUrl}/api/jobs/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "In Transit",
        }),
      });

      if (response.ok) {
        await refresh();
        setActiveTab("my_jobs");
      }
    } catch (error) {
      console.error("Error claiming job:", error);
    }
  };

  const handleCompleteJob = async (id: string) => {
    try {
      const response = await authFetch(`${baseUrl}/api/jobs/${id}`, {
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

  return (
    <PageLayout
      title="Collector Dashboard"
      description="Welcome back, Kwame. Here are your tasks for today."
      hideAlertsIcon={true}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <MetricCard
          title="Active Jobs"
          value={jobs
            .filter((j) => j.status !== "Completed")
            .length.toString()}
          trend="Action required"
          trendDirection="neutral"
          iconColorClass="text-[#0284c7]"
          iconBgClass="bg-[#0284c7]/10"
        />
        <MetricCard
          title="Completed Today"
          value={jobs
            .filter((j) => j.status === "Completed")
            .length.toString()}
          trend="Keep it up!"
          trendDirection="up"
          iconColorClass="text-[#006c49]"
          iconBgClass="bg-[#10b981]/10"
        />
        <MetricCard
          title="Available Jobs"
          value={jobs
            .filter((j) => j.status === "Pending")
            .length.toString()}
          trend="In your area"
          trendDirection="neutral"
          iconColorClass="text-[#f59e0b]"
          iconBgClass="bg-[#f59e0b]/10"
        />
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm flex flex-col overflow-hidden">
        <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as any)} className="w-full gap-0">
          {/* Tabs */}
          <TabsList className="flex w-full justify-start rounded-none bg-background dark:bg-secondary border-b border-border p-0 h-auto gap-0">
            <TabsTrigger
              value="available_jobs"
              className={`px-6 py-4 text-sm font-bold rounded-none border-b-2 data-[state=active]:border-[#006c49] data-[state=active]:text-[#006c49] data-[state=active]:bg-white dark:data-[state=active]:bg-card text-muted-foreground hover:text-foreground dark:text-white transition-all shadow-none border-t-0 border-x-0 cursor-pointer`}
            >
              Available Jobs (
              {
                jobs.filter((j) => j.status === "Pending").length
              }
              )
            </TabsTrigger>
            <TabsTrigger
              value="my_jobs"
              className={`px-6 py-4 text-sm font-bold rounded-none border-b-2 data-[state=active]:border-[#006c49] data-[state=active]:text-[#006c49] data-[state=active]:bg-white dark:data-[state=active]:bg-card text-muted-foreground hover:text-foreground dark:text-white transition-all shadow-none border-t-0 border-x-0 cursor-pointer`}
            >
              My Assignments (
              {
                jobs.filter((j) => j.status !== "Completed").length
              }
              )
            </TabsTrigger>
            <TabsTrigger
              value="map_view"
              className={`px-6 py-4 text-sm font-bold rounded-none border-b-2 data-[state=active]:border-[#006c49] data-[state=active]:text-[#006c49] data-[state=active]:bg-white dark:data-[state=active]:bg-card text-muted-foreground hover:text-foreground dark:text-white transition-all shadow-none border-t-0 border-x-0 cursor-pointer flex items-center gap-2`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              Map View
            </TabsTrigger>
          </TabsList>

          {/* List tabs */}
          <TabsContent value="available_jobs" className="p-0 m-0">
            <JobList
              jobs={displayedJobs}
              isLoading={isLoading}
              activeTab="available_jobs"
              onClaimJob={handleClaimJob}
              onCompleteJob={handleCompleteJob}
            />
          </TabsContent>

          <TabsContent value="my_jobs" className="p-0 m-0">
            <JobList
              jobs={displayedJobs}
              isLoading={isLoading}
              activeTab="my_jobs"
              onClaimJob={handleClaimJob}
              onCompleteJob={handleCompleteJob}
            />
          </TabsContent>

          {/* Map tab */}
          <TabsContent value="map_view" className="p-0 m-0" style={{ height: 520 }}>
            {isLoading ? (
              <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                Loading jobs…
              </div>
            ) : (
              <Suspense
                fallback={
                  <div className="flex items-center justify-center h-full text-muted-foreground text-sm gap-2">
                    <svg
                      className="animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                    </svg>
                    Loading map…
                  </div>
                }
              >
                <BinLocatorMap
                  jobs={jobs}
                  activeTab={activeTab}
                  onClaimJob={handleClaimJob}
                  onCompleteJob={handleCompleteJob}
                />
              </Suspense>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
}

// ─── Extracted job list sub-component ────────────────────────────────────────
interface JobListProps {
  jobs: any[];
  isLoading: boolean;
  activeTab: "available_jobs" | "my_jobs";
  onClaimJob: (id: string) => void;
  onCompleteJob: (id: string) => void;
}

function JobList({ jobs, isLoading, activeTab, onClaimJob, onCompleteJob }: JobListProps) {
  return (
    <div className="p-4 flex flex-col gap-4">
      {isLoading ? (
        <div className="text-center py-12 text-muted-foreground text-sm">
          Loading jobs...
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground text-sm">
          No jobs to show here.
        </div>
      ) : (
        jobs.map((job) => (
          <div
            key={job.id}
            className="border border-border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#cbd5e1] dark:hover:border-[#334155] transition-colors bg-card"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-foreground dark:text-white">
                  {job.location || "Unknown Location"}
                </span>
                <StatusBadge
                  label={job.urgency || "Normal"}
                  variant={
                    job.urgency === "Critical" || job.urgency === "Urgent"
                      ? "danger"
                      : job.urgency === "High"
                        ? "warning"
                        : "success"
                  }
                />
              </div>
              <span className="text-sm font-mono text-muted-foreground">
                {job.device?.customBinId || job.id} • {job.zone || job.location || "N/A"}
              </span>
              <div className="flex items-center gap-2 mt-2">
                <Progress
                  value={job.fill || job.device?.fillLevel || 0}
                  className="w-24 h-1.5 bg-muted dark:bg-muted [&>[data-slot=progress-indicator]]:bg-[#ba1a1a]"
                />
                <span className="text-xs font-bold text-[#ba1a1a]">
                  {job.fill || job.device?.fillLevel || 0}% Full
                </span>
              </div>
            </div>

            <div className="flex items-center sm:justify-end gap-2">
              {activeTab === "available_jobs" ? (
                <button
                  onClick={() => onClaimJob(job.id)}
                  className="px-4 py-2 bg-[#006c49] text-white text-sm font-bold rounded-lg hover:bg-[#005a3c] transition-colors cursor-pointer"
                >
                  Claim Job
                </button>
              ) : job.status !== "Completed" ? (
                <>
                  <StatusBadge label={job.status} variant="info" hasDot />
                  <button
                    onClick={() => onCompleteJob(job.id)}
                    className="px-4 py-2 bg-slate-800 dark:bg-card text-white text-sm font-bold rounded-lg hover:bg-[#1e293b] transition-colors cursor-pointer"
                  >
                    Complete
                  </button>
                </>
              ) : (
                <StatusBadge label="Completed" variant="success" hasDot />
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
