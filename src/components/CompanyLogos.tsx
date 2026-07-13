import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import brandAecon from "@/assets/brand-aecon.png";
import brandWoodsHomes from "@/assets/brand-woods-homes.png";
import brandTruman from "@/assets/brand-truman.png";
import brandKls from "@/assets/brand-kls.png";
import brandDirtt from "@/assets/brand-dirtt.png";
import brandShell from "@/assets/brand-shell.png";
import brandSilverhillAcura from "@/assets/brand-silverhill-acura.png";
import brandLandform from "@/assets/brand-landform.png";
import brandNewWestTruck from "@/assets/brand-new-west-truck.png.asset.json";
import brandRanchmans from "@/assets/brand-ranchmans.png.asset.json";

const partners = [
  { name: "Aecon", logo: brandAecon },
  { name: "Wood's Homes", logo: brandWoodsHomes },
  { name: "Truman Homes", logo: brandTruman },
  { name: "KLS Earthworks", logo: brandKls },
  { name: "DIRTT", logo: brandDirtt },
  { name: "Shell", logo: brandShell },
  { name: "Silverhill Acura", logo: brandSilverhillAcura },
  { name: "Landform", logo: brandLandform },
  { name: "New West Truck Centres", logo: brandNewWestTruck.url },
  { name: "Ranchman's", logo: brandRanchmans.url },
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
              <div className="bg-white border-2 border-border rounded-xl px-6 py-6 w-full h-24 md:h-28 flex items-center justify-center shadow-sm hover:border-primary/50 hover:shadow-md transition-all duration-300">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-12 md:max-h-14 w-auto max-w-[80%] object-contain"
                />
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default CompanyLogos;
