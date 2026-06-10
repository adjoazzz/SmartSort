import React, { useState, ReactNode } from "react";
import { PageLayout } from "../../components/PageLayout";
import { MetricCard } from "../../components/MetricCard";
import { StatusBadge } from "../../components/StatusBadge";
import { InviteUserModal } from "./InviteUserModal";

import imgAvatar1 from "../../assets/6c7b9dccb9925ee83b19c4f4237c7c6aa454950a.png";
import imgAvatar2 from "../../assets/0800bfda658966e2c00bc7ac63132f861621facb.png";
import imgAvatar3 from "../../assets/24a9922379817a27d888c5fdd654062c651c9b65.png";
import imgAvatar4 from "../../assets/2b5de3441a3e90a84b69fd1d838a23d7ab936a16.png";

/* ── Types ────────────────────────────────────────────────── */

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  avatar: string | null;
  assignedFacility: string;
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
  {
    id: "USR-001",
    name: "Alexander Vance",
    email: "a.vance@smartsort.com",
    role: "Admin",
    status: "ACTIVE",
    avatar: imgAvatar1,
    assignedFacility: "HQ Corporate Center"
  },
  {
    id: "USR-002",
    name: "Sarah Jenkins",
    email: "s.jenkins@smartsort.com",
    role: "Manager",
    status: "ACTIVE",
    avatar: imgAvatar2,
    assignedFacility: "East Side Recycling"
  },
  {
    id: "USR-003",
    name: "Marco Rossi",
    email: "m.rossi@logistics.net",
    role: "Collector",
    status: "ACTIVE",
    avatar: imgAvatar3,
    assignedFacility: "South Hub Logistics"
  },
  {
    id: "USR-004",
    name: "Elena Rodriguez",
    email: "e.rod@archive.org",
    role: "Viewer",
    status: "SUSPENDED",
    avatar: imgAvatar4,
    assignedFacility: "Global Read-Only"
  }
];


const KPIS = [
  {
    title: "Total Users",
    value: "24",
    trend: "+3 this month",
    trendDirection: "up" as const,
    iconColorClass: "text-[#006c49]",
    iconBgClass: "bg-[#10b981]/10",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Active Admins",
    value: "3",
    trend: "No change",
    trendDirection: "neutral" as const,
    iconColorClass: "text-[#0284c7]",
    iconBgClass: "bg-[#0284c7]/10",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Pending Invites",
    value: "5",
    trend: "+2 new",
    trendDirection: "down" as const,
    iconColorClass: "text-[#d97706]",
    iconBgClass: "bg-[#fef3c7]",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: "Security Score",
    value: "98%",
    trend: "Excellent",
    trendDirection: "up" as const,
    iconColorClass: "text-[#515f74] dark:text-[#cbd5e1]",
    iconBgClass: "bg-[#f1f5f9] dark:bg-[#1a365d]",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
];

const AUDIT_LOG: AuditEntry[] = [
  {
    time: "14:22",
    title: "User Role Updated",
    desc: (
      <>
        <span className="font-bold text-[#0b1c30] dark:text-white">
          Sarah Chen
        </span>{" "}
        changed{" "}
        <span className="font-bold text-[#0b1c30] dark:text-white">
          Marcus Wright's
        </span>{" "}
        role from Viewer to Manager.
      </>
    ),
    color: "text-[#0b1c30] dark:text-white",
  },
  {
    time: "12:05",
    title: "New User Invited",
    desc: (
      <>
        <span className="font-bold text-[#0b1c30] dark:text-white">
          Sarah Chen
        </span>{" "}
        invited{" "}
        <span className="font-bold text-[#0b1c30] dark:text-white">
          Elena Rodriguez
        </span>{" "}
        as Viewer.
      </>
    ),
    color: "text-[#006c49]",
  },
  {
    time: "09:15",
    title: "Security Alert",
    desc: (
      <>
        Failed login attempt for user{" "}
        <span className="font-bold text-[#0b1c30] dark:text-white">
          j.smith@unknown.com
        </span>{" "}
        from IP 192.168.1.104.
      </>
    ),
    color: "text-[#ba1a1a]",
  },
  {
    time: "Yesterday",
    title: "System Configuration Changed",
    desc: (
      <>
        Device sensitivity thresholds adjusted globally by{" "}
        <span className="font-bold text-[#0b1c30] dark:text-white">
          Marcus Wright
        </span>
        .
      </>
    ),
    color: "text-[#0b1c30] dark:text-white",
  },
  {
    time: "Yesterday",
    title: "Scheduled Backup Completed",
    desc: <>System automated backup completed successfully. 4.2GB archived.</>,
    color: "text-[#0b1c30] dark:text-white",
  },
];

const PERMISSIONS: PermGroup[] = [
  {
    role: "Administrator",
    badgeBg: "bg-[#10b981]/10",
    badgeText: "text-[#006c49]",
    badgeBorder: "border-[#10b981]/20",
    badgeLabel: "Full Access",
    perms: [
      { label: "User Management", granted: true },
      { label: "System Config", granted: true },
      { label: "API Management", granted: true },
      { label: "Billing & Subscriptions", granted: true },
    ],
  },
  {
    role: "Manager",
    badgeBg: "bg-[#0284c7]/10",
    badgeText: "text-[#0284c7]",
    badgeBorder: "border-[#0284c7]/20",
    badgeLabel: "Functional Access",
    perms: [
      { label: "User Management", granted: false },
      { label: "Device Control", granted: true },
      { label: "Report Creation", granted: true },
      { label: "Analytics Access", granted: true },
    ],
  },
  {
    role: "Viewer",
    badgeBg: "bg-[#f1f5f9] dark:bg-[#1a365d]",
    badgeText: "text-[#515f74] dark:text-[#cbd5e1]",
    badgeBorder: "border-[#e2e8f0] dark:border-[#1e3a5f]",
    badgeLabel: "Read Only",
    perms: [
      { label: "Control Actions", granted: false },
      { label: "View Dashboards", granted: true },
      { label: "Export Reports", granted: true },
      { label: "Edit Settings", granted: false },
    ],
  },
];

const ACTION_MENU_ITEMS = [
  {
    key: "role",
    label: "Change Role",
    danger: false,
    icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  },
  {
    key: "pending",
    label: "Set Pending",
    danger: false,
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </>
    ),
  },
  {
    key: "remove",
    label: "Remove User",
    danger: true,
    icon: (
      <>
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </>
    ),
  },
];

/* ── Helpers ──────────────────────────────────────────────── */

// Facility Icons
const BuildingIcon = () => (
  <svg className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
    <line x1="9" y1="22" x2="9" y2="16" />
    <line x1="15" y1="22" x2="15" y2="16" />
    <line x1="9" y1="16" x2="15" y2="16" />
    <path d="M8 6h2v2H8V6z" />
    <path d="M14 6h2v2h-2V6z" />
    <path d="M8 10h2v2H8v-2z" />
    <path d="M14 10h2v2h-2v-2z" />
  </svg>
);

const FactoryIcon = () => (
  <svg className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 20V10l5-2 5 2 5-2v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
    <path d="M17 18h4v-7l-4-2z" />
    <path d="M12 18h.01" />
  </svg>
);

const WarehouseIcon = () => (
  <svg className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const EyeIcon = () => (
  <svg className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const renderFacility = (facility: string) => {
  let icon = <BuildingIcon />;
  if (facility === "East Side Recycling") {
    icon = <FactoryIcon />;
  } else if (facility === "South Hub Logistics") {
    icon = <WarehouseIcon />;
  } else if (facility === "Global Read-Only") {
    icon = <EyeIcon />;
  }

  return (
    <div className="flex items-center gap-2 text-[#475569] dark:text-[#94a3b8] font-medium text-sm">
      {icon}
      <span>{facility}</span>
    </div>
  );
};

const getRoleBadge = (role: string) => {
  const styles: Record<string, { bg: string; text: string; hasChevron: boolean }> = {
    Admin: {
      bg: "bg-[#f3e8ff] dark:bg-[#7c3aed]/10",
      text: "text-[#7c3aed]",
      hasChevron: true
    },
    Manager: {
      bg: "bg-[#e0f2fe] dark:bg-[#2563eb]/10",
      text: "text-[#2563eb]",
      hasChevron: false
    },
    Collector: {
      bg: "bg-[#fef3c7] dark:bg-[#b45309]/10",
      text: "text-[#b45309]",
      hasChevron: false
    },
    Viewer: {
      bg: "bg-[#f1f5f9] dark:bg-[#64748b]/10",
      text: "text-[#64748b]",
      hasChevron: true
    }
  };

  const style = styles[role] || {
    bg: "bg-gray-100 dark:bg-gray-800",
    text: "text-gray-600 dark:text-gray-400",
    hasChevron: false
  };

  return (
    <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${style.bg} ${style.text}`}>
      <span>{role}</span>
      {style.hasChevron && (
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-70 ml-0.5"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      )}
    </div>
  );
};

const getStatusBadge = (status: string) => {
  const isSuspended = status === "SUSPENDED" || status === "Suspended" || status === "Inactive";
  const bg = isSuspended ? "bg-[#fde8e8] dark:bg-[#b91c1c]/10" : "bg-[#dcfce7] dark:bg-[#15803d]/10";
  const text = isSuspended ? "text-[#b91c1c]" : "text-[#15803d]";
  const dot = isSuspended ? "bg-[#b91c1c]" : "bg-[#15803d]";
  const label = isSuspended ? "SUSPENDED" : "ACTIVE";

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase ${bg} ${text}`}>
      <div className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      <span>{label}</span>
    </div>
  );
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

/* ── Shared sub-components ───────────────────────────────── */

/** Reusable SVG icon wrapper for the permissions check/x marks */
function PermIcon({ granted }: { granted: boolean }) {
  return granted ? (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      className="text-[#10b981] shrink-0"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ) : (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      className="text-[#cbd5e1] shrink-0"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
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
        <span className="text-xs font-bold text-[#515f74] dark:text-[#cbd5e1]">
          {getInitials(name)}
        </span>
      )}
    </div>
  );
}

/** Three-dot action dropdown for each user row */
function ActionMenu({
  userId,
  isOpen,
  onToggle,
  onClose,
}: {
  userId: string;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  return (
    <div className="relative inline-block">
      <button
        onClick={onToggle}
        className="p-1.5 text-[#94a3b8] dark:text-[#64748b] hover:text-[#006c49] hover:bg-[#006c49]/10 rounded-lg transition-colors"
        title="More actions"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="5" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="19" r="2" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={onClose} />
          <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-[#0b1c30] border border-[#e2e8f0] dark:border-[#1e3a5f] rounded-lg shadow-lg z-50 py-1">
            {ACTION_MENU_ITEMS.map((item, idx) => (
              <React.Fragment key={item.key}>
                {item.danger && (
                  <div className="border-t border-[#f1f5f9] dark:border-[#0f2942] my-1" />
                )}
                <button
                  onClick={() => {
                    console.log(`${item.key}:`, userId);
                    onClose();
                  }}
                  className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-left transition-colors ${
                    item.danger
                      ? "text-[#ba1a1a] hover:bg-[#ffdad6]/30"
                      : "text-[#0b1c30] dark:text-white hover:bg-[#f8fafc] dark:hover:bg-[#0f2942]"
                  }`}
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={item.danger ? "currentColor" : "#515f74"}
                    strokeWidth="2"
                  >
                    {item.icon}
                  </svg>
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
function PanelCard({
  title,
  action,
  children,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-[#0b1c30] rounded-xl border border-[#e2e8f0] dark:border-[#1e3a5f] shadow-sm flex flex-col h-[400px]">
      <div className="px-6 py-4 border-b border-[#e2e8f0] dark:border-[#1e3a5f] flex items-center justify-between shrink-0">
        <h3 className="font-semibold text-[#0b1c30] dark:text-white text-sm">
          {title}
        </h3>
        {action}
      </div>
      {children}
    </div>
  );
}

/* ── Main component ──────────────────────────────────────── */

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filteredData = USERS_DATA.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "ALL" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const TH =
    "px-6 py-4 text-[11px] font-bold text-[#515f74] dark:text-[#cbd5e1] uppercase tracking-wider";

  return (
    <PageLayout
      title="User Management"
      description="Configure user roles, permissions and monitor system access."
      actions={
        <button
          onClick={() => setIsInviteModalOpen(true)}
          className="bg-[#006c49] text-white text-sm font-semibold rounded-lg px-5 py-2.5 hover:bg-[#005a3c] transition-all shadow-sm flex items-center gap-2 active:scale-95"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="8.5" cy="7" r="4" />
            <line x1="20" y1="8" x2="20" y2="14" />
            <line x1="23" y1="11" x2="17" y2="11" />
          </svg>
          Invite User
        </button>
      }
    >
      {/* ── Stats Overview & Actions Row ────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          {/* Total Users Box */}
          <div className="flex items-center gap-2.5 bg-[#f1f5f9] dark:bg-[#1e293b]/50 px-4 py-2.5 rounded-lg border border-[#e2e8f0] dark:border-[#334155]">
            <span className="text-xs font-semibold text-[#64748b] dark:text-[#94a3b8] uppercase tracking-wider">
              Total Users
            </span>
            <span className="text-lg font-bold text-[#0b1c30] dark:text-white">
              1,284
            </span>
          </div>
          {/* Active Now Box */}
          <div className="flex items-center gap-2.5 bg-[#f1f5f9] dark:bg-[#1e293b]/50 px-4 py-2.5 rounded-lg border border-[#e2e8f0] dark:border-[#334155]">
            <span className="text-xs font-semibold text-[#64748b] dark:text-[#94a3b8] uppercase tracking-wider">
              Active Now
            </span>
            <span className="text-lg font-bold text-[#15803d]">
              342
            </span>
          </div>
        </div>

        {/* Filter and Export Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 border border-[#e2e8f0] dark:border-[#334155] px-4 py-2.5 rounded-lg text-sm font-semibold transition-all active:scale-95 ${
              showFilters
                ? "bg-[#0a5cf5]/10 border-[#0a5cf5] text-[#0a5cf5]"
                : "bg-white dark:bg-[#0b1c30] text-[#0b1c30] dark:text-white hover:bg-[#f8fafc] dark:hover:bg-[#0f2942]"
            }`}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" y1="21" x2="4" y2="14" />
              <line x1="4" y1="10" x2="4" y2="3" />
              <line x1="12" y1="21" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12" y2="3" />
              <line x1="20" y1="21" x2="20" y2="16" />
              <line x1="20" y1="12" x2="20" y2="3" />
              <line x1="1" y1="14" x2="7" y2="14" />
              <line x1="9" y1="8" x2="15" y2="8" />
              <line x1="17" y1="16" x2="23" y2="16" />
            </svg>
            Filter
          </button>
          <button
            onClick={() => {
              console.log("Exporting users data...");
            }}
            className="flex items-center gap-2 border border-[#e2e8f0] dark:border-[#334155] bg-white dark:bg-[#0b1c30] px-4 py-2.5 rounded-lg text-sm font-semibold text-[#0b1c30] dark:text-white hover:bg-[#f8fafc] dark:hover:bg-[#0f2942] transition-all active:scale-95 shadow-sm"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export
          </button>
        </div>
      </div>

      {/* ── User Table ────────────────────────────────────── */}
      <div className="bg-white dark:bg-[#0b1c30] border border-[#e2e8f0] dark:border-[#1e3a5f] rounded-xl shadow-sm flex flex-col overflow-hidden mb-6">
        {/* Collapsible Toolbar */}
        {showFilters && (
          <div className="p-4 border-b border-[#f1f5f9] dark:border-[#0f2942] bg-[#f8fafc] dark:bg-[#0b1c30] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center w-full max-w-md bg-white dark:bg-[#0f2942] rounded-lg border border-[#e2e8f0] dark:border-[#1e3a5f] focus-within:border-[#cbd5e1] dark:focus-within:border-[#334155] focus-within:shadow-sm transition-all overflow-hidden px-4 py-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#94A3B8"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-3 shrink-0"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
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
              <option value="Collector">Collector</option>
              <option value="Viewer">Viewer</option>
            </select>
          </div>
        )}

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-[#f8fafc] dark:bg-[#0f2942] border-b border-[#e2e8f0] dark:border-[#1e3a5f]">
                {["Name & Identity", "Role Type", "Assigned Facility", "Status"].map(
                  (h) => (
                    <th key={h} className={TH}>
                      {h}
                    </th>
                  ),
                )}
                <th className={`${TH} text-right`}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9] dark:divide-[#0f2942]">
              {filteredData.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-[#f8fafc] dark:hover:bg-[#0f2942] transition-colors group"
                >
                  {/* Name & Identity */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <UserAvatar name={user.name} avatar={user.avatar} />
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-[#0b1c30] dark:text-white">
                          {user.name}
                        </span>
                        <span className="text-xs text-[#94a3b8] dark:text-[#64748b]">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Role Type */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getRoleBadge(user.role)}
                  </td>

                  {/* Assigned Facility */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {renderFacility(user.assignedFacility)}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(user.status)}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    {user.status === "SUSPENDED" ? (
                      <button
                        onClick={() => {
                          console.log("Reinstating user:", user.id);
                        }}
                        className="bg-[#0a5cf5] hover:bg-[#094fc2] text-white text-xs font-bold rounded-lg px-4.5 py-2 inline-flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="animate-spin-once"
                        >
                          <path d="M21.5 2v6h-6" />
                          <path d="M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                        </svg>
                        Reinstate
                      </button>
                    ) : (
                      <ActionMenu
                        userId={user.id}
                        isOpen={openMenuId === user.id}
                        onToggle={() =>
                          setOpenMenuId(openMenuId === user.id ? null : user.id)
                        }
                        onClose={() => setOpenMenuId(null)}
                      />
                    )}
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-[#94a3b8] dark:text-[#64748b] text-sm"
                  >
                    No users found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-6 py-4 border-t border-[#f1f5f9] dark:border-[#0f2942] bg-[#f8fafc] dark:bg-[#0f2942]/50 flex items-center justify-between mt-auto">
          <p className="text-sm text-[#64748b] dark:text-[#94a3b8]">
            Showing <span className="font-semibold text-[#475569] dark:text-[#cbd5e1]">{filteredData.length}</span> of 1,284 team members
          </p>
          <div className="flex items-center gap-1">
            <button
              className="p-1.5 text-[#94a3b8] dark:text-[#64748b] hover:text-[#475569] dark:hover:text-[#cbd5e1] transition-colors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              className="w-8 h-8 flex items-center justify-center text-sm font-semibold rounded-md transition-colors bg-[#0a5cf5] text-white"
            >
              1
            </button>
            <button
              className="w-8 h-8 flex items-center justify-center text-sm font-semibold rounded-md transition-colors text-[#515f74] dark:text-[#cbd5e1] hover:bg-[#f1f5f9] dark:hover:bg-[#1a365d]"
            >
              2
            </button>
            <button
              className="w-8 h-8 flex items-center justify-center text-sm font-semibold rounded-md transition-colors text-[#515f74] dark:text-[#cbd5e1] hover:bg-[#f1f5f9] dark:hover:bg-[#1a365d]"
            >
              3
            </button>
            <span className="text-[#94a3b8] dark:text-[#64748b] px-1 text-sm font-semibold">...</span>
            <button
              className="w-8 h-8 flex items-center justify-center text-sm font-semibold rounded-md transition-colors text-[#515f74] dark:text-[#cbd5e1] hover:bg-[#f1f5f9] dark:hover:bg-[#1a365d]"
            >
              32
            </button>
            <button className="p-1.5 text-[#94a3b8] dark:text-[#64748b] hover:text-[#475569] dark:hover:text-[#cbd5e1] transition-colors">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── Bottom Cards ─────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-4">
        {/* Permission Audit Card */}
        <div className="bg-white dark:bg-[#0b1c30] rounded-2xl border border-[#e2e8f0] dark:border-[#1e3a5f] p-6 shadow-sm flex flex-col justify-between min-h-[180px]">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="font-bold text-[#0b1c30] dark:text-white text-base">
                Permission Audit
              </h3>
            </div>
            <p className="text-xs text-[#515f74] dark:text-[#cbd5e1] leading-relaxed">
              Regularly review high-privilege roles. 14 users currently have Administrative access. We recommend keeping this under 10.
            </p>
          </div>
          <a
            href="#security-logs"
            onClick={(e) => e.preventDefault()}
            className="text-xs font-bold text-[#0a5cf5] hover:underline flex items-center gap-1 mt-4"
          >
            View Security Logs
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>

        {/* Pending Invites Card */}
        <div className="bg-white dark:bg-[#0b1c30] rounded-2xl border border-[#e2e8f0] dark:border-[#1e3a5f] p-6 shadow-sm flex flex-col justify-between min-h-[180px]">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <h3 className="font-bold text-[#0b1c30] dark:text-white text-base">
                Pending Invites
              </h3>
            </div>
            
            <div className="flex items-center gap-4 py-1">
              <div className="flex -space-x-3 overflow-hidden">
                <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-[#0b1c30] bg-[#e2e8f0] dark:bg-slate-700" />
                <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-[#0b1c30] bg-[#cbd5e1] dark:bg-slate-600" />
                <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-[#0b1c30] bg-[#94a3b8] dark:bg-slate-500" />
              </div>
              <span className="text-sm font-bold text-[#0b1c30] dark:text-white">
                3 Pending
              </span>
            </div>
          </div>
          <p className="text-[10px] text-slate-400 dark:text-slate-500 italic mt-2">
            "Invitations expire after 72 hours of inactivity."
          </p>
        </div>

        {/* Need Bulk Import Card */}
        <div className="bg-gradient-to-br from-[#0a5cf5] to-[#4f46e5] text-white rounded-2xl p-6 shadow-md flex flex-col justify-between min-h-[180px]">
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-base">
              Need bulk import?
            </h3>
            <p className="text-xs text-blue-50/95 leading-relaxed">
              Upload a CSV or sync with Active Directory for automated provisioning.
            </p>
          </div>
          <button
            onClick={() => console.log("Documentation link clicked")}
            className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-lg px-4 py-2 mt-4 self-start border border-white/25 transition-all active:scale-95 shadow-sm"
          >
            Documentation
          </button>
        </div>
      </div>

      <InviteUserModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
      />
    </PageLayout>
  );
}
