import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicePageHero from "@/components/ServicePageHero";
import TrustStats from "@/components/TrustStats";
import SEO, { buildServiceJsonLd } from "@/components/SEO";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import galleryHero from "@/assets/gallery-hero.jpg";
import { Sparkles, Dog, Lightbulb, Wind, Car, Shield, Droplets, Wrench, ArrowRight } from "lucide-react";

const BOOKING_URL = "https://xpressauto.fieldd.co/";

const addOns = [
  {
    icon: Dog,
    name: "Pet Hair Removal",
    price: "$40",
    description:
      "Stubborn fur embedded in seats, carpets, and crevices? We use specialized tools and techniques to extract every last strand — leaving your interior completely fur-free.",
    bestWith: "Interior or Complete Detail",
  },
  {
    icon: Wind,
    name: "Ozone Odor Elimination",
    price: "$60",
    description:
      "Our ozone generator destroys odor-causing bacteria, mold, and smoke particles at the molecular level — not just masking smells, but eliminating them permanently.",
    bestWith: "Interior or Complete Detail",
  },
  {
    icon: Sparkles,
    name: "Leather Conditioning",
    price: "$30",
    description:
      "Keep your leather seats supple and crack-free. We clean, condition, and protect with premium pH-balanced products designed specifically for automotive leather.",
    bestWith: "Interior Detail",
  },
  {
    icon: Lightbulb,
    name: "Headlight Restoration",
    price: "$60",
    description:
      "Foggy, yellowed headlights reduce visibility and make your car look old. We wet-sand, polish, and seal them to restore crystal-clear clarity and improve nighttime safety.",
    bestWith: "Exterior or Complete Detail",
  },
  {
    icon: Car,
    name: "Engine Bay Detail",
    price: "$75",
    description:
      "A clean engine bay makes maintenance easier and impresses buyers. We degrease, pressure rinse, and dress all components for a like-new engine compartment.",
    bestWith: "Any Detail Package",
  },
  {
    icon: Wrench,
    name: "Trim Restoration",
    price: "$35",
    description:
      "Faded black trim makes even a clean car look neglected. We restore and protect exterior trim pieces back to their original rich, dark finish.",
    bestWith: "Exterior or Complete Detail",
  },
  {
    icon: Droplets,
    name: "Rain Repellent Coating",
    price: "$30",
    description:
      "Hydrophobic windshield coating that causes rain to bead and sheet off at speed. Dramatically improves visibility in wet conditions — especially during Calgary storms.",
    bestWith: "Exterior Detail",
  },
  {
    icon: Shield,
    name: "Ceramic Spray Sealant Upgrade",
    price: "$50",
    description:
      "Upgrade from standard wax to a ceramic spray sealant that lasts 3–6 months longer. Superior hydrophobic properties, UV protection, and an unmatched deep gloss.",
    bestWith: "Exterior or Complete Detail",
  },
  {
    icon: Sparkles,
    name: "Headliner Deep Clean",
    price: "$45",
    description:
      "Stained, sagging, or discolored headliner? We carefully deep-clean the fabric without damaging the adhesive, restoring it to a fresh, uniform finish.",
    bestWith: "Interior or Complete Detail",
  },
  {
    icon: Shield,
    name: "Wheel Ceramic Coating",
    price: "$80",
    description:
      "Protect your wheels with a ceramic coating that repels brake dust, road grime, and salt — making cleaning effortless and keeping them looking new for months.",
    bestWith: "Paint & Ceramic Package",
  },
  {
    icon: Droplets,
    name: "Windshield Ceramic Coating",
    price: "$50",
    description:
      "Long-lasting hydrophobic ceramic coating for your windshield. Rain beads and flies off at highway speed, reducing the need for wipers and improving safety.",
    bestWith: "Paint & Ceramic Package",
  },
];

const AddOns = () => (
  <PageTransition>
    <div className="min-h-screen">
      <SEO
        title="Add-On Detailing Services Calgary"
        description="Customize your detail with premium add-ons: pet hair removal, headlight restoration, engine bay cleaning, ceramic upgrades & more. Prices from $30."
        canonical="/add-ons"
        jsonLd={buildServiceJsonLd(
          "Add-On Detailing Services",
          "Premium add-on detailing services to customize your mobile car detail in Calgary.",
          "/add-ons"
        )}
      />
      <Navbar />
      <ServicePageHero
        title="Add-On Detailing Services"
        image={galleryHero}
      />
      <TrustStats />

      {/* Intro */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="container max-w-4xl text-center px-6">
          <ScrollReveal>
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase text-foreground mb-6">
              Enhance Your Detail With{" "}
              <span className="text-primary">Premium Add-Ons</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-5 text-sm sm:text-base">
              Take your detail to the next level with our specialized add-on
              services. Whether you're dealing with stubborn pet hair, foggy
              headlights, deep interior odours, or just want extra protection
              under the hood, our add-ons let you customize your service for
              exactly what your vehicle needs.
            </p>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              These upgrades are designed to target problem areas and enhance the
              overall results of your detail, giving your vehicle the extra
              attention it deserves.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Add-On Grid */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="container max-w-6xl px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-foreground text-center mb-4">
              Available <span className="text-primary">Add-Ons</span>
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto text-sm sm:text-base">
              Add any of these services to your detail package for a fully
              customized experience. Prices shown are per vehicle.
            </p>
          </ScrollReveal>
          <StaggerContainer
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
            staggerDelay={0.06}
          >
            {addOns.map((addon) => (
              <StaggerItem key={addon.name}>
                <div className="p-6 rounded-xl border border-border bg-background hover:border-primary/40 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <addon.icon className="w-9 h-9 text-primary shrink-0" />
                    <span className="font-heading font-black text-primary text-lg">
                      {addon.price}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-foreground uppercase text-sm mb-2">
                    {addon.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                    {addon.description}
                  </p>
                  <p className="text-xs text-muted-foreground/70 font-medium">
                    Best with:{" "}
                    <span className="text-primary">{addon.bestWith}</span>
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-primary to-brand-blue-deep">
        <div className="container text-center">
          <ScrollReveal>
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase text-primary-foreground mb-4">
              Ready to Customize Your Detail?
            </h2>
            <p className="text-primary-foreground/70 max-w-lg mx-auto mb-4 text-sm sm:text-base">
              Book any detailing package and add these upgrades during checkout
              — or mention them to your detailer on the day of service.
            </p>
            <p className="text-primary-foreground/50 text-sm mb-8">
              ✓ Available with any package &nbsp; ✓ No hidden fees &nbsp; ✓
              14-day guarantee
            </p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary-foreground text-primary font-heading font-bold uppercase tracking-wider px-8 py-4 rounded-lg text-sm hover:bg-primary-foreground/90 transition-all hover:shadow-lg group"
            >
              Book My Detail
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  </PageTransition>
);

export default AddOns;
