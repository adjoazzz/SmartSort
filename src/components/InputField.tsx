import React from "react";

/**
 * Reusable text input component tailored for onboarding forms.
 * 
 * @param {Object} props - Component props.
 * @param {string} props.id - HTML ID attribute for accessibility.
 * @param {string} props.label - The visible label text.
 * @param {string} [props.type="text"] - The HTML input type (e.g., text, email, password).
 * @param {string} props.placeholder - Placeholder text shown when input is empty.
 * @param {string} props.value - The current value of the input.
 * @param {Function} props.onChange - Callback fired when the input value changes.
 */
export function InputField({ id, label, type = "text", placeholder, value, onChange }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-[#515f74]">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 px-3 border border-[#cbd5e1] rounded-lg text-sm bg-white text-[#0b1c30] placeholder-[#94a3b8] focus:outline-none focus:border-[#006c49] focus:ring-2 focus:ring-[#006c49]/10 transition-all"
      />
    </div>
  );
}
