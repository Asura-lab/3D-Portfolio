import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";
import AnimatedHeading from "@/components/AnimatedHeading";

// Чадварын бүлгийн хэлбэр
type SkillGroup = {
  title: string;
  note: string;
  items: string[];
};

// Skills — positioning-аар эрэмбэлсэн (03-content#5). Бүлэг бүр дараалан reveal.
export default function Skills() {
  const t = useTranslations("skills");
  const groups = t.raw("groups") as SkillGroup[];

  return (
    <section
      id="skills"
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

      <AnimatedHeading
        as="h2"
        text={t("heading")}
        className="max-w-3xl font-display text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-tight tracking-tight text-foreground"
      />

      <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((g, i) => (
          <Reveal key={g.title} delay={i * 0.06}>
            <div className="mb-4 flex items-baseline gap-2">
              <h3 className="text-base font-medium text-foreground">{g.title}</h3>
              {g.note && (
                <span className="text-xs lowercase tracking-wide text-accent">
                  {g.note}
                </span>
              )}
            </div>
            <ul className="flex flex-wrap gap-2">
              {g.items.map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-line bg-surface px-3 py-1.5 text-sm text-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
