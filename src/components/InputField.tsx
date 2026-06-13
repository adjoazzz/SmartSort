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
export function InputField({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  ...rest
}: any) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-muted-foreground">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...rest}
        className={`h-10 px-3 border rounded-lg text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all ${
          error
            ? "border-[#ba1a1a] focus:border-[#ba1a1a] focus:ring-[#ba1a1a]/10"
            : "border-border focus:border-[#006c49] focus:ring-[#006c49]/10"
        }`}
      />
      {error && (
        <span className="text-[11px] font-medium text-[#ba1a1a]">{error}</span>
      )}
    </div>
  );
}
