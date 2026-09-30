import { Star, Car, Award, ThumbsUp } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";

const stats = [
  { icon: Star, value: "100+", label: "5-Star Reviews" },
  { icon: Car, value: "2,000+", label: "Cars Detailed" },
  { icon: Award, value: "5+", label: "Years Experience" },
  { icon: ThumbsUp, value: "100%", label: "Satisfaction Guarantee" },
];

const TrustStats = () => (
  <section className="py-10 bg-card border-y border-border">
    <div className="container">
      <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {stats.map((stat) => (
          <StaggerItem key={stat.label} className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
              <stat.icon className="w-6 h-6 text-primary" />
            </div>
            <span className="font-heading font-semibold text-2xl md:text-3xl text-foreground">{stat.value}</span>
            <span className="text-muted-foreground text-xs font-heading">{stat.label}</span>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  </section>
);

export default TrustStats;
