import React from "react";

/**
 * Reusable dropdown select field component tailored for onboarding forms.
 * Includes custom chevron styling and focus states.
 * 
 * @param {Object} props - Component props.
 * @param {string} props.id - HTML ID attribute for accessibility.
 * @param {string} props.label - The visible label text.
 * @param {string[]} props.options - Array of string options. The first option is treated as a disabled placeholder.
 * @param {string} props.value - The currently selected value.
 * @param {Function} props.onChange - Callback fired when a new option is selected.
 */
export function SelectField({ id, label, options, value, onChange, error }: any) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-[#515f74]">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`h-10 px-3 border rounded-lg text-sm bg-white text-[#0b1c30] focus:outline-none focus:ring-2 transition-all appearance-none cursor-pointer ${
          error ? "border-[#ba1a1a] focus:border-[#ba1a1a] focus:ring-[#ba1a1a]/10" : "border-[#cbd5e1] focus:border-[#006c49] focus:ring-[#006c49]/10"
        }`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' stroke='%23515f74' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 12px center",
          paddingRight: "36px",
        }}
      >
        <option value="" disabled>
          {options[0]}
        </option>
        {options.slice(1).map((opt: string) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {error && <span className="text-[11px] font-medium text-[#ba1a1a]">{error}</span>}
    </div>
  );
}
