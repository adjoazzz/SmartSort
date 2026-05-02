import React, { useState, ReactNode } from 'react';
import { PageLayout } from '../../components/PageLayout';
import { MetricCard } from '../../components/MetricCard';
import { StatusBadge } from '../../components/StatusBadge';
import { InviteUserModal } from './InviteUserModal';

import imgUserProfileAvatar from "../../assets/6c7b9dccb9925ee83b19c4f4237c7c6aa454950a.png";

/* ── Types ────────────────────────────────────────────────── */

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
  avatar: string | null;
}

interface AuditEntry {
  time: string;
  title: string;
  desc: ReactNode;
  color: string;
}

interface PermGroup {
  role: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  badgeLabel: string;
  perms: { label: string; granted: boolean }[];
}

/* ── Static data ─────────────────────────────────────────── */

const USERS_DATA: User[] = [
  { id: 'USR-001', name: 'Sarah Chen',      email: 's.chen@smartsort.io',      role: 'Admin',    status: 'Active',   lastLogin: '2 mins ago',  avatar: imgUserProfileAvatar },
  { id: 'USR-002', name: 'Marcus Wright',   email: 'm.wright@smartsort.io',    role: 'Manager',  status: 'Active',   lastLogin: '1 hour ago',  avatar: null },
  { id: 'USR-003', name: 'Elena Rodriguez', email: 'e.rodriguez@smartsort.io', role: 'Viewer',   status: 'Pending',  lastLogin: 'Never',       avatar: null },
  { id: 'USR-004', name: 'David Kim',       email: 'd.kim@smartsort.io',       role: 'Manager',  status: 'Active',   lastLogin: '4 hours ago', avatar: null },
  { id: 'USR-005', name: 'Emily Chen',      email: 'echen@smartsort.io',       role: 'Operator', status: 'Inactive', lastLogin: '2 weeks ago', avatar: null },
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
    iconColorClass: 'text-[#515f74] dark:text-[#cbd5e1]', iconBgClass: 'bg-[#f1f5f9] dark:bg-[#1a365d]',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  },
];

const AUDIT_LOG: AuditEntry[] = [
  { time: '14:22', title: 'User Role Updated', desc: <><span className="font-bold text-[#0b1c30] dark:text-white">Sarah Chen</span> changed <span className="font-bold text-[#0b1c30] dark:text-white">Marcus Wright's</span> role from Viewer to Manager.</>, color: 'text-[#0b1c30] dark:text-white' },
  { time: '12:05', title: 'New User Invited', desc: <><span className="font-bold text-[#0b1c30] dark:text-white">Sarah Chen</span> invited <span className="font-bold text-[#0b1c30] dark:text-white">Elena Rodriguez</span> as Viewer.</>, color: 'text-[#006c49]' },
  { time: '09:15', title: 'Security Alert', desc: <>Failed login attempt for user <span className="font-bold text-[#0b1c30] dark:text-white">j.smith@unknown.com</span> from IP 192.168.1.104.</>, color: 'text-[#ba1a1a]' },
  { time: 'Yesterday', title: 'System Configuration Changed', desc: <>Device sensitivity thresholds adjusted globally by <span className="font-bold text-[#0b1c30] dark:text-white">Marcus Wright</span>.</>, color: 'text-[#0b1c30] dark:text-white' },
  { time: 'Yesterday', title: 'Scheduled Backup Completed', desc: <>System automated backup completed successfully. 4.2GB archived.</>, color: 'text-[#0b1c30] dark:text-white' },
];

const PERMISSIONS: PermGroup[] = [
  {
    role: 'Administrator', badgeBg: 'bg-[#10b981]/10', badgeText: 'text-[#006c49]', badgeBorder: 'border-[#10b981]/20', badgeLabel: 'Full Access',
    perms: [{ label: 'User Management', granted: true }, { label: 'System Config', granted: true }, { label: 'API Management', granted: true }, { label: 'Billing & Subscriptions', granted: true }],
  },
  {
    role: 'Manager', badgeBg: 'bg-[#0284c7]/10', badgeText: 'text-[#0284c7]', badgeBorder: 'border-[#0284c7]/20', badgeLabel: 'Functional Access',
    perms: [{ label: 'User Management', granted: false }, { label: 'Device Control', granted: true }, { label: 'Report Creation', granted: true }, { label: 'Analytics Access', granted: true }],
  },
  {
    role: 'Viewer', badgeBg: 'bg-[#f1f5f9] dark:bg-[#1a365d]', badgeText: 'text-[#515f74] dark:text-[#cbd5e1]', badgeBorder: 'border-[#e2e8f0] dark:border-[#1e3a5f]', badgeLabel: 'Read Only',
    perms: [{ label: 'Control Actions', granted: false }, { label: 'View Dashboards', granted: true }, { label: 'Export Reports', granted: true }, { label: 'Edit Settings', granted: false }],
  },
];

const ACTION_MENU_ITEMS = [
  { key: 'role',    label: 'Change Role', danger: false, icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /> },
  { key: 'pending', label: 'Set Pending', danger: false, icon: <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></> },
  { key: 'remove',  label: 'Remove User', danger: true,  icon: <><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></> },
];

/* ── Helpers ──────────────────────────────────────────────── */

const getRoleVariant = (role: string) => {
  const map: Record<string, string> = { Admin: 'success', Manager: 'info' };
  return map[role] ?? 'neutral';
};

const getStatusVariant = (status: string) => {
  const map: Record<string, string> = { Active: 'success', Inactive: 'danger' };
  return map[status] ?? 'warning';
};

const getInitials = (name: string) =>
  name.split(' ').map(n => n[0]).join('').toUpperCase();

/* ── Shared sub-components ───────────────────────────────── */

/** Reusable SVG icon wrapper for the permissions check/x marks */
function PermIcon({ granted }: { granted: boolean }) {
  return granted ? (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-[#10b981] shrink-0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ) : (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-[#cbd5e1] shrink-0" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  );
}

/** User avatar with image fallback to initials */
function UserAvatar({ name, avatar }: { name: string; avatar: string | null }) {
  return (
    <div className="w-9 h-9 rounded-full bg-[#f1f5f9] dark:bg-[#1a365d] overflow-hidden border border-[#e2e8f0] dark:border-[#1e3a5f] flex items-center justify-center shrink-0">
      {avatar ? (
        <img src={avatar} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span className="text-xs font-bold text-[#515f74] dark:text-[#cbd5e1]">{getInitials(name)}</span>
      )}
    </div>
  );
}

/** Three-dot action dropdown for each user row */
function ActionMenu({ userId, isOpen, onToggle, onClose }: {
  userId: string; isOpen: boolean; onToggle: () => void; onClose: () => void;
}) {
  return (
    <div className="relative inline-block">
      <button onClick={onToggle} className="p-1.5 text-[#94a3b8] dark:text-[#64748b] hover:text-[#006c49] hover:bg-[#006c49]/10 rounded-lg transition-colors" title="More actions">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="5" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="12" cy="19" r="2" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={onClose} />
          <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-[#0b1c30] border border-[#e2e8f0] dark:border-[#1e3a5f] rounded-lg shadow-lg z-50 py-1">
            {ACTION_MENU_ITEMS.map((item, idx) => (
              <React.Fragment key={item.key}>
                {item.danger && <div className="border-t border-[#f1f5f9] dark:border-[#0f2942] my-1" />}
                <button
                  onClick={() => { console.log(`${item.key}:`, userId); onClose(); }}
                  className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-left transition-colors ${
                    item.danger ? 'text-[#ba1a1a] hover:bg-[#ffdad6]/30' : 'text-[#0b1c30] dark:text-white hover:bg-[#f8fafc] dark:hover:bg-[#0f2942]'
                  }`}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={item.danger ? 'currentColor' : '#515f74'} strokeWidth="2">{item.icon}</svg>
                  {item.label}
                </button>
              </React.Fragment>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/** Card wrapper used by both the Audit Log and Permissions panels */
function PanelCard({ title, action, children }: { title: string; action?: ReactNode; children: ReactNode }) {
  return (
    <div className="bg-white dark:bg-[#0b1c30] rounded-xl border border-[#e2e8f0] dark:border-[#1e3a5f] shadow-sm flex flex-col h-[400px]">
      <div className="px-6 py-4 border-b border-[#e2e8f0] dark:border-[#1e3a5f] flex items-center justify-between shrink-0">
        <h3 className="font-semibold text-[#0b1c30] dark:text-white text-sm">{title}</h3>
        {action}
      </div>
      {children}
    </div>
  );
}

/* ── Main component ──────────────────────────────────────── */

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const filteredData = USERS_DATA.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const TH = "px-6 py-4 text-[11px] font-bold text-[#515f74] dark:text-[#cbd5e1] uppercase tracking-wider";

  return (
    <PageLayout
      title="User Management"
      description="Configure user roles, permissions and monitor system access."
      actions={
        <button 
          onClick={() => setIsInviteModalOpen(true)}
          className="bg-[#006c49] text-white text-sm font-semibold rounded-lg px-5 py-2.5 hover:bg-[#005a3c] transition-all shadow-sm flex items-center gap-2 active:scale-95"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" />
            <line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" />
          </svg>
          Invite User
        </button>
      }
    >
      {/* ── Stats Overview ────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {KPIS.map((kpi, idx) => (
          <MetricCard key={idx} title={kpi.title} value={kpi.value} trend={kpi.trend} trendDirection={kpi.trendDirection} iconColorClass={kpi.iconColorClass} iconBgClass={kpi.iconBgClass} iconSvg={kpi.icon} />
        ))}
      </div>

      {/* ── User Table ────────────────────────────────────── */}
      <div className="bg-white dark:bg-[#0b1c30] border border-[#e2e8f0] dark:border-[#1e3a5f] rounded-xl shadow-sm flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-[#f1f5f9] dark:border-[#0f2942] bg-white dark:bg-[#0b1c30] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center w-full max-w-md bg-[#f8fafc] dark:bg-[#0f2942] rounded-lg border border-[#e2e8f0] dark:border-[#1e3a5f] focus-within:border-[#cbd5e1] dark:focus-within:border-[#334155] focus-within:bg-white dark:bg-[#0b1c30] focus-within:shadow-sm transition-all overflow-hidden px-4 py-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-3 shrink-0">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search by name or email..."
              className="bg-transparent border-none outline-none text-sm font-medium text-[#0b1c30] dark:text-white placeholder-[#94a3b8] w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="bg-white dark:bg-[#0b1c30] border border-[#e2e8f0] dark:border-[#1e3a5f] text-[#515f74] dark:text-[#cbd5e1] text-sm font-medium rounded-lg px-4 py-2 hover:bg-[#f8fafc] dark:hover:bg-[#0f2942] cursor-pointer outline-none focus:ring-2 focus:ring-[#006c49]/20"
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

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-[#f8fafc] dark:bg-[#0f2942] border-b border-[#e2e8f0] dark:border-[#1e3a5f]">
                {['User', 'Email Address', 'Role', 'Status', 'Last Login'].map(h => (
                  <th key={h} className={TH}>{h}</th>
                ))}
                <th className={`${TH} text-right`}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {filteredData.map((user) => (
                <tr key={user.id} className="hover:bg-[#f8fafc] dark:hover:bg-[#0f2942] transition-colors group">
                  <td className="px-6 py-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <UserAvatar name={user.name} avatar={user.avatar} />
                      <span className="text-sm font-semibold text-[#0b1c30] dark:text-white">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3.5 whitespace-nowrap text-sm text-[#515f74] dark:text-[#cbd5e1]">{user.email}</td>
                  <td className="px-6 py-3.5 whitespace-nowrap"><StatusBadge label={user.role} variant={getRoleVariant(user.role) as any} /></td>
                  <td className="px-6 py-3.5 whitespace-nowrap"><StatusBadge label={user.status} variant={getStatusVariant(user.status) as any} hasDot /></td>
                  <td className="px-6 py-3.5 whitespace-nowrap text-sm text-[#515f74] dark:text-[#cbd5e1]">{user.lastLogin}</td>
                  <td className="px-6 py-3.5 whitespace-nowrap text-right">
                    <ActionMenu
                      userId={user.id}
                      isOpen={openMenuId === user.id}
                      onToggle={() => setOpenMenuId(openMenuId === user.id ? null : user.id)}
                      onClose={() => setOpenMenuId(null)}
                    />
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-[#94a3b8] dark:text-[#64748b] text-sm">No users found matching your criteria</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-6 py-4 border-t border-[#f1f5f9] dark:border-[#0f2942] bg-[#f8fafc] dark:bg-[#0f2942]/50 flex items-center justify-between mt-auto">
          <p className="text-xs text-[#515f74] dark:text-[#cbd5e1]">
            Showing <span className="font-bold text-[#0b1c30] dark:text-white">{filteredData.length}</span> of {USERS_DATA.length} users
          </p>
          <div className="flex items-center gap-1">
            <button className="p-1 text-[#94a3b8] dark:text-[#64748b] disabled:opacity-30 cursor-not-allowed" disabled>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            {[1, 2, 3].map(n => (
              <button key={n} className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${n === 1 ? 'bg-[#006c49]/10 text-[#006c49]' : 'text-[#515f74] dark:text-[#cbd5e1] hover:bg-[#f1f5f9] dark:hover:bg-[#1a365d]'}`}>{n}</button>
            ))}
            <button className="p-1 text-[#94a3b8] dark:text-[#64748b] hover:text-[#0b1c30] dark:text-white transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── Bottom Panels ─────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Audit Log */}
        <PanelCard title="System Audit Log" action={<button className="text-[#006c49] text-xs font-bold hover:underline">Export CSV</button>}>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {AUDIT_LOG.map((entry, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className="min-w-[52px] pt-0.5 text-right shrink-0">
                  <span className="text-[10px] font-bold text-[#94a3b8] dark:text-[#64748b] uppercase">{entry.time}</span>
                </div>
                <div className={`flex-1 ${idx < AUDIT_LOG.length - 1 ? 'pb-4 border-b border-[#f1f5f9] dark:border-[#0f2942]' : ''}`}>
                  <p className={`text-sm font-semibold ${entry.color}`}>{entry.title}</p>
                  <p className="text-xs text-[#515f74] dark:text-[#cbd5e1] mt-1 leading-relaxed">{entry.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </PanelCard>

        {/* Permissions Matrix */}
        <PanelCard
          title="Permissions Matrix"
          action={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" className="cursor-pointer hover:stroke-[#515f74] transition-colors">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          }
        >
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {PERMISSIONS.map((group, idx) => (
              <div key={idx} className={idx > 0 ? 'pt-6 border-t border-[#f1f5f9] dark:border-[#0f2942]' : ''}>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-sm text-[#0b1c30] dark:text-white">{group.role}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded border font-bold uppercase ${group.badgeBg} ${group.badgeText} ${group.badgeBorder}`}>{group.badgeLabel}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {group.perms.map((perm, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2 text-xs text-[#515f74] dark:text-[#cbd5e1]">
                      <PermIcon granted={perm.granted} />
                      {perm.label}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </PanelCard>
      </div>

      <InviteUserModal 
        isOpen={isInviteModalOpen} 
        onClose={() => setIsInviteModalOpen(false)} 
      />
    </PageLayout>
  );
}
