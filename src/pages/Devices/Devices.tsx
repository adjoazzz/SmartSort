import { authFetch } from "../../lib/authFetch";
import React, { useState, useEffect } from "react";
import { PageLayout } from "../../components/PageLayout";
import { StatusBadge } from "../../components/StatusBadge";
import { RegisterDeviceModal } from "../../components/RegisterDeviceModal";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../../components/ui/table";
import { Progress } from "../../components/ui/progress";
import { usePollingFetch } from "../../hooks/usePollingFetch";

// Mock EVENT_LOGS removed in favor of live data.

// Skeleton row for main table
function TableRowSkeleton() {
  return (
    <TableRow className="animate-pulse">
      <TableCell className="px-6 py-5 whitespace-nowrap">
        <div className="flex flex-col gap-2">
          <div className="h-4 w-28 bg-slate-200 dark:bg-[#1a365d] rounded"></div>
          <div className="h-3 w-20 bg-slate-100 dark:bg-[#0f2942] rounded"></div>
        </div>
      </TableCell>
      <TableCell className="px-6 py-5 whitespace-nowrap">
        <div className="h-4 w-32 bg-slate-100 dark:bg-[#0f2942] rounded"></div>
      </TableCell>
      <TableCell className="px-6 py-5 whitespace-nowrap">
        <div className="h-5 w-16 bg-slate-200 dark:bg-[#1a365d] rounded-full"></div>
      </TableCell>
      <TableCell className="px-6 py-5 whitespace-nowrap">
        <div className="flex items-center gap-3 w-24">
          <div className="h-2 w-16 bg-slate-100 dark:bg-[#0f2942] rounded-full flex-1"></div>
          <div className="h-4 w-8 bg-slate-200 dark:bg-[#1a365d] rounded"></div>
        </div>
      </TableCell>
      <TableCell className="px-6 py-5 whitespace-nowrap">
        <div className="h-4 w-24 bg-slate-100 dark:bg-[#0f2942] rounded"></div>
      </TableCell>
      <TableCell className="px-6 py-5 whitespace-nowrap">
        <div className="h-4 w-10 bg-slate-100 dark:bg-[#0f2942] rounded"></div>
      </TableCell>
    </TableRow>
  );
}

// Skeleton details panel
function SidebarDetailsSkeleton() {
  return (
    <div className="bg-white dark:bg-[#0b1c30] border border-[#e2e8f0] dark:border-[#1e3a5f] rounded-xl shadow-sm p-6 animate-pulse w-full">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="h-6 w-32 bg-slate-200 dark:bg-[#1a365d] rounded-md mb-2"></div>
          <div className="h-4 w-24 bg-slate-100 dark:bg-[#0f2942] rounded-md"></div>
        </div>
        <div className="h-4 w-12 bg-slate-200 dark:bg-[#1a365d] rounded-md"></div>
      </div>

      <div className="flex justify-between gap-3 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col items-center flex-1">
            <div className="w-full h-32 bg-slate-50 dark:bg-[#0f2942]/30 rounded-t-md relative flex flex-col justify-end border-b-2 border-slate-200 dark:border-slate-800">
              <div className="absolute inset-x-0 bottom-0 bg-slate-200 dark:bg-[#1a365d] h-[40%]" />
            </div>
            <div className="h-3 w-12 bg-slate-200 dark:bg-[#1a365d] rounded mt-3"></div>
          </div>
        ))}
      </div>

      <div className="flex justify-between border-t border-[#f1f5f9] dark:border-[#0f2942] pt-5">
        <div>
          <div className="h-3 w-16 bg-slate-100 dark:bg-[#0f2942] rounded mb-1.5"></div>
          <div className="h-5 w-12 bg-slate-200 dark:bg-[#1a365d] rounded"></div>
        </div>
        <div className="text-right flex flex-col items-end">
          <div className="h-3 w-16 bg-slate-100 dark:bg-[#0f2942] rounded mb-1.5"></div>
          <div className="h-5 w-20 bg-slate-200 dark:bg-[#1a365d] rounded"></div>
        </div>
      </div>
    </div>
  );
}

// Skeleton event log
function EventLogSkeleton() {
  return (
    <div className="bg-white dark:bg-[#0b1c30] border border-[#e2e8f0] dark:border-[#1e3a5f] rounded-xl shadow-sm flex flex-col h-[320px] animate-pulse w-full">
      <div className="p-4 border-b border-[#f1f5f9] dark:border-[#0f2942] flex justify-between items-center">
        <div className="h-4 w-28 bg-slate-200 dark:bg-[#1a365d] rounded"></div>
        <div className="h-4 w-4 bg-slate-200 dark:bg-[#1a365d] rounded-full"></div>
      </div>

      <div className="p-4 flex-1 flex flex-col gap-4 overflow-hidden">
        {[1, 2].map((i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="flex justify-between">
              <div className="h-3 w-20 bg-slate-200 dark:bg-[#1a365d] rounded"></div>
              <div className="h-3 w-12 bg-slate-100 dark:bg-[#0f2942] rounded"></div>
            </div>
            <div className="h-4 w-full bg-slate-100 dark:bg-[#0f2942] rounded"></div>
            <div className="h-4.5 w-2/3 bg-slate-100 dark:bg-[#0f2942] rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Devices() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDevice, setSelectedDevice] = useState("982-AX-01");
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [page, setPage] = useState(1);
  const [showSortingEvents, setShowSortingEvents] = useState(false);
  const limit = 10;
  
  const baseUrl =
    (import.meta as any).env?.VITE_API_BASE_URL ?? "http://localhost:5000";

  const fetchDevices = async () => {
    const response = await authFetch(`${baseUrl}/api/devices?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error("Failed to fetch device data");
    }
    return response.json();
  };

  const { data: devicesResponse, isLoading } = usePollingFetch<any>(
    fetchDevices,
    {
      intervalMs: 5000,
    },
  );

  const fetchDeviceEvents = async () => {
    if (!selectedDevice) return [];
    const response = await authFetch(`${baseUrl}/api/devices/${selectedDevice}/events`);
    if (!response.ok) {
      throw new Error("Failed to fetch device events");
    }
    return response.json();
  };

  const { data: eventsData, isLoading: eventsLoading } = usePollingFetch<any[]>(
    fetchDeviceEvents,
    {
      intervalMs: 5000,
    },
  );

  const devices = devicesResponse?.data ?? [];
  const totalCount = devicesResponse?.totalCount || 0;
  const totalPages = devicesResponse?.totalPages || 1;

  useEffect(() => {
    if (devices.length > 0) {
      // Auto-select the first device in the fetched list
      setSelectedDevice(devices[0].customBinId);
    }
  }, [devices]);

  const normalizedDevices = devices.map((d: any) => ({
    id: d.customBinId,
    name: d.customBinId,
    location: d.location,
    status: d.status ?? "Online",
    fill: d.fillLevel ?? 0,
    lastActive: d.updatedAt ? new Date(d.updatedAt).toLocaleString() : "—",
    firmware: "v2.4.1",
  }));

  const filteredData = normalizedDevices.filter(
    (device) =>
      device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Retrieve current active device selection
  const currentDevice =
    filteredData.find((d) => d.id === selectedDevice) || filteredData[0];

  // Dynamic calculated compartments and telemetry
  const recyclingFill = currentDevice ? currentDevice.fill : 0;
  const organicsFill = currentDevice
    ? Math.min(100, Math.round(currentDevice.fill * 0.6))
    : 0;
  const generalFill = currentDevice
    ? Math.min(100, Math.round(currentDevice.fill * 0.3))
    : 0;
  const currentTemp = currentDevice
    ? (((currentDevice.fill * 3) % 7) + 18.2).toFixed(1)
    : "22.4";
  const currentUptimeDays = currentDevice
    ? ((currentDevice.fill * 7) % 15) + 3
    : 14;
  const currentUptime = `${currentUptimeDays}d 6h 12m`;

  const displayedEvents = (eventsData || []).filter((event: any) => showSortingEvents || !event.isSortingEvent);

  return (
    <PageLayout
      title="Device Fleet"
      description={`Managing ${totalCount} active hardware units across facilities.`}
      actions={
        <div className="flex gap-3">
          <button className="bg-white dark:bg-[#0b1c30] border border-[#e2e8f0] dark:border-[#1e3a5f] text-[#515f74] dark:text-[#cbd5e1] text-sm font-semibold rounded-lg px-4 py-2 hover:bg-[#f8fafc] dark:hover:bg-[#0f2942] transition-colors shadow-sm flex items-center gap-2 cursor-pointer">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
            Filters
          </button>
          <button
            onClick={() => setShowRegisterModal(true)}
            className="bg-[#006c49] text-white text-sm font-semibold rounded-lg px-4 py-2 hover:bg-[#005a3c] transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Register Device
          </button>
        </div>
      }
    >
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className="flex-1 w-full bg-white dark:bg-[#0b1c30] border border-[#e2e8f0] dark:border-[#1e3a5f] rounded-xl shadow-sm flex flex-col overflow-hidden">
          {/* Local Table Search Bar */}
          <div className="p-4 border-b border-[#f1f5f9] dark:border-[#0f2942] bg-white dark:bg-[#0b1c30] flex items-center">
            <div className="flex items-center w-full max-w-md bg-[#f8fafc] dark:bg-[#0f2942] rounded-lg border border-[#e2e8f0] dark:border-[#1e3a5f] focus-within:border-[#cbd5e1] dark:focus-within:border-[#334155] focus-within:bg-white dark:bg-[#0b1c30] focus-within:shadow-sm transition-all overflow-hidden px-4 py-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#94A3B8"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-3"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                placeholder="Search devices, locations, or serials..."
                className="bg-transparent border-none outline-none text-sm font-medium text-[#0b1c30] dark:text-white placeholder-[#94a3b8] w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Data Table */}
          <Table className="min-w-[700px]">
            <TableHeader>
              <TableRow className="bg-[#f8fafc] dark:bg-[#0f2942] border-b border-[#e2e8f0] dark:border-[#1e3a5f] hover:bg-[#f8fafc] dark:hover:bg-[#0f2942]">
                <TableHead className="px-6 py-4 text-xs font-semibold text-[#64748b] dark:text-[#94a3b8] uppercase tracking-wider">
                  Unit Name
                </TableHead>
                <TableHead className="px-6 py-4 text-xs font-semibold text-[#64748b] dark:text-[#94a3b8] uppercase tracking-wider">
                  Location
                </TableHead>
                <TableHead className="px-6 py-4 text-xs font-semibold text-[#64748b] dark:text-[#94a3b8] uppercase tracking-wider">
                  Status
                </TableHead>
                <TableHead className="px-6 py-4 text-xs font-semibold text-[#64748b] dark:text-[#94a3b8] uppercase tracking-wider">
                  Fill %
                </TableHead>
                <TableHead className="px-6 py-4 text-xs font-semibold text-[#64748b] dark:text-[#94a3b8] uppercase tracking-wider">
                  Last Active
                </TableHead>
                <TableHead className="px-6 py-4 text-xs font-semibold text-[#64748b] dark:text-[#94a3b8] uppercase tracking-wider">
                  Firmware
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-[#f1f5f9]">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, idx) => (
                  <TableRowSkeleton key={idx} />
                ))
              ) : filteredData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="px-6 py-12 text-center text-[#94a3b8] dark:text-[#64748b] text-sm"
                  >
                    No devices found matching "{searchTerm}"
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((device, idx) => (
                  <TableRow
                    key={device.id}
                    onClick={() => setSelectedDevice(device.id)}
                    className={`hover:bg-[#f8fafc] dark:hover:bg-[#0f2942] transition-colors group cursor-pointer relative border-b border-[#f1f5f9] ${selectedDevice === device.id ? "bg-[#f8fafc] dark:bg-[#0f2942]" : ""}`}
                  >
                    <TableCell className="px-6 py-4 whitespace-nowrap relative">
                      {selectedDevice === device.id && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#10b981]"></div>
                      )}
                      <div className="flex flex-col">
                        <span
                          className={`text-sm font-medium ${selectedDevice === device.id ? "text-[#065f46] dark:text-[#6ffbbe]" : "text-[#0b1c30] dark:text-white group-hover:text-[#006c49] dark:group-hover:text-[#6ffbbe]"}`}
                        >
                          {device.name}
                        </span>
                        <span className="text-[10px] text-[#94a3b8] dark:text-[#64748b] font-mono mt-0.5">
                          ID: {device.id}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-[#515f74] dark:text-[#cbd5e1]">
                      {device.location}
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge
                        label={
                          device.status === "Critical"
                            ? "Critical"
                            : device.status
                        }
                        variant={
                          device.status === "Online" ||
                          device.status === "Active"
                            ? "success"
                            : device.status === "Offline"
                              ? "neutral"
                              : device.status === "Critical"
                                ? "danger"
                                : "warning"
                        }
                        hasDot
                      />
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3 w-24">
                        <Progress
                          value={device.fill}
                          className={`h-1.5 bg-[#f1f5f9] dark:bg-[#1a365d] ${
                            device.fill > 85
                              ? "[&>[data-slot=progress-indicator]]:bg-[#ba1a1a]"
                              : "[&>[data-slot=progress-indicator]]:bg-[#10b981]"
                          }`}
                        />
                        <span
                          className={`text-sm font-medium ${device.fill > 85 ? "text-[#ba1a1a]" : "text-[#0b1c30] dark:text-white"} w-8`}
                        >
                          {device.fill}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-[#515f74] dark:text-[#cbd5e1]">
                      {device.lastActive}
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap text-xs text-[#94a3b8] dark:text-[#64748b]">
                      {device.firmware}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {/* Pagination Footer */}
          <div className="p-4 border-t border-[#f1f5f9] dark:border-[#0f2942] bg-white dark:bg-[#0b1c30] flex items-center justify-between mt-auto">
            <span className="text-sm text-[#515f74] dark:text-[#cbd5e1]">
              Showing {devices.length > 0 ? (page - 1) * limit + 1 : 0}-{Math.min(page * limit, totalCount)} of {totalCount} devices
            </span>
            <div className="flex gap-1">
              <button 
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#e2e8f0] dark:border-[#1e3a5f] text-[#94a3b8] hover:bg-[#f8fafc] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              
              <button 
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages || totalPages === 0}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#e2e8f0] dark:border-[#1e3a5f] text-[#515f74] dark:text-[#cbd5e1] hover:bg-[#f8fafc] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side Panel */}
        <div className="w-full lg:w-[340px] flex flex-col gap-6 shrink-0">
          {isLoading ? (
            <>
              <SidebarDetailsSkeleton />
              <EventLogSkeleton />
            </>
          ) : (
            <>
              {/* Live Status Card */}
              <div className="bg-white dark:bg-[#0b1c30] border border-[#e2e8f0] dark:border-[#1e3a5f] rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-[#0b1c30] dark:text-white">
                      {currentDevice?.name || "No Device Selected"}
                    </h3>
                    <p className="text-sm text-[#515f74] dark:text-[#cbd5e1] mt-1">
                      Live Status &amp; Levels
                    </p>
                  </div>
                  <button className="text-xs font-bold text-[#10b981] uppercase tracking-wider hover:text-[#006c49] transition-colors cursor-pointer">
                    Edit Specs
                  </button>
                </div>

                <div className="flex justify-between gap-3 mb-8">
                  {/* Recycling Bar */}
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-full h-32 bg-[#f8fafc] dark:bg-[#0f2942] rounded-t-md overflow-hidden relative flex flex-col justify-end border-b-2 border-[#89ceff]">
                      <div
                        className="w-full bg-[#89ceff] flex items-center justify-center absolute bottom-0 left-0 right-0 transition-all duration-500"
                        style={{ height: `${recyclingFill}%` }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <span className="text-lg font-bold text-[#0b1c30] dark:text-white">
                          {recyclingFill}%
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 text-[10px] font-semibold text-[#64748b] dark:text-[#cbd5e1] tracking-wider uppercase text-center">
                      Recycling
                    </div>
                  </div>

                  {/* Organics Bar */}
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-full h-32 bg-[#f8fafc] dark:bg-[#0f2942] rounded-t-md overflow-hidden relative flex flex-col justify-end border-b-2 border-[#6ffbbe]">
                      <div
                        className="w-full bg-[#6ffbbe] flex items-center justify-center absolute bottom-0 left-0 right-0 transition-all duration-500"
                        style={{ height: `${organicsFill}%` }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <span className="text-lg font-bold text-[#0b1c30] dark:text-white">
                          {organicsFill}%
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 text-[10px] font-semibold text-[#64748b] dark:text-[#cbd5e1] tracking-wider uppercase text-center">
                      Organics
                    </div>
                  </div>

                  {/* General Bar */}
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-full h-32 bg-[#f8fafc] dark:bg-[#0f2942] rounded-t-md overflow-hidden relative flex flex-col justify-end border-b-2 border-[#cbd5e1] dark:border-[#334155]">
                      <div
                        className="w-full bg-[#cbd5e1] flex items-center justify-center absolute bottom-0 left-0 right-0 transition-all duration-500"
                        style={{ height: `${generalFill}%` }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <span className="text-lg font-bold text-[#0b1c30] dark:text-white">
                          {generalFill}%
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 text-[10px] font-semibold text-[#64748b] dark:text-[#cbd5e1] tracking-wider uppercase text-center">
                      General
                    </div>
                  </div>
                </div>

                <div className="flex justify-between border-t border-[#f1f5f9] dark:border-[#0f2942] pt-5">
                  <div>
                    <p className="text-[10px] font-semibold text-[#94a3b8] dark:text-[#cbd5e1] tracking-wider uppercase">
                      Internal Temp
                    </p>
                    <p className="text-base font-bold text-[#0b1c30] dark:text-white mt-1">
                      {currentTemp}°C
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-semibold text-[#94a3b8] dark:text-[#cbd5e1] tracking-wider uppercase">
                      Uptime
                    </p>
                    <p className="text-base font-bold text-[#0b1c30] dark:text-white mt-1">
                      {currentUptime}
                    </p>
                  </div>
                </div>
              </div>

              {/* Event Log Card */}
              <div className="bg-white dark:bg-[#0b1c30] border border-[#e2e8f0] dark:border-[#1e3a5f] rounded-xl shadow-sm flex flex-col h-full max-h-[500px]">
                <div className="p-4 border-b border-[#f1f5f9] dark:border-[#0f2942] flex justify-between items-center bg-white dark:bg-[#0b1c30] rounded-t-xl sticky top-0">
                  <h3 className="text-xs font-bold text-[#0b1c30] dark:text-white tracking-wider uppercase">
                    Device Event Log
                  </h3>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <div className="relative">
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={showSortingEvents}
                          onChange={(e) => setShowSortingEvents(e.target.checked)}
                        />
                        <div className={`block w-8 h-5 rounded-full transition-colors ${showSortingEvents ? 'bg-[#10b981]' : 'bg-[#e2e8f0] dark:bg-[#334155]'}`}></div>
                        <div className={`dot absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-transform ${showSortingEvents ? 'transform translate-x-3' : ''}`}></div>
                      </div>
                      <span className="text-[10px] font-bold text-[#64748b] dark:text-[#94a3b8] uppercase tracking-wider">
                        Show Sorting
                      </span>
                    </label>
                    <button className="text-[#94a3b8] dark:text-[#64748b] hover:text-[#0b1c30] dark:text-white transition-colors cursor-pointer">
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
                        <path d="M21 2v6h-6"></path>
                        <path d="M3 12a9 9 0 1 0 2.13-5.88L21 8"></path>
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="overflow-y-auto flex-1 p-2">
                  {eventsLoading ? (
                    <div className="p-4 text-center text-sm text-[#94a3b8] dark:text-[#64748b]">Loading events...</div>
                  ) : displayedEvents.length === 0 ? (
                    <div className="p-4 text-center text-sm text-[#94a3b8] dark:text-[#64748b]">No events recorded.</div>
                  ) : (
                    <ul className="divide-y divide-[#f1f5f9]">
                      {displayedEvents.map((log: any) => (
                        <li
                          key={log.id}
                          className="p-3 hover:bg-[#f8fafc] dark:hover:bg-[#0f2942] rounded-lg transition-colors cursor-default"
                        >
                          <div className="flex justify-between items-start mb-1.5">
                            <span
                              className={`text-[10px] font-bold tracking-wider uppercase ${log.color}`}
                            >
                              {log.type}
                            </span>
                            <span className="text-[10px] text-[#94a3b8] dark:text-[#cbd5e1]">
                              {log.time}
                            </span>
                          </div>
                          <p className="text-sm text-[#515f74] dark:text-[#cbd5e1] leading-relaxed">
                            {log.desc}
                          </p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <RegisterDeviceModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
      />
    </PageLayout>
  );
}
