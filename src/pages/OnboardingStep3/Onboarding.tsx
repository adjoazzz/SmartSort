import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { InputField } from "../../components/InputField";
import { Html5Qrcode } from "html5-qrcode";

/**
 * Onboarding Step 3: Facility Mapping / Device Connection
 * 
 * Clean semantic view for connecting the first hardware device.
 */
export default function Onboarding() {
  const navigate = useNavigate();
  const [serial, setSerial] = useState("");
  const [cameraState, setCameraState] = useState<"loading" | "scanning" | "permission_denied" | "success">("loading");
  const scannerRef = useRef<Html5Qrcode | null>(null);

  const playSuccessSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      // Note 1: C5 (523.25 Hz)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(523.25, now);
      gain1.gain.setValueAtTime(0.12, now);
      gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.15);

      // Note 2: E5 (659.25 Hz)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(659.25, now + 0.08);
      gain2.gain.setValueAtTime(0.12, now + 0.08);
      gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.08);
      osc2.stop(now + 0.25);

      // Note 3: G5 (783.99 Hz)
      const osc3 = ctx.createOscillator();
      const gain3 = ctx.createGain();
      osc3.type = "sine";
      osc3.frequency.setValueAtTime(783.99, now + 0.16);
      gain3.gain.setValueAtTime(0.15, now + 0.16);
      gain3.gain.exponentialRampToValueAtTime(0.01, now + 0.40);
      osc3.connect(gain3);
      gain3.connect(ctx.destination);
      osc3.start(now + 0.16);
      osc3.stop(now + 0.40);
    } catch (e) {
      console.warn("Could not play success sound:", e);
    }
  };

  const handleScanSuccess = (decodedText: string, qrScannerInstance: Html5Qrcode | null) => {
    setSerial(decodedText);
    
    // Stop camera scanning
    if (qrScannerInstance && qrScannerInstance.isScanning) {
      qrScannerInstance.stop()
        .then(() => console.log("Scanner stopped after successful scan"))
        .catch(err => console.warn(err));
    } else if (scannerRef.current && scannerRef.current.isScanning) {
      scannerRef.current.stop()
        .then(() => console.log("Scanner stopped after successful scan"))
        .catch(err => console.warn(err));
    }
    
    setCameraState("success");
    playSuccessSound();
    
    if (navigator.vibrate) {
      navigator.vibrate([80, 40, 80]);
    }
  };

  const handleSimulateScan = () => {
    if (scannerRef.current && scannerRef.current.isScanning) {
      scannerRef.current.stop()
        .then(() => console.log("Scanner stopped for simulation"))
        .catch(err => console.warn(err));
    }
    
    setCameraState("loading");
    
    setTimeout(() => {
      const mockSerials = [
        "SS-4820-1928-1029",
        "SS-8910-4829-5730",
        "SS-1049-5839-4820",
        "SS-3829-1029-4729"
      ];
      const randomSerial = mockSerials[Math.floor(Math.random() * mockSerials.length)];
      handleScanSuccess(randomSerial, null);
    }, 1200);
  };

  useEffect(() => {
    if (cameraState !== "loading") return;

    let isMounted = true;
    const elementId = "qr-scanner-view";
    
    const timer = setTimeout(() => {
      if (!isMounted) return;

      const html5QrCode = new Html5Qrcode(elementId);
      scannerRef.current = html5QrCode;

      html5QrCode.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: (width, height) => {
            const size = Math.min(width, height) * 0.75;
            return { width: size, height: size };
          }
        },
        (decodedText) => {
          if (isMounted) {
            handleScanSuccess(decodedText, html5QrCode);
          }
        },
        (errorMessage) => {
          // Silent scan failures
        }
      )
      .then(() => {
        if (isMounted) {
          setCameraState("scanning");
        }
      })
      .catch((err) => {
        console.warn("Could not start QR scanner automatically:", err);
        if (isMounted) {
          setCameraState("permission_denied");
        }
      });
    }, 150);

    return () => {
      isMounted = false;
      clearTimeout(timer);
      if (scannerRef.current && scannerRef.current.isScanning) {
        scannerRef.current.stop()
          .then(() => console.log("Stopped scanning on unmount"))
          .catch(e => console.error("Failed to stop scanner on unmount:", e));
      }
    };
  }, [cameraState]);

  const handleSubmit = () => {
    console.log("Form step 3 submitted:", { serial });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f8f9ff] to-[#f0faf5] dark:from-[#08121e] dark:to-[#050b12]">
      {/* Header */}
      <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 sm:px-6 flex-shrink-0">
        <span className="text-lg font-semibold text-foreground dark:text-white">
          Smart<span className="text-[#006c49]">Sort</span>
        </span>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-sm text-muted-foreground border border-border rounded-lg hover:bg-background dark:hover:bg-secondary transition-colors">
            Help
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-10">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left — Visual Info */}
          <div className="flex flex-col gap-8 bg-[#eff4ff] dark:bg-background border border-[#bbcabf] dark:border-border p-10 rounded-xl relative overflow-hidden shadow-sm h-full flex items-center justify-center">
            {/* The background green glow effect from the original */}
            <div className="absolute w-64 h-64 bg-[#10b981] rounded-full blur-[80px] opacity-20" />
            
            {/* QR Code Scanning Visual */}
            <div className="relative z-10 flex flex-col items-center gap-5">
              {/* Scanner Frame */}
              <div 
                className={`relative w-48 h-48 rounded-lg overflow-hidden transition-all duration-300 border-2 ${
                  cameraState === "success" 
                    ? "border-[#10b981] shadow-[0_0_20px_rgba(16,185,129,0.4)] bg-[#10b981]/5 scale-105" 
                    : cameraState === "permission_denied"
                    ? "border-red-400 bg-red-50/10"
                    : "border-transparent bg-black/5"
                }`}
              >
                {/* Custom styles to force video tag override and animations */}
                <style>{`
                  #qr-scanner-view video {
                    width: 100% !important;
                    height: 100% !important;
                    object-fit: cover !important;
                  }
                  #qr-scanner-view {
                    width: 100% !important;
                    height: 100% !important;
                    border: none !important;
                  }
                  @keyframes scaleUp {
                    from { transform: scale(0.85); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                  }
                  @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                  }
                  .animate-scale-up {
                    animation: scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                  }
                  .animate-fade-in {
                    animation: fadeIn 0.25s ease forwards;
                  }
                `}</style>

                {/* Corner brackets */}
                {cameraState !== "success" && (
                  <>
                    <div className={`absolute top-0 left-0 w-8 h-8 border-t-[3px] border-l-[3px] rounded-tl-md z-10 transition-colors ${cameraState === "permission_denied" ? "border-red-400" : "border-[#006c49]"}`} />
                    <div className={`absolute top-0 right-0 w-8 h-8 border-t-[3px] border-r-[3px] rounded-tr-md z-10 transition-colors ${cameraState === "permission_denied" ? "border-red-400" : "border-[#006c49]"}`} />
                    <div className={`absolute bottom-0 left-0 w-8 h-8 border-b-[3px] border-l-[3px] rounded-bl-md z-10 transition-colors ${cameraState === "permission_denied" ? "border-red-400" : "border-[#006c49]"}`} />
                    <div className={`absolute bottom-0 right-0 w-8 h-8 border-b-[3px] border-r-[3px] rounded-br-md z-10 transition-colors ${cameraState === "permission_denied" ? "border-red-400" : "border-[#006c49]"}`} />
                  </>
                )}

                {/* Loading State */}
                {cameraState === "loading" && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/60 z-20 gap-2">
                    <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                    <span className="text-[10px] font-semibold text-emerald-400 tracking-wider">INITIALIZING...</span>
                  </div>
                )}

                {/* Live Camera View Feed */}
                {cameraState === "scanning" && (
                  <div id="qr-scanner-view" className="w-full h-full" />
                )}

                {/* Scanning line animation */}
                {cameraState === "scanning" && (
                  <div className="absolute left-3 right-3 h-0.5 bg-[#10b981] top-1/2 -translate-y-1/2 opacity-80 animate-pulse z-10 shadow-[0_0_8px_#10b981]" />
                )}

                {/* Success State Overlay */}
                {cameraState === "success" && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-emerald-500/10 z-20 animate-fade-in">
                    <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white animate-scale-up">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white">
                        <path
                          d="M20 6L9 17L4 12"
                          stroke="currentColor"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-3 tracking-widest uppercase animate-pulse">
                      CONNECTED
                    </span>
                  </div>
                )}

                {/* Permission Denied / Error Fallback State */}
                {cameraState === "permission_denied" && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-900/50 text-center z-20">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-red-500 mb-2">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.5" />
                      <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" />
                    </svg>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider">
                      Camera Blocked
                    </span>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 max-w-[150px] leading-tight">
                      Allow camera access in your settings or type manually.
                    </p>
                  </div>
                )}
              </div>

              {/* Instructional text */}
              <div className="text-center flex flex-col items-center gap-1.5">
                <p className="text-sm font-semibold text-foreground dark:text-white">
                  {cameraState === "success" 
                    ? "Device Synced Successfully" 
                    : cameraState === "permission_denied" 
                    ? "Manual Entry Ready" 
                    : "Scan QR Code on Device"}
                </p>
                <p className="text-xs text-muted-foreground max-w-[200px] leading-relaxed">
                  {cameraState === "success"
                    ? "Serial code populated. Press 'Register & Finish' to activate."
                    : cameraState === "permission_denied"
                    ? "Type the 12-digit code on the right, or click below to simulate a scan."
                    : "Point your camera at the QR code on your SmartSort bin to auto-fill."}
                </p>

                {/* Quick actions for testing / fallback */}
                <div className="mt-3 flex gap-2">
                  {cameraState === "permission_denied" && (
                    <button
                      onClick={() => setCameraState("loading")}
                      className="px-3 py-1 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded border border-slate-300 shadow-sm transition-all"
                    >
                      Retry Camera
                    </button>
                  )}
                  {cameraState !== "success" && (
                    <button
                      onClick={handleSimulateScan}
                      className="px-3 py-1 bg-primary hover:bg-primary/90 text-white text-xs font-semibold rounded shadow-sm transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                      Simulate QR Scan
                    </button>
                  )}
                  {cameraState === "success" && (
                    <button
                      onClick={() => {
                        setSerial("");
                        setCameraState("loading");
                      }}
                      className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded transition-all cursor-pointer"
                    >
                      Scan Another
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="absolute top-10 left-10 flex flex-col gap-6 z-20">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-primary dark:bg-emerald-400 rounded-sm ring-2 ring-[#006c49] dark:ring-emerald-400 ring-offset-4 ring-offset-[#eff4ff] dark:ring-offset-[#071321]" />
                  </div>
                  <span className="font-semibold text-[#006c49] dark:text-emerald-400 tracking-wide text-sm hidden sm:block">Facility Mapping</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="bg-card border border-border rounded-xl shadow-sm p-6 sm:p-8 flex flex-col gap-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xs font-semibold text-muted-foreground tracking-widest uppercase mb-1">STEP 3 OF 3</h2>
                <h3 className="text-2xl font-semibold text-foreground dark:text-white">Connect First Device</h3>
              </div>
              <div className="flex flex-col items-end gap-1 hidden sm:flex">
                <span className="text-sm font-semibold text-[#006c49] dark:text-emerald-400">Configuration</span>
                <div className="flex gap-1.5">
                  <div className="w-6 h-1.5 bg-primary dark:bg-emerald-500 rounded-full" />
                  <div className="w-6 h-1.5 bg-primary dark:bg-emerald-500 rounded-full" />
                  <div className="w-6 h-1.5 bg-primary dark:bg-emerald-500 rounded-full" />
                </div>
              </div>
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed">
              Enter the unique 12-digit serial number located on the side panel of your SmartSort unit to activate its analytics core.
            </p>

            <div className="flex flex-col gap-3">
              <InputField
                id="serial"
                label="DEVICE SERIAL NUMBER"
                placeholder="SS-XXXX-XXXX-XXXX"
                value={serial}
                onChange={setSerial}
              />
              <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-muted-foreground">
                  <path d="M7 1a6 6 0 1 1 0 12A6 6 0 0 1 7 1zM7 4v4M7 10.5v-.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Serial numbers start with 'SS' followed by 12 characters.
              </p>
            </div>

            {/* Contextual Facility Switcher */}
            <div className="bg-[#eff4ff] dark:bg-background border border-[#bbcabf] dark:border-border rounded-lg p-4 flex items-center justify-between mt-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-card border border-[#bbcabf] dark:border-border rounded-md flex items-center justify-center text-[#006c49] dark:text-emerald-400">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M3 21h18M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16M9 9h6M9 13h6M9 17h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-foreground dark:text-white">Default Facility</span>
                  <span className="text-sm text-muted-foreground">North Logistics Hub</span>
                </div>
              </div>
              <button className="text-sm font-semibold text-[#006c49] dark:text-emerald-400 hover:underline dark:hover:text-emerald-300">
                Change
              </button>
            </div>

            <div className="border-t border-[#bbcabf] pt-6 flex flex-col gap-4 mt-2">
              <button
                onClick={handleSubmit}
                className="h-12 w-full bg-primary hover:bg-primary/90 active:scale-[0.98] text-white text-base font-semibold tracking-wide rounded-lg transition-all shadow-sm flex items-center justify-center gap-2"
              >
                Register & Finish
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              
              <button 
                onClick={() => navigate("/dashboard")}
                className="text-sm font-medium text-muted-foreground hover:text-foreground dark:text-white transition-colors text-center"
              >
                Skip for Now
              </button>
            </div>

            <div className="mt-4 border border-[#bbcabf]/50 dark:border-border bg-background dark:bg-secondary rounded-lg p-4 flex items-start gap-3">
              <svg className="w-5 h-5 text-[#23acf1] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <div>
                <p className="text-sm font-semibold text-foreground dark:text-white">Need help with installation?</p>
                <p className="text-xs text-muted-foreground mt-0.5">Our technical team is available 24/7 for remote setup assistance.</p>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-background dark:bg-secondary border-t border-border px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-[#334155] dark:text-muted-foreground">SmartSort Analytics</p>
          <p className="text-xs text-muted-foreground">© 2026 SmartSort Analytics. Professional waste stewardship.</p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-1">
          {["Privacy policy", "Terms of service", "Environmental compliance", "Support"].map((l) => (
            <a key={l} href="#" className="text-xs text-muted-foreground dark:text-slate-400 hover:text-[#006c49] dark:hover:text-emerald-400 transition-colors">
              {l}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}