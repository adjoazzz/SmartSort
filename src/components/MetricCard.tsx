import React from "react";
import { Link } from "react-router";
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";

export interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: string;
  trendDirection?: "up" | "down" | "neutral";
  iconColorClass?: string;
  iconBgClass?: string;
  iconSvg?: React.ReactNode;
  linkTo?: string;
}

export function MetricCard({
  title,
  value,
  trend,
  trendDirection = "neutral",
  iconColorClass = "text-[#006c49]",
  iconBgClass = "bg-[#10b981]/10",
  iconSvg,
  linkTo,
}: MetricCardProps) {
  // Determine trend styling
  let trendColor = "text-muted-foreground";
  if (trendDirection === "up") trendColor = "text-[#006c49]";
  if (trendDirection === "down") trendColor = "text-[#ba1a1a]";

  const cardContent = (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {title}
        </h3>

        {iconSvg && (
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${iconBgClass} ${iconColorClass}`}
          >
            {iconSvg}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1 mt-2">
        <div className="flex items-center justify-between">
          <span className="text-3xl font-extrabold text-foreground dark:text-white tracking-tight">
            {value}
          </span>
          {linkTo && (
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-[#006c49] transition-colors" strokeWidth={2} />
          )}
        </div>

        {trend && (
          <div className="flex items-center gap-1.5">
            {trendDirection === "up" && (
              <TrendingUp className="w-3 h-3 text-[#006c49]" strokeWidth={3} />
            )}
            {trendDirection === "down" && (
              <TrendingDown className="w-3 h-3 text-[#ba1a1a]" strokeWidth={3} />
            )}
            {trendDirection === "neutral" && (
              <div className="w-2.5 h-2.5 rounded-full bg-[#515f74]/20 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-[#515f74]"></div>
              </div>
            )}
            <span className={`text-sm font-medium ${trendColor}`}>{trend}</span>
          </div>
        )}
      </div>
    </>
  );

  const baseClasses =
    "bg-card border border-border rounded-xl p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all min-h-[150px] group";

  if (linkTo) {
    return (
      <Link
        to={linkTo}
        data-testid="metric-card"
        className={`${baseClasses} hover:border-[#006c49]/30 cursor-pointer no-underline active:scale-[0.98]`}
      >
        {cardContent}
      </Link>
    );
  }

  return <div data-testid="metric-card" className={baseClasses}>{cardContent}</div>;
}
