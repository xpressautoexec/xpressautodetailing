# Website refresh — 3 new services + popups

Based on Calgary competitor research (Calgary PPF Pros, Pro Window Tinting, Obsidian Auto, Scrub Lab, Dyck's, Okanagan Marine Guys). All prices include $25 mobile fee where applicable.

## 1. Marine Detailing — `/marine`

Positioned as "The only truly mobile marine detailer in Southern Alberta." Per-foot pricing, packages + à la carte.

**Packages (per ft):**
- Wash & Wax — **$18/ft**
- Interior Detail — **$28/ft**
- Exterior Polish & Seal — **$45/ft**
- Full Interior + Exterior — **$65/ft** (most popular)
- Marine Ceramic Coating — **$85/ft**

**À la carte:**
- Aluminum Pontoon Acid Restoration — **$55/ft**
- Oxidation Removal / Heavy Compound — **$40/ft**
- Engine Bay Detail — **$120**
- Canopy / Bimini Cleaning — **$80**
- Trailer Wash — **$60**

Sections: hero, "only mobile marine crew" positioning, package cards, aluminum-pontoon feature, before/after strip, FAQ, CTA. Booking → Call (custom quote).

## 2. Paint Protection Film — `/ppf`

Interactive package selector. 5 vehicle packages + 2 add-ons. Films: **XPEL Ultimate Plus** and **3M Pro Series** (brand logos in hero).

**Packages:**
1. Bumper Only — **$599**
2. Partial Front (bumper + 18" hood + fenders + mirrors) — **$999**
3. Full Front (full hood/fenders/bumper/mirrors/headlights) — **$1,899**
4. Track Pack (Full Front + rockers + A-pillars + door cups) — **$2,899**
5. Full Body — **$5,999**

**Add-ons:** Windshield PPF **$699** · Interior Screen PPF **$149**

**Coverage diagram:** SVG top-down car outline; hovering/clicking a package highlights the panels covered (bumper, hood %, fenders, mirrors, etc.). Package cards below show price + inclusions + 10-year warranty badge.

Oversized/truck +15%, exotic +25% shown as note.

## 3. Window Tinting — `/window-tinting`

Interactive **Basic Carbon ↔ Ceramic IR** toggle. Prices for every coverage option flip live.

**Coverage grid (Basic / Ceramic):**
| Coverage | Basic Carbon | Ceramic IR |
|---|---|---|
| 2 Front Windows | $199 | $279 |
| Rear Windshield | $149 | $199 |
| Full Car (no windshield) | $399 | $549 |
| Full Car + Windshield | $599 | $799 |
| Windshield Only | $249 | $349 |
| Sunroof | $99 | $149 |

SUV / truck / 3-row +$50. Mobile fee ($25) included.

Sections: hero, tint-type toggle + coverage cards (prices animate on switch), coverage diagram (car outline highlighting selected windows), benefits (heat/UV/privacy), Alberta legal note (35% front minimum), FAQ, CTA.

## 4. Homepage services grid

Add 3 new cards (Marine, PPF, Window Tinting) alongside Complete Detail, Ceramic, RV, Fleet. Grid becomes 4×2 on desktop / 2-col on mobile.

## 5. Navbar

- **Detailing** dropdown: keep as-is
- **Protection** dropdown (new or merged): Paint & Ceramics · **PPF (new)** · **Window Tinting (new)** · Windshield PPF
- **More** dropdown: add **Marine (new)** · RV · Fleet · Training · Blog · Gallery

## 6. Popup refresh

Update existing seasonal / home / interior / ceramic / RV popups to rotate current promo copy mentioning the new services:
- Home popup → "Now offering PPF, Ceramic Tint & Marine Detailing"
- Seasonal popup → summer marine push
- Ceramic popup → cross-sell to PPF combo (PPF + Ceramic bundle mention)

## Technical

- 3 new pages under `src/pages/`, added to `App.tsx` routes and `sitemap.xml`
- Reusable `<CoverageDiagram />` SVG for PPF and Tint pages
- Prices in each page as typed constants for easy edits
- All CTAs → Call (custom quote) except PPF add-ons which stay on quote flow
- Fetch XPEL & 3M logos via Firecrawl or use image gen text cards if brand assets aren't provided
- SEO: title + meta + JSON-LD Service schema on each page
- Uses existing design tokens (no new colors)

## Out of scope (ask if wanted)

- Online deposit / booking for PPF & tint (currently call-only)
- Real-time SMS quote widget
- Instagram/gallery embeds specific to new services (can reuse existing gallery)

Approve and I'll build all three pages, the nav update, homepage grid, and popup refresh in one go.