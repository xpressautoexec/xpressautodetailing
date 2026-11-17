/**
 * Brand system: named programs, the stat row, the Xpress Process, CTA wording,
 * warranty and care language. Real numbers only. Change a claim here, not in page copy.
 */
import { IS_3M_CERTIFIED } from "@/config/site";
import { FIVE_STAR_REVIEWS, SEASON_STATS, SERVICE_AREAS, PHONE } from "@/data/pricing";

/** Named systems. Use `.tm` on the first mention on a page and `.name` after. */
export const SYSTEMS = {
  protect: { name: "Xpress Protect", tm: "Xpress Protect™", what: "Paint protection film program: car PPF, RV PPF and windshield film" },
  coat: { name: "Xpress Coat", tm: "Xpress Coat™", what: "Ceramic coating tiers" },
  correct: { name: "Xpress Correct", tm: "Xpress Correct™", what: "Paint correction stages" },
  restore: { name: "Xpress Restore", tm: "Xpress Restore™", what: "RV gelcoat restoration" },
  fleet: { name: "Xpress Fleet Program", tm: "Xpress Fleet Program™", what: "Commercial accounts" },
  pass: { name: "Xpress Pass", tm: "Xpress Pass", what: "Membership" },
  care: { name: "Xpress Care Plan", tm: "Xpress Care Plan™", what: "Care package and booster visits after coating or film" },
  walkaround: { name: "The Walkaround Guarantee", tm: "The Walkaround Guarantee", what: "Sign-off before we leave" },
} as const;

/** Exact CTA wording. No other button text on the site. */
export const CTA = {
  quote: "Get a quote",
  text: "Text us photos",
  call: `Call ${PHONE}`,
  book: "Book online",
  fleet: "Request a yard walk",
  rv: "Book a free assessment",
} as const;

/** The stat row. Verified numbers only: never a star average, "largest", "#1" or "leading". */
export const STATS = [
  { value: FIVE_STAR_REVIEWS, label: "five-star Google reviews" },
  { value: SEASON_STATS.cars, label: "cars this season" },
  { value: SEASON_STATS.rvs, label: "RVs this season" },
  { value: "3", label: "vans on the road" },
  { value: String(SERVICE_AREAS.length), label: "communities served" },
  { value: "$2M", label: "liability coverage" },
];
export const INSTALLER_LINE = "Authorized SunTek, CARPRO and ExoShield installer";

/** The Xpress Process, 01–06, on every service page. */
export const XPRESS_PROCESS = [
  { title: "Inspect", body: "We look at the vehicle under proper light and agree on the work and the price before we start." },
  { title: "Decontaminate", body: "Wash, iron fallout and tar removal so nothing gets ground into the surface." },
  { title: "Correct / Prepare", body: "Machine polish, extract or prep the surface the service calls for." },
  { title: "Protect", body: "Ceramic, sealant or film, matched to how the vehicle is used and stored." },
  { title: "Walkaround", body: "You walk around it with us and sign off. Anything not right is fixed on the spot." },
  { title: "Care Plan", body: "How to wash it, what to avoid, and when to book the next visit." },
];

/** Film wording that follows the 3M certification switch. */
export const FILM = {
  name: "SunTek® film",
  plain: "SunTek film",
  certified: IS_3M_CERTIFIED,
  /** Only shown when IS_3M_CERTIFIED is true. */
  warrantyLine: IS_3M_CERTIFIED ? "10-year 3M film warranty against yellowing, bubbling and cracking." : null,
  /** Neutral description safe either way. */
  description: "Optically clear, self-healing under heat, and cut on our plotter from patterns made for your vehicle.",
};

/**
 * Manufacturer warranties, as published. Re-check when terms change (last checked Nov 2026).
 * ExoShield: GT3+/ULTRA 3-year limited warranty (getexoshield.com, GT3+ onboarding guide Jan 2025);
 *   terms from ExoShield's consumer Limited Product Warranty.
 * CARPRO: "Real World Warranty", CQUARTZ Professional 2 years, CQUARTZ Finest Reserve 3 years, DQUARTZ 2 years;
 *   registered by the certified installer at registerwarranty.carpro.global.
 */
export const MANUFACTURER_WARRANTIES = {
  exoshield: {
    brand: "ExoShield",
    title: "3-year ExoShield limited warranty",
    term: "3 years",
    summary:
      "Covers GT3+ and ULTRA film against manufacturing defects. If ExoShield finds a defect, the film is removed and replaced at no charge.",
    covers: ["Cracking", "Delamination", "Discoloration", "Hazing", "Yellowing"],
    perks: ["No mileage limit", "Transfers with the vehicle when you sell", "We register it with ExoShield for you"],
    excludes: [
      "Chips, cracks or breakage in the windshield itself",
      "Normal wear, scratches and stains",
      "Impacts, hail, collisions, sap and bird droppings",
      "Ammonia glass cleaners and other harsh chemicals",
      "Hard-water spots left to dry on the film",
    ],
    claim: "Text us photos of the issue with the film still on the glass. We send the claim to ExoShield with your original invoice.",
    source: "https://www.getexoshield.com/",
  },
  carpro: {
    brand: "CARPRO",
    title: "CARPRO Real World Warranty",
    terms: [
      { product: "CQUARTZ Professional", term: "2 years" },
      { product: "CQUARTZ Finest Reserve", term: "3 years" },
      { product: "DQUARTZ", term: "2 years" },
    ],
    summary:
      "CARPRO backs its installer-only coatings against excessive loss of gloss, chipping, peeling and fading over the warranty term. As a certified installer, we register every CARPRO coating with CARPRO.",
    covers: ["Gloss retention", "Chipping", "Peeling", "Fading"],
    perks: ["Registered with CARPRO by us after your install", "Warranty record tied to your vehicle", "Inspected by us first if anything looks off"],
    conditions: [
      "Keep the coating dry for 12 to 36 hours after we hand it back",
      "No waxes or chemical cleaners for the first 7 days",
      "No automatic car washes",
      "No clay bar on coated paint",
      "Remove bird droppings and bugs within a few days",
    ],
    excludes: [
      "Your clear coat itself, and damage from impacts or accidents",
      "Misuse, harsh chemicals or skipped care conditions",
      "Permanent water beading (contamination dulls beading; a decon wash brings it back)",
    ],
    claim:
      "Text us photos. We inspect, decontaminate and try to restore the coating first, since it is often intact under road film. If it still fails, we file it with CARPRO.",
    source: "https://registerwarranty.carpro.global/",
  },
} as const;

/** Warranty & Care: plain language, no overpromising. Mirrors the /warranty page. */
export const WARRANTY = {
  workmanshipMonths: 1,
  workmanship:
    "One month on our workmanship for paint correction and coating application: if holograms, high spots or missed areas show up, we come back and fix them.",
  coating:
    "CARPRO coatings are registered with CARPRO after application and carry its Real World Warranty: 2 years on CQUARTZ Professional and DQUARTZ, 3 years on CQUARTZ Finest Reserve.",
  film: IS_3M_CERTIFIED
    ? "Film is installed by a 3M Certified Installer and carries a 10-year 3M film warranty against yellowing, bubbling and cracking."
    : "Film is 3M Scotchgard™ Pro. Film defects are handled under the product's own terms; ask us for the current details for your install.",
  windshield: "ExoShield windshield film is backed by ExoShield's 3-year limited warranty, registered by us as a certified installer.",
  care: [
    "Hand wash with a pH-neutral, coating-safe soap.",
    "No harsh chemicals, degreasers or strong solvents on coated or filmed panels.",
    "No automatic car washes, brush or touchless.",
    "No clay bar on coated paint.",
    "Remove bird droppings and bugs within a few days.",
    "Book a booster visit every 6 months (coating-safe wash plus booster).",
  ],
};

/**
 * B2B testimonials. Rendered only when `quote` is filled in with the client's real words and
 * their approval. Never invent a quote.
 */
export type B2BTestimonial = { company: string; logo?: string; quote?: string; name?: string; title?: string };
export const B2B_TESTIMONIALS: B2BTestimonial[] = [
  { company: "KLS Earthworks" }, // TODO: quote, name, job title (with approval)
  { company: "DIRTT" }, // TODO: quote, name, job title (with approval)
  { company: "Silverhill Acura" }, // TODO: quote, name, job title (with approval)
  { company: "Midas" }, // TODO: quote, name, job title (with approval)
];
