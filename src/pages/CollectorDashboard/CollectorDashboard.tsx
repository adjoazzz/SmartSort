import React, { useState } from "react";
import { PageLayout } from "../../components/PageLayout";
import { StatusBadge } from "../../components/StatusBadge";
import { MetricCard } from "../../components/MetricCard";
import { Progress } from "../../components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";

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
  const [activeTab, setActiveTab] = useState<"my_jobs" | "available_jobs">(
    "available_jobs",
  );
  const [jobs, setJobs] = useState(COLLECTOR_JOBS);

  const displayedJobs = jobs.filter((job) =>
    activeTab === "my_jobs"
      ? job.isAssignedToMe
      : !job.isAssignedToMe && job.status === "Pending",
  );

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
            .filter((j) => j.isAssignedToMe && j.status !== "Completed")
            .length.toString()}
          trend="Action required"
          trendDirection="neutral"
          iconColorClass="text-[#0284c7]"
          iconBgClass="bg-[#0284c7]/10"
        />
        <MetricCard
          title="Completed Today"
          value={jobs
            .filter((j) => j.isAssignedToMe && j.status === "Completed")
            .length.toString()}
          trend="Keep it up!"
          trendDirection="up"
          iconColorClass="text-[#006c49]"
          iconBgClass="bg-[#10b981]/10"
        />
        <MetricCard
          title="Available Jobs"
          value={jobs
            .filter((j) => !j.isAssignedToMe && j.status === "Pending")
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
                jobs.filter((j) => !j.isAssignedToMe && j.status === "Pending")
                  .length
              }
              )
            </TabsTrigger>
            <TabsTrigger
              value="my_jobs"
              className={`px-6 py-4 text-sm font-bold rounded-none border-b-2 data-[state=active]:border-[#006c49] data-[state=active]:text-[#006c49] data-[state=active]:bg-white dark:data-[state=active]:bg-card text-muted-foreground hover:text-foreground dark:text-white transition-all shadow-none border-t-0 border-x-0 cursor-pointer`}
            >
              My Assignments (
              {
                jobs.filter((j) => j.isAssignedToMe && j.status !== "Completed")
                  .length
              }
              )
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="p-0 m-0">
            {/* List */}
            <div className="p-4 flex flex-col gap-4">
              {displayedJobs.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground text-sm">
                  No jobs to show here.
                </div>
              ) : (
                displayedJobs.map((job) => (
                  <div
                    key={job.id}
                    className="border border-border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#cbd5e1] dark:hover:border-[#334155] transition-colors bg-card"
                  >
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-foreground dark:text-white">
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
                      <span className="text-sm font-mono text-muted-foreground">
                        {job.device} • {job.zone}
                      </span>
                      <div className="flex items-center gap-2 mt-2">
                        <Progress
                          value={job.fill}
                          className="w-24 h-1.5 bg-muted dark:bg-muted [&>[data-slot=progress-indicator]]:bg-[#ba1a1a]"
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
                          className="px-4 py-2 bg-[#006c49] text-white text-sm font-bold rounded-lg hover:bg-[#005a3c] transition-colors cursor-pointer"
                        >
                          Claim Job
                        </button>
                      ) : job.status !== "Completed" ? (
                        <>
                          <StatusBadge label={job.status} variant="info" hasDot />
                          <button
                            onClick={() => handleCompleteJob(job.id)}
                            className="px-4 py-2 bg-card text-white text-sm font-bold rounded-lg hover:bg-[#1e293b] transition-colors cursor-pointer"
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
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
}
