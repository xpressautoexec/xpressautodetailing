import { Phone } from "lucide-react";

const BOOKING_URL = "https://xpressauto.fieldd.co/";

const StickyMobileCTA = () => (
  <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-brand-dark/95 backdrop-blur-md border-t border-brand-dark-surface py-3 px-4">
    <div className="flex items-center gap-3">
      <a
        href="tel:5875004523"
        className="flex items-center justify-center gap-2 bg-brand-dark-surface text-primary-foreground font-heading font-bold uppercase tracking-wider px-4 py-3 rounded text-xs border border-border hover:bg-brand-dark transition-colors"
      >
        <Phone className="w-4 h-4" />
        Call
      </a>
      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 text-center bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-4 py-3 rounded text-sm hover:bg-brand-blue-deep transition-colors animate-pulse hover:animate-none"
      >
        Book Now — Limited Spots
      </a>
    </div>
  </div>
);

export default StickyMobileCTA;
