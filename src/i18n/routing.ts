import { defineRouting } from "next-intl/routing";

// Сайтын олон хэлний тохиргоо (трилингва) — 01-tech-stack#14.
// EN = master, MN/JP орчуулга. URL бүрт locale prefix: /en, /mn, /ja.
export const routing = defineRouting({
  locales: ["en", "mn", "ja"],
  defaultLocale: "en",
  // "always" — бүх хэл prefix-тэй (/en зэрэг). Хэл солих нь URL-аас тодорхой.
  localePrefix: "always",
});

// Бусад модульд ашиглах туслах төрөл
export type Locale = (typeof routing.locales)[number];
