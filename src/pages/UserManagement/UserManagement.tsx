import React, { useState } from 'react';
import { PageLayout } from '../../components/PageLayout';
import { StatusBadge } from '../../components/StatusBadge';

import imgUserProfileAvatar from "../../assets/6c7b9dccb9925ee83b19c4f4237c7c6aa454950a.png";

const USERS_DATA = [
  { id: 'USR-001', name: 'Alex Rivera', email: 'arivera@smartsort.inc', role: 'System Admin', status: 'Active', lastLogin: '10 mins ago', avatar: imgUserProfileAvatar },
  { id: 'USR-002', name: 'Sarah Miller', email: 'smiller@smartsort.inc', role: 'Facility Manager', status: 'Active', lastLogin: '1 hour ago', avatar: null },
  { id: 'USR-003', name: 'John Doe', email: 'jdoe@smartsort.inc', role: 'Operator', status: 'Active', lastLogin: '3 hours ago', avatar: null },
  { id: 'USR-004', name: 'Emily Chen', email: 'echen@smartsort.inc', role: 'Data Analyst', status: 'Inactive', lastLogin: '2 weeks ago', avatar: null },
  { id: 'USR-005', name: 'Michael Ross', email: 'mross@smartsort.inc', role: 'Operator', status: 'Pending', lastLogin: 'Never', avatar: null },
];

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');

  const filteredData = USERS_DATA.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleVariant = (role: string) => {
    if (role === 'System Admin') return 'danger';
    if (role === 'Facility Manager') return 'info';
    if (role === 'Data Analyst') return 'warning';
    return 'neutral';
  };

  const getStatusVariant = (status: string) => {
    if (status === 'Active') return 'success';
    if (status === 'Inactive') return 'danger';
    return 'warning';
  };

  return (
    <PageLayout
      title="User Management"
      description="Manage access control, roles, and permissions across the platform."
      actions={
        <button className="bg-[#006c49] text-white text-sm font-semibold rounded-lg px-4 py-2 hover:bg-[#005a3c] transition-colors shadow-sm flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="8.5" cy="7" r="4"></circle>
            <line x1="20" y1="8" x2="20" y2="14"></line>
            <line x1="23" y1="11" x2="17" y2="11"></line>
          </svg>
          Invite User
        </button>
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
              placeholder="Search by name or email..." 
              className="bg-transparent border-none outline-none text-sm font-medium text-[#0b1c30] placeholder-[#94a3b8] w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            <select 
              className="bg-white border border-[#e2e8f0] text-[#515f74] text-sm font-medium rounded-lg px-4 py-2 hover:bg-[#f8fafc] cursor-pointer"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="ALL">All Roles</option>
              <option value="System Admin">System Admin</option>
              <option value="Facility Manager">Facility Manager</option>
              <option value="Operator">Operator</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-[#f8fafc] border-b border-[#e2e8f0]">
                <th className="px-6 py-4 text-xs font-semibold text-[#64748b] uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-xs font-semibold text-[#64748b] uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-xs font-semibold text-[#64748b] uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-[#64748b] uppercase tracking-wider">Last Login</th>
                <th className="px-6 py-4 text-xs font-semibold text-[#64748b] uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {filteredData.map((user) => (
                <tr key={user.id} className="hover:bg-[#f8fafc] transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#e2e8f0] overflow-hidden border border-[#cbd5e1] flex items-center justify-center">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-sm font-bold text-[#64748b]">{user.name.charAt(0)}</span>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-[#0b1c30]">{user.name}</span>
                        <span className="text-xs text-[#515f74]">{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge label={user.role} variant={getRoleVariant(user.role) as any} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge label={user.status} variant={getStatusVariant(user.status) as any} hasDot />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#515f74]">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-[#006c49] text-sm font-semibold hover:underline">
                      Edit Profile
                    </button>
                  </td>
                </tr>
              ))}
              
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-[#94a3b8] text-sm">
                    No users found matching your criteria
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
