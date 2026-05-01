import React, { useState } from 'react';
import { PageLayout } from '../../components/PageLayout';
import { StatusBadge } from '../../components/StatusBadge';
import { MetricCard } from '../../components/MetricCard';

const JOBS_DATA = [
  { id: 'JOB-1042', device: 'SS-UNIT-042', location: 'North Dock A-4', type: 'General Waste', priority: 'High', status: 'Pending', assignedTo: 'Unassigned' },
  { id: 'JOB-1041', device: 'SS-UNIT-104', location: 'Cafeteria Main', type: 'Organic', priority: 'High', status: 'In Progress', assignedTo: 'John D.' },
  { id: 'JOB-1040', device: 'SS-UNIT-015', location: 'South Lobby', type: 'Recyclables', priority: 'Medium', status: 'Pending', assignedTo: 'Sarah M.' },
  { id: 'JOB-1039', device: 'SS-UNIT-089', location: 'Parking Level 2', type: 'E-Waste', priority: 'Low', status: 'Completed', assignedTo: 'Mike R.' },
  { id: 'JOB-1038', device: 'SS-UNIT-077', location: 'East Wing B', type: 'Recyclables', priority: 'Medium', status: 'Completed', assignedTo: 'Sarah M.' },
];

export default function CollectionJobs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredData = JOBS_DATA.filter(job => {
    const matchesSearch = job.device.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getPriorityVariant = (priority: string) => {
    if (priority === 'High') return 'danger';
    if (priority === 'Medium') return 'warning';
    return 'info';
  };

  const getStatusVariant = (status: string) => {
    if (status === 'Completed') return 'success';
    if (status === 'In Progress') return 'warning';
    return 'neutral';
  };

  return (
    <PageLayout
      title="Collection Jobs"
      description="Manage and track bin emptying and maintenance tasks."
      actions={
        <button className="bg-[#006c49] text-white text-sm font-semibold rounded-lg px-4 py-2 hover:bg-[#005a3c] transition-colors shadow-sm flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Create Job
        </button>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-2">
        <MetricCard 
          title="PENDING JOBS" 
          value="12" 
          trend="Requires assignment" 
          iconColorClass="text-[#d97706]" 
          iconBgClass="bg-[#fef3c7]"
          iconSvg={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>}
        />
        <MetricCard 
          title="IN PROGRESS" 
          value="5" 
          trend="Currently active" 
          iconColorClass="text-[#0284c7]" 
          iconBgClass="bg-[#e0f2fe]"
          iconSvg={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>}
        />
        <MetricCard 
          title="COMPLETED TODAY" 
          value="24" 
          trend="+3 vs yesterday" 
          trendDirection="up"
          iconColorClass="text-[#006c49]" 
          iconBgClass="bg-[#10b981]/10"
          iconSvg={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>}
        />
      </div>

      <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-sm flex flex-col overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-[#f1f5f9] bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center w-full max-w-md bg-[#f8fafc] rounded-lg border border-[#e2e8f0] focus-within:border-[#cbd5e1] focus-within:bg-white focus-within:shadow-sm transition-all overflow-hidden px-4 py-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              placeholder="Search jobs, locations, or devices..." 
              className="bg-transparent border-none outline-none text-sm font-medium text-[#0b1c30] placeholder-[#94a3b8] w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            <select 
              className="bg-white border border-[#e2e8f0] text-[#515f74] text-sm font-medium rounded-lg px-4 py-2 hover:bg-[#f8fafc] cursor-pointer"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">All Statuses</option>
              <option value="Pending">Pending Only</option>
              <option value="In Progress">In Progress Only</option>
              <option value="Completed">Completed Only</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-[#f8fafc] border-b border-[#e2e8f0]">
                <th className="px-6 py-4 text-xs font-semibold text-[#64748b] uppercase tracking-wider">Job ID</th>
                <th className="px-6 py-4 text-xs font-semibold text-[#64748b] uppercase tracking-wider">Location / Device</th>
                <th className="px-6 py-4 text-xs font-semibold text-[#64748b] uppercase tracking-wider">Waste Type</th>
                <th className="px-6 py-4 text-xs font-semibold text-[#64748b] uppercase tracking-wider">Priority</th>
                <th className="px-6 py-4 text-xs font-semibold text-[#64748b] uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-[#64748b] uppercase tracking-wider">Assigned To</th>
                <th className="px-6 py-4 text-xs font-semibold text-[#64748b] uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {filteredData.map((job) => (
                <tr key={job.id} className="hover:bg-[#f8fafc] transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[#515f74]">{job.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-[#0b1c30]">{job.location}</span>
                      <span className="text-xs text-[#94a3b8]">{job.device}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#515f74]">{job.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge label={job.priority} variant={getPriorityVariant(job.priority) as any} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge label={job.status} variant={getStatusVariant(job.status) as any} hasDot />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#515f74]">
                    {job.assignedTo === 'Unassigned' ? (
                      <span className="text-[#94a3b8] italic">Unassigned</span>
                    ) : (
                      job.assignedTo
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-[#006c49] text-sm font-semibold hover:underline">
                      {job.status === 'Completed' ? 'View Report' : 'Update Status'}
                    </button>
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
      </div>
    </PageLayout>
  );
}