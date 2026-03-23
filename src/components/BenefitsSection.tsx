import { Clock, MapPin, Sparkles, Shield, Wrench, Briefcase, ArrowRight } from "lucide-react";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import benefitImg from "@/assets/gallery-5.jpg";

const BOOKING_URL = "https://xpressauto.fieldd.co/";

const benefits = [
  { icon: MapPin, title: "Unmatched Convenience", description: "We bring the detail shop to your location — driveway, office, or job site. No waiting rooms." },
  { icon: Clock, title: "Time-Saving", description: "Mobile detailing fits your schedule. Skip traffic, drop-offs, and pickups entirely." },
  { icon: Sparkles, title: "Premium Attention", description: "Unlike volume-driven shops, your vehicle gets 100% of our focus. Quality over quantity." },
  { icon: Shield, title: "Professional Results", description: "Same high-end tools and techniques as luxury shops — with more care and precision." },
  { icon: Wrench, title: "Expert Team", description: "Certified, insured professionals with professional-grade equipment at every appointment." },
  { icon: Briefcase, title: "Built for Busy Lives", description: "Busy parent, working professional, or fleet manager — mobile detailing is built for you." },
];

const BenefitsSection = () => {
  return (
    <section className="py-16 sm:py-20 bg-card">
      <div className="container">
        <ScrollReveal>
          <p className="text-center text-primary font-heading font-bold text-sm uppercase tracking-[0.2em] mb-2">
            Why Mobile?
          </p>
          <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase text-center text-foreground mb-10 md:mb-12 px-2">
            Benefits of <span className="text-gradient">Mobile Detailing</span>
          </h2>
        </ScrollReveal>
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8 mb-12 px-2 sm:px-0">
          <StaggerContainer className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5" staggerDelay={0.08}>
            {benefits.map((benefit) => (
              <StaggerItem key={benefit.title}>
                <div className="p-5 rounded-xl border border-border bg-background hover:border-primary/30 hover:shadow-md transition-all duration-300 group h-full">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <benefit.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-sm uppercase text-foreground mb-1.5">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <ScrollReveal direction="right" className="hidden lg:block">
            <img src={benefitImg} alt="Mobile detailing in action" className="rounded-xl shadow-lg w-full h-full object-cover" loading="lazy" />
          </ScrollReveal>
        </div>
        <ScrollReveal className="text-center">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-8 py-3.5 rounded-lg text-sm hover:bg-brand-blue-deep transition-all shadow-md hover:shadow-lg hover:shadow-primary/20"
          >
            Book Now — We Come to You
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default BenefitsSection;
