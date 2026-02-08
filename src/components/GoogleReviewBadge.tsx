import { Star } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const BOOKING_URL = "https://xpressauto.fieldd.co/";

const GoogleReviewBadge = () => (
  <section className="py-14 section-dark">
    <div className="container">
      <ScrollReveal>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-7 h-7 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="font-heading font-black text-2xl md:text-3xl text-primary-foreground uppercase">
              4.9 / 5.0 on Google
            </p>
            <p className="text-primary-foreground/90 text-sm">
              Based on 100+ verified reviews from real customers
            </p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="text-center">
              <p className="font-heading font-bold text-primary text-sm uppercase tracking-wider mb-1">
                🔥 Limited Spots This Week
              </p>
              <p className="text-primary-foreground/80 text-xs">
                Only a few time slots remaining — book yours before they fill up
              </p>
            </div>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-8 py-3 rounded text-sm hover:bg-brand-blue-deep transition-colors"
            >
              Claim Your Spot
            </a>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default GoogleReviewBadge;
