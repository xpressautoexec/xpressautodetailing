import bottleCqProfessional from "@/assets/carpro/bottle-cquartz-professional.webp";
import bottleCqFinestReserve from "@/assets/carpro/bottle-cquartz-finest-reserve.webp";
import bottleDquartz from "@/assets/carpro/bottle-dquartz.webp";
import logoCqProfessional from "@/assets/carpro/logo-cquartz-professional.webp";
import logoCqFinestReserve from "@/assets/carpro/logo-cquartz-finest-reserve.webp";
import logoDquartzPro from "@/assets/carpro/logo-dquartz-pro.webp";
import kit3m from "@/assets/3m-ceramic-coating-kit.webp";
import logoGyeon from "@/assets/brand-gyeon.svg";

/**
 * Coatings the customer picks at drop-off, grouped by Xpress Coat tier.
 * Same tier, same price: the choice is about finish and feel, not cost.
 * `tier` matches CERAMIC_PACKAGES ids in src/data/pricing.ts.
 * Gyeon Infinite joins the 9-year tier when it's in stock; add it here then.
 */
export type CoatingTierId = "essential" | "signature" | "elite";

export type CoatingOption = {
  id: string;
  tier: CoatingTierId;
  brand: "CARPRO" | "Gyeon" | "3M";
  name: string;
  /** One-line tag shown in the selector. */
  tag: string;
  description: string;
  highlights: string[];
  flagship?: boolean;
  /** Product shot for the selector; brands without one show their logo. */
  image?: string;
  /** Product wordmark shown above the description. */
  logo?: string;
  brandLogo?: string;
};

export const COATING_TIERS: { id: CoatingTierId; label: string; years: string }[] = [
  { id: "essential", label: "3-Year", years: "3 years" },
  { id: "signature", label: "5-Year", years: "5 years" },
  { id: "elite", label: "9-Year", years: "9 years" },
];

export const COATING_OPTIONS: CoatingOption[] = [
  {
    id: "gyeon-mohs",
    tier: "essential",
    brand: "Gyeon",
    name: "Q² Mohs EVO",
    tag: "Candy gloss, strong chemical resistance",
    description: "Gyeon's flagship quartz coating in its latest EVO formula. A smooth, glossy layer that holds up to road salt and harsh washes.",
    highlights: ["Rich, candy-like gloss", "Strong chemical resistance", "Tight water beading"],
    brandLogo: logoGyeon,
  },
  {
    id: "cquartz-professional",
    tier: "essential",
    brand: "CARPRO",
    name: "CQUARTZ Professional",
    tag: "Slick, easy-wash finish",
    description: "CARPRO's installer-only coating. A dense, high-gloss layer that makes salt and road film rinse off.",
    highlights: ["Installer-only CARPRO formula", "Slick feel, fast drying", "Strong water beading"],
    image: bottleCqProfessional,
    logo: logoCqProfessional,
  },
  {
    id: "3m-ceramic",
    tier: "signature",
    brand: "3M",
    name: "Ceramic Coating",
    tag: "Two layers on paint, trim, wheels and film",
    description: "3M's professional coating, applied in two full layers over paint, plastic trim, wheel faces and paint protection film.",
    highlights: ["Coats paint, trim, wheels and PPF", "Resists road salt and harsh cleaners", "Very slick, low-friction finish"],
    image: kit3m,
  },
  {
    id: "cquartz-finest-reserve",
    tier: "signature",
    brand: "CARPRO",
    name: "CQUARTZ Finest Reserve",
    tag: "Deep gloss, resists water spots",
    description: "CARPRO's reserve coating, sold only to approved installers. Built to resist water spots, salts and fallout, with deep gloss on dark paint.",
    highlights: ["Approved-installer-only formula", "Resists water spotting and salt", "Deep colour on dark paint"],
    image: bottleCqFinestReserve,
    logo: logoCqFinestReserve,
  },
  {
    id: "dquartz",
    tier: "elite",
    brand: "CARPRO",
    name: "DQUARTZ Pro",
    tag: "Nano-diamond, our flagship",
    description: "Ceramic reinforced with synthetic nano-diamonds for added hardness, built to resist the fine swirls that washing leaves behind.",
    highlights: ["Nano-diamond reinforced", "Added swirl and scratch resistance", "High gloss and slick finish"],
    flagship: true,
    image: bottleDquartz,
    logo: logoDquartzPro,
  },
];
