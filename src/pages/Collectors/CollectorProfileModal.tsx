import React from 'react';
import { StatusBadge } from '../../components/StatusBadge';
import imgUserProfileAvatar from "../../assets/6c7b9dccb9925ee83b19c4f4237c7c6aa454950a.png";

interface CollectorProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  collector: any; // We can type this properly based on the mock data
}

export function CollectorProfileModal({ isOpen, onClose, collector }: CollectorProfileModalProps) {
  if (!isOpen || !collector) return null;

  return (
    <div className="fixed inset-0 bg-[#0b1c30]/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-[#f8fafc] rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col relative">
        
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#e2e8f0] px-6 py-4 flex items-center justify-between z-10 shrink-0">
          <h2 className="text-xl font-bold text-[#0b1c30]">Collector Profile</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f1f5f9] text-[#64748b] transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Personal Info */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-sm overflow-hidden flex flex-col items-center p-6">
              <div className="w-24 h-24 rounded-full bg-[#e2e8f0] overflow-hidden border-4 border-white shadow-sm ring-1 ring-[#cbd5e1] mb-4">
                <img src={imgUserProfileAvatar} alt="User Profile" className="w-full h-full object-cover" />
              </div>
              <h2 className="text-xl font-bold text-[#0b1c30]">{collector.name}</h2>
              <p className="text-sm font-medium text-[#64748b] mb-4">ID: {collector.id}</p>
              <StatusBadge label={collector.status} variant={collector.status === 'Active' ? 'success' : collector.status === 'Inactive' ? 'danger' : 'warning'} />
              
              <div className="w-full mt-6 pt-6 border-t border-[#e2e8f0] flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-[#64748b]">Region</span>
                  <span className="text-sm font-semibold text-[#0b1c30]">{collector.region}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-[#64748b]">Joined</span>
                  <span className="text-sm font-semibold text-[#0b1c30]">Mar 2024</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-[#64748b]">Contact</span>
                  <span className="text-sm font-semibold text-[#006c49]">+233 24 123 4567</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Stats & Recent Activity */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-white border border-[#e2e8f0] rounded-xl p-4 shadow-sm flex flex-col">
                <span className="text-xs font-semibold text-[#64748b] uppercase tracking-wider mb-1">Total Collections</span>
                <span className="text-2xl font-bold text-[#0b1c30]">1,284</span>
              </div>
              <div className="bg-white border border-[#e2e8f0] rounded-xl p-4 shadow-sm flex flex-col">
                <span className="text-xs font-semibold text-[#64748b] uppercase tracking-wider mb-1">Avg Rating</span>
                <span className="text-2xl font-bold text-[#0b1c30]">{collector.rating} <span className="text-sm text-[#d97706]">⭐</span></span>
              </div>
              <div className="bg-white border border-[#e2e8f0] rounded-xl p-4 shadow-sm flex flex-col col-span-2 md:col-span-1">
                <span className="text-xs font-semibold text-[#64748b] uppercase tracking-wider mb-1">On-Time Rate</span>
                <span className="text-2xl font-bold text-[#0b1c30]">96.5%</span>
              </div>
            </div>

            {/* Recent Jobs */}
            <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-sm flex flex-col flex-1">
              <div className="p-4 border-b border-[#f1f5f9] flex justify-between items-center bg-[#f8fafc]">
                <h3 className="text-lg font-semibold text-[#0b1c30]">Recent Jobs</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white border-b border-[#f1f5f9]">
                      <th className="px-6 py-3 text-xs font-semibold text-[#64748b] uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-xs font-semibold text-[#64748b] uppercase tracking-wider">Location</th>
                      <th className="px-6 py-3 text-xs font-semibold text-[#64748b] uppercase tracking-wider">Volume</th>
                      <th className="px-6 py-3 text-xs font-semibold text-[#64748b] uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f1f5f9]">
                    <tr className="hover:bg-[#f8fafc] transition-colors">
                      <td className="px-6 py-3 whitespace-nowrap text-sm text-[#515f74]">Today, 10:30 AM</td>
                      <td className="px-6 py-3 whitespace-nowrap text-sm font-semibold text-[#0b1c30]">North Hub Station B</td>
                      <td className="px-6 py-3 whitespace-nowrap text-sm text-[#515f74]">142 kg</td>
                      <td className="px-6 py-3 whitespace-nowrap"><StatusBadge label="Completed" variant="success" /></td>
                    </tr>
                    <tr className="hover:bg-[#f8fafc] transition-colors">
                      <td className="px-6 py-3 whitespace-nowrap text-sm text-[#515f74]">Yesterday, 2:15 PM</td>
                      <td className="px-6 py-3 whitespace-nowrap text-sm font-semibold text-[#0b1c30]">East Sector Point 4</td>
                      <td className="px-6 py-3 whitespace-nowrap text-sm text-[#515f74]">89 kg</td>
                      <td className="px-6 py-3 whitespace-nowrap"><StatusBadge label="Completed" variant="success" /></td>
                    </tr>
                    <tr className="hover:bg-[#f8fafc] transition-colors">
                      <td className="px-6 py-3 whitespace-nowrap text-sm text-[#515f74]">May 1, 09:00 AM</td>
                      <td className="px-6 py-3 whitespace-nowrap text-sm font-semibold text-[#0b1c30]">Central Hub Point 1</td>
                      <td className="px-6 py-3 whitespace-nowrap text-sm text-[#515f74]">210 kg</td>
                      <td className="px-6 py-3 whitespace-nowrap"><StatusBadge label="Completed" variant="success" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="p-3 border-t border-[#f1f5f9] bg-white rounded-b-xl text-center">
                <button className="text-[#006c49] text-sm font-semibold hover:underline">View All History</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
