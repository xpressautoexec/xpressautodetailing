import type { FinderVehicle, Recommendation } from "@/data/finder";

/**
 * Hand-off from the home page package finder to the booking assistant: the visitor's vehicle and the
 * package we recommended, so the pop-up on that service page skips the vehicle question and offers
 * that exact package.
 */
const KEY = "xp_finder_v1";
/** A pick older than this is treated as stale. */
const MAX_AGE_MS = 24 * 3600e3;

export type FinderPick = {
  vehicle: FinderVehicle;
  rec: Pick<Recommendation, "name" | "price" | "book" | "need" | "path">;
  at: number;
};

export const saveFinderPick = (vehicle: FinderVehicle, rec: Recommendation) => {
  try {
    const pick: FinderPick = {
      vehicle,
      rec: { name: rec.name, price: rec.price, book: rec.book, need: rec.need, path: rec.path },
      at: Date.now(),
    };
    localStorage.setItem(KEY, JSON.stringify(pick));
  } catch {
    /* storage unavailable: the pop-up falls back to its own questions */
  }
};

/** The finder pick for this page, if it is recent and was made for this path. */
export const finderPickFor = (path: string): FinderPick | null => {
  try {
    const p = JSON.parse(localStorage.getItem(KEY) ?? "null") as FinderPick | null;
    if (!p || Date.now() - p.at > MAX_AGE_MS || p.rec.path !== path) return null;
    return p;
  } catch {
    return null;
  }
};
