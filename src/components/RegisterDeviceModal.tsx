import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { InputField } from "./InputField";

interface RegisterDeviceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Register Device Modal
 *
 * Renders the device registration form as a centered overlay modal.
 * Extracted from OnboardingStep3 for reuse on the Devices page.
 */
export function RegisterDeviceModal({
  isOpen,
  onClose,
}: RegisterDeviceModalProps) {
  const [serial, setSerial] = useState("");

  const handleSave = () => {
    console.log("Device registered:", { serial });
    setSerial("");
    onClose();
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
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="bg-card text-card-foreground border border-border rounded-2xl shadow-2xl w-full max-w-lg pointer-events-auto flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-border">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Register New Device
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Connect a SmartSort unit to this facility
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors cursor-pointer"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Body */}
              <div className="px-6 py-5 flex flex-col gap-5">
                {/* QR Scan hint */}
                <div className="bg-muted dark:bg-slate-900/80 border border-border rounded-xl p-4 flex items-center gap-4">
                  <div className="relative w-14 h-14 shrink-0">
                    {/* Corner brackets (mini) */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#006c49] rounded-tl-sm" />
                    <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#006c49] rounded-tr-sm" />
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#006c49] rounded-bl-sm" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#006c49] rounded-br-sm" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-[#006c49] opacity-80"
                      >
                        <rect
                          x="3"
                          y="3"
                          width="7"
                          height="7"
                          rx="1"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <rect
                          x="5"
                          y="5"
                          width="3"
                          height="3"
                          fill="currentColor"
                        />
                        <rect
                          x="14"
                          y="3"
                          width="7"
                          height="7"
                          rx="1"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <rect
                          x="16"
                          y="5"
                          width="3"
                          height="3"
                          fill="currentColor"
                        />
                        <rect
                          x="3"
                          y="14"
                          width="7"
                          height="7"
                          rx="1"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <rect
                          x="5"
                          y="16"
                          width="3"
                          height="3"
                          fill="currentColor"
                        />
                        <rect
                          x="14"
                          y="14"
                          width="3"
                          height="3"
                          fill="currentColor"
                        />
                        <rect
                          x="19"
                          y="19"
                          width="2"
                          height="2"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Scan QR Code on Device
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      Point your camera at the QR code on the bin to auto-fill
                      the serial number.
                    </p>
                  </div>
                </div>

                {/* Serial input */}
                <div className="flex flex-col gap-2">
                  <InputField
                    id="modal-serial"
                    label="DEVICE SERIAL NUMBER"
                    placeholder="SS-XXXX-XXXX-XXXX"
                    value={serial}
                    onChange={setSerial}
                  />
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M7 1a6 6 0 1 1 0 12A6 6 0 0 1 7 1zM7 4v4M7 10.5v-.5"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Serial numbers start with 'SS' followed by 12 characters.
                  </p>
                </div>

                {/* Facility Switcher */}
                <div className="bg-muted dark:bg-slate-900/80 border border-border rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-background dark:bg-slate-950 border border-border rounded-md flex items-center justify-center">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M3 21h18M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16M9 9h6M9 13h6M9 17h6"
                          stroke="#006c49"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-foreground">
                        Default Facility
                      </span>
                      <span className="text-sm text-muted-foreground">
                        North Logistics Hub
                      </span>
                    </div>
                  </div>
                  <button className="text-sm font-semibold text-[#006c49] hover:underline cursor-pointer">
                    Change
                  </button>
                </div>

                {/* Support Note */}
                <div className="border border-border bg-muted dark:bg-slate-900/80 rounded-lg p-3 flex items-start gap-3">
                  <svg
                    className="w-4 h-4 text-[#23acf1] flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <div>
                    <p className="text-xs font-semibold text-foreground">
                      Need help with installation?
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      Our technical team is available 24/7 for remote setup
                      assistance.
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 pb-6 pt-2 flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 h-11 border border-border bg-background text-muted-foreground text-sm font-semibold rounded-lg hover:bg-muted transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 h-11 bg-[#006c49] hover:bg-[#005a3c] active:scale-[0.98] text-white text-sm font-semibold rounded-lg transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                    <polyline points="17 21 17 13 7 13 7 21" />
                    <polyline points="7 3 7 8 15 8" />
                  </svg>
                  Save Device
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
