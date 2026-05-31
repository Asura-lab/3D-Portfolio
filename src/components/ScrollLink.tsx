"use client";

import { useLenisStore } from "@/lib/lenis-store";

// Дотоод (in-page) холбоос — Lenis байвал "уусгалттай", эс бол native гүйлгэнэ.
// Server section-ууд үүгээр smooth scroll хийнэ.
export default function ScrollLink({
  to,
  children,
  className,
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
}) {
  const lenis = useLenisStore((s) => s.lenis);

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = document.getElementById(to);
    if (!el) return;
    e.preventDefault();
    // Толгойн өндрийн төлөө дээш -72px зай үлдээнэ
    if (lenis) lenis.scrollTo(el, { offset: -72 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <a href={`#${to}`} onClick={onClick} className={className}>
      {children}
    </a>
  );
}
