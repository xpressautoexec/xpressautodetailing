import { Link } from "react-router-dom";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import interiorImg from "@/assets/interior-detail.jpg";
import exteriorImg from "@/assets/exterior-detail.jpg";
import paintImg from "@/assets/paint-correction.jpg";
import completeImg from "@/assets/complete-hero.jpg";
import ceramicImg from "@/assets/ceramic-hero.jpg";
import fleetImg from "@/assets/fleet-hero.jpg";
import rvImg from "@/assets/rv-hero.jpg";

const BOOKING_URL = "https://xpressauto.fieldd.co/";

const services = [
  { title: "Complete Detailing", description: "Inside & out — a full refresh for your entire vehicle. Every surface. Every detail.", image: completeImg, link: "/complete-detailing", price: "From $249" },
  { title: "Ceramic Coating", description: "We use industry leading ceramic coating products for lasting protection and a shining finish!", image: ceramicImg, link: "/paint-ceramics", price: "From $499" },
  { title: "Trailer & RV", description: "Professional mobile detailing for travel trailers, motorhomes, 5th wheels & more. We come to your location.", image: rvImg, link: "/trailer-rv", price: "From $199" },
  { title: "Corporate & Fleet", description: "Reliable, on-site detailing for work trucks & company vehicles. Keep your fleet clean and professional.", image: fleetImg, link: "/corporate-fleet", price: "Custom Quote" },
];

const detailedServices = [
  { title: "Interior Detailing", description: "Your car's interior should feel as fresh and clean as the day you bought it. Our interior detailing service goes beyond the surface — we deep-clean every crevice, eliminate odours, remove stains, and restore your cabin to a like-new condition.", image: interiorImg, link: "/interior-detailing", price: "From $149" },
  { title: "Exterior Detailing", description: "Your vehicle's exterior is constantly exposed to dirt, grime, road salt, and harsh weather. Our exterior detailing service revives and protects your vehicle's outer surfaces with a meticulous multi-step process.", image: exteriorImg, link: "/exterior-detailing", price: "From $129" },
  { title: "Paint Correction", description: "Over time, your vehicle's paint can develop swirl marks, scratches, and oxidation. Paint correction is a meticulous polishing process that restores clarity, smoothness, and depth to your paint by permanently removing imperfections.", image: paintImg, link: "/paint-ceramics", price: "From $299" },
];

const ServicesSection = () => {
  return (
    <section id="services" className="section-dark py-20">
      <div className="container">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-heading font-black text-3xl md:text-4xl uppercase mb-2">
              <span className="text-primary">XPRESS</span> Isn't Just a Name
            </h2>
            <p className="font-heading font-black text-2xl md:text-3xl uppercase text-primary-foreground">
              It's How We Move
            </p>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {services.map((service) => (
            <StaggerItem key={service.title}>
              <div className="group bg-brand-dark-surface rounded-lg overflow-hidden hover:ring-2 hover:ring-primary transition-all h-full">
                <div className="h-48 overflow-hidden">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-bold text-xl uppercase text-primary-foreground mb-1">{service.title}</h3>
                  <p className="font-heading font-bold text-primary text-sm mb-3">{service.price}</p>
                  <p className="text-primary-foreground/80 text-sm leading-relaxed mb-4">{service.description}</p>
                  <Link to={service.link} className="text-primary font-heading font-bold text-sm uppercase tracking-wider hover:text-brand-blue-glow transition-colors">Learn More →</Link>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="space-y-16">
          {detailedServices.map((service, i) => (
            <ScrollReveal key={service.title} direction={i % 2 === 0 ? "left" : "right"}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className={i % 2 === 1 ? "md:order-2" : ""}>
                  <h3 className="font-heading font-black text-2xl md:text-3xl uppercase text-primary-foreground mb-1">{service.title}</h3>
                  <p className="font-heading font-bold text-primary text-lg mb-4">{service.price}</p>
                  <p className="text-primary-foreground/80 leading-relaxed mb-6">{service.description}</p>
                  <div className="flex flex-wrap gap-4">
                    <Link to={service.link} className="inline-block bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-6 py-3 rounded text-sm hover:bg-brand-blue-deep transition-colors">View Packages</Link>
                    <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-block border-2 border-primary text-primary font-heading font-bold uppercase tracking-wider px-6 py-3 rounded text-sm hover:bg-primary hover:text-primary-foreground transition-colors">Book Now</a>
                  </div>
                </div>
                <div className={i % 2 === 1 ? "md:order-1" : ""}>
                  <img src={service.image} alt={service.title} className="rounded-lg w-full object-cover aspect-video shadow-xl" />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="text-center mt-16">
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-block bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-10 py-4 rounded text-sm hover:bg-brand-blue-deep transition-colors">Book Your Detail Now</a>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ServicesSection;
