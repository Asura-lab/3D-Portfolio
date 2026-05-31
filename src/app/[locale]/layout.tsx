import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter, Space_Grotesk, Noto_Sans_JP } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { routing } from "@/i18n/routing";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import { MotionConfig } from "motion/react";
import "../globals.css";

// --- Фонтууд: next/font өөрөө self-host хийж, layout shift-гүй ачаална ---
// Body — Inter (тав тухтай уншигдана)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
// Display — Space Grotesk (техник, өвөрмөц том гарчигт)
const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
// Япон glyph — Noto Sans JP. Subset том тул preload унтрааж зөвхөн ja үед ачаална.
const notoJp = Noto_Sans_JP({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-jp",
  display: "swap",
  preload: false,
});

// Бүх locale-д статик хуудас урьдчилан үүсгэнэ (SSG)
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// SEO metadata — locale бүрд орчуулгатай
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Next 16: params нь Promise — заавал await
  const { locale } = await params;

  // Дэмжигдээгүй locale → 404
  if (!hasLocale(routing.locales, locale)) notFound();

  // Статик рендер боломжтой болгоно (next-intl шаардлага)
  setRequestLocale(locale);

  // Client Component-уудад дамжуулах message-ууд
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${display.variable} ${notoJp.variable}`}
    >
      <body className="bg-background text-foreground antialiased">
        {/* reducedMotion="user" — reduced-motion үед transform унтарч, fade үлдэнэ */}
        <MotionConfig reducedMotion="user">
          {/* Дээд талын scroll progress зураас */}
          <ScrollProgress />
          <NextIntlClientProvider messages={messages}>
            {/* Lenis smooth scroll бүх агуулгыг бүрхэнэ */}
            <SmoothScroll>{children}</SmoothScroll>
          </NextIntlClientProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
