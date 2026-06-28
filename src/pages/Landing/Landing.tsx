import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { useTheme } from "next-themes";
import { motion } from "motion/react";
import emailjs from "@emailjs/browser";
import imgHero from "../../assets/smartsort_hero.png";
import imgLaptopUi from "../../assets/smartsort_laptop_ui.png";

// --- Environment Variables ---
const API_BASE_URL =
  (import.meta as any).env?.VITE_API_BASE_URL ?? "http://localhost:5000";
const EMAILJS_SERVICE_ID: string =
  (import.meta as any).env?.VITE_EMAILJS_SERVICE_ID ?? "";
const EMAILJS_TEMPLATE_ID: string =
  (import.meta as any).env?.VITE_EMAILJS_TEMPLATE_ID ?? "";
const EMAILJS_PUBLIC_KEY: string =
  (import.meta as any).env?.VITE_EMAILJS_PUBLIC_KEY ?? "";
const LOGIN_URL: string =
  (import.meta as any).env?.VITE_LOGIN_URL ?? "http://localhost:5173/login";

// --- Inquiry Validation Helpers ---
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateCompanyName(value: string): string | undefined {
  if (!value.trim()) return "Company name is required";
  if (value.trim().length < 3) return "Company name must be at least 3 characters";
  return undefined;
}

function validateEmail(value: string): string | undefined {
  if (!value.trim()) return "Business email is required";
  if (!EMAIL_REGEX.test(value)) return "Please enter a valid business email address";
  return undefined;
}

/** Generates a secure-looking temporary password */
function generateTempPassword(length = 12): string {
  const upper = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const lower = "abcdefghjkmnpqrstuvwxyz";
  const digits = "23456789";
  const special = "!@#$%&*";
  const all = upper + lower + digits + special;

  let pwd =
    upper[Math.floor(Math.random() * upper.length)] +
    lower[Math.floor(Math.random() * lower.length)] +
    digits[Math.floor(Math.random() * digits.length)] +
    special[Math.floor(Math.random() * special.length)];

  for (let i = 4; i < length; i++) {
    pwd += all[Math.floor(Math.random() * all.length)];
  }

  return pwd
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p
      className="text-[11px] font-semibold mt-1 flex items-center gap-1"
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

const shakeKeyframes = `
@keyframes inquiry-shake {
  0%, 100% { transform: translateX(0); }
  10%, 50%, 90% { transform: translateX(-4px); }
  30%, 70% { transform: translateX(4px); }
}
`;

/**
 * SmartSort Landing Page Component
 * Renders a high-tech public landing page with features, operations, and inquiries.
 */
export default function Landing() {
  const navigate = useNavigate();
  const { resolvedTheme, setTheme } = useTheme();
  
  // Inquiry Form State
  const [form, setForm] = useState({
    companyName: "",
    tonsRange: "Less than 50",
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Inquiry Validation State
  const [errors, setErrors] = useState<{ companyName?: string; email?: string }>({});
  const [touched, setTouched] = useState<{ companyName?: boolean; email?: boolean }>({});
  const [shaking, setShaking] = useState(false);

  // Initialize EmailJS once
  useEffect(() => {
    console.log("[EmailJS] PUBLIC_KEY loaded:", EMAILJS_PUBLIC_KEY ? "YES (" + EMAILJS_PUBLIC_KEY.slice(0, 4) + "...)" : "MISSING");
    console.log("[EmailJS] SERVICE_ID:", EMAILJS_SERVICE_ID || "MISSING");
    console.log("[EmailJS] TEMPLATE_ID:", EMAILJS_TEMPLATE_ID || "MISSING");
    if (EMAILJS_PUBLIC_KEY) {
      emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
      console.log("[EmailJS] init() called ✓");
    }
  }, []);

  // Auto-reset form after 10s on submission
  useEffect(() => {
    if (!submitted) return;
    const timer = setTimeout(() => {
      setSubmitted(false);
      setForm({ companyName: "", tonsRange: "Less than 50", email: "" });
      setErrors({});
      setTouched({});
      setStatus("idle");
      setErrorMessage("");
    }, 10000);
    return () => clearTimeout(timer);
  }, [submitted]);

  const handleCompanyNameChange = (value: string) => {
    setForm(prev => ({ ...prev, companyName: value }));
    if (touched.companyName) {
      setErrors(prev => ({ ...prev, companyName: validateCompanyName(value) }));
    }
  };

  const handleEmailChange = (value: string) => {
    setForm(prev => ({ ...prev, email: value }));
    if (touched.email) {
      setErrors(prev => ({ ...prev, email: validateEmail(value) }));
    }
  };

  const handleCompanyNameBlur = () => {
    setTouched(prev => ({ ...prev, companyName: true }));
    setErrors(prev => ({ ...prev, companyName: validateCompanyName(form.companyName) }));
  };

  const handleEmailBlur = () => {
    setTouched(prev => ({ ...prev, email: true }));
    setErrors(prev => ({ ...prev, email: validateEmail(form.email) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const companyErr = validateCompanyName(form.companyName);
    const emailErr = validateEmail(form.email);
    
    setErrors({ companyName: companyErr, email: emailErr });
    setTouched({ companyName: true, email: true });
    
    if (companyErr || emailErr) {
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
      return;
    }
    
    setStatus("sending");
    setErrorMessage("");

    try {
      // 1. Create the user in the database (as MANAGER role for facility owners)
      const response = await fetch(`${API_BASE_URL}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.companyName,
          email: form.email,
          role: "MANAGER",
          status: "PENDING",
          assignedFacility: form.tonsRange,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create user account");
      }

      // 2. Generate a temporary password
      const tempPassword = generateTempPassword();

      // 3. Send the invite email via EmailJS
      const emailResult = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          collector_email: form.email,
          temp_password: tempPassword,
          invite_link: LOGIN_URL,
        }
      );
      console.log("[EmailJS] send result:", emailResult);

      setStatus("success");
      setSubmitted(true);
    } catch (error: any) {
      console.error("[SmartSort] inquiry error:", error);

      const isDbError =
        typeof error?.message === "string" &&
        error.message.toLowerCase().includes("user");

      const emailjsStatus =
        error && typeof error === "object" && "status" in error
          ? `EmailJS ${error.status}: ${error.text}`
          : null;

      setStatus("error");
      setErrorMessage(
        isDbError
          ? "Could not create account. Please try again."
          : emailjsStatus
            ? `Email failed — ${emailjsStatus}. Check your EmailJS template's "To Email" field.`
            : "Account created but the invite email failed to send. Check your EmailJS config."
      );
    }
  };

  const scrollToInquiry = () => {
    document.getElementById("inquiry-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background dark:bg-card text-foreground dark:text-white transition-colors duration-300 font-sans">
      <style>{shakeKeyframes}</style>
      
      {/* 1. Header Navbar */}
      <header className="h-20 bg-white/80 dark:bg-card/80 backdrop-blur-md border-b border-border/50 dark:border-border/50 flex items-center justify-between px-6 sm:px-12 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-10">
          <span className="text-2xl font-extrabold text-[#121c28] dark:text-white tracking-tight">
            Smart<span className="text-[#006c49]">Sort</span>
          </span>
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-muted-foreground">
            <a href="#features" className="hover:text-[#006c49] dark:hover:text-[#6ffbbe] transition-colors">Features</a>
            <a href="#process" className="hover:text-[#006c49] dark:hover:text-[#6ffbbe] transition-colors">How It Operates</a>
            <a onClick={scrollToInquiry} className="hover:text-[#006c49] dark:hover:text-[#6ffbbe] transition-colors cursor-pointer">Inquiry</a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {/* Theme Toggle Button */}
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-muted-foreground hover:bg-slate-100 dark:hover:bg-secondary transition-colors cursor-pointer"
            aria-label="Toggle Theme"
          >
            {resolvedTheme === "dark" ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>

          <button 
            onClick={() => navigate("/login")}
            className="px-5 py-2 text-sm font-bold text-muted-foreground hover:text-foreground dark:hover:text-white transition-colors cursor-pointer"
          >
            Log In
          </button>
          <button 
            onClick={scrollToInquiry}
            className="px-5 py-2.5 bg-[#006c49] hover:bg-[#005a3c] text-white text-sm font-bold rounded-lg shadow-md transition-all active:scale-[0.98] cursor-pointer"
          >
            Request a Demo
          </button>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="px-6 sm:px-12 py-16 sm:py-24 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Side */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col gap-6"
        >
          <div>
            <span className="inline-flex items-center bg-[#2563eb]/10 dark:bg-[#2563eb]/20 text-[#2563eb] dark:text-[#60a5fa] text-[10px] font-bold tracking-widest px-4.5 py-1.5 rounded-full uppercase border border-[#2563eb]/20">
              ⚡ AI-Powered Waste Stewardship
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground dark:text-white tracking-tight leading-[1.15]">
            The Future of <br />
            <span className="text-[#2563eb] bg-gradient-to-r from-[#2563eb] to-[#006c49] bg-clip-text text-transparent">Waste Intelligence</span>
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-normal">
            Automate your sorting logistics with AI-powered vision and real-time analytics. Scale efficiency and transparency across global supply chains.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <motion.button 
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
              onClick={scrollToInquiry}
              className="px-6 py-3.5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-bold rounded-lg shadow-lg shadow-[#2563eb]/15 transition-all flex items-center gap-2 cursor-pointer"
            >
              Request a Demo
              <motion.svg 
                variants={{
                  hover: { x: 4 }
                }}
                transition={{ duration: 0.2 }}
                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </motion.svg>
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToInquiry}
              className="px-6 py-3.5 bg-card hover:bg-background dark:hover:bg-secondary text-foreground dark:text-white text-sm font-bold rounded-lg border border-border shadow-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#2563eb]">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              Watch Video
            </motion.button>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-border/80 dark:border-border/50">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-300 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100" alt="Client 1" className="object-cover w-full h-full" />
              </div>
              <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-400 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100" alt="Client 2" className="object-cover w-full h-full" />
              </div>
              <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-500 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100" alt="Client 3" className="object-cover w-full h-full" />
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-foreground dark:text-white">Trusted by 200+ Facilities</p>
              <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Leading the industry in AI adoption</p>
            </div>
          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 relative"
        >
          {/* Card Border wrapper with blur glows */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#2563eb] to-[#006c49] opacity-20 blur-[60px] rounded-3xl" />
          <div className="relative rounded-2xl overflow-hidden border border-[#cbd5e1] dark:border-border shadow-2xl bg-[#0f172a]">
            <img 
              src={imgHero} 
              alt="Futuristic SmartSort Bin Conveyor Line" 
              className="w-full h-[320px] sm:h-[420px] object-cover opacity-95" 
            />
            {/* Live analysis overlay card */}
            <div className="absolute bottom-6 left-6 right-6 bg-card/80 dark:bg-card/90 backdrop-blur-md border border-border/60 dark:border-white/5 p-5 sm:p-6 rounded-xl text-foreground dark:text-white shadow-xl flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Real-Time Analysis</span>
                <span className="inline-flex items-center gap-1.5 bg-[#10b981]/20 text-[#10b981] text-[9px] font-extrabold tracking-widest px-2.5 py-1 rounded-full uppercase">
                  <span className="w-1.5 h-1.5 bg-[#10b981] rounded-full animate-ping" />
                  Live
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 border-t border-border/60 dark:border-white/10 pt-3">
                <div className="flex flex-col">
                  <span className="text-2xl font-extrabold text-foreground dark:text-white">98.4%</span>
                  <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider mt-0.5">Accuracy</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-extrabold text-foreground dark:text-white">1.2s</span>
                  <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider mt-0.5">Latency</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-extrabold text-foreground dark:text-white">40T</span>
                  <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider mt-0.5">Managed</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. Logo Cloud */}
      <section className="bg-slate-50 dark:bg-secondary/30 border-y border-border/60 dark:border-border/40 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-6 items-center">
          <span className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase text-center">Empowering Industry Leaders</span>
          <div className="flex flex-wrap justify-center items-center gap-x-12 sm:gap-x-16 gap-y-6 text-sm font-black text-muted-foreground tracking-widest opacity-75">
            <span>WASTE-X</span>
            <span>GLOBAL ECO</span>
            <span>PURE FLOW</span>
            <span>CLEAN GRID</span>
            <span>VERTIRA</span>
          </div>
        </div>
      </section>

      {/* 4. Features Section */}
      <section id="features" className="px-6 sm:px-12 py-20 sm:py-28 max-w-7xl mx-auto flex flex-col gap-12">
        <div className="text-center flex flex-col gap-3 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground dark:text-white tracking-tight">
            Advanced Logistics for a Circular Economy
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Our suite of tools eliminates human error and optimizes operational throughput.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1: 98% Sorting Accuracy */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            whileHover={{ y: -4, boxShadow: "0 10px 30px -10px rgba(37,99,235,0.15)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-8 bg-gradient-to-br from-[#eff6ff] to-[#f8fafc] dark:from-[#0b1c30] dark:to-[#0f2942] border border-[#cbd5e1]/60 dark:border-border rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 overflow-hidden shadow-sm hover:shadow-md cursor-pointer"
          >
            <div className="flex-1 flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-4">
                <div className="w-10 h-10 bg-[#2563eb]/10 rounded-xl flex items-center justify-center text-[#2563eb]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                    <line x1="9" y1="3" x2="9" y2="21"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-bold">98% Sorting Accuracy</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Our deep learning models are trained on over 50 million labeled waste instances, ensuring near-perfect material identification.
                </p>
              </div>
              <a onClick={scrollToInquiry} className="text-xs font-bold text-[#2563eb] hover:underline cursor-pointer flex items-center gap-1">
                Explore Data Models →
              </a>
            </div>
            <div className="flex-1 -mb-10 -mr-6 sm:-mr-12 rounded-tl-xl overflow-hidden border-t border-l border-[#cbd5e1] dark:border-border">
              <img src={imgLaptopUi} alt="Dashboard Interface Preview" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          {/* Card 2: Real-time Monitoring */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            whileHover={{ y: -4, boxShadow: "0 10px 30px -10px rgba(139,92,246,0.2)" }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-4 bg-gradient-to-br from-[#8b5cf6] to-[#6d28d9] rounded-2xl p-6 sm:p-8 text-white flex flex-col justify-between gap-12 shadow-md hover:shadow-lg cursor-pointer"
          >
            <div className="flex flex-col gap-4">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </div>
              <h3 className="text-xl font-bold">Real-Time Monitoring</h3>
              <p className="text-xs text-white/80 leading-relaxed">
                Latency-free streaming of sorting sensor status at all your facilities via a unified dashboard.
              </p>
            </div>
            <div className="flex items-end justify-between border-t border-white/25 pt-4">
              <span className="text-4xl font-extrabold tracking-tight">24/7</span>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-60">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
          </motion.div>

          {/* Card 3: Seamless Integration */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            whileHover={{ y: -4, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-4 bg-card text-foreground dark:text-white border border-[#cbd5e1]/60 dark:border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between gap-10 hover:shadow-md cursor-pointer"
          >
            <div className="w-10 h-10 bg-[#3b82f6]/10 dark:bg-white/10 rounded-xl flex items-center justify-center text-[#3b82f6]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="2" y="2" width="20" height="20" rx="2" ry="2"></rect>
                <path d="M7 2v20M17 2v20M2 7h20M2 17h20"></path>
              </svg>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-bold">Seamless Integration</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Our SDK connects directly with existing SCADA systems and industrial PLCs without infrastructure overhaul.
              </p>
            </div>
          </motion.div>

          {/* Card 4: ESG Compliance Ready */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            whileHover={{ y: -4, boxShadow: "0 10px 30px -10px rgba(37,99,235,0.1)" }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-8 bg-[#eff6ff] dark:bg-[#1e293b]/50 border border-[#cbd5e1]/60 dark:border-border rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 hover:shadow-md cursor-pointer"
          >
            <div className="flex-1 flex flex-col gap-4">
              <h3 className="text-xl font-bold">ESG Compliance Ready</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Automatically generate certified reports for environmental audits and carbon credit verification.
              </p>
            </div>
            {/* Visual representation of ESG scores */}
            <div className="flex-1 w-full max-w-[280px] bg-card border border-[#cbd5e1]/50 dark:border-white/5 rounded-xl p-4.5 flex flex-col gap-3">
              {[
                { label: "ENVIRONMENTAL SCORE", value: 92, color: "bg-[#10b981]" },
                { label: "SOCIAL RESPONSIBILITY", value: 84, color: "bg-[#2563eb]" },
                { label: "COMPLIANCE LEVEL", value: 95, color: "bg-[#8b5cf6]" }
              ].map(stat => (
                <div key={stat.label} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-[8px] font-bold tracking-wider text-muted-foreground">
                    <span>{stat.label}</span>
                    <span>{stat.value}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${stat.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                      className={`h-full ${stat.color} rounded-full`} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* 5. How SmartSort Operates Section */}
      <section id="process" className="bg-[#eff6ff]/50 dark:bg-secondary/10 border-y border-[#cbd5e1]/40 dark:border-border/40 py-20 sm:py-28 px-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          <div className="text-center flex flex-col gap-3 max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground dark:text-white tracking-tight">
              How SmartSort Operates
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A sophisticated pipeline from raw sensor data to optimized industrial sorting.
            </p>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-10 relative"
          >
            {/* Step 1 */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
              }}
              className="flex flex-col items-center text-center gap-5"
            >
              <div className="w-16 h-16 rounded-2xl bg-card border border-[#cbd5e1] dark:border-border shadow-sm flex items-center justify-center text-[#2563eb]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                  <circle cx="12" cy="13" r="4"></circle>
                </svg>
              </div>
              <div className="w-6 h-6 rounded-full bg-[#2563eb] text-white text-xs font-bold flex items-center justify-center">1</div>
              <h3 className="text-lg font-bold">Object Detection</h3>
              <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
                High-speed multispectral cameras identify individual waste items on the conveyor belt in milliseconds.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
              }}
              className="flex flex-col items-center text-center gap-5"
            >
              <div className="w-16 h-16 rounded-2xl bg-card border border-[#cbd5e1] dark:border-border shadow-sm flex items-center justify-center text-[#10b981]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 2 7 12 12 22 7 12 2 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
              </div>
              <div className="w-6 h-6 rounded-full bg-[#10b981] text-white text-xs font-bold flex items-center justify-center">2</div>
              <h3 className="text-lg font-bold">AI Classification</h3>
              <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
                Our neural network classifies materials (HDPE, PET, Paper, Metal) with laboratory-grade precision.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
              }}
              className="flex flex-col items-center text-center gap-5"
            >
              <div className="w-16 h-16 rounded-2xl bg-card border border-[#cbd5e1] dark:border-border shadow-sm flex items-center justify-center text-[#8b5cf6]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              <div className="w-6 h-6 rounded-full bg-[#8b5cf6] text-white text-xs font-bold flex items-center justify-center">3</div>
              <h3 className="text-lg font-bold">Automated Sorting</h3>
              <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
                Robotic actuators or air-jet systems execute precise physical separation at speeds up to 300 items per minute.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 6. CTA / Inquiry Form Section */}
      <section id="inquiry-section" className="px-6 sm:px-12 py-20 sm:py-28 max-w-7xl mx-auto">
        <div className="bg-card text-white border border-white/10 rounded-3xl p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative overflow-hidden shadow-2xl">
          <div className="absolute w-80 h-80 bg-[#2563eb]/20 rounded-full blur-[100px] -bottom-20 -left-20 pointer-events-none" />

          {/* Left Column */}
          <div className="flex flex-col gap-6 relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Ready to optimize your facility?
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed font-light">
              Join the world's most advanced sorting facilities. Contact our solutions engineering team for a custom feasibility study.
            </p>
            <div className="flex flex-col gap-3 pt-2 text-xs sm:text-sm font-medium text-muted-foreground">
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-[#10b981]/25 border border-[#10b981]/30 flex items-center justify-center text-[#10b981]">✓</span>
                <span>On-site feasibility assessment</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-[#10b981]/25 border border-[#10b981]/30 flex items-center justify-center text-[#10b981]">✓</span>
                <span>Custom ROI projection reports</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-[#10b981]/25 border border-[#10b981]/30 flex items-center justify-center text-[#10b981]">✓</span>
                <span>Full stack hardware/software lease options</span>
              </div>
            </div>
          </div>

          {/* Right Column (Inquiry Form Card) */}
          <div className="bg-white dark:bg-card text-foreground dark:text-white rounded-2xl p-6 sm:p-8 border border-[#cbd5e1] dark:border-border shadow-xl relative z-10">
            {submitted ? (
              <div className="py-12 flex flex-col items-center justify-center text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#10b981]/15 flex items-center justify-center text-[#10b981]">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Welcome to SmartSort!</h3>
                <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
                  Check your email at <span className="font-semibold">{form.email}</span> for your login credentials and portal access link.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-5"
                style={shaking ? { animation: "inquiry-shake 0.4s ease-in-out" } : undefined}
              >
                <h3 className="text-lg font-bold border-b border-border pb-3">Inquiry Form</h3>
                
                <div className="flex flex-col gap-1.5">
                  <label
                    className={`text-[10px] font-bold uppercase tracking-wider ${
                      errors.companyName ? "text-red-500" : "text-muted-foreground"
                    }`}
                  >
                    Company Name
                  </label>
                  <input 
                    type="text" 
                    placeholder="Global Logistics Inc." 
                    value={form.companyName}
                    onChange={e => handleCompanyNameChange(e.target.value)}
                    onBlur={handleCompanyNameBlur}
                    className={`h-11 px-4 border rounded-lg text-sm bg-slate-50 dark:bg-secondary focus:outline-none focus:ring-2 transition-all ${
                      errors.companyName
                        ? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
                        : "border-[#cbd5e1] dark:border-border focus:ring-[#2563eb]/20 focus:border-[#2563eb]"
                    }`}
                  />
                  <FieldError message={errors.companyName} />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Facility Tons Output (Tons/M)</label>
                  <select 
                    value={form.tonsRange}
                    onChange={e => setForm({...form, tonsRange: e.target.value})}
                    className="h-11 px-4 border border-[#cbd5e1] dark:border-border rounded-lg text-sm bg-slate-50 dark:bg-secondary focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb] transition-all cursor-pointer"
                  >
                    <option value="Less than 50">Less than 50 Tons</option>
                    <option value="50 - 200">50 - 200 Tons</option>
                    <option value="200 - 500">200 - 500 Tons</option>
                    <option value="500+">500+ Tons</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    className={`text-[10px] font-bold uppercase tracking-wider ${
                      errors.email ? "text-red-500" : "text-muted-foreground"
                    }`}
                  >
                    Business Email
                  </label>
                  <input 
                    type="email" 
                    placeholder="manager@company.com" 
                    value={form.email}
                    onChange={e => handleEmailChange(e.target.value)}
                    onBlur={handleEmailBlur}
                    className={`h-11 px-4 border rounded-lg text-sm bg-slate-50 dark:bg-secondary focus:outline-none focus:ring-2 transition-all ${
                      errors.email
                        ? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
                        : "border-[#cbd5e1] dark:border-border focus:ring-[#2563eb]/20 focus:border-[#2563eb]"
                    }`}
                  />
                  <FieldError message={errors.email} />
                </div>

                <button 
                  type="submit"
                  disabled={
                    form.companyName.trim() === "" ||
                    form.email.trim() === "" ||
                    !!errors.companyName ||
                    !!errors.email ||
                    status === "sending"
                  }
                  className={`w-full h-11 text-sm font-bold tracking-wide rounded-lg transition-all shadow-md mt-2 flex items-center justify-center gap-2 ${
                    status === "sending"
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                      : form.companyName.trim() !== "" &&
                        form.email.trim() !== "" &&
                        !errors.companyName &&
                        !errors.email
                        ? "bg-[#2563eb] hover:bg-[#1d4ed8] text-white active:scale-[0.98] cursor-pointer"
                        : "bg-slate-100 text-slate-400 border border-transparent cursor-not-allowed"
                  }`}
                >
                  {status === "sending" ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 2a10 10 0 0 1 0 20"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Send Request"
                  )}
                </button>
                {status === "error" && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-xs text-red-700 font-medium">{errorMessage}</p>
                  </div>
                )}
                <p className="text-[10px] text-center text-muted-foreground font-medium mt-1">Response within 12 business hours.</p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="bg-slate-50 dark:bg-card/40 border-t border-border py-16 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          
          <div className="grid grid-cols-1 md:grid-cols-6 gap-10">
            {/* Branding Column */}
            <div className="md:col-span-2 flex flex-col gap-4">
              <span className="text-xl font-extrabold text-[#121c28] dark:text-white tracking-tight">
                Smart<span className="text-[#006c49]">Sort</span>
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Redefining the industrial waste landscape through artificial intelligence and automated robotics. Built for a sustainable, data-driven future.
              </p>
              {/* Small Social Icons Mock */}
              <div className="flex gap-4.5 pt-2 text-muted-foreground">
                <span className="w-5 h-5 rounded bg-slate-200 dark:bg-[#1e3a5f] flex items-center justify-center font-bold text-xs cursor-pointer hover:text-[#2563eb]">𝕏</span>
                <span className="w-5 h-5 rounded bg-slate-200 dark:bg-[#1e3a5f] flex items-center justify-center font-bold text-xs cursor-pointer hover:text-[#2563eb]">in</span>
                <span className="w-5 h-5 rounded bg-slate-200 dark:bg-[#1e3a5f] flex items-center justify-center font-bold text-xs cursor-pointer hover:text-[#2563eb]">f</span>
              </div>
            </div>

            {/* Links Columns */}
            {[
              { title: "Product", items: ["Consultancy", "AI Models", "Hardware Kit", "Dashboard"] },
              { title: "Company", items: ["About Us", "Sustainability", "Careers", "Press Kit"] },
              { title: "Resources", items: ["Documentation", "API Reference", "Help Center", "Case Studies"] },
              { title: "Legal", items: ["Privacy Policy", "Terms of Use", "Ethics", "Security"] }
            ].map(col => (
              <div key={col.title} className="flex flex-col gap-4">
                <span className="text-xs font-bold text-foreground dark:text-white uppercase tracking-wider">{col.title}</span>
                <ul className="flex flex-col gap-2.5 text-xs text-muted-foreground">
                  {col.items.map(item => (
                    <li key={item}>
                      <a href="#" className="hover:text-[#2563eb] transition-colors">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">&copy; 2026 SmartSort Intelligence Systems. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#22c55e] rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-[#22c55e] uppercase tracking-wide">All Systems Operational</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
