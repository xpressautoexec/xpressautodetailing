# Xpress Auto Detailing

Mobile detailing site (Calgary, AB). React 18 + TS + Vite 5 + Tailwind v3 + shadcn/ui,
React Router v6 (lazy), Lucide icons, Supabase (Lovable Cloud) + Resend.
Build: `npm run build` = client build + SSR build of `src/entry-server.tsx` +
`node scripts/prerender.mjs`. All three must pass. Lint: `npm run lint`.

## Rules

1. Prices/service names live in `src/data/pricing.ts`, copy in `src/data/copy.ts`.
   Never hardcode them in pages — duplicated prices have already drifted.
2. New route → add to `ROUTES` in `scripts/prerender.mjs`. A route rendering
   `<Navigate>` must stay out of `ROUTES` (empty HTML fails the build); keep the
   runtime redirect in `src/App.tsx`.
3. Never edit auto-gen: `src/integrations/supabase/{client,types}.ts`,
   `previewAuthStorage.ts`, `.env`, `supabase/config.toml`.
4. No emojis (Lucide only). Banned terms: "Money-Back Guarantee", "Trained &
   Certified", "Fully Insured", "Eco-Friendly".
5. No hardcoded color utilities (`text-white`, `bg-[#...]`) — use tokens in
   `src/index.css` (`--brand-dark`, `--brand-blue`, `--primary`) and shadcn variants.
6. Roles: separate `user_roles` table + `security definer` `has_role()`, never a
   column on profiles. Every new public table needs `GRANT`s + RLS in the same migration.
7. Visual system (main site, `.main-site` in index.css; /lp keeps the legacy theme): LLumar-style.
   White base, warm `bg-tint` surface, deep-navy `--ink` headlines, bright logo blue `--primary` for
   rules/icons, darker `--action` blue for white-labelled pill buttons, `--dark` for the "WHY ___" band.
   Display headings Unbounded uppercase (`llumar-hero-title`, `display-xl`, `why-title`), body Sofia Sans.
   Heroes = `<ServicePageHero />` (shaped `slanted-photo`); mega menu data in `src/data/navigation.ts`;
   `<WhyBand />` (data in `src/data/why.ts`) on service hubs; brand pages via `<BrandProductPage />` +
   `src/data/brand-pages.tsx`. Authorized installer: SunTek, LLumar, CARPRO, System X, Gyeon, Gtechniq.
   One primary CTA per section: `<QuoteLink />` ("Get a quote"); text/call/book are outlined or links.
   Leads: `<QuoteForm />` (in `<QuoteSection />`, above the FAQ on service/landing pages, on / and /quote)
   writes `quote_requests` + photos in the private `quote-photos` bucket; trigger -> `notify-quote` emails
   support@. Fieldd "Book online" only on pricing cards and the quote confirmation.
   Job receipts: `jobs` table (seed copy in src/data/jobs.ts), photos = asset path or https URL.
   "Next openings" strip under service heroes reads `next_openings` (hidden when none upcoming).
   Shared pieces: <WalkaroundGuarantee />, <CrewSection /> (CREW in data/season.ts), <Lightbox />, <ScrollRail />.
   Paid-ad landing pages live in src/pages/lp (routes /lp/*): <LpShell /> (noindex, logo + phone, no nav),
   blocks in components/lp. Keep them out of the sitemap. One CTA type per page.
   Brand system: src/data/brand.ts (named programs with TM on first mention, CTA wording, STATS,
   Xpress Process 01-06, warranty/care text, B2B testimonials) and src/config/site.ts
   (IS_3M_CERTIFIED gates every 3M certification/warranty claim; SEASON). CTA wording is fixed:
   Get a quote / Text us photos / Call 587-500-4523 / Book online / Request a yard walk / Book a free assessment.
   Quote forms carry `data-quote-form`; the mobile bar (mounted by `Footer`) hides when one is on screen.
8. Keep it uncluttered: no new popups/toasts/floating widgets without asking.
   Mobile-first.

## Blog

Posts are JSON files in `src/content/blog/<slug>.json` (schema in `src/data/blog.ts`). Adding a
file is all it takes: page, /blog card, prerender and sitemap entry are automatic. No prices,
invented stats, testimonials or case studies in posts; link to the service page instead.

## Layout

`src/App.tsx` routes + `ScrollToTop` + legacy redirects. `src/pages/` route pages
(`Detailing.tsx` reads `?tab=`, `MonthlyPlan.tsx` = Xpress Pass).
`src/components/`: `HeroSection`, `ConcernFinder` (booking card), `AutoBreadcrumbs`,
`AutoPackages`/`AddOnList`, `SEO.tsx` (meta + JSON-LD).
Nav order: Car Detailing, Ceramic & PPF, RV & Trailer, Fleet, Reviews, More (Xpress Pass, Headlights,
Windshield Film, Marine, Gallery, Training, Gift Cards, Blog). Header: phone + one "Get a quote".
Window tint lives at `/window-tint` (+ `/llumar`, `/suntek`).

Phone 587-500-4523 · support@xpressautodetail.ca · Calgary, Airdrie, Chestermere,
Cochrane, Okotoks, Rocky View County. Standard booking → fieldd.co.
