import navDetailing from "@/assets/jobs/hero-paint-ceramics.webp";
import navProtection from "@/assets/carpro-dquartz-product.webp";
import navRvFleet from "@/assets/gallery-newmar-dutch-star-front.jpg";
import navResources from "@/assets/gallery-jeep-wrangler.jpg";
import navWhy from "@/assets/jobs/crew-van-gear.webp";

export type SiteLink = { label: string; href: string };
export type NavColumn = {
  title: string;
  href: string;
  links: SiteLink[];
  /** Small pill next to the column title, used to push the services we want booked right now. */
  badge?: string;
};
export type NavGroup = {
  label: string;
  /** Big uppercase panel heading, LLumar style. */
  heading: string;
  /** Where the big heading links; defaults to the first column's hub. */
  headingHref?: string;
  columns: NavColumn[];
  image: string;
  featured: SiteLink & { body: string };
};

/** Mega menu. Hubs come first in each column so Google sees a clean category → product tree. */
export const MEGA_NAV: NavGroup[] = [
  {
    label: "Services",
    heading: "Detailing services",
    headingHref: "/detailing",
    image: navDetailing,
    featured: {
      label: "Paint correction & ceramic",
      href: "/ceramic-paint-correction",
      body: "Swirls machined out, then locked in with a ceramic coating. Done in our heated Airdrie shop all winter.",
    },
    columns: [
      {
        title: "Correction & coatings",
        href: "/ceramic-paint-correction",
        badge: "Winter pick",
        links: [
          { label: "Paint correction", href: "/paint-correction" },
          { label: "Correction + ceramic", href: "/ceramic-paint-correction" },
          { label: "CARPRO DQUARTZ", href: "/ceramic-coating/carpro-dquartz" },
          { label: "Ceramic coating", href: "/ceramic-coating" },
        ],
      },
      {
        title: "Car detailing",
        href: "/detailing",
        links: [
          { label: "Interior detailing", href: "/detailing?tab=interior" },
          { label: "Exterior detailing", href: "/detailing?tab=exterior" },
          { label: "Complete detailing", href: "/detailing?tab=complete" },
          { label: "Headlight restoration", href: "/headlight-restoration" },
        ],
      },
      {
        title: "More services",
        href: "/lease-return",
        links: [
          { label: "Lease return prep", href: "/lease-return" },
          { label: "Gift cards", href: "/gift-cards" },
        ],
      },
    ],
  },
  {
    label: "Protection",
    heading: "Protection",
    headingHref: "/paint-protection-film",
    image: navProtection,
    featured: { label: "Experience CARPRO DQUARTZ", href: "/ceramic-coating/carpro-dquartz", body: "Our flagship nano-diamond ceramic coating, applied after paint correction." },
    columns: [
      {
        title: "Correction & coatings",
        href: "/ceramic-coating",
        badge: "Winter pick",
        links: [
          { label: "CARPRO DQUARTZ", href: "/ceramic-coating/carpro-dquartz" },
          { label: "System X coating", href: "/ceramic-paint-correction" },
          { label: "Paint correction", href: "/paint-correction" },
        ],
      },
      {
        title: "Paint protection film",
        href: "/paint-protection-film",
        links: [
          { label: "SunTek PPF", href: "/paint-protection-film/suntek" },
          { label: "LLumar PPF", href: "/paint-protection-film/llumar" },
          { label: "Windshield film", href: "/windshield-ppf" },
          { label: "RV PPF", href: "/rv-trailer/ppf" },
        ],
      },
      {
        title: "Window tint",
        href: "/window-tint",
        links: [
          { label: "LLumar tint", href: "/window-tint/llumar" },
          { label: "SunTek tint", href: "/window-tint/suntek" },
        ],
      },
    ],
  },
  {
    label: "RV & Fleet",
    heading: "RV, marine & fleet",
    image: navRvFleet,
    featured: { label: "Book a free RV assessment", href: "/rv-trailer", body: "Oxidation removal, washes and protection where your RV is parked." },
    columns: [
      {
        title: "RV, trailer & marine",
        href: "/rv-trailer",
        links: [
          { label: "RV detailing", href: "/rv-detailing" },
          { label: "RV paint protection film", href: "/rv-trailer/ppf" },
          { label: "RV rental fleet care", href: "/rv-trailer/rental-fleet" },
          { label: "Boat & marine", href: "/marine" },
        ],
      },
      {
        title: "Fleet & dealership",
        href: "/fleet",
        links: [
          { label: "Fleet program", href: "/fleet" },
          { label: "Dealerships", href: "/fleet#dealerships" },
          { label: "Xpress Pass", href: "/xpress-pass" },
        ],
      },
    ],
  },
  {
    label: "Resources",
    heading: "Resources",
    image: navResources,
    featured: { label: "See our work", href: "/gallery", body: "Real Calgary jobs, before and after." },
    columns: [
      {
        title: "Training & pricing",
        href: "/training",
        links: [
          { label: "Training courses", href: "/training" },
          { label: "Pricing", href: "/detailing#packages" },
          { label: "Calgary price comparison", href: "/calgary-detailing-price-comparison" },
          { label: "Blog", href: "/blog" },
        ],
      },
      {
        title: "Frequently asked questions",
        href: "/#faq",
        links: [
          { label: "Paint protection film", href: "/paint-protection-film#faq" },
          { label: "Ceramic coating", href: "/ceramic-coating#faq" },
          { label: "Window tint", href: "/window-tint#faq" },
          { label: "Warranty & care", href: "/warranty" },
        ],
      },
    ],
  },
  {
    label: "Why Xpress",
    heading: "Why Xpress",
    image: navWhy,
    featured: { label: "Read our reviews", href: "/reviews", body: "100+ five-star Google reviews from Calgary drivers." },
    columns: [
      {
        title: "Our brand story",
        href: "/reviews",
        links: [
          { label: "Reviews", href: "/reviews" },
          { label: "Authorized installer", href: "/#authorized-installers" },
          { label: "Gallery", href: "/gallery" },
        ],
      },
      {
        title: "Get in touch",
        href: "/contact",
        links: [
          { label: "Contact", href: "/contact" },
          { label: "Get a quote", href: "/quote" },
        ],
      },
    ],
  },
];

export const SEARCH_LINKS: SiteLink[] = Array.from(
  new Map(
    MEGA_NAV.flatMap((g) => g.columns.flatMap((c) => [{ label: c.title, href: c.href }, ...c.links])).map((l) => [l.label, l]),
  ).values(),
);

export const PROTECTION_LINKS: SiteLink[] = [
  { label: "Paint correction", href: "/paint-correction" },
  { label: "Paint protection film", href: "/paint-protection-film" },
  { label: "SunTek PPF", href: "/paint-protection-film/suntek" },
  { label: "LLumar PPF", href: "/paint-protection-film/llumar" },
  { label: "Ceramic coating", href: "/ceramic-coating" },
  { label: "CARPRO DQUARTZ", href: "/ceramic-coating/carpro-dquartz" },
  { label: "Window tint", href: "/window-tint" },
  { label: "Windshield film", href: "/windshield-ppf" },
];
