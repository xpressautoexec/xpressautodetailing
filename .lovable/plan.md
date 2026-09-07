# Simplify & professionalize the site

Goal: fewer interruptions, fewer competing buttons, a cleaner top menu, and one clear detailing page.

## 1. Remove the popup clutter

Today most pages stack: a promo popup, a sticky mobile bar, a sticky desktop booking bar, a floating "social proof" toast, a floating contact bubble, and a chat bubble — up to six things fighting for attention.

Keep only:
- One sticky mobile call/book bar (mobile only)
- The chat bubble

Remove sitewide: home promo popup, seasonal popup, interior popup, ceramic popup, RV popup, social proof toast, floating contact bubble, desktop sticky booking bar. Popup components are deleted, not just unused.

## 2. One button per moment

Each section gets a single primary action ("Book Now") with at most one quiet secondary link (Call). Duplicate CTA blocks stacked back-to-back on a page are merged into one.

## 3. Cleaner top menu

New menu (5 items instead of 6 crowded ones):

- Detailing → single page `/detailing` (Interior · Complete · Add-Ons in one place)
- Protection → Paint & Ceramics · PPF · Window Tinting · Windshield PPF
- Marine → Marine & Pontoon Detailing
- RV & Trailer → RV & Trailer Detailing · RV Rental Fleet Care
- Fleet (direct link)
- More → Gallery · Reviews · Gift Cards · Training · Blog · Contact

"Why Choose Us" and "Terms" move into the footer only. Mobile menu mirrors the same structure.

## 4. Merged detailing page

New `/detailing` page with tabbed sections: Interior · Exterior · Complete · Add-Ons. Existing pricing, package details and time estimates are carried over unchanged. Old URLs (`/interior-detailing`, `/complete-detailing`, `/exterior-detailing`, `/add-ons`) redirect to `/detailing` with the matching tab open, so nothing indexed breaks.

## 5. Homepage trim

Current homepage runs 14 sections. Tightened order:

Hero → Trust stats → How it works → Services grid → Google reviews → About → Reviews/testimonials (one block, not two) → Benefits → FAQ → Final CTA → Footer

Removed/merged: duplicate trust badge row, brand partner + company logo double band (merged into one logo strip), app showcase folded into the About area, Instagram feed moved lower or dropped.

## 6. Visual polish

More whitespace between sections, consistent section padding, one accent color for actions only, quieter badges and fewer colored pills. No new color tokens.

## Technical notes

- Delete: `HomePromoPopup`, `SeasonalPromoPopup`, `InteriorPromoPopup`, `CeramicPromoPopup`, `RVPromoPopup`, `SocialProofToast`, `FloatingContact`, `StickyBookingBar` + all their imports across pages
- New `src/pages/Detailing.tsx` with tab state driven by `?tab=` / hash; old routes become `<Navigate replace>`
- Update `Navbar.tsx` desktop + mobile arrays, `Footer.tsx`, `sitemap.xml`, breadcrumb `ROUTE_LABELS`
- SEO preserved: canonical on `/detailing`, JSON-LD kept per service section
