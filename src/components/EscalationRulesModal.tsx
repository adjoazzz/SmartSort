import React, { useState } from "react";
import {
  ShieldAlert,
  Sliders,
  BellRing,
  Smartphone,
  Truck,
  AlertTriangle,
  Flame,
  BatteryCharging,
  Save,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { toast } from "../lib/toast";

export interface EscalationRule {
  id: string;
  title: string;
  description: string;
  category: "capacity" | "sla" | "contamination" | "hardware";
  enabled: boolean;
  thresholdValue: number;
  thresholdUnit: string;
  actionSummary: string;
  targetTier: string;
}

interface EscalationRulesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRulesUpdated?: (rules: EscalationRule[]) => void;
}

const DEFAULT_RULES: EscalationRule[] = [
  {
    id: "rule_overflow_dispatch",
    title: "Critical Capacity Auto-Dispatch",
    description:
      "When any IoT bin reaches or exceeds critical fill, automatically generate and route an emergency collection dispatch.",
    category: "capacity",
    enabled: true,
    thresholdValue: 90,
    thresholdUnit: "% Fill",
    actionSummary: "Auto-create high-priority collection job to nearest truck",
    targetTier: "Tier 1: Active Fleet",
  },
  {
    id: "rule_unack_escalation",
    title: "Unacknowledged P1 SLA Escalation",
    description:
      "If a critical P1 incident remains unacknowledged past the response threshold, escalate to district management.",
    category: "sla",
    enabled: true,
    thresholdValue: 15,
    thresholdUnit: "Minutes",
    actionSummary: "Push high-priority SMS & alert to District Operations Lead",
    targetTier: "Tier 2: Area Supervisor",
  },
  {
    id: "rule_contamination_quarantine",
    title: "Contamination Anomaly Chute Lock",
    description:
      "Automatically pause sorting mechanism if non-recyclable bio-contaminants or hazard spikes are detected repeatedly.",
    category: "contamination",
    enabled: true,
    thresholdValue: 30,
    thresholdUnit: "% Hazard",
    actionSummary: "Lock sorting flap & dispatch field maintenance technician",
    targetTier: "Tier 3: Maintenance AI",
  },
  {
    id: "rule_power_eco_mode",
    title: "Low Battery Telemetry Throttling",
    description:
      "Preserve remaining battery in solar/battery IoT bins by dynamically reducing sensor telemetry frequency.",
    category: "hardware",
    enabled: true,
    thresholdValue: 18,
    thresholdUnit: "% Battery",
    actionSummary: "Switch to 10-minute heartbeat & alert local maintenance",
    targetTier: "Tier 1: Device Ops",
  },
];

export function EscalationRulesModal({
  isOpen,
  onClose,
  onRulesUpdated,
}: EscalationRulesModalProps) {
  const [rules, setRules] = useState<EscalationRule[]>(() => {
    const saved = localStorage.getItem("smartsort_escalation_rules");
    return saved ? JSON.parse(saved) : DEFAULT_RULES;
  });
  const [notifySms, setNotifySms] = useState(true);
  const [notifyWebhook, setNotifyWebhook] = useState(true);
  const [notifyAudio, setNotifyAudio] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleToggleRule = (id: string) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r)),
    );
  };

  const handleThresholdChange = (id: string, val: number) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, thresholdValue: val } : r)),
    );
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem("smartsort_escalation_rules", JSON.stringify(rules));
      setIsSaving(false);
      toast.success("Incident escalation rules updated successfully!");
      if (onRulesUpdated) onRulesUpdated(rules);
      onClose();
    }, 400);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto bg-card dark:bg-[#0b1c30] text-foreground dark:text-white border-border shadow-2xl rounded-2xl p-6">
        <DialogHeader className="border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center flex-shrink-0">
              <ShieldAlert className="w-5 h-5" strokeWidth={2.2} />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold tracking-tight">
                Incident Priority & Escalation Rules Engine
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                Configure autonomous event-driven triggers, response SLAs, and
                multi-tier routing workflows.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Channels Bar */}
        <div className="bg-slate-50 dark:bg-[#071321]/70 border border-border/80 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-foreground dark:text-slate-200">
            <BellRing className="w-4 h-4 text-emerald-500" />
            <span>Escalation Broadcast Channels:</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
            <label className="flex items-center gap-2 cursor-pointer hover:text-foreground">
              <input
                type="checkbox"
                checked={notifySms}
                onChange={(e) => setNotifySms(e.target.checked)}
                className="w-4 h-4 rounded text-primary accent-[#006c49] focus:ring-0 cursor-pointer"
              />
              <span>SMS Dispatch</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer hover:text-foreground">
              <input
                type="checkbox"
                checked={notifyWebhook}
                onChange={(e) => setNotifyWebhook(e.target.checked)}
                className="w-4 h-4 rounded text-primary accent-[#006c49] focus:ring-0 cursor-pointer"
              />
              <span>Fleet Webhooks</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer hover:text-foreground">
              <input
                type="checkbox"
                checked={notifyAudio}
                onChange={(e) => setNotifyAudio(e.target.checked)}
                className="w-4 h-4 rounded text-primary accent-[#006c49] focus:ring-0 cursor-pointer"
              />
              <span>Audio Chime</span>
            </label>
          </div>
        </div>

        {/* Rules List */}
        <div className="space-y-3.5 my-2">
          {rules.map((rule) => {
            const isCapacity = rule.category === "capacity";
            const isSla = rule.category === "sla";
            const isContamination = rule.category === "contamination";
            const isHardware = rule.category === "hardware";

            return (
              <div
                key={rule.id}
                className={`border rounded-xl p-4 transition-all duration-200 ${
                  rule.enabled
                    ? "bg-card border-border shadow-sm"
                    : "bg-slate-50/50 dark:bg-slate-900/30 border-dashed border-border/60 opacity-60"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        isCapacity
                          ? "bg-red-500/10 text-red-500"
                          : isSla
                            ? "bg-amber-500/10 text-amber-500"
                            : isContamination
                              ? "bg-purple-500/10 text-purple-500"
                              : "bg-sky-500/10 text-sky-500"
                      }`}
                    >
                      {isCapacity && <Flame className="w-4 h-4" />}
                      {isSla && <AlertTriangle className="w-4 h-4" />}
                      {isContamination && <ShieldAlert className="w-4 h-4" />}
                      {isHardware && <BatteryCharging className="w-4 h-4" />}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-bold text-foreground dark:text-white">
                          {rule.title}
                        </h4>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-secondary text-muted-foreground">
                          {rule.targetTier}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        {rule.description}
                      </p>
                    </div>
                  </div>

                  {/* Toggle Switch */}
                  <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={rule.enabled}
                      onChange={() => handleToggleRule(rule.id)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#006c49]"></div>
                  </label>
                </div>

                {/* Parameters & Action Pill */}
                {rule.enabled && (
                  <div className="mt-3.5 pt-3 border-t border-[#f1f5f9] dark:border-[#0f2942] flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-muted-foreground">
                        Trigger Threshold:
                      </span>
                      <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-lg border border-border">
                        <input
                          type="range"
                          min={
                            isCapacity
                              ? 50
                              : isSla
                                ? 5
                                : isContamination
                                  ? 10
                                  : 5
                          }
                          max={
                            isCapacity
                              ? 98
                              : isSla
                                ? 60
                                : isContamination
                                  ? 50
                                  : 35
                          }
                          value={rule.thresholdValue}
                          onChange={(e) =>
                            handleThresholdChange(
                              rule.id,
                              Number(e.target.value),
                            )
                          }
                          className="w-24 accent-[#006c49] cursor-pointer"
                        />
                        <span className="font-mono font-bold text-foreground dark:text-emerald-400">
                          {rule.thresholdValue} {rule.thresholdUnit}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-muted-foreground bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-medium px-2.5 py-1 rounded-md">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{rule.actionSummary}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <DialogFooter className="border-t border-border pt-4 flex sm:justify-between items-center w-full gap-3">
          <div className="text-[11px] text-muted-foreground flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>
              Rules are processed autonomously via edge telemetry webhooks.
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-lg border border-border text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-5 py-2 text-xs font-bold rounded-lg bg-[#006c49] hover:bg-[#006c49]/90 text-white shadow-sm flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              {isSaving ? "Saving..." : "Save Escalation Rules"}
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
