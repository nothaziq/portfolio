import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "./BrandIcons";

const ACCENT_MAP = {
  primary: "var(--color-primary)",
  secondary: "var(--color-secondary)",
  accent: "var(--color-accent)",
};

export default function ProjectCard({ project, index, onOpen }) {
  const ref = useRef(null);
  const accent = ACCENT_MAP[project.accent] || ACCENT_MAP.primary;

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const springRx = useSpring(rx, { stiffness: 200, damping: 20 });
  const springRy = useSpring(ry, { stiffness: 200, damping: 20 });

  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  function handleMouseMove(e) {
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * 14);
    rx.set((0.5 - py) * 14);
    glowX.set(px * 100);
    glowY.set(py * 100);
  }

  function handleMouseLeave() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => onOpen(project)}
        data-cursor-hover
        style={{ rotateX: springRx, rotateY: springRy, transformStyle: "preserve-3d" }}
        className="group relative cursor-pointer overflow-hidden rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface)] p-7 sm:p-8 h-full"
      >
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([gx, gy]) =>
                `radial-gradient(320px circle at ${gx}% ${gy}%, color-mix(in srgb, ${accent} 18%, transparent), transparent 70%)`
            ),
          }}
        />

        <div className="relative flex items-start justify-between">
          <span className="font-mono text-xs text-[var(--color-ink-faint)]">{project.year}</span>
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: accent, boxShadow: `0 0 12px ${accent}` }}
          />
        </div>

        <h3 className="relative mt-5 font-display text-2xl sm:text-[1.7rem] font-medium text-[var(--color-ink)] leading-tight">
          {project.title}
        </h3>
        <p className="relative mt-3 text-sm text-[var(--color-ink-dim)] leading-relaxed">
          {project.tagline}
        </p>

        <div className="relative mt-6 flex flex-wrap gap-2">
          {project.stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-[var(--color-line)] px-2.5 py-1 text-[11px] text-[var(--color-ink-faint)]"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 4 && (
            <span className="rounded-full border border-[var(--color-line)] px-2.5 py-1 text-[11px] text-[var(--color-ink-faint)]">
              +{project.stack.length - 4}
            </span>
          )}
        </div>

        <div className="relative mt-8 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)]">
            View details
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
          {project.github && (
            <GithubIcon size={16} className="text-[var(--color-ink-faint)]" />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
