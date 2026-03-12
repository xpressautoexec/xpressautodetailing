import PageTransition from "@/components/PageTransition";
import RVPromoPopup from "@/components/RVPromoPopup";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicePageHero from "@/components/ServicePageHero";
import ServiceFAQ from "@/components/ServiceFAQ";
import TestimonialBlock from "@/components/TestimonialBlock";
import TrustStats from "@/components/TrustStats";
import SEO, { buildServiceJsonLd, buildFAQJsonLd } from "@/components/SEO";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import rvHero from "@/assets/rv-hero.jpg";
import { Droplets, Shield, Sparkles, Truck, Clock, CheckCircle, Sun, Snowflake, Wrench, ArrowRight, Phone, MapPin, Zap, Award, CarFront, Container, Caravan } from "lucide-react";



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
    features: [
      "Full exterior hand wash & rinse",
      "Black streak removal",
      "Wheel & tire cleaning",
      "Window cleaning (exterior)",
    ],
  },
  {
    title: "Ceramic Sealant",
    price: "$12/ft",
    features: [
      "Professional ceramic sealant application",
      "Superior wax alternative",
      "UV & oxidation defense",
      "Hydrophobic surface protection",
      "Enhanced gloss & shine",
    ],
  },
  {
    title: "Wash & Seal",
    price: "$18/ft",
    badge: "Save 14%",
    features: [
      "Everything in Exterior Wash",
      "Ceramic sealant application (wax alternative)",
      "UV protectant on all surfaces",
      "Long-lasting hydrophobic protection",
    ],
  },
  {
    title: "Paint Correction (Cut & Polish)",
    price: "$29/ft",
    popular: true,
    features: [
      "Includes full exterior wash",
      "Oxidation removal",
      "Cut & polish to restore finish",
      "Gelcoat/fiberglass correction",
      "Removes chalking & fading",
    ],
  },
  {
    title: "Correction + Sealant",
    price: "$37/ft",
    badge: "Save 10%",
    features: [
      "Full paint correction (cut & polish)",
      "Oxidation removal & restoration",
      "Ceramic sealant application",
      "Complete exterior wash included",
      "Ultimate protection & shine",
    ],
  },
  {
    title: "Interior Detail",
    price: "$100/hr",
    features: [
      "Typically 1 hour per 10ft of RV",
      "Full interior vacuum & wipe-down",
      "Kitchen & bathroom deep clean",
      "Upholstery & carpet shampooing",
      "Dashboard & console conditioning",
      "Odor elimination treatment",
      "Window cleaning (interior)",
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

const problems = [
  { icon: Droplets, title: "Black Streak Removal", desc: "Those ugly vertical streaks from roof runoff? We safely dissolve and remove them without damaging your finish or decals." },
  { icon: Sun, title: "Oxidation & Chalking", desc: "Faded, chalky fiberglass restored to its original color and protected against further UV degradation with professional sealants." },
  { icon: Shield, title: "Rubber Seal Conditioning", desc: "Dry, cracked seals lead to leaks and water damage. We clean and condition every seal to extend its lifespan." },
  { icon: Sparkles, title: "Interior Mold & Mildew", desc: "Storage environments breed mold in cushions, cabinets, and carpets. Our deep clean eliminates it and prevents return." },
  { icon: Wrench, title: "Awning Cleaning & Treatment", desc: "Mold, mildew, and debris build up on awnings fast. We deep clean and treat them to prevent premature deterioration." },
  { icon: Clock, title: "Pre-Sale Detailing", desc: "Selling your RV? A professional detail can add thousands to your asking price. First impressions matter — especially at this price point." },
];

const whyUs = [
  { icon: Droplets, title: "RV-Safe Products", desc: "We use pH-balanced, RV-specific products safe for gelcoat, fiberglass, decals, and rubber seals — no shortcuts." },
  { icon: Shield, title: "UV & Oxidation Defense", desc: "Our sealants and ceramic coatings protect against Alberta's harsh UV and prevent the fading and chalking that ruins RV exteriors." },
  { icon: MapPin, title: "Any Size, Any Location", desc: "From compact camper vans to 40ft Class A motorhomes — we bring our full equipment to your driveway, storage lot, or campground." },
  { icon: Clock, title: "Seasonal Prep Experts", desc: "Spring de-winterization and fall prep packages designed specifically for the Alberta RV season." },
  { icon: Zap, title: "Specialized Equipment", desc: "Extension poles, RV-height ladders, high-reach foam cannons — we have the tools that regular detailers don't." },
  { icon: Award, title: "Satisfaction Guaranteed", desc: "Not happy with the result? We'll redo it or refund you. We stand behind every detail, every time — no exceptions." },
];

const TrailerRV = () => {
  return (
    <PageTransition><div className="min-h-screen">
      <SEO
        title="RV & Trailer Detailing Calgary — Mobile Service"
        description="Mobile detailing for travel trailers, motorhomes, 5th wheels & toy haulers in Calgary. Spring prep, winter storage & full details. We come to you."
        canonical="/trailer-rv"
        jsonLd={[
          buildServiceJsonLd("Trailer & RV Detailing", "Professional mobile RV and trailer detailing in Calgary and surrounding areas.", "/trailer-rv"),
          buildFAQJsonLd(rvFAQs),
        ]}
      />
      <Navbar />
      <ServicePageHero title="Trailer & RV Detailing in Calgary and Surrounding Areas" image={rvHero} ctaType="call" />
      <TrustStats />

      {/* Intro — dramatic accent */}
      <section className="py-20 sm:py-28 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="container max-w-4xl text-center px-6 relative z-10">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-heading font-bold uppercase tracking-[0.15em] text-xs px-5 py-2 rounded-full mb-8 border border-primary/20">
              <Shield className="w-3.5 h-3.5" />
              Protect Your Investment
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl uppercase text-foreground mb-8 leading-tight">
              Your RV Is a <span className="text-gradient">$50,000+ Investment</span> — Treat It Like One
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-primary/40 mx-auto rounded-full mb-8" />
            <p className="text-muted-foreground leading-relaxed mb-5 text-base sm:text-lg max-w-3xl mx-auto">
              Most RV owners spend months researching the perfect rig, then let it sit in storage collecting oxidation, black streaks, and UV damage. Regular detailing isn't just cosmetic — it protects your gelcoat, prevents seal degradation, and preserves resale value.
            </p>
            <p className="text-muted-foreground leading-relaxed text-base sm:text-lg max-w-3xl mx-auto">
              We bring our full mobile setup directly to your RV — whether it's parked in your driveway, at a storage lot, or even at a campground. From compact camper vans to 40ft Class A motorhomes, no rig is too big or too small.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* What We Detail — premium cards with glow */}
      <section className="section-dark py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/8 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        </div>
        <div className="container max-w-5xl px-4 sm:px-6 relative z-10">
          <ScrollReveal>
            <p className="text-primary font-heading font-bold uppercase tracking-[0.2em] text-xs text-center mb-3">Full-Service Mobile Detailing</p>
            <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl uppercase text-center mb-14">
              We Detail <span className="text-primary">Every Type of Rig</span>
            </h2>
          </ScrollReveal>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5" staggerDelay={0.08}>
            {rigTypes.map((item) => (
              <StaggerItem key={item.label}>
                <div className="group relative flex flex-col items-center gap-4 p-6 sm:p-8 rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm text-center hover:border-primary/50 hover:bg-primary/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-500">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <span className="font-heading font-bold text-xs sm:text-sm uppercase tracking-wider">{item.label}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Seasonal Prep — side-by-side dramatic cards */}
      <section className="py-20 sm:py-28 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[150px] pointer-events-none" />
        <div className="container max-w-5xl px-4 sm:px-6 relative z-10">
          <ScrollReveal>
            <p className="text-primary font-heading font-bold uppercase tracking-[0.2em] text-xs text-center mb-3">Year-Round Protection</p>
            <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl uppercase text-foreground text-center mb-4">
              Seasonal <span className="text-gradient">RV Care</span> Calendar
            </h2>
            <p className="text-muted-foreground text-center mb-14 max-w-2xl mx-auto text-sm sm:text-base">
              Your RV faces different challenges each season. Here's when and why professional detailing matters most.
            </p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            <ScrollReveal delay={0.1}>
              <div className="relative group p-7 sm:p-8 rounded-2xl border border-border bg-gradient-to-br from-amber-50/50 to-background hover:border-primary/30 transition-all duration-500 h-full hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/5 rounded-full blur-[60px] pointer-events-none" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-amber-100 flex items-center justify-center mb-5">
                    <Sun className="w-7 h-7 text-amber-600" />
                  </div>
                  <h3 className="font-heading font-black text-foreground uppercase text-base sm:text-lg mb-2">Spring: Road-Ready Prep</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                    After months in storage, your RV needs more than a hose-down. Winter moisture creates mold and mildew inside. Exterior surfaces develop oxidation and chalking.
                  </p>
                  <ul className="space-y-2.5">
                    {["Remove winter mold & mildew", "Restore oxidized surfaces", "Condition rubber seals & gaskets", "Full interior sanitization"].map((item) => (
                      <li key={item} className="text-muted-foreground text-sm flex items-center gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <CheckCircle className="w-3 h-3 text-primary" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="relative group p-7 sm:p-8 rounded-2xl border border-border bg-gradient-to-br from-blue-50/50 to-background hover:border-primary/30 transition-all duration-500 h-full hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/5 rounded-full blur-[60px] pointer-events-none" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-5">
                    <Snowflake className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="font-heading font-black text-foreground uppercase text-base sm:text-lg mb-2">Fall: Winter Storage Prep</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                    Putting your RV away dirty invites corrosion, staining, and pest infestations over the winter months. A thorough pre-storage detail protects your investment.
                  </p>
                  <ul className="space-y-2.5">
                    {["Remove road grime & bug residue", "Apply UV & oxidation protectant", "Deep clean interior to prevent mold", "Treat seals to prevent freeze cracking"].map((item) => (
                      <li key={item} className="text-muted-foreground text-sm flex items-center gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <CheckCircle className="w-3 h-3 text-primary" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Packages — premium dark section */}
      <section className="section-dark py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/8 rounded-full blur-[120px]" />
        </div>
        <div className="container max-w-6xl relative z-10">
          <ScrollReveal>
            <p className="text-primary font-heading font-bold uppercase tracking-[0.2em] text-xs text-center mb-3">Transparent Per-Foot Pricing</p>
            <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl uppercase text-center mb-4">
              <span className="text-primary">RV Detailing</span> Packages
            </h2>
            <p className="text-primary-foreground/50 text-center mb-16 max-w-2xl mx-auto text-sm sm:text-base">
              Simple, honest pricing based on your rig's length. No hidden fees — what you see is what you pay.
            </p>
          </ScrollReveal>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6" staggerDelay={0.08}>
            {packages.map((pkg) => (
              <StaggerItem key={pkg.title}>
                <div className={`group relative rounded-2xl p-6 sm:p-7 h-full flex flex-col transition-all duration-500 hover:-translate-y-2 ${
                  pkg.popular
                    ? "border-2 border-primary bg-gradient-to-b from-primary/15 via-primary/5 to-brand-dark-surface ring-1 ring-primary/20 shadow-2xl shadow-primary/15"
                    : "border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm hover:border-primary/40 hover:bg-white/[0.06] hover:shadow-xl hover:shadow-primary/5"
                }`}>
                  {/* Popular glow */}
                  {pkg.popular && (
                    <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-primary/20 to-transparent pointer-events-none" />
                  )}
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Top badges */}
                    <div className="flex items-center gap-2 mb-4 min-h-[28px]">
                      {pkg.popular && (
                        <span className="bg-primary text-primary-foreground font-heading font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg shadow-primary/30">
                          Most Popular
                        </span>
                      )}
                      {pkg.badge && (
                        <span className="bg-green-500/15 text-green-400 font-heading font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full border border-green-500/25">
                          {pkg.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="font-heading font-bold text-base sm:text-lg uppercase text-primary-foreground/90 mb-3 leading-tight">{pkg.title}</h3>
                    <p className="font-heading font-black text-primary text-3xl sm:text-4xl mb-6">{pkg.price}</p>
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent mb-6" />
                    <ul className="space-y-3 mb-8 flex-1">
                      {pkg.features.map((f) => (
                        <li key={f} className="flex gap-2.5 text-primary-foreground/70 text-sm">
                          <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="tel:5875004523"
                      className={`group/btn flex items-center justify-center gap-2 font-heading font-bold uppercase tracking-wider px-6 py-4 rounded-xl text-sm transition-all duration-300 ${
                        pkg.popular
                          ? "bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02]"
                          : "border border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-lg hover:shadow-primary/20"
                      }`}
                    >
                      <Phone className="w-4 h-4" />
                      Call Now
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Common RV Issues — elevated cards with icon backgrounds */}
      <section className="py-20 sm:py-28 bg-background relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[150px] pointer-events-none" />
        <div className="container max-w-5xl px-4 sm:px-6 relative z-10">
          <ScrollReveal>
            <p className="text-primary font-heading font-bold uppercase tracking-[0.2em] text-xs text-center mb-3">Expert Solutions</p>
            <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl uppercase text-foreground text-center mb-4">
              Common RV Problems <span className="text-gradient">We Solve</span>
            </h2>
            <p className="text-muted-foreground text-center mb-14 max-w-2xl mx-auto text-sm sm:text-base">
              RVs face unique challenges that regular car washes can't handle. Here's what we specialize in.
            </p>
          </ScrollReveal>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6" staggerDelay={0.08}>
            {problems.map((item) => (
              <StaggerItem key={item.title}>
                <div className="group relative p-6 sm:p-7 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 h-full hover:-translate-y-1 overflow-hidden">
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/5 rounded-full blur-[40px] pointer-events-none group-hover:bg-primary/10 transition-colors duration-500" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 group-hover:scale-110 transition-all duration-500">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-heading font-bold text-foreground uppercase text-sm mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Why Choose Us — dark section for contrast */}
      <section className="section-dark py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-[120px]" />
        </div>
        <div className="container max-w-5xl px-4 sm:px-6 relative z-10">
          <ScrollReveal>
            <p className="text-primary font-heading font-bold uppercase tracking-[0.2em] text-xs text-center mb-3">The Xpress Difference</p>
            <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl uppercase text-center mb-14">
              Why RV Owners Choose <span className="text-primary">Xpress</span>
            </h2>
          </ScrollReveal>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6" staggerDelay={0.08}>
            {whyUs.map((item) => (
              <StaggerItem key={item.title}>
                <div className="group relative p-6 sm:p-7 rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm h-full hover:border-primary/40 hover:bg-white/[0.06] transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 overflow-hidden">
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/5 rounded-full blur-[40px] pointer-events-none group-hover:bg-primary/10 transition-colors duration-500" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-500">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-heading font-bold uppercase text-sm mb-2">{item.title}</h3>
                    <p className="text-sm leading-relaxed opacity-70">{item.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Video Showcase */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="container max-w-5xl px-4 sm:px-6">
          <ScrollReveal>
            <p className="text-primary font-heading font-bold uppercase tracking-[0.2em] text-xs text-center mb-3">See It In Action</p>
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase text-foreground text-center mb-10">
              RV Detailing <span className="text-primary">In Motion</span>
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

      <TestimonialBlock testimonials={rvTestimonials} />
      <ServiceFAQ title="Trailer & RV Detailing FAQs" faqs={rvFAQs} />

      {/* CTA — cinematic */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-brand-blue-deep to-brand-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(197_100%_55%/0.2),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(197_100%_35%/0.3),transparent_70%)]" />
        <div className="container text-center relative z-10">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 text-primary-foreground font-heading font-bold uppercase tracking-[0.15em] text-xs px-5 py-2 rounded-full mb-8 border border-primary-foreground/20 backdrop-blur-sm">
              <MapPin className="w-3.5 h-3.5" />
              We Come to You
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl uppercase text-primary-foreground mb-6 leading-tight">
              Ready to Get Your RV<br className="hidden sm:block" /> Road-Ready?
            </h2>
            <p className="text-primary-foreground/70 max-w-lg mx-auto mb-6 text-base sm:text-lg">
              Call today to schedule your trailer or RV detail. Storage lots, driveways, campgrounds — we've done them all.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-primary-foreground/60 text-sm mb-10">
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary-foreground/80" /> RV-safe products only</span>
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary-foreground/80" /> Any size rig</span>
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary-foreground/80" /> Satisfaction guaranteed</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:5875004523"
                className="inline-flex items-center gap-2.5 bg-primary-foreground text-primary font-heading font-bold uppercase tracking-wider px-8 py-4 rounded-xl text-sm hover:bg-primary-foreground/90 transition-all hover:shadow-2xl hover:shadow-primary-foreground/20 hover:scale-[1.02] group"
              >
                <Phone className="w-4 h-4" />
                Call (587) 500-4523
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="tel:5875004523"
                className="inline-flex items-center gap-2 border border-primary-foreground/30 text-primary-foreground font-heading font-bold uppercase tracking-wider px-8 py-4 rounded-xl text-sm hover:bg-primary-foreground/10 transition-all hover:border-primary-foreground/50 group backdrop-blur-sm"
              >
                <Phone className="w-4 h-4" />
                Call Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
      <RVPromoPopup />
    </div></PageTransition>
  );
};

export default TrailerRV;
