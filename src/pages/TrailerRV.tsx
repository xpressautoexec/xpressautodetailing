import PageTransition from "@/components/PageTransition";
import RVPromoPopup from "@/components/RVPromoPopup";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceFAQ from "@/components/ServiceFAQ";
import TestimonialBlock from "@/components/TestimonialBlock";
import SEO, { buildServiceJsonLd, buildFAQJsonLd } from "@/components/SEO";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import rvHero from "@/assets/rv-hero.jpg";
import { Droplets, Shield, Sparkles, Truck, Clock, CheckCircle, Sun, Snowflake, Wrench, ArrowRight, Phone, MapPin, Zap, Award, CarFront, Container, Caravan, Star, Check } from "lucide-react";

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
    title: "Exterior Wash",
    price: "$9/ft",
    desc: "Full hand wash, black streak removal & tire shine",
    features: [
      "Full exterior hand wash with RV-safe soap",
      "Black streak removal from all sides",
      "Wheel, tire & fender cleaning",
      "Awning exterior rinse",
      "Rubber seal inspection & conditioning",
    ],
  },
  {
    title: "Ceramic Sealant",
    price: "$12/ft",
    desc: "Professional sealant for UV & oxidation defense",
    features: [
      "Professional-grade ceramic sealant application",
      "UV & oxidation defense for gelcoat/fiberglass",
      "Hydrophobic water-beading protection",
      "Decal-safe application technique",
      "Lasts 6–12 months depending on storage",
    ],
  },
  {
    title: "Wash & Seal",
    price: "$18/ft",
    badge: "Save 14%",
    desc: "Exterior wash + ceramic sealant in one visit",
    features: [
      "Full exterior wash included",
      "Black streak & road film removal",
      "Ceramic sealant on all panels",
      "Long-lasting UV & oxidation protection",
      "Rubber seals conditioned",
    ],
  },
  {
    title: "Paint Correction",
    price: "$29/ft",
    popular: true,
    desc: "Machine polish to restore original finish & colour",
    features: [
      "Full exterior wash included",
      "Machine cut & polish to restore finish",
      "Oxidation, chalking & scratch removal",
      "Faded gelcoat/fiberglass colour restoration",
      "Final inspection under work lighting",
    ],
  },
  {
    title: "Correction + Sealant",
    price: "$37/ft",
    badge: "Save 10%",
    desc: "Full correction + ceramic sealant for maximum value",
    features: [
      "Full paint correction included",
      "Ceramic sealant applied post-correction",
      "Maximum protection & restored gloss",
      "Decal edges carefully detailed",
      "Best value for total restoration",
    ],
  },
  {
    title: "Interior Detail",
    price: "$100/hr",
    desc: "Deep clean every surface — kitchen, bath & living area",
    features: [
      "Approx 1 hr per 10ft of RV length",
      "Full vacuum, wipe-down & surface shampoo",
      "Kitchen counters, sink & appliance cleaning",
      "Bathroom deep clean & sanitization",
      "Odor elimination treatment included",
    ],
  },
];

const rigTypes = [
  { icon: Caravan, label: "Travel Trailers" },
  { icon: Truck, label: "5th Wheels" },
  { icon: CarFront, label: "Class A/B/C Motorhomes" },
  { icon: CarFront, label: "Camper Vans" },
  { icon: Container, label: "Toy Haulers" },
  { icon: Truck, label: "Horse & Cargo Trailers" },
];

const TrailerRV = () => {
  return (
    <PageTransition><div className="min-h-screen">
      <SEO
         title="RV & Trailer Detailing Calgary — Mobile Service"
         description="Mobile RV & trailer detailing in Calgary. Travel trailers, motorhomes, 5th wheels & toy haulers. Exterior wash, ceramic sealant & interior detail. We come to you."
        canonical="/trailer-rv"
        jsonLd={[
          buildServiceJsonLd("Trailer & RV Detailing", "Professional mobile RV and trailer detailing in Calgary and surrounding areas.", "/trailer-rv"),
          buildFAQJsonLd(rvFAQs),
        ]}
      />
      <Navbar />

      {/* Premium Hero */}
      <section className="relative min-h-[520px] sm:min-h-[560px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${rvHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />

        <div className="relative z-10 container flex flex-col justify-end h-full min-h-[520px] sm:min-h-[560px] pb-12 sm:pb-16 pt-28 px-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-urgency/90 text-urgency-foreground font-heading font-bold text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
              <Zap className="w-3 h-3" />
              Limited Availability This Season
            </div>

            <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl uppercase text-background leading-[1.1] mb-4">
              Premium RV & Trailer<br />
              <span className="text-primary">Detailing Service</span>
            </h1>

            <p className="text-background/70 text-base sm:text-lg leading-relaxed mb-5 max-w-xl">
              Calgary's trusted mobile RV detailing — we come to your driveway, storage lot, or campground. Every type of rig, any size.
            </p>

            <div className="flex items-center gap-4 text-background/60 text-sm mb-8">
              <span className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              </span>
              <span>4.9/5</span>
              <span className="w-px h-4 bg-background/20" />
              <span>100+ 5-Star Reviews</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="tel:5875004523"
                className="group inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-7 py-4 rounded-xl text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/30"
              >
                <Phone className="w-4 h-4" />
                Call (587) 500-4523
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="tel:5875004523"
                className="inline-flex items-center justify-center gap-2 bg-background/10 backdrop-blur-sm border border-background/20 text-background font-heading font-bold uppercase tracking-wider px-7 py-4 rounded-xl text-sm hover:bg-background/20 transition-all"
              >
                Get a Free Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-card border-b border-border">
        <div className="container py-5 px-6">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-muted-foreground text-sm">
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary" /> RV-safe products only</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary" /> Per-foot transparent pricing</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary" /> We come to you — anywhere</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary" /> Satisfaction guaranteed</span>
          </div>
        </div>
      </section>

      {/* Intro — brief & executive */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="container max-w-3xl text-center px-6">
          <ScrollReveal>
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase text-foreground mb-6">
              Your RV Is a <span className="text-primary">Major Investment</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
              Regular detailing isn't just cosmetic — it protects gelcoat, prevents seal degradation, and preserves resale value. We bring our full mobile setup directly to your rig, wherever it's parked.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Rig Types — clean grid */}
      <section className="py-14 sm:py-16 bg-muted/30 border-y border-border">
        <div className="container max-w-4xl px-6">
          <ScrollReveal>
            <h2 className="font-heading font-black text-xl sm:text-2xl uppercase text-foreground text-center mb-10">
              We Detail Every Type of Rig
            </h2>
          </ScrollReveal>
          <StaggerContainer className="grid grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4" staggerDelay={0.06}>
            {rigTypes.map((item) => (
              <StaggerItem key={item.label}>
                <div className="flex flex-col items-center gap-2.5 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all">
                  <item.icon className="w-6 h-6 text-primary" />
                  <span className="font-heading font-bold text-foreground text-[10px] sm:text-xs uppercase tracking-wider text-center leading-tight">{item.label}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Video Showcase */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="container max-w-5xl px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-foreground text-center mb-10">
              See the <span className="text-primary">Results</span>
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-6">
            <ScrollReveal delay={0.1}>
              <div className="rounded-2xl overflow-hidden shadow-lg border border-border">
                <video className="w-full aspect-video object-cover" controls muted playsInline preload="metadata">
                  <source src="/videos/rv-video-1.mp4" type="video/mp4" />
                </video>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="rounded-2xl overflow-hidden shadow-lg border border-border">
                <video className="w-full aspect-video object-cover" controls muted playsInline preload="metadata">
                  <source src="/videos/rv-video-2.mp4" type="video/mp4" />
                </video>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Packages — clean executive cards */}
      <section className="py-16 sm:py-20 bg-foreground">
        <div className="container max-w-6xl px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase text-center text-background mb-3">
              RV Detailing Packages
            </h2>
            <p className="text-center text-background/50 text-sm mb-12 max-w-lg mx-auto">
              Simple per-foot pricing. No hidden fees. Call for a quote based on your rig's length.
            </p>
          </ScrollReveal>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5" staggerDelay={0.06}>
            {packages.map((pkg) => (
              <StaggerItem key={pkg.title}>
                <div className={`relative rounded-2xl h-full flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                  pkg.popular
                    ? "ring-2 ring-primary/40 shadow-xl"
                    : "border border-border hover:border-primary/30 hover:shadow-lg"
                }`}>
                  {/* Card header */}
                  <div className={`px-5 sm:px-6 pt-5 pb-4 ${pkg.popular ? "bg-primary" : "bg-card"}`}>
                    <div className="flex items-center gap-2 mb-2 min-h-[22px]">
                      {pkg.popular && (
                        <span className="bg-background text-foreground font-heading font-bold text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full">
                          Most Popular
                        </span>
                      )}
                      {pkg.badge && (
                        <span className="bg-success/15 text-success font-heading font-bold text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-success/25">
                          {pkg.badge}
                        </span>
                      )}
                    </div>
                    <h3 className={`font-heading font-black text-base sm:text-lg uppercase leading-tight ${
                      pkg.popular ? "text-primary-foreground" : "text-foreground"
                    }`}>{pkg.title}</h3>
                    <p className={`font-heading font-black text-3xl mt-1 ${
                      pkg.popular ? "text-primary-foreground" : "text-primary"
                    }`}>{pkg.price}</p>
                    <p className={`text-xs mt-1.5 ${
                      pkg.popular ? "text-primary-foreground/70" : "text-muted-foreground"
                    }`}>{pkg.desc}</p>
                  </div>

                  {/* Card body */}
                  <div className="px-5 sm:px-6 py-5 bg-card flex-1 flex flex-col">
                    <ul className="space-y-2 mb-5 flex-1">
                      {pkg.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/75">
                          <Check className="w-3.5 h-3.5 text-success shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="tel:5875004523"
                      className={`group flex items-center justify-center gap-2 font-heading font-bold uppercase tracking-wider px-5 py-3 rounded-xl text-sm transition-all duration-300 ${
                        pkg.popular
                          ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20"
                          : "border border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground"
                      }`}
                    >
                      <Phone className="w-3.5 h-3.5" />
                      Call for Quote
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Seasonal Prep — simplified */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="container max-w-4xl px-6">
          <ScrollReveal>
            <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-foreground text-center mb-10">
              Seasonal <span className="text-primary">RV Care</span>
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-5">
            <ScrollReveal delay={0.1}>
              <div className="p-6 rounded-2xl border border-border bg-card h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                    <Sun className="w-5 h-5 text-yellow-600" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground uppercase text-sm">Spring: Road-Ready</h3>
                </div>
                <ul className="space-y-2">
                  {["Remove winter mold & mildew", "Restore oxidized surfaces", "Condition rubber seals", "Full interior sanitization"].map((item) => (
                    <li key={item} className="text-muted-foreground text-sm flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-primary shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="p-6 rounded-2xl border border-border bg-card h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Snowflake className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground uppercase text-sm">Fall: Storage Prep</h3>
                </div>
                <ul className="space-y-2">
                  {["Remove road grime & bug residue", "Apply UV & oxidation protectant", "Deep clean to prevent mold", "Treat seals for freeze protection"].map((item) => (
                    <li key={item} className="text-muted-foreground text-sm flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-primary shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <TestimonialBlock testimonials={rvTestimonials} />
      <ServiceFAQ title="Trailer & RV Detailing FAQs" faqs={rvFAQs} />

      {/* Final CTA */}
      <section className="py-16 sm:py-20 bg-primary">
        <div className="container text-center px-6">
          <ScrollReveal>
            <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-primary-foreground mb-4">
              Ready to Get Your RV Road-Ready?
            </h2>
            <p className="text-primary-foreground/60 max-w-md mx-auto mb-8 text-sm sm:text-base">
              Call today for a free quote. Storage lots, driveways, campgrounds — we come to you.
            </p>
            <a
              href="tel:5875004523"
              className="group inline-flex items-center gap-2 bg-background text-foreground font-heading font-bold uppercase tracking-wider px-8 py-4 rounded-xl text-sm hover:bg-background/90 transition-all shadow-lg"
            >
              <Phone className="w-4 h-4" />
              Call (587) 500-4523
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
      <RVPromoPopup />
    </div></PageTransition>
  );
};

export default TrailerRV;
