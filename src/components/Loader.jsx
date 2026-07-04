import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const duration = 1400;
    let frame;

    function tick(now) {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 250);
      }
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[var(--color-void)]"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="font-display text-sm tracking-[0.4em] text-[var(--color-ink-faint)] uppercase mb-6">
            Haziq.dev
          </div>
          <div className="flex items-baseline gap-3 font-display">
            <span className="text-6xl md:text-7xl text-gradient font-semibold tabular-nums">
              {progress}
            </span>
            <span className="text-2xl text-[var(--color-ink-faint)]">%</span>
          </div>
          <div className="mt-8 h-px w-48 bg-[var(--color-line)] overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-secondary)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
