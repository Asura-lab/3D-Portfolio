import { useTranslations } from "next-intl";
import ScrollLink from "@/components/ScrollLink";
import Reveal from "@/components/Reveal";
import AnimatedHeading from "@/components/AnimatedHeading";
import MagneticButton from "@/components/MagneticButton";

// Hero — сайтын том мэдэгдэл (02-design#2). Элементүүд ачаалахад дараалан гарч ирнэ
// (eyebrow → гарчгийн үгс → subline → CTA → scroll сануулга). Ирээдүйд энд
// signature 3D дүр орох тул баруун/төв зайг нөөцөлсөн текст-төвтэй эхлэл.
export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center px-6 pt-24"
    >
      <div className="mx-auto w-full max-w-6xl">
        {/* Eyebrow */}
        <Reveal delay={0}>
          <p className="mb-6 flex items-center gap-3 text-sm tracking-wide text-muted">
            <span className="inline-block h-2 w-2 rounded-full bg-accent" />
            {t("eyebrow")}
          </p>
        </Reveal>

        {/* Том display гарчиг — үг бүр stagger-аар */}
        <AnimatedHeading
          as="h1"
          text={t("headline")}
          delay={0.1}
          className="max-w-4xl font-display text-[clamp(2.5rem,8vw,6rem)] font-semibold leading-[1.02] tracking-tight text-foreground"
        />

        {/* Тайлбар мөр */}
        <Reveal delay={0.35}>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
            {t("subline")}
          </p>
        </Reveal>

        {/* CTA — magnetic */}
        <Reveal delay={0.5}>
          <div className="mt-10">
            <MagneticButton>
              <ScrollLink
                to="work"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-ink transition-transform duration-300 hover:-translate-y-0.5"
              >
                {t("cta")}
                <span
                  aria-hidden
                  className="transition-transform group-hover:translate-y-0.5"
                >
                  ↓
                </span>
              </ScrollLink>
            </MagneticButton>
          </div>
        </Reveal>
      </div>

      {/* Доод scroll сануулга */}
      <Reveal
        delay={0.7}
        className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center"
      >
        <span className="text-xs uppercase tracking-[0.25em] text-muted">
          {t("scrollHint")}
        </span>
      </Reveal>
    </section>
  );
}
