import { Baby, Leaf, ShieldCheck, Award, Droplets, CheckCircle } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import bbbLogo from "@/assets/bbb-logo.png";

const badges = [
  { icon: Baby, label: "Baby & Pet Safe" },
  { icon: Leaf, label: "Eco-Friendly Products" },
  { icon: ShieldCheck, label: "Fully Insured & Bonded" },
  { icon: Award, label: "Certified Technicians" },
  { icon: Droplets, label: "pH Balanced Chemicals" },
  { icon: CheckCircle, label: "Satisfaction Guaranteed" },
];

const TrustBadges = () => (
  <section className="py-10 bg-background border-b border-border">
    <div className="container">
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* BBB Badge - prominent */}
        <div className="shrink-0">
          <img src={bbbLogo} alt="BBB Accredited Business" className="h-16 md:h-20 w-auto object-contain" />
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-16 bg-border" />

        {/* Other badges */}
        <StaggerContainer className="grid grid-cols-3 md:grid-cols-6 gap-4 flex-1" staggerDelay={0.05}>
          {badges.map((badge) => (
            <StaggerItem key={badge.label} className="flex flex-col items-center text-center gap-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <badge.icon className="w-6 h-6 text-primary" />
              </div>
              <span className="font-heading font-bold text-[10px] md:text-xs uppercase tracking-wider text-foreground/70 leading-tight">
                {badge.label}
              </span>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  </section>
);

export default TrustBadges;
