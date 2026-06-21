import { createBrowserRouter } from "react-router";
import { Root } from "./Root";

// Helper for dynamic imports since components are default exports
const lazyRoute = (importFn: () => Promise<any>) => async () => {
  const m = await importFn();
  return { Component: m.default };
};

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, lazy: lazyRoute(() => import("../pages/Landing/Landing")) },
      { path: "login", lazy: lazyRoute(() => import("../pages/Login/Login")) },
      { path: "onboarding-1", lazy: lazyRoute(() => import("../pages/OnboardingStep1/Onboarding")) },
      { path: "onboarding-2", lazy: lazyRoute(() => import("../pages/OnboardingStep2/Onboarding")) },
      { path: "onboarding-3", lazy: lazyRoute(() => import("../pages/OnboardingStep3/Onboarding")) },
      { path: "dashboard", lazy: lazyRoute(() => import("../pages/Dashboard/Dashboard")) },
      { path: "collector-dashboard", lazy: lazyRoute(() => import("../pages/CollectorDashboard/CollectorDashboard")) },
      { path: "collector-map", lazy: lazyRoute(() => import("../pages/CollectorDashboard/CollectorMap")) },
      { path: "analytics", lazy: lazyRoute(() => import("../pages/Analytics/Analytics")) },
      { path: "devices", lazy: lazyRoute(() => import("../pages/Devices/Devices")) },
      { path: "alerts", lazy: lazyRoute(() => import("../pages/Alerts/Alerts")) },
      { path: "jobs", lazy: lazyRoute(() => import("../pages/CollectionJobs/CollectionJobs")) },
      { path: "collectors", lazy: lazyRoute(() => import("../pages/Collectors/Collectors")) },
      { path: "community-feedback", lazy: lazyRoute(() => import("../pages/CommunityFeedback/CommunityFeedback")) },
      { path: "admin", lazy: lazyRoute(() => import("../pages/UserManagement/UserManagement")) },
      { path: "profile", lazy: lazyRoute(() => import("../pages/Profile/Profile")) },
    ],
  },
]);
