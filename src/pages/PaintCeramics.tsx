import PageTransition from "@/components/PageTransition";
import CeramicPromoPopup from "@/components/CeramicPromoPopup";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicePageHero from "@/components/ServicePageHero";
import PackageCard from "@/components/PackageCard";
import ServiceFAQ from "@/components/ServiceFAQ";
import TestimonialBlock from "@/components/TestimonialBlock";
import TrustStats from "@/components/TrustStats";
import SEO, { buildServiceJsonLd, buildFAQJsonLd } from "@/components/SEO";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import ceramicHero from "@/assets/gallery-28.jpg";
import paintImg from "@/assets/gallery-bmw-emblem.jpg";
import brandMenzerna from "@/assets/brand-menzerna.png";
import { ArrowRight, Droplets, Shield, Sun, Sparkles, Clock, DollarSign, Check, Gem, Phone, Award, Beaker } from "lucide-react";

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
      title="Ceramic Coating & Paint Correction Calgary"
      description="Professional ceramic coating and paint correction in Calgary. Remove swirls, scratches & oxidation. 1, 2 & 4-year protection packages. Call for a free quote."
      canonical="/paint-ceramics"
      jsonLd={[
        buildServiceJsonLd("Paint Correction & Ceramic Coating", "Professional paint correction and ceramic coating in Calgary.", "/paint-ceramics"),
        buildFAQJsonLd(ceramicFAQs),
      ]}
    />
    <Navbar />
    <ServicePageHero title="Paint Correction & Ceramic Coating Packages" image={ceramicHero} ctaType="call" />
    <TrustStats />

    {/* Intro */}
    <section className="py-16 sm:py-20 bg-background">
      <div className="container max-w-4xl text-center px-6">
        <ScrollReveal>
          <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase text-foreground mb-6">
            Your Paint Deserves <span className="text-primary">Permanent Protection</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-5 text-sm sm:text-base">
            Every time you drive through an automatic car wash, hundreds of micro-scratches are etched into your clear coat. Over time, swirl marks accumulate, oxidation sets in, and your paint loses the depth and brilliance it had when new.
          </p>
          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
            Paint correction removes those defects. Ceramic coating prevents them from coming back. Together, they're the most advanced form of automotive surface protection available today — and the best investment you can make in your vehicle's appearance and value.
          </p>
        </ScrollReveal>
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

    {/* Packages — light cards */}
    <section className="py-16 sm:py-20 bg-background">
      <div className="container">
        <ScrollReveal>
          <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase text-foreground text-center mb-4">
            Paint Correction & Ceramic Packages
          </h2>
          <p className="text-center text-muted-foreground font-heading text-sm uppercase tracking-widest mb-12">
            Correction first. Then permanent protection.
          </p>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto px-2 sm:px-0">
          <PackageCard
            icon={<Sparkles className="w-8 h-8" />}
            name="1-Step Enhancement + 1 Yr Ceramic"
            price="$549.99"
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
              { name: "Wheel Ceramic Coating", price: "+$80/wheel" },
              { name: "Windshield Ceramic Coating", price: "+$120" },
              { name: "Ceramic Spray Sealant Upgrade", price: "+$75" },
            ]}
            surcharges={["SUV & Truck: $599.99", "SUV 7-Seat: $699.99"]}
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
              { name: "Wheel Ceramic Coating", price: "+$80/wheel" },
              { name: "Interior Ceramic Coating (all trim)", price: "+$120" },
              { name: "Windshield Ceramic Coating", price: "+$120" },
            ]}
            surcharges={["SUV & Truck: $949.99", "SUV 7-Seat: $999.99"]}
            isPrimary
          />
        </div>
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
        <StaggerContainer className="grid sm:grid-cols-3 gap-5" staggerDelay={0.08}>
          {[
            { icon: Shield, name: "Ceramic Spray Sealant Upgrade", price: "$75", desc: "Upgrade from standard wax to a ceramic spray sealant that lasts 3–6 months longer. Superior hydrophobic properties, UV protection, and deep gloss." },
            { icon: Shield, name: "Wheel Ceramic Coating", price: "$80/wheel", desc: "Protect your wheels with a ceramic coating that repels brake dust, road grime, and salt — making cleaning effortless and keeping them looking new." },
            { icon: Droplets, name: "Windshield Ceramic Coating", price: "$120", desc: "Long-lasting hydrophobic ceramic coating for your windshield. Rain beads and flies off at highway speed, reducing the need for wipers and improving safety." },
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


    <section className="py-16 sm:py-20 bg-muted/30">
      <div className="container max-w-5xl px-4 sm:px-6">
        <ScrollReveal>
          <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-foreground text-center mb-4">
            Why Ceramic Coating Is the <span className="text-primary">Smartest Investment</span>
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto text-sm sm:text-base">
            Ceramic coating isn't just protection — it's a transformation that pays for itself over time.
          </p>
        </ScrollReveal>
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" staggerDelay={0.08}>
          {[
            { icon: Shield, title: "Multi-Year Protection", desc: "Defends against UV rays, bird droppings, bug splatter, tree sap, road salt, and chemical contaminants for up to 7 years." },
            { icon: Droplets, title: "Hydrophobic Barrier", desc: "Water, dirt, and grime slide right off, making washes faster, easier, and less frequent. Your car stays cleaner, longer." },
            { icon: Sparkles, title: "Unmatched Gloss", desc: "Amplifies depth, clarity, and shine with a mirror-like finish that turns heads in any parking lot." },
            { icon: DollarSign, title: "Higher Resale Value", desc: "Protected paint maintains its quality for years, making your vehicle more attractive and valuable when it's time to sell." },
            { icon: Clock, title: "No More Monthly Waxing", desc: "Say goodbye to wax appointments every few months. One coating lasts years, saving you hundreds in maintenance." },
            { icon: Sun, title: "Calgary Climate Defense", desc: "Specifically designed to handle extreme UV, chinook temperature swings, road salt, and gravel — everything Calgary throws at you." },
          ].map((item) => (
            <StaggerItem key={item.title}>
              <div className="p-5 sm:p-6 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all duration-300 h-full">
                <item.icon className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-heading font-bold text-foreground uppercase text-xs sm:text-sm mb-2">{item.title}</h4>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{item.desc}</p>
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

    {/* Who It's For */}
    <section className="py-16 sm:py-20 bg-muted/30">
      <div className="container max-w-4xl text-center px-6">
        <ScrollReveal>
          <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-foreground mb-8">
            Is Ceramic Coating <span className="text-primary">Right for You</span>?
          </h2>
        </ScrollReveal>
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4" staggerDelay={0.08}>
          {[
            { emoji: "🚗", text: "New car owners who want to preserve that factory finish from day one" },
            { emoji: "🖤", text: "Dark-colored vehicle owners tired of visible swirl marks and water spots" },
            { emoji: "📈", text: "Anyone planning to sell within 1–3 years who wants to maximize resale value" },
            { emoji: "🏔️", text: "Calgary drivers who need serious protection from salt, UV, and gravel" },
            { emoji: "⏰", text: "Busy professionals who want a low-maintenance, always-clean vehicle" },
            { emoji: "🏎️", text: "Car enthusiasts who demand nothing less than perfection" },
          ].map((item) => (
            <StaggerItem key={item.text}>
              <div className="flex items-center gap-3 p-4 rounded-lg border border-border bg-card text-left hover:border-primary/30 transition-colors">
                <span className="text-2xl shrink-0">{item.emoji}</span>
                <p className="text-muted-foreground text-sm leading-snug">{item.text}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
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
              ✓ Certified installers &nbsp; ✓ 4+ year protection &nbsp; ✓ Satisfaction guaranteed
            </p>
            <a href="tel:5875004523" className="inline-flex items-center gap-2 bg-primary-foreground text-primary font-heading font-bold uppercase tracking-wider px-8 py-4 rounded-lg text-sm hover:bg-primary-foreground/90 transition-all hover:shadow-lg group">
              <Phone className="w-4 h-4" />
              Call Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </ScrollReveal>
        <ScrollReveal direction="right">
          <img src={paintImg} alt="Paint correction result" className="rounded-xl shadow-2xl w-full object-cover aspect-video hover:scale-105 transition-transform duration-700" />
        </ScrollReveal>
      </div>
    </section>

    <Footer />
    <CeramicPromoPopup />
  </div></PageTransition>
);

export default PaintCeramics;
