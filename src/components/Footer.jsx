import { ArrowUp, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { PROFILE, NAV_LINKS } from "../constants/data";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import MagneticButton from "./MagneticButton";

const CONNECT_LINKS = [
  { label: "GitHub", href: PROFILE.github, Icon: GithubIcon },
  { label: "LinkedIn", href: PROFILE.linkedin, Icon: LinkedinIcon },
  { label: "Email", href: `mailto:${PROFILE.email}`, Icon: Mail },
];

const CORE_STACK = ["React", "Next.js", "Python", "FastAPI", "Tailwind", "MongoDB"];

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function Footer() {
  return (
    <footer className="relative border-t border-[var(--color-line)] px-6 pt-16 pb-8 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand + status */}
          <div className="lg:col-span-1">
            <p className="font-display text-xl font-medium">
              Haziq<span className="text-[var(--color-accent)]">.</span>
            </p>
            <p className="mt-3 text-sm text-[var(--color-ink-dim)] leading-relaxed max-w-[22ch]">
              Building intelligent software, one project at a time.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] animate-pulse-slow" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-faint)]">
                Available for work
              </span>
            </div>
          </div>

          {/* Explore */}
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-accent)] mb-4">
              Explore
            </p>
            <nav className="flex flex-col gap-2.5 text-sm text-[var(--color-ink-dim)]">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  data-cursor-hover
                  className="w-fit hover:text-[var(--color-ink)] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-accent)] mb-4">
              Connect
            </p>
            <nav className="flex flex-col gap-2.5 text-sm text-[var(--color-ink-dim)]">
              {CONNECT_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor-hover
                  className="inline-flex w-fit items-center gap-2 hover:text-[var(--color-ink)] transition-colors"
                >
                  <Icon size={14} />
                  {label}
                </a>
              ))}
            </nav>
          </div>

          {/* Stack */}
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-accent)] mb-4">
              Built with
            </p>
            <div className="flex flex-wrap gap-2">
              {CORE_STACK.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-[var(--color-line)] px-2.5 py-1 text-[11px] text-[var(--color-ink-faint)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 h-px w-full bg-[var(--color-line)]" />

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[var(--color-ink-faint)]">
            © {new Date().getFullYear()} {PROFILE.name}. Built with React &amp; a lot of coffee.
          </p>

          <p className="font-mono text-[10px] text-[var(--color-ink-faint)]/60">
            psst — open devtools and try{" "}
            <code className="text-[var(--color-accent)]">haziq()</code>
          </p>

          <MagneticButton
            as="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="inline-flex items-center gap-2 self-start rounded-full border border-[var(--color-line)] px-4 py-2 text-xs text-[var(--color-ink-dim)] hover:text-[var(--color-ink)] hover:border-[var(--color-ink-faint)] transition-colors sm:self-auto"
          >
            <motion.span
              className="inline-flex"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <ArrowUp size={13} />
            </motion.span>
            Back to top
          </MagneticButton>
        </div>
      </div>
    </footer>
  );
}
