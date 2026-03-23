import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicePageHero from "@/components/ServicePageHero";
import ServiceFAQ from "@/components/ServiceFAQ";
import TestimonialBlock from "@/components/TestimonialBlock";
import TrustStats from "@/components/TrustStats";
import SEO, { buildServiceJsonLd, buildFAQJsonLd } from "@/components/SEO";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import motorcycleHero from "@/assets/motorcycle-hero.jpg";
import motorcycleDetail from "@/assets/motorcycle-detail.jpg";
import {
  Shield, Sparkles, Droplets, Clock, CheckCircle, ArrowRight, Phone,
  Wrench, Sun, Gauge, Eye, Bike, CircleDot, Flame, Wind, MapPin, Award,
} from "lucide-react";



const faqs = [
  { q: "How long does a motorcycle detail take?", a: "A basic wash and protect takes about 1–1.5 hours. A full detail with engine cleaning and ceramic coating takes 2–4 hours depending on the bike's size and condition." },
  { q: "Do you detail sport bikes, cruisers, and adventure bikes?", a: "Yes — we detail every type: sport bikes, cruisers, touring bikes, adventure/dual-sport, café racers, bobbers, and even trikes. No bike is too custom or too stock." },
  { q: "Is it safe for my bike's electronics and wiring?", a: "Absolutely. We use controlled low-pressure techniques and avoid direct high-pressure spray on electrical components, connectors, and sensitive areas. We know bikes inside and out." },
  { q: "Can you remove chain lube fling and road grime from hard-to-reach areas?", a: "That's our specialty. We use specialized degreasers and detail brushes to clean swingarms, chain guards, sprockets, and all those tight spots that collect grime." },
  { q: "Do you come to my location?", a: "Yes — we're fully mobile. We come to your garage, driveway, condo parking, or even your workplace. As long as we have reasonable access, we'll make it work." },
  { q: "Can ceramic coating be applied to a motorcycle?", a: "Yes! Ceramic coatings work beautifully on motorcycles — on painted fairings, tanks, fenders, chrome, and even wheels. It provides incredible hydrophobic protection and UV defense." },
];

const testimonials = [
  { quote: "Had my Ducati Panigale detailed before a show. The paint depth was unreal — people thought it was a brand new bike. The engine bay cleaning alone was worth it.", name: "Marcus T.", location: "Calgary SW", service: "Full Motorcycle Detail" },
  { quote: "I ride my Harley year-round and it takes a beating. Xpress got the road grime, chain lube, and brake dust off areas I didn't even know were dirty. Incredible attention to detail.", name: "Steve R.", location: "Airdrie", service: "Ride Ready + Armor" },
  { quote: "Got the ceramic coating on my BMW GS before a long tour. 4,000km later and bugs still wipe right off. Best investment I've made for my bike.", name: "Andrea K.", location: "Cochrane", service: "Ceramic Coating" },
];

const packages = [
  {
    title: "Full Bike Wash",
    price: "$129",
    features: [
      "Complete exterior hand wash & rinse",
      "Wheel, spoke & brake caliper cleaning",
      "Tire dressing & shine",
      "Chain area degreasing",
      "Bug & tar removal",
      "Engine bay wipe-down",
      "Chrome & metal polish",
      "Streak-free windscreen cleaning",
      "Final dry & full inspection",
    ],
  },
  {
    title: "Full Wash + Armor",
    price: "$159",
    popular: true,
    features: [
      "Everything in Full Bike Wash PLUS:",
      "Clay bar decontamination",
      "Paint sealant / wax protection",
      "Exhaust tip deep polish",
      "UV protectant on all plastics",
      "Leather seat conditioning",
      "Swingarm & sprocket deep clean",
      "Spray sealant final coat",
    ],
  },
  {
    title: "Full Wash + Ceramic",
    price: "$379",
    badge: "Ultimate Protection",
    features: [
      "Everything in Full Wash + Armor PLUS:",
      "Paint correction (light polish)",
      "Professional ceramic coating application",
      "Hydrophobic finish on all surfaces",
      "UV & chemical resistance",
      "Up to 2 years of protection",
    ],
  },
];

const processSteps = [
  { step: "01", title: "Controlled Rinse", desc: "We start with a gentle rinse avoiding direct high-pressure on electronics, bearings, and sensitive components. Every bike is different — we adjust our approach." },
  { step: "02", title: "Foam & Hand Wash", desc: "pH-neutral foam lifts contaminants safely. We hand-wash every panel, tank, fender, and fairing with microfiber mitts — no scratching, no swirling." },
  { step: "03", title: "Detail Brush Work", desc: "Radiator fins, brake calipers, spoke nipples, chain guards — we get into every crevice with specialized brushes and degreasers." },
  { step: "04", title: "Decontamination", desc: "Iron fallout remover and clay bar treatment strip embedded brake dust and road film. Your paint becomes glass-smooth to the touch." },
  { step: "05", title: "Protection & Polish", desc: "Chrome is polished, paint is sealed, plastics are UV-protected, and leather is conditioned. Every surface gets the right treatment." },
];

const bikeTypes = [
  { icon: Gauge, label: "Sport Bikes" },
  { icon: Flame, label: "Cruisers" },
  { icon: Wind, label: "Touring Bikes" },
  { icon: Bike, label: "Adventure / Dual-Sport" },
  { icon: CircleDot, label: "Café Racers & Bobbers" },
  { icon: Wrench, label: "Custom Builds" },
];

const challenges = [
  { icon: Droplets, title: "Chain Lube Fling", desc: "That sticky mess on your swingarm, rear wheel, and chain guard? We dissolve and remove it without damaging finishes or components." },
  { icon: Sun, title: "UV Fading & Oxidation", desc: "Alberta sun fades plastics and dulls paint fast. We restore color and seal surfaces with UV-resistant protectants." },
  { icon: Eye, title: "Brake Dust Buildup", desc: "Baked-on brake dust eats into wheels and calipers. Our acid-free cleaners safely dissolve it without etching your rims." },
  { icon: Sparkles, title: "Chrome Pitting & Tarnish", desc: "Exhaust pipes, engine covers, and trim lose their luster. We polish chrome back to a mirror finish and protect it." },
  { icon: Shield, title: "Road Salt & Winter Grime", desc: "Year-round riders face corrosive salt buildup. We neutralize and remove it from every nook before it causes real damage." },
  { icon: Wrench, title: "Engine Bay Grime", desc: "Oil seepage, dust, and road film make your engine look neglected. We degrease and dress it to look factory-fresh." },
];

const MotorcycleDetailing = () => {
  return (
    <PageTransition><div className="min-h-screen">
      <SEO
         title="Motorcycle Detailing Calgary — Mobile Bike Detail"
         description="Mobile motorcycle detailing in Calgary for sport bikes, cruisers, touring & adventure bikes. Hand wash, ceramic coating & engine detail. Fully insured. We come to you."
        canonical="/motorcycle-detailing"
        jsonLd={[
          buildServiceJsonLd("Motorcycle Detailing", "Professional mobile motorcycle detailing in Calgary and surrounding areas.", "/motorcycle-detailing"),
          buildFAQJsonLd(faqs),
        ]}
      />
      <Navbar />
      <ServicePageHero title="Motorcycle Detailing in Calgary and Surrounding Areas" image={motorcycleHero} ctaType="call" />
      <TrustStats />

      {/* Intro */}
      <section className="py-20 sm:py-28 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="container max-w-4xl text-center px-6 relative z-10">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-heading font-bold uppercase tracking-[0.15em] text-xs px-5 py-2 rounded-full mb-8 border border-primary/20">
              <Bike className="w-3.5 h-3.5" />
              Built for Riders
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl uppercase text-foreground mb-8 leading-tight">
              Your Bike Deserves <span className="text-gradient">Better Than a Hose-Down</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-primary/40 mx-auto rounded-full mb-8" />
            <p className="text-muted-foreground leading-relaxed mb-5 text-base sm:text-lg max-w-3xl mx-auto">
              Motorcycles aren't just vehicles — they're machines you have a relationship with. Every curve, every chrome accent, every detail matters. That's why a regular car wash will never cut it.
            </p>
            <p className="text-muted-foreground leading-relaxed text-base sm:text-lg max-w-3xl mx-auto">
              We use motorcycle-specific techniques, controlled water pressure, and premium products to clean, protect, and restore your ride — without risking your electronics, bearings, or finishes.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Bike Types — dark premium section */}
      <section className="section-dark py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/8 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        </div>
        <div className="container max-w-5xl px-4 sm:px-6 relative z-10">
          <ScrollReveal>
            <p className="text-primary font-heading font-bold uppercase tracking-[0.2em] text-xs text-center mb-3">Every Ride. Every Style.</p>
            <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl uppercase text-center mb-14">
              We Detail <span className="text-primary">Every Type of Bike</span>
            </h2>
          </ScrollReveal>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5" staggerDelay={0.08}>
            {bikeTypes.map((item) => (
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

      {/* Process */}
      <section className="py-20 sm:py-28 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[150px] pointer-events-none" />
        <div className="container max-w-4xl px-4 sm:px-6 relative z-10">
          <ScrollReveal>
            <p className="text-primary font-heading font-bold uppercase tracking-[0.2em] text-xs text-center mb-3">Precision Process</p>
            <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl uppercase text-foreground text-center mb-14">
              How We Detail <span className="text-gradient">Your Bike</span>
            </h2>
          </ScrollReveal>
          <div className="space-y-5">
            {processSteps.map((item, i) => (
              <ScrollReveal key={item.step} delay={i * 0.08}>
                <div className="group flex gap-5 sm:gap-6 items-start p-5 sm:p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-0.5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-brand-blue-deep flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                    <span className="font-heading font-black text-primary-foreground text-sm">{item.step}</span>
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-foreground uppercase text-sm sm:text-base mb-1.5">{item.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="section-dark py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/8 rounded-full blur-[120px]" />
        </div>
        <div className="container max-w-6xl relative z-10">
          <ScrollReveal>
            <p className="text-primary font-heading font-bold uppercase tracking-[0.2em] text-xs text-center mb-3">Clear, Honest Pricing</p>
            <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl uppercase text-center mb-4">
              <span className="text-primary">Motorcycle</span> Packages
            </h2>
            <p className="text-primary-foreground/50 text-center mb-16 max-w-2xl mx-auto text-sm sm:text-base">
              Every package includes a full hand wash with motorcycle-safe techniques. No shortcuts, no upsell pressure.
            </p>
          </ScrollReveal>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto" staggerDelay={0.08}>
            {packages.map((pkg) => (
              <StaggerItem key={pkg.title}>
                <div className={`group relative rounded-2xl p-6 h-full flex flex-col transition-all duration-500 hover:-translate-y-2 ${
                  pkg.popular
                    ? "border-2 border-primary bg-gradient-to-b from-primary/15 via-primary/5 to-brand-dark-surface ring-1 ring-primary/20 shadow-2xl shadow-primary/15"
                    : "border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm hover:border-primary/40 hover:bg-white/[0.06] hover:shadow-xl hover:shadow-primary/5"
                }`}>
                  {pkg.popular && (
                    <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-primary/20 to-transparent pointer-events-none" />
                  )}
                  <div className="relative z-10 flex flex-col h-full">
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
                    <h3 className="font-heading font-bold text-sm sm:text-base uppercase text-primary-foreground/90 mb-2 leading-tight">{pkg.title}</h3>
                    <p className="font-heading font-black text-primary text-2xl sm:text-3xl mb-5">{pkg.price}</p>
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent mb-5" />
                    <ul className="space-y-2.5 mb-7 flex-1">
                      {pkg.features.map((f) => (
                        <li key={f} className="flex gap-2.5 text-primary-foreground/70 text-xs sm:text-sm">
                          <CheckCircle className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="tel:5875004523"
                      className={`group/btn flex items-center justify-center gap-2 font-heading font-bold uppercase tracking-wider px-5 py-3.5 rounded-xl text-xs sm:text-sm transition-all duration-300 ${
                        pkg.popular
                          ? "bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02]"
                          : "border border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-lg hover:shadow-primary/20"
                      }`}
                    >
                      <Phone className="w-3.5 h-3.5" />
                      Call Now
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Common Bike Problems */}
      <section className="py-20 sm:py-28 bg-background relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[150px] pointer-events-none" />
        <div className="container max-w-5xl px-4 sm:px-6 relative z-10">
          <ScrollReveal>
            <p className="text-primary font-heading font-bold uppercase tracking-[0.2em] text-xs text-center mb-3">Rider Problems, Solved</p>
            <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl uppercase text-foreground text-center mb-4">
              Motorcycle Issues <span className="text-gradient">We Fix</span>
            </h2>
            <p className="text-muted-foreground text-center mb-14 max-w-2xl mx-auto text-sm sm:text-base">
              Bikes collect grime in places cars don't. We know where to look — and exactly how to clean it.
            </p>
          </ScrollReveal>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6" staggerDelay={0.08}>
            {challenges.map((item) => (
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

      {/* Why Choose Us — dark */}
      <section className="section-dark py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-[120px]" />
        </div>
        <div className="container max-w-5xl px-4 sm:px-6 relative z-10">
          <ScrollReveal>
            <p className="text-primary font-heading font-bold uppercase tracking-[0.2em] text-xs text-center mb-3">The Xpress Advantage</p>
            <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl uppercase text-center mb-14">
              Why Riders Choose <span className="text-primary">Xpress</span>
            </h2>
          </ScrollReveal>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6" staggerDelay={0.08}>
            {[
              { icon: Bike, title: "Motorcycle Specialists", desc: "We're riders ourselves. We understand the intricacies of different bikes and treat every machine with the respect it deserves." },
              { icon: Shield, title: "Electronics-Safe Methods", desc: "Controlled water pressure, strategic spray angles, and protective covers ensure your ECU, wiring, and sensors stay bone-dry." },
              { icon: MapPin, title: "Mobile to Your Door", desc: "Garage, driveway, condo parking, workplace — we bring our full setup to wherever your bike lives. No trailer needed." },
              { icon: Sparkles, title: "Premium Products Only", desc: "Motorcycle-specific pH-neutral soaps, acid-free wheel cleaners, and UV-stable protectants. No generic car wash chemicals." },
              { icon: Clock, title: "Quick Turnaround", desc: "Most bikes are detailed in 1–3 hours. We work efficiently without cutting corners so you can get back to riding sooner." },
              { icon: Award, title: "Satisfaction Guaranteed", desc: "Not happy? We'll redo it. We stand behind every detail — two wheels or four." },
            ].map((item) => (
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

      <TestimonialBlock testimonials={testimonials} />
      <ServiceFAQ title="Motorcycle Detailing FAQs" faqs={faqs} />

      {/* CTA */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-brand-blue-deep to-brand-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(197_100%_55%/0.2),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(197_100%_35%/0.3),transparent_70%)]" />
        <div className="container relative z-10">
          <div className="grid md:grid-cols-2 gap-10 items-center px-4 sm:px-6">
            <ScrollReveal direction="left">
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-2 bg-primary-foreground/10 text-primary-foreground font-heading font-bold uppercase tracking-[0.15em] text-xs px-5 py-2 rounded-full mb-8 border border-primary-foreground/20 backdrop-blur-sm">
                  <Bike className="w-3.5 h-3.5" />
                  Mobile Service
                </div>
                <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl uppercase text-primary-foreground mb-6 leading-tight">
                  Ready to Ride<br className="hidden sm:block" /> a Clean Machine?
                </h2>
                <p className="text-primary-foreground/70 max-w-md mb-6 text-base sm:text-lg">
                  Call today to schedule your motorcycle detail. We come to you — wherever your bike is parked.
                </p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-primary-foreground/60 text-sm mb-10 justify-center md:justify-start">
                  <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary-foreground/80" /> Bike-safe methods</span>
                  <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary-foreground/80" /> All bike types</span>
                  <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary-foreground/80" /> Guaranteed</span>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
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
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/30">
                <img src={motorcycleDetail} alt="Detailed motorcycle" className="w-full object-cover aspect-[4/3] hover:scale-105 transition-transform duration-700" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Footer />
    </div></PageTransition>
  );
};

export default MotorcycleDetailing;
