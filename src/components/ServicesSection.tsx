import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import completeImg from "@/assets/gallery-range-rover-exterior.jpg";
import ceramicImg from "@/assets/gallery-21.jpg";
import fleetImg from "@/assets/fleet-kls-truck.jpg";
import rvImg from "@/assets/rv-hero.jpg";

const services = [
  { title: "Car detailing", body: "A proper reset for the inside, outside or both.", image: completeImg, link: "/detailing" },
  { title: "Paint & protection", body: "Correction, ceramic coatings and protective film.", image: ceramicImg, link: "/paint-ceramics" },
  { title: "RV & marine", body: "Specialist care for bigger adventures.", image: rvImg, link: "/trailer-rv" },
  { title: "Commercial fleets", body: "Dependable on-site care for working vehicles.", image: fleetImg, link: "/fleet" },
];

const ServicesSection = () => (
  <section id="services" className="bg-background py-16 sm:py-24">
    <div className="container px-5 sm:px-8">
      <div className="mb-9 max-w-2xl">
        <p className="mb-3 text-xs font-bold uppercase text-primary">Our services</p>
        <h2 className="font-heading text-2xl font-black uppercase leading-tight text-foreground sm:text-4xl">The right care for whatever you drive.</h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">From a weekday commute to a full fleet, our mobile team brings the work to you.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <Link to={service.link} key={service.title} className="group block overflow-hidden rounded-md border border-border bg-card transition-colors hover:border-primary focus-visible:outline-primary">
            <img src={service.image} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
            <div className="p-5">
              <h3 className="flex items-center justify-between gap-2 font-heading text-base font-bold text-foreground">{service.title}<ArrowUpRight className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" /></h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.body}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;