export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[var(--color-void)]">
      <div
        className="absolute -top-40 -left-40 h-[38rem] w-[38rem] rounded-full opacity-40 blur-[120px] animate-float"
        style={{
          background:
            "radial-gradient(circle, var(--color-primary) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-1/3 -right-40 h-[34rem] w-[34rem] rounded-full opacity-30 blur-[120px] animate-float"
        style={{
          background:
            "radial-gradient(circle, var(--color-secondary) 0%, transparent 70%)",
          animationDelay: "-3s",
        }}
      />
      <div
        className="absolute bottom-0 left-1/4 h-[30rem] w-[30rem] rounded-full opacity-20 blur-[130px] animate-float"
        style={{
          background:
            "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
          animationDelay: "-5s",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(color-mix(in srgb, var(--color-ink) 4%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--color-ink) 4%, transparent) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 90%)",
        }}
      />
    </div>
  );
}
