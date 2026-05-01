import React, { useState } from 'react';
import { PageLayout } from '../../components/PageLayout';
import { MetricCard } from '../../components/MetricCard';
import { StatusBadge } from '../../components/StatusBadge';

import imgUserProfileAvatar from "../../assets/6c7b9dccb9925ee83b19c4f4237c7c6aa454950a.png";

/* ── Static data ─────────────────────────────────────────── */

const USERS_DATA = [
  { id: 'USR-001', name: 'Sarah Chen',      email: 's.chen@smartsort.io',      role: 'Admin',           status: 'Active',  lastLogin: '2 mins ago',  avatar: imgUserProfileAvatar },
  { id: 'USR-002', name: 'Marcus Wright',   email: 'm.wright@smartsort.io',    role: 'Manager',         status: 'Active',  lastLogin: '1 hour ago',  avatar: null },
  { id: 'USR-003', name: 'Elena Rodriguez', email: 'e.rodriguez@smartsort.io', role: 'Viewer',          status: 'Pending', lastLogin: 'Never',       avatar: null },
  { id: 'USR-004', name: 'David Kim',       email: 'd.kim@smartsort.io',       role: 'Manager',         status: 'Active',  lastLogin: '4 hours ago', avatar: null },
  { id: 'USR-005', name: 'Emily Chen',      email: 'echen@smartsort.io',       role: 'Operator',        status: 'Inactive',lastLogin: '2 weeks ago', avatar: null },
];

const KPIS = [
  {
    title: 'Total Users', value: '24', trend: '+3 this month', trendDirection: 'up' as const,
    iconColorClass: 'text-[#006c49]', iconBgClass: 'bg-[#10b981]/10',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  },
  {
    title: 'Active Admins', value: '3', trend: 'No change', trendDirection: 'neutral' as const,
    iconColorClass: 'text-[#0284c7]', iconBgClass: 'bg-[#0284c7]/10',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  },
  {
    title: 'Pending Invites', value: '5', trend: '+2 new', trendDirection: 'down' as const,
    iconColorClass: 'text-[#d97706]', iconBgClass: 'bg-[#fef3c7]',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  },
  {
    title: 'Security Score', value: '98%', trend: 'Excellent', trendDirection: 'up' as const,
    iconColorClass: 'text-[#515f74]', iconBgClass: 'bg-[#f1f5f9]',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  },
];

const AUDIT_LOG = [
  { time: '14:22', title: 'User Role Updated', desc: <>
    <span className="font-bold text-[#0b1c30]">Sarah Chen</span> changed <span className="font-bold text-[#0b1c30]">Marcus Wright's</span> role from Viewer to Manager.
  </>, color: 'text-[#0b1c30]' },
  { time: '12:05', title: 'New User Invited', desc: <>
    <span className="font-bold text-[#0b1c30]">Sarah Chen</span> invited <span className="font-bold text-[#0b1c30]">Elena Rodriguez</span> as Viewer.
  </>, color: 'text-[#006c49]' },
  { time: '09:15', title: 'Security Alert', desc: <>
    Failed login attempt for user <span className="font-bold text-[#0b1c30]">j.smith@unknown.com</span> from IP 192.168.1.104.
  </>, color: 'text-[#ba1a1a]' },
  { time: 'Yesterday', title: 'System Configuration Changed', desc: <>
    Device sensitivity thresholds adjusted globally by <span className="font-bold text-[#0b1c30]">Marcus Wright</span>.
  </>, color: 'text-[#0b1c30]' },
  { time: 'Yesterday', title: 'Scheduled Backup Completed', desc: <>
    System automated backup completed successfully. 4.2GB archived.
  </>, color: 'text-[#0b1c30]' },
];

const PERMISSIONS = [
  {
    role: 'Administrator',
    badgeBg: 'bg-[#10b981]/10', badgeText: 'text-[#006c49]', badgeBorder: 'border-[#10b981]/20',
    badgeLabel: 'Full Access',
    perms: [
      { label: 'User Management', granted: true },
      { label: 'System Config', granted: true },
      { label: 'API Management', granted: true },
      { label: 'Billing & Subscriptions', granted: true },
    ],
  },
  {
    role: 'Manager',
    badgeBg: 'bg-[#0284c7]/10', badgeText: 'text-[#0284c7]', badgeBorder: 'border-[#0284c7]/20',
    badgeLabel: 'Functional Access',
    perms: [
      { label: 'User Management', granted: false },
      { label: 'Device Control', granted: true },
      { label: 'Report Creation', granted: true },
      { label: 'Analytics Access', granted: true },
    ],
  },
  {
    role: 'Viewer',
    badgeBg: 'bg-[#f1f5f9]', badgeText: 'text-[#515f74]', badgeBorder: 'border-[#e2e8f0]',
    badgeLabel: 'Read Only',
    perms: [
      { label: 'Control Actions', granted: false },
      { label: 'View Dashboards', granted: true },
      { label: 'Export Reports', granted: true },
      { label: 'Edit Settings', granted: false },
    ],
  },
];

/* ── Helpers ──────────────────────────────────────────────── */

const getRoleVariant = (role: string) => {
  if (role === 'Admin') return 'success';
  if (role === 'Manager') return 'info';
  if (role === 'Operator') return 'neutral';
  return 'neutral';
};

const getStatusVariant = (status: string) => {
  if (status === 'Active') return 'success';
  if (status === 'Inactive') return 'danger';
  return 'warning';
};

const getInitials = (name: string) =>
  name.split(' ').map(n => n[0]).join('').toUpperCase();

/* ── Component ───────────────────────────────────────────── */

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');

  const filteredData = USERS_DATA.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <PageLayout
      title="User Management"
      description="Configure user roles, permissions and monitor system access."
      actions={
        <button className="bg-[#006c49] text-white text-sm font-semibold rounded-lg px-5 py-2.5 hover:bg-[#005a3c] transition-all shadow-sm flex items-center gap-2 active:scale-95">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="8.5" cy="7" r="4"></circle>
            <line x1="20" y1="8" x2="20" y2="14"></line>
            <line x1="23" y1="11" x2="17" y2="11"></line>
          </svg>
          Invite User
        </button>
      }
    >
      {/* ── Stats Overview ────────────────────────────────── */}
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

      {/* ── User Table ────────────────────────────────────── */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-sm flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-[#f1f5f9] bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center w-full max-w-md bg-[#f8fafc] rounded-lg border border-[#e2e8f0] focus-within:border-[#cbd5e1] focus-within:bg-white focus-within:shadow-sm transition-all overflow-hidden px-4 py-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-3 shrink-0">
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
              className="bg-white border border-[#e2e8f0] text-[#515f74] text-sm font-medium rounded-lg px-4 py-2 hover:bg-[#f8fafc] cursor-pointer outline-none focus:ring-2 focus:ring-[#006c49]/20"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="ALL">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Operator">Operator</option>
              <option value="Viewer">Viewer</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-[#f8fafc] border-b border-[#e2e8f0]">
                <th className="px-6 py-4 text-[11px] font-bold text-[#515f74] uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#515f74] uppercase tracking-wider">Email Address</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#515f74] uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#515f74] uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#515f74] uppercase tracking-wider">Last Login</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#515f74] uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {filteredData.map((user) => (
                <tr key={user.id} className="hover:bg-[#f8fafc] transition-colors group">
                  <td className="px-6 py-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#f1f5f9] overflow-hidden border border-[#e2e8f0] flex items-center justify-center shrink-0">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-xs font-bold text-[#515f74]">{getInitials(user.name)}</span>
                        )}
                      </div>
                      <span className="text-sm font-semibold text-[#0b1c30]">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3.5 whitespace-nowrap text-sm text-[#515f74]">
                    {user.email}
                  </td>
                  <td className="px-6 py-3.5 whitespace-nowrap">
                    <StatusBadge label={user.role} variant={getRoleVariant(user.role) as any} />
                  </td>
                  <td className="px-6 py-3.5 whitespace-nowrap">
                    <StatusBadge label={user.status} variant={getStatusVariant(user.status) as any} hasDot />
                  </td>
                  <td className="px-6 py-3.5 whitespace-nowrap text-sm text-[#515f74]">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-3.5 whitespace-nowrap text-right">
                    <button className="p-1.5 text-[#94a3b8] hover:text-[#006c49] hover:bg-[#006c49]/10 rounded-lg transition-colors" title="More actions">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="5" r="2" />
                        <circle cx="12" cy="12" r="2" />
                        <circle cx="12" cy="19" r="2" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}

              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-[#94a3b8] text-sm">
                    No users found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-6 py-4 border-t border-[#f1f5f9] bg-[#f8fafc]/50 flex items-center justify-between mt-auto">
          <p className="text-xs text-[#515f74]">
            Showing <span className="font-bold text-[#0b1c30]">{filteredData.length}</span> of {USERS_DATA.length} users
          </p>
          <div className="flex items-center gap-1">
            <button className="p-1 text-[#94a3b8] hover:text-[#0b1c30] disabled:opacity-30 cursor-not-allowed" disabled>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <button className="px-3 py-1 bg-[#006c49]/10 text-[#006c49] text-xs font-bold rounded-md">1</button>
            <button className="px-3 py-1 text-[#515f74] text-xs font-medium hover:bg-[#f1f5f9] rounded-md transition-colors">2</button>
            <button className="px-3 py-1 text-[#515f74] text-xs font-medium hover:bg-[#f1f5f9] rounded-md transition-colors">3</button>
            <button className="p-1 text-[#94a3b8] hover:text-[#0b1c30] transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── Bottom Panels: Audit Log & Permissions ────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Audit Log */}
        <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm flex flex-col h-[400px]">
          <div className="px-6 py-4 border-b border-[#e2e8f0] flex items-center justify-between shrink-0">
            <h3 className="font-semibold text-[#0b1c30] text-sm">System Audit Log</h3>
            <button className="text-[#006c49] text-xs font-bold hover:underline">Export CSV</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {AUDIT_LOG.map((entry, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className="min-w-[52px] pt-0.5 text-right shrink-0">
                  <span className="text-[10px] font-bold text-[#94a3b8] uppercase">{entry.time}</span>
                </div>
                <div className={`flex-1 ${idx < AUDIT_LOG.length - 1 ? 'pb-4 border-b border-[#f1f5f9]' : ''}`}>
                  <p className={`text-sm font-semibold ${entry.color}`}>{entry.title}</p>
                  <p className="text-xs text-[#515f74] mt-1 leading-relaxed">{entry.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Permissions Matrix */}
        <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm flex flex-col h-[400px]">
          <div className="px-6 py-4 border-b border-[#e2e8f0] flex items-center justify-between shrink-0">
            <h3 className="font-semibold text-[#0b1c30] text-sm">Permissions Matrix</h3>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" className="cursor-pointer hover:stroke-[#515f74] transition-colors">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {PERMISSIONS.map((group, idx) => (
              <div key={idx} className={idx > 0 ? 'pt-6 border-t border-[#f1f5f9]' : ''}>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-sm text-[#0b1c30]">{group.role}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded border font-bold uppercase ${group.badgeBg} ${group.badgeText} ${group.badgeBorder}`}>
                    {group.badgeLabel}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {group.perms.map((perm, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2 text-xs text-[#515f74]">
                      {perm.granted ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-[#10b981] shrink-0">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <polyline points="22 4 12 14.01 9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-[#cbd5e1] shrink-0">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                          <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      )}
                      {perm.label}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
