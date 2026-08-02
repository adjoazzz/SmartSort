import React, { useEffect, useState } from "react";
import { Navigation, X, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { CollectorJob } from "./collectorTypes";
import { NAV_INSTRUCTIONS } from "./collectorTypes";

interface NavigationHUDProps {
  job: CollectorJob | null;
  isOpen: boolean;
  onClose: () => void;
  onArrived: (jobId: string) => void;
}

export function NavigationHUD({
  job,
  isOpen,
  onClose,
  onArrived,
}: NavigationHUDProps) {
  const [navStep, setNavStep] = useState(0);
  const [navDistance, setNavDistance] = useState(120);

  // Reset and start the simulated navigation timer when opened
  useEffect(() => {
    if (!isOpen || !job) return;

    setNavStep(0);
    setNavDistance(120);

    const interval = setInterval(() => {
      setNavDistance((prev) => {
        if (prev <= 10) {
          setNavStep((step) => {
            if (step >= NAV_INSTRUCTIONS.length - 1) {
              clearInterval(interval);
              return step;
            }
            return step + 1;
          });
          return 80;
        }
        return prev - 20;
      });
    }, 1800);

    return () => clearInterval(interval);
  }, [isOpen, job]);

  return (
    <AnimatePresence>
      {isOpen && job && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-card/85 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-card border border-border rounded-xl max-w-md w-full p-6 shadow-md relative overflow-hidden flex flex-col gap-6"
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b border-[#f1f5f9] dark:border-[#0f2942] pb-3">
              <div className="flex items-center gap-2 text-[#0284c7] dark:text-sky-400">
                <Navigation
                  className="w-[18px] h-[18px]"
                  strokeWidth={2.5}
                />
                <span className="text-sm font-bold tracking-wider uppercase">
                  Active HUD Navigation
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground dark:hover:text-white transition-colors"
              >
                <X className="w-5 h-5" strokeWidth={2} />
              </button>
            </div>

            {/* Direction compass + distance */}
            <div className="flex flex-col items-center text-center gap-4 bg-slate-50 dark:bg-secondary/60 rounded-xl p-5 border border-slate-100 dark:border-border">
              <div className="relative h-20 w-20 flex items-center justify-center bg-card rounded-full shadow-md border border-border">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-700 animate-pulse"
                  style={{ transform: `rotate(${navStep * 90}deg)` }}
                >
                  <line x1="12" y1="19" x2="12" y2="5" />
                  <polyline points="5 12 12 5 19 12" />
                </svg>
              </div>

              <div className="flex flex-col">
                <span className="text-3xl font-black text-foreground dark:text-white tracking-tight">
                  {navDistance}{" "}
                  <span className="text-base font-bold text-slate-400 dark:text-slate-500">
                    feet
                  </span>
                </span>
                <span className="text-sm font-semibold text-[#0284c7] dark:text-sky-400 mt-1">
                  {NAV_INSTRUCTIONS[navStep]}
                </span>
              </div>
            </div>

            {/* Destination details */}
            <div className="flex flex-col gap-2 border-t border-[#f1f5f9] dark:border-[#0f2942] pt-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Destination
                </span>
                <span className="text-xs font-mono font-bold text-foreground dark:text-white">
                  {job.device}
                </span>
              </div>
              <p className="text-sm font-bold text-foreground dark:text-white">
                {job.location}
              </p>
              <p className="text-xs text-muted-foreground">{job.zone}</p>
            </div>

            {/* Arrived button */}
            <button
              onClick={() => {
                onClose();
                onArrived(job.id);
              }}
              className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle className="w-4 h-4" strokeWidth={3} />
              Arrived at Destination
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
