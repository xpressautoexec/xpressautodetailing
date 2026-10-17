import { describe, expect, it } from "vitest";
import { GOOGLE_REVIEWS_URL } from "@/data/copy";

describe("Google review destination", () => {
  it("uses the owner's supplied Google share link", () => {
    expect(GOOGLE_REVIEWS_URL).toBe("https://share.google/2MMngu3EuRPVNRLFP");
  });
});