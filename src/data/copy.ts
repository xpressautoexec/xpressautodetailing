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

export const CERAMIC_CERTIFICATIONS = ["System X", "Gtechniq", "Gyeon"];

/** Protection film brand installed on RV PPF and windshield film jobs (no standalone page). */
export const FILM_BRAND = "3M";

/**
 * Product lines shown in the "Products we use" section on service pages.
 * Keep each line to what the brand is and what we use it for — no performance claims.
 */
export const PRODUCT_LINES = {
  systemx: {
    name: "System X",
    role: "Graphene ceramic coatings",
    body: "Our long-term paint protection. We're an authorized System X installer, so the 9-year coating carries a manufacturer warranty.",
  },
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
    role: "Protection film and restoration",
    body: "3M film on RV front caps, and 3M abrasives and compounds for gelcoat restoration.",
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

/** Nav order is deliberate. */
export const NAV_LINKS = [
  {
    label: "RV & Trailer",
    href: "/rv-trailer",
    children: [
      { label: "RV Detailing", href: "/rv-trailer" },
      { label: "RV Paint Protection Film", href: "/rv-trailer/ppf" },
      { label: "RV Rental Fleet Care", href: "/rv-trailer/rental-fleet" },
      { label: "Marine & Pontoon", href: "/marine" },
    ],
  },
  { label: "Ceramic & Paint", href: "/ceramic-paint-correction" },
  { label: "Detailing", href: "/detailing" },
  { label: "Xpress Pass", href: "/xpress-pass" },
  { label: "Fleet", href: "/fleet" },
  { label: "Reviews", href: "/reviews" },
  { label: "Gallery", href: "/gallery" },
  {
    label: "More",
    href: "/blog",
    children: [
      { label: "Blog", href: "/blog" },
      { label: "Training", href: "/training" },
      { label: "Gift cards", href: "/gift-cards" },
      { label: "Contact", href: "/contact" },
      { label: "Cancellation policy", href: "/cancellation-policy" },
    ],
  },
];

export const SERVICE_AREA_LINKS = [
  { label: "Calgary", href: "/calgary" },
  { label: "Airdrie", href: "/airdrie" },
  { label: "Cochrane", href: "/cochrane" },
  { label: "Chestermere", href: "/chestermere" },
];

export const FOOTER_SERVICES = [
  { label: "RV & trailer detailing", href: "/rv-trailer" },
  { label: "RV paint protection film", href: "/rv-trailer/ppf" },
  { label: "RV rental fleet care", href: "/rv-trailer/rental-fleet" },
  { label: "Marine & pontoon", href: "/marine" },
  { label: "Car detailing", href: "/detailing" },
  { label: "Ceramic coating & paint correction", href: "/ceramic-paint-correction" },
  { label: "Fleet & dealership", href: "/fleet" },
  { label: "The Xpress Pass", href: "/xpress-pass" },
];

export const FOOTER_COMPANY = [
  { label: "Reviews & why Xpress", href: "/reviews" },
  { label: "Gallery", href: "/gallery" },
  { label: "Price comparison", href: "/calgary-detailing-price-comparison" },
  { label: "Gift cards", href: "/gift-cards" },
  { label: "Training", href: "/training" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Cancellation policy", href: "/cancellation-policy" },
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
 * Verbatim Google reviews (Xpress Auto & RV Detail, Google Maps), pulled Sept 30, 2026.
 * NEVER invent or paraphrase a testimonial. Trim only with an ellipsis.
 * Names shown as first name + last initial.
 */
export interface Review {
  name: string;
  service: string;
  text: string;
}

export const REAL_REVIEWS: Review[] = [
  {
    name: "Claire E.",
    service: "RV trailer paint correction",
    text: "We are super impressed with the paint correction on our trailer. We didn’t expect for it to look as good as it does. It looks brand new. Omar and team were punctual, friendly and went above and beyond to make sure we had a great experience and we were happy with the final result. I would highly recommend them.",
  },
  {
    name: "Kate L.",
    service: "Complete detail, Jeep",
    text: "These guys are great. … We had Youssef and Adam, both lovely and kind - and honestly could not be happier with their work. My 2014 jeep looks the way it did the day we drove it off the lot!! Thanks so much guys! We will recommend you to everyone we know!!!",
  },
  {
    name: "Teni B.",
    service: "Interior and exterior, Honda Civic",
    text: "Omar did a great job of detailing my interior and exterior of my Honda civic. He offered a great price and was extremely professional throughout the entire service. Would definitely recommend Xpress Auto to any one that needs car detailing.",
  },
];

export const GOOGLE_REVIEWS_URL = "https://g.page/r/CQ5ISLUTohBKEBM/review";


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
