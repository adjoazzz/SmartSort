import { authFetch } from "../../lib/authFetch";
import React, { useEffect, useState } from "react";
import { StatusBadge } from "../../components/StatusBadge";
import imgUserProfileAvatar from "../../assets/6c7b9dccb9925ee83b19c4f4237c7c6aa454950a.png";

interface CollectorProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  collector: any;
  onSaved?: () => void | Promise<void>;
}

const API_BASE_URL =
  (import.meta as any).env?.VITE_API_BASE_URL ?? "http://localhost:5000";

export function CollectorProfileModal({
  isOpen,
  onClose,
  collector,
  onSaved,
}: CollectorProfileModalProps) {
  const [name, setName] = useState(collector?.name ?? "");
  const [region, setRegion] = useState(collector?.region ?? "");
  const [status, setStatus] = useState(collector?.status ?? "Active");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setName(collector?.name ?? "");
    setRegion(collector?.region ?? "");
    setStatus(collector?.status ?? "Active");
  }, [collector, isOpen]);

  if (!isOpen || !collector) return null;

  const handleSave = async () => {
    setSaving(true);

    try {
      const response = await authFetch(
        `${API_BASE_URL}/api/collectors/${collector.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            region,
            status,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update collector");
      }

      await onSaved?.();
      onClose();
    } catch (error) {
      console.error("Failed to update collector:", error);
      alert("Failed to update collector. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-card/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-background dark:bg-secondary rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col relative">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between z-10 shrink-0">
          <h2 className="text-xl font-bold text-foreground dark:text-white">
            Collector Profile
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted dark:hover:bg-muted text-muted-foreground dark:text-muted-foreground transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Personal Info */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col items-center p-6">
              <div className="w-24 h-24 rounded-full bg-[#e2e8f0] overflow-hidden border-4 border-white shadow-sm ring-1 ring-[#cbd5e1] mb-4">
                <img
                  src={imgUserProfileAvatar}
                  alt="User Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-xl font-bold text-foreground dark:text-white">
                {collector.name}
              </h2>
              <p className="text-sm font-medium text-muted-foreground dark:text-muted-foreground mb-4">
                ID: {collector.id}
              </p>
              <StatusBadge
                label={status}
                variant={
                  status === "Active"
                    ? "success"
                    : status === "Inactive"
                      ? "danger"
                      : "warning"
                }
              />

              <div className="w-full mt-6 flex flex-col gap-3 text-left">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Collector Name
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-11 px-4 rounded-lg border border-border bg-card text-sm text-foreground dark:text-white focus:outline-none focus:ring-2 focus:ring-[#006c49]/20"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Region
                  </label>
                  <input
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="h-11 px-4 rounded-lg border border-border bg-card text-sm text-foreground dark:text-white focus:outline-none focus:ring-2 focus:ring-[#006c49]/20"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="h-11 px-4 rounded-lg border border-border bg-card text-sm text-foreground dark:text-white focus:outline-none focus:ring-2 focus:ring-[#006c49]/20"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving || !name || !region}
                  className="mt-2 h-11 rounded-lg bg-[#006c49] text-white text-sm font-semibold hover:bg-[#005a3c] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>

              <div className="w-full mt-6 pt-6 border-t border-border flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-muted-foreground dark:text-muted-foreground">
                    Region
                  </span>
                  <span className="text-sm font-semibold text-foreground dark:text-white">
                    {collector.region}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-muted-foreground dark:text-muted-foreground">
                    Joined
                  </span>
                  <span className="text-sm font-semibold text-foreground dark:text-white">
                    Mar 2024
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-muted-foreground dark:text-muted-foreground">
                    Contact
                  </span>
                  <span className="text-sm font-semibold text-[#006c49]">
                    +233 24 123 4567
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Stats & Recent Activity */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-card border border-border rounded-xl p-4 shadow-sm flex flex-col">
                <span className="text-xs font-semibold text-muted-foreground dark:text-muted-foreground uppercase tracking-wider mb-1">
                  Total Collections
                </span>
                <span className="text-2xl font-bold text-foreground dark:text-white">
                  1,284
                </span>
              </div>
              <div className="bg-card border border-border rounded-xl p-4 shadow-sm flex flex-col">
                <span className="text-xs font-semibold text-muted-foreground dark:text-muted-foreground uppercase tracking-wider mb-1">
                  Avg Rating
                </span>
                <span className="text-2xl font-bold text-foreground dark:text-white">
                  {collector.rating}{" "}
                  <span className="text-sm text-[#d97706]">⭐</span>
                </span>
              </div>
              <div className="bg-card border border-border rounded-xl p-4 shadow-sm flex flex-col col-span-2 md:col-span-1">
                <span className="text-xs font-semibold text-muted-foreground dark:text-muted-foreground uppercase tracking-wider mb-1">
                  On-Time Rate
                </span>
                <span className="text-2xl font-bold text-foreground dark:text-white">
                  96.5%
                </span>
              </div>
            </div>

            {/* Recent Jobs */}
            <div className="bg-card border border-border rounded-xl shadow-sm flex flex-col flex-1">
              <div className="p-4 border-b border-[#f1f5f9] dark:border-[#0f2942] flex justify-between items-center bg-background dark:bg-secondary">
                <h3 className="text-lg font-semibold text-foreground dark:text-white">
                  Recent Jobs
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-card border-b border-[#f1f5f9] dark:border-[#0f2942]">
                      <th className="px-6 py-3 text-xs font-semibold text-muted-foreground dark:text-muted-foreground uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold text-muted-foreground dark:text-muted-foreground uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold text-muted-foreground dark:text-muted-foreground uppercase tracking-wider">
                        Volume
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold text-muted-foreground dark:text-muted-foreground uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f1f5f9]">
                    <tr className="hover:bg-background dark:hover:bg-secondary transition-colors">
                      <td className="px-6 py-3 whitespace-nowrap text-sm text-muted-foreground">
                        Today, 10:30 AM
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap text-sm font-semibold text-foreground dark:text-white">
                        North Hub Station B
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap text-sm text-muted-foreground">
                        142 kg
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap">
                        <StatusBadge label="Completed" variant="success" />
                      </td>
                    </tr>
                    <tr className="hover:bg-background dark:hover:bg-secondary transition-colors">
                      <td className="px-6 py-3 whitespace-nowrap text-sm text-muted-foreground">
                        Yesterday, 2:15 PM
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap text-sm font-semibold text-foreground dark:text-white">
                        East Sector Point 4
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap text-sm text-muted-foreground">
                        89 kg
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap">
                        <StatusBadge label="Completed" variant="success" />
                      </td>
                    </tr>
                    <tr className="hover:bg-background dark:hover:bg-secondary transition-colors">
                      <td className="px-6 py-3 whitespace-nowrap text-sm text-muted-foreground">
                        May 1, 09:00 AM
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap text-sm font-semibold text-foreground dark:text-white">
                        Central Hub Point 1
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap text-sm text-muted-foreground">
                        210 kg
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap">
                        <StatusBadge label="Completed" variant="success" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="p-3 border-t border-[#f1f5f9] dark:border-[#0f2942] bg-card rounded-b-xl text-center">
                <button className="text-[#006c49] text-sm font-semibold hover:underline">
                  View All History
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
