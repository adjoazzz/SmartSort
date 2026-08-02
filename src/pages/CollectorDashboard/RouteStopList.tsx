import React from "react";
import { Navigation, Check } from "lucide-react";
import { StatusBadge } from "../../components/StatusBadge";
import { Progress } from "../../components/ui/progress";
import type { CollectorJob } from "./collectorTypes";

interface RouteStopListProps {
  jobs: CollectorJob[];
  selectedJobId: string | null;
  onSelect: (id: string) => void;
  onNavigate: (id: string) => void;
  onMarkDone: (id: string) => void;
}

export function RouteStopList({
  jobs,
  selectedJobId,
  onSelect,
  onNavigate,
  onMarkDone,
}: RouteStopListProps) {
  return (
    <div className="bg-card border border-border rounded-xl shadow-sm p-4 flex flex-col h-full">
      <h3 className="text-sm font-black text-foreground dark:text-white uppercase tracking-wider mb-4 border-b border-[#f1f5f9] dark:border-[#0f2942] pb-2">
        Route Stop Sequence
      </h3>

      <div className="flex flex-col gap-3 overflow-y-auto max-h-[500px] pr-1">
        {jobs.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground text-xs">
            No accepted jobs to display. Go back to dashboard to claim
            available tasks.
          </div>
        ) : (
          jobs.map((job, idx) => {
            const isSelected = selectedJobId === job.id;
            return (
              <div
                key={job.id}
                onClick={() => onSelect(job.id)}
                className={`border rounded-xl p-3.5 transition-all cursor-pointer relative ${
                  isSelected
                    ? "border-[#0284c7] dark:border-sky-500 bg-[#0284c7]/5 dark:bg-[#0c4a6e]/20 shadow-sm"
                    : "border-slate-100 dark:border-border hover:border-slate-200 dark:hover:border-border bg-card"
                }`}
              >
                {/* Step Indicator badge */}
                <span className="absolute top-3.5 left-3.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#0284c7] dark:bg-sky-500 text-white text-[10px] font-black">
                  {idx + 1}
                </span>

                <div className="pl-7 flex flex-col gap-1">
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-xs font-bold text-foreground dark:text-white truncate">
                      {job.location}
                    </span>
                    <StatusBadge
                      label={job.urgency}
                      variant={
                        job.urgency === "Critical"
                          ? "danger"
                          : job.urgency === "High"
                            ? "warning"
                            : "success"
                      }
                    />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                    {job.device} • {job.zone}
                  </span>

                  <div className="flex items-center gap-2 mt-2">
                    <Progress
                      value={job.fill}
                      className="w-16 h-1 bg-slate-100 dark:bg-slate-800 [&>[data-slot=progress-indicator]]:bg-[#ba1a1a] dark:[&>[data-slot=progress-indicator]]:bg-red-500"
                    />
                    <span className="text-[9px] font-bold text-[#ba1a1a] dark:text-red-400">
                      {job.fill}% Full
                    </span>
                  </div>

                  {/* Interactive HUD Trigger */}
                  <div
                    className="flex items-center gap-2 mt-3 pt-3 border-t border-[#f8fafc] dark:border-[#0f2942]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => onNavigate(job.id)}
                      className="flex-1 py-1.5 bg-[#0284c7] dark:bg-sky-600 text-white text-[10px] font-bold rounded-md hover:bg-[#0369a1] dark:hover:bg-sky-700 transition-colors flex items-center justify-center gap-1 shadow-sm cursor-pointer"
                    >
                      <Navigation className="w-2.5 h-2.5" strokeWidth={3} />
                      Navigate
                    </button>
                    <button
                      onClick={() => onMarkDone(job.id)}
                      className="flex-1 py-1.5 bg-primary text-white text-[10px] font-bold rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-1 shadow-sm cursor-pointer"
                    >
                      <Check className="w-2.5 h-2.5" strokeWidth={3} />
                      Mark Done
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
