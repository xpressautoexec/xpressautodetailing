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
7. Keep it uncluttered: no new popups/toasts/floating widgets without asking.
   Mobile-first.

## Layout

`src/App.tsx` routes + `ScrollToTop` + legacy redirects. `src/pages/` route pages
(`Detailing.tsx` reads `?tab=`, `MonthlyPlan.tsx` = Xpress Pass).
`src/components/`: `HeroSection`, `ConcernFinder` (booking card), `AutoBreadcrumbs`,
`AutoPackages`/`AddOnList`, `SEO.tsx` (meta + JSON-LD).
Nav order: Protection, Detailing, Xpress Pass, Fleet, More. Marine under RV & Trailer.
Tint + PPF share `/protection/ppf#tint`.

Phone 587-500-4523 · support@xpressautodetail.ca · Calgary, Airdrie, Chestermere,
Cochrane, Okotoks, Rocky View County. Standard booking → fieldd.co.
