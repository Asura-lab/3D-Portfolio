"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

// URL дээрх товч шошго (ja → "JP" нь танил)
const LABELS: Record<string, string> = { en: "EN", mn: "MN", ja: "JP" };

// Хэл сэлгэгч — одоогийн замыг хадгалан зөвхөн locale-г солино.
export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname(); // locale-гүй цэвэр зам

  const switchTo = (next: string) => {
    if (next === locale) return;
    router.replace(pathname, { locale: next });
  };

  return (
    <div className="flex items-center gap-1" role="group" aria-label="Language">
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span className="mx-1 text-line">/</span>}
          <button
            type="button"
            onClick={() => switchTo(l)}
            aria-current={l === locale ? "true" : undefined}
            className={
              "text-xs tracking-wide transition-colors " +
              (l === locale
                ? "text-foreground"
                : "text-muted hover:text-foreground")
            }
          >
            {LABELS[l]}
          </button>
        </span>
      ))}
    </div>
  );
}
