import { Truck, Sparkles, Users, ThumbsUp } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";

const features = [
  {
    icon: Truck,
    title: "Mobile Service",
    desc: "We come to your home or office — fully self-contained van.",
  },
  {
    icon: Sparkles,
    title: "Premium Products",
    desc: "System X, Gtechniq, P&S and XPEL — professional grade only.",
  },
  {
    icon: Users,
    title: "Expert Detailers",
    desc: "Hands-on specialists in paint, coatings and interiors.",
  },
  {
    icon: ThumbsUp,
    title: "Satisfaction Focused",
    desc: "Not happy with a detail? Tell us and we'll make it right.",
  },
];

const FeatureRow = () => (
  <section className="relative bg-foreground py-12 sm:py-16">
    <div className="container">
      <div className="rounded-3xl bg-background shadow-xl px-6 py-10 sm:px-10 sm:py-12">
        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6"
          staggerDelay={0.08}
        >
          {features.map((f) => (
            <StaggerItem
              key={f.title}
              className="flex flex-col items-center text-center gap-3 px-2"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <f.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading font-bold uppercase tracking-wider text-sm text-foreground">
                {f.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-[15rem]">
                {f.desc}
              </p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  </section>
);

export default FeatureRow;
