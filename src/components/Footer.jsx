import { PROFILE, NAV_LINKS } from "../constants/data";

export default function Footer() {
  return (
    <footer className="relative border-t border-[var(--color-line)] px-6 py-10 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-lg font-medium">
            Haziq<span className="text-[var(--color-accent)]">.</span>
          </p>
          <p className="mt-1 text-xs text-[var(--color-ink-faint)]">
            © {new Date().getFullYear()} {PROFILE.name}. Built with React &amp; a lot of coffee.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-[var(--color-ink-faint)]">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-[var(--color-ink)] transition-colors">
              {link.label}
            </a>
          ))}
        </nav>

        <p className="font-mono text-[10px] text-[var(--color-ink-faint)]/60">
          psst — open devtools and try{" "}
          <code className="text-[var(--color-accent)]">haziq()</code>
        </p>
      </div>
    </footer>
  );
}
