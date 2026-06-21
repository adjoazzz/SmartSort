import { useState } from "react";
import { useNavigate } from "react-router";
import { StepDots } from "../../components/StepDots";
import { SelectField } from "../../components/SelectField";
import { InputField } from "../../components/InputField";

/**
 * Onboarding Step 2: Company Profile
 *
 * Clean semantic view for collecting organization details during signup.
 */
export default function Onboarding() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    orgName: "",
    industry: "",
    numFacilities: "",
    annualWaste: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showModal, setShowModal] = useState(false);

  const set = (key: string) => (val: string) => {
    setForm((f) => ({ ...f, [key]: val }));
    if (errors[key]) {
      setErrors((e) => ({ ...e, [key]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.orgName.trim())
      newErrors.orgName = "Organization name is required.";
    if (form.industry === "Select Industry" || !form.industry)
      newErrors.industry = "Please select an industry.";

    if (!form.numFacilities) {
      newErrors.numFacilities = "Required.";
    } else if (Number(form.numFacilities) < 1) {
      newErrors.numFacilities = "Must be at least 1.";
    } else if (!Number.isInteger(Number(form.numFacilities))) {
      newErrors.numFacilities = "Must be a whole number.";
    }

    if (form.annualWaste === "Select range" || !form.annualWaste) {
      newErrors.annualWaste = "Please select a range.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    console.log("Form step 2 submitted:", form);
    setShowModal(true);
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
          <button
            onClick={() => navigate("/login")}
            className="px-3 py-1.5 text-sm text-muted-foreground border border-border rounded-lg hover:bg-background dark:hover:bg-secondary transition-colors"
          >
            Log in
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-10">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left — Marketing / Info */}
          <div className="flex flex-col gap-8 bg-primary p-10 rounded-xl text-white relative overflow-hidden shadow-lg h-full">
            {/* Decorative background blurs to match the original design intent */}
            <div className="absolute bg-card/20 blur-[40px] w-64 h-64 rounded-full -bottom-10 -right-10 pointer-events-none" />
            <div className="absolute bg-card/10 blur-[40px] w-64 h-64 rounded-full -top-10 -left-10 pointer-events-none" />

            <div className="relative z-10 flex flex-col gap-6">
              <h1 className="text-4xl font-bold leading-tight">
                Setting up your <br /> Stewardship.
              </h1>

              <p className="text-lg text-white/90 leading-relaxed font-light">
                By providing your organization details, we can calibrate our
                waste diversion algorithms to your specific industry benchmarks.
              </p>

              <div className="flex flex-col gap-4 mt-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                      <path
                        d="M20 6L9 17l-5-5"
                        stroke="#6ffbbe"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="font-semibold text-[#6ffbbe] tracking-wide text-sm">
                    Step 1: Account Verified
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-[#6ffbbe] rounded-sm ring-2 ring-[#6ffbbe] ring-offset-4 ring-offset-[#006c49]" />
                  </div>
                  <span className="font-semibold text-white tracking-wide text-sm">
                    Step 2: Company Profile
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="bg-card border border-border rounded-xl shadow-sm p-6 sm:p-8 flex flex-col gap-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xs font-semibold text-[#006c49] tracking-widest uppercase mb-1">
                  CONFIGURATION
                </h2>
                <h3 className="text-2xl font-semibold text-foreground dark:text-white">
                  Organization Details
                </h3>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-sm font-medium text-muted-foreground">
                  Step 2 of 2
                </span>
                <div className="w-16 h-1.5 bg-[#d5e3fd] rounded-full overflow-hidden">
                  <div className="w-full h-full bg-[#10b981]" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="col-span-1 sm:col-span-2">
                <InputField
                  id="orgName"
                  label="Organization Name"
                  placeholder="e.g. Global Logistics Corp"
                  value={form.orgName}
                  onChange={set("orgName")}
                  error={errors.orgName}
                />
              </div>

              <div className="col-span-1 sm:col-span-2">
                <SelectField
                  id="industry"
                  label="Industry Type"
                  value={form.industry}
                  onChange={set("industry")}
                  error={errors.industry}
                  options={[
                    "Select Industry",
                    "Manufacturing",
                    "Retail & Consumer Goods",
                    "Healthcare",
                    "Hospitality & Food Service",
                    "Construction",
                    "Government & Public Sector",
                    "Other",
                  ]}
                />
              </div>

              <InputField
                id="numFacilities"
                label="Number of Facilities"
                type="number"
                min={1}
                step={1}
                placeholder="0"
                value={form.numFacilities}
                onChange={set("numFacilities")}
                error={errors.numFacilities}
              />

              <SelectField
                id="annualWaste"
                label="Estimated Annual Waste Volume (Tons)"
                value={form.annualWaste}
                onChange={set("annualWaste")}
                error={errors.annualWaste}
                options={[
                  "Select range",
                  "Less than 500 Tons",
                  "500 - 1,000 Tons",
                  "1,000 - 5,000 Tons",
                  "5,000 - 10,000 Tons",
                  "10,000+ Tons",
                ]}
              />
            </div>

            {/* Helper Info Box */}
            <div className="bg-[#eff4ff] dark:bg-background border border-[#bbcabf] dark:border-border p-4 rounded-lg flex gap-3 mt-2">
              <svg
                className="w-5 h-5 text-[#006591] dark:text-[#38bdf8] flex-shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-sm text-[#3c4a42] dark:text-muted-foreground leading-relaxed">
                These estimates help us customize your dashboard metrics. You
                can refine these values later in your Facility Settings.
              </p>
            </div>

            <div className="border-t border-[#bbcabf] pt-6 flex items-center justify-between mt-2">
              <button
                onClick={() => navigate("/onboarding-1")}
                className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground dark:text-white transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M15 18l-6-6 6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Back to Account
              </button>

              <button
                onClick={handleSubmit}
                className="h-12 px-6 bg-[#10b981] hover:bg-[#0ea5e9] active:scale-[0.98] text-white text-base font-semibold tracking-wide rounded-lg transition-all shadow-sm flex items-center gap-2"
              >
                Complete Sign Up
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 18l6-6-6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-background dark:bg-secondary border-t border-border px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-[#334155] dark:text-muted-foreground">
            SmartSort Analytics
          </p>
          <p className="text-xs text-muted-foreground">
            © 2026 SmartSort Analytics. Professional waste stewardship.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-1">
          {[
            "Privacy policy",
            "Terms of service",
            "Environmental compliance",
            "Support",
          ].map((l) => (
            <a
              key={l}
              href="#"
              className="text-xs text-muted-foreground dark:text-slate-400 hover:text-[#006c49] dark:hover:text-emerald-400 transition-colors"
            >
              {l}
            </a>
          ))}
        </div>
      </footer>

      {/* Verification Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-card/40 backdrop-blur-sm">
          <div className="bg-card rounded-xl shadow-md max-w-sm w-full overflow-hidden flex flex-col">
            <div className="p-6 sm:p-8 flex flex-col gap-4 text-center items-center">
              <div className="w-16 h-16 bg-[#e1f5ee] rounded-full flex items-center justify-center mb-2">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-[#006c49]"
                >
                  <path
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-foreground dark:text-white">
                Verification Pending
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your details have been securely submitted. A facility
                administrator will review your information shortly. You will
                receive an email notification once your account has been
                verified.
              </p>
            </div>
            <div className="px-6 py-5 bg-background dark:bg-secondary border-t border-border">
              <button
                onClick={() => navigate("/login")}
                className="w-full h-11 bg-[#10b981] hover:bg-[#0ea5e9] active:scale-[0.98] text-white text-sm font-semibold tracking-wide rounded-lg transition-all shadow-sm"
              >
                Return to Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
