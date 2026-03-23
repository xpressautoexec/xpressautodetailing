import { Star, ArrowRight, Clock } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const BOOKING_URL = "https://xpressauto.fieldd.co/";

const GoogleReviewBadge = () => (
  <section className="py-12 sm:py-14 bg-foreground">
    <div className="container">
      <ScrollReveal>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-7 h-7 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="font-heading font-black text-2xl md:text-3xl text-background uppercase">
              4.9 / 5.0 on Google
            </p>
            <p className="text-background/70 text-sm">
              Based on 100+ verified reviews from real customers
            </p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 text-urgency font-heading font-bold text-sm uppercase tracking-wider">
              <Clock className="w-4 h-4" />
              Limited Spots This Week
            </div>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-8 py-3.5 rounded-lg text-sm hover:bg-brand-blue-deep transition-all shadow-lg shadow-primary/30"
            >
              Claim Your Spot
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default GoogleReviewBadge;
