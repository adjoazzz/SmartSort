import { useState } from "react";
import { useNavigate } from "react-router";
import { InputField } from "../../components/InputField";

/**
 * Login Page Component
 * 
 * Clean semantic view for user authentication.
 */
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("user@smartsort.com");
  const [password, setPassword] = useState("password123");
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validate = () => {
    let isValid = true;
    setEmailError("");
    setPasswordError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      isValid = false;
    } else if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter.");
      isValid = false;
    } else if (!/[0-9]/.test(password)) {
      setPasswordError("Password must contain at least one number.");
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    // Simulate auto-routing based on account type
    if (email.toLowerCase().includes("collector")) {
      navigate("/collector-dashboard");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[440px] flex flex-col items-center gap-8">
        
        {/* Header / Branding */}
        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-16 h-16 bg-[#398454] rounded-2xl flex items-center justify-center shadow-lg mb-2 relative">
            {/* The white glowing leaf/icon equivalent */}
            <div className="absolute -bottom-1 w-full h-full bg-white/20 blur-md rounded-2xl" />
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="relative z-10 text-white">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 9H9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15 9H15.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-[#121c28] tracking-tight">SmartSort</h1>
          <p className="text-sm font-medium text-[#434655]/80 uppercase tracking-wide mt-1">
            Waste Intelligence for a Sustainable Future
          </p>
        </div>

        {/* Login Card */}
        <div className="w-full bg-white/80 backdrop-blur-xl border border-white/40 shadow-[0_12px_20px_rgba(18,28,40,0.06)] rounded-2xl p-8 sm:p-10">
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-semibold text-[#434655] uppercase tracking-wider">
                EMAIL ADDRESS
              </label>
              <input
                id="email"
                type="email"
                placeholder="user@smartsort.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                className={`h-12 px-4 border rounded-lg text-sm bg-[#eef4ff] text-[#0b1c30] placeholder-[#434655]/40 focus:outline-none focus:ring-2 transition-all ${
                  emailError 
                    ? "border-[#ba1a1a] focus:border-[#ba1a1a] focus:ring-[#ba1a1a]/20" 
                    : "border-[#cbd5e1] focus:border-[#398454] focus:ring-[#398454]/20"
                }`}
              />
              {emailError && <span className="text-xs text-[#ba1a1a] font-medium">{emailError}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-xs font-semibold text-[#434655] uppercase tracking-wider">
                  PASSWORD
                </label>
                <button type="button" className="text-[10px] font-bold text-[#434655]/60 hover:text-[#398454] transition-colors relative group">
                  Forgot Password?
                  <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#27313e] text-[#eaf1ff] text-[10px] px-2 py-1 rounded whitespace-nowrap pointer-events-none">
                    Coming Soon
                  </div>
                </button>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setPasswordError(""); }}
                className={`h-12 px-4 border rounded-lg text-sm bg-[#eef4ff] text-[#0b1c30] placeholder-[#434655]/40 focus:outline-none focus:ring-2 transition-all ${
                  passwordError 
                    ? "border-[#ba1a1a] focus:border-[#ba1a1a] focus:ring-[#ba1a1a]/20" 
                    : "border-[#cbd5e1] focus:border-[#398454] focus:ring-[#398454]/20"
                }`}
              />
              {passwordError && <span className="text-xs text-[#ba1a1a] font-medium">{passwordError}</span>}
            </div>

            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="relative w-4 h-4 rounded border border-[#c3c6d7] bg-[#eef4ff] flex items-center justify-center group-hover:border-[#398454] transition-colors">
                {rememberMe && (
                  <svg className="w-3 h-3 text-[#398454]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <input 
                type="checkbox" 
                className="hidden" 
                checked={rememberMe} 
                onChange={(e) => setRememberMe(e.target.checked)} 
              />
              <span className="text-xs font-medium text-[#434655]">Stay signed in for 30 days</span>
            </label>

            <button
              type="submit"
              className="w-full h-12 rounded-lg bg-gradient-to-br from-[#398454] to-[#2563eb] hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg mt-2"
            >
              <span className="text-sm font-bold text-white tracking-wide">Sign In</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-white">
                <path d="M2 6H10M10 6L6 2M10 6L6 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-8 pt-8 border-t border-[#c3c6d7]/20 flex items-center justify-center gap-1.5 text-xs">
            <span className="font-medium text-[#434655]/60">New to the platform?</span>
            <button onClick={() => navigate("/onboarding-1")} className="font-bold text-[#398454] hover:underline">Request access</button>
          </div>
        </div>

        {/* System Status Hint */}
        <div className="mt-4 px-4 py-2 rounded-full bg-white/40 backdrop-blur-sm border border-white/20 flex items-center gap-4 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ade80] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#22c55e]"></span>
            </div>
            <span className="text-[10px] font-bold text-[#434655]/70 uppercase tracking-tight">Systems Operational</span>
          </div>
          <div className="w-px h-3 bg-[#434655]/20" />
          <span className="text-[10px] font-bold text-[#434655]/70 uppercase tracking-tight">v4.2.0-stable</span>
        </div>

      </div>
    </div>
  );
}