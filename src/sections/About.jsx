import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { GraduationCap, Sparkles, Target } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import StatCard from "../components/StatCard";
import TiltCard from "../components/TiltCard";
import { PROFILE, STATS, LEARNING_NOW } from "../constants/data";
import haziqPhoto from "../assets/profile/haziq.webp";

const INTERESTS = [
  "Artificial Intelligence",
  "Machine Learning",
  "Full Stack Development",
  "Human-Computer Interaction",
  "Game Development",
  "Problem Solving",
];

function Portrait() {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const springRx = useSpring(rx, { stiffness: 200, damping: 20 });
  const springRy = useSpring(ry, { stiffness: 200, damping: 20 });

  function handleMouseMove(e) {
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * 10);
    rx.set((0.5 - py) * 10);
  }
  function handleMouseLeave() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="relative mx-auto shrink-0 md:mx-0"
      style={{ perspective: 900 }}
    >
      <div
        className="absolute -inset-4 -z-10 rounded-[2.5rem] opacity-50 blur-2xl"
        style={{
          background:
            "linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)",
        }}
      />
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX: springRx, rotateY: springRy, transformStyle: "preserve-3d" }}
        className="h-60 w-60 sm:h-72 sm:w-72 overflow-hidden rounded-[2rem] border border-[var(--color-line)]"
      >
        <img
          src={haziqPhoto}
          alt="Portrait of Muhammad Haziq"
          className="h-full w-full object-cover"
        />
      </motion.div>
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative px-6 py-28 sm:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="About"
          title="Two years in, still curious about everything that touches code."
          description="A quick look at where I'm coming from, what I care about, and what I'm chasing next."
        />

        <div className="mt-14 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
          <Portrait />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex-1 text-center md:text-left"
          >
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-accent)] mb-3">
              Hi, I&apos;m {PROFILE.name.split(" ")[1] ?? PROFILE.name}
            </p>
            <p className="text-lg text-[var(--color-ink-dim)] leading-relaxed max-w-xl mx-auto md:mx-0">
              {PROFILE.blurb} When I'm not training models or shipping
              interfaces, I'm usually deep in a design pattern I just learned
              about, trying to find an excuse to use it.
            </p>
          </motion.div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-5">
          {/* Education card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="md:col-span-3"
            style={{ perspective: 1000 }}
          >
            <TiltCard data-cursor-hover className="glass h-full rounded-3xl p-8">
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
            </TiltCard>
          </motion.div>

          {/* Current focus card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-2"
            style={{ perspective: 1000 }}
          >
            <TiltCard data-cursor-hover className="glass h-full rounded-3xl p-8 flex flex-col">
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
            </TiltCard>
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
