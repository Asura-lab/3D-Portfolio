import { useTranslations } from "next-intl";

// Хөл хэсэг — энгийн, цөөн үгтэй (тон: confident, минимал).
export default function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear(); // SSG үед build-ийн он

  return (
    <footer className="border-t border-line/50 px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-sm text-foreground">{t("tagline")}</p>
        <p className="text-xs text-muted">{t("tech")}</p>
        <p className="text-xs text-muted">{t("copyright", { year })}</p>
      </div>
    </footer>
  );
}
