import React from "react";
import { CheckSquare, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { CollectorJob } from "./collectorTypes";

interface CompletionChecklistProps {
  job: CollectorJob | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (jobId: string) => void;
}

const CHECKLIST_ITEMS = [
  "Bin has been physically emptied",
  "Area around the bin is clean",
  "Bin lid is properly closed",
  "Device is functioning normally",
];

export function CompletionChecklist({
  job,
  isOpen,
  onClose,
  onConfirm,
}: CompletionChecklistProps) {
  return (
    <AnimatePresence>
      {isOpen && job && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-card/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
        >
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="bg-card border border-border rounded-xl w-full max-w-sm p-6 shadow-md flex flex-col gap-5"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 text-[#006c49] dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckSquare className="w-5 h-5" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-foreground dark:text-white">
                    Task Completion Checklist
                  </h3>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                    {job.location}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors mt-0.5"
              >
                <X className="w-[18px] h-[18px]" strokeWidth={2.5} />
              </button>
            </div>

            {/* Job details strip */}
            <div className="bg-slate-50 dark:bg-secondary rounded-xl px-4 py-3 flex justify-between items-center border border-slate-100 dark:border-border">
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Device
              </span>
              <span className="text-[11px] font-mono font-bold text-foreground dark:text-white">
                {job.device}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Fill
              </span>
              <span className="text-[11px] font-bold text-[#ba1a1a] dark:text-red-400">
                {job.fill}%
              </span>
            </div>

            {/* Reminder checklist */}
            <div className="flex flex-col gap-2.5">
              <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Before marking complete, confirm:
              </p>
              {CHECKLIST_ITEMS.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="mt-0.5 h-4 w-4 rounded border border-[#006c49] dark:border-emerald-500 bg-primary/10 flex items-center justify-center shrink-0">
                    <Check
                      className="w-[9px] h-[9px] text-[#006c49] dark:text-emerald-400"
                      strokeWidth={3.5}
                    />
                  </div>
                  <span className="text-xs text-foreground dark:text-muted-foreground">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 pt-1 border-t border-slate-100 dark:border-[#0f2942]">
              <button
                onClick={onClose}
                className="flex-1 py-2.5 border border-slate-200 dark:border-border text-slate-500 dark:text-slate-400 text-xs font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-secondary transition-colors cursor-pointer"
              >
                Not Yet
              </button>
              <button
                onClick={() => onConfirm(job.id)}
                className="flex-1 py-2.5 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Check className="w-[13px] h-[13px]" strokeWidth={3} />
                Confirm Complete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
