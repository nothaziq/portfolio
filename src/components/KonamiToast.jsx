import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function KonamiToast({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 30, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 20, x: "-50%" }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="glass fixed bottom-8 left-1/2 z-[95] flex items-center gap-3 rounded-full px-5 py-3 shadow-lg shadow-black/30"
        >
          <Sparkles size={16} className="text-[var(--color-accent)]" />
          <span className="font-mono text-xs text-[var(--color-ink)]">
            Konami code unlocked — you clearly pay attention to detail.
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
