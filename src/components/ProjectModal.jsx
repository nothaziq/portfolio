import { AnimatePresence, motion } from "framer-motion";
import { X, ExternalLink, CheckCircle2 } from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import ProjectThumbnail from "./ProjectThumbnail";
import { useEffect } from "react";
import { stopLenis, startLenis } from "../hooks/useLenis";

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    stopLenis();
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
      startLenis();
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="glass relative z-10 max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl"
          >
            <button
              onClick={onClose}
              data-cursor-hover
              aria-label="Close project details"
              className="absolute right-5 top-5 z-20 rounded-full border border-[var(--color-line)] bg-[var(--color-void)]/70 p-2 text-[var(--color-ink-dim)] backdrop-blur-sm hover:text-[var(--color-ink)] transition-colors"
            >
              <X size={16} />
            </button>

            <ProjectThumbnail project={project} className="aspect-[16/9] w-full" />

            <div className="p-8 sm:p-10">
            <span className="font-mono text-xs text-[var(--color-ink-faint)]">
              {project.year}
            </span>
            <h3
              id="project-modal-title"
              className="mt-3 font-display text-3xl font-medium text-[var(--color-ink)]"
            >
              {project.title}
            </h3>
            <p className="mt-3 text-[var(--color-ink-dim)] leading-relaxed">
              {project.description}
            </p>

            <div className="mt-7">
              <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-accent)] mb-3">
                Highlights
              </h4>
              <ul className="space-y-2">
                {project.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-sm text-[var(--color-ink-dim)]">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[var(--color-secondary)]" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-7">
              <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-accent)] mb-3">
                Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-[var(--color-line)] px-3 py-1.5 text-xs text-[var(--color-ink-dim)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor-hover
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-void)]"
                >
                  <GithubIcon size={16} />
                  View code
                </a>
              )}
              {project.demo && project.demo !== "#" && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor-hover
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] px-5 py-3 text-sm font-medium text-[var(--color-ink)]"
                >
                  <ExternalLink size={16} />
                  Live demo
                </a>
              )}
            </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
