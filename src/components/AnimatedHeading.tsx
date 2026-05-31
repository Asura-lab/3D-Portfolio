"use client";

import { Fragment } from "react";
import { motion, type Variants } from "motion/react";

type Tag = "h1" | "h2" | "h3";
const MOTION_TAG = { h1: motion.h1, h2: motion.h2, h3: motion.h3 } as const;

// Контейнер → үг бүрийг дараалуулна
const container: Variants = {
  hidden: {},
  visible: (delay = 0) => ({
    transition: { staggerChildren: 0.05, delayChildren: delay },
  }),
};
// Үг → дотроо үсгүүдээ дараалуулна
const wordV: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.025 } },
};
// Үсэг бүр доороос мандана (mask доторх "rise"). reduced-motion үед MotionConfig
// transform-ийг унтрааж зөвхөн харагдана.
const charV: Variants = {
  hidden: { y: "115%" },
  visible: { y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

// Cinematic гарчиг — текстийг ҮСЭГ үсгээр mask reveal (SplitText маягийн).
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
      aria-label={text}
    >
      {words.map((word, wi) => {
        // Сүүлчийнхээс бусдад зайны (nbsp) тэмдэгт нэмж үгсийн хооронд зай үүсгэнэ.
        // Үг бүр inline-block (атом) тул дотор нь мөр таслахгүй (mid-word break-гүй).
        const chars = wi < words.length - 1 ? [...word, " "] : [...word];
        return (
          <Fragment key={wi}>
            <motion.span
              variants={wordV}
              aria-hidden
              className="inline-block overflow-hidden pb-[0.12em] align-bottom"
            >
              {chars.map((ch, ci) => (
                <motion.span key={ci} variants={charV} className="inline-block">
                  {ch}
                </motion.span>
              ))}
            </motion.span>
          </Fragment>
        );
      })}
    </MTag>
  );
}
