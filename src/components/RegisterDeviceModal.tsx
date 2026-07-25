import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { InputField } from "./InputField";
import { useTranslation } from "react-i18next";
import { X, QrCode, Info, Building2, LifeBuoy, Save } from "lucide-react";

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
  const { t } = useTranslation();
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
              className="bg-card text-card-foreground border border-border rounded-xl shadow-md w-full max-w-lg pointer-events-auto flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-border">
                <div>
                  <h3 className="text-xl font-semibold text-foreground dark:text-white">
                    {t("registerModal.title")}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {t("registerModal.subtitle")}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" strokeWidth={2} />
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
                      <QrCode className="text-[#006c49] opacity-80" size={28} strokeWidth={1.5} />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground dark:text-white">
                      {t("registerModal.scanTitle")}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {t("registerModal.scanDesc")}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <InputField
                    id="modal-serial"
                    label={t("registerModal.serialLabel")}
                    placeholder="SS-XXXX-XXXX-XXXX"
                    value={serial}
                    onChange={setSerial}
                  />
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5" strokeWidth={1.5} />
                    {t("registerModal.serialHint")}
                  </p>
                </div>

                {/* Facility Switcher */}
                <div className="bg-muted dark:bg-slate-900/80 border border-border rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-background dark:bg-slate-950 border border-border rounded-md flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-[#006c49]" strokeWidth={2} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-foreground dark:text-white">
                        {t("registerModal.defaultFacility")}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {t("registerModal.hubName")}
                      </span>
                    </div>
                  </div>
                  <button className="text-sm font-semibold text-[#006c49] hover:underline cursor-pointer">
                    {t("registerModal.changeBtn")}
                  </button>
                </div>

                {/* Support Note */}
                <div className="border border-border bg-muted dark:bg-slate-900/80 rounded-lg p-3 flex items-start gap-3">
                  <LifeBuoy className="w-4 h-4 text-[#23acf1] flex-shrink-0 mt-0.5" strokeWidth={2} />
                  <div>
                    <p className="text-xs font-semibold text-foreground dark:text-white">
                      {t("registerModal.helpTitle")}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {t("registerModal.helpDesc")}
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
                  {t("registerModal.cancel")}
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 h-11 bg-primary hover:bg-primary/90 active:scale-[0.98] text-white text-sm font-semibold rounded-lg transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" strokeWidth={2} />
                  {t("registerModal.save")}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
