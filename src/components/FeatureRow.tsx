import { BadgeCheck, Building2, ShieldCheck, Truck } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";

const features = [
  {
    icon: Truck,
    number: "01",
    title: "Fully Mobile",
    desc: "A self-sustaining detailing setup brought to your home, office or storage site.",
  },
  {
    icon: ShieldCheck,
    number: "02",
    title: "Premium Products",
    desc: "Professional systems from XPEL, System X, Gtechniq, 3M and P&S.",
  },
  {
    icon: Building2,
    number: "03",
    title: "RV, Truck & Fleet",
    desc: "The equipment and experience to handle oversized and commercial vehicles.",
  },
  {
    icon: BadgeCheck,
    number: "04",
    title: "Specialist Care",
    desc: "Detailing, paint correction and protection completed by one experienced team.",
  },
];

const FeatureRow = () => (
  <section className="relative overflow-hidden bg-foreground text-background border-y border-background/10">
    <div className="container py-12 sm:py-14 lg:py-16">
      <div className="grid lg:grid-cols-[0.8fr_2.2fr] gap-10 lg:gap-14 items-stretch">
        <div className="text-center lg:text-left flex flex-col justify-center lg:border-r lg:border-background/15 lg:pr-12">
          <p className="font-heading text-xs font-bold uppercase tracking-widest text-primary mb-3">Built for Alberta</p>
          <h2 className="font-heading text-2xl sm:text-3xl font-black uppercase leading-tight text-background">
            Professional care.<br className="hidden lg:block" /> Wherever you park.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-background/65 max-w-sm mx-auto lg:mx-0">
            One mobile team for personal vehicles, recreational units and working fleets.
          </p>
        </div>

        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0"
          staggerDelay={0.08}
        >
          {features.map((f) => (
            <StaggerItem
              key={f.title}
              className="group grid grid-cols-[3rem_1fr] gap-4 py-5 border-t border-background/15 text-left"
            >
              <div className="relative w-12 h-12 border border-primary/50 flex items-center justify-center transition-colors group-hover:bg-primary group-hover:border-primary">
                <f.icon className="w-5 h-5 text-primary transition-colors group-hover:text-primary-foreground" strokeWidth={1.8} />
                <span className="absolute -top-2 -right-1 bg-foreground px-1 font-heading text-[9px] font-bold text-background/45">
                  {f.number}
                </span>
              </div>
              <div>
                <h3 className="font-heading font-bold uppercase text-sm text-background mb-1.5">{f.title}</h3>
                <p className="text-sm text-background/60 leading-relaxed max-w-sm">{f.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  </section>
);

export default FeatureRow;
