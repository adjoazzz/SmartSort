import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useTheme } from "next-themes";
import imgHero from "../../assets/smartsort_hero.png";
import imgLaptopUi from "../../assets/smartsort_laptop_ui.png";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.companyName || !form.email) return;
    setSubmitted(true);
  };

  const scrollToInquiry = () => {
    document.getElementById("inquiry-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0b1c30] text-[#0b1c30] dark:text-white transition-colors duration-300 font-sans">
      
      {/* 1. Header Navbar */}
      <header className="h-20 bg-white/80 dark:bg-[#0b1c30]/80 backdrop-blur-md border-b border-[#e2e8f0]/50 dark:border-[#1e3a5f]/50 flex items-center justify-between px-6 sm:px-12 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-10">
          <span className="text-2xl font-extrabold text-[#121c28] dark:text-white tracking-tight">
            Smart<span className="text-[#006c49]">Sort</span>
          </span>
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#515f74] dark:text-[#cbd5e1]">
            <a href="#features" className="hover:text-[#006c49] dark:hover:text-[#6ffbbe] transition-colors">Features</a>
            <a href="#process" className="hover:text-[#006c49] dark:hover:text-[#6ffbbe] transition-colors">How It Operates</a>
            <a onClick={scrollToInquiry} className="hover:text-[#006c49] dark:hover:text-[#6ffbbe] transition-colors cursor-pointer">Inquiry</a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {/* Theme Toggle Button */}
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-[#515f74] dark:text-[#cbd5e1] hover:bg-slate-100 dark:hover:bg-[#0f2942] transition-colors cursor-pointer"
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
            className="px-5 py-2 text-sm font-bold text-[#515f74] dark:text-[#cbd5e1] hover:text-[#0b1c30] dark:hover:text-white transition-colors cursor-pointer"
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
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div>
            <span className="inline-flex items-center bg-[#2563eb]/10 dark:bg-[#2563eb]/20 text-[#2563eb] dark:text-[#60a5fa] text-[10px] font-bold tracking-widest px-4.5 py-1.5 rounded-full uppercase border border-[#2563eb]/20">
              ⚡ AI-Powered Waste Stewardship
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0b1c30] dark:text-white tracking-tight leading-[1.15]">
            The Future of <br />
            <span className="text-[#2563eb] bg-gradient-to-r from-[#2563eb] to-[#006c49] bg-clip-text text-transparent">Waste Intelligence</span>
          </h1>

          <p className="text-base sm:text-lg text-[#515f74] dark:text-[#cbd5e1] leading-relaxed font-normal">
            Automate your sorting logistics with AI-powered vision and real-time analytics. Scale efficiency and transparency across global supply chains.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button 
              onClick={scrollToInquiry}
              className="px-6 py-3.5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-bold rounded-lg shadow-lg shadow-[#2563eb]/15 transition-all active:scale-[0.98] flex items-center gap-2"
            >
              Request a Demo
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
            <button 
              onClick={scrollToInquiry}
              className="px-6 py-3.5 bg-white dark:bg-[#0b1c30] hover:bg-[#f8fafc] dark:hover:bg-[#0f2942] text-[#0b1c30] dark:text-white text-sm font-bold rounded-lg border border-[#e2e8f0] dark:border-[#1e3a5f] shadow-sm transition-all active:scale-[0.98] flex items-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#2563eb]">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              Watch Video
            </button>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-[#e2e8f0]/80 dark:border-[#1e3a5f]/50">
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
              <p className="text-xs font-bold text-[#0b1c30] dark:text-white">Trusted by 200+ Facilities</p>
              <p className="text-[10px] text-[#515f74] dark:text-[#cbd5e1] font-medium uppercase tracking-wider">Leading the industry in AI adoption</p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="lg:col-span-7 relative">
          {/* Card Border wrapper with blur glows */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#2563eb] to-[#006c49] opacity-20 blur-[60px] rounded-3xl" />
          <div className="relative rounded-2xl overflow-hidden border border-[#cbd5e1] dark:border-[#1e3a5f] shadow-2xl bg-[#0f172a]">
            <img 
              src={imgHero} 
              alt="Futuristic SmartSort Bin Conveyor Line" 
              className="w-full h-[320px] sm:h-[420px] object-cover opacity-95" 
            />
            {/* Live analysis overlay card */}
            <div className="absolute bottom-6 left-6 right-6 bg-[#0b1c30]/80 dark:bg-[#0b1c30]/90 backdrop-blur-md border border-white/10 dark:border-white/5 p-5 sm:p-6 rounded-xl text-white shadow-xl flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-widest text-[#94a3b8] uppercase">Real-Time Analysis</span>
                <span className="inline-flex items-center gap-1.5 bg-[#10b981]/20 text-[#10b981] text-[9px] font-extrabold tracking-widest px-2.5 py-1 rounded-full uppercase">
                  <span className="w-1.5 h-1.5 bg-[#10b981] rounded-full animate-ping" />
                  Live
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-3">
                <div className="flex flex-col">
                  <span className="text-2xl font-extrabold text-white">98.4%</span>
                  <span className="text-[9px] font-bold text-[#94a3b8] uppercase tracking-wider mt-0.5">Accuracy</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-extrabold text-white">1.2s</span>
                  <span className="text-[9px] font-bold text-[#94a3b8] uppercase tracking-wider mt-0.5">Latency</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-extrabold text-white">40T</span>
                  <span className="text-[9px] font-bold text-[#94a3b8] uppercase tracking-wider mt-0.5">Managed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Logo Cloud */}
      <section className="bg-slate-50 dark:bg-[#0f2942]/30 border-y border-[#e2e8f0]/60 dark:border-[#1e3a5f]/40 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-6 items-center">
          <span className="text-[10px] font-bold text-[#94a3b8] tracking-widest uppercase text-center">Empowering Industry Leaders</span>
          <div className="flex flex-wrap justify-center items-center gap-x-12 sm:gap-x-16 gap-y-6 text-sm font-black text-[#515f74] dark:text-[#cbd5e1] tracking-widest opacity-75">
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
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b1c30] dark:text-white tracking-tight">
            Advanced Logistics for a Circular Economy
          </h2>
          <p className="text-sm sm:text-base text-[#515f74] dark:text-[#cbd5e1] leading-relaxed">
            Our suite of tools eliminates human error and optimizes operational throughput.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1: 98% Sorting Accuracy */}
          <div className="md:col-span-8 bg-gradient-to-br from-[#eff6ff] to-[#f8fafc] dark:from-[#0b1c30] dark:to-[#0f2942] border border-[#cbd5e1]/60 dark:border-[#1e3a5f] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="flex-1 flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-4">
                <div className="w-10 h-10 bg-[#2563eb]/10 rounded-xl flex items-center justify-center text-[#2563eb]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                    <line x1="9" y1="3" x2="9" y2="21"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-bold">98% Sorting Accuracy</h3>
                <p className="text-xs text-[#515f74] dark:text-[#cbd5e1] leading-relaxed">
                  Our deep learning models are trained on over 50 million labeled waste instances, ensuring near-perfect material identification.
                </p>
              </div>
              <a onClick={scrollToInquiry} className="text-xs font-bold text-[#2563eb] hover:underline cursor-pointer flex items-center gap-1">
                Explore Data Models →
              </a>
            </div>
            <div className="flex-1 -mb-10 -mr-6 sm:-mr-12 rounded-tl-xl overflow-hidden border-t border-l border-[#cbd5e1] dark:border-[#1e3a5f]">
              <img src={imgLaptopUi} alt="Dashboard Interface Preview" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Card 2: Real-time Monitoring */}
          <div className="md:col-span-4 bg-gradient-to-br from-[#8b5cf6] to-[#6d28d9] rounded-2xl p-6 sm:p-8 text-white flex flex-col justify-between gap-12 shadow-md hover:shadow-lg transition-shadow">
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
          </div>

          {/* Card 3: Seamless Integration */}
          <div className="md:col-span-4 bg-[#0b1c30] text-white border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between gap-10 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-[#3b82f6]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="2" y="2" width="20" height="20" rx="2" ry="2"></rect>
                <path d="M7 2v20M17 2v20M2 7h20M2 17h20"></path>
              </svg>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-bold">Seamless Integration</h3>
              <p className="text-xs text-[#94a3b8] leading-relaxed">
                Our SDK connects directly with existing SCADA systems and industrial PLCs without infrastructure overhaul.
              </p>
            </div>
          </div>

          {/* Card 4: ESG Compliance Ready */}
          <div className="md:col-span-8 bg-[#eff6ff] dark:bg-[#1e293b]/50 border border-[#cbd5e1]/60 dark:border-[#1e3a5f] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 hover:shadow-md transition-shadow">
            <div className="flex-1 flex flex-col gap-4">
              <h3 className="text-xl font-bold">ESG Compliance Ready</h3>
              <p className="text-xs text-[#515f74] dark:text-[#cbd5e1] leading-relaxed">
                Automatically generate certified reports for environmental audits and carbon credit verification.
              </p>
            </div>
            {/* Visual representation of ESG scores */}
            <div className="flex-1 w-full max-w-[280px] bg-white dark:bg-[#0b1c30] border border-[#cbd5e1]/50 dark:border-white/5 rounded-xl p-4.5 flex flex-col gap-3">
              {[
                { label: "ENVIRONMENTAL SCORE", value: 92, color: "bg-[#10b981]" },
                { label: "SOCIAL RESPONSIBILITY", value: 84, color: "bg-[#2563eb]" },
                { label: "COMPLIANCE LEVEL", value: 95, color: "bg-[#8b5cf6]" }
              ].map(stat => (
                <div key={stat.label} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-[8px] font-bold tracking-wider text-[#94a3b8]">
                    <span>{stat.label}</span>
                    <span>{stat.value}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full ${stat.color} rounded-full`} style={{ width: `${stat.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 5. How SmartSort Operates Section */}
      <section id="process" className="bg-[#eff6ff]/50 dark:bg-[#0f2942]/10 border-y border-[#cbd5e1]/40 dark:border-[#1e3a5f]/40 py-20 sm:py-28 px-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          <div className="text-center flex flex-col gap-3 max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b1c30] dark:text-white tracking-tight">
              How SmartSort Operates
            </h2>
            <p className="text-sm text-[#515f74] dark:text-[#cbd5e1] leading-relaxed">
              A sophisticated pipeline from raw sensor data to optimized industrial sorting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-white dark:bg-[#0b1c30] border border-[#cbd5e1] dark:border-[#1e3a5f] shadow-sm flex items-center justify-center text-[#2563eb]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                  <circle cx="12" cy="13" r="4"></circle>
                </svg>
              </div>
              <div className="w-6 h-6 rounded-full bg-[#2563eb] text-white text-xs font-bold flex items-center justify-center">1</div>
              <h3 className="text-lg font-bold">Object Detection</h3>
              <p className="text-xs text-[#515f74] dark:text-[#cbd5e1] max-w-xs leading-relaxed">
                High-speed multispectral cameras identify individual waste items on the conveyor belt in milliseconds.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-white dark:bg-[#0b1c30] border border-[#cbd5e1] dark:border-[#1e3a5f] shadow-sm flex items-center justify-center text-[#10b981]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 2 7 12 12 22 7 12 2 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
              </div>
              <div className="w-6 h-6 rounded-full bg-[#10b981] text-white text-xs font-bold flex items-center justify-center">2</div>
              <h3 className="text-lg font-bold">AI Classification</h3>
              <p className="text-xs text-[#515f74] dark:text-[#cbd5e1] max-w-xs leading-relaxed">
                Our neural network classifies materials (HDPE, PET, Paper, Metal) with laboratory-grade precision.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-white dark:bg-[#0b1c30] border border-[#cbd5e1] dark:border-[#1e3a5f] shadow-sm flex items-center justify-center text-[#8b5cf6]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              <div className="w-6 h-6 rounded-full bg-[#8b5cf6] text-white text-xs font-bold flex items-center justify-center">3</div>
              <h3 className="text-lg font-bold">Automated Sorting</h3>
              <p className="text-xs text-[#515f74] dark:text-[#cbd5e1] max-w-xs leading-relaxed">
                Robotic actuators or air-jet systems execute precise physical separation at speeds up to 300 items per minute.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA / Inquiry Form Section */}
      <section id="inquiry-section" className="px-6 sm:px-12 py-20 sm:py-28 max-w-7xl mx-auto">
        <div className="bg-[#0b1c30] text-white border border-white/10 rounded-3xl p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative overflow-hidden shadow-2xl">
          <div className="absolute w-80 h-80 bg-[#2563eb]/20 rounded-full blur-[100px] -bottom-20 -left-20 pointer-events-none" />

          {/* Left Column */}
          <div className="flex flex-col gap-6 relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Ready to optimize your facility?
            </h2>
            <p className="text-[#94a3b8] text-sm sm:text-base leading-relaxed font-light">
              Join the world's most advanced sorting facilities. Contact our solutions engineering team for a custom feasibility study.
            </p>
            <div className="flex flex-col gap-3 pt-2 text-xs sm:text-sm font-medium text-[#cbd5e1]">
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
          <div className="bg-white text-[#0b1c30] rounded-2xl p-6 sm:p-8 border border-[#cbd5e1] shadow-xl relative z-10">
            {submitted ? (
              <div className="py-12 flex flex-col items-center justify-center text-center gap-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-[#10b981]/15 flex items-center justify-center text-[#10b981]">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Request Received</h3>
                <p className="text-xs text-[#515f74] max-w-xs leading-relaxed">
                  Thank you! Our solutions engineering team will review your info and contact you at <span className="font-semibold">{form.email}</span> within 12 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h3 className="text-lg font-bold border-b border-[#e2e8f0] pb-3">Inquiry Form</h3>
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-[#515f74] uppercase tracking-wider">Company Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Global Logistics Inc." 
                    value={form.companyName}
                    onChange={e => setForm({...form, companyName: e.target.value})}
                    className="h-11 px-4 border border-[#cbd5e1] rounded-lg text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb] transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-[#515f74] uppercase tracking-wider">Facility Tons Output (Tons/M)</label>
                  <select 
                    value={form.tonsRange}
                    onChange={e => setForm({...form, tonsRange: e.target.value})}
                    className="h-11 px-4 border border-[#cbd5e1] rounded-lg text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb] transition-all cursor-pointer"
                  >
                    <option value="Less than 50">Less than 50 Tons</option>
                    <option value="50 - 200">50 - 200 Tons</option>
                    <option value="200 - 500">200 - 500 Tons</option>
                    <option value="500+">500+ Tons</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-[#515f74] uppercase tracking-wider">Business Email</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="manager@company.com" 
                    value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})}
                    className="h-11 px-4 border border-[#cbd5e1] rounded-lg text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb] transition-all"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full h-11 bg-[#2563eb] hover:bg-[#1d4ed8] active:scale-[0.98] text-white text-sm font-bold tracking-wide rounded-lg transition-all shadow-md mt-2"
                >
                  Send Request
                </button>
                <p className="text-[10px] text-center text-[#94a3b8] font-medium mt-1">Response within 12 business hours.</p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="bg-slate-50 dark:bg-[#0b1c30]/40 border-t border-[#e2e8f0] dark:border-[#1e3a5f] py-16 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          
          <div className="grid grid-cols-1 md:grid-cols-6 gap-10">
            {/* Branding Column */}
            <div className="md:col-span-2 flex flex-col gap-4">
              <span className="text-xl font-extrabold text-[#121c28] dark:text-white tracking-tight">
                Smart<span className="text-[#006c49]">Sort</span>
              </span>
              <p className="text-xs text-[#515f74] dark:text-[#cbd5e1] leading-relaxed">
                Redefining the industrial waste landscape through artificial intelligence and automated robotics. Built for a sustainable, data-driven future.
              </p>
              {/* Small Social Icons Mock */}
              <div className="flex gap-4.5 pt-2 text-[#94a3b8]">
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
                <span className="text-xs font-bold text-[#0b1c30] dark:text-white uppercase tracking-wider">{col.title}</span>
                <ul className="flex flex-col gap-2.5 text-xs text-[#515f74] dark:text-[#cbd5e1]">
                  {col.items.map(item => (
                    <li key={item}>
                      <a href="#" className="hover:text-[#2563eb] transition-colors">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-[#e2e8f0] dark:border-[#1e3a5f] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#94a3b8]">&copy; 2026 SmartSort Intelligence Systems. All rights reserved.</p>
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
