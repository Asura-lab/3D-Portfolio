"use client";

import { motion, type Variants } from "motion/react";

type Tag = "h1" | "h2" | "h3";

// Motion-ийн харгалзах tag-ууд (typed)
const MOTION_TAG = { h1: motion.h1, h2: motion.h2, h3: motion.h3 } as const;

// Контейнер — үгсийг дараалан (stagger) гаргана
const container: Variants = {
  hidden: {},
  visible: (delay = 0) => ({
    transition: { staggerChildren: 0.06, delayChildren: delay },
  }),
};

// Үг бүр доороос мандаж, бүдгээс тод болно.
// (reduced-motion үед MotionConfig нь y-г унтрааж зөвхөн opacity-г үлдээнэ.)
const word: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

// Cinematic гарчиг — текстийг үг болгон хувааж stagger-аар reveal хийнэ (02-design#5).
export default function AnimatedHeading({
  text,
  as = "h2",
  className,
  delay = 0,
}: {
  text: string;
  as?: Tag;
  className?: string;
  delay?: number;
}) {
  // Union (h1|h2|h3)-ийг нэг тодорхой motion төрөл рүү cast — props ижил тул аюулгүй
  const MTag = MOTION_TAG[as] as typeof motion.h1;
  const words = text.split(" ");

  return (
    <MTag
      className={className}
      variants={container}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
    >
      {words.map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          variants={word}
          className="inline-block whitespace-pre"
        >
          {w}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </MTag>
  );
}
