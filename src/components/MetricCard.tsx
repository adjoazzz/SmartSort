import React from 'react';

export interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  iconColorClass?: string;
  iconBgClass?: string;
  iconSvg?: React.ReactNode;
}

export function MetricCard({ 
  title, 
  value, 
  trend, 
  trendDirection = 'neutral',
  iconColorClass = 'text-[#006c49]',
  iconBgClass = 'bg-[#10b981]/10',
  iconSvg
}: MetricCardProps) {
  
  // Determine trend styling
  let trendColor = 'text-[#515f74]';
  if (trendDirection === 'up') trendColor = 'text-[#006c49]';
  if (trendDirection === 'down') trendColor = 'text-[#ba1a1a]';

  return (
    <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow h-[150px]">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold text-[#515f74] uppercase tracking-wider">
          {title}
        </h3>
        
        {iconSvg && (
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${iconBgClass} ${iconColorClass}`}>
            {iconSvg}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1 mt-2">
        <span className="text-3xl font-bold text-[#0b1c30] tracking-tight">
          {value}
        </span>
        
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
    </div>
  );
}
