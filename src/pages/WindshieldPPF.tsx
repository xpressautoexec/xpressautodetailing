import { useState, useRef, useCallback, useMemo } from "react";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import ServicePageHero from "@/components/ServicePageHero";
import ServiceFAQ from "@/components/ServiceFAQ";
import TrustStats from "@/components/TrustStats";
import SEO, { buildServiceJsonLd, buildFAQJsonLd } from "@/components/SEO";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import {
  Shield,
  Zap,
  Eye,
  DollarSign,
  Sun,
  Droplets,
  Check,
  Phone,
  ArrowRight,
  Car,
  Truck,
  Caravan,
  Sparkles,
  AlertTriangle,
  CalendarCheck,
} from "lucide-react";
import windshieldHero from "@/assets/windshield-ppf-hero.jpg";
import windshieldCracked from "@/assets/windshield-cracked.jpg";
import windshieldProtected from "@/assets/windshield-protected.jpg";
import windshieldSedan from "@/assets/windshield-ppf-sedan.jpg";
import windshieldSuv from "@/assets/windshield-ppf-suv.jpg";
import windshieldTruck from "@/assets/windshield-ppf-truck.jpg";
import windshieldRv from "@/assets/windshield-ppf-rv.jpg";

const BOOKING_URL = "https://xpressauto.fieldd.co/";

const faqs = [
  {
    q: "How does Windshield PPF actually protect against rock chips?",
    a: "Our windshield protection film is a 6–8 mil-thick optically clear polyurethane that absorbs and disperses impact energy before it reaches the glass. Most rock chips that would normally crack your windshield instead bounce off the film harmlessly.",
  },
  {
    q: "Will it affect visibility or wiper function?",
    a: "No. The film is optically clear (over 99% light transmission), self-healing under heat, and engineered to work seamlessly with factory wipers, rain sensors, ADAS cameras, and HUD displays.",
  },
  {
    q: "How long does Windshield PPF last?",
    a: "It's a true one-and-done install — our film is engineered to last up to 10 years on the glass with proper care, well past the time most owners keep their vehicle.",
  },
  {
    q: "Can it be removed without damaging the glass?",
    a: "Yes — it's designed to be removed cleanly with no residue or damage to your OEM windshield, even years later.",
  },
  {
    q: "Why is it cheaper than replacing my windshield?",
    a: "A typical windshield replacement runs $350–$800 in Calgary depending on the vehicle and any ADAS recalibration. The real savings come from prevention — most clients would otherwise replace their windshield 2–3 times over the life of the vehicle. One PPF install lasts up to 10 years and prevents every chip in between.",
  },
  {
    q: "Does insurance cover it?",
    a: "Most comprehensive policies don't cover PPF directly, but every prevented windshield claim helps keep your premium and deductible intact. Many clients install it after a single claim to avoid going through it again.",
  },
];



type VehicleSize = {
  id: string;
  label: string;
  description: string;
  price: number;
  installTime: string;
  icon: typeof Car;
  examples: string;
  image: string;
};

const vehicleSizes: VehicleSize[] = [
  {
    id: "compact",
    label: "Compact / Sedan",
    description: "Smaller windshield surface area",
    price: 449,
    installTime: "2–3 hrs",
    icon: Car,
    examples: "Honda Civic · Toyota Corolla · Mazda 3 · Tesla Model 3",
    image: windshieldSedan,
  },
  {
    id: "midsize",
    label: "Midsize SUV / Crossover",
    description: "Standard SUV and most crossovers",
    price: 549,
    installTime: "3–4 hrs",
    icon: Car,
    examples: "RAV4 · CR-V · Tucson · Model Y · Outback",
    image: windshieldSuv,
  },
  {
    id: "fullsize",
    label: "Full-Size SUV / Truck",
    description: "Trucks and large SUVs",
    price: 649,
    installTime: "3–4 hrs",
    icon: Truck,
    examples: "F-150 · Silverado · Tahoe · Suburban · RAM 1500",
    image: windshieldTruck,
  },
  {
    id: "heavy",
    label: "HD Truck / Van / RV",
    description: "Heavy-duty trucks, work vans, motorhomes",
    price: 849,
    installTime: "4–5 hrs",
    icon: Caravan,
    examples: "F-250/350 · Sprinter · Transit · Class A & C RVs",
    image: windshieldRv,
  },
];

/* ---------------- Before / After slider ---------------- */

interface BAProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
}

const WindshieldBeforeAfter = ({ beforeSrc, afterSrc, beforeAlt, afterAlt }: BAProps) => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] sm:aspect-video rounded-2xl overflow-hidden cursor-col-resize select-none shadow-2xl border border-border"
      onPointerDown={(e) => {
        isDragging.current = true;
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        updatePosition(e.clientX);
      }}
      onPointerMove={(e) => {
        if (!isDragging.current) return;
        updatePosition(e.clientX);
      }}
      onPointerUp={() => {
        isDragging.current = false;
      }}
      role="slider"
      aria-label="Cracked vs PPF-protected windshield comparison"
      aria-valuenow={Math.round(position)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <img src={afterSrc} alt={afterAlt} className="absolute inset-0 w-full h-full object-cover" draggable={false} />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
        <img
          src={beforeSrc}
          alt={beforeAlt}
          className="absolute inset-0 h-full object-cover"
          style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : "100vw", maxWidth: "none" }}
          draggable={false}
        />
      </div>
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-primary-foreground z-10 shadow-[0_0_20px_rgba(255,255,255,0.5)]"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-primary-foreground shadow-xl flex items-center justify-center ring-4 ring-primary/30">
          <svg width="22" height="22" viewBox="0 0 20 20" fill="none" className="text-brand-dark">
            <path d="M7 4L3 10L7 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13 4L17 10L13 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <span className="absolute top-4 left-4 bg-urgency text-urgency-foreground font-heading font-bold text-xs px-3 py-1.5 rounded z-20 flex items-center gap-1.5">
        <AlertTriangle className="w-3 h-3" /> Unprotected
      </span>
      <span className="absolute top-4 right-4 bg-primary text-primary-foreground font-heading font-bold text-xs px-3 py-1.5 rounded z-20 flex items-center gap-1.5">
        <Shield className="w-3 h-3" /> PPF Protected
      </span>
    </div>
  );
};

/* ---------------- Page ---------------- */

const WindshieldPPF = () => {
  const [selectedSize, setSelectedSize] = useState<string>("midsize");

  const selected = useMemo(
    () => vehicleSizes.find((v) => v.id === selectedSize) ?? vehicleSizes[1],
    [selectedSize],
  );

  const benefits = [
    {
      icon: Shield,
      title: "Stops Rock Chips",
      desc: "Absorbs impact from highway debris before it reaches your glass.",
    },
    {
      icon: DollarSign,
      title: "One & Done — Up to 10 Yrs",
      desc: "Skip $350–$800 windshield replacements two or three times over the life of your vehicle.",
    },
    {
      icon: Eye,
      title: "Optically Clear",
      desc: "99%+ light transmission — invisible once installed.",
    },
    {
      icon: Sparkles,
      title: "Self-Healing",
      desc: "Light scratches and swirls disappear with sun and warm water.",
    },
    {
      icon: Sun,
      title: "UV & Heat Resistant",
      desc: "Won't yellow, bubble, or peel under Calgary sun and extreme cold.",
    },
    {
      icon: Droplets,
      title: "Hydrophobic Surface",
      desc: "Rain beads off — better visibility and easier cleaning.",
    },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen">
        <SEO
          title="Windshield PPF Calgary"
          description="Windshield protection film in Calgary. Lasts up to 10 years, prevents $350-$800 replacements, ADAS-safe install. One-and-done. Pricing by vehicle size."
          canonical="/windshield-ppf"
          jsonLd={[
            buildServiceJsonLd(
              "Windshield Paint Protection Film",
              "Optically clear self-healing windshield protection film professionally installed in Calgary.",
              "/windshield-ppf",
            ),
            buildFAQJsonLd(faqs),
          ]}
        />
        <Navbar />
        <AutoBreadcrumbs />
        <ServicePageHero
          title="Windshield PPF Rock Chip Defense"
          image={windshieldHero}
          ctaType="call"
        />
        <TrustStats />

        {/* Intro */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="container max-w-4xl text-center px-6">
            <ScrollReveal>
              
              <h2 className="font-heading font-semibold text-2xl sm:text-3xl md:text-4xl text-foreground mb-6">
                One Install. Up to 10 Years of Protection.
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-5 text-sm sm:text-base">
                A windshield replacement in Calgary typically runs <strong className="text-foreground">$350–$800</strong> depending on your vehicle, glass type, and ADAS recalibration. The problem isn't one replacement — it's the second and third one. On Deerfoot, Stoney, and the QEII, it's not <em>if</em> a rock chips your glass, it's <em>when</em>.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                Windshield PPF is a true one-and-done solution. An optically clear, self-healing 6–8 mil polyurethane film professionally laid over your factory glass — engineered to last <strong className="text-foreground">up to 10 years</strong>. It absorbs and disperses every rock, gravel and ice strike, so a hit that would have cracked your windshield instead bounces off harmlessly. One install, every chip prevented.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Before / After comparison */}
        <section className="py-16 sm:py-20 bg-muted/30">
          <div className="container max-w-5xl px-4 sm:px-6">
            <ScrollReveal>
              
              <h2 className="font-heading font-semibold text-2xl sm:text-3xl md:text-4xl text-foreground text-center mb-4">
                See What PPF Prevents
              </h2>
              <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10 text-sm sm:text-base">
                Drag the slider — the unprotected windshield on the left is exactly what one piece of highway gravel can do. The right side shows a windshield with our PPF: clear, intact, hydrophobic.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <WindshieldBeforeAfter
                beforeSrc={windshieldCracked}
                afterSrc={windshieldProtected}
                beforeAlt="Cracked unprotected windshield with rock chip damage and spider-web fractures"
                afterAlt="Crystal-clear windshield protected with paint protection film, water beading off"
              />
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              <div className="rounded-xl border border-urgency/20 bg-urgency/5 p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-urgency" />
                  <h3 className="font-heading font-bold text-foreground text-sm">Without PPF</h3>
                </div>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  <li>· Cracks from $5 of highway gravel</li>
                  <li>· $350–$800 per replacement</li>
                  <li>· 2–3 replacements over the life of your vehicle</li>
                  <li>· Possible ADAS recalibration each time</li>
                  <li>· Days off the road + insurance hassle</li>
                </ul>
              </div>
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <h3 className="font-heading font-bold text-foreground text-sm">With Our PPF</h3>
                </div>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  <li>· Rock chips bounce off the film</li>
                  <li>· OEM glass stays intact — up to 10 years</li>
                  <li>· One install, every future chip prevented</li>
                  <li>· Self-heals minor scratches with heat</li>
                  <li>· No insurance claims, no downtime</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits grid */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="container max-w-6xl px-4 sm:px-6">
            <ScrollReveal>
              <h2 className="font-heading font-semibold text-2xl sm:text-3xl md:text-4xl text-foreground text-center mb-4">
                Why Drivers Are Choosing Windshield PPF
              </h2>
              <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12 text-sm sm:text-base">
                Six measurable advantages over leaving your factory glass exposed.
              </p>
            </ScrollReveal>
            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.07}>
              {benefits.map((b) => (
                <StaggerItem key={b.title}>
                  <div className="h-full rounded-xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-lg transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <b.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-heading font-bold text-foreground text-base mb-2">{b.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Pricing calculator */}
        <section className="py-16 sm:py-20 bg-muted/30">
          <div className="container max-w-5xl px-4 sm:px-6">
            <ScrollReveal>
              
              <h2 className="font-heading font-semibold text-2xl sm:text-3xl md:text-4xl text-foreground text-center mb-4">
                Pick Your Vehicle Size
              </h2>
              <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10 text-sm sm:text-base">
                Pricing scales with windshield surface area. No hidden fees — what you see here is what you pay.
              </p>
            </ScrollReveal>

            {/* Vehicle selector */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
              {vehicleSizes.map((v) => {
                const Icon = v.icon;
                const active = v.id === selectedSize;
                return (
                  <button
                    key={v.id}
                    onClick={() => setSelectedSize(v.id)}
                    className={`text-left rounded-xl p-4 sm:p-5 border-2 transition-all duration-200 ${
                      active
                        ? "border-primary bg-primary/5 shadow-lg shadow-primary/10 -translate-y-0.5"
                        : "border-border bg-card hover:border-primary/40"
                    }`}
                    aria-pressed={active}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                        active ? "bg-primary text-primary-foreground" : "bg-muted text-foreground/70"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <p className="font-heading font-bold text-xs sm:text-sm text-foreground leading-tight mb-1">
                      {v.label}
                    </p>
                    <p className="text-xs text-muted-foreground leading-snug">{v.description}</p>
                  </button>
                );
              })}
            </div>

            {/* Live quote card */}
            <div className="rounded-2xl overflow-hidden border border-border shadow-xl bg-card">
              {/* Dynamic vehicle image preview */}
              <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-foreground overflow-hidden">
                <img
                  key={selected.id}
                  src={selected.image}
                  alt={`${selected.label} with windshield PPF applied`}
                  loading="lazy"
                  width={1280}
                  height={896}
                  className="absolute inset-0 w-full h-full object-cover animate-in fade-in duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/10 to-transparent" />
                <span className="absolute top-4 left-4 bg-primary text-primary-foreground font-heading font-bold text-[10px] px-3 py-1.5 rounded flex items-center gap-1.5">
                  <Shield className="w-3 h-3" /> PPF Applied
                </span>
                <div className="absolute bottom-4 left-4 right-4 text-background">
                  <p className="font-heading font-semibold text-base sm:text-lg">{selected.label}</p>
                  <p className="text-xs sm:text-sm opacity-80">{selected.examples}</p>
                </div>
              </div>

              <div className="bg-primary text-primary-foreground px-6 sm:px-10 py-7 sm:py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="font-heading font-bold text-xs opacity-80 mb-1">
                    Your Quote
                  </p>
                  <p className="font-heading font-semibold text-xl sm:text-2xl leading-tight">{selected.label}</p>
                  <p className="text-xs sm:text-sm opacity-80 mt-1">Install: {selected.installTime} · Lasts up to 10 years</p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="font-heading font-semibold text-4xl sm:text-5xl leading-none">${selected.price}</p>
                  <p className="text-xs opacity-80 mt-1">One-Time · No Subscription</p>
                </div>
              </div>

              <div className="p-6 sm:p-10">
                <p className="text-[10px] font-heading font-bold text-muted-foreground mb-4">
                  What's Included
                </p>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3 mb-8">
                  {[
                    "Premium 6–8 mil optically clear PPF",
                    "Pre-install glass decontamination & polish",
                    "Custom-cut for your exact windshield",
                    "Edge sealing for long-term durability",
                    "Rain sensor, ADAS & HUD compatibility check",
                    "Hydrophobic top-layer activation",
                    "Lasts up to 10 years — one-and-done",
                    "Aftercare guide & maintenance kit",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <div className="w-5 h-5 rounded-full bg-success/15 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-success" />
                      </div>
                      <span className="text-foreground/80">{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="tel:5875004523"
                    className="group flex-1 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-heading font-bold px-6 py-4 rounded-xl text-sm hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/20"
                  >
                    <Phone className="w-4 h-4" />
                    Call to Book — ${selected.price}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a
                    href="tel:5875004523"
                    className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary font-heading font-bold px-6 py-4 rounded-xl text-sm hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    <Phone className="w-4 h-4" />
                    587-500-4523
                  </a>
                </div>

                <p className="text-xs text-muted-foreground text-center mt-5">
                  Final price confirmed at drop-off based on exact windshield dimensions. Heated glass, panoramic and oversized windshields may be subject to a small surcharge.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="container max-w-5xl px-4 sm:px-6">
            <ScrollReveal>
              <h2 className="font-heading font-semibold text-2xl sm:text-3xl md:text-4xl text-foreground text-center mb-12">
                Our 4-Step Install Process
              </h2>
            </ScrollReveal>
            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" staggerDelay={0.08}>
              {[
                { n: "01", icon: Droplets, t: "Decontaminate", d: "Glass is washed, clay-barred and IPA-wiped to remove every contaminant before film touches the surface." },
                { n: "02", icon: Eye, t: "Custom Pattern", d: "Computer-cut template precisely matches your make, model and year — including sensor cut-outs." },
                { n: "03", icon: Zap, t: "Precision Install", d: "Film is squeegeed flat in a controlled environment with zero dust, lint or air bubbles." },
                { n: "04", icon: Shield, t: "Cure & Seal", d: "Edges are sealed and the film is given 24 hours to fully bond before pickup." },
              ].map((s) => (
                <StaggerItem key={s.n}>
                  <div className="relative h-full rounded-xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-lg transition-all">
                    <span className="absolute top-4 right-5 font-heading font-semibold text-3xl text-primary/15">{s.n}</span>
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <s.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-heading font-bold text-foreground text-base mb-2">{s.t}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.d}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ROI block */}
        <section className="py-16 sm:py-20 bg-foreground">
          <div className="container max-w-4xl px-4 sm:px-6 text-center">
            <ScrollReveal>
              
              <h2 className="font-heading font-semibold text-2xl sm:text-3xl md:text-4xl text-background mb-6">
                Pay Once. Skip Replacement After Replacement.
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 mt-10">
                <div className="rounded-xl border border-background/10 bg-background/5 p-6">
                  <p className="font-heading font-semibold text-3xl sm:text-4xl text-primary mb-1">$1,650</p>
                  <p className="text-background/70 text-xs">3 Replacements Over 10 Yrs ($350–$800 ea.)</p>
                </div>
                <div className="rounded-xl border border-primary/40 bg-primary/10 p-6">
                  <p className="font-heading font-semibold text-3xl sm:text-4xl text-primary mb-1">${selected.price}</p>
                  <p className="text-background/70 text-xs">One PPF Install · Up to 10 Years</p>
                </div>
                <div className="rounded-xl border border-background/10 bg-background/5 p-6">
                  <p className="font-heading font-semibold text-3xl sm:text-4xl text-success mb-1">${Math.max(0, 1650 - selected.price).toLocaleString()}</p>
                  <p className="text-background/70 text-xs">Net Savings + Zero Downtime</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Testimonials */}

        {/* FAQ */}
        <ServiceFAQ
          faqs={faqs}
          title="Windshield PPF — Common Questions"
        />

        {/* Final CTA */}
        <section className="py-16 sm:py-20 bg-primary">
          <div className="container max-w-3xl text-center px-6">
            <h2 className="font-heading font-semibold text-2xl sm:text-3xl md:text-4xl text-primary-foreground mb-5">
              One Rock Chip Pays for It. The Next Hundred Are Free.
            </h2>
            <p className="text-primary-foreground/85 mb-8 text-sm sm:text-base">
              Book your install today — slots fill fast in spring and fall when gravel season peaks on Calgary highways.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 bg-primary-foreground text-primary font-heading font-bold px-8 py-4 rounded-xl text-sm hover:bg-primary-foreground/90 transition-all"
              >
                <CalendarCheck className="w-4 h-4" />
                Book Online
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="tel:5875004523"
                className="inline-flex items-center justify-center gap-2 border-2 border-primary-foreground text-primary-foreground font-heading font-bold px-8 py-4 rounded-xl text-sm hover:bg-primary-foreground hover:text-primary transition-all"
              >
                <Phone className="w-4 h-4" />
                587-500-4523
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default WindshieldPPF;
