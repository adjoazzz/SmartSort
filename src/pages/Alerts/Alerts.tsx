import React, { useState, useEffect } from "react";
import { PageLayout } from "../../components/PageLayout";
import { StatusBadge } from "../../components/StatusBadge";
import { BarChart, Bar, ResponsiveContainer, XAxis, Cell } from "recharts";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../../components/ui/table";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const ALERTS_DATA = [
  {
    id: "ALT-1",
    deviceIcon: "conveyor",
    deviceName: "Conveyor-B42",
    deviceLocation: "Floor 2 North",
    severity: "CRITICAL",
    messageTitle: "Contamination Spike Detected",
    messageDesc:
      "Non-recyclable high-density plastic in paper stream exceeds 15% threshold.",
    timestampMain: "Today, 14:22:05",
    timestampSub: "3 mins ago",
    actions: [
      { label: "Mark as Read", type: "secondary" },
      { label: "Dispatch Tech", type: "primary" },
    ],
  },
  {
    id: "ALT-2",
    deviceIcon: "bin",
    deviceName: "SmartBin-009",
    deviceLocation: "Loading Dock A",
    severity: "WARNING",
    messageTitle: "Fill Capacity Exceeded",
    messageDesc: "Device reported 98% capacity. Pick-up scheduled for 18:00.",
    timestampMain: "Today, 13:45:12",
    timestampSub: "40 mins ago",
    actions: [
      { label: "Mark as Read", type: "secondary" },
      { label: "Acknowledge", type: "secondary" },
    ],
  },
  {
    id: "ALT-3",
    deviceIcon: "sensor",
    deviceName: "Sensor-T10",
    deviceLocation: "Outdoor Staging",
    severity: "WARNING",
    messageTitle: "Battery Level Critical",
    messageDesc: "Sensor battery at 4%. Shutdown imminent within 2 hours.",
    timestampMain: "Today, 12:10:00",
    timestampSub: "2 hours ago",
    actions: [
      { label: "Mark as Read", type: "secondary" },
      { label: "Dispatch Tech", type: "primary" },
    ],
  },
  {
    id: "ALT-4",
    deviceIcon: "compactor",
    deviceName: "Compactor-02",
    deviceLocation: "Main Processing Room",
    severity: "CRITICAL",
    messageTitle: "Emergency Stop Engaged",
    messageDesc:
      "Manual emergency stop triggered. System lockout active. Investigation required.",
    timestampMain: "Today, 11:55:30",
    timestampSub: "2.5 hours ago",
    actions: [
      { label: "Mark as Read", type: "secondary" },
      { label: "Dispatch Tech", type: "primary" },
    ],
  },
];

const TRENDS_DATA = [
  { name: "MON", value: 25 },
  { name: "TUE", value: 40 },
  { name: "WED", value: 90, active: true },
  { name: "THU", value: 55 },
  { name: "FRI", value: 35 },
  { name: "SAT", value: 45 },
  { name: "SUN", value: 60 },
];

function DeviceIcon({ type }: { type: string }) {
  if (type === "conveyor") {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#515f74"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="10" width="20" height="4" rx="2" />
        <circle cx="6" cy="18" r="2" />
        <circle cx="18" cy="18" r="2" />
      </svg>
    );
  }
  if (type === "bin") {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#515f74"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 6h18" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </svg>
    );
  }
  if (type === "sensor") {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#515f74"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
    );
  }
  if (type === "compactor") {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#515f74"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
        <line x1="12" y1="2" x2="12" y2="12" />
      </svg>
    );
  }
  return null;
}

export default function Alerts() {
  const [severity, setSeverity] = useState("all");
  const [deviceType, setDeviceType] = useState("all");
  const [timeRange, setTimeRange] = useState("24h");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 750); // Simulate API loading delay
    return () => clearTimeout(timer);
  }, []);

  const handleClearFilters = () => {
    setSeverity("all");
    setDeviceType("all");
    setTimeRange("24h");
  };

  const filteredAlerts = ALERTS_DATA.filter((alert) => {
    if (severity !== "all" && alert.severity.toLowerCase() !== severity) return false;
    if (deviceType === "conveyors" && alert.deviceIcon !== "conveyor") return false;
    if (deviceType === "smartbins" && alert.deviceIcon !== "bin") return false;
    if (timeRange === "24h" && !alert.timestampMain.includes("Today")) return false;
    return true;
  });

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("System Alerts Report", 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 30);

    const tableData = filteredAlerts.map(alert => [
      alert.deviceName,
      alert.deviceLocation,
      alert.severity,
      alert.messageTitle,
      alert.timestampMain
    ]);

    autoTable(doc, {
      startY: 40,
      head: [['Device Name', 'Location', 'Severity', 'Message Title', 'Timestamp']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [0, 108, 73] }
    });

    doc.save("smartsort-alerts-report.pdf");
  };

  return (
    <PageLayout
      title="System Alerts"
      description="Real-time notification center for facility sensor network."
      actions={
        isLoading ? (
          <div className="flex bg-white dark:bg-[#0b1c30] border border-[#e2e8f0] dark:border-[#1e3a5f] rounded-xl shadow-sm divide-x divide-[#f1f5f9] overflow-hidden animate-pulse">
            <div className="px-6 py-3 flex flex-col items-center justify-center">
              <div className="h-3 w-14 bg-slate-200 dark:bg-[#1a365d] rounded mb-1"></div>
              <div className="h-7 w-8 bg-slate-200 dark:bg-[#1a365d] rounded"></div>
            </div>
            <div className="px-6 py-3 flex flex-col items-center justify-center">
              <div className="h-3 w-14 bg-slate-200 dark:bg-[#1a365d] rounded mb-1"></div>
              <div className="h-7 w-8 bg-slate-200 dark:bg-[#1a365d] rounded"></div>
            </div>
          </div>
        ) : (
          <div className="flex bg-white dark:bg-[#0b1c30] border border-[#e2e8f0] dark:border-[#1e3a5f] rounded-xl shadow-sm divide-x divide-[#f1f5f9] overflow-hidden">
            <div className="px-6 py-3 flex flex-col items-center justify-center">
              <span className="text-[10px] font-bold text-[#64748b] dark:text-[#94a3b8] tracking-wider uppercase mb-1">
                CRITICAL
              </span>
              <span className="text-[28px] leading-none font-bold text-[#ba1a1a]">
                03
              </span>
            </div>
            <div className="px-6 py-3 flex flex-col items-center justify-center">
              <span className="text-[10px] font-bold text-[#64748b] dark:text-[#94a3b8] tracking-wider uppercase mb-1">
                WARNINGS
              </span>
              <span className="text-[28px] leading-none font-bold text-[#0284c7]">
                12
              </span>
            </div>
          </div>
        )
      }
    >
      <div className="flex flex-col gap-6">
        {/* Filters Row */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-[#94a3b8] dark:text-[#64748b] uppercase mb-1.5 ml-1">
                SEVERITY
              </label>
              <div className="relative">
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                  className="appearance-none bg-white dark:bg-[#0b1c30] border border-[#e2e8f0] dark:border-[#1e3a5f] text-[#0b1c30] dark:text-white text-sm font-semibold rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:border-[#cbd5e1] hover:bg-[#f8fafc] cursor-pointer min-w-[160px]"
                >
                  <option value="all">All Severities</option>
                  <option value="critical">Critical</option>
                  <option value="warning">Warning</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="2"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-[#94a3b8] dark:text-[#64748b] uppercase mb-1.5 ml-1">
                DEVICE TYPE
              </label>
              <div className="relative">
                <select
                  value={deviceType}
                  onChange={(e) => setDeviceType(e.target.value)}
                  className="appearance-none bg-white dark:bg-[#0b1c30] border border-[#e2e8f0] dark:border-[#1e3a5f] text-[#0b1c30] dark:text-white text-sm font-semibold rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:border-[#cbd5e1] hover:bg-[#f8fafc] cursor-pointer min-w-[160px]"
                >
                  <option value="all">All Devices</option>
                  <option value="conveyors">Conveyors</option>
                  <option value="smartbins">SmartBins</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="2"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-[#94a3b8] dark:text-[#64748b] uppercase mb-1.5 ml-1">
                TIME RANGE
              </label>
              <div className="relative">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="appearance-none bg-white dark:bg-[#0b1c30] border border-[#e2e8f0] dark:border-[#1e3a5f] text-[#0b1c30] dark:text-white text-sm font-semibold rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:border-[#cbd5e1] hover:bg-[#f8fafc] cursor-pointer min-w-[160px]"
                >
                  <option value="24h">Last 24 Hours</option>
                  <option value="7d">Last 7 Days</option>
                  <option value="30d">Last 30 Days</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="2"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 h-[42px]">
            <button
              onClick={handleClearFilters}
              className="h-full bg-white dark:bg-[#0b1c30] border border-[#e2e8f0] dark:border-[#1e3a5f] text-[#515f74] dark:text-[#cbd5e1] text-sm font-semibold rounded-lg px-4 hover:bg-[#f8fafc] transition-colors flex items-center gap-2 cursor-pointer"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="13" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="8" y1="18" x2="8.01" y2="18"></line>
              </svg>
              Clear Filters
            </button>
            <button 
              onClick={handleExportPDF}
              className="h-full bg-[#006c49] text-white text-sm font-semibold rounded-lg px-4 hover:bg-[#005a3c] transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Export Logs
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white dark:bg-[#0b1c30] border border-[#e2e8f0] dark:border-[#1e3a5f] rounded-xl shadow-sm overflow-hidden flex flex-col">
          <Table className="min-w-[900px]">
            <TableHeader>
              <TableRow className="border-b border-[#e2e8f0] dark:border-[#1e3a5f] hover:bg-[#f8fafc] dark:hover:bg-[#0f2942]">
                <TableHead className="px-6 py-4 text-[11px] font-bold text-[#64748b] dark:text-[#94a3b8] tracking-wider">
                  DEVICE
                </TableHead>
                <TableHead className="px-6 py-4 text-[11px] font-bold text-[#64748b] dark:text-[#94a3b8] tracking-wider">
                  SEVERITY
                </TableHead>
                <TableHead className="px-6 py-4 text-[11px] font-bold text-[#64748b] dark:text-[#94a3b8] tracking-wider w-[40%]">
                  MESSAGE
                </TableHead>
                <TableHead className="px-6 py-4 text-[11px] font-bold text-[#64748b] dark:text-[#94a3b8] tracking-wider">
                  TIMESTAMP
                </TableHead>
                <TableHead className="px-6 py-4 text-[11px] font-bold text-[#64748b] dark:text-[#94a3b8] tracking-wider">
                  ACTIONS
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-[#f1f5f9]">
              {isLoading ? (
                Array.from({ length: 4 }).map((_, idx) => (
                  <TableRow key={idx} className="animate-pulse">
                    {/* Device Column */}
                    <TableCell className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-200 dark:bg-[#1a365d]" />
                        <div className="flex flex-col gap-2">
                          <div className="h-4 w-28 bg-slate-200 dark:bg-[#1a365d] rounded"></div>
                          <div className="h-3 w-20 bg-slate-100 dark:bg-[#0f2942] rounded"></div>
                        </div>
                      </div>
                    </TableCell>
                    {/* Severity Column */}
                    <TableCell className="px-6 py-5 whitespace-nowrap">
                      <div className="h-5 w-16 bg-slate-200 dark:bg-[#1a365d] rounded-full"></div>
                    </TableCell>
                    {/* Message Column */}
                    <TableCell className="px-6 py-5">
                      <div className="h-4 w-40 bg-slate-200 dark:bg-[#1a365d] rounded mb-2"></div>
                      <div className="h-3.5 w-full bg-slate-100 dark:bg-[#0f2942] rounded mb-1.5"></div>
                      <div className="h-3.5 w-2/3 bg-slate-100 dark:bg-[#0f2942] rounded"></div>
                    </TableCell>
                    {/* Timestamp Column */}
                    <TableCell className="px-6 py-5 whitespace-nowrap">
                      <div className="h-4 w-24 bg-slate-200 dark:bg-[#1a365d] rounded mb-2"></div>
                      <div className="h-3 w-16 bg-slate-100 dark:bg-[#0f2942] rounded"></div>
                    </TableCell>
                    {/* Actions Column */}
                    <TableCell className="px-6 py-5 whitespace-nowrap">
                      <div className="flex gap-2">
                        <div className="h-8 w-24 bg-slate-200 dark:bg-[#1a365d] rounded-lg"></div>
                        <div className="h-8 w-24 bg-slate-200 dark:bg-[#1a365d] rounded-lg"></div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : filteredAlerts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-[#64748b] dark:text-[#94a3b8]">
                    No alerts match the selected filters.
                  </TableCell>
                </TableRow>
              ) : (
                filteredAlerts.map((alert) => (
                  <TableRow
                    key={alert.id}
                    className="hover:bg-[#f8fafc] dark:hover:bg-[#0f2942] transition-colors border-b border-[#f1f5f9]"
                  >
                    <TableCell className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#f1f5f9] dark:bg-[#1a365d] flex items-center justify-center">
                          <DeviceIcon type={alert.deviceIcon} />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-[#0b1c30] dark:text-white">
                            {alert.deviceName}
                          </div>
                          <div className="text-[12px] text-[#64748b] dark:text-[#94a3b8] mt-0.5">
                            {alert.deviceLocation}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-5 whitespace-nowrap">
                      <StatusBadge
                        label={alert.severity}
                        variant={
                          alert.severity === "CRITICAL" ? "danger" : "info"
                        }
                        hasDot
                      />
                    </TableCell>
                    <TableCell className="px-6 py-5">
                      <div className="text-sm font-bold text-[#0b1c30] dark:text-white">
                        {alert.messageTitle}
                      </div>
                      <div className="text-[13px] text-[#515f74] dark:text-[#cbd5e1] mt-0.5 leading-relaxed pr-4">
                        {alert.messageDesc}
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-5 whitespace-nowrap">
                      <div className="text-sm font-bold text-[#0b1c30] dark:text-white">
                        {alert.timestampMain}
                      </div>
                      <div className="text-[12px] text-[#64748b] dark:text-[#94a3b8] mt-0.5">
                        {alert.timestampSub}
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-5 whitespace-nowrap">
                      <div className="flex gap-2">
                        {alert.actions.map((action, i) => (
                          <button
                            key={i}
                            className={`text-[13px] font-semibold rounded-lg px-3 py-1.5 transition-colors cursor-pointer ${
                              action.type === "primary"
                                ? "bg-[#006c49] text-white hover:bg-[#005a3c]"
                                : "bg-white dark:bg-[#0b1c30] border border-[#cbd5e1] dark:border-[#334155] text-[#515f74] dark:text-[#cbd5e1] hover:bg-[#f1f5f9]"
                            }`}
                          >
                            {action.label}
                          </button>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          <div className="border-t border-[#e2e8f0] dark:border-[#1e3a5f] px-6 py-3 flex items-center justify-between bg-white dark:bg-[#0b1c30]">
            <span className="text-sm text-[#515f74] dark:text-[#cbd5e1]">
              Showing 1-4 of 15 active alerts
            </span>
            <div className="flex gap-1">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#e2e8f0] dark:border-[#1e3a5f] text-[#94a3b8] hover:bg-[#f8fafc] cursor-pointer">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#e2e8f0] dark:border-[#1e3a5f] text-[#515f74] dark:text-[#cbd5e1] hover:bg-[#f8fafc] cursor-pointer">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Severity Trends */}
          <div className="col-span-1 lg:col-span-2 bg-white dark:bg-[#0b1c30] border border-[#e2e8f0] dark:border-[#1e3a5f] rounded-xl p-6 shadow-sm flex flex-col h-[320px]">
            <div className="flex justify-between items-start mb-8">
              <h2 className="text-lg font-bold text-[#0b1c30] dark:text-white">
                Severity Trends
              </h2>
              <span className="text-sm font-bold text-[#006c49]">
                Live Updates
              </span>
            </div>
            {isLoading ? (
              <div className="flex-1 w-full bg-slate-50/50 dark:bg-[#0f2942]/10 rounded-lg flex items-center justify-center animate-pulse border border-dashed border-slate-200 dark:border-slate-800">
                <div className="flex flex-col items-center gap-2">
                  <div className="h-10 w-48 bg-slate-200 dark:bg-[#1a365d] rounded"></div>
                  <div className="h-4 w-32 bg-slate-100 dark:bg-[#0f2942] rounded"></div>
                </div>
              </div>
            ) : (
              <div className="flex-1 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={TRENDS_DATA} barSize={40}>
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 700 }}
                      dy={10}
                    />
                    <Bar dataKey="value" radius={[2, 2, 0, 0]}>
                      {TRENDS_DATA.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.active ? "#10b981" : "#e0e7ff"}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Maintenance AI */}
          {isLoading ? (
            <div className="col-span-1 bg-[#0b1c30] rounded-xl p-6 shadow-sm flex flex-col justify-between animate-pulse min-h-[200px]">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-slate-700 rounded-full"></div>
                  <div className="h-3 w-28 bg-slate-700 rounded"></div>
                </div>
                <div className="h-4 w-full bg-slate-800 rounded"></div>
                <div className="h-4 w-5/6 bg-slate-800 rounded"></div>
                <div className="h-4 w-2/3 bg-slate-800 rounded"></div>
              </div>
              <div className="h-11 w-full bg-slate-700 rounded-lg mt-6"></div>
            </div>
          ) : (
            <div className="col-span-1 bg-[#0b1c30] rounded-xl p-6 shadow-sm flex flex-col justify-between text-white relative overflow-hidden">
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-2 mb-4 text-[#10b981]">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
                  </svg>
                  <span className="text-[11px] font-bold tracking-wider uppercase">
                    MAINTENANCE AI
                  </span>
                </div>
                <p className="text-[15px] leading-relaxed text-white/90 font-medium mb-8">
                  Based on recent contamination patterns,{" "}
                  <strong className="text-white font-bold">Conveyor-B42</strong>{" "}
                  is predicted to require sensor calibration in the next 48 hours
                  to prevent further critical alerts.
                </p>
                <div className="mt-auto">
                  <button className="w-full bg-[#10b981] hover:bg-[#059669] text-[#0b1c30] dark:text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-sm text-sm cursor-pointer">
                    Schedule Preventive Check
                  </button>
                </div>
              </div>
              {/* Subtle background pattern/gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#10b981]/10 to-transparent pointer-events-none"></div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
