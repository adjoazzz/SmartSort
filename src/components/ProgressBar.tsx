import React from 'react';

export interface ProgressBarProps {
  label: string;
  value: number; // 0 to 100
  valueLabel?: string;
  colorClass?: string;
}

export function ProgressBar({ 
  label, 
  value, 
  valueLabel, 
  colorClass = 'bg-[#10b981]' 
}: ProgressBarProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center text-sm font-medium">
        <span className="text-foreground dark:text-white">{label}</span>
        <span className="text-muted-foreground">{valueLabel || `${value}%`}</span>
      </div>
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full ${colorClass} transition-all duration-500 ease-in-out`} 
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  );
}
