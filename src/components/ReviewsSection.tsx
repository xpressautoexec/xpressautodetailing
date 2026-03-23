import { Star, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const BOOKING_URL = "https://xpressauto.fieldd.co/";

const ReviewsSection = () => {
  return (
    <section id="reviews" className="py-16 sm:py-20 bg-primary">
      <div className="container text-center">
        <ScrollReveal>
          <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase text-primary-foreground mb-4">
            100+ Five-Star Reviews
          </h2>
          <div className="flex justify-center gap-1 mb-8">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-primary-foreground text-primary-foreground" />
            ))}
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <div className="max-w-2xl mx-auto bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-8 mb-8 border border-primary-foreground/10">
            <p className="text-primary-foreground/90 italic leading-relaxed mb-6 text-sm sm:text-base">
              "Absolutely blown away by this mobile detailing service! They came right to me — super convenient, on time, and fully prepared. The team was professional, friendly, and completely customer-focused. They did an incredible job on the interior of my car — it looks and feels brand new! If you're looking for high-quality, hassle-free interior detailing — this is the one. Highly recommend!"
            </p>
            <p className="font-heading font-bold text-primary-foreground uppercase tracking-wider text-sm">
              — Debb A.
            </p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.3}>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 bg-primary-foreground text-primary font-heading font-bold uppercase tracking-wider px-8 py-3.5 rounded-lg text-sm hover:bg-primary-foreground/90 transition-all shadow-lg"
          >
            Join 2,000+ Happy Clients
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ReviewsSection;
