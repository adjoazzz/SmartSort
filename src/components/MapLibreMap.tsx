import React, { useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

// ─── Free Tile Styles ───────────────────────────────────────────────────────
export const CARTO_VOYAGER_STYLE =
  "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json";
export const CARTO_POSITRON_STYLE =
  "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";
export const CARTO_DARK_MATTER_STYLE =
  "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";

// ─── Types & Interfaces ──────────────────────────────────────────────────────
export interface VehicleTelemetry {
  id: string;
  label?: string;
  lat: number;
  lng: number;
  heading?: number; // 0 to 360 degrees
  speed?: number; // km/h or mph
  status?: string;
  lastUpdated?: string;
}

export interface MapPin {
  id: string;
  lat: number;
  lng: number;
  title: string;
  subtitle?: string;
  urgency?: string;
  fill?: number;
  status?: string;
  color?: string;
  waypointNumber?: number | string;
  pinType?: "bin" | "facility";
  type?: "bin" | "facility";
  isFacility?: boolean;
  tonnage?: number;
  iconUrl?: string;
  onClaim?: (id: string) => void;
  onComplete?: (id: string) => void;
}

export interface MapLibreMapProps {
  initialCenter?: [number, number]; // [lng, lat]
  initialZoom?: number;
  center?: [number, number]; // [lng, lat] for dynamic camera transitions
  zoom?: number;
  pins?: MapPin[];
  vehicles?: VehicleTelemetry[];
  activeTrackingId?: string | null;
  className?: string;
  height?: string;
  onMarkerClick?: (pin: MapPin) => void;
  onVehicleClick?: (vehicle: VehicleTelemetry) => void;
  /** Helper interface callback to connect custom WebSocket / Event streams */
  onRegisterTelemetryStream?: (
    listener: (telemetry: VehicleTelemetry) => void,
  ) => (() => void) | void;
}

// ─── SVG Marker Factories ────────────────────────────────────────────────────
function createVehicleIconElement(heading = 0, status = "active"): HTMLElement {
  const container = document.createElement("div");
  container.className = "vehicle-marker-container";
  container.style.width = "40px";
  container.style.height = "40px";
  container.style.display = "flex";
  container.style.alignItems = "center";
  container.style.justifyContent = "center";
  container.style.cursor = "pointer";

  const color = status === "Idle" ? "#f59e0b" : "#006c49";

  container.innerHTML = `
    <div style="
      position: relative;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <!-- Outer Pulsing Halo -->
      <div style="
        position: absolute;
        inset: -4px;
        background: ${color}33;
        border-radius: 50%;
        animation: vehicle-pulse 2s infinite ease-in-out;
      "></div>

      <!-- Vehicle Body Shadow & Badge -->
      <div style="
        width: 32px;
        height: 32px;
        background: #0f172a;
        border: 2.5px solid white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(0,0,0,0.35);
        transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      ">
        <!-- Directional Truck Arrow Pointer -->
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="12 2 19 21 12 17 5 21 12 2" fill="${color}" fill-opacity="0.3"></polygon>
        </svg>
      </div>
    </div>
    <style>
      @keyframes vehicle-pulse {
        0% { transform: scale(0.8); opacity: 0.8; }
        50% { transform: scale(1.3); opacity: 0.2; }
        100% { transform: scale(0.8); opacity: 0.8; }
      }
    </style>
  `;
  return container;
}

function isFacilityPin(pin: MapPin): boolean {
  // 1. Explicit boolean flag takes highest priority
  if (pin.isFacility !== undefined) return pin.isFacility;
  // 2. Explicit type / pinType field
  if (pin.type === "facility" || pin.pinType === "facility") return true;
  if (pin.type === "bin" || pin.pinType === "bin") return false;
  // 3. Heuristic fallbacks (icon URL, ID prefix, title text)
  return (
    Boolean(pin.iconUrl && pin.iconUrl.includes("facility")) ||
    pin.id.startsWith("FAC-") ||
    pin.id.startsWith("DEPOT-") ||
    Boolean(
      pin.title &&
      /depot|plant|^facility/i.test(pin.title) &&
      !/bin/i.test(pin.title),
    )
  );
}

function createPinIconElement(pin: MapPin): HTMLElement {
  const container = document.createElement("div");
  container.className = "pin-marker-container";
  container.style.cursor = "pointer";

  const isFacility = isFacilityPin(pin);
  const iconSrc = isFacility
    ? "/facility-marker-icon.png"
    : pin.iconUrl || "/bin-marker-icon.png";
  const iconAlt = isFacility ? "Facility" : "Smart Bin";

  const fill = pin.fill ?? 0;
  const color = pin.color || (isFacility ? "#3b82f6" : "#0284c7");
  const ringColor = isFacility
    ? color
    : fill >= 90
      ? "#ba1a1a"
      : fill >= 70
        ? "#f59e0b"
        : color;
  const isCritical = !isFacility && fill >= 85;
  const isWaypoint =
    pin.waypointNumber !== undefined && pin.waypointNumber !== null;

  container.innerHTML = `
    <div style="
      position: relative;
      width: 42px;
      height: 46px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    ">
      ${
        isCritical
          ? `
        <!-- Pulsing critical halo -->
        <div style="
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          background: #ba1a1a33;
          animation: bin-pulse 2s infinite ease-in-out;
          pointer-events: none;
        "></div>
      `
          : ""
      }

      <!-- Outer Pin Teardrop with Glow & Shadow -->
      <div style="
        width: 36px;
        height: 36px;
        background: #ffffff;
        border: 2.5px solid ${ringColor};
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        box-shadow: 0 4px 12px rgba(0,0,0,0.25);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <!-- Counter-rotated Inner Wrapper with Custom Icon -->
        <div style="
          transform: rotate(45deg);
          width: 22px;
          height: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <img
            src="${iconSrc}"
            alt="${iconAlt}"
            style="
              width: 20px;
              height: 20px;
              object-fit: contain;
              display: block;
            "
          />
        </div>
      </div>

      <!-- Waypoint Number Badge (Left) if part of optimized route -->
      ${
        isWaypoint
          ? `
        <div style="
          position: absolute;
          top: -4px;
          left: -4px;
          background: #0f172a;
          color: #ffffff;
          font-size: 9px;
          font-weight: 800;
          font-family: ui-monospace, monospace;
          padding: 1.5px 5px;
          border-radius: 9999px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.35);
          border: 1.5px solid white;
          line-height: 1.1;
          z-index: 12;
        ">${typeof pin.waypointNumber === "number" ? `#${pin.waypointNumber}` : pin.waypointNumber}</div>
      `
          : ""
      }

      <!-- Fill Percentage Badge (Right) -->
      ${
        fill > 0
          ? `
        <div style="
          position: absolute;
          top: -4px;
          right: -4px;
          background: ${ringColor};
          color: white;
          font-size: 9px;
          font-weight: 800;
          font-family: ui-monospace, monospace;
          padding: 1.5px 4px;
          border-radius: 8px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.35);
          border: 1.5px solid white;
          line-height: 1.1;
          z-index: 10;
        ">${fill}%</div>
      `
          : ""
      }
    </div>
    <style>
      @keyframes bin-pulse {
        0% { transform: scale(0.85); opacity: 0.8; }
        50% { transform: scale(1.35); opacity: 0.15; }
        100% { transform: scale(0.85); opacity: 0.8; }
      }
    </style>
  `;
  return container;
}

// ─── Main MapLibre GL JS Component ───────────────────────────────────────────
export function MapLibreMap({
  initialCenter = [-0.187, 5.6037], // [lng, lat] (Accra, Ghana)
  initialZoom = 13,
  center,
  zoom,
  pins = [],
  vehicles = [],
  activeTrackingId = null,
  className = "",
  height = "100%",
  onMarkerClick,
  onVehicleClick,
  onRegisterTelemetryStream,
}: MapLibreMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  // Markers references
  const pinMarkersRef = useRef<Map<string, maplibregl.Marker>>(new Map());
  const vehicleMarkersRef = useRef<
    Map<string, { marker: maplibregl.Marker; telemetry: VehicleTelemetry }>
  >(new Map());

  const [mapLoaded, setMapLoaded] = useState(false);

  // 1. Initialize MapLibre GL map instance once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: CARTO_VOYAGER_STYLE,
      center: center || initialCenter,
      zoom: zoom || initialZoom,
      pitch: 30, // 3D perspective for Uber/Bolt feel
      bearing: 0,
      attributionControl: { compact: true },
    });

    // Add navigation controls (Zoom, pitch, compass)
    map.addControl(
      new maplibregl.NavigationControl({
        showCompass: true,
        showZoom: true,
        visualizePitch: true,
      }),
      "top-right",
    );

    map.addControl(new maplibregl.FullscreenControl(), "top-right");

    map.on("load", () => {
      setMapLoaded(true);
    });

    // Suppress missing sprite image warnings from tile styles
    // by providing a transparent 1x1 pixel fallback
    const transparentPixel = { width: 1, height: 1, data: new Uint8Array(4) };
    map.on("styleimagemissing", (e: { id: string }) => {
      try {
        if (!map.hasImage(e.id)) {
          map.addImage(e.id, transparentPixel);
        }
      } catch (_) {}
    });

    mapRef.current = map;

    // Handle container resize cleanly
    const resizeObserver = new ResizeObserver(() => {
      map.resize();
    });
    resizeObserver.observe(containerRef.current);

    // Clean teardown on unmount to prevent WebGL leaks
    return () => {
      resizeObserver.disconnect();
      // Remove all markers
      pinMarkersRef.current.forEach((m: maplibregl.Marker) => m.remove());
      pinMarkersRef.current.clear();

      vehicleMarkersRef.current.forEach(
        ({ marker }: { marker: maplibregl.Marker }) => marker.remove(),
      );
      vehicleMarkersRef.current.clear();

      map.remove();
      mapRef.current = null;
    };
  }, []);

  // 1b. Smooth flyTo when center or zoom prop changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded || !center) return;
    map.flyTo({
      center,
      zoom: zoom ?? map.getZoom(),
      essential: true,
      duration: 1200,
    });
  }, [center, zoom, mapLoaded]);

  // 2. Render & update static Pin Markers (Bins / Facilities)
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded) return;

    const currentPinIds = new Set(pins.map((p) => p.id));

    // Remove pins that no longer exist
    pinMarkersRef.current.forEach((marker: maplibregl.Marker, id: string) => {
      if (!currentPinIds.has(id)) {
        marker.remove();
        pinMarkersRef.current.delete(id);
      }
    });

    // Add or update pins
    pins.forEach((pin) => {
      const existing = pinMarkersRef.current.get(pin.id);

      if (existing) {
        existing.setLngLat([pin.lng, pin.lat]);
      } else {
        const el = createPinIconElement(pin);
        const isFac = isFacilityPin(pin);
        const iconSrc = isFac
          ? "/facility-marker-icon.png"
          : pin.iconUrl || "/bin-marker-icon.png";
        const iconAlt = isFac ? "Facility" : "Smart Bin";

        const popup = new maplibregl.Popup({ offset: 25, maxWidth: "260px" })
          .setHTML(`
          <div style="font-family:system-ui,sans-serif;padding:6px;min-width:180px;">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
              <div style="width:24px;height:24px;background:#f1f5f9;border-radius:6px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                <img src="${iconSrc}" alt="${iconAlt}" style="width:16px;height:16px;object-fit:contain;" />
              </div>
              <div style="font-weight:700;font-size:13px;color:#0f172a;line-height:1.2;">${pin.title}</div>
            </div>
            ${pin.subtitle ? `<div style="font-size:11px;color:#64748b;font-family:monospace;margin-bottom:6px;">${pin.subtitle}</div>` : ""}
            <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
              ${pin.urgency ? `<span style="display:inline-block;padding:2px 8px;border-radius:99px;background:#0284c722;color:#0284c7;font-weight:700;font-size:11px;">${pin.urgency}</span>` : ""}
              ${
                pin.fill !== undefined
                  ? `
                <span style="font-size:11px;color:${pin.fill >= 80 ? "#ba1a1a" : "#006c49"};font-weight:700;font-family:monospace;">
                  Fill: ${pin.fill}%
                </span>
              `
                  : ""
              }
            </div>
          </div>
        `);

        const marker = new maplibregl.Marker({ element: el })
          .setLngLat([pin.lng, pin.lat])
          .setPopup(popup)
          .addTo(map);

        el.addEventListener("click", () => {
          onMarkerClick?.(pin);
        });

        pinMarkersRef.current.set(pin.id, marker);
      }
    });
  }, [pins, mapLoaded, onMarkerClick]);

  // 3. Real-Time Vehicle Markers (Uber/Bolt Smooth Movement & Rotation)
  const updateVehicleMarker = (telemetry: VehicleTelemetry) => {
    const map = mapRef.current;
    if (!map) return;

    const existing = vehicleMarkersRef.current.get(telemetry.id);

    if (existing) {
      // Smooth animated coordinate movement & rotation update
      existing.marker.setLngLat([telemetry.lng, telemetry.lat]);
      if (telemetry.heading !== undefined) {
        existing.marker.setRotation(telemetry.heading);
      }
      existing.telemetry = telemetry;
    } else {
      // Create new vehicle marker
      const el = createVehicleIconElement(
        telemetry.heading ?? 0,
        telemetry.status ?? "Active",
      );
      const marker = new maplibregl.Marker({
        element: el,
        rotationAlignment: "map",
      })
        .setLngLat([telemetry.lng, telemetry.lat])
        .addTo(map);

      if (telemetry.heading !== undefined) {
        marker.setRotation(telemetry.heading);
      }

      el.addEventListener("click", () => {
        onVehicleClick?.(telemetry);
      });

      vehicleMarkersRef.current.set(telemetry.id, { marker, telemetry });
    }

    // Uber/Bolt smooth camera tracking if actively following this vehicle
    if (activeTrackingId === telemetry.id) {
      map.easeTo({
        center: [telemetry.lng, telemetry.lat],
        bearing: telemetry.heading ?? map.getBearing(),
        zoom: Math.max(map.getZoom(), 15),
        duration: 1000,
        easing: (t: number) => t,
      });
    }
  };

  // Sync vehicle props list
  useEffect(() => {
    if (!mapLoaded) return;
    vehicles.forEach(updateVehicleMarker);
  }, [vehicles, mapLoaded, activeTrackingId]);

  // 4. Ingest real-time WebSocket / Event telemetry stream via callback helper
  useEffect(() => {
    if (!onRegisterTelemetryStream || !mapLoaded) return;

    const unsubscribe = onRegisterTelemetryStream((telemetry) => {
      updateVehicleMarker(telemetry);
    });

    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, [onRegisterTelemetryStream, mapLoaded, activeTrackingId]);

  return (
    <div className={`relative w-full ${className}`} style={{ height }}>
      <div
        ref={containerRef}
        className="w-full h-full rounded-xl overflow-hidden shadow-inner"
      />
    </div>
  );
}
