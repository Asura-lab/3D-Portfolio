"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedHeading from "@/components/AnimatedHeading";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Project = {
  name: string;
  tag: string;
  year: string;
  role: string;
  stack: string[];
  description: string;
  highlight: string;
};

// Work — desktop дээр хэсгийг pin хийж, төслүүдийг ХЭВТЭЭ scrub-аар үзүүлнэ
// (GSAP ScrollTrigger — Lenis-тэй нэг ticker дээр). Mobile/reduced-motion дээр
// энгийн босоо хураангуй (fallback).
export default function Work() {
  const t = useTranslations("work");
  const projects = t.raw("projects") as Project[];
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const trackEl = track.current;
          const rootEl = root.current;
          if (!trackEl || !rootEl) return;
          const amount = () => trackEl.scrollWidth - window.innerWidth;
          const tween = gsap.to(trackEl, {
            x: () => -amount(),
            ease: "none",
            scrollTrigger: {
              trigger: rootEl,
              start: "top top",
              end: () => "+=" + amount(),
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
          return () => tween.kill();
        },
      );
    },
    { scope: root },
  );

  return (
    <section
      id="work"
      ref={root}
      className="relative scroll-mt-24 md:h-screen md:overflow-hidden"
    >
      <div
        ref={track}
        className="flex flex-col gap-14 px-6 py-28 md:h-screen md:flex-row md:flex-nowrap md:items-center md:gap-10 md:px-[8vw] md:py-0"
      >
        {/* Intro panel */}
        <div className="w-full shrink-0 md:w-[32vw]">
          <div className="mb-8 flex items-center gap-3">
            <span className="h-px w-8 bg-accent" />
            <span className="text-xs uppercase tracking-[0.25em] text-accent">
              {t("label")}
            </span>
          </div>
          <AnimatedHeading
            as="h2"
            text={t("heading")}
            className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-tight tracking-tight text-foreground"
          />
          <p className="mt-5 max-w-sm text-muted">{t("note")}</p>
          <p className="mt-8 hidden items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted md:flex">
            Scroll <span aria-hidden>→</span>
          </p>
        </div>

        {/* Төслийн картууд */}
        {projects.map((p, i) => (
          <article
            key={p.name}
            className="flex w-full shrink-0 flex-col rounded-2xl border border-line bg-surface/40 p-8 backdrop-blur-sm md:w-[36vw]"
          >
            <div className="font-display text-sm text-muted">
              {String(i + 1).padStart(2, "0")}
            </div>
            <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-foreground">
              {p.name}
            </h3>
            <p className="mt-2 text-sm text-accent">{p.tag}</p>
            <p className="mt-1 text-xs text-muted">
              {p.role} · {p.year}
            </p>
            <p className="mt-5 leading-relaxed text-muted">{p.description}</p>
            <p className="mt-3 text-sm text-foreground">{p.highlight}</p>
            <ul className="mt-auto flex flex-wrap gap-2 pt-6">
              {p.stack.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-line px-3 py-1 text-xs text-muted"
                >
                  {s}
                </li>
              ))}
            </ul>
          </article>
        ))}

        {/* Төгсгөлийн GitHub panel */}
        <div className="flex w-full shrink-0 items-center md:w-[22vw]">
          <a
            href="https://github.com/Asura-lab"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-base text-foreground transition-colors hover:text-accent"
          >
            {t("moreLabel")}
            <span
              aria-hidden
              className="transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
