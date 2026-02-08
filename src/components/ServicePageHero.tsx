import { ArrowRight } from "lucide-react";

const BOOKING_URL = "https://xpressauto.fieldd.co/";

const ServicePageHero = ({ title, image }: { title: string; image: string }) => (
  <a
    href={BOOKING_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="relative block h-[340px] sm:h-[400px] overflow-hidden group cursor-pointer"
  >
    <div
      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
      style={{ backgroundImage: `url(${image})` }}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/60 to-brand-dark/30" />

    <div className="relative z-10 h-full flex flex-col items-center justify-end pb-12 sm:pb-14 px-6">
      <h1 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase text-primary-foreground text-center leading-tight mb-6 max-w-4xl">
        {title}
      </h1>
      <span className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-8 py-3.5 rounded-lg text-sm group-hover:bg-brand-blue-deep transition-all duration-300 group-hover:gap-3 shadow-lg shadow-primary/30">
        Book Now
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </span>
    </div>
  </a>
);

export default ServicePageHero;
