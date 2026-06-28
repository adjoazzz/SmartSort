import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { PageLayout } from "../../components/PageLayout";
import { MetricCard } from "../../components/MetricCard";
import { authFetch } from "../../lib/authFetch";
import { toast } from "sonner";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../../components/ui/table";
import { Progress } from "../../components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Default Leaflet icon fix
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

// Custom glowing markers
const createGlowingMarker = (color: string) =>
  L.divIcon({
    className: "custom-glow-marker",
    html: `<div style="background-color: ${color}; width: 16px; height: 16px; border-radius: 50%; box-shadow: 0 0 12px ${color}, 0 0 24px ${color}; border: 2.5px solid white; transition: all 0.3s ease;"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });

const createTruckMarker = () =>
  L.divIcon({
    className: "custom-truck-marker",
    html: `<div style="background-color: #3b82f6; color: white; width: 34px; height: 34px; border-radius: 8px; border: 2px solid white; display: flex; align-items: center; justify-center; box-shadow: 0 4px 10px rgba(0,0,0,0.3); font-size: 14px; font-weight: bold; transform: rotate(-5deg); transition: all 0.5s ease-out;"><span style="margin: auto;">🚚</span></div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
  });

interface Facility {
  id: string;
  name: string;
  region: string;
  status: string;
  latitude: number;
  longitude: number;
  deviceCount: number;
  activeDevices: number;
  averageFill: number;
  pendingTonnage: number;
  alertCount: number;
}

interface GlobalMetrics {
  facilitiesCount: number;
  activeFacilitiesCount: number;
  deviceStatus: string;
  totalItemsSorted: string;
  recyclingRate: string;
  contaminationRate: string;
  totalPendingTonnage: number;
  criticalAlertsCount: number;
}

interface BulkJob {
  id: string;
  facilityId: string;
  facility: { name: string };
  status: string;
  tonnage: number;
  collectorName: string;
  scheduledFor: string | null;
  completedAt: string | null;
  createdAt: string;
}

// Depots for routing
const ACCRA_DEPOT: [number, number] = [5.5501, -0.2012];

export default function AdminDashboard() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [metrics, setMetrics] = useState<GlobalMetrics>({
    facilitiesCount: 0,
    activeFacilitiesCount: 0,
    deviceStatus: "0/0",
    totalItemsSorted: "0",
    recyclingRate: "0%",
    contaminationRate: "0%",
    totalPendingTonnage: 0,
    criticalAlertsCount: 0,
  });
  const [bulkJobs, setBulkJobs] = useState<BulkJob[]>([]);
  const [loading, setLoading] = useState(true);

  // Dispatch Form States
  const [selectedFacilityId, setSelectedFacilityId] = useState("");
  const [tonnageInput, setTonnageInput] = useState("3.0");
  const [selectedCollectorName, setSelectedCollectorName] = useState(
    "Zoomlion Ghana Limited",
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Simulation coordinate tracking for moving trucks on the map
  const [truckPositions, setTruckPositions] = useState<
    Array<{ id: string; name: string; pos: [number, number] }>
  >([]);

  const baseUrl =
    (import.meta as any).env?.VITE_API_BASE_URL ?? "http://localhost:5000";

  const loadData = async () => {
    try {
      const [facRes, metRes, jobRes] = await Promise.all([
        authFetch(`${baseUrl}/api/admin/facilities`),
        authFetch(`${baseUrl}/api/admin/global-metrics`),
        authFetch(`${baseUrl}/api/admin/bulk-jobs`),
      ]);

      if (!facRes.ok || !metRes.ok || !jobRes.ok) {
        throw new Error("Failed to load admin telemetry");
      }

      const facData = await facRes.json();
      const metData = await metRes.json();
      const jobData = await jobRes.json();

      setFacilities(facData);
      setMetrics(metData);
      setBulkJobs(jobData);

      // Setup simulated truck positions on the map based on Dispatched jobs
      const activeDispatches = jobData.filter(
        (j: BulkJob) => j.status === "Dispatched",
      );
      const newTrucks = activeDispatches.map((j: BulkJob) => {
        const facility = facData.find((f: Facility) => f.id === j.facilityId);
        // Interpolate half-way between Accra Depot and target facility
        const targetLat = facility ? facility.latitude : 5.6037;
        const targetLng = facility ? facility.longitude : -0.187;
        const currentLat = ACCRA_DEPOT[0] + (targetLat - ACCRA_DEPOT[0]) * 0.4;
        const currentLng = ACCRA_DEPOT[1] + (targetLng - ACCRA_DEPOT[1]) * 0.4;

        return {
          id: j.id,
          name: j.collectorName,
          pos: [currentLat, currentLng] as [number, number],
        };
      });
      setTruckPositions(newTrucks);
    } catch (e: any) {
      toast.error(e.message || "Connection error to telemetry server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 10000); // Poll every 10s
    return () => clearInterval(interval);
  }, []);

  // Animate trucks along routes (subtle simulation coordinates jitter/movement)
  useEffect(() => {
    if (truckPositions.length === 0) return;

    const timer = setInterval(() => {
      setTruckPositions((prevTrucks) =>
        prevTrucks.map((truck) => {
          const job = bulkJobs.find((j) => j.id === truck.id);
          if (!job) return truck;
          const facility = facilities.find((f) => f.id === job.facilityId);
          if (!facility) return truck;

          const targetLat = facility.latitude;
          const targetLng = facility.longitude;

          // Compute small step towards target
          const stepSize = 0.002;
          const deltaLat = targetLat - truck.pos[0];
          const deltaLng = targetLng - truck.pos[1];
          const distance = Math.sqrt(deltaLat * deltaLat + deltaLng * deltaLng);

          if (distance < stepSize) {
            // Arrived at destination
            return { ...truck, pos: [targetLat, targetLng] };
          }

          const ratio = stepSize / distance;
          const nextLat = truck.pos[0] + deltaLat * ratio;
          const nextLng = truck.pos[1] + deltaLng * ratio;

          return {
            ...truck,
            pos: [nextLat, nextLng] as [number, number],
          };
        }),
      );
    }, 1500);

    return () => clearInterval(timer);
  }, [bulkJobs, facilities, truckPositions.length]);

  const handleDispatchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFacilityId) {
      toast.error("Please select a target facility");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await authFetch(`${baseUrl}/api/admin/bulk-jobs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          facilityId: selectedFacilityId,
          tonnage: parseFloat(tonnageInput),
          collectorName: selectedCollectorName,
        }),
      });

      if (!response.ok) throw new Error("Dispatch failed");

      toast.success(`Successfully dispatched ${selectedCollectorName}!`);
      setSelectedFacilityId("");
      loadData();
    } catch (err: any) {
      toast.error(err.message || "Failed to submit collection route");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCompletePickup = async (jobId: string) => {
    try {
      const response = await authFetch(`${baseUrl}/api/admin/bulk-jobs/${jobId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Completed" }),
      });

      if (!response.ok) throw new Error("Failed to complete pickup");

      toast.success("Trash collected and facility tonnage cleared!");
      loadData();
    } catch (err: any) {
      toast.error(err.message || "Failed to update bulk route");
    }
  };

  const handleTransitPickup = async (jobId: string) => {
    try {
      const response = await authFetch(`${baseUrl}/api/admin/bulk-jobs/${jobId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Dispatched" }),
      });

      if (!response.ok) throw new Error("Failed to dispatch truck");

      toast.info("Truck dispatched and routes calculated!");
      loadData();
    } catch (err: any) {
      toast.error(err.message || "Failed to update bulk route");
    }
  };

  // Facility comparative chart data
  const chartData = facilities.map((f) => ({
    name: f.name.replace(" Central Hub", "").replace(" Sorting Center", "").replace(" Plant", "").replace(" Hub", ""),
    "Pending Tonnage": f.pendingTonnage,
    "Bin Capacity %": f.averageFill,
  }));

  return (
    <PageLayout
      title="Enterprise Overview"
      description="Real-time multi-facility tracking, vehicle telemetry, and garbage collection logistics in Ghana."
    >
      {/* 1. Global Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Active Facilities"
          value={`${metrics.activeFacilitiesCount}/${metrics.facilitiesCount}`}
          trend="All systems nominal"
          trendDirection="neutral"
          iconColorClass="text-[#10b981]"
          iconBgClass="bg-[#10b981]/10"
          iconSvg={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          }
        />
        <MetricCard
          title="Online Sensors / Bins"
          value={metrics.deviceStatus}
          trend="+2.1% connectivity sync"
          trendDirection="up"
          iconColorClass="text-[#3b82f6]"
          iconBgClass="bg-[#3b82f6]/10"
          iconSvg={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
              <line x1="12" y1="18" x2="12.01" y2="18" />
            </svg>
          }
        />
        <MetricCard
          title="Daily Items Sorted"
          value={metrics.totalItemsSorted}
          trend={`Recycling rate: ${metrics.recyclingRate}`}
          trendDirection="up"
          iconColorClass="text-[#10b981]"
          iconBgClass="bg-[#10b981]/10"
          iconSvg={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          }
        />
        <MetricCard
          title="Pending Tonnage"
          value={`${metrics.totalPendingTonnage} Tons`}
          trend={`${metrics.criticalAlertsCount} critical system alerts`}
          trendDirection={metrics.criticalAlertsCount > 0 ? "down" : "neutral"}
          iconColorClass="text-[#f59e0b]"
          iconBgClass="bg-[#f59e0b]/10"
          iconSvg={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          }
        />
      </div>

      {/* 2. Interactive Map and comparative analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leaflet Live Map */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col min-h-[450px]">
          <div className="px-5 py-4 border-b border-border flex justify-between items-center bg-slate-50/50 dark:bg-secondary/30">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <h3 className="font-bold text-sm text-foreground dark:text-white">
                Live Enterprise Fleet Tracking
              </h3>
            </div>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400 px-2 py-0.5 rounded font-mono font-bold">
              GPS STREAM: LIVE
            </span>
          </div>

          <div className="flex-1 relative" style={{ height: "400px" }}>
            <MapContainer
              center={[6.0, -0.8]}
              zoom={7.5}
              style={{ width: "100%", height: "100%" }}
              scrollWheelZoom={false}
              className="z-10"
            >
              {/* Dark mode Mapbox/CartoDB tiles */}
              <TileLayer
                attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              />

              {/* Accra Central Depot */}
              <Marker
                position={ACCRA_DEPOT}
                icon={L.divIcon({
                  className: "depot-marker",
                  html: `<div style="background-color: #3b82f6; width: 12px; height: 12px; border-radius: 3px; border: 2.5px solid white;"></div>`,
                })}
              >
                <Popup>
                  <div className="text-xs font-bold text-foreground">Accra Central Operations Depot</div>
                </Popup>
              </Marker>

              {/* Plotted Facilities */}
              {facilities.map((fac) => {
                const color =
                  fac.pendingTonnage >= 4.0
                    ? "#ef4444"
                    : fac.pendingTonnage >= 2.0
                      ? "#f59e0b"
                      : "#10b981";

                return (
                  <Marker
                    key={fac.id}
                    position={[fac.latitude, fac.longitude]}
                    icon={createGlowingMarker(color)}
                  >
                    <Popup>
                      <div className="text-xs text-foreground p-1 flex flex-col gap-1">
                        <strong className="text-sm block">{fac.name}</strong>
                        <span>Region: {fac.region}</span>
                        <span>Avg Bin Fill: {fac.averageFill}%</span>
                        <span>Pending Tonnage: {fac.pendingTonnage} Tons</span>
                        <span
                          className={`font-bold uppercase tracking-wider text-[9px] ${fac.status === "Active" ? "text-emerald-500" : "text-red-500"}`}
                        >
                          Status: {fac.status}
                        </span>
                        <Link
                          to={`/dashboard?facilityId=${fac.id}`}
                          className="text-[11px] text-[#006c49] dark:text-emerald-400 hover:underline font-bold mt-1 block text-center"
                        >
                          Inspect Facility ➔
                        </Link>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}

              {/* Plotted Moving Trucks */}
              {truckPositions.map((truck) => (
                <Marker
                  key={truck.id}
                  position={truck.pos}
                  icon={createTruckMarker()}
                >
                  <Popup>
                    <div className="text-xs text-foreground p-1">
                      <strong className="block font-bold">{truck.name}</strong>
                      <span className="text-muted-foreground block text-[10px]">Tonnage Garbage Transit Route</span>
                    </div>
                  </Popup>
                </Marker>
              ))}

              {/* Transit Route Polylines */}
              {facilities.map((fac) => (
                <Polyline
                  key={`route-${fac.id}`}
                  positions={[ACCRA_DEPOT, [fac.latitude, fac.longitude]]}
                  color="#ffffff"
                  weight={1.5}
                  dashArray="4 8"
                  opacity={0.3}
                />
              ))}
            </MapContainer>
          </div>
        </div>

        {/* Third-Party Collection Dispatch Panel */}
        <div className="bg-card border border-border rounded-xl shadow-sm p-6 flex flex-col gap-5">
          <div>
            <h3 className="font-bold text-sm text-foreground dark:text-white">
              Third-Party Dispatch Controller
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Select an overloaded facility and assign a partner garbage collection agency in Ghana.
            </p>
          </div>

          <form onSubmit={handleDispatchSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Target Waste Facility
              </label>
              <select
                value={selectedFacilityId}
                onChange={(e) => setSelectedFacilityId(e.target.value)}
                className="h-10 px-3 border border-border rounded-lg text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
              >
                <option value="">Select Facility...</option>
                {facilities.map((fac) => (
                  <option key={fac.id} value={fac.id}>
                    {fac.name} ({fac.pendingTonnage} Tons pending)
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Tonnage Volume (Tons)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={tonnageInput}
                  onChange={(e) => setTonnageInput(e.target.value)}
                  className="h-10 px-3 border border-border rounded-lg text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Partner Contractor
                </label>
                <select
                  value={selectedCollectorName}
                  onChange={(e) => setSelectedCollectorName(e.target.value)}
                  className="h-10 px-3 border border-border rounded-lg text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
                >
                  <option value="Zoomlion Ghana Limited">Zoomlion</option>
                  <option value="Coliba Ghana">Coliba Ghana</option>
                  <option value="Jekora Ventures">Jekora Ventures</option>
                  <option value="Safisana Ghana">Safisana</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !selectedFacilityId}
              className="h-10 bg-primary hover:bg-primary/90 text-white font-bold text-sm rounded-lg transition-all shadow-md mt-2 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Processing Dispatch..." : "Assign Dispatch Route"}
            </button>
          </form>

          {/* Comparative Analytics visual chart */}
          <div className="border-t border-border pt-4 flex-1 flex flex-col justify-end">
            <h4 className="font-bold text-xs text-foreground dark:text-white uppercase tracking-wider mb-2">
              Facility comparative capacity
            </h4>
            <div style={{ width: "100%", height: "150px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={9} />
                  <YAxis stroke="#94a3b8" fontSize={9} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "none",
                      borderRadius: "8px",
                      color: "#fff",
                      fontSize: "11px",
                    }}
                  />
                  <Bar dataKey="Pending Tonnage" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Facility Detail Grid and active dispatch routes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Onboarded Facilities Detail Table */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl shadow-sm p-6">
          <div className="mb-4">
            <h3 className="font-bold text-sm text-foreground dark:text-white">
              Onboarded Facilities Health Metrics
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Direct tracking status of connected devices, fill ratios, and active error warnings.
            </p>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Facility Name</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Device Online</TableHead>
                  <TableHead>Avg Fill Level</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Active Alerts</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {facilities.map((fac) => (
                  <TableRow key={fac.id}>
                    <TableCell className="font-bold text-sm text-foreground dark:text-white">
                      {fac.name}
                    </TableCell>
                    <TableCell>{fac.region}</TableCell>
                    <TableCell>
                      <span className="font-semibold">
                        {fac.activeDevices} / {fac.deviceCount}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 min-w-[120px]">
                        <Progress value={fac.averageFill} className="h-2 flex-1" />
                        <span className="text-xs font-mono font-bold text-foreground">
                          {fac.averageFill}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          fac.status === "Active"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400"
                            : "bg-red-100 text-red-800 dark:bg-red-500/10 dark:text-red-400"
                        }`}
                      >
                        {fac.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      {fac.alertCount > 0 ? (
                        <span className="inline-flex items-center gap-1 bg-red-100 text-red-800 dark:bg-red-500/10 dark:text-red-400 px-2 py-0.5 rounded text-[10px] font-bold animate-pulse">
                          ⚠️ {fac.alertCount} Alerts
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">None</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link
                        to={`/dashboard?facilityId=${fac.id}`}
                        className="text-xs bg-[#006c49] text-white px-2.5 py-1 rounded hover:bg-[#006c49]/90 font-medium transition-colors cursor-pointer"
                      >
                        Inspect
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Third-Party Active Routes Table */}
        <div className="bg-card border border-border rounded-xl shadow-sm p-6 flex flex-col">
          <div className="mb-4">
            <h3 className="font-bold text-sm text-foreground dark:text-white">
              Active Dispatch Routes
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Current partner collection routes underway based on tonnage alerts.
            </p>
          </div>

          <div className="flex-1 overflow-y-auto max-h-[300px] flex flex-col gap-3">
            {bulkJobs.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground text-xs font-medium">
                No active routes scheduled
              </div>
            ) : (
              bulkJobs.map((job) => {
                const statusColor =
                  job.status === "Completed"
                    ? "bg-emerald-500/10 text-emerald-500"
                    : job.status === "Dispatched"
                      ? "bg-blue-500/10 text-blue-500"
                      : "bg-amber-500/10 text-amber-500";

                return (
                  <div
                    key={job.id}
                    className="p-4 border border-border rounded-xl flex flex-col gap-2 hover:bg-slate-50 dark:hover:bg-secondary/20 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-muted-foreground">
                        {job.id.substring(0, 8).toUpperCase()}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${statusColor}`}
                      >
                        {job.status}
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <strong className="text-xs text-foreground dark:text-white">
                        {job.facility?.name}
                      </strong>
                      <span className="text-[10px] text-muted-foreground mt-0.5">
                        Contractor: {job.collectorName}
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-t border-border/60 pt-2 mt-1">
                      <span className="text-xs font-bold text-foreground">
                        Tonnage: {job.tonnage} Tons
                      </span>

                      {job.status === "Pending" && (
                        <button
                          onClick={() => handleTransitPickup(job.id)}
                          className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold rounded cursor-pointer transition-colors"
                        >
                          Dispatch Truck
                        </button>
                      )}

                      {job.status === "Dispatched" && (
                        <button
                          onClick={() => handleCompletePickup(job.id)}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold rounded cursor-pointer transition-colors"
                        >
                          Mark Collected
                        </button>
                      )}

                      {job.status === "Completed" && (
                        <span className="text-[9.5px] text-muted-foreground italic">
                          Collected: {job.completedAt ? new Date(job.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Done"}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
