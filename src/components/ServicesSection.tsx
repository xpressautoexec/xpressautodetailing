import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import interiorImg from "@/assets/gallery-range-rover-interior.jpg";
import paintImg from "@/assets/gallery-bmw-emblem.jpg";
import completeImg from "@/assets/gallery-range-rover-exterior.jpg";
import ceramicImg from "@/assets/gallery-bmw-emblem.jpg";
import fleetImg from "@/assets/gallery-23.jpg";
import rvImg from "@/assets/rv-hero.jpg";

const BOOKING_URL = "https://xpressauto.fieldd.co/";

const services = [
  {
    title: "Complete Detailing",
    description: "Inside & out — a full refresh for your entire vehicle. Our #1 most booked service.",
    image: completeImg,
    link: "/complete-detailing",
    price: "From $209",
    tag: "Most Popular",
  },
  {
    title: "Ceramic Coating",
    description: "Industry-leading ceramic products for lasting protection and showroom shine.",
    image: ceramicImg,
    link: "/paint-ceramics",
    price: "From $499",
  },
  {
    title: "Trailer & RV",
    description: "Professional mobile detailing for travel trailers, motorhomes, 5th wheels & more.",
    image: rvImg,
    link: "/trailer-rv",
    price: "From $199",
  },
  {
    title: "Corporate & Fleet",
    description: "Reliable, on-site detailing for work trucks & company vehicles.",
    image: fleetImg,
    link: "/corporate-fleet",
    price: "Custom Quote",
  },
];

const detailedServices = [
  {
    title: "Interior Detailing",
    description: "Deep-clean every crevice, eliminate odours, remove stains, and restore your cabin to a like-new condition. Your steering wheel has 4× more bacteria than a toilet seat — we fix that.",
    image: interiorImg,
    link: "/interior-detailing",
    price: "From $159",
  },
  {
    title: "Paint Correction",
    description: "Remove swirl marks, scratches, and oxidation with our meticulous multi-stage polishing process. Restore clarity and depth to your paint permanently.",
    image: paintImg,
    link: "/paint-ceramics",
    price: "From $299",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-16 sm:py-20 bg-background">
      <div className="container">
        <ScrollReveal>
          <div className="text-center mb-12 md:mb-16 px-4">
            <p className="text-primary font-heading font-bold text-sm uppercase tracking-[0.2em] mb-2">
              What We Do Best
            </p>
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase text-foreground mb-3">
              Our <span className="text-gradient">Services</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
              Every service includes our 14-day satisfaction guarantee, eco-friendly products, and fully insured professionals.
            </p>
          </div>
        </ScrollReveal>

        {/* Top services grid */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mb-16 md:mb-20 px-2 sm:px-0" staggerDelay={0.08}>
          {services.map((service) => (
            <StaggerItem key={service.title}>
              <Link
                to={service.link}
                className="group block bg-card rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl h-full border border-border hover:border-primary/30"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
                  {service.tag && (
                    <span className="absolute top-3 left-3 bg-urgency text-urgency-foreground font-heading font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full">
                      {service.tag}
                    </span>
                  )}
                  <span className="absolute bottom-3 right-3 bg-primary text-primary-foreground font-heading font-bold text-xs uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-lg">
                    {service.price}
                  </span>
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="font-heading font-bold text-lg uppercase text-foreground mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-primary font-heading font-bold text-sm uppercase tracking-wider group-hover:gap-3 transition-all">
                    View Packages
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Detailed service rows */}
        <div className="space-y-16 sm:space-y-20">
          {detailedServices.map((service, i) => (
            <ScrollReveal key={service.title} direction={i % 2 === 0 ? "left" : "right"}>
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center px-2 sm:px-0">
                <div className={`text-center md:text-left ${i % 2 === 1 ? "md:order-2" : ""}`}>
                  <span className="inline-block text-primary font-heading font-bold text-sm uppercase tracking-widest mb-2">
                    {service.price}
                  </span>
                  <h3 className="font-heading font-black text-xl sm:text-2xl md:text-3xl uppercase text-foreground mb-4">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-8 text-sm md:text-base">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    <Link
                      to={service.link}
                      className="group inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-6 py-3 rounded-lg text-sm hover:bg-brand-blue-deep transition-all hover:shadow-lg hover:shadow-primary/20"
                    >
                      View Packages
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <a
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block border-2 border-primary text-primary font-heading font-bold uppercase tracking-wider px-6 py-3 rounded-lg text-sm hover:bg-primary hover:text-primary-foreground transition-all"
                    >
                      Book Now
                    </a>
                  </div>
                </div>
                <div className={`${i % 2 === 1 ? "md:order-1" : ""} group`}>
                  <div className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full object-cover aspect-video group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="text-center mt-14 sm:mt-20">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-10 py-4 rounded-lg text-sm hover:bg-brand-blue-deep transition-all hover:shadow-xl hover:shadow-primary/20"
          >
            Book Your Detail Now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ServicesSection;
