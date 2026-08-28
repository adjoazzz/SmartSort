import { authFetch } from "../../lib/authFetch";
import React from "react";
import {
  Recycle,
  AlertTriangle,
  ShoppingBag,
  TrendingUp,
  TrendingDown,
  Minus,
  Box,
  Magnet,
  Droplet,
  Filter,
  ChevronDown,
  ArrowUpDown,
  MoreVertical,
  Download,
  FileSpreadsheet,
} from "lucide-react";
import { PageLayout } from "../../components/PageLayout";
import { useTranslation } from "react-i18next";
import { useRealtimeData } from "../../hooks/useRealtimeData";
import { toast } from "../../lib/toast";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Removed static CHART_DATA, TONNAGE_DATA, and CATEGORY_DATA.

const KPI_DATA = [
  {
    title: "Recycling Rate",
    value: "74.2%",
    trend: "12.4%",
    trendDirection: "up",
    icon: (
      <Recycle
        className="w-5 h-5 text-[#10b981] dark:text-emerald-400"
        strokeWidth={2}
      />
    ),
    iconBg: "bg-[#bbf7d0]/50 dark:bg-emerald-500/10",
    progressColor: "bg-[#10b981] dark:bg-emerald-500",
    progressWidth: "74%",
    trendColors:
      "bg-[#bbf7d0]/50 dark:bg-emerald-500/20 text-[#006c49] dark:text-emerald-400",
  },
  {
    title: "Contamination",
    value: "8.1%",
    trend: "4.2%",
    trendDirection: "down",
    icon: (
      <AlertTriangle
        className="w-5 h-5 text-[#ba1a1a] dark:text-red-500"
        strokeWidth={2}
      />
    ),
    iconBg: "bg-[#fca5a5]/20 dark:bg-red-500/10",
    progressColor: "bg-[#ba1a1a] dark:bg-red-500",
    progressWidth: "8%",
    trendColors:
      "bg-[#ffdad6] dark:bg-red-500/20 text-[#ba1a1a] dark:text-red-400",
  },
  {
    title: "Total Tonnage",
    value: "1,248.5 t",
    trend: "8.1%",
    trendDirection: "up",
    icon: (
      <ShoppingBag
        className="w-5 h-5 text-[#3b82f6] dark:text-blue-400"
        strokeWidth={2}
      />
    ),
    iconBg: "bg-[#dbeafe]/50 dark:bg-blue-500/10",
    progressColor: "bg-[#3b82f6] dark:bg-blue-500",
    progressWidth: "75%",
    trendColors:
      "bg-[#dbeafe] dark:bg-blue-500/20 text-[#2563eb] dark:text-blue-400",
  },
  {
    title: "Carbon Offset",
    value: "412.2 t",
    trend: "15.0%",
    trendDirection: "up",
    icon: (
      <span className="text-xs font-bold text-muted-foreground">
        CO<sub className="text-[8px]">2</sub>
      </span>
    ),
    iconBg: "bg-transparent border border-border",
    progressColor: "bg-[#334155] dark:bg-slate-400",
    progressWidth: "40%",
    trendColors:
      "bg-[#bbf7d0]/50 dark:bg-emerald-500/20 text-[#006c49] dark:text-emerald-400",
  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card text-foreground p-3 rounded-lg shadow-xl text-sm border border-border">
        <p className="font-bold mb-2 pb-2 border-b border-border">{label}</p>
        <div className="mb-1">
          <span className="text-xs text-muted-foreground mr-2">
            Clean Sorting:
          </span>
          <span className="text-[#10b981] dark:text-emerald-400 font-bold">
            {payload[0].value}%
          </span>
        </div>
        <div>
          <span className="text-xs text-muted-foreground mr-2">
            Contamination:
          </span>
          <span className="text-[#fca5a5] dark:text-red-400 font-bold">
            {payload[1].value}%
          </span>
        </div>
      </div>
    );
  }
  return null;
};

function KpiCard({ data }: { data: (typeof KPI_DATA)[0] }) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 shadow-sm relative overflow-hidden flex flex-col justify-between">
      <div className="flex justify-between items-start mb-6">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${data.iconBg}`}
        >
          {data.icon}
        </div>
        <div
          className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-bold ${data.trendColors}`}
        >
          {data.trendDirection === "up" ? (
            <TrendingUp className="w-3 h-3" strokeWidth={3} />
          ) : (
            <TrendingDown className="w-3 h-3" strokeWidth={3} />
          )}
          {data.trend}
        </div>
      </div>
      <div>
        <h3 className="text-xs font-bold text-muted-foreground tracking-wider uppercase mb-1">
          {data.title}
        </h3>
        <p className="text-2xl font-bold text-foreground dark:text-white">
          {data.value}
        </p>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-muted">
        <div
          className={`h-full ${data.progressColor}`}
          style={{ width: data.progressWidth }}
        ></div>
      </div>
    </div>
  );
}

function CategoryIcon({ type }: { type: string }) {
  if (type === "boxes") return <Box className="w-4 h-4" strokeWidth={2} />;
  if (type === "magnet") return <Magnet className="w-4 h-4" strokeWidth={2} />;
  return <Droplet className="w-4 h-4" strokeWidth={2} />;
  return null;
}

export default function Analytics() {
  const { t } = useTranslation();
  const [startDate, setStartDate] = React.useState(
    new Date().toISOString().split("T")[0],
  );
  const [endDate, setEndDate] = React.useState(
    new Date().toISOString().split("T")[0],
  );
  const baseUrl =
    (import.meta as any).env?.VITE_API_BASE_URL ?? "http://localhost:5000";

  const fetchSummary = async () => {
    const response = await authFetch(`${baseUrl}/api/dashboard/summary`);
    if (!response.ok) {
      throw new Error("Failed to fetch analytics summary");
    }
    return response.json();
  };
  const { data: summary, isLoading: isLoadingSummary } = useRealtimeData<any>(
    fetchSummary,
    { tables: ["Device", "CollectionJob", "Feedback"] },
  );

  const fetchHistorical = async () => {
    const response = await authFetch(`${baseUrl}/api/analytics/historical`);
    if (!response.ok) throw new Error("Failed to fetch historical data");
    return response.json();
  };
  const { data: historicalData, isLoading: isLoadingHistorical } =
    useRealtimeData<any[]>(fetchHistorical, { tables: ["ProcessedItem"] });

  const fetchTonnage = async () => {
    const response = await authFetch(`${baseUrl}/api/analytics/tonnage`);
    if (!response.ok) throw new Error("Failed to fetch tonnage data");
    return response.json();
  };
  const { data: tonnageData, isLoading: isLoadingTonnage } = useRealtimeData<
    any[]
  >(fetchTonnage, { tables: ["ProcessedItem"] });

  const fetchCategories = async () => {
    const response = await authFetch(`${baseUrl}/api/analytics/categories`);
    if (!response.ok) throw new Error("Failed to fetch categories data");
    return response.json();
  };
  const { data: categoriesData, isLoading: isLoadingCategories } =
    useRealtimeData<any[]>(fetchCategories, { tables: ["ProcessedItem"] });

  const totalDevices = summary?.devices?.total ?? 0;
  const activeDevices = summary?.devices?.active ?? 0;
  const averageFill = summary?.devices?.averageFill ?? 0;
  const pendingJobs = summary?.jobs?.pending ?? 0;
  const inTransitJobs = summary?.jobs?.inTransit ?? 0;
  const completedJobs = summary?.jobs?.completed ?? 0;
  const openReports =
    (summary?.feedback?.pending ?? 0) + (summary?.feedback?.inProgress ?? 0);

  const liveKpis = KPI_DATA.map((kpi, idx) => {
    if (idx === 0) {
      return {
        ...kpi,
        value: totalDevices
          ? `${Math.round((activeDevices / totalDevices) * 100)}%`
          : "0%",
        trend: `${activeDevices}/${totalDevices || 0} devices`,
      };
    }

    if (idx === 1) {
      return {
        ...kpi,
        value: `${Math.max(0, 100 - averageFill)}%`,
        trend: `${averageFill}% fleet fill`,
      };
    }

    if (idx === 2) {
      return {
        ...kpi,
        value: `${pendingJobs + inTransitJobs}`,
        trend: `${completedJobs} completed`,
      };
    }

    return {
      ...kpi,
      value: `${openReports}`,
      trend: "Live from DB",
    };
  });

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Analytics Report", 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 30);

    const tableData = (categoriesData ?? []).map((cat) => [
      cat.name,
      `${cat.volume} t`,
      cat.growth,
      `${cat.goal}%`,
    ]);

    autoTable(doc, {
      startY: 40,
      head: [["Category", "Volume (Metric Tons)", "MoM Growth", "Target Goal"]],
      body: tableData,
      theme: "grid",
      headStyles: { fillColor: [0, 108, 73] },
    });

    doc.save("smartsort-analytics-report.pdf");
    toast.success("PDF analytics report generated!");
  };

  const handleExportCSV = () => {
    const headers = [
      "Category",
      "Volume (Metric Tons)",
      "MoM Growth",
      "Target Goal",
    ];
    const rows = (categoriesData ?? []).map((cat) => [
      `"${cat.name}"`,
      cat.volume,
      `"${cat.growth}"`,
      `"${cat.goal}%"`,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "smartsort-analytics-report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV analytics data exported successfully!");
  };

  return (
    <PageLayout
      title={t("analytics.title")}
      description={t("analytics.description")}
      actions={
        <div className="flex gap-2">
          <button
            onClick={handleExportPDF}
            className="bg-primary text-white text-sm font-semibold rounded-lg px-4 py-2 hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" strokeWidth={2.5} />
            Export PDF
          </button>
          <button
            onClick={handleExportCSV}
            data-testid="export-csv-btn"
            className="bg-card border border-border text-foreground hover:bg-slate-100 dark:hover:bg-secondary text-sm font-semibold rounded-lg px-4 py-2 transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <FileSpreadsheet
              className="w-4 h-4 text-emerald-600 dark:text-emerald-400"
              strokeWidth={2.5}
            />
            Export CSV
          </button>
          <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-1 shadow-sm">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-transparent text-foreground dark:text-white text-sm font-semibold focus:outline-none focus:ring-0 cursor-pointer w-[120px]"
            />
            <span className="text-muted-foreground text-sm font-semibold">
              to
            </span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-transparent text-foreground dark:text-white text-sm font-semibold focus:outline-none focus:ring-0 cursor-pointer w-[120px]"
            />
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        {/* KPIs Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoadingSummary
            ? Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="bg-card border border-border rounded-xl p-5 shadow-sm animate-pulse flex flex-col justify-between h-[150px]"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-10 h-10 rounded-lg bg-slate-200 dark:bg-muted" />
                    <div className="h-6 w-14 bg-slate-100 dark:bg-secondary rounded" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="h-3.5 w-24 bg-slate-100 dark:bg-secondary rounded" />
                    <div className="h-7 w-20 bg-slate-200 dark:bg-muted rounded" />
                  </div>
                </div>
              ))
            : liveKpis.map((kpi, idx) => <KpiCard key={idx} data={kpi} />)}
        </div>

        {/* Middle Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Rate Comparison Over Time */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm col-span-1 lg:col-span-2 flex flex-col h-[400px]">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-lg font-bold text-foreground dark:text-white">
                  {t("analytics.rateComparison")}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {t("analytics.rateDesc")}
                </p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#10b981] dark:bg-emerald-500"></div>
                  <span className="text-xs text-muted-foreground">Clean</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#fca5a5] dark:bg-red-400"></div>
                  <span className="text-sm text-muted-foreground font-medium">
                    {t("analytics.contamination")}
                  </span>
                </div>
              </div>
            </div>
            {isLoadingHistorical ? (
              <div className="flex-1 w-full bg-slate-50/50 dark:bg-secondary/10 rounded-lg flex items-center justify-center animate-pulse border border-dashed border-slate-200 dark:border-slate-800">
                <div className="flex flex-col items-center gap-2">
                  <div className="h-10 w-40 bg-slate-200 dark:bg-muted rounded"></div>
                  <div className="h-4 w-28 bg-slate-100 dark:bg-secondary rounded"></div>
                </div>
              </div>
            ) : (
              <div className="flex-1 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={historicalData ?? []}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#f1f5f9"
                    />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 600 }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 600 }}
                      ticks={[0, 25, 50, 75, 100]}
                      tickFormatter={(val) => `${val}%`}
                    />
                    <Tooltip
                      content={<CustomTooltip />}
                      cursor={{ stroke: "#cbd5e1", strokeWidth: 1 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="recycling"
                      stroke="#10b981"
                      strokeWidth={3}
                      dot={false}
                      activeDot={{
                        r: 6,
                        fill: "#10b981",
                        stroke: "#fff",
                        strokeWidth: 2,
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="contamination"
                      stroke="#fca5a5"
                      strokeWidth={2}
                      strokeDasharray="4 4"
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Tonnage by Material */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col h-[400px]">
            <h2 className="text-[17px] font-bold text-foreground dark:text-white mb-5">
              {t("analytics.tonnageTitle")}
            </h2>

            {isLoadingTonnage ? (
              <div className="flex flex-col gap-[18px] flex-1 animate-pulse">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <div className="h-4 w-32 bg-slate-200 dark:bg-muted rounded"></div>
                      <div className="h-3 w-16 bg-slate-100 dark:bg-secondary rounded"></div>
                    </div>
                    <div className="h-2 bg-slate-100 dark:bg-secondary rounded-full w-full"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-[18px] flex-1">
                {(tonnageData ?? []).map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-end mb-1.5">
                      <span className="text-[13px] font-bold text-foreground dark:text-white">
                        {item.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {item.value}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`h-full rounded-full ${item.color}`}
                        style={{ width: `${item.percent}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="border-t border-[#f1f5f9] dark:border-[#0f2942] mt-auto pt-4 grid grid-cols-2 divide-x divide-[#f1f5f9]">
              <div className="pr-4">
                <p className="text-xs text-muted-foreground font-semibold mb-1">
                  {t("analytics.captureRate")}
                </p>
                <p className="text-2xl font-bold text-foreground dark:text-white">
                  92.4%
                </p>
              </div>
              <div className="pl-4 text-right">
                <p className="text-xs text-muted-foreground font-semibold mb-1">
                  {t("analytics.efficiency")}
                </p>
                <p className="text-2xl font-bold text-foreground dark:text-white">
                  88.2%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row - Category Breakdown */}
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-[#f1f5f9] dark:border-[#0f2942] flex justify-between items-center">
            <h2 className="text-lg font-bold text-foreground dark:text-white">
              {t("analytics.categoryBreakdown")}
            </h2>
            <button className="bg-card border border-border text-muted-foreground text-sm font-semibold rounded-lg px-4 py-2 hover:bg-background dark:hover:bg-secondary transition-colors flex items-center gap-2 cursor-pointer">
              <Filter className="w-3.5 h-3.5" strokeWidth={2} />
              {t("analytics.filterCategory")}
              <ChevronDown className="w-3.5 h-3.5" strokeWidth={2} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-card border-b border-[#f1f5f9] dark:border-[#0f2942]">
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground tracking-wider flex items-center gap-1">
                    {t("analytics.tableMatCat")}
                    <ArrowUpDown className="w-3 h-3" strokeWidth={2} />
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground tracking-wider">
                    {t("analytics.tableVol")}
                    <ArrowUpDown className="w-3 h-3 inline" strokeWidth={2} />
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground tracking-wider">
                    {t("analytics.tableMom")}
                    <ArrowUpDown className="w-3 h-3 inline" strokeWidth={2} />
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground tracking-wider">
                    {t("analytics.tableTarget")}
                    <ArrowUpDown className="w-3 h-3 inline" strokeWidth={2} />
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground tracking-wider text-right">
                    {t("analytics.tableAction")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f1f5f9]">
                {isLoadingCategories
                  ? Array.from({ length: 3 }).map((_, idx) => (
                      <tr key={idx} className="animate-pulse">
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-slate-200 dark:bg-muted" />
                            <div className="h-4 w-36 bg-slate-200 dark:bg-muted rounded"></div>
                          </div>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="h-4 w-12 bg-slate-100 dark:bg-secondary rounded"></div>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="h-6 w-14 bg-slate-200 dark:bg-muted rounded-full"></div>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="flex items-center gap-3 w-32">
                            <div className="w-full bg-slate-100 dark:bg-secondary rounded-full h-1.5" />
                            <div className="h-4 w-8 bg-slate-200 dark:bg-muted rounded"></div>
                          </div>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap text-right">
                          <div className="w-6 h-6 bg-slate-100 dark:bg-secondary rounded ml-auto" />
                        </td>
                      </tr>
                    ))
                  : (categoriesData ?? []).map((row, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-background dark:hover:bg-secondary transition-colors"
                      >
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-muted flex items-center justify-center text-muted-foreground">
                              <CategoryIcon type={row.icon} />
                            </div>
                            <span className="text-sm font-bold text-foreground dark:text-white">
                              {row.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <span className="text-sm text-muted-foreground">
                            {row.volume}
                          </span>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-bold
                          ${
                            row.growthTrend === "up"
                              ? "bg-[#bbf7d0]/50 dark:bg-emerald-500/20 text-[#006c49] dark:text-emerald-400"
                              : row.growthTrend === "down"
                                ? "bg-[#ffdad6] dark:bg-red-500/20 text-[#ba1a1a] dark:text-red-400"
                                : "bg-muted text-muted-foreground"
                          }
                        `}
                          >
                            {row.growthTrend === "up" && (
                              <TrendingUp
                                className="w-2.5 h-2.5"
                                strokeWidth={3}
                              />
                            )}
                            {row.growthTrend === "down" && (
                              <TrendingDown
                                className="w-2.5 h-2.5"
                                strokeWidth={3}
                              />
                            )}
                            {row.growthTrend === "neutral" && (
                              <Minus className="w-2.5 h-2.5" strokeWidth={3} />
                            )}
                            {row.growth}
                          </div>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="flex items-center gap-3 w-32">
                            <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                              <div
                                className={`h-full rounded-full ${row.goalColor}`}
                                style={{ width: `${row.goal}%` }}
                              />
                            </div>
                            <span className="text-sm font-bold text-[#334155] dark:text-muted-foreground">
                              {row.goal}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap text-right">
                          <button className="text-muted-foreground hover:text-foreground dark:text-white transition-colors p-1 cursor-pointer">
                            <MoreVertical
                              className="w-4.5 h-4.5"
                              strokeWidth={2}
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
