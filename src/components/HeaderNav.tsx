import React, { useState } from 'react';
import { Link } from "react-router";
import imgUserProfileAvatar from "../assets/6c7b9dccb9925ee83b19c4f4237c7c6aa454950a.png";
import { SideNav } from './SideNav';
import { AlertsSidebar } from './AlertsSidebar';

export function HeaderNav() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);

  return (
    <>
      <header className="h-16 bg-white border-b border-[#e2e8f0] flex items-center justify-between px-6 flex-shrink-0 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-4 w-full max-w-lg">
          <button 
            onClick={() => setIsNavOpen(true)}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-[#515f74] hover:bg-[#f1f5f9] hover:text-[#0b1c30] transition-colors"
            aria-label="Open Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>

          <div className="flex items-center w-full bg-[#f8fafc] rounded-xl border border-transparent focus-within:border-[#cbd5e1] focus-within:bg-white focus-within:shadow-sm transition-all overflow-hidden px-4 py-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              placeholder="Search facilities or events..." 
              className="bg-transparent border-none outline-none text-sm font-medium text-[#0b1c30] placeholder-[#94a3b8] w-full"
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={() => setIsAlertsOpen(true)}
            className="text-[#64748b] hover:text-[#0b1c30] transition-colors relative"
            aria-label="Open alerts"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <span className="absolute top-0 right-0 w-2 h-2 bg-[#ba1a1a] rounded-full border-2 border-white translate-x-1/2 -translate-y-1/2"></span>
          </button>

          <button className="text-[#64748b] hover:text-[#0b1c30] transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
          </button>

          <div className="w-9 h-9 rounded-full bg-[#e2e8f0] overflow-hidden border-2 border-white shadow-sm ring-1 ring-[#cbd5e1] cursor-pointer hover:ring-[#94a3b8] transition-all">
            <img src={imgUserProfileAvatar} alt="User Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      <SideNav isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />
      <AlertsSidebar isOpen={isAlertsOpen} onClose={() => setIsAlertsOpen(false)} />
    </>
  );
}
