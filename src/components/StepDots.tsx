import React from "react";

/**
 * Renders the pagination dots to indicate progress through the onboarding flow.
 * 
 * @param {Object} props - Component props.
 * @param {number} props.current - The index of the current active step (0-indexed).
 * @param {number} props.total - The total number of steps in the onboarding process.
 */
export function StepDots({ current = 0, total = 3 }) {
  return (
    <div className="flex gap-2 items-center">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-2 rounded-full transition-all ${
            i === current ? "w-10 bg-primary" : "w-7 bg-[#bbcabf]"
          }`}
        />
      ))}
    </div>
  );
}
