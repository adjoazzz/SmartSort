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

// Auto-recovery for Vite dynamic module import / chunk load failures
window.addEventListener("vite:preloadError", () => {
  console.warn("[Vite] Preload error detected, reloading page...");
  window.location.reload();
});

// Register PWA Service Worker for production offline capabilities; unregister in dev to prevent stale cache issues
if ("serviceWorker" in navigator) {
  if (import.meta.env.PROD) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          console.log("[PWA] Service Worker registered:", reg.scope);
        })
        .catch((err) => {
          console.warn("[PWA] Service Worker registration failed:", err);
        });
    });
  } else {
    // Clean up stale service worker registrations during local development
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        registration.unregister().then((unregistered) => {
          if (unregistered) {
            console.log("[PWA] Development Service Worker unregistered");
          }
        });
      }
    });
  }
}

