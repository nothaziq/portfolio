import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function AmbientBackground() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  useEffect(() => {
    function handleMove(e) {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      mx.set(nx);
      my.set(ny);
    }
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mx, my]);

  const springConf = { stiffness: 40, damping: 20, mass: 1 };
  const sx1 = useSpring(mx, springConf);
  const sy1 = useSpring(my, springConf);
  const sx2 = useSpring(mx, springConf);
  const sy2 = useSpring(my, springConf);
  const sx3 = useSpring(mx, springConf);
  const sy3 = useSpring(my, springConf);

  const x1 = useTransform(sx1, (v) => v * -60);
  const y1 = useTransform(sy1, (v) => v * -60);
  const x2 = useTransform(sx2, (v) => v * 45);
  const y2 = useTransform(sy2, (v) => v * 45);
  const x3 = useTransform(sx3, (v) => v * -30);
  const y3 = useTransform(sy3, (v) => v * 30);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[var(--color-void)]">
      <motion.div
        style={{ x: x1, y: y1 }}
        className="absolute -top-40 -left-40 h-[38rem] w-[38rem] rounded-full opacity-40 blur-[120px] animate-float"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, var(--color-primary) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      <motion.div
        style={{ x: x2, y: y2 }}
        className="absolute top-1/3 -right-40 h-[34rem] w-[34rem] rounded-full opacity-30 blur-[120px] animate-float"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, var(--color-secondary) 0%, transparent 70%)",
            animationDelay: "-3s",
          }}
        />
      </motion.div>

      <motion.div
        style={{ x: x3, y: y3 }}
        className="absolute bottom-0 left-1/4 h-[30rem] w-[30rem] rounded-full opacity-20 blur-[130px] animate-float"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
            animationDelay: "-5s",
          }}
        />
      </motion.div>

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
