import React, { useEffect, useState, useCallback } from "react";
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
}

export interface BinLocatorMapProps {
  jobs: Job[];
  onClaimJob?: (id: string) => void;
  onCompleteJob?: (id: string) => void;
  activeTab?: "available_jobs" | "my_jobs" | "map_view";
}

// ─── Geocoding Cache & Fallbacks ─────────────────────────────────────────────
const geocodeCache = new Map<string, [number, number] | null>();
const ACCRA_CENTER: [number, number] = [5.6037, -0.187];
const FALLBACK_SPREAD = 0.06;

function getFallbackCoords(seed: string): [number, number] {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  }
  const lat = ACCRA_CENTER[0] + ((hash % 1000) / 1000) * FALLBACK_SPREAD - FALLBACK_SPREAD / 2;
  const lng = ACCRA_CENTER[1] + (((hash >> 10) % 1000) / 1000) * FALLBACK_SPREAD - FALLBACK_SPREAD / 2;
  return [lat, lng];
}

async function geocodeLocation(location: string): Promise<[number, number]> {
  if (geocodeCache.has(location)) {
    const cached = geocodeCache.get(location);
    return cached ?? getFallbackCoords(location);
  }

  try {
    const query = encodeURIComponent(`${location}, Ghana`);
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`,
      { headers: { "Accept-Language": "en" } }
    );
    if (!res.ok) throw new Error("Nominatim request failed");
    const data = await res.json();
    if (data && data.length > 0) {
      const coords: [number, number] = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
      geocodeCache.set(location, coords);
      return coords;
    }
  } catch {
    // fall through to fallback
  }

  const fallback = getFallbackCoords(location);
  geocodeCache.set(location, fallback);
  return fallback;
}

function getUrgencyColor(urgency?: string, status?: string): string {
  if (status === "Completed") return "#10b981"; // green
  switch (urgency) {
    case "Critical":
    case "Urgent":
      return "#ba1a1a"; // red
    case "High":
      return "#f59e0b"; // amber
    case "Medium":
      return "#f97316"; // orange
    default:
      return "#0284c7"; // blue
  }
}

// ─── Refactored BinLocatorMap powered by MapLibre GL & OpenFreeMap ───────────
export function BinLocatorMap({
  jobs,
  onClaimJob,
  onCompleteJob,
  activeTab,
}: BinLocatorMapProps) {
  const [pins, setPins] = useState<MapPin[]>([]);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [geocodedCount, setGeocodedCount] = useState(0);

  const processJobs = useCallback(async () => {
    if (jobs.length === 0) {
      setPins([]);
      return;
    }

    setIsGeocoding(true);
    setGeocodedCount(0);

    const mapPins: MapPin[] = [];

    for (let i = 0; i < jobs.length; i++) {
      const job = jobs[i];
      const coords = await geocodeLocation(job.location || "Accra");

      mapPins.push({
        id: job.id,
        lat: coords[0],
        lng: coords[1],
        title: job.location || "Bin Location",
        subtitle: job.device || job.id,
        urgency: job.urgency || "Normal",
        fill: job.fill ?? 0,
        status: job.status || "Pending",
        color: getUrgencyColor(job.urgency, job.status),
        onClaim: onClaimJob,
        onComplete: onCompleteJob,
      });

      setGeocodedCount(i + 1);
    }

    setPins(mapPins);
    setIsGeocoding(false);
  }, [jobs, onClaimJob, onCompleteJob]);

  useEffect(() => {
    processJobs();
  }, [processJobs]);

  const legendItems = [
    { color: "#ba1a1a", label: "Critical / Urgent" },
    { color: "#f59e0b", label: "High" },
    { color: "#f97316", label: "Medium" },
    { color: "#0284c7", label: "Normal / Pending" },
    { color: "#10b981", label: "Completed" },
  ];

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* Loading Overlay */}
      {isGeocoding && (
        <div
          style={{
            position: "absolute",
            top: 12,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
            background: "rgba(15,23,42,0.85)",
            color: "white",
            padding: "6px 14px",
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 600,
            backdropFilter: "blur(4px)",
            whiteSpace: "nowrap",
          }}
        >
          📍 MapLibre Vector Locating… {geocodedCount}/{jobs.length}
        </div>
      )}

      {/* Map Legend Overlay */}
      <div
        style={{
          position: "absolute",
          bottom: 28,
          right: 8,
          zIndex: 10,
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(8px)",
          border: "1px solid #e2e8f0",
          borderRadius: 10,
          padding: "8px 12px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
          fontSize: 11,
          fontFamily: "system-ui,sans-serif",
        }}
      >
        <div style={{ fontWeight: 700, color: "#0f172a", marginBottom: 5, fontSize: 11 }}>
          BIN STATUS (OpenFreeMap Vector)
        </div>
        {legendItems.map((item) => (
          <div
            key={item.label}
            style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: item.color,
                flexShrink: 0,
              }}
            />
            <span style={{ color: "#475569" }}>{item.label}</span>
          </div>
        ))}
      </div>

      {/* MapLibre Vector Map Engine */}
      <MapLibreMap
        initialCenter={[-0.187, 5.6037]}
        initialZoom={13}
        pins={pins}
        height="100%"
      />
    </div>
  );
}
