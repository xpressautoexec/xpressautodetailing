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
  { quote: "We bought a used 5th wheel and it was filthy — previous owners clearly neglected it. After one visit from Xpress, it looked and smelled like new. Worth every penny.", name: "Greg & Lisa T.", location: "Calgary NE", service: "Full Interior + Exterior" },
  { quote: "I run a small fleet of cargo trailers. Xpress handles all of them — always on time, always professional. My trailers look better than they did on the lot.", name: "Mark D.", location: "Chestermere", service: "Fleet Exterior Wash" },
  { quote: "Got the paint correction on our 2019 Jayco. The oxidation was terrible after two Alberta summers. They brought it back to the original colour. Absolutely stunned.", name: "Jennifer W.", location: "Calgary SW", service: "Paint Correction" },
];

const packages = [
  // Row 1: Exterior, Interior, Sealant, Decal Restoration
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
    title: "Interior Detail",
    price: "$12/ft",
    desc: "Deep clean every surface — kitchen, bath & living area",
    features: [
      "Full vacuum, wipe-down & surface shampoo",
      "Kitchen counters, sink & appliance cleaning",
      "Bathroom deep clean & sanitization",
      "Odor elimination treatment included",
      "All living area surfaces detailed",
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
    title: "Decal Restoration & UV Protectant",
    price: "$10/ft",
    desc: "Restore faded decals & protect all surfaces from UV damage",
    features: [
      "Faded decal colour restoration treatment",
      "UV protectant applied to all exterior decals & graphics",
      "Prevents future cracking, peeling & yellowing",
      "Gelcoat & fiberglass UV shield included",
      "Extends decal life by years",
    ],
  },
  // Row 2: Wash & Seal, Paint Correction, Correction + Sealant
  {
    title: "Wash & Seal",
    price: "$18/ft",
    originalPrice: "$21/ft",
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
    desc: "Machine polish to remove oxidation & restore original finish",
    features: [
      "Full exterior wash included",
      "Heavy oxidation & chalking removal",
      "Machine cut & polish to restore colour",
      "Faded gelcoat/fiberglass brought back to life",
      "Final inspection under work lighting",
    ],
  },
  {
    title: "Correction + Sealant",
    price: "$37/ft",
    originalPrice: "$41/ft",
    popular: true,
    badge: "Best Value",
    desc: "Full oxidation removal + ceramic sealant for maximum protection",
    features: [
      "Complete oxidation & chalk removal",
      "Machine polish to restore original finish",
      "Ceramic sealant applied post-correction",
      "Maximum UV & weather protection",
      "Best value for total restoration",
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

      {/* Intro — executive with stats */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="container max-w-5xl px-6">
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase text-foreground mb-6">
                  Your RV Is a <span className="text-primary">Major Investment</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed text-base sm:text-lg mb-4">
                  Regular detailing isn't just cosmetic — it protects gelcoat, prevents seal degradation, and preserves resale value. We bring our full mobile setup directly to your rig, wherever it's parked.
                </p>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  From compact camper vans to 40ft Class A motorhomes — we've seen and detailed it all. Our RV-specific products, extension equipment, and trained technicians deliver results that general detailers simply can't match.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { stat: "500+", label: "RVs & Trailers Detailed" },
                  { stat: "4.9/5", label: "Average Client Rating" },
                  { stat: "100%", label: "RV-Safe Products" },
                  { stat: "72hr", label: "Typical Booking Window" },
                ].map((item) => (
                  <div key={item.label} className="p-5 rounded-xl border border-border bg-card text-center">
                    <p className="font-heading font-black text-2xl text-primary">{item.stat}</p>
                    <p className="text-muted-foreground text-xs mt-1 font-medium">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
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
        <div className="container max-w-3xl px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-foreground text-center mb-10">
              See the <span className="text-primary">Results</span>
            </h2>
            <div className="rounded-2xl overflow-hidden shadow-xl border border-border">
              <video className="w-full aspect-video object-cover" controls muted playsInline preload="metadata">
                <source src="/videos/rv-video-1.mp4" type="video/mp4" />
              </video>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 sm:py-20 bg-muted/30 border-y border-border">
        <div className="container max-w-6xl px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase text-center text-foreground mb-3">
              RV Detailing <span className="text-primary">Packages</span>
            </h2>
            <p className="text-center text-muted-foreground text-sm mb-12 max-w-lg mx-auto">
              Simple per-foot pricing. No hidden fees. Call for a quote based on your rig's length.
            </p>
          </ScrollReveal>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" staggerDelay={0.06}>
            {packages.slice(0, 4).map((pkg) => (
              <StaggerItem key={pkg.title}>
                <div className={`relative rounded-xl h-full flex flex-col border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  pkg.popular
                    ? "border-primary bg-card shadow-lg shadow-primary/10"
                    : "border-border bg-card shadow-md hover:border-primary/40"
                }`}>
                  {(pkg.popular || pkg.badge) && (
                    <div className="absolute -top-3 left-5 z-10">
                      {pkg.popular ? (
                        <span className="bg-primary text-primary-foreground font-heading font-bold text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
                          Most Popular
                        </span>
                      ) : pkg.badge ? (
                        <span className="bg-success text-success-foreground font-heading font-bold text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
                          {pkg.badge}
                        </span>
                      ) : null}
                    </div>
                  )}
                  <div className="px-6 pt-8 pb-6 flex-1 flex flex-col">
                    <p className="font-heading font-bold text-[10px] uppercase tracking-widest text-muted-foreground/60 mb-1">{pkg.title}</p>
                     <p className="font-heading font-black text-3xl sm:text-4xl text-foreground leading-none mb-1.5">
                       {pkg.originalPrice && <span className="text-lg text-muted-foreground/50 line-through mr-2">{pkg.originalPrice}</span>}
                       {pkg.price}
                     </p>
                    <p className="text-muted-foreground text-xs leading-relaxed mb-5">{pkg.desc}</p>
                    <div className="h-px bg-border mb-5" />
                    <ul className="space-y-2.5 mb-6 flex-1">
                      {pkg.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/80">
                          <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />{f}
                        </li>
                      ))}
                    </ul>
                    <a href="tel:5875004523" className="group flex items-center justify-center gap-2 font-heading font-bold uppercase tracking-wider px-5 py-3.5 rounded-lg text-sm transition-all duration-300 bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20">
                      <Phone className="w-4 h-4" />Call for Quote<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5" staggerDelay={0.06}>
            {packages.slice(4).map((pkg) => (
              <StaggerItem key={pkg.title}>
                <div className={`relative rounded-xl h-full flex flex-col border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  pkg.popular
                    ? "border-primary bg-card shadow-lg shadow-primary/10"
                    : "border-border bg-card shadow-md hover:border-primary/40"
                }`}>
                  {(pkg.popular || pkg.badge) && (
                    <div className="absolute -top-3 left-5 z-10">
                      {pkg.popular ? (
                        <span className="bg-primary text-primary-foreground font-heading font-bold text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
                          Most Popular
                        </span>
                      ) : pkg.badge ? (
                        <span className="bg-success text-success-foreground font-heading font-bold text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
                          {pkg.badge}
                        </span>
                      ) : null}
                    </div>
                  )}
                  <div className="px-6 pt-8 pb-6 flex-1 flex flex-col">
                    <p className="font-heading font-bold text-[10px] uppercase tracking-widest text-muted-foreground/60 mb-1">{pkg.title}</p>
                     <p className="font-heading font-black text-3xl sm:text-4xl text-foreground leading-none mb-1.5">
                       {pkg.originalPrice && <span className="text-lg text-muted-foreground/50 line-through mr-2">{pkg.originalPrice}</span>}
                       {pkg.price}
                     </p>
                    <p className="text-muted-foreground text-xs leading-relaxed mb-5">{pkg.desc}</p>
                    <div className="h-px bg-border mb-5" />
                    <ul className="space-y-2.5 mb-6 flex-1">
                      {pkg.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/80">
                          <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />{f}
                        </li>
                      ))}
                    </ul>
                    <a href="tel:5875004523" className="group flex items-center justify-center gap-2 font-heading font-bold uppercase tracking-wider px-5 py-3.5 rounded-lg text-sm transition-all duration-300 bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20">
                      <Phone className="w-4 h-4" />Call for Quote<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Mid-page CTA */}
      <section className="py-10 sm:py-14 bg-primary">
        <div className="container text-center px-6">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 text-primary-foreground/80 font-heading font-bold text-sm uppercase tracking-wider mb-3">
              <Clock className="w-4 h-4" />
              Book Before the Season Rush
            </div>
            <h3 className="font-heading font-black text-xl sm:text-2xl uppercase text-primary-foreground mb-4">
              Spring Slots Are Filling Fast
            </h3>
            <p className="text-primary-foreground/60 max-w-lg mx-auto mb-6 text-sm">
              RV owners across Calgary are booking their spring details now. Don't wait until there's a 2-week backlog.
            </p>
            <a href="tel:5875004523" className="group inline-flex items-center gap-2 bg-background text-foreground font-heading font-bold uppercase tracking-wider px-8 py-3.5 rounded-xl text-sm hover:bg-background/90 transition-all shadow-lg">
              <Phone className="w-4 h-4" />
              Call for a Free Quote
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Common RV Problems */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="container max-w-5xl px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-foreground text-center mb-3">
              Common RV Problems <span className="text-primary">We Solve</span>
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto text-sm">
              RVs face unique challenges that regular car washes can't handle. Here's what we specialize in.
            </p>
          </ScrollReveal>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" staggerDelay={0.06}>
            {[
              { icon: Droplets, title: "Black Streak Removal", desc: "Those ugly vertical streaks from roof runoff? We safely dissolve and remove them without damaging your finish or decals." },
              { icon: Sun, title: "Oxidation & Chalking", desc: "Faded, chalky fiberglass restored to its original colour and protected against further UV degradation with professional sealants." },
              { icon: Shield, title: "Rubber Seal Conditioning", desc: "Dry, cracked seals lead to leaks and water damage. We clean and condition every seal to extend its lifespan." },
              { icon: Sparkles, title: "Interior Mold & Mildew", desc: "Storage environments breed mold in cushions, cabinets, and carpets. Our deep clean eliminates it and prevents return." },
              { icon: Wrench, title: "Awning Cleaning", desc: "Mold, mildew, and debris build up on awnings fast. We deep clean and treat them to prevent premature deterioration." },
              { icon: Clock, title: "Pre-Sale Prep", desc: "Selling your RV? A professional detail can add thousands to your asking price. First impressions matter at this price point." },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <div className="p-5 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all h-full">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground uppercase text-xs sm:text-sm mb-1.5">{item.title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-16 sm:py-20 bg-muted/30 border-y border-border">
        <div className="container max-w-4xl px-6">
          <ScrollReveal>
            <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-foreground text-center mb-12">
              Our <span className="text-primary">RV Detailing</span> Process
            </h2>
          </ScrollReveal>
          <div className="space-y-6">
            {[
              { step: "01", title: "Inspection & Quote", desc: "We assess your rig's size, condition, and specific needs. You get an honest quote upfront — no surprises." },
              { step: "02", title: "Pre-Wash & Decontamination", desc: "High-reach foam cannon covers the entire rig. Black streaks, bugs, and road film are broken down with RV-safe degreasers." },
              { step: "03", title: "Hand Wash & Detail", desc: "Every panel, compartment, and awning is hand-washed with pH-neutral soap using extension poles and RV-height ladders." },
              { step: "04", title: "Correction & Protection", desc: "Oxidation is machine-polished away. Ceramic sealant or wax is applied for months of UV and water protection." },
              { step: "05", title: "Interior Deep Clean", desc: "Full vacuum, shampoo, sanitize — kitchen, bathroom, sleeping areas, and all living surfaces are restored." },
              { step: "06", title: "Final Inspection", desc: "Walk-around with you to ensure every detail meets our standard. Not satisfied? We fix it on the spot." },
            ].map((item, i) => (
              <ScrollReveal key={item.step} delay={i * 0.08}>
                <div className="flex gap-5 items-start p-5 rounded-xl bg-card border border-border hover:border-primary/20 transition-all">
                  <span className="font-heading font-black text-2xl text-primary/30 shrink-0 w-10">{item.step}</span>
                  <div>
                    <h3 className="font-heading font-bold text-foreground uppercase text-sm mb-1">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
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

      {/* Why Choose Us */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="container max-w-5xl px-6">
          <ScrollReveal>
            <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-foreground text-center mb-10">
              Why RV Owners Choose <span className="text-primary">Xpress</span>
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Droplets, title: "RV-Safe Products", desc: "pH-balanced, RV-specific products safe for gelcoat, fiberglass, decals, and rubber seals." },
              { icon: Shield, title: "UV & Oxidation Defense", desc: "Ceramic sealants protect against Alberta's harsh UV that fades and chalks RV exteriors." },
              { icon: MapPin, title: "Any Size, Any Location", desc: "Driveway, storage lot, or campground — we bring full equipment to you, any rig size." },
              { icon: Clock, title: "Seasonal Prep Experts", desc: "Spring de-winterization and fall prep packages designed for the Alberta RV season." },
              { icon: Zap, title: "Specialized Equipment", desc: "Extension poles, RV-height ladders, and high-reach foam cannons that regular detailers lack." },
              { icon: Award, title: "Satisfaction Guaranteed", desc: "Not happy? We redo it or refund you. We stand behind every detail — no exceptions." },
            ].map((item) => (
              <ScrollReveal key={item.title}>
                <div className="flex gap-4 p-5 rounded-xl border border-border bg-card hover:border-primary/30 transition-all h-full">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-foreground text-sm uppercase mb-1">{item.title}</h3>
                    <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

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
