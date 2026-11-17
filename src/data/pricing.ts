/**
 * SINGLE SOURCE OF TRUTH FOR ALL PRICING.
 * Never hardcode a price in a component — import from here.
 */

export const VEHICLE_SIZES = [
  { id: "sedan", label: "Sedan / Coupe" },
  { id: "suv", label: "SUV" },
  { id: "minivan", label: "3-Row / Minivan" },
  { id: "truck", label: "Pickup" },
] as const;

export type VehicleSizeId = (typeof VEHICLE_SIZES)[number]["id"];
export type SizePrice = Record<VehicleSizeId, number>;

/** Each Pass price is published for the enrolled vehicle class, including pickups. */
export type PassSizeId = VehicleSizeId;
export const PASS_SIZES: { id: PassSizeId; label: string }[] = [
  { id: "sedan", label: "Sedan / Coupe" },
  { id: "suv", label: "SUV 5-Seat" },
  { id: "minivan", label: "3-Row / Minivan" },
  { id: "truck", label: "Pickup" },
];

// ---------- ONLINE BOOKING (Fieldd) ----------
export const BOOKING_URL = "https://xpressauto.fieldd.co/";
/**
 * Fieldd booking shortlink keys (Fieldd > Settings > Services > Booking Shortlink).
 * Each opens booking straight on that service, so customers skip the service picker.
 */
export type FielddKey = string;
/** Either a shortlink key, or a full Fieldd booking link (fieldd.me/q/..., created per service in Fieldd). */
export const fielddUrl = (key: FielddKey) => (key.startsWith("http") ? key : `${BOOKING_URL}service/${key}`);

// ---------- AUTO PACKAGES ----------
export interface AutoPackage {
  id: string;
  name: string;
  tagline: string;
  duration: string;
  memberOnly?: boolean;
  popular?: boolean;
  premium?: boolean;
  includes: string[];
  price: SizePrice;
  /** Fieldd shortlink key per vehicle size. */
  book: Record<VehicleSizeId, FielddKey>;
  /**
   * Interior-only version: no exterior wash, wheels or paint sealant. Middle two packages only.
   * Priced at ~75% of the full package (travel and setup do not shrink), same ratio as the
   * Work Truck interior tier. Not covered by Xpress Pass member pricing.
   */
  interiorOnly?: {
    /** Customer-facing name of the interior-only version; matches the Fieldd service name. */
    name: string;
    duration: string;
    includes: string[];
    price: SizePrice;
    /** Fieldd shortlink key per size. */
    book: Record<VehicleSizeId, FielddKey>;
  };
}

/** Upkeep member price per visit (unchanged). Members only: there is no non-member booking. */
export const UPKEEP_MEMBER_PRICE: Record<PassSizeId, number> = { sedan: 119, suv: 135, minivan: 143, truck: 151 };

export const AUTO_PACKAGES: AutoPackage[] = [
  {
    id: "maintain",
    name: "Upkeep",
    tagline: "For the car that's already been detailed properly and you want to keep it that way.",
    duration: "45 min",
    memberOnly: true,
    includes: [
      "Exterior hand wash",
      "Wheels, tires & arches",
      "Glass in & out",
      "Interior vacuum",
      "Dash & console wipe-down",
    ],
    price: {
      sedan: 119,
      suv: 139,
      minivan: 149,
      truck: 159,
    },
    book: { sedan: "M8", suv: "5M", minivan: "5D", truck: "Er" },
  },
  {
    id: "refresh",
    name: "Inside & Out",
    tagline: "For a car that's been lived in for a few months and needs a deep clean inside and out.",
    duration: "2.5–3 hrs",
    includes: [
      "Everything in Upkeep",
      "Full interior vacuum & shampoo",
      "Door jambs",
      "Plastics & vinyl dressed",
      "Exterior hand wash & dry",
      "Tire dressing",
    ],
    price: { sedan: 239, suv: 289, minivan: 319, truck: 329 },
    book: { sedan: "xo", suv: "pU", minivan: "8G", truck: "mx" },
    interiorOnly: {
      name: "Interior Detail",
      duration: "2 hrs",
      includes: [
        "Full interior vacuum & shampoo",
        "Seats scrubbed & cleaned",
        "Dash, console, vents & cup holders",
        "Plastics & vinyl dressed",
        "Door jambs",
        "Interior glass & floor mats",
      ],
      price: { sedan: 179, suv: 219, minivan: 239, truck: 249 },
      book: { sedan: "G0", suv: "j0", minivan: "N7", truck: "85" },
    },
  },
  {
    id: "showroom",
    name: "Deep Clean & Seal",
    tagline: "For a Calgary winter car: salt on the carpets, something spilled in the back, paint unprotected.",
    duration: "3.5–4 hrs",
    popular: true,
    includes: [
      "Everything in Inside & Out",
      "Deep interior extraction",
      "Leather clean & condition",
      "Salt stain removal",
      "Ceramic spray sealant on all paint",
      "Streak-free glass",
    ],
    price: { sedan: 379, suv: 429, minivan: 459, truck: 479 },
    book: { sedan: "eC", suv: "bN", minivan: "0g", truck: "Yb" },
    interiorOnly: {
      name: "Interior Deep Clean",
      duration: "2.5–3 hrs",
      includes: [
        "Everything in Inside & Out interior",
        "Deep interior extraction",
        "Leather clean & condition",
        "Salt stain removal",
        "UV protection on interior surfaces",
        "Streak-free interior glass",
      ],
      price: { sedan: 289, suv: 329, minivan: 349, truck: 359 },
      book: { sedan: "Ca", suv: "wN", minivan: "ra", truck: "Gq" },
    },
  },
  {
    id: "restore",
    name: "Correct & Coat",
    tagline: "For someone who wants the paint corrected and protected for a full year.",
    duration: "8 hrs",
    premium: true,
    includes: [
      "Everything in Deep Clean & Seal",
      "1-step machine paint correction",
      "1-year ceramic coating",
      "Coating registered",
    ],
    price: { sedan: 929, suv: 1029, minivan: 1109, truck: 1149 },
    book: { sedan: "N-", suv: "D1", minivan: "GC", truck: "Cs" },
  },
];

// ---------- WORK TRUCK PACKAGE ----------
export const WORK_TRUCK_PACKAGE = {
  id: "work-truck",
  name: "Work Truck Package",
  tagline:
    "Built for landscaping, construction, trades and service trucks — mud, sawdust, salt, coffee cups and a cab that gets used hard every day.",
  tiers: [
    {
      id: "interior",
      name: "Interior Only",
      price: 329,
      /** Fieldd: Truck > Work Truck Package > "Work Truck — Interior Only". */
      book: "D6",
      duration: "2.5–3 hrs",
      includes: [
        "Full cab clean-out and deep vacuum",
        "Carpet and floor mat shampoo or extraction",
        "Heavy dirt, mud and salt stain removal",
        "Seats cleaned — cloth shampooed, leather conditioned",
        "Dash, console, vents and door panels degreased",
        "Interior glass streak-free",
      ],
    },
    {
      id: "full",
      name: "Interior + Exterior",
      price: 450,
      /** Fieldd: Truck > Work Truck Package > "Work Truck — Interior + Exterior". */
      book: "3b",
      duration: "4–4.5 hrs",
      popular: true,
      includes: [
        "Everything in the interior package",
        "Exterior hand wash and dry",
        "Wheels, tires, arches and running boards",
        "Bug, tar and road-film removal",
        "Box and tailgate rinsed out",
        "Tire dressing and exterior glass",
      ],
    },
  ],
};


// ---------- CERAMIC COATING (standalone) ----------
/** `price` is the sedan price ("from"); `prices` has every size; `book` the Fieldd key per size. */
export const CERAMIC_PACKAGES: {
  id: string;
  name: string;
  correction: string;
  coating: string;
  price: number;
  prices: SizePrice;
  book: Record<VehicleSizeId, FielddKey>;
  popular?: boolean;
  includes: string[];
}[] = [
  {
    id: "essential",
    name: "Essential",
    correction: "1-step machine enhancement",
    coating: "2-year ceramic",
    price: 799,
    prices: { sedan: 799, suv: 949, minivan: 999, truck: 1019 },
    book: { sedan: "KL", suv: "zU", minivan: "Qf", truck: "3A" },
    includes: [
      "Full decontamination wash",
      "Iron & tar removal",
      "Clay bar",
      "1-step machine enhancement",
      "2-year ceramic coating",
      "Coated: paint",
      "Coating registered & warrantied",
    ],
  },
  {
    id: "signature",
    name: "Signature",
    correction: "2-step machine correction",
    coating: "3-year ceramic",
    price: 1149,
    prices: { sedan: 1149, suv: 1299, minivan: 1349, truck: 1399 },
    book: { sedan: "Mk", suv: "CG", minivan: "WJ", truck: "gV" },
    popular: true,
    includes: [
      "Full decontamination wash",
      "Iron & tar removal",
      "Clay bar",
      "2-step cut & polish",
      "3-year ceramic coating",
      "Coated: paint, glass and wheel faces",
      "Coating registered & warrantied",
    ],
  },
  {
    id: "elite",
    name: "Elite",
    correction: "2-step machine correction",
    coating: "DQUARTZ + Finest Reserve",
    price: 1499,
    prices: { sedan: 1499, suv: 1649, minivan: 1699, truck: 1749 },
    book: { sedan: "YN", suv: "oy", minivan: "s6", truck: "rQ" },
    includes: [
      "Full decontamination wash",
      "Iron & tar removal",
      "Clay bar",
      "2-step cut & polish",
      "DQUARTZ + Finest Reserve ceramic coating",
      "Coated: paint, glass and wheel faces",
      "Coating registered & warrantied",
      "Annual inspection included",
    ],
  },
];

/**
 * Entry package below the coating tiers: 1-step gloss enhancement plus a 1-year ceramic spray
 * sealant on paint. A sealant, not a coating, so it stays out of CERAMIC_PACKAGES ("coating from $").
 * Non-sedan prices follow the same size steps as the 2-year coating. No Fieldd service yet: add `book` keys when there is one.
 */
export const GLOSS_PACKAGE: {
  id: string;
  name: string;
  correction: string;
  price: number;
  prices: SizePrice;
  book?: Record<VehicleSizeId, FielddKey>;
  includes: string[];
} = {
  id: "gloss",
  name: "Gloss Enhancement",
  correction: "1-step gloss enhancement",
  price: 399,
  prices: { sedan: 399, suv: 549, minivan: 599, truck: 619 },
  /** Fieldd booking links (Discounts > QR codes "Website - Gloss Enhancement ..."). */
  book: {
    sedan: "https://fieldd.me/q/IenkP",
    suv: "https://fieldd.me/q/yTPBM",
    minivan: "https://fieldd.me/q/VLDml",
    truck: "https://fieldd.me/q/8nb2d",
  },
  includes: [
    "Basic exterior detail",
    "1-step gloss enhancement (entry-level correction)",
    "1-year ceramic spray sealant",
    "Sealed: paint",
  ],
};

export const CERAMIC_UPCHARGE = { suv: 150, minivan: 200, exoticPct: 25 };

// ---------- RV — À LA CARTE ----------
/**
 * `book` is the Fieldd shortlink key. `assessment: true` marks restoration work where the
 * site leads with the free assessment form; the Fieldd link books the free on-site assessment.
 */
export const RV_SERVICES = [
  { id: "wash", name: "Exterior Wash", unit: "/ft", price: 11, book: "ht" },
  { id: "sealant", name: "Ceramic Sealant", unit: "/ft", price: 19, book: "fj" },
  { id: "uv", name: "UV Protectant", unit: "/ft", price: 11.5, book: "Zl" },
  { id: "polish", name: "Polish / Gloss Restoration", unit: "/ft", price: 38, book: "H0", assessment: true },
  {
    id: "oxidation",
    name: "Oxidation Removal / Gelcoat Restoration",
    unit: "/ft",
    price: 63,
    popular: true,
    book: "Tn",
    assessment: true,
  },
  { id: "interior", name: "RV Interior Detail", unit: "/hr", price: 90, book: "T_" },
  { id: "decal", name: "Decal Removal / Replacement", unit: "", price: 0, quote: true, book: "ux", assessment: true },
];

// ---------- RV — BUNDLES ----------
export const RV_BUNDLES = [
  {
    id: "washseal",
    book: "mR",
    name: "Wash & Seal",
    bestFor: "Spring or pre-trip clean and protect",
    includes: ["Exterior Wash", "Ceramic Sealant"],
    listPrice: 30.0,
    price: 24,
    unit: "/ft",
    save: "20%",
  },
  {
    id: "storageprep",
    book: "d_",
    name: "Storage Prep Package",
    bestFor: "Before the unit sits for the winter",
    seasonal: "Book Oct–Nov",
    includes: ["Exterior Wash", "Ceramic Sealant", "UV Protectant"],
    listPrice: 41.5,
    price: 34,
    unit: "/ft",
    save: "18%",
  },
  {
    id: "oxiseal",
    book: "pP",
    assessment: true,
    name: "Oxidation Removal + Ceramic Sealant",
    bestFor: "Light or early-stage oxidation",
    roof: true,
    oxidation: "Machine cut & polish for light oxidation",
    includes: ["Oxidation Removal", "Ceramic Sealant"],
    listPrice: 82.0,
    price: 69,
    unit: "/ft",
    save: "16%",
  },
  {
    id: "fullrestore",
    book: "m6",
    assessment: true,
    name: "Full Restoration Package",
    bestFor: "Heavy oxidation or older gelcoat",
    roof: true,
    oxidation: "3-stage sand-down, then cut & polish",
    popular: true,
    includes: ["Oxidation Removal", "Ceramic Sealant", "UV Protectant"],
    listPrice: 93.5,
    price: 75,
    unit: "/ft",
    save: "20%",
  },
];

// ---------- RV PPF ----------
export const RV_PPF = [
  { name: "Front Cap Defender", price: 1499 },
  { name: "Highway Shield", price: 2299, popular: true },
  { name: "Full Trail Armor", price: 3799 },
  { name: "Showroom Forever", price: 7999 },
];

// ---------- RV RENTAL FLEET ----------
export const RV_FLEET = [
  { name: "Turnover Basic", price: 199, unit: "/unit" },
  { name: "Turnover Plus", price: 349, unit: "/unit" },
  { name: "Seasonal Refresh", price: 749, unit: "/unit" },
];

// ---------- MARINE ----------
export const MARINE_SERVICES = [
  { name: "Wash & Wax", price: 12, unit: "/ft" },
  { name: "Interior Detail", price: 18, unit: "/ft" },
  { name: "Exterior Polish & Seal", price: 28, unit: "/ft" },
  { name: "Full Interior + Exterior", price: 42, unit: "/ft" },
  { name: "Marine Ceramic Coating", price: 55, unit: "/ft" },
  { name: "Aluminum Pontoon Acid Restoration", price: 300, unit: "/side" },
  { name: "Interior Seat Ceramic Coating", price: 650, unit: "+" },
];

// ---------- HEADLIGHT RESTORATION ----------
/** Per pair of headlights. Standalone visit, or added to a detail booking at the add-on rate. */
export const HEADLIGHT_RESTORATION = {
  standalone: 120,
  addOn: 90,
  /** Fog light pair, added to a headlight restoration. Owner-approved Oct 2026. */
  fogLights: 60,
  time: "45 min",
  /** Fieldd shortlink key for the standalone visit (fog lights are its only add-on). */
  book: "um" as FielddKey,
};

// ---------- ADD-ONS ----------
export const ADDONS = [
  { name: "Strong Odour Removal", price: 85, time: "15 min attended" },
  { name: "Ceramic Sealant Upgrade", price: 110, time: "20 min" },
  { name: "Clay Bar Treatment", price: 120, time: "45 min" },
  { name: "Tree Sap Removal", price: 75, time: "20 min" },
  { name: "Headliner Cleaning", price: 75, time: "30 min" },
  { name: "Headlight Restoration", price: HEADLIGHT_RESTORATION.addOn, time: HEADLIGHT_RESTORATION.time },
  { name: "Engine Bay Detail", price: 50, time: "15 min" },
  { name: "Extra Set of Carpets / Mats", price: 50, time: "20 min" },
  { name: "Trunk Deep Clean", price: 30, time: "20 min" },
  { name: "Excessively Soiled Interior", price: 135, time: "1 hr" },
  { name: "Full Body Polish — Sedan / Mid SUV", price: 299, time: "2.5 hrs" },
  { name: "Full Body Polish — Truck / Van / Large SUV", price: 355, time: "3 hrs" },
  { name: "Interior Leather Ceramic UV — Sedan / Mid SUV", price: 265, time: "1 hr" },
  { name: "Interior Leather Ceramic UV — Truck / Van / SUV", price: 320, time: "1 hr" },
];

export const PET_HAIR_TIERS = [
  { label: "Light — surface hair, one row", price: 45 },
  { label: "Moderate — embedded, full cabin", price: 75 },
  { label: "Heavy — matted, seats + trunk", price: 115 },
];

// ---------- CONDITION ADJUSTMENTS (chosen by the customer at booking) ----------
export const CONDITION_TIERS = [
  { label: "Normal use", price: 0 },
  { label: "Kids, pets or a work truck", price: 75 },
  { label: "It's rough — be honest with us", price: 135 },
];

// ---------- XPRESS PASS ----------
/**
 * Refresh and Restore prices derive from the regular package price. Maintain
 * uses the owner-approved fixed class prices, including $119 for a sedan, and
 * must not be advertised as a percentage discount.
 */
const PASS_TERMS = [
  { id: "maintain", name: "Maintain", frequency: "Every 4 weeks", discount: 0, popular: true, service: "Upkeep" },
  { id: "refresh", name: "Refresh", frequency: "Every 8 weeks", discount: 20, service: "Inside & Out" },
  { id: "restore", name: "Restore", frequency: "Every 13 weeks", discount: 15, service: "Deep Clean & Seal" },
] as const;

const round2 = (n: number) => Math.round(n * 100) / 100;

export const XPRESS_PASS = PASS_TERMS.map((t) => {
  const pkg = AUTO_PACKAGES.find((p) => p.name === t.service)!;
  const memberPrice = Object.fromEntries(
    PASS_SIZES.map(({ id }) => [
      id,
      t.id === "maintain" ? UPKEEP_MEMBER_PRICE[id] : round2(pkg.price[id] * (1 - t.discount / 100)),
    ]),
  ) as Record<PassSizeId, number>;
  return { ...t, popular: "popular" in t ? t.popular : false, memberPrice };
});

export const PASS_ADDON_DISCOUNT = 15; // % off every add-on, all tiers

/** The Xpress Pass plan built on an auto package, if any (matched by service name). */
export const passPlanFor = (pkg: AutoPackage) => XPRESS_PASS.find((p) => p.service === pkg.name);

/**
 * Per-visit member price for a package at a vehicle size, from the Xpress Pass terms.
 * Uses the plan's published member price where set; otherwise applies the plan discount
 * to the package's regular price (e.g. pickups). Undefined if the package has no Pass plan.
 */
export const memberPriceFor = (pkg: AutoPackage, size: VehicleSizeId): number | undefined => {
  const plan = passPlanFor(pkg);
  const regular = pkg.price[size];
  if (!plan || regular === undefined) return undefined;
  const published = (plan.memberPrice as Partial<Record<VehicleSizeId, number>>)[size];
  return published ?? Math.round(regular * (1 - plan.discount / 100) * 100) / 100;
};
// NO 6-MONTH TIER. Do not add one.

// ---------- CAR PPF ----------
/**
 * Car paint protection film coverage packages (/paint-protection-film).
 * Prices are the last published car PPF prices (Sept 2026), reinstated Nov 2026. Car or small SUV base;
 * PPF_UPCHARGE applies to trucks / large SUVs and exotics.
 */
/** `book`: Fieldd booking links per size (Discounts > QR codes "Website - PPF ..."). Exotic is quote only. */
export const CAR_PPF = [
  { id: "partial-front", book: { car: "https://fieldd.me/q/TXbFH", suv: "https://fieldd.me/q/Uy-7D", truck: "https://fieldd.me/q/nNc6m" }, name: "Partial", price: 999, time: "1 day", forWho: "Daily drivers that see city streets more than highways.", covers: ["Front bumper", "Leading half of the hood", "Leading half of the front fenders", "Mirror caps"] },
  { id: "full-front", book: { car: "https://fieldd.me/q/Y54l-", suv: "https://fieldd.me/q/9Syk5", truck: "https://fieldd.me/q/aAQ5C" }, name: "Full Front", price: 1899, popular: true, time: "1 day", forWho: "Highway commuters and new vehicles. No seam line on the hood.", covers: ["Front bumper", "Full hood", "Full front fenders", "Headlights", "Mirror caps"] },
  { id: "track-pack", book: { car: "https://fieldd.me/q/fzSWz", suv: "https://fieldd.me/q/fYq7-", truck: "https://fieldd.me/q/k5EKj" }, name: "Full Front +", price: 2899, time: "1–2 days", forWho: "Gravel roads, mountain trips and lowered or performance cars.", covers: ["Everything in Full Front", "A-pillars and roof leading edge", "Rocker panels"] },
  { id: "full-vehicle", book: { car: "https://fieldd.me/q/8kkMR", suv: "https://fieldd.me/q/zvwBH", truck: "https://fieldd.me/q/N_2qQ" }, name: "Full Coverage", price: 5999, time: "2–3 days", forWho: "Collector, exotic and long-term vehicles.", covers: ["Every painted panel", "Windshield film", "Headlights and mirror caps", "Wrapped edges wherever possible"] },
];

export const PPF_UPCHARGE = { suvPct: 10, truckSuvPct: 15 };

/** Vehicle size classes for car PPF. Price = CAR_PPF base x (1 + pct), rounded to the nearest $X9. */
export const CAR_PPF_SIZES = [
  { id: "car", label: "Sedan / Coupe", examples: "Civic, Model 3, Mazda 3, BMW 4 Series", pct: 0 },
  { id: "suv", label: "SUV / Crossover", examples: "Audi Q5, RAV4, CR-V, Model Y", pct: PPF_UPCHARGE.suvPct },
  { id: "truck", label: "Pickup / Large SUV", examples: "F-150, Silverado, RAM, Tahoe", pct: PPF_UPCHARGE.truckSuvPct },
  /** Quote only: no published prices. The page recommends Full Coverage and a call for custom coverage. */
  { id: "exotic", label: "Exotic", examples: "Ferrari, Lamborghini, McLaren, Porsche GT cars", pct: 0, quoteOnly: true },
] as const;

export type CarPpfSizeId = (typeof CAR_PPF_SIZES)[number]["id"];

export const carPpfPrice = (base: number, size: CarPpfSizeId): number => {
  const pct = CAR_PPF_SIZES.find((s) => s.id === size)?.pct ?? 0;
  if (!pct) return base;
  return Math.round((base * (1 + pct / 100)) / 10) * 10 - 1;
};

// ---------- WINDSHIELD PPF ----------
/** Windshield PPF by vehicle size. Window tint is no longer offered. */
export const WINDSHIELD_PPF = [
  { id: "compact", label: "Compact / Sedan", book: "ed", price: 479, installTime: "2–3 hrs", examples: "Civic, Corolla, Mazda 3, Model 3" },
  { id: "midsize", label: "Midsize SUV / Crossover", book: "l0", price: 579, installTime: "3–4 hrs", examples: "RAV4, CR-V, Tucson, Model Y, Outback" },
  { id: "fullsize", label: "Full-size SUV / Truck", book: "DL", price: 679, installTime: "3–4 hrs", examples: "F-150, Silverado, Tahoe, RAM 1500" },
  { id: "heavy", label: "HD Truck / Van / RV", book: "9M", price: 879, installTime: "4–5 hrs", examples: "F-250/350, Sprinter, Transit, Class A and C" },
];

/**
 * What a windshield replacement costs, for the "pays for itself" section on /windshield-ppf.
 * Every figure must link to its source. Re-check these when prices change (last checked Nov 2026).
 */
export const USD_TO_CAD = 1.36;
const usd = (n: number) => Math.round((n * USD_TO_CAD) / 10) * 10;
export const WINDSHIELD_REPLACEMENT_COSTS = [
  {
    what: "Tesla Model Y windshield, Tesla Service quote",
    cad: `$${usd(1337.85).toLocaleString("en-CA")}`,
    note: "US$1,337.85",
    source: "InsideEVs",
    url: "https://insideevs.com/news/425374/video-tesla-model-y-windshield-replacement-cost/",
  },
  {
    what: "Windshield with camera calibration, Canada",
    cad: "$900–$1,400",
    source: "isure insurance brokers",
    url: "https://isure.ca/inews/does-your-insurance-cover-a-cracked-windshield/",
  },
  {
    what: "Tesla Model 3 or Y windshield, part only",
    cad: `$${usd(900).toLocaleString("en-CA")}`,
    note: "US$900",
    source: "Drive Tesla Canada",
    url: "https://driveteslacanada.ca/news/tesla-introduces-affordable-windshield-protection-plan-in-the-u-s/",
  },
  {
    what: "Average camera-equipped vehicle, 10,000 quotes",
    cad: `$${usd(766).toLocaleString("en-CA")}`,
    note: "US$766",
    source: "Glass.com",
    url: "https://www.glass.com/info/how-much-does-windshield-replacement-cost/",
  },
  {
    what: "Camera recalibration alone, Canada",
    cad: "$200–$400",
    source: "isure insurance brokers",
    url: "https://isure.ca/inews/does-your-insurance-cover-a-cracked-windshield/",
  },
] as const;

/** ExoShield film choice. Sizes above are GT3+; ULTRA is a flat upgrade (Fieldd add-on "Upgrade to ExoShield ULTRA"). */
export const WINDSHIELD_ULTRA_UPGRADE = 150;
export const WINDSHIELD_FILMS = [
  {
    id: "gt3",
    name: "ExoShield GT3+",
    tag: "Everyday",
    bestFor: "Daily drivers, city and highway commutes",
    body: "ExoShield's flagship film and the one for most daily drivers. A 5 mil PET film with a nanoceramic hardcoat that resists wiper scratching and stays optically clear.",
    highlights: ["5 mil PET with nanoceramic scratch resistance", "Optically clear, no effect on ADAS cameras or HUDs", "3-year ExoShield limited warranty"],
    upgrade: 0,
  },
  {
    id: "ultra",
    name: "ExoShield ULTRA",
    tag: "Max impact",
    bestFor: "Trucks, upright windshields and gravel roads",
    body: "ExoShield's heavy-duty film. At 8 mil it is 60% thicker than GT3+, built for flatter, upright glass where rocks hit hardest.",
    highlights: ["8 mil PET, 60% thicker than GT3+", "Best for Jeep, Bronco, vans and work trucks", "3-year ExoShield limited warranty"],
    upgrade: WINDSHIELD_ULTRA_UPGRADE,
  },
] as const;

// ---------- TRAINING ----------
/**
 * Course list for /training and /training/signup. Claims here must be true:
 * Every graduate is certified by Xpress (TRAINING_CERTIFICATION in copy.ts).
 */
export const TRAINING = [
  {
    id: "detailing-fundamentals",
    name: "Detailing Fundamentals",
    price: 449,
    duration: "1 day",
    schedule: "1 day, 6–8 hours",
    forWho: "Beginners who want to learn proper detailing from the ground up.",
    includes: [
      "Interior deep cleaning and hot-water extraction",
      "Exterior wash, clay bar and decontamination",
      "Product selection and dilution ratios",
      "Paint-safe washing technique",
      "Wheels, tires, leather and fabric care",
      "Pricing and startup basics",
    ],
  },
  {
    id: "paint-correction",
    name: "Paint Correction Mastery",
    price: 899,
    duration: "2 days",
    schedule: "2 days, 6–8 hours each day",
    forWho: "Detailers ready to add machine correction to their services.",
    includes: [
      "Paint thickness measurement and assessment",
      "Single-stage and multi-stage correction",
      "Rotary and dual-action polisher technique",
      "Compound, polish and pad selection",
      "Swirl, scratch and oxidation removal",
      "Wet sanding fundamentals",
    ],
  },
  {
    id: "ceramic-coating",
    name: "Ceramic Coating",
    price: 599,
    duration: "4 hours",
    schedule: "4 hours",
    /** Discounted price when taken together with Paint Correction Mastery. */
    addOn: { courseId: "paint-correction", price: 399 },
    forWho: "Detailers who want to offer ceramic coatings properly, from prep to cure.",
    includes: [
      "Surface preparation and decontamination",
      "Correction before coating",
      "Coating application across several product lines",
      "Curing, environment and layering",
      "Maintenance coatings and aftercare",
      "Setting client expectations",
    ],
  },
];

/** Training seat terms. Shown on /training/signup and in Terms of Service section 12. */
export const TRAINING_TERMS = {
  deposit: 50,
  classSize: "1-on-1",
  rescheduleDays: 7,
};

// ---------- GIFT CARDS ----------
export const GIFT_CARD_TIERS = [50, 100, 250, 379, 500];

// ---------- CONSTANTS ----------
export const SERVICE_AREAS = ["Calgary", "Airdrie", "Cochrane", "Chestermere", "Okotoks", "Rocky View County"];
export const PHONE = "587-500-4523";
export const EMAIL = "support@xpressautodetail.ca";
export const REVIEW_COUNT = 116; // Google Maps, Sept 30 2026
/** Kept for internal reference only. The site advertises five-star count, not the average. */
export const REVIEW_SCORE = 4.8;
/** Public review claim. Verified by owner: 100+ five-star Google reviews. */
export const FIVE_STAR_REVIEWS = "100+";

/** Season volume, verified by owner (2026 season). */
export const SEASON_STATS = { cars: "300+", rvs: "40+" };

// ---------- FINANCING ----------
/**
 * Third-party consumer financing for RV restoration work.
 * `lender` / `applyUrl` stay null until a provider agreement is signed.
 * While null, the CTA routes to the assessment form instead of an application.
 * `representativeApr` must be replaced with the signed lender's representative rate —
 * Alberta cost-of-credit disclosure requires APR, term and total cost beside any payment figure.
 */
export const FINANCING = {
  lender: null as string | null,
  applyUrl: null as string | null,
  representativeApr: 19.99,
  terms: [12, 24, 36, 48, 60],
  defaultTerm: 24,
  minAmount: 1000,
};

/**
 * True only once a lender agreement is signed and an application URL exists.
 * While false, the site says "coming soon" and shows no payment figures, APR or estimator.
 */
export const FINANCING_LIVE = FINANCING.lender !== null && FINANCING.applyUrl !== null;

/** Standard amortized monthly payment. */
export const monthlyPayment = (principal: number, aprPct: number, months: number) => {
  const r = aprPct / 100 / 12;
  if (r === 0) return principal / months;
  return (principal * r) / (1 - Math.pow(1 + r, -months));
};
export const HOURS = "Monday–Sunday, 9:00 AM – 5:00 PM";

/** Money formatter — whole dollars unless cents are meaningful. */
export const money = (n: number) =>
  `$${n % 1 === 0 ? n.toLocaleString("en-CA") : n.toFixed(2)}`;
