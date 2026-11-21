import { describe, expect, it } from "vitest";
import { blackFridayCountdown, blackFridayPrice, BLACK_FRIDAY_DEADLINE, BLACK_FRIDAY_DISMISS_MS, isBlackFridayActive, isBlackFridayBannerVisible } from "@/lib/black-friday";

describe("Black Friday sale rules", () => {
  it("ends at the supplied Mountain Time deadline", () => {
    expect(BLACK_FRIDAY_DEADLINE).toBe(Date.parse("2026-12-01T06:59:59Z"));
    expect(isBlackFridayActive(Date.parse("2026-12-01T06:59:58Z"))).toBe(true);
    expect(isBlackFridayActive(Date.parse("2026-12-01T07:00:00Z"))).toBe(false);
  });
  it("counts days, hours, minutes and seconds without going negative", () => {
    expect(blackFridayCountdown(BLACK_FRIDAY_DEADLINE - (3 * 86400 + 12 * 3600 + 4 * 60 + 9) * 1000)).toEqual({ days: 3, hours: 12, minutes: 4, seconds: 9 });
    expect(blackFridayCountdown(BLACK_FRIDAY_DEADLINE + 1000)).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  });
  it("remembers dismissal for exactly 24 hours", () => {
    const dismissed = Date.parse("2026-11-21T17:32:00Z");
    expect(BLACK_FRIDAY_DISMISS_MS).toBe(86400000);
    expect(isBlackFridayBannerVisible(dismissed + 86399999, dismissed)).toBe(false);
    expect(isBlackFridayBannerVisible(dismissed + 86400000, dismissed)).toBe(true);
    expect(isBlackFridayBannerVisible(BLACK_FRIDAY_DEADLINE + 1, null)).toBe(false);
  });
  it.each([
    ["bronze", 299, 349, 379, 559, 47],
    ["silver", 749, 849, 949, 1187, 37],
    ["gold", 1199, 1299, 1399, 1686, 29],
  ] as const)("uses the supplied %s prices and sedan-only regular price", (id, sedan, suv, truck, regular, discount) => {
    expect(blackFridayPrice(id, "sedan")).toEqual({ sale: sedan, regular, discount });
    expect(blackFridayPrice(id, "suv")).toEqual({ sale: suv, regular: null, discount: null });
    expect(blackFridayPrice(id, "truck")).toEqual({ sale: truck, regular: null, discount: null });
  });
});