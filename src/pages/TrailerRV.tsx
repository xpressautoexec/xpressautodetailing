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
import { Droplets, Shield, Sparkles, Truck, Clock, CheckCircle, Sun, Snowflake, Wrench, ArrowRight } from "lucide-react";

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
        title="RV & Trailer Detailing Calgary — Mobile Service"
        description="Mobile detailing for travel trailers, motorhomes, 5th wheels & toy haulers in Calgary. Spring prep, winter storage & full details. We come to you."
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
      <section className="py-16 sm:py-20 bg-background">
        <div className="container max-w-4xl text-center px-6">
          <ScrollReveal>
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase text-foreground mb-6">
              Your RV Is a <span className="text-primary">$50,000+ Investment</span> — Treat It Like One
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-5 text-sm sm:text-base">
              Most RV owners spend months researching the perfect rig, then let it sit in storage collecting oxidation, black streaks, and UV damage. Regular detailing isn't just cosmetic — it protects your gelcoat, prevents seal degradation, and preserves resale value.
            </p>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              We bring our full mobile setup directly to your RV — whether it's parked in your driveway, at a storage lot, or even at a campground. From compact camper vans to 40ft Class A motorhomes, no rig is too big or too small.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* What We Detail */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="container max-w-5xl px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-foreground text-center mb-12">
              We Detail <span className="text-primary">Every Type of Rig</span>
            </h2>
          </ScrollReveal>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6" staggerDelay={0.08}>
            {[
              { icon: Truck, label: "Travel Trailers" },
              { icon: Truck, label: "5th Wheels" },
              { icon: Truck, label: "Class A/B/C Motorhomes" },
              { icon: Truck, label: "Camper Vans" },
              { icon: Truck, label: "Toy Haulers" },
              { icon: Truck, label: "Horse & Cargo Trailers" },
            ].map((item) => (
              <StaggerItem key={item.label}>
                <div className="flex flex-col items-center gap-3 p-5 sm:p-6 rounded-xl border border-border bg-background text-center hover:border-primary/30 hover:shadow-md transition-all duration-300">
                  <item.icon className="w-10 h-10 text-primary" />
                  <span className="font-heading font-bold text-xs sm:text-sm uppercase text-foreground tracking-wider">{item.label}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Seasonal Prep */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="container max-w-5xl px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-foreground text-center mb-4">
              Seasonal <span className="text-primary">RV Care</span> Calendar
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto text-sm sm:text-base">
              Your RV faces different challenges each season. Here's when and why professional detailing matters most.
            </p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-6">
            <ScrollReveal delay={0.1}>
              <div className="p-6 rounded-xl border border-border bg-muted/20 hover:border-primary/30 transition-all duration-300 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <Sun className="w-8 h-8 text-primary" />
                  <h3 className="font-heading font-bold text-foreground uppercase text-sm">Spring: Road-Ready Prep</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                  After months in storage, your RV needs more than a hose-down. Winter moisture creates mold and mildew inside. Exterior surfaces develop oxidation and chalking. Rubber seals dry out and crack.
                </p>
                <ul className="space-y-1.5">
                  {["Remove winter mold & mildew", "Restore oxidized surfaces", "Condition rubber seals & gaskets", "Full interior sanitization"].map((item) => (
                    <li key={item} className="text-muted-foreground text-xs flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-primary shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="p-6 rounded-xl border border-border bg-muted/20 hover:border-primary/30 transition-all duration-300 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <Snowflake className="w-8 h-8 text-primary" />
                  <h3 className="font-heading font-bold text-foreground uppercase text-sm">Fall: Winter Storage Prep</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                  Putting your RV away dirty invites corrosion, staining, and pest infestations over the winter months. A thorough pre-storage detail protects your investment through the off-season.
                </p>
                <ul className="space-y-1.5">
                  {["Remove road grime & bug residue", "Apply UV & oxidation protectant", "Deep clean interior to prevent mold", "Treat seals to prevent freeze cracking"].map((item) => (
                    <li key={item} className="text-muted-foreground text-xs flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-primary shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="section-dark py-16 sm:py-20">
        <div className="container max-w-5xl">
          <ScrollReveal>
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase text-center mb-4">
              <span className="text-primary">RV Detailing</span> Packages
            </h2>
            <p className="text-primary-foreground/60 text-center mb-12 max-w-2xl mx-auto text-sm">
              Prices vary based on RV size and condition. Contact us for a custom quote tailored to your rig.
            </p>
          </ScrollReveal>
          <StaggerContainer className="grid md:grid-cols-3 gap-6 sm:gap-8" staggerDelay={0.1}>
            {packages.map((pkg) => (
              <StaggerItem key={pkg.title}>
                <div className={`rounded-xl p-6 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${pkg.popular ? "border-2 border-primary bg-brand-dark-surface ring-1 ring-primary/20" : "border border-brand-dark-surface bg-brand-dark-surface/50 hover:border-primary/30"}`}>
                  {pkg.popular && (
                    <span className="self-start bg-primary text-primary-foreground font-heading font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                      Most Popular
                    </span>
                  )}
                  <h3 className="font-heading font-bold text-lg sm:text-xl uppercase text-primary-foreground mb-1">{pkg.title}</h3>
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
                    className={`group flex items-center justify-center gap-2 font-heading font-bold uppercase tracking-wider px-6 py-3 rounded-lg text-sm transition-all duration-300 ${
                      pkg.popular
                        ? "bg-primary text-primary-foreground hover:bg-brand-blue-deep hover:shadow-lg"
                        : "border border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    }`}
                  >
                    Get a Quote
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Common RV Issues */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="container max-w-5xl px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-foreground text-center mb-4">
              Common RV Problems <span className="text-primary">We Solve</span>
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto text-sm sm:text-base">
              RVs face unique challenges that regular car washes can't handle. Here's what we specialize in.
            </p>
          </ScrollReveal>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" staggerDelay={0.08}>
            {[
              { icon: Droplets, title: "Black Streak Removal", desc: "Those ugly vertical streaks from roof runoff? We safely dissolve and remove them without damaging your finish or decals." },
              { icon: Sun, title: "Oxidation & Chalking", desc: "Faded, chalky fiberglass restored to its original color and protected against further UV degradation with professional sealants." },
              { icon: Shield, title: "Rubber Seal Conditioning", desc: "Dry, cracked seals lead to leaks and water damage. We clean and condition every seal to extend its lifespan." },
              { icon: Wrench, title: "Awning Cleaning & Treatment", desc: "Mold, mildew, and debris build up on awnings fast. We deep clean and treat them to prevent premature deterioration." },
              { icon: Sparkles, title: "Interior Mold & Mildew", desc: "Storage environments breed mold in cushions, cabinets, and carpets. Our deep clean eliminates it and prevents return." },
              { icon: Clock, title: "Pre-Sale Detailing", desc: "Selling your RV? A professional detail can add thousands to your asking price. First impressions matter — especially at this price point." },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <div className="p-5 sm:p-6 rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300 h-full">
                  <item.icon className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-heading font-bold text-foreground uppercase text-xs sm:text-sm mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Why Choose Us for RV */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="container max-w-5xl px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-foreground text-center mb-12">
              Why RV Owners Choose <span className="text-primary">Xpress</span>
            </h2>
          </ScrollReveal>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" staggerDelay={0.08}>
            {[
              { icon: Droplets, title: "RV-Safe Products", desc: "We use pH-balanced, RV-specific products safe for gelcoat, fiberglass, decals, and rubber seals — no shortcuts." },
              { icon: Shield, title: "UV & Oxidation Defense", desc: "Our sealants and ceramic coatings protect against Alberta's harsh UV and prevent the fading and chalking that ruins RV exteriors." },
              { icon: Truck, title: "Any Size, Any Location", desc: "From compact camper vans to 40ft Class A motorhomes — we bring our full equipment to your driveway, storage lot, or campground." },
              { icon: Clock, title: "Seasonal Prep Experts", desc: "Spring de-winterization and fall prep packages designed specifically for the Alberta RV season." },
              { icon: Sparkles, title: "Specialized Equipment", desc: "Extension poles, RV-height ladders, high-reach foam cannons — we have the tools that regular detailers don't." },
              { icon: CheckCircle, title: "Satisfaction Guaranteed", desc: "Not happy with the result? We'll redo it or refund you. We stand behind every detail, every time — no exceptions." },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <div className="p-5 sm:p-6 rounded-xl border border-border bg-background h-full hover:border-primary/30 hover:shadow-md transition-all duration-300">
                  <item.icon className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-heading font-bold text-foreground uppercase text-xs sm:text-sm mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <TestimonialBlock testimonials={rvTestimonials} />
      <ServiceFAQ title="Trailer & RV Detailing FAQs" faqs={rvFAQs} />

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-primary to-brand-blue-deep">
        <div className="container text-center">
          <ScrollReveal>
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase text-primary-foreground mb-4">
              Ready to Get Your RV Road-Ready?
            </h2>
            <p className="text-primary-foreground/70 max-w-lg mx-auto mb-4 text-sm sm:text-base">
              Book your trailer or RV detail today. We come to you — wherever your rig is parked. Storage lots, driveways, campgrounds — we've done them all.
            </p>
            <p className="text-primary-foreground/50 text-sm mb-8">
              ✓ RV-safe products only &nbsp; ✓ Any size rig &nbsp; ✓ Satisfaction guaranteed
            </p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary-foreground text-primary font-heading font-bold uppercase tracking-wider px-8 py-4 rounded-lg text-sm hover:bg-primary-foreground/90 transition-all hover:shadow-lg group"
            >
              Book My RV Detail
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
