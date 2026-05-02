import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { StepDots } from "../../components/StepDots";
import { SelectField } from "../../components/SelectField";
import { InputField } from "../../components/InputField";

/**
 * Renders a marketing feature card displaying a key benefit of the platform.
 * Used on the left side of the onboarding screen.
 * 
 * @param {Object} props - Component props.
 * @param {string} props.iconBg - The background color of the icon container.
 * @param {string} props.iconColor - The color of the icon.
 * @param {string} props.title - The title of the feature.
 * @param {string} props.description - A brief description of the feature.
 * @param {React.ReactNode} props.icon - The SVG icon component to render.
 */
function FeatureCard({ iconBg, iconColor, title, description, icon }: any) {
  return (
    <div className="bg-white dark:bg-[#0b1c30] border border-[#e2e8f0] dark:border-[#1e3a5f] rounded-xl p-4">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
        style={{ background: iconBg }}
      >
        {icon}
      </div>
      <h3 className="text-sm font-semibold text-[#0b1c30] dark:text-white mb-1">{title}</h3>
      <p className="text-xs text-[#515f74] dark:text-[#cbd5e1] leading-relaxed">{description}</p>
    </div>
  );
}

/**
 * SVG icon representing analytics data, specifically used for the "Precision analytics" feature card.
 */
function AnalyticsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M8 1.5a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13zm2.5 4.5L7 9.5 5.5 8"
        stroke="#006c49"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * SVG icon representing time efficiency, specifically used for the "Efficient collection" feature card.
 */
function EfficiencyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="5.5" stroke="#23acf1" strokeWidth="1.2" />
      <path d="M8 2v4l2.5 1.5" stroke="#23acf1" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}



/**
 * Main Onboarding Component - Step 1
 * 
 * This represents the initial sign-up screen where users input their personal
 * and organization details to create an account. It manages the local state
 * for all form fields and handles the initial submission step.
 */
export default function Onboarding() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    password: "",
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (key: string) => (val: string) => {
    setForm((f) => ({ ...f, [key]: val }));
    if (errors[key]) {
      setErrors((e) => ({ ...e, [key]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required.";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) newErrors.email = "Please enter a valid email address.";
    
    if (form.role === "Select a role" || !form.role) newErrors.role = "Please select a role.";
    
    if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    } else if (!/[A-Z]/.test(form.password)) {
      newErrors.password = "Password must contain at least one uppercase letter.";
    } else if (!/[0-9]/.test(form.password)) {
      newErrors.password = "Password must contain at least one number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    console.log("Form submitted:", form);
    navigate("/onboarding-2");
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

          {/* Left — Marketing */}
          <div className="flex flex-col gap-8">
            <div>
              <span className="inline-flex items-center bg-[#10b981] text-white text-xs font-semibold tracking-widest px-4 py-1.5 rounded-full">
                STEP 1 OF 2
              </span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#0b1c30] dark:text-white leading-tight">
                Transform waste into{" "}
                <span className="text-[#006c49]">environmental intelligence.</span>
              </h1>
              <p className="mt-4 text-base text-[#515f74] dark:text-[#cbd5e1] leading-relaxed">
                SmartSort Analytics provides enterprise-grade stewardship tools to track,
                manage, and optimize your organization's sustainability footprint in real time.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <FeatureCard
                iconBg="#e1f5ee"
                title="Precision analytics"
                description="Real-time tonnage tracking and diversion metrics."
                icon={<AnalyticsIcon />}
              />
              <FeatureCard
                iconBg="#e1f0fc"
                title="Efficient collection"
                description="Optimized routing and delivery for smart waste management."
                icon={<EfficiencyIcon />}
              />
            </div>

            <p className="text-xs text-[#94a3b8] dark:text-[#64748b] flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1a6 6 0 1 1 0 12A6 6 0 0 1 7 1zm2.5 3.5L5.5 8.5 4 7" stroke="#10b981" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              ISO 14001 compliant — trusted by 500+ enterprises
            </p>
          </div>

          {/* Right — Form */}
          <div className="bg-white dark:bg-[#0b1c30] border border-[#e2e8f0] dark:border-[#1e3a5f] rounded-2xl shadow-sm p-6 sm:p-8 flex flex-col gap-5">
            <div>
              <h2 className="text-xl font-semibold text-[#0b1c30] dark:text-white">Create your account</h2>
              <p className="text-sm text-[#515f74] dark:text-[#cbd5e1] mt-1">
                Start your free 14-day trial — no credit card required.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <InputField
                id="fname"
                label="First name"
                placeholder="Jane"
                value={form.firstName}
                onChange={set("firstName")}
                error={errors.firstName}
              />
              <InputField
                id="lname"
                label="Last name"
                placeholder="Smith"
                value={form.lastName}
                onChange={set("lastName")}
                error={errors.lastName}
              />
            </div>

            <InputField
              id="email"
              label="Work email"
              type="email"
              placeholder="jane@company.com"
              value={form.email}
              onChange={set("email")}
              error={errors.email}
            />

            <SelectField
              id="role"
              label="Select your role"
              value={form.role}
              onChange={set("role")}
              error={errors.role}
              options={[
                "Select a role",
                "Manager",
                "Collector"
              ]}
            />

            <InputField
              id="password"
              label="Password"
              type="password"
              placeholder="Min. 8 characters"
              value={form.password}
              onChange={set("password")}
              error={errors.password}
            />

            <div className="flex flex-col gap-3 pt-1">
              <button
                onClick={handleSubmit}
                className="w-full h-11 bg-[#006c49] hover:bg-[#005a3c] active:scale-[0.98] text-white text-sm font-semibold tracking-wide rounded-lg transition-all"
              >
                GET STARTED →
              </button>

              <div className="flex items-center justify-between">
                <StepDots current={0} total={2} />
                <p className="text-xs text-[#94a3b8] dark:text-[#64748b]">
                  Already have an account?{" "}
                  <Link to="/" className="text-[#006c49] font-medium hover:underline">
                    Log in
                  </Link>
                </p>
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