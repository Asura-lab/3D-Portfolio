"use client";

import { motion, useScroll, useSpring } from "motion/react";

// Дээд талын нимгэн accent зураас — scroll-ийн явцыг (0→1) харуулна.
// Lenis native scroll-ийг шинэчилдэг тул useScroll шууд ажиллана.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  // Spring-ээр зөөлрүүлж "уусгалттай" мэдрэмж өгнө
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent"
      aria-hidden
    />
  );
}
