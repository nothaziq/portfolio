import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, ArrowUpRight, FileText } from "lucide-react";
import { GithubIcon } from "../components/BrandIcons";
import ParticleField from "../components/ParticleField";
import MagneticButton from "../components/MagneticButton";
import TypingText from "../components/TypingText";
import { PROFILE } from "../constants/data";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 pt-28 pb-16 sm:px-10"
    >
      <ParticleField className="absolute inset-0 h-full w-full opacity-70" />

      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.7 }}
          className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-ink-faint)]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] animate-pulse-slow" />
          Available for opportunities · {PROFILE.location}
        </motion.div>

        <h1 className="font-display font-medium leading-[1.02] tracking-tight text-[clamp(2.5rem,7vw,5.5rem)]">
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.9, ease: [0.16, 1, 0.3, 1] }}
            className="block text-[var(--color-ink-dim)]"
          >
            {PROFILE.name}
          </motion.span>
          <span className="block text-gradient min-h-[1.1em]">
            <TypingText text={PROFILE.headline} startDelay={2500} speed={35} />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2.1 }}
          className="mt-8 max-w-xl text-base sm:text-lg text-[var(--color-ink-dim)] leading-relaxed"
        >
          {PROFILE.blurb}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2.3 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton
            as="a"
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-ink)] px-6 py-3.5 text-sm font-medium text-[var(--color-void)]"
          >
            View my work
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </MagneticButton>

          <MagneticButton
            as="a"
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] px-6 py-3.5 text-sm font-medium text-[var(--color-ink)] hover:border-[var(--color-ink-faint)] transition-colors"
          >
            <GithubIcon size={16} />
            GitHub
          </MagneticButton>

          <MagneticButton
            as="a"
            href="#assistant"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium text-[var(--color-ink-dim)] hover:text-[var(--color-ink)] transition-colors"
          >
            <FileText size={16} />
            Ask my AI assistant
          </MagneticButton>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        data-cursor-hover
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[var(--color-ink-faint)]"
        aria-label="Scroll to About section"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </motion.span>
      </motion.a>
    </section>
  );
}
