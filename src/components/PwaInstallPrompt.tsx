import React, { useState, useEffect } from "react";
import { Download, X, WifiOff, Wifi, Smartphone, Share, PlusSquare } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallBanner, setShowInstallBanner] = useState<boolean>(false);
  const [isIos, setIsIos] = useState<boolean>(false);
  const [showIosInstructions, setShowIosInstructions] = useState<boolean>(false);
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);
  const [showOnlineToast, setShowOnlineToast] = useState<boolean>(false);

  useEffect(() => {
    // 1. Check if already installed & running standalone
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;

    if (isStandalone) {
      return;
    }

    // 2. Check if user dismissed prompt in this session
    const isDismissed = sessionStorage.getItem("smartsort_pwa_dismissed");

    // 3. iOS Detection
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIos(isIosDevice);

    if (isIosDevice && !isDismissed && !isStandalone) {
      // Show iOS prompt banner after a brief delay
      const timer = setTimeout(() => setShowInstallBanner(true), 3000);
      return () => clearTimeout(timer);
    }

    // 4. Android / Chrome / Edge BeforeInstallPrompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      if (!isDismissed) {
        setShowInstallBanner(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    const handleManualOpen = () => {
      setShowInstallBanner(true);
    };
    window.addEventListener("open-pwa-install", handleManualOpen);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("open-pwa-install", handleManualOpen);
    };
  }, []);

  // Online / Offline Detection
  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      setShowOnlineToast(true);
      const timer = setTimeout(() => setShowOnlineToast(false), 4000);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOffline(true);
      setShowOnlineToast(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIos) {
      setShowIosInstructions(true);
      return;
    }

    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice.outcome === "accepted") {
          setShowInstallBanner(false);
          setDeferredPrompt(null);
        }
      } catch (err) {
        console.warn("[PWA] Installation prompt failed:", err);
      }
    } else {
      setShowIosInstructions(true);
    }
  };

  const handleDismiss = () => {
    setShowInstallBanner(false);
    sessionStorage.setItem("smartsort_pwa_dismissed", "true");
  };

  return (
    <>
      {/* ── Offline Status Banner ── */}
      {isOffline && (
        <div className="fixed bottom-4 left-4 z-50 bg-amber-600 text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-3 border border-amber-400/40 animate-pulse backdrop-blur-md">
          <WifiOff className="w-4 h-4 shrink-0 text-amber-200" />
          <div className="text-xs">
            <span className="font-bold">Offline Field Mode Active:</span> Telemetry cached locally.
          </div>
        </div>
      )}

      {/* ── Back Online Toast ── */}
      {showOnlineToast && (
        <div className="fixed bottom-4 left-4 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2.5 border border-emerald-400/40 transition-all duration-500 animate-in fade-in slide-in-from-bottom-2">
          <Wifi className="w-4 h-4 shrink-0 text-emerald-200" />
          <span className="text-xs font-semibold">Back Online • Synced with Live Server</span>
        </div>
      )}

      {/* ── PWA Install Banner ── */}
      {showInstallBanner && (
        <div className="fixed bottom-4 right-4 z-50 max-w-sm w-[calc(100vw-2rem)] bg-card dark:bg-[#071728] text-foreground dark:text-white p-4 rounded-2xl shadow-2xl border border-emerald-500/30 backdrop-blur-lg flex flex-col gap-3 transition-all duration-300">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="SmartSort App Icon"
                className="w-10 h-10 rounded-xl object-contain shadow-sm border border-emerald-500/20 bg-emerald-950/20"
              />
              <div>
                <h4 className="text-xs font-black tracking-tight text-foreground dark:text-white flex items-center gap-1.5">
                  <span>Install SmartSort App</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                    PWA
                  </span>
                </h4>
                <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                  Fast offline route access & native device experience.
                </p>
              </div>
            </div>
            <button
              onClick={handleDismiss}
              className="text-muted-foreground hover:text-foreground dark:hover:text-white transition-colors p-1 rounded-md cursor-pointer"
              title="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleInstallClick}
              className="flex-1 py-2 px-3.5 bg-[#006c49] hover:bg-[#006c49]/90 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install to Device</span>
            </button>
            <button
              onClick={handleDismiss}
              className="py-2 px-3 text-xs font-semibold text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            >
              Later
            </button>
          </div>
        </div>
      )}

      {/* ── iOS Installation Instructions Modal ── */}
      {showIosInstructions && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-4">
          <div className="bg-card dark:bg-[#071728] text-foreground dark:text-white max-w-sm w-full rounded-2xl p-5 shadow-2xl border border-border flex flex-col gap-4">
            <div className="flex justify-between items-center border-b border-border pb-3">
              <h3 className="text-sm font-black flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-emerald-500" />
                Install on iPhone / iPad
              </h3>
              <button
                onClick={() => setShowIosInstructions(false)}
                className="text-muted-foreground hover:text-foreground p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              Install SmartSort on your home screen for full-screen field operations:
            </p>

            <div className="flex flex-col gap-3 text-xs">
              <div className="flex items-center gap-3 bg-muted/50 p-2.5 rounded-xl">
                <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center text-xs shrink-0">
                  1
                </span>
                <span className="flex items-center gap-1.5">
                  Tap the Safari <strong>Share</strong> button <Share className="w-3.5 h-3.5 inline text-sky-500" />
                </span>
              </div>

              <div className="flex items-center gap-3 bg-muted/50 p-2.5 rounded-xl">
                <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center text-xs shrink-0">
                  2
                </span>
                <span className="flex items-center gap-1.5">
                  Scroll down and tap <strong>Add to Home Screen</strong> <PlusSquare className="w-3.5 h-3.5 inline text-emerald-500" />
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowIosInstructions(false)}
              className="w-full mt-1 py-2 bg-primary text-white font-bold text-xs rounded-xl hover:bg-primary/90 transition-colors cursor-pointer"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}
