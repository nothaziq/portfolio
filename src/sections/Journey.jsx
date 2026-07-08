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
          align="center"
        />

        <div className="relative mt-16">
          {/* the road — centered, fixed, never animates or shifts */}
          <div className="absolute left-4 top-2 bottom-2 w-px sm:left-1/2 sm:-translate-x-1/2 bg-gradient-to-b from-[var(--color-primary)] via-[var(--color-accent)] to-transparent" />

          <div className="flex flex-col">
            {JOURNEY.map((item, i) => {
              const Icon = ICONS[item.type] || Sparkle;
              const isCurrent = item.type === "current";
              const isLeft = i % 2 === 0;

              return (
                <div key={item.title} className="relative flex py-7 pl-12 sm:py-10 sm:pl-0">
                  {/* stop marker — sits directly on the road */}
                  <span
                    className={`absolute left-4 top-8 z-10 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full border sm:left-1/2 ${
                      isCurrent
                        ? "border-[var(--color-accent)] bg-[var(--color-accent)]/15"
                        : "border-[var(--color-line)] bg-[var(--color-surface)]"
                    }`}
                  >
                    <Icon
                      size={13}
                      className={isCurrent ? "text-[var(--color-accent)]" : "text-[var(--color-ink-faint)]"}
                    />
                  </span>

                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -36 : 36 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className={`w-full sm:w-1/2 ${
                      isLeft ? "sm:pr-14 sm:text-right" : "sm:pl-14 sm:ml-auto sm:text-left"
                    }`}
                  >
                    <div
                      className={`flex flex-wrap items-baseline gap-x-3 gap-y-1 ${
                        isLeft ? "sm:justify-end" : ""
                      }`}
                    >
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
                    <p
                      className={`mt-2 text-sm text-[var(--color-ink-dim)] leading-relaxed sm:max-w-sm ${
                        isLeft ? "sm:ml-auto" : ""
                      }`}
                    >
                      {item.description}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
