import { useState } from "react";
import { useNavigate } from "react-router";
import { InputField } from "../../components/InputField";

/**
 * Onboarding Step 3: Facility Mapping / Device Connection
 * 
 * Clean semantic view for connecting the first hardware device.
 */
export default function Onboarding() {
  const navigate = useNavigate();
  const [serial, setSerial] = useState("");

  const handleSubmit = () => {
    console.log("Form step 3 submitted:", { serial });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f8f9ff] to-[#f0faf5]">
      {/* Header */}
      <header className="h-16 bg-white dark:bg-[#0b1c30] border-b border-[#e2e8f0] dark:border-[#1e3a5f] flex items-center justify-between px-4 sm:px-6 flex-shrink-0">
        <span className="text-lg font-semibold text-[#0b1c30] dark:text-white">
          Smart<span className="text-[#006c49]">Sort</span>
        </span>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-sm text-[#515f74] dark:text-[#cbd5e1] border border-[#e2e8f0] dark:border-[#1e3a5f] rounded-lg hover:bg-[#f8fafc] dark:hover:bg-[#0f2942] transition-colors">
            Help
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-10">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left — Visual Info */}
          <div className="flex flex-col gap-8 bg-[#eff4ff] border border-[#bbcabf] p-10 rounded-2xl relative overflow-hidden shadow-sm h-full flex items-center justify-center">
            {/* The background green glow effect from the original */}
            <div className="absolute w-64 h-64 bg-[#10b981] rounded-full blur-[80px] opacity-20" />
            
            {/* QR Code Scanning Visual */}
            <div className="relative z-10 flex flex-col items-center gap-5">
              {/* Scanner Frame */}
              <div className="relative w-48 h-48">
                {/* Corner brackets */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-[3px] border-l-[3px] border-[#006c49] rounded-tl-md" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-[3px] border-r-[3px] border-[#006c49] rounded-tr-md" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-[3px] border-l-[3px] border-[#006c49] rounded-bl-md" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-[3px] border-r-[3px] border-[#006c49] rounded-br-md" />

                {/* Scanning line animation */}
                <div className="absolute left-3 right-3 h-0.5 bg-[#10b981] top-1/2 -translate-y-1/2 opacity-60 animate-pulse" />

                {/* QR Code icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" className="text-[#006c49] opacity-80">
                    <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
                    <rect x="5" y="5" width="3" height="3" fill="currentColor" />
                    <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
                    <rect x="16" y="5" width="3" height="3" fill="currentColor" />
                    <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
                    <rect x="5" y="16" width="3" height="3" fill="currentColor" />
                    <rect x="14" y="14" width="3" height="3" fill="currentColor" />
                    <rect x="19" y="14" width="2" height="2" fill="currentColor" />
                    <rect x="14" y="19" width="2" height="2" fill="currentColor" />
                    <rect x="19" y="19" width="2" height="2" fill="currentColor" />
                    <rect x="17" y="17" width="1.5" height="1.5" fill="currentColor" />
                  </svg>
                </div>
              </div>

              {/* Instructional text */}
              <div className="text-center">
                <p className="text-sm font-semibold text-[#0b1c30] dark:text-white">Scan QR Code on Device</p>
                <p className="text-xs text-[#515f74] dark:text-[#cbd5e1] mt-1 max-w-[200px] leading-relaxed">
                  Point your camera at the QR code on your SmartSort bin to auto-fill the serial number.
                </p>
              </div>
            </div>

            <div className="absolute top-10 left-10 flex flex-col gap-6 z-20">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-[#006c49] rounded-sm ring-2 ring-[#006c49] ring-offset-4 ring-offset-[#eff4ff]" />
                  </div>
                  <span className="font-semibold text-[#006c49] tracking-wide text-sm hidden sm:block">Facility Mapping</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="bg-white dark:bg-[#0b1c30] border border-[#e2e8f0] dark:border-[#1e3a5f] rounded-2xl shadow-sm p-6 sm:p-8 flex flex-col gap-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xs font-semibold text-[#515f74] dark:text-[#cbd5e1] tracking-widest uppercase mb-1">STEP 3 OF 3</h2>
                <h3 className="text-2xl font-semibold text-[#0b1c30] dark:text-white">Connect First Device</h3>
              </div>
              <div className="flex flex-col items-end gap-1 hidden sm:flex">
                <span className="text-sm font-semibold text-[#006c49]">Configuration</span>
                <div className="flex gap-1.5">
                  <div className="w-6 h-1.5 bg-[#006c49] rounded-full" />
                  <div className="w-6 h-1.5 bg-[#006c49] rounded-full" />
                  <div className="w-6 h-1.5 bg-[#006c49] rounded-full" />
                </div>
              </div>
            </div>

            <p className="text-[#515f74] dark:text-[#cbd5e1] text-sm leading-relaxed">
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
              <p className="text-xs text-[#515f74] dark:text-[#cbd5e1] flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1a6 6 0 1 1 0 12A6 6 0 0 1 7 1zM7 4v4M7 10.5v-.5" stroke="#515f74" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Serial numbers start with 'SS' followed by 12 characters.
              </p>
            </div>

            {/* Contextual Facility Switcher */}
            <div className="bg-[#eff4ff] border border-[#bbcabf] rounded-lg p-4 flex items-center justify-between mt-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white dark:bg-[#0b1c30] border border-[#bbcabf] rounded-md flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M3 21h18M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16M9 9h6M9 13h6M9 17h6" stroke="#006c49" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-[#0b1c30] dark:text-white">Default Facility</span>
                  <span className="text-sm text-[#515f74] dark:text-[#cbd5e1]">North Logistics Hub</span>
                </div>
              </div>
              <button className="text-sm font-semibold text-[#006c49] hover:underline">
                Change
              </button>
            </div>

            <div className="border-t border-[#bbcabf] pt-6 flex flex-col gap-4 mt-2">
              <button
                onClick={handleSubmit}
                className="h-12 w-full bg-[#006c49] hover:bg-[#005a3c] active:scale-[0.98] text-white text-base font-semibold tracking-wide rounded-lg transition-all shadow-sm flex items-center justify-center gap-2"
              >
                Register & Finish
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              
              <button 
                onClick={() => navigate("/dashboard")}
                className="text-sm font-medium text-[#515f74] dark:text-[#cbd5e1] hover:text-[#0b1c30] dark:text-white transition-colors text-center"
              >
                Skip for Now
              </button>
            </div>

            {/* Support Note */}
            <div className="mt-4 border border-[#bbcabf]/50 bg-[#f8fafc] dark:bg-[#0f2942] rounded-lg p-4 flex items-start gap-3">
              <svg className="w-5 h-5 text-[#23acf1] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <div>
                <p className="text-sm font-semibold text-[#0b1c30] dark:text-white">Need help with installation?</p>
                <p className="text-xs text-[#515f74] dark:text-[#cbd5e1] mt-0.5">Our technical team is available 24/7 for remote setup assistance.</p>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#f8fafc] dark:bg-[#0f2942] border-t border-[#e2e8f0] dark:border-[#1e3a5f] px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-[#334155]">SmartSort Analytics</p>
          <p className="text-xs text-[#64748b] dark:text-[#94a3b8] dark:text-[#64748b]">© 2024 SmartSort Analytics. Professional waste stewardship.</p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-1">
          {["Privacy policy", "Terms of service", "Environmental compliance", "Support"].map((l) => (
            <a key={l} href="#" className="text-xs text-[#64748b] dark:text-[#94a3b8] dark:text-[#64748b] hover:text-[#006c49] transition-colors">
              {l}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}