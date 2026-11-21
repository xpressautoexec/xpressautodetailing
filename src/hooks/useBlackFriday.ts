import { useEffect, useState } from "react";
import { blackFridayCountdown, isBlackFridayActive } from "@/lib/black-friday";

/** Null on SSR/initial hydration; evaluate the wall clock on every client render. */
export const useBlackFriday = () => {
  const [tick, setTick] = useState<number | null>(null);
  useEffect(() => {
    const update = () => setTick(Date.now());
    update();
    const timer = window.setInterval(update, 1000);
    window.addEventListener("focus", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("focus", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);
  const now = tick === null ? null : Date.now();
  return { now, ready: now !== null, active: now !== null && isBlackFridayActive(now), countdown: now === null ? null : blackFridayCountdown(now) };
};