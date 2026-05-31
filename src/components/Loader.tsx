"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

// Нээлтийн intro — ASURA wordmark + өсөх зураас, дараа нь дээш "wipe" хийж сайтыг нээнэ.
// prefers-reduced-motion бол огт харагдахгүй (шууд сайт).
export default function Loader() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduce) {
      setDone(true);
      return;
    }
    const t = setTimeout(() => setDone(true), 1700);
    return () => clearTimeout(t);
  }, [reduce]);

  if (reduce) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.span
            className="font-display text-2xl font-semibold tracking-[0.4em] text-foreground"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            ASURA
          </motion.span>
          {/* Өсөх accent зураас */}
          <motion.span
            className="mt-4 block h-px bg-accent"
            initial={{ width: 0 }}
            animate={{ width: 160 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
