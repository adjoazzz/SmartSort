import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { ProtectedRoute } from "../components/ProtectedRoute";

// Helper for dynamic imports since components are default exports
const lazyRoute = (importFn: () => Promise<any>) => async () => {
  const m = await importFn();
  return { Component: m.default };
};

const protectedLazyRoute = (importFn: () => Promise<any>, allowedRoles: string[]) => async () => {
  const m = await importFn();
  const LazyComponent = m.default;
  return {
    element: (
      <ProtectedRoute allowedRoles={allowedRoles}>
        <LazyComponent />
      </ProtectedRoute>
    )
  };
};

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        lazy: lazyRoute(() => import("../pages/Landing/Landing")),
      },
      { path: "login", lazy: lazyRoute(() => import("../pages/Login/Login")) },
      {
        path: "onboarding-1",
        lazy: lazyRoute(() => import("../pages/OnboardingStep1/Onboarding")),
      },
      {
        path: "onboarding-2",
        lazy: lazyRoute(() => import("../pages/OnboardingStep2/Onboarding")),
      },
      {
        path: "onboarding-3",
        lazy: lazyRoute(() => import("../pages/OnboardingStep3/Onboarding")),
      },
      {
        path: "dashboard",
        lazy: protectedLazyRoute(() => import("../pages/Dashboard/Dashboard"), ["admin", "manager", "viewer"]),
      },
      {
        path: "collector-dashboard",
        lazy: protectedLazyRoute(
          () => import("../pages/CollectorDashboard/CollectorDashboard"),
          ["collector", "admin"]
        ),
      },
      {
        path: "collector-map",
        lazy: protectedLazyRoute(
          () => import("../pages/CollectorDashboard/CollectorDashboard"),
          ["collector", "admin"]
        ),
      },
      {
        path: "analytics",
        lazy: protectedLazyRoute(() => import("../pages/Analytics/Analytics"), ["admin", "manager", "viewer"]),
      },
      {
        path: "devices",
        lazy: protectedLazyRoute(() => import("../pages/Devices/Devices"), ["admin", "manager", "viewer"]),
      },
      {
        path: "alerts",
        lazy: protectedLazyRoute(() => import("../pages/Alerts/Alerts"), ["admin"]),
      },
      {
        path: "jobs",
        lazy: protectedLazyRoute(() => import("../pages/CollectionJobs/CollectionJobs"), ["admin", "manager"]),
      },
      {
        path: "collectors",
        lazy: protectedLazyRoute(() => import("../pages/Collectors/Collectors"), ["admin", "manager"]),
      },
      {
        path: "community-feedback",
        lazy: protectedLazyRoute(
          () => import("../pages/CommunityFeedback/CommunityFeedback"),
          ["admin", "manager"]
        ),
      },
      {
        path: "manager/users",
        lazy: protectedLazyRoute(() => import("../pages/UserManagement/UserManagement"), ["admin"]),
      },
      {
        path: "admin/dashboard",
        lazy: protectedLazyRoute(() => import("../pages/AdminDashboard/AdminDashboard"), ["admin"]),
      },
      {
        path: "profile",
        lazy: protectedLazyRoute(() => import("../pages/Profile/Profile"), ["admin", "manager", "viewer", "collector"]),
      },
    ],
  },
]);

