import type { MapPin } from "../../components/MapLibreMap";

// ─── Shared CollectorJob Type ────────────────────────────────────────────────
export interface CollectorJob {
  id: string;
  device: string;
  location: string;
  zone: string;
  fill: number;
  urgency: "Critical" | "High" | "Normal";
  status: "Pending" | "In Transit" | "Completed";
  isAssignedToMe: boolean;
}

// ─── Approximate KNUST Campus GPS Coordinates per Job ────────────────────────
// Lat/Lng sourced from approximate positions of real KNUST campus buildings.
export const JOB_COORDINATES: Record<string, { lat: number; lng: number }> = {
  "JOB-1041": { lat: 6.6735, lng: -1.5655 }, // College of Science
  "JOB-1042": { lat: 6.6780, lng: -1.5720 }, // College of Pharmacy
  "JOB-1040": { lat: 6.6700, lng: -1.5745 }, // College of Engineering
  "JOB-1039": { lat: 6.6765, lng: -1.5620 }, // College of Science B
  "JOB-1038": { lat: 6.6715, lng: -1.5600 }, // College of Eng Annex
};

// ─── Shared Mock Data (Single Source of Truth) ───────────────────────────────
export const COLLECTOR_JOBS: CollectorJob[] = [
  {
    id: "JOB-1041",
    device: "#SN-4431-L",
    location: "College of Science",
    zone: "Science Complex",
    fill: 82,
    urgency: "High",
    status: "In Transit",
    isAssignedToMe: true,
  },
  {
    id: "JOB-1042",
    device: "#SN-9902-X",
    location: "College of Pharmacy",
    zone: "Pharmacy Block",
    fill: 94,
    urgency: "Critical",
    status: "Pending",
    isAssignedToMe: false,
  },
  {
    id: "JOB-1040",
    device: "#SN-1108-P",
    location: "College of Engineering",
    zone: "Engineering Block",
    fill: 78,
    urgency: "Normal",
    status: "Pending",
    isAssignedToMe: false,
  },
  {
    id: "JOB-1039",
    device: "#SN-8871-S",
    location: "College of Science B",
    zone: "Science Block B",
    fill: 71,
    urgency: "Normal",
    status: "Pending",
    isAssignedToMe: false,
  },
  {
    id: "JOB-1038",
    device: "#SN-5520-R",
    location: "College of Eng Annex",
    zone: "Engineering Annex",
    fill: 65,
    urgency: "Normal",
    status: "Completed",
    isAssignedToMe: true,
  },
];

// ─── Urgency Sorting Utility ─────────────────────────────────────────────────
const URGENCY_WEIGHT: Record<string, number> = {
  Critical: 3,
  High: 2,
  Normal: 1,
};

/**
 * Sorts jobs by urgency (Critical first) then by fill level (highest first).
 */
export function sortByUrgency(jobs: CollectorJob[]): CollectorJob[] {
  return [...jobs].sort((a, b) => {
    const aW = URGENCY_WEIGHT[a.urgency] ?? 0;
    const bW = URGENCY_WEIGHT[b.urgency] ?? 0;
    if (aW !== bW) return bW - aW;
    return b.fill - a.fill;
  });
}

// ─── MapPin Conversion ───────────────────────────────────────────────────────
export function getUrgencyColor(urgency: string, status: string): string {
  if (status === "Completed") return "#10b981";
  switch (urgency) {
    case "Critical":
      return "#ef4444";
    case "High":
      return "#f59e0b";
    default:
      return "#3b82f6";
  }
}

/**
 * Converts a CollectorJob array into MapPin[] for the MapLibreMap component.
 * Only includes jobs assigned to the current collector.
 */
export function jobsToMapPins(jobs: CollectorJob[]): MapPin[] {
  return jobs
    .filter((j) => j.isAssignedToMe)
    .map((job) => {
      const coords = JOB_COORDINATES[job.id];
      if (!coords) return null;
      return {
        id: job.id,
        lat: coords.lat,
        lng: coords.lng,
        title: job.location,
        subtitle: `${job.device} • ${job.zone}`,
        urgency: job.urgency,
        fill: job.fill,
        status: job.status,
        color: getUrgencyColor(job.urgency, job.status),
      };
    })
    .filter(Boolean) as MapPin[];
}

// ─── Navigation Instructions ─────────────────────────────────────────────────
export const NAV_INSTRUCTIONS = [
  "Head north toward the main corridor",
  "Take the turn to the right",
  "Proceed down the path; the smart bin is on your right",
];
