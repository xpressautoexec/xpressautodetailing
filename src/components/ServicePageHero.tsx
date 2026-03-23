import { ArrowRight, Phone } from "lucide-react";

const BOOKING_URL = "https://xpressauto.fieldd.co/";

interface ServicePageHeroProps {
  title: string;
  image: string;
  ctaType?: "book" | "call";
}

const ServicePageHero = ({ title, image, ctaType = "book" }: ServicePageHeroProps) => {
  const isCall = ctaType === "call";
  const href = isCall ? "tel:5875004523" : BOOKING_URL;
  const label = isCall ? "Call Now" : "Book Now";

  return (
    <a
      href={href}
      {...(!isCall && { target: "_blank", rel: "noopener noreferrer" })}
      className="relative block h-[340px] sm:h-[400px] overflow-hidden group cursor-pointer"
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-foreground/20" />

      <div className="relative z-10 h-full flex flex-col items-center justify-end pb-12 sm:pb-14 px-6">
        <h1 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase text-background text-center leading-tight mb-6 max-w-4xl">
          {title}
        </h1>
        <span className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-8 py-3.5 rounded-lg text-sm group-hover:bg-brand-blue-deep transition-all duration-300 group-hover:gap-3 shadow-lg shadow-primary/30">
          {isCall && <Phone className="w-4 h-4" />}
          {label}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </a>
  );
};

export default ServicePageHero;
