"use client";

import { useTranslations } from "next-intl";
import { useLenisStore } from "@/lib/lenis-store";
import LanguageSwitcher from "./LanguageSwitcher";

// Толгой — брэнд, дотоод nav (anchor), хэл сэлгэгч.
// Anchor дарахад Lenis байвал "уусгалттай" гүйлгэнэ.
export default function Header() {
  const t = useTranslations("nav");
  const lenis = useLenisStore((s) => s.lenis);

  const links = [
    { id: "about", label: t("about") },
    { id: "work", label: t("work") },
    { id: "skills", label: t("skills") },
    { id: "lab", label: t("lab") },
    { id: "contact", label: t("contact") },
  ];

  // Дотоод холбоос — Lenis-ээр (эс бол native) хэсэг рүү гүйлгэнэ
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = id === "top" ? 0 : document.getElementById(id);
    if (target === null) return;
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(target as number | HTMLElement, { offset: -72 });
    } else if (typeof target !== "number") {
      target.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/50 bg-background/60 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Брэнд */}
        <a
          href="#top"
          onClick={(e) => scrollTo(e, "top")}
          className="font-display text-lg font-semibold tracking-tight text-foreground"
        >
          ASURA
        </a>

        {/* Дотоод nav — md+ дэлгэцэнд */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                onClick={(e) => scrollTo(e, l.id)}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Хэл сэлгэгч */}
        <LanguageSwitcher />
      </nav>
    </header>
  );
}
