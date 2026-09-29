# CLAUDE.md

Read `AGENTS.md` in this directory first — it is the single source of truth for stack,
commands, structure, and the rules that must not be broken (pricing lives in
`src/data/pricing.ts`, no emojis, banned terms, never edit auto-generated Supabase files,
new routes must be added to `ROUTES` in `scripts/prerender.mjs`).

Verify work with `npm run build` (client + SSR + prerender) and `npm run lint`.
