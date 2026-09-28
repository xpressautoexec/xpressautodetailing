import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import brandAecon from "@/assets/brand-aecon.png";
import brandWoodsHomes from "@/assets/brand-woods-homes.png";
import brandTruman from "@/assets/brand-truman.png";
import brandKls from "@/assets/brand-kls.png";
import brandDirtt from "@/assets/brand-dirtt.png";
import brandShell from "@/assets/brand-shell.png";
import brandSilverhillAcura from "@/assets/brand-silverhill-acura.png";
import brandLandform from "@/assets/brand-landform.png";

const partners = [
  { name: "Aecon", logo: brandAecon },
  { name: "Wood's Homes", logo: brandWoodsHomes },
  { name: "Truman Homes", logo: brandTruman },
  { name: "KLS Earthworks", logo: brandKls },
  { name: "DIRTT", logo: brandDirtt },
  { name: "Shell", logo: brandShell },
  { name: "Silverhill Acura", logo: brandSilverhillAcura },
  { name: "Landform", logo: brandLandform },
  { name: "New West Truck Centres", logo: "" },
  { name: "Ranchman's", logo: "" },
];

const CompanyLogos = () => {
  return (
    <section className="py-14 sm:py-16 bg-background border-y border-border">
      <div className="container">
        <ScrollReveal>
          <p className="text-center text-muted-foreground font-heading text-xs uppercase tracking-widest mb-2">
            Trusted By
          </p>
          <h2 className="text-center font-heading font-black text-2xl md:text-3xl uppercase text-foreground mb-10">
            Companies We've <span className="text-primary">Worked With</span>
          </h2>
        </ScrollReveal>
        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-5xl mx-auto" staggerDelay={0.06}>
          {partners.map((partner) => (
            <StaggerItem key={partner.name} className="flex items-center justify-center">
              <div className="bg-card border border-border rounded-md px-4 py-5 w-full h-20 md:h-24 flex items-center justify-center transition-colors hover:border-primary/50">
                {partner.logo ? <img
                  src={partner.logo}
                  alt={`${partner.name} — commercial fleet detailing client of Xpress Auto Detailing`}
                  className="max-h-12 md:max-h-14 w-auto max-w-[80%] object-contain"
                /> : <span className="text-center font-heading text-sm text-foreground">{partner.name}</span>}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default CompanyLogos;
