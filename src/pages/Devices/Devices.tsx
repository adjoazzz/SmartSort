import React, { useState } from 'react';
import { PageLayout } from '../../components/PageLayout';
import { StatusBadge } from '../../components/StatusBadge';
import { RegisterDeviceModal } from '../../components/RegisterDeviceModal';

// Mock Data for Devices
const DEVICE_FLEET_DATA = [
  { id: '982-AX-01', name: 'SS-UNIT-042', location: 'North Dock A-4', status: 'Online', fill: 78, lastActive: '2m ago', firmware: 'v2.4.1' },
  { id: '114-BK-22', name: 'SS-UNIT-015', location: 'South Lobby', status: 'Online', fill: 92, lastActive: '15m ago', firmware: 'v2.4.0' },
  { id: '055-CF-99', name: 'SS-UNIT-089', location: 'Parking Level 2', status: 'Offline', fill: 12, lastActive: '4h ago', firmware: 'v2.4.1' },
  { id: '887-AA-09', name: 'SS-UNIT-104', location: 'East Wing Cafeteria', status: 'Online', fill: 45, lastActive: 'Just now', firmware: 'v2.4.1' },
  { id: '231-ZZ-44', name: 'SS-UNIT-033', location: 'Main Entrance', status: 'Online', fill: 61, lastActive: '1m ago', firmware: 'v2.3.9' },
  { id: '443-TR-88', name: 'SS-UNIT-067', location: 'Backyard Storage', status: 'Online', fill: 22, lastActive: '8m ago', firmware: 'v2.4.1' },
  { id: '901-XS-12', name: 'SS-UNIT-119', location: 'Suite 400 Kitchen', status: 'Critical', fill: 98, lastActive: '30s ago', firmware: 'v2.4.1' },
];

const EVENT_LOGS = [
  { id: 1, type: 'SORTING EVENT', time: '14:22:11', desc: 'Detected: Plastic Bottle (PET). Routed to Bin A.', color: 'text-[#10b981]' },
  { id: 2, type: 'SORTING EVENT', time: '14:21:55', desc: 'Detected: Aluminum Can. Routed to Bin A.', color: 'text-[#10b981]' },
  { id: 3, type: 'SENSOR UPDATE', time: '14:15:00', desc: 'Bin A reached threshold level (75%). Notification sent.', color: 'text-[#f59e0b]' },
  { id: 4, type: 'NETWORK SYNC', time: '14:00:02', desc: 'Cloud handshake successful. Log batch transmitted.', color: 'text-[#3b82f6]' },
  { id: 5, type: 'POWER CYCLE', time: '08:12:44', desc: 'Scheduled maintenance restart completed.', color: 'text-[#64748b] dark:text-[#94a3b8] dark:text-[#64748b]' },
  { id: 6, type: 'SORTING EVENT', time: '08:05:12', desc: 'Detected: Paperboard. Routed to Bin B.', color: 'text-[#10b981]' },
];

export default function Devices() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDevice, setSelectedDevice] = useState('982-AX-01');
  const [showRegisterModal, setShowRegisterModal] = useState(false);

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
          <button className="bg-white dark:bg-[#0b1c30] border border-[#e2e8f0] dark:border-[#1e3a5f] text-[#515f74] dark:text-[#cbd5e1] text-sm font-semibold rounded-lg px-4 py-2 hover:bg-[#f8fafc] dark:bg-[#0f2942] transition-colors shadow-sm flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
            Filters
          </button>
          <button onClick={() => setShowRegisterModal(true)} className="bg-[#006c49] text-white text-sm font-semibold rounded-lg px-4 py-2 hover:bg-[#005a3c] transition-colors shadow-sm flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Register Device
          </button>
        </div>
      }
    >
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className="flex-1 w-full bg-white dark:bg-[#0b1c30] border border-[#e2e8f0] dark:border-[#1e3a5f] rounded-xl shadow-sm flex flex-col overflow-hidden">
          
          {/* Local Table Search Bar */}
          <div className="p-4 border-b border-[#f1f5f9] dark:border-[#0f2942] bg-white dark:bg-[#0b1c30] flex items-center">
            <div className="flex items-center w-full max-w-md bg-[#f8fafc] dark:bg-[#0f2942] rounded-lg border border-[#e2e8f0] dark:border-[#1e3a5f] focus-within:border-[#cbd5e1] dark:border-[#334155] focus-within:bg-white dark:bg-[#0b1c30] focus-within:shadow-sm transition-all overflow-hidden px-4 py-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input 
                type="text" 
                placeholder="Search devices, locations, or serials..." 
                className="bg-transparent border-none outline-none text-sm font-medium text-[#0b1c30] dark:text-white placeholder-[#94a3b8] w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Data Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-[#f8fafc] dark:bg-[#0f2942] border-b border-[#e2e8f0] dark:border-[#1e3a5f]">
                  <th className="px-6 py-4 text-xs font-semibold text-[#64748b] dark:text-[#94a3b8] dark:text-[#64748b] uppercase tracking-wider">Unit Name</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#64748b] dark:text-[#94a3b8] dark:text-[#64748b] uppercase tracking-wider">Location</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#64748b] dark:text-[#94a3b8] dark:text-[#64748b] uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#64748b] dark:text-[#94a3b8] dark:text-[#64748b] uppercase tracking-wider">Fill %</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#64748b] dark:text-[#94a3b8] dark:text-[#64748b] uppercase tracking-wider">Last Active</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#64748b] dark:text-[#94a3b8] dark:text-[#64748b] uppercase tracking-wider">Firmware</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f1f5f9]">
                {filteredData.map((device, idx) => (
                  <tr 
                    key={device.id} 
                    onClick={() => setSelectedDevice(device.id)}
                    className={`hover:bg-[#f8fafc] dark:bg-[#0f2942] transition-colors group cursor-pointer relative ${selectedDevice === device.id ? 'bg-[#f8fafc] dark:bg-[#0f2942]' : ''}`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap relative">
                      {selectedDevice === device.id && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#10b981]"></div>
                      )}
                      <div className="flex flex-col">
                        <span className={`text-sm font-medium ${selectedDevice === device.id ? 'text-[#065f46]' : 'text-[#065f46] group-hover:text-[#006c49]'}`}>
                          {device.name}
                        </span>
                        <span className="text-[10px] text-[#94a3b8] dark:text-[#64748b] font-mono mt-0.5">ID: {device.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#515f74] dark:text-[#cbd5e1]">{device.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge 
                        label={device.status === 'Critical' ? 'Critical' : device.status} 
                        variant={device.status === 'Online' ? 'success' : device.status === 'Offline' ? 'neutral' : device.status === 'Critical' ? 'danger' : 'warning'} 
                        hasDot 
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3 w-24">
                        <div className="w-full bg-[#f1f5f9] dark:bg-[#1a365d] rounded-full h-1.5 overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${device.fill > 85 ? 'bg-[#ba1a1a]' : 'bg-[#10b981]'}`} 
                            style={{ width: `${device.fill}%` }}
                          />
                        </div>
                        <span className={`text-sm font-medium ${device.fill > 85 ? 'text-[#ba1a1a]' : 'text-[#0b1c30] dark:text-white'} w-8`}>{device.fill}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#515f74] dark:text-[#cbd5e1]">{device.lastActive}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-[#94a3b8] dark:text-[#64748b]">{device.firmware}</td>
                  </tr>
                ))}
                
                {filteredData.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-[#94a3b8] dark:text-[#64748b] text-sm">
                      No devices found matching "{searchTerm}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination Footer */}
          <div className="p-4 border-t border-[#f1f5f9] dark:border-[#0f2942] bg-white dark:bg-[#0b1c30] flex items-center justify-between mt-auto">
            <span className="text-sm text-[#515f74] dark:text-[#cbd5e1]">Showing <span className="font-semibold text-[#0b1c30] dark:text-white">1-12</span> of 128 devices</span>
            <div className="flex gap-1">
              <button className="w-8 h-8 flex items-center justify-center rounded text-[#94a3b8] dark:text-[#64748b] hover:text-[#0b1c30] dark:text-white transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded bg-[#10b981] text-white text-sm font-medium">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded text-[#0b1c30] dark:text-white hover:bg-[#f1f5f9] dark:bg-[#1a365d] text-sm font-medium transition-colors">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded text-[#0b1c30] dark:text-white hover:bg-[#f1f5f9] dark:bg-[#1a365d] text-sm font-medium transition-colors">3</button>
              <button className="w-8 h-8 flex items-center justify-center rounded text-[#0b1c30] dark:text-white hover:bg-[#f1f5f9] dark:bg-[#1a365d] transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side Panel */}
        <div className="w-full lg:w-[340px] flex flex-col gap-6 shrink-0">
          
          {/* Live Status Card */}
          <div className="bg-white dark:bg-[#0b1c30] border border-[#e2e8f0] dark:border-[#1e3a5f] rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-[#0b1c30] dark:text-white">SS-UNIT-042</h3>
                <p className="text-sm text-[#515f74] dark:text-[#cbd5e1] mt-1">Live Status &amp; Levels</p>
              </div>
              <button className="text-xs font-bold text-[#10b981] uppercase tracking-wider hover:text-[#006c49] transition-colors">
                Edit Specs
              </button>
            </div>

            <div className="flex justify-between gap-3 mb-8">
              {/* Recycling Bar */}
              <div className="flex flex-col items-center flex-1">
                <div className="w-full h-32 bg-[#f8fafc] dark:bg-[#0f2942] rounded-t-md overflow-hidden relative flex flex-col justify-end border-b-2 border-[#89ceff]">
                  <div className="w-full bg-[#89ceff] flex items-center justify-center absolute bottom-0 left-0 right-0 transition-all duration-500" style={{ height: '78%' }}>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                      <span className="text-lg font-bold text-[#0b1c30] dark:text-white">78%</span>
                  </div>
                </div>
                <div className="mt-3 text-[10px] font-semibold text-[#64748b] dark:text-[#94a3b8] dark:text-[#64748b] tracking-wider uppercase text-center">Recycling</div>
              </div>

              {/* Organics Bar */}
              <div className="flex flex-col items-center flex-1">
                <div className="w-full h-32 bg-[#f8fafc] dark:bg-[#0f2942] rounded-t-md overflow-hidden relative flex flex-col justify-end border-b-2 border-[#6ffbbe]">
                  <div className="w-full bg-[#6ffbbe] flex items-center justify-center absolute bottom-0 left-0 right-0 transition-all duration-500" style={{ height: '45%' }}>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                      <span className="text-lg font-bold text-[#0b1c30] dark:text-white">45%</span>
                  </div>
                </div>
                <div className="mt-3 text-[10px] font-semibold text-[#64748b] dark:text-[#94a3b8] dark:text-[#64748b] tracking-wider uppercase text-center">Organics</div>
              </div>

              {/* General Bar */}
              <div className="flex flex-col items-center flex-1">
                <div className="w-full h-32 bg-[#f8fafc] dark:bg-[#0f2942] rounded-t-md overflow-hidden relative flex flex-col justify-end border-b-2 border-[#cbd5e1] dark:border-[#334155]">
                  <div className="w-full bg-[#cbd5e1] flex items-center justify-center absolute bottom-0 left-0 right-0 transition-all duration-500" style={{ height: '12%' }}>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                      <span className="text-lg font-bold text-[#0b1c30] dark:text-white">12%</span>
                  </div>
                </div>
                <div className="mt-3 text-[10px] font-semibold text-[#64748b] dark:text-[#94a3b8] dark:text-[#64748b] tracking-wider uppercase text-center">General</div>
              </div>
            </div>

            <div className="flex justify-between border-t border-[#f1f5f9] dark:border-[#0f2942] pt-5">
              <div>
                <p className="text-[10px] font-semibold text-[#94a3b8] dark:text-[#64748b] tracking-wider uppercase">Internal Temp</p>
                <p className="text-base font-bold text-[#0b1c30] dark:text-white mt-1">22.4°C</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-semibold text-[#94a3b8] dark:text-[#64748b] tracking-wider uppercase">Uptime</p>
                <p className="text-base font-bold text-[#0b1c30] dark:text-white mt-1">14d 6h 12m</p>
              </div>
            </div>
          </div>

          {/* Event Log Card */}
          <div className="bg-white dark:bg-[#0b1c30] border border-[#e2e8f0] dark:border-[#1e3a5f] rounded-xl shadow-sm flex flex-col h-full max-h-[500px]">
            <div className="p-4 border-b border-[#f1f5f9] dark:border-[#0f2942] flex justify-between items-center bg-white dark:bg-[#0b1c30] rounded-t-xl sticky top-0">
              <h3 className="text-xs font-bold text-[#0b1c30] dark:text-white tracking-wider uppercase">Device Event Log</h3>
              <button className="text-[#94a3b8] dark:text-[#64748b] hover:text-[#0b1c30] dark:text-white transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 2v6h-6"></path>
                  <path d="M3 12a9 9 0 1 0 2.13-5.88L21 8"></path>
                </svg>
              </button>
            </div>
            
            <div className="overflow-y-auto flex-1 p-2">
              <ul className="divide-y divide-[#f1f5f9]">
                {EVENT_LOGS.map((log) => (
                  <li key={log.id} className="p-3 hover:bg-[#f8fafc] dark:bg-[#0f2942] rounded-lg transition-colors cursor-default">
                    <div className="flex justify-between items-start mb-1.5">
                      <span className={`text-[10px] font-bold tracking-wider uppercase ${log.color}`}>{log.type}</span>
                      <span className="text-[10px] text-[#94a3b8] dark:text-[#64748b]">{log.time}</span>
                    </div>
                    <p className="text-sm text-[#515f74] dark:text-[#cbd5e1] leading-relaxed">{log.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
      <RegisterDeviceModal isOpen={showRegisterModal} onClose={() => setShowRegisterModal(false)} />
    </PageLayout>
  );
}