/**
 * Which seasonal feature the homepage leads with.
 *   "winter" (Nov–Mar): salt season, interior extraction, shop-based protection, fleet rotations.
 *   "summer" (Apr–Oct): RV restoration and storage prep first.
 * Flip this twice a year. RV stays in the homepage path tiles either way.
 */
export type Season = "winter" | "summer";
export const SEASON: Season = "winter";

/**
 * The crew shown on the homepage. Add `photo` (an imported image) as real crew photos come in;
 * until then each card shows a monogram tile. Names are first names only.
 */
export type CrewMember = { name: string; role: string; photo?: string };
export const CREW: CrewMember[] = [
  // Placeholders until crew photos are uploaded. Names as customers know them from reviews.
  { name: "Youssef", role: "Detailer" },
  { name: "Adam", role: "Detailer" },
];
