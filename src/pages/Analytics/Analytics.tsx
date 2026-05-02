import React, { useState } from 'react';
import { PageLayout } from '../../components/PageLayout';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CHART_DATA = [
  { name: 'OCT 01', recycling: 25, contamination: 4 },
  { name: 'OCT 08', recycling: 35, contamination: 5 },
  { name: 'OCT 15', recycling: 50, contamination: 2 },
  { name: 'OCT 22', recycling: 55, contamination: -2 }, 
  { name: 'OCT 31', recycling: 65, contamination: 3 },
];

const TONNAGE_DATA = [
  { name: 'Corrugated Cardboard', value: '420t (34%)', percent: 34, color: 'bg-[#10b981]' },
  { name: 'Mixed Plastics (PET/HDPE)', value: '312t (25%)', percent: 25, color: 'bg-[#10b981]' },
  { name: 'Aluminum & Metals', value: '224t (18%)', percent: 18, color: 'bg-[#10b981]' },
  { name: 'Glass (Clear/Amber)', value: '187t (15%)', percent: 15, color: 'bg-[#10b981]' },
  { name: 'Residual Waste', value: '105t (8%)', percent: 8, color: 'bg-[#cbd5e1]' },
];

const CATEGORY_DATA = [
  { icon: 'boxes', name: 'Recycled Paper & Pulp', volume: '582.4', growth: '+8.2%', growthTrend: 'up', goal: 92, goalColor: 'bg-[#10b981]' },
  { icon: 'magnet', name: 'Ferrous Metals', volume: '144.9', growth: '-2.1%', growthTrend: 'down', goal: 78, goalColor: 'bg-[#10b981]' },
  { icon: 'drop', name: 'Liquid Contaminants', volume: '22.8', growth: '+0.4%', growthTrend: 'neutral', goal: 12, goalColor: 'bg-[#ba1a1a]' },
];

const KPI_DATA = [
  {
    title: 'Recycling Rate',
    value: '74.2%',
    trend: '12.4%',
    trendDirection: 'up',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="none" />
        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12s4.48 10 10 10 10-4.48 10-10z" stroke="none" />
        <path d="M8 12c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4-4-1.79-4-4z" stroke="none" />
        <path d="M11 20a10 10 0 0 1-9-9 9.6 9.6 0 0 1 1-4c1.5 0 3-1 3-3a10.4 10.4 0 0 1 5 16z" fill="none" stroke="#10b981"/>
        <path d="M16.5 14.5c1.2-1.2 2.5-3.5 2.5-5.5a10 10 0 0 0-4-6c-1 1-1.5 2.5-1.5 4s1.5 3.5 3 7z" fill="none" stroke="#10b981"/>
      </svg>
    ),
    iconBg: 'bg-transparent border border-[#e2e8f0] dark:border-[#1e3a5f]',
    progressColor: 'bg-[#10b981]',
    progressWidth: '74%',
    trendColors: 'bg-[#bbf7d0]/50 text-[#006c49]'
  },
  {
    title: 'Contamination',
    value: '8.1%',
    trend: '4.2%',
    trendDirection: 'down',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ba1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>
    ),
    iconBg: 'bg-[#fca5a5]/20',
    progressColor: 'bg-[#ba1a1a]',
    progressWidth: '8%',
    trendColors: 'bg-[#ffdad6] text-[#ba1a1a]'
  },
  {
    title: 'Total Tonnage',
    value: '1,248.5 t',
    trend: '8.1%',
    trendDirection: 'up',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <path d="M16 10a4 4 0 0 1-8 0"></path>
      </svg>
    ),
    iconBg: 'bg-transparent border border-[#e2e8f0] dark:border-[#1e3a5f]',
    progressColor: 'bg-[#3b82f6]',
    progressWidth: '75%',
    trendColors: 'bg-[#dbeafe] text-[#2563eb]'
  },
  {
    title: 'Carbon Offset',
    value: '412.2 t',
    trend: '15.0%',
    trendDirection: 'up',
    icon: <span className="text-xs font-bold text-[#64748b] dark:text-[#94a3b8] dark:text-[#64748b]">CO<sub className="text-[8px]">2</sub></span>,
    iconBg: 'bg-transparent border border-[#e2e8f0] dark:border-[#1e3a5f]',
    progressColor: 'bg-[#334155]',
    progressWidth: '40%',
    trendColors: 'bg-[#bbf7d0]/50 text-[#006c49]'
  }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0b1c30] text-white p-3 rounded-lg shadow-xl text-sm border border-[#213145]">
        <p className="font-bold mb-2 pb-2 border-b border-[#3c4a42]">Oct 18, 2023</p>
        <div className="flex justify-between gap-4 mb-1">
          <span className="text-[#94a3b8] dark:text-[#64748b]">Recycling:</span>
          <span className="text-[#10b981] font-bold">{payload[0].value}%</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-[#94a3b8] dark:text-[#64748b]">Contam:</span>
          <span className="text-[#fca5a5] font-bold">{payload[1].value}%</span>
        </div>
      </div>
    );
  }
  return null;
};

function KpiCard({ data }: { data: typeof KPI_DATA[0] }) {
  return (
    <div className="bg-white dark:bg-[#0b1c30] border border-[#e2e8f0] dark:border-[#1e3a5f] rounded-xl p-5 shadow-sm relative overflow-hidden flex flex-col justify-between">
      <div className="flex justify-between items-start mb-6">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${data.iconBg}`}>
          {data.icon}
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-bold ${data.trendColors}`}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            {data.trendDirection === 'up' ? (
              <>
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
              </>
            ) : (
              <>
                <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
                <polyline points="17 18 23 18 23 12"></polyline>
              </>
            )}
          </svg>
          {data.trend}
        </div>
      </div>
      <div>
        <h3 className="text-xs font-bold text-[#64748b] dark:text-[#94a3b8] dark:text-[#64748b] tracking-wider uppercase mb-1">{data.title}</h3>
        <p className="text-2xl font-bold text-[#0b1c30] dark:text-white">{data.value}</p>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-[#f1f5f9] dark:bg-[#1a365d]">
        <div className={`h-full ${data.progressColor}`} style={{ width: data.progressWidth }}></div>
      </div>
    </div>
  );
}

function CategoryIcon({ type }: { type: string }) {
  if (type === 'boxes') return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>;
  if (type === 'magnet') return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11V7a8 8 0 0 1 16 0v4"></path><path d="M4 11h4v4H4z"></path><path d="M16 11h4v4h-4z"></path></svg>;
  if (type === 'drop') return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>;
  return null;
}

export default function Analytics() {
  return (
    <PageLayout
      title="Waste Intelligence Analytics"
      description="Real-time performance metrics across your facility network."
      actions={
        <button className="bg-white dark:bg-[#0b1c30] border border-[#e2e8f0] dark:border-[#1e3a5f] text-[#0b1c30] dark:text-white text-sm font-semibold rounded-lg px-4 py-2 hover:bg-[#f8fafc] dark:bg-[#0f2942] transition-colors shadow-sm flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#515f74" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          Oct 01 - Oct 31, 2023
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#515f74" strokeWidth="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      }
    >
      <div className="flex flex-col gap-6">
        
        {/* KPIs Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {KPI_DATA.map((kpi, idx) => (
            <KpiCard key={idx} data={kpi} />
          ))}
        </div>

        {/* Middle Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Rate Comparison Over Time */}
          <div className="bg-white dark:bg-[#0b1c30] border border-[#e2e8f0] dark:border-[#1e3a5f] rounded-xl p-6 shadow-sm col-span-1 lg:col-span-2 flex flex-col h-[400px]">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-lg font-bold text-[#0b1c30] dark:text-white">Rate Comparison Over Time</h2>
                <p className="text-sm text-[#64748b] dark:text-[#94a3b8] dark:text-[#64748b] mt-1">Recycling performance vs. contamination threshold</p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></div>
                  <span className="text-sm text-[#515f74] dark:text-[#cbd5e1] font-medium">Recycling</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#fca5a5]"></div>
                  <span className="text-sm text-[#515f74] dark:text-[#cbd5e1] font-medium">Contamination</span>
                </div>
              </div>
            </div>
            <div className="flex-1 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }} 
                    dy={10} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }}
                    ticks={[0, 25, 50, 75, 100]}
                    tickFormatter={(val) => `${val}%`}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#cbd5e1', strokeWidth: 1 }} />
                  <Line 
                    type="monotone" 
                    dataKey="recycling" 
                    stroke="#10b981" 
                    strokeWidth={3} 
                    dot={false} 
                    activeDot={{ r: 6, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="contamination" 
                    stroke="#fca5a5" 
                    strokeWidth={2} 
                    strokeDasharray="4 4" 
                    dot={false} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Tonnage by Material */}
          <div className="bg-white dark:bg-[#0b1c30] border border-[#e2e8f0] dark:border-[#1e3a5f] rounded-xl p-6 shadow-sm flex flex-col h-[400px]">
            <h2 className="text-[17px] font-bold text-[#0b1c30] dark:text-white mb-5">Tonnage by Material</h2>
            
            <div className="flex flex-col gap-[18px] flex-1">
              {TONNAGE_DATA.map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-end mb-1.5">
                    <span className="text-[13px] font-bold text-[#0b1c30] dark:text-white">{item.name}</span>
                    <span className="text-xs text-[#64748b] dark:text-[#94a3b8] dark:text-[#64748b]">{item.value}</span>
                  </div>
                  <div className="w-full bg-[#f1f5f9] dark:bg-[#1a365d] rounded-full h-2">
                    <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.percent}%` }}></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-[#f1f5f9] dark:border-[#0f2942] mt-auto pt-4 grid grid-cols-2 divide-x divide-[#f1f5f9]">
              <div className="pr-4">
                <p className="text-xs text-[#94a3b8] dark:text-[#64748b] font-semibold mb-1">Capture Rate</p>
                <p className="text-2xl font-bold text-[#0b1c30] dark:text-white">92.4%</p>
              </div>
              <div className="pl-4 text-right">
                <p className="text-xs text-[#94a3b8] dark:text-[#64748b] font-semibold mb-1">Efficiency</p>
                <p className="text-2xl font-bold text-[#0b1c30] dark:text-white">88.2%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row - Category Breakdown */}
        <div className="bg-white dark:bg-[#0b1c30] border border-[#e2e8f0] dark:border-[#1e3a5f] rounded-xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-[#f1f5f9] dark:border-[#0f2942] flex justify-between items-center">
            <h2 className="text-lg font-bold text-[#0b1c30] dark:text-white">Category Breakdown</h2>
            <button className="bg-white dark:bg-[#0b1c30] border border-[#e2e8f0] dark:border-[#1e3a5f] text-[#515f74] dark:text-[#cbd5e1] text-sm font-semibold rounded-lg px-4 py-2 hover:bg-[#f8fafc] dark:bg-[#0f2942] transition-colors flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
              Filter Category
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white dark:bg-[#0b1c30] border-b border-[#f1f5f9] dark:border-[#0f2942]">
                  <th className="px-6 py-4 text-xs font-bold text-[#64748b] dark:text-[#94a3b8] dark:text-[#64748b] tracking-wider flex items-center gap-1">MATERIAL CATEGORY <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg></th>
                  <th className="px-6 py-4 text-xs font-bold text-[#64748b] dark:text-[#94a3b8] dark:text-[#64748b] tracking-wider">VOLUME (METRIC TONS) <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg></th>
                  <th className="px-6 py-4 text-xs font-bold text-[#64748b] dark:text-[#94a3b8] dark:text-[#64748b] tracking-wider">MOM GROWTH <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg></th>
                  <th className="px-6 py-4 text-xs font-bold text-[#64748b] dark:text-[#94a3b8] dark:text-[#64748b] tracking-wider">TARGET GOAL <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline"><path d="M7 15l5 5 5-5M7 9l5-5 5 5"/></svg></th>
                  <th className="px-6 py-4 text-xs font-bold text-[#64748b] dark:text-[#94a3b8] dark:text-[#64748b] tracking-wider text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f1f5f9]">
                {CATEGORY_DATA.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#f8fafc] dark:bg-[#0f2942] transition-colors">
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-[#f1f5f9] dark:bg-[#1a365d] flex items-center justify-center text-[#515f74] dark:text-[#cbd5e1]">
                          <CategoryIcon type={row.icon} />
                        </div>
                        <span className="text-sm font-bold text-[#0b1c30] dark:text-white">{row.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className="text-sm text-[#515f74] dark:text-[#cbd5e1]">{row.volume}</span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-bold
                        ${row.growthTrend === 'up' ? 'bg-[#bbf7d0]/50 text-[#006c49]' : 
                          row.growthTrend === 'down' ? 'bg-[#ffdad6] text-[#ba1a1a]' : 
                          'bg-[#f1f5f9] dark:bg-[#1a365d] text-[#64748b] dark:text-[#94a3b8] dark:text-[#64748b]'}
                      `}>
                        {row.growthTrend === 'up' && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>}
                        {row.growthTrend === 'down' && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline></svg>}
                        {row.growthTrend === 'neutral' && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="5" y1="12" x2="19" y2="12"></line></svg>}
                        {row.growth}
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center gap-3 w-32">
                        <div className="w-full bg-[#f1f5f9] dark:bg-[#1a365d] rounded-full h-1.5 overflow-hidden">
                          <div className={`h-full rounded-full ${row.goalColor}`} style={{ width: `${row.goal}%` }} />
                        </div>
                        <span className="text-sm font-bold text-[#334155]">{row.goal}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-right">
                      <button className="text-[#94a3b8] dark:text-[#64748b] hover:text-[#0b1c30] dark:text-white transition-colors p-1">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="1"></circle>
                          <circle cx="12" cy="5" r="1"></circle>
                          <circle cx="12" cy="19" r="1"></circle>
                        </svg>
                      </button>
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