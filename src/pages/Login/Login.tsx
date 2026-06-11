import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import imgAiCore from "../../assets/smartsort_ai_core.png";

// --- Custom SVGs for UI Icons ---

function LogoSvg() {
  return (
    <svg width="36" height="36" viewBox="0 0 100 100" fill="none" className="text-blue-600">
      <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" stroke="currentColor" strokeWidth="8" strokeLinejoin="round" fill="none"/>
      <line x1="50" y1="5" x2="50" y2="50" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
      <line x1="50" y1="50" x2="90" y2="72.5" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
      <line x1="50" y1="50" x2="10" y2="72.5" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
      <polygon points="50,35 65,42.5 65,57.5 50,65 35,57.5 35,42.5" fill="currentColor" opacity="0.8"/>
    </svg>
  );
}

function ShieldLockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13"></rect>
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
      <circle cx="5.5" cy="18.5" r="2.5"></circle>
      <circle cx="18.5" cy="18.5" r="2.5"></circle>
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );
}

function PasswordLockIcon({ className }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  );
}

function EyeOpenIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  );
}

function EyeClosedIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
      <line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>
  );
}

function LoginArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
      <polyline points="10 17 15 12 10 7"></polyline>
      <line x1="15" y1="12" x2="3" y2="12"></line>
    </svg>
  );
}

// --- Validation Helpers ---

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

interface ValidationErrors {
  email?: string;
  password?: string;
}

function validateEmail(value: string): string | undefined {
  if (!value.trim()) return "Email address is required";
  if (!EMAIL_REGEX.test(value)) return "Please enter a valid email address";
  return undefined;
}

function validatePassword(value: string): string | undefined {
  if (!value) return "Password is required";
  if (value.length < MIN_PASSWORD_LENGTH)
    return `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
  if (!/\d/.test(value))
    return "Password must contain at least one number";
  if (!/[!@#$%^&*(),.?":{}|<>[\]\\/`~_\-+=]/.test(value))
    return "Password must contain at least one special character";
  return undefined;
}

// --- Inline Error Message Component ---

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p
      className="text-[11px] font-semibold mt-1.5 flex items-center gap-1"
      style={{ color: "#ef4444" }}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      {message}
    </p>
  );
}

// --- Shake keyframe injected once via a <style> tag ---

const shakeKeyframes = `
@keyframes login-shake {
  0%, 100% { transform: translateX(0); }
  10%, 50%, 90% { transform: translateX(-4px); }
  30%, 70% { transform: translateX(4px); }
}
`;

// --- Main Login Component ---

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Local Form States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Selected Login Role Toggle
  const [selectedRole, setSelectedRole] = useState<"manager" | "collector">("manager");

  // Validation States
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({});
  const [shaking, setShaking] = useState(false);

  // Sync role toggle choice with search parameters
  useEffect(() => {
    const isCollectorInvite = searchParams.get("role") === "collector";
    if (isCollectorInvite) {
      setSelectedRole("collector");
    }
  }, [searchParams]);

  // Clear field error on change when the new value is valid
  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (touched.email) {
      const err = validateEmail(value);
      setErrors((prev) => ({ ...prev, email: err }));
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (touched.password) {
      const err = validatePassword(value);
      setErrors((prev) => ({ ...prev, password: err }));
    }
  };

  // Mark field as touched when the user leaves it
  const handleEmailBlur = () => {
    setTouched((prev) => ({ ...prev, email: true }));
    setErrors((prev) => ({ ...prev, email: validateEmail(email) }));
  };

  const handlePasswordBlur = () => {
    setTouched((prev) => ({ ...prev, password: true }));
    setErrors((prev) => ({ ...prev, password: validatePassword(password) }));
  };

  const triggerShake = () => {
    setShaking(true);
    setTimeout(() => setShaking(false), 500);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Run full validation
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    const newErrors: ValidationErrors = { email: emailErr, password: passwordErr };
    setErrors(newErrors);
    setTouched({ email: true, password: true });

    // If there are validation errors, shake the form and stop
    if (emailErr || passwordErr) {
      triggerShake();
      return;
    }

    // Set selected role to localStorage to drive role-based menu configurations
    localStorage.setItem("userRole", selectedRole);

    // Dynamic role based routing
    if (selectedRole === "collector") {
      navigate("/collector-dashboard");
    } else {
      navigate("/dashboard");
    }
  };

  const hasEmailError = !!errors.email;
  const hasPasswordError = !!errors.password;
  const isFormValid = email.trim() !== "" && password !== "" && !hasEmailError && !hasPasswordError;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white dark:bg-[#0b1c30] text-[#0f172a] dark:text-white transition-colors duration-300 font-sans">
      {/* Inject shake animation */}
      <style>{shakeKeyframes}</style>

      {/* LEFT PANEL: Form and Branding */}
      <div className="w-full md:w-1/2 flex flex-col justify-between p-8 sm:p-12 lg:p-16 bg-white dark:bg-[#0b1c30] relative">
        
        {/* Top Branding Header */}
        <div className="flex items-center gap-3">
          <LogoSvg />
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight text-[#0f172a] dark:text-white">SmartSort</span>
            <span className="text-[9px] font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase -mt-1">Air</span>
          </div>
        </div>

        {/* Login Form Container */}
        <div className="max-w-md w-full mx-auto my-auto py-10 flex flex-col gap-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-[#0f172a] dark:text-white">Welcome</h2>
            <p className="text-sm text-[#64748b] dark:text-[#94a3b8] mt-1.5">
              Please log in with your login details to start working!
            </p>
          </div>

          <form
            onSubmit={handleLoginSubmit}
            noValidate
            className="flex flex-col gap-6"
            style={shaking ? { animation: "login-shake 0.4s ease-in-out" } : undefined}
          >
            
            {/* Role segmented toggle */}
            <div className="bg-slate-100 dark:bg-[#0f2942] p-1 rounded-xl flex gap-1 border border-slate-200/50 dark:border-[#1e3a5f]/50">
              <button
                type="button"
                onClick={() => setSelectedRole("manager")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all ${
                  selectedRole === "manager"
                    ? "bg-white dark:bg-[#0b1c30] shadow-sm text-blue-600 dark:text-blue-400"
                    : "text-[#64748b] dark:text-[#cbd5e1] hover:text-[#0f172a] dark:hover:text-white"
                }`}
              >
                <ShieldLockIcon />
                Admin / Manager
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole("collector")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all ${
                  selectedRole === "collector"
                    ? "bg-white dark:bg-[#0b1c30] shadow-sm text-blue-600 dark:text-blue-400"
                    : "text-[#64748b] dark:text-[#cbd5e1] hover:text-[#0f172a] dark:hover:text-white"
                }`}
              >
                <TruckIcon />
                Collector
              </button>
            </div>

            {/* Email field */}
            <div>
              <div
                className={`relative py-3 transition-colors flex items-center gap-3 border-b ${
                  hasEmailError
                    ? "border-red-500 dark:border-red-500"
                    : "border-slate-200 dark:border-[#1e3a5f] focus-within:border-blue-600 dark:focus-within:border-blue-400"
                }`}
              >
                <UserIcon
                  className={`w-5 h-5 flex-shrink-0 ${
                    hasEmailError
                      ? "text-red-500"
                      : "text-slate-400 dark:text-[#94a3b8]"
                  }`}
                />
                <input
                  id="login-email"
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  onBlur={handleEmailBlur}
                  aria-invalid={hasEmailError}
                  aria-describedby={hasEmailError ? "login-email-error" : undefined}
                  className="bg-transparent border-none outline-none text-sm w-full text-[#0f172a] dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
                />
              </div>
              <div id="login-email-error">
                <FieldError message={errors.email} />
              </div>
            </div>

            {/* Password field */}
            <div>
              <div
                className={`relative py-3 transition-colors flex items-center gap-3 border-b ${
                  hasPasswordError
                    ? "border-red-500 dark:border-red-500"
                    : "border-slate-200 dark:border-[#1e3a5f] focus-within:border-blue-600 dark:focus-within:border-blue-400"
                }`}
              >
                <PasswordLockIcon
                  className={`w-5 h-5 flex-shrink-0 ${
                    hasPasswordError
                      ? "text-red-500"
                      : "text-slate-400 dark:text-[#94a3b8]"
                  }`}
                />
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  onBlur={handlePasswordBlur}
                  aria-invalid={hasPasswordError}
                  aria-describedby={hasPasswordError ? "login-password-error" : undefined}
                  className="bg-transparent border-none outline-none text-sm w-full text-[#0f172a] dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 dark:text-[#94a3b8] hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
                </button>
              </div>
              <div id="login-password-error">
                <FieldError message={errors.password} />
              </div>
            </div>

            {/* Submit Button */}
            <button
              id="login-submit"
              type="submit"
              className={`h-12 w-full rounded-lg font-bold text-sm tracking-wide transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2 ${
                isFormValid
                  ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-blue-600/10"
                  : "bg-slate-100 dark:bg-[#0f2942] text-slate-400 dark:text-slate-600 cursor-not-allowed border border-transparent"
              }`}
            >
              <LoginArrowIcon />
              LOGIN
            </button>

            {/* Inquiry & links */}
            <div className="flex flex-col gap-4 items-center justify-center text-xs mt-2">
              <a href="#" className="font-semibold text-slate-500 hover:text-blue-600 transition-colors">
                Forgot password?
              </a>
              
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 dark:border-[#1e3a5f] text-blue-600 focus:ring-blue-500 bg-slate-50 dark:bg-[#0b1c30]"
                />
                <span className="text-slate-500 dark:text-[#cbd5e1] font-medium">Stay signed in for 30 days</span>
              </label>
            </div>

          </form>
        </div>

        {/* Bottom Status Panel */}
        <div className="flex items-center gap-4 text-[10px] font-bold text-[#64748b] tracking-wider uppercase">
          <span className="inline-flex items-center gap-1.5 border border-slate-200/60 dark:border-[#1e3a5f] rounded-full px-3 py-1 bg-slate-50 dark:bg-[#0f2942]">
            <span className="w-1.5 h-1.5 bg-[#22c55e] rounded-full animate-pulse" />
            Systems Operational
          </span>
          <span className="text-slate-200 dark:text-[#1e3a5f]">|</span>
          <span>V4.2.0-STABLE</span>
        </div>

      </div>

      {/* RIGHT PANEL: High-Tech Branding */}
      <div 
        className="w-full md:w-1/2 bg-[#020e24] text-white flex flex-col justify-center items-center p-8 sm:p-12 lg:p-16 relative overflow-hidden"
        style={{
          backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }}
      >
        {/* Glow ambient background effects */}
        <div className="absolute w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <div className="max-w-md w-full flex flex-col items-center gap-10 relative z-10">
          
          {/* Circular float card */}
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 bg-[#07132a]/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl flex flex-col items-center justify-center gap-3 p-6 group hover:border-blue-500/30 transition-all duration-500">
            {/* AI badge */}
            <span className="absolute top-4 right-4 bg-blue-600 text-[8px] font-extrabold tracking-widest px-2 py-0.5 rounded uppercase">
              AI Engine
            </span>
            
            {/* Circular glowing orb */}
            <div className="w-44 h-44 rounded-full flex items-center justify-center relative">
              <div className="absolute inset-0 bg-blue-500/5 rounded-full blur-xl group-hover:bg-blue-500/10 transition-all" />
              <img 
                src={imgAiCore} 
                alt="SmartSort AI Core" 
                className="w-full h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-105" 
              />
            </div>
            
            {/* Bottom brand card status */}
            <span className="text-lg font-black tracking-tight text-blue-400">SmartSort</span>

            {/* Binary check badge */}
            <span className="absolute bottom-4 left-4 bg-white/5 border border-white/10 text-[8.5px] font-mono tracking-wider px-2 py-0.5 rounded text-[#10b981] flex items-center gap-1">
              ✓ 1001100111100
            </span>
          </div>

          {/* Tagline block */}
          <div className="text-center flex flex-col gap-4">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Revolutionary Waste Management
            </h3>
            <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed font-light">
              SmartSort is the next generation waste management software which growth with its users. Built with the best practices in mind it fits your needs no matter if you need the whole software or just one component. Is there still something missing? Get in touch so that we can tailor it to your needs.
            </p>
          </div>

          {/* Dots Pagination */}
          <div className="flex gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-white shadow-sm" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/20 hover:bg-white/40 cursor-pointer transition-colors" />
          </div>

        </div>

      </div>

    </div>
  );
}