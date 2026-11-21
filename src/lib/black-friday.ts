import { BLACK_FRIDAY_PRICES, type BlackFridaySize } from "@/data/pricing";

export const BLACK_FRIDAY_DEADLINE = Date.parse("2026-12-01T06:59:59Z");
export const BLACK_FRIDAY_DISMISS_KEY = "xpress-black-friday-2026-dismissed";
export const BLACK_FRIDAY_DISMISS_MS = 24 * 60 * 60 * 1000;

export const isBlackFridayActive = (now: number) => now <= BLACK_FRIDAY_DEADLINE;
export const isBlackFridayBannerVisible = (now: number, dismissedAt: number | null) =>
  isBlackFridayActive(now) && (dismissedAt === null || now - dismissedAt >= BLACK_FRIDAY_DISMISS_MS);

export const blackFridayCountdown = (now: number) => {
  const total = Math.max(0, Math.ceil((BLACK_FRIDAY_DEADLINE - now) / 1000));
  return { days: Math.floor(total / 86400), hours: Math.floor((total % 86400) / 3600), minutes: Math.floor((total % 3600) / 60), seconds: total % 60 };
};

export const blackFridayPrice = (id: keyof typeof BLACK_FRIDAY_PRICES, size: BlackFridaySize) => {
  const prices = BLACK_FRIDAY_PRICES[id];
  return { sale: prices[size], regular: size === "sedan" ? prices.regular : null, discount: size === "sedan" ? prices.discount : null };
};