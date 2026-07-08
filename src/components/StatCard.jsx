import { motion } from "framer-motion";
import { useCountUp } from "../hooks/useCountUp";
import TiltCard from "./TiltCard";

export default function StatCard({ value, suffix = "", label }) {
  const { ref, value: animated } = useCountUp(value);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      style={{ perspective: 1000 }}
    >
      <TiltCard data-cursor-hover className="glass rounded-2xl px-5 py-6" tiltAmount={8}>
        <div className="font-display text-3xl sm:text-4xl font-semibold text-gradient tabular-nums">
          {animated}
          {suffix}
        </div>
        <div className="mt-2 text-xs sm:text-sm text-[var(--color-ink-faint)]">{label}</div>
      </TiltCard>
    </motion.div>
  );
}
