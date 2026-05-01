import React, { useState } from 'react';
import { PageLayout } from '../../components/PageLayout';
import { MetricCard } from '../../components/MetricCard';
import { ProgressBar } from '../../components/ProgressBar';
import { StatusBadge } from '../../components/StatusBadge';

import imgEventSnap from "../../assets/9389a9333045e821be3474418e89b876d4fc0c10.png";
import imgEventSnap1 from "../../assets/8811709787b7f35f6b7245b79da448b564be54ea.png";
import imgEventSnap2 from "../../assets/e1a9d04912bb77b9225af7a54042c20ac0088702.png";
import imgEventSnap3 from "../../assets/a1d30b6258f5d1e8997441f254843ad037f46cad.png";

// --- Mock Data ---

const KPIS = [
  {
    title: "ACTIVE DEVICES",
    value: "18/20",
    trend: "System nominal",
    trendDirection: "neutral" as const,
    iconColorClass: "text-[#515f74]",
    iconBgClass: "bg-[#515f74]/10",
    linkTo: "/devices",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
        <rect x="9" y="9" width="6" height="6"></rect>
        <line x1="9" y1="1" x2="9" y2="4"></line>
        <line x1="15" y1="1" x2="15" y2="4"></line>
        <line x1="9" y1="20" x2="9" y2="23"></line>
        <line x1="15" y1="20" x2="15" y2="23"></line>
        <line x1="20" y1="9" x2="23" y2="9"></line>
        <line x1="20" y1="14" x2="23" y2="14"></line>
        <line x1="1" y1="9" x2="4" y2="9"></line>
        <line x1="1" y1="14" x2="4" y2="14"></line>
      </svg>
    )
  },
  {
    title: "TOTAL ITEMS SORTED",
    value: "42,891",
    trend: "+12.4% vs yesterday",
    trendDirection: "up" as const,
    iconColorClass: "text-[#006c49]",
    iconBgClass: "bg-[#10b981]/10",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" y1="22.08" x2="12" y2="12"></line>
      </svg>
    )
  },
  {
    title: "RECYCLING RATE %",
    value: "84.2%",
    trend: "+2.4% threshold",
    trendDirection: "up" as const,
    iconColorClass: "text-[#0284c7]",
    iconBgClass: "bg-[#23acf1]/10",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
      </svg>
    )
  },
  {
    title: "CONTAMINATION RATE %",
    value: "4.1%",
    trend: "-0.8% reduction",
    trendDirection: "up" as const, // Green because reduction is good
    iconColorClass: "text-[#d97706]",
    iconBgClass: "bg-[#fef3c7]",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>
    )
  }
];

const THROUGHPUT_DATA = [
  { time: "08:00", value: 65 },
  { time: "09:00", value: 85 },
  { time: "10:00", value: 68 },
  { time: "11:00", value: 72 },
  { time: "12:00", value: 92 },
  { time: "13:00", value: 100 },
  { time: "14:00", value: 75 },
  { time: "15:00", value: 45 },
];

const DEVICE_BINS = [
  { label: "Main Conveyor A1", value: 88, color: "bg-[#ba1a1a]" },
  { label: "Glass Separator B2", value: 42, color: "bg-[#10b981]" },
  { label: "Paper Compactor C1", value: 15, color: "bg-[#10b981]" },
  { label: "Organic Bin D5", value: 72, color: "bg-[#f59e0b]" },
];

const RECENT_EVENTS = [
  { id: 1, time: "14:32:01", source: "Sensor_A1", detection: "BIOHAZARD", detectionType: "danger", confidence: "98.4%", img: imgEventSnap, action: "ROUTED_BIN_X" },
  { id: 2, time: "14:28:45", source: "Scanner_B2", detection: "MEDICAL_WASTE", detectionType: "danger", confidence: "95.2%", img: imgEventSnap1, action: "FLAG_OPERATOR" },
  { id: 3, time: "14:15:22", source: "Sensor_C1", detection: "E_WASTE", detectionType: "warning", confidence: "88.7%", img: imgEventSnap2, action: "ROUTED_BIN_Y" },
  { id: 4, time: "14:02:11", source: "Camera_A3", detection: "BATTERY_LITHIUM", detectionType: "danger", confidence: "99.1%", img: imgEventSnap3, action: "E-STOP_TRIGGERED" },
];

export default function Dashboard() {
  const [activeRange, setActiveRange] = useState("24h");

  return (
    <PageLayout
      title="Operations Overview"
      description="Real-time waste processing and recovery metrics for North Sector Hub."
      actions={
        <>
          <select 
            className="bg-white border border-[#bbcabf] text-[#3c4a42] text-sm font-medium rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#006c49]/20"
            value={activeRange}
            onChange={(e) => setActiveRange(e.target.value)}
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
          <button className="bg-[#006c49] hover:bg-[#005a3c] text-white text-sm font-medium rounded-lg px-4 py-2 flex items-center gap-2 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
            </svg>
            Export PDF
          </button>
        </>
      }
    >

        {/* KPIs Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {KPIS.map((kpi, idx) => (
            <MetricCard 
              key={idx}
              title={kpi.title}
              value={kpi.value}
              trend={kpi.trend}
              trendDirection={kpi.trendDirection}
              iconColorClass={kpi.iconColorClass}
              iconBgClass={kpi.iconBgClass}
              iconSvg={kpi.icon}
              linkTo={'linkTo' in kpi ? (kpi as any).linkTo : undefined}
            />
          ))}
        </div>

        {/* Middle Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          
          {/* Hourly Throughput Bar Chart */}
          <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-sm col-span-1 lg:col-span-2 flex flex-col h-[360px]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-[#0b1c30]">Hourly Throughput</h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm bg-[#10b981]" />
                  <span className="text-[10px] font-bold text-[#515f74] uppercase">Sorted</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm bg-[#e2e8f0]" />
                  <span className="text-[10px] font-bold text-[#515f74] uppercase">Rejected</span>
                </div>
              </div>
            </div>
            
            <div className="flex-1 flex items-end gap-3 w-full border-b border-l border-[#f1f5f9] pt-4 pl-1 pb-1 relative">
              {THROUGHPUT_DATA.map((data, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full group">
                  <div className="w-full bg-[#f4f4f4] rounded-t-xl relative h-full flex items-end group-hover:bg-[#f1f5f9] transition-colors">
                    <div 
                      className="w-full bg-[#10b981] rounded-t-xl transition-all duration-500 ease-in-out" 
                      style={{ height: `${data.value}%` }} 
                    />
                  </div>
                  <span className="text-[10px] text-[#94a3b8] mt-2 group-hover:text-[#515f74]">{data.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Waste Distribution Donut */}
          <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-sm flex flex-col h-[360px]">
            <h2 className="text-lg font-semibold text-[#0b1c30] mb-4">Waste Categories</h2>
            
            <div className="flex-1 flex flex-col items-center justify-center relative">
              {/* CSS Donut Chart Mockup */}
              <div className="w-40 h-40 rounded-full border-[16px] border-[#f8fafc] relative mb-6 shadow-inner">
                {/* Simulated arcs could go here, for now keeping the original layout feel */}
                <div className="absolute inset-0 rounded-full border-[16px] border-t-[#10b981] border-r-[#60a5fa] border-b-[#fbbf24] border-l-[#cbd5e1] transform rotate-45" />
                
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-[#0b1c30]">Total</span>
                  <span className="text-[10px] font-bold text-[#515f74] uppercase">Processed</span>
                </div>
              </div>

              <div className="w-full grid grid-cols-2 gap-3 mt-auto">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#10b981]" />
                  <span className="text-sm font-medium text-[#515f74]">Plastic (35%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#60a5fa]" />
                  <span className="text-sm font-medium text-[#515f74]">Paper (22%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#fbbf24]" />
                  <span className="text-sm font-medium text-[#515f74]">Metal (18%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#cbd5e1]" />
                  <span className="text-sm font-medium text-[#515f74]">Other (25%)</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          
          {/* Device Status */}
          <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-sm flex flex-col col-span-1">
            <div className="p-6 border-b border-[#f1f5f9] flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#0b1c30]">Device Status</h2>
              <StatusBadge label="Live" variant="success" />
            </div>
            <div className="p-6 flex flex-col gap-6 flex-1">
              {DEVICE_BINS.map((bin, idx) => (
                <ProgressBar 
                  key={idx}
                  label={bin.label}
                  value={bin.value}
                  colorClass={bin.color}
                />
              ))}
            </div>
            <div className="p-4 border-t border-[#f1f5f9] bg-[#f8fafc] rounded-b-xl">
              <button className="w-full text-xs font-bold text-[#515f74] tracking-widest uppercase hover:text-[#0b1c30] transition-colors py-2">
                Manage All Devices
              </button>
            </div>
          </div>

          {/* Live Events Table */}
          <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-sm flex flex-col col-span-1 lg:col-span-2 overflow-hidden">
            <div className="p-6 border-b border-[#f1f5f9] flex items-center justify-between bg-white">
              <h2 className="text-lg font-semibold text-[#0b1c30]">Live Contamination Events</h2>
              <StatusBadge label="Action Required" variant="danger" hasDot />
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-[#f8fafc] border-b border-[#f1f5f9]">
                    <th className="px-6 py-4 text-xs font-semibold text-[#515f74] uppercase tracking-wider">Timestamp</th>
                    <th className="px-6 py-4 text-xs font-semibold text-[#515f74] uppercase tracking-wider">Source</th>
                    <th className="px-6 py-4 text-xs font-semibold text-[#515f74] uppercase tracking-wider">Detection</th>
                    <th className="px-6 py-4 text-xs font-semibold text-[#515f74] uppercase tracking-wider">Confidence</th>
                    <th className="px-6 py-4 text-xs font-semibold text-[#515f74] uppercase tracking-wider">Visual</th>
                    <th className="px-6 py-4 text-xs font-semibold text-[#515f74] uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f1f5f9]">
                  {RECENT_EVENTS.map((evt) => (
                    <tr key={evt.id} className="hover:bg-[#f8fafc] transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#515f74]">{evt.time}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#0b1c30]">{evt.source}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge label={evt.detection} variant={evt.detectionType as any} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-[#ba1a1a]">{evt.confidence}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-10 h-10 rounded-md overflow-hidden border border-[#e2e8f0]">
                          <img src={evt.img} alt="Snapshot" className="w-full h-full object-cover" />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs font-semibold text-[#515f74] font-mono bg-[#f8fafc]">
                        {evt.action}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
    </PageLayout>
  );
}