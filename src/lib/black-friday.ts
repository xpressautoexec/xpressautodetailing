import {
  ADDONS,
  AUTO_PACKAGES,
  BLACK_FRIDAY_PACKAGE_ITEMS,
  BLACK_FRIDAY_PRICES,
  BLACK_FRIDAY_UNLISTED_VALUES,
  CAR_PPF,
  HEADLIGHT_RESTORATION,
  WINDSHIELD_PPF,
  carPpfPrice,
  type BlackFridayItemId,
  type BlackFridaySize,
} from "@/data/pricing";

export const BLACK_FRIDAY_DEADLINE = Date.parse("2026-12-06T06:59:59Z");
export const BLACK_FRIDAY_DISMISS_KEY = "xpress-black-friday-2026-dismissed";
export const BLACK_FRIDAY_DISMISS_MS = 24 * 60 * 60 * 1000;

export const isBlackFridayActive = (now: number) => now <= BLACK_FRIDAY_DEADLINE;
export const isBlackFridayBannerVisible = (now: number, dismissedAt: number | null) =>
  isBlackFridayActive(now) && (dismissedAt === null || now - dismissedAt >= BLACK_FRIDAY_DISMISS_MS);

export const blackFridayCountdown = (now: number) => {
  const total = Math.max(0, Math.ceil((BLACK_FRIDAY_DEADLINE - now) / 1000));
  return { days: Math.floor(total / 86400), hours: Math.floor((total % 86400) / 3600), minutes: Math.floor((total % 3600) / 60), seconds: total % 60 };
};

const AUTO_SIZE = { sedan: "sedan", suv: "suv", truck: "truck" } as const;
const PPF_SIZE = { sedan: "car", suv: "suv", truck: "truck" } as const;
const WINDSHIELD_SIZE = { sedan: "compact", suv: "midsize", truck: "fullsize" } as const;

const published = (value: number | undefined, name: string) => {
  if (value === undefined) throw new Error(`Black Friday: missing published price for ${name}`);
  return value;
};

/** Regular price of one package item for a vehicle size, read from the published price lists. */
export const blackFridayItemValue = (item: BlackFridayItemId, size: BlackFridaySize): number => {
  switch (item) {
    case "insideOut":
      return published(AUTO_PACKAGES.find((p) => p.id === "refresh")?.price[AUTO_SIZE[size]], item);
    case "engineBay":
      return published(ADDONS.find((a) => a.name === "Engine Bay Detail")?.price, item);
    case "headlights":
      return HEADLIGHT_RESTORATION.standalone;
    case "windshieldFilm":
      return published(WINDSHIELD_PPF.find((w) => w.id === WINDSHIELD_SIZE[size])?.price, item);
    case "partialPpf":
      return carPpfPrice(published(CAR_PPF.find((p) => p.id === "partial-front")?.price, item), PPF_SIZE[size]);
    default:
      return BLACK_FRIDAY_UNLISTED_VALUES[item];
  }
};

export type BlackFridayPackageId = keyof typeof BLACK_FRIDAY_PRICES;

export const blackFridayPrice = (id: BlackFridayPackageId, size: BlackFridaySize) => {
  const sale = BLACK_FRIDAY_PRICES[id][size];
  const items = BLACK_FRIDAY_PACKAGE_ITEMS[id].map((item) => ({ id: item as BlackFridayItemId, value: blackFridayItemValue(item, size) })).sort((a, b) => a.value - b.value);
  const regular = items.reduce((sum, item) => sum + item.value, 0);
  return { sale, regular, savings: regular - sale, discount: Math.round((1 - sale / regular) * 100), items };
};

/** Largest percentage off across every package and size, for the hero and SEO copy. */
export const blackFridayMaxDiscount = () =>
  Math.max(...(Object.keys(BLACK_FRIDAY_PRICES) as BlackFridayPackageId[]).flatMap((id) => (["sedan", "suv", "truck"] as const).map((size) => blackFridayPrice(id, size).discount)));
