import { Phone } from "lucide-react";
import { BOOKING_URL, PHONE } from "@/data/pricing";

/** One call link, one book button. No countdowns, no scarcity. */
const StickyMobileCTA = () => (
  <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-brand-dark/95 backdrop-blur-md border-t border-white/10 px-4 py-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))]">
    <div className="flex items-center gap-3">
      <a
        href={`tel:${PHONE.replace(/-/g, "")}`}
        aria-label={`Call Xpress Auto Detailing at ${PHONE}`}
        className="flex min-h-[44px] items-center justify-center gap-2 rounded-md border border-white/25 px-5 text-sm font-semibold text-white"
      >
        <Phone className="w-4 h-4" aria-hidden="true" />
        Call
      </a>
      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 min-h-[44px] flex items-center justify-center rounded-md bg-electric px-5 text-sm font-semibold text-primary-foreground"
      >
        Book a detail
      </a>
    </div>
  </div>
);

export default StickyMobileCTA;
