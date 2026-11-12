export type SiteLink = { label: string; href: string };
export type NavGroup = { label: string; columns: { title: string; href: string; links: SiteLink[] }[]; image: string; featured: SiteLink };
export const MEGA_NAV: NavGroup[] = [
  { label: "Services", image: "/hero-audi-rs5.webp", featured: { label: "Find your detail", href: "/detailing" }, columns: [
    { title: "Car detailing", href: "/detailing", links: [{ label: "Interior detailing", href: "/detailing?tab=interior" }, { label: "Exterior detailing", href: "/detailing?tab=exterior" }, { label: "Complete detailing", href: "/detailing?tab=complete" }, { label: "Headlight restoration", href: "/headlight-restoration" }] },
    { title: "More services", href: "/paint-correction", links: [{ label: "Paint correction", href: "/paint-correction" }, { label: "Lease return prep", href: "/lease-return" }, { label: "Marine & pontoon", href: "/marine" }, { label: "Gift cards", href: "/gift-cards" }] },
  ] },
  { label: "Protection", image: "/hero-audi-rs5.webp", featured: { label: "Experience CARPRO DQUARTZ", href: "/ceramic-coating/carpro-dquartz/" }, columns: [
    { title: "Paint protection film", href: "/paint-protection-film", links: [{ label: "SunTek PPF", href: "/paint-protection-film/suntek/" }, { label: "LLumar PPF", href: "/paint-protection-film/llumar/" }, { label: "Windshield protection film", href: "/windshield-ppf" }, { label: "RV paint protection film", href: "/rv-trailer/ppf" }] },
    { title: "Ceramic coating", href: "/ceramic-coating", links: [{ label: "CARPRO DQUARTZ", href: "/ceramic-coating/carpro-dquartz/" }, { label: "System X coating", href: "/ceramic-paint-correction" }, { label: "Compare options", href: "/ceramic-coating#compare" }] },
  ] },
  { label: "RV & Fleet", image: "/hero-audi-rs5.webp", featured: { label: "Care for every vehicle", href: "/fleet" }, columns: [
    { title: "RV & trailer detailing", href: "/rv-trailer", links: [{ label: "RV detailing", href: "/rv-detailing" }, { label: "RV rental fleet", href: "/rv-trailer/rental-fleet" }] },
    { title: "Fleet & dealership", href: "/fleet", links: [{ label: "Fleet detailing", href: "/fleet" }, { label: "Xpress Pass", href: "/xpress-pass" }] },
  ] },
  { label: "Resources", image: "/hero-audi-rs5.webp", featured: { label: "See our work", href: "/gallery" }, columns: [
    { title: "Pricing & advice", href: "/detailing#packages", links: [{ label: "Pricing", href: "/detailing#packages" }, { label: "Calgary price comparison", href: "/calgary-detailing-price-comparison" }, { label: "Blog", href: "/blog" }] },
    { title: "Ownership", href: "/warranty", links: [{ label: "FAQ", href: "/#faq" }, { label: "Warranty", href: "/warranty" }, { label: "Gallery", href: "/gallery" }] },
  ] },
  { label: "Why Xpress", image: "/hero-audi-rs5.webp", featured: { label: "Meet your detailing team", href: "/reviews" }, columns: [
    { title: "Why Xpress", href: "/reviews", links: [{ label: "Reviews", href: "/reviews" }, { label: "Certifications", href: "/#authorized-installers" }, { label: "Service areas", href: "/contact#service-areas" }] },
    { title: "Get in touch", href: "/contact", links: [{ label: "Training", href: "/training" }, { label: "Contact", href: "/contact" }, { label: "Get a quote", href: "/quote" }] },
  ] },
];
export const SEARCH_LINKS: SiteLink[] = Array.from(new Map(MEGA_NAV.flatMap(g => g.columns.flatMap(c => [{ label: c.title, href: c.href }, ...c.links])).map(l => [l.label, l])).values());
export const PROTECTION_LINKS = [{ label: "Paint protection film", href: "/paint-protection-film" }, { label: "SunTek PPF", href: "/paint-protection-film/suntek/" }, { label: "LLumar PPF", href: "/paint-protection-film/llumar/" }, { label: "Ceramic coating", href: "/ceramic-coating" }, { label: "CARPRO DQUARTZ", href: "/ceramic-coating/carpro-dquartz/" }, { label: "Windshield protection film", href: "/windshield-ppf" }, { label: "RV paint protection film", href: "/rv-trailer/ppf" }];