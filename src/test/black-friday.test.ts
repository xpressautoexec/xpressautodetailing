import { describe, expect, it } from "vitest";
import { blackFridayCountdown, blackFridayMaxDiscount, blackFridayPrice, BLACK_FRIDAY_DEADLINE, BLACK_FRIDAY_DISMISS_MS, isBlackFridayActive, isBlackFridayBannerVisible } from "@/lib/black-friday";
import { BLACK_FRIDAY_PRICES } from "@/data/pricing";

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
  it.each(["bronze", "silver", "gold"] as const)("%s sedan line items add up to the owner's regular price and discount", (id) => {
    const price = blackFridayPrice(id, "sedan");
    expect(price.sale).toBe(BLACK_FRIDAY_PRICES[id].sedan);
    expect(price.regular).toBe(BLACK_FRIDAY_PRICES[id].regular);
    expect(price.discount).toBe(BLACK_FRIDAY_PRICES[id].discount);
    expect(price.savings).toBe(price.regular - price.sale);
  });
  it.each([
    ["bronze", "suv", 349, 609], ["bronze", "truck", 379, 649],
    ["silver", "suv", 849, 1337], ["silver", "truck", 949, 1477],
    ["gold", "suv", 1299, 1896], ["gold", "truck", 1399, 2066],
  ] as const)("%s %s reads published prices for larger vehicles", (id, size, sale, regular) => {
    expect(blackFridayPrice(id, size)).toMatchObject({ sale, regular, savings: regular - sale });
  });
  it("advertises the real maximum discount", () => {
    expect(blackFridayMaxDiscount()).toBe(47);
  });
});
