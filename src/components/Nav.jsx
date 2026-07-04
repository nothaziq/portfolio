import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "../constants/data";
import MagneticButton from "./MagneticButton";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 40);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.5 }}
        className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4"
      >
        <div
          className={`flex w-full max-w-4xl items-center justify-between rounded-full px-5 py-3 transition-all duration-500 ${
            scrolled ? "glass shadow-lg shadow-black/20" : "bg-transparent"
          }`}
        >
          <a
            href="#top"
            data-cursor-hover
            className="font-display font-semibold tracking-tight text-sm"
          >
            Haziq<span className="text-[var(--color-accent)]">.</span>
          </a>

          <nav className="hidden md:flex items-center gap-8 font-mono text-[13px] text-[var(--color-ink-dim)]">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-cursor-hover
                className="relative transition-colors hover:text-[var(--color-ink)] group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--color-accent)] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <MagneticButton
            as="a"
            {...{ href: "#contact" }}
            className="hidden md:inline-flex items-center rounded-full bg-[var(--color-ink)] px-4 py-2 text-xs font-medium text-[var(--color-void)] transition-transform"
          >
            Let&apos;s talk
          </MagneticButton>

          <button
            className="md:hidden text-[var(--color-ink)]"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            data-cursor-hover
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed top-20 inset-x-4 z-40 glass rounded-3xl p-6 md:hidden"
        >
          <nav className="flex flex-col gap-4 font-mono text-sm">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-[var(--color-ink-dim)]"
              >
                {link.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="text-[var(--color-accent)]">
              Let&apos;s talk →
            </a>
          </nav>
        </motion.div>
      )}
    </>
  );
}
