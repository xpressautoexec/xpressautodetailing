import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceFAQ from "@/components/ServiceFAQ";
import SEO, { buildServiceJsonLd, buildFAQJsonLd } from "@/components/SEO";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { Snowflake, Sun, CheckCircle, ArrowRight, Phone, Wrench, Droplets, Shield, Clock, MapPin, Star } from "lucide-react";
import rvHero from "@/assets/rv-hero.jpg";

const BOOKING_URL = "https://xpressauto.fieldd.co/";

const faqs = [
  { q: "When should I winterize my RV in Calgary?", a: "We recommend winterizing before the first hard freeze — typically mid-to-late October. Booking early in October ensures availability before the rush." },
  { q: "When should I de-winterize my RV?", a: "Most Calgary owners de-winterize between mid-April and mid-May, once overnight temperatures stay above freezing. Book 2–3 weeks ahead of your first trip." },
  { q: "Do you come to my storage lot?", a: "Yes — we service RVs and trailers at storage facilities, driveways, and acreages across Calgary, Airdrie, Cochrane, and Chestermere. We bring everything needed." },
  { q: "What's included in winterization?", a: "We blow out the water lines with compressed air, drain fresh/grey/black tanks, bypass the water heater, add RV-safe antifreeze through the system, and protect all plumbing." },
  { q: "Do you use RV-safe antifreeze?", a: "Always. We use non-toxic, pink RV/marine antifreeze that's safe for potable water systems. Never automotive antifreeze." },
  { q: "Can I add a detail to my winterization?", a: "Absolutely — bundle a winterization with an exterior wash or full detail and save. Just ask when booking." },
];

const winterizationPackages = [
  {
    title: "Basic Winterization",
    price: "$149",
    icon: Snowflake,
    desc: "Essential plumbing protection to prevent freeze damage.",
    features: [
      "Drain fresh, grey & black water tanks",
      "Blow out water lines with compressed air",
      "Bypass water heater",
      "Add RV-safe antifreeze through the plumbing system",
      "P-trap & toilet antifreeze fill",
      "Battery disconnect check",
    ],
  },
  {
    title: "Complete Winterization",
    price: "$229",
    icon: Shield,
    popular: true,
    badge: "Most Popular",
    desc: "Full plumbing winterization plus exterior storage prep.",
    features: [
      "Everything in Basic Winterization",
      "Exterior hand wash & dry",
      "Roof inspection & seal check",
      "Tire pressure check & inflation",
      "Slide-out lubrication",
      "Rubber seal conditioning (doors, slides, windows)",
      "Vent & A/C cover install (covers extra if needed)",
    ],
  },
  {
    title: "Winterize + Deep Detail",
    price: "$449",
    icon: Wrench,
    desc: "Store your RV showroom-clean and fully protected.",
    features: [
      "Everything in Complete Winterization",
      "Full interior deep clean & vacuum",
      "Fridge defrost, clean & prop open",
      "Pantry, cabinets & drawers wiped",
      "Bathroom sanitization",
      "Pest deterrent treatment",
      "Final winter-ready inspection report",
    ],
  },
];

const dewinterizationPackages = [
  {
    title: "Basic De-Winterization",
    price: "$169",
    icon: Sun,
    desc: "Flush, sanitize, and get your plumbing camp-ready.",
    features: [
      "Flush antifreeze from entire plumbing system",
      "Reconnect & test water heater",
      "Sanitize fresh water tank with bleach solution",
      "Pressure test for leaks",
      "Test all faucets, shower & toilet",
      "Reconnect & test battery",
    ],
  },
  {
    title: "Spring Ready Package",
    price: "$259",
    icon: Droplets,
    popular: true,
    badge: "Best Value",
    desc: "Plumbing startup plus full system inspection for the season.",
    features: [
      "Everything in Basic De-Winterization",
      "Exterior hand wash & black streak removal",
      "Tire pressure & condition check",
      "Roof, seal & seam inspection",
      "Slide-out operation test & lubrication",
      "Propane system leak check",
      "12V & 110V electrical test",
    ],
  },
  {
    title: "De-Winterize + Full Detail",
    price: "$499",
    icon: Star,
    desc: "Open the door to a clean, ready-to-camp RV.",
    features: [
      "Everything in Spring Ready Package",
      "Full interior deep clean & vacuum",
      "Kitchen & bathroom sanitization",
      "Upholstery & surface wipe-down",
      "Window cleaning (interior & exterior)",
      "Odor neutralizer treatment",
      "Pre-trip readiness checklist",
    ],
  },
];

const PackageCard = ({ pkg }: { pkg: typeof winterizationPackages[0] }) => {
  const Icon = pkg.icon;
  return (
    <div className={`relative bg-card border-2 rounded-xl p-6 sm:p-7 flex flex-col h-full transition-all duration-300 hover:shadow-xl ${pkg.popular ? "border-primary shadow-lg shadow-primary/10" : "border-border hover:border-primary/40"}`}>
      {pkg.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground font-heading font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full whitespace-nowrap">
          {pkg.badge}
        </div>
      )}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <h3 className="font-heading font-black text-lg uppercase tracking-tight text-foreground">{pkg.title}</h3>
      </div>
      <div className="mb-3">
        <span className="font-heading font-black text-3xl text-primary">{pkg.price}</span>
        <span className="text-muted-foreground text-sm ml-2">starting</span>
      </div>
      <p className="text-muted-foreground text-sm mb-5 leading-relaxed">{pkg.desc}</p>
      <ul className="space-y-2.5 mb-6 flex-grow">
        {pkg.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-foreground/80">
            <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-5 py-3 rounded-lg text-sm hover:bg-brand-blue-deep transition-colors"
      >
        Book This Package
        <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  );
};

const RVWinterization = () => {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <SEO
          title="RV Winterization & De-Winterization Calgary — Mobile Service"
          description="Mobile RV winterization and spring start-up in Calgary, Airdrie, Cochrane & Chestermere. Protect your RV from freeze damage or get camp-ready. We come to you."
          canonical="/trailer-rv/winterization"
          jsonLd={[
            buildServiceJsonLd("RV Winterization & De-Winterization", "Mobile RV winterization and de-winterization service in Calgary and surrounding areas.", "/trailer-rv/winterization"),
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
                <Snowflake className="w-3 h-3" />
                Seasonal Booking — Limited Spots
              </div>
              <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl uppercase text-background leading-[1.1] mb-4">
                RV Winterization &<br />
                <span className="text-primary">De-Winterization</span>
              </h1>
              <p className="text-background/75 text-base sm:text-lg leading-relaxed mb-6 max-w-xl">
                Protect your RV from Calgary's brutal winters — or get it camp-ready in spring. Mobile service straight to your driveway or storage lot.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-6 py-3.5 rounded-lg text-sm hover:bg-brand-blue-deep transition-colors"
                >
                  Book Online
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="tel:5875004523"
                  className="inline-flex items-center gap-2 bg-background/10 backdrop-blur text-background border border-background/30 font-heading font-bold uppercase tracking-wider px-6 py-3.5 rounded-lg text-sm hover:bg-background/20 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  587-500-4523
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
              { icon: CheckCircle, label: "Inspection Report Included" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-2">
                <item.icon className="w-5 h-5 text-primary" />
                <span className="font-heading font-semibold text-xs uppercase tracking-wider text-foreground/80">{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Winterization */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="container">
            <ScrollReveal>
              <div className="text-center max-w-2xl mx-auto mb-12">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-heading font-bold text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
                  <Snowflake className="w-3 h-3" />
                  Fall Service
                </div>
                <h2 className="font-heading font-black text-3xl sm:text-4xl uppercase text-foreground mb-4">
                  Winterization Packages
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Avoid cracked pipes, ruined water heaters, and thousand-dollar repair bills. Pick the level of protection that fits your storage plan.
                </p>
              </div>
            </ScrollReveal>

            <StaggerContainer className="grid md:grid-cols-3 gap-6">
              {winterizationPackages.map((pkg) => (
                <StaggerItem key={pkg.title}>
                  <PackageCard pkg={pkg} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* De-winterization */}
        <section className="py-16 sm:py-20 bg-muted/30">
          <div className="container">
            <ScrollReveal>
              <div className="text-center max-w-2xl mx-auto mb-12">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-heading font-bold text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
                  <Sun className="w-3 h-3" />
                  Spring Service
                </div>
                <h2 className="font-heading font-black text-3xl sm:text-4xl uppercase text-foreground mb-4">
                  De-Winterization Packages
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Get road-ready faster. We flush, sanitize, inspect, and hand your RV back ready for the first trip of the season.
                </p>
              </div>
            </ScrollReveal>

            <StaggerContainer className="grid md:grid-cols-3 gap-6">
              {dewinterizationPackages.map((pkg) => (
                <StaggerItem key={pkg.title}>
                  <PackageCard pkg={pkg} />
                </StaggerItem>
              ))}
            </StaggerContainer>

            <p className="text-center text-muted-foreground text-xs mt-8 max-w-xl mx-auto">
              Pricing based on standard travel trailers and motorhomes up to 30 ft. Larger rigs, 5th wheels, and Class A motorhomes may incur a size surcharge — quoted upfront.
            </p>
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
