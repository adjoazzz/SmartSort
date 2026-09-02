import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { RouteErrorBoundary } from "../components/RouteErrorBoundary";

// Helper for dynamic imports with auto-recovery for stale chunks or network glitches
const lazyRoute = (importFn: () => Promise<any>) => async () => {
  try {
    const m = await importFn();
    return { Component: m.default };
  } catch (error: any) {
    console.warn("[LazyRoute] Dynamic import failed, initiating automatic recovery...", error);
    const key = "smartsort_chunk_reload_attempted";
    const hasReloaded = sessionStorage.getItem(key);

    if (!hasReloaded) {
      sessionStorage.setItem(key, "true");
      window.location.reload();
      // Keep promise pending while page reloads to prevent rendering error screen
      return new Promise<{ Component: any }>(() => {});
    }

    sessionStorage.removeItem(key);
    // Final retry attempt
    const m = await importFn();
    return { Component: m.default };
  }
};

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    hydrateFallbackElement: <div />,
    errorElement: <RouteErrorBoundary />,
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
        element: <ProtectedRoute allowedRoles={["admin", "manager", "viewer"]} />,
        children: [
          {
            index: true,
            lazy: lazyRoute(() => import("../pages/Dashboard/Dashboard")),
          },
        ],
      },
      {
        path: "collector-dashboard",
        element: <ProtectedRoute allowedRoles={["collector", "admin"]} />,
        children: [
          {
            index: true,
            lazy: lazyRoute(
              () => import("../pages/CollectorDashboard/CollectorDashboard"),
            ),
          },
        ],
      },
      {
        path: "collector-map",
        element: <ProtectedRoute allowedRoles={["collector", "admin"]} />,
        children: [
          {
            index: true,
            lazy: lazyRoute(
              () => import("../pages/CollectorDashboard/CollectorDashboard"),
            ),
          },
        ],
      },
      {
        path: "analytics",
        element: <ProtectedRoute allowedRoles={["admin", "manager", "viewer"]} />,
        children: [
          {
            index: true,
            lazy: lazyRoute(() => import("../pages/Analytics/Analytics")),
          },
        ],
      },
      {
        path: "devices",
        element: <ProtectedRoute allowedRoles={["admin", "manager", "viewer"]} />,
        children: [
          {
            index: true,
            lazy: lazyRoute(() => import("../pages/Devices/Devices")),
          },
        ],
      },
      {
        path: "alerts",
        element: <ProtectedRoute allowedRoles={["admin"]} />,
        children: [
          {
            index: true,
            lazy: lazyRoute(() => import("../pages/Alerts/Alerts")),
          },
        ],
      },
      {
        path: "jobs",
        element: <ProtectedRoute allowedRoles={["admin", "manager"]} />,
        children: [
          {
            index: true,
            lazy: lazyRoute(
              () => import("../pages/CollectionJobs/CollectionJobs"),
            ),
          },
        ],
      },
      {
        path: "route-optimization",
        element: <ProtectedRoute allowedRoles={["admin", "manager"]} />,
        children: [
          {
            index: true,
            lazy: lazyRoute(
              () => import("../pages/RouteOptimization/RouteOptimization"),
            ),
          },
        ],
      },
      {
        path: "collectors",
        element: <ProtectedRoute allowedRoles={["admin", "manager"]} />,
        children: [
          {
            index: true,
            lazy: lazyRoute(() => import("../pages/Collectors/Collectors")),
          },
        ],
      },
      {
        path: "community-feedback",
        element: <ProtectedRoute allowedRoles={["admin", "manager"]} />,
        children: [
          {
            index: true,
            lazy: lazyRoute(
              () => import("../pages/CommunityFeedback/CommunityFeedback"),
            ),
          },
        ],
      },
      {
        path: "manager/users",
        element: <ProtectedRoute allowedRoles={["admin", "manager"]} />,
        children: [
          {
            index: true,
            lazy: lazyRoute(
              () => import("../pages/UserManagement/UserManagement"),
            ),
          },
        ],
      },
      {
        path: "admin/dashboard",
        element: <ProtectedRoute allowedRoles={["admin"]} />,
        children: [
          {
            index: true,
            lazy: lazyRoute(
              () => import("../pages/AdminDashboard/AdminDashboard"),
            ),
          },
        ],
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute
            allowedRoles={["admin", "manager", "viewer", "collector"]}
          />
        ),
        children: [
          {
            index: true,
            lazy: lazyRoute(() => import("../pages/Profile/Profile")),
          },
        ],
      },
    ],
  },
]);
