import { Clock, MapPin, Sparkles, Shield, Wrench, Briefcase } from "lucide-react";
import benefitImg from "@/assets/gallery-5.jpg";

const BOOKING_URL = "https://xpressauto.fieldd.co/";

const benefits = [
  {
    icon: MapPin,
    title: "Unmatched Convenience",
    description: "We bring the detail shop to your location — whether it's your driveway, office, or job site. No waiting rooms, no wasted time.",
  },
  {
    icon: Clock,
    title: "Time-Saving & Stress-Free",
    description: "Mobile detailing fits your schedule, not the other way around. Skip traffic, drop-offs, and pickups.",
  },
  {
    icon: Sparkles,
    title: "Premium, Personalized Attention",
    description: "Unlike volume-driven shops, mobile detailing is focused on quality over quantity. Your vehicle gets 100% of our attention.",
  },
  {
    icon: Shield,
    title: "Same Professional Results",
    description: "We use the same high-end tools, products, and techniques as luxury detailing shops — often with more care and precision.",
  },
  {
    icon: Wrench,
    title: "Expert Detailing Brought to You",
    description: "Our experienced team delivers expert mobile detailing services right to your doorstep with professional-grade equipment.",
  },
  {
    icon: Briefcase,
    title: "Perfect for Busy Lives & Fleets",
    description: "Whether you're a busy parent, working professional, or managing a fleet, mobile detailing is built for efficiency.",
  },
];

const BenefitsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <h2 className="font-heading font-black text-3xl md:text-4xl uppercase text-center text-foreground mb-12">
          Benefits of <span className="text-primary">Mobile Detailing</span>
        </h2>
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="p-6 rounded-lg border border-border hover:border-primary/50 transition-colors group"
              >
                <benefit.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-heading font-bold text-lg uppercase text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
          <div className="hidden lg:block">
            <img src={benefitImg} alt="Mobile detailing in action" className="rounded-lg shadow-xl w-full h-full object-cover" />
          </div>
        </div>
        <div className="text-center">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-8 py-3 rounded text-sm hover:bg-brand-blue-deep transition-colors"
          >
            Book Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
