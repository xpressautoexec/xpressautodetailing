import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import ServiceFAQ from "@/components/ServiceFAQ";
import SEO, { buildServiceJsonLd, buildFAQJsonLd } from "@/components/SEO";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import RVCoverageDiagram from "@/components/RVCoverageDiagram";
import {
  Phone,
  Shield,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Mountain,
  Bug,
  Sun,
  Hammer,
  Clock,
  MapPin,
  Award,
  AlertTriangle,
  Layers,
  Star,
  Zap,
  DollarSign,
} from "lucide-react";
import rvPPFHero from "@/assets/gallery-rv-paint-correction-closeup.jpg";

const PHONE = "tel:5875004523";
const PHONE_DISPLAY = "587-500-4523";

const faqs = [
  {
    q: "What is RV paint protection film (PPF)?",
    a: "PPF is a clear, self-healing urethane film professionally installed over your RV's painted and gel-coat surfaces. It absorbs rock chips, bug etching, road tar, sand, and UV damage that would otherwise dull or pit your finish — extending your RV's like-new appearance for 7–10+ years.",
  },
  {
    q: "Why does an RV need PPF more than a car?",
    a: "RVs have huge, expensive front caps and fiberglass sides that are extremely costly to repaint — often $8,000–$20,000+. They also see thousands of highway kilometres exposed to rocks, gravel, bugs, and intense UV. PPF is dramatically cheaper than a refinish.",
  },
  {
    q: "Will the film yellow or peel?",
    a: "Premium TPU films we install are non-yellowing, hydrophobic, and self-healing under heat. With proper care they stay optically clear for 7–10+ years and remove cleanly without damaging the original finish.",
  },
  {
    q: "Can you install on fiberglass gel coat and decals?",
    a: "Yes. Our installers prep gel coat, polish out oxidation, and apply film over factory decals where appropriate. We'll inspect your rig and recommend the safest coverage plan during your free in-person quote.",
  },
  {
    q: "How long does installation take?",
    a: "Front cap protection: 1–2 days. High-impact package: 2–4 days. Full body: 4–7 days depending on size and condition. We schedule installs at our climate-controlled bay or at your storage location for larger rigs.",
  },
  {
    q: "Do you offer a warranty?",
    a: "Yes — manufacturer warranties of 7–10 years against yellowing, cracking, and delamination, plus our installation workmanship guarantee.",
  },
];

type Threat = { icon: typeof Mountain; label: string };
const threats: Threat[] = [
  { icon: Mountain, label: "Rock & Gravel Chips" },
  { icon: Bug, label: "Bug Acid Etching" },
  { icon: Sun, label: "UV Fade & Oxidation" },
  { icon: Hammer, label: "Road Debris & Tar" },
];

type Package = {
  name: string;
  tagline: string;
  priceFrom: string;
  coverageLevel: "front-cap" | "front-plus" | "high-impact" | "full-body";
  duration: string;
  badge?: string;
  popular?: boolean;
  bestValue?: boolean;
  coverage: string[];
  benefits: string[];
  ideal: string;
};

const packages: Package[] = [
  {
    name: "Front Cap Defender",
    tagline: "Essential nose protection — the #1 chip zone on every RV.",
    priceFrom: "From $1,499",
    coverageLevel: "front-cap",
    duration: "1–2 days",
    coverage: [
      "Full front cap / nose",
      "Headlight & marker light covers",
      "Forward-facing windshield trim edges",
    ],
    benefits: [
      "Stops the most common rock & bug damage",
      "Protects the most expensive panel to repaint",
      "Self-healing, optically clear premium TPU film",
    ],
    ideal: "Travel trailers, 5th wheels, and Class C owners who want core protection without full-body cost.",
  },
  {
    name: "Highway Shield",
    tagline: "Front cap + hood + mirrors — covers everything that hits highway air.",
    priceFrom: "From $2,299",
    coverageLevel: "front-plus",
    duration: "2–3 days",
    badge: "Most Popular",
    popular: true,
    coverage: [
      "Everything in Front Cap Defender",
      "Hood / front cowl",
      "Side mirrors & mirror arms",
      "A-pillar leading edges",
    ],
    benefits: [
      "Covers ~90% of all highway impact zones",
      "Eliminates bug etching on flat surfaces",
      "Easy bug & tar removal — film wipes clean",
    ],
    ideal: "Class A & Class C motorhomes that road-trip the Rockies, Okanagan, or US Southwest.",
  },
  {
    name: "Full Trail Armor",
    tagline: "Front cap + hood + rockers + wheel arches + slide-outs.",
    priceFrom: "From $3,799",
    coverageLevel: "high-impact",
    duration: "3–4 days",
    badge: "Best Value",
    bestValue: true,
    coverage: [
      "Everything in Highway Shield",
      "Lower rocker panels (full length)",
      "Front & rear wheel arches",
      "Slide-out leading edges & faces",
      "Storage door leading edges",
    ],
    benefits: [
      "Defends against gravel kick-up & rocker sandblasting",
      "Protects slide-outs — the second-most expensive repair",
      "Best protection-per-dollar for serious travelers",
    ],
    ideal: "Boondockers, gravel-road adventurers, and full-time RVers covering 20,000+ km/year.",
  },
  {
    name: "Showroom Forever",
    tagline: "Total body coverage — every painted & gel-coat surface protected.",
    priceFrom: "From $7,999",
    coverageLevel: "full-body",
    duration: "5–7 days",
    coverage: [
      "Everything in Full Trail Armor",
      "Full side panels (both sides)",
      "Rear cap / rear wall",
      "All exterior cabinets & compartments",
      "Roof leading edge & front overhang",
    ],
    benefits: [
      "Every painted surface protected — no exceptions",
      "Maximum resale value — comes off cleanly years later",
      "10-year manufacturer warranty on premium film",
    ],
    ideal: "New, luxury, or limited-edition RVs where the owner wants showroom finish for a decade.",
  },
];

const PackageCardPPF = ({ pkg }: { pkg: Package }) => {
  const accent = pkg.bestValue
    ? "border-urgency shadow-2xl shadow-urgency/15"
    : pkg.popular
    ? "border-primary shadow-xl shadow-primary/15"
    : "border-border hover:border-primary/40";

  return (
    <div className={`relative bg-card border-2 rounded-2xl p-6 sm:p-7 flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${accent}`}>
      {pkg.badge && (
        <div className={`absolute -top-3 left-1/2 -translate-x-1/2 font-heading font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full whitespace-nowrap z-10 ${pkg.bestValue ? "bg-urgency text-urgency-foreground" : "bg-primary text-primary-foreground"}`}>
          {pkg.badge}
        </div>
      )}

      {/* Coverage diagram */}
      <div className="rounded-xl bg-muted/40 border border-border/60 p-4 mb-5">
        <p className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground mb-2 text-center">
          Coverage Map
        </p>
        <RVCoverageDiagram level={pkg.coverageLevel} />
      </div>

      {/* Title + tagline */}
      <h3 className="font-heading font-black text-xl sm:text-2xl uppercase tracking-tight text-foreground mb-2 leading-tight">
        {pkg.name}
      </h3>
      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{pkg.tagline}</p>

      {/* Price + duration */}
      <div className="flex items-baseline justify-between mb-5 pb-5 border-b border-border/50">
        <span className="font-heading font-black text-3xl text-primary">{pkg.priceFrom}</span>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
          <Clock className="w-3.5 h-3.5" />
          {pkg.duration}
        </span>
      </div>

      {/* Coverage */}
      <div className="mb-5">
        <p className="text-[10px] font-heading font-bold uppercase tracking-widest text-primary mb-3 flex items-center gap-1.5">
          <Layers className="w-3 h-3" /> Areas Covered
        </p>
        <ul className="space-y-2">
          {pkg.coverage.map((c) => (
            <li key={c} className="flex items-start gap-2 text-sm text-foreground/85">
              <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Benefits */}
      <div className="mb-5 p-4 rounded-xl bg-primary/5 border border-primary/10">
        <p className="text-[10px] font-heading font-bold uppercase tracking-widest text-primary mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3 h-3" /> Why It Wins
        </p>
        <ul className="space-y-1.5">
          {pkg.benefits.map((b) => (
            <li key={b} className="text-sm text-foreground/85 flex items-start gap-2">
              <Star className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Ideal */}
      <div className="mb-6 text-xs text-muted-foreground italic leading-relaxed">
        <span className="font-heading font-bold text-foreground not-italic uppercase tracking-wider text-[10px] mr-1">Ideal for:</span>
        {pkg.ideal}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* CTA */}
      <a
        href={PHONE}
        className={`mt-auto inline-flex items-center justify-center gap-2 font-heading font-bold uppercase tracking-wider px-5 py-3.5 rounded-lg text-sm transition-all ${pkg.bestValue ? "bg-urgency text-urgency-foreground hover:bg-urgency/90 shadow-lg shadow-urgency/20" : "bg-primary text-primary-foreground hover:bg-brand-blue-deep shadow-lg shadow-primary/20"}`}
      >
        <Phone className="w-4 h-4" />
        Call for Free Quote
        <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  );
};

const RVPPF = () => {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <SEO
          title="RV Paint Protection Film Calgary"
          description="RV paint protection film in Calgary. Self-healing PPF for front caps, hoods, rockers & full wraps. Stop rock chips, bugs & UV damage. Call for a free quote."
          canonical="/trailer-rv/ppf"
          jsonLd={[
            buildServiceJsonLd(
              "RV Paint Protection Film (PPF)",
              "Premium paint protection film installation for RVs, motorhomes, travel trailers and 5th wheels in Calgary, Airdrie, Cochrane, Chestermere, Okotoks and Rocky View County.",
              "/trailer-rv/ppf"
            ),
            buildFAQJsonLd(faqs),
          ]}
        />
        <Navbar />
        <AutoBreadcrumbs />
        {/* HERO */}
        <section className="relative min-h-[560px] sm:min-h-[640px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center scale-105"
            style={{ backgroundImage: `url(${rvPPFHero})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/80 to-foreground/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-foreground/30" />

          <div className="relative z-10 container flex flex-col justify-end min-h-[560px] sm:min-h-[640px] pb-14 sm:pb-20 pt-32 px-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-primary/95 text-primary-foreground font-heading font-bold text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
                <Shield className="w-3 h-3" />
                Premium Self-Healing TPU Film
              </div>

              <h1 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl uppercase text-background leading-[1.05] mb-5">
                RV Paint Protection Film<br />
                <span className="text-primary">That Outlasts the Road</span>
              </h1>

              <p className="text-background/85 text-base sm:text-xl leading-relaxed mb-3 max-w-2xl">
                Stop rock chips, bug acid, and UV fade <span className="text-primary font-semibold">before</span> they cost you a $15,000 repaint. Calgary's specialist in RV, motorhome &amp; 5th wheel paint protection film.
              </p>
              <p className="text-background/65 text-sm sm:text-base mb-7 max-w-2xl">
                Mobile inspection &amp; install at our climate-controlled bay or your storage lot.
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                <a
                  href={PHONE}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-7 py-4 rounded-lg text-sm sm:text-base hover:bg-brand-blue-deep transition-colors shadow-xl shadow-primary/30"
                >
                  <Phone className="w-5 h-5" />
                  Call Now: {PHONE_DISPLAY}
                </a>
                <a
                  href="#packages"
                  className="inline-flex items-center gap-2 bg-background/10 backdrop-blur-sm border border-background/30 text-background font-heading font-bold uppercase tracking-wider px-7 py-4 rounded-lg text-sm sm:text-base hover:bg-background/20 transition-colors"
                >
                  View Packages
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Threat strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl">
                {threats.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 bg-background/10 backdrop-blur-sm border border-background/15 rounded-lg px-3 py-2">
                    <Icon className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-background/90 text-xs font-semibold">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TRUST STRIP */}
        <section className="bg-card border-b border-border py-6">
          <div className="container grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: Award, label: "10-Yr Film Warranty" },
              { icon: Shield, label: "Self-Healing TPU" },
              { icon: MapPin, label: "Calgary & Surrounding" },
              { icon: Clock, label: "Climate-Controlled Bay" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <Icon className="w-6 h-6 text-primary" />
                <span className="text-xs sm:text-sm font-semibold text-foreground">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* TRUSTED SUPPLIERS */}
        <section className="bg-background border-b border-border py-8">
          <div className="container px-6">
            <p className="text-center text-[10px] sm:text-xs font-heading font-bold uppercase tracking-[0.25em] text-muted-foreground mb-5">
              Trusted Film Suppliers
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14">
              <div className="flex items-center gap-2 text-foreground">
                <Shield className="w-5 h-5 text-primary" />
                <span className="font-heading font-black text-2xl sm:text-3xl tracking-tight">XPEL</span>
              </div>
              <div className="h-8 w-px bg-border hidden sm:block" />
              <div className="flex items-center gap-2 text-foreground">
                <Shield className="w-5 h-5 text-primary" />
                <span className="font-heading font-black text-2xl sm:text-3xl tracking-tight">3M</span>
                <span className="font-heading font-bold text-xs uppercase tracking-widest text-muted-foreground ml-1">
                  Scotchgard™
                </span>
              </div>
            </div>
            <p className="text-center text-xs text-muted-foreground mt-4 max-w-xl mx-auto">
              We install only premium, manufacturer-warrantied PPF from industry leaders Xpel and 3M.
            </p>
          </div>
        </section>

        {/* WHY PPF */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="container px-6">
            <ScrollReveal>
              <div className="text-center max-w-3xl mx-auto mb-12">
                <p className="text-primary font-heading font-bold text-xs uppercase tracking-widest mb-3">
                  The Math is Simple
                </p>
                <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl uppercase text-foreground leading-tight mb-4">
                  One Repaint Costs More Than<br />
                  <span className="text-primary">Protecting the Whole RV</span>
                </h2>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                  A single front-cap respray on a Class A motorhome runs <span className="font-bold text-foreground">$8,000–$20,000+</span>. PPF is a one-time investment that saves you that bill — and protects resale value for the next decade.
                </p>
              </div>
            </ScrollReveal>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {[
                {
                  icon: DollarSign,
                  title: "Save $10K+ vs. Repainting",
                  desc: "PPF costs a fraction of even a single panel respray — and protects the entire surface for 7–10+ years.",
                },
                {
                  icon: Zap,
                  title: "Self-Healing Film",
                  desc: "Light scratches and swirls disappear with sun heat or warm water. Your finish stays glass-clear.",
                },
                {
                  icon: Sun,
                  title: "Alberta UV Defense",
                  desc: "Stops the UV oxidation and chalking that kills RV gel coat after just a few summer seasons.",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <StaggerItem key={title}>
                  <div className="bg-card border border-border rounded-xl p-6 h-full hover:border-primary/40 hover:shadow-lg transition-all">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-heading font-black text-lg uppercase tracking-tight text-foreground mb-2">
                      {title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* PACKAGES */}
        <section id="packages" className="py-16 sm:py-20 bg-muted/30 border-y border-border">
          <div className="container px-6">
            <ScrollReveal>
              <div className="text-center max-w-3xl mx-auto mb-14">
                <div className="inline-flex items-center gap-2 bg-urgency/10 text-urgency font-heading font-bold text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
                  <AlertTriangle className="w-3 h-3" />
                  Limited Install Slots Per Month
                </div>
                <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl uppercase text-foreground leading-tight mb-4">
                  Choose Your Coverage
                </h2>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                  Every package uses premium self-healing TPU film with a 7–10 year manufacturer warranty. Coverage maps below show exactly what gets protected.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {packages.map((pkg) => (
                <ScrollReveal key={pkg.name} amount={0.05}>
                  <PackageCardPPF pkg={pkg} />
                </ScrollReveal>
              ))}
            </div>

            <div className="text-center mt-10">
              <p className="text-sm text-muted-foreground mb-4">
                Custom coverage or unsure which package fits your rig?
              </p>
              <a
                href={PHONE}
                className="inline-flex items-center gap-2 bg-foreground text-background font-heading font-bold uppercase tracking-wider px-7 py-3.5 rounded-lg text-sm hover:bg-foreground/90 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call for Custom Quote
              </a>
            </div>
          </div>
        </section>

        {/* COMPARISON TABLE */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="container px-6">
            <ScrollReveal>
              <div className="text-center max-w-3xl mx-auto mb-10">
                <p className="text-primary font-heading font-bold text-xs uppercase tracking-widest mb-3">
                  Side-by-Side Comparison
                </p>
                <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl uppercase text-foreground leading-tight mb-4">
                  Compare Every Package at a Glance
                </h2>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                  Exactly what each package covers, how long install takes, and who it's built for.
                </p>
              </div>
            </ScrollReveal>

            {(() => {
              const rows: { label: string; key: "front-cap" | "front-plus" | "high-impact" | "full-body" | "duration" | "price" | "warranty" }[] = [
                { label: "Front Cap / Nose", key: "front-cap" },
                { label: "Headlights & Marker Lights", key: "front-cap" },
                { label: "Hood / Front Cowl", key: "front-plus" },
                { label: "Side Mirrors & Arms", key: "front-plus" },
                { label: "A-Pillar Leading Edges", key: "front-plus" },
                { label: "Lower Rocker Panels", key: "high-impact" },
                { label: "Front & Rear Wheel Arches", key: "high-impact" },
                { label: "Slide-Out Edges & Faces", key: "high-impact" },
                { label: "Storage Door Edges", key: "high-impact" },
                { label: "Full Side Panels (Both Sides)", key: "full-body" },
                { label: "Rear Cap / Rear Wall", key: "full-body" },
                { label: "Roof Leading Edge & Overhang", key: "full-body" },
              ];
              const order: Array<Package["coverageLevel"]> = ["front-cap", "front-plus", "high-impact", "full-body"];
              const includes = (pkgLevel: Package["coverageLevel"], rowKey: typeof rows[number]["key"]) => {
                if (rowKey === "duration" || rowKey === "price" || rowKey === "warranty") return false;
                return order.indexOf(pkgLevel) >= order.indexOf(rowKey);
              };

              return (
                <div className="max-w-7xl mx-auto overflow-x-auto rounded-2xl border border-border bg-card shadow-lg">
                  <table className="w-full text-sm min-w-[760px]">
                    <thead>
                      <tr className="bg-muted/40 border-b-2 border-border">
                        <th className="text-left p-4 sm:p-5 font-heading font-black text-xs uppercase tracking-widest text-muted-foreground sticky left-0 bg-muted/40 z-10 min-w-[220px]">
                          Coverage Area
                        </th>
                        {packages.map((pkg) => (
                          <th
                            key={pkg.name}
                            className={`text-center p-4 sm:p-5 align-top ${
                              pkg.popular ? "bg-primary/5" : pkg.bestValue ? "bg-urgency/5" : ""
                            }`}
                          >
                            {pkg.badge && (
                              <span
                                className={`inline-block font-heading font-bold text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full mb-2 ${
                                  pkg.bestValue
                                    ? "bg-urgency text-urgency-foreground"
                                    : "bg-primary text-primary-foreground"
                                }`}
                              >
                                {pkg.badge}
                              </span>
                            )}
                            <div className="font-heading font-black text-sm sm:text-base uppercase text-foreground leading-tight">
                              {pkg.name}
                            </div>
                            <div className="font-heading font-black text-lg sm:text-xl text-primary mt-1">
                              {pkg.priceFrom}
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {/* Install Time row */}
                      <tr className="border-b border-border bg-muted/20">
                        <td className="p-4 font-heading font-bold uppercase text-xs tracking-wider text-foreground sticky left-0 bg-muted/20 z-10 flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary" />
                          Install Time
                        </td>
                        {packages.map((pkg) => (
                          <td
                            key={pkg.name}
                            className={`p-4 text-center font-bold text-foreground ${
                              pkg.popular ? "bg-primary/5" : pkg.bestValue ? "bg-urgency/5" : ""
                            }`}
                          >
                            {pkg.duration}
                          </td>
                        ))}
                      </tr>

                      {/* Coverage rows */}
                      {rows.map((row, i) => (
                        <tr key={row.label + i} className="border-b border-border/60 hover:bg-muted/20 transition-colors">
                          <td className="p-4 text-foreground/85 sticky left-0 bg-card hover:bg-muted/20 z-10">
                            {row.label}
                          </td>
                          {packages.map((pkg) => {
                            const yes = includes(pkg.coverageLevel, row.key);
                            return (
                              <td
                                key={pkg.name}
                                className={`p-4 text-center ${
                                  pkg.popular ? "bg-primary/5" : pkg.bestValue ? "bg-urgency/5" : ""
                                }`}
                              >
                                {yes ? (
                                  <CheckCircle className="w-5 h-5 text-primary mx-auto" aria-label="Included" />
                                ) : (
                                  <span className="inline-block w-4 h-0.5 bg-muted-foreground/30 rounded" aria-label="Not included" />
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}

                      {/* Warranty row */}
                      <tr className="border-b border-border bg-muted/20">
                        <td className="p-4 font-heading font-bold uppercase text-xs tracking-wider text-foreground sticky left-0 bg-muted/20 z-10 flex items-center gap-2">
                          <Shield className="w-4 h-4 text-primary" />
                          Film Warranty
                        </td>
                        {packages.map((pkg) => (
                          <td
                            key={pkg.name}
                            className={`p-4 text-center font-semibold text-foreground/85 ${
                              pkg.popular ? "bg-primary/5" : pkg.bestValue ? "bg-urgency/5" : ""
                            }`}
                          >
                            {pkg.coverageLevel === "full-body" ? "10 Years" : "7 Years"}
                          </td>
                        ))}
                      </tr>

                      {/* CTA row */}
                      <tr>
                        <td className="p-4 sticky left-0 bg-card z-10" />
                        {packages.map((pkg) => (
                          <td
                            key={pkg.name}
                            className={`p-4 text-center ${
                              pkg.popular ? "bg-primary/5" : pkg.bestValue ? "bg-urgency/5" : ""
                            }`}
                          >
                            <a
                              href={PHONE}
                              className={`inline-flex items-center justify-center gap-1.5 font-heading font-bold uppercase tracking-wider px-3 py-2 rounded-lg text-[11px] transition-all whitespace-nowrap ${
                                pkg.bestValue
                                  ? "bg-urgency text-urgency-foreground hover:bg-urgency/90"
                                  : "bg-primary text-primary-foreground hover:bg-brand-blue-deep"
                              }`}
                            >
                              <Phone className="w-3 h-3" />
                              Call
                            </a>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              );
            })()}

            <p className="text-center text-xs text-muted-foreground mt-6">
              Swipe horizontally on mobile to compare all packages. Final coverage and pricing confirmed during free in-person inspection.
            </p>
          </div>
        </section>

        {/* PROCESS */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="container px-6">
            <ScrollReveal>
              <div className="text-center max-w-2xl mx-auto mb-12">
                <p className="text-primary font-heading font-bold text-xs uppercase tracking-widest mb-3">
                  Our Process
                </p>
                <h2 className="font-heading font-black text-3xl sm:text-4xl uppercase text-foreground leading-tight">
                  Engineered for Long-Term Protection
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 max-w-6xl mx-auto">
              {[
                { n: "01", t: "Free Inspection", d: "We assess your RV's surfaces, oxidation level, and recommend a coverage plan." },
                { n: "02", t: "Decon & Polish", d: "Surfaces are decontaminated and gently polished for perfect film adhesion." },
                { n: "03", t: "Precision Install", d: "Computer-cut or custom-templated film, installed in a dust-controlled bay." },
                { n: "04", t: "Cure & QC", d: "Film cures 24–48 hrs, then a final inspection before your rig leaves." },
              ].map(({ n, t, d }) => (
                <div key={n} className="relative bg-card border border-border rounded-xl p-6 hover:border-primary/40 transition-colors">
                  <div className="absolute -top-3 -left-3 w-12 h-12 rounded-xl bg-primary text-primary-foreground font-heading font-black text-lg flex items-center justify-center shadow-lg">
                    {n}
                  </div>
                  <h3 className="font-heading font-black text-base uppercase tracking-tight text-foreground mb-2 mt-4">
                    {t}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-16 sm:py-20 bg-foreground">
          <div className="container px-6 text-center max-w-3xl">
            <h2 className="font-heading font-black text-3xl sm:text-5xl uppercase text-background leading-tight mb-4">
              Ready to Protect Your <span className="text-primary">Investment?</span>
            </h2>
            <p className="text-background/70 text-base sm:text-lg mb-8 leading-relaxed">
              Free in-person quote. No-pressure assessment. We'll show you exactly what coverage your rig needs — and what it'll save you long-term.
            </p>
            <a
              href={PHONE}
              className="inline-flex items-center gap-3 bg-primary text-primary-foreground font-heading font-black uppercase tracking-wider px-8 py-4 sm:px-10 sm:py-5 rounded-xl text-base sm:text-lg hover:bg-brand-blue-deep transition-colors shadow-2xl shadow-primary/40"
            >
              <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
              Call {PHONE_DISPLAY}
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            <p className="text-background/50 text-xs mt-4 uppercase tracking-wider font-semibold">
              Calgary · Airdrie · Cochrane · Chestermere · Okotoks · Rocky View County
            </p>
          </div>
        </section>

        <ServiceFAQ title="RV PPF — Frequently Asked Questions" faqs={faqs} />
        <Footer />
      </div>
    </PageTransition>
  );
};

export default RVPPF;
