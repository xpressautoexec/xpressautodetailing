import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";

const productBrands = [
  "3M", "Gyeon", "Chemical Guys", "Adam's Polishes", "Gtechniq", "Meguiar's",
];

const clientPartners = [
  "Shell", "Aecon", "Woods Homes", "Truman Homes", "KLS Earthworks", "DIRRT Environmental",
];

const BrandPartners = () => (
  <section className="py-16 bg-muted/30 border-y border-border">
    <div className="container">
      <ScrollReveal>
        <p className="text-center text-muted-foreground font-heading text-xs uppercase tracking-widest mb-2">
          Products We Trust
        </p>
        <h2 className="text-center font-heading font-black text-2xl md:text-3xl uppercase text-foreground mb-10">
          Industry-Leading <span className="text-primary">Brands</span>
        </h2>
      </ScrollReveal>

      <StaggerContainer className="grid grid-cols-3 md:grid-cols-6 gap-6 mb-14" staggerDelay={0.06}>
        {productBrands.map((brand) => (
          <StaggerItem key={brand} className="flex items-center justify-center">
            <div className="bg-background border border-border rounded-lg px-4 py-5 w-full flex items-center justify-center hover:border-primary/40 transition-colors">
              <span className="font-heading font-black text-sm md:text-base uppercase tracking-wider text-foreground/70">
                {brand}
              </span>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <ScrollReveal>
        <p className="text-center text-muted-foreground font-heading text-xs uppercase tracking-widest mb-2">
          Trusted By
        </p>
        <h3 className="text-center font-heading font-bold text-lg uppercase text-foreground mb-8">
          Our Corporate & Fleet Partners
        </h3>
      </ScrollReveal>

      <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4" staggerDelay={0.06}>
        {clientPartners.map((partner) => (
          <StaggerItem key={partner} className="flex items-center justify-center">
            <div className="bg-background border border-border rounded-lg px-4 py-4 w-full flex items-center justify-center hover:border-primary/40 transition-colors">
              <span className="font-heading font-bold text-xs md:text-sm uppercase tracking-wider text-foreground/60">
                {partner}
              </span>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  </section>
);

export default BrandPartners;
