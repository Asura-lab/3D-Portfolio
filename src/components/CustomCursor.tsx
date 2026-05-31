"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

// Custom cursor — accent цагираг хулганыг spring-ээр дагана, холбоос/товчин дээр
// томорно (02-design#4 micro-interaction). Native cursor-ийг нуухгүй (additive, аюулгүй).
// Touch / prefers-reduced-motion дээр огт харагдахгүй.
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return; // зөвхөн хулгана + хөдөлгөөн зөвшөөрсөн үед
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      setHover(!!t?.closest("a, button, [role='button'], input, textarea"));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[100] -ml-3 -mt-3 h-6 w-6 rounded-full border border-accent mix-blend-difference"
      animate={{ scale: hover ? 1.8 : 1, opacity: hover ? 0.6 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    />
  );
}
