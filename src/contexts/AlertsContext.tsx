import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

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

export function AlertsProvider({ children }: { children: ReactNode }) {
  const [alerts, setAlerts] = useState<Alert[]>([]);

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
