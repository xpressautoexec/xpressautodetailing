import { useState } from "react";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceFAQ from "@/components/ServiceFAQ";
import SEO, { buildServiceJsonLd, buildFAQJsonLd } from "@/components/SEO";
import ScrollReveal from "@/components/ScrollReveal";
import { Shield, Zap, Check, Phone, ArrowRight, Award, Sparkles, AlertTriangle } from "lucide-react";
import ppfHero from "@/assets/ppf-hero.jpg";

type PackageId = "bumper" | "partial" | "full" | "track" | "body";

interface Package {
  id: PackageId;
  name: string;
  price: string;
  tagline: string;
  panels: string[]; // panel keys highlighted on diagram
  includes: string[];
  popular?: boolean;
}

const PACKAGES: Package[] = [
  {
    id: "bumper",
    name: "Bumper Only",
    price: "$599",
    tagline: "Chip protection for the highest-impact panel.",
    panels: ["bumper"],
    includes: ["Full front bumper", "XPEL Ultimate Plus film", "10-year warranty", "Self-healing top coat"],
  },
  {
    id: "partial",
    name: "Partial Front",
    price: "$999",
    tagline: "Front bumper, 18\" of hood, fenders and mirrors.",
    panels: ["bumper", "hoodPartial", "fenders", "mirrors"],
    includes: ["Bumper", "Partial hood (18\")", "Fenders", "Mirror caps", "10-year warranty"],
  },
  {
    id: "full",
    name: "Full Front",
    price: "$1,899",
    tagline: "The industry standard — full hood, fenders, bumper, mirrors, headlights.",
    panels: ["bumper", "hood", "fenders", "mirrors", "headlights"],
    includes: ["Full hood", "Full fenders", "Bumper", "Mirror caps", "Headlights", "10-year warranty"],
    popular: true,
  },
  {
    id: "track",
    name: "Track Pack",
    price: "$2,899",
    tagline: "Full front + rockers, A-pillars, door cups and rear luggage area.",
    panels: ["bumper", "hood", "fenders", "mirrors", "headlights", "rockers", "aPillars", "doorCups", "rearLuggage"],
    includes: ["Everything in Full Front", "Rocker panels", "A-pillars & roof edge", "Door cups & handle area", "Rear luggage / boot area"],
  },
  {
    id: "body",
    name: "Full Body",
    price: "$5,999",
    tagline: "Complete vehicle protection — every painted panel wrapped in film.",
    panels: ["bumper", "hood", "fenders", "mirrors", "headlights", "rockers", "aPillars", "doorCups", "rearLuggage", "doors", "roof", "rearQuarters", "trunk"],
    includes: ["Every painted body panel", "Full doors, quarters, roof", "Rear bumper & trunk", "10-year warranty", "Concours-level install"],
  },
];

const ADD_ONS = [
  { name: "Windshield PPF", price: "$699", desc: "6–8 mil optically-clear windshield film — up to 10 years of chip protection." },
  { name: "Interior Screen PPF", price: "$149", desc: "Anti-glare protection for infotainment & digital gauge cluster." },
];

const faqs = [
  { q: "How long does PPF last?", a: "Both XPEL Ultimate Plus and 3M Pro Series carry a 10-year manufacturer warranty against yellowing, cracking, and delamination." },
  { q: "Will it change the look of my paint?", a: "No — the film is optically clear and self-healing. Gloss and colour stay factory. Matte and satin variants are available for satin/matte vehicles." },
  { q: "How long does installation take?", a: "Bumper-only about 1 day, Full Front 2 days, Track Pack 3 days, Full Body 5–7 days depending on vehicle." },
  { q: "Does PPF really pay for itself?", a: "One repaint on a hood or bumper in Calgary runs $1,200–$2,500. Full Front PPF prevents rock chips, road rash, and etching for a decade — most owners save 3–5× the install cost." },
  { q: "Truck / SUV / exotic surcharges?", a: "Oversized vehicles +15%, exotics with complex curves +25%. Confirmed with a free quote before booking." },
];

// Coverage diagram — top-down car outline
const PANEL_FILLS: Record<string, string> = {
  bumper: "M 40 20 L 160 20 L 160 45 L 40 45 Z",
  hood: "M 50 45 L 150 45 L 150 105 L 50 105 Z",
  hoodPartial: "M 50 45 L 150 45 L 150 75 L 50 75 Z",
  fenders: "M 30 45 L 50 45 L 50 105 L 30 105 Z M 150 45 L 170 45 L 170 105 L 150 105 Z",
  mirrors: "M 25 90 L 35 90 L 35 100 L 25 100 Z M 165 90 L 175 90 L 175 100 L 165 100 Z",
  headlights: "M 45 25 L 75 25 L 75 42 L 45 42 Z M 125 25 L 155 25 L 155 42 L 125 42 Z",
  rockers: "M 35 130 L 55 130 L 55 260 L 35 260 Z M 145 130 L 165 130 L 165 260 L 145 260 Z",
  aPillars: "M 55 105 L 75 105 L 75 130 L 55 130 Z M 125 105 L 145 105 L 145 130 L 125 130 Z",
  doorCups: "M 60 155 L 78 155 L 78 168 L 60 168 Z M 122 155 L 140 155 L 140 168 L 122 168 Z M 60 210 L 78 210 L 78 223 L 60 223 Z M 122 210 L 140 210 L 140 223 L 122 223 Z",
  rearLuggage: "M 55 285 L 145 285 L 145 320 L 55 320 Z",
  doors: "M 55 130 L 145 130 L 145 265 L 55 265 Z",
  roof: "M 65 105 L 135 105 L 135 265 L 65 265 Z",
  rearQuarters: "M 35 265 L 55 265 L 55 320 L 35 320 Z M 145 265 L 165 265 L 165 320 L 145 320 Z",
  trunk: "M 40 320 L 160 320 L 160 345 L 40 345 Z",
};

const CarDiagram = ({ activePanels }: { activePanels: string[] }) => {
  const active = new Set(activePanels);
  return (
    <svg viewBox="0 0 200 380" className="w-full max-w-[280px] mx-auto">
      {/* Car body outline */}
      <path
        d="M 55 15 Q 100 5 145 15 L 165 45 L 175 105 L 175 300 L 165 345 L 145 360 Q 100 370 55 360 L 35 345 L 25 300 L 25 105 L 35 45 Z"
        fill="hsl(var(--muted))"
        stroke="hsl(var(--border))"
        strokeWidth="1.5"
      />
      {/* Windshield / roof glass */}
      <path d="M 65 108 L 135 108 L 135 265 L 65 265 Z" fill="hsl(var(--brand-dark))" opacity="0.15" />

      {/* Highlighted panels */}
      {Object.entries(PANEL_FILLS).map(([key, d]) => (
        active.has(key) && (
          <path
            key={key}
            d={d}
            fill="hsl(var(--primary))"
            opacity="0.85"
            className="transition-all duration-500"
          />
        )
      ))}
    </svg>
  );
};

const PaintProtectionFilm = () => {
  const [selected, setSelected] = useState<PackageId>("full");
  const current = PACKAGES.find((p) => p.id === selected)!;

  return (
    <PageTransition>
      <SEO
        title="Paint Protection Film (PPF) Calgary"
        description="10-year XPEL & 3M paint protection film install in Calgary. Bumper, Partial Front, Full Front, Track Pack and Full Body packages — self-healing, invisible chip protection."
        canonical="/ppf"
        jsonLd={[
          buildServiceJsonLd("Paint Protection Film (PPF)", "XPEL and 3M paint protection film installation in Calgary — 10-year warranty, self-healing top coat.", "/ppf"),
          buildFAQJsonLd(faqs),
        ]}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative h-[520px] sm:h-[600px] overflow-hidden">
        <img src={ppfHero} alt="Paint protection film installation" width={1920} height={1080} className="absolute inset-0 w-full h-full object-cover" fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/70 to-brand-dark/40" />
        <div className="relative z-10 container h-full flex flex-col justify-end pb-14 md:pb-20">
          <span className="inline-flex items-center gap-2 self-start bg-primary/20 border border-primary/40 backdrop-blur-md px-4 py-1.5 rounded-full mb-4">
            <Award className="w-4 h-4 text-primary" />
            <span className="text-white font-heading font-bold text-[10px] uppercase tracking-widest">
              XPEL Ultimate Plus & 3M Pro Series
            </span>
          </span>
          <h1 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl uppercase text-white leading-[1.05] max-w-3xl">
            Paint Protection <span className="text-primary">Film</span>
          </h1>
          <p className="text-white/85 text-base md:text-lg max-w-xl mt-4 leading-relaxed">
            10 years of invisible, self-healing protection against rock chips, road rash and etching. Concours-grade install on every panel.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <a href="tel:5875004523" className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-6 py-3 rounded-lg text-sm hover:bg-brand-blue-deep transition shadow-lg shadow-primary/30">
              <Phone className="w-4 h-4" /> Call for Quote
            </a>
            <a href="#coverage" className="inline-flex items-center gap-2 bg-white/10 border border-white/25 text-white font-heading font-bold uppercase tracking-wider px-6 py-3 rounded-lg text-sm hover:bg-white/20 backdrop-blur-md transition">
              See Coverage <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Interactive coverage */}
      <section id="coverage" className="py-16 bg-background">
        <div className="container">
          <ScrollReveal className="text-center mb-10">
            <p className="text-primary font-heading font-bold text-xs uppercase tracking-[0.2em] mb-2">Coverage Selector</p>
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase">
              Pick Your <span className="text-gradient">Coverage</span>
            </h2>
            <p className="text-muted-foreground text-sm mt-3 max-w-2xl mx-auto">
              Tap a package — the diagram shows every panel wrapped in film.
            </p>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
            {/* Diagram */}
            <div className="bg-card border border-border rounded-2xl p-8 sm:p-10">
              <CarDiagram activePanels={current.panels} />
              <p className="text-center text-xs text-muted-foreground mt-4 font-heading uppercase tracking-wider">
                Highlighted panels = protected
              </p>
            </div>

            {/* Package selector */}
            <div className="space-y-3">
              {PACKAGES.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelected(p.id)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    selected === p.id
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border bg-card hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <div className="flex items-center gap-2">
                      <span className={`font-heading font-black text-sm uppercase ${selected === p.id ? "text-primary" : "text-foreground"}`}>
                        {p.name}
                      </span>
                      {p.popular && (
                        <span className="bg-urgency text-urgency-foreground text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                          Most Popular
                        </span>
                      )}
                    </div>
                    <span className="font-heading font-black text-lg text-primary">{p.price}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{p.tagline}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Selected package details */}
          <ScrollReveal className="mt-10 max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-primary to-brand-blue-deep text-primary-foreground rounded-2xl p-6 sm:p-8">
              <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                <h3 className="font-heading font-black text-2xl uppercase">{current.name}</h3>
                <span className="font-heading font-black text-3xl">{current.price}</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-3 mb-5">
                {current.includes.map((f) => (
                  <div key={f} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 shrink-0 mt-0.5" /> {f}
                  </div>
                ))}
              </div>
              <a href="tel:5875004523" className="inline-flex items-center gap-2 bg-white text-primary font-heading font-bold uppercase tracking-wider px-6 py-3 rounded-lg text-sm hover:bg-white/90 transition">
                <Phone className="w-4 h-4" /> Book {current.name}
              </a>
            </div>
          </ScrollReveal>

          <p className="text-center text-xs text-muted-foreground mt-6 flex items-center justify-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5" />
            Trucks / SUVs +15%. Exotics +25%. Confirmed on free quote.
          </p>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-4xl">
          <ScrollReveal className="text-center mb-8">
            <p className="text-primary font-heading font-bold text-xs uppercase tracking-[0.2em] mb-2">Add-Ons</p>
            <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase">Extend Protection</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-5">
            {ADD_ONS.map((a) => (
              <div key={a.name} className="bg-card border border-border rounded-xl p-6 hover:border-primary/40 transition">
                <div className="flex justify-between items-start gap-3 mb-2">
                  <h3 className="font-heading font-bold text-base uppercase text-foreground">{a.name}</h3>
                  <span className="font-heading font-black text-primary text-lg whitespace-nowrap">{a.price}</span>
                </div>
                <p className="text-sm text-muted-foreground">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-background">
        <div className="container grid sm:grid-cols-3 gap-6 max-w-5xl">
          {[
            { icon: Shield, title: "10-Year Warranty", desc: "XPEL & 3M manufacturer-backed against yellowing, cracking, delamination." },
            { icon: Zap, title: "Self-Healing", desc: "Minor scratches and swirls vanish with sun or warm water." },
            { icon: Sparkles, title: "Invisible Finish", desc: "Optically clear — factory gloss & colour stay untouched." },
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
            Get a Free PPF Quote
          </h2>
          <p className="text-white/75 mb-8">
            Every quote includes a walkaround and film recommendation for your vehicle.
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

export default PaintProtectionFilm;
