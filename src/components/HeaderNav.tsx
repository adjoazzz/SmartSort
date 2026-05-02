import React, { useState, useRef, useEffect } from 'react';
import { Link } from "react-router";
import imgUserProfileAvatar from "../assets/6c7b9dccb9925ee83b19c4f4237c7c6aa454950a.png";
import { SideNav } from './SideNav';
import { AlertsSidebar } from './AlertsSidebar';
import { ProfilePopup } from './ProfilePopup';
import '../styles/profile-popup.css';

export interface HeaderNavProps {
  hideAlertsIcon?: boolean;
}

export function HeaderNav({ hideAlertsIcon }: HeaderNavProps = {}) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileBtnRef = useRef<HTMLButtonElement>(null);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'system'>(() => {
    return (localStorage.getItem('themeMode') as 'light' | 'dark' | 'system') || 'system';
  });

  React.useEffect(() => {
    const root = document.documentElement;
    localStorage.setItem('themeMode', themeMode);

    if (themeMode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const applySystemTheme = (e: MediaQueryListEvent | MediaQueryList) => {
        if (e.matches) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      };
      
      applySystemTheme(mediaQuery);
      mediaQuery.addEventListener('change', applySystemTheme);
      return () => mediaQuery.removeEventListener('change', applySystemTheme);
    } else if (themeMode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [themeMode]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (settingsRef.current && !settingsRef.current.contains(target)) {
        setIsSettingsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header className="h-16 bg-white dark:bg-[#0b1c30] border-b border-[#e2e8f0] dark:border-[#1e3a5f] flex items-center justify-between px-6 flex-shrink-0 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-4 w-full max-w-lg">
          <button 
            onClick={() => setIsNavOpen(true)}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-[#515f74] dark:text-[#cbd5e1] hover:bg-[#f1f5f9] dark:hover:bg-[#1a365d] hover:text-[#0b1c30] dark:text-white transition-colors"
            aria-label="Open Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>

          <div className="flex items-center w-full bg-[#f8fafc] dark:bg-[#0f2942] rounded-xl border border-transparent focus-within:border-[#cbd5e1] dark:focus-within:border-[#334155] focus-within:bg-white dark:bg-[#0b1c30] focus-within:shadow-sm transition-all overflow-hidden px-4 py-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              placeholder="Search facilities or events..." 
              className="bg-transparent border-none outline-none text-sm font-medium text-[#0b1c30] dark:text-white placeholder-[#94a3b8] w-full"
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          {!hideAlertsIcon && (
            <button 
              onClick={() => setIsAlertsOpen(true)}
              className="text-[#64748b] dark:text-[#94a3b8] dark:text-[#64748b] hover:text-[#0b1c30] dark:text-white transition-colors relative"
              aria-label="Open alerts"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              <span className="absolute top-0 right-0 w-2 h-2 bg-[#ba1a1a] rounded-full border-2 border-white translate-x-1/2 -translate-y-1/2"></span>
            </button>
          )}

          {/* Settings Menu */}
          <div className="relative" ref={settingsRef}>
            <button 
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className={`text-[#64748b] dark:text-[#94a3b8] dark:text-[#64748b] transition-colors ${isSettingsOpen ? 'text-[#0b1c30] dark:text-white' : 'hover:text-[#0b1c30] dark:text-white'}`}
              aria-label="Settings"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
            </button>
            
            {isSettingsOpen && (
              <div className="absolute right-0 top-[calc(100%+12px)] w-64 bg-white dark:bg-[#0b1c30] border border-[#e2e8f0] dark:border-[#1e3a5f] rounded-xl shadow-lg z-50 flex flex-col py-1 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-4 py-3 border-b border-[#f1f5f9] dark:border-[#0f2942]">
                  <h4 className="text-sm font-semibold text-[#0b1c30] dark:text-white">Settings</h4>
                </div>
                
                {/* Language */}
                <div className="px-4 py-3 border-b border-[#f1f5f9] dark:border-[#0f2942]">
                  <label className="text-xs font-bold text-[#515f74] dark:text-[#cbd5e1] uppercase tracking-wider mb-2 block">Language</label>
                  <div className="relative">
                    <select className="w-full text-sm font-medium bg-[#f8fafc] dark:bg-[#0f2942] border border-[#e2e8f0] dark:border-[#1e3a5f] rounded-lg pl-3 pr-8 py-2 outline-none focus:border-[#006c49] text-[#0b1c30] dark:text-white appearance-none cursor-pointer">
                      <option value="en">English (US)</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                    </select>
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#515f74] dark:text-[#cbd5e1]">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Theme */}
                <div className="px-4 py-3 border-b border-[#f1f5f9] dark:border-[#0f2942]">
                  <label className="text-xs font-bold text-[#515f74] dark:text-[#cbd5e1] uppercase tracking-wider mb-2 block">Theme</label>
                  <div className="flex bg-[#f8fafc] dark:bg-[#0f2942] p-1 rounded-lg border border-[#e2e8f0] dark:border-[#1e3a5f]">
                    <button 
                      onClick={() => setThemeMode('light')}
                      className={`flex-1 py-1.5 text-[11px] font-bold rounded-md transition-colors ${themeMode === 'light' ? 'bg-white dark:bg-[#0b1c30] shadow-sm text-[#0b1c30] dark:text-white border border-[#e2e8f0] dark:border-[#1e3a5f]' : 'text-[#64748b] dark:text-[#94a3b8] dark:text-[#64748b] hover:text-[#0b1c30] dark:text-white'}`}
                    >
                      Light
                    </button>
                    <button 
                      onClick={() => setThemeMode('dark')}
                      className={`flex-1 py-1.5 text-[11px] font-bold rounded-md transition-colors ${themeMode === 'dark' ? 'bg-white dark:bg-[#0b1c30] shadow-sm text-[#0b1c30] dark:text-white border border-[#e2e8f0] dark:border-[#1e3a5f]' : 'text-[#64748b] dark:text-[#94a3b8] dark:text-[#64748b] hover:text-[#0b1c30] dark:text-white'}`}
                    >
                      Dark
                    </button>
                    <button 
                      onClick={() => setThemeMode('system')}
                      className={`flex-1 py-1.5 text-[11px] font-bold rounded-md transition-colors ${themeMode === 'system' ? 'bg-white dark:bg-[#0b1c30] shadow-sm text-[#0b1c30] dark:text-white border border-[#e2e8f0] dark:border-[#1e3a5f]' : 'text-[#64748b] dark:text-[#94a3b8] dark:text-[#64748b] hover:text-[#0b1c30] dark:text-white'}`}
                    >
                      System
                    </button>
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* Profile icon */}
          <button
            ref={profileBtnRef}
            onClick={() => setIsProfileOpen((prev) => !prev)}
            className="w-9 h-9 rounded-full bg-[#e2e8f0] overflow-hidden border-2 border-white shadow-sm ring-1 ring-[#cbd5e1] cursor-pointer hover:ring-[#94a3b8] transition-all"
            aria-label="Open profile menu"
            aria-expanded={isProfileOpen}
          >
            <img src={imgUserProfileAvatar} alt="User Profile" className="w-full h-full object-cover" />
          </button>
        </div>
      </header>

      <SideNav isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />
      <AlertsSidebar isOpen={isAlertsOpen} onClose={() => setIsAlertsOpen(false)} />
      <ProfilePopup isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} anchorRef={profileBtnRef} />
    </>
  );
}
