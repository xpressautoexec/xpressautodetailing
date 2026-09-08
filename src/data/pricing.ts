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
    name: "Xpress Maintain",
    tagline: "Keep it clean between details",
    duration: "45 min",
    memberOnly: true,
    includes: [
      "Exterior hand wash",
      "Wheels, tires & arches",
      "Glass in & out",
      "Interior vacuum",
      "Dash & console wipe-down",
    ],
    price: { sedan: 119, suv: 139, minivan: 149 },
  },
  {
    id: "refresh",
    name: "Xpress Refresh",
    tagline: "Full interior and exterior in one visit",
    duration: "2.5–3 hrs",
    includes: [
      "Everything in Maintain",
      "Full interior vacuum & shampoo",
      "Door jambs",
      "Plastics & vinyl dressed",
      "Exterior hand wash & dry",
      "Tire dressing",
    ],
    price: { sedan: 229, suv: 279, minivan: 299 },
  },
  {
    id: "showroom",
    name: "Xpress Showroom Reset",
    tagline: "Deep clean inside, sealed outside",
    duration: "3.5–4 hrs",
    popular: true,
    includes: [
      "Everything in Refresh",
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
    name: "Xpress Restore",
    tagline: "Showroom Reset plus corrected, coated paint",
    duration: "8 hrs",
    premium: true,
    includes: [
      "Everything in Showroom Reset",
      "1-step machine paint correction",
      "1-year ceramic coating",
      "Coating registered",
    ],
    price: { sedan: 899, suv: 999, minivan: 1079 },
  },
];

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
  { id: "decal", name: "Decal Restoration", unit: "/decal", price: 30 },
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

// ---------- ADD-ONS ----------
export const ADDONS = [
  { name: "Strong Odour Removal", price: 85, time: "15 min attended" },
  { name: "Ceramic Sealant Upgrade", price: 110, time: "20 min" },
  { name: "Clay Bar Treatment", price: 120, time: "45 min" },
  { name: "Tree Sap Removal", price: 75, time: "20 min" },
  { name: "Headliner Cleaning", price: 75, time: "30 min" },
  { name: "Headlight Restoration", price: 79, time: "45 min" },
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

// ---------- XPRESS PASS ----------
export const XPRESS_PASS = [
  {
    id: "maintain",
    name: "Maintain",
    frequency: "Every month",
    discount: 20,
    popular: true,
    service: "Xpress Maintain",
    memberPrice: { sedan: 95.2, suv: 111.2, minivan: 119.2 },
  },
  {
    id: "refresh",
    name: "Refresh",
    frequency: "Every 2 months",
    discount: 15,
    service: "Xpress Refresh",
    memberPrice: { sedan: 194.65, suv: 237.15, minivan: 254.15 },
  },
  {
    id: "restore",
    name: "Restore",
    frequency: "Every 3 months",
    discount: 12,
    service: "Xpress Showroom Reset",
    memberPrice: { sedan: 333.52, suv: 377.52, minivan: 403.92 },
  },
];

export const PASS_ADDON_DISCOUNT = 15; // % off every add-on, all tiers
// NO 6-MONTH TIER. Do not add one.

// ---------- AUTO PPF ----------
export const AUTO_PPF = [
  { name: "Partial Front", price: 999 },
  { name: "Full Front", price: 1899, popular: true },
  { name: "Track Pack", price: 2899 },
  { name: "Full Vehicle", price: 5999 },
  { name: "Windshield PPF", price: 549 },
  { name: "Interior Screen PPF", price: 149 },
];

export const PPF_UPCHARGE = { truckSuvPct: 15, exoticPct: 25 };

// ---------- WINDOW TINT ----------
export const TINT = [
  { name: "2 Front Windows", price: 219 },
  { name: "Rear Windshield", price: 169 },
  { name: "Full Car (no windshield)", price: 429 },
  { name: "Full Car + Windshield", price: 629 },
  { name: "Windshield Only", price: 279 },
  { name: "Sunroof", price: 119 },
];

// ---------- TRAINING ----------
export const TRAINING = [
  { name: "Detailing Fundamentals", price: 349, duration: "2 days" },
  { name: "Paint Correction Mastery", price: 549, duration: "3 days" },
  { name: "Ceramic Coating Certification", price: 699, duration: "3 days" },
  { name: "PPF Installation", price: 899, duration: "5 days" },
];

// ---------- GIFT CARDS ----------
export const GIFT_CARD_TIERS = [50, 100, 250, 379, 500];

// ---------- CONSTANTS ----------
export const SERVICE_AREAS = ["Calgary", "Airdrie", "Cochrane", "Chestermere"];
export const PHONE = "587-500-4523";
export const EMAIL = "support@xpressautodetail.ca";
export const BOOKING_URL = "https://xpressauto.fieldd.co/";
export const REVIEW_COUNT = 112;
export const REVIEW_SCORE = 4.8;
export const HOURS = "Monday–Sunday, 7:00 AM – 9:00 PM";

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
