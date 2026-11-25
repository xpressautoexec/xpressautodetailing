import { useEffect, useState } from "react";
import { GIFT_CARD_BONUS } from "@/data/pricing";

export const isGiftCardBonusActive = (now: number) => now <= GIFT_CARD_BONUS.deadline;

/** Null on SSR/initial hydration so the offer never renders from a stale prerender clock. */
export const useGiftCardBonus = () => {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const update = () => setNow(Date.now());
    update();
    const timer = window.setInterval(update, 60_000);
    window.addEventListener("focus", update);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("focus", update);
    };
  }, []);
  return { active: now !== null && isGiftCardBonusActive(now) };
};
