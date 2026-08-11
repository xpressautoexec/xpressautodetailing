import PageTransition from "@/components/PageTransition";
import CeramicPromoPopup from "@/components/CeramicPromoPopup";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import ServicePageHero from "@/components/ServicePageHero";
import PackageCard from "@/components/PackageCard";
import ServiceFAQ from "@/components/ServiceFAQ";
import TestimonialBlock from "@/components/TestimonialBlock";
import TrustStats from "@/components/TrustStats";
import SEO, { buildServiceJsonLd, buildFAQJsonLd } from "@/components/SEO";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import ceramicHero from "@/assets/gallery-paint-reflection.jpg";
import paintImg from "@/assets/gallery-bmw-emblem.jpg";
import brandMenzerna from "@/assets/brand-menzerna.png";
import systemXLogo from "@/assets/systemx-logo.png";
import certSystemX from "@/assets/cert-systemx.png.asset.json";
import certGtechniq from "@/assets/cert-gtechniq.png.asset.json";
import certGyeon from "@/assets/cert-gyeon.png.asset.json";
import { ArrowRight, Droplets, Shield, Sun, Sparkles, Check, CheckCircle, Gem, Phone, Award, Beaker, Zap } from "lucide-react";

const BOOKING_URL = "https://xpressauto.fieldd.co/";

const ceramicFAQs = [
  { q: "How long does ceramic coating last?", a: "Our 1-Year Ceramic Spray Sealant lasts up to 12 months with proper care. The 4-Year Infused Ceramic Coating lasts 4+ years when maintained with recommended wash techniques. We'll provide aftercare instructions." },
  { q: "Is paint correction necessary before ceramic coating?", a: "Yes. Ceramic coating locks in whatever is on your paint — including swirl marks and scratches. That's why we always perform paint correction first, so the coating seals in a flawless finish." },
  { q: "Can ceramic coating be applied to a new car?", a: "Absolutely — and it's actually the ideal time. New paint is in its best condition, so applying ceramic coating preserves that factory finish for years. Many of our clients coat their vehicles within the first month of purchase." },
  { q: "Do I still need to wash my car after ceramic coating?", a: "Yes, but it's much easier. Dirt and grime slide off coated surfaces, so washes are faster and less frequent. We recommend a gentle hand wash every 2–3 weeks." },
  { q: "What's the difference between ceramic coating and wax?", a: "Wax is a temporary layer that lasts 1–3 months and offers mild protection. Ceramic coating is a semi-permanent chemical bond with your clear coat that provides years of UV, chemical, and scratch resistance with an unmatched gloss." },
  { q: "Can ceramic coating fix scratches?", a: "No — ceramic coating is a protective layer, not a corrective one. That's why our packages include paint correction before application. The correction removes defects, and the coating prevents new ones." },
];

const ceramicTestimonials = [
  { quote: "I almost spent $3,000 on a full respray for my black BMW. Got the 2-step correction + ceramic instead for a fraction of the cost. It looks better than the day I bought it. Water just sheets off.", name: "James K.", location: "Calgary", service: "2-Step Correction + Ceramic" },
  { quote: "Got my brand new Tesla Model 3 ceramic coated. It's been 6 months and it still looks like I just drove it off the lot. The water beading is insane.", name: "Alicia R.", location: "Calgary NW", service: "2-Step Correction + Ceramic" },
  { quote: "The 1-step enhancement brought my 2018 Camry back to life. The swirl marks are gone and the ceramic spray keeps it glossy between washes. Amazing value for the price.", name: "Nathan G.", location: "Chestermere", service: "1-Step Enhancement" },
  { quote: "I've had ceramic coatings done at shops before — but the quality and care here is on another level. They spent an hour just inspecting and prepping. That attention to detail makes the difference.", name: "Omar H.", location: "Airdrie", service: "2-Step Correction + Ceramic" },
];

const PaintCeramics = () => (
  <PageTransition><div className="min-h-screen">
    <SEO
      title="Ceramic Coating Calgary | System X 9-Year Graphene"
      description="Calgary's flagship ceramic coating & paint correction. System X 9-year graphene, Menzerna paint correction. 1, 5 & 9-year protection. Call for a custom quote."
      canonical="/paint-ceramics"
      jsonLd={[
        buildServiceJsonLd("Paint Correction & Ceramic Coating", "Professional paint correction and ceramic coating in Calgary.", "/paint-ceramics"),
        buildFAQJsonLd(ceramicFAQs),
      ]}
    />
    <Navbar />
    <AutoBreadcrumbs />

    {/* Premium Hero */}
    <section className="relative min-h-[600px] sm:min-h-[640px] overflow-hidden">
      <img
        src={ceramicHero}
        alt="Glossy black Porsche 911 with mirror ceramic-coated paint and water beading — paint correction & ceramic coating Calgary"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
        fetchPriority="high"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />

      <div className="relative z-10 container flex flex-col justify-end min-h-[600px] sm:min-h-[640px] pb-12 sm:pb-16 pt-28 px-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-primary/90 text-primary-foreground font-heading font-bold text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
            <Sparkles className="w-3 h-3" />
            System X Authorized Installer · Calgary
          </div>

          <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl uppercase text-background leading-[1.1] mb-4">
            Paint Correction &<br />
            <span className="text-primary">Ceramic Coating</span>
          </h1>

          <p className="text-background/75 text-base sm:text-lg leading-relaxed mb-5 max-w-xl">
            Mirror-finish paint correction with Menzerna compounds, sealed with up to a <strong className="text-background">9-year System X graphene</strong> ceramic coating. Calgary's flagship paint protection service.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-background/70 text-sm mb-7">
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-primary" /> Up to 9-Year Protection</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-primary" /> Menzerna Polishing</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-primary" /> Free In-Person Quote</span>
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
              href="#packages"
              className="inline-flex items-center justify-center gap-2 bg-background/10 backdrop-blur-sm border border-background/20 text-background font-heading font-bold uppercase tracking-wider px-7 py-4 rounded-xl text-sm hover:bg-background/20 transition-all"
            >
              View Packages
            </a>
          </div>
        </div>
      </div>
    </section>
    <TrustStats />

    {/* Certified Installer Strip */}
    <section className="py-8 sm:py-10 bg-background border-b border-border">
      <div className="container max-w-5xl px-6">
        <p className="text-center text-muted-foreground font-heading font-bold uppercase tracking-[0.2em] text-[10px] sm:text-xs mb-5">
          Certified Installers Of
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {[{ logo: certSystemX, name: "System X Ceramic" }, { logo: certGtechniq, name: "Gtechniq" }, { logo: certGyeon, name: "Gyeon" }].map(({ logo, name }, i) => (
            <div key={i} className="bg-white border border-border rounded-xl px-5 py-3 h-16 sm:h-20 flex items-center justify-center shadow-sm">
              <img src={logo.url} alt={`${name} certified ceramic coating installer — Xpress Auto Detailing Calgary`} className="max-h-10 sm:max-h-12 w-auto object-contain" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Packages — moved up so buyers see options quickly */}
    <section id="packages" className="py-16 sm:py-20 bg-background scroll-mt-24">
      <div className="container">
        <ScrollReveal>
          <p className="text-center text-primary font-heading font-bold uppercase tracking-[0.2em] text-xs mb-3">
            Standard Tiers · Fixed Pricing
          </p>
          <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase text-foreground text-center mb-4">
            Paint Correction & <span className="text-primary">Ceramic Packages</span>
          </h2>
          <p className="text-center text-muted-foreground text-sm max-w-2xl mx-auto mb-12">
            Two stepping-stone tiers into ceramic protection. For maximum longevity, upgrade to the flagship System X 9-year graphene coating below.
          </p>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto px-2 sm:px-0">
          <PackageCard
            icon={<Sparkles className="w-8 h-8" />}
            name="1-Step Enhancement + 1 Yr Ceramic"
            price="$474.99"
            tagline="Restore gloss, remove light swirls & add a full year of ceramic protection — ideal for daily drivers."
            ctaText="Call Now"
            ctaLink="tel:5875004523"
            features={[
              "Full paint decontamination (iron, tar, fallout)",
              "Clay bar treatment for glass-smooth surface",
              "1-step machine polish (removes 40–60% of swirls & scratches)",
              "1-year ceramic spray sealant (hydrophobic finish)",
              "Final paint inspection under LED lighting",
              "Aftercare guide provided",
            ]}
            addOns={[
              { name: "Wheel Ceramic Coating", price: "+$120/wheel" },
              { name: "All Glass Ceramic Coating", price: "+$230" },
              { name: "Ceramic Spray Sealant Upgrade", price: "+$110" },
            ]}
            surcharges={["Add $150 for SUVs/trucks", "Add $200 for 3-row SUVs/minivans"]}
          />
          <PackageCard
            icon={<Gem className="w-8 h-8" />}
            name="2-Step Correction + 5 Yr Ceramic"
            price="$849.99"
            tagline="Full paint correction for enthusiasts — removes 85–95% of defects with multi-year ceramic protection."
            ctaText="Call Now"
            ctaLink="tel:5875004523"
            features={[
              "Full paint decontamination (iron, tar, fallout)",
              "Clay bar treatment for glass-smooth surface",
              "2-step compound cut & fine polish (85–95% defect removal)",
              "4-year professional-grade infused ceramic coating",
              "LED inspection at every stage for quality control",
              "Paint depth readings taken before correction",
              "Aftercare kit & maintenance schedule included",
            ]}
            addOns={[
              { name: "Wheel Ceramic Coating", price: "+$120/wheel" },
              { name: "Interior Ceramic Coating (all trim)", price: "+$350" },
              { name: "All Glass Ceramic Coating", price: "+$230" },
            ]}
            surcharges={["Add $150 for SUVs/trucks", "Add $200 for 3-row SUVs/minivans"]}
            isPrimary
          />
        </div>
      </div>
    </section>


    {/* Premium: System X 9-Year Graphene Ceramic Coating */}
    <section className="relative py-20 sm:py-28 bg-foreground overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.18),transparent_60%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container relative z-10 px-6">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/15 border border-primary/30 text-primary font-heading font-bold text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
              <Sparkles className="w-3 h-3" />
              Flagship Protection · Custom Quote
            </div>
            <img
              src={systemXLogo}
              alt="System X Ceramic Protection — authorized installer"
              className="mx-auto h-16 sm:h-20 w-auto mb-6"
              style={{ filter: "invert(1) brightness(2)" }}
              loading="lazy"
            />
            <h2 className="font-heading font-black text-3xl sm:text-5xl uppercase text-background leading-[1.05] mb-4">
              <span className="text-primary">9-Year</span> Graphene-Infused<br />
              Ceramic Coating
            </h2>
            <p className="text-background/70 text-base sm:text-lg leading-relaxed">
              The longest-lasting, most hydrophobic ceramic coating on the market — engineered for daily drivers, weekend enthusiasts and exotics that face Alberta's brutal UV, chinooks, road salt and gravel.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-10 max-w-6xl mx-auto">
          {[
            {
              icon: Shield,
              title: "9-Year Manufacturer Warranty",
              desc: "Industry-leading protection backed by System X — the same coating trusted on luxury vehicles, yachts and aircraft worldwide.",
            },
            {
              icon: Zap,
              title: "Graphene-Infused Formula",
              desc: "Graphene additives reduce water spotting, increase scratch resistance and improve heat dissipation vs. standard SiO₂ coatings.",
            },
            {
              icon: Sun,
              title: "Stops UV Oxidation Cold",
              desc: "Locks in clear-coat clarity and gloss for nearly a decade — no more faded paint, dull finishes or chalky panels.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-background/5 backdrop-blur-sm border border-background/10 rounded-2xl p-6 hover:border-primary/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-black text-lg uppercase tracking-tight text-background mb-2">{title}</h3>
              <p className="text-background/65 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-background/5 backdrop-blur-sm border border-background/10 rounded-2xl p-6 sm:p-8 max-w-6xl mx-auto mb-10">
          <p className="text-[10px] font-heading font-bold uppercase tracking-widest text-primary mb-4 text-center">
            What's Included
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
            {[
              "Full exterior decontamination wash & clay bar",
              "Multi-stage paint correction with Menzerna compounds",
              "System X Graphene base coat (entire body)",
              "System X Top Coat for max hydrophobic gloss",
              "Wheel face, trim, glass & headlight ceramic protection",
              "9-year written manufacturer warranty",
              "Annual inspection & re-boost program",
              "Care kit with maintenance instructions",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2.5 text-sm text-background/85">
                <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-urgency/15 border border-urgency/30 text-urgency font-heading font-bold text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
            <Award className="w-3 h-3" />
            Pricing Tailored To Your Vehicle
          </div>
          <p className="text-background/70 text-sm sm:text-base leading-relaxed mb-6">
            Every vehicle is different — size, condition, paint hardness and correction needs all factor in. Call for a personalized assessment and a transparent quote.
          </p>
          <a
            href="tel:5875004523"
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground font-heading font-black uppercase tracking-wider px-8 py-4 sm:px-10 sm:py-5 rounded-xl text-base sm:text-lg hover:bg-brand-blue-deep transition-colors shadow-2xl shadow-primary/30"
          >
            <Phone className="w-5 h-5" />
            Call for Custom Quote
            <ArrowRight className="w-5 h-5" />
          </a>
          <p className="text-background/50 text-xs mt-4 uppercase tracking-wider font-semibold">
            587-500-4523 · Free in-person assessment
          </p>
        </div>
      </div>
    </section>

    {/* Menzerna - Polishing Compounds We Trust */}
    <section className="py-16 sm:py-20 bg-background border-y border-border">
      <div className="container max-w-6xl px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          <ScrollReveal direction="left">
            <div className="bg-white rounded-2xl border border-border shadow-sm p-8 sm:p-12 flex items-center justify-center">
              <img src={brandMenzerna} alt="Menzerna polishing compounds — German-engineered paint correction" className="max-h-32 sm:max-h-40 w-auto object-contain" />
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <p className="text-primary font-heading font-bold uppercase tracking-[0.2em] text-xs mb-3">
              Polishing Compounds We Trust
            </p>
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase text-foreground mb-5">
              Powered by <span className="text-primary">Menzerna</span> — German Precision Since 1888
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6 text-sm sm:text-base">
              Every paint correction we perform is done with Menzerna polishing compounds — the gold standard used by Porsche, Mercedes-Benz, BMW and Audi at the factory level. Over 130 years of German chemistry means cleaner cuts, deeper gloss and zero hologramming.
            </p>
            <ul className="space-y-3 mb-2">
              <li className="flex items-start gap-3 text-sm sm:text-base">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Award className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="text-foreground/80"><strong className="text-foreground">OEM-Approved</strong> — trusted by European luxury manufacturers</span>
              </li>
              <li className="flex items-start gap-3 text-sm sm:text-base">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Beaker className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="text-foreground/80"><strong className="text-foreground">Power Lock Particle Technology</strong> — removes defects without micro-marring</span>
              </li>
              <li className="flex items-start gap-3 text-sm sm:text-base">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="text-foreground/80"><strong className="text-foreground">Mirror-finish results</strong> — the deepest, most reflective gloss possible before coating</span>
              </li>
              <li className="flex items-start gap-3 text-sm sm:text-base">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Shield className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="text-foreground/80"><strong className="text-foreground">Body-shop safe</strong> — silicone-free, ceramic-coating compatible</span>
              </li>
            </ul>
          </ScrollReveal>
        </div>
      </div>
    </section>

    <section className="py-16 sm:py-20 bg-muted/30">
      <div className="container max-w-4xl px-4 sm:px-6">
        <ScrollReveal>
          <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-foreground text-center mb-4">
            Wax vs. Sealant vs. <span className="text-primary">Ceramic Coating</span>
          </h2>
          <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto text-sm sm:text-base">
            Not all protection is created equal. Here's how they stack up — and why ceramic coating is the clear winner for long-term value.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <div className="rounded-xl border border-border overflow-hidden bg-card">
            <div className="grid grid-cols-4 bg-muted/50 p-4">
              <span className="font-heading font-bold text-foreground text-xs sm:text-sm uppercase" />
              <span className="font-heading font-bold text-muted-foreground text-xs sm:text-sm uppercase text-center">Wax</span>
              <span className="font-heading font-bold text-muted-foreground text-xs sm:text-sm uppercase text-center">Sealant</span>
              <span className="font-heading font-bold text-primary text-xs sm:text-sm uppercase text-center">Ceramic</span>
            </div>
            {[
              ["Duration", "1–3 months", "4–6 months", "2–7 years"],
              ["UV Protection", "Minimal", "Moderate", "Maximum"],
              ["Scratch Resistance", "None", "Minimal", "9H hardness"],
              ["Hydrophobic", "Mild", "Good", "Extreme"],
              ["Chemical Resistance", "None", "Mild", "Full"],
              ["Gloss Level", "Warm glow", "Good shine", "Mirror finish"],
              ["Maintenance", "Monthly", "Quarterly", "Wash only"],
              ["Long-term Cost", "$$$", "$$", "$"],
            ].map(([label, wax, sealant, ceramic], i) => (
              <div key={i} className={`grid grid-cols-4 p-3 sm:p-4 ${i % 2 === 0 ? "bg-card" : "bg-muted/20"}`}>
                <span className="text-foreground text-xs sm:text-sm font-medium">{label}</span>
                <span className="text-muted-foreground text-xs sm:text-sm text-center">{wax}</span>
                <span className="text-muted-foreground text-xs sm:text-sm text-center">{sealant}</span>
                <span className="text-primary font-semibold text-xs sm:text-sm text-center">{ceramic}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>


    {/* Ceramic Add-Ons */}
    <section className="py-16 sm:py-20 bg-muted/30 border-y border-border">
      <div className="container max-w-4xl px-4 sm:px-6">
        <ScrollReveal>
          <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-foreground text-center mb-4">
            Ceramic <span className="text-primary">Add-Ons</span>
          </h2>
          <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto text-sm sm:text-base">
            Extend your ceramic protection to every surface. Available with any paint correction or ceramic package.
          </p>
        </ScrollReveal>
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" staggerDelay={0.08}>
          {[
            { icon: Shield, name: "Ceramic Spray Sealant Upgrade", price: "$110", desc: "Upgrade from standard wax to a ceramic spray sealant that lasts 3–6 months longer. Superior hydrophobic properties, UV protection, and deep gloss." },
            { icon: Shield, name: "Wheel Ceramic Coating", price: "$120/wheel", desc: "Protect your wheels with a ceramic coating that repels brake dust, road grime, and salt — making cleaning effortless and keeping them looking new." },
            { icon: Droplets, name: "All Glass Ceramic Coating", price: "$230", desc: "Long-lasting hydrophobic ceramic coating applied to all vehicle glass. Rain beads and flies off at highway speed, reducing the need for wipers and improving visibility." },
            { icon: Shield, name: "Interior Ceramic Coating", price: "$350", desc: "Full interior trim, plastics, and leather protection. Repels spills, blocks UV fading, and makes routine cleaning effortless across every interior surface." },
          ].map((item) => (
            <StaggerItem key={item.name}>
              <div className="p-6 rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <item.icon className="w-9 h-9 text-primary shrink-0" />
                  <span className="font-heading font-black text-primary text-lg">{item.price}</span>
                </div>
                <h3 className="font-heading font-bold text-foreground uppercase text-sm mb-2">{item.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">{item.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>



    {/* The Process — light cards */}
    <section className="py-16 sm:py-20 bg-background">
      <div className="container max-w-4xl px-4 sm:px-6">
        <ScrollReveal>
          <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-foreground text-center mb-4">Our Precision <span className="text-primary">5-Step Process</span></h2>
          <p className="text-center text-muted-foreground mb-12 text-sm sm:text-base">Preparation. Precision. Perfection.</p>
        </ScrollReveal>
        <div className="space-y-5">
          {[
            { step: "1", title: "Exterior Wash & Decontamination", desc: "Thorough two-bucket hand wash, iron remover, and clay bar treatment to eliminate all embedded contaminants from the paint surface." },
            { step: "2", title: "Paint Inspection Under Professional Lighting", desc: "Every panel inspected under high-intensity LED lights to map swirl marks, scratches, oxidation, and defects that need correction." },
            { step: "3", title: "Multi-Stage Paint Correction", desc: "Using professional-grade dual-action polishers with precision compounds, we systematically remove defects panel by panel until the surface is flawless." },
            { step: "4", title: "Surface Prep & Panel Wipe", desc: "IPA (isopropyl alcohol) panel wipe removes all polishing oils, ensuring the ceramic coating bonds directly to the clear coat at the molecular level." },
            { step: "5", title: "Ceramic Coating Application & Cure", desc: "Hand-applied in controlled sections using professional applicators. Each panel inspected for uniformity. The coating cures and hardens to form a permanent protective shield." },
          ].map((item, i) => (
            <ScrollReveal key={item.step} delay={i * 0.08}>
              <div className="flex gap-5 items-start p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <span className="font-heading font-bold text-primary-foreground text-sm">{item.step}</span>
                </div>
                <div>
                  <h4 className="font-heading font-bold uppercase text-sm mb-1 text-foreground">{item.title}</h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* Mid-page CTA */}
    <section className="py-10 sm:py-14 bg-primary">
      <div className="container text-center">
        <ScrollReveal>
          <p className="text-primary-foreground/80 font-heading uppercase tracking-wider text-sm mb-3">Premium Service — Limited Monthly Slots</p>
          <h3 className="font-heading font-black text-xl sm:text-2xl uppercase text-primary-foreground mb-4">
            Protect Your Investment Before It's Too Late
          </h3>
          <p className="text-primary-foreground/70 max-w-lg mx-auto mb-6 text-sm">
            Every day without protection, your paint accumulates more micro-damage from UV, salt, and road debris. Lock in that showroom finish now — spots fill up fast.
          </p>
          <a href="tel:5875004523" className="inline-flex items-center gap-2 bg-primary-foreground text-primary font-heading font-bold uppercase tracking-wider px-8 py-3.5 rounded-lg text-sm hover:bg-primary-foreground/90 transition-all group">
            <Phone className="w-4 h-4" />
            Call For a Custom Quote
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </ScrollReveal>
      </div>
    </section>


    <TestimonialBlock testimonials={ceramicTestimonials} />
    <ServiceFAQ title="Paint Correction & Ceramic Coating FAQs" faqs={ceramicFAQs} />

    {/* CTA */}
    <section className="py-16 sm:py-20 bg-gradient-to-br from-primary to-primary/80">
      <div className="container grid md:grid-cols-2 gap-8 md:gap-12 items-center px-4 sm:px-6">
        <ScrollReveal direction="left">
          <div className="text-center md:text-left">
            <h3 className="font-heading font-black text-2xl sm:text-3xl uppercase text-primary-foreground mb-4">Lock In Showroom-Level Protection</h3>
            <p className="text-primary-foreground/80 leading-relaxed mb-4 text-sm sm:text-base">
              Whether you just bought a new car or want to restore a daily driver, ceramic coating is the ultimate investment in your vehicle's future. One appointment. Years of protection.
            </p>
            <p className="text-primary-foreground/60 text-sm mb-8">
              ✓ System X authorized installer &nbsp; ✓ Up to 9-year protection &nbsp; ✓ Satisfaction guaranteed
            </p>
            <a href="tel:5875004523" className="inline-flex items-center gap-2 bg-primary-foreground text-primary font-heading font-bold uppercase tracking-wider px-8 py-4 rounded-lg text-sm hover:bg-primary-foreground/90 transition-all hover:shadow-lg group">
              <Phone className="w-4 h-4" />
              Call Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </ScrollReveal>
        <ScrollReveal direction="right">
          <img src={paintImg} alt="Close-up of mirror-finish paint after multi-stage paint correction in Calgary" className="rounded-xl shadow-2xl w-full object-cover aspect-video hover:scale-105 transition-transform duration-700" />
        </ScrollReveal>
      </div>
    </section>

    <Footer />
    <CeramicPromoPopup />
  </div></PageTransition>
);

export default PaintCeramics;
