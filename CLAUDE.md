@AGENTS.md

# 3D Portfolio — ASURA · төслийн заавар (Claude)

> Энэ нь immersive, scroll-driven creative portfolio. Owner: **ASURA** · github.com/Asura-lab · repo `3D-Portfolio`. Зорилго: **freelance**. Трилингва **EN / MN / JP**.

## 📓 Баримт бичиг — ЭХ СУРВАЛЖ (дизайн/контентод гар хүрэхээсээ өмнө унш)

`docs/` нь Obsidian vault руу холбосон **junction** (эх сурвалж нь repo-д биш; gitignore-д тул commit хийхгүй):

- `docs/00-overview.md` — тойм, **locked шийдвэрүүд**, алсын хараа
- `docs/01-tech-stack.md` — стек, **"уусгалттай scroll"-ийн жор**, install, performance дүрэм
- `docs/02-design-language.md` — creative direction, scroll choreography, motion зарчим, өнгө/typography
- `docs/03-content.md` — bio, skills, **төслүүд** (сайтад оруулах бодит контент)
- `docs/04-roadmap.md` — phase-by-phase төлөвлөгөө
- `docs/decisions/` — шийдвэрийн бичлэгүүд (decision records)

## Positioning ба гол санаа (locked — re-litigate хийхгүй)

- **Positioning:** вэб & апп хөгжүүлэлт **ГОЛ**; + санхүүгийн зах зээлийн **ML/DL** сонирхол; + **embedded** туршлага.
- ⚠️ **"Game developer" гэж брэндлэхгүй** — Lucentia-г backend/systems өнцгөөр харуул.
- **Signature:** **Кодоор бүтээсэн (procedural) 3D робот** scroll-ийг дагаж хэсгүүдийг хөтөлнө — гадны GLB/FBX дүр/asset ашиглахгүй (хэрэглэгчийн шийдвэр 2026-06-01: дүр зохиох/анимейшнлэх хэт хүнд). Анимейшнийг ч кодоор (хэсэг бүрт дохио зангаа). `src/components/three/Scene.tsx`.
- **"Wow" = scroll choreography** (Lenis + GSAP ScrollTrigger + R3F), зүгээр 3D объект биш.
- Эхлэх дараалал: **бүтэц → motion → 3D** (нэг дор бүгдийг биш).

## Tech stack (locked)

- **Next.js 16** (App Router, Turbopack default) · React 19 · TypeScript · **Tailwind v4**
- **i18n:** next-intl (EN / MN / JA)
- **Smooth scroll:** Lenis (+ GSAP ScrollTrigger-ийг **нэг ticker** дээр)
- **Motion:** GSAP, Motion (Framer Motion — `motion/react`)
- **State:** Zustand · **Deploy:** Vercel
- **3D (Phase 3):** Three.js · React Three Fiber · drei · postprocessing — **client-only** (`dynamic(..., { ssr:false })`)

## ⚠️ Next.js 16 — training-аас ӨӨР breaking changes

Код бичихээс өмнө `node_modules/next/dist/docs/`-ийн холбогдох guide-ыг унш (AGENTS.md мандат). Энэ төсөлд аль хэдийн тулгарсан гол зүйлс:

- **`middleware` → `proxy`**: locale redirect нь `src/proxy.ts`-д (default export `createMiddleware(routing)`). Proxy нь **edge runtime ДЭМЖИХГҮЙ**, nodejs дээр ажиллана.
- **`params` / `searchParams` / `cookies` / `headers` бүгд async** — `await` заавал.
- **Turbopack default** (`--turbopack` флаг хэрэггүй). **`next lint` устсан** → `eslint` шууд.
- **Tailwind v4:** `@theme` token (хуучин `tailwind.config.js` байхгүй).
- CSS `scroll-behavior: smooth` **ТАВИХГҮЙ** — Lenis өөрөө scroll-ийг хариуцна (эс бол зөрөлдөнө).
- Windows скрипт: PowerShell-д `[locale]` нь wildcard — bracket-тэй замд `Test-Path -LiteralPath` ашигла.

## Codebase бүтэц ба конвенц

```
src/
  app/[locale]/        layout.tsx (html/body, fonts, NextIntlClientProvider, SmoothScroll) + page.tsx (one-page)
  app/globals.css      @theme design tokens (өнгө + font CSS хувьсагч)
  i18n/                routing.ts · request.ts (message ачаалал) · navigation.ts (Link/useRouter wrapper)
  proxy.ts             next-intl locale redirect
  components/          Header · LanguageSwitcher · SmoothScroll · ScrollLink + sections/
  lib/lenis-store.ts   Lenis instance (zustand) → in-page scrollTo
messages/{en,mn,ja}.json   бүх текст key-тэй (EN master · MN орчуулсан · JP одоо EN placeholder)
```

**Өөрчлөлт хийхэд:**
- Шинэ текст → `messages/*.json`-д key нэм (**EN + MN заавал**; JP одоогоор EN хувилбар).
- Шинэ section → `src/components/sections/`, `page.tsx`-д залга, Header nav-д `id` нэм, `scroll-mt-24` өг.
- **Server Component default**; зөвхөн state/effect/browser API/event хэрэгтэй үед л `"use client"`.
- In-page холбоос → `ScrollLink` (Lenis-ээр уусгалттай гүйлгэнэ).
- Lenis + GSAP-ийг **ЗААВАЛ нэг ticker** дээр (`SmoothScroll.tsx`) — эс бол scroll/animation зөрж чичирнэ.
- Design token-аар л өнгө/фонт өг (`bg-background`, `text-foreground`, `text-muted`, `text-accent`, `border-line`, `font-display`).

## Project rules

- **Comment болон баримтыг МОНГОЛоор** бич (tech jargon англиар). **Commit message Монголоор.**
- **`prefers-reduced-motion`-ийг ҮРГЭЛЖ хүндэл** (CSS + Lenis-ийг огт эхлүүлэхгүй). **Performance бол UX.**
- **Mobile-д хялбаршуул** — desktop-ийн бүх эффектийг шахаж оруулахгүй.
- **Ганц хөгжүүлэгч** — багийн хэмжээний process санал болгохгүй.
- Хувилбар/package санал болгоход **latest-ийг шалгахыг** сануул (ecosystem хурдан хувьдаг).
- Function бүр comment-тэй; restraint = premium (хэт олон эффект нэг дор биш).

## Commands

```bash
npm run dev     # http://localhost:3000
npm run build   # production build (TypeScript + бүх locale SSG)
npm run start
npm run lint
```

## Verify (өөрчлөлтийн дараа)

`npm run build` ногоон эсэхийг шалга (TypeScript + `/en` `/mn` `/ja` SSG). Шаардвал dev дээр `/` → `/en` redirect ба гурван locale 200 буцаахыг curl-аар шалга.

## Git

Remote `origin` = `https://github.com/Asura-lab/3D-Portfolio.git`. Branch `master`. **Хэрэглэгч хүсээгүй бол commit/push хийхгүй.**

## Төлөв

**Phase 0–1 дууссан** ✅ — i18n суурь (EN/MN/JP), Lenis smooth scroll, design tokens + fonts, бүх static хэсэг (Hero/About/Work/Skills/Lab/Contact) бодит контентоор, responsive + a11y суурь. Дараа: **Phase 2** motion (GSAP reveal/SplitText/pinned Work) → **Phase 3** signature 3D дүр. Дэлгэрэнгүй: `docs/04-roadmap.md`.
