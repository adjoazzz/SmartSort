import { authFetch } from "../../lib/authFetch";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { supabase } from "../../lib/supabaseClient";
import { Shield, Truck, User, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import imgAiCore from "../../assets/smartsort_ai_core.png";
import imgSlide1 from "../../assets/login_slide_1.jpg";
import imgSlide2 from "../../assets/login_slide_2.jpg";

const CAROUSEL_SLIDES = [
  {
    image: imgSlide1,
    title: "Simple, Eco-Friendly Sorting",
    description: "SmartSort integrates seamlessly with your existing recycling bins, providing an approachable and clean solution for waste management without overcomplicating the process."
  },
  {
    image: imgSlide2,
    title: "Automated Mechanical Precision",
    description: "Using simple mechanical parts and DIY engineering, our automated slide gently routes recyclable items into their correct cardboard bins, saving time and improving sorting accuracy."
  }
];

// --- Custom SVGs for UI Icons ---



// --- Validation Helpers ---

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

interface ValidationErrors {
  firstName?: string;
  lastName?: string;
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
  if (!/\d/.test(value)) return "Password must contain at least one number";
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
      <AlertCircle className="w-3 h-3" strokeWidth={2.5} />
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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-rotate carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Selected Login Role Toggle
  const [selectedRole, setSelectedRole] = useState<"manager" | "collector">(
    "manager",
  );

  // Validation States
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<{
    email?: boolean;
    password?: boolean;
  }>({});
  const [shaking, setShaking] = useState(false);

  // Sync role toggle choice with search parameters
  useEffect(() => {
    const isCollectorInvite = searchParams.get("role") === "collector";
    if (isCollectorInvite) {
      setSelectedRole("collector");
    }

    const initialEmail = searchParams.get("email");
    if (initialEmail) {
      setEmail(initialEmail);
      const savedAccountsStr = localStorage.getItem("savedAccounts");
      if (savedAccountsStr) {
        try {
          const savedAccounts = JSON.parse(savedAccountsStr);
          const account = savedAccounts.find(
            (a: any) => a.email === initialEmail,
          );
          if (account) {
            setRememberMe(account.rememberMe);
            if (account.rememberMe && account.password) {
              setPassword(account.password);
            }
          }
        } catch (e) {}
      }
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

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: ValidationErrors = {
      email: validateEmail(email),
      password: validatePassword(password),
    };

    // Validate name fields only during signup
    if (isSignup) {
      if (!firstName.trim()) newErrors.firstName = "First name is required";
      if (!lastName.trim()) newErrors.lastName = "Last name is required";
    }

    setErrors(newErrors);
    setTouched({ email: true, password: true });

    const hasErrors = Object.values(newErrors).some(Boolean);
    if (hasErrors) {
      triggerShake();
      return;
    }

    setIsLoading(true);

    try {
      if (isSignup) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        // Sync user role and name with backend
        if (data.user) {
          const fullName = `${firstName.trim()} ${lastName.trim()}`;
          await authFetch(
            (import.meta as any).env?.VITE_API_BASE_URL + "/api/auth/sync" ||
              "http://localhost:5000/api/auth/sync",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                id: data.user.id,
                email: data.user.email,
                name: fullName,
                role: selectedRole === "manager" ? "MANAGER" : "COLLECTOR",
              }),
            },
          ).catch(console.error);
        }

        // Signed up successfully, you can login directly
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }

      // Save account to localStorage for multi-account support
      const savedAccountsStr = localStorage.getItem("savedAccounts");
      let savedAccounts = [];
      if (savedAccountsStr) {
        try {
          savedAccounts = JSON.parse(savedAccountsStr);
        } catch (e) {}
      }

      const existingIdx = savedAccounts.findIndex(
        (a: any) => a.email === email,
      );
      const displayName = (isSignup && firstName.trim())
        ? `${firstName.trim()} ${lastName.trim()}`
        : email.split("@")[0];
      const initials = (isSignup && firstName.trim() && lastName.trim())
        ? `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
        : email.charAt(0).toUpperCase();

      const newAccount = {
        email,
        name: displayName,
        initials,
        color: "#78909C",
        rememberMe,
        password: rememberMe ? password : null,
      };

      if (existingIdx >= 0) {
        savedAccounts[existingIdx] = newAccount;
      } else {
        savedAccounts.push(newAccount);
      }
      localStorage.setItem("savedAccounts", JSON.stringify(savedAccounts));

      let roleToUse = selectedRole as string;
      if (email.toLowerCase().includes("admin")) {
        roleToUse = "admin";
      }
      localStorage.setItem("userRole", roleToUse);

      if (roleToUse === "collector") {
        navigate("/collector-dashboard");
      } else if (roleToUse === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err: any) {
      setErrors({ email: err.message });
      triggerShake();
      
      // Log failed login attempt to system audit logs
      fetch(
        ((import.meta as any).env?.VITE_API_BASE_URL ?? "http://localhost:5000") + "/api/audit-logs",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "Security Alert",
            actorName: "System",
            details: `Failed login attempt for user: ${email}`,
            color: "text-[#ba1a1a] dark:text-red-500",
          }),
        }
      ).catch(console.error);
    } finally {
      setIsLoading(false);
    }
  };

  const hasFirstNameError = !!errors.firstName;
  const hasLastNameError = !!errors.lastName;
  const hasEmailError = !!errors.email;
  const hasPasswordError = !!errors.password;
  const isFormValid =
    email.trim() !== "" &&
    password !== "" &&
    !hasEmailError &&
    !hasPasswordError &&
    (!isSignup || (firstName.trim() !== "" && lastName.trim() !== "" && !hasFirstNameError && !hasLastNameError));

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-card text-foreground transition-colors duration-300 font-sans">
      {/* Inject shake animation */}
      <style>{shakeKeyframes}</style>

      {/* LEFT PANEL: Form and Branding */}
      <div className="w-full md:w-1/2 flex flex-col justify-between p-8 sm:p-12 lg:p-16 bg-card relative">
        {/* Top Branding Header */}
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="SmartSort Logo" className="w-9 h-9 object-contain rounded-md" />
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight text-foreground">
              Smart<span className="text-[#006c49] dark:text-emerald-400">Sort</span>
            </span>
            <span className="text-[9px] font-bold tracking-widest text-primary dark:text-primary uppercase -mt-1">
              Air
            </span>
          </div>
        </div>

        {/* Login Form Container */}
        <div className="max-w-md w-full mx-auto my-auto py-10 flex flex-col gap-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              {isSignup ? "Create Account" : "Welcome"}
            </h2>
            <p className="text-sm text-muted-foreground mt-1.5">
              {isSignup
                ? "Fill in your details to get started with SmartSort."
                : "Please log in with your login details to start working!"}
            </p>
          </div>

          <form
            onSubmit={handleLoginSubmit}
            noValidate
            className="flex flex-col gap-6"
            style={
              shaking
                ? { animation: "login-shake 0.4s ease-in-out" }
                : undefined
            }
          >
            {/* Role segmented toggle */}
            <div className="bg-slate-100 dark:bg-secondary p-1 rounded-xl flex gap-1 border border-slate-200/50 dark:border-border/50">
              <button
                type="button"
                onClick={() => setSelectedRole("manager")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all ${
                  selectedRole === "manager"
                    ? "bg-card shadow-sm text-primary dark:text-primary"
                    : "text-muted-foreground hover:text-[#0f172a] dark:hover:text-white"
                }`}
              >
                <Shield className="w-[14px] h-[14px]" strokeWidth={2.5} />
                Admin / Manager
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole("collector")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all ${
                  selectedRole === "collector"
                    ? "bg-card shadow-sm text-primary dark:text-primary"
                    : "text-muted-foreground hover:text-[#0f172a] dark:hover:text-white"
                }`}
              >
                <Truck className="w-[14px] h-[14px]" strokeWidth={2.5} />
                Collector
              </button>
            </div>

            {/* First Name & Last Name fields — visible only during signup */}
            {isSignup && (
              <div className="grid grid-cols-2 gap-4">
                {/* First Name */}
                <div>
                  <div
                    className={`relative py-3 transition-colors flex items-center gap-3 border-b ${
                      hasFirstNameError
                        ? "border-red-500 dark:border-red-500"
                        : "border-slate-200 dark:border-border focus-within:border-blue-600 dark:focus-within:border-blue-400"
                    }`}
                  >
                    <User
                      className={`w-5 h-5 flex-shrink-0 ${
                        hasFirstNameError
                          ? "text-red-500"
                          : "text-slate-400 dark:text-muted-foreground"
                      }`}
                      strokeWidth={2.5}
                    />
                    <input
                      id="signup-firstname"
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                        if (errors.firstName && e.target.value.trim()) {
                          setErrors((prev) => ({ ...prev, firstName: undefined }));
                        }
                      }}
                      className="bg-transparent border-none outline-none text-sm w-full text-foreground placeholder-slate-400 dark:placeholder-slate-500"
                    />
                  </div>
                  <FieldError message={errors.firstName} />
                </div>

                {/* Last Name */}
                <div>
                  <div
                    className={`relative py-3 transition-colors flex items-center gap-3 border-b ${
                      hasLastNameError
                        ? "border-red-500 dark:border-red-500"
                        : "border-slate-200 dark:border-border focus-within:border-blue-600 dark:focus-within:border-blue-400"
                    }`}
                  >
                    <User
                      className={`w-5 h-5 flex-shrink-0 ${
                        hasLastNameError
                          ? "text-red-500"
                          : "text-slate-400 dark:text-muted-foreground"
                      }`}
                      strokeWidth={2.5}
                    />
                    <input
                      id="signup-lastname"
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                        if (errors.lastName && e.target.value.trim()) {
                          setErrors((prev) => ({ ...prev, lastName: undefined }));
                        }
                      }}
                      className="bg-transparent border-none outline-none text-sm w-full text-foreground placeholder-slate-400 dark:placeholder-slate-500"
                    />
                  </div>
                  <FieldError message={errors.lastName} />
                </div>
              </div>
            )}

            {/* Email field */}
            <div>
              <div
                className={`relative py-3 transition-colors flex items-center gap-3 border-b ${
                  hasEmailError
                    ? "border-red-500 dark:border-red-500"
                    : "border-slate-200 dark:border-border focus-within:border-blue-600 dark:focus-within:border-blue-400"
                }`}
              >
                <User
                  className={`w-5 h-5 flex-shrink-0 ${
                    hasEmailError
                      ? "text-red-500"
                      : "text-slate-400 dark:text-muted-foreground"
                  }`}
                  strokeWidth={2.5}
                />
                <input
                  id="login-email"
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  onBlur={handleEmailBlur}
                  aria-invalid={hasEmailError}
                  aria-describedby={
                    hasEmailError ? "login-email-error" : undefined
                  }
                  className="bg-transparent border-none outline-none text-sm w-full text-foreground placeholder-slate-400 dark:placeholder-slate-500"
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
                    : "border-slate-200 dark:border-border focus-within:border-blue-600 dark:focus-within:border-blue-400"
                }`}
              >
                <Lock
                  className={`w-5 h-5 flex-shrink-0 ${
                    hasPasswordError
                      ? "text-red-500"
                      : "text-slate-400 dark:text-muted-foreground"
                  }`}
                  strokeWidth={2.5}
                />
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  onBlur={handlePasswordBlur}
                  aria-invalid={hasPasswordError}
                  aria-describedby={
                    hasPasswordError ? "login-password-error" : undefined
                  }
                  className="bg-transparent border-none outline-none text-sm w-full text-foreground placeholder-slate-400 dark:placeholder-slate-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 dark:text-muted-foreground hover:text-primary dark:hover:text-blue-400"
                >
                  {showPassword ? <EyeOff className="w-[18px] h-[18px]" strokeWidth={2.5} /> : <Eye className="w-[18px] h-[18px]" strokeWidth={2.5} />}
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
              disabled={isLoading || !isFormValid}
              className={`h-12 w-full rounded-lg font-bold text-sm tracking-wide transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2 ${
                isFormValid && !isLoading
                  ? "bg-primary hover:bg-primary/90 text-white cursor-pointer shadow-blue-600/10"
                  : "bg-slate-100 dark:bg-secondary text-slate-400 dark:text-slate-600 cursor-not-allowed border border-transparent"
              }`}
            >
              {isLoading ? "PLEASE WAIT..." : isSignup ? "SIGN UP" : "LOGIN"}
            </button>

            {/* Inquiry & links */}
            <div className="flex flex-col gap-4 items-center justify-center text-xs mt-2">
              <button
                type="button"
                onClick={() => setIsSignup(!isSignup)}
                className="font-semibold text-primary hover:text-blue-500 transition-colors"
              >
                {isSignup
                  ? "Already have an account? Log in"
                  : "Need an account? Sign up"}
              </button>
              <a
                href="#"
                className="font-semibold text-slate-500 hover:text-primary transition-colors"
              >
                Forgot password?
              </a>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 dark:border-border text-primary focus:ring-blue-500 bg-slate-50 dark:bg-card"
                />
                <span className="text-slate-500 dark:text-muted-foreground font-medium">
                  Stay signed in for 30 days
                </span>
              </label>
            </div>
          </form>
        </div>

        {/* Bottom Status Panel */}
        {/* <div className="flex items-center gap-4 text-[10px] font-bold text-muted-foreground tracking-wider uppercase">
          <span className="inline-flex items-center gap-1.5 border border-slate-200/60 dark:border-border rounded-full px-3 py-1 bg-slate-50 dark:bg-secondary">
            <span className="w-1.5 h-1.5 bg-[#22c55e] dark:bg-green-500 rounded-full animate-pulse" />
            Systems Operational
          </span>
          <span className="text-slate-200 dark:text-[#1e3a5f]">|</span>
          <span>V4.2.0-STABLE</span>
        </div> */}
      </div>

      {/* RIGHT PANEL: Dynamic Carousel */}
      <div className="w-full md:w-1/2 relative flex flex-col justify-end p-8 sm:p-12 lg:p-16 overflow-hidden bg-[#020e24] dark:bg-slate-900">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={CAROUSEL_SLIDES[currentSlide].image}
              alt={CAROUSEL_SLIDES[currentSlide].title}
              className="w-full h-full object-cover"
            />
            {/* Dark gradient overlay for text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#020e24] via-[#020e24]/70 to-[#020e24]/20 dark:from-slate-900 dark:via-slate-900/70 dark:to-slate-900/20" />
          </motion.div>
        </AnimatePresence>

        {/* Content on top */}
        <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col gap-6">
          {/* SmartSort Brand Badge */}
          <div className="mb-4">
            <span className="bg-primary/90 backdrop-blur text-[10px] font-extrabold tracking-widest text-white px-2.5 py-1 rounded uppercase shadow-sm">
              SmartSort
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col gap-3 min-h-[140px]"
            >
              <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white drop-shadow-lg">
                {CAROUSEL_SLIDES[currentSlide].title}
              </h3>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium drop-shadow-md">
                {CAROUSEL_SLIDES[currentSlide].description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Dots Pagination */}
          <div className="flex gap-2 pt-2">
            {CAROUSEL_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  currentSlide === idx
                    ? "bg-white shadow-sm w-6"
                    : "bg-white/40 hover:bg-white/70 cursor-pointer"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
