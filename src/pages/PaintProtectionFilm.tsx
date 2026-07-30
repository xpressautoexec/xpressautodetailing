import { useState } from "react";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceFAQ from "@/components/ServiceFAQ";
import SEO, { buildServiceJsonLd, buildFAQJsonLd } from "@/components/SEO";
import ScrollReveal from "@/components/ScrollReveal";
import { Shield, Zap, Check, Phone, ArrowRight, Award, Sparkles, AlertTriangle } from "lucide-react";
import ppfHero from "@/assets/ppf-hero.jpg";
import PPFCoverageDiagram from "@/components/PPFCoverageDiagram";
import xpelLogo from "@/assets/xpel-ultimate-plus.png.asset.json";
import threeMLogo from "@/assets/3m-science.jpg.asset.json";

type PackageId = "partial" | "full" | "track" | "body";

interface Package {
  id: PackageId;
  name: string;
  price: string;
  tagline: string;
  includes: string[];
  popular?: boolean;
}


const PACKAGES: Package[] = [
  {
    id: "partial",
    name: "Partial Front",
    price: "$999",
    tagline: "Full bumper, 1/3 hood, 1/3 fenders and mirrors.",
    includes: ["Full bumper", "1/3 hood", "1/3 fenders", "Mirror caps", "10-year warranty"],
  },
  {
    id: "full",
    name: "Full Front",
    price: "$1,899",
    tagline: "The industry standard — full hood, fenders, bumper, mirrors.",
    includes: ["Full bumper", "Full hood", "Full fenders", "Mirror caps", "Headlights", "10-year warranty"],
    popular: true,
  },
  {
    id: "track",
    name: "Track Pack",
    price: "$2,899",
    tagline: "Full front + rocker panels and front pillars.",
    includes: ["Everything in Full Front", "Rocker panels", "Front pillars", "Door cups & handle area", "Rear luggage / boot area"],
  },
  {
    id: "body",
    name: "Full Vehicle",
    price: "$5,999",
    tagline: "Complete vehicle protection — every painted panel wrapped in film.",
    includes: ["Every painted body panel", "Full doors, quarters, roof", "Rear bumper & trunk", "10-year warranty", "Concours-level install"],
  },
];


const ADD_ONS = [
  { name: "Windshield PPF", price: "$699", desc: "6–8 mil optically-clear windshield film — up to 10 years of chip protection." },
  { name: "Interior Screen PPF", price: "$149", desc: "Anti-glare film that shields infotainment & gauge cluster from fingernail scratches, key marks and swirls." },
];

const faqs = [
  { q: "How long does PPF last?", a: "Both XPEL Ultimate Plus and 3M Pro Series carry a 10-year manufacturer warranty against yellowing, cracking, and delamination. In Calgary's UV-heavy, freeze-thaw climate we typically see film performing well past that mark when it's maintained properly." },
  { q: "Will it change the look of my paint?", a: "No — the film is optically clear and self-healing. Gloss and colour stay factory. Matte and satin variants are available for satin/matte vehicles." },
  { q: "How long does installation take?", a: "Partial Front about 1 day, Full Front 2 days, Track Pack 3 days, Full Body 5–7 days depending on vehicle complexity. Vehicles are kept indoors, dust-controlled, and cured before release." },
  { q: "Does PPF really pay for itself?", a: "One repaint on a hood or bumper in Calgary runs $1,200–$2,500. Full Front PPF prevents rock chips, road rash, and etching for a decade — most owners save 3–5× the install cost, and protected paint holds resale value." },
  { q: "Truck / SUV / exotic surcharges?", a: "Oversized vehicles +15%, exotics with complex curves +25%. Confirmed with a free quote before booking." },
  { q: "Do you wrap the edges of panels?", a: "Wherever the panel can be safely disassembled, yes. We remove badges, lights, mirror caps and trim so film tucks behind the edge — no visible film lines, no lifting edge for salt and grit to creep under." },
  { q: "Can PPF be removed later?", a: "Yes. Quality film removes cleanly with controlled heat and leaves factory paint underneath — one of the reasons leased and resale-focused vehicles are ideal candidates." },
  { q: "Should I get PPF or ceramic coating?", a: "They solve different problems. PPF is physical impact protection against gravel and road debris; ceramic coating is chemical protection and slickness against salt, brine and etching. The strongest setup is PPF on impact zones with ceramic coating over the top and across the rest of the vehicle." },
  { q: "Can you install PPF on a brand-new vehicle?", a: "New vehicles are the ideal time — the paint is uncontaminated and chip-free. We still decontaminate and, where needed, lightly polish before install so nothing is sealed under the film." },
  { q: "How do I wash a PPF'd vehicle?", a: "Wait seven days after install, then hand wash with pH-neutral soap. Avoid pressure washing directly at film edges from close range, and skip automatic brush washes. That's it — no special products required." },
  { q: "Does PPF cover rock chips already in the paint?", a: "Film will not hide existing chips, and installing over them locks them in. We'll flag any chips at the walkaround and can arrange touch-up or paint correction beforehand." },
  { q: "Do you offer financing or fleet pricing?", a: "Yes — multi-vehicle and dealer/fleet programs are quoted per unit at reduced rates. Call for a fleet quote." },
];

const THREATS = [
  {
    title: "Gravel & winter road chip",
    desc: "Deerfoot, Stoney and Glenmore are gravel-treated all winter. At highway speed, a single chip cuts straight through clear coat and primer — and in Calgary's freeze-thaw cycles that exposed spot becomes rust within a season.",
  },
  {
    title: "Brine & magnesium chloride",
    desc: "Calgary's anti-icing brine clings to bumpers, rockers and lower doors. It's far more corrosive than rock salt and etches unprotected clear coat over repeated winters.",
  },
  {
    title: "Prairie sun & UV oxidation",
    desc: "Alberta averages more sunny days than almost anywhere in Canada. Concentrated UV fades reds and blacks and dulls clear coat — PPF blocks the majority of it.",
  },
  {
    title: "Bug acid & tree sap",
    desc: "Summer highway runs to Banff and Kananaskis coat the front end in bug residue whose acids etch paint within hours in heat. Film takes the hit instead of your clear coat.",
  },
];

const FILMS = [
  {
    name: "XPEL Ultimate Plus",
    thickness: "8 mil",
    warranty: "10 years",
    points: [
      "Elastomeric self-healing top coat",
      "Hydrophobic surface sheds brine & slush",
      "Non-yellowing stabilizers for high-UV climates",
      "Best-in-class stretch for complex curves",
    ],
    best: "Daily drivers, trucks and SUVs racking up winter highway kilometres.",
  },
  {
    name: "3M Pro Series",
    thickness: "8 mil",
    warranty: "10 years",
    points: [
      "Scotchgard self-healing top layer",
      "Exceptional optical clarity over light paints",
      "Proven long-term edge stability",
      "Matte / satin options available",
    ],
    best: "Show cars, light-coloured paint, and owners wanting factory-invisible finish.",
  },
];

const PROCESS = [
  { step: "01", title: "Walkaround & quote", desc: "We inspect paint under light for chips, swirls and prior repairs, confirm coverage and give firm pricing — no surprise surcharges at drop-off." },
  { step: "02", title: "Decontamination wash", desc: "Full hand wash, iron and tar removal, and clay decontamination so nothing is trapped between paint and film." },
  { step: "03", title: "Paint correction (as needed)", desc: "Film magnifies whatever is beneath it. Swirls and light defects are polished out before install so the finish under the film is right." },
  { step: "04", title: "Disassembly & pattern", desc: "Badges, lights, mirrors and trim come off so film can be wrapped around edges instead of cut on the panel." },
  { step: "05", title: "Install in a controlled bay", desc: "Indoor, dust-controlled, temperature-managed installation — the single biggest factor in whether film lifts a year later." },
  { step: "06", title: "Cure & handover", desc: "Vehicle rests 24 hours before pickup, then we walk you through the seven-day care window and warranty registration." },
];

const CARE = [
  "Wait 7 days before the first wash so adhesive fully cures.",
  "Hand wash with pH-neutral soap; two-bucket method or touchless.",
  "Keep pressure washer nozzles 12+ inches from film edges.",
  "Skip automatic brush washes — the brushes are what lift edges.",
  "Remove bug splatter and bird droppings promptly, even on film.",
  "Top with ceramic coating over the film for easier winter cleanup.",
];



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

      {/* Manufacturer logos */}
      <section className="py-10 bg-card border-b border-border">
        <div className="container">
          <p className="text-center text-primary font-heading font-bold text-xs uppercase tracking-[0.2em] mb-6">
            Certified Installers Of
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16">
            <img
              src={xpelLogo.url}
              alt="XPEL Ultimate Plus Paint Protection Film"
              className="h-16 sm:h-20 w-auto object-contain"
              loading="lazy"
            />
            <img
              src={threeMLogo.url}
              alt="3M Science. Applied to Life."
              className="h-12 sm:h-14 w-auto object-contain"
              loading="lazy"
            />
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
              Tap a package — the illustration shows exactly which panels get wrapped in film. Blue = protected.
            </p>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
            {/* Coverage illustration */}
            <div className="bg-gradient-to-br from-brand-dark to-brand-dark-surface rounded-2xl p-6 sm:p-8 flex items-center justify-center min-h-[280px]">
              <PPFCoverageDiagram package={selected} />
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
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-brand-blue-deep text-primary-foreground shadow-2xl shadow-primary/30">
              {/* Decorative glow */}
              <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-brand-blue-deep/40 blur-3xl pointer-events-none" />

              <div className="relative p-7 sm:p-10">
                <div className="flex items-start justify-between flex-wrap gap-4 mb-6 pb-6 border-b border-white/15">
                  <div>
                    <p className="text-white/70 font-heading font-bold text-[10px] uppercase tracking-[0.25em] mb-2">Selected Package</p>
                    <h3 className="font-heading font-black text-2xl sm:text-3xl uppercase leading-none">{current.name}</h3>
                    <p className="text-white/80 text-sm mt-2 max-w-md">{current.tagline}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/60 text-[10px] font-heading font-bold uppercase tracking-widest mb-1">Starting At</p>
                    <span className="font-heading font-black text-4xl sm:text-5xl tracking-tight">{current.price}</span>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3 mb-7">
                  {current.includes.map((f) => (
                    <div key={f} className="flex items-start gap-3 text-sm">
                      <span className="shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/20 mt-0.5">
                        <Check className="w-3 h-3" strokeWidth={3} />
                      </span>
                      <span className="leading-snug">{f}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <a href="tel:5875004523" className="inline-flex items-center gap-2 bg-white text-primary font-heading font-bold uppercase tracking-wider px-6 py-3 rounded-lg text-sm hover:bg-white/90 transition shadow-lg">
                    <Phone className="w-4 h-4" /> Book {current.name}
                  </a>
                  <a href="tel:5875004523" className="inline-flex items-center gap-2 border border-white/30 bg-white/5 backdrop-blur text-white font-heading font-bold uppercase tracking-wider px-6 py-3 rounded-lg text-sm hover:bg-white/15 transition">
                    Free Quote <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
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
