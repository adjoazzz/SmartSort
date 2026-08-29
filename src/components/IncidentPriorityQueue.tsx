import React, { useState, useEffect, useMemo } from "react";
import {
  AlertTriangle,
  Flame,
  Clock,
  Truck,
  ArrowUpRight,
  CheckCircle2,
  ShieldAlert,
  ChevronRight,
  Filter,
  Search,
  Zap,
  RotateCcw,
  Sparkles,
  MapPin,
  Eye,
} from "lucide-react";
import { toast } from "../lib/toast";

export interface IncidentItem {
  id: string;
  priority: "P1" | "P2" | "P3";
  deviceName: string;
  location: string;
  incidentType: string;
  fillLevel: number;
  detectedAt: number; // timestamp in ms
  slaMinutes: number;
  status: "active" | "acknowledged" | "escalated" | "resolved";
  escalationTier:
    | "Tier 1: Field Collector"
    | "Tier 2: Area Supervisor"
    | "Tier 3: Executive Ops";
  dispatchedTo?: string;
  description: string;
}

const INITIAL_INCIDENTS: IncidentItem[] = [
  {
    id: "INC-9014",
    priority: "P1",
    deviceName: "College of Science - Bin A1",
    location: "Science Hub ground floor, North Gate",
    incidentType: "Capacity Overflow (96%)",
    fillLevel: 96,
    detectedAt: Date.now() - 1000 * 60 * 18, // 18 mins ago (SLA: 30m, remaining: 12m)
    slaMinutes: 30,
    status: "active",
    escalationTier: "Tier 1: Field Collector",
    description:
      "Rapid fill threshold exceeded. Projected overflow in 22 minutes if uncollected.",
  },
  {
    id: "INC-9018",
    priority: "P1",
    deviceName: "Main Cafeteria - Bin B3",
    location: "Dining Plaza East Pavilion",
    incidentType: "Optical Sensor Occlusion",
    fillLevel: 88,
    detectedAt: Date.now() - 1000 * 60 * 27, // 27 mins ago (SLA: 30m, remaining: 3m -> Imminent)
    slaMinutes: 30,
    status: "escalated",
    escalationTier: "Tier 2: Area Supervisor",
    description:
      "Camera lens obscured by wet paper/grease residue. Auto-sorting chute locked.",
  },
  {
    id: "INC-8892",
    priority: "P1",
    deviceName: "Pharmacy Complex - Bin C2",
    location: "Laboratory Block 2, Courtyard",
    incidentType: "Bio-Contamination Spike",
    fillLevel: 79,
    detectedAt: Date.now() - 1000 * 60 * 34, // 34 mins ago (Breached!)
    slaMinutes: 30,
    status: "escalated",
    escalationTier: "Tier 3: Executive Ops",
    description:
      "Multiple non-recyclable hazardous chemicals detected. Autonomous quarantine active.",
  },
  {
    id: "INC-7741",
    priority: "P2",
    deviceName: "Engineering Quad - Bin D1",
    location: "Civil Eng Lawn Walkway",
    incidentType: "Fill Velocity Anomaly",
    fillLevel: 82,
    detectedAt: Date.now() - 1000 * 60 * 24, // 24 mins ago (SLA: 60m)
    slaMinutes: 60,
    status: "acknowledged",
    escalationTier: "Tier 1: Field Collector",
    dispatchedTo: "Kwame Mensah (Truck #3)",
    description:
      "Unusually high traffic velocity detected during campus rush hour.",
  },
  {
    id: "INC-7629",
    priority: "P2",
    deviceName: "Library Annex - Bin E4",
    location: "Quiet Study Atrium, Level 2",
    incidentType: "Repeated Sorter Jam",
    fillLevel: 68,
    detectedAt: Date.now() - 1000 * 60 * 12, // 12 mins ago (SLA: 60m)
    slaMinutes: 60,
    status: "active",
    escalationTier: "Tier 1: Field Collector",
    description:
      "Flap servo torque limit reached twice. Automatic retry succeeded, technician inspection advised.",
  },
  {
    id: "INC-6502",
    priority: "P3",
    deviceName: "Sports Stadium - Bin S1",
    location: "Gate 4 Ticket Concourse",
    incidentType: "Battery Undervoltage Warning",
    fillLevel: 45,
    detectedAt: Date.now() - 1000 * 60 * 45, // 45 mins ago (SLA: 180m)
    slaMinutes: 180,
    status: "active",
    escalationTier: "Tier 1: Field Collector",
    description:
      "Solar charging panel shaded; storage battery level fell to 14.8%. Telemetry throttled.",
  },
];

interface IncidentPriorityQueueProps {
  onOpenRulesModal?: () => void;
}

export function IncidentPriorityQueue({
  onOpenRulesModal,
}: IncidentPriorityQueueProps) {
  const [incidents, setIncidents] = useState<IncidentItem[]>(() => {
    const saved = localStorage.getItem("smartsort_incident_queue");
    return saved ? JSON.parse(saved) : INITIAL_INCIDENTS;
  });

  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("active_all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentTime, setCurrentTime] = useState<number>(Date.now());

  // Save changes locally
  useEffect(() => {
    localStorage.setItem("smartsort_incident_queue", JSON.stringify(incidents));
  }, [incidents]);

  // Live ticking timer every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Compute SLA stats
  const formatSlaCountdown = (detectedAt: number, slaMinutes: number) => {
    const deadline = detectedAt + slaMinutes * 60 * 1000;
    const diffMs = deadline - currentTime;
    const isBreached = diffMs <= 0;
    const absDiffSec = Math.floor(Math.abs(diffMs) / 1000);
    const mins = Math.floor(absDiffSec / 60);
    const secs = absDiffSec % 60;

    const formatted = `${String(mins).padStart(2, "0")}m ${String(secs).padStart(2, "0")}s`;
    return {
      isBreached,
      isImminent: !isBreached && diffMs <= 1000 * 60 * 8, // < 8 mins left
      formattedText: isBreached ? `BREACHED +${formatted}` : formatted,
      percentElapsed: Math.min(
        100,
        Math.max(
          0,
          Math.floor(
            ((currentTime - detectedAt) / (slaMinutes * 60 * 1000)) * 100,
          ),
        ),
      ),
    };
  };

  // Operational Actions
  const handleFastDispatch = (id: string, deviceName: string) => {
    setIncidents((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "acknowledged",
              dispatchedTo: "Priority Fleet Truck #2 (Auto-Route)",
            }
          : item,
      ),
    );
    toast.success(
      `Priority fleet dispatched to ${deviceName}! Automated collection task created.`,
    );
  };

  const handleEscalate = (id: string) => {
    setIncidents((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const nextTier =
          item.escalationTier === "Tier 1: Field Collector"
            ? "Tier 2: Area Supervisor"
            : "Tier 3: Executive Ops";
        return {
          ...item,
          status: "escalated",
          escalationTier: nextTier,
        };
      }),
    );
    toast.error(
      `Incident ${id} escalated to supervisor tier via urgent broadcast.`,
    );
  };

  const handleAcknowledge = (id: string) => {
    setIncidents((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "acknowledged" } : item,
      ),
    );
    toast.info(`Incident ${id} acknowledged by operator.`);
  };

  const handleResolve = (id: string) => {
    setIncidents((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "resolved" } : item,
      ),
    );
    toast.success(`Incident ${id} marked as resolved.`);
  };

  const handleResetQueue = () => {
    setIncidents(INITIAL_INCIDENTS);
    toast.info("Incident Priority Queue reset to live simulation state.");
  };

  // Filtered view
  const filteredIncidents = useMemo(() => {
    return incidents.filter((item) => {
      if (filterPriority !== "all" && item.priority !== filterPriority)
        return false;
      if (filterStatus === "active_all" && item.status === "resolved")
        return false;
      if (filterStatus === "escalated" && item.status !== "escalated")
        return false;
      if (filterStatus === "resolved" && item.status !== "resolved")
        return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          item.id.toLowerCase().includes(q) ||
          item.deviceName.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q) ||
          item.incidentType.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [incidents, filterPriority, filterStatus, searchQuery]);

  const p1Count = incidents.filter(
    (i) => i.priority === "P1" && i.status !== "resolved",
  ).length;
  const escalatedCount = incidents.filter(
    (i) => i.status === "escalated",
  ).length;

  return (
    <div className="flex flex-col gap-5">
      {/* Live SLA Command Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block">
              P1 Critical Breaches
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-extrabold text-[#ba1a1a] dark:text-red-500">
                {p1Count}
              </span>
              <span className="text-xs font-semibold text-muted-foreground">
                Urgent attention
              </span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center">
            <Flame className="w-5 h-5" strokeWidth={2.2} />
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block">
              Active Escalations
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-extrabold text-[#d97706] dark:text-amber-500">
                {escalatedCount}
              </span>
              <span className="text-xs font-semibold text-muted-foreground">
                Tier 2 / 3 active
              </span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <ShieldAlert className="w-5 h-5" strokeWidth={2.2} />
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block">
              SLA Compliance Rate
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-extrabold text-[#006c49] dark:text-emerald-400">
                98.4%
              </span>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                +1.2% this week
              </span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" strokeWidth={2.2} />
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block">
              Mean Time to Respond
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-extrabold text-[#0284c7] dark:text-sky-400">
                11.2 min
              </span>
              <span className="text-xs font-semibold text-muted-foreground">
                Target &lt; 15 min
              </span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-[#0284c7] dark:text-sky-400 flex items-center justify-center">
            <Clock className="w-5 h-5" strokeWidth={2.2} />
          </div>
        </div>
      </div>

      {/* Filter and Action Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-card border border-border rounded-xl p-3.5 shadow-sm">
        {/* Left Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-border/80">
            <button
              onClick={() => setFilterPriority("all")}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                filterPriority === "all"
                  ? "bg-card dark:bg-[#071321] text-foreground dark:text-white shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All Priorities
            </button>
            <button
              onClick={() => setFilterPriority("P1")}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                filterPriority === "P1"
                  ? "bg-red-500 text-white shadow-xs"
                  : "text-red-500 hover:bg-red-500/10"
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              P1 Critical ({p1Count})
            </button>
            <button
              onClick={() => setFilterPriority("P2")}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                filterPriority === "P2"
                  ? "bg-amber-500 text-white shadow-xs"
                  : "text-amber-600 dark:text-amber-400 hover:bg-amber-500/10"
              }`}
            >
              P2 High
            </button>
            <button
              onClick={() => setFilterPriority("P3")}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                filterPriority === "P3"
                  ? "bg-slate-700 text-white shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              P3 Standard
            </button>
          </div>

          {/* Status Sub-filter */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-border/80 text-xs">
            <button
              onClick={() => setFilterStatus("active_all")}
              className={`px-2.5 py-1 rounded-md font-medium cursor-pointer transition-colors ${
                filterStatus === "active_all"
                  ? "bg-card dark:bg-[#071321] text-foreground dark:text-white font-bold shadow-xs"
                  : "text-muted-foreground"
              }`}
            >
              Active Queue
            </button>
            <button
              onClick={() => setFilterStatus("escalated")}
              className={`px-2.5 py-1 rounded-md font-medium cursor-pointer transition-colors ${
                filterStatus === "escalated"
                  ? "bg-card dark:bg-[#071321] text-amber-500 font-bold shadow-xs"
                  : "text-muted-foreground"
              }`}
            >
              Escalated ({escalatedCount})
            </button>
            <button
              onClick={() => setFilterStatus("resolved")}
              className={`px-2.5 py-1 rounded-md font-medium cursor-pointer transition-colors ${
                filterStatus === "resolved"
                  ? "bg-card dark:bg-[#071321] text-emerald-500 font-bold shadow-xs"
                  : "text-muted-foreground"
              }`}
            >
              Resolved
            </button>
          </div>
        </div>

        {/* Right Search & Controls */}
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search incidents by location or device..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-background border border-border text-xs rounded-lg pl-8 pr-3 py-2 text-foreground focus:outline-none focus:border-primary w-64"
            />
          </div>

          <button
            onClick={handleResetQueue}
            title="Reset incident test simulation"
            className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Incidents Priority List */}
      <div className="space-y-3">
        {filteredIncidents.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-12 text-center flex flex-col items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mb-3" />
            <h3 className="text-base font-bold text-foreground dark:text-white">
              Zero Active Incidents
            </h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-sm">
              All items matching the current filter have been dispatched or
              resolved within SLA parameters.
            </p>
          </div>
        ) : (
          filteredIncidents.map((incident) => {
            const sla = formatSlaCountdown(
              incident.detectedAt,
              incident.slaMinutes,
            );
            const isP1 = incident.priority === "P1";
            const isP2 = incident.priority === "P2";

            return (
              <div
                key={incident.id}
                className={`bg-card border rounded-xl p-4.5 shadow-sm transition-all duration-200 hover:shadow-md ${
                  sla.isBreached
                    ? "border-red-500/80 bg-red-500/[0.02]"
                    : sla.isImminent
                      ? "border-amber-500/70"
                      : isP1
                        ? "border-red-200 dark:border-red-950/80"
                        : "border-border"
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left Column: Priority, Device Info, Description */}
                  <div className="flex items-start gap-3.5 flex-1 min-w-0">
                    {/* Priority Badge */}
                    <div
                      className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center flex-shrink-0 font-mono font-black ${
                        isP1
                          ? "bg-red-500 text-white shadow-sm shadow-red-500/20"
                          : isP2
                            ? "bg-amber-500 text-white shadow-sm shadow-amber-500/20"
                            : "bg-slate-700 text-white"
                      }`}
                    >
                      <span className="text-[10px] leading-none opacity-80">
                        LEVEL
                      </span>
                      <span className="text-base leading-tight">
                        {incident.priority}
                      </span>
                    </div>

                    {/* Metadata */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="font-mono text-xs font-bold text-muted-foreground">
                          {incident.id}
                        </span>
                        <h4 className="text-sm font-bold text-foreground dark:text-white truncate">
                          {incident.deviceName}
                        </h4>

                        {/* Status Pills */}
                        {incident.status === "escalated" && (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center gap-1 animate-pulse">
                            <ShieldAlert className="w-3 h-3" />
                            {incident.escalationTier}
                          </span>
                        )}

                        {incident.dispatchedTo && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-sky-500/10 text-[#0284c7] dark:text-sky-400 border border-sky-500/20 flex items-center gap-1">
                            <Truck className="w-3 h-3" />
                            {incident.dispatchedTo}
                          </span>
                        )}

                        {incident.status === "resolved" && (
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                            RESOLVED
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1 flex-wrap">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                          <span>{incident.location}</span>
                        </div>
                        <span>•</span>
                        <span className="font-semibold text-foreground dark:text-slate-200">
                          {incident.incidentType}
                        </span>
                        <span>•</span>
                        <span>
                          Fill:{" "}
                          <strong
                            className={
                              incident.fillLevel >= 85 ? "text-red-500" : ""
                            }
                          >
                            {incident.fillLevel}%
                          </strong>
                        </span>
                      </div>

                      <p className="text-xs text-muted-foreground mt-1.5 line-clamp-1 leading-relaxed">
                        {incident.description}
                      </p>
                    </div>
                  </div>

                  {/* Middle Column: Live SLA Countdown Clock */}
                  <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-2 border-t lg:border-t-0 lg:border-l border-border pt-3 lg:pt-0 lg:pl-5 min-w-[200px]">
                    <div className="flex flex-col lg:items-end">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        SLA Target Window ({incident.slaMinutes}m)
                      </span>
                      <div className="mt-1 flex items-center gap-2">
                        <span
                          className={`font-mono text-sm font-extrabold tracking-tight px-2.5 py-1 rounded-md ${
                            sla.isBreached
                              ? "bg-red-500 text-white animate-pulse"
                              : sla.isImminent
                                ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 font-black"
                                : "bg-slate-100 dark:bg-slate-800 text-foreground dark:text-slate-200"
                          }`}
                        >
                          {sla.formattedText}
                        </span>
                      </div>

                      {/* Progress bar of SLA elapsed */}
                      <div className="w-36 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mt-2">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            sla.isBreached
                              ? "bg-red-500"
                              : sla.isImminent
                                ? "bg-amber-500"
                                : "bg-[#006c49]"
                          }`}
                          style={{ width: `${sla.percentElapsed}%` }}
                        />
                      </div>
                    </div>

                    {/* Operational Action Buttons */}
                    <div className="flex items-center gap-2 mt-2 lg:mt-3 w-full lg:w-auto justify-end flex-wrap">
                      {incident.status !== "resolved" && (
                        <>
                          <button
                            onClick={() =>
                              handleFastDispatch(
                                incident.id,
                                incident.deviceName,
                              )
                            }
                            className="bg-[#006c49] hover:bg-[#006c49]/90 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                          >
                            <Zap className="w-3.5 h-3.5" />
                            Fast-Dispatch
                          </button>

                          {incident.status !== "escalated" && (
                            <button
                              onClick={() => handleEscalate(incident.id)}
                              className="bg-card border border-amber-500/40 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                            >
                              Escalate
                            </button>
                          )}

                          {incident.status === "active" && (
                            <button
                              onClick={() => handleAcknowledge(incident.id)}
                              className="bg-card border border-border text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                            >
                              Acknowledge
                            </button>
                          )}

                          <button
                            onClick={() => handleResolve(incident.id)}
                            className="text-xs text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 p-1.5 transition-colors cursor-pointer"
                            title="Mark resolved"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
