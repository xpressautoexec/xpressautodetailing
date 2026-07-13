import { useState } from "react";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceFAQ from "@/components/ServiceFAQ";
import SEO, { buildServiceJsonLd, buildFAQJsonLd } from "@/components/SEO";
import ScrollReveal from "@/components/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Shield, Eye, Phone, ArrowRight, Check, AlertTriangle, Zap } from "lucide-react";
import tintHero from "@/assets/tint-hero.jpg";
import CarSideDiagram from "@/components/CarSideDiagram";

type TintTier = "carbon" | "ceramic";

interface Coverage {
  id: string;
  name: string;
  desc: string;
  price: { carbon: number; ceramic: number };
  panels: string[];
  popular?: boolean;
}

const COVERAGES: Coverage[] = [
  { id: "front2", name: "2 Front Windows", desc: "Front driver + passenger.", price: { carbon: 149, ceramic: 219 }, panels: ["frontDoorGlass"] },
  { id: "rearWs", name: "Rear Windshield", desc: "Back glass only.", price: { carbon: 119, ceramic: 169 }, panels: ["rearGlass"] },
  { id: "full", name: "Full Car (no windshield)", desc: "All 4 sides + rear.", price: { carbon: 299, ceramic: 429 }, panels: ["frontDoorGlass", "rearDoorGlass", "rearGlass"], popular: true },
  { id: "fullWs", name: "Full Car + Windshield", desc: "Everything including front glass.", price: { carbon: 449, ceramic: 629 }, panels: ["frontDoorGlass", "rearDoorGlass", "rearGlass", "windshield"] },
  { id: "windshield", name: "Windshield Only", desc: "Front glass — heat rejection focus.", price: { carbon: 199, ceramic: 279 }, panels: ["windshield"] },
  { id: "sunroof", name: "Sunroof", desc: "Panoramic or standard.", price: { carbon: 79, ceramic: 119 }, panels: ["sunroof"] },
];

const TIERS: Record<TintTier, { name: string; sub: string; features: string[] }> = {
  carbon: {
    name: "Basic Carbon",
    sub: "Rich matte black finish. Great UV block, non-metallic, no signal interference.",
    features: ["99% UV rejection", "Non-fading carbon dye", "5-year warranty", "Deep matte look"],
  },
  ceramic: {
    name: "Ceramic IR",
    sub: "Premium infrared heat-rejection ceramic. The gold standard for hot summers.",
    features: ["Up to 95% IR heat rejection", "99% UV block", "Lifetime warranty", "Zero signal interference"],
  },
};

const faqs = [
  { q: "What's the difference between Carbon and Ceramic?", a: "Carbon gives you the classic dark look with strong UV block and glare reduction. Ceramic IR adds true heat rejection — up to 95% of infrared heat blocked. On a hot Alberta summer day, a ceramic-tinted cabin feels 10–15°C cooler. Ceramic also carries a lifetime warranty." },
  { q: "Is window tint legal in Alberta?", a: "Front driver and passenger windows must let ≥35% light through (VLT 35%). Rear windows and rear windshield have no VLT limit. Windshield tint is legal above the AS-1 line (top strip) or as a full clear ceramic. We'll walk you through legal shades on the free quote." },
  { q: "Do you come to me?", a: "Yes — installs happen at your home or work. Our mobile setup includes a dust-controlled work zone and professional heat guns / squeegees. Mobile fee ($25) is already included." },
  { q: "How long does the install take?", a: "2 front windows ~45 min. Full car 2–3 hours. Full car + windshield 3–4 hours. Ceramic takes slightly longer due to thicker film." },
  { q: "What if the tint bubbles or peels?", a: "It won't with professional install. Carbon is warrantied for 5 years and Ceramic for life — bubbling, peeling, or purple discoloration is covered." },
  { q: "SUV / truck pricing?", a: "SUVs, trucks, and 3-row vehicles add $50 flat to any package due to larger glass area. Confirmed on quote." },
];

const TintDiagram = ({ panels, tier }: { panels: string[]; tier: TintTier }) => {
  const tintColor = tier === "ceramic" ? "hsl(220 60% 8%)" : "hsl(220 30% 20%)";
  return <CarSideDiagram activePanels={panels} highlightColor={tintColor} />;
};

const WindowTinting = () => {
  const [tier, setTier] = useState<TintTier>("ceramic");
  const [coverage, setCoverage] = useState<string>("full");
  const current = COVERAGES.find((c) => c.id === coverage)!;

  return (
    <PageTransition>
      <SEO
        title="Car Window Tinting Calgary"
        description="Mobile carbon and ceramic IR window tinting in Calgary. Legal, warrantied, and installed at your home or office. Instant pricing — flip between Carbon and Ceramic tiers."
        canonical="/window-tinting"
        jsonLd={[
          buildServiceJsonLd("Window Tinting", "Mobile carbon and ceramic IR window tint installation in Calgary — legal Alberta VLT, warrantied, installed at your location.", "/window-tinting"),
          buildFAQJsonLd(faqs),
        ]}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative h-[520px] sm:h-[600px] overflow-hidden">
        <img src={tintHero} alt="Window tint installation" width={1920} height={1080} className="absolute inset-0 w-full h-full object-cover" fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/70 to-brand-dark/40" />
        <div className="relative z-10 container h-full flex flex-col justify-end pb-14 md:pb-20">
          <span className="inline-flex items-center gap-2 self-start bg-primary/20 border border-primary/40 backdrop-blur-md px-4 py-1.5 rounded-full mb-4">
            <Sun className="w-4 h-4 text-primary" />
            <span className="text-white font-heading font-bold text-[10px] uppercase tracking-widest">
              Mobile Install · Alberta-Legal
            </span>
          </span>
          <h1 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl uppercase text-white leading-[1.05] max-w-3xl">
            Window <span className="text-primary">Tinting</span>
          </h1>
          <p className="text-white/85 text-base md:text-lg max-w-xl mt-4 leading-relaxed">
            Carbon or premium Ceramic IR — professionally installed at your home. UV block, heat rejection, and a factory-clean look.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <a href="tel:5875004523" className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-6 py-3 rounded-lg text-sm hover:bg-brand-blue-deep transition shadow-lg shadow-primary/30">
              <Phone className="w-4 h-4" /> Call for Booking
            </a>
            <a href="#pricing" className="inline-flex items-center gap-2 bg-white/10 border border-white/25 text-white font-heading font-bold uppercase tracking-wider px-6 py-3 rounded-lg text-sm hover:bg-white/20 backdrop-blur-md transition">
              See Pricing <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Tier toggle + pricing */}
      <section id="pricing" className="py-16 bg-background">
        <div className="container">
          <ScrollReveal className="text-center mb-8">
            <p className="text-primary font-heading font-bold text-xs uppercase tracking-[0.2em] mb-2">Live Pricing</p>
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase">
              Pick Your <span className="text-gradient">Tier</span>
            </h2>
            <p className="text-muted-foreground text-sm mt-3 max-w-2xl mx-auto">
              Flip between Carbon and Ceramic — every price updates instantly.
            </p>
          </ScrollReveal>

          {/* Tier switch */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex bg-muted p-1.5 rounded-2xl border border-border">
              {(["carbon", "ceramic"] as TintTier[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTier(t)}
                  className={`relative px-5 sm:px-8 py-3 rounded-xl font-heading font-black text-xs sm:text-sm uppercase tracking-wider transition-all ${
                    tier === t
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t === "ceramic" && <Zap className="w-3.5 h-3.5 inline mr-1.5" />}
                  {TIERS[t].name}
                </button>
              ))}
            </div>
          </div>

          {/* Tier description */}
          <ScrollReveal>
            <div className="max-w-3xl mx-auto bg-card border border-border rounded-2xl p-6 mb-10">
              <h3 className="font-heading font-black text-xl uppercase text-foreground mb-2">{TIERS[tier].name}</h3>
              <p className="text-muted-foreground text-sm mb-4">{TIERS[tier].sub}</p>
              <div className="grid sm:grid-cols-2 gap-2">
                {TIERS[tier].features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-foreground/85">
                    <Check className="w-4 h-4 text-success shrink-0" /> {f}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Coverage grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {COVERAGES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCoverage(c.id)}
                className={`relative text-left rounded-2xl border-2 p-5 transition-all ${
                  coverage === c.id
                    ? "border-primary bg-primary/5 shadow-lg"
                    : "border-border bg-card hover:border-primary/40 hover:shadow-md"
                }`}
              >
                {c.popular && (
                  <span className="absolute top-3 right-3 bg-urgency text-urgency-foreground text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                    Popular
                  </span>
                )}
                <h4 className="font-heading font-black text-sm uppercase text-foreground mb-1">{c.name}</h4>
                <p className="text-xs text-muted-foreground mb-3">{c.desc}</p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`${c.id}-${tier}`}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="font-heading font-black text-2xl text-primary"
                  >
                    ${c.price[tier]}
                  </motion.p>
                </AnimatePresence>
              </button>
            ))}
          </div>

          {/* Selected + diagram */}
          <ScrollReveal className="mt-10">
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary to-brand-blue-deep text-primary-foreground rounded-2xl p-6 sm:p-8 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="font-heading font-bold text-[10px] uppercase tracking-widest text-primary-foreground/70 mb-1">Selected</p>
                <h3 className="font-heading font-black text-xl sm:text-2xl uppercase mb-2">
                  {current.name}
                </h3>
                <p className="text-primary-foreground/75 text-sm mb-4">{TIERS[tier].name} · Mobile install included</p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`${current.id}-${tier}-price`}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="font-heading font-black text-5xl mb-4"
                  >
                    ${current.price[tier]}
                  </motion.p>
                </AnimatePresence>
                <a href="tel:5875004523" className="inline-flex items-center gap-2 bg-white text-primary font-heading font-bold uppercase tracking-wider px-6 py-3 rounded-lg text-sm hover:bg-white/90 transition">
                  <Phone className="w-4 h-4" /> Book This Package
                </a>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <TintDiagram panels={current.panels} tier={tier} />
                <p className="text-center text-[10px] font-heading uppercase tracking-widest text-primary-foreground/70 mt-2">
                  Darkened glass = tinted
                </p>
              </div>
            </div>
          </ScrollReveal>

          <p className="text-center text-xs text-muted-foreground mt-6 flex items-center justify-center gap-2 max-w-2xl mx-auto">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
            SUV / truck / 3-row +$50. Alberta law: front windows must be ≥35% VLT.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-muted/30">
        <div className="container grid sm:grid-cols-3 gap-6 max-w-5xl">
          {[
            { icon: Sun, title: "Heat Rejection", desc: "Ceramic IR blocks up to 95% of infrared — cabin stays 10–15°C cooler." },
            { icon: Shield, title: "99% UV Block", desc: "Protects skin, interior plastics and leather from fading and cracking." },
            { icon: Eye, title: "Privacy & Glare", desc: "Cut glare during driving, keep valuables out of view." },
          ].map((b) => (
            <ScrollReveal key={b.title}>
              <div className="bg-card border border-border rounded-xl p-6 text-center h-full">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
                  <b.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading font-black text-lg uppercase mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <ServiceFAQ title="Frequently Asked Questions" faqs={faqs} />

      <section className="py-16 bg-brand-dark">
        <div className="container max-w-3xl text-center">
          <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase text-white mb-4">
            Ready to Tint?
          </h2>
          <p className="text-white/75 mb-8">
            Free quotes over the phone. Most installs booked within a week.
          </p>
          <a href="tel:5875004523" className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-8 py-4 rounded-lg text-sm hover:bg-brand-blue-deep transition shadow-xl shadow-primary/30">
            <Phone className="w-4 h-4" /> Call (587) 500-4523
          </a>
        </div>
      </section>

      <Footer />
    </PageTransition>
  );
};

export default WindowTinting;
