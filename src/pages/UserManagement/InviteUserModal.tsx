import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface InviteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InviteUserModal({ isOpen, onClose }: InviteUserModalProps) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Viewer");
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [emailError, setEmailError] = useState("");

  const validate = () => {
    let isValid = true;
    setEmailError("");

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

    // Simulate API call for inviting user
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        onClose();
        setStatus("idle");
        setEmail("");
        setRole("Viewer");
      }, 3000);
    }, 1500);
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
              className="bg-white dark:bg-[#0b1c30] border border-[#e2e8f0] dark:border-[#1e3a5f] rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col relative pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="border-b border-[#e2e8f0] dark:border-[#1e3a5f] px-6 py-4 flex items-center justify-between bg-[#f8fafc] dark:bg-[#0f2942]">
                <h2 className="text-lg font-bold text-[#0b1c30] dark:text-white">
                  Invite New User
                </h2>
                <button
                  onClick={onClose}
                  disabled={status === "sending" || status === "success"}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f1f5f9] dark:hover:bg-[#1a365d] text-[#64748b] dark:text-[#94a3b8] transition-colors disabled:opacity-50 cursor-pointer"
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
                    <h3 className="text-xl font-bold text-[#0b1c30] dark:text-white">
                      Invite Sent!
                    </h3>
                    <p className="text-sm text-[#515f74] dark:text-[#cbd5e1] mt-2 leading-relaxed">
                      An email has been sent to{" "}
                      <span className="font-semibold text-[#0b1c30] dark:text-white">
                        {email}
                      </span>{" "}
                      with instructions to join the platform as a {role}.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleInvite} className="p-6 flex flex-col gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="email"
                      className="text-xs font-semibold text-[#515f74] dark:text-[#cbd5e1] uppercase tracking-wider"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="e.g., user@smartsort.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailError("");
                      }}
                      className={`h-11 px-4 border rounded-lg text-sm bg-white dark:bg-[#0b1c30] text-[#0b1c30] dark:text-white placeholder-[#94a3b8] focus:outline-none focus:ring-2 transition-all ${
                        emailError
                          ? "border-[#ba1a1a] focus:border-[#ba1a1a] focus:ring-[#ba1a1a]/20"
                          : "border-[#cbd5e1] dark:border-[#334155] focus:border-[#006c49] focus:ring-[#006c49]/20"
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
                      className="text-xs font-semibold text-[#515f74] dark:text-[#cbd5e1] uppercase tracking-wider"
                    >
                      Assigned Role
                    </label>
                    <select
                      id="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="h-11 px-4 border border-[#cbd5e1] dark:border-[#334155] rounded-lg text-sm text-[#0b1c30] dark:text-white bg-white dark:bg-[#0b1c30] focus:outline-none focus:ring-2 focus:ring-[#006c49]/20 focus:border-[#006c49] transition-all cursor-pointer"
                    >
                      <option value="Admin">Admin</option>
                      <option value="Manager">Manager</option>
                      <option value="Operator">Operator</option>
                      <option value="Viewer">Viewer</option>
                    </select>
                  </div>

                  <div className="bg-[#f8fafc] dark:bg-[#0f2942] border border-[#e2e8f0] dark:border-[#1e3a5f] rounded-lg p-3 mt-2 flex gap-3 items-start">
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
                    <p className="text-[11px] text-[#515f74] dark:text-[#cbd5e1] leading-relaxed">
                      The user will receive an email to set up their account and
                      password. Their status will show as{" "}
                      <span className="font-bold">Pending</span> until they complete
                      registration.
                    </p>
                  </div>

                  <div className="flex gap-3 justify-end mt-2 pt-4 border-t border-[#f1f5f9] dark:border-[#0f2942]">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-sm font-semibold text-[#515f74] dark:text-[#cbd5e1] hover:bg-[#f1f5f9] dark:hover:bg-[#1a365d] rounded-lg transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="px-5 py-2 bg-[#006c49] text-white text-sm font-bold rounded-lg hover:bg-[#005a3c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
                    >
                      {status === "sending" ? "Sending..." : "Send Invite"}
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

