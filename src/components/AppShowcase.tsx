import { Zap, MapPin, Handshake, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";

const BOOKING_URL = "https://xpressauto.fieldd.co/";

const features = [
  {
    icon: Zap,
    title: "Book Instantly",
    desc: "No more quotes — pick a time, confirm, done.",
  },
  {
    icon: MapPin,
    title: "Skip the Carwash",
    desc: "We come to your home, office, or job site.",
  },
  {
    icon: Handshake,
    title: "Reliable Service",
    desc: "99.6% of bookings fulfilled — rain or shine.",
  },
];

const highlights = [
  "Certified & insured professionals",
  "Eco-friendly, pH-balanced products",
  "100% satisfaction guarantee",
];

const AppShowcase = () => (
  <section className="relative py-24 overflow-hidden">
    {/* Gradient background */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary via-brand-blue-deep to-brand-dark" />
    {/* Subtle pattern overlay */}
    <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />

    <div className="container relative z-10">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Left — Why Choose */}
        <ScrollReveal direction="left">
          <div className="space-y-6">
            <p className="font-heading font-bold text-sm uppercase tracking-[0.2em] text-primary-foreground/60">
              The Xpress Difference
            </p>
            <h2 className="font-heading font-black text-3xl md:text-4xl uppercase text-primary-foreground leading-tight">
              Why Choose{" "}
              <span className="relative inline-block">
                Xpress
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-primary-foreground/30 rounded-full" />
              </span>
              ?
            </h2>
            <p className="text-primary-foreground/80 text-lg leading-relaxed max-w-md">
              From certified professionals and eco-friendly products to our 100% satisfaction guarantee — discover what sets us apart.
            </p>

            <ul className="space-y-3 pt-2">
              {highlights.map((h) => (
                <li key={h} className="flex items-center gap-3 text-primary-foreground/90">
                  <CheckCircle2 className="w-5 h-5 text-primary-foreground/60 shrink-0" />
                  <span className="text-sm font-medium">{h}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/why-choose-us"
              className="inline-flex items-center gap-2 border-2 border-primary-foreground/80 text-primary-foreground font-heading font-bold uppercase tracking-wider px-8 py-3.5 rounded-lg text-sm hover:bg-primary-foreground hover:text-primary transition-all duration-300 group mt-2"
            >
              Learn More
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Right — Value Props */}
        <ScrollReveal direction="right">
          <div className="space-y-8">
            <div>
              <h3 className="font-heading font-black text-3xl md:text-4xl uppercase text-primary-foreground mb-2">
                Xpress Isn't Just a Name
              </h3>
              <p className="font-heading font-bold text-xl uppercase text-primary-foreground/50 tracking-wider">
                It's How We Move
              </p>
            </div>

            <StaggerContainer className="space-y-5" staggerDelay={0.12}>
              {features.map((f) => (
                <StaggerItem key={f.title}>
                  <div className="flex items-start gap-5 p-5 rounded-xl bg-primary-foreground/[0.07] backdrop-blur-sm border border-primary-foreground/10 hover:bg-primary-foreground/[0.12] transition-all duration-300 group">
                    <div className="w-14 h-14 rounded-xl bg-primary-foreground/10 flex items-center justify-center shrink-0 group-hover:bg-primary-foreground/20 group-hover:scale-110 transition-all duration-300">
                      <f.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-primary-foreground uppercase tracking-wider text-base mb-1">
                        {f.title}
                      </p>
                      <p className="text-primary-foreground/60 text-sm leading-relaxed">
                        {f.desc}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary-foreground text-primary font-heading font-bold uppercase tracking-wider px-8 py-3.5 rounded-lg text-sm hover:bg-primary-foreground/90 transition-all duration-300 shadow-lg shadow-black/20 group"
            >
              Book Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

export default AppShowcase;
