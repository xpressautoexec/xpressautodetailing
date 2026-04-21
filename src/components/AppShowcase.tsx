import { Zap, MapPin, Handshake, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import vanImage from "@/assets/xpress-van.png";

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
  <section className="relative py-20 sm:py-24 overflow-hidden bg-foreground">
    {/* Subtle pattern overlay */}
    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />

    {/* Faded van background accent */}
    <img
      src={vanImage}
      alt=""
      aria-hidden="true"
      className="absolute -left-20 bottom-0 w-[600px] opacity-[0.07] pointer-events-none hidden md:block"
    />

    <div className="container relative z-10">
      <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center px-2 sm:px-0">
        {/* Left — Why Choose */}
        <ScrollReveal direction="left">
          <div className="space-y-6">
            <p className="font-heading font-bold text-sm uppercase tracking-[0.2em] text-background/50">
              The Xpress Difference
            </p>
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase text-background leading-tight">
              Why Choose{" "}
              <span className="text-primary">Xpress</span>?
            </h2>
            <p className="text-background/70 text-base sm:text-lg leading-relaxed max-w-md">
              From certified professionals and eco-friendly products to our 100% satisfaction guarantee — discover what sets us apart.
            </p>

            <ul className="space-y-3 pt-2">
              {highlights.map((h) => (
                <li key={h} className="flex items-center gap-3 text-background/80">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm font-medium">{h}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/why-choose-us"
              className="inline-flex items-center gap-2 border-2 border-background/30 text-background font-heading font-bold uppercase tracking-wider px-8 py-3.5 rounded-lg text-sm hover:bg-background hover:text-foreground transition-all duration-300 group mt-2"
            >
              Learn More About Why Calgary Trusts Xpress
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Right — Value Props */}
        <ScrollReveal direction="right">
          <div className="space-y-8">
            <div>
              <h3 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase text-background mb-2">
                Xpress Isn't Just a Name
              </h3>
              <p className="font-heading font-bold text-xl uppercase text-background/40 tracking-wider">
                It's How We Move
              </p>
            </div>

            <StaggerContainer className="space-y-4" staggerDelay={0.12}>
              {features.map((f) => (
                <StaggerItem key={f.title}>
                  <div className="flex items-start gap-5 p-5 rounded-xl bg-background/[0.06] backdrop-blur-sm border border-background/10 hover:bg-background/[0.10] transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/30 transition-all duration-300">
                      <f.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-background uppercase tracking-wider text-sm mb-1">
                        {f.title}
                      </p>
                      <p className="text-background/50 text-sm leading-relaxed">
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
              className="group inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-8 py-3.5 rounded-lg text-sm hover:bg-brand-blue-deep transition-all duration-300 shadow-lg shadow-primary/30"
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
