import heroBg from "@/assets/hero-bg.jpg";

const BOOKING_URL = "https://xpressauto.fieldd.co/";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-brand-dark/70" />
      
      {/* Decorative blue chevron */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block">
        <svg viewBox="0 0 500 800" className="h-full w-full" preserveAspectRatio="none">
          <polygon points="200,0 500,0 500,800 200,800 350,400" fill="hsl(197 100% 50% / 0.15)" />
          <polygon points="250,0 500,0 500,800 250,800 400,400" fill="hsl(197 100% 50% / 0.08)" />
        </svg>
      </div>

      <div className="container relative z-10">
        <div className="max-w-2xl">
          <h1 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl uppercase leading-tight text-primary mb-2">
            The car wash that comes to you
          </h1>
          <h2 className="font-heading font-black text-2xl md:text-3xl lg:text-4xl uppercase text-primary-foreground mb-6">
            Serving Calgary & Surrounding Areas
          </h2>
          <p className="text-brand-gray text-lg mb-8 max-w-lg">
            We'll Make Your Car Look Brand-New Again, Wherever You Are
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-8 py-4 rounded hover:bg-brand-blue-deep transition-colors text-sm"
          >
            Schedule My Detail
          </a>
        </div>
      </div>

      {/* Bottom diagonal */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" className="w-full" preserveAspectRatio="none">
          <polygon points="0,80 1440,80 1440,0" fill="hsl(197 100% 50%)" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
