import { motion } from "framer-motion";
import { GraduationCap, Sparkles, Target } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import StatCard from "../components/StatCard";
import { PROFILE, STATS, LEARNING_NOW } from "../constants/data";

const INTERESTS = [
  "Artificial Intelligence",
  "Machine Learning",
  "Full Stack Development",
  "Human-Computer Interaction",
  "Game Development",
  "Problem Solving",
];

export default function About() {
  return (
    <section id="about" className="relative px-6 py-28 sm:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="About"
          title="Two years in, still curious about everything that touches code."
          description="A quick look at where I'm coming from, what I care about, and what I'm chasing next."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-5">
          {/* Education card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="glass md:col-span-3 rounded-3xl p-8"
          >
            <div className="flex items-center gap-3 text-[var(--color-accent)]">
              <GraduationCap size={20} />
              <span className="font-mono text-xs uppercase tracking-[0.25em]">Education</span>
            </div>
            <h3 className="mt-4 font-display text-2xl text-[var(--color-ink)]">
              {PROFILE.degree}
            </h3>
            <p className="mt-1 text-[var(--color-ink-dim)]">{PROFILE.university}</p>
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-ink-faint)]">
              Coursework spans Software Requirements Engineering, Human-Computer
              Interaction, Computer Organization &amp; Assembly Language, Software
              Design &amp; Architecture, and Multivariable Calculus — with C++ OOP
              running underneath most of it.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {INTERESTS.map((interest) => (
                <span
                  key={interest}
                  className="rounded-full border border-[var(--color-line)] px-3 py-1.5 text-xs text-[var(--color-ink-dim)]"
                >
                  {interest}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Current focus card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass md:col-span-2 rounded-3xl p-8 flex flex-col"
          >
            <div className="flex items-center gap-3 text-[var(--color-secondary)]">
              <Target size={20} />
              <span className="font-mono text-xs uppercase tracking-[0.25em]">Right now</span>
            </div>
            <h3 className="mt-4 font-display text-2xl text-[var(--color-ink)]">
              Currently learning
            </h3>
            <ul className="mt-5 space-y-3 flex-1">
              {LEARNING_NOW.map((item, i) => (
                <li key={item} className="flex items-center gap-3 text-sm text-[var(--color-ink-dim)]">
                  <span className="font-mono text-[var(--color-ink-faint)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px flex-1 bg-[var(--color-line)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center gap-2 text-xs text-[var(--color-ink-faint)]">
              <Sparkles size={14} className="text-[var(--color-accent)]" />
              Goal: AI Engineer building products people actually use.
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {STATS.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
