/**
 * Repeated site copy. Verified claims only.
 * Anything not in here that makes a claim about the business must be verified first.
 */

import { PHONE, EMAIL, HOURS, REVIEW_COUNT, REVIEW_SCORE, SERVICE_AREAS } from "./pricing";

/** The ONLY four trust claims allowed in the trust bar. All verified true. */
export const TRUST_CLAIMS = [
  `${REVIEW_SCORE} ★`,
  `${REVIEW_COUNT} Google reviews`,
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
      { label: "Paint Protection Film", href: "/protection/ppf" },
      { label: "Window Tinting", href: "/protection/window-tint" },
    ],
  },
  { label: "Detailing", href: "/detailing" },
  { label: "Fleet", href: "/fleet" },
  { label: "Xpress Pass", href: "/xpress-pass" },
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

/** Prominent nav CTAs shown beside the main menu. */
export const NAV_CTA_LINKS = [
  { label: "RV Fleet Care", href: "/rv-trailer/rental-fleet" },
  { label: "PPF", href: "/protection/ppf" },
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

/** Real reviews get pasted in by the owner. NEVER invent a testimonial. */
export const REVIEW_PLACEHOLDERS = [
  "{{REAL_REVIEW_1}}",
  "{{REAL_REVIEW_2}}",
  "{{REAL_REVIEW_3}}",
];

/** Certification claim on the PPF page is not yet verified. */
export const PPF_CERTIFICATION_TBC = "{{PPF_CERTIFICATION_TBC}}";

export const ASSESS_DISCLAIMER =
  "No obligation. We'll tell you what it actually needs — including if that's less than you thought.";

export const ASSESS_SUCCESS =
  "Got it. We'll call you within one business day to lock in a time.";
