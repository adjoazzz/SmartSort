import React from "react";
import { Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ConfettiOverlayProps {
  show: boolean;
}

// Stable set of confetti particles so they don't re-randomize on each render.
const CONFETTI_PARTICLES = Array.from({ length: 30 }, (_, i) => {
  const colors = ["#ff5964", "#35a7ff", "#386150", "#ffe869", "#78c0e0"];
  return {
    key: i,
    color: colors[i % colors.length],
    left: ((i * 37 + 13) % 100), // deterministic spread
    delay: (i * 0.05) % 1.5,
    duration: 2 + (i % 3),
  };
});

export function ConfettiOverlay({ show }: ConfettiOverlayProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center bg-black/10"
        >
          {/* Success message */}
          <div className="bg-card border border-[#006c49] dark:border-emerald-500 rounded-xl px-8 py-6 shadow-md flex flex-col items-center gap-3">
            <div className="h-14 w-14 rounded-full bg-[#10b981]/15 dark:bg-emerald-500/15 text-[#10b981] dark:text-emerald-400 flex items-center justify-center animate-[bounce_1s_infinite]">
              <Check
                className="w-7 h-7 text-[#10b981] dark:text-emerald-400"
                strokeWidth={3.5}
              />
            </div>
            <h3 className="font-black text-lg text-foreground dark:text-white">
              Bin Cleared Successfully!
            </h3>
            <p className="text-xs text-muted-foreground">
              Your progress has been synchronized with the main database.
            </p>
          </div>

          {/* Confetti particles */}
          {CONFETTI_PARTICLES.map((p) => (
            <motion.div
              key={p.key}
              initial={{ y: "110%", x: `${p.left}%`, rotate: 0 }}
              animate={{ y: "-10%", rotate: 360 }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                ease: "easeOut",
              }}
              className="absolute w-2.5 h-2.5 rounded-full"
              style={{
                backgroundColor: p.color,
                left: `${p.left}%`,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
