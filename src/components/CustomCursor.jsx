import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Renders a two-part custom cursor (dot + trailing ring).
 * Automatically disabled on touch devices via CSS media query in index.css.
 */
export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFine, setIsFine] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { damping: 28, stiffness: 300, mass: 0.4 });
  const ringY = useSpring(y, { damping: 28, stiffness: 300, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    setIsFine(fine);
    if (!fine) return;

    function handleMove(e) {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!isVisible) setIsVisible(true);
      const target = e.target;
      setIsPointer(
        !!target.closest(
          "a, button, [data-cursor-hover], input, textarea, select"
        )
      );
    }
    function handleLeave() {
      setIsVisible(false);
    }

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  if (!isFine) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100]"
      aria-hidden="true"
      style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.2s" }}
    >
      <motion.div
        className="fixed top-0 left-0 rounded-full bg-[var(--color-ink)]"
        style={{ x, y, width: 6, height: 6, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        className="fixed top-0 left-0 rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: isPointer ? 52 : 32,
          height: isPointer ? 52 : 32,
          borderColor: isPointer
            ? "var(--color-accent)"
            : "color-mix(in srgb, var(--color-ink) 40%, transparent)",
          borderWidth: 1,
          background: isPointer
            ? "color-mix(in srgb, var(--color-accent) 10%, transparent)"
            : "transparent",
          transition: "width 0.25s ease, height 0.25s ease, background 0.25s ease",
        }}
      />
    </div>
  );
}
