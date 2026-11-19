import { describe, it, expect } from "vitest";
import { isComplete, recommend, servicesFor } from "@/data/finder";
import { AUTO_PACKAGES, CERAMIC_PACKAGES, money } from "@/data/pricing";

describe("package finder", () => {
  it("general clean -> Inside & Out at the vehicle's price", () => {
    const r = recommend("suv", "detailing", { needs: ["general"], scope: "both" });
    expect(r.pkgId).toBe("refresh");
    expect(r.price).toBe(money(AUTO_PACKAGES.find((p) => p.id === "refresh")!.price.suv));
    expect(r.page).toContain("size=suv");
  });

  it("pet hair -> Deep Clean & Seal with a pet hair extra", () => {
    const r = recommend("sedan", "detailing", { needs: ["pet"], scope: "both" });
    expect(r.pkgId).toBe("showroom");
    expect(r.extras.join(" ")).toMatch(/Pet hair/);
  });

  it("interior only switches to the interior-only version", () => {
    const r = recommend("truck", "detailing", { needs: ["salt"], scope: "interior" });
    expect(r.name).toBe("Interior Deep Clean");
    expect(r.page).toContain("io=1");
  });

  it("dull or swirled paint on a full detail -> Correct & Coat", () => {
    expect(recommend("sedan", "detailing", { needs: ["swirls"], scope: "both" }).pkgId).toBe("restore");
  });

  it("dark paint with swirls bumps a 2-year ask to the 2-step 3-year package", () => {
    const r = recommend("sedan", "ceramic", { colour: "dark", issues: ["swirls"], years: "2" });
    expect(r.pkgId).toBe("signature");
    expect(r.price).toBe(money(CERAMIC_PACKAGES.find((p) => p.id === "signature")!.prices.sedan));
  });

  it("light paint, new car, 2 years -> Coat 2-Year", () => {
    expect(recommend("suv", "ceramic", { colour: "light", issues: ["unprotected"], years: "2" }).pkgId).toBe("essential");
  });

  it("rock chips on a ceramic ask adds a PPF note", () => {
    const r = recommend("sedan", "ceramic", { colour: "light", issues: ["chips"], years: "3" });
    expect(r.extras.join(" ")).toMatch(/protection film/);
  });

  it("RV wash & seal prices by length", () => {
    const r = recommend("rv", "rv", { length: 30, condition: "good" });
    expect(r.price).toBe(money(24 * 30));
  });

  it("RV only sees RV services, cars never do", () => {
    expect(servicesFor("rv").map((s) => s.id)).toEqual(["rv"]);
    expect(servicesFor("sedan").some((s) => s.id === "rv")).toBe(false);
  });

  it("needs every answer before showing a price", () => {
    expect(isComplete("ceramic", { colour: "dark", issues: [] })).toBe(false);
    expect(isComplete("ceramic", { colour: "dark", issues: ["swirls"], years: "3" })).toBe(true);
  });
});
