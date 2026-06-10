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
import brandMenzerna from "@/assets/brand-menzerna.png";
import brandSilverhillAcura from "@/assets/brand-silverhill-acura.png";
import brandLandform from "@/assets/brand-landform.png";
import brandPs from "@/assets/brand-ps.png.asset.json";
import brandDucan from "@/assets/brand-ducan.jpg.asset.json";

interface BrandItem {
  name: string;
  logo?: string;
}

const productBrands: BrandItem[] = [
  { name: "3M", logo: brand3m },
  { name: "XPEL", logo: brandXpel },
  { name: "P&S", logo: brandPs.url },
  { name: "Ducan", logo: brandDucan.url },
  { name: "System X" },
  { name: "Menzerna", logo: brandMenzerna },
  { name: "Gtechniq", logo: brandGtechniq },
];


const clientPartners: BrandItem[] = [
  { name: "Aecon", logo: brandAecon },
  { name: "Wood's Homes", logo: brandWoodsHomes },
  { name: "Truman Homes", logo: brandTruman },
  { name: "KLS Earthworks", logo: brandKls },
  { name: "DIRTT", logo: brandDirtt },
  { name: "Shell", logo: brandShell },
  { name: "Silverhill Acura", logo: brandSilverhillAcura },
  { name: "Landform", logo: brandLandform },
];

const BrandCard = ({ brand }: { brand: BrandItem }) => (
  <div className="bg-white border-2 border-border rounded-xl px-6 py-6 w-full h-24 md:h-28 flex items-center justify-center shadow-sm hover:border-primary/50 hover:shadow-md transition-all duration-300">
    {brand.logo ? (
      <img src={brand.logo} alt={brand.name} className="max-h-12 md:max-h-14 w-auto max-w-[80%] object-contain border-0" />
    ) : (
      <span className="font-heading font-black text-sm md:text-base uppercase tracking-wider text-foreground/70">{brand.name}</span>
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

      <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 sm:gap-5 mb-14" staggerDelay={0.06}>
        {productBrands.map((brand) => (
          <StaggerItem key={brand.name} className="flex items-center justify-center">
            <BrandCard brand={brand} />
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

      <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-5xl mx-auto" staggerDelay={0.06}>
        {clientPartners.map((partner) => (
          <StaggerItem key={partner.name} className="flex items-center justify-center">
            <BrandCard brand={partner} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  </section>
);

export default BrandPartners;
