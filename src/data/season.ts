/**
 * Which seasonal feature the homepage leads with.
 *   "winter" (Nov–Mar): salt season, interior extraction, shop-based protection, fleet rotations.
 *   "summer" (Apr–Oct): RV restoration and storage prep first.
 * Flip this twice a year. RV stays in the homepage path tiles either way.
 */
import { SEASON as CONFIG_SEASON } from "@/config/site";

export type Season = "winter" | "summer";
/** Set in src/config/site.ts. */
export const SEASON: Season = CONFIG_SEASON;

/**
 * The crew. Add `photo` (an imported image from src/assets) and a one-line `fact` per person as
 * they come in. Until a photo is added the card shows a monogram; an empty fact is not shown.
 */
export type CrewMember = { name: string; role: string; photo?: string; fact?: string };
export const CREW: CrewMember[] = [
  // Placeholders: names as customers know them from Google reviews. TODO: photos, roles, facts.
  { name: "Youssef", role: "Detailer" },
  { name: "Adam", role: "Detailer" },
];
