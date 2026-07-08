import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, MapPin } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import { WORK_EXPERIENCE } from "../constants/data";

function ExperienceCard({ job, index }) {
  const ref = useRef(null);

  // ties the card's tilt/rise/fade directly to scroll position —
  // it tilts up into place as it enters the viewport, rather than
  // just fading in once.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 92%", "start 38%"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [22, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [70, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);

  return (
    <div ref={ref} style={{ perspective: 1200 }}>
      <motion.div
        style={{ rotateX, y, opacity, scale, transformOrigin: "top center" }}
        className="glass relative rounded-2xl p-6 sm:p-8"
      >
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-8">
          {/* index number — echoes the numbered list treatment */}
          <span className="font-mono text-4xl sm:text-5xl text-[var(--color-line)] tabular-nums sm:pt-1">
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="flex-1">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-surface-2)] text-[var(--color-accent)]">
                  <Briefcase size={17} />
                </span>
                <div>
                  <h3 className="font-display text-lg sm:text-xl text-[var(--color-ink)]">
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

            <p className="mt-4 text-sm leading-relaxed text-[var(--color-ink-dim)] sm:max-w-xl">
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
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="relative px-6 py-28 sm:px-10 md:py-36">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="Experience"
          title="Roles that tilt into view as you scroll."
          description="Currently splitting time across two internships — one in applied ML, one in full-stack product work."
          align="center"
        />

        <div className="mt-16 flex flex-col gap-8 sm:gap-10">
          {WORK_EXPERIENCE.map((job, i) => (
            <ExperienceCard key={job.id} job={job} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
