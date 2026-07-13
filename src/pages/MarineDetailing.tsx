import { useState } from "react";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceFAQ from "@/components/ServiceFAQ";
import SEO, { buildServiceJsonLd, buildFAQJsonLd } from "@/components/SEO";
import ScrollReveal from "@/components/ScrollReveal";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Anchor, Waves, Sparkles, Shield, Phone, ArrowRight, Check, MapPin, Award, Droplets } from "lucide-react";
import marineHeroAsset from "@/assets/marine-pontoon-sunset.jpg.asset.json";
import marineTubesAsset from "@/assets/marine-pontoon-tubes.jpg.asset.json";
import marineDecalAsset from "@/assets/marine-decal-detail.jpg.asset.json";
import marineInteriorAsset from "@/assets/marine-interior-seats.jpg.asset.json";
import marineLoungeAsset from "@/assets/marine-seating-lounge.jpg.asset.json";
import marineHelmAsset from "@/assets/marine-helm-seat.jpg.asset.json";
import marineBenchAsset from "@/assets/marine-bench-detail.jpg.asset.json";
import marineMotorAsset from "@/assets/marine-mercury-motor.jpg.asset.json";
import marineBadgeAsset from "@/assets/marine-sport-badge.jpg.asset.json";
import marineSideAsset from "@/assets/marine-side-profile.jpg.asset.json";
const marineHero = marineSideAsset.url;
const marineTubes = marineTubesAsset.url;
const GALLERY = [
  { src: marineHeroAsset.url, alt: "SunChaser pontoon after full mobile detail at sunset" },
  { src: marineSideAsset.url, alt: "SunChaser Sport pontoon side profile with polished aluminum tube" },
  { src: marineMotorAsset.url, alt: "Mercury 150 FourStroke outboard motor after polish" },
  { src: marineBadgeAsset.url, alt: "SunChaser Sport chrome badge on detailed pontoon fence" },
  { src: marineInteriorAsset.url, alt: "Cleaned pontoon interior with restored vinyl seating" },
  { src: marineLoungeAsset.url, alt: "Restored pontoon rear lounge and vinyl seating" },
  { src: marineHelmAsset.url, alt: "Detailed pontoon captain's helm seat and dashboard" },
  { src: marineBenchAsset.url, alt: "Cleaned pontoon bench seating and speaker area" },
  { src: marineTubesAsset.url, alt: "Polished aluminum pontoon tubes after acid restoration" },
  { src: marineDecalAsset.url, alt: "Chrome SunChaser decal polished and restored" },
];

const PACKAGES = [
  {
    name: "Wash & Wax",
    price: 12,
    tagline: "Fast refresh — hand wash, decontamination, and a coat of marine wax.",
    features: ["Hand wash exterior", "Iron & salt decontamination", "Rail & hardware polish", "Marine spray wax topcoat"],
    image: marineInteriorAsset.url,
    imageAlt: "Freshly washed pontoon deck",
  },
  {
    name: "Interior Detail",
    price: 18,
    tagline: "Deep clean of vinyl seating, floors, storage compartments, and helm.",
    features: ["Vinyl seat deep clean & UV protectant", "Carpet / snap-in floor extraction", "Compartments & console detail", "Windows, gauges & helm dusted"],
    image: marineHelmAsset.url,
    imageAlt: "Detailed captain's helm seat and dashboard",
  },
  {
    name: "Exterior Polish & Seal",
    price: 28,
    tagline: "Machine polish to bring gelcoat or paint back — sealed for the season.",
    features: ["1-step machine polish", "Oxidation & light scratch removal", "Marine polymer sealant (6-month)", "Rails, cleats & hardware polish"],
    popular: false,
    image: marineMotorAsset.url,
    imageAlt: "Polished Mercury outboard after exterior detail",
  },
  {
    name: "Full Interior + Exterior",
    price: 42,
    tagline: "The complete reset — inside, outside, top to bottom. Our #1 marine package.",
    features: ["Everything in Interior Detail", "Everything in Polish & Seal", "Bimini / canopy cleaning", "Bilge wipe-down"],
    popular: true,
    image: marineSideAsset.url,
    imageAlt: "SunChaser Sport side profile after full detail",
  },
  {
    name: "Marine Ceramic Coating",
    price: 55,
    tagline: "2-year professional ceramic coating for gelcoat, paint, and metal.",
    features: ["Full paint correction prep", "2-year marine-grade ceramic", "Hydrophobic UV protection", "Slick, easy-clean finish"],
    image: marineHeroAsset.url,
    imageAlt: "SunChaser pontoon coated and glossy at sunset",
  },
];

const ALA_CARTE = [
  { name: "Aluminum Pontoon Acid Restoration", price: "$35/ft", desc: "Brings oxidized tubes back to factory shine.", image: marineTubesAsset.url },
  { name: "Oxidation Removal / Heavy Compound", price: "$25/ft", desc: "Multi-stage cut for chalky, faded gelcoat.", image: marineBadgeAsset.url },
  { name: "Engine Bay Detail", price: "$90", desc: "Degreased, dressed, and inspected.", image: marineMotorAsset.url },
  { name: "Canopy / Bimini Cleaning", price: "$60", desc: "Mildew, bird stains, UV protectant.", image: marineLoungeAsset.url },
  { name: "Trailer Wash & Wheel Detail", price: "$45", desc: "Salt, brake dust, and grime — gone.", image: marineHelmAsset.url },
];

const faqs = [
  { q: "Do you really come to me?", a: "Yes — we're the only mobile marine detailer serving Southern Alberta. We service boats at your home, storage yard, marina, or launch. All water and power are self-contained." },
  { q: "How is per-foot pricing measured?", a: "Length overall (LOA) — bow to stern. We measure on arrival and confirm before starting. No surprises." },
  { q: "Can you restore oxidized aluminum pontoons?", a: "Yes. Our acid restoration + polish process removes years of oxidation, water staining, and chalking. Most tubes look factory-new when we're done." },
  { q: "What areas do you cover?", a: "Calgary, Airdrie, Chestermere, Cochrane, Okotoks and surrounding lakes — Ghost, Chestermere, Sikome, Glenmore, Gleniffer, Sylvan." },
  { q: "How long does a typical detail take?", a: "A 20 ft boat wash & wax is 2–3 hours. A full Interior + Exterior on a 24 ft pontoon runs 5–7 hours. Ceramic coatings are usually a 2-day process." },
];

const MarineDetailing = () => {
  const [length, setLength] = useState(22);
  const [pkg, setPkg] = useState(3); // Full Interior + Exterior

  const estimate = PACKAGES[pkg].price * length;

  return (
    <PageTransition>
      <SEO
        title="Mobile Marine & Pontoon Detailing"
        description="The only mobile marine detailer in Southern Alberta. Boat wash, polish, ceramic coating, and aluminum pontoon acid restoration — we come to you."
        canonical="/marine"
        jsonLd={[
          buildServiceJsonLd(
            "Mobile Marine & Pontoon Detailing",
            "Mobile boat and pontoon detailing across Southern Alberta — wash, polish, ceramic coating, aluminum pontoon acid restoration.",
            "/marine",
          ),
          buildFAQJsonLd(faqs),
        ]}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative h-[520px] sm:h-[600px] overflow-hidden">
        <img
          src={marineHero}
          alt="Mobile marine detailing on a pontoon boat at sunset"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/70 to-brand-dark/30" />
        <div className="relative z-10 container h-full flex flex-col justify-end pb-14 md:pb-20">
          <span className="inline-flex items-center gap-2 self-start bg-primary/20 border border-primary/40 backdrop-blur-md px-4 py-1.5 rounded-full mb-4">
            <Waves className="w-4 h-4 text-primary" />
            <span className="text-white font-heading font-bold text-[10px] uppercase tracking-widest">
              Only Mobile Marine Crew in Southern Alberta
            </span>
          </span>
          <h1 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl uppercase text-white leading-[1.05] max-w-3xl">
            Mobile Marine <span className="text-primary">Detailing</span>
          </h1>
          <p className="text-white/85 text-base md:text-lg max-w-xl mt-4 leading-relaxed">
            Skip the tow. Skip the marina wait. We bring pro marine detailing, polishing and aluminum pontoon restoration to your dock, driveway or storage yard.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <a
              href="tel:5875004523"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-6 py-3 rounded-lg text-sm hover:bg-brand-blue-deep transition shadow-lg shadow-primary/30"
            >
              <Phone className="w-4 h-4" /> Call for Quote
            </a>
            <a
              href="#packages"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/25 text-white font-heading font-bold uppercase tracking-wider px-6 py-3 rounded-lg text-sm hover:bg-white/20 backdrop-blur-md transition"
            >
              View Packages <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-brand-dark border-y border-brand-dark-surface">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-6 py-8">
          {[
            { icon: Anchor, label: "100+ boats this year" },
            { icon: Award, label: "Pro compounds & polishes" },
            { icon: Shield, label: "Marine-grade sealants" },
            { icon: MapPin, label: "We come to you" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3 text-white">
              <Icon className="w-6 h-6 text-primary shrink-0" />
              <span className="font-heading font-bold text-xs sm:text-sm uppercase tracking-wider">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Positioning */}
      <section className="py-16 bg-background">
        <div className="container max-w-4xl text-center">
          <ScrollReveal>
            <p className="text-primary font-heading font-bold text-xs uppercase tracking-[0.2em] mb-3">Why Xpress Marine</p>
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase text-foreground mb-5">
              The Only <span className="text-gradient">Mobile Marine Detailers</span> in Southern Alberta
            </h2>
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
              Every other option means towing your 5th wheel or driving your motorhome-sized pontoon across the city. We eliminate that entirely. Our mobile rig runs its own water, power, and inverter systems — the exact same pro-grade compounds, polishers and marine sealants a top shop uses, brought directly to your slip.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="py-16 bg-muted/30">
        <div className="container">
          <ScrollReveal className="text-center mb-10">
            <p className="text-primary font-heading font-bold text-xs uppercase tracking-[0.2em] mb-2">Per-Foot Pricing</p>
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase text-foreground">
              Marine <span className="text-gradient">Packages</span>
            </h2>
            <p className="text-muted-foreground text-sm mt-3 max-w-2xl mx-auto">
              Priced per foot of length overall. Includes all supplies, water, and mobile fee.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {PACKAGES.map((p, i) => (
              <div
                key={p.name}
                className={`relative rounded-2xl bg-card border overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                  p.popular ? "border-primary/50 shadow-xl shadow-primary/10 ring-1 ring-primary/30" : "border-border hover:border-primary/30 hover:shadow-lg"
                }`}
              >
                {p.popular && (
                  <div className="absolute top-0 right-0 z-10 bg-urgency text-urgency-foreground font-heading font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-bl-xl">
                    Most Popular
                  </div>
                )}
                <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                  <img
                    src={p.image}
                    alt={p.imageAlt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
                <div className="p-6 pb-4">
                  <h3 className="font-heading font-black text-lg uppercase text-foreground mb-1">{p.name}</h3>
                  <p className="font-heading font-black text-3xl text-primary">${p.price}<span className="text-base text-muted-foreground font-bold">/ft</span></p>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{p.tagline}</p>
                </div>
                <div className="px-6 pb-6 flex-1 flex flex-col">
                  <ul className="space-y-2 mb-5 flex-1">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-foreground/85">
                        <Check className="w-4 h-4 text-success shrink-0 mt-0.5" /> <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setPkg(i)}
                    className="text-primary font-heading font-bold text-xs uppercase tracking-wider hover:underline text-left"
                  >
                    Use in Estimator ↓
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Estimator */}
          <ScrollReveal>
            <div className="bg-gradient-to-br from-primary to-brand-blue-deep text-primary-foreground rounded-2xl p-6 sm:p-8 shadow-xl">
              <p className="font-heading font-bold text-[10px] uppercase tracking-widest text-primary-foreground/70 mb-2">
                Quick Estimator
              </p>
              <h3 className="font-heading font-black text-2xl sm:text-3xl uppercase mb-6">
                Get a Ballpark in 5 Seconds
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-heading font-bold text-xs uppercase tracking-wider mb-2 text-primary-foreground/80">
                    Boat length: <span className="text-white">{length} ft</span>
                  </label>
                  <input
                    type="range"
                    min={14}
                    max={40}
                    value={length}
                    onChange={(e) => setLength(Number(e.target.value))}
                    className="w-full accent-white cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] mt-1 text-primary-foreground/60 font-heading uppercase tracking-wider">
                    <span>14 ft</span><span>40 ft</span>
                  </div>
                  <label className="block font-heading font-bold text-xs uppercase tracking-wider mt-6 mb-2 text-primary-foreground/80">
                    Package
                  </label>
                  <select
                    value={pkg}
                    onChange={(e) => setPkg(Number(e.target.value))}
                    className="w-full bg-white/15 border border-white/25 rounded-lg px-3 py-2.5 text-sm font-heading font-semibold text-white focus:outline-none focus:border-white/60"
                  >
                    {PACKAGES.map((p, i) => (
                      <option key={p.name} value={i} className="text-foreground">
                        {p.name} — ${p.price}/ft
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="font-heading font-bold text-[10px] uppercase tracking-widest text-primary-foreground/70 mb-1">Estimated</p>
                  <p className="font-heading font-black text-5xl md:text-6xl">${estimate}</p>
                  <p className="text-primary-foreground/75 text-xs mt-2">Final price confirmed on arrival after we measure LOA.</p>
                  <a
                    href="tel:5875004523"
                    className="inline-flex items-center justify-center gap-2 bg-white text-primary font-heading font-bold uppercase tracking-wider px-6 py-3 rounded-lg text-sm mt-4 hover:bg-white/90 transition"
                  >
                    <Phone className="w-4 h-4" /> Lock in Your Booking
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Aluminum pontoon feature */}
      <section className="py-16 bg-background">
        <div className="container grid md:grid-cols-2 gap-10 items-center">
          <ScrollReveal direction="left">
            <p className="text-primary font-heading font-bold text-xs uppercase tracking-[0.2em] mb-3">Signature Service</p>
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase mb-4">
              Aluminum Pontoon <span className="text-gradient">Acid Restoration</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-5">
              Years of hard water, algae and oxidation leave pontoon tubes chalky, gray and pitted. Our marine-grade acid wash and multi-stage polish process strips it all — and brings the aluminum back to a bright factory finish.
            </p>
            <ul className="space-y-3 mb-6">
              {[
                "Safe, controlled marine acid wash",
                "Two-stage aluminum compound & polish",
                "Waterline stain & scale removal",
                "Protective sealant for lasting shine",
              ].map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm">
                  <Droplets className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground/85">{f}</span>
                </li>
              ))}
            </ul>
            <a
              href="tel:5875004523"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-6 py-3 rounded-lg text-sm hover:bg-brand-blue-deep transition"
            >
              <Phone className="w-4 h-4" /> $35/ft — Call for Booking
            </a>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img src={marineTubes} alt="Polished aluminum pontoon tubes after mobile acid restoration" className="w-full aspect-[4/3] object-cover" loading="lazy" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Real work gallery */}
      <section className="py-16 bg-muted/20">
        <div className="container">
          <ScrollReveal className="text-center mb-10">
            <p className="text-primary font-heading font-bold text-xs uppercase tracking-[0.2em] mb-2">Recent Work</p>
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase">Pontoons We've <span className="text-gradient">Brought Back</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-3 text-sm sm:text-base">
              Real jobs, done on-site in Southern Alberta. Aluminum restored, vinyl reset, decals polished — no tow required.
            </p>
          </ScrollReveal>
          <Carousel opts={{ loop: true, align: "start" }} className="w-full">
            <CarouselContent className="-ml-3 sm:-ml-4">
              {GALLERY.map((g) => (
                <CarouselItem key={g.src} className="pl-3 sm:pl-4 basis-4/5 sm:basis-1/2 lg:basis-1/3">
                  <div className="group relative rounded-xl overflow-hidden shadow-lg aspect-[4/3] bg-muted">
                    <img
                      src={g.src}
                      alt={g.alt}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <p className="text-white text-xs sm:text-sm font-heading font-semibold leading-snug">{g.alt}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex -left-2 lg:-left-6" />
            <CarouselNext className="hidden sm:flex -right-2 lg:-right-6" />
          </Carousel>
        </div>
      </section>

      {/* À la carte */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-4xl">
          <ScrollReveal className="text-center mb-10">
            <p className="text-primary font-heading font-bold text-xs uppercase tracking-[0.2em] mb-2">À La Carte</p>
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase">Add-Ons & Extras</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-4">
            {ALA_CARTE.map((a) => (
              <div key={a.name} className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 transition-colors flex gap-4">
                <img
                  src={a.image}
                  alt={a.name}
                  loading="lazy"
                  className="w-24 sm:w-28 h-full object-cover shrink-0"
                />
                <div className="flex-1 py-4 pr-4">
                  <div className="flex justify-between items-start gap-3 mb-1">
                    <h3 className="font-heading font-bold text-sm sm:text-base uppercase text-foreground">{a.name}</h3>
                    <span className="font-heading font-black text-primary text-sm sm:text-base whitespace-nowrap">{a.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceFAQ title="Frequently Asked Questions" faqs={faqs} />

      {/* CTA */}
      <section className="py-16 bg-brand-dark">
        <div className="container max-w-3xl text-center">
          <Sparkles className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase text-white mb-4">
            Ready to Get Your Boat Detailed?
          </h2>
          <p className="text-white/75 mb-8">
            Every quote is free. Most jobs booked within 3–5 days. We come to your driveway, storage yard, or the launch.
          </p>
          <a
            href="tel:5875004523"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-8 py-4 rounded-lg text-sm hover:bg-brand-blue-deep transition shadow-xl shadow-primary/30"
          >
            <Phone className="w-4 h-4" /> Call (587) 500-4523
          </a>
        </div>
      </section>

      <Footer />
    </PageTransition>
  );
};

export default MarineDetailing;
