import React, { useState, useEffect, useMemo, useCallback } from "react";
import { ArrowLeft } from "lucide-react";
import { PageLayout } from "../../components/PageLayout";
import { StatusBadge } from "../../components/StatusBadge";
import { MapLibreMap } from "../../components/MapLibreMap";
import type { MapPin } from "../../components/MapLibreMap";
import { useNavigate } from "react-router";

import type { CollectorJob } from "./collectorTypes";
import {
  COLLECTOR_JOBS,
  JOB_COORDINATES,
  sortByUrgency,
  jobsToMapPins,
  getUrgencyColor,
} from "./collectorTypes";
import { RouteStopList } from "./RouteStopList";
import { NavigationHUD } from "./NavigationHUD";
import { CompletionChecklist } from "./CompletionChecklist";
import { ConfettiOverlay } from "./ConfettiOverlay";

// ─── KNUST Campus Center (approximate) ───────────────────────────────────────
const KNUST_CENTER: [number, number] = [-1.568, 6.674]; // [lng, lat]

export default function CollectorMap() {
  const navigate = useNavigate();

  // ── Job State (synced to localStorage) ───────────────────────────────────
  const [jobs, setJobs] = useState<CollectorJob[]>(() => {
    const saved = localStorage.getItem("collector_jobs_knust");
    if (saved) {
      try {
        return JSON.parse(saved) as CollectorJob[];
      } catch (e) {
        console.error("Failed to parse saved jobs:", e);
      }
    }
    return COLLECTOR_JOBS;
  });

  useEffect(() => {
    localStorage.setItem("collector_jobs_knust", JSON.stringify(jobs));
  }, [jobs]);

  // ── UI State ─────────────────────────────────────────────────────────────
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [navigatingJobId, setNavigatingJobId] = useState<string | null>(null);
  const [remindJobId, setRemindJobId] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  // ── Derived Data ─────────────────────────────────────────────────────────
  const activeAssignments = useMemo(
    () => jobs.filter((j) => j.isAssignedToMe && j.status !== "Completed"),
    [jobs],
  );

  const completedTodayList = useMemo(
    () => jobs.filter((j) => j.isAssignedToMe && j.status === "Completed"),
    [jobs],
  );

  const optimizedRoute = useMemo(
    () => sortByUrgency(activeAssignments),
    [activeAssignments],
  );

  // Convert jobs → MapLibre pins
  const mapPins = useMemo(() => jobsToMapPins(jobs), [jobs]);

  // Selected job details for the bottom drawer
  const selectedJob = useMemo(
    () => jobs.find((j) => j.id === selectedJobId) ?? null,
    [jobs, selectedJobId],
  );

  // Job being navigated to (for the HUD)
  const navigatingJob = useMemo(
    () =>
      navigatingJobId
        ? (jobs.find((j) => j.id === navigatingJobId) ?? null)
        : null,
    [jobs, navigatingJobId],
  );

  // Job being reminded about (for the checklist)
  const remindJob = useMemo(
    () =>
      remindJobId ? (jobs.find((j) => j.id === remindJobId) ?? null) : null,
    [jobs, remindJobId],
  );

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleCompleteJob = useCallback(
    (id: string) => {
      setJobs((prev) =>
        prev.map((job) =>
          job.id === id ? { ...job, status: "Completed" as const } : job,
        ),
      );
      if (selectedJobId === id) {
        setSelectedJobId(null);
      }
    },
    [selectedJobId],
  );

  const handleNavigate = useCallback((id: string) => {
    setNavigatingJobId(id);
  }, []);

  const handleMarkDone = useCallback((id: string) => {
    setRemindJobId(id);
  }, []);

  const handleNavClose = useCallback(() => {
    setNavigatingJobId(null);
  }, []);

  const handleNavArrived = useCallback((id: string) => {
    setRemindJobId(id);
  }, []);

  const handleChecklistClose = useCallback(() => {
    setRemindJobId(null);
  }, []);

  const handleChecklistConfirm = useCallback(
    (id: string) => {
      handleCompleteJob(id);
      setRemindJobId(null);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    },
    [handleCompleteJob],
  );

  const handleMarkerClick = useCallback((pin: MapPin) => {
    setSelectedJobId(pin.id);
  }, []);

  // ── Map Legend ────────────────────────────────────────────────────────────
  const legendItems = [
    { color: "#ef4444", label: "Critical" },
    { color: "#f59e0b", label: "High" },
    { color: "#3b82f6", label: "Normal" },
    { color: "#10b981", label: "Completed" },
  ];

  return (
    <PageLayout
      title="Live Logistics Route Map"
      description="Live transit routing for all accepted smart sorting bins."
      hideAlertsIcon={true}
    >
      {/* Return to Dashboard and statistics banner */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
        <button
          onClick={() => navigate("/collector-dashboard")}
          className="px-4 py-2 border border-border bg-card text-foreground dark:text-white text-xs font-bold rounded-lg hover:bg-slate-50 dark:hover:bg-secondary transition-colors flex items-center gap-2 cursor-pointer shadow-sm self-start"
        >
          <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2.5} />
          Back to Dashboard
        </button>

        <div className="flex items-center gap-4 bg-card border border-border px-4 py-2.5 rounded-xl shadow-sm">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
            Accepted Bins:
          </span>
          <span className="text-sm font-black text-[#0284c7] dark:text-sky-500">
            {activeAssignments.length} In-Transit
          </span>
          <div className="h-4 w-px bg-slate-200 dark:bg-slate-700" />
          <span className="text-sm font-black text-[#10b981] dark:text-emerald-500">
            {completedTodayList.length} Completed
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* Left Column: Route Stop Sequence */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <RouteStopList
            jobs={optimizedRoute}
            selectedJobId={selectedJobId}
            onSelect={setSelectedJobId}
            onNavigate={handleNavigate}
            onMarkDone={handleMarkDone}
          />
        </div>

        {/* Right Column: MapLibre GL Interactive Map */}
        <div className="lg:col-span-2">
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col h-full">
            {/* Map Header */}
            <div className="px-5 py-4 border-b border-border flex justify-between items-center bg-slate-50/50 dark:bg-secondary/30">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <h3 className="font-bold text-sm text-foreground dark:text-white">
                  Real-time Interactive Campus Map
                </h3>
              </div>
              <span className="text-[10px] bg-slate-100 dark:bg-muted text-slate-600 dark:text-muted-foreground px-2 py-0.5 rounded font-mono font-bold">
                MAPLIBRE GL · KNUST CAMPUS
              </span>
            </div>

            {/* MapLibre Map */}
            <div className="relative flex-1" style={{ minHeight: "460px" }}>
              {/* Map Legend Overlay */}
              <div className="absolute top-3 right-3 z-10 bg-white/90 dark:bg-card/90 backdrop-blur-sm border border-slate-200 dark:border-border rounded-lg p-2 shadow-md flex flex-col gap-1.5">
                <p className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-0.5">
                  Legend
                </p>
                {legendItems.map(({ color, label }) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <div
                      className="w-2.5 h-2.5 rounded-full border border-white/50"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-[9px] text-slate-600 dark:text-slate-300 font-medium">
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              <MapLibreMap
                initialCenter={KNUST_CENTER}
                initialZoom={15}
                pins={mapPins}
                onMarkerClick={handleMarkerClick}
                height="100%"
              />
            </div>

            {/* Detail drawer at bottom */}
            <div className="bg-background dark:bg-secondary rounded-b-xl p-3 border-t border-border">
              {selectedJob ? (
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-foreground dark:text-white truncate">
                        {selectedJob.location}
                      </span>
                      <span className="text-[10px] font-mono text-[#0284c7] dark:text-sky-500 font-bold">
                        ({selectedJob.device})
                      </span>
                    </div>
                    <StatusBadge
                      label={selectedJob.status}
                      variant={
                        selectedJob.status === "Completed" ? "success" : "info"
                      }
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-muted-foreground border-t border-slate-100 dark:border-[#0f2942] pt-2">
                    <span>
                      Zone:{" "}
                      <strong className="font-semibold">
                        {selectedJob.zone}
                      </strong>
                    </span>
                    <span>
                      Fill Density:{" "}
                      <strong className="text-[#ba1a1a] dark:text-red-500">
                        {selectedJob.fill}%
                      </strong>
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-2 text-xs text-muted-foreground">
                  Select any route node on the map or left list to view
                  telemetry details.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Modals & Overlays ───────────────────────────────────────────────── */}
      <ConfettiOverlay show={showConfetti} />

      <NavigationHUD
        job={navigatingJob}
        isOpen={navigatingJobId !== null}
        onClose={handleNavClose}
        onArrived={handleNavArrived}
      />

      <CompletionChecklist
        job={remindJob}
        isOpen={remindJobId !== null}
        onClose={handleChecklistClose}
        onConfirm={handleChecklistConfirm}
      />
    </PageLayout>
  );
}
