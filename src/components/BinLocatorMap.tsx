import React, { useEffect, useRef, useState, useCallback } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ─── Fix Leaflet's default icon path issue with bundlers ───────────────────
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// ─── Types ──────────────────────────────────────────────────────────────────
interface Job {
  id: string;
  location: string;
  zone?: string;
  device?: string;
  fill?: number;
  urgency?: string;
  status?: string;
  type?: string;
}

interface BinLocatorMapProps {
  jobs: Job[];
  onClaimJob?: (id: string) => void;
  onCompleteJob?: (id: string) => void;
  activeTab?: "available_jobs" | "my_jobs" | "map_view";
}

// ─── Geocoding cache (module-level to persist between renders) ───────────────
const geocodeCache = new Map<string, [number, number] | null>();

// Accra, Ghana bounding area for randomised fallback coords
const ACCRA_CENTER: [number, number] = [5.6037, -0.187];
const FALLBACK_SPREAD = 0.06;

function getFallbackCoords(seed: string): [number, number] {
  // Deterministic pseudo-random coords based on string hash so the same
  // location string always gets the same pin on re-renders
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

// ─── Pin colours by urgency ──────────────────────────────────────────────────
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
      return "#0284c7"; // blue (Normal / Pending)
  }
}

function createPinIcon(color: string, fill: number): L.DivIcon {
  const ringColor = fill >= 90 ? "#ba1a1a" : fill >= 70 ? "#f59e0b" : color;
  return L.divIcon({
    className: "",
    html: `
      <div style="
        position: relative;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          width: 28px;
          height: 28px;
          background: ${color};
          border: 3px solid white;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          box-shadow: 0 2px 8px rgba(0,0,0,0.35);
        "></div>
        <div style="
          position: absolute;
          top: 4px;
          left: 4px;
          width: 28px;
          height: 28px;
          border-radius: 50% 50% 50% 0;
          border: 2.5px solid ${ringColor};
          transform: rotate(-45deg);
          opacity: 0.5;
          pointer-events: none;
        "></div>
        <!-- Bin icon rotated back -->
        <div style="
          position: absolute;
          top: 6px;
          left: 7px;
          color: white;
          font-size: 11px;
          font-weight: 800;
          transform: none;
          pointer-events: none;
          line-height: 1;
        ">🗑</div>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [14, 34],
    popupAnchor: [4, -32],
  });
}

const createUserMarkerIcon = (): L.DivIcon => {
  return L.divIcon({
    className: "",
    html: `
      <div style="position: relative; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;">
        <div style="position: absolute; width: 24px; height: 24px; background: rgba(37, 99, 235, 0.4); border-radius: 50%; animation: pulse-ring 2s infinite ease-in-out;"></div>
        <div style="position: absolute; width: 14px; height: 14px; background: #2563eb; border: 2.5px solid white; border-radius: 50%; box-shadow: 0 0 6px rgba(0,0,0,0.3);"></div>
      </div>
      <style>
        @keyframes pulse-ring {
          0% { transform: scale(0.6); opacity: 1; }
          100% { transform: scale(1.6); opacity: 0; }
        }
      </style>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

// ─── Main Component ──────────────────────────────────────────────────────────
export function BinLocatorMap({
  jobs,
  onClaimJob,
  onCompleteJob,
  activeTab,
}: BinLocatorMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [geocodedCount, setGeocodedCount] = useState(0);
  const [userCoords, setUserCoords] = useState<[number, number] | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);

  // Watch device coordinates for real-time user location tracking
  useEffect(() => {
    if (!navigator.geolocation) return;

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserCoords([latitude, longitude]);
      },
      (error) => {
        console.warn("Geolocation watch error:", error);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  // Update or create user location marker on coordinates shift
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !userCoords) return;

    if (userMarkerRef.current) {
      userMarkerRef.current.setLatLng(userCoords);
    } else {
      const marker = L.marker(userCoords, { icon: createUserMarkerIcon() }).addTo(map);
      marker.bindPopup("<strong>Your Current Location</strong>");
      userMarkerRef.current = marker;
      map.setView(userCoords, 14);
    }
  }, [userCoords]);

  // ── Initialise map once ────────────────────────────────────────────────
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: ACCRA_CENTER,
      zoom: 13,
      zoomControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;

    // Handle container resize (e.g. tab switching)
    const observer = new ResizeObserver(() => {
      map.invalidateSize();
    });
    observer.observe(mapContainerRef.current);

    return () => {
      observer.disconnect();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // ── Re-render markers whenever jobs list changes ────────────────────────
  const renderMarkers = useCallback(async () => {
    const map = mapRef.current;
    if (!map) return;

    // Clear old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    if (jobs.length === 0) return;

    setIsGeocoding(true);
    setGeocodedCount(0);

    const bounds: [number, number][] = [];

    for (let i = 0; i < jobs.length; i++) {
      const job = jobs[i];
      const coords = await geocodeLocation(job.location || "Accra");
      bounds.push(coords);

      const color = getUrgencyColor(job.urgency, job.status);
      const icon = createPinIcon(color, job.fill ?? 0);

      const fillLevel = job.fill ?? 0;
      const urgencyLabel = job.urgency || "Normal";
      const statusLabel = job.status || "Pending";

      // Build action button HTML
      let actionHtml = "";
      if (activeTab === "available_jobs" && statusLabel === "Pending") {
        actionHtml = `<button
          id="map-claim-${job.id}"
          style="margin-top:8px;width:100%;padding:6px 12px;background:#006c49;color:white;border:none;border-radius:6px;font-size:12px;font-weight:700;cursor:pointer;"
        >Claim Job</button>`;
      } else if (activeTab === "my_jobs" && statusLabel !== "Completed") {
        actionHtml = `<button
          id="map-complete-${job.id}"
          style="margin-top:8px;width:100%;padding:6px 12px;background:#1e293b;color:white;border:none;border-radius:6px;font-size:12px;font-weight:700;cursor:pointer;"
        >Mark Complete</button>`;
      }

      const urgencyBadgeColor =
        job.urgency === "Critical" || job.urgency === "Urgent"
          ? "#ba1a1a"
          : job.urgency === "High"
          ? "#f59e0b"
          : job.urgency === "Medium"
          ? "#f97316"
          : "#0284c7";

      const popup = L.popup({ maxWidth: 240 }).setContent(`
        <div style="font-family:system-ui,sans-serif;min-width:200px;">
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
            <span style="font-size:13px;font-weight:700;color:#0f172a;">${job.location || "Unknown"}</span>
          </div>
          <div style="font-size:11px;color:#64748b;font-family:monospace;margin-bottom:6px;">${job.device || job.id}</div>
          <div style="display:flex;gap:6px;align-items:center;margin-bottom:6px;">
            <span style="
              display:inline-block;padding:2px 8px;border-radius:999px;
              background:${urgencyBadgeColor}22;color:${urgencyBadgeColor};
              font-size:11px;font-weight:700;border:1px solid ${urgencyBadgeColor}44;
            ">${urgencyLabel}</span>
            <span style="font-size:11px;color:#64748b;">${statusLabel}</span>
          </div>
          <div style="margin-bottom:2px;">
            <div style="display:flex;justify-content:space-between;font-size:11px;color:#64748b;margin-bottom:3px;">
              <span>Fill Level</span>
              <span style="font-weight:700;color:${fillLevel >= 80 ? "#ba1a1a" : "#0f172a"};">${fillLevel}%</span>
            </div>
            <div style="height:5px;background:#e2e8f0;border-radius:99px;overflow:hidden;">
              <div style="height:100%;width:${fillLevel}%;background:${fillLevel >= 80 ? "#ba1a1a" : "#006c49"};border-radius:99px;"></div>
            </div>
          </div>
          ${actionHtml}
        </div>
      `);

      const marker = L.marker(coords, { icon }).addTo(map).bindPopup(popup);

      // Wire up popup button clicks after popup opens
      marker.on("popupopen", () => {
        const claimBtn = document.getElementById(`map-claim-${job.id}`);
        if (claimBtn) {
          claimBtn.addEventListener("click", () => {
            onClaimJob?.(job.id);
            map.closePopup();
          });
        }
        const completeBtn = document.getElementById(`map-complete-${job.id}`);
        if (completeBtn) {
          completeBtn.addEventListener("click", () => {
            onCompleteJob?.(job.id);
            map.closePopup();
          });
        }
      });

      markersRef.current.push(marker);
      setGeocodedCount(i + 1);
    }

    // Fit map to all pins
    if (bounds.length > 0) {
      try {
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });
      } catch {
        map.setView(ACCRA_CENTER, 13);
      }
    }

    setIsGeocoding(false);
  }, [jobs, activeTab, onClaimJob, onCompleteJob]);

  useEffect(() => {
    // Small delay to ensure map container is painted before geocoding
    const timer = setTimeout(() => {
      renderMarkers();
    }, 200);
    return () => clearTimeout(timer);
  }, [renderMarkers]);

  // ── Legend data ─────────────────────────────────────────────────────────
  const legendItems = [
    { color: "#ba1a1a", label: "Critical / Urgent" },
    { color: "#f59e0b", label: "High" },
    { color: "#f97316", label: "Medium" },
    { color: "#0284c7", label: "Normal / Pending" },
    { color: "#10b981", label: "Completed" },
  ];

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* Loading overlay */}
      {isGeocoding && (
        <div
          style={{
            position: "absolute",
            top: 12,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1000,
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
          📍 Locating bins… {geocodedCount}/{jobs.length}
        </div>
      )}

      {/* No jobs message */}
      {!isGeocoding && jobs.length === 0 && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            zIndex: 1000,
            textAlign: "center",
            color: "#64748b",
            fontSize: 14,
            fontWeight: 500,
            pointerEvents: "none",
          }}
        >
          No bins to display on the map.
        </div>
      )}

      {/* Legend */}
      <div
        style={{
          position: "absolute",
          bottom: 28,
          right: 8,
          zIndex: 1000,
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
          BIN STATUS
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

      {/* Map container */}
      <div
        ref={mapContainerRef}
        style={{ width: "100%", height: "100%", borderRadius: "0 0 12px 12px" }}
      />
    </div>
  );
}
