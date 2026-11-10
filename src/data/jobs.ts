/**
 * Job receipts. The live list comes from the `jobs` table (edit it in Lovable Cloud);
 * JOB_SEED below is the same list the table was seeded with, used for the prerendered HTML
 * and as a fallback if the database can't be reached.
 *
 * Photos: a value is either a path under src/assets (e.g. "jobs/rv-kodiak-front.webp") or a
 * full https URL (e.g. a photo uploaded to the public `job-photos` storage bucket).
 * Empty fields (price, time on site, crew) are simply not shown on the card.
 */

export type JobCategory = "car" | "rv" | "fleet" | "marine" | "ceramic_ppf";

export const JOB_CATEGORIES: { id: JobCategory; label: string }[] = [
  { id: "car", label: "Car" },
  { id: "rv", label: "RV" },
  { id: "fleet", label: "Fleet" },
  { id: "marine", label: "Marine" },
  { id: "ceramic_ppf", label: "Ceramic/PPF" },
];

export type JobRecord = {
  slug: string;
  category: JobCategory;
  vehicle: string;
  package_name: string;
  price_paid: number | null;
  time_on_site: string | null;
  city: string | null;
  crew: string[];
  /** Optional "before" photo; when set, the card shows a drag slider against photos[0]. */
  photo_before: string | null;
  photos: string[];
  photo_alts: string[];
  /** 1, 2, 3 = shown on the homepage in that order. */
  featured_rank: number | null;
  sort_order: number;
};

const ASSETS: Record<string, string> = {
  ...import.meta.glob("/src/assets/jobs/*.webp", { eager: true, import: "default", query: "?url" }),
  ...import.meta.glob("/src/assets/gallery-*.jpg", { eager: true, import: "default", query: "?url" }),
} as Record<string, string>;

/** Asset path or URL -> something an <img> can load. Unknown paths resolve to null. */
export const jobPhotoUrl = (value: string | null | undefined): string | null => {
  if (!value) return null;
  if (/^https?:\/\//.test(value)) return value;
  return ASSETS[`/src/assets/${value.replace(/^\/+/, "")}`] ?? null;
};

export const JOB_SEED: JobRecord[] = 
[
  {
    "slug": "mercedes-amg-gle",
    "category": "ceramic_ppf",
    "vehicle": "Mercedes-AMG GLE",
    "package_name": "Paint correction + System X PRO ceramic",
    "price_paid": null,
    "time_on_site": null,
    "city": null,
    "crew": [],
    "photo_before": null,
    "photos": [
      "jobs/headlight-mercedes-white.webp",
      "jobs/ceramic-mercedes-gle-badge.webp",
      "jobs/ceramic-mercedes-gle-wheel.webp",
      "jobs/headlight-mercedes-silver.webp"
    ],
    "photo_alts": [
      "White Mercedes-AMG GLE headlight after paint correction and System X ceramic coating",
      "Mercedes-AMG Biturbo badge on corrected white paint",
      "Mercedes-AMG GLE wheel, fender and running board after ceramic coating",
      "Mercedes-AMG GLE headlight and fender after ceramic coating, garage reflected in the paint"
    ],
    "featured_rank": 1,
    "sort_order": 10
  },
  {
    "slug": "surveyor-travel-trailer",
    "category": "rv",
    "vehicle": "Surveyor travel trailer",
    "package_name": "Gelcoat oxidation removal",
    "price_paid": null,
    "time_on_site": null,
    "city": "Calgary",
    "crew": [],
    "photo_before": null,
    "photos": [
      "jobs/rv-surveyor-tape-line.webp",
      "jobs/rv-surveyor-storage-lot.webp",
      "jobs/rv-surveyor-side.webp",
      "gallery-rv-surveyor-front.jpg",
      "gallery-rv-surveyor-full.jpg"
    ],
    "photo_alts": [
      "Surveyor travel trailer front cap with a tape line showing corrected versus oxidized gelcoat",
      "Surveyor travel trailer at a Calgary storage lot during gelcoat restoration",
      "Surveyor travel trailer side profile at the storage lot",
      "Surveyor travel trailer front cap during oxidation correction",
      "Surveyor travel trailer front cap full view during paint correction"
    ],
    "featured_rank": 2,
    "sort_order": 20
  },
  {
    "slug": "cat-320-excavator",
    "category": "fleet",
    "vehicle": "CAT 320 excavator",
    "package_name": "On-site wash + cab interior",
    "price_paid": null,
    "time_on_site": null,
    "city": "Calgary",
    "crew": [],
    "photo_before": null,
    "photos": [
      "jobs/fleet-cat-job-site.webp",
      "jobs/fleet-cat-320-site.webp",
      "jobs/fleet-cat-boom.webp",
      "jobs/fleet-cat-cab-door.webp",
      "jobs/fleet-cat-seat.webp",
      "jobs/fleet-cat-cab-floor.webp",
      "gallery-cat-excavator-pedals.jpg"
    ],
    "photo_alts": [
      "CAT excavator on a Calgary job site after wash",
      "CAT 320 excavator on site after wash",
      "CAT excavator boom and bucket after wash",
      "CAT excavator cab door open after interior clean",
      "CAT excavator operator seat after cleaning",
      "CAT excavator cab floor and seat after detail",
      "Spotless CAT excavator floor pedals and cab interior after detail"
    ],
    "featured_rank": 3,
    "sort_order": 30
  },
  {
    "slug": "bmw-m340i",
    "category": "ceramic_ppf",
    "vehicle": "BMW M340i",
    "package_name": "Paint correction + ceramic coating",
    "price_paid": null,
    "time_on_site": null,
    "city": null,
    "crew": [],
    "photo_before": null,
    "photos": [
      "jobs/exterior-bmw-m340i-front.webp",
      "jobs/ceramic-bmw-m340i-hood.webp",
      "jobs/ceramic-bmw-m340i-door.webp",
      "gallery-26.jpg",
      "gallery-28.jpg",
      "jobs/wheels-bmw-m340i-caliper.webp"
    ],
    "photo_alts": [
      "Blue BMW M340i in the shop after paint correction and ceramic coating",
      "Blue BMW M340i hood and headlight gloss after correction",
      "Blue BMW M340i door reflection after paint correction",
      "Blue BMW M340i with deep gloss under studio lighting after ceramic coating",
      "Blue BMW M340i rear view with glowing taillights after ceramic coating",
      "BMW M340i wheel with blue M caliper and dressed Michelin tire"
    ],
    "featured_rank": null,
    "sort_order": 40
  },
  {
    "slug": "newmar-dutch-star",
    "category": "rv",
    "vehicle": "Newmar Dutch Star diesel pusher",
    "package_name": "Full exterior detail + polish",
    "price_paid": null,
    "time_on_site": null,
    "city": null,
    "crew": [],
    "photo_before": null,
    "photos": [
      "jobs/rv-newmar-bay-side.webp",
      "gallery-newmar-dutch-star-front.jpg",
      "gallery-newmar-headlights.jpg",
      "jobs/rv-newmar-wheels.webp",
      "jobs/rv-newmar-mirror.webp",
      "gallery-newmar-dutch-star-badge.jpg"
    ],
    "photo_alts": [
      "Newmar Dutch Star motorhome in a service bay during exterior detail",
      "Newmar Dutch Star diesel pusher front view after full exterior detail",
      "Newmar Dutch Star headlights and front cap with mirror gloss after polish",
      "Newmar Dutch Star polished aluminum wheels after detail",
      "Chrome mirror on a Newmar Dutch Star after polish",
      "Newmar Dutch Star side badge and paint after exterior polish"
    ],
    "featured_rank": null,
    "sort_order": 50
  },
  {
    "slug": "cadillac-srx",
    "category": "car",
    "vehicle": "Cadillac SRX",
    "package_name": "Interior + exterior detail",
    "price_paid": null,
    "time_on_site": null,
    "city": "Calgary",
    "crew": [],
    "photo_before": null,
    "photos": [
      "jobs/exterior-cadillac-srx-driveway.webp",
      "jobs/interior-cadillac-srx-front-cabin.webp",
      "jobs/interior-cadillac-srx-dash.webp",
      "jobs/interior-cadillac-srx-rear-seats.webp",
      "jobs/interior-cadillac-srx-door.webp"
    ],
    "photo_alts": [
      "White Cadillac SRX front view after exterior detail",
      "Cadillac SRX cream leather front cabin after interior detail",
      "Cadillac SRX dashboard and console after interior detail",
      "Cadillac SRX rear seats after interior detail",
      "Cadillac SRX door panel after interior detail"
    ],
    "featured_rank": null,
    "sort_order": 60
  },
  {
    "slug": "dirtt-transit-vans",
    "category": "fleet",
    "vehicle": "Ford Transit fleet vans",
    "package_name": "On-site fleet cleaning",
    "price_paid": null,
    "time_on_site": null,
    "city": null,
    "crew": [],
    "photo_before": null,
    "photos": [
      "jobs/fleet-dirtt-transit-onsite.webp",
      "jobs/fleet-dirtt-vans-lot.webp"
    ],
    "photo_alts": [
      "Ford Transit fleet van during on-site cleaning",
      "Fleet vans at a company lot after on-site washes"
    ],
    "featured_rank": null,
    "sort_order": 70
  },
  {
    "slug": "ford-f150",
    "category": "car",
    "vehicle": "Ford F-150",
    "package_name": "Interior detail",
    "price_paid": null,
    "time_on_site": null,
    "city": null,
    "crew": [],
    "photo_before": null,
    "photos": [
      "jobs/interior-f150-front-seats.webp",
      "jobs/interior-f150-cabin.webp",
      "jobs/interior-f150-console.webp",
      "jobs/interior-f150-rear.webp",
      "jobs/interior-f150-rear-floor.webp"
    ],
    "photo_alts": [
      "Ford F-150 front seats and floor after interior detail",
      "Ford F-150 cabin after interior detail",
      "Ford F-150 console after interior detail",
      "Ford F-150 rear seat after interior detail",
      "Ford F-150 rear floor with the bench flipped up after vacuum and shampoo"
    ],
    "featured_rank": null,
    "sort_order": 80
  },
  {
    "slug": "sunchaser-pontoon",
    "category": "marine",
    "vehicle": "SunChaser pontoon",
    "package_name": "Full marine detail",
    "price_paid": null,
    "time_on_site": null,
    "city": null,
    "crew": [],
    "photo_before": null,
    "photos": [
      "gallery-sunchaser-pontoon.jpg",
      "gallery-sunchaser-pontoon-side.jpg",
      "gallery-sunchaser-pontoon-interior.jpg",
      "jobs/marine-sunchaser-deck.webp",
      "jobs/marine-sunchaser-logo.webp",
      "jobs/marine-mercury-outboard.webp"
    ],
    "photo_alts": [
      "SunChaser pontoon boat on its trailer after exterior detail",
      "SunChaser pontoon blue side panels and logs after polish",
      "SunChaser pontoon boat deck and vinyl seating after interior detail",
      "SunChaser pontoon deck and bimini after detail",
      "SunChaser logo close-up after polish",
      "Mercury 150 outboard motor after cleaning"
    ],
    "featured_rank": null,
    "sort_order": 90
  },
  {
    "slug": "range-rover",
    "category": "car",
    "vehicle": "Range Rover",
    "package_name": "Interior + exterior detail",
    "price_paid": null,
    "time_on_site": null,
    "city": "Calgary",
    "crew": [],
    "photo_before": null,
    "photos": [
      "jobs/exterior-range-rover-front.webp",
      "jobs/exterior-range-rover-three-quarter.webp",
      "jobs/interior-range-rover-front-cabin.webp",
      "jobs/interior-range-rover-rear-bench.webp",
      "jobs/wheels-range-rover-wheel.webp"
    ],
    "photo_alts": [
      "Green Range Rover front in the driveway after detail",
      "Green Range Rover front three-quarter after detail",
      "Range Rover front cabin after interior detail",
      "Range Rover tan leather rear bench after detail",
      "Range Rover wheel and fender after detail"
    ],
    "featured_rank": null,
    "sort_order": 100
  },
  {
    "slug": "flagstaff-travel-trailer",
    "category": "rv",
    "vehicle": "Flagstaff travel trailer",
    "package_name": "Gelcoat correction",
    "price_paid": null,
    "time_on_site": null,
    "city": null,
    "crew": [],
    "photo_before": null,
    "photos": [
      "jobs/rv-flagstaff-test-sections.webp",
      "gallery-flagstaff-trailer-correction.jpg",
      "jobs/rv-flagstaff-graphics.webp",
      "gallery-flagstaff-trailer-side.jpg"
    ],
    "photo_alts": [
      "Flagstaff travel trailer with tape lines marking polish test sections",
      "Flagstaff travel trailer with tape lines marking a fiberglass correction test spot",
      "Close-up of Flagstaff trailer graphics during polishing",
      "Flagstaff Signature travel trailer side profile after wash and polish"
    ],
    "featured_rank": null,
    "sort_order": 110
  },
  {
    "slug": "acura-dealership",
    "category": "fleet",
    "vehicle": "Acura dealership inventory",
    "package_name": "Dealership lot prep",
    "price_paid": null,
    "time_on_site": null,
    "city": "Calgary",
    "crew": [],
    "photo_before": null,
    "photos": [
      "jobs/dealership-acura-white-lot.webp",
      "jobs/dealership-acura-blue-lineup.webp",
      "jobs/dealership-acura-rdx-lot.webp",
      "jobs/dealership-acura-red-seats.webp",
      "jobs/dealership-acura-third-row.webp",
      "jobs/dealership-acura-engine-bay.webp"
    ],
    "photo_alts": [
      "White Acura on the dealership lot after prep detail",
      "Blue Acura lineup at the dealership after detail",
      "Grey Acura RDX on the lot after detail",
      "Acura red leather sport seats after dealership interior detail",
      "Acura third-row seats and cargo area after dealership prep",
      "Acura engine bay after dealership prep"
    ],
    "featured_rank": null,
    "sort_order": 120
  },
  {
    "slug": "bmw-2-series-convertible",
    "category": "car",
    "vehicle": "BMW 2 Series convertible",
    "package_name": "Interior detail",
    "price_paid": null,
    "time_on_site": null,
    "city": null,
    "crew": [],
    "photo_before": null,
    "photos": [
      "jobs/interior-bmw-red-front-seats.webp",
      "jobs/interior-bmw-red-driver-side.webp",
      "jobs/interior-bmw-red-rear-seats.webp",
      "gallery-bmw-rear.jpg"
    ],
    "photo_alts": [
      "BMW 2 Series convertible red leather front seats after interior detail",
      "BMW 2 Series convertible red leather cabin and dash after interior detail",
      "BMW red leather rear seats after interior detail",
      "BMW 2-Series convertible rear three-quarter view freshly detailed"
    ],
    "featured_rank": null,
    "sort_order": 130
  },
  {
    "slug": "kodiak-travel-trailer",
    "category": "rv",
    "vehicle": "Kodiak Ultra-Lite travel trailer",
    "package_name": "RV exterior detail",
    "price_paid": null,
    "time_on_site": null,
    "city": null,
    "crew": [],
    "photo_before": null,
    "photos": [
      "jobs/rv-kodiak-front.webp",
      "jobs/rv-kodiak-side.webp",
      "jobs/wheels-kodiak-wheels.webp"
    ],
    "photo_alts": [
      "Kodiak travel trailer front cap after exterior detail",
      "Kodiak travel trailer side after wash and polish",
      "Kodiak travel trailer fenders and wheels after dressing"
    ],
    "featured_rank": null,
    "sort_order": 140
  },
  {
    "slug": "hurricane-motorhome",
    "category": "rv",
    "vehicle": "Hurricane motorhome",
    "package_name": "Oxidation removal + exterior detail",
    "price_paid": null,
    "time_on_site": null,
    "city": null,
    "crew": [],
    "photo_before": null,
    "photos": [
      "gallery-hurricane-side.jpg",
      "gallery-hurricane-front.jpg",
      "gallery-hurricane-head-on.jpg",
      "gallery-hurricane-rear.jpg"
    ],
    "photo_alts": [
      "Hurricane RV full side profile after oxidation removal and detail",
      "Hurricane motorhome front view after full exterior detail",
      "Hurricane RV head-on view after professional wash and detail",
      "Hurricane motorhome rear view freshly detailed"
    ],
    "featured_rank": null,
    "sort_order": 150
  },
  {
    "slug": "audi-a4",
    "category": "car",
    "vehicle": "Audi A4",
    "package_name": "Exterior detail",
    "price_paid": null,
    "time_on_site": null,
    "city": "Calgary",
    "crew": [],
    "photo_before": null,
    "photos": [
      "jobs/exterior-audi-a4-driveway.webp",
      "gallery-audi-a4.jpg",
      "gallery-audi-a4-reflection.jpg",
      "jobs/wheels-audi-a4-wheel.webp"
    ],
    "photo_alts": [
      "Black Audi A4 in a Calgary driveway after exterior detail",
      "Black Audi A4 with glossy finish after exterior detail",
      "Black Audi A4 taillight and quarter panel reflecting like a mirror after polish",
      "Audi A4 wheel and dressed tire after wheel detail"
    ],
    "featured_rank": null,
    "sort_order": 160
  }
] as JobRecord[];
