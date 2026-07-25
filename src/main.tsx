import { createRoot } from "react-dom/client";
import * as Sentry from "@sentry/react";
import App from "./app/App";
import "./styles/index.css";
import "./i18n";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0, 
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0, 
});

createRoot(document.getElementById("root")!).render(<App />);
