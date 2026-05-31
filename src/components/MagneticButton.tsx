"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";

// Magnetic micro-interaction (02-design#4) — cursor-ийг дагаж товч бага зэрэг
// "татагдана". Бүтэц нь үргэлж ижил (motion.span) тул hydration зөрчилгүй;
// reduced-motion үед зөвхөн handler идэвхгүй болж, товч хөдөлгөөнгүй үлдэнэ.
export default function MagneticButton({
  children,
  className,
  strength = 0.4,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);

  // Хулганы байрлалаас хамаарах x/y (spring-ээр зөөлрүүлнэ)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  // Товчны төвөөс хулганы зөрүүг strength-ээр бууруулж шилжүүлнэ
  const onMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (reduce) return; // reduced-motion: хөдөлгөөнгүй
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy, display: "inline-block" }}
      className={className}
    >
      {children}
    </motion.span>
  );
}
