import React, { useState, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import {
  LayoutDashboard,
  BarChart2,
  Smartphone,
  AlertTriangle,
  Briefcase,
  MessageCircle,
  Users,
  Shield,
  X,
  ChevronDown,
  LogOut,
} from "lucide-react";

export interface SideNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const getNavItems = (t: any) => [
  {
    path: "/dashboard",
    label: t("sideNav.dashboard"),
    icon: <LayoutDashboard className="w-5 h-5" strokeWidth={2} />,
  },
  {
    path: "/analytics",
    label: t("sideNav.analytics"),
    icon: <BarChart2 className="w-5 h-5" strokeWidth={2} />,
  },
  {
    path: "/devices",
    label: t("sideNav.devices"),
    icon: <Smartphone className="w-5 h-5" strokeWidth={2} />,
  },
  {
    path: "/alerts",
    label: t("sideNav.alerts"),
    icon: <AlertTriangle className="w-5 h-5" strokeWidth={2} />,
  },
  {
    path: "/jobs",
    label: t("sideNav.collection"),
    icon: <Briefcase className="w-5 h-5" strokeWidth={2} />,
    children: [
      { path: "/jobs", label: t("sideNav.jobs") },
      { path: "/route-optimization", label: "AI Route Optimizer" },
      { path: "/collectors", label: t("sideNav.collectors") },
    ],
  },
  {
    path: "/community-feedback",
    label: t("sideNav.communityFeedback"),
    icon: <MessageCircle className="w-5 h-5" strokeWidth={2} />,
  },
  {
    path: "/manager/users",
    label: t("sideNav.userManagement"),
    icon: <Users className="w-5 h-5" strokeWidth={2} />,
  },
];

const getAdminNavItems = (t: any) => [
  {
    path: "/admin/dashboard",
    label: t("Enterprise Overview") || "Enterprise Overview",
    icon: <Shield className="w-5 h-5" strokeWidth={2} />,
  },
  {
    path: "/manager/users",
    label: t("sideNav.userManagement"),
    icon: <Users className="w-5 h-5" strokeWidth={2} />,
  },
  {
    path: "/devices",
    label: t("sideNav.devices"),
    icon: <Smartphone className="w-5 h-5" strokeWidth={2} />,
  },
  {
    path: "/alerts",
    label: t("sideNav.alerts"),
    icon: <AlertTriangle className="w-5 h-5" strokeWidth={2} />,
  },
  {
    path: "/jobs",
    label: t("sideNav.collection") || "Collection",
    icon: <Briefcase className="w-5 h-5" strokeWidth={2} />,
    children: [
      { path: "/jobs", label: t("sideNav.jobs") },
      { path: "/route-optimization", label: "AI Route Optimizer" },
      { path: "/collectors", label: t("sideNav.collectors") },
    ],
  },
  {
    path: "/community-feedback",
    label: t("sideNav.communityFeedback"),
    icon: <MessageCircle className="w-5 h-5" strokeWidth={2} />,
  },
];

export function SideNav({ isOpen, onClose }: SideNavProps) {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const role = localStorage.getItem("userRole");
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    "/jobs": true, // default expand jobs if we want, or evaluate based on current path
  });

  const toggleExpand = (path: string) => {
    setExpandedItems((prev) => ({ ...prev, [path]: !prev[path] }));
  };

  const navItems = useMemo(() => getNavItems(t), [t]);
  const adminNavItems = useMemo(() => getAdminNavItems(t), [t]);

  const menuItems = useMemo(() => {
    const roleLower = role?.toLowerCase();

    if (roleLower === "collector") {
      return [
        {
          path: "/collector-dashboard",
          label: t("sideNav.collectorDashboard") || "Collector Dashboard",
          icon: <LayoutDashboard className="w-5 h-5" strokeWidth={2} />,
        },
      ];
    }

    if (roleLower === "admin") {
      return adminNavItems;
    }

    if (roleLower === "manager") {
      // Managers can access: Dashboard, Analytics, Devices, Collection, Community Feedback, User Management
      // They cannot access: Alerts
      return navItems.filter((item) => item.path !== "/alerts");
    }

    // Viewers/others can only access: Dashboard, Analytics, Devices
    return navItems.filter(
      (item) =>
        item.path === "/dashboard" ||
        item.path === "/analytics" ||
        item.path === "/devices",
    );
  }, [role, navItems, adminNavItems, t]);

  return (
    <>
      {/* Overlay backdrop */}
      <div
        className={`fixed inset-0 bg-card/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Sliding sidebar */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-64 bg-card border-r border-border shadow-md z-[70] transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="h-16 border-b border-border flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="SmartSort Logo"
              className="w-8 h-8 object-contain rounded-md"
            />
            <span className="text-xl font-extrabold text-[#121c28] dark:text-white tracking-tight">
              Smart
              <span className="text-[#006c49] dark:text-emerald-400">Sort</span>
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close sidebar menu"
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted dark:hover:bg-muted text-muted-foreground hover:text-foreground dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
          {menuItems.map((item) => {
            const hasChildren = !!item.children;
            const isChildActive =
              hasChildren &&
              item.children!.some((c) => location.pathname === c.path);
            const isActive = location.pathname === item.path || isChildActive;
            const isExpanded = expandedItems[item.path] || isChildActive;

            return (
              <div key={item.path} className="flex flex-col gap-1">
                {hasChildren ? (
                  <button
                    onClick={() => toggleExpand(item.path)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group w-full ${
                      isActive
                        ? "bg-primary/10 text-[#006c49] dark:bg-emerald-500/10 dark:text-emerald-400 font-bold"
                        : "text-muted-foreground hover:bg-background dark:hover:bg-secondary hover:text-foreground dark:hover:text-white font-semibold"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`${isActive ? "text-[#006c49] dark:text-emerald-400" : "text-muted-foreground group-hover:text-muted-foreground dark:group-hover:text-white"}`}
                      >
                        {item.icon}
                      </div>
                      {item.label}
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                      strokeWidth={2}
                    />
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? "bg-primary/10 text-[#006c49] dark:bg-emerald-500/10 dark:text-emerald-400 font-bold"
                        : "text-muted-foreground hover:bg-background dark:hover:bg-secondary hover:text-foreground dark:hover:text-white font-semibold"
                    }`}
                  >
                    <div
                      className={`${isActive ? "text-[#006c49] dark:text-emerald-400" : "text-muted-foreground group-hover:text-muted-foreground dark:group-hover:text-white"}`}
                    >
                      {item.icon}
                    </div>
                    {item.label}
                  </Link>
                )}

                {hasChildren && isExpanded && (
                  <div className="flex flex-col gap-1 pl-11 pr-2 pb-2">
                    {item.children!.map((child) => {
                      const isChildItemActive =
                        location.pathname === child.path;
                      return (
                        <Link
                          key={child.path}
                          to={child.path}
                          onClick={onClose}
                          className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                            isChildItemActive
                              ? "text-[#006c49] dark:text-emerald-400 font-bold bg-primary/5 dark:bg-emerald-500/5"
                              : "text-muted-foreground hover:text-foreground dark:hover:text-white hover:bg-background dark:hover:bg-secondary font-medium"
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

        <div className="p-4 border-t border-border">
          <button
            onClick={() => {
              localStorage.removeItem("userRole");
              onClose();
              navigate("/");
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#ba1a1a] dark:text-red-500 hover:bg-[#ffdad6]/50 dark:hover:bg-red-500/10 font-semibold transition-colors text-left cursor-pointer"
          >
            <LogOut className="w-5 h-5" strokeWidth={2} />
            {t("sideNav.signOut")}
          </button>
        </div>
      </div>
    </>
  );
}
