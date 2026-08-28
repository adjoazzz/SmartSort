import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, MapPin, Tag, Activity, Save, Loader2 } from "lucide-react";
import { authFetch } from "../lib/authFetch";
import { toast } from "../lib/toast";

interface EditBinSpecsModalProps {
  isOpen: boolean;
  onClose: () => void;
  device: {
    id: string;
    name: string;
    location: string;
    status: string;
  } | null;
  onSuccess: (updated: { id: string; name: string; location: string; status: string }) => void;
}

const LOCATION_PRESETS = [
  "North Sector Hub 04",
  "Downtown Plaza - East",
  "Central Library Courtyard",
  "Engineering Block B",
  "College of Science Hub",
  "College of Pharmacy Courtyard",
  "Main Dining Hall",
  "Student Center Entrance",
];

export function EditBinSpecsModal({
  isOpen,
  onClose,
  device,
  onSuccess,
}: EditBinSpecsModalProps) {
  const [binName, setBinName] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("Active");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const baseUrl =
    (import.meta as any).env?.VITE_API_BASE_URL ?? "http://localhost:5000";

  useEffect(() => {
    if (device) {
      setBinName(device.name || device.id);
      setLocation(device.location || "");
      setStatus(device.status || "Active");
    }
  }, [device]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!device) return;

    if (!binName.trim()) {
      toast.error("Please enter a bin name / identifier");
      return;
    }
    if (!location.trim()) {
      toast.error("Please assign a location to the bin");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await authFetch(`${baseUrl}/api/devices/${device.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customBinId: binName.trim(),
          location: location.trim(),
          status: status,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to update bin specifications");
      }

      toast.success(`Bin "${binName.trim()}" updated successfully!`);
      onSuccess({
        id: binName.trim(),
        name: binName.trim(),
        location: location.trim(),
        status,
      });
      onClose();
    } catch (err: any) {
      toast.error(err.message || "An error occurred while updating bin specifications");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="bg-card text-card-foreground border border-border rounded-xl shadow-xl w-full max-w-lg pointer-events-auto flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-border">
                <div>
                  <h3 className="text-lg font-bold text-foreground dark:text-white">
                    Edit Bin Specifications
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Rename device and configure operational location assignment.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" strokeWidth={2} />
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">
                {/* Bin Name Field */}
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-primary" />
                      Bin Name / Identifier
                    </span>
                  </label>
                  <input
                    type="text"
                    required
                    value={binName}
                    onChange={(e) => setBinName(e.target.value)}
                    placeholder="e.g. BIN-001, Main Cafeteria Bin"
                    className="w-full bg-background dark:bg-secondary border border-border rounded-lg px-3.5 py-2.5 text-sm font-medium text-foreground dark:text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                  />
                  <span className="text-[11px] text-muted-foreground mt-1 block">
                    Unique identifier used across telemetry, logs, and routing.
                  </span>
                </div>

                {/* Location Field */}
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                      Assigned Location
                    </span>
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. North Sector Hub 04"
                    className="w-full bg-background dark:bg-secondary border border-border rounded-lg px-3.5 py-2.5 text-sm font-medium text-foreground dark:text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                  />

                  {/* Preset quick pills */}
                  <div className="mt-2">
                    <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
                      Quick Suggestions:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {LOCATION_PRESETS.map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setLocation(preset)}
                          className={`text-[11px] font-medium px-2 py-1 rounded-md transition-colors border cursor-pointer ${
                            location === preset
                              ? "bg-primary/10 border-primary text-primary font-semibold"
                              : "bg-muted/50 border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                          }`}
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Status Field */}
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-amber-500" />
                      Operational Status
                    </span>
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full bg-background dark:bg-secondary border border-border rounded-lg px-3.5 py-2.5 text-sm font-medium text-foreground dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all cursor-pointer"
                  >
                    <option value="Active">Active</option>
                    <option value="Online">Online</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Offline">Offline</option>
                  </select>
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-border mt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary hover:bg-primary/90 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" strokeWidth={2} />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
