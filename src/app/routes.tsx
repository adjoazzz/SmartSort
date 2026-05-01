import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import Login from "../pages/Login/Login";
import Onboarding from "../pages/OnboardingStep1/Onboarding";
import Onboarding1 from "../pages/OnboardingStep2/Onboarding";
import Onboarding2 from "../pages/OnboardingStep3/Onboarding";
import Dashboard from "../pages/Dashboard/Dashboard";
import Analytics from "../pages/Analytics/Analytics";
import Devices from "../pages/Devices/Devices";
import Alerts from "../pages/Alerts/Alerts";
import CollectionJobs from "../pages/CollectionJobs/CollectionJobs";
import UserManagement from "../pages/UserManagement/UserManagement";
import CommunityFeedback from "../pages/CommunityFeedback/CommunityFeedback";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Login },
      { path: "onboarding-1", Component: Onboarding },
      { path: "onboarding-2", Component: Onboarding1 },
      { path: "onboarding-3", Component: Onboarding2 },
      { path: "dashboard", Component: Dashboard },
      { path: "analytics", Component: Analytics },
      { path: "devices", Component: Devices },
      { path: "alerts", Component: Alerts },
      { path: "jobs", Component: CollectionJobs },
      { path: "community-feedback", Component: CommunityFeedback },
      { path: "admin", Component: UserManagement },
    ],
  },
]);