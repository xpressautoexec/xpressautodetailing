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

// Owner-supplied Black Friday 2026 prices; regular prices exist for sedans only.
export const BLACK_FRIDAY_SIZES = [
  { id: "sedan", label: "Sedan/Coupe" },
  { id: "suv", label: "SUV/Crossover" },
  { id: "truck", label: "Pickup/Large SUV" },
] as const;
export type BlackFridaySize = (typeof BLACK_FRIDAY_SIZES)[number]["id"];
export const BLACK_FRIDAY_PRICES = {
  bronze: { sedan: 299, suv: 349, truck: 379, regular: 559, discount: 47 },
  silver: { sedan: 749, suv: 849, truck: 949, regular: 1187, discount: 37 },
  gold: { sedan: 1199, suv: 1299, truck: 1399, regular: 1686, discount: 29 },
} as const;
/** Line items inside the Black Friday packages (labels live in BLACK_FRIDAY_COPY.items). */
export const BLACK_FRIDAY_PACKAGE_ITEMS = {
  bronze: ["insideOut", "engineBay", "headlights", "glassCeramic"],
  silver: ["insideOut", "engineBay", "windshieldFilm", "headlightsFilm", "glassCeramic"],
  gold: ["insideOut", "engineBay", "headlights", "partialPpf", "correction", "windshieldFilm"],
} as const;
export type BlackFridayItemId = (typeof BLACK_FRIDAY_PACKAGE_ITEMS)[keyof typeof BLACK_FRIDAY_PACKAGE_ITEMS][number];
/**
 * Regular price of each package item, used for the "value" column. glassCeramic, headlightsFilm and
 * correction have no standalone listing; they are solved from the owner's sedan regular totals above
 * (559 / 1187 / 1686) and held flat for larger vehicles, which understates the value there. Everything
 * else reads the published price for that size, so values track the rest of the site.
 */
/** Regular value of ceramic coating on all glass (no standalone listing). Used by Black Friday and the Xpress Pass. */
export const GLASS_CERAMIC_VALUE = 150;
export const BLACK_FRIDAY_UNLISTED_VALUES = { glassCeramic: GLASS_CERAMIC_VALUE, headlightsFilm: 269, correction: 199 } as const;
/**
 * Fieldd booking shortlink keys (Fieldd > Settings > Services > Booking Shortlink).
 * Each opens booking straight on that service, so customers skip the service picker.
 */
export type FielddKey = string;
/** Either a shortlink key, or a full Fieldd booking link (fieldd.me/q/..., created per service in Fieldd). */
export const fielddUrl = (key: FielddKey) => (key.startsWith("http") ? key : `${BOOKING_URL}service/${key}`);

// ---------- XPRESS HUB BOOKING (off until the hub launches) ----------
/**
 * Origin of the Xpress Hub booking app, e.g. "https://book.xpressautodetail.ca".
 * null = keep every link on Fieldd. Set only when the owner approves the hub launch.
 * Never point this at a staging or preview URL: bookings there are not real.
 */
export const HUB_BOOKING_ORIGIN: string | null = null;
export const HUB_ORIGIN_NORMALIZED = HUB_BOOKING_ORIGIN?.replace(/\/$/, "") ?? null;

/** Only intercept wizard links belonging to the enabled Hub origin. */
export const isHubBookUrl = (href: string, origin: string | null = HUB_ORIGIN_NORMALIZED): boolean => {
  if (!origin) return false;
  try {
    const url = new URL(href);
    return url.origin === origin.replace(/\/$/, "") && url.pathname === "/book" &&
      url.searchParams.get("embed") === "1" && url.searchParams.get("utm_source") === "website";
  } catch {
    return false;
  }
};

/** Hub service slugs for packages the hub sells. Anything not listed stays on Fieldd. */
export const HUB_SERVICE: Record<string, string> = {
  maintain: "upkeep",
  refresh: "inside-out",
  showroom: "deep-clean-seal",
  restore: "correct-coat",
  essential: "essential-ceramic",
  signature: "signature-ceramic",
  elite: "elite-ceramic",
};

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

/** Legacy Upkeep member price (old Pass). Upkeep is bookable by anyone at its package price since Nov 21 2026; kept for reference. */
export const UPKEEP_MEMBER_PRICE: Record<PassSizeId, number> = { sedan: 119, suv: 135, minivan: 143, truck: 151 };

export const AUTO_PACKAGES: AutoPackage[] = [
  {
    id: "maintain",
    name: "Upkeep",
    tagline: "For the car that's already been detailed properly and you want to keep it that way.",
    duration: "45 min",
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
    price: { sedan: 699, suv: 779, minivan: 829, truck: 869 },
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
    price: 1699,
    prices: { sedan: 1699, suv: 1849, minivan: 1899, truck: 1949 },
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

// ---------- MOBILE SERVICE FEE ----------
/** Charged once per mobile visit. No fee at the Airdrie shop. Xpress Pass members never pay it. */
export const MOBILE_FEE = 20;

// ---------- XPRESS PASS (membership) ----------
/**
 * Owner-approved Nov 2026. Two tiers on a 12-month term, billed monthly. Each tier bundles included
 * visits, standing discounts and perks (AMA / Costco style), instead of mapping to one package.
 * Monthly price is per vehicle class; a second vehicle on the same membership is a flat add-on.
 */
export type PassTierId = "silver" | "gold";
export type PassItemId = "insideOut" | "deepClean" | "upkeep" | "headlights" | "headlightsUv" | "glassCeramic" | "engineBay";

export type HubBookOptions = {
  source: string;
  size?: VehicleSizeId;
  service?: string;
  promo?: string;
  pass?: PassTierId;
};

/** Pure hub URL builder, exported separately so its launch-time format is unit-testable while the hub is off. */
export const buildHubBookUrl = (origin: string, o: HubBookOptions): string => {
  const q = new URLSearchParams();
  q.set("embed", "1");
  if (o.size) q.set("size", o.size);
  if (o.service) q.set("service", o.service);
  if (o.promo) q.set("promo", o.promo);
  if (o.pass) q.set("pass", o.pass);
  q.set("utm_source", "website");
  q.set("utm_campaign", o.source);
  return `${origin.replace(/\/$/, "")}/book?${q.toString()}`;
};

/**
 * Embedded hub wizard: /book?embed=1&size=&service=&promo=&pass=&utm_source=website&utm_campaign=<source>.
 * The hub accepts our size ids (sedan, suv, minivan, truck), validates the promo code itself and ignores anything it cannot match.
 * Returns null while HUB_BOOKING_ORIGIN is null, so callers fall back to their Fieldd link.
 */
export const hubBookUrl = (o: HubBookOptions): string | null => {
  if (!HUB_BOOKING_ORIGIN) return null;
  return buildHubBookUrl(HUB_BOOKING_ORIGIN, o);
};

export const PASS_TERM_MONTHS = 12;
export const PASS_EARLY_EXIT_FEE = 99;

export const XPRESS_PASS = [
  {
    id: "silver" as PassTierId,
    name: "Silver",
    monthly: { sedan: 79, suv: 89, minivan: 99, truck: 99 } as Record<PassSizeId, number>,
    secondVehicle: 60,
    detailDiscount: 15,
    addOnDiscount: 15,
    protectionDiscount: 0,
    bookingWindowHrs: 72,
    included: [
      { item: "insideOut" as PassItemId, qty: 4 },
      { item: "headlights" as PassItemId, qty: 1 },
      { item: "engineBay" as PassItemId, qty: 2 },
    ],
  },
  {
    id: "gold" as PassTierId,
    name: "Gold",
    popular: true,
    monthly: { sedan: 149, suv: 164, minivan: 179, truck: 179 } as Record<PassSizeId, number>,
    secondVehicle: 120,
    detailDiscount: 20,
    addOnDiscount: 20,
    protectionDiscount: 10,
    bookingWindowHrs: 48,
    included: [
      { item: "deepClean" as PassItemId, qty: 4 },
      { item: "upkeep" as PassItemId, qty: 4 },
      { item: "headlightsUv" as PassItemId, qty: 1 },
      { item: "glassCeramic" as PassItemId, qty: 1 },
      { item: "engineBay" as PassItemId, qty: 2 },
    ],
  },
];

const pkgPrice = (id: string, size: PassSizeId) => AUTO_PACKAGES.find((p) => p.id === id)?.price[size] ?? 0;

/** Regular value of one included item for a vehicle class, from the published price lists. */
export const passItemValue = (item: PassItemId, size: PassSizeId): number => {
  switch (item) {
    case "insideOut": return pkgPrice("refresh", size);
    case "deepClean": return pkgPrice("showroom", size);
    case "upkeep": return pkgPrice("maintain", size);
    case "headlights":
    case "headlightsUv": return HEADLIGHT_RESTORATION.standalone;
    case "glassCeramic": return GLASS_CERAMIC_VALUE;
    case "engineBay": return ADDONS.find((a) => a.name === "Engine Bay Detail")?.price ?? 0;
  }
};

/** Included visits per year (each one skips the mobile fee). Engine bay and headlights ride along on a visit. */
export const passVisitsPerYear = (tier: (typeof XPRESS_PASS)[number]) =>
  tier.included.filter((i) => ["insideOut", "deepClean", "upkeep"].includes(i.item)).reduce((n, i) => n + i.qty, 0);

/** Annual value vs. annual price for one vehicle, used for the "you get back" line. */
export const passAnnualValue = (tierId: PassTierId, size: PassSizeId) => {
  const tier = XPRESS_PASS.find((t) => t.id === tierId)!;
  const items = tier.included.map((i) => ({ ...i, value: passItemValue(i.item, size) * i.qty }));
  const mobile = passVisitsPerYear(tier) * MOBILE_FEE;
  const included = items.reduce((n, i) => n + i.value, 0) + mobile;
  const cost = tier.monthly[size] * PASS_TERM_MONTHS;
  return { items, mobile, included, cost, net: included - cost };
};

/** Lowest per-add-on discount across tiers (detailing page footnote). */
export const PASS_ADDON_DISCOUNT = Math.min(...XPRESS_PASS.map((t) => t.addOnDiscount));
export const PASS_MAX_DETAIL_DISCOUNT = Math.max(...XPRESS_PASS.map((t) => t.detailDiscount));
export const PASS_MIN_DETAIL_DISCOUNT = Math.min(...XPRESS_PASS.map((t) => t.detailDiscount));


/**
 * Member price per tier for a regular (non member-only) package at a vehicle size.
 * Member-only Upkeep returns its fixed member price for both tiers.
 */
export const memberPricesFor = (pkg: AutoPackage, size: VehicleSizeId): Record<PassTierId, number> | undefined => {
  const regular = pkg.price[size];
  if (regular === undefined) return undefined;
  if (pkg.memberOnly) return { silver: UPKEEP_MEMBER_PRICE[size], gold: UPKEEP_MEMBER_PRICE[size] };
  return Object.fromEntries(XPRESS_PASS.map((t) => [t.id, Math.round(regular * (1 - t.detailDiscount / 100))])) as Record<PassTierId, number>;
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
  { id: "partial-front", book: { car: "https://fieldd.me/q/TXbFH", suv: "https://fieldd.me/q/Uy-7D", truck: "https://fieldd.me/q/nNc6m" }, name: "Partial", price: 599, time: "1 day", forWho: "Daily drivers that see city streets more than highways.", covers: ["Front bumper", "Leading half of the hood", "Leading half of the front fenders", "Mirror caps"] },
  { id: "full-front", book: { car: "https://fieldd.me/q/Y54l-", suv: "https://fieldd.me/q/9Syk5", truck: "https://fieldd.me/q/aAQ5C" }, name: "Full Front", price: 1499, popular: true, time: "1 day", forWho: "Highway commuters and new vehicles. No seam line on the hood.", covers: ["Front bumper", "Full hood", "Full front fenders", "Headlights", "Mirror caps"] },
  { id: "track-pack", book: { car: "https://fieldd.me/q/fzSWz", suv: "https://fieldd.me/q/fYq7-", truck: "https://fieldd.me/q/k5EKj" }, name: "Full Front +", price: 2199, time: "1–2 days", forWho: "Gravel roads, mountain trips and lowered or performance cars.", covers: ["Everything in Full Front", "A-pillars and roof leading edge", "Rocker panels"] },
  { id: "full-vehicle", book: { car: "https://fieldd.me/q/8kkMR", suv: "https://fieldd.me/q/zvwBH", truck: "https://fieldd.me/q/N_2qQ" }, name: "Full Coverage", price: 4999, time: "2–3 days", forWho: "Collector, exotic and long-term vehicles.", covers: ["Every painted panel", "Windshield film", "Headlights and mirror caps", "Wrapped edges wherever possible"] },
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
/** Windshield PPF by vehicle size. */
export const WINDSHIELD_PPF = [
  { id: "compact", label: "Compact / Sedan", book: "ed", price: 479, installTime: "2–3 hrs", examples: "Civic, Corolla, Mazda 3, Model 3" },
  { id: "midsize", label: "Midsize SUV / Crossover", book: "l0", price: 579, installTime: "3–4 hrs", examples: "RAV4, CR-V, Tucson, Model Y, Outback" },
  { id: "fullsize", label: "Full-size SUV / Truck", book: "DL", price: 679, installTime: "3–4 hrs", examples: "F-150, Silverado, Tahoe, RAM 1500, F-250/350" },
];

// ---------- ULTRA WINDSHIELD FILM: RV AND HEAVY-DUTY ----------
/**
 * ExoShield ULTRA (8 mil) is reserved for RVs, vans and heavy-duty work. GT3+ stays on the
 * automotive page. Priced flat per windshield, since the glass follows the chassis, not the
 * unit's length: a 24 ft and a 32 ft Class C on the same Ford E-450 share one windshield.
 * Owner-approved Nov 2026. Film cost: ULTRA 48" x 25' $795 CAD, 48" x 100' $2,575 CAD
 * (ExoShield partner portal, Nov 2026).
 */
export const RV_WINDSHIELD_ULTRA = [
  {
    id: "van",
    label: "Class B, Class C and work vans",
    examples: "Sprinter, Transit, ProMaster, Ford E-450 and Chevy 4500 cutaways",
    price: 1029,
    from: false,
    installTime: "4–5 hrs",
    book: "9M" as string | null,
    note: "Mobile, at your driveway or storage lot",
  },
  {
    id: "class-a",
    label: "Class A, two-piece windshield",
    examples: "Most gas and diesel pushers with a centre divider",
    price: 1899,
    from: true,
    installTime: "1 day",
    book: "https://fieldd.me/q/5QXnd" as string | null,
    note: "Mobile, at your storage lot or campsite",
  },
  {
    id: "quote",
    label: "One-piece Class A, Super C and coaches",
    examples: "Panoramic one-piece glass, Freightliner Super C, buses",
    price: null as number | null,
    from: false,
    installTime: "1–2 days",
    book: null as string | null,
    note: "Quoted from photos or a free look",
  },
] as const;

/** Heavy-duty and fleet ULTRA pricing, shown on /fleet. */
export const HEAVY_DUTY_ULTRA = [
  { id: "hd-pickup", label: "HD pickups", examples: "F-250/350, RAM 2500/3500, Silverado and Sierra HD", price: 829, unit: "per windshield", from: false, book: "https://fieldd.me/q/bMeLP", cta: "Book" },
  { id: "van", label: "Work vans and cutaways", examples: "Sprinter, Transit, ProMaster, E-450 box trucks", price: 1029, unit: "per windshield", from: false, book: "9M", cta: "Book" },
  { id: "equipment", label: "Equipment cab glass", examples: "Excavators, loaders, dozers, tractors", price: 449, unit: "per glass panel", from: true, book: "https://fieldd.me/q/E-QIe", cta: "Book a free look" },
  { id: "semi", label: "Semis and medium-duty", examples: "Two-piece and one-piece truck glass", price: null as number | null, unit: "quoted", from: false, book: "https://fieldd.me/q/E-QIe", cta: "Book a free look" },
] as const;

/**
 * Motorhome windshield replacement costs for the RV windshield section. USD sources converted at
 * USD_TO_CAD. Re-check when prices change (last checked Nov 2026).
 */
export const RV_WINDSHIELD_REPLACEMENT_COSTS = [
  {
    what: "Class A windshield replacement, 2026",
    cad: "$5,440–$11,560",
    note: "US$4,000–$8,500+",
    source: "Fit Protection",
    url: "https://fitprotection.com/blogs/news/rv-windshield-replacement-cost",
  },
  {
    what: "Class A windshield, paid by an owner in Canada",
    cad: "$5,500",
    note: "After three quotes of $7,200 and up",
    source: "Jayco Owners Forum",
    url: "https://www.jaycoowners.com/threads/precept-windshield.572697/",
  },
  {
    what: "Half of a two-piece Class A windshield, Alberta and Saskatchewan",
    cad: "About $1,800 per half",
    note: "Owner report, three replacements",
    source: "iRV2 Forums",
    url: "https://www.irv2.com/threads/class-a-windshields.1914331/",
  },
  {
    what: "Class C motorhome windshield replacement, 2026",
    cad: "$2,450–$4,760",
    note: "US$1,800–$3,500",
    source: "Fit Protection",
    url: "https://fitprotection.com/blogs/news/rv-windshield-replacement-cost",
  },
] as const;

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

/** ExoShield films. GT3+ is the automotive film; ULTRA is sold on RVs, vans and heavy-duty (above). */
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
    bestFor: "Motorhomes, vans, heavy-duty trucks and equipment",
    body: "ExoShield's heavy-duty film. At 8 mil it is 60% thicker than GT3+, built for flatter, upright glass where rocks hit hardest.",
    highlights: ["8 mil PET, 60% thicker than GT3+", "Built for motorhomes, vans, HD trucks and equipment", "3-year ExoShield limited warranty"],
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
    /** Fieldd > Training Courses (1-on-1). Books 9 AM to 5 PM at the Airdrie shop. */
    book: "https://fieldd.me/q/75Uzy",
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
    /** Books Day 1 (9 AM to 5 PM); Day 2 runs the next day and is confirmed by us. */
    book: "https://fieldd.me/q/w_cb9",
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
    book: "https://fieldd.me/q/Js-VA",
    duration: "4 hours",
    schedule: "4 hours",
    /** Discounted price when taken together with Paint Correction Mastery. */
    addOn: { courseId: "paint-correction", price: 399, book: "https://fieldd.me/q/QW5E2" },
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

/**
 * Training promo code. Fieldd > Discounts > TRAINING10: 10% off, training courses only,
 * one use per customer. Customer enters it at Fieldd checkout.
 */
export const TRAINING_PROMO = { code: "TRAINING10", percent: 10 };

/** Training seat terms. Shown on /training/signup and in Terms of Service section 12. */
export const TRAINING_TERMS = {
  /** No deposit: a card on file holds the seat. */
  classSize: "1-on-1",
  rescheduleDays: 7,
};

// ---------- GIFT CARDS ----------
/** Preset amounts on the Fieldd purchase page (custom amounts are also allowed there). */
export const GIFT_CARD_TIERS = [100, 150, 200, 300];

/**
 * Holiday bonus card: buy a card at or above `min`, get a separate bonus card worth `bonus`,
 * emailed to the buyer within `deliveryHours`. Issued manually in Fieldd.
 */
export const GIFT_CARD_BONUS = {
  /** December 24, 2026 at 11:59 PM MT. */
  deadline: Date.parse("2026-12-25T06:59:59Z"),
  deliveryHours: 24,
  tiers: [
    { min: 200, bonus: 30 },
    { min: 350, bonus: 50 },
    { min: 500, bonus: 70 },
  ],
} as const;

/** Bonus card value for a purchase amount (0 below the first tier). */
export const giftCardBonusFor = (amount: number): number =>
  GIFT_CARD_BONUS.tiers.reduce((bonus, tier) => (amount >= tier.min ? tier.bonus : bonus), 0 as number);

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
