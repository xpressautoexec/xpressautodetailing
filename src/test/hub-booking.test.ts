import { describe, expect, it } from "vitest";
import { offerFor } from "@/components/BookingAssistant";
import { recommend } from "@/data/finder";
import {
  AUTO_PACKAGES,
  CERAMIC_PACKAGES,
  HUB_BOOKING_ORIGIN,
  buildHubBookUrl,
  fielddUrl,
  hubBookUrl,
  isHubBookUrl,
} from "@/data/pricing";
import { parseHubBookingMessage } from "@/lib/hubBookingMessages";

describe("Xpress Hub booking links", () => {
  it("stays disabled while HUB_BOOKING_ORIGIN is null", () => {
    expect(HUB_BOOKING_ORIGIN).toBeNull();
    expect(hubBookUrl({ source: "package-finder", size: "sedan", service: "deep-clean-seal", promo: "WEB5" })).toBeNull();
  });

  it("keeps the booking assistant's detailing and ceramic offers on Fieldd", () => {
    const detailing = AUTO_PACKAGES.find((p) => p.id === "showroom")!;
    const ceramic = CERAMIC_PACKAGES.find((p) => p.id === "signature")!;

    expect(offerFor("/detailing", "suv")?.href).toBe(fielddUrl(detailing.book.suv));
    expect(offerFor("/ceramic-coating", "minivan")?.href).toBe(fielddUrl(ceramic.book.minivan));
  });

  it("keeps full package finder recommendations on Fieldd", () => {
    const detailing = recommend("sedan", "detailing", { needs: ["pet"], scope: "both" });
    const detailingPkg = AUTO_PACKAGES.find((p) => p.id === detailing.pkgId)!;
    const ceramic = recommend("suv", "ceramic", { colour: "light", issues: ["unprotected"], years: "3" });
    const ceramicPkg = CERAMIC_PACKAGES.find((p) => p.id === ceramic.pkgId)!;

    expect(detailing.book).toBe(fielddUrl(detailingPkg.book.sedan));
    expect(ceramic.book).toBe(fielddUrl(ceramicPkg.book.suv));
  });

  it("keeps interior-only finder recommendations on their existing Fieldd links", () => {
    const result = recommend("truck", "detailing", { needs: ["salt"], scope: "interior" });
    const pkg = AUTO_PACKAGES.find((p) => p.id === result.pkgId)!;

    expect(result.book).toBe(fielddUrl(pkg.interiorOnly!.book.truck));
  });

  it("builds a normalized hub deep link with booking and attribution parameters", () => {
    expect(buildHubBookUrl("https://hub.test/", {
      source: "package-finder",
      size: "minivan",
      service: "deep-clean-seal",
      promo: "WEB5",
    })).toBe("https://hub.test/book?embed=1&size=minivan&service=deep-clean-seal&promo=WEB5&utm_source=website&utm_campaign=package-finder");
  });

  it("recognizes only embedded wizard URLs on the configured origin", () => {
    const url = buildHubBookUrl("https://hub.test", { source: "xpress-pass", pass: "gold" });
    expect(isHubBookUrl(url)).toBe(false);
    expect(isHubBookUrl(url, "https://hub.test")).toBe(true);
    expect(isHubBookUrl(url, "https://other.test")).toBe(false);
    expect(isHubBookUrl(url.replace("embed=1", "embed=0"), "https://hub.test")).toBe(false);
    expect(isHubBookUrl("not a URL", "https://hub.test")).toBe(false);
    expect(new URL(url).searchParams.get("pass")).toBe("gold");
  });

  it("ignores messages from other origins even with the correct source", () => {
    expect(parseHubBookingMessage({ origin: "https://other.test", data: { source: "xpress-hub", type: "booked", bookingNumber: "J-5015" } }, "https://hub.test")).toBeNull();
  });

  it("ignores messages without the xpress-hub source", () => {
    expect(parseHubBookingMessage({ origin: "https://hub.test", data: { type: "resize", height: 900 } }, "https://hub.test")).toBeNull();
    expect(parseHubBookingMessage({ origin: "https://hub.test", data: { source: "other", type: "booked", bookingNumber: "J-5015" } }, "https://hub.test")).toBeNull();
  });

  it("accepts valid resize and booking messages only when the switch is enabled", () => {
    const event = { origin: "https://hub.test", data: { source: "xpress-hub", type: "booked", bookingNumber: "J-5015" } };
    expect(parseHubBookingMessage(event, "https://hub.test")).toEqual({ type: "booked", bookingNumber: "J-5015" });
    expect(parseHubBookingMessage(event, null)).toBeNull();
    expect(parseHubBookingMessage({ origin: "https://hub.test", data: { source: "xpress-hub", type: "resize", height: 900 } }, "https://hub.test")).toEqual({ type: "resize", height: 900 });
    expect(parseHubBookingMessage({ origin: "https://hub.test", data: { source: "xpress-hub", type: "resize", height: Infinity } }, "https://hub.test")).toBeNull();
  });
});
