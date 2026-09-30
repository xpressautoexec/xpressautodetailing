import { Monitor, ShieldCheck, MapPin, MessageSquare, ArrowRight } from "lucide-react";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";

const BOOKING_URL = "https://xpressauto.fieldd.co/";

const steps = [
  { icon: Monitor, step: "01", title: "Book Online in 60 Seconds", desc: "Pick your service, choose a time, confirm. Done." },
  { icon: MapPin, step: "02", title: "We Come to You", desc: "Home, office, or job site — on time, every time." },
  { icon: ShieldCheck, step: "03", title: "We Detail, You Relax", desc: "Professional results while you go about your day." },
  { icon: MessageSquare, step: "04", title: "Love It or It's Free", desc: "satisfaction guarantee. Not satisfied? We redo it — or refund." },
];

const HowItWorks = () => {
  return (
    <section className="py-16 sm:py-20 bg-card border-y border-border">
      <div className="container relative z-10">
        <ScrollReveal>
          
          <h2 className="text-center text-foreground font-heading font-semibold text-2xl sm:text-3xl md:text-4xl mb-12">
            Get Your Car Cleaned Without Lifting a Finger
          </h2>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-10 px-2 sm:px-0" staggerDelay={0.1}>
          {steps.map((step) => (
            <StaggerItem key={step.title} className="flex flex-col items-center text-center">
              <div className="relative bg-background rounded-xl p-5 sm:p-6 w-full h-full group hover:shadow-lg hover:border-primary/30 transition-all duration-300 flex flex-col items-center justify-center border border-border">
                <span className="font-heading font-semibold text-3xl sm:text-4xl text-primary/15 absolute top-3 right-4">{step.step}</span>
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-primary/20 transition-colors">
                  <step.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-[11px] sm:text-xs md:text-sm text-foreground leading-tight mb-1">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-[10px] sm:text-xs leading-snug hidden sm:block">{step.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <ScrollReveal className="text-center">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-bold px-8 py-3.5 rounded-lg text-sm hover:bg-brand-blue-deep transition-all shadow-md hover:shadow-lg hover:shadow-primary/20"
          >
            Book Now — It's Free to Cancel
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default HowItWorks;
