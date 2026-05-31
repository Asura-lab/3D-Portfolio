import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";
import AnimatedHeading from "@/components/AnimatedHeading";

// Төслийн өгөгдлийн хэлбэр (messages JSON-оос t.raw-аар уншина)
type Project = {
  name: string;
  tag: string;
  year: string;
  role: string;
  stack: string[];
  description: string;
  highlight: string;
};

// Work — сонгомол төслүүд (03-content#3). Мөр бүр scroll-д орохдоо дараалан reveal.
export default function Work() {
  const t = useTranslations("work");
  const projects = t.raw("projects") as Project[];

  return (
    <section
      id="work"
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
      <Reveal delay={0.1}>
        <p className="mt-4 max-w-xl text-muted">{t("note")}</p>
      </Reveal>

      {/* Төслийн жагсаалт */}
      <div className="mt-16">
        {projects.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.06}>
            <article className="group grid gap-6 border-t border-line py-10 md:grid-cols-12">
              {/* Дугаар */}
              <div className="font-display text-sm text-muted md:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </div>

              {/* Нэр + tag + role/year */}
              <div className="md:col-span-4">
                <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent">
                  {p.name}
                </h3>
                <p className="mt-2 text-sm text-accent">{p.tag}</p>
                <p className="mt-1 text-xs text-muted">
                  {p.role} · {p.year}
                </p>
              </div>

              {/* Тайлбар + highlight + stack */}
              <div className="md:col-span-7">
                <p className="leading-relaxed text-muted">{p.description}</p>
                <p className="mt-3 text-sm text-foreground">{p.highlight}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-line px-3 py-1 text-xs text-muted transition-colors group-hover:border-foreground/30"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {/* GitHub руу */}
      <Reveal>
        <div className="mt-12 border-t border-line pt-8">
          <a
            href="https://github.com/Asura-lab"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            {t("moreLabel")}
            <span
              aria-hidden
              className="transition-transform group-hover:translate-x-0.5"
            >
              →
            </span>
          </a>
        </div>
      </Reveal>
    </section>
  );
}
