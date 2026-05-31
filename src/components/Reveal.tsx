"use client";

import { motion } from "motion/react";

// Section агуулгыг viewport-д ороход доороос дээш зөөлөн "reveal" хийнэ
// (Motion whileInView — 02-design#4, IntersectionObserver-д суурилсан, performant).
// Reduced-motion-ийг root дахь <MotionConfig reducedMotion="user"> зохицуулна:
// тэр үед transform (y) автоматаар унтарч, зөвхөн opacity fade үлдэнэ.
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      // Design доторх easing: expo-out маягийн custom cubic-bezier (02-design#4)
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
