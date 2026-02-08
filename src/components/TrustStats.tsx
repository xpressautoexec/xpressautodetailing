import { Star, Car, Award, ThumbsUp } from "lucide-react";

const stats = [
  { icon: Star, value: "100+", label: "5-Star Reviews" },
  { icon: Car, value: "2,000+", label: "Cars Detailed" },
  { icon: Award, value: "5+", label: "Years Experience" },
  { icon: ThumbsUp, value: "100%", label: "Satisfaction Guarantee" },
];

const TrustStats = () => (
  <section className="py-12 bg-muted/50 border-y border-border">
    <div className="container">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center text-center">
            <stat.icon className="w-8 h-8 text-primary mb-2" />
            <span className="font-heading font-black text-3xl text-foreground">{stat.value}</span>
            <span className="text-muted-foreground text-sm font-heading uppercase tracking-wider">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustStats;
