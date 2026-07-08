import { ImageOff } from "lucide-react";

const ACCENT_MAP = {
  primary: "var(--color-primary)",
  secondary: "var(--color-secondary)",
  accent: "var(--color-accent)",
};

export default function ProjectThumbnail({ project, className = "" }) {
  const accent = ACCENT_MAP[project.accent] || ACCENT_MAP.primary;

  if (!project.image) {
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden ${className}`}
        style={{
          background: `linear-gradient(135deg, color-mix(in srgb, ${accent} 22%, var(--color-surface-2)) 0%, var(--color-surface-2) 70%)`,
        }}
      >
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(color-mix(in srgb, var(--color-ink) 6%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--color-ink) 6%, transparent) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="relative flex flex-col items-center gap-2 text-[var(--color-ink-faint)]">
          <ImageOff size={22} strokeWidth={1.5} />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
            Preview coming soon
          </span>
        </div>
      </div>
    );
  }

  if (project.imageFit === "contain") {
    return (
      <div
        className={`flex items-center justify-center overflow-hidden bg-[var(--color-surface-2)] ${className}`}
      >
        <img
          src={project.image}
          alt={`${project.title} interface preview`}
          loading="lazy"
          className="h-[92%] w-auto object-contain transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
    );
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      <img
        src={project.image}
        alt={`${project.title} interface preview`}
        loading="lazy"
        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
      />
    </div>
  );
}
