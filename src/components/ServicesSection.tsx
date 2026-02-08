import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import interiorImg from "@/assets/interior-detail.jpg";
import exteriorImg from "@/assets/exterior-detail.jpg";
import paintImg from "@/assets/paint-correction.jpg";
import completeImg from "@/assets/complete-hero.jpg";
import ceramicImg from "@/assets/ceramic-hero.jpg";
import fleetImg from "@/assets/fleet-hero.jpg";
import rvImg from "@/assets/rv-hero.jpg";

const BOOKING_URL = "https://xpressauto.fieldd.co/";

const services = [{
  title: "Complete Detailing",
  description: "Inside & out — a full refresh for your entire vehicle. Every surface. Every detail.",
  image: completeImg,
  link: "/complete-detailing",
  price: "From $249"
}, {
  title: "Ceramic Coating",
  description: "We use industry leading ceramic coating products for lasting protection and a shining finish!",
  image: ceramicImg,
  link: "/paint-ceramics",
  price: "From $499"
}, {
  title: "Trailer & RV",
  description: "Professional mobile detailing for travel trailers, motorhomes, 5th wheels & more. We come to your location.",
  image: rvImg,
  link: "/trailer-rv",
  price: "From $199"
}, {
  title: "Corporate & Fleet",
  description: "Reliable, on-site detailing for work trucks & company vehicles. Keep your fleet clean and professional.",
  image: fleetImg,
  link: "/corporate-fleet",
  price: "Custom Quote"
}];

const detailedServices = [{
  title: "Interior Detailing",
  description: "Your car's interior should feel as fresh and clean as the day you bought it. Our interior detailing service goes beyond the surface — we deep-clean every crevice, eliminate odours, remove stains, and restore your cabin to a like-new condition.",
  image: interiorImg,
  link: "/interior-detailing",
  price: "From $149"
}, {
  title: "Exterior Detailing",
  description: "Your vehicle's exterior is constantly exposed to dirt, grime, road salt, and harsh weather. Our exterior detailing service revives and protects your vehicle's outer surfaces with a meticulous multi-step process.",
  image: exteriorImg,
  link: "/exterior-detailing",
  price: "From $129"
}, {
  title: "Paint Correction",
  description: "Over time, your vehicle's paint can develop swirl marks, scratches, and oxidation. Paint correction is a meticulous polishing process that restores clarity, smoothness, and depth to your paint by permanently removing imperfections.",
  image: paintImg,
  link: "/paint-ceramics",
  price: "From $299"
}];

const ServicesSection = () => {
  return (
    <section id="services" className="section-dark py-16 sm:py-20">
      <div className="container">
        <ScrollReveal>
          <div className="text-center mb-12 md:mb-16 px-4">
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase mb-2">
              Discover Our <span className="text-primary">Services</span>
            </h2>
            <p className="font-heading font-bold text-lg sm:text-xl md:text-2xl uppercase text-primary-foreground/70">
              And Feel The Difference
            </p>
          </div>
        </ScrollReveal>

        {/* Service cards with price badges and hover lift */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16 md:mb-20 px-2 sm:px-0">
          {services.map(service => (
            <StaggerItem key={service.title}>
              <Link
                to={service.link}
                className="group block bg-brand-dark-surface rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 h-full border border-transparent hover:border-primary/30"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 to-transparent" />
                  {/* Price badge */}
                  <span className="absolute bottom-3 right-3 bg-primary text-primary-foreground font-heading font-bold text-xs uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-lg">
                    {service.price}
                  </span>
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="font-heading font-bold text-lg sm:text-xl uppercase text-primary-foreground mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-primary-foreground/70 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-primary font-heading font-bold text-sm uppercase tracking-wider group-hover:gap-3 transition-all">
                    Learn More
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
                  <h3 className="font-heading font-black text-xl sm:text-2xl md:text-3xl uppercase text-primary-foreground mb-4">
                    {service.title}
                  </h3>
                  <p className="text-primary-foreground/70 leading-relaxed mb-8 text-sm md:text-base">
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
                  <div className="relative rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full object-cover aspect-video group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
