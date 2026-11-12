# Xpress redesign: LLumar visual direction, SunTek structure

## What will change

Rebuild the main site around LLumar’s white, wide-headline design, using your logo blue and existing photography. Apply the system through shared layouts and controls so inner pages receive the same treatment—not only the homepage.

### 1. Design system and shared layouts
- White background, warm off-white surfaces, deep-navy headings, logo-blue accents, and the single dark WHY XPRESS homepage band.
- Unbounded display headings and Sofia Sans secondary headings/body; pill actions, 16px image/card corners, soft card shadows, generous spacing, blue heading rules. Remove swooshes.
- Rework shared service heroes, sections, pricing cards, FAQs, breadcrumbs, quote sections and legal/article typography. Retain existing content, photos and pricing interactions.
- Use fixed responsive headline sizes with safe line wrapping rather than viewport-scaled type that could overflow the long headings.

### 2. Navigation, search, footer and contact bar
- Five white-header mega menus: SERVICES, PROTECTION, RV & FLEET, RESOURCES and WHY XPRESS. Desktop panels include grouped links and a featured photo; mobile uses full-screen drill-down navigation.
- Working site search from the header and footer, searching the existing service/resource directory; clear result and empty states.
- Footer with your requested search heading, blue social icons, four link columns, mobile accordions, company/trademark text, and retained contact/shop/directions/legal information.
- Solid-blue bottom contact bar on every non-ad page: quote pill, outlined text-photos pill, round call action, iOS safe-area spacing. Retain form-visibility suppression to avoid covering quote forms.

### 3. Homepage, in your requested order
1. White headline-led hero with your exact headline/intro, quote and text-photo actions, and slanted Audi photo.
2. Trust row and authorized-installer logos; retain the separate client-logo strip.
3. OUR EXPERTISE: RV and Automotive columns with existing photos, benefits, overlapping vehicle images and links.
4. WHY XPRESS dark band with six icon benefits.
5. Ceramic Coating and Paint Protection Film benefit cards.
6. CARPRO DQUARTZ flagship feature.
7. RV detailing/oxidation feature.
8. Up to six job receipts with 4:3 images and always-readable overlaid captions.
9. Reviews, five-question FAQ and quote section/closing band.
10. Replace the full homepage price table with concise price-source-driven “From” links to detailing. Preserve removed homepage information on the relevant service pages; keep existing photo assets.

The earlier “what does your car need” finder is not mounted on the current homepage. Assume it should remain available and be restored as a compact selector below the hero, without replacing your requested primary actions.

### 4. New brand pages and existing hubs
- Add `/paint-protection-film/suntek/` and `/paint-protection-film/llumar/` with keyword-led heroes, question-style headings, the eight requested film-line rows, quote actions, manufacturer links and qualified warranty wording.
- Add `/ceramic-coating/carpro-dquartz/` with your required title, synthetic nano-diamond explanation, Calgary benefits, qualitative comparison with existing coatings, quote-only package cards, Xpress Pass aftercare and FAQ schema. Do not invent pricing or durability guarantees.
- Add product rows to the existing PPF and ceramic hubs without removing their coverage diagrams, package prices, existing photos or booking destinations.
- Verify product descriptions against official manufacturer information before writing technical claims.
- Update authorization sections to SunTek, LLumar, CARPRO, System X, Gyeon and Gtechniq. Remove unauthorized-brand badges, not legitimate existing product-use or warranty information.

### 5. Search visibility and preservation
- Add all three pages to browser routes, preload mapping, prerender routes and sitemap. Redirect-only routes remain excluded from prerendering.
- Audit non-ad pages for unique titles, 120–155-character descriptions, canonical addresses and inner-page breadcrumb schema. Preserve the exact requested DQUARTZ title as an exception to the general title pattern.
- Add concise standalone service descriptions beneath service-page H1s without deleting existing explanatory copy. Legal pages retain their legal text.
- Update the static business schema to LocalBusiness/AutoWash, add Rocky View County and the requested knowsAbout list.
- Preserve Google tag/conversion scripts and verification tags unchanged. Preserve Fieldd URLs, quote submission/photo handling and the existing prerender mechanism.
- **Do not restyle `/lp/*`:** freeze their current fonts, tokens, shared controls and contact-bar appearance before changing the main site. Their content, noindex settings and booking/tracking behavior remain intact.
- No database, authentication, email-function or booking-price changes.

## Assets and assumptions
- Both supplied official logo URLs downloaded successfully during reference review: SunTek SVG and LLumar PNG. Store them using the project’s hosted-asset pointers when implementing.
- CARPRO gets a clearly labelled temporary wordmark until you upload its official logo; no invented official logo. Reuse existing System X/Gtechniq assets and verify the available Gyeon asset.
- The dominant sampled logo blue is approximately **#38B6FF**. White small text on this blue fails accessible contrast. Keep it for brand accents and use a darker same-blue action token for white-labelled buttons, unless you prefer navy-labelled bright-blue pills.
- Use existing TikTok/Facebook profile URLs if present. If absent, leave those icons out and report the missing addresses rather than inventing profiles.
- Use existing page sections for FAQ, certifications, service areas and comparison destinations where no dedicated route exists; avoid dead menu links or unnecessary new pages.
- For expertise vehicle overlays, use background-removed copies when feasible; otherwise use your allowed soft-bottom-fade treatment. Originals stay untouched.

## Technical approach
- Centralize navigation/search data and authorized-brand/product metadata; keep monetary values in the existing pricing source.
- Isolate the main-site theme from legacy ad-page styling, including shared component variants and loaded legacy fonts.
- Record the theme-isolation and shared-layout conventions in the project’s architecture instructions, superseding obsolete technical styling rules without changing user-authored rules.
- Maintain a lean implementation roadmap covering shared design, homepage, navigation/footer, brand pages, SEO and verification.

## Verification and delivery
- Run relevant existing tests and add focused tests for route/preload/prerender coverage, brand authorizations and quote-only DQUARTZ pricing.
- Check the automatic client/SSR/prerender build results and inspect generated HTML for each new route.
- Exercise desktop/mobile menus, search, hub-to-brand navigation, pricing selectors and contact links; check visible quote-form behavior without submitting fabricated customer leads.
- Compare `/lp/*` before/after at desktop and mobile sizes to confirm unchanged appearance; verify tracking blocks and original prices/booking URLs remain intact.
- Finish with a change list, downloaded logos, placeholder/missing items and any verification limits. Publishing remains a separate action.