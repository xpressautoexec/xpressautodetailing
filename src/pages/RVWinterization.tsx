import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceFAQ from "@/components/ServiceFAQ";
import SEO, { buildServiceJsonLd, buildFAQJsonLd } from "@/components/SEO";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { Snowflake, Sun, CheckCircle, ArrowRight, Phone, Wrench, Droplets, Shield, Clock, MapPin, Sparkles, AlertTriangle, ThermometerSnowflake, DollarSign, Home, Calendar, Truck } from "lucide-react";
import rvHero from "@/assets/rv-hero.jpg";
import rvProcessImg from "@/assets/gallery-rv-oxidation-correction.jpg";
import rvDamageImg from "@/assets/rv-frozen-damage.jpg";

const BOOKING_URL = "https://xpressauto.fieldd.co/";

const faqs = [
  { q: "When should I winterize my RV in Calgary?", a: "We recommend winterizing before the first hard freeze — typically mid-to-late October. Booking early in October ensures availability before the rush." },
  { q: "When should I de-winterize my RV?", a: "Most Calgary owners de-winterize between mid-April and mid-May, once overnight temperatures stay above freezing. Book 2–3 weeks ahead of your first trip." },
  { q: "Do you come to my storage lot?", a: "Yes — we service RVs and trailers at storage facilities, driveways, and acreages across Calgary, Airdrie, Cochrane, and Chestermere. We bring everything needed." },
  { q: "How does per-foot pricing work?", a: "Exterior and interior detailing on RVs is priced by length so you only pay for the size of your rig. Bundle with a winterization or de-winterization and your per-foot rate drops." },
  { q: "What's included in winterization?", a: "We blow out the water lines with compressed air, drain fresh/grey/black tanks, bypass the water heater, add RV-safe antifreeze through the system, and protect all plumbing." },
  { q: "Do you use RV-safe antifreeze?", a: "Always. We use non-toxic, pink RV/marine antifreeze that's safe for potable water systems. Never automotive antifreeze." },
];

type Tier = {
  title: string;
  basePrice: string;
  icon: typeof Snowflake;
  desc: string;
  popular?: boolean;
  bestValue?: boolean;
  badge?: string;
  pricing: { label: string; original?: string; bundle: string }[];
  features: string[];
  smartLine?: string;
  pushLine?: string;
};

const tiers: Tier[] = [
  {
    title: "Essential Service",
    basePrice: "$164.99",
    icon: Snowflake,
    desc: "Core plumbing protection or spring start-up. The minimum your RV needs to survive — or wake up from — Calgary winter. RV-safe antifreeze included.",
    pricing: [
      { label: "Up to 35 ft", bundle: "$164.99" },
      { label: "Over 35 ft", bundle: "$184.99" },
    ],
    features: [
      "Full water system drain or flush",
      "RV-safe antifreeze included (non-toxic)",
      "Water line blowout / system reactivation",
      "Water heater bypass & tank protection",
      "Basic plumbing system check",
    ],
  },
  {
    title: "Winter Protection Package",
    basePrice: "$164.99 + $7/ft",
    icon: Shield,
    popular: true,
    badge: "Most Popular",
    desc: "Bundle your service with a full exterior wash and lock in a discounted per-foot rate. Prevents oxidation, staining, and storage buildup.",
    pricing: [
      { label: "Base Service (≤35 ft)", bundle: "$164.99" },
      { label: "Base Service (>35 ft)", bundle: "$184.99" },
      { label: "Exterior Wash (per ft)", original: "$9/ft", bundle: "$7/ft" },
    ],
    features: [
      "Everything in Essential Service",
      "Full exterior hand wash (roof, sides, wheels)",
      "Black streak treatment on sidewalls",
      "Tire dressing & wheel well clean",
      "Prepares RV for storage or season start",
      "Helps prevent oxidation, staining & buildup",
    ],
    smartLine: "Upgrade to full interior + exterior for only a small jump per foot — huge value on most RVs.",
  },
  {
    title: "Full Season Ready Package",
    basePrice: "$164.99 + $16/ft",
    icon: Sparkles,
    bestValue: true,
    badge: "Best Value",
    desc: "The complete reset. Service plus combined exterior + interior detail bundled at our deepest per-foot discount.",
    pricing: [
      { label: "Base Service (≤35 ft)", bundle: "$164.99" },
      { label: "Base Service (>35 ft)", bundle: "$184.99" },
      { label: "Exterior + Interior Detail (per ft)", original: "$19/ft", bundle: "$16/ft" },
    ],
    features: [
      "Everything in Winter Protection Package",
      "Full interior vacuum & wipe down",
      "Kitchen deep clean & sanitization",
      "Bathroom deep clean & sanitization",
      "Cabinets, drawers & surface wipe",
      "Odor reset & freshness treatment",
      "Pre-trip / post-storage readiness check",
    ],
    pushLine: "Most customers choose this to fully reset their RV and avoid booking multiple services later.",
  },
];

const TierCard = ({ tier }: { tier: Tier }) => {
  const Icon = tier.icon;
  const accent = tier.bestValue ? "border-urgency shadow-xl shadow-urgency/10" : tier.popular ? "border-primary shadow-lg shadow-primary/10" : "border-border hover:border-primary/40";
  return (
    <div className={`relative bg-card border-2 rounded-xl p-6 sm:p-7 flex flex-col h-full transition-all duration-300 hover:shadow-xl ${accent}`}>
      {tier.badge && (
        <div className={`absolute -top-3 left-1/2 -translate-x-1/2 font-heading font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full whitespace-nowrap ${tier.bestValue ? "bg-urgency text-urgency-foreground" : "bg-primary text-primary-foreground"}`}>
          {tier.badge}
        </div>
      )}

      <div className="flex items-center gap-3 mb-4">
        <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <h3 className="font-heading font-black text-lg uppercase tracking-tight text-foreground">{tier.title}</h3>
      </div>

      <p className="text-muted-foreground text-sm mb-5 leading-relaxed">{tier.desc}</p>

      {/* Pricing breakdown */}
      {(() => {
        const baseRows = tier.pricing.filter((p) => !p.original);
        const addOnRows = tier.pricing.filter((p) => p.original);
        return (
          <div className="mb-5 rounded-xl border border-border/60 overflow-hidden">
            {/* Base price section */}
            <div className="bg-primary/5 px-4 py-3">
              <p className="text-[10px] font-heading font-bold uppercase tracking-widest text-primary mb-2">
                Winterization / De-Winterization Price
              </p>
              <ul className="space-y-1.5">
                {baseRows.map((p) => (
                  <li key={p.label} className="flex items-center justify-between text-sm">
                    <span className="text-foreground/80">{p.label.replace(/^Base Service\s*/, "").replace(/[()]/g, "") || p.label}</span>
                    <span className="font-heading font-black text-primary text-base">{p.bundle}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Add-on per-foot section */}
            {addOnRows.length > 0 && (
              <div className="bg-urgency/5 border-t border-border/60 px-4 py-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] font-heading font-bold uppercase tracking-widest text-urgency">
                    Bundle &amp; Save
                  </p>
                  <span className="text-[10px] font-heading font-black uppercase tracking-wider bg-urgency text-urgency-foreground px-2 py-0.5 rounded">
                    Save {tier.bestValue ? "$3/ft" : "$2/ft"}
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {addOnRows.map((p) => (
                    <li key={p.label} className="flex items-center justify-between text-sm gap-2">
                      <span className="text-foreground/80 leading-tight">{p.label.replace(/\s*\(per ft\)/, "")}</span>
                      <span className="flex items-baseline gap-1.5 shrink-0">
                        <span className="text-muted-foreground/60 line-through text-xs">{p.original}</span>
                        <span className="font-heading font-black text-primary text-base">{p.bundle}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })()}

      {tier.smartLine && (
        <div className="mb-5 p-3 rounded-lg bg-primary/5 border border-primary/15 text-xs text-primary font-semibold leading-relaxed">
          {tier.smartLine}
        </div>
      )}

      {tier.pushLine && (
        <div className="mb-5 p-3 rounded-lg bg-urgency/10 border border-urgency/30 text-xs text-foreground font-semibold leading-relaxed">
          <span className="text-urgency font-heading font-black uppercase tracking-wider mr-1">Top Pick:</span>
          {tier.pushLine}
        </div>
      )}

      <ul className="space-y-2.5 mb-6 flex-grow">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-foreground/80">
            <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

              <a
                href="tel:5875004523"
                className={`mt-auto inline-flex items-center justify-center gap-2 font-heading font-bold uppercase tracking-wider px-5 py-3 rounded-lg text-sm transition-colors ${tier.bestValue ? "bg-urgency text-urgency-foreground hover:bg-urgency/90" : "bg-primary text-primary-foreground hover:bg-brand-blue-deep"}`}
              >
                <Phone className="w-4 h-4" />
                Call to Book
              </a>
    </div>
  );
};

const RVWinterization = () => {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <SEO
          title="RV Winterization & De-Winterization Calgary — From $164.99"
          description="Mobile RV winterization & spring start-up in Calgary, Airdrie, Cochrane & Chestermere. RV-safe antifreeze. Bundle with detailing for discounted per-foot rates."
          canonical="/trailer-rv/winterization"
          jsonLd={[
            buildServiceJsonLd("RV Winterization & De-Winterization", "Mobile RV winterization and de-winterization service in Calgary with bundled detailing discounts.", "/trailer-rv/winterization"),
            buildFAQJsonLd(faqs),
          ]}
        />
        <Navbar />

        {/* Hero */}
        <section className="relative min-h-[460px] sm:min-h-[520px] overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${rvHero})` }} />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/75 to-foreground/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />

          <div className="relative z-10 container flex flex-col justify-end min-h-[460px] sm:min-h-[520px] pb-12 sm:pb-16 pt-28 px-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-urgency/90 text-urgency-foreground font-heading font-bold text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
                <AlertTriangle className="w-3 h-3" />
                Limited Seasonal Availability
              </div>
              <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl uppercase text-background leading-[1.1] mb-4">
                RV Winterization &<br />
                <span className="text-primary">De-Winterization</span>
              </h1>
              <p className="text-background/75 text-base sm:text-lg leading-relaxed mb-3 max-w-xl">
                Protect your RV from Calgary's brutal winters — or get it camp-ready in spring. Mobile service straight to your driveway or storage lot.
              </p>
              <p className="text-primary font-heading font-bold text-sm uppercase tracking-wider mb-6">
                Bundle &amp; save vs booking services individually
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="tel:5875004523"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-6 py-3.5 rounded-lg text-sm hover:bg-brand-blue-deep transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call Now: 587-500-4523
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Trust strip */}
        <section className="bg-card border-b border-border py-6">
          <div className="container grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: MapPin, label: "Mobile — We Come to You" },
              { icon: Clock, label: "Same-Week Availability" },
              { icon: Shield, label: "RV-Safe Antifreeze Only" },
              { icon: Sparkles, label: "Bundle Discounts Applied" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-2">
                <item.icon className="w-5 h-5 text-primary" />
                <span className="font-heading font-semibold text-xs uppercase tracking-wider text-foreground/80">{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Tiers */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="container">
            <ScrollReveal>
              <div className="text-center max-w-2xl mx-auto mb-12">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-heading font-bold text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
                  <Droplets className="w-3 h-3" />
                  Fall &amp; Spring Service
                </div>
                <h2 className="font-heading font-black text-3xl sm:text-4xl uppercase text-foreground mb-4">
                  Pick Your Bundle &amp; Save
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed mb-4">
                  One fixed base service fee. Bundle exterior or interior detailing and your per-foot rate drops automatically — no coupon code needed.
                </p>
                <div className="inline-flex items-center gap-2 bg-success/10 text-success font-heading font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-full">
                  <CheckCircle className="w-3.5 h-3.5" />
                  RV-Safe Antifreeze Included in Every Package
                </div>
              </div>
            </ScrollReveal>

            <StaggerContainer className="grid md:grid-cols-3 gap-6 md:gap-7 pt-3">
              {tiers.map((tier) => (
                <StaggerItem key={tier.title}>
                  <TierCard tier={tier} />
                </StaggerItem>
              ))}
            </StaggerContainer>

            <div className="mt-10 max-w-3xl mx-auto bg-urgency/5 border border-urgency/20 rounded-xl p-5 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-urgency shrink-0 mt-0.5" />
              <div>
                <p className="font-heading font-bold text-sm uppercase tracking-wider text-foreground mb-1">
                  Limited Seasonal Availability
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Book early before freezing temperatures hit. Fall winterization spots fill fast through October — spring de-winterization slots book up by mid-April.
                </p>
              </div>
            </div>

            <p className="text-center text-muted-foreground text-xs mt-8 max-w-xl mx-auto">
              Per-foot pricing applies to exterior length of your travel trailer, 5th wheel, or motorhome. Final quote confirmed at booking. Calgary, Airdrie, Cochrane &amp; Chestermere.
            </p>
          </div>
        </section>

        {/* Why Winterization Matters */}
        <section className="py-16 sm:py-20 bg-muted/30">
          <div className="container">
            <ScrollReveal>
              <div className="text-center max-w-2xl mx-auto mb-12">
                <div className="inline-flex items-center gap-2 bg-urgency/10 text-urgency font-heading font-bold text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
                  <ThermometerSnowflake className="w-3 h-3" />
                  Why It Matters
                </div>
                <h2 className="font-heading font-black text-3xl sm:text-4xl uppercase text-foreground mb-4">
                  Calgary Winters Destroy Unprotected RVs
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Temperatures here drop to -30°C. Water expands ~9% when frozen — enough force to split copper, crack PEX fittings, shatter water heater tanks, and rupture pumps. One missed step can cost thousands.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-4">
              <ScrollReveal direction="left">
                <img
                  src={rvDamageImg}
                  alt="Frozen burst water line on an RV in Calgary winter"
                  loading="lazy"
                  width={1280}
                  height={832}
                  className="rounded-xl shadow-xl w-full h-auto object-cover"
                />
              </ScrollReveal>
              <ScrollReveal direction="right">
                <div className="space-y-4">
                  {[
                    { icon: DollarSign, title: "Burst Pipes & Water Damage", desc: "Average freeze repair runs $1,500–$5,000+. Hidden water damage in walls and floors can total an RV." },
                    { icon: Wrench, title: "Cracked Water Heater & Pump", desc: "A single freeze cycle can destroy your water heater tank ($400–$900) and pump assembly ($200–$500)." },
                    { icon: Shield, title: "Voided Warranty Risk", desc: "Most RV manufacturers require documented winterization. Skip it and freeze claims get denied." },
                    { icon: Home, title: "Mold, Mildew & Odors", desc: "Standing water in tanks and lines breeds bacteria over winter — leading to bad smells and contaminated potable systems by spring." },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-4 p-4 bg-card rounded-lg border border-border">
                      <div className="w-10 h-10 rounded-lg bg-urgency/10 flex items-center justify-center shrink-0">
                        <item.icon className="w-5 h-5 text-urgency" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-base text-foreground mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Seasonal Timing */}
        <section className="py-16 bg-background">
          <div className="container max-w-4xl">
            <ScrollReveal>
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-heading font-bold text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
                  <Calendar className="w-3 h-3" />
                  Calgary Timing
                </div>
                <h2 className="font-heading font-black text-3xl sm:text-4xl uppercase text-foreground mb-4">
                  When to Book
                </h2>
              </div>
            </ScrollReveal>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-6 bg-card border-2 border-border rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <Snowflake className="w-6 h-6 text-primary" />
                  <h3 className="font-heading font-black text-lg uppercase text-foreground">Winterization</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  Book between <strong className="text-foreground">late September and mid-October</strong>. First hard freeze in Calgary typically hits late October — don't wait.
                </p>
                <p className="text-xs text-urgency font-heading font-bold uppercase tracking-wider">Spots fill fastest in early October</p>
              </div>
              <div className="p-6 bg-card border-2 border-border rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <Sun className="w-6 h-6 text-primary" />
                  <h3 className="font-heading font-black text-lg uppercase text-foreground">De-Winterization</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  Book between <strong className="text-foreground">mid-April and mid-May</strong>, once overnight temperatures stay above 0°C. Schedule 2–3 weeks before your first trip.
                </p>
                <p className="text-xs text-urgency font-heading font-bold uppercase tracking-wider">May long weekend books out by mid-April</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Process */}
        <section className="py-16 sm:py-20 bg-muted/30">
          <div className="container">
            <ScrollReveal>
              <div className="text-center max-w-2xl mx-auto mb-12">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-heading font-bold text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
                  <Wrench className="w-3 h-3" />
                  Our Process
                </div>
                <h2 className="font-heading font-black text-3xl sm:text-4xl uppercase text-foreground mb-4">
                  How We Winterize Your RV
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed">
                  A complete, documented procedure performed on-site at your driveway or storage lot. Typically 60–90 minutes per rig.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              <ScrollReveal direction="left">
                <div className="space-y-4">
                  {[
                    { step: "01", title: "Drain Fresh, Grey & Black Tanks", desc: "All three tanks fully emptied and flushed. Black tank rinsed with built-in flush or wand." },
                    { step: "02", title: "Bypass Water Heater", desc: "We engage the bypass valves so antifreeze never enters (and wastes inside) your water heater tank." },
                    { step: "03", title: "Compressed Air Blowout", desc: "Regulated air at 30–40 PSI clears every line — hot, cold, outdoor shower, and toilet sprayer." },
                    { step: "04", title: "Pump in RV-Safe Antifreeze", desc: "Non-toxic pink antifreeze pulled through the pump until it flows pink from every faucet, shower, and toilet." },
                    { step: "05", title: "Trap & Drain Protection", desc: "Antifreeze poured into P-traps, shower drains, and toilet bowl to seal off freeze points." },
                    { step: "06", title: "Final Inspection & Report", desc: "Visual check of seals, vents, and exterior. You get a checklist confirming everything was completed." },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-4 p-4 bg-card rounded-lg border border-border hover:border-primary/40 transition-colors">
                      <div className="font-heading font-black text-2xl text-primary/70 shrink-0 w-10">{item.step}</div>
                      <div>
                        <h3 className="font-heading font-bold text-base text-foreground mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
              <ScrollReveal direction="right">
                <div className="lg:sticky lg:top-24">
                  <img
                    src={rvProcessImg}
                    alt="Technician winterizing an RV in a Calgary driveway"
                    loading="lazy"
                    width={1280}
                    height={832}
                    className="rounded-xl shadow-xl w-full h-auto object-cover"
                  />
                  <div className="mt-6 p-5 bg-primary/5 border border-primary/20 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Truck className="w-4 h-4 text-primary" />
                      <p className="font-heading font-bold text-xs uppercase tracking-wider text-primary">Fully Mobile</p>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      We bring the compressor, antifreeze, tools, and waste containment. You don't need power, water, or to move the RV — we work where it sits.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>


        {/* Mid-page CTA */}
        <section className="py-12 bg-foreground">
          <div className="container text-center max-w-2xl">
            <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-background mb-3">
              Lock in your spot before the freeze
            </h2>
            <p className="text-background/70 text-base mb-6">
              Mobile service across Calgary, Airdrie, Cochrane &amp; Chestermere.
            </p>
            <a
              href="tel:5875004523"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-7 py-4 rounded-lg text-sm hover:bg-brand-blue-deep transition-colors"
            >
              <Phone className="w-4 h-4" />
              Call Now: 587-500-4523
            </a>
          </div>
        </section>

        {/* FAQ */}
        <ServiceFAQ title="RV Winterization FAQs" faqs={faqs} />

        <Footer />
      </div>
    </PageTransition>
  );
};

export default RVWinterization;
