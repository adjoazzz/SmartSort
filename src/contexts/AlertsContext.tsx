import React, { createContext, useContext, useState, useEffect, useRef, useCallback, ReactNode } from "react";
import { supabase } from "../lib/supabaseClient";
import { toast as sonnerToast } from "sonner";
import { authFetch } from "../lib/authFetch";

export interface Alert {
  id: string;
  timestamp: string;
  type: string;
  device: string;
  severity: "CRITICAL" | "WARNING" | "INFO";
  message: string;
  status: string;
}

interface AlertsContextType {
  alerts: Alert[];
  addAlert: (alert: Omit<Alert, "id" | "timestamp" | "status">) => void;
  dismissAlert: (id: string) => void;
}

const AlertsContext = createContext<AlertsContextType | undefined>(undefined);

function mapDbAlertToUi(dbAlert: any): Alert {
  return {
    id: dbAlert.id,
    timestamp: new Date(dbAlert.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    type: dbAlert.title || "System Alert",
    device: dbAlert.device?.customBinId || dbAlert.deviceId || "System",
    severity: dbAlert.severity as Alert["severity"],
    message: dbAlert.description || dbAlert.title,
    status: dbAlert.status,
  };
}

export function AlertsProvider({ children }: { children: ReactNode }) {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const knownIdsRef = useRef<Set<string>>(new Set());
  const initialLoadDoneRef = useRef(false);

  const addAlert = (alertData: Omit<Alert, "id" | "timestamp" | "status">) => {
    const newAlert: Alert = {
      ...alertData,
      id: `ALT-${Math.floor(Math.random() * 10000)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      status: "Active",
    };
    setAlerts((prev) => [newAlert, ...prev]);
  };

  const dismissAlert = (id: string) => {
    setAlerts((prev) => prev.map(a => a.id === id ? { ...a, status: "Resolved" } : a));
  };

  // Listen for in-app toast/alert events
  useEffect(() => {
    const handleAppAlert = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        addAlert({
          message: customEvent.detail.message,
          severity: customEvent.detail.severity,
          device: customEvent.detail.device || "System",
          type: customEvent.detail.type || "Notification"
        });
      }
    };

    window.addEventListener('app-alert', handleAppAlert);
    return () => window.removeEventListener('app-alert', handleAppAlert);
  }, []);

  // Fetch alerts from the backend API and subscribe to real-time changes
  const fetchAlerts = useCallback(async () => {
    try {
      const baseUrl = (import.meta as any).env?.VITE_API_BASE_URL ?? "http://localhost:5000";
      const response = await authFetch(`${baseUrl}/api/alerts`);
      if (!response.ok) return;
      const data = await response.json();
      const dbAlerts: any[] = Array.isArray(data) ? data : data.data || [];
      const mapped = dbAlerts.map(mapDbAlertToUi);

      // Detect newly arrived alerts (skip on initial load)
      if (initialLoadDoneRef.current) {
        const newAlerts = mapped.filter((a) => !knownIdsRef.current.has(a.id));
        for (const alert of newAlerts) {
          const emoji = alert.severity === "CRITICAL" ? "🔴" : alert.severity === "WARNING" ? "🟡" : "🔵";
          sonnerToast.info(`${emoji} ${alert.message}`, { duration: 6000 });
        }
      }

      // Update known IDs
      knownIdsRef.current = new Set(mapped.map((a) => a.id));
      initialLoadDoneRef.current = true;

      // Merge DB alerts with any in-memory-only alerts (from toasts)
      setAlerts((prev) => {
        const dbIds = new Set(mapped.map((a) => a.id));
        const localOnly = prev.filter((a) => !dbIds.has(a.id) && a.id.startsWith("ALT-"));
        return [...localOnly, ...mapped];
      });
    } catch {
      // Silently ignore — backend might not be running
    }
  }, []);

  useEffect(() => {
    // Initial fetch
    fetchAlerts();

    // Subscribe to real-time changes on the Alert table
    const channel = supabase
      .channel("alerts-context-realtime")
      .on(
        "postgres_changes" as any,
        { event: "*", schema: "public", table: "Alert" },
        () => {
          fetchAlerts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchAlerts]);

  return (
    <AlertsContext.Provider value={{ alerts, addAlert, dismissAlert }}>
      {children}
    </AlertsContext.Provider>
  );
}

export function useAlerts() {
  const context = useContext(AlertsContext);
  if (!context) {
    throw new Error("useAlerts must be used within an AlertsProvider");
  }
  return context;
}

