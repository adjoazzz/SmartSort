import React, { useMemo, useState } from "react";
import { Layers, X } from "lucide-react";
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

export interface MapFacility {
  id: string;
  name: string;
  region?: string;
  coords: [number, number]; // [lat, lng]
  capacity?: number;
  status?: string;
}

export interface BinLocatorMapProps {
  jobs?: Job[];
  facilities?: MapFacility[];
  facilityName?: string;
  facilityCoords?: [number, number]; // [lat, lng]
  onClaimJob?: (id: string) => void;
  onCompleteJob?: (id: string) => void;
  onSelectJob?: (job: Job) => void;
  activeTab?: "available_jobs" | "my_jobs" | "map_view";
  selectedJobId?: string | null;
  className?: string;
  height?: string;
  title?: string;
}

// Default KNUST Facility (College of Science, Kumasi, Ghana) synced with Admin Dashboard
const DEFAULT_FACILITY_COORDS: [number, number] = [6.6735, -1.5658]; // [lat, lng]

const DEFAULT_KNUST_FACILITIES: MapFacility[] = [
  {
    id: "fac-sci",
    name: "College of Science Hub",
    region: "KNUST Central",
    coords: [6.6735, -1.5658],
    capacity: 85,
    status: "Operational",
  },
  {
    id: "fac-pharm",
    name: "College of Pharmacy Station",
    region: "KNUST West",
    coords: [6.6786, -1.5711],
    capacity: 62,
    status: "Operational",
  },
  {
    id: "fac-eng",
    name: "College of Engineering Plant",
    region: "KNUST North",
    coords: [6.6732, -1.5674],
    capacity: 91,
    status: "High Load",
  },
];

const DEFAULT_MOCK_JOBS: Job[] = [
  {
    id: "JOB-1041",
    device: "#SN-4431-L",
    location: "Main Science Quad - Bin A",
    zone: "Level 1, Science",
    fill: 82,
    urgency: "High",
    status: "In Transit",
    lat: 6.6741,
    lng: -1.5652,
  },
  {
    id: "JOB-1042",
    device: "#SN-9902-X",
    location: "North Wing Cafe - Bin B",
    zone: "Level 2, Zone A",
    fill: 94,
    urgency: "Critical",
    status: "Pending",
    lat: 6.6745,
    lng: -1.5663,
  },
  {
    id: "JOB-1040",
    device: "#SN-1108-P",
    location: "West Parking - Bin C",
    zone: "Basement 1, Zone C",
    fill: 78,
    urgency: "Normal",
    status: "Pending",
    lat: 6.6729,
    lng: -1.5651,
  },
  {
    id: "JOB-1039",
    device: "#SN-8871-S",
    location: "Employee Breakroom - Bin D",
    zone: "Level 4, South",
    fill: 71,
    urgency: "Normal",
    status: "Pending",
    lat: 6.6738,
    lng: -1.5671,
  },
  {
    id: "JOB-1038",
    device: "#SN-5520-R",
    location: "South Lobby - Bin E",
    zone: "Level 1, Zone B",
    fill: 65,
    urgency: "Normal",
    status: "Completed",
    lat: 6.6722,
    lng: -1.5661,
  },
];

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
  index: number,
): [number, number] {
  if (
    typeof job.lat === "number" &&
    typeof job.lng === "number" &&
    job.lat !== 0
  ) {
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
  jobs = DEFAULT_MOCK_JOBS,
  facilities = DEFAULT_KNUST_FACILITIES,
  facilityName = "College of Science",
  facilityCoords = DEFAULT_FACILITY_COORDS,
  onClaimJob,
  onCompleteJob,
  onSelectJob,
  selectedJobId,
  className = "",
  height = "100%",
  title,
}: BinLocatorMapProps) {
  const [facLat, facLng] = facilityCoords;
  const mapCenter: [number, number] = useMemo(
    () => [facLng, facLat],
    [facLng, facLat],
  ); // MapLibre uses [lng, lat]

  // Layer filter state: 'all' | 'bins' | 'facilities'
  const [layerFilter, setLayerFilter] = useState<"all" | "bins" | "facilities">(
    "all",
  );
  // Map Legend Drawer state
  const [isLegendOpen, setIsLegendOpen] = useState(true);

  // Active jobs and facilities lists
  const activeJobList = jobs && jobs.length > 0 ? jobs : DEFAULT_MOCK_JOBS;
  const activeFacilitiesList =
    facilities && facilities.length > 0 ? facilities : DEFAULT_KNUST_FACILITIES;

  // 1. Facility Hub Pins (marked with /facility-marker-icon.png)
  const facilityPins: MapPin[] = useMemo(() => {
    return activeFacilitiesList.map((fac) => ({
      id: fac.id,
      lat: fac.coords[0],
      lng: fac.coords[1],
      title: fac.name,
      subtitle: `${fac.region || "KNUST Campus"} • Facility Hub`,
      urgency: fac.status || "Operational",
      fill: fac.capacity || 65,
      status: fac.status || "Operational",
      color: "#3b82f6",
      pinType: "facility" as const,
      iconUrl: "/facility-marker-icon.png",
    }));
  }, [activeFacilitiesList]);

  // 2. Smart Bin Pins (situated around the facility)
  const binPins: MapPin[] = useMemo(() => {
    return activeJobList.map((job, idx) => {
      const [lat, lng] = computeBinCoords(job, facLat, facLng, idx);
      const isSelected = selectedJobId === job.id;
      const color = isSelected
        ? "#6366f1"
        : getUrgencyColor(job.urgency, job.status);

      return {
        id: job.id,
        lat,
        lng,
        title: job.location || `Bin Unit ${job.id}`,
        subtitle: `${job.device || job.id} • ${job.zone || "Facility Area"}`,
        urgency: job.urgency || "Normal",
        fill: job.fill ?? 0,
        status: job.status || "Pending",
        color,
        pinType: "bin" as const,
        iconUrl: "/bin-marker-icon.png",
      };
    });
  }, [activeJobList, facLat, facLng, selectedJobId]);

  // 3. Dynamically filtered pins based on layerFilter
  const pins: MapPin[] = useMemo(() => {
    if (layerFilter === "facilities") return facilityPins;
    if (layerFilter === "bins") return binPins;
    return [...facilityPins, ...binPins];
  }, [layerFilter, facilityPins, binPins]);

  const legendItems = [
    { color: "#3b82f6", label: "Facility Hub / Depot" },
    { color: "#ba1a1a", label: "Critical / High Fill (≥80%)" },
    { color: "#f59e0b", label: "Warning (60-79%)" },
    { color: "#0284c7", label: "Normal Pending (<60%)" },
    { color: "#10b981", label: "Emptied / Completed" },
  ];

  return (
    <div
      className={`relative w-full h-full min-h-[380px] ${className}`}
      style={{ height }}
    >
      {/* Live Facility Header Badge */}
      <div className="absolute top-3 left-3 z-10 bg-slate-900/90 text-white backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-slate-700/60 flex items-center gap-2.5">
        <span className="flex h-2.5 w-2.5 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>
        <div>
          <div className="text-[10px] uppercase font-mono font-bold text-emerald-400 tracking-wider">
            {title || "FACILITY & SMART BIN MAP"}
          </div>
          <div className="text-xs font-black text-white">
            {facilityName} Network
          </div>
        </div>
        <div className="ml-2 pl-2.5 border-l border-slate-700 text-[10px] font-mono text-slate-300 font-bold">
          {pins.length} Pin{pins.length === 1 ? "" : "s"}
        </div>
      </div>

      {/* Dynamic Layer Switcher Pill + Legend Toggle */}
      <div
        data-testid="map-layer-controls"
        className="absolute top-3 right-3 z-10 bg-slate-900/90 text-white backdrop-blur-md p-1 rounded-xl shadow-lg border border-slate-700/60 flex items-center gap-1 text-xs"
      >
        <button
          data-testid="layer-all-btn"
          onClick={() => setLayerFilter("all")}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            layerFilter === "all"
              ? "bg-emerald-500 text-white shadow-sm"
              : "text-slate-300 hover:text-white hover:bg-slate-800/80"
          }`}
        >
          All
        </button>
        <button
          data-testid="layer-bins-btn"
          onClick={() => setLayerFilter("bins")}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            layerFilter === "bins"
              ? "bg-sky-500 text-white shadow-sm"
              : "text-slate-300 hover:text-white hover:bg-slate-800/80"
          }`}
        >
          Bins
        </button>
        <button
          data-testid="layer-facilities-btn"
          onClick={() => setLayerFilter("facilities")}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            layerFilter === "facilities"
              ? "bg-purple-500 text-white shadow-sm"
              : "text-slate-300 hover:text-white hover:bg-slate-800/80"
          }`}
        >
          Facilities
        </button>

        <div className="h-4 w-px bg-slate-700 mx-0.5" />

        <button
          data-testid="toggle-legend-btn"
          title="Toggle Map Legend"
          aria-label="Toggle Map Legend"
          onClick={() => setIsLegendOpen((prev) => !prev)}
          className={`p-1.5 rounded-lg transition-all cursor-pointer ${
            isLegendOpen
              ? "bg-slate-700 text-emerald-400 font-bold"
              : "text-slate-400 hover:text-white hover:bg-slate-800/80"
          }`}
        >
          <Layers className="w-4 h-4" />
        </button>
      </div>

      {/* Map Legend Drawer */}
      {isLegendOpen && (
        <div
          data-testid="map-legend-drawer"
          className="absolute bottom-6 right-3 z-10 bg-white/95 dark:bg-card/95 backdrop-blur-md border border-border rounded-xl p-3 shadow-xl text-xs flex flex-col gap-2 min-w-[200px]"
        >
          <div className="flex items-center justify-between pb-1 border-b border-border">
            <div className="font-extrabold text-[10px] text-foreground dark:text-white uppercase tracking-wider">
              Map Layer Legend
            </div>
            <button
              data-testid="close-legend-btn"
              onClick={() => setIsLegendOpen(false)}
              className="text-muted-foreground hover:text-foreground p-0.5 rounded cursor-pointer"
              title="Close Legend"
            >
              <X className="w-3 h-3" />
            </button>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <img
                src="/facility-marker-icon.png"
                alt="Facility Hub"
                className="w-3.5 h-3.5 object-contain shrink-0"
              />
              <span className="text-[10px] text-foreground dark:text-slate-200 font-bold">
                Facility Depot / Hub
              </span>
            </div>
            <div className="flex items-center gap-2">
              <img
                src="/bin-marker-icon.png"
                alt="Smart Bin"
                className="w-3.5 h-3.5 object-contain shrink-0"
              />
              <span className="text-[10px] text-foreground dark:text-slate-200 font-bold">
                IoT Smart Bin
              </span>
            </div>

            <div className="h-px bg-border/60 my-0.5" />

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
        </div>
      )}

      {/* Vector Map Engine (MapLibre GL) */}
      <MapLibreMap
        center={mapCenter}
        zoom={16}
        pins={pins}
        height="100%"
        className="w-full h-full"
        onMarkerClick={(pin) => {
          const matchedJob = activeJobList.find((j) => j.id === pin.id);
          if (matchedJob && onSelectJob) {
            onSelectJob(matchedJob);
          }
        }}
      />
    </div>
  );
}
