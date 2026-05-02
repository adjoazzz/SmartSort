import React, { useState } from 'react';
import { PageLayout } from '../../components/PageLayout';
import { StatusBadge } from '../../components/StatusBadge';
import { CollectorProfileModal } from './CollectorProfileModal';
import { InviteCollectorModal } from './InviteCollectorModal';

const MOCK_COLLECTORS = [
  { id: 'COL-001', name: 'Kwame Mensah', region: 'North Sector', status: 'Active', rating: 4.8 },
  { id: 'COL-002', name: 'Abena Osei', region: 'East Sector', status: 'Active', rating: 4.9 },
  { id: 'COL-003', name: 'Kofi Annan', region: 'South Sector', status: 'Inactive', rating: 4.5 },
  { id: 'COL-004', name: 'Ama Asare', region: 'West Sector', status: 'Active', rating: 4.7 },
  { id: 'COL-005', name: 'Yaw Appiah', region: 'Central Hub', status: 'On Leave', rating: 4.6 }
];

export default function Collectors() {
  const [selectedCollector, setSelectedCollector] = useState<any>(null);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  return (
    <PageLayout
      title="Collectors"
      description="Manage and track collection personnel across all sectors."
      actions={
        <button 
          onClick={() => setIsInviteModalOpen(true)}
          className="bg-[#006c49] hover:bg-[#005a3c] text-white text-sm font-medium rounded-lg px-4 py-2 transition-colors"
        >
          <span className="text-lg font-bold">+</span> Add New Collector
        </button>
      }
    >
      <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[#f1f5f9] flex justify-between items-center bg-[#f8fafc]">
          <h2 className="text-lg font-semibold text-[#0b1c30]">Registered Personnel</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-white border-b border-[#f1f5f9]">
                <th className="px-6 py-4 text-xs font-semibold text-[#515f74] uppercase tracking-wider">ID</th>
                <th className="px-6 py-4 text-xs font-semibold text-[#515f74] uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-xs font-semibold text-[#515f74] uppercase tracking-wider">Region</th>
                <th className="px-6 py-4 text-xs font-semibold text-[#515f74] uppercase tracking-wider">Rating</th>
                <th className="px-6 py-4 text-xs font-semibold text-[#515f74] uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-[#515f74] uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {MOCK_COLLECTORS.map((collector) => (
                <tr key={collector.id} className="hover:bg-[#f8fafc] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-[#515f74]">{collector.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#0b1c30]">{collector.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#515f74]">{collector.region}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#006c49]">⭐ {collector.rating}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge 
                      label={collector.status} 
                      variant={collector.status === 'Active' ? 'success' : collector.status === 'Inactive' ? 'danger' : 'warning'} 
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button 
                      onClick={() => setSelectedCollector(collector)}
                      className="text-[#006c49] text-sm font-semibold hover:underline"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CollectorProfileModal 
        isOpen={!!selectedCollector} 
        onClose={() => setSelectedCollector(null)} 
        collector={selectedCollector} 
      />

      <InviteCollectorModal 
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
      />
    </PageLayout>
  );
}
