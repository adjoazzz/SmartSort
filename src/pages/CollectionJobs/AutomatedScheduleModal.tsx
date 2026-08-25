import React, { useState } from "react";
import {
  Zap,
  Sliders,
  Users,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Clock,
  ShieldCheck,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../components/ui/dialog";
import { toast } from "sonner";
import { authFetch } from "../../lib/authFetch";

interface AutomatedScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScheduledSuccess: () => void;
}

export function AutomatedScheduleModal({
  isOpen,
  onClose,
  onScheduledSuccess,
}: AutomatedScheduleModalProps) {
  const [threshold, setThreshold] = useState<number>(80);
  const [autoAssign, setAutoAssign] = useState<boolean>(true);
  const [escalateOverdue, setEscalateOverdue] = useState<boolean>(true);
  const [batchRadius, setBatchRadius] = useState<string>("same_facility");
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const baseUrl =
    (import.meta as any).env?.VITE_API_BASE_URL ?? "http://localhost:5000";

  const handleRunAutoScheduler = async () => {
    setIsRunning(true);
    try {
      const response = await authFetch(`${baseUrl}/api/jobs/auto-schedule`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          threshold,
          autoAssign,
          escalateOverdue,
          batchRadius,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to execute automated collection scheduler");
      }

      const result = await response.json();
      if (result.createdCount > 0) {
        toast.success(
          `⚡ Auto-Scheduler Created ${result.createdCount} Job(s)!`,
          {
            description: `Bins ≥${threshold}% capacity queued and prioritized for human collectors.`,
          },
        );
      } else {
        toast.info(
          result.message || "All bins are within capacity. No new jobs needed.",
        );
      }

      onScheduledSuccess();
      onClose();
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to trigger auto-scheduler");
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xl bg-card border-border p-6 shadow-2xl rounded-2xl">
        <DialogHeader className="border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-inner">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-foreground flex items-center gap-2">
                Automated Collection Scheduler
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Configure rule-based automatic dispatch for IoT smart bins
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex flex-col gap-5 py-3">
          {/* Rule 1: Fill Threshold */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-secondary/30 border border-border/80 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold text-foreground">
                  Bin Capacity Trigger Threshold
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-primary/10 text-primary">
                ≥ {threshold}% Full
              </span>
            </div>
            <input
              type="range"
              min={60}
              max={95}
              step={5}
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground font-medium">
              <span>60% (Proactive)</span>
              <span>80% (Recommended)</span>
              <span>95% (Critical Only)</span>
            </div>
          </div>

          {/* Rule 2: Auto Assignment & Collector Matching */}
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-xs text-foreground block">
                  Auto-Assign to Active Collectors
                </strong>
                <span className="text-[11px] text-muted-foreground">
                  Distribute jobs evenly across online collectors in the same
                  zone
                </span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={autoAssign}
              onChange={(e) => setAutoAssign(e.target.checked)}
              className="w-4 h-4 rounded text-primary focus:ring-primary border-border cursor-pointer"
            />
          </div>

          {/* Rule 3: Priority Escalation */}
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-xs text-foreground block">
                  Automatic Urgency Escalation
                </strong>
                <span className="text-[11px] text-muted-foreground">
                  Escalate bins ≥95% to 'Urgent' and bins ≥85% to 'High'
                  priority
                </span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={escalateOverdue}
              onChange={(e) => setEscalateOverdue(e.target.checked)}
              className="w-4 h-4 rounded text-primary focus:ring-primary border-border cursor-pointer"
            />
          </div>

          {/* Policy Information Note */}
          <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-[11.5px] text-muted-foreground leading-relaxed">
              When triggered, SmartSort scans all connected IoT bins across your
              facilities. Bins exceeding{" "}
              <strong className="text-foreground">{threshold}%</strong> that
              don't already have open jobs will be batched into optimized
              collection routes.
            </p>
          </div>
        </div>

        <DialogFooter className="border-t border-border pt-4 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-xl border border-border text-foreground hover:bg-slate-100 dark:hover:bg-secondary transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleRunAutoScheduler}
            disabled={isRunning}
            className="px-5 py-2 text-xs font-bold rounded-xl bg-amber-600 hover:bg-amber-700 text-white shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRunning ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Evaluating & Dispatching...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                Run Auto-Scheduler Now
              </>
            )}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
