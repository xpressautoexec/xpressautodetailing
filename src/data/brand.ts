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
export const SYSTEM_X_LINE = "Authorized System X installer";

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
  name: "SunTek® and LLumar® film",
  plain: "SunTek and LLumar film",
  certified: IS_3M_CERTIFIED,
  /** Only shown when IS_3M_CERTIFIED is true. */
  warrantyLine: IS_3M_CERTIFIED ? "10-year 3M film warranty against yellowing, bubbling and cracking." : null,
  /** Neutral description safe either way. */
  description: "Optically clear, self-healing under heat, and cut on our plotter from patterns made for your vehicle.",
};

/** Warranty & Care: plain language, no overpromising. Mirrors the /warranty page. */
export const WARRANTY = {
  workmanshipMonths: 1,
  workmanship:
    "One month on our workmanship for paint correction and coating application: if holograms, high spots or missed areas show up, we come back and fix them.",
  coating:
    "Every coating is registered with the manufacturer after application. Tiers listed as \"registered & warrantied\" carry the manufacturer's coating warranty, under the manufacturer's terms.",
  film: IS_3M_CERTIFIED
    ? "Film is installed by a 3M Certified Installer and carries a 10-year 3M film warranty against yellowing, bubbling and cracking."
    : "Film is 3M Scotchgard™ Pro. Film defects are handled under the product's own terms; ask us for the current details for your install.",
  windshield: "Windshield film is backed by ExoShield's 2-year / 50,000 km warranty.",
  care: [
    "Hand wash with a pH-neutral, coating-safe soap.",
    "No harsh chemicals, degreasers or strong solvents on coated or filmed panels.",
    "No automatic brush washes.",
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
