import { useEffect } from "react";
import Lenis from "lenis";

// Module-level reference so components outside the hook (e.g. a modal)
// can pause/resume smooth scrolling. Lenis intercepts wheel/touch events
// itself, so toggling `document.body.style.overflow` alone doesn't stop
// the page from scrolling behind an open overlay — Lenis has to be told
// to stop too.
let lenisInstance = null;

/**
 * Initializes Lenis smooth scrolling for the lifetime of the app.
 * Respects prefers-reduced-motion by skipping smoothing entirely.
 */
export function useLenis() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisInstance = lenis;

    let frameId;
    function raf(time) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }
    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
}

/** Pauses Lenis-driven page scrolling — call when an overlay/modal opens. */
export function stopLenis() {
  lenisInstance?.stop();
}

/** Resumes Lenis-driven page scrolling — call when an overlay/modal closes. */
export function startLenis() {
  lenisInstance?.start();
}
