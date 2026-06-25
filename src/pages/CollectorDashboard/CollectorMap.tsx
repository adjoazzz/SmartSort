import React, { useState, useEffect } from "react";
import { PageLayout } from "../../components/PageLayout";
import { StatusBadge } from "../../components/StatusBadge";
import { Progress } from "../../components/ui/progress";
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

const JOB_COORDINATES: Record<string, { x: number; y: number }> = {
  "JOB-1041": { x: 208, y: 330 }, // Main Lobby Entrance
  "JOB-1042": { x: 213, y: 190 }, // North Wing Cafe - B3
  "JOB-1040": { x: 55, y: 310 }, // West Parking B1
  "JOB-1039": { x: 378, y: 190 }, // Employee Breakroom
  "JOB-1038": { x: 353, y: 330 }, // South Lobby
};

// Depot position (matches DEPOT rect center in new viewBox)
const depotCoords = { x: 555, y: 374 };

const NAV_INSTRUCTIONS = [
  "Head north toward the Elevator Hallway",
  "Take the elevators down to Level B3",
  "Proceed 30ft down Corridor C; the smart bin is on your right",
];

export default function CollectorMap() {
  const navigate = useNavigate();

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

  // Selected marker highlighting
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  // HUD simulated turn-by-turn navigation timer
  const [isNavigating, setIsNavigating] = useState(false);
  const [navigatingJobId, setNavigatingJobId] = useState<string | null>(null);
  const [navStep, setNavStep] = useState(0);
  const [navDistance, setNavDistance] = useState(120);

  // Task reminder / completion confirmation
  const [remindJobId, setRemindJobId] = useState<string | null>(null);

  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isNavigating) {
      setNavStep(0);
      setNavDistance(120);
      interval = setInterval(() => {
        setNavDistance((prev) => {
          if (prev <= 10) {
            setNavStep((step) => {
              if (step >= NAV_INSTRUCTIONS.length - 1) {
                clearInterval(interval);
                return step;
              }
              return step + 1;
            });
            return 80;
          }
          return prev - 20;
        });
      }, 1800);
    }
    return () => clearInterval(interval);
  }, [isNavigating]);

  const handleCompleteJob = (id: string) => {
    setJobs((prev: any[]) =>
      prev.map((job) =>
        job.id === id ? { ...job, status: "Completed" } : job,
      ),
    );
    // If completed job was selected, clear selection or select next
    if (selectedJobId === id) {
      setSelectedJobId(null);
    }
  };

  // Get active accepted assignments (assigned to me and not completed)
  const activeAssignments = jobs.filter(
    (j: any) => j.isAssignedToMe && j.status !== "Completed",
  );
  const completedTodayList = jobs.filter(
    (j: any) => j.isAssignedToMe && j.status === "Completed",
  );

  // Create optimized sequence list of accepted jobs
  const optimizedRoute = (() => {
    const urgencyWeight = { Critical: 3, High: 2, Normal: 1 };
    return [...activeAssignments].sort((a: any, b: any) => {
      const aW = urgencyWeight[a.urgency as keyof typeof urgencyWeight] || 0;
      const bW = urgencyWeight[b.urgency as keyof typeof urgencyWeight] || 0;
      if (aW !== bW) return bW - aW;
      return b.fill - a.fill;
    });
  })();

  // Construct SVG routing path: depot → each accepted job in sequence
  let routePath = `M ${depotCoords.x} ${depotCoords.y}`;
  optimizedRoute.forEach((j: any) => {
    const coords = JOB_COORDINATES[j.id];
    if (coords) routePath += ` L ${coords.x} ${coords.y}`;
  });

  // Truck sits at first uncompleted stop, or back at depot
  const truckCoords =
    optimizedRoute.length > 0
      ? JOB_COORDINATES[optimizedRoute[0].id] || depotCoords
      : depotCoords;

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
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Dashboard
        </button>

        <div className="flex items-center gap-4 bg-card border border-border px-4 py-2.5 rounded-xl shadow-sm">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
            Accepted Bins:
          </span>
          <span className="text-sm font-black text-[#0284c7]">
            {activeAssignments.length} In-Transit
          </span>
          <div className="h-4 w-px bg-slate-200 dark:bg-slate-700" />
          <span className="text-sm font-black text-[#10b981]">
            {completedTodayList.length} Completed
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* Left Column: List of Accepted Jobs / Active Routing steps */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <div className="bg-card border border-border rounded-xl shadow-sm p-4 flex flex-col h-full">
            <h3 className="text-sm font-black text-foreground dark:text-white uppercase tracking-wider mb-4 border-b border-[#f1f5f9] dark:border-[#0f2942] pb-2">
              Route Stop Sequence
            </h3>

            <div className="flex flex-col gap-3 overflow-y-auto max-h-[500px] pr-1">
              {optimizedRoute.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground text-xs">
                  No accepted jobs to display. Go back to dashboard to claim
                  available tasks.
                </div>
              ) : (
                optimizedRoute.map((job: any, idx) => {
                  const isSelected = selectedJobId === job.id;
                  return (
                    <div
                      key={job.id}
                      onClick={() => setSelectedJobId(job.id)}
                      className={`border rounded-xl p-3.5 transition-all cursor-pointer relative ${
                        isSelected
                          ? "border-[#0284c7] bg-[#0284c7]/5 dark:bg-[#0c4a6e]/20 shadow-sm"
                          : "border-slate-100 dark:border-border hover:border-slate-200 dark:hover:border-border bg-card"
                      }`}
                    >
                      {/* Step Indicator badge */}
                      <span className="absolute top-3.5 left-3.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#0284c7] text-white text-[10px] font-black">
                        {idx + 1}
                      </span>

                      <div className="pl-7 flex flex-col gap-1">
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-xs font-bold text-foreground dark:text-white truncate">
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
                        <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                          {job.device} • {job.zone}
                        </span>

                        <div className="flex items-center gap-2 mt-2">
                          <Progress
                            value={job.fill}
                            className="w-16 h-1 bg-slate-100 dark:bg-slate-800 [&>[data-slot=progress-indicator]]:bg-[#ba1a1a]"
                          />
                          <span className="text-[9px] font-bold text-[#ba1a1a]">
                            {job.fill}% Full
                          </span>
                        </div>

                        {/* Interactive HUD Trigger */}
                        <div
                          className="flex items-center gap-2 mt-3 pt-3 border-t border-[#f8fafc] dark:border-[#0f2942]"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={() => {
                              setNavigatingJobId(job.id);
                              setIsNavigating(true);
                            }}
                            className="flex-1 py-1.5 bg-[#0284c7] text-white text-[10px] font-bold rounded-md hover:bg-[#0369a1] transition-colors flex items-center justify-center gap-1 shadow-sm cursor-pointer"
                          >
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
                            </svg>
                            Navigate
                          </button>
                          <button
                            onClick={() => setRemindJobId(job.id)}
                            className="flex-1 py-1.5 bg-primary text-white text-[10px] font-bold rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-1 shadow-sm cursor-pointer"
                          >
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            Mark Done
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Fullscreen Map visualizer */}
        <div className="lg:col-span-2">
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col h-full">
            <div className="px-5 py-4 border-b border-border flex justify-between items-center bg-slate-50/50 dark:bg-secondary/30">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <h3 className="font-bold text-sm text-foreground dark:text-white">
                  Real-time Interactive Corridor Routing
                </h3>
              </div>
              <span className="text-[10px] bg-slate-100 dark:bg-muted text-slate-600 dark:text-muted-foreground px-2 py-0.5 rounded font-mono font-bold">
                COORD SYSTEM: ACTIVE
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col gap-4 justify-between">
              <div
                className="relative w-full"
                style={{ aspectRatio: "16/9", maxHeight: "520px" }}
              >
                {/* Map Legend */}
                <div className="absolute top-3 right-3 z-10 bg-white/90 dark:bg-card/90 backdrop-blur-sm border border-slate-200 dark:border-border rounded-lg p-2 shadow-md flex flex-col gap-1.5">
                  <p className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-0.5">
                    Legend
                  </p>
                  {[
                    ["#ef4444", "Critical"],
                    ["#f59e0b", "High"],
                    ["#3b82f6", "Normal"],
                    ["#10b981", "Completed"],
                  ].map(([c, l]) => (
                    <div key={l} className="flex items-center gap-1.5">
                      <div
                        className="w-2.5 h-2.5 rounded-full border border-white/50"
                        style={{ backgroundColor: c as string }}
                      />
                      <span className="text-[9px] text-slate-600 dark:text-slate-300 font-medium">
                        {l}
                      </span>
                    </div>
                  ))}
                  <div className="flex items-center gap-1.5 mt-0.5 pt-1.5 border-t border-slate-200 dark:border-slate-700">
                    <svg width="16" height="6">
                      <line
                        x1="0"
                        y1="3"
                        x2="16"
                        y2="3"
                        stroke="#0284c7"
                        strokeWidth="2"
                        strokeDasharray="3 2"
                      />
                    </svg>
                    <span className="text-[9px] text-slate-600 dark:text-slate-300 font-medium">
                      Route
                    </span>
                  </div>
                </div>
                <svg
                  viewBox="0 0 600 400"
                  className="w-full h-full rounded-xl overflow-hidden"
                  style={{ background: "#e8f0e4" }}
                >
                  <defs>
                    <style>{`
                      @keyframes routeDash2 { to { stroke-dashoffset: -28; } }
                      @keyframes glowPin { 0%,100%{opacity:0.15} 50%{opacity:0.4} }
                      .route-anim { animation: routeDash2 2s linear infinite; }
                      .pin-glow { animation: glowPin 2.2s ease-in-out infinite; }
                    `}</style>
                    <filter
                      id="ps2"
                      x="-30%"
                      y="-30%"
                      width="160%"
                      height="160%"
                    >
                      <feDropShadow
                        dx="0"
                        dy="3"
                        stdDeviation="3"
                        floodColor="#00000040"
                      />
                    </filter>
                    <filter
                      id="zs2"
                      x="-10%"
                      y="-10%"
                      width="120%"
                      height="120%"
                    >
                      <feDropShadow
                        dx="0"
                        dy="1"
                        stdDeviation="2"
                        floodColor="#00000015"
                      />
                    </filter>
                  </defs>

                  {/* Greenery background patches */}
                  {[
                    [28, 28],
                    [572, 28],
                    [28, 372],
                    [572, 372],
                    [300, 18],
                    [300, 382],
                  ].map(([cx, cy], i) => (
                    <circle
                      key={i}
                      cx={cx}
                      cy={cy}
                      r="20"
                      fill="#b8d4a0"
                      opacity="0.65"
                    />
                  ))}

                  {/* Road ring */}
                  <rect
                    x="68"
                    y="58"
                    width="464"
                    height="284"
                    rx="32"
                    fill="none"
                    stroke="#cdc8bc"
                    strokeWidth="20"
                  />
                  {/* Cross paths */}
                  <line
                    x1="300"
                    y1="58"
                    x2="300"
                    y2="342"
                    stroke="#cdc8bc"
                    strokeWidth="14"
                  />
                  <line
                    x1="68"
                    y1="200"
                    x2="532"
                    y2="200"
                    stroke="#cdc8bc"
                    strokeWidth="14"
                  />
                  {/* Lane markings */}
                  <line
                    x1="300"
                    y1="58"
                    x2="300"
                    y2="342"
                    stroke="#e8f0e4"
                    strokeWidth="2.5"
                    strokeDasharray="12 9"
                  />
                  <line
                    x1="68"
                    y1="200"
                    x2="532"
                    y2="200"
                    stroke="#e8f0e4"
                    strokeWidth="2.5"
                    strokeDasharray="12 9"
                  />

                  {/* Zone A – top-left */}
                  <rect
                    x="92"
                    y="76"
                    width="178"
                    height="106"
                    rx="12"
                    fill="#dbeafe"
                    stroke="#93c5fd"
                    strokeWidth="1.5"
                    filter="url(#zs2)"
                  />
                  <text
                    x="181"
                    y="120"
                    textAnchor="middle"
                    fontSize="13"
                    fontWeight="bold"
                    fill="#1d4ed8"
                    fontFamily="sans-serif"
                  >
                    Zone A
                  </text>
                  <text
                    x="181"
                    y="137"
                    textAnchor="middle"
                    fontSize="9"
                    fill="#3b82f6"
                    fontFamily="sans-serif"
                  >
                    North Wing
                  </text>

                  {/* Zone B – top-right */}
                  <rect
                    x="330"
                    y="76"
                    width="178"
                    height="106"
                    rx="12"
                    fill="#fef3c7"
                    stroke="#fcd34d"
                    strokeWidth="1.5"
                    filter="url(#zs2)"
                  />
                  <text
                    x="419"
                    y="120"
                    textAnchor="middle"
                    fontSize="13"
                    fontWeight="bold"
                    fill="#92400e"
                    fontFamily="sans-serif"
                  >
                    Zone B
                  </text>
                  <text
                    x="419"
                    y="137"
                    textAnchor="middle"
                    fontSize="9"
                    fill="#b45309"
                    fontFamily="sans-serif"
                  >
                    East Wing
                  </text>

                  {/* Zone C – bottom-left */}
                  <rect
                    x="92"
                    y="218"
                    width="178"
                    height="106"
                    rx="12"
                    fill="#dcfce7"
                    stroke="#86efac"
                    strokeWidth="1.5"
                    filter="url(#zs2)"
                  />
                  <text
                    x="181"
                    y="262"
                    textAnchor="middle"
                    fontSize="13"
                    fontWeight="bold"
                    fill="#15803d"
                    fontFamily="sans-serif"
                  >
                    Zone C
                  </text>
                  <text
                    x="181"
                    y="279"
                    textAnchor="middle"
                    fontSize="9"
                    fill="#16a34a"
                    fontFamily="sans-serif"
                  >
                    West Wing
                  </text>

                  {/* Zone D – bottom-right */}
                  <rect
                    x="330"
                    y="218"
                    width="178"
                    height="106"
                    rx="12"
                    fill="#fce7f3"
                    stroke="#f9a8d4"
                    strokeWidth="1.5"
                    filter="url(#zs2)"
                  />
                  <text
                    x="419"
                    y="262"
                    textAnchor="middle"
                    fontSize="13"
                    fontWeight="bold"
                    fill="#9d174d"
                    fontFamily="sans-serif"
                  >
                    Zone D
                  </text>
                  <text
                    x="419"
                    y="279"
                    textAnchor="middle"
                    fontSize="9"
                    fill="#be185d"
                    fontFamily="sans-serif"
                  >
                    South Wing
                  </text>

                  {/* Central hub */}
                  <circle
                    cx="300"
                    cy="200"
                    r="34"
                    fill="#f1f5f9"
                    stroke="#cbd5e1"
                    strokeWidth="2"
                    filter="url(#zs2)"
                  />
                  <text
                    x="300"
                    y="196"
                    textAnchor="middle"
                    fontSize="8.5"
                    fontWeight="bold"
                    fill="#475569"
                    fontFamily="sans-serif"
                  >
                    CENTRAL
                  </text>
                  <text
                    x="300"
                    y="210"
                    textAnchor="middle"
                    fontSize="8.5"
                    fontWeight="bold"
                    fill="#475569"
                    fontFamily="sans-serif"
                  >
                    HUB
                  </text>

                  {/* Depot */}
                  <rect
                    x="528"
                    y="179"
                    width="56"
                    height="22"
                    rx="5"
                    fill="#334155"
                    filter="url(#ps2)"
                  />
                  <text
                    x="556"
                    y="194"
                    textAnchor="middle"
                    fontSize="8.5"
                    fontWeight="bold"
                    fill="white"
                    fontFamily="sans-serif"
                  >
                    DEPOT
                  </text>

                  {/* Animated route */}
                  {activeAssignments.length > 0 && (
                    <path
                      d={routePath}
                      fill="none"
                      stroke="#0284c7"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="10 6"
                      className="route-anim"
                      opacity="0.9"
                    />
                  )}

                  {/* Job pins */}
                  {jobs.map((job: any) => {
                    const coords = JOB_COORDINATES[job.id];
                    if (!coords || !job.isAssignedToMe) return null;
                    const isCompleted = job.status === "Completed";
                    const isCurrentDest =
                      activeAssignments.length > 0 &&
                      optimizedRoute.length > 0 &&
                      optimizedRoute[0].id === job.id;
                    const isSelected = selectedJobId === job.id;
                    const pc = isCompleted
                      ? "#10b981"
                      : job.urgency === "Critical"
                        ? "#ef4444"
                        : job.urgency === "High"
                          ? "#f59e0b"
                          : "#3b82f6";
                    return (
                      <g
                        key={job.id}
                        onClick={() => setSelectedJobId(job.id)}
                        style={{ cursor: "pointer" }}
                      >
                        {(isSelected || isCurrentDest) && !isCompleted && (
                          <circle
                            cx={coords.x}
                            cy={coords.y}
                            r="20"
                            fill={pc}
                            className="pin-glow"
                          />
                        )}
                        <g filter="url(#ps2)">
                          <path
                            d={`M${coords.x},${coords.y + 13} C${coords.x - 9},${coords.y + 3} ${coords.x - 11},${coords.y - 7} ${coords.x},${coords.y - 13} C${coords.x + 11},${coords.y - 7} ${coords.x + 9},${coords.y + 3} ${coords.x},${coords.y + 13}Z`}
                            fill={pc}
                            stroke="white"
                            strokeWidth={isSelected ? "2.5" : "1.5"}
                          />
                          <circle
                            cx={coords.x}
                            cy={coords.y - 3}
                            r="3.5"
                            fill="white"
                            opacity="0.9"
                          />
                        </g>
                        <rect
                          x={coords.x - 27}
                          y={coords.y - 31}
                          width="54"
                          height="13"
                          rx="3"
                          fill="white"
                          stroke={pc}
                          strokeWidth="1"
                          opacity="0.95"
                        />
                        <text
                          x={coords.x}
                          y={coords.y - 21}
                          textAnchor="middle"
                          fontSize="7"
                          fill="#1e293b"
                          fontWeight="bold"
                          fontFamily="sans-serif"
                        >
                          {job.location.length > 13
                            ? job.location.slice(0, 13) + "…"
                            : job.location}
                        </text>
                      </g>
                    );
                  })}

                  {/* Collector vehicle */}
                  {activeAssignments.length > 0 && (
                    <g
                      transform={`translate(${truckCoords.x - 12}, ${truckCoords.y + 15})`}
                      filter="url(#ps2)"
                    >
                      <rect
                        x="0"
                        y="0"
                        width="24"
                        height="13"
                        rx="3"
                        fill="#0284c7"
                      />
                      <rect
                        x="15"
                        y="2.5"
                        width="9"
                        height="7.5"
                        rx="1"
                        fill="#0369a1"
                      />
                      <circle cx="5.5" cy="13" r="3" fill="#1e293b" />
                      <circle cx="18.5" cy="13" r="3" fill="#1e293b" />
                      <circle cx="5.5" cy="13" r="1.4" fill="#94a3b8" />
                      <circle cx="18.5" cy="13" r="1.4" fill="#94a3b8" />
                      <rect
                        x="1.5"
                        y="2.5"
                        width="7"
                        height="5"
                        rx="1"
                        fill="#7dd3fc"
                        opacity="0.85"
                      />
                    </g>
                  )}
                </svg>
              </div>

              {/* Detail drawer at bottom */}
              <div className="bg-background dark:bg-secondary rounded-xl p-3 border border-border mt-auto">
                {selectedJobId ? (
                  (() => {
                    const selectedJob = jobs.find(
                      (j: any) => j.id === selectedJobId,
                    );
                    if (!selectedJob) return null;
                    return (
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-foreground dark:text-white truncate">
                              {selectedJob.location}
                            </span>
                            <span className="text-[10px] font-mono text-[#0284c7] font-bold">
                              ({selectedJob.device})
                            </span>
                          </div>
                          <StatusBadge
                            label={selectedJob.status}
                            variant={
                              selectedJob.status === "Completed"
                                ? "success"
                                : "info"
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
                            <strong className="text-[#ba1a1a]">
                              {selectedJob.fill}%
                            </strong>
                          </span>
                        </div>
                      </div>
                    );
                  })()
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
      </div>

      {/* Confetti Celebration Overlay */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center bg-black/10"
          >
            <div className="bg-card border border-[#006c49] rounded-xl px-8 py-6 shadow-md flex flex-col items-center gap-3">
              <div className="h-14 w-14 rounded-full bg-[#10b981]/15 text-[#10b981] flex items-center justify-center animate-[bounce_1s_infinite]">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <h3 className="font-black text-lg text-foreground dark:text-white">
                Bin Cleared Successfully!
              </h3>
              <p className="text-xs text-muted-foreground">
                Your progress has been synchronized with the main database.
              </p>
            </div>
            {[...Array(30)].map((_, i) => {
              const colors = [
                "#ff5964",
                "#35a7ff",
                "#386150",
                "#ffe869",
                "#78c0e0",
              ];
              const randomColor =
                colors[Math.floor(Math.random() * colors.length)];
              const randomLeft = Math.random() * 100;
              const randomDelay = Math.random() * 1.5;
              const randomDuration = 2 + Math.random() * 2;
              return (
                <motion.div
                  key={i}
                  initial={{ y: "110%", x: `${randomLeft}%`, rotate: 0 }}
                  animate={{ y: "-10%", rotate: 360 }}
                  transition={{
                    duration: randomDuration,
                    delay: randomDelay,
                    ease: "easeOut",
                  }}
                  className="absolute w-2.5 h-2.5 rounded-full"
                  style={{
                    backgroundColor: randomColor,
                    left: `${randomLeft}%`,
                  }}
                />
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HUD Turn-by-Turn Navigation Modal */}
      <AnimatePresence>
        {isNavigating &&
          navigatingJobId &&
          (() => {
            const job = jobs.find((j: any) => j.id === navigatingJobId);
            if (!job) return null;
            return (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-card/85 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              >
                <motion.div
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  className="bg-card border border-border rounded-xl max-w-md w-full p-6 shadow-md relative overflow-hidden flex flex-col gap-6"
                >
                  <div className="flex justify-between items-center border-b border-[#f1f5f9] dark:border-[#0f2942] pb-3">
                    <div className="flex items-center gap-2 text-[#0284c7]">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
                      </svg>
                      <span className="text-sm font-bold tracking-wider uppercase">
                        Active HUD Navigation
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setIsNavigating(false);
                        setNavigatingJobId(null);
                      }}
                      className="text-muted-foreground hover:text-foreground dark:hover:text-white transition-colors"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>

                  <div className="flex flex-col items-center text-center gap-4 bg-slate-50 dark:bg-secondary/60 rounded-xl p-5 border border-slate-100 dark:border-border">
                    <div className="relative h-20 w-20 flex items-center justify-center bg-card rounded-full shadow-md border border-border">
                      <svg
                        width="36"
                        height="36"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#0284c7"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform duration-700 animate-pulse"
                        style={{ transform: `rotate(${navStep * 90}deg)` }}
                      >
                        <line x1="12" y1="19" x2="12" y2="5"></line>
                        <polyline points="5 12 12 5 19 12"></polyline>
                      </svg>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-3xl font-black text-foreground dark:text-white tracking-tight">
                        {navDistance}{" "}
                        <span className="text-base font-bold text-slate-400 dark:text-slate-500">
                          feet
                        </span>
                      </span>
                      <span className="text-sm font-semibold text-[#0284c7] mt-1">
                        {NAV_INSTRUCTIONS[navStep]}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 border-t border-[#f1f5f9] dark:border-[#0f2942] pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                        Destination
                      </span>
                      <span className="text-xs font-mono font-bold text-foreground dark:text-white">
                        {job.device}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-foreground dark:text-white">
                      {job.location}
                    </p>
                    <p className="text-xs text-muted-foreground">{job.zone}</p>
                  </div>

                  <button
                    onClick={() => {
                      setIsNavigating(false);
                      setNavigatingJobId(null);
                      setRemindJobId(job.id);
                    }}
                    className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    Arrived at Destination
                  </button>
                </motion.div>
              </motion.div>
            );
          })()}
      </AnimatePresence>

      {/* Task Completion Reminder Modal */}
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
                      <div className="h-10 w-10 rounded-full bg-primary/10 text-[#006c49] flex items-center justify-center shrink-0">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M9 11l3 3L22 4"></path>
                          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                        </svg>
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
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
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
                    <span className="text-[11px] font-bold text-[#ba1a1a]">
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
                        <div className="mt-0.5 h-4 w-4 rounded border border-[#006c49] bg-primary/10 flex items-center justify-center shrink-0">
                          <svg
                            width="9"
                            height="9"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#006c49"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
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
                        setShowConfetti(true);
                        setTimeout(() => setShowConfetti(false), 4000);
                      }}
                      className="flex-1 py-2.5 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
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
