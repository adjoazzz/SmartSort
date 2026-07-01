import { apiService } from "../../lib/apiService";
import React, { useState, useEffect } from "react";
import { PageLayout } from "../../components/PageLayout";
import { MetricCard } from "../../components/MetricCard";
import { StatusBadge } from "../../components/StatusBadge";
import { InputField } from "../../components/InputField";
import { SelectField } from "../../components/SelectField";
import { Skeleton } from "../../components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../components/ui/dialog";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../../components/ui/table";
import { useRealtimeData } from "../../hooks/useRealtimeData";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const getCategoryVariant = (category: string) => {
  switch (category) {
    case "Overflowing Bin":
    case "Missed Collection":
    case "Illegal Dumping":
      return "danger";
    case "Odor":
    case "Damaged Equipment":
      return "warning";
    case "Wrong Category":
      return "info";
    default:
      return "neutral";
  }
};

const getStatusVariant = (status: string) => {
  switch (status) {
    case "Pending":
      return "warning";
    case "In Progress":
      return "info";
    case "Resolved":
      return "success";
    default:
      return "neutral";
  }
};

const getInitials = (name: string) => {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch (e) {
    return dateString;
  }
};

const ISSUE_CATEGORIES = [
  "Select a category",
  "Overflowing Bin",
  "Odor",
  "Wrong Category",
  "Missed Collection",
  "Damaged Equipment",
  "Illegal Dumping",
  "Other",
];

export default function CommunityFeedback() {
  interface FeedbackItem {
    id: string;
    userName: string;
    location: string;
    category: string;
    message: string;
    status: string;
    createdAt: string;
  }

  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("Status: All");
  const [categoryFilter, setCategoryFilter] = useState("Category: All");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchFeedbacks = async () => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000";
    return apiService.get<FeedbackItem[]>(`${baseUrl}/api/feedback`);
  };

  const {
    data: feedbackData,
    isLoading,
    refresh,
  } = useRealtimeData<FeedbackItem[]>(fetchFeedbacks, {
    tables: ["Feedback"],
  });

  useEffect(() => {
    if (feedbackData) {
      setFeedbacks(feedbackData);
      setLoading(false);
    }
  }, [feedbackData]);

  const handleSubmitFeedback = async () => {
    console.log("Submit clicked", {
      userName,
      location,
      category,
      description,
    });
    if (
      !userName ||
      !location ||
      !category ||
      category === "Select a category" ||
      !description
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000";
      await apiService.post(`${baseUrl}/api/feedback`, {
        userName,
        location,
        category,
        message: description,
      });

      setUserName("");
      setLocation("");
      setCategory("");
      setDescription("");
      setIsModalOpen(false);
      await refresh();
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  const handleUpdateStatus = async (id: string, currentStatus: string) => {
    let nextStatus = "Pending";
    if (currentStatus === "Pending") nextStatus = "In Progress";
    else if (currentStatus === "In Progress") nextStatus = "Resolved";
    else if (currentStatus === "Resolved") nextStatus = "Pending";

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000";
      await apiService.patch(`${baseUrl}/api/feedback/${id}`, { status: nextStatus });
      await refresh();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Dynamic KPIs calculations
  const totalReports = feedbacks.length;
  const pendingCount = feedbacks.filter((f) => f.status === "Pending").length;
  const inProgressCount = feedbacks.filter(
    (f) => f.status === "In Progress",
  ).length;
  const resolvedCount = feedbacks.filter((f) => f.status === "Resolved").length;

  const activeReportsCount = pendingCount + inProgressCount;
  const resolutionRatePercent =
    totalReports > 0
      ? ((resolvedCount / totalReports) * 100).toFixed(1) + "%"
      : "0.0%";

  let sentimentLabel = "Neutral";
  if (totalReports > 0) {
    const rate = (resolvedCount / totalReports) * 100;
    if (rate > 80) sentimentLabel = "Good";
    else if (rate > 50) sentimentLabel = "Fair";
    else sentimentLabel = "Needs Action";
  } else {
    sentimentLabel = "Excellent";
  }

  const KPIS_DYNAMIC = [
    {
      title: "ACTIVE REPORTS",
      value: activeReportsCount.toString(),
      trend: "Live from DB",
      trendDirection: "neutral" as const,
      iconColorClass: "text-[#ba1a1a]",
      iconBgClass: "bg-[#ffdad6]",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      ),
    },
    {
      title: "AVG RESPONSE TIME",
      value: "2.4h",
      trend: "Overall avg",
      trendDirection: "neutral" as const,
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
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      ),
    },
    {
      title: "RESOLUTION RATE",
      value: resolutionRatePercent,
      trend: `${resolvedCount} of ${totalReports}`,
      trendDirection: "neutral" as const,
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
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      ),
    },
    {
      title: "COMMUNITY SENTIMENT",
      value: sentimentLabel,
      trend: "Live updates",
      trendDirection: "neutral" as const,
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
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
          <line x1="9" y1="9" x2="9.01" y2="9"></line>
          <line x1="15" y1="9" x2="15.01" y2="9"></line>
        </svg>
      ),
    },
  ];

  // Filtering Logic
  const filteredFeedbacks = feedbacks.filter((item) => {
    const statusVal = statusFilter.startsWith("Status: ")
      ? statusFilter.replace("Status: ", "")
      : statusFilter;
    const matchesStatus = statusVal === "All" || item.status === statusVal;

    const catVal = categoryFilter.startsWith("Category: ")
      ? categoryFilter.replace("Category: ", "")
      : categoryFilter;
    const matchesCategory = catVal === "All" || item.category === catVal;

    return matchesStatus && matchesCategory;
  });

  const totalPages = Math.max(1, Math.ceil(filteredFeedbacks.length / itemsPerPage));
  const paginatedFeedbacks = filteredFeedbacks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Community Feedback Report", 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 30);

    const tableData = filteredFeedbacks.map((item) => [
      item.userName,
      item.location,
      item.category,
      item.status,
      formatDate(item.createdAt),
    ]);

    autoTable(doc, {
      startY: 40,
      head: [["User", "Location", "Category", "Status", "Date"]],
      body: tableData,
      theme: "grid",
      headStyles: { fillColor: [0, 108, 73] },
    });

    doc.save("smartsort-feedback-report.pdf");
  };

  return (
    <PageLayout
      title="Community Feedback"
      description="Manage and resolve facility operational reports."
      actions={
        <>
          <button
            onClick={handleExportPDF}
            className="flex items-center gap-2 px-4 py-2 bg-card border border-border text-muted-foreground font-medium text-xs rounded-lg hover:bg-background dark:hover:bg-secondary transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Export PDF
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white font-medium text-xs rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Manual Entry
          </button>
        </>
      }
    >
      {/* KPIs Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {KPIS_DYNAMIC.map((kpi, idx) => (
          <MetricCard
            key={idx}
            title={kpi.title}
            value={kpi.value}
            trend={kpi.trend}
            trendDirection={kpi.trendDirection}
            iconColorClass={kpi.iconColorClass}
            iconBgClass={kpi.iconBgClass}
            iconSvg={kpi.icon}
          />
        ))}
      </div>

      {/* Main Feedback Table Container */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden mt-6 flex flex-col min-h-[400px]">
        {/* Filters Header */}
        <div className="px-6 py-4 border-b border-[#f1f5f9] dark:border-[#0f2942] flex items-center justify-between bg-background dark:bg-secondary">
          <div className="flex items-center gap-4">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                ></path>
              </svg>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="block pl-9 pr-10 py-1.5 border border-border rounded-lg bg-card text-muted-foreground text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#006c49]/20 appearance-none outline-none"
              >
                <option>Status: All</option>
                <option>Pending</option>
                <option>In Progress</option>
                <option>Resolved</option>
              </select>
            </div>
            <div className="relative">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="block px-4 py-1.5 border border-border rounded-lg bg-card text-muted-foreground text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#006c49]/20 appearance-none pr-8 outline-none"
              >
                <option>Category: All</option>
                <option>Overflowing Bin</option>
                <option>Wrong Category</option>
                <option>Odor</option>
                <option>Missed Collection</option>
                <option>Damaged Equipment</option>
                <option>Illegal Dumping</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <div className="text-xs text-muted-foreground font-medium hidden sm:block">
            Showing {filteredFeedbacks.length} of {feedbacks.length} entries
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex flex-col gap-4 p-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex gap-4 items-center">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-6 flex-1" />
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-6 w-20" />
                </div>
              ))}
            </div>
          ) : filteredFeedbacks.length === 0 ? (
            <div className="flex items-center justify-center p-12 text-muted-foreground text-sm font-medium">
              No reports found matching selected filters.
            </div>
          ) : (
            <Table className="min-w-[800px]">
              <TableHeader>
                <TableRow className="hover:bg-transparent bg-card text-muted-foreground text-[11px] font-bold uppercase tracking-wider border-b border-border">
                  <TableHead className="px-6 py-4">User / Location</TableHead>
                  <TableHead className="px-6 py-4">Issue Category</TableHead>
                  <TableHead className="px-6 py-4">Description</TableHead>
                  <TableHead className="px-6 py-4">Status</TableHead>
                  <TableHead className="px-6 py-4">Reported At</TableHead>
                  <TableHead className="px-6 py-4 text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedFeedbacks.map((item) => (
                  <TableRow
                    key={item.id}
                    className="hover:bg-background dark:hover:bg-secondary transition-colors border-b border-[#f1f5f9]"
                  >
                    <TableCell className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shadow-sm border border-primary/20">
                          {getInitials(item.userName)}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-foreground dark:text-white text-[15px] tracking-tight">
                            {item.userName || "Unknown User"}
                          </span>
                          <span className="text-slate-500 dark:text-slate-400 text-xs font-medium flex items-center gap-1 mt-0.5">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                            {item.location || "Unknown Location"}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge
                        label={item.category}
                        variant={getCategoryVariant(item.category) as any}
                      />
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <p
                        className="text-slate-700 dark:text-slate-300 text-[13px] leading-relaxed font-medium line-clamp-2 max-w-[250px]"
                        title={item.message}
                      >
                        {item.message}
                      </p>
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge
                        label={item.status}
                        variant={getStatusVariant(item.status) as any}
                        hasDot
                      />
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap text-muted-foreground text-xs font-mono">
                      {formatDate(item.createdAt)}
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end gap-1.5">
                        <button
                          className="p-1.5 text-muted-foreground hover:text-[#006c49] hover:bg-primary/10 rounded-lg transition-colors cursor-pointer"
                          title="Convert to Job"
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="12" y1="18" x2="12" y2="12"></line>
                            <line x1="9" y1="15" x2="15" y2="15"></line>
                          </svg>
                        </button>
                        <button
                          onClick={() =>
                            handleUpdateStatus(item.id, item.status)
                          }
                          className="p-1.5 text-muted-foreground hover:text-[#0284c7] hover:bg-[#0284c7]/10 rounded-lg transition-colors cursor-pointer"
                          title={`Update status: ${item.status === "Pending" ? "In Progress" : item.status === "In Progress" ? "Resolved" : "Pending"}`}
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                          </svg>
                        </button>
                        <button
                          className="p-1.5 text-muted-foreground hover:text-foreground dark:text-white hover:bg-[#e2e8f0] rounded-lg transition-colors cursor-pointer"
                          title="View Details"
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        {/* Pagination Footer */}
        <div className="px-6 py-4 border-t border-[#f1f5f9] dark:border-[#0f2942] flex items-center justify-between mt-auto bg-card">
          <div className="text-xs text-muted-foreground">
            Page{" "}
            <span className="font-bold text-foreground dark:text-white">{currentPage}</span>{" "}
            of {totalPages}
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-1 text-muted-foreground hover:text-foreground dark:text-white disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            {Array.from({ length: totalPages }).map((_, idx) => {
              const page = idx + 1;
              const isActive = page === currentPage;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${
                    isActive
                      ? "bg-primary/10 text-[#006c49]"
                      : "text-muted-foreground font-medium hover:bg-muted dark:hover:bg-muted"
                  }`}
                >
                  {page}
                </button>
              );
            })}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1 text-muted-foreground hover:text-foreground dark:text-white disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed transition-colors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Contextual Insights / Bento Grid Element */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-foreground dark:text-white text-sm tracking-wide">
              Feedback Volume Trend
            </h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-[#10b981]"></span>
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Reports
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-[#0284c7]"></span>
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Resolved
                </span>
              </div>
            </div>
          </div>

          <div className="h-48 w-full relative flex items-end gap-3 pb-4">
            <div className="flex-1 flex flex-col justify-end h-full gap-1 group">
              <div className="w-full bg-[#10b981]/20 h-1/4 rounded-t-sm group-hover:bg-[#10b981]/30 transition-colors"></div>
              <div className="w-full bg-[#0284c7]/20 h-1/6 rounded-t-sm group-hover:bg-[#0284c7]/30 transition-colors"></div>
              <span className="text-[10px] text-muted-foreground text-center mt-2 font-bold uppercase">
                Mon
              </span>
            </div>
            <div className="flex-1 flex flex-col justify-end h-full gap-1 group">
              <div className="w-full bg-[#10b981]/40 h-2/4 rounded-t-sm group-hover:bg-[#10b981]/50 transition-colors"></div>
              <div className="w-full bg-[#0284c7]/40 h-1/4 rounded-t-sm group-hover:bg-[#0284c7]/50 transition-colors"></div>
              <span className="text-[10px] text-muted-foreground text-center mt-2 font-bold uppercase">
                Tue
              </span>
            </div>
            <div className="flex-1 flex flex-col justify-end h-full gap-1 group">
              <div className="w-full bg-[#10b981] h-4/5 rounded-t-sm transition-colors"></div>
              <div className="w-full bg-[#0284c7] h-3/5 rounded-t-sm transition-colors"></div>
              <span className="text-[10px] text-foreground dark:text-white text-center mt-2 font-bold uppercase">
                Wed
              </span>
            </div>
            <div className="flex-1 flex flex-col justify-end h-full gap-1 group">
              <div className="w-full bg-[#10b981]/40 h-2/5 rounded-t-sm group-hover:bg-[#10b981]/50 transition-colors"></div>
              <div className="w-full bg-[#0284c7]/40 h-1/5 rounded-t-sm group-hover:bg-[#0284c7]/50 transition-colors"></div>
              <span className="text-[10px] text-muted-foreground text-center mt-2 font-bold uppercase">
                Thu
              </span>
            </div>
            <div className="flex-1 flex flex-col justify-end h-full gap-1 group">
              <div className="w-full bg-[#10b981]/60 h-3/5 rounded-t-sm group-hover:bg-[#10b981]/70 transition-colors"></div>
              <div className="w-full bg-[#0284c7]/60 h-2/5 rounded-t-sm group-hover:bg-[#0284c7]/70 transition-colors"></div>
              <span className="text-[10px] text-muted-foreground text-center mt-2 font-bold uppercase">
                Fri
              </span>
            </div>
            <div className="flex-1 flex flex-col justify-end h-full gap-1 group">
              <div className="w-full bg-[#10b981]/20 h-1/5 rounded-t-sm group-hover:bg-[#10b981]/30 transition-colors"></div>
              <div className="w-full bg-[#0284c7]/20 h-1/6 rounded-t-sm group-hover:bg-[#0284c7]/30 transition-colors"></div>
              <span className="text-[10px] text-muted-foreground text-center mt-2 font-bold uppercase">
                Sat
              </span>
            </div>
            <div className="flex-1 flex flex-col justify-end h-full gap-1 group">
              <div className="w-full bg-[#10b981]/20 h-[10%] rounded-t-sm group-hover:bg-[#10b981]/30 transition-colors"></div>
              <div className="w-full bg-[#0284c7]/20 h-[5%] rounded-t-sm group-hover:bg-[#0284c7]/30 transition-colors"></div>
              <span className="text-[10px] text-muted-foreground text-center mt-2 font-bold uppercase">
                Sun
              </span>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 text-white flex flex-col justify-between overflow-hidden relative shadow-lg">
          <div className="relative z-10">
            <span className="text-[#10b981] font-bold text-[10px] uppercase tracking-widest">
              Sustainability Highlight
            </span>
            <h3 className="text-3xl font-bold mt-3 text-white">4.2 Tons</h3>
            <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
              Diverted through proactive user reporting this month.
            </p>
          </div>
          <div className="relative z-10 mt-8">
            <button className="w-full py-2.5 bg-primary text-white font-bold text-xs rounded-lg hover:bg-primary/90 transition-colors shadow-sm tracking-wide">
              View Impact Report
            </button>
          </div>
          {/* Decorative background pattern */}
          <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-primary/40 rounded-full blur-3xl"></div>
          <div className="absolute right-4 top-4 text-[#006c49]/30">
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Manual Entry Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-card border border-border rounded-xl shadow-md w-full max-w-lg p-0 gap-0 overflow-hidden flex flex-col">
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-[#f1f5f9] dark:border-[#0f2942] text-left sm:text-left flex flex-col gap-1">
            <DialogTitle className="text-xl font-semibold text-foreground dark:text-white">
              Add Feedback
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground mt-0.5">
              Manually submit a community report or observation.
            </DialogDescription>
          </DialogHeader>

          {/* Body */}
          <div className="px-6 py-5 flex flex-col gap-5">
            {/* User / Location row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                id="feedback-user"
                label="User Name"
                placeholder="e.g. Jane Simmons"
                value={userName}
                onChange={setUserName}
              />
              <InputField
                id="feedback-location"
                label="Location"
                placeholder="e.g. Bldg A - Floor 4"
                value={location}
                onChange={setLocation}
              />
            </div>

            {/* Issue Category */}
            <SelectField
              id="feedback-category"
              label="Issue Category"
              options={ISSUE_CATEGORIES}
              value={category}
              onChange={setCategory}
            />

            {/* Feedback Description */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="feedback-description"
                className="text-sm font-medium text-muted-foreground"
              >
                Feedback Description
              </label>
              <textarea
                id="feedback-description"
                rows={4}
                placeholder="Describe the issue in detail..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="px-3 py-2.5 border border-border rounded-lg text-sm bg-card text-foreground dark:text-white placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:border-[#006c49] focus:ring-[#006c49]/10 transition-all resize-none"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 pb-6 pt-2 flex items-center gap-3">
            <button
              onClick={() => setIsModalOpen(false)}
              className="flex-1 h-11 border border-border text-muted-foreground text-sm font-semibold rounded-lg hover:bg-background dark:hover:bg-secondary transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitFeedback}
              className="flex-1 h-11 bg-primary hover:bg-primary/90 active:scale-[0.98] text-white text-sm font-semibold rounded-lg transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 2L11 13" />
                <path d="M22 2L15 22L11 13L2 9L22 2Z" />
              </svg>
              Submit Feedback
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
}
