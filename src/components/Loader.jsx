import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ROLES = ["AI / ML Engineer", "Full-Stack Developer", "Software Engineer"];

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const duration = 1900;
    let frame;

    function tick(now) {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 320);
      }
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col justify-between overflow-hidden bg-[var(--color-void)] px-6 py-8 sm:px-12 sm:py-10"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* faint corner frame — editorial grid feel */}
          <div className="pointer-events-none absolute inset-6 border border-[var(--color-line)] opacity-40 sm:inset-10" />

          {/* top row: monogram + kicker */}
          <div className="relative flex items-start justify-between">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-accent)]/40 font-display text-sm text-[var(--color-accent)]">
                HS
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-[var(--color-ink-faint)]">
                Portfolio&nbsp;·&nbsp;'26
              </span>
            </motion.div>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-mono text-[11px] uppercase tracking-[0.35em] text-[var(--color-ink-faint)]"
            >
              Loading
            </motion.span>
          </div>

          {/* center: role words stagger-reveal */}
          <div className="relative flex flex-1 flex-col items-center justify-center gap-2 sm:gap-3">
            {ROLES.map((role, i) => (
              <motion.div
                key={role}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: i === ROLES.length - 1 ? 1 : 0.35, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.16, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-baseline gap-3"
              >
                <span className="font-mono text-xs text-[var(--color-accent)]">
                  0{i + 1}
                </span>
                <span
                  className={`font-display tracking-tight text-[var(--color-ink)] ${
                    i === ROLES.length - 1
                      ? "text-3xl sm:text-5xl font-medium"
                      : "text-lg sm:text-2xl"
                  }`}
                >
                  {role}
                </span>
              </motion.div>
            ))}
          </div>

          {/* bottom row: counter + progress line */}
          <div className="relative flex items-end justify-between gap-6">
            <div className="hidden sm:block max-w-[220px] font-mono text-[11px] leading-relaxed text-[var(--color-ink-faint)]">
              Building intelligent software experiences — one thread at a time.
            </div>

            <div className="flex flex-1 flex-col items-end gap-3 sm:flex-none sm:items-end">
              <div className="flex items-baseline gap-2 font-display tabular-nums">
                <span className="text-5xl sm:text-6xl font-semibold text-gradient">
                  {progress}
                </span>
                <span className="text-lg text-[var(--color-ink-faint)]">%</span>
              </div>
              <div className="h-px w-40 sm:w-56 overflow-hidden bg-[var(--color-line)]">
                <motion.div
                  className="h-full bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-secondary)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
