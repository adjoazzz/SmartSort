import React from "react";
import { motion, AnimatePresence } from "motion/react";

interface BulkImportDocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BulkImportDocsModal({
  isOpen,
  onClose,
}: BulkImportDocsModalProps) {
  const sampleCSV = `name,email,role,assignedFacility,status
John Doe,john.doe@smartsort.com,Manager,HQ Corporate Center,ACTIVE
Jane Smith,jane.smith@smartsort.com,Collector,East Side Recycling,PENDING
Alex Vance,alex.vance@smartsort.com,Viewer,South Hub Logistics,SUSPENDED`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleCSV);
    alert("Sample CSV copied to clipboard!");
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
              className="bg-card border border-border rounded-xl shadow-md w-full max-w-lg overflow-hidden flex flex-col relative pointer-events-auto max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="border-b border-border px-6 py-4 flex items-center justify-between bg-background dark:bg-secondary">
                <div className="flex items-center gap-2.5">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#006c49"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                  <h2 className="text-lg font-bold text-foreground dark:text-white">
                    Bulk Import Documentation
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted dark:hover:bg-muted text-muted-foreground transition-colors cursor-pointer"
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

              {/* Scrollable Body */}
              <div className="p-6 overflow-y-auto flex flex-col gap-6">
                {/* Intro Section */}
                <div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Automate your team provisioning process. You can provision
                    users in bulk by uploading a structured comma-separated
                    values (CSV) file, or by establishing an Active Directory
                    sync.
                  </p>
                </div>

                {/* CSV Instructions */}
                <div className="flex flex-col gap-3">
                  <h3 className="text-sm font-bold text-foreground dark:text-white uppercase tracking-wider">
                    1. CSV File Specifications
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Ensure your CSV file contains the following exact column
                    headers (case-sensitive) and format rules:
                  </p>

                  <div className="border border-border rounded-xl overflow-hidden text-xs">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-background dark:bg-secondary border-b border-border">
                          <th className="px-4 py-2 font-bold text-muted-foreground">
                            Column
                          </th>
                          <th className="px-4 py-2 font-bold text-muted-foreground">
                            Type
                          </th>
                          <th className="px-4 py-2 font-bold text-muted-foreground">
                            Allowed Values
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#f1f5f9] dark:divide-[#0f2942] text-muted-foreground">
                        <tr>
                          <td className="px-4 py-2 font-semibold font-mono text-[#006c49]">
                            name
                          </td>
                          <td className="px-4 py-2">String</td>
                          <td className="px-4 py-2">
                            Full name (e.g. John Doe)
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 font-semibold font-mono text-[#006c49]">
                            email
                          </td>
                          <td className="px-4 py-2">String (Email)</td>
                          <td className="px-4 py-2">Unique email address</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 font-semibold font-mono text-[#006c49]">
                            role
                          </td>
                          <td className="px-4 py-2">String</td>
                          <td className="px-4 py-2">
                            Admin, Manager, Collector, Viewer
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 font-semibold font-mono text-[#006c49]">
                            assignedFacility
                          </td>
                          <td className="px-4 py-2">String</td>
                          <td className="px-4 py-2">
                            HQ Corporate Center, East Side Recycling, etc.
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 font-semibold font-mono text-[#006c49]">
                            status
                          </td>
                          <td className="px-4 py-2">String</td>
                          <td className="px-4 py-2">
                            ACTIVE, PENDING, SUSPENDED
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Sample Code Block */}
                <div className="flex flex-col gap-2.5">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-bold text-foreground dark:text-white uppercase tracking-wider">
                      Sample CSV Content
                    </h4>
                    <button
                      onClick={handleCopy}
                      className="text-xs font-semibold text-[#006c49] dark:text-emerald-400 hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <rect
                          x="9"
                          y="9"
                          width="13"
                          height="13"
                          rx="2"
                          ry="2"
                        />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      Copy Sample
                    </button>
                  </div>
                  <pre className="bg-background dark:bg-secondary border border-border p-4 rounded-xl font-mono text-xs text-foreground dark:text-muted-foreground overflow-x-auto whitespace-pre">
                    {sampleCSV}
                  </pre>
                </div>

                {/* Active Directory Sync */}
                <div className="flex flex-col gap-2.5">
                  <h3 className="text-sm font-bold text-foreground dark:text-white uppercase tracking-wider">
                    2. Active Directory Federation
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    To set up dynamic synchronization via SAML 2.0 or SCIM
                    protocols, please navigate to the{" "}
                    <strong>Settings &gt; Authentication</strong> panel. This
                    allows automated onboarding/offboarding based on your
                    enterprise directory groups.
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-border px-6 py-4 flex justify-end bg-background dark:bg-secondary">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 transition-colors cursor-pointer"
                >
                  Got it
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
