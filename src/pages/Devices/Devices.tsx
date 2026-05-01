import React, { useState } from 'react';
import { PageLayout } from '../../components/PageLayout';
import { StatusBadge } from '../../components/StatusBadge';

// Mock Data for Devices
const DEVICE_FLEET_DATA = [
  { id: '982-AX-01', name: 'SS-UNIT-042', location: 'North Dock A-4', status: 'Online', fill: 78, lastActive: '2m ago', firmware: 'v2.4.1' },
  { id: '114-BK-22', name: 'SS-UNIT-015', location: 'South Lobby', status: 'Online', fill: 92, lastActive: '15m ago', firmware: 'v2.4.0' },
  { id: '055-CF-99', name: 'SS-UNIT-089', location: 'Parking Level 2', status: 'Offline', fill: 12, lastActive: '4h ago', firmware: 'v2.4.1' },
  { id: '887-AA-09', name: 'SS-UNIT-104', location: 'Cafeteria Main', status: 'Online', fill: 45, lastActive: '1m ago', firmware: 'v2.4.1' },
  { id: '332-ZX-55', name: 'SS-UNIT-003', location: 'Admin Annex', status: 'Maintenance', fill: 0, lastActive: '2d ago', firmware: 'v2.3.9' },
  { id: '441-PQ-12', name: 'SS-UNIT-077', location: 'East Wing B', status: 'Online', fill: 88, lastActive: '5m ago', firmware: 'v2.4.1' },
  { id: '990-MN-34', name: 'SS-UNIT-021', location: 'Loading Bay 1', status: 'Online', fill: 65, lastActive: '12m ago', firmware: 'v2.4.1' },
  { id: '221-KL-88', name: 'SS-UNIT-056', location: 'Staff Room', status: 'Online', fill: 34, lastActive: '8m ago', firmware: 'v2.4.0' },
];

export default function Devices() {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter data based on search
  const filteredData = DEVICE_FLEET_DATA.filter(device => 
    device.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    device.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageLayout
      title="Device Fleet"
      description="Managing 128 active hardware units across 14 facilities."
      actions={
        <div className="flex gap-3">
          <button className="bg-white border border-[#e2e8f0] text-[#515f74] text-sm font-semibold rounded-lg px-4 py-2 hover:bg-[#f8fafc] transition-colors shadow-sm flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
            Filters
          </button>
          <button className="bg-[#006c49] text-white text-sm font-semibold rounded-lg px-4 py-2 hover:bg-[#005a3c] transition-colors shadow-sm flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Register Device
          </button>
        </div>
      }
    >
      <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-sm flex flex-col overflow-hidden">
        
        {/* Local Table Search Bar */}
        <div className="p-4 border-b border-[#f1f5f9] bg-white flex items-center">
          <div className="flex items-center w-full max-w-md bg-[#f8fafc] rounded-lg border border-[#e2e8f0] focus-within:border-[#cbd5e1] focus-within:bg-white focus-within:shadow-sm transition-all overflow-hidden px-4 py-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              placeholder="Search devices, locations, or serials..." 
              className="bg-transparent border-none outline-none text-sm font-medium text-[#0b1c30] placeholder-[#94a3b8] w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-[#f8fafc] border-b border-[#e2e8f0]">
                <th className="px-6 py-4 text-xs font-semibold text-[#64748b] uppercase tracking-wider">Unit Name</th>
                <th className="px-6 py-4 text-xs font-semibold text-[#64748b] uppercase tracking-wider">Location</th>
                <th className="px-6 py-4 text-xs font-semibold text-[#64748b] uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-[#64748b] uppercase tracking-wider">Fill %</th>
                <th className="px-6 py-4 text-xs font-semibold text-[#64748b] uppercase tracking-wider">Last Active</th>
                <th className="px-6 py-4 text-xs font-semibold text-[#64748b] uppercase tracking-wider">Firmware</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {filteredData.map((device, idx) => (
                <tr key={device.id} className="hover:bg-[#f8fafc] transition-colors group cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-[#065f46] group-hover:text-[#006c49]">{device.name}</span>
                      <span className="text-[10px] text-[#94a3b8] font-mono mt-0.5">ID: {device.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#515f74]">{device.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge 
                      label={device.status} 
                      variant={device.status === 'Online' ? 'success' : device.status === 'Offline' ? 'neutral' : 'warning'} 
                      hasDot 
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3 w-24">
                      <div className="w-full bg-[#f1f5f9] rounded-full h-1.5 overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${device.fill > 85 ? 'bg-[#ba1a1a]' : 'bg-[#10b981]'}`} 
                          style={{ width: `${device.fill}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-[#0b1c30] w-8">{device.fill}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#515f74]">{device.lastActive}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-[#94a3b8]">{device.firmware}</td>
                </tr>
              ))}
              
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-[#94a3b8] text-sm">
                    No devices found matching "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="p-4 border-t border-[#f1f5f9] bg-white flex items-center justify-between">
          <span className="text-sm text-[#515f74]">Showing <span className="font-semibold text-[#0b1c30]">{filteredData.length}</span> of 128 devices</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-[#e2e8f0] rounded text-sm text-[#94a3b8] cursor-not-allowed">Previous</button>
            <button className="px-3 py-1 border border-[#e2e8f0] rounded text-sm text-[#0b1c30] hover:bg-[#f8fafc] font-medium transition-colors">Next</button>
          </div>
        </div>

      </div>
    </PageLayout>
  );
}