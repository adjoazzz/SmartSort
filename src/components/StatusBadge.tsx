import React from "react";

export interface StatusBadgeProps {
  label: string;
  variant?: "danger" | "success" | "warning" | "info" | "neutral";
  hasDot?: boolean;
}

export function StatusBadge({
  label,
  variant = "neutral",
  hasDot = false,
}: StatusBadgeProps) {
  const styles = {
    danger: {
      bg: "bg-[#ffdad6]",
      text: "text-[#ba1a1a]",
      dot: "bg-[#ba1a1a]",
    },
    success: {
      bg: "bg-[#bbf7d0]",
      text: "text-[#006c49]",
      dot: "bg-[#10b981]",
    },
    warning: {
      bg: "bg-[#fef3c7]",
      text: "text-[#d97706]",
      dot: "bg-[#f59e0b]",
    },
    info: {
      bg: "bg-[#e0f2fe]",
      text: "text-[#0284c7]",
      dot: "bg-[#38bdf8]",
    },
    neutral: {
      bg: "bg-muted",
      text: "text-muted-foreground",
      dot: "bg-[#94a3b8]",
    },
  };

  const currentStyle = styles[variant];

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded ${currentStyle.bg}`}
    >
      {hasDot && <div className={`w-2 h-2 rounded-full ${currentStyle.dot}`} />}
      <span
        className={`text-[10px] font-bold tracking-wider uppercase ${currentStyle.text}`}
      >
        {label}
      </span>
    </div>
  );
}
