"use client";

import { motion } from "motion/react";

// template.tsx нь navigation бүрт (жнь хэл солиход) дахин mount хийгддэг тул
// зөөлөн opacity transition өгнө (layout.tsx-аас ялгаатай нь state хадгалдаггүй).
// reduced-motion үед MotionConfig opacity-г үлдээдэг тул энэ нь зүгээр fade хэвээр.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
