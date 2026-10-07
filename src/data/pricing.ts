/**
 * SINGLE SOURCE OF TRUTH FOR ALL PRICING.
 * Never hardcode a price in a component — import from here.
 */

export const VEHICLE_SIZES = [
  { id: "sedan", label: "Sedan / Coupe" },
  { id: "suv", label: "SUV / Pickup" },
  { id: "minivan", label: "3-Row SUV / Minivan" },
] as const;

export type VehicleSizeId = (typeof VEHICLE_SIZES)[number]["id"];
export type SizePrice = Record<VehicleSizeId, number>;

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
}

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
    price: { sedan: 149, suv: 169, minivan: 179 },
  },
  {
    id: "refresh",
    name: "Inside & Out",
    tagline: "For a car that's been lived in for a few months and needs a proper reset — not a wash.",
    duration: "2.5–3 hrs",
    includes: [
      "Everything in Upkeep",
      "Full interior vacuum & shampoo",
      "Door jambs",
      "Plastics & vinyl dressed",
      "Exterior hand wash & dry",
      "Tire dressing",
    ],
    price: { sedan: 229, suv: 279, minivan: 309 },
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
    price: { sedan: 379, suv: 429, minivan: 459 },
  },
  {
    id: "restore",
    name: "Correct & Coat",
    tagline: "For someone who wants the paint fixed, not just cleaned — and protected for a year, not a season.",
    duration: "8 hrs",
    premium: true,
    includes: [
      "Everything in Deep Clean & Seal",
      "1-step machine paint correction",
      "1-year ceramic coating",
      "Coating registered",
    ],
    price: { sedan: 899, suv: 999, minivan: 1079 },
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
export const CERAMIC_PACKAGES = [
  {
    id: "essential",
    name: "Essential",
    correction: "1-step machine enhancement",
    coating: "1-year ceramic",
    price: 549,
    includes: [
      "Full decontamination wash",
      "Iron & tar removal",
      "Clay bar",
      "1-step machine enhancement",
      "1-year ceramic coating",
      "Coating registered",
    ],
  },
  {
    id: "signature",
    name: "Signature",
    correction: "2-step machine correction",
    coating: "5-year ceramic",
    price: 1099,
    popular: true,
    includes: [
      "Full decontamination wash",
      "Iron & tar removal",
      "Clay bar",
      "2-step cut & polish",
      "5-year ceramic coating",
      "Coating registered & warrantied",
    ],
  },
  {
    id: "elite",
    name: "Elite",
    correction: "2-step machine correction",
    coating: "9-year System X graphene",
    price: 1499,
    includes: [
      "Full decontamination wash",
      "Iron & tar removal",
      "Clay bar",
      "2-step cut & polish",
      "9-year System X graphene coating",
      "Coating registered & warrantied",
      "Annual inspection included",
    ],
  },
];

export const CERAMIC_UPCHARGE = { suv: 150, minivan: 200, exoticPct: 25 };

// ---------- RV — À LA CARTE ----------
export const RV_SERVICES = [
  { id: "wash", name: "Exterior Wash", unit: "/ft", price: 11 },
  { id: "sealant", name: "Ceramic Sealant", unit: "/ft", price: 19 },
  { id: "uv", name: "UV Protectant", unit: "/ft", price: 11.5 },
  { id: "polish", name: "Polish / Gloss Restoration", unit: "/ft", price: 38 },
  {
    id: "oxidation",
    name: "Oxidation Removal / Gelcoat Restoration",
    unit: "/ft",
    price: 63,
    popular: true,
  },
  { id: "interior", name: "RV Interior Detail", unit: "/hr", price: 90 },
  { id: "decal", name: "Decal Removal / Replacement", unit: "", price: 0, quote: true },
];

// ---------- RV — BUNDLES ----------
export const RV_BUNDLES = [
  {
    id: "washseal",
    name: "Wash & Seal",
    includes: ["Exterior Wash", "Ceramic Sealant"],
    listPrice: 30.0,
    price: 24,
    unit: "/ft",
    save: "20%",
  },
  {
    id: "storageprep",
    name: "Storage Prep Package",
    seasonal: "Book Oct–Nov",
    includes: ["Exterior Wash", "Ceramic Sealant", "UV Protectant"],
    listPrice: 41.5,
    price: 34,
    unit: "/ft",
    save: "18%",
  },
  {
    id: "oxiseal",
    name: "Oxidation Removal + Ceramic Sealant",
    includes: ["Oxidation Removal", "Ceramic Sealant"],
    listPrice: 82.0,
    price: 69,
    unit: "/ft",
    save: "16%",
  },
  {
    id: "fullrestore",
    name: "Full Restoration Package",
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
  time: "45 min",
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
export const XPRESS_PASS = [
  {
    id: "maintain",
    name: "Maintain",
    frequency: "Every month",
    discount: 20,
    popular: true,
    service: "Upkeep",
    memberPrice: { sedan: 119, suv: 135, minivan: 143 },
  },
  {
    id: "refresh",
    name: "Refresh",
    frequency: "Every 2 months",
    discount: 15,
    service: "Inside & Out",
    memberPrice: { sedan: 194.65, suv: 237.15, minivan: 262.65 },
  },
  {
    id: "restore",
    name: "Restore",
    frequency: "Every 3 months",
    discount: 12,
    service: "Deep Clean & Seal",
    memberPrice: { sedan: 333.52, suv: 377.52, minivan: 403.92 },
  },
];

export const PASS_ADDON_DISCOUNT = 15; // % off every add-on, all tiers
// NO 6-MONTH TIER. Do not add one.

// ---------- WINDSHIELD PPF ----------
/** Windshield PPF by vehicle size. Car paint protection film and window tint are no longer offered. */
export const WINDSHIELD_PPF = [
  { id: "compact", label: "Compact / Sedan", price: 449, installTime: "2–3 hrs", examples: "Civic, Corolla, Mazda 3, Model 3" },
  { id: "midsize", label: "Midsize SUV / Crossover", price: 549, installTime: "3–4 hrs", examples: "RAV4, CR-V, Tucson, Model Y, Outback" },
  { id: "fullsize", label: "Full-size SUV / Truck", price: 649, installTime: "3–4 hrs", examples: "F-150, Silverado, Tahoe, RAM 1500" },
  { id: "heavy", label: "HD Truck / Van / RV", price: 849, installTime: "4–5 hrs", examples: "F-250/350, Sprinter, Transit, Class A and C" },
];

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
  classSize: "4 to 6 students",
  rescheduleDays: 7,
};

// ---------- GIFT CARDS ----------
export const GIFT_CARD_TIERS = [50, 100, 250, 379, 500];

// ---------- CONSTANTS ----------
export const SERVICE_AREAS = ["Calgary", "Airdrie", "Cochrane", "Chestermere", "Okotoks", "Rocky View County"];
export const PHONE = "587-500-4523";
export const EMAIL = "support@xpressautodetail.ca";
export const BOOKING_URL = "https://xpressauto.fieldd.co/";
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

/**
 * Booking URL that CARRIES the customer's selection into the scheduler.
 * Never link to the bare BOOKING_URL from a page where a selection exists.
 */
export const bookingUrl = (vehicleId?: string, serviceId?: string) => {
  const params = new URLSearchParams();
  if (vehicleId) params.set("vehicle", vehicleId);
  if (serviceId) params.set("service", serviceId);
  const qs = params.toString();
  return qs ? `${BOOKING_URL}?${qs}` : BOOKING_URL;
};
