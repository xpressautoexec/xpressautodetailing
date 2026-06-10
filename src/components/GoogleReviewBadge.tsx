import { Star, ArrowRight, Clock, ExternalLink } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const BOOKING_URL = "https://xpressauto.fieldd.co/";
const GOOGLE_REVIEWS_URL = "https://g.page/r/CQ5ISLUTohBKEBM/review";

const reviews = [
  {
    name: "Mike T.",
    initials: "MT",
    rating: 5,
    timeAgo: "2 weeks ago",
    text: "Best detailing service in Calgary, hands down. They came to my office and had my SUV looking brand new by the time I was done work. Worth every penny.",
  },
  {
    name: "Priya S.",
    initials: "PS",
    rating: 5,
    timeAgo: "1 month ago",
    text: "I've tried 4 different detailers in the city. Xpress is the only one I keep coming back to. Consistent quality every single time and incredibly professional.",
  },
  {
    name: "Brandon L.",
    initials: "BL",
    rating: 5,
    timeAgo: "3 weeks ago",
    text: "Got my truck ceramic coated before winter. Best decision I made — the salt and grime just washes right off. Still looks incredible 6 months later.",
  },
];

const GoogleLogo = () => (
  <svg viewBox="0 0 48 48" className="w-4 h-4" aria-hidden="true">
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.3-.4-3.5z" />
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
    <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.2c-2 1.5-4.6 2.4-7.3 2.4-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.3 5.6l6.3 5.2C41.2 35.7 44 30.3 44 24c0-1.3-.1-2.3-.4-3.5z" />
  </svg>
);

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

      <ScrollReveal delay={0.15}>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {reviews.map((r) => (
            <div
              key={r.name}
              className="bg-background/[0.04] border border-background/10 rounded-xl p-5 backdrop-blur-sm hover:bg-background/[0.07] transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 text-background flex items-center justify-center font-heading font-bold text-sm shrink-0">
                  {r.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="font-heading font-bold text-background text-sm truncate">{r.name}</p>
                    <GoogleLogo />
                  </div>
                  <p className="text-background/50 text-xs">{r.timeAgo}</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-2">
                {[...Array(r.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-background/80 text-sm leading-relaxed line-clamp-5">{r.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-background/80 hover:text-background font-heading font-semibold text-xs uppercase tracking-wider border border-background/20 hover:border-background/40 rounded-lg px-5 py-2.5 transition-colors"
          >
            <GoogleLogo />
            Read all reviews on Google
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default GoogleReviewBadge;
