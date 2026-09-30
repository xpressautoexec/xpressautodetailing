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

export const WATER_LINE =
  "Our vans carry their own water and power — storage lot, campground, dealership or driveway, we arrive ready to work.";

export const GUARANTEES = [
  "Free cancellation",
  "No payment until service",
  "Satisfaction guarantee",
];

export const CERAMIC_CERTIFICATIONS = ["System X", "Gtechniq", "Gyeon"];

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
  {
    label: "Protection",
    href: "/protection/ppf",
    children: [
      { label: "PPF & Window Tint", href: "/protection/ppf" },
      { label: "Windshield PPF", href: "/protection/windshield-ppf" },
    ],
  },
  { label: "Detailing", href: "/detailing" },
  { label: "Xpress Pass", href: "/xpress-pass" },
  { label: "Fleet", href: "/fleet" },
  {
    label: "More",
    href: "/contact",
    children: [
      { label: "Gift Cards", href: "/gift-cards" },
      { label: "Gallery", href: "/gallery" },
      { label: "Full Price List", href: "/pricing" },
      { label: "Training", href: "/training" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
      { label: "Terms of Service", href: "/terms-of-service" },
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
  { label: "RV & Trailer Detailing", href: "/rv-trailer" },
  { label: "RV Paint Protection Film", href: "/rv-trailer/ppf" },
  { label: "RV Rental Fleet Care", href: "/rv-trailer/rental-fleet" },
  { label: "Ceramic & Paint Correction", href: "/ceramic-paint-correction" },
  { label: "Detailing", href: "/detailing" },
  { label: "Interior Detailing", href: "/detailing/interior" },
  { label: "Complete Detailing", href: "/detailing/complete" },
  { label: "Paint Protection Film", href: "/protection/ppf" },
  { label: "Window Tinting", href: "/protection/window-tint" },
  { label: "Marine & Pontoon", href: "/marine" },
  { label: "Fleet & Dealership", href: "/fleet" },
  { label: "The Xpress Pass", href: "/xpress-pass" },
];

export const FOOTER_COMPANY = [
  { label: "Gallery", href: "/gallery" },
  { label: "Full Price List", href: "/pricing" },
  { label: "Training", href: "/training" },
  { label: "Gift Cards", href: "/gift-cards" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Terms of Service", href: "/terms-of-service" },
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

/** Certification claim on the PPF page is not yet verified. */
export const PPF_CERTIFICATION_TBC = "{{PPF_CERTIFICATION_TBC}}";

export const ASSESS_DISCLAIMER =
  "No obligation. We'll tell you what it actually needs — including if that's less than you thought.";

export const ASSESS_SUCCESS =
  "Got it. We'll call you within one business day to lock in a time.";
