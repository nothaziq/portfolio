import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Same cursor-reactive tilt/lift used on the project cards, minus the
 * radial glow layer — for cards that should feel alive without competing
 * visually with the project grid.
 */
export default function TiltCard({ children, className = "", style, tiltAmount = 10, ...props }) {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const springRx = useSpring(rx, { stiffness: 200, damping: 20 });
  const springRy = useSpring(ry, { stiffness: 200, damping: 20 });

  function handleMouseMove(e) {
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * tiltAmount);
    rx.set((0.5 - py) * tiltAmount);
  }

  function handleMouseLeave() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRx,
        rotateY: springRy,
        transformStyle: "preserve-3d",
        perspective: 1000,
        ...style,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
