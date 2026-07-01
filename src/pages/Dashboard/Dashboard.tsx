import { authFetch } from "../../lib/authFetch";
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router";
import { PageLayout } from "../../components/PageLayout";
import { MetricCard } from "../../components/MetricCard";
import { StatusBadge } from "../../components/StatusBadge";
import { Progress } from "../../components/ui/progress";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../../components/ui/table";
import { useRealtimeData } from "../../hooks/useRealtimeData";
import { useTranslation } from "react-i18next";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { Calendar } from "../../components/ui/calendar";
import { format } from "date-fns";

import imgEventSnap from "../../assets/9389a9333045e821be3474418e89b876d4fc0c10.png";
import imgEventSnap1 from "../../assets/8811709787b7f35f6b7245b79da448b564be54ea.png";
import imgEventSnap2 from "../../assets/e1a9d04912bb77b9225af7a54042c20ac0088702.png";
import imgEventSnap3 from "../../assets/a1d30b6258f5d1e8997441f254843ad037f46cad.png";

// --- Mock Data ---

const KPIS = [
  {
    title: "ACTIVE DEVICES",
    value: "18/20",
    trend: "System nominal",
    trendDirection: "neutral" as const,
    iconColorClass: "text-muted-foreground",
    iconBgClass: "bg-[#515f74]/10",
    linkTo: "/devices",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
        <rect x="9" y="9" width="6" height="6"></rect>
        <line x1="9" y1="1" x2="9" y2="4"></line>
        <line x1="15" y1="1" x2="15" y2="4"></line>
        <line x1="9" y1="20" x2="9" y2="23"></line>
        <line x1="15" y1="20" x2="15" y2="23"></line>
        <line x1="20" y1="9" x2="23" y2="9"></line>
        <line x1="20" y1="14" x2="23" y2="14"></line>
        <line x1="1" y1="9" x2="4" y2="9"></line>
        <line x1="1" y1="14" x2="4" y2="14"></line>
      </svg>
    ),
  },
  {
    title: "TOTAL ITEMS SORTED",
    value: "42,891",
    trend: "+12.4% vs yesterday",
    trendDirection: "up" as const,
    iconColorClass: "text-[#006c49]",
    iconBgClass: "bg-[#10b981]/10",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" y1="22.08" x2="12" y2="12"></line>
      </svg>
    ),
  },
  {
    title: "RECYCLING RATE %",
    value: "84.2%",
    trend: "+2.4% threshold",
    trendDirection: "up" as const,
    iconColorClass: "text-[#0284c7]",
    iconBgClass: "bg-[#23acf1]/10",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
      </svg>
    ),
  },
  {
    title: "CONTAMINATION RATE %",
    value: "4.1%",
    trend: "-0.8% reduction",
    trendDirection: "up" as const,
    iconColorClass: "text-[#d97706]",
    iconBgClass: "bg-[#fef3c7]",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>
    ),
  },
];

const THROUGHPUT_DATA = [
  { time: "08:00", sorted: 124, rejected: 18 },
  { time: "09:00", sorted: 165, rejected: 24 },
  { time: "10:00", sorted: 142, rejected: 15 },
  { time: "11:00", sorted: 156, rejected: 22 },
  { time: "12:00", sorted: 198, rejected: 34 },
  { time: "13:00", sorted: 215, rejected: 28 },
  { time: "14:00", sorted: 160, rejected: 19 },
  { time: "15:00", sorted: 95, rejected: 12 },
];

const DEVICE_BINS = [
  { label: "Main Conveyor A1", value: 88, color: "bg-[#ba1a1a]" },
  { label: "Glass Separator B2", value: 42, color: "bg-[#10b981]" },
  { label: "Paper Compactor C1", value: 15, color: "bg-[#10b981]" },
  { label: "Organic Bin D5", value: 72, color: "bg-[#f59e0b]" },
];

const RECENT_EVENTS = [
  {
    id: 1,
    time: "14:32:01",
    source: "Sensor_A1",
    detection: "BIOHAZARD",
    detectionType: "danger",
    confidence: "98.4%",
    img: imgEventSnap,
    action: "ROUTED_BIN_X",
  },
  {
    id: 2,
    time: "14:28:45",
    source: "Scanner_B2",
    detection: "MEDICAL_WASTE",
    detectionType: "danger",
    confidence: "95.2%",
    img: imgEventSnap1,
    action: "FLAG_OPERATOR",
  },
  {
    id: 3,
    time: "14:15:22",
    source: "Sensor_C1",
    detection: "E_WASTE",
    detectionType: "warning",
    confidence: "88.7%",
    img: imgEventSnap2,
    action: "ROUTED_BIN_Y",
  },
  {
    id: 4,
    time: "14:02:11",
    source: "Camera_A3",
    detection: "BATTERY_LITHIUM",
    detectionType: "danger",
    confidence: "99.1%",
    img: imgEventSnap3,
    action: "E-STOP_TRIGGERED",
  },
];

export default function Dashboard() {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [isExporting, setIsExporting] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const facilityId = searchParams.get("facilityId") || "";
  const queryParam = facilityId ? `?facilityId=${facilityId}` : "";

  const baseUrl =
    (import.meta as any).env?.VITE_API_BASE_URL ?? "http://localhost:5000";

  // Fetch functions
  const fetchDevices = async () => {
    const response = await authFetch(`${baseUrl}/api/devices${queryParam}`);
    if (!response.ok) throw new Error("Failed to fetch device data");
    return response.json();
  };

  const fetchMetrics = async () => {
    const response = await authFetch(`${baseUrl}/api/dashboard/metrics${queryParam}`);
    if (!response.ok) throw new Error("Failed to fetch dashboard metrics");
    return response.json();
  };

  const fetchThroughput = async () => {
    const response = await authFetch(`${baseUrl}/api/dashboard/throughput${queryParam}`);
    if (!response.ok) throw new Error("Failed to fetch throughput data");
    return response.json();
  };

  const fetchWasteCategories = async () => {
    const response = await authFetch(
      `${baseUrl}/api/dashboard/waste-categories${queryParam}`,
    );
    if (!response.ok) throw new Error("Failed to fetch waste categories");
    return response.json();
  };

  const fetchContaminationEvents = async () => {
    const response = await authFetch(
      `${baseUrl}/api/dashboard/contamination-events${queryParam}`,
    );
    if (!response.ok) throw new Error("Failed to fetch contamination events");
    return response.json();
  };

  // Realtime subscriptions — instant updates when DB changes
  const { data: devicesData, isLoading: devicesLoading, refresh: refreshDevices } = useRealtimeData<
    any
  >(fetchDevices, { tables: ["Device"] });

  const { data: metricsData, isLoading: metricsLoading, refresh: refreshMetrics } = useRealtimeData<any>(
    fetchMetrics,
    { tables: ["Device", "ProcessedItem"] },
  );

  const { data: throughputData, isLoading: throughputLoading, refresh: refreshThroughput } =
    useRealtimeData<any[]>(fetchThroughput, { tables: ["ProcessedItem"] });

  const { data: wasteCategoriesData, isLoading: wasteLoading, refresh: refreshWasteCategories } =
    useRealtimeData<any>(fetchWasteCategories, { tables: ["ProcessedItem"] });

  const { data: contaminationEventsData, isLoading: contaminationLoading, refresh: refreshContamination } =
    useRealtimeData<any[]>(fetchContaminationEvents, { tables: ["ProcessedItem"] });

  // Manually re-trigger fetches when facilityId query parameter shifts (Drill-down update)
  useEffect(() => {
    refreshDevices().catch(console.error);
    refreshMetrics().catch(console.error);
    refreshThroughput().catch(console.error);
    refreshWasteCategories().catch(console.error);
    refreshContamination().catch(console.error);
  }, [facilityId]);

  const isLoading =
    devicesLoading ||
    metricsLoading ||
    throughputLoading ||
    wasteLoading ||
    contaminationLoading;

  const devices = devicesData?.data ?? [];

  const dynamicKpis = [
    {
      ...KPIS[0],
      value: metricsData?.deviceStatus ?? "18/20",
    },
    {
      ...KPIS[1],
      value: metricsData?.totalItemsSorted ?? "42,891",
    },
    {
      ...KPIS[2],
      value: metricsData?.recyclingRate ?? "84.2%",
    },
    {
      ...KPIS[3],
      value: metricsData?.contaminationRate ?? "4.1%",
    },
  ];

  const handleExportPDF = () => {
    setIsExporting(true);
    setTimeout(() => {
      try {
        const doc = new jsPDF();

        // Header
        doc.setFontSize(20);
        doc.text("SmartSort Operations Report", 14, 22);
        doc.setFontSize(11);
        doc.setTextColor(100);
        doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 30);

        // Section 1: KPIs
        doc.setFontSize(14);
        doc.setTextColor(0);
        doc.text("Key Performance Indicators", 14, 45);

        const kpiData = dynamicKpis.map((kpi) => [
          kpi.title,
          kpi.value,
          kpi.trend,
        ]);
        autoTable(doc, {
          startY: 50,
          head: [["Metric", "Value", "Trend"]],
          body: kpiData,
          theme: "grid",
          headStyles: { fillColor: [0, 108, 73] },
        });

        // Section 2: Device Bins
        doc.text("Device Status", 14, (doc as any).lastAutoTable.finalY + 15);
        const deviceData = displayBins.map((bin: any) => [
          bin.label,
          `${bin.value}%`,
        ]);
        autoTable(doc, {
          startY: (doc as any).lastAutoTable.finalY + 20,
          head: [["Device", "Fill Level"]],
          body: deviceData,
          theme: "grid",
          headStyles: { fillColor: [0, 108, 73] },
        });

        // Section 3: Recent Events
        doc.text(
          "Recent Contamination Events",
          14,
          (doc as any).lastAutoTable.finalY + 15,
        );
        const eventData = RECENT_EVENTS.map((evt) => [
          evt.time,
          evt.source,
          evt.detection,
          evt.confidence,
          evt.action,
        ]);
        autoTable(doc, {
          startY: (doc as any).lastAutoTable.finalY + 20,
          head: [["Time", "Source", "Detection", "Confidence", "Action"]],
          body: eventData,
          theme: "grid",
          headStyles: { fillColor: [0, 108, 73] },
        });

        doc.save("operations-report.pdf");
      } finally {
        setIsExporting(false);
      }
    }, 100);
  };

  const binsOnly = devices.filter((d: any) => d.deviceType === "bin");
  const displayBins =
    binsOnly.length > 0
      ? binsOnly.map((d: any) => ({
          label: d.location || d.customBinId,
          value: d.fillLevel ?? 0,
          color: (d.fillLevel ?? 0) > 85 ? "bg-[#ba1a1a]" : "bg-[#10b981]",
        }))
      : DEVICE_BINS;

  const hasValidThroughput = throughputData?.some(
    (d: any) => d.sorted > 0 || d.rejected > 0,
  );
  const chartData = (throughputData && hasValidThroughput) ? throughputData : THROUGHPUT_DATA;
  const maxTotal = Math.max(
    ...chartData.map((d: any) => (d.sorted ?? 0) + (d.rejected ?? 0)),
    1,
  );

  // Map database string to visual asset image
  const eventImages: Record<string, string> = {
    imgEventSnap,
    imgEventSnap1,
    imgEventSnap2,
    imgEventSnap3,
  };

  return (
    <PageLayout
      title={t("dashboard.title")}
      description={t("dashboard.description")}
      actions={
        <>
          <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-1 shadow-sm">
            <Popover>
              <PopoverTrigger asChild>
                <button className="bg-transparent text-foreground dark:text-white text-sm font-semibold focus:outline-none focus:ring-0 cursor-pointer w-[120px] text-left">
                  {startDate ? format(startDate, "MMM dd, yyyy") : "Start Date"}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 z-50 bg-card" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={(date) => date && setStartDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <span className="text-muted-foreground text-sm font-semibold">
              to
            </span>
            <Popover>
              <PopoverTrigger asChild>
                <button className="bg-transparent text-foreground dark:text-white text-sm font-semibold focus:outline-none focus:ring-0 cursor-pointer w-[120px] text-left">
                  {endDate ? format(endDate, "MMM dd, yyyy") : "End Date"}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 z-50 bg-card" align="end">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={(date) => date && setEndDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <button
            onClick={handleExportPDF}
            disabled={isExporting}
            className="no-print bg-primary hover:bg-primary/90 text-white text-sm font-medium rounded-lg px-4 py-2 flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-wait"
          >
            {isExporting ? (
              <>
                <svg
                  className="animate-spin h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Exporting...
              </>
            ) : (
              <>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
                {t("dashboard.exportBtn")}
              </>
            )}
          </button>
        </>
      }
    >
      {facilityId && (
        <div className="no-print bg-[#ffdad6] text-[#ba1a1a] dark:bg-red-500/10 dark:text-red-400 border border-red-200 dark:border-red-500/20 px-4 py-3 rounded-xl flex items-center justify-between shadow-sm mb-5">
          <div className="flex items-center gap-2">
            <span className="text-lg">⚠️</span>
            <span className="text-sm font-semibold">
              Viewing Facility Telemetry as Administrator. Some manager features are restricted.
            </span>
          </div>
          <Link
            to="/admin/dashboard"
            className="text-xs bg-[#ba1a1a] text-white hover:bg-[#ba1a1a]/90 dark:bg-red-500 dark:hover:bg-red-600 px-3 py-1.5 rounded-lg font-bold transition-all shadow-sm cursor-pointer"
          >
            Return to Enterprise Overview
          </Link>
        </div>
      )}

      {/* KPIs Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {isLoading
          ? Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-card border border-border rounded-xl p-6 shadow-sm animate-pulse flex flex-col gap-4"
              >
                <div className="flex justify-between items-center">
                  <div className="h-3 w-24 bg-slate-200 dark:bg-muted rounded"></div>
                  <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-secondary"></div>
                </div>
                <div className="h-8 w-16 bg-slate-200 dark:bg-muted rounded"></div>
                <div className="h-3 w-32 bg-slate-100 dark:bg-secondary rounded"></div>
              </div>
            ))
          : dynamicKpis.map((kpi, idx) => {
              // Map KPI index to keys for translation
              const keyMap = [
                "activeDevices",
                "totalItemsSorted",
                "recyclingRate",
                "contaminationRate",
              ] as const;
              const kpiKey = keyMap[idx];
              return (
                <MetricCard
                  key={idx}
                  title={t(`dashboard.kpi.${kpiKey}`)}
                  value={kpi.value}
                  trend={kpi.trend}
                  trendDirection={kpi.trendDirection}
                  iconColorClass={kpi.iconColorClass}
                  iconBgClass={kpi.iconBgClass}
                  iconSvg={kpi.icon}
                  linkTo={"linkTo" in kpi ? (kpi as any).linkTo : undefined}
                />
              );
            })}
      </div>

      {/* Middle Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Hourly Throughput Bar Chart */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm col-span-1 lg:col-span-2 flex flex-col h-[360px]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground dark:text-white">
              {t("dashboard.charts.hourlyThroughput")}
            </h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-[#10b981]" />
                <span className="text-[10px] font-bold text-muted-foreground uppercase">
                  {t("dashboard.charts.sorted")}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-[#e2e8f0]" />
                <span className="text-[10px] font-bold text-muted-foreground uppercase">
                  {t("dashboard.charts.rejected")}
                </span>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex-1 flex items-end gap-3 w-full border-b border-l border-[#f1f5f9] dark:border-[#0f2942] pt-4 pl-1 pb-1 relative animate-pulse">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center justify-end h-full"
                >
                  <div className="w-full bg-slate-100 dark:bg-secondary rounded-t-xl h-[45%]" />
                  <div className="h-3 w-8 bg-slate-200 dark:bg-muted rounded mt-2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 flex items-end gap-3 w-full border-b border-l border-[#f1f5f9] dark:border-[#0f2942] pt-4 pl-1 pb-1 relative">
              {chartData.map((data: any, idx: number) => {
                const total = data.sorted + data.rejected;
                const totalHeightPercent = (total / maxTotal) * 100;
                const sortedHeightPercent =
                  total > 0 ? (data.sorted / total) * 100 : 0;
                const rejectedHeightPercent =
                  total > 0 ? (data.rejected / total) * 100 : 0;

                return (
                  <div
                    key={idx}
                    className="flex-1 flex flex-col items-center justify-end h-full group"
                  >
                    <div className="w-full bg-[#f4f4f4] dark:bg-card/20 rounded-t-xl relative h-full flex items-end group-hover:bg-muted dark:group-hover:bg-card/40 transition-colors">
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center pointer-events-none z-10">
                        <div className="bg-slate-900 dark:bg-slate-800 text-white text-[11px] rounded-lg py-1.5 px-2.5 shadow-lg border border-slate-700/50 flex flex-col gap-1 min-w-[110px]">
                          <div className="font-semibold text-center border-b border-slate-700 pb-1">
                            {data.time}
                          </div>
                          <div className="flex items-center justify-between gap-4 text-emerald-400">
                            <div className="flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                              <span>Sorted:</span>
                            </div>
                            <span className="font-bold">{data.sorted}</span>
                          </div>
                          <div className="flex items-center justify-between gap-4 text-slate-300">
                            <div className="flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#cbd5e1] dark:bg-slate-400" />
                              <span>Rejected:</span>
                            </div>
                            <span className="font-bold">{data.rejected}</span>
                          </div>
                          <div className="flex items-center justify-between gap-4 text-slate-400 border-t border-slate-750 pt-1 mt-0.5">
                            <span>Total:</span>
                            <span className="font-bold text-white">
                              {total}
                            </span>
                          </div>
                        </div>
                        <div className="w-2 h-2 bg-slate-900 dark:bg-slate-800 rotate-45 -mt-1 border-r border-b border-slate-700/50" />
                      </div>

                      {/* Stacked Bar */}
                      <div
                        className="w-full rounded-t-xl overflow-hidden flex flex-col justify-end transition-all duration-500 ease-in-out"
                        style={{ height: `${totalHeightPercent}%` }}
                      >
                        {/* Rejected Part */}
                        <div
                          className="w-full bg-[#cbd5e1] dark:bg-slate-500 transition-all duration-500"
                          style={{ height: `${rejectedHeightPercent}%` }}
                        />
                        {/* Sorted Part */}
                        <div
                          className="w-full bg-[#10b981] transition-all duration-500"
                          style={{ height: `${sortedHeightPercent}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-[10px] text-muted-foreground mt-2 group-hover:text-muted-foreground dark:group-hover:text-muted-foreground">
                      {data.time}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Waste Distribution Donut */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col h-[360px]">
          <h2 className="text-lg font-semibold text-foreground dark:text-white mb-4">
            {t("dashboard.charts.wasteCategories")}
          </h2>

          {isLoading ? (
            <div className="flex-1 flex flex-row items-center justify-center relative animate-pulse w-full gap-8 lg:gap-12">
              <div className="w-56 h-56 rounded-full border-[20px] border-slate-100 dark:border-[#0f2942] flex items-center justify-center flex-shrink-0">
                <div className="h-6 w-16 bg-slate-200 dark:bg-muted rounded"></div>
              </div>
              <div className="flex flex-col gap-6 justify-center">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-start gap-3.5">
                    <div className="w-3 h-3 rounded-full bg-slate-200 dark:bg-muted mt-1.5" />
                    <div className="flex flex-col gap-2">
                      <div className="h-3 w-20 bg-slate-200 dark:bg-muted rounded" />
                      <div className="h-5 w-12 bg-slate-100 dark:bg-secondary rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-row items-center justify-center relative w-full h-full gap-8 lg:gap-12">
              <div className="relative w-56 h-56 flex items-center justify-center flex-shrink-0">
                {/* Dynamic SVG Donut Chart */}
                <svg
                  width="224"
                  height="224"
                  viewBox="0 0 100 100"
                  className="relative transform -rotate-90"
                >
                  {/* Background track */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#f1f5f9"
                    strokeWidth="10"
                    className="dark:stroke-[#0f2942]"
                  />
                  {/* Slices */}
                  {(() => {
                    let accumulatedPercent = 0;
                    const categoryColors: Record<string, string> = {
                      Plastic: "#10b981",
                      Paper: "#60a5fa",
                      Metal: "#fbbf24",
                      Other: "#cbd5e1",
                    };

                    const categories = wasteCategoriesData?.categories ?? [
                      { category: "Plastic", percentage: 35 },
                      { category: "Paper", percentage: 22 },
                      { category: "Metal", percentage: 18 },
                      { category: "Other", percentage: 25 },
                    ];

                    return categories.map((cat: any, i: number) => {
                      const percent = cat.percentage;
                      if (percent <= 0) return null;

                      const strokeLength = (percent / 100) * 251.2;
                      const strokeOffset =
                        251.2 -
                        strokeLength -
                        (accumulatedPercent / 100) * 251.2;
                      accumulatedPercent += percent;

                      return (
                        <circle
                          key={i}
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                          stroke={categoryColors[cat.category] ?? "#cbd5e1"}
                          strokeWidth="10"
                          strokeDasharray={`${strokeLength} 251.2`}
                          strokeDashoffset={strokeOffset}
                          strokeLinecap="round"
                          className="transition-all duration-1000 ease-out"
                        />
                      );
                    });
                  })()}
                </svg>

                {/* Centered Total */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-3xl font-black text-foreground dark:text-white tracking-tight">
                    {(wasteCategoriesData?.total ?? 42891).toLocaleString()}
                  </span>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">
                    {t("dashboard.charts.totalProcessed")}
                  </span>
                </div>
              </div>

              <div className="flex flex-col justify-center gap-6">
                {(
                  wasteCategoriesData?.categories ?? [
                    { category: "Plastic", percentage: 35 },
                    { category: "Paper", percentage: 22 },
                    { category: "Metal", percentage: 18 },
                    { category: "Other", percentage: 25 },
                  ]
                ).map((cat: any, i: number) => {
                  const colors: Record<string, string> = {
                    Plastic: "bg-[#10b981]",
                    Paper: "bg-[#60a5fa]",
                    Metal: "bg-[#fbbf24]",
                    Other: "bg-[#cbd5e1] dark:bg-slate-500",
                  };
                  return (
                    <div key={i} className="flex items-start gap-3.5 group">
                      <div
                        className={`w-3 h-3 rounded-full mt-1.5 ${colors[cat.category] ?? "bg-[#cbd5e1]"}`}
                      />
                      <div className="flex flex-col">
                        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest group-hover:text-foreground transition-colors">
                          {t(
                            `dashboard.charts.${cat.category.toLowerCase()}`,
                            cat.category,
                          ) as string}
                        </span>
                        <span className="text-base font-black text-foreground">
                          {cat.percentage}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Device Status */}
        <div className="bg-card border border-border rounded-xl shadow-sm flex flex-col col-span-1">
          <div className="p-6 border-b border-[#f1f5f9] dark:border-[#0f2942] flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground dark:text-white">
              {t("dashboard.bottom.deviceStatus")}
            </h2>
            <StatusBadge label="Live" variant="success" />
          </div>
          <div className="p-6 flex flex-col gap-6 flex-1 overflow-y-auto max-h-[260px]">
            {isLoading
              ? Array.from({ length: 4 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col gap-2 w-full animate-pulse"
                  >
                    <div className="flex justify-between items-center">
                      <div className="h-4 w-28 bg-slate-200 dark:bg-muted rounded"></div>
                      <div className="h-4 w-8 bg-slate-100 dark:bg-secondary rounded"></div>
                    </div>
                    <div className="h-2 bg-slate-100 dark:bg-secondary rounded-full w-full animate-pulse"></div>
                  </div>
                ))
              : displayBins.map((bin: any, idx: number) => (
                  <div key={idx} className="flex flex-col gap-2 w-full">
                    <div className="flex justify-between items-center text-sm font-medium">
                      <span className="text-foreground dark:text-white">
                        {bin.label}
                      </span>
                      <span className="text-muted-foreground">
                        {bin.value}%
                      </span>
                    </div>
                    <Progress
                      value={bin.value}
                      className={`h-2 bg-muted ${
                        bin.color === "bg-[#ba1a1a]"
                          ? "[&>[data-slot=progress-indicator]]:bg-[#ba1a1a]"
                          : "[&>[data-slot=progress-indicator]]:bg-[#10b981]"
                      }`}
                    />
                  </div>
                ))}
          </div>
          <div className="p-4 border-t border-[#f1f5f9] dark:border-[#0f2942] bg-background dark:bg-secondary rounded-b-xl">
            <button
              onClick={() => navigate("/devices")}
              className="w-full text-xs font-bold text-muted-foreground tracking-widest uppercase hover:text-foreground dark:text-white transition-colors py-2 cursor-pointer"
            >
              {t("dashboard.bottom.manageAllDevices")}
            </button>
          </div>
        </div>

        {/* Live Events Table */}
        <div className="bg-card border border-border rounded-xl shadow-sm flex flex-col col-span-1 lg:col-span-2 overflow-hidden">
          <div className="p-6 border-b border-[#f1f5f9] dark:border-[#0f2942] flex items-center justify-between bg-card">
            <h2 className="text-lg font-semibold text-foreground dark:text-white">
              {t("dashboard.bottom.liveContaminationEvents")}
            </h2>
            <StatusBadge
              label={t("dashboard.bottom.actionRequired")}
              variant="danger"
              hasDot
            />
          </div>

          <Table className="min-w-[700px]">
            <TableHeader>
              <TableRow className="bg-background dark:bg-secondary border-b border-[#f1f5f9] dark:border-[#0f2942] hover:bg-background dark:hover:bg-secondary">
                <TableHead className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {t("dashboard.table.timestamp")}
                </TableHead>
                <TableHead className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {t("dashboard.table.source")}
                </TableHead>
                <TableHead className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {t("dashboard.table.detection")}
                </TableHead>
                <TableHead className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Confidence
                </TableHead>
                <TableHead className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Visual
                </TableHead>
                <TableHead className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-[#f1f5f9]">
              {isLoading
                ? Array.from({ length: 4 }).map((_, idx) => (
                    <TableRow key={idx} className="animate-pulse">
                      <TableCell className="px-6 py-4 whitespace-nowrap">
                        <div className="h-4 w-12 bg-slate-100 dark:bg-secondary rounded"></div>
                      </TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap">
                        <div className="h-4 w-20 bg-slate-200 dark:bg-muted rounded"></div>
                      </TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap">
                        <div className="h-5 w-24 bg-slate-100 dark:bg-secondary rounded-full"></div>
                      </TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap">
                        <div className="h-4 w-10 bg-slate-200 dark:bg-muted rounded"></div>
                      </TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap">
                        <div className="w-10 h-10 rounded-md bg-slate-100 dark:bg-secondary"></div>
                      </TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap">
                        <div className="h-4 w-28 bg-slate-100 dark:bg-secondary rounded"></div>
                      </TableCell>
                    </TableRow>
                  ))
                : (contaminationEventsData || RECENT_EVENTS).map((evt: any) => (
                    <TableRow
                      key={evt.id}
                      className="hover:bg-background dark:hover:bg-secondary transition-colors border-b border-[#f1f5f9]"
                    >
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-muted-foreground">
                        {evt.time}
                      </TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-foreground dark:text-white">
                        {evt.source}
                      </TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge
                          label={evt.detection}
                          variant={evt.detectionType as any}
                        />
                      </TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-bold text-[#ba1a1a]">
                        {evt.confidence}
                      </TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap">
                        <div className="w-10 h-10 rounded-md overflow-hidden border border-border">
                          <img
                            src={evt.img || "https://placehold.co/100x100?text=No+Img"}
                            alt="Snapshot"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap text-xs font-semibold text-muted-foreground font-mono bg-background dark:bg-secondary">
                        {evt.action}
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </PageLayout>
  );
}
