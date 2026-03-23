import { Phone, ArrowRight, Clock } from "lucide-react";

const BOOKING_URL = "https://xpressauto.fieldd.co/";

const StickyMobileCTA = () => (
  <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
    {/* Urgency ticker */}
    <div className="bg-urgency text-urgency-foreground py-1.5 px-4 flex items-center justify-center gap-2">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-urgency-foreground opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-urgency-foreground"></span>
      </span>
      <span className="font-heading font-bold text-[10px] uppercase tracking-wider">
        Only 3 spots left this week — Book now
      </span>
    </div>
    {/* CTA buttons */}
    <div className="bg-foreground/95 backdrop-blur-md border-t border-border/20 py-3 px-4">
      <div className="flex items-center gap-3">
        <a
          href="tel:5875004523"
          className="flex items-center justify-center gap-2 bg-card text-foreground font-heading font-bold uppercase tracking-wider px-4 py-3 rounded-lg text-xs border border-border hover:bg-muted transition-colors"
        >
          <Phone className="w-4 h-4" />
          Call
        </a>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-4 py-3 rounded-lg text-sm hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30 flex items-center justify-center gap-2"
        >
          <Clock className="w-4 h-4" />
          Book Now — 60 Sec
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  </div>
);

export default StickyMobileCTA;
