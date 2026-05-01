import React, { useState } from 'react';
import { PageLayout } from '../../components/PageLayout';
import { StatusBadge } from '../../components/StatusBadge';

const ALERTS_DATA = [
  { id: 'ALT-9921', timestamp: '14:32:01', type: 'Hardware Failure', device: 'SS-UNIT-042', severity: 'CRITICAL', message: 'Conveyor belt motor jammed', status: 'Active' },
  { id: 'ALT-9920', timestamp: '14:15:22', type: 'Sensor Calibration', device: 'SS-UNIT-015', severity: 'WARNING', message: 'Optical sensor B variance detected', status: 'Active' },
  { id: 'ALT-9919', timestamp: '13:45:10', type: 'Network Disconnect', device: 'SS-UNIT-089', severity: 'CRITICAL', message: 'Lost connection to local hub', status: 'Active' },
  { id: 'ALT-9918', timestamp: '13:12:05', type: 'Bin Full', device: 'SS-UNIT-104', severity: 'WARNING', message: 'Organic bin capacity at 95%', status: 'Active' },
  { id: 'ALT-9917', timestamp: '11:30:00', type: 'Maintenance', device: 'SS-UNIT-003', severity: 'INFO', message: 'Scheduled firmware update complete', status: 'Resolved' },
  { id: 'ALT-9916', timestamp: '10:15:45', type: 'Bin Full', device: 'SS-UNIT-077', severity: 'WARNING', message: 'Glass separator bin capacity at 90%', status: 'Active' },
  { id: 'ALT-9915', timestamp: '09:05:12', type: 'Hardware Failure', device: 'SS-UNIT-021', severity: 'CRITICAL', message: 'Sorter gate actuator timeout', status: 'Resolved' },
  { id: 'ALT-9914', timestamp: '08:00:00', type: 'System Boot', device: 'SS-UNIT-056', severity: 'INFO', message: 'System initialized normally', status: 'Resolved' },
];

export default function Alerts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('ALL');

  // Filter data based on search and dropdown
  const filteredData = ALERTS_DATA.filter(alert => {
    const matchesSearch = alert.device.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          alert.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === 'ALL' || alert.severity === severityFilter;
    return matchesSearch && matchesSeverity;
  });

  const criticalCount = ALERTS_DATA.filter(a => a.severity === 'CRITICAL' && a.status === 'Active').length;
  const warningCount = ALERTS_DATA.filter(a => a.severity === 'WARNING' && a.status === 'Active').length;

  return (
    <PageLayout
      title="System Alerts"
      description="Real-time notification center for facility sensor network."
      actions={
        <div className="flex gap-4 items-center">
          <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-sm flex items-center h-10 overflow-hidden divide-x divide-[#f1f5f9]">
            <div className="px-4 py-2 flex flex-col items-center justify-center">
              <span className="text-[10px] font-bold text-[#ba1a1a] tracking-wider">CRITICAL</span>
              <span className="text-sm font-bold text-[#ba1a1a]">{criticalCount < 10 ? `0${criticalCount}` : criticalCount}</span>
            </div>
            <div className="px-4 py-2 flex flex-col items-center justify-center bg-[#f8fafc]">
              <span className="text-[10px] font-bold text-[#d97706] tracking-wider">WARNINGS</span>
              <span className="text-sm font-bold text-[#d97706]">{warningCount < 10 ? `0${warningCount}` : warningCount}</span>
            </div>
          </div>
        </div>
      }
    >
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
              placeholder="Search alerts by device or message..." 
              className="bg-transparent border-none outline-none text-sm font-medium text-[#0b1c30] placeholder-[#94a3b8] w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            <select 
              className="bg-white border border-[#e2e8f0] text-[#515f74] text-sm font-medium rounded-lg px-4 py-2 hover:bg-[#f8fafc] cursor-pointer"
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
            >
              <option value="ALL">All Severities</option>
              <option value="CRITICAL">Critical Only</option>
              <option value="WARNING">Warnings Only</option>
              <option value="INFO">Info Only</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-[#f8fafc] border-b border-[#e2e8f0]">
                <th className="px-6 py-4 text-xs font-semibold text-[#64748b] uppercase tracking-wider">Alert ID</th>
                <th className="px-6 py-4 text-xs font-semibold text-[#64748b] uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-4 text-xs font-semibold text-[#64748b] uppercase tracking-wider">Severity</th>
                <th className="px-6 py-4 text-xs font-semibold text-[#64748b] uppercase tracking-wider">Device</th>
                <th className="px-6 py-4 text-xs font-semibold text-[#64748b] uppercase tracking-wider">Message</th>
                <th className="px-6 py-4 text-xs font-semibold text-[#64748b] uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-[#64748b] uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {filteredData.map((alert) => (
                <tr key={alert.id} className="hover:bg-[#f8fafc] transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[#515f74]">{alert.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#515f74]">{alert.timestamp}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge 
                      label={alert.severity} 
                      variant={alert.severity === 'CRITICAL' ? 'danger' : alert.severity === 'WARNING' ? 'warning' : 'info'} 
                      hasDot 
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#065f46]">{alert.device}</td>
                  <td className="px-6 py-4 text-sm text-[#0b1c30]">{alert.message}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold ${
                      alert.status === 'Active' ? 'bg-[#ffdad6]/20 text-[#ba1a1a]' : 'bg-[#e2e8f0] text-[#64748b]'
                    }`}>
                      {alert.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-[#006c49] text-sm font-semibold hover:underline">
                      {alert.status === 'Active' ? 'Acknowledge' : 'View Details'}
                    </button>
                  </td>
                </tr>
              ))}
              
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-[#94a3b8] text-sm">
                    No alerts found matching your criteria
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