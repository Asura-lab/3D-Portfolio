import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";
import AnimatedHeading from "@/components/AnimatedHeading";
import MagneticButton from "@/components/MagneticButton";

// Contact — freelance CTA (03-content#6). Хувийн мэдээлэл нуусан: зөвхөн GitHub
// холбоо (LinkedIn / email / зураг байршуулахгүй).
export default function Contact() {
  const t = useTranslations("contact");

  return (
    <section
      id="contact"
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

      {/* Боломжтой эсэх badge */}
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 px-4 py-1.5 text-xs tracking-wide text-accent">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          {t("availability")}
        </span>
      </Reveal>

      <AnimatedHeading
        as="h2"
        text={t("heading")}
        delay={0.1}
        className="mt-8 max-w-3xl font-display text-[clamp(2rem,6vw,4.5rem)] font-semibold leading-[1.05] tracking-tight text-foreground"
      />

      <Reveal delay={0.2}>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
          {t("body")}
        </p>
      </Reveal>

      <Reveal delay={0.3}>
        <div className="mt-10">
          <MagneticButton>
            <a
              href="https://github.com/Asura-lab"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-ink transition-transform duration-300 hover:-translate-y-0.5"
            >
              {t("cta")}
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </a>
          </MagneticButton>
          <p className="mt-4 text-sm text-muted">{t("github")}</p>
        </div>
      </Reveal>
    </section>
  );
}
