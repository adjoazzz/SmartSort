import React, { useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

// ─── OpenFreeMap Liberty Style ───────────────────────────────────────────────
export const OPEN_FREE_MAP_LIBERTY_STYLE = "https://tiles.openfreemap.org/styles/liberty";


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
  onClaim?: (id: string) => void;
  onComplete?: (id: string) => void;
}

export interface MapLibreMapProps {
  initialCenter?: [number, number]; // [lng, lat]
  initialZoom?: number;
  pins?: MapPin[];
  vehicles?: VehicleTelemetry[];
  activeTrackingId?: string | null;
  className?: string;
  height?: string;
  onMarkerClick?: (pin: MapPin) => void;
  onVehicleClick?: (vehicle: VehicleTelemetry) => void;
  /** Helper interface callback to connect custom WebSocket / Event streams */
  onRegisterTelemetryStream?: (
    listener: (telemetry: VehicleTelemetry) => void
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

function createPinIconElement(color: string, fill: number): HTMLElement {
  const container = document.createElement("div");
  container.className = "pin-marker-container";
  container.style.cursor = "pointer";

  const ringColor = fill >= 90 ? "#ba1a1a" : fill >= 70 ? "#f59e0b" : color;

  container.innerHTML = `
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
      <div style="
        position: absolute;
        top: 6px;
        left: 7px;
        color: white;
        font-size: 11px;
        font-weight: 800;
        pointer-events: none;
        line-height: 1;
      ">🗑</div>
    </div>
  `;
  return container;
}

// ─── Main MapLibre GL JS Component ───────────────────────────────────────────
export function MapLibreMap({
  initialCenter = [-0.187, 5.6037], // [lng, lat] (Accra, Ghana)
  initialZoom = 13,
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
  const vehicleMarkersRef = useRef<Map<string, { marker: maplibregl.Marker; telemetry: VehicleTelemetry }>>(new Map());

  const [mapLoaded, setMapLoaded] = useState(false);

  // 1. Initialize MapLibre GL map instance once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: OPEN_FREE_MAP_LIBERTY_STYLE,
      center: initialCenter,
      zoom: initialZoom,
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
      "top-right"
    );

    map.addControl(new maplibregl.FullscreenControl(), "top-right");

    map.on("load", () => {
      setMapLoaded(true);
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

      vehicleMarkersRef.current.forEach(({ marker }: { marker: maplibregl.Marker }) => marker.remove());
      vehicleMarkersRef.current.clear();

      map.remove();
      mapRef.current = null;
    };
  }, []);

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
      const color = pin.color || "#0284c7";
      const existing = pinMarkersRef.current.get(pin.id);

      if (existing) {
        existing.setLngLat([pin.lng, pin.lat]);
      } else {
        const el = createPinIconElement(color, pin.fill ?? 0);
        const popup = new maplibregl.Popup({ offset: 25, maxWidth: "260px" }).setHTML(`
          <div style="font-family:system-ui,sans-serif;padding:4px;">
            <div style="font-weight:700;font-size:13px;color:#0f172a;margin-bottom:2px;">${pin.title}</div>
            ${pin.subtitle ? `<div style="font-size:11px;color:#64748b;font-family:monospace;margin-bottom:6px;">${pin.subtitle}</div>` : ""}
            ${pin.urgency ? `<span style="display:inline-block;padding:2px 8px;border-radius:99px;background:#0284c722;color:#0284c7;font-weight:700;font-size:11px;margin-bottom:6px;">${pin.urgency}</span>` : ""}
            ${pin.fill !== undefined ? `
              <div style="font-size:11px;color:#64748b;margin-top:4px;">
                Fill: <strong style="color:${pin.fill >= 80 ? "#ba1a1a" : "#006c49"}">${pin.fill}%</strong>
              </div>
            ` : ""}
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
      const el = createVehicleIconElement(telemetry.heading ?? 0, telemetry.status ?? "Active");
      const marker = new maplibregl.Marker({ element: el, rotationAlignment: "map" })
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
    <div
      className={`relative w-full ${className}`}
      style={{ height }}
    >
      <div ref={containerRef} className="w-full h-full rounded-xl overflow-hidden shadow-inner" />
    </div>
  );
}
