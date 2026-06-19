import React from 'react';
import { Link } from 'react-router';

export interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  iconColorClass?: string;
  iconBgClass?: string;
  iconSvg?: React.ReactNode;
  linkTo?: string;
}

export function MetricCard({ 
  title, 
  value, 
  trend, 
  trendDirection = 'neutral',
  iconColorClass = 'text-[#006c49]',
  iconBgClass = 'bg-[#10b981]/10',
  iconSvg,
  linkTo
}: MetricCardProps) {
  
  // Determine trend styling
  let trendColor = 'text-muted-foreground';
  if (trendDirection === 'up') trendColor = 'text-[#006c49]';
  if (trendDirection === 'down') trendColor = 'text-[#ba1a1a]';

  const cardContent = (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {title}
        </h3>
        
        {iconSvg && (
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${iconBgClass} ${iconColorClass}`}>
            {iconSvg}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1 mt-2">
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-foreground dark:text-white tracking-tight">
            {value}
          </span>
          {linkTo && (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-muted-foreground group-hover:text-[#006c49] transition-colors">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
        
        {trend && (
          <div className="flex items-center gap-1.5">
            {trendDirection === 'up' && (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-[#006c49]">
                <path d="M23 6l-9.5 9.5-5-5L1 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17 6h6v6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
            {trendDirection === 'down' && (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-[#ba1a1a]">
                <path d="M23 18l-9.5-9.5-5 5L1 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17 18h6v-6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
            {trendDirection === 'neutral' && (
              <div className="w-2.5 h-2.5 rounded-full bg-[#515f74]/20 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-[#515f74]"></div>
              </div>
            )}
            <span className={`text-sm font-medium ${trendColor}`}>
              {trend}
            </span>
          </div>
        )}
      </div>
    </>
  );

  const baseClasses = "bg-card border border-border rounded-xl p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all h-[150px] group";

  if (linkTo) {
    return (
      <Link
        to={linkTo}
        className={`${baseClasses} hover:border-[#006c49]/30 cursor-pointer no-underline`}
      >
        {cardContent}
      </Link>
    );
  }

  return (
    <div className={baseClasses}>
      {cardContent}
    </div>
  );
}
