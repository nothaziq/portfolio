import { motion } from "framer-motion";
import { GraduationCap, Rocket, Code2, Compass, Sparkle } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import { JOURNEY } from "../constants/data";

const ICONS = {
  education: GraduationCap,
  milestone: Sparkle,
  project: Code2,
  current: Compass,
  future: Rocket,
};

export default function Journey() {
  return (
    <section id="journey" className="relative px-6 py-28 sm:px-10 md:py-36">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Journey"
          title="The learning path so far."
          description="Ordered chronologically — each step built directly on the last."
        />

        <div className="relative mt-16 pl-8 sm:pl-10">
          <div className="absolute left-[7px] sm:left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-[var(--color-primary)] via-[var(--color-accent)] to-transparent" />

          {JOURNEY.map((item, i) => {
            const Icon = ICONS[item.type] || Sparkle;
            const isCurrent = item.type === "current";
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="relative pb-12 last:pb-0"
              >
                <span
                  className={`absolute -left-8 sm:-left-10 top-1 flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full border ${
                    isCurrent
                      ? "border-[var(--color-accent)] bg-[var(--color-accent)]/15"
                      : "border-[var(--color-line)] bg-[var(--color-surface)]"
                  }`}
                >
                  <Icon size={13} className={isCurrent ? "text-[var(--color-accent)]" : "text-[var(--color-ink-faint)]"} />
                </span>

                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-mono text-xs text-[var(--color-accent)]">{item.year}</span>
                  <h3 className="font-display text-lg sm:text-xl text-[var(--color-ink)]">
                    {item.title}
                  </h3>
                  {isCurrent && (
                    <span className="rounded-full bg-[var(--color-accent)]/15 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wide text-[var(--color-accent)]">
                      Now
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-[var(--color-ink-faint)]">{item.org}</p>
                <p className="mt-2 max-w-xl text-sm text-[var(--color-ink-dim)] leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
