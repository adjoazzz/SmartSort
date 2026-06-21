import { authFetch } from "../../lib/authFetch";
import React, { useState } from "react";
import { PageLayout } from "../../components/PageLayout";
import { StatusBadge } from "../../components/StatusBadge";
import { CollectorProfileModal } from "./CollectorProfileModal";
import { InviteCollectorModal } from "./InviteCollectorModal";
import { usePollingFetch } from "../../hooks/usePollingFetch";

interface Collector {
  id: string;
  name: string;
  region: string;
  status: string;
  rating: number;
  email?: string | null;
  joinedAt?: string;
}

const API_BASE_URL =
  (import.meta as any).env?.VITE_API_BASE_URL ?? "http://localhost:5000";

export default function Collectors() {
  const [selectedCollector, setSelectedCollector] = useState<Collector | null>(
    null,
  );
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCollectors = async () => {
    const searchParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(searchTerm ? { search: searchTerm } : {})
    });
    const response = await authFetch(`${API_BASE_URL}/api/collectors?${searchParams}`);

    if (!response.ok) {
      throw new Error("Failed to fetch collectors");
    }

    return response.json();
  };

  const {
    data: collectorsResponse,
    isLoading,
    refresh,
  } = usePollingFetch<any>(fetchCollectors, {
    intervalMs: 5000,
  });

  const collectors = collectorsResponse?.data || [];
  const totalCount = collectorsResponse?.totalCount || 0;
  const totalPages = collectorsResponse?.totalPages || 1;

  // The server handles search now, so we just use the raw array
  const filteredCollectors = collectors;

  return (
    <PageLayout
      title="Collectors"
      description="Manage and track collection personnel across all sectors."
      actions={
        <button
          onClick={() => setIsInviteModalOpen(true)}
          className="bg-[#006c49] hover:bg-[#005a3c] text-white text-sm font-medium rounded-lg px-4 py-2 transition-colors"
        >
          <span className="text-lg font-bold">+</span> Add New Collector
        </button>
      }
    >
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[#f1f5f9] dark:border-[#0f2942] flex flex-col sm:flex-row justify-between items-start sm:items-center bg-background dark:bg-secondary gap-4">
          <h2 className="text-lg font-semibold text-foreground dark:text-white">
            Registered Personnel
          </h2>
          <div className="flex items-center w-full sm:w-auto min-w-[250px] bg-white dark:bg-[#0b1c30] rounded-lg border border-black dark:border-[#1e3a5f] focus-within:border-black dark:focus-within:border-[#334155] focus-within:shadow-sm transition-all overflow-hidden px-3.5 py-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2.5 dark:stroke-white"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Search collectors..."
              className="bg-transparent border-none outline-none text-sm font-medium text-[#0b1c30] dark:text-white placeholder-[#94a3b8] w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-card border-b border-[#f1f5f9] dark:border-[#0f2942]">
                <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Region
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="animate-pulse">
                    <td className="px-6 py-4">
                      <div className="h-4 w-24 bg-slate-200 dark:bg-muted rounded" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-32 bg-slate-200 dark:bg-muted rounded" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-28 bg-slate-200 dark:bg-muted rounded" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-16 bg-slate-200 dark:bg-muted rounded" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-6 w-20 bg-slate-200 dark:bg-muted rounded-full" />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="h-4 w-20 bg-slate-200 dark:bg-muted rounded ml-auto" />
                    </td>
                  </tr>
                ))
              ) : filteredCollectors.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-sm text-muted-foreground"
                  >
                    No collectors found.
                  </td>
                </tr>
              ) : (
                filteredCollectors.map((collector) => (
                  <tr
                    key={collector.id}
                    className="hover:bg-background dark:hover:bg-secondary transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-muted-foreground">
                      {collector.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-foreground dark:text-white">
                      {collector.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      {collector.region}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#006c49]">
                      ⭐ {collector.rating}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge
                        label={collector.status}
                        variant={
                          collector.status === "Active"
                            ? "success"
                            : collector.status === "Inactive"
                              ? "danger"
                              : "warning"
                        }
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => setSelectedCollector(collector)}
                        className="text-[#006c49] text-sm font-semibold hover:underline"
                      >
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="border-t border-border px-6 py-3 flex items-center justify-between bg-card">
            <span className="text-sm text-muted-foreground">
              Showing {collectors.length > 0 ? (page - 1) * limit + 1 : 0}-{Math.min(page * limit, totalCount)} of {totalCount} collectors
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-background cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>

              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages || totalPages === 0}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-background cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <CollectorProfileModal
        isOpen={!!selectedCollector}
        onClose={() => setSelectedCollector(null)}
        collector={selectedCollector}
        onSaved={refresh}
      />

      <InviteCollectorModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onCreated={refresh}
      />
    </PageLayout>
  );
}
