import { useState } from "react";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceFAQ from "@/components/ServiceFAQ";
import SEO, { buildServiceJsonLd, buildFAQJsonLd } from "@/components/SEO";
import ScrollReveal from "@/components/ScrollReveal";
import { Shield, Zap, Check, Phone, ArrowRight, Award, Sparkles, AlertTriangle, Clock, BadgeCheck, X, Minus, Layers, ShieldCheck, Droplets, Sun } from "lucide-react";
import ppfHero from "@/assets/ppf-hero-premium.jpg";
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
  panels: string;
  install: string;
  bestFor: string;
  popular?: boolean;
}


const PACKAGES: Package[] = [
  {
    id: "partial",
    name: "Partial Front",
    price: "$999",
    tagline: "Full bumper, 1/3 hood, 1/3 fenders and mirrors.",
    includes: ["Full front bumper wrapped & tucked", "Leading 1/3 of hood", "Leading 1/3 of front fenders", "Mirror caps", "10-year film warranty"],
    panels: "5 zones",
    install: "1 day in-shop",
    bestFor: "Budget-conscious protection of the highest-impact strike zone.",
  },
  {
    id: "full",
    name: "Full Front",
    price: "$1,899",
    tagline: "The industry standard — full hood, fenders, bumper, mirrors.",
    includes: ["Full front bumper", "Full hood — no cut line", "Full front fenders", "Mirror caps", "Headlights & fog lights", "10-year film warranty"],
    panels: "7 zones",
    install: "2 days in-shop",
    bestFor: "Daily drivers and new vehicles — the coverage 8 of 10 clients choose.",
    popular: true,
  },
  {
    id: "track",
    name: "Track Pack",
    price: "$2,899",
    tagline: "Full front + rocker panels and front pillars.",
    includes: ["Everything in Full Front", "Rocker panels", "A-pillars & roof leading edge", "Door cups & handle cavities", "Rear luggage / loading edge"],
    panels: "12 zones",
    install: "3 days in-shop",
    bestFor: "Highway commuters, lowered cars and anyone tired of rocker sandblasting.",
  },
  {
    id: "body",
    name: "Full Vehicle",
    price: "$5,999",
    tagline: "Complete vehicle protection — every painted panel wrapped in film.",
    includes: ["Every painted body panel", "Doors, quarters and roof", "Rear bumper & trunk lid", "Edges wrapped after disassembly", "10-year film warranty"],
    panels: "Every panel",
    install: "5–7 days in-shop",
    bestFor: "Exotics, collector cars and paint codes you never want to respray.",
  },
];

const PROTECTION_MATRIX = {
  columns: ["No Protection", "Wax / Sealant", "Ceramic Coating", "PPF", "PPF + Ceramic"],
  rows: [
    { label: "Stops rock chips & gravel impact", values: ["no", "no", "no", "yes", "yes"] },
    { label: "Self-heals light scratches", values: ["no", "no", "no", "yes", "yes"] },
    { label: "Blocks brine & salt etching", values: ["no", "part", "yes", "yes", "yes"] },
    { label: "UV fade & oxidation resistance", values: ["no", "part", "yes", "yes", "yes"] },
    { label: "Bug acid & bird dropping defence", values: ["no", "part", "yes", "yes", "yes"] },
    { label: "Hydrophobic — easy winter washing", values: ["no", "part", "yes", "part", "yes"] },
    { label: "Protects resale / lease turn-in value", values: ["no", "part", "part", "yes", "yes"] },
    { label: "Typical lifespan", values: ["—", "2–4 months", "2–7 years", "10 years", "10 years"] },
  ],
};

const GUARANTEES = [
  { icon: Sun, title: "No Yellowing", desc: "UV stabilizers keep the film optically clear. Yellowing or staining inside 10 years is replaced under warranty." },
  { icon: Layers, title: "No Peeling or Lifting", desc: "Edges are wrapped behind panels after disassembly. If an edge ever lifts from our fitment, we re-fit it free for the life of the film." },
  { icon: ShieldCheck, title: "No Cracking or Bubbling", desc: "Manufacturer-backed against cracking, blistering and delamination — registered to your VIN, not to a receipt." },
  { icon: Droplets, title: "Self-Healing Top Coat", desc: "Wash swirls and fingernail marks disappear with sun or warm water. The finish stays showroom, not just protected." },
];

const CREDENTIALS = [
  { title: "XPEL Certified Installer", desc: "Factory-trained on Ultimate Plus and DAP pattern cutting — every install registered with XPEL." },
  { title: "3M Pro Series Authorized", desc: "Approved to install and warranty 3M Scotchgard Pro Series film." },
  { title: "Indoor Controlled Bay", desc: "Dust-controlled, temperature-managed installation bay — the number one factor in film that lasts." },
  { title: "Fully Documented Install", desc: "Photo record of prep, correction and install, plus warranty registration handed over at pickup." },
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
      <section className="relative min-h-[620px] sm:min-h-[720px] flex overflow-hidden bg-brand-dark">
        <img src={ppfHero} alt="XPEL paint protection film being installed on a black luxury car hood in a Calgary detailing bay" width={1920} height={1088} className="absolute inset-0 w-full h-full object-cover opacity-70" fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/85 to-brand-dark/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark/60" />
        <div className="relative z-10 container flex flex-col justify-center py-20">
          <span className="inline-flex items-center gap-2 self-start bg-primary/20 border border-primary/40 backdrop-blur-md px-4 py-1.5 rounded-full mb-5">
            <Award className="w-4 h-4 text-primary" />
            <span className="text-white font-heading font-bold text-[10px] uppercase tracking-widest">
              XPEL Certified &amp; 3M Pro Series Authorized
            </span>
          </span>
          <h1 className="font-heading font-black text-4xl sm:text-6xl md:text-7xl uppercase text-white leading-[0.95] max-w-4xl">
            Paint Protection <span className="text-primary">Film</span>
            <span className="block text-white/90 text-2xl sm:text-3xl md:text-4xl mt-3">Calgary&apos;s Invisible Armour</span>
          </h1>
          <p className="text-white/85 text-base md:text-lg max-w-2xl mt-5 leading-relaxed">
            A decade of self-healing, optically-clear protection against rock chips, road rash, brine and UV — installed
            indoors, wrapped around every edge, and warrantied against yellowing, cracking and peeling.
          </p>

          <div className="flex flex-wrap gap-x-8 gap-y-3 mt-7">
            {[
              { icon: Shield, label: "10-Year Warranty" },
              { icon: Zap, label: "Self-Healing Film" },
              { icon: BadgeCheck, label: "Lifetime Workmanship" },
              { icon: Sparkles, label: "Invisible Finish" },
            ].map((s) => (
              <span key={s.label} className="inline-flex items-center gap-2 text-white/90 text-xs sm:text-sm font-heading font-bold uppercase tracking-wider">
                <s.icon className="w-4 h-4 text-primary" /> {s.label}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mt-8">
            <a href="tel:5875004523" className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-7 py-3.5 rounded-lg text-sm hover:bg-brand-blue-deep transition shadow-lg shadow-primary/30">
              <Phone className="w-4 h-4" /> Call for a Free Quote
            </a>
            <a href="#packages" className="inline-flex items-center gap-2 bg-white/10 border border-white/25 text-white font-heading font-bold uppercase tracking-wider px-7 py-3.5 rounded-lg text-sm hover:bg-white/20 backdrop-blur-md transition">
              See Packages &amp; Pricing <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-14 bg-card border-b border-border">
        <div className="container">
          <p className="text-center text-primary font-heading font-bold text-xs uppercase tracking-[0.2em] mb-8">
            Certified &amp; Authorized Installers
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-20 mb-12">
            <img
              src={xpelLogo.url}
              alt="XPEL Ultimate Plus certified paint protection film installer"
              className="h-16 sm:h-20 w-auto object-contain"
              loading="lazy"
            />
            <img
              src={threeMLogo.url}
              alt="3M Pro Series authorized paint protection film installer"
              className="h-12 sm:h-14 w-auto object-contain"
              loading="lazy"
            />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {CREDENTIALS.map((c) => (
              <div key={c.title} className="h-full rounded-xl border border-border bg-background p-5">
                <BadgeCheck className="w-5 h-5 text-primary mb-3" />
                <h3 className="font-heading font-black text-sm uppercase mb-1.5">{c.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            ))}
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

      {/* Why PPF in Calgary */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-5xl">
          <ScrollReveal className="text-center mb-10">
            <p className="text-primary font-heading font-bold text-xs uppercase tracking-[0.2em] mb-2">Why It Matters Here</p>
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase">
              What Calgary Roads Do To <span className="text-gradient">Paint</span>
            </h2>
            <p className="text-muted-foreground text-sm mt-3 max-w-2xl mx-auto leading-relaxed">
              Southern Alberta is one of the harshest paint environments in the country — gravel-treated highways for six months,
              brine anti-icing, then a high-UV summer. PPF is the only protection that physically stops the damage instead of
              just making it easier to clean.
            </p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-5">
            {THREATS.map((t) => (
              <ScrollReveal key={t.title}>
                <div className="h-full bg-card border border-border rounded-xl p-6 hover:border-primary/40 transition">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 shrink-0">
                      <AlertTriangle className="w-4 h-4 text-primary" />
                    </span>
                    <h3 className="font-heading font-black text-base uppercase">{t.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Film comparison */}
      <section className="py-16 bg-background">
        <div className="container max-w-5xl">
          <ScrollReveal className="text-center mb-10">
            <p className="text-primary font-heading font-bold text-xs uppercase tracking-[0.2em] mb-2">The Film</p>
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase">
              Two Films. Both <span className="text-gradient">Top Tier</span>.
            </h2>
            <p className="text-muted-foreground text-sm mt-3 max-w-2xl mx-auto leading-relaxed">
              We only install manufacturer-warrantied film from XPEL and 3M. No unbranded imports, no shop-brand
              relabels — both options are registered to your VIN with a 10-year warranty.
            </p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            {FILMS.map((f) => (
              <ScrollReveal key={f.name}>
                <div className="h-full bg-card border border-border rounded-2xl p-7 hover:border-primary/40 transition">
                  <h3 className="font-heading font-black text-xl uppercase mb-3">{f.name}</h3>
                  <div className="flex gap-3 mb-5">
                    <span className="bg-primary/10 text-primary text-[10px] font-heading font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                      {f.thickness}
                    </span>
                    <span className="bg-primary/10 text-primary text-[10px] font-heading font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                      {f.warranty} warranty
                    </span>
                  </div>
                  <ul className="space-y-2.5 mb-5">
                    {f.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-sm text-foreground/90">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" strokeWidth={3} />
                        <span className="leading-snug">{p}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-muted-foreground border-t border-border pt-4">
                    <span className="font-heading font-bold uppercase tracking-wider text-foreground">Best for: </span>
                    {f.best}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-brand-dark">
        <div className="container max-w-5xl">
          <ScrollReveal className="text-center mb-10">
            <p className="text-primary font-heading font-bold text-xs uppercase tracking-[0.2em] mb-2">Our Process</p>
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase text-white">
              How A Proper Install <span className="text-primary">Happens</span>
            </h2>
            <p className="text-white/70 text-sm mt-3 max-w-2xl mx-auto leading-relaxed">
              Most PPF failures — lifting edges, trapped dirt, visible cut lines — come from rushed prep, not bad film.
              Here's every stage your vehicle goes through.
            </p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROCESS.map((s) => (
              <ScrollReveal key={s.step}>
                <div className="h-full bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
                  <span className="font-heading font-black text-3xl text-primary/60 block mb-2">{s.step}</span>
                  <h3 className="font-heading font-black text-base uppercase text-white mb-2">{s.title}</h3>
                  <p className="text-sm text-white/70 leading-relaxed">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* PPF vs Ceramic */}
      <section className="py-16 bg-background">
        <div className="container max-w-4xl">
          <ScrollReveal className="text-center mb-10">
            <p className="text-primary font-heading font-bold text-xs uppercase tracking-[0.2em] mb-2">PPF vs Ceramic</p>
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase">
              They Solve <span className="text-gradient">Different Problems</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal>
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-sm min-w-[520px]">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left font-heading font-bold uppercase text-xs tracking-wider p-4">Protection Against</th>
                    <th className="text-left font-heading font-bold uppercase text-xs tracking-wider p-4">PPF</th>
                    <th className="text-left font-heading font-bold uppercase text-xs tracking-wider p-4">Ceramic Coating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ["Rock chips & gravel impact", "Yes — physical barrier", "No"],
                    ["Road rash on lower panels", "Yes", "No"],
                    ["Brine & salt etching", "Yes, on covered panels", "Yes, whole vehicle"],
                    ["Bug acid & bird droppings", "Yes", "Yes"],
                    ["UV fade & oxidation", "Yes", "Yes"],
                    ["Self-healing scratches", "Yes", "No"],
                    ["Easier washing / water beading", "Moderate", "Excellent"],
                    ["Typical lifespan", "10 years", "2–7 years"],
                  ].map(([label, ppf, ceramic]) => (
                    <tr key={label} className="bg-card">
                      <td className="p-4 font-medium text-foreground">{label}</td>
                      <td className="p-4 text-muted-foreground">{ppf}</td>
                      <td className="p-4 text-muted-foreground">{ceramic}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
          <p className="text-center text-sm text-muted-foreground mt-6 leading-relaxed">
            The strongest setup is both: film on the impact zones, ceramic coating over the film and across every remaining panel.
            Read the full breakdown in our{" "}
            <a href="/blog/ppf-vs-ceramic-coating-calgary" className="text-primary font-semibold underline underline-offset-2">
              PPF vs Ceramic Coating for Calgary Winters guide
            </a>
            , or see our{" "}
            <a href="/paint-ceramics" className="text-primary font-semibold underline underline-offset-2">
              ceramic coating packages
            </a>.
          </p>
        </div>
      </section>

      {/* Aftercare */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-4xl">
          <ScrollReveal className="text-center mb-8">
            <p className="text-primary font-heading font-bold text-xs uppercase tracking-[0.2em] mb-2">Aftercare</p>
            <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase">Keeping Film Looking New</h2>
            <p className="text-muted-foreground text-sm mt-3 max-w-2xl mx-auto leading-relaxed">
              PPF is low maintenance, not no maintenance. Follow these and your film will outlive its warranty.
            </p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-4">
            {CARE.map((c) => (
              <div key={c} className="flex items-start gap-3 bg-card border border-border rounded-xl p-5">
                <Check className="w-4 h-4 text-primary shrink-0 mt-1" strokeWidth={3} />
                <span className="text-sm text-foreground/90 leading-relaxed">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-16 bg-background">
        <div className="container max-w-5xl">
          <ScrollReveal className="text-center mb-10">
            <p className="text-primary font-heading font-bold text-xs uppercase tracking-[0.2em] mb-2">Best Candidates</p>
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase">Who Should Get PPF</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "New vehicle owners", desc: "Protect factory paint before the first chip. Nothing to correct, nothing sealed under the film." },
              { title: "Highway commuters", desc: "Airdrie, Cochrane, Chestermere and Okotoks commutes mean daily gravel exposure at speed." },
              { title: "Leased vehicles", desc: "Avoid end-of-lease paint chargebacks. Film removes cleanly at turn-in." },
              { title: "Trucks & off-road builds", desc: "Rockers, lower doors and hoods take constant gravel and mud abrasion." },
              { title: "Performance & exotic cars", desc: "Low front ends and expensive paint codes — a single respray outcosts full-front film." },
              { title: "Resale-focused owners", desc: "Chip-free paint is the first thing a buyer or appraiser looks at. Protected cars appraise higher." },
            ].map((w) => (
              <ScrollReveal key={w.title}>
                <div className="h-full bg-card border border-border rounded-xl p-6">
                  <h3 className="font-heading font-black text-base uppercase mb-2">{w.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{w.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Warranty */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-4xl">
          <ScrollReveal>
            <div className="bg-card border border-border rounded-2xl p-8 sm:p-10">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-7 h-7 text-primary" />
                <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase">The Warranty, Plainly</h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                Every install is registered with the manufacturer against your VIN. XPEL and 3M both back their film for
                10 years against yellowing, staining, cracking, bubbling, peeling and delamination. On top of that, our
                install workmanship is warrantied for the life of the film — if an edge lifts because of how it was fitted,
                we re-fit it at no charge.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "Manufacturer coverage registered to your VIN",
                  "Lifetime workmanship warranty on edges & fitment",
                  "Warranty transfers with the vehicle on sale",
                  "Covers yellowing, cracking, bubbling, delamination",
                ].map((x) => (
                  <div key={x} className="flex items-start gap-2.5 text-sm">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" strokeWidth={3} />
                    <span className="text-foreground/90 leading-snug">{x}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
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
