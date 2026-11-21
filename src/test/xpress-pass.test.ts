import { describe, expect, it } from "vitest";
import { AUTO_PACKAGES, MOBILE_FEE, PASS_SIZES, XPRESS_PASS, memberPricesFor, passAnnualValue } from "@/data/pricing";

describe("Xpress Pass", () => {
  it("has the owner-approved tiers and prices", () => {
    const [silver, gold] = XPRESS_PASS;
    expect(silver.monthly).toEqual({ sedan: 79, suv: 89, minivan: 99, truck: 99 });
    expect(gold.monthly).toEqual({ sedan: 149, suv: 164, minivan: 179, truck: 179 });
    expect([silver.secondVehicle, gold.secondVehicle]).toEqual([60, 120]);
    expect([silver.bookingWindowHrs, gold.bookingWindowHrs]).toEqual([72, 48]);
    expect(gold.included.find((i) => i.item === "upkeep")?.qty).toBe(4);
    expect(MOBILE_FEE).toBe(20);
  });
  it.each(XPRESS_PASS.flatMap((t) => PASS_SIZES.map((s) => [t.id, s.id] as const)))("%s %s: members get back more than they pay", (tier, size) => {
    const v = passAnnualValue(tier, size);
    expect(v.net).toBeGreaterThan(0);
  });
  it("sedan annual values", () => {
    expect(passAnnualValue("silver", "sedan")).toMatchObject({ included: 1256, cost: 948, net: 308 });
    expect(passAnnualValue("gold", "sedan")).toMatchObject({ included: 2522, cost: 1788, net: 734 });
  });
  it("Upkeep is publicly bookable and members price off the regular rate", () => {
    const upkeep = AUTO_PACKAGES.find((p) => p.id === "maintain")!;
    expect(upkeep.memberOnly).toBeFalsy();
    const insideOut = AUTO_PACKAGES.find((p) => p.id === "refresh")!;
    expect(memberPricesFor(insideOut, "sedan")).toEqual({ silver: 203, gold: 191 });
  });
});
