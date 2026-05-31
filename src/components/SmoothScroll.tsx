"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenisStore } from "@/lib/lenis-store";

// ScrollTrigger-ийг нэг л удаа бүртгэнэ
gsap.registerPlugin(ScrollTrigger);

// Сайтын "уусгалттай" scroll-ийн цөм (01-tech-stack#0):
// Lenis (momentum) + GSAP ScrollTrigger-ийг НЭГ ticker дээр уяна.
// Эс бол scroll утга ба animation зөрж "чичирнэ".
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const setLenis = useLenisStore((s) => s.setLenis);

  useEffect(() => {
    // ⚠️ prefers-reduced-motion: Lenis-ийг ОГТ эхлүүлэхгүй — энгийн native scroll
    // (accessibility + ёс зүй, 02-design#7).
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    // lerp бага = илүү "хүнд", уусгалттай мэдрэмж. Mobile дээр smoothTouch
    // default-аар унтраалттай (native touch илүү жигд).
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    setLenis(lenis);
    // Тест/дебаг: Lenis instance-ийг window дээр ил гаргана (Playwright scroll-д)
    (window as Window & { __lenis?: Lenis }).__lenis = lenis;

    // Lenis scroll → ScrollTrigger шинэчлэх (хоёрыг синхрончилно)
    lenis.on("scroll", ScrollTrigger.update);

    // Lenis-ийг GSAP-ийн ganц RAF loop дээр ажиллуулна
    const raf = (time: number) => lenis.raf(time * 1000); // GSAP сек → Lenis ms
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Цэвэрлэгээ — component unmount үед
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, [setLenis]);

  return <>{children}</>;
}
