import { useEffect, useRef } from "react";

export default function CursorSpotlight() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isFine = window.matchMedia("(pointer: fine)").matches;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!isFine || prefersReduced) return;

    function handleMove(e) {
      el.style.setProperty("--spot-x", `${e.clientX}px`);
      el.style.setProperty("--spot-y", `${e.clientY}px`);
      el.style.opacity = "1";
    }
    function handleLeave() {
      el.style.opacity = "0";
    }

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0"
      style={{
        zIndex: -5,
        opacity: 0,
        transition: "opacity 0.6s ease",
        mixBlendMode: "screen",
        background:
          "radial-gradient(600px circle at var(--spot-x, 50%) var(--spot-y, 50%), color-mix(in srgb, var(--color-accent) 13%, transparent), transparent 70%)",
      }}
    />
  );
}
