import React, { useMemo } from "react";
import { MapLibreMap, MapPin } from "./MapLibreMap";

// ─── Types ──────────────────────────────────────────────────────────────────
export interface Job {
  id: string;
  location: string;
  zone?: string;
  device?: string;
  fill?: number;
  urgency?: string;
  status?: string;
  type?: string;
  lat?: number;
  lng?: number;
  facilityId?: string;
  facilityName?: string;
}

export interface BinLocatorMapProps {
  jobs: Job[];
  facilityName?: string;
  facilityCoords?: [number, number]; // [lat, lng]
  onClaimJob?: (id: string) => void;
  onCompleteJob?: (id: string) => void;
  onSelectJob?: (job: Job) => void;
  activeTab?: "available_jobs" | "my_jobs" | "map_view";
  selectedJobId?: string | null;
}

// Default KNUST Facility (College of Science, Kumasi, Ghana) synced with Admin Dashboard
const DEFAULT_FACILITY_COORDS: [number, number] = [6.6735, -1.5658]; // [lat, lng]

function getUrgencyColor(urgency?: string, status?: string): string {
  if (status === "Completed") return "#10b981"; // emerald green
  switch (urgency) {
    case "Critical":
    case "Urgent":
      return "#ba1a1a"; // red
    case "High":
      return "#f59e0b"; // amber
    case "Medium":
      return "#f97316"; // orange
    default:
      return "#0284c7"; // sky blue
  }
}

/**
 * Deterministically generates campus bin coordinates around facility center
 * based on job id or location string (offsets by ~20m-80m around building).
 */
function computeBinCoords(
  job: Job,
  facilityLat: number,
  facilityLng: number,
  index: number
): [number, number] {
  if (typeof job.lat === "number" && typeof job.lng === "number" && job.lat !== 0) {
    return [job.lat, job.lng];
  }

  let hash = 0;
  const seed = `${job.id}-${job.location}-${job.device || index}`;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  }

  // Generate angle & distance around facility building (0.0002 ~ 20m, 0.0007 ~ 75m)
  const angle = ((Math.abs(hash) % 360) * Math.PI) / 180;
  const radius = 0.00025 + ((Math.abs(hash >> 5) % 100) / 100) * 0.00045;

  const latOffset = Math.sin(angle) * radius;
  const lngOffset = Math.cos(angle) * radius;

  return [facilityLat + latOffset, facilityLng + lngOffset];
}

export function BinLocatorMap({
  jobs,
  facilityName = "College of Science",
  facilityCoords = DEFAULT_FACILITY_COORDS,
  onClaimJob,
  onCompleteJob,
  onSelectJob,
  selectedJobId,
}: BinLocatorMapProps) {
  const [facLat, facLng] = facilityCoords;
  const mapCenter: [number, number] = [facLng, facLat]; // MapLibre uses [lng, lat]

  // Transform jobs into MapPin elements situated around the collector's facility
  const pins: MapPin[] = useMemo(() => {
    return jobs.map((job, idx) => {
      const [lat, lng] = computeBinCoords(job, facLat, facLng, idx);
      const isSelected = selectedJobId === job.id;
      const color = isSelected ? "#6366f1" : getUrgencyColor(job.urgency, job.status);

      return {
        id: job.id,
        lat,
        lng,
        title: job.location || "Bin Unit",
        subtitle: `${job.device || job.id} • ${job.zone || "Facility Area"}`,
        urgency: job.urgency || "Normal",
        fill: job.fill ?? 0,
        status: job.status || "Pending",
        color,
      };
    });
  }, [jobs, facLat, facLng, selectedJobId]);

  const legendItems = [
    { color: "#ba1a1a", label: "Critical / High Fill (≥80%)" },
    { color: "#f59e0b", label: "Warning (60-79%)" },
    { color: "#0284c7", label: "Normal Pending" },
    { color: "#10b981", label: "Emptied / Completed" },
  ];

  return (
    <div className="relative w-full h-full">
      {/* Live Facility Header Badge */}
      <div className="absolute top-3 left-3 z-10 bg-slate-900/90 text-white backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-slate-700/60 flex items-center gap-2.5">
        <span className="flex h-2.5 w-2.5 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>
        <div>
          <div className="text-[10px] uppercase font-mono font-bold text-emerald-400 tracking-wider">
            FACILITY MAP SYNC
          </div>
          <div className="text-xs font-black text-white">{facilityName} Bins</div>
        </div>
        <div className="ml-2 pl-2.5 border-l border-slate-700 text-[10px] font-mono text-slate-300 font-bold">
          {jobs.length} Unit{jobs.length === 1 ? "" : "s"}
        </div>
      </div>

      {/* Map Legend Overlay */}
      <div className="absolute bottom-6 right-3 z-10 bg-white/95 dark:bg-card/95 backdrop-blur-md border border-border rounded-xl p-3 shadow-lg text-xs flex flex-col gap-1.5 min-w-[170px]">
        <div className="font-extrabold text-[10px] text-foreground dark:text-white uppercase tracking-wider mb-0.5">
          Campus Bin Telemetry
        </div>
        {legendItems.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-[10px] text-muted-foreground font-medium">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Vector Map Engine (MapLibre GL) */}
      <MapLibreMap
        center={mapCenter}
        zoom={16}
        pins={pins}
        height="100%"
        onMarkerClick={(pin) => {
          const matchedJob = jobs.find((j) => j.id === pin.id);
          if (matchedJob && onSelectJob) {
            onSelectJob(matchedJob);
          }
        }}
      />
    </div>
  );
}
