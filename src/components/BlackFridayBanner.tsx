import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlackFridayCountdown } from "@/components/BlackFridayCountdown";
import { BLACK_FRIDAY_COPY } from "@/data/copy";
import { useBlackFriday } from "@/hooks/useBlackFriday";
import { BLACK_FRIDAY_DISMISS_KEY, isBlackFridayBannerVisible } from "@/lib/black-friday";

const BlackFridayBanner = () => {
  const { now, countdown } = useBlackFriday();
  const [dismissedAt, setDismissedAt] = useState<number | null>(null);
  useEffect(() => {
    try {
      const stored = localStorage.getItem(BLACK_FRIDAY_DISMISS_KEY);
      if (stored !== null && Number.isFinite(Number(stored))) setDismissedAt(Number(stored));
    } catch { /* Storage may be unavailable; the banner still works. */ }
    const onStorage = (event: StorageEvent) => {
      if (event.key === BLACK_FRIDAY_DISMISS_KEY) setDismissedAt(event.newValue !== null && Number.isFinite(Number(event.newValue)) ? Number(event.newValue) : null);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
  const visible = now !== null && isBlackFridayBannerVisible(now, dismissedAt);
  useEffect(() => {
    document.documentElement.style.setProperty("--sale-banner-h", visible ? "40px" : "0px");
    return () => document.documentElement.style.setProperty("--sale-banner-h", "0px");
  }, [visible]);
  if (!visible) return null;
  const dismiss = () => {
    const time = Date.now();
    setDismissedAt(time);
    try { localStorage.setItem(BLACK_FRIDAY_DISMISS_KEY, String(time)); } catch { /* In-memory dismissal remains available. */ }
  };
  return (
    <aside aria-label="Black Friday sale" className="bf-banner sticky top-0 z-[60] h-10">
      <div className="shell flex h-full items-center justify-center gap-3">
        <span className="hidden whitespace-nowrap text-xs font-semibold md:inline">{BLACK_FRIDAY_COPY.banner}</span>
        <div className="hidden md:block"><BlackFridayCountdown countdown={countdown} /></div>
        <span className="whitespace-nowrap text-[11px] font-medium sm:text-xs md:hidden">Black Friday ends in {countdown?.days ?? 0}d {countdown?.hours ?? 0}h {String(countdown?.minutes ?? 0).padStart(2, "0")}m</span>
        <Button asChild size="sm" className="bf-banner-link h-7 rounded-full px-3 text-[11px]">
          <Link to="/black-friday" aria-label="See the Black Friday packages"><span className="hidden md:inline">See the packages</span><ArrowRight aria-hidden="true" /></Link>
        </Button>
        <Button type="button" variant="ghost" size="icon" onClick={dismiss} aria-label="Dismiss Black Friday banner" className="bf-dismiss h-8 w-8 shrink-0"><X aria-hidden="true" /></Button>
      </div>
    </aside>
  );
};
export default BlackFridayBanner;