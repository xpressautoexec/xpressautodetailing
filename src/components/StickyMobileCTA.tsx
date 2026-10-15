import { Phone } from "lucide-react";
import { BOOKING_URL, PHONE } from "@/data/pricing";

/** One call link, one book button, at the end of the page on phones (not pinned). No countdowns, no scarcity. */
const StickyMobileCTA = () => (
  <div className="lg:hidden bg-brand-dark border-t border-primary-foreground/10 px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
    <div className="flex items-center gap-3">
      <a
        href={`tel:${PHONE.replace(/-/g, "")}`}
        aria-label={`Call Xpress Auto & RV Detailing at ${PHONE}`}
        className="flex min-h-[44px] items-center justify-center gap-2 rounded-md border border-primary-foreground/25 px-5 text-sm font-semibold text-primary-foreground"
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
