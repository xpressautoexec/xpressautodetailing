/**
 * Home page "See your price" finder: vehicle -> service -> a few questions -> one package.
 * Pure functions only, so the rules are testable (finder.test.ts). Prices come from pricing.ts.
 */
import {
  ADDONS,
  AUTO_PACKAGES,
  CAR_PPF,
  CERAMIC_PACKAGES,
  GLOSS_PACKAGE,
  HEADLIGHT_RESTORATION,
  PET_HAIR_TIERS,
  RV_BUNDLES,
  WINDSHIELD_PPF,
  carPpfPrice,
  fielddUrl,
  money,
  type CarPpfSizeId,
  type VehicleSizeId,
} from "@/data/pricing";
import { COATING_TIERS } from "@/data/coatings";
import { SEASON } from "@/config/site";

export type FinderVehicle = VehicleSizeId | "rv";
export type FinderService = "detailing" | "ceramic" | "ppf" | "windshield" | "headlights" | "rv";

export const FINDER_VEHICLES: { id: FinderVehicle; label: string }[] = [
  { id: "sedan", label: "Car / coupe" },
  { id: "suv", label: "SUV / crossover" },
  { id: "minivan", label: "3-row SUV / minivan" },
  { id: "truck", label: "Pickup truck" },
  { id: "rv", label: "RV / trailer" },
];

export const FINDER_SERVICES: { id: FinderService; label: string; rv?: boolean }[] = [
  { id: "detailing", label: "Detailing" },
  { id: "ceramic", label: "Paint correction / ceramic coating" },
  { id: "ppf", label: "Paint protection film" },
  { id: "windshield", label: "Windshield protection film" },
  { id: "headlights", label: "Headlight restoration" },
  { id: "rv", label: "RV wash, polish or restoration", rv: true },
];

export type Question = {
  id: string;
  label: string;
  /** "multi" = select all that apply. */
  kind: "single" | "multi" | "number";
  options?: { id: string; label: string }[];
  /** For number questions. */
  min?: number;
  max?: number;
  unit?: string;
};

export const QUESTIONS: Record<FinderService, Question[]> = {
  detailing: [
    {
      id: "needs",
      label: "Select all that apply",
      kind: "multi",
      options: [
        { id: "general", label: "Just a general clean" },
        { id: "shampoo", label: "Seats or carpets need a shampoo" },
        { id: "salt", label: "Salt stains / winter mess" },
        { id: "pet", label: "Pet hair" },
        { id: "odour", label: "Smells (smoke, food, pets)" },
        { id: "kids", label: "Kids, spills or heavy use" },
        { id: "leather", label: "Leather seats to clean and condition" },
        { id: "protect", label: "Protect the paint" },
        { id: "swirls", label: "Paint is dull or swirled" },
      ],
    },
    {
      id: "scope",
      label: "Inside, outside or both?",
      kind: "single",
      options: [
        { id: "both", label: "Inside and out" },
        { id: "interior", label: "Interior only" },
      ],
    },
  ],
  ceramic: [
    {
      id: "colour",
      label: "What colour is your paint?",
      kind: "single",
      options: [
        { id: "dark", label: "Black or dark" },
        { id: "light", label: "White or silver" },
        { id: "colour", label: "Red, blue or another colour" },
      ],
    },
    {
      id: "issues",
      label: "What's wrong with it? Select all that apply",
      kind: "multi",
      options: [
        { id: "swirls", label: "Swirls / spider webs" },
        { id: "scratches", label: "Light scratches" },
        { id: "dull", label: "Dull or faded" },
        { id: "spots", label: "Water spots" },
        { id: "chips", label: "Rock chips" },
        { id: "unprotected", label: "Nothing, it's new or unprotected" },
      ],
    },
    {
      id: "years",
      label: "How long do you want the protection to last?",
      kind: "single",
      options: [
        { id: "1", label: "About a year" },
        { id: "2", label: "2 years" },
        { id: "3", label: "3 years" },
        { id: "max", label: "As long and hard as possible" },
      ],
    },
  ],
  ppf: [
    {
      id: "driving",
      label: "How do you drive it?",
      kind: "single",
      options: [
        { id: "city", label: "Mostly city streets" },
        { id: "highway", label: "Highway commuting or a new car" },
        { id: "gravel", label: "Gravel roads and mountain trips" },
        { id: "keeper", label: "A keeper; I want every panel covered" },
      ],
    },
  ],
  windshield: [
    {
      id: "why",
      label: "Select all that apply",
      kind: "multi",
      options: [
        { id: "highway", label: "Lots of highway driving" },
        { id: "gravel", label: "Gravel or construction zones" },
        { id: "replaced", label: "I've replaced a windshield before" },
        { id: "new", label: "New windshield or new vehicle" },
      ],
    },
  ],
  headlights: [
    {
      id: "fog",
      label: "Do the fog lights need it too?",
      kind: "single",
      options: [
        { id: "no", label: "Just the headlights" },
        { id: "yes", label: "Headlights and fog lights" },
      ],
    },
  ],
  rv: [
    { id: "length", label: "About how long is it? (front to back, no hitch)", kind: "number", min: 10, max: 45, unit: "ft" },
    {
      id: "condition",
      label: "What does the outside look like?",
      kind: "single",
      options: [
        { id: "good", label: "Good, it just needs a wash and protection" },
        { id: "storage", label: "Going into storage soon" },
        { id: "chalky", label: "A little chalky or faded" },
        { id: "heavy", label: "Very chalky, older gelcoat" },
      ],
    },
  ],
};

export type Answers = Record<string, string | string[] | number>;

export type Recommendation = {
  service: FinderService;
  /** Package id on the target page (used for the highlight). */
  pkgId: string;
  name: string;
  /** Formatted price, e.g. "$429" or "From $1,725". */
  price: string;
  /** Short reasons tied to the answers. */
  why: string[];
  /** Likely extras, priced. */
  extras: string[];
  /** Service page with the package highlighted. */
  page: string;
  /** Path only, for matching the pop-up to the page. */
  path: string;
  /** Fieldd booking link. */
  book: string;
  /** Lead "need" value used by the booking assistant. */
  need: string;
};

const list = (a: Answers, k: string) => (Array.isArray(a[k]) ? (a[k] as string[]) : []);
const one = (a: Answers, k: string) => (typeof a[k] === "string" ? (a[k] as string) : "");

const pageUrl = (path: string, params: Record<string, string>, anchor: string) =>
  `${path}?${new URLSearchParams(params).toString()}#${anchor}`;

const addOnPrice = (name: string) => ADDONS.find((x) => x.name === name)?.price;

/** Questions for a service. RV-only services skip car questions and vice versa. */
export const servicesFor = (v: FinderVehicle) =>
  FINDER_SERVICES.filter((s) => (v === "rv" ? s.rv : !s.rv));

/** True once every question for the service has an answer. */
export const isComplete = (service: FinderService, a: Answers) =>
  QUESTIONS[service].every((q) =>
    q.kind === "multi" ? list(a, q.id).length > 0 : q.kind === "number" ? typeof a[q.id] === "number" : !!one(a, q.id),
  );

export const recommend = (vehicle: FinderVehicle, service: FinderService, a: Answers): Recommendation => {
  const size: VehicleSizeId = vehicle === "rv" ? "truck" : vehicle;

  if (service === "detailing") {
    const n = list(a, "needs");
    const interior = one(a, "scope") === "interior";
    const heavy = ["salt", "pet", "odour", "kids", "leather"].some((x) => n.includes(x));
    let id = "refresh";
    if (n.includes("swirls") && !interior) id = "restore";
    else if (heavy || (n.includes("protect") && !interior)) id = "showroom";
    const p = AUTO_PACKAGES.find((x) => x.id === id)!;
    const io = interior && p.interiorOnly ? p.interiorOnly : undefined;
    const why: string[] = [];
    if (id === "restore") why.push("Machine correction takes out the dullness and swirls, then a 1-year coating protects it.");
    if (id === "showroom")
      why.push(
        heavy
          ? "Deep extraction handles salt, spills, pet hair and odours that a standard shampoo leaves behind."
          : "Adds a ceramic spray sealant on the paint.",
      );
    if (id === "refresh") why.push("Full interior vacuum and shampoo plus a hand wash covers a general clean.");
    if (io) why.push("Interior-only version, so you skip the exterior work.");
    const extras: string[] = [];
    if (n.includes("pet")) extras.push(`Pet hair removal: from ${money(PET_HAIR_TIERS[0].price)}`);
    if (n.includes("odour")) extras.push(`Strong odour removal: ${money(addOnPrice("Strong Odour Removal") ?? 0)}`);
    const params: Record<string, string> = { size, pkg: id };
    if (io) params.io = "1";
    return {
      service,
      pkgId: id,
      name: io ? io.name : p.name,
      price: money(io ? io.price[size] : p.price[size]),
      why,
      extras,
      page: pageUrl("/detailing", params, `pkg-${id}`),
      path: "/detailing",
      book: fielddUrl(io ? io.book[size] : p.book[size]),
      need: "Full detail",
    };
  }

  if (service === "ceramic") {
    const issues = list(a, "issues");
    const dark = one(a, "colour") === "dark";
    const years = one(a, "years");
    const needsTwoStep =
      issues.includes("scratches") || issues.includes("dull") || (dark && issues.includes("swirls"));
    let id = years === "max" ? "elite" : years === "3" ? "signature" : years === "2" ? "essential" : "gloss";
    const why: string[] = [];
    if (needsTwoStep && (id === "gloss" || id === "essential")) {
      id = "signature";
      why.push(
        dark
          ? "Dark paint shows every swirl, and fixing scratches or fading takes a 2-step correction. Coat 3-Year is the first package with it."
          : "Scratches and fading need a 2-step correction. Coat 3-Year is the first package with it.",
      );
    }
    if (id === "signature" && !why.length) why.push("2-step cut and polish, then a 3-year coating on paint, glass and wheel faces.");
    if (id === "elite") why.push("Our hardest coating (DQUARTZ + Finest Reserve) over a 2-step correction.");
    if (id === "essential") why.push("1-step enhancement clears light swirls, then a 2-year coating on the paint.");
    if (id === "gloss") why.push("Brings back the gloss and seals it for about a year, without a full coating.");
    const extras: string[] = [];
    if (issues.includes("chips"))
      extras.push("Rock chips can't be polished out. Paint protection film on the front stops new ones.");
    const pkg = id === "gloss" ? GLOSS_PACKAGE : CERAMIC_PACKAGES.find((x) => x.id === id)!;
    return {
      service,
      pkgId: id,
      name: id === "gloss" ? GLOSS_PACKAGE.name : COATING_TIERS.find((t) => t.id === id)!.title,
      price: money(pkg.prices[size]),
      why,
      extras,
      page: pageUrl("/ceramic-coating", { size, pkg: id }, `pkg-${id}`),
      path: "/ceramic-coating",
      book: fielddUrl(pkg.book![size]),
      need: "Paint correction/ceramic",
    };
  }

  if (service === "ppf") {
    const d = one(a, "driving");
    const id = d === "city" ? "partial-front" : d === "gravel" ? "track-pack" : d === "keeper" ? "full-vehicle" : "full-front";
    const ppfSize: Exclude<CarPpfSizeId, "exotic"> = size === "sedan" ? "car" : size === "truck" ? "truck" : "suv";
    const p = CAR_PPF.find((x) => x.id === id)!;
    return {
      service,
      pkgId: id,
      name: `${p.name} PPF`,
      price: money(carPpfPrice(p.price, ppfSize)),
      why: [p.forWho],
      extras: [],
      page: pageUrl("/paint-protection-film", { ppf: ppfSize, pkg: id }, `pkg-${id}`),
      path: "/paint-protection-film",
      book: fielddUrl(p.book[ppfSize]),
      need: "PPF/windshield film",
    };
  }

  if (service === "windshield") {
    const id = size === "sedan" ? "compact" : size === "truck" || size === "minivan" ? "fullsize" : "midsize";
    const t = WINDSHIELD_PPF.find((x) => x.id === id)!;
    const why = ["ExoShield GT3+ takes rock hits that would chip or crack the glass, and it's optically clear."];
    if (list(a, "why").includes("replaced")) why.push("One avoided replacement usually covers the film.");
    return {
      service,
      pkgId: id,
      name: `ExoShield GT3+, ${t.label}`,
      price: money(t.price),
      why,
      extras: [],
      page: pageUrl("/windshield-ppf", { pkg: id }, "pricing"),
      path: "/windshield-ppf",
      book: fielddUrl(t.book),
      need: "PPF/windshield film",
    };
  }

  if (service === "headlights") {
    const fog = one(a, "fog") === "yes";
    return {
      service,
      pkgId: "headlights",
      name: fog ? "Headlight + fog light restoration" : "Headlight restoration",
      price: money(HEADLIGHT_RESTORATION.standalone + (fog ? HEADLIGHT_RESTORATION.fogLights : 0)),
      why: ["Wet sand, machine polish, then a 3-year UV-resistant ceramic on the lenses."],
      extras: [],
      page: "/headlight-restoration#pricing",
      path: "/headlight-restoration",
      book: fielddUrl(HEADLIGHT_RESTORATION.book),
      need: "Not sure",
    };
  }

  // RV
  const ft = Math.round(typeof a.length === "number" ? a.length : 25);
  const c = one(a, "condition");
  const id = c === "storage" ? "storageprep" : c === "chalky" ? "oxiseal" : c === "heavy" ? "fullrestore" : "washseal";
  const b = RV_BUNDLES.find((x) => x.id === id)!;
  const total = b.price * ft;
  return {
    service: "rv",
    pkgId: id,
    name: `RV ${b.name}`,
    price: b.assessment ? `About ${money(total)}` : money(total),
    why: [
      `${money(b.price)}/ft x ${ft} ft. ${b.bestFor}.`,
      ...(b.assessment ? ["We confirm the price at a free on-site assessment."] : []),
      ...(SEASON === "winter" ? ["RV work runs April to October. Book a spring date now to hold your spot."] : []),
    ],
    extras: [],
    page: "/trailer-rv#packages",
    path: "/trailer-rv",
    book: fielddUrl(b.book),
    need: "RV wash & seal",
  };
};
