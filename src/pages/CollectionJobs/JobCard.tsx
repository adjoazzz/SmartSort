import React from "react";
import imgUserProfileAvatar from "../../assets/6c7b9dccb9925ee83b19c4f4237c7c6aa454950a.png";

export interface Job {
  id: string;
  device: string;
  type: "ORGANIC" | "PLASTIC" | "GLASS" | "MIXED" | "PAPER";
  location: string;
  zone: string;
  fill: number;
  urgency: "Normal" | "Medium" | "Critical" | "High";
  responseTime: string;
  status: "Pending" | "In Transit" | "Completed";
  assignedTo: string | null;
  distance?: string;
  completedTime?: string;
}

interface JobCardProps {
  job: Job;
  availableCollectors: string[];
  localAssignment: string;
  onCollectorSelect: (jobId: string, collector: string) => void;
  onAccept: (jobId: string) => void;
  onComplete: (jobId: string) => void;
}

const getTypeColorClasses = (type: string) => {
  switch (type) {
    case "ORGANIC":
      return "bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 border border-amber-200/50 dark:border-amber-900/50";
    case "PLASTIC":
      return "bg-purple-50 dark:bg-purple-950/20 text-purple-700 dark:text-purple-400 border border-purple-200/50 dark:border-purple-900/50";
    case "GLASS":
      return "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900/50";
    case "PAPER":
      return "bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400 border border-blue-200/50 dark:border-blue-900/50";
    default:
      return "bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-800";
  }
};

export function JobCard({
  job,
  availableCollectors,
  localAssignment,
  onCollectorSelect,
  onAccept,
  onComplete,
}: JobCardProps) {
  if (job.status === "Pending") {
    return (
      <div className="bg-white dark:bg-[#0b1c30] border border-slate-200/50 dark:border-[#1e3a5f]/50 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-[#006c49]/40 transition-all duration-300 relative flex flex-col gap-4 group">
        {/* Top Tags */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <span className="bg-blue-50 dark:bg-[#0f2942] text-blue-700 dark:text-blue-400 text-[9px] font-black px-2.5 py-1 rounded-md tracking-wider uppercase border border-blue-100/30">
              {job.device}
            </span>
            <span className={`text-[9px] font-black px-2.5 py-1 rounded-md tracking-wider uppercase ${getTypeColorClasses(job.type)}`}>
              {job.type}
            </span>
          </div>
          {job.urgency === "Critical" && (
            <span className="text-[#ba1a1a] animate-pulse flex items-center justify-center font-black text-sm" title="Critical Status">
              ⚠️
            </span>
          )}
        </div>

        {/* Bin Name */}
        <h3 className="text-base font-bold text-[#0f172a] dark:text-white tracking-tight">{job.location}</h3>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-4 border-t border-slate-100 dark:border-[#1e3a5f]/20 pt-3">
          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Fill Level</span>
            <span className={`text-sm font-extrabold ${job.fill >= 90 ? 'text-[#ba1a1a]' : 'text-slate-800 dark:text-white'}`}>
              {job.fill}% Full
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Response Time</span>
            <span className={`text-sm font-extrabold ${job.urgency === "Critical" ? 'text-[#ba1a1a]' : 'text-slate-800 dark:text-white'}`}>
              {job.responseTime}
            </span>
          </div>
        </div>

        {/* Assign Controls */}
        <div className="flex flex-col gap-2 pt-1.5 border-t border-slate-100 dark:border-[#1e3a5f]/20">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Assign Collector</span>
          <select
            value={localAssignment || "Unassigned"}
            onChange={(e) => onCollectorSelect(job.id, e.target.value)}
            className="w-full h-10 px-3 border border-slate-200 dark:border-[#1e3a5f] rounded-xl text-xs font-semibold bg-slate-50 dark:bg-[#0b1c30] text-[#0f172a] dark:text-white outline-none cursor-pointer focus:ring-2 focus:ring-[#006c49]/20"
          >
            <option value="Unassigned">Unassigned</option>
            {availableCollectors.map(collector => (
              <option key={collector} value={collector}>{collector}</option>
            ))}
          </select>

          <button
            onClick={() => onAccept(job.id)}
            disabled={!localAssignment || localAssignment === "Unassigned"}
            className={`h-10 w-full rounded-xl text-xs font-bold tracking-wide transition-all active:scale-[0.98] ${
              localAssignment && localAssignment !== "Unassigned"
                ? "bg-[#006c49] hover:bg-[#005a3c] text-white cursor-pointer"
                : "bg-[#006c49]/10 dark:bg-[#006c49]/20 text-[#006c49]/50 dark:text-emerald-500/50 cursor-not-allowed border border-transparent"
            }`}
          >
            Accept Job
          </button>
        </div>
      </div>
    );
  }

  if (job.status === "In Transit") {
    return (
      <div className="bg-white dark:bg-[#0b1c30] border border-slate-200/50 dark:border-[#1e3a5f]/50 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-[#006c49]/40 transition-all duration-300 flex flex-col gap-4 group">
        {/* Top Tags */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <span className="bg-blue-50 dark:bg-[#0f2942] text-blue-700 dark:text-blue-400 text-[9px] font-black px-2.5 py-1 rounded-md tracking-wider uppercase border border-blue-100/30">
              {job.device}
            </span>
            <span className={`text-[9px] font-black px-2.5 py-1 rounded-md tracking-wider uppercase ${getTypeColorClasses(job.type)}`}>
              {job.type}
            </span>
          </div>
          <span className="inline-flex items-center gap-1 text-[9px] font-black text-green-600 tracking-wide bg-green-50 dark:bg-green-950/20 px-2 py-0.5 rounded-md border border-green-200/50 dark:border-green-900/50 uppercase">
            <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
            Active Dispatch
          </span>
        </div>

        {/* Bin Name */}
        <h3 className="text-base font-bold text-[#0f172a] dark:text-white tracking-tight">{job.location}</h3>

        {/* Assigned Collector Details Box */}
        <div className="bg-slate-50 dark:bg-[#0f2942]/60 border border-slate-100 dark:border-[#1e3a5f]/30 p-3 rounded-xl flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden shrink-0 border border-white">
            <img src={imgUserProfileAvatar} alt="Collector Profile" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-wider">Assigned Collector</span>
            <span className="text-xs font-bold text-slate-800 dark:text-white leading-tight">{job.assignedTo}</span>
            <span className="text-[9px] font-bold text-[#006c49] dark:text-emerald-400 italic mt-0.5 leading-none">{job.distance}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <button className="h-10 border border-slate-200 dark:border-[#1e3a5f] hover:bg-slate-50 dark:hover:bg-[#0f2942] text-slate-600 dark:text-[#cbd5e1] text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all active:scale-[0.98]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            View Map
          </button>
          <button
            onClick={() => onComplete(job.id)}
            className="h-10 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md shadow-green-600/10 active:scale-[0.98]"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Complete
          </button>
        </div>
      </div>
    );
  }

  // Completed
  return (
    <div className="bg-white dark:bg-[#0b1c30] border border-slate-200/50 dark:border-[#1e3a5f]/50 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-[#006c49]/40 transition-all duration-300 flex flex-col gap-4 group">
      {/* Top tags */}
      <div className="flex items-center justify-between">
        <span className="bg-slate-50 dark:bg-[#0f2942] text-slate-500 dark:text-[#cbd5e1] text-[9px] font-black px-2.5 py-1 rounded-md tracking-wider uppercase border border-slate-200/20">
          {job.device}
        </span>
        <span className="w-5 h-5 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-600" title="Completed">
          ✓
        </span>
      </div>

      {/* Bin Location */}
      <h3 className="text-base font-bold text-[#0f172a] dark:text-white tracking-tight">{job.location}</h3>

      {/* Completed by row */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-[#1e3a5f]/20">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-slate-200 overflow-hidden border border-white">
            <img src={imgUserProfileAvatar} alt="Collector Profile" className="w-full h-full object-cover" />
          </div>
          <span className="text-xs text-slate-800 dark:text-white font-semibold">{job.assignedTo}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[7.5px] font-bold text-slate-400 uppercase tracking-wider">Time</span>
          <span className="text-[10px] font-bold text-slate-800 dark:text-white mt-0.5">{job.completedTime}</span>
        </div>
      </div>
    </div>
  );
}
