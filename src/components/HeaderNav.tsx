import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { useTheme } from "next-themes";
import { Menu, Search, Bell, Settings, ChevronDown, Download } from "lucide-react";
import imgUserProfileAvatar from "../assets/6c7b9dccb9925ee83b19c4f4237c7c6aa454950a.png";
import { SideNav } from "./SideNav";
import { AlertsSidebar } from "./AlertsSidebar";
import { ProfilePopup } from "./ProfilePopup";
import { useTranslation } from "react-i18next";
import "../styles/profile-popup.css";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";

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

  const [isSSOEnabled, setIsSSOEnabled] = useState(() => {
    return localStorage.getItem("sso_enabled") === "true";
  });
  const [isEmailNotifyEnabled, setIsEmailNotifyEnabled] = useState(() => {
    return localStorage.getItem("email_notify_enabled") !== "false";
  });

  const handleSSOToggle = (val: boolean) => {
    setIsSSOEnabled(val);
    localStorage.setItem("sso_enabled", String(val));
  };

  const handleEmailNotifyToggle = (val: boolean) => {
    setIsEmailNotifyEnabled(val);
    localStorage.setItem("email_notify_enabled", String(val));
  };

  const { theme: themeMode, setTheme: setThemeMode } = useTheme();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [openCommand, setOpenCommand] = useState(false);

  const isDashboard = location.pathname === "/dashboard";

  const [devices, setDevices] = useState<any[]>([]);
  const [collectors, setCollectors] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    if (openCommand) {
      const baseUrl =
        (import.meta as any).env?.VITE_API_BASE_URL ?? "http://localhost:5000";
      fetch(`${baseUrl}/api/devices`)
        .then((r) => r.json())
        .then(setDevices)
        .catch(() => {});
      fetch(`${baseUrl}/api/collectors`)
        .then((r) => r.json())
        .then(setCollectors)
        .catch(() => {});
      fetch(`${baseUrl}/api/jobs`)
        .then((r) => r.json())
        .then(setJobs)
        .catch(() => {});
      fetch(`${baseUrl}/api/alerts`)
        .then((r) => r.json())
        .then(setAlerts)
        .catch(() => {});
    }
  }, [openCommand]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpenCommand((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpenCommand(false);
    command();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (settingsRef.current && !settingsRef.current.contains(target)) {
        setIsSettingsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 flex-shrink-0 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-4 w-full max-w-lg">
          <button
            onClick={() => setIsNavOpen(true)}
            data-testid="header-menu-btn"
            className="w-10 h-10 rounded-xl flex items-center justify-center text-muted-foreground hover:bg-muted dark:hover:bg-muted hover:text-foreground dark:text-white transition-colors active:scale-[0.98]"
            aria-label="Open Menu"
          >
            <Menu className="w-6 h-6" strokeWidth={2.5} />
          </button>

          {isDashboard && (
            <button
              onClick={() => setOpenCommand(true)}
              data-testid="header-search-btn"
              className="flex items-center w-full bg-background dark:bg-secondary rounded-xl border border-transparent hover:border-border dark:hover:border-border hover:bg-white dark:hover:bg-card hover:shadow-sm transition-all overflow-hidden px-4 py-2 cursor-pointer active:scale-[0.98]"
            >
              <Search className="w-4 h-4 mr-3 text-[#94A3B8] dark:text-slate-400" strokeWidth={2.5} />
              <div className="flex-1 text-sm font-medium text-muted-foreground flex justify-between items-center">
                <span>
                  {t("headerNav.searchPlaceholder") || "Search or jump to..."}
                </span>
                <kbd className="pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </div>
            </button>
          )}

          <CommandDialog open={openCommand} onOpenChange={setOpenCommand}>
            <CommandInput placeholder="Type a command or search pages..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Pages">
                <CommandItem
                  onSelect={() => runCommand(() => navigate("/dashboard"))}
                >
                  Dashboard
                </CommandItem>
                <CommandItem
                  onSelect={() => runCommand(() => navigate("/analytics"))}
                >
                  Analytics
                </CommandItem>
                <CommandItem
                  onSelect={() => runCommand(() => navigate("/devices"))}
                >
                  Devices
                </CommandItem>
                <CommandItem
                  onSelect={() => runCommand(() => navigate("/collectors"))}
                >
                  Collectors
                </CommandItem>
                <CommandItem
                  onSelect={() => runCommand(() => navigate("/jobs"))}
                >
                  Collection Jobs
                </CommandItem>
                <CommandItem
                  onSelect={() => runCommand(() => navigate("/alerts"))}
                >
                  Alerts
                </CommandItem>
                <CommandItem
                  onSelect={() =>
                    runCommand(() => navigate("/community-feedback"))
                  }
                >
                  Community Feedback
                </CommandItem>
                <CommandItem
                  onSelect={() => runCommand(() => navigate("/manager/users"))}
                >
                  User Management
                </CommandItem>
              </CommandGroup>

              {devices.length > 0 && (
                <CommandGroup heading="Devices">
                  {devices.map((d) => (
                    <CommandItem
                      key={`device-${d.customBinId || d.id}`}
                      onSelect={() => runCommand(() => navigate("/devices"))}
                    >
                      <div className="flex flex-col">
                        <span>{d.customBinId || d.id}</span>
                        <span className="text-xs text-muted-foreground">
                          {d.location} • {d.status}
                        </span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {collectors.length > 0 && (
                <CommandGroup heading="Collectors">
                  {collectors.map((c) => (
                    <CommandItem
                      key={`collector-${c.id}`}
                      onSelect={() => runCommand(() => navigate("/collectors"))}
                    >
                      <div className="flex flex-col">
                        <span>{c.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {c.region} • {c.status}
                        </span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {jobs.length > 0 && (
                <CommandGroup heading="Jobs">
                  {jobs.map((j) => (
                    <CommandItem
                      key={`job-${j.id}`}
                      onSelect={() => runCommand(() => navigate("/jobs"))}
                    >
                      <div className="flex flex-col">
                        <span>Job at {j.location}</span>
                        <span className="text-xs text-muted-foreground">
                          {j.urgency} • {j.status}
                        </span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {alerts.length > 0 && (
                <CommandGroup heading="Alerts">
                  {alerts.map((a) => (
                    <CommandItem
                      key={`alert-${a.id}`}
                      onSelect={() => runCommand(() => navigate("/alerts"))}
                    >
                      <div className="flex flex-col">
                        <span>{a.messageTitle}</span>
                        <span className="text-xs text-muted-foreground">
                          {a.deviceName} • {a.severity}
                        </span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              <CommandGroup heading="Account">
                <CommandItem
                  onSelect={() => runCommand(() => navigate("/profile"))}
                >
                  Profile
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </CommandDialog>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          {/* PWA Install Button */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-pwa-install"))}
            data-testid="header-pwa-install-btn"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold text-[#006c49] dark:text-emerald-400 bg-[#006c49]/10 dark:bg-emerald-500/10 hover:bg-[#006c49]/20 rounded-lg transition-all active:scale-[0.98] cursor-pointer border border-[#006c49]/20"
            title="Install SmartSort PWA"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Install App</span>
          </button>

          {!hideAlertsIcon && (
            <button
              onClick={() => setIsAlertsOpen(true)}
              data-testid="header-alerts-btn"
              className="text-muted-foreground hover:text-foreground dark:hover:text-white transition-colors relative active:scale-[0.98]"
              aria-label="Open alerts"
            >
              <Bell className="w-5 h-5" strokeWidth={2.5} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-[#ba1a1a] dark:bg-red-500 rounded-full border-2 border-white translate-x-1/2 -translate-y-1/2"></span>
            </button>
          )}

          {/* Settings Menu */}
          <div className="relative" ref={settingsRef}>
            <button
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              data-testid="header-settings-btn"
              className={`text-muted-foreground transition-colors active:scale-[0.98] ${isSettingsOpen ? "text-foreground dark:text-white" : "hover:text-foreground dark:hover:text-white"}`}
              aria-label="Settings"
            >
              <Settings className="w-5 h-5" strokeWidth={2.5} />
            </button>

            {isSettingsOpen && (
              <div className="absolute right-0 top-[calc(100%+12px)] w-64 bg-card border border-border rounded-xl shadow-lg z-50 flex flex-col py-1 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-4 py-3 border-b border-[#f1f5f9] dark:border-[#0f2942]">
                  <h4 className="text-sm font-semibold text-foreground dark:text-white">
                    {t("headerNav.settings")}
                  </h4>
                </div>

                {/* Language */}
                <div className="px-4 py-3 border-b border-[#f1f5f9] dark:border-[#0f2942]">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 block">
                    {t("headerNav.language")}
                  </label>
                  <div className="relative">
                    <select
                      className="w-full text-sm font-medium bg-background dark:bg-secondary border border-border rounded-lg pl-3 pr-8 py-2 outline-none focus:border-[#006c49] dark:focus:border-emerald-500 dark:border-emerald-500 text-foreground dark:text-white appearance-none cursor-pointer"
                      value={i18n.language || "en"}
                      onChange={(e) => i18n.changeLanguage(e.target.value)}
                    >
                      <option value="en">English (US)</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                    </select>
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                      <ChevronDown className="w-3 h-3" strokeWidth={2} />
                    </div>
                  </div>
                </div>

                {/* Theme */}
                <div className="px-4 py-3 border-b border-[#f1f5f9] dark:border-[#0f2942]">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 block">
                    {t("headerNav.theme")}
                  </label>
                  <div className="flex bg-background dark:bg-secondary p-1 rounded-lg border border-border">
                    <button
                      onClick={() => setThemeMode("light")}
                      className={`flex-1 py-1.5 text-[11px] font-bold rounded-md transition-colors ${themeMode === "light" ? "bg-card shadow-sm text-foreground dark:text-white border border-border" : "text-muted-foreground hover:text-foreground dark:hover:text-white"}`}
                    >
                      {t("headerNav.light")}
                    </button>
                    <button
                      onClick={() => setThemeMode("dark")}
                      className={`flex-1 py-1.5 text-[11px] font-bold rounded-md transition-colors ${themeMode === "dark" ? "bg-card shadow-sm text-foreground dark:text-white border border-border" : "text-muted-foreground hover:text-foreground dark:hover:text-white"}`}
                    >
                      {t("headerNav.dark")}
                    </button>
                    <button
                      onClick={() => setThemeMode("system")}
                      className={`flex-1 py-1.5 text-[11px] font-bold rounded-md transition-colors ${themeMode === "system" ? "bg-card shadow-sm text-foreground dark:text-white border border-border" : "text-muted-foreground hover:text-foreground dark:hover:text-white"}`}
                    >
                      {t("headerNav.system")}
                    </button>
                  </div>
                </div>

                {/* Notifications settings */}
                <div className="px-4 py-3 border-b border-[#f1f5f9] dark:border-[#0f2942]">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 block">
                    {t("headerNav.notifications")}
                  </label>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-foreground dark:text-muted-foreground font-medium">
                      {t("headerNav.emailAlerts")}
                    </span>
                    <button
                      onClick={() =>
                        handleEmailNotifyToggle(!isEmailNotifyEnabled)
                      }
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        isEmailNotifyEnabled
                          ? "bg-primary"
                          : "bg-[#e2e8f0] dark:bg-[#1e3a5f]"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          isEmailNotifyEnabled
                            ? "translate-x-4"
                            : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Enterprise Sync setting */}
                <div className="px-4 py-3">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 block">
                    {t("headerNav.enterpriseSync")}
                  </label>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-foreground dark:text-muted-foreground font-medium">
                      {t("headerNav.activeDirectorySso")}
                    </span>
                    <button
                      onClick={() => handleSSOToggle(!isSSOEnabled)}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        isSSOEnabled
                          ? "bg-primary"
                          : "bg-[#e2e8f0] dark:bg-[#1e3a5f]"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          isSSOEnabled ? "translate-x-4" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile icon & Role badge */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-[#006c49]/10 text-[#006c49] dark:bg-emerald-500/10 dark:text-emerald-400 border border-[#006c49]/15 dark:border-emerald-500/15">
              {localStorage.getItem("userRole") || "viewer"}
            </span>
            <button
              ref={profileBtnRef}
              onClick={() => setIsProfileOpen((prev) => !prev)}
              data-testid="header-profile-btn"
              className="w-9 h-9 rounded-full bg-[#e2e8f0] dark:bg-slate-700 overflow-hidden border-2 border-white dark:border-secondary shadow-sm ring-1 ring-[#cbd5e1] dark:ring-slate-600 cursor-pointer hover:ring-[#94a3b8] dark:hover:ring-slate-400 transition-all active:scale-[0.98]"
              aria-label="Open profile menu"
              aria-expanded={isProfileOpen}
            >
              <img
                src={imgUserProfileAvatar}
                alt="User Profile"
                className="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>
      </header>

      <SideNav isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />
      <AlertsSidebar
        isOpen={isAlertsOpen}
        onClose={() => setIsAlertsOpen(false)}
      />
      <ProfilePopup
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        anchorRef={profileBtnRef}
      />
    </>
  );
}
