export type SiteLink = { label: string; href: string };
export type NavColumn = { title: string; href: string; links: SiteLink[] };
export type NavGroup = {
  label: string;
  /** Big uppercase panel heading, LLumar style. */
  heading: string;
  columns: NavColumn[];
  image: string;
  featured: SiteLink & { body: string };
};

/** Mega menu. Hubs come first in each column so Google sees a clean category → product tree. */
export const MEGA_NAV: NavGroup[] = [
  {
    label: "Services",
    heading: "Detailing services",
    image: "/videos/xp-tesla-detail.jpg",
    featured: { label: "Find your detail", href: "/detailing", body: "Interior, exterior and complete packages priced by vehicle size." },
    columns: [
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
        href: "/paint-correction",
        links: [
          { label: "Paint correction", href: "/paint-correction" },
          { label: "Lease return prep", href: "/lease-return" },
          { label: "Marine & pontoon", href: "/marine" },
          { label: "Gift cards", href: "/gift-cards" },
        ],
      },
    ],
  },
  {
    label: "Protection",
    heading: "Protection",
    image: "/videos/xp-paint-correction.jpg",
    featured: { label: "Experience CARPRO DQUARTZ", href: "/ceramic-coating/carpro-dquartz", body: "Our flagship nano-diamond ceramic coating." },
    columns: [
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
        title: "Ceramic coating",
        href: "/ceramic-coating",
        links: [
          { label: "CARPRO DQUARTZ", href: "/ceramic-coating/carpro-dquartz" },
          { label: "System X coating", href: "/ceramic-paint-correction" },
          { label: "Paint correction", href: "/paint-correction" },
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
    heading: "RV & fleet",
    image: "/videos/xp-rv-walkaround.jpg",
    featured: { label: "Book a free RV assessment", href: "/rv-trailer", body: "Oxidation removal, washes and protection where your RV is parked." },
    columns: [
      {
        title: "RV & trailer",
        href: "/rv-trailer",
        links: [
          { label: "RV detailing", href: "/rv-detailing" },
          { label: "RV paint protection film", href: "/rv-trailer/ppf" },
          { label: "RV rental fleet care", href: "/rv-trailer/rental-fleet" },
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
    image: "/videos/xp-mercedes-gle-headlight.jpg",
    featured: { label: "See our work", href: "/gallery", body: "Real Calgary jobs, before and after." },
    columns: [
      {
        title: "Pricing & advice",
        href: "/detailing#packages",
        links: [
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
    image: "/videos/xp-defender-shop.jpg",
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
          { label: "Training", href: "/training" },
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
  { label: "Paint protection film", href: "/paint-protection-film" },
  { label: "SunTek PPF", href: "/paint-protection-film/suntek" },
  { label: "LLumar PPF", href: "/paint-protection-film/llumar" },
  { label: "Ceramic coating", href: "/ceramic-coating" },
  { label: "CARPRO DQUARTZ", href: "/ceramic-coating/carpro-dquartz" },
  { label: "Window tint", href: "/window-tint" },
  { label: "Windshield film", href: "/windshield-ppf" },
];
