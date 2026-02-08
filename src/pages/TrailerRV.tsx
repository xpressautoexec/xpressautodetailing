import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import Footer from "@/components/Footer";
import ServicePageHero from "@/components/ServicePageHero";
import ServiceFAQ from "@/components/ServiceFAQ";
import TestimonialBlock from "@/components/TestimonialBlock";
import TrustStats from "@/components/TrustStats";
import PackageCard from "@/components/PackageCard";
import SEO, { buildServiceJsonLd, buildFAQJsonLd } from "@/components/SEO";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import rvHero from "@/assets/rv-hero.jpg";
import { Droplets, Shield, Sparkles, Truck, Clock, CheckCircle } from "lucide-react";

const BOOKING_URL = "https://xpressauto.fieldd.co/";

const rvFAQs = [
  { q: "How long does RV or trailer detailing take?", a: "Depending on size and condition, an exterior wash takes 2–3 hours. A full interior + exterior detail on a large RV can take 5–8 hours. We'll give you a time estimate before we start." },
  { q: "Do you detail 5th wheels and toy haulers?", a: "Yes! We detail all types — travel trailers, 5th wheels, toy haulers, Class A/B/C motorhomes, camper vans, and horse trailers. No RV is too big or too small." },
  { q: "Can you come to the RV storage lot?", a: "Absolutely. We regularly service RVs at storage facilities, campgrounds, and private driveways. As long as we have water access, we can work anywhere." },
  { q: "Do you offer pre-season and post-season packages?", a: "Yes! Our Spring Ready and Winter Prep packages are designed specifically for seasonal RV owners. Get your rig road-ready or properly stored with a thorough detail." },
  { q: "Can you remove black streaks from my trailer?", a: "Yes — black streaks are one of the most common issues we address. We use specialized RV-safe degreasers and techniques to remove them without damaging the finish." },
];

const rvTestimonials = [
  { quote: "Had our 30ft travel trailer detailed before a big family trip. It looked absolutely brand new — inside and out. The kids couldn't believe it was the same trailer!", name: "Dave & Karen M.", location: "Cochrane", service: "Full RV Detail" },
  { quote: "We store our motorhome over winter and always get it detailed in spring with Xpress. They come right to the storage lot. So convenient and always top quality.", name: "Ron P.", location: "Airdrie", service: "Spring Ready Package" },
  { quote: "Our horse trailer was in rough shape after a season of hauling. Xpress cleaned it inside and out — even got the stubborn stains out of the flooring. Incredible work.", name: "Sarah L.", location: "Okotoks", service: "Horse Trailer Detail" },
];

const packages = [
  {
    title: "Exterior Wash & Protect",
    price: "From $199",
    features: [
      "Full exterior hand wash & rinse",
      "Black streak removal",
      "Wheel & tire cleaning",
      "Awning cleaning",
      "UV protectant applied to all surfaces",
      "Window cleaning (exterior)",
    ],
  },
  {
    title: "Full Interior + Exterior",
    price: "From $399",
    popular: true,
    features: [
      "Everything in Exterior Wash & Protect",
      "Full interior vacuum & wipe-down",
      "Kitchen & bathroom deep clean",
      "Upholstery & carpet shampooing",
      "Dashboard & console conditioning",
      "Odor elimination treatment",
      "Window cleaning (interior & exterior)",
    ],
  },
  {
    title: "Ultimate RV Restoration",
    price: "From $699",
    features: [
      "Everything in Full Interior + Exterior",
      "Oxidation removal & polish",
      "Paint correction for gelcoat/fiberglass",
      "Ceramic sealant application",
      "Roof cleaning & treatment",
      "Engine/generator bay cleaning",
      "Rubber seal conditioning",
      "Full interior leather/vinyl conditioning",
    ],
  },
];

const TrailerRV = () => {
  return (
    <PageTransition><div className="min-h-screen">
      <SEO
        title="Trailer & RV Detailing Calgary"
        description="Professional mobile RV and trailer detailing in Calgary. Travel trailers, motorhomes, 5th wheels & more. We come to your location — book today."
        canonical="/trailer-rv"
        jsonLd={[
          buildServiceJsonLd("Trailer & RV Detailing", "Professional mobile RV and trailer detailing in Calgary and surrounding areas.", "/trailer-rv"),
          buildFAQJsonLd(rvFAQs),
        ]}
      />
      <Navbar />
      <ServicePageHero title="Trailer & RV Detailing in Calgary and Surrounding Areas" image={rvHero} />
      <TrustStats />

      {/* Intro */}
      <section className="py-16 bg-background">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="left">
            <div>
              <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-foreground mb-4">
                Your RV Deserves a <span className="text-primary">Deep Clean</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Whether you're prepping for your first trip of the season, coming home from a cross-country adventure, or just keeping your rig looking its best in storage — Xpress Auto Detailing has you covered. We bring our full mobile setup directly to your RV, trailer, or motorhome — wherever it's parked.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                From travel trailers and 5th wheels to Class A motorhomes and horse trailers, we have the equipment, products, and expertise to handle any size vehicle. Our RV-safe, pH-balanced products protect your gelcoat, fiberglass, and rubber seals while delivering a showroom-quality finish.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Don't trust your investment to a regular car wash. RVs and trailers require specialized knowledge and techniques — and that's exactly what we deliver.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <img src={rvHero} alt="Professional RV detailing in Calgary" className="rounded-lg shadow-xl w-full object-cover aspect-video" />
          </ScrollReveal>
        </div>
      </section>

      {/* What We Detail */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-5xl">
          <ScrollReveal>
            <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-foreground text-center mb-12">
              What We <span className="text-primary">Detail</span>
            </h2>
          </ScrollReveal>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-6" staggerDelay={0.08}>
            {[
              { icon: Truck, label: "Travel Trailers" },
              { icon: Truck, label: "5th Wheels" },
              { icon: Truck, label: "Class A/B/C Motorhomes" },
              { icon: Truck, label: "Camper Vans" },
              { icon: Truck, label: "Toy Haulers" },
              { icon: Truck, label: "Horse & Cargo Trailers" },
            ].map((item) => (
              <StaggerItem key={item.label}>
                <div className="flex flex-col items-center gap-3 p-6 rounded-lg border border-border bg-background text-center hover:border-primary/40 transition-colors">
                  <item.icon className="w-10 h-10 text-primary" />
                  <span className="font-heading font-bold text-sm uppercase text-foreground tracking-wider">{item.label}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Packages */}
      <section className="section-dark py-20">
        <div className="container max-w-5xl">
          <ScrollReveal>
            <h2 className="font-heading font-black text-3xl md:text-4xl uppercase text-center mb-4">
              <span className="text-primary">RV Detailing</span> Packages
            </h2>
            <p className="text-primary-foreground/80 text-center mb-12 max-w-2xl mx-auto">
              Prices vary based on RV size and condition. Contact us for a custom quote tailored to your rig.
            </p>
          </ScrollReveal>
          <StaggerContainer className="grid md:grid-cols-3 gap-8" staggerDelay={0.1}>
            {packages.map((pkg) => (
              <StaggerItem key={pkg.title}>
                <div className={`rounded-lg p-6 h-full flex flex-col ${pkg.popular ? "border-2 border-primary bg-brand-dark-surface" : "border border-brand-dark-surface bg-brand-dark-surface/50"}`}>
                  {pkg.popular && (
                    <span className="self-start bg-primary text-primary-foreground font-heading font-bold text-xs uppercase tracking-wider px-3 py-1 rounded mb-4">
                      Most Popular
                    </span>
                  )}
                  <h3 className="font-heading font-bold text-xl uppercase text-primary-foreground mb-1">{pkg.title}</h3>
                  <p className="font-heading font-bold text-primary text-lg mb-4">{pkg.price}</p>
                  <ul className="space-y-2 mb-6 flex-1">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex gap-2 text-primary-foreground/80 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block text-center font-heading font-bold uppercase tracking-wider px-6 py-3 rounded text-sm transition-colors ${
                      pkg.popular
                        ? "bg-primary text-primary-foreground hover:bg-brand-blue-deep"
                        : "border border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    }`}
                  >
                    Book Now
                  </a>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Why Choose Us for RV */}
      <section className="py-16 bg-background">
        <div className="container max-w-5xl">
          <ScrollReveal>
            <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-foreground text-center mb-12">
              Why Choose <span className="text-primary">Xpress</span> for Your RV?
            </h2>
          </ScrollReveal>
          <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.08}>
            {[
              { icon: Droplets, title: "RV-Safe Products", desc: "We use pH-balanced, RV-specific products that are safe for gelcoat, fiberglass, decals, and rubber seals." },
              { icon: Shield, title: "UV & Oxidation Protection", desc: "Our sealants and ceramic coatings protect against Alberta's harsh UV rays and prevent oxidation and fading." },
              { icon: Sparkles, title: "Black Streak Removal", desc: "We specialize in removing those stubborn black streaks that build up on RV exteriors — safely and effectively." },
              { icon: Truck, title: "Any Size, Any Location", desc: "From compact camper vans to 40ft Class A motorhomes, we bring our equipment to your driveway or storage lot." },
              { icon: Clock, title: "Seasonal Prep Experts", desc: "Spring de-winterization and fall prep packages designed to protect your investment year-round." },
              { icon: CheckCircle, title: "Satisfaction Guaranteed", desc: "Not happy? We'll redo it or refund you. We stand behind every detail, every time." },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <div className="p-6 rounded-lg border border-border h-full hover:border-primary/40 transition-colors">
                  <item.icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="font-heading font-bold text-foreground uppercase text-sm mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <BeforeAfterSlider />
      <TestimonialBlock testimonials={rvTestimonials} />
      <ServiceFAQ title="Trailer & RV Detailing FAQs" faqs={rvFAQs} />

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="container text-center">
          <ScrollReveal>
            <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-primary-foreground mb-4">
              Ready to Get Your RV Road-Ready?
            </h2>
            <p className="text-primary-foreground/80 max-w-lg mx-auto mb-6">
              Book your trailer or RV detail today. We come to you — wherever your rig is parked.
            </p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary-foreground text-primary font-heading font-bold uppercase tracking-wider px-8 py-3 rounded text-sm hover:bg-primary-foreground/90 transition-colors"
            >
              Book My RV Detail
            </a>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div></PageTransition>
  );
};

export default TrailerRV;
