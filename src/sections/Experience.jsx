import { motion } from "framer-motion";
import { Briefcase, MapPin } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import TiltCard from "../components/TiltCard";
import { WORK_EXPERIENCE } from "../constants/data";

export default function Experience() {
  return (
    <section id="experience" className="relative px-6 py-28 sm:px-10 md:py-36">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Experience"
          title="Where I'm putting it to work."
          description="Currently splitting time across two internships — one in applied ML, one in full-stack product work."
          align="center"
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {WORK_EXPERIENCE.map((job, i) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard
                tiltAmount={6}
                className="glass relative h-full rounded-2xl p-6 sm:p-7"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-surface-2)] text-[var(--color-accent)]">
                      <Briefcase size={17} />
                    </span>
                    <div>
                      <h3 className="font-display text-lg text-[var(--color-ink)]">
                        {job.role}
                      </h3>
                      <p className="text-sm text-[var(--color-ink-dim)]">{job.company}</p>
                    </div>
                  </div>

                  {job.current && (
                    <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-[var(--color-accent)]/15 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wide text-[var(--color-accent)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] animate-pulse-slow" />
                      Current
                    </span>
                  )}
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-[var(--color-ink-faint)]">
                  <span>{job.period}</span>
                  <span className="flex items-center gap-1">
                    <MapPin size={12} />
                    {job.location}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-[var(--color-ink-dim)]">
                  {job.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[var(--color-line)] px-2.5 py-1 text-[11px] font-mono text-[var(--color-ink-faint)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
