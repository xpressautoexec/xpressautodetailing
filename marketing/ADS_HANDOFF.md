# Xpress Ads handoff (as of 2026-11-01)

Paste this into a new Claude session to pick up the Google Ads work for Omar (Xpress Auto & RV Detailing, Calgary).

## Accounts and where things live

| What | Where |
| --- | --- |
| Google Ads account | 336-085-6566 (user xpressautoexec@gmail.com; billing emails go to support@xpressautodetail.ca) |
| Daily data log (Google Sheet) | "Xpress Ads Monitor (data log)", file ID `1BrFf1irduFl0Iz_AXr7NQ62C1Llfaa-FT80p4JLKp1c`. Filled 5-6 AM MT by a read-only Ads script. Tabs: Daily_Campaign, By_Hour, By_Device, By_Location, Conversions, Calls, Search_Terms, Keywords, Ads, Change_History, Run_Log |
| Audit Log (Claude doc) | https://claude.ai/artifact/WLyR8ypQn6th8sGPyjq1ku: every change, approval and status. Pending rows = approved, not yet applied |
| 14-day report (Claude doc) | https://claude.ai/artifact/3PPG3v5eoAMm8ENw2aS6PN (Oct 15-28) |
| Script launcher page | https://claude.ai/artifact/PYcN7yTkPPvzG3RSetEt49 (copy buttons for Budget Calendar v3 and the one-time script) |
| Scripts (source of truth) | this repo, `marketing/google-ads-scripts/` |
| Website | Lovable project `03cd912e-0738-4d31-8564-45e5836df79d`, synced from GitHub `xpressautoexec/xpressautodetailing` main. Pricing lives only in `src/data/pricing.ts` |
| Booking | Fieldd (xpressauto.fieldd.co) |

## Rules Omar set

- Claude has no write access to Google Ads. Every change is a Google Ads Script Omar pastes, Previews, then Runs (or a manual step).
- No ad-account change without Omar's approval in chat. Log every change in the Audit Log (Approved by / Done by).
- Budgets are changed only by the Budget Calendar script.
- Recommendation format: `R-YYYYMMDD-n | campaign | change | why | expected effect | risk`.

## Daily check (scheduled task)

Run number N = days since 2026-10-16 (MT) + 1. Every 7th run: recommendations. Every 14th run: 14-day report doc. Flag only real problems, and send Omar a 3-6 line brief. If nothing is wrong, stay quiet.

## Campaigns

- Search (live since Oct 15): G | Search | Brand, Auto Detailing, Headlight Restoration, Paint Correction & Ceramic, RV Detailing & Restoration, Fleet & Commercial, Training.
- Performance Max: "Detailing" (paused Oct 15; approved to re-enable as a call test), "RV Lead Gen" (paused), Windshield PPF (not touched).

## Current plan (approved by Omar in chat 2026-10-29)

CA$1,750 Google Ads credit, landed Oct 27 for account 336-085-6566. Expiry date: check Billing > Promotions.

Flat $60/day, Oct 29 to Nov 27, set by Budget Calendar v3:

| Campaign | $/day |
| --- | --- |
| PMax Detailing (call test) | 20.00 |
| Auto Detailing (incl. new Winter Packages ad group) | 11.00 |
| Fleet & Commercial (Airdrie-only 12 km, Oct 29 to Nov 4, then locations restored) | 8.50 |
| Paint Correction & Ceramic (stays on through Nov 27, overriding the Nov $0 plan) | 7.00 |
| Headlight Restoration | 7.00 |
| Training | 5.50 |
| Brand | 1.00 |
| RV | paused for the season until Apr 1 |

30 days x $60 = ~$1,800 against ~$1,650 of credit left, so ~$150 out of pocket (Omar chose this).

After Nov 27 the Budget Calendar goes back to the monthly plan (CAD per month, Jan..Dec):

- Brand: 100,100,100,150,150,150,150,150,150,150,100,100
- Auto: 500,500,500,750,900,900,900,900,750,1200,500,500
- Headlight: 200 except May-Aug 250, Oct 500
- Paint: 0,0,0,300,600,600,600,600,300,150,0,0
- RV: 0,0,0,700,1000,1000,1000,1000,600,0,0,0
- Fleet: 250 except Apr 150
- Training: 150

## Scripts (`marketing/google-ads-scripts/`)

| File | What it does | Status |
| --- | --- | --- |
| `xpress_budget_calendar.js` | v3. Daily 4-5 AM. Credit window budgets, PMax Detailing on at $20, Airdrie week geo + backup/restore (Geo_Backup tab), monthly plan after Nov 27, writes Budget_Log + daily HEARTBEAT row | NOT installed yet: paste over the old Budget Calendar |
| `xpress_one_time_20261029.js` | Apply + both exports in one paste (DRY_RUN false; Preview is safe) | NOT run yet |
| `xpress_apply_20261029.js` | Approved edits: RV pause + label; PMax Detailing on; phrase negatives (R-20261022-1..5, R-20261027-3/-4, "at home" left out because it blocks the keyword "car detailing at home"); new Brand ad; call asset 587-500-4523 on all Search campaigns; call-first ads (Auto Mobile, Headlights Restoration, Paint Ceramic); new ad group Auto - Winter Packages (Deep Clean & Seal, 8 keywords); Airdrie fleet ad (label "Xpress Airdrie week") | Included in the one-time script |
| `xpress_export_negatives.js` | Read-only. Writes every negative to tab "Negatives" and flags ones that block own keywords | Included in the one-time script |
| `xpress_export_pmax.js` | Read-only. Writes all PMax settings, asset text, images, signals, sitelinks, negatives and geo to tab "PMax_Audit" | Included in the one-time script |
| `xpress_winter_switch_auto.js` | R-20261022-9, due Nov 1: Auto interior-only (pauses "Auto - Complete Detail" and exterior-copy ads, removes non-interior images; keeps "Auto - Winter Packages"). MODE 'SUMMER' reverses it on Apr 1 | NOT run. Run after the one-time script |

As of the Nov 1 5 AM data: none of the scripts have run, Change_History shows no change since Oct 18, and budgets were still Auto 24.19 / Headlight 6.45 / RV 24.19 enabled.

## Next steps

1. Omar runs Budget Calendar v3 and the one-time script (launcher page), then the winter switch.
2. When the "Negatives" tab exists: send Omar a keep/remove list. Remove nothing without his yes.
3. When the "PMax_Audit" tab exists: audit every word and asset in PMax "Detailing" (Omar built it a year ago), then write an edit script for approval. Look for: call focus, winter angle, interior-only prices, final URL (/detailing), brand-safe wording.
4. Manual steps for Omar: minimum call length 45 s ("Calls from ads"); test-submit the website form and confirm it reaches Google Ads.
5. Fieldd: put the 8 new "Interior Only - ..." services in a category (Settings > Pricing) and create booking shortlinks. Then add the keys to `interiorOnly.book` in `src/data/pricing.ts`. Until then the site's "Book interior only" button opens the main booking page.
6. The site links to /airdrie, which has no page (404). Offer to build an Airdrie page.
7. Unapproved recommendations still open: R-20261029-2 (new Headlight ad, winter night-driving angle), R-20261029-3 (ad schedule 6 AM-9 PM for Auto and Headlight), R-20261029-4 (Headlight DIY negatives).

## Key findings so far

- Search, Oct 15-28: $753, 396 clicks, 2 conversions ($377/lead), 4 calls.
- Old PMax Detailing, 30 days before its pause: $644, 30 calls, 8.5 conversions ($76/lead). Calls convert; the site doesn't.
- Lovable analytics, Oct 15-29: 498 visitors, 64% bounce, 43 s average session, /contact only 10 views. No website form conversion has ever been recorded.
- Search CTR 5.8% vs PMax 4.4%.
- 9 PM to 6 AM: 73 clicks, $127, 0 conversions.

## Website change shipped 2026-10-29 (commit 5e549f8)

Interior-only toggle on the two middle packages, priced at ~75% of the full package (same ratio as the Work Truck interior tier):

| Package | Sedan | SUV | 3-Row | Pickup | Time |
| --- | --- | --- | --- | --- | --- |
| Inside & Out interior only | 179 | 219 | 239 | 249 | 2 hrs |
| Deep Clean & Seal interior only | 289 | 329 | 349 | 359 | 2.5-3 hrs |

Matching Fieldd services were created the same day (mobile).
