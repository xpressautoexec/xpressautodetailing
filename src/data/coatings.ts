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
 * Gyeon Infinite (5-year warranty, lifetime with a certified service every 24 months / 25,000 km)
 * gets its own long-term tier once Xpress is a Gyeon Certified Detailer. Not public until then.
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
  /** Small "Recommended" banner on the option; also the default pick for its package. */
  recommended?: boolean;
  /** Second coating layered on top, shown in the package's included list. */
  topCoat?: string;
  /** Product shot for the selector; brands without one show their logo. */
  image?: string;
  /** Product wordmark shown above the description. */
  logo?: string;
  brandLogo?: string;
  /** Manufacturer warranty, shown as a badge. Only set where the manufacturer publishes one (see MANUFACTURER_WARRANTIES). */
  warranty?: string;
};

export const COATING_TIERS: { id: CoatingTierId; title: string; years: string }[] = [
  { id: "essential", title: "Coat 2-Year", years: "2+ years" },
  { id: "signature", title: "Coat 3-Year", years: "3 years" },
  { id: "elite", title: "Coat DQUARTZ", years: "5+ years" },
];

export const COATING_OPTIONS: CoatingOption[] = [
  {
    id: "gyeon-mohs",
    tier: "essential",
    recommended: true,
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
    warranty: "2-year CARPRO warranty",
    image: bottleCqProfessional,
    logo: logoCqProfessional,
  },
  {
    id: "3m-ceramic",
    tier: "signature",
    brand: "3M",
    name: "Ceramic Coating",
    tag: "One coating for paint, trim, wheels and film",
    description: "3M's professional coating, applied over paint, plastic trim, wheel faces and paint protection film. Very slick, with a fast cure.",
    highlights: ["Coats paint, trim, wheels and PPF", "Resists road salt and harsh cleaners", "Very slick, low-friction finish"],
    image: kit3m,
  },
  {
    id: "cquartz-finest-reserve",
    tier: "signature",
    recommended: true,
    brand: "CARPRO",
    name: "CQUARTZ Finest Reserve",
    tag: "Deep gloss, resists water spots",
    description: "CARPRO's reserve coating, sold only to approved installers. Built to resist water spots, salts and fallout, with deep gloss on dark paint.",
    highlights: ["Approved-installer-only formula", "Resists water spotting and salt", "Deep colour on dark paint"],
    warranty: "3-year CARPRO warranty",
    image: bottleCqFinestReserve,
    logo: logoCqFinestReserve,
  },
  {
    id: "dquartz",
    tier: "elite",
    brand: "CARPRO",
    name: "DQUARTZ Pro",
    tag: "Nano-diamond hardness, Finest Reserve on top",
    description:
      "CARPRO's nano-diamond coating, the first ever to offer mechanical resistance to swirls and scratches. The diamonds are built into the coating itself. We top it with Finest Reserve for gloss and water behaviour.",
    highlights: [
      "Raises paint hardness by up to 5 pencil points",
      "Mechanical resistance to swirls and scratches",
      "Extreme abrasion resistance",
      "Finest Reserve top layer for gloss",
    ],
    flagship: true,
    topCoat: "CQUARTZ Finest Reserve",
    warranty: "CARPRO warranty on both layers",
    image: bottleDquartz,
    logo: logoDquartzPro,
  },
];
