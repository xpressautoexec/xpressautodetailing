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
7. Visual system: white primary, off-white `bg-tint`, one accent `electric` (#1D4ED8), charcoal
   (`bg-charcoal`) for at most two bands per page, `<Swoosh />` max one per screen, cards
   `rounded-card` + hairline border, no shadows/gradients. Headings Barlow Condensed, body Inter.
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
Tint + PPF share `/protection/ppf#tint`.

Phone 587-500-4523 · support@xpressautodetail.ca · Calgary, Airdrie, Chestermere,
Cochrane, Okotoks, Rocky View County. Standard booking → fieldd.co.
