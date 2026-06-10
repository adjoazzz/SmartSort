import React from 'react';
import { Link } from 'react-router';

interface Alert {
  id: string;
  timestamp: string;
  type: string;
  device: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  message: string;
  status: string;
}

const RECENT_ALERTS: Alert[] = [
  { id: 'ALT-9921', timestamp: '14:32:01', type: 'Hardware Failure', device: 'SS-UNIT-042', severity: 'CRITICAL', message: 'Conveyor belt motor jammed', status: 'Active' },
  { id: 'ALT-9920', timestamp: '14:15:22', type: 'Sensor Calibration', device: 'SS-UNIT-015', severity: 'WARNING', message: 'Optical sensor B variance detected', status: 'Active' },
  { id: 'ALT-9919', timestamp: '13:45:10', type: 'Network Disconnect', device: 'SS-UNIT-089', severity: 'CRITICAL', message: 'Lost connection to local hub', status: 'Active' },
  { id: 'ALT-9918', timestamp: '13:12:05', type: 'Bin Full', device: 'SS-UNIT-104', severity: 'WARNING', message: 'Organic bin capacity at 95%', status: 'Active' },
  { id: 'ALT-9917', timestamp: '11:30:00', type: 'Maintenance', device: 'SS-UNIT-003', severity: 'INFO', message: 'Scheduled firmware update complete', status: 'Resolved' },
];

interface AlertsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const severityConfig = {
  CRITICAL: {
    dotColor: 'bg-[#ba1a1a]',
    bgColor: 'bg-[#ffdad6]/20',
    textColor: 'text-[#ba1a1a]',
    borderColor: 'border-[#ba1a1a]/20',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>
    ),
  },
  WARNING: {
    dotColor: 'bg-[#d97706]',
    bgColor: 'bg-[#fef3c7]/40',
    textColor: 'text-[#d97706]',
    borderColor: 'border-[#d97706]/20',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
    ),
  },
  INFO: {
    dotColor: 'bg-[#0284c7]',
    bgColor: 'bg-[#e0f2fe]/40',
    textColor: 'text-[#0284c7]',
    borderColor: 'border-[#0284c7]/20',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
    ),
  },
};

export function AlertsSidebar({ isOpen, onClose }: AlertsSidebarProps) {
  const activeCount = RECENT_ALERTS.filter(a => a.status === 'Active').length;

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 bg-black/10 backdrop-blur-[2px] z-[60] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[400px] max-w-[90vw] bg-white/80 dark:bg-[#0b1c30]/80 backdrop-blur-md border-l border-[#e2e8f0]/40 dark:border-[#1e3a5f]/40 shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#e2e8f0]/40 dark:border-[#1e3a5f]/40 bg-transparent flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#ffdad6]/30 flex items-center justify-center text-[#ba1a1a]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </div>
            <div>
              <h2 className="text-base font-bold text-[#0b1c30] dark:text-white">Notifications</h2>
              <p className="text-xs text-[#64748b] dark:text-[#94a3b8] dark:text-[#64748b] font-medium">{activeCount} active alert{activeCount !== 1 ? 's' : ''}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-[#94a3b8] dark:text-[#64748b] hover:text-[#0b1c30] dark:text-white hover:bg-[#f1f5f9] dark:hover:bg-[#1a365d] transition-colors"
            aria-label="Close notifications"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Alert list */}
        <div className="flex-1 overflow-y-auto px-4 py-3">
          <div className="flex flex-col gap-2">
            {RECENT_ALERTS.map((alert, index) => {
              const config = severityConfig[alert.severity];

              return (
                <Link
                  key={alert.id}
                  to="/alerts"
                  onClick={onClose}
                  className={`group block rounded-xl border ${config.borderColor} ${config.bgColor} p-4 no-underline hover:shadow-md transition-all duration-200 cursor-pointer`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: isOpen ? `slideInRight 0.3s ease-out ${index * 50}ms both` : 'none',
                  }}
                >
                  <div className="flex items-start gap-3">
                    {/* Severity icon */}
                    <div className={`w-8 h-8 rounded-lg ${config.bgColor} ${config.textColor} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      {config.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Top row: severity + timestamp */}
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-[10px] font-bold ${config.textColor} uppercase tracking-widest`}>
                          {alert.severity}
                        </span>
                        <span className="text-[10px] font-medium text-[#94a3b8] dark:text-[#64748b]">{alert.timestamp}</span>
                      </div>

                      {/* Message */}
                      <p className="text-sm font-semibold text-[#0b1c30] dark:text-white mb-1 leading-snug">{alert.message}</p>

                      {/* Meta row */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-[#64748b] dark:text-[#94a3b8] dark:text-[#64748b]">{alert.device}</span>
                        <span className="text-[#cbd5e1]">·</span>
                        <span className="text-xs text-[#64748b] dark:text-[#94a3b8] dark:text-[#64748b]">{alert.type}</span>
                      </div>
                    </div>

                    {/* Arrow on hover */}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-[#cbd5e1] group-hover:text-[#006c49] transition-colors flex-shrink-0 mt-1" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#e2e8f0]/40 dark:border-[#1e3a5f]/40 bg-[#f8fafc]/50 dark:bg-[#0f2942]/50 flex-shrink-0">
          <Link
            to="/alerts"
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 bg-[#006c49] hover:bg-[#005a3c] text-white text-sm font-semibold rounded-xl px-4 py-3 transition-colors no-underline"
          >
            View All Alerts
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Slide-in animation keyframes */}
      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}
