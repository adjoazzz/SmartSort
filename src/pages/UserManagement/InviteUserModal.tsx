import { authFetch } from "../../lib/authFetch";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";

interface InviteUserModalProps {
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
const PORTAL_URL: string =
  (import.meta as any).env?.VITE_COLLECTOR_PORTAL_URL ??
  "http://localhost:5173";

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

export function InviteUserModal({
  isOpen,
  onClose,
  onCreated,
}: InviteUserModalProps) {
  const { t } = useTranslation();
  const currentUserRole = localStorage.getItem("userRole") || "viewer";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Viewer");
  const [assignedFacility, setAssignedFacility] = useState(
    "HQ Corporate Center",
  );
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [submitError, setSubmitError] = useState("");

  // Initialise EmailJS once with the public key (v4 recommended pattern)
  useEffect(() => {
    if (EMAILJS_PUBLIC_KEY) {
      emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    }
  }, []);

  const validate = () => {
    let isValid = true;
    setEmailError("");
    setNameError("");

    if (!name) {
      setNameError("Name is required.");
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }

    return isValid;
  };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    status === "idle" && setStatus("sending");
    setSubmitError("");

    try {
      const response = await authFetch(`${API_BASE_URL}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          role,
          status: "PENDING",
          assignedFacility,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      // 2. Generate a temporary password
      const tempPassword = generateTempPassword();

      // 3. Send the invite email via EmailJS (v4 API)
      try {
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          collector_email: email,
          temp_password: tempPassword,
          invite_link: PORTAL_URL,
        });
      } catch (emailError: any) {
        console.error("[EmailJS] send error:", emailError);
        // User was created successfully, but the email failed.
        // Surface this without blocking the success flow.
        setSubmitError(
          "User created, but the invite email failed to send. Please notify them manually.",
        );
      }

      // 4. Notify the parent so the table refreshes
      await onCreated?.();

      setStatus("success");
      setTimeout(() => {
        onClose();
        setStatus("idle");
        setName("");
        setEmail("");
        setRole("Viewer");
        setAssignedFacility("HQ Corporate Center");
        setSubmitError("");
      }, 3000);
    } catch (error) {
      console.error("Failed to create user:", error);
      setStatus("idle");
      alert("Failed to create user. Please try again.");
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
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="bg-card border border-border rounded-xl shadow-md w-full max-w-md overflow-hidden flex flex-col relative pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="border-b border-border px-6 py-4 flex items-center justify-between bg-background dark:bg-secondary">
                <h2 className="text-lg font-bold text-foreground dark:text-white">
                  {t("userModal.title")}
                </h2>
                <button
                  onClick={onClose}
                  disabled={status === "sending" || status === "success"}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted dark:hover:bg-muted text-muted-foreground transition-colors disabled:opacity-50 cursor-pointer"
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

              {status === "success" ? (
                <div className="p-8 flex flex-col items-center justify-center text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#10b981]/10 flex items-center justify-center text-[#10b981]">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground dark:text-white">
                      {t("userModal.inviteSent")}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                      {t("userModal.inviteMsg", { email, role })}
                    </p>
                    {submitError && (
                      <p className="text-xs text-[#ba1a1a] font-medium mt-3 leading-relaxed">
                        {submitError}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleInvite}
                  className="p-6 flex flex-col gap-5"
                >
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="name"
                      className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                    >
                      {t("userModal.fullName")}
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder={t("userModal.namePlaceholder")}
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setNameError("");
                      }}
                      className={`h-11 px-4 border rounded-lg text-sm bg-card text-foreground dark:text-white placeholder-[#94a3b8] focus:outline-none focus:ring-2 transition-all ${
                        nameError
                          ? "border-[#ba1a1a] focus:border-[#ba1a1a] focus:ring-[#ba1a1a]/20"
                          : "border-border focus:border-[#006c49] focus:ring-[#006c49]/20"
                      }`}
                    />
                    {nameError && (
                      <span className="text-xs text-[#ba1a1a] font-medium">
                        {nameError}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="email"
                      className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                    >
                      {t("userModal.emailAddress")}
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder={t("userModal.emailPlaceholder")}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailError("");
                      }}
                      className={`h-11 px-4 border rounded-lg text-sm bg-card text-foreground dark:text-white placeholder-[#94a3b8] focus:outline-none focus:ring-2 transition-all ${
                        emailError
                          ? "border-[#ba1a1a] focus:border-[#ba1a1a] focus:ring-[#ba1a1a]/20"
                          : "border-border focus:border-[#006c49] focus:ring-[#006c49]/20"
                      }`}
                    />
                    {emailError && (
                      <span className="text-xs text-[#ba1a1a] font-medium">
                        {emailError}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="role"
                      className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                    >
                      {t("userModal.assignedRole")}
                    </label>
                    <select
                      id="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="h-11 px-4 border border-border rounded-lg text-sm text-foreground dark:text-white bg-card focus:outline-none focus:ring-2 focus:ring-[#006c49]/20 focus:border-[#006c49] transition-all cursor-pointer"
                    >
                      <option value="Admin">Admin</option>
                      <option value="Manager">Manager</option>
                      <option value="Operator">Operator</option>
                      <option value="Viewer">Viewer</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="facility"
                      className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                    >
                      {t("userModal.assignedFacility")}
                    </label>
                    <select
                      id="facility"
                      value={assignedFacility}
                      onChange={(e) => setAssignedFacility(e.target.value)}
                      disabled={currentUserRole === "manager"}
                      className="h-11 px-4 border border-border rounded-lg text-sm text-foreground dark:text-white bg-card focus:outline-none focus:ring-2 focus:ring-[#006c49]/20 focus:border-[#006c49] transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <option value="HQ Corporate Center">
                        HQ Corporate Center
                      </option>
                      <option value="East Side Recycling">
                        East Side Recycling
                      </option>
                      <option value="South Hub Logistics">
                        South Hub Logistics
                      </option>
                      <option value="Global Read-Only">Global Read-Only</option>
                    </select>
                    {currentUserRole === "manager" && (
                      <span className="text-[10px] text-muted-foreground italic mt-0.5">
                        * Automatically assigned to your facility.
                      </span>
                    )}
                  </div>

                  <div className="bg-background dark:bg-secondary border border-border rounded-lg p-3 mt-2 flex gap-3 items-start">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#0284c7"
                      strokeWidth="2"
                      className="shrink-0 mt-0.5"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      {t("userModal.infoText")}
                    </p>
                  </div>

                  <div className="flex gap-3 justify-end mt-2 pt-4 border-t border-[#f1f5f9] dark:border-[#0f2942]">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-sm font-semibold text-muted-foreground hover:bg-muted dark:hover:bg-muted rounded-lg transition-colors cursor-pointer"
                    >
                      {t("userModal.cancel")}
                    </button>
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="px-5 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
                    >
                      {status === "sending"
                        ? t("userModal.saving")
                        : t("userModal.createUser")}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
