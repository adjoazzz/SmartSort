import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

interface InviteCollectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: () => void | Promise<void>;
}

const API_BASE_URL =
  (import.meta as any).env?.VITE_API_BASE_URL ?? "http://localhost:5000";

const EMAILJS_SERVICE_ID: string =
  (import.meta as any).env?.VITE_EMAILJS_SERVICE_ID ?? "";
const EMAILJS_TEMPLATE_ID: string =
  (import.meta as any).env?.VITE_EMAILJS_TEMPLATE_ID ?? "";
const EMAILJS_PUBLIC_KEY: string =
  (import.meta as any).env?.VITE_EMAILJS_PUBLIC_KEY ?? "";
const COLLECTOR_PORTAL_URL: string =
  (import.meta as any).env?.VITE_COLLECTOR_PORTAL_URL ?? "http://localhost:5173";

/** Generates a secure-looking temporary password */
function generateTempPassword(length = 12): string {
  const upper = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const lower = "abcdefghjkmnpqrstuvwxyz";
  const digits = "23456789";
  const special = "!@#$%&*";
  const all = upper + lower + digits + special;

  // Guarantee at least one character from each category
  let pwd =
    upper[Math.floor(Math.random() * upper.length)] +
    lower[Math.floor(Math.random() * lower.length)] +
    digits[Math.floor(Math.random() * digits.length)] +
    special[Math.floor(Math.random() * special.length)];

  for (let i = 4; i < length; i++) {
    pwd += all[Math.floor(Math.random() * all.length)];
  }

  // Shuffle so the guaranteed chars aren't always at the front
  return pwd
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
}

export function InviteCollectorModal({
  isOpen,
  onClose,
  onCreated,
}: InviteCollectorModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [facility, setFacility] = useState("Facility 1");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Initialise EmailJS once with the public key (v4 recommended pattern)
  useEffect(() => {
    console.log("[EmailJS] PUBLIC_KEY loaded:", EMAILJS_PUBLIC_KEY ? "YES (" + EMAILJS_PUBLIC_KEY.slice(0, 4) + "...)" : "MISSING");
    console.log("[EmailJS] SERVICE_ID:", EMAILJS_SERVICE_ID || "MISSING");
    console.log("[EmailJS] TEMPLATE_ID:", EMAILJS_TEMPLATE_ID || "MISSING");
    if (EMAILJS_PUBLIC_KEY) {
      emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
      console.log("[EmailJS] init() called ✓");
    }
  }, []);

  if (!isOpen) return null;

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setStatus("sending");
    setErrorMessage("");

    try {
      // 1. Create the collector in the database
      const response = await fetch(`${API_BASE_URL}/api/collectors`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          region: facility,
          status: "Pending",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create collector");
      }

      // 2. Generate a temporary password
      const tempPassword = generateTempPassword();

      // 3. Send the invite email via EmailJS (v4 API)
      const emailResult = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          collector_email: email,
          temp_password: tempPassword,
          invite_link: COLLECTOR_PORTAL_URL,
        }
      );
      console.log("[EmailJS] send result:", emailResult);

      // 4. Notify the parent so the table refreshes
      await onCreated?.();

      setStatus("success");
      setTimeout(() => {
        onClose();
        setStatus("idle");
        setName("");
        setEmail("");
      }, 3500);
    } catch (error: any) {
      console.error("[SmartSort] invite error:", error);

      // Distinguish a DB failure from an EmailJS failure
      const isDbError =
        typeof error?.message === "string" &&
        error.message.toLowerCase().includes("collector");

      // EmailJS errors come back as { status, text } objects
      const emailjsStatus =
        error && typeof error === "object" && "status" in error
          ? `EmailJS ${error.status}: ${error.text}`
          : null;

      setStatus("error");
      setErrorMessage(
        isDbError
          ? "Could not save collector. Please try again."
          : emailjsStatus
            ? `Email failed — ${emailjsStatus}. Check your EmailJS template's "To Email" field.`
            : "Collector saved but the invite email failed to send. Check your EmailJS config."
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-card/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col relative">
        {/* Header */}
        <div className="border-b border-border px-6 py-4 flex items-center justify-between bg-background dark:bg-secondary">
          <h2 className="text-lg font-bold text-foreground dark:text-white">
            Invite New Collector
          </h2>
          <button
            onClick={onClose}
            disabled={status === "sending" || status === "success"}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted dark:hover:bg-muted text-muted-foreground transition-colors disabled:opacity-50"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Success state */}
        {status === "success" ? (
          <div className="p-8 flex flex-col items-center justify-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#10b981]/10 flex items-center justify-center text-[#10b981]">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground dark:text-white">
                Invite Sent!
              </h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                A welcome email with a portal link and temporary password has been
                sent to{" "}
                <span className="font-semibold text-foreground dark:text-white">
                  {email}
                </span>
                .
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleInvite} className="p-6 flex flex-col gap-5">
            {/* Collector Name */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="collector-name"
                className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
              >
                Collector Name
              </label>
              <input
                id="collector-name"
                type="text"
                required
                placeholder="e.g., Kwame Mensah"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11 px-4 border border-[#cbd5e1] dark:border-[#334155] rounded-lg text-sm text-foreground dark:text-white placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#006c49]/20 focus:border-[#006c49] transition-all bg-card"
              />
            </div>

            {/* Collector Email */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="collector-email"
                className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
              >
                Collector Email
              </label>
              <input
                id="collector-email"
                type="email"
                required
                placeholder="e.g., kwame@smartsort.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 px-4 border border-[#cbd5e1] dark:border-[#334155] rounded-lg text-sm text-foreground dark:text-white placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#006c49]/20 focus:border-[#006c49] transition-all bg-card"
              />
            </div>

            {/* Assigned Facility */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="collector-facility"
                className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
              >
                Assigned Facility
              </label>
              <select
                id="collector-facility"
                value={facility}
                onChange={(e) => setFacility(e.target.value)}
                className="h-11 px-4 border border-[#cbd5e1] dark:border-[#334155] rounded-lg text-sm text-foreground dark:text-white bg-card focus:outline-none focus:ring-2 focus:ring-[#006c49]/20 focus:border-[#006c49] transition-all cursor-pointer"
              >
                <option value="Facility 1">Facility 1</option>
                <option value="Facility 2">Facility 2</option>
                <option value="Facility 3">Facility 3</option>
                <option value="Facility 4">Facility 4</option>
                <option value="Facility 5">Facility 5</option>
              </select>
            </div>

            {/* Info banner */}
            <div className="bg-background dark:bg-secondary border border-border rounded-lg p-3 flex gap-3 items-start">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2" className="shrink-0 mt-0.5">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                A welcome email will be sent with a link to the collector portal
                and a secure, system-generated temporary password.
              </p>
            </div>

            {/* Error message */}
            {status === "error" && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 flex gap-3 items-start">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" className="shrink-0 mt-0.5">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <p className="text-[11px] text-red-600 dark:text-red-400 leading-relaxed">
                  {errorMessage}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 justify-end mt-2 pt-4 border-t border-[#f1f5f9] dark:border-[#0f2942]">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  setStatus("idle");
                  setErrorMessage("");
                }}
                disabled={status === "sending"}
                className="px-4 py-2 text-sm font-semibold text-muted-foreground hover:bg-muted dark:hover:bg-muted rounded-lg transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={status === "sending" || !name || !email}
                className="px-5 py-2 bg-[#006c49] text-white text-sm font-bold rounded-lg hover:bg-[#005a3c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {status === "sending" ? (
                  <>
                    <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    Sending Invite…
                  </>
                ) : (
                  "Create & Invite"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
