import React from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { useTranslation } from "react-i18next";
import { AlertTriangle, AlertCircle, Info, Bell, X, ChevronRight, ArrowRight } from "lucide-react";

interface Alert {
  id: string;
  timestamp: string;
  type: string;
  device: string;
  severity: "CRITICAL" | "WARNING" | "INFO";
  message: string;
  status: string;
}

const RECENT_ALERTS: Alert[] = [
  {
    id: "ALT-9921",
    timestamp: "14:32:01",
    type: "Hardware Failure",
    device: "SS-UNIT-042",
    severity: "CRITICAL",
    message: "Conveyor belt motor jammed",
    status: "Active",
  },
  {
    id: "ALT-9920",
    timestamp: "14:15:22",
    type: "Sensor Calibration",
    device: "SS-UNIT-015",
    severity: "WARNING",
    message: "Optical sensor B variance detected",
    status: "Active",
  },
  {
    id: "ALT-9919",
    timestamp: "13:45:10",
    type: "Network Disconnect",
    device: "SS-UNIT-089",
    severity: "CRITICAL",
    message: "Lost connection to local hub",
    status: "Active",
  },
  {
    id: "ALT-9918",
    timestamp: "13:12:05",
    type: "Bin Full",
    device: "SS-UNIT-104",
    severity: "WARNING",
    message: "Organic bin capacity at 95%",
    status: "Active",
  },
  {
    id: "ALT-9917",
    timestamp: "11:30:00",
    type: "Maintenance",
    device: "SS-UNIT-003",
    severity: "INFO",
    message: "Scheduled firmware update complete",
    status: "Resolved",
  },
];

interface AlertsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const severityConfig = {
  CRITICAL: {
    dotColor: "bg-[#ba1a1a]",
    bgColor: "bg-[#ffdad6]/20",
    textColor: "text-[#ba1a1a]",
    borderColor: "border-[#ba1a1a]/20",
    icon: <AlertTriangle className="w-3.5 h-3.5" strokeWidth={2.5} />,
  },
  WARNING: {
    dotColor: "bg-[#d97706]",
    bgColor: "bg-[#fef3c7]/40",
    textColor: "text-[#d97706]",
    borderColor: "border-[#d97706]/20",
    icon: <AlertCircle className="w-3.5 h-3.5" strokeWidth={2.5} />,
  },
  INFO: {
    dotColor: "bg-[#0284c7]",
    bgColor: "bg-[#e0f2fe]/40",
    textColor: "text-[#0284c7]",
    borderColor: "border-[#0284c7]/20",
    icon: <Info className="w-3.5 h-3.5" strokeWidth={2.5} />,
  },
};

// Motion stagger variants for cascading item entrance
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.15, // Wait for side panel entry
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 25 },
  },
} as const;

export function AlertsSidebar({ isOpen, onClose }: AlertsSidebarProps) {
  const { t } = useTranslation();
  const activeCount = RECENT_ALERTS.filter((a) => a.status === "Active").length;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/10 backdrop-blur-[2px] z-[60]"
            onClick={onClose}
          />

          {/* Sidebar panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 220 }}
            className="fixed top-0 right-0 h-full w-[400px] max-w-[90vw] bg-white/80 dark:bg-card/80 backdrop-blur-md border-l border-border/40 dark:border-border/40 shadow-md z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border/40 dark:border-border/40 bg-transparent flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#ffdad6]/30 flex items-center justify-center text-[#ba1a1a]">
                  <Bell className="w-[18px] h-[18px]" strokeWidth={2.5} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-foreground dark:text-white">
                    Notifications
                  </h2>
                  <p className="text-xs text-muted-foreground font-medium">
                    {activeCount} active alert{activeCount !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground dark:text-white hover:bg-muted dark:hover:bg-muted transition-colors cursor-pointer"
                aria-label="Close notifications"
              >
                <X className="w-[18px] h-[18px]" strokeWidth={2.5} />
              </button>
            </div>

            {/* Alert list */}
            <div className="flex-1 overflow-y-auto px-4 py-3">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="flex flex-col gap-2"
              >
                {RECENT_ALERTS.map((alert) => {
                  const config = severityConfig[alert.severity];

                  return (
                    <motion.div key={alert.id} variants={itemVariants}>
                      <Link
                        to="/alerts"
                        onClick={onClose}
                        className={`group block rounded-xl border ${config.borderColor} ${config.bgColor} p-4 no-underline hover:shadow-md transition-all duration-200 cursor-pointer`}
                      >
                        <div className="flex items-start gap-3">
                          {/* Severity icon */}
                          <div
                            className={`w-8 h-8 rounded-lg ${config.bgColor} ${config.textColor} flex items-center justify-center flex-shrink-0 mt-0.5`}
                          >
                            {config.icon}
                          </div>

                          <div className="flex-1 min-w-0">
                            {/* Top row: severity + timestamp */}
                            <div className="flex items-center justify-between mb-1">
                              <span
                                className={`text-[10px] font-bold ${config.textColor} uppercase tracking-widest`}
                              >
                                {alert.severity}
                              </span>
                              <span className="text-[10px] font-medium text-muted-foreground">
                                {alert.timestamp}
                              </span>
                            </div>

                            {/* Message */}
                            <p className="text-sm font-semibold text-foreground dark:text-white mb-1 leading-snug">
                              {alert.message}
                            </p>

                            {/* Meta row */}
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono text-muted-foreground">
                                {alert.device}
                              </span>
                              <span className="text-muted-foreground">·</span>
                              <span className="text-xs text-muted-foreground">
                                {alert.type}
                              </span>
                            </div>
                          </div>

                          <ChevronRight
                            className="w-3.5 h-3.5 text-muted-foreground group-hover:text-[#006c49] transition-colors flex-shrink-0 mt-1"
                            strokeWidth={2.5}
                          />
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-border/40 dark:border-border/40 bg-background/50 dark:bg-secondary/50 flex-shrink-0">
              <Link
                to="/alerts"
                onClick={onClose}
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white text-sm font-semibold rounded-xl px-4 py-3 transition-colors no-underline"
              >
                {t("alertsSidebar.viewAll")}
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
