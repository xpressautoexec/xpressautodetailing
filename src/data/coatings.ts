/**
 * Coatings the customer picks at drop-off, two per Xpress Coat tier.
 * Same tier, same price: the choice is about finish and feel, not cost.
 * `tier` matches CERAMIC_PACKAGES ids in src/data/pricing.ts.
 */
export type CoatingTierId = "essential" | "signature" | "elite";

export type CoatingOption = {
  id: string;
  tier: CoatingTierId;
  brand: "CARPRO" | "System X";
  name: string;
  /** One-line tag shown under the name in the sidebar. */
  tag: string;
  description: string;
  highlights: string[];
  bestFor: string;
  flagship?: boolean;
};

export const COATING_TIERS: { id: CoatingTierId; label: string; years: string }[] = [
  { id: "essential", label: "3-Year", years: "3 years" },
  { id: "signature", label: "5-Year", years: "5 years" },
  { id: "elite", label: "9-Year", years: "9 years" },
];

export const COATING_OPTIONS: CoatingOption[] = [
  {
    id: "cquartz-professional",
    tier: "essential",
    brand: "CARPRO",
    name: "CQUARTZ Professional",
    tag: "Slick, easy-wash finish",
    description:
      "CARPRO's installer-only coating. A dense, high-gloss layer that makes salt and road film rinse off, without the commitment of a long-term tier.",
    highlights: ["Installer-only CARPRO formula", "Strong water beading", "Slick feel that makes drying fast", "Registered with the manufacturer"],
    bestFor: "Newer paint, leases and vehicles you may sell in a few years.",
  },
  {
    id: "systemx-crystal",
    tier: "essential",
    brand: "System X",
    name: "Crystal SS",
    tag: "Glassy, high-clarity gloss",
    description:
      "System X's entry professional coating. Leans toward clarity and a wet, glassy look, with self-cleaning behaviour that keeps the car tidier between washes.",
    highlights: ["Professional-grade System X coating", "Clear, glass-like gloss", "Self-cleaning surface", "Registered with the manufacturer"],
    bestFor: "Daily drivers that want gloss and easier washing through a few winters.",
  },
  {
    id: "cquartz-finest-reserve",
    tier: "signature",
    brand: "CARPRO",
    name: "CQUARTZ Finest Reserve",
    tag: "Deep gloss, strong chemical resistance",
    description:
      "CARPRO's reserve coating, sold only to approved installers. Built to resist water spots, salts and fallout, with a deep, rich gloss on dark paint.",
    highlights: ["Approved-installer-only formula", "Resists water spotting and road salt", "Deep colour on dark paint", "Registered with the manufacturer"],
    bestFor: "Dark paint and owners who care most about depth and gloss.",
  },
  {
    id: "systemx-pro",
    tier: "signature",
    brand: "System X",
    name: "Pro",
    tag: "Super-hydrophobic, self-cleaning",
    description:
      "A super-slick 9H System X coating. Water sheets off fast and takes dirt with it, so the car stays cleaner between washes through a Calgary winter.",
    highlights: ["9H ceramic hardness rating", "Super-hydrophobic water behaviour", "Self-cleaning, low-maintenance surface", "Registered with the manufacturer"],
    bestFor: "Daily drivers you plan to keep for years and wash less often.",
  },
  {
    id: "dquartz-finest-reserve",
    tier: "elite",
    brand: "CARPRO",
    name: "DQUARTZ + Finest Reserve",
    tag: "Nano-diamond base, our flagship",
    description:
      "A DQUARTZ nano-diamond base layer for added hardness and swirl resistance, topped with Finest Reserve for gloss and water behaviour. Our flagship coating.",
    highlights: ["Nano-diamond DQUARTZ base layer", "Added scratch and swirl resistance", "Finest Reserve top layer for gloss", "Registered with the manufacturer"],
    bestFor: "Long-term, high-value and garage-kept vehicles.",
    flagship: true,
  },
  {
    id: "systemx-max",
    tier: "elite",
    brand: "System X",
    name: "Max G+ Graphene",
    tag: "Thickest System X build",
    description:
      "System X's thickest coating, with graphene for extra slickness and gloss retention. Built for harsh conditions, which is exactly what Alberta roads are.",
    highlights: ["Thickest coating in the System X lineup", "Graphene-enhanced gloss and slickness", "High chemical and brine resistance", "Registered with the manufacturer"],
    bestFor: "Trucks, SUVs and anything that sees highway grit and winter roads.",
  },
];
