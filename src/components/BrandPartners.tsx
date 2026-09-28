import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import brand3m from "@/assets/brand-3m.png";
import brandXpel from "@/assets/brand-xpel.png";
import brandGtechniq from "@/assets/brand-gtechniq.png";
import brandMenzerna from "@/assets/brand-menzerna.png";
import brandSystemX from "@/assets/systemx-logo.png";


interface BrandItem {
  name: string;
  logo?: string;
}

const productBrands: BrandItem[] = [
  { name: "3M", logo: brand3m },
  { name: "XPEL", logo: brandXpel },
  { name: "P&S" },
  { name: "Ducan" },
  { name: "System X", logo: brandSystemX },
  { name: "Menzerna", logo: brandMenzerna },
  { name: "Gtechniq", logo: brandGtechniq },
];

const BrandCard = ({ brand }: { brand: BrandItem }) => (
  <div className="bg-card border border-border rounded-md px-4 py-5 w-full h-20 md:h-24 flex items-center justify-center transition-colors hover:border-primary/50">
    {brand.logo ? (
      <img src={brand.logo} alt={`${brand.name} professional detailing products used by Xpress Auto Detailing`} className="max-h-12 md:max-h-14 w-auto max-w-[80%] object-contain border-0" />
    ) : (
      <span className="font-heading font-black text-sm md:text-base uppercase text-foreground/70">{brand.name}</span>
    )}
  </div>
);

const BrandPartners = () => (
  <section className="py-14 sm:py-16 bg-background border-y border-border">
    <div className="container">
      <ScrollReveal>
        <p className="text-center text-muted-foreground font-heading text-xs uppercase tracking-widest mb-2">
          Products We Trust
        </p>
        <h2 className="text-center font-heading font-black text-2xl md:text-3xl uppercase text-foreground mb-10">
          Industry-Leading <span className="text-gradient">Brands</span>
        </h2>
      </ScrollReveal>

      <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 sm:gap-5" staggerDelay={0.06}>
        {productBrands.map((brand) => (
          <StaggerItem key={brand.name} className="flex items-center justify-center">
            <BrandCard brand={brand} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  </section>
);

export default BrandPartners;
