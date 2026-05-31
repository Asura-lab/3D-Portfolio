# 3D Portfolio — ASURA

Immersive, scroll-driven creative portfolio. Бодит full-stack төслүүдийг WebGL/motion-оор сав баглаа болгож, **creative developer** болгон байр суурьшуулсан хувийн сайт.

> 📓 Дизайн / контент / roadmap-ийн **эх сурвалж** нь repo-д биш — Obsidian vault дотор:
> `…/Obsidian Vault/01-Projects/Portfolio-Website/` (00-overview … 04-roadmap, decisions/).

## Stack

| Давхарга | Технологи |
|----------|-----------|
| Framework | **Next.js 16** (App Router, Turbopack default) · React 19 · TypeScript |
| i18n | **next-intl** — EN / MN / JA (`/en`, `/mn`, `/ja`), EN master |
| Smooth scroll | **Lenis** (+ GSAP ScrollTrigger нэг ticker дээр) |
| Motion | **GSAP**, **Motion** (Framer Motion) |
| State | **Zustand** |
| Styling | **Tailwind CSS v4** (`@theme` tokens) |
| 3D *(дараа, Phase 3)* | Three.js · React Three Fiber · drei · postprocessing |

## Скриптүүд

```bash
npm run dev     # хөгжүүлэлтийн сервер (http://localhost:3000)
npm run build   # production build
npm run start   # build-ийг ажиллуулах
npm run lint    # ESLint (Next 16: "next lint" биш, eslint шууд)
```

## Бүтэц

```
src/
  app/[locale]/        # locale-тэй root layout + нэг хуудаст portfolio
  components/          # Header · LanguageSwitcher · SmoothScroll · ScrollLink
    sections/          # Hero · About · Work · Skills · Lab · Contact
  i18n/                # routing · request · navigation (next-intl)
  lib/lenis-store.ts   # Lenis instance-ийн zustand store
  proxy.ts             # next-intl locale redirect (Next 16: middleware → proxy)
messages/{en,mn,ja}.json
```

## Гол шийдвэрүүд (locked)

- "Wow" = **scroll choreography** (Lenis + ScrollTrigger + R3F), зүгээр 3D биш.
- Эхлэх дараалал: **бүтэц → motion → 3D**.
- **Signature санаа:** ASURA-гийн өөрийн 3D дүр scroll-ийг дагаж хэсгүүдийг хөтөлнө.
- **Positioning:** вэб & апп ГОЛ; + санхүүгийн ML/DL; + embedded. ("Game dev" гэж брэндлэхгүй.)
- **prefers-reduced-motion** үргэлж хүндэлнэ; performance бол UX.

## Төлөв

- ✅ **Phase 0–1** — i18n суурь (EN/MN/JP), Lenis smooth scroll, design tokens + fonts, бүх static хэсэг бодит контентоор, responsive + a11y суурь, build/dev ногоон.
- ⏭️ **Phase 2** — GSAP ScrollTrigger reveal, SplitText, pinned Work, hover micro-interaction.
- ⏭️ **Phase 3** — persistent `<Canvas>`, signature 3D дүр (Mixamo/Blender), scroll-linked camera.

> JP орчуулга одоогоор EN-ийн placeholder (vault: EN батлагдсаны дараа орчуулна).
