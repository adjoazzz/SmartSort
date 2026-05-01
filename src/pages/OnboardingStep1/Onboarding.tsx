import { useState } from "react";
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
function FeatureCard({ iconBg, iconColor, title, description, icon }) {
  return (
    <div className="bg-white border border-[#e2e8f0] rounded-xl p-4">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
        style={{ background: iconBg }}
      >
        {icon}
      </div>
      <h3 className="text-sm font-semibold text-[#0b1c30] mb-1">{title}</h3>
      <p className="text-xs text-[#515f74] leading-relaxed">{description}</p>
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
 * SVG icon representing carbon tracking, specifically used for the "Carbon tracking" feature card.
 */
function CarbonIcon() {
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
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    org: "",
    orgSize: "",
    industry: "",
    password: "",
  });

  const set = (key) => (val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = () => {
    console.log("Form submitted:", form);
    // navigate("/onboarding-2")
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f8f9ff] to-[#f0faf5]">
      {/* Header */}
      <header className="h-16 bg-white border-b border-[#e2e8f0] flex items-center justify-between px-4 sm:px-6 flex-shrink-0">
        <span className="text-lg font-semibold text-[#0b1c30]">
          Smart<span className="text-[#006c49]">Sort</span>
        </span>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-sm text-[#515f74] border border-[#e2e8f0] rounded-lg hover:bg-[#f8fafc] transition-colors">
            Help
          </button>
          <button className="px-3 py-1.5 text-sm text-[#515f74] border border-[#e2e8f0] rounded-lg hover:bg-[#f8fafc] transition-colors">
            Log in
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
                STEP 1 OF 3
              </span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#0b1c30] leading-tight">
                Transform waste into{" "}
                <span className="text-[#006c49]">environmental intelligence.</span>
              </h1>
              <p className="mt-4 text-base text-[#515f74] leading-relaxed">
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
                title="Carbon tracking"
                description="Automated reporting for CO₂ offsets and compliance."
                icon={<CarbonIcon />}
              />
            </div>

            <p className="text-xs text-[#94a3b8] flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1a6 6 0 1 1 0 12A6 6 0 0 1 7 1zm2.5 3.5L5.5 8.5 4 7" stroke="#10b981" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              ISO 14001 compliant — trusted by 500+ enterprises
            </p>
          </div>

          {/* Right — Form */}
          <div className="bg-white border border-[#e2e8f0] rounded-2xl shadow-sm p-6 sm:p-8 flex flex-col gap-5">
            <div>
              <h2 className="text-xl font-semibold text-[#0b1c30]">Create your account</h2>
              <p className="text-sm text-[#515f74] mt-1">
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
              />
              <InputField
                id="lname"
                label="Last name"
                placeholder="Smith"
                value={form.lastName}
                onChange={set("lastName")}
              />
            </div>

            <InputField
              id="email"
              label="Work email"
              type="email"
              placeholder="jane@company.com"
              value={form.email}
              onChange={set("email")}
            />

            <InputField
              id="org"
              label="Organization name"
              placeholder="Acme Corp"
              value={form.org}
              onChange={set("org")}
            />

            <SelectField
              id="orgsize"
              label="Organization size"
              value={form.orgSize}
              onChange={set("orgSize")}
              options={[
                "Select size",
                "1 – 10 employees",
                "11 – 50 employees",
                "51 – 200 employees",
                "201 – 1,000 employees",
                "1,000+ employees",
              ]}
            />

            <SelectField
              id="industry"
              label="Industry"
              value={form.industry}
              onChange={set("industry")}
              options={[
                "Select industry",
                "Manufacturing",
                "Retail & Consumer Goods",
                "Healthcare",
                "Hospitality & Food Service",
                "Construction",
                "Government & Public Sector",
                "Other",
              ]}
            />

            <InputField
              id="password"
              label="Password"
              type="password"
              placeholder="Min. 8 characters"
              value={form.password}
              onChange={set("password")}
            />

            <div className="flex flex-col gap-3 pt-1">
              <button
                onClick={handleSubmit}
                className="w-full h-11 bg-[#006c49] hover:bg-[#005a3c] active:scale-[0.98] text-white text-sm font-semibold tracking-wide rounded-lg transition-all"
              >
                GET STARTED →
              </button>

              <div className="flex items-center justify-between">
                <StepDots current={0} total={3} />
                <p className="text-xs text-[#94a3b8]">
                  Already have an account?{" "}
                  <a href="#" className="text-[#006c49] font-medium hover:underline">
                    Log in
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#f8fafc] border-t border-[#e2e8f0] px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-[#334155]">SmartSort Analytics</p>
          <p className="text-xs text-[#64748b]">© 2024 SmartSort Analytics. Professional waste stewardship.</p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-1">
          {["Privacy policy", "Terms of service", "Environmental compliance", "Support"].map((l) => (
            <a key={l} href="#" className="text-xs text-[#64748b] hover:text-[#006c49] transition-colors">
              {l}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}