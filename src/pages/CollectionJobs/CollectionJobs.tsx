import React, { useState } from 'react';
import { PageLayout } from '../../components/PageLayout';
import { StatusBadge } from '../../components/StatusBadge';
import { MetricCard } from '../../components/MetricCard';

/* ── Static data ─────────────────────────────────────────── */

const INITIAL_JOBS_DATA = [
  { id: 'JOB-1042', device: '#SN-9902-X', location: 'North Wing Cafe - B3', zone: 'Level 2, Zone A', fill: 94, urgency: 'Critical', status: 'Pending', assignedTo: null },
  { id: 'JOB-1041', device: '#SN-4431-L', location: 'Main Lobby Entrance', zone: 'Level 1, Main', fill: 82, urgency: 'High', status: 'In Transit', assignedTo: 'Marcus V.' },
  { id: 'JOB-1040', device: '#SN-1108-P', location: 'West Parking B1', zone: 'Basement 1, Zone C', fill: 78, urgency: 'Normal', status: 'Pending', assignedTo: null },
  { id: 'JOB-1039', device: '#SN-8871-S', location: 'Employee Breakroom', zone: 'Level 4, South', fill: 71, urgency: 'Normal', status: 'In Transit', assignedTo: 'Sarah Jenks' },
  { id: 'JOB-1038', device: '#SN-5520-R', location: 'South Lobby', zone: 'Level 1, Zone B', fill: 65, urgency: 'Normal', status: 'Completed', assignedTo: 'Mike R.' },
];

const AVAILABLE_COLLECTORS = [
  'Kwame Mensah', 'Abena Osei', 'Kofi Annan', 'Ama Asare', 'Yaw Appiah'
];

const KPIS = [
  {
    title: 'Pending Jobs', value: '24', trend: '12% increase', trendDirection: 'down' as const,
    iconColorClass: 'text-[#006c49]', iconBgClass: 'bg-[#10b981]/10',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
  },
  {
    title: 'Avg Response Time', value: '18m 24s', trend: '4m faster', trendDirection: 'up' as const,
    iconColorClass: 'text-[#0284c7]', iconBgClass: 'bg-[#0284c7]/10',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
  },
  {
    title: 'Active Collectors', value: '08', trend: '/ 12 Total', trendDirection: 'neutral' as const,
    iconColorClass: 'text-[#515f74]', iconBgClass: 'bg-[#f1f5f9]',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
  },
  {
    title: 'Tonnage Goal', value: '82%', trend: 'Critical Priority', trendDirection: 'down' as const,
    iconColorClass: 'text-[#ba1a1a]', iconBgClass: 'bg-[#ffdad6]',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
  },
];

/* ── Helpers ──────────────────────────────────────────────── */

const getUrgencyVariant = (urgency: string) => {
  if (urgency === 'Critical') return 'danger';
  if (urgency === 'High') return 'warning';
  return 'success';
};

const getStatusVariant = (status: string) => {
  if (status === 'Completed') return 'success';
  if (status === 'In Transit') return 'info';
  return 'warning';
};

const getFillColor = (fill: number) => {
  if (fill >= 90) return 'bg-[#ba1a1a]';
  if (fill >= 80) return 'bg-[#f59e0b]';
  return 'bg-[#10b981]';
};

const getFillTextColor = (fill: number) => {
  if (fill >= 90) return 'text-[#ba1a1a]';
  return 'text-[#0b1c30]';
};

const getInitials = (name: string) =>
  name.split(' ').map(n => n[0]).join('').toUpperCase();

/* ── Component ───────────────────────────────────────────── */

export default function CollectionJobs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [jobs, setJobs] = useState(INITIAL_JOBS_DATA);
  const [assigningJobId, setAssigningJobId] = useState<string | null>(null);

  const handleAssign = (collector: string) => {
    setJobs(prev => prev.map(job => 
      job.id === assigningJobId ? { ...job, assignedTo: collector, status: 'In Transit' } : job
    ));
    setAssigningJobId(null);
  };

  const filteredData = jobs.filter(job => {
    const matchesSearch = job.device.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <PageLayout
      title="Collection Jobs"
      description="Real-time queue of pending bin-emptying tasks across the facility."
      actions={
        <button className="bg-[#006c49] text-white text-sm font-semibold rounded-lg px-5 py-2.5 hover:bg-[#005a3c] transition-all shadow-sm flex items-center gap-2 active:scale-95">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Create Job
        </button>
      }
    >
      {/* ── KPI Overview ─────────────────────────────────── */}
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

      {/* ── Jobs Table ───────────────────────────────────── */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-sm flex flex-col overflow-hidden">

        {/* Table Header */}
        <div className="px-6 py-4 border-b border-[#f1f5f9] bg-[#f8fafc]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="font-semibold text-[#0b1c30] text-base">Job Queue</h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center w-full max-w-xs bg-white rounded-lg border border-[#e2e8f0] focus-within:border-[#cbd5e1] focus-within:shadow-sm transition-all overflow-hidden px-3 py-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.5" className="mr-2 shrink-0">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search jobs..."
                className="bg-transparent border-none outline-none text-xs font-medium text-[#0b1c30] placeholder-[#94a3b8] w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="bg-white border border-[#e2e8f0] text-[#515f74] text-xs font-medium rounded-lg px-3 py-1.5 hover:bg-[#f8fafc] cursor-pointer outline-none focus:ring-2 focus:ring-[#006c49]/20"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Transit">In Transit</option>
              <option value="Completed">Completed</option>
            </select>
            <button className="px-3 py-1.5 text-xs font-semibold border border-[#e2e8f0] rounded-lg hover:bg-white transition-all flex items-center gap-1 text-[#515f74]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
              Export
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-[#f8fafc] border-b border-[#e2e8f0]">
                <th className="px-6 py-4 text-[11px] font-bold text-[#515f74] uppercase tracking-wider">Bin Location</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#515f74] uppercase tracking-wider">Device ID</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#515f74] uppercase tracking-wider">Fill %</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#515f74] uppercase tracking-wider">Urgency</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#515f74] uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#515f74] uppercase tracking-wider">Assigned</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#515f74] uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {filteredData.map((job) => (
                <tr key={job.id} className="hover:bg-[#f8fafc] transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-[#0b1c30]">{job.location}</span>
                      <span className="text-[11px] text-[#515f74] mt-0.5">{job.zone}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[#515f74]">
                    {job.device}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2.5">
                      <div className="w-16 h-1.5 bg-[#f1f5f9] rounded-full overflow-hidden">
                        <div className={`h-full ${getFillColor(job.fill)} rounded-full transition-all`} style={{ width: `${job.fill}%` }} />
                      </div>
                      <span className={`text-sm font-semibold ${getFillTextColor(job.fill)}`}>{job.fill}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge label={job.urgency} variant={getUrgencyVariant(job.urgency) as any} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge label={job.status} variant={getStatusVariant(job.status) as any} hasDot />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {job.assignedTo ? (
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#e2e8f0] flex items-center justify-center shrink-0">
                          <span className="text-[9px] font-bold text-[#515f74]">{getInitials(job.assignedTo)}</span>
                        </div>
                        <span className="text-sm text-[#0b1c30]">{job.assignedTo}</span>
                      </div>
                    ) : (
                      <span className="text-[#94a3b8] italic text-xs">Unassigned</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex justify-end gap-2">
                      {job.assignedTo ? (
                        <>
                          <button className="px-3 py-1 text-[#006c49] text-xs font-bold rounded-md hover:bg-[#006c49]/10 transition-all">
                            Reassign
                          </button>
                          <button className="px-3 py-1 bg-[#0b1c30] text-white text-xs font-bold rounded-md hover:bg-[#1e293b] transition-all">
                            Complete
                          </button>
                        </>
                      ) : job.status === 'Completed' ? (
                        <button className="px-3 py-1 text-[#006c49] text-xs font-bold rounded-md hover:bg-[#006c49]/10 transition-all">
                          View Report
                        </button>
                      ) : (
                        <>
                          <button 
                            onClick={() => setAssigningJobId(job.id)}
                            className="px-3 py-1 bg-[#006c49] text-white text-xs font-bold rounded-md hover:bg-[#005a3c] transition-all"
                          >
                            Assign
                          </button>
                          <button className="px-3 py-1 border border-[#e2e8f0] text-[#515f74] text-xs font-bold rounded-md hover:bg-[#f8fafc] transition-all">
                            Complete
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-[#94a3b8] text-sm">
                    No collection jobs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-6 py-4 border-t border-[#f1f5f9] bg-[#f8fafc]/50 flex items-center justify-between mt-auto">
          <span className="text-xs text-[#515f74]">
            Showing <span className="font-bold text-[#0b1c30]">{filteredData.length}</span> of {jobs.length} active jobs
          </span>
          <div className="flex items-center gap-1">
            <button className="p-1 text-[#94a3b8] hover:text-[#0b1c30] disabled:opacity-30 cursor-not-allowed" disabled>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <button className="px-3 py-1 bg-[#006c49]/10 text-[#006c49] text-xs font-bold rounded-md">1</button>
            <button className="px-3 py-1 text-[#515f74] text-xs font-medium hover:bg-[#f1f5f9] rounded-md transition-colors">2</button>
            <button className="px-3 py-1 text-[#515f74] text-xs font-medium hover:bg-[#f1f5f9] rounded-md transition-colors">3</button>
            <button className="p-1 text-[#94a3b8] hover:text-[#0b1c30] transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── Bottom Bento: Insight + Facility Load ─────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Optimization Insight */}
        <div className="lg:col-span-2 bg-[#0b1c30] rounded-xl p-6 flex items-center justify-between overflow-hidden relative shadow-lg">
          <div className="relative z-10 space-y-3 max-w-lg">
            <h4 className="text-white font-semibold text-lg">Optimization Insight</h4>
            <p className="text-[#94a3b8] text-sm leading-relaxed">
              3 bins in the <span className="text-[#10b981] font-semibold">North Wing</span> are reaching capacity. Suggesting a batch collection route to save 12 minutes of transit time.
            </p>
            <button className="mt-1 px-4 py-2.5 bg-[#006c49] text-white text-xs font-bold rounded-lg hover:bg-[#005a3c] transition-all shadow-sm tracking-wide">
              Deploy Batch Route
            </button>
          </div>
          {/* Decorative background */}
          <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-[#006c49]/30 rounded-full blur-3xl"></div>
          <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-10">
            <svg width="160" height="160" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="0.5">
              <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </div>
        </div>

        {/* Facility Load */}
        <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-[#006c49]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <h4 className="font-bold text-sm text-[#0b1c30]">Facility Load</h4>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-xs font-medium text-[#0b1c30]">
              <span>Sorting Capacity</span>
              <span>92%</span>
            </div>
            <div className="w-full h-2 bg-[#f1f5f9] rounded-full overflow-hidden">
              <div className="h-full bg-[#006c49] rounded-full" style={{ width: '92%' }} />
            </div>
            <p className="text-[11px] text-[#515f74] leading-relaxed">
              Nearing maximum capacity for the morning shift. Consider additional staffing.
            </p>
          </div>
          <div className="space-y-3 pt-3 border-t border-[#f1f5f9]">
            <div className="flex justify-between text-xs font-medium text-[#0b1c30]">
              <span>Fleet Utilization</span>
              <span>67%</span>
            </div>
            <div className="w-full h-2 bg-[#f1f5f9] rounded-full overflow-hidden">
              <div className="h-full bg-[#0284c7] rounded-full" style={{ width: '67%' }} />
            </div>
            <p className="text-[11px] text-[#515f74] leading-relaxed">
              8 of 12 collection vehicles currently deployed.
            </p>
          </div>
        </div>
      </div>

      {/* ── Assignment Modal ──────────────────────────────── */}
      {assigningJobId && (
        <div className="fixed inset-0 bg-[#0b1c30]/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden flex flex-col">
            <div className="p-4 border-b border-[#e2e8f0] flex justify-between items-center bg-[#f8fafc]">
              <h3 className="font-bold text-[#0b1c30]">Assign Collector</h3>
              <button onClick={() => setAssigningJobId(null)} className="text-[#94a3b8] hover:text-[#0b1c30] transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <div className="p-2 max-h-[300px] overflow-y-auto flex flex-col gap-1">
              {AVAILABLE_COLLECTORS.map(collector => (
                <button 
                  key={collector}
                  onClick={() => handleAssign(collector)}
                  className="w-full text-left px-4 py-3 hover:bg-[#f8fafc] rounded-lg transition-colors flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 rounded-full bg-[#e2e8f0] flex items-center justify-center shrink-0 group-hover:bg-[#006c49]/10 transition-colors">
                    <span className="text-[10px] font-bold text-[#515f74] group-hover:text-[#006c49]">{getInitials(collector)}</span>
                  </div>
                  <span className="text-sm font-semibold text-[#0b1c30]">{collector}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
}