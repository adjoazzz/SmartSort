import React, { useState } from 'react';
import { PageLayout } from '../../components/PageLayout';
import { MetricCard } from '../../components/MetricCard';
import { StatusBadge } from '../../components/StatusBadge';
import { InputField } from '../../components/InputField';
import { SelectField } from '../../components/SelectField';

const KPIS = [
  {
    title: "ACTIVE REPORTS",
    value: "12",
    trend: "4% vs last week",
    trendDirection: "down" as const, // More reports is generally bad, so red trend
    iconColorClass: "text-[#ba1a1a]",
    iconBgClass: "bg-[#ffdad6]",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
      </svg>
    )
  },
  {
    title: "AVG RESPONSE TIME",
    value: "2.4h",
    trend: "12m improvement",
    trendDirection: "up" as const, // Faster is better
    iconColorClass: "text-[#0284c7]",
    iconBgClass: "bg-[#23acf1]/10",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
    )
  },
  {
    title: "RESOLUTION RATE",
    value: "94.2%",
    trend: "Overall avg",
    trendDirection: "neutral" as const,
    iconColorClass: "text-[#006c49]",
    iconBgClass: "bg-[#10b981]/10",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    )
  },
  {
    title: "COMMUNITY SENTIMENT",
    value: "Good",
    trend: "+0.4 pt",
    trendDirection: "up" as const,
    iconColorClass: "text-[#d97706]",
    iconBgClass: "bg-[#fef3c7]",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
        <line x1="9" y1="9" x2="9.01" y2="9"></line>
        <line x1="15" y1="9" x2="15.01" y2="9"></line>
      </svg>
    )
  }
];

const FEEDBACK_DATA = [
  { id: 1, initials: "JS", name: "Jane Simmons", location: "Bldg A - Floor 4", category: "Overflowing Bin", catVariant: "danger", desc: "Compost bin in the kitchen area is completely full and needs...", status: "Pending", statVariant: "warning", time: "28 Oct, 09:42 AM" },
  { id: 2, initials: "MT", name: "Marcus Thorne", location: "North Loading Dock", category: "Odor", catVariant: "warning", desc: "Strong unpleasant smell coming from the general waste compactor...", status: "In Progress", statVariant: "info", time: "28 Oct, 08:15 AM" },
  { id: 3, initials: "LA", name: "Lydia Anderson", location: "Shared Cafe Space", category: "Wrong Category", catVariant: "info", desc: "People are putting plastic bottles in the paper recycling bin regularly...", status: "Resolved", statVariant: "success", time: "27 Oct, 04:30 PM" },
  { id: 4, initials: "RH", name: "Robert Hayes", location: "Warehouse East", category: "Missed Collection", catVariant: "danger", desc: "The weekly glass collection didn't happen this morning at East Dock...", status: "Pending", statVariant: "warning", time: "27 Oct, 11:20 AM" },
];

const ISSUE_CATEGORIES = [
  'Select a category',
  'Overflowing Bin',
  'Odor',
  'Wrong Category',
  'Missed Collection',
  'Damaged Equipment',
  'Illegal Dumping',
  'Other',
];

export default function CommunityFeedback() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmitFeedback = () => {
    console.log('Feedback submitted:', { userName, location, category, description });
    setUserName('');
    setLocation('');
    setCategory('');
    setDescription('');
    setIsModalOpen(false);
  };

  return (
    <PageLayout
      title="Community Feedback"
      description="Manage and resolve facility operational reports."
      actions={
        <>
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#0b1c30] border border-[#e2e8f0] dark:border-[#1e3a5f] text-[#515f74] dark:text-[#cbd5e1] font-medium text-xs rounded-lg hover:bg-[#f8fafc] dark:hover:bg-[#0f2942] transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Export PDF
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#006c49] text-white font-medium text-xs rounded-lg hover:bg-[#005a3c] transition-colors shadow-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Manual Entry
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
          />
        ))}
      </div>

      {/* Main Feedback Table Container */}
      <div className="bg-white dark:bg-[#0b1c30] border border-[#e2e8f0] dark:border-[#1e3a5f] rounded-xl shadow-sm overflow-hidden mt-6 flex flex-col min-h-[400px]">
        {/* Filters Header */}
        <div className="px-6 py-4 border-b border-[#f1f5f9] dark:border-[#0f2942] flex items-center justify-between bg-[#f8fafc] dark:bg-[#0f2942]">
          <div className="flex items-center gap-4">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8] dark:text-[#64748b]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
              </svg>
              <select className="block pl-9 pr-10 py-1.5 border border-[#e2e8f0] dark:border-[#1e3a5f] rounded-lg bg-white dark:bg-[#0b1c30] text-[#515f74] dark:text-[#cbd5e1] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#006c49]/20 appearance-none outline-none">
                <option>Status: All</option>
                <option>Pending</option>
                <option>In Progress</option>
                <option>Resolved</option>
              </select>
            </div>
            <div className="relative">
              <select className="block px-4 py-1.5 border border-[#e2e8f0] dark:border-[#1e3a5f] rounded-lg bg-white dark:bg-[#0b1c30] text-[#515f74] dark:text-[#cbd5e1] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#006c49]/20 appearance-none pr-8 outline-none">
                <option>Category: All</option>
                <option>Overflowing Bin</option>
                <option>Wrong Category</option>
                <option>Odor</option>
                <option>Missed Collection</option>
              </select>
            </div>
          </div>
          <div className="text-xs text-[#94a3b8] dark:text-[#64748b] font-medium hidden sm:block">
            Showing 4 of 148 entries
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-white dark:bg-[#0b1c30] text-[#515f74] dark:text-[#cbd5e1] text-[11px] font-bold uppercase tracking-wider border-b border-[#e2e8f0] dark:border-[#1e3a5f]">
                <th className="px-6 py-4">User / Location</th>
                <th className="px-6 py-4">Issue Category</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Reported At</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {FEEDBACK_DATA.map((item) => (
                <tr key={item.id} className="hover:bg-[#f8fafc] dark:hover:bg-[#0f2942] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#f1f5f9] dark:bg-[#1a365d] flex items-center justify-center text-[#515f74] dark:text-[#cbd5e1] font-bold text-xs">{item.initials}</div>
                      <div>
                        <div className="font-semibold text-[#0b1c30] dark:text-white text-sm">{item.name}</div>
                        <div className="text-[#515f74] dark:text-[#cbd5e1] text-xs mt-0.5">{item.location}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge label={item.category} variant={item.catVariant as any} />
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-[#515f74] dark:text-[#cbd5e1] text-xs line-clamp-1 max-w-[200px]">{item.desc}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge label={item.status} variant={item.statVariant as any} hasDot />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-[#515f74] dark:text-[#cbd5e1] text-xs font-mono">
                    {item.time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex justify-end gap-1.5">
                      <button className="p-1.5 text-[#94a3b8] dark:text-[#64748b] hover:text-[#006c49] hover:bg-[#006c49]/10 rounded-lg transition-colors" title="Convert to Job">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <line x1="12" y1="18" x2="12" y2="12"></line>
                          <line x1="9" y1="15" x2="15" y2="15"></line>
                        </svg>
                      </button>
                      <button className="p-1.5 text-[#94a3b8] dark:text-[#64748b] hover:text-[#0284c7] hover:bg-[#0284c7]/10 rounded-lg transition-colors" title="Respond">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                        </svg>
                      </button>
                      <button className="p-1.5 text-[#94a3b8] dark:text-[#64748b] hover:text-[#0b1c30] dark:text-white hover:bg-[#e2e8f0] rounded-lg transition-colors" title="View Details">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-6 py-4 border-t border-[#f1f5f9] dark:border-[#0f2942] flex items-center justify-between mt-auto bg-white dark:bg-[#0b1c30]">
          <div className="text-xs text-[#515f74] dark:text-[#cbd5e1]">
            Page <span className="font-bold text-[#0b1c30] dark:text-white">1</span> of 12
          </div>
          <div className="flex items-center gap-1">
            <button className="p-1 text-[#94a3b8] dark:text-[#64748b] hover:text-[#0b1c30] dark:text-white disabled:opacity-30 cursor-not-allowed" disabled>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <button className="px-3 py-1 bg-[#006c49]/10 text-[#006c49] text-xs font-bold rounded-md">1</button>
            <button className="px-3 py-1 text-[#515f74] dark:text-[#cbd5e1] text-xs font-medium hover:bg-[#f1f5f9] dark:hover:bg-[#1a365d] rounded-md transition-colors">2</button>
            <button className="px-3 py-1 text-[#515f74] dark:text-[#cbd5e1] text-xs font-medium hover:bg-[#f1f5f9] dark:hover:bg-[#1a365d] rounded-md transition-colors">3</button>
            <button className="px-3 py-1 text-[#515f74] dark:text-[#cbd5e1] text-xs font-medium hover:bg-[#f1f5f9] dark:hover:bg-[#1a365d] rounded-md transition-colors">...</button>
            <button className="px-3 py-1 text-[#515f74] dark:text-[#cbd5e1] text-xs font-medium hover:bg-[#f1f5f9] dark:hover:bg-[#1a365d] rounded-md transition-colors">12</button>
            <button className="p-1 text-[#94a3b8] dark:text-[#64748b] hover:text-[#0b1c30] dark:text-white transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Contextual Insights / Bento Grid Element */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white dark:bg-[#0b1c30] border border-[#e2e8f0] dark:border-[#1e3a5f] rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-[#0b1c30] dark:text-white text-sm tracking-wide">Feedback Volume Trend</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-[#10b981]"></span>
                <span className="text-[10px] font-bold text-[#515f74] dark:text-[#cbd5e1] uppercase tracking-wider">Reports</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-[#0284c7]"></span>
                <span className="text-[10px] font-bold text-[#515f74] dark:text-[#cbd5e1] uppercase tracking-wider">Resolved</span>
              </div>
            </div>
          </div>
          
          <div className="h-48 w-full relative flex items-end gap-3 pb-4">
            <div className="flex-1 flex flex-col justify-end h-full gap-1 group">
              <div className="w-full bg-[#10b981]/20 h-1/4 rounded-t-sm group-hover:bg-[#10b981]/30 transition-colors"></div>
              <div className="w-full bg-[#0284c7]/20 h-1/6 rounded-t-sm group-hover:bg-[#0284c7]/30 transition-colors"></div>
              <span className="text-[10px] text-[#94a3b8] dark:text-[#64748b] text-center mt-2 font-bold uppercase">Mon</span>
            </div>
            <div className="flex-1 flex flex-col justify-end h-full gap-1 group">
              <div className="w-full bg-[#10b981]/40 h-2/4 rounded-t-sm group-hover:bg-[#10b981]/50 transition-colors"></div>
              <div className="w-full bg-[#0284c7]/40 h-1/4 rounded-t-sm group-hover:bg-[#0284c7]/50 transition-colors"></div>
              <span className="text-[10px] text-[#94a3b8] dark:text-[#64748b] text-center mt-2 font-bold uppercase">Tue</span>
            </div>
            <div className="flex-1 flex flex-col justify-end h-full gap-1 group">
              <div className="w-full bg-[#10b981] h-4/5 rounded-t-sm transition-colors"></div>
              <div className="w-full bg-[#0284c7] h-3/5 rounded-t-sm transition-colors"></div>
              <span className="text-[10px] text-[#0b1c30] dark:text-white text-center mt-2 font-bold uppercase">Wed</span>
            </div>
            <div className="flex-1 flex flex-col justify-end h-full gap-1 group">
              <div className="w-full bg-[#10b981]/40 h-2/5 rounded-t-sm group-hover:bg-[#10b981]/50 transition-colors"></div>
              <div className="w-full bg-[#0284c7]/40 h-1/5 rounded-t-sm group-hover:bg-[#0284c7]/50 transition-colors"></div>
              <span className="text-[10px] text-[#94a3b8] dark:text-[#64748b] text-center mt-2 font-bold uppercase">Thu</span>
            </div>
            <div className="flex-1 flex flex-col justify-end h-full gap-1 group">
              <div className="w-full bg-[#10b981]/60 h-3/5 rounded-t-sm group-hover:bg-[#10b981]/70 transition-colors"></div>
              <div className="w-full bg-[#0284c7]/60 h-2/5 rounded-t-sm group-hover:bg-[#0284c7]/70 transition-colors"></div>
              <span className="text-[10px] text-[#94a3b8] dark:text-[#64748b] text-center mt-2 font-bold uppercase">Fri</span>
            </div>
            <div className="flex-1 flex flex-col justify-end h-full gap-1 group">
              <div className="w-full bg-[#10b981]/20 h-1/5 rounded-t-sm group-hover:bg-[#10b981]/30 transition-colors"></div>
              <div className="w-full bg-[#0284c7]/20 h-1/6 rounded-t-sm group-hover:bg-[#0284c7]/30 transition-colors"></div>
              <span className="text-[10px] text-[#94a3b8] dark:text-[#64748b] text-center mt-2 font-bold uppercase">Sat</span>
            </div>
            <div className="flex-1 flex flex-col justify-end h-full gap-1 group">
              <div className="w-full bg-[#10b981]/20 h-[10%] rounded-t-sm group-hover:bg-[#10b981]/30 transition-colors"></div>
              <div className="w-full bg-[#0284c7]/20 h-[5%] rounded-t-sm group-hover:bg-[#0284c7]/30 transition-colors"></div>
              <span className="text-[10px] text-[#94a3b8] dark:text-[#64748b] text-center mt-2 font-bold uppercase">Sun</span>
            </div>
          </div>
        </div>
        
        <div className="bg-[#0b1c30] rounded-xl p-6 text-white flex flex-col justify-between overflow-hidden relative shadow-lg">
          <div className="relative z-10">
            <span className="text-[#10b981] font-bold text-[10px] uppercase tracking-widest">Sustainability Highlight</span>
            <h3 className="text-3xl font-bold mt-3 text-white">4.2 Tons</h3>
            <p className="text-[#94a3b8] dark:text-[#64748b] text-sm mt-2 leading-relaxed">Diverted through proactive user reporting this month.</p>
          </div>
          <div className="relative z-10 mt-8">
            <button className="w-full py-2.5 bg-[#006c49] text-white font-bold text-xs rounded-lg hover:bg-[#005a3c] transition-colors shadow-sm tracking-wide">
              View Impact Report
            </button>
          </div>
          {/* Decorative background pattern */}
          <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-[#006c49]/40 rounded-full blur-3xl"></div>
          <div className="absolute right-4 top-4 text-[#006c49]/30">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Manual Entry Modal */}
      {isModalOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div
              className="bg-white dark:bg-[#0b1c30] border border-[#e2e8f0] dark:border-[#1e3a5f] rounded-2xl shadow-2xl w-full max-w-lg pointer-events-auto flex flex-col animate-in"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-[#f1f5f9] dark:border-[#0f2942]">
                <div>
                  <h3 className="text-xl font-semibold text-[#0b1c30] dark:text-white">Add Feedback</h3>
                  <p className="text-xs text-[#515f74] dark:text-[#cbd5e1] mt-0.5">Manually submit a community report or observation.</p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 text-[#94a3b8] dark:text-[#64748b] hover:text-[#0b1c30] dark:text-white hover:bg-[#f1f5f9] dark:hover:bg-[#1a365d] rounded-lg transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Body */}
              <div className="px-6 py-5 flex flex-col gap-5">
                {/* User / Location row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField
                    id="feedback-user"
                    label="User Name"
                    placeholder="e.g. Jane Simmons"
                    value={userName}
                    onChange={setUserName}
                  />
                  <InputField
                    id="feedback-location"
                    label="Location"
                    placeholder="e.g. Bldg A - Floor 4"
                    value={location}
                    onChange={setLocation}
                  />
                </div>

                {/* Issue Category */}
                <SelectField
                  id="feedback-category"
                  label="Issue Category"
                  options={ISSUE_CATEGORIES}
                  value={category}
                  onChange={setCategory}
                />

                {/* Feedback Description */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="feedback-description" className="text-sm font-medium text-[#515f74] dark:text-[#cbd5e1]">
                    Feedback Description
                  </label>
                  <textarea
                    id="feedback-description"
                    rows={4}
                    placeholder="Describe the issue in detail..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="px-3 py-2.5 border border-[#cbd5e1] dark:border-[#334155] rounded-lg text-sm bg-white dark:bg-[#0b1c30] text-[#0b1c30] dark:text-white placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:border-[#006c49] focus:ring-[#006c49]/10 transition-all resize-none"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 pb-6 pt-2 flex items-center gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 h-11 border border-[#e2e8f0] dark:border-[#1e3a5f] text-[#515f74] dark:text-[#cbd5e1] text-sm font-semibold rounded-lg hover:bg-[#f8fafc] dark:hover:bg-[#0f2942] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitFeedback}
                  className="flex-1 h-11 bg-[#006c49] hover:bg-[#005a3c] active:scale-[0.98] text-white text-sm font-semibold rounded-lg transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 2L11 13" /><path d="M22 2L15 22L11 13L2 9L22 2Z" />
                  </svg>
                  Submit Feedback
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </PageLayout>
  );
}
