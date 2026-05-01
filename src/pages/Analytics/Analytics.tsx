import React, { useState } from 'react';
import { PageLayout } from '../../components/PageLayout';
import { MetricCard } from '../../components/MetricCard';

const ANALYTICS_KPIS = [
  {
    title: "TOTAL TONNAGE PROCESSED",
    value: "1,204.5t",
    trend: "+8.2% vs last month",
    trendDirection: "up" as const,
    iconColorClass: "text-[#006c49]",
    iconBgClass: "bg-[#10b981]/10",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
        <polyline points="2 17 12 22 22 17"></polyline>
        <polyline points="2 12 12 17 22 12"></polyline>
      </svg>
    )
  },
  {
    title: "CO2 EMISSIONS SAVED",
    value: "450.2t",
    trend: "+12.1% vs last month",
    trendDirection: "up" as const,
    iconColorClass: "text-[#10b981]",
    iconBgClass: "bg-[#10b981]/10",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
      </svg>
    )
  },
  {
    title: "AVERAGE PURITY RATE",
    value: "96.8%",
    trend: "+0.5% vs last month",
    trendDirection: "up" as const,
    iconColorClass: "text-[#0284c7]",
    iconBgClass: "bg-[#23acf1]/10",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>
    )
  },
  {
    title: "SYSTEM UPTIME",
    value: "99.9%",
    trend: "Consistent",
    trendDirection: "neutral" as const,
    iconColorClass: "text-[#515f74]",
    iconBgClass: "bg-[#515f74]/10",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
    )
  }
];

const WEEKLY_TREND_DATA = [
  { day: "Mon", value: 45 },
  { day: "Tue", value: 52 },
  { day: "Wed", value: 38 },
  { day: "Thu", value: 65 },
  { day: "Fri", value: 80 },
  { day: "Sat", value: 40 },
  { day: "Sun", value: 35 },
];

export default function Analytics() {
  const [activeRange, setActiveRange] = useState("30d");

  return (
    <PageLayout
      title="Analytics & Reporting"
      description="Deep dive into system performance and environmental impact."
      actions={
        <>
          <select 
            className="bg-white border border-[#bbcabf] text-[#3c4a42] text-sm font-medium rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#006c49]/20"
            value={activeRange}
            onChange={(e) => setActiveRange(e.target.value)}
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </select>
          <button className="bg-[#006c49] hover:bg-[#005a3c] text-white text-sm font-medium rounded-lg px-4 py-2 flex items-center gap-2 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
            </svg>
            Export Report
          </button>
        </>
      }
    >
      {/* KPIs Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {ANALYTICS_KPIS.map((kpi, idx) => (
          <MetricCard 
            key={idx}
            title={kpi.title}
            value={kpi.value}
            trend={kpi.trend}
            trendDirection={kpi.trendDirection}
            iconColorClass={kpi.iconColorClass}
            iconBgClass={kpi.iconBgClass}
            iconSvg={kpi.icon}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Weekly Trend Bar Chart */}
        <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-sm col-span-1 lg:col-span-2 flex flex-col h-[400px]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-[#0b1c30]">Material Recovery Trend</h2>
              <p className="text-sm text-[#515f74]">Daily tonnage of sorted recyclables.</p>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-[#006c49]" />
              <span className="text-[10px] font-bold text-[#515f74] uppercase">Tonnage</span>
            </div>
          </div>
          
          <div className="flex-1 flex items-end gap-4 w-full border-b border-l border-[#f1f5f9] pt-4 pl-2 pb-2 relative">
            {WEEKLY_TREND_DATA.map((data, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full group">
                <div className="w-full max-w-[48px] bg-[#f4f4f4] rounded-t-lg relative h-full flex items-end group-hover:bg-[#f1f5f9] transition-colors">
                  <div 
                    className="w-full bg-[#006c49] rounded-t-lg transition-all duration-500 ease-in-out group-hover:bg-[#10b981]" 
                    style={{ height: `${data.value}%` }} 
                  />
                  <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 text-xs font-bold text-[#006c49] transition-opacity">
                    {data.value}t
                  </span>
                </div>
                <span className="text-[10px] text-[#94a3b8] mt-3 font-semibold group-hover:text-[#515f74]">{data.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Facilities Table */}
        <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-sm flex flex-col h-[400px]">
          <h2 className="text-lg font-semibold text-[#0b1c30] mb-6">Top Performing Facilities</h2>
          
          <div className="flex-1 overflow-y-auto pr-2">
            <div className="flex flex-col gap-4">
              {[
                { name: 'North Sector Hub', value: '450t', percent: 85 },
                { name: 'East Wing B', value: '320t', percent: 60 },
                { name: 'South Lobby', value: '210t', percent: 45 },
                { name: 'Cafeteria Main', value: '180t', percent: 35 },
                { name: 'Admin Annex', value: '110t', percent: 20 },
              ].map((facility, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-[#0b1c30]">{facility.name}</span>
                    <span className="text-sm font-bold text-[#006c49]">{facility.value}</span>
                  </div>
                  <div className="w-full h-2 bg-[#f1f5f9] rounded-full overflow-hidden">
                    <div className="h-full bg-[#10b981] rounded-full" style={{ width: `${facility.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}