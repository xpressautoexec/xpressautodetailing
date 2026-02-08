import { Monitor, ShieldCheck, MapPin, MessageSquare } from "lucide-react";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";

const BOOKING_URL = "https://xpressauto.fieldd.co/";

const steps = [
  { icon: Monitor, title: "Book Online, Fast & Easy!" },
  { icon: MapPin, title: "We Come to You — On Time and Ready" },
  { icon: ShieldCheck, title: "Job Done Right or It's Free" },
  { icon: MessageSquare, title: "Give Us Your Feedback" },
];

const HowItWorks = () => {
  return (
    <section className="bg-primary py-16 relative overflow-hidden">
      {/* Diagonal top edge */}
      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" className="w-full" preserveAspectRatio="none">
          <polygon points="0,60 1440,0 1440,60" fill="hsl(197 100% 45%)" />
        </svg>
      </div>

      <div className="container relative z-10">
        <ScrollReveal>
          <p className="text-center text-primary-foreground font-heading font-bold uppercase tracking-wider mb-2 text-sm">
            Get your vehicle cleaned
          </p>
          <h2 className="text-center text-primary-foreground font-heading font-black text-3xl md:text-4xl uppercase mb-12">
            Without lifting a finger
          </h2>
        </ScrollReveal>

        {/* Chevron cards - matching reference design */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10" staggerDelay={0.1}>
          {steps.map((step) => (
            <StaggerItem key={step.title} className="flex flex-col items-center text-center">
              <div className="relative bg-primary-foreground/95 rounded-lg p-6 w-full group hover:bg-primary-foreground transition-colors">
                {/* Chevron arrow decoration */}
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 hidden md:block z-10">
                  <svg width="24" height="48" viewBox="0 0 24 48" fill="none">
                    <polygon points="0,0 24,24 0,48" fill="hsl(197 100% 50%)" opacity="0.6" />
                  </svg>
                </div>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-xs md:text-sm uppercase text-brand-dark tracking-wider leading-tight">
                  {step.title}
                </h3>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <ScrollReveal className="text-center">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary-foreground text-primary font-heading font-bold uppercase tracking-wider px-8 py-3 rounded text-sm hover:bg-primary-foreground/90 transition-colors"
          >
            Book Now
          </a>
        </ScrollReveal>
      </div>

      {/* Diagonal bottom edge */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" className="w-full" preserveAspectRatio="none">
          <polygon points="0,0 1440,0 0,60" fill="hsl(197 100% 45%)" />
        </svg>
      </div>
    </section>
  );
};

export default HowItWorks;
