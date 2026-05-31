import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";
import AnimatedHeading from "@/components/AnimatedHeading";

// Lab — creative brand хэсэг (03-content#1). 3D/shader туршилтын урьдчилсан зай.
// Phase 3-4-т энд жинхэнэ WebGL туршилтууд орж ирнэ.
export default function Lab() {
  const t = useTranslations("lab");

  return (
    <section
      id="lab"
      className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28 md:py-40"
    >
      <Reveal>
        <div className="mb-12 flex items-center gap-3">
          <span className="h-px w-8 bg-accent" />
          <span className="text-xs uppercase tracking-[0.25em] text-accent">
            {t("label")}
          </span>
        </div>
      </Reveal>

      <div className="grid gap-12 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <AnimatedHeading
            as="h2"
            text={t("heading")}
            className="font-display text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-tight tracking-tight text-foreground"
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
              {t("body")}
            </p>
          </Reveal>
        </div>

        {/* Status badge */}
        <Reveal delay={0.2} className="md:col-span-4 md:col-start-9">
          <span className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-xs uppercase tracking-[0.2em] text-muted">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            {t("status")}
          </span>
        </Reveal>
      </div>
    </section>
  );
}
