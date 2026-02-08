const BOOKING_URL = "https://xpressauto.fieldd.co/";

const ServicePageHero = ({ title, image }: { title: string; image: string }) => (
  <a
    href={BOOKING_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="relative block h-[300px] overflow-hidden group cursor-pointer"
  >
    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url(${image})` }} />
    <div className="absolute inset-0 bg-brand-dark/60 group-hover:bg-brand-dark/50 transition-colors" />
    <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
      <h1 className="font-heading font-black text-3xl md:text-4xl lg:text-5xl uppercase text-primary-foreground text-center leading-tight">
        {title}
      </h1>
      <span className="mt-4 inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-6 py-3 rounded text-sm group-hover:bg-brand-blue-deep transition-colors">
        Book Now
      </span>
    </div>
  </a>
);

export default ServicePageHero;
