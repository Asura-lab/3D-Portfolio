import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";
import AnimatedHeading from "@/components/AnimatedHeading";

// About — хэн бэ, юу хийдэг (03-content#4 bio). Гарчиг stagger-аар, агуулга reveal-ээр.
export default function About() {
  const t = useTranslations("about");

  const meta = [
    { label: t("focusLabel"), value: t("focus") },
    { label: t("educationLabel"), value: t("education") },
    { label: t("locationLabel"), value: t("location") },
    { label: t("languagesLabel"), value: t("languages") },
  ];

  return (
    <section
      id="about"
      className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28 md:py-40"
    >
      {/* Хэсгийн шошго */}
      <Reveal>
        <div className="mb-12 flex items-center gap-3">
          <span className="h-px w-8 bg-accent" />
          <span className="text-xs uppercase tracking-[0.25em] text-accent">
            {t("label")}
          </span>
        </div>
      </Reveal>

      {/* Том гарчиг */}
      <AnimatedHeading
        as="h2"
        text={t("heading")}
        className="max-w-3xl font-display text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-tight tracking-tight text-foreground"
      />

      <div className="mt-12 grid gap-12 md:grid-cols-12">
        {/* Намтар */}
        <Reveal delay={0.1} className="space-y-5 md:col-span-7">
          <p className="text-lg leading-relaxed text-muted">{t("body")}</p>
          <p className="text-lg leading-relaxed text-muted">{t("body2")}</p>
        </Reveal>

        {/* Meta жагсаалт */}
        <Reveal delay={0.2} className="md:col-span-4 md:col-start-9">
          <dl className="space-y-6">
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="text-xs uppercase tracking-[0.2em] text-muted">
                  {m.label}
                </dt>
                <dd className="mt-1 text-sm text-foreground">{m.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
