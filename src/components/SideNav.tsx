import React, { useState, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

export interface SideNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const getNavItems = (t: any) => [
  { path: '/dashboard', label: t('sideNav.dashboard'), icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="9"></rect>
      <rect x="14" y="3" width="7" height="5"></rect>
      <rect x="14" y="12" width="7" height="9"></rect>
      <rect x="3" y="16" width="7" height="5"></rect>
    </svg>
  )},
  { path: '/analytics', label: t('sideNav.analytics'), icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"></line>
      <line x1="12" y1="20" x2="12" y2="4"></line>
      <line x1="6" y1="20" x2="6" y2="14"></line>
    </svg>
  )},
  { path: '/devices', label: t('sideNav.devices'), icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
      <line x1="12" y1="18" x2="12.01" y2="18"></line>
    </svg>
  )},
  { path: '/alerts', label: t('sideNav.alerts'), icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
      <line x1="12" y1="9" x2="12" y2="13"></line>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
  )},
  { 
    path: '/jobs', 
    label: t('sideNav.collection'), 
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
      </svg>
    ),
    children: [
      { path: '/jobs', label: t('sideNav.jobs') },
      { path: '/collectors', label: t('sideNav.collectors') }
    ]
  },
  { path: '/community-feedback', label: t('sideNav.communityFeedback'), icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
  )},
  { path: '/admin', label: t('sideNav.userManagement'), icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  )}
];

export function SideNav({ isOpen, onClose }: SideNavProps) {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const role = localStorage.getItem("userRole");
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    '/jobs': true // default expand jobs if we want, or evaluate based on current path
  });

  const toggleExpand = (path: string) => {
    setExpandedItems(prev => ({ ...prev, [path]: !prev[path] }));
  };

  const navItems = useMemo(() => getNavItems(t), [t]);

  const menuItems = role === "collector"
    ? [
        { path: '/collector-dashboard', label: t('sideNav.collectorDashboard'), icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="9"></rect>
            <rect x="14" y="3" width="7" height="5"></rect>
            <rect x="14" y="12" width="7" height="9"></rect>
            <rect x="3" y="16" width="7" height="5"></rect>
          </svg>
        )},
        { path: '/collector-map', label: t('sideNav.liveMap'), icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        )}
      ]
    : navItems;

  return (
    <>
      {/* Overlay backdrop */}
      <div 
        className={`fixed inset-0 bg-[#0b1c30]/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Sliding sidebar */}
      <div 
        className={`fixed top-0 left-0 bottom-0 w-64 bg-white dark:bg-[#0b1c30] border-r border-[#e2e8f0] dark:border-[#1e3a5f] shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="h-16 border-b border-[#e2e8f0] dark:border-[#1e3a5f] flex items-center justify-between px-6 shrink-0">
          <span className="text-xl font-extrabold text-[#121c28] dark:text-white tracking-tight">
            Smart<span className="text-[#006c49] dark:text-emerald-400">Sort</span>
          </span>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f1f5f9] dark:hover:bg-[#1a365d] text-[#64748b] dark:text-[#cbd5e1] hover:text-[#0b1c30] dark:hover:text-white transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
          {menuItems.map((item) => {
            const hasChildren = !!item.children;
            const isChildActive = hasChildren && item.children!.some(c => location.pathname === c.path);
            const isActive = location.pathname === item.path || isChildActive;
            const isExpanded = expandedItems[item.path] || isChildActive;

            return (
              <div key={item.path} className="flex flex-col gap-1">
                {hasChildren ? (
                  <button
                    onClick={() => toggleExpand(item.path)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group w-full ${
                      isActive 
                        ? 'bg-[#006c49]/10 text-[#006c49] dark:bg-emerald-500/10 dark:text-emerald-400 font-bold' 
                        : 'text-[#515f74] dark:text-[#cbd5e1] hover:bg-[#f8fafc] dark:hover:bg-[#0f2942] hover:text-[#0b1c30] dark:hover:text-white font-semibold'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`${isActive ? 'text-[#006c49] dark:text-emerald-400' : 'text-[#94a3b8] dark:text-[#cbd5e1] group-hover:text-[#515f74] dark:group-hover:text-white'}`}>
                        {item.icon}
                      </div>
                      {item.label}
                    </div>
                    <svg 
                      width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                      isActive 
                        ? 'bg-[#006c49]/10 text-[#006c49] dark:bg-emerald-500/10 dark:text-emerald-400 font-bold' 
                        : 'text-[#515f74] dark:text-[#cbd5e1] hover:bg-[#f8fafc] dark:hover:bg-[#0f2942] hover:text-[#0b1c30] dark:hover:text-white font-semibold'
                    }`}
                  >
                    <div className={`${isActive ? 'text-[#006c49] dark:text-emerald-400' : 'text-[#94a3b8] dark:text-[#cbd5e1] group-hover:text-[#515f74] dark:group-hover:text-white'}`}>
                      {item.icon}
                    </div>
                    {item.label}
                  </Link>
                )}

                {hasChildren && isExpanded && (
                  <div className="flex flex-col gap-1 pl-11 pr-2 pb-2">
                    {item.children!.map((child) => {
                      const isChildItemActive = location.pathname === child.path;
                      return (
                        <Link
                          key={child.path}
                          to={child.path}
                          onClick={onClose}
                          className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                            isChildItemActive 
                              ? 'text-[#006c49] dark:text-emerald-400 font-bold bg-[#006c49]/5 dark:bg-emerald-500/5' 
                              : 'text-[#64748b] dark:text-[#94a3b8] hover:text-[#0b1c30] dark:hover:text-white hover:bg-[#f8fafc] dark:hover:bg-[#0f2942] font-medium'
                          }`}
                        >
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#e2e8f0] dark:border-[#1e3a5f]">
          <button
            onClick={() => {
              localStorage.removeItem("userRole");
              onClose();
              navigate("/");
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#ba1a1a] dark:text-red-400 hover:bg-[#ffdad6]/50 dark:hover:bg-red-500/10 font-semibold transition-colors text-left cursor-pointer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            {t('sideNav.signOut')}
          </button>
        </div>
      </div>
    </>
  );
}
