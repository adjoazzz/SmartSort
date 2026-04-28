import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import Login from "../imports/Login/Login";
import Onboarding from "../imports/Onboarding/Onboarding";
import Onboarding1 from "../imports/Onboarding-1/Onboarding";
import Onboarding2 from "../imports/Onboarding-2/Onboarding";
import Dashboard from "../imports/Dashboard/Dashboard";
import Analytics from "../imports/Analytics/Analytics";
import Devices from "../imports/Devices/Devices";
import Alerts from "../imports/Alerts/Alerts";
import CollectionJobs from "../imports/CollectionJobs/CollectionJobs";
import UserManagement from "../imports/UserManagement/UserManagement";

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
      { path: "admin", Component: UserManagement },
    ],
  },
]);