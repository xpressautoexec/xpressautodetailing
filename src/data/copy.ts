/**
 * Repeated site copy. Verified claims only.
 * Anything not in here that makes a claim about the business must be verified first.
 */

import { PHONE, EMAIL, HOURS, FIVE_STAR_REVIEWS, SEASON_STATS, SERVICE_AREAS } from "./pricing";

/** The ONLY four trust claims allowed in the trust bar. All verified true. */
export const TRUST_CLAIMS = [
  `${FIVE_STAR_REVIEWS} five-star Google reviews`,
  `${SEASON_STATS.rvs} RVs this season`,
  "Serving Calgary since 2024",
  "Our vans carry their own water",
];

/** "Calgary, Airdrie, Cochrane, Chestermere, Okotoks and Rocky View County" */
export const SERVICE_AREA_SENTENCE = `${SERVICE_AREAS.slice(0, -1).join(", ")} and ${SERVICE_AREAS[SERVICE_AREAS.length - 1]}`;

export const WATER_LINE =
  "Our vans carry their own water and power — storage lot, campground, dealership or driveway, we arrive ready to work.";

export const GUARANTEES = [
  "Free changes 24 hours ahead",
  "No payment until service",
  "Satisfaction guarantee",
];

/**
 * Commercial account terms. Mirrors what /fleet already states (rate in writing,
 * rotations outside business hours, monthly invoice with net terms).
 */
export const FLEET_TERMS = [
  { title: "Per-unit rate in writing", body: "Set after a yard walk, with a proposed rotation schedule." },
  { title: "Off-hours rotations", body: "Early mornings, evenings or weekends, so units stay on the road." },
  { title: "Monthly invoicing, net terms", body: "One invoice with a per-unit breakdown for your accounts team." },
  { title: "Self-sufficient on site", body: "Our vans bring their own water and power to your yard or lot." },
];

/** Owner-confirmed coverage amount. Do not reword to "Fully Insured" (banned) or add WCB. */
export const COVERAGE = "$2M liability coverage";

export const CERAMIC_CERTIFICATIONS = ["CARPRO", "System X", "Gyeon"];

/** Paint protection film installed on car and RV PPF jobs. Windshield film uses WINDSHIELD_FILM_BRAND. */
export const FILM_BRAND = "SunTek and LLumar";

/** Film named on the /lp ad pages, kept as-is so live ad copy matches the landing page. Update with the ads. */
export const LP_FILM_BRAND = "3M Scotchgard Pro";

/** Pattern software that drives our film plotter. PPF is computer-cut, not hand-cut on the paint. */
export const FILM_CUT_SYSTEM = "DigiCut";

/** Film brand installed on windshield protection film jobs (/windshield-ppf). */
export const WINDSHIELD_FILM_BRAND = "ExoShield";

/**
 * Product lines shown in the "Products we use" section on service pages.
 * Keep each line to what the brand is and what we use it for — no performance claims.
 */
export const PRODUCT_LINES = {
  suntek: { name: "SunTek", role: "Paint protection film", body: "SunTek Reaction, Ultra, Ultra Matte and Ultra Defense PPF, fitted by our authorized installer team." },
  llumar: { name: "LLumar", role: "Paint protection film", body: "LLumar Valor, Platinum Gloss, Platinum Matte and Platinum Extra PPF, fitted by our authorized installer team." },
  carpro: { name: "CARPRO", role: "DQUARTZ ceramic coating", body: "Synthetic nano-diamond reinforced ceramic coating, installed by our authorized CARPRO team. Pricing is confirmed by quote." },
  systemx: {
    name: "System X",
    role: "Graphene ceramic coatings",
    body: "Our long-term paint protection. We're an authorized System X installer, so the 9-year coating carries a manufacturer warranty.",
  },
  /** Hidden from the site for now; kept so it can be switched back on. */
  gtechniq: {
    name: "Gtechniq",
    role: "Ceramic coatings and sealants",
    body: "Coatings and sealants for paint, glass and trim, applied after correction so the finish lasts.",
  },
  gyeon: {
    name: "Gyeon",
    role: "Ceramic coatings and maintenance",
    body: "Coatings and top-ups for vehicles already protected, so maintenance matches what's on the paint.",
  },
  menzerna: {
    name: "Menzerna",
    role: "Compounds and polishes",
    body: "German-made cutting compounds and finishing polishes for paint correction on cars, trucks and boats.",
  },
  "3m": {
    name: "3M",
    role: "Gelcoat restoration",
    body: "3M abrasives and compounds for gelcoat restoration on RVs, boats and trailers.",
  },
  exoshield: {
    name: "ExoShield",
    role: "Windshield protection film",
    body: "Clear film for windshields, backed by ExoShield's 2-year / 50,000 km warranty.",
  },
} as const;

export type ProductLine = keyof typeof PRODUCT_LINES;

/** What every training graduate receives. */
export const TRAINING_CERTIFICATION = "Xpress Auto & RV Detailing certification";

export const NAP = {
  name: "Xpress Auto & RV Detailing",
  phone: PHONE,
  phoneHref: `tel:${PHONE.replace(/-/g, "")}`,
  email: EMAIL,
  emailHref: `mailto:${EMAIL}`,
  hours: HOURS,
  areas: SERVICE_AREAS,
};

/** Nav order is deliberate: the four service lines that drive quotes, then proof, then everything else. */
export const NAV_LINKS: { label: string; href: string; children?: { label: string; href: string }[] }[] = [
  { label: "Car Detailing", href: "/detailing" },
  {
    label: "Ceramic & PPF",
    href: "/ceramic-paint-correction",
    children: [
      { label: "Ceramic coating & paint correction", href: "/ceramic-paint-correction" },
      { label: "Paint protection film", href: "/paint-protection-film" },
    ],
  },
  {
    label: "RV & Trailer",
    href: "/rv-trailer",
    children: [
      { label: "RV & trailer detailing", href: "/rv-trailer" },
      { label: "RV paint protection film", href: "/rv-trailer/ppf" },
      { label: "RV rental fleet care", href: "/rv-trailer/rental-fleet" },
    ],
  },
  {
    label: "For Business",
    href: "/fleet",
    children: [
      { label: "Fleet Program", href: "/fleet" },
      { label: "Dealerships", href: "/fleet#dealerships" },
      { label: "RV Rental Fleets", href: "/rv-trailer/rental-fleet" },
      { label: "Lease Return Prep", href: "/lease-return" },
    ],
  },
  { label: "Training", href: "/training" },
  { label: "Reviews", href: "/reviews" },
  {
    label: "More",
    href: "",
    children: [
      { label: "Xpress Pass", href: "/xpress-pass" },
      { label: "Headlights", href: "/headlight-restoration" },
      { label: "Windshield Film", href: "/windshield-ppf" },
      { label: "Marine", href: "/marine" },
      { label: "Gallery", href: "/gallery" },
      { label: "Gift Cards", href: "/gift-cards" },
      { label: "Blog", href: "/blog" },
      { label: "Warranty & Care", href: "/warranty" },
    ],
  },
];

/** Heated shop in Airdrie. Drop-offs welcome; the vans still come to you everywhere else. */
export const SHOP = {
  name: "Xpress Airdrie shop",
  street: "529 Gateway Rd NE, Unit 2012",
  city: "Airdrie",
  region: "AB",
  postal: "T4B 0J6",
  full: "Unit 2012, 529 Gateway Rd NE, Airdrie, AB T4B 0J6",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=529+Gateway+Rd+NE+Unit+2012+Airdrie+AB+T4B+0J6",
  embedUrl: "https://maps.google.com/maps?q=529%20Gateway%20Rd%20NE%2C%20Airdrie%2C%20AB%20T4B%200J6&z=15&output=embed",
};

export const SERVICE_AREA_LINKS = [
  { label: "Calgary", href: "/calgary" },
  { label: "Airdrie", href: "/airdrie" },
  { label: "Cochrane", href: "/cochrane" },
  { label: "Chestermere", href: "/chestermere" },
];

export const FOOTER_SERVICES = [
  { label: "RV & trailer detailing", href: "/rv-trailer" },
  { label: "RV paint protection film", href: "/rv-trailer/ppf" },
  { label: "Paint protection film", href: "/paint-protection-film" },
  { label: "Windshield protection film", href: "/windshield-ppf" },
  { label: "RV rental fleet care", href: "/rv-trailer/rental-fleet" },
  { label: "Marine & pontoon", href: "/marine" },
  { label: "Car detailing", href: "/detailing" },
  { label: "Ceramic coating & paint correction", href: "/ceramic-paint-correction" },
  { label: "Headlight restoration", href: "/headlight-restoration" },
  { label: "Fleet & dealership", href: "/fleet" },
  { label: "Lease return prep", href: "/lease-return" },
  { label: "The Xpress Pass", href: "/xpress-pass" },
];

export const FOOTER_COMPANY = [
  { label: "Reviews & why Xpress", href: "/reviews" },
  { label: "Gallery", href: "/gallery" },
  { label: "Price comparison", href: "/calgary-detailing-price-comparison" },
  { label: "Warranty & care", href: "/warranty" },
  { label: "Gift cards", href: "/gift-cards" },
  { label: "Training", href: "/training" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Cancellation policy", href: "/cancellation-policy" },
  { label: "Privacy policy", href: "/privacy-policy" },
];

/** How it works — used on the home page. */
export const HOW_IT_WORKS = [
  {
    title: "Book or request an assessment",
    body: "Pick a package online, or ask us to come look at it first — free, no obligation.",
  },
  {
    title: "We arrive with our own water and power",
    body: "No hose, no outlet, no problem. Our vans are fully self-sufficient.",
  },
  {
    title: "We work where your vehicle sits",
    body: "Driveway, storage lot, campground, marina or job site.",
  },
  {
    title: "You inspect before we leave",
    body: "Walk around it with us. If something isn't right, we fix it on the spot.",
  },
];

/**
 * Verbatim Google reviews (Xpress Auto & RV Detail, Google Maps), re-checked Nov 12, 2026.
 * NEVER invent or paraphrase a testimonial. Trim only with an ellipsis.
 * `name` is the reviewer's name exactly as Google shows it. `vehicle` only when the review itself names it.
 */
export interface Review {
  name: string;
  vehicle?: string;
  service: string;
  text: string;
}

/** Order matters: the first three show on the homepage, so lead with a mix of car, RV and named vehicles. */
export const REAL_REVIEWS: Review[] = [
  {
    name: "Claire Erasmus",
    vehicle: "Travel trailer",
    service: "Paint correction",
    text: "We are super impressed with the paint correction on our trailer. We didn’t expect for it to look as good as it does. It looks brand new. Omar and team were punctual, friendly and went above and beyond to make sure we had a great experience and we were happy with the final result. I would highly recommend them. 10/10",
  },
  {
    name: "Kate Little",
    vehicle: "2014 Jeep",
    service: "Complete detail",
    text: "These guys are great. … We had Youssef and Adam, both lovely and kind - and honestly could not be happier with their work. My 2014 jeep looks the way it did the day we drove it off the lot!! Thanks so much guys! We will recommend you to everyone we know!!!",
  },
  {
    name: "Teni Babatunde",
    vehicle: "Honda Civic",
    service: "Interior + exterior detail",
    text: "Omar did a great job of detailing my interior and exterior of my Honda civic. He offered a great price and was extremely professional throughout the entire service. Would definitely recommend Xpress Auto to any one that needs car detailing.",
  },
  {
    name: "IllumiYYC",
    vehicle: "Hummer EV",
    service: "Full detail + ceramic coating",
    text: "Had my Hummer EV in for a full detail and ceramic coating the results were insane. They brought out a mirror finish on such a big vehicle, and the ceramic makes it pop even more. Top-tier work and great customer service. Highly recommend.",
  },
  {
    name: "Sharon Adolph",
    vehicle: "SUV",
    service: "Interior detail",
    text: "The workers were very friendly and they cared about the outcome of the cleaning. They made an extra effort to remove splinters of wood imbedded in the fabric in the cargo area of my SUV. They stayed after dark to complete the job. I really appreciated their efforts and the how thoroughly they cleaned my vehicle. Thank you so much.",
  },
  {
    name: "Muhammad Ashhad",
    service: "Complete detail",
    text: "Best mobile detailing in Calgary ! I booked them for a complete detail and the results exceeded my expectations. The attention to detail is fantastic, and they made the whole process completely hassle-free. I will definitely be using them again.",
  },
  {
    name: "Kimberly Riczu",
    service: "Car detail",
    text: "Last minute this morning I decided to get my car detailed as I haven’t in 4 years. It was embarrassing how dirty my car was to begin with however there was no judgement from Omar and my expectations were exceeded. Thank you for the incredible work and detail you put into making my car cozy again !!! Will definitely be recommending to everyone I know.",
  },
];

/** Opens the Google review form (for asking customers to leave one). */
export const GOOGLE_WRITE_REVIEW_URL = "https://g.page/r/CQ5ISLUTohBKEBM/review";
/** Opens the list of Xpress Auto & RV Detail reviews on Google. */
export const GOOGLE_REVIEWS_URL = "https://share.google/2MMngu3EuRPVNRLFP";


export const ASSESS_DISCLAIMER =
  "No obligation. We'll tell you what it actually needs — including if that's less than you thought.";

export const ASSESS_SUCCESS =
  "Got it. We'll call you within one business day to lock in a time.";


// ---------- CANCELLATION & RESCHEDULING ----------
/**
 * SINGLE SOURCE for the cancellation and rescheduling policy.
 * Terms of Service, /cancellation-policy, every FAQ and the booking chips read from here.
 * Change a number here and it changes everywhere. Do not restate the policy by hand in a page.
 */
export const CANCELLATION = {
  effective: "October 1, 2026",
  standardHours: 24,
  extendedHours: 48,
  lateReschedulePct: 10,
  lateRescheduleMin: 25,
  lateCancelPct: 25,
  noShowPct: 50,
  accessWaitMinutes: 30,
  invoiceDays: 14,
  standardServices: "Car detailing packages, add-ons, work truck packages, windshield film and Xpress Pass visits",
  extendedServices:
    "RV and trailer, marine, paint correction, ceramic coating, RV paint protection film and fleet bookings",
};

const C = CANCELLATION;

/** One-sentence version for FAQs and booking widgets. */
export const CANCELLATION_SUMMARY = `Cancel or reschedule free up to ${C.standardHours} hours before your appointment (${C.extendedHours} hours for RV, marine, correction, coating and fleet work). Inside that window a late fee applies, and we waive one late change per customer each year.`;

export const CANCELLATION_TIERS = [
  {
    label: "Standard services",
    services: C.standardServices,
    window: `${C.standardHours} hours`,
  },
  {
    label: "Extended services",
    services: C.extendedServices,
    window: `${C.extendedHours} hours`,
  },
];

export const CANCELLATION_FEES = [
  { when: "Change made before the notice window", fee: "Free" },
  {
    when: "Reschedule inside the notice window",
    fee: `${C.lateReschedulePct}% of the booked service (minimum $${C.lateRescheduleMin})`,
  },
  { when: "Cancel inside the notice window", fee: `${C.lateCancelPct}% of the booked service` },
  { when: "No-show or no access to the vehicle", fee: `${C.noShowPct}% of the booked service` },
  { when: "Weather reschedule, either side", fee: "Free" },
  { when: "We reschedule you", fee: "Free, with priority rebooking" },
];

export const CANCELLATION_SECTIONS: { title: string; body: string[] }[] = [
  {
    title: "Why there's a notice window",
    body: [
      "Every booking reserves a crew, a van and a block of the day that we turn other customers away for. Extended jobs like RV restoration or ceramic coating hold a crew for most or all of a day, so they need more notice.",
    ],
  },
  {
    title: "One late change a year, on us",
    body: [
      "Plans change. Once per customer each calendar year, we waive the late reschedule or late cancellation fee. No explanation needed. We also waive fees for genuine emergencies at our discretion.",
    ],
  },
  {
    title: "No-shows and access",
    body: [
      `If we arrive and can't reach the vehicle (it isn't at the booked address, it's locked with no keys arranged, or we can't get into the storage lot) we'll call and text you and wait ${C.accessWaitMinutes} minutes. If we still can't start, the booking counts as a no-show.`,
      "For storage lots, gated communities and job sites, please arrange access or a gate code before the appointment.",
    ],
  },
  {
    title: "Weather",
    body: [
      "We work outdoors, and rain, snow, hail, high wind or temperatures outside a product's application range can make work unsafe or affect the result. If the forecast looks wrong for your service, we'll contact you, usually the day before, to move it at no charge.",
      "You can also reschedule for weather at no charge at any time, even inside the notice window.",
    ],
  },
  {
    title: "If we need to reschedule",
    body: [
      "If we have to move your appointment, for weather, equipment or crew availability, there's never a fee to you and you get first pick of the next open slots. If we're running more than 30 minutes behind your arrival window, we'll text you with an updated time.",
    ],
  },
  {
    title: "Xpress Pass members",
    body: [
      `Member visits follow the ${C.standardHours}-hour rule. Skipping or moving a cycle with notice is always free. Missing two cycles in a row may pause your plan, and you can resume any time.`,
    ],
  },
  {
    title: "How to cancel or reschedule",
    body: [
      `Call or text ${PHONE}, email ${EMAIL}, or use the link in your booking confirmation. Notice counts from when we receive your message, and we'll confirm every change in writing.`,
    ],
  },
  {
    title: "How fees are charged",
    body: [
      `We never take payment at booking. Any late or no-show fee is calculated on the booked service total before tax, invoiced by email, and due within ${C.invoiceDays} days. GST applies.`,
    ],
  },
];
