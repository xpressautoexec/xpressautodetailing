import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import brand3m from "@/assets/brand-3m.png";
import brandXpel from "@/assets/brand-xpel.png";
import brandGtechniq from "@/assets/brand-gtechniq.png";
import brandAecon from "@/assets/brand-aecon.png";
import brandWoodsHomes from "@/assets/brand-woods-homes.png";
import brandTruman from "@/assets/brand-truman.png";
import brandKls from "@/assets/brand-kls.png";
import brandDirtt from "@/assets/brand-dirtt.png";
import brandShell from "@/assets/brand-shell.png";
interface BrandItem {
  name: string;
  logo?: string;
}
const productBrands: BrandItem[] = [{
  name: "3M",
  logo: brand3m
}, {
  name: "Gyeon"
}, {
  name: "XPEL",
  logo: brandXpel
}, {
  name: "Chemical Guys"
}, {
  name: "Gtechniq",
  logo: brandGtechniq
}, {
  name: "Meguiar's"
}];
const clientPartners: BrandItem[] = [{
  name: "Aecon",
  logo: brandAecon
}, {
  name: "Wood's Homes",
  logo: brandWoodsHomes
}, {
  name: "Truman Homes",
  logo: brandTruman
}, {
  name: "KLS Earthworks",
  logo: brandKls
}, {
  name: "DIRTT",
  logo: brandDirtt
}, {
  name: "Shell",
  logo: brandShell
}];
const BrandCard = ({
  brand
}: {
  brand: BrandItem;
}) => <div className="bg-background border border-border rounded-lg px-4 py-5 w-full flex items-center justify-center hover:border-primary/40 transition-colors min-h-[72px]">
    {brand.logo ? <img src={brand.logo} alt={brand.name} className="h-8 md:h-10 w-auto object-contain max-w-full border-0" /> : <span className="font-heading font-black text-sm md:text-base uppercase tracking-wider text-foreground/70">
        {brand.name}
      </span>}
  </div>;
const BrandPartners = () => <section className="py-16 bg-muted/30 border-y border-border">
    <div className="container">
      <ScrollReveal>
        <p className="text-center text-muted-foreground font-heading text-xs uppercase tracking-widest mb-2">
          Products We Trust
        </p>
        <h2 className="text-center font-heading font-black text-2xl md:text-3xl uppercase text-foreground mb-10">
          Industry-Leading <span className="text-primary">Brands</span>
        </h2>
      </ScrollReveal>

      <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-6 mb-14" staggerDelay={0.06}>
        {productBrands.map(brand => <StaggerItem key={brand.name} className="flex items-center justify-center">
            <BrandCard brand={brand} />
          </StaggerItem>)}
      </StaggerContainer>

      <ScrollReveal>
        <p className="text-center text-muted-foreground font-heading text-xs uppercase tracking-widest mb-2">
          Trusted By
        </p>
        <h3 className="text-center font-heading font-bold text-lg uppercase text-foreground mb-8">
          Our Corporate & Fleet Partners
        </h3>
      </ScrollReveal>

      <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4" staggerDelay={0.06}>
        {clientPartners.map(partner => <StaggerItem key={partner.name} className="flex items-center justify-center">
            <BrandCard brand={partner} />
          </StaggerItem>)}
      </StaggerContainer>
    </div>
  </section>;
export default BrandPartners;