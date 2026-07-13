import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicePageHero from "@/components/ServicePageHero";
import ServiceFAQ from "@/components/ServiceFAQ";
import TrustStats from "@/components/TrustStats";
import SEO, { buildServiceJsonLd, buildFAQJsonLd } from "@/components/SEO";
import ScrollReveal from "@/components/ScrollReveal";
import rvHero from "@/assets/rv-hero.jpg";
import {
  Phone,
  Mail,
  Check,
  Sparkles,
  RefreshCw,
  Calendar,
  ShieldCheck,
  Star,
  Wrench,
  ClipboardList,
  ArrowRight,
} from "lucide-react";

const rentalFAQs = [
  {
    q: "How fast is your turnaround between rentals?",
    a: "Standard turnovers are completed in 3–5 hours depending on unit size. Same-day turnovers are available with advance scheduling — book the slot and your unit is ready before the next guest picks up.",
  },
  {
    q: "Do you service the whole fleet in one visit?",
    a: "Yes. We batch 2–6 units per site visit and rotate through your storage yard on a set schedule so every unit is guest-ready without pulling staff off other work.",
  },
  {
    q: "What sizes and unit types do you cover?",
    a: "Travel trailers, fifth wheels, Class A/B/C motorhomes, toy haulers, teardrops and truck campers. Pricing scales by length; free walkaround quote for every fleet.",
  },
  {
    q: "Do you handle damage documentation between guests?",
    a: "Every turnover includes a dated photo report — exterior panels, roof, awning, interior surfaces, tanks and appliances — so you have a clean record for guest disputes and insurance.",
  },
  {
    q: "Can you invoice per unit and per month?",
    a: "Absolutely. Itemized per-unit invoices, monthly statements, and PO-friendly billing. Volume discounts kick in at 5+ units.",
  },
];

const services = [
  {
    icon: RefreshCw,
    title: "Guest-Ready Turnovers",
    desc: "Full interior sanitize, exterior wash, tanks flushed, linens-ready surfaces — the unit hands off spotless every time.",
  },
  {
    icon: ClipboardList,
    title: "Condition Photo Reports",
    desc: "Timestamped exterior + interior photo set delivered after every turnover. Ironclad documentation for damage disputes.",
  },
  {
    icon: Calendar,
    title: "Scheduled Fleet Rotations",
    desc: "Weekly, bi-weekly or on-demand slots that match your booking calendar. We come to your yard, dealership or storage lot.",
  },
  {
    icon: Sparkles,
    title: "Deep-Clean Refresh",
    desc: "Between-season deep cleans — upholstery extraction, cabinet degrease, oxidation buffing, decal restoration.",
  },
  {
    icon: ShieldCheck,
    title: "Paint & Roof Protection",
    desc: "Sealants and UV protectants that keep gel-coat, fiberglass and decals looking new across hundreds of rental cycles.",
  },
  {
    icon: Wrench,
    title: "Small-Repair Coordination",
    desc: "Spot in-service issues early — sealant cracks, seal wear, decal lifting — flagged in the report before they cost you a booking.",
  },
];

const tiers = [
  {
    name: "Turnover Basic",
    price: "From $199",
    perUnit: "per unit",
    features: [
      "Interior sanitize & wipe-down",
      "Floors vacuumed & mopped",
      "Bathroom & kitchen detail",
      "Exterior rinse & bug removal",
      "Photo condition report",
    ],
  },
  {
    name: "Turnover Plus",
    price: "From $349",
    perUnit: "per unit",
    popular: true,
    features: [
      "Everything in Turnover Basic",
      "Full exterior wash & tire dressing",
      "Awning & slide-out clean",
      "Fabric spot treatment",
      "Odor neutralization",
      "Priority scheduling",
    ],
  },
  {
    name: "Seasonal Refresh",
    price: "From $749",
    perUnit: "per unit",
    features: [
      "Deep interior extraction",
      "Cabinet & appliance degrease",
      "Oxidation buff & sealant",
      "Decal restoration",
      "Roof clean & UV protectant",
      "Full photo & condition audit",
    ],
  },
];

const RVRentalFleet = () => {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <SEO
          title="RV Rental Fleet Care Calgary"
          description="Mobile turnover, deep-clean and photo-report services for RV rental fleets in Calgary. Fast turnarounds, volume pricing, guest-ready every time."
          canonical="/rv-rental-fleet"
          jsonLd={[
            buildServiceJsonLd(
              "RV Rental Fleet Care",
              "Mobile detailing, turnovers, seasonal refreshes and condition reports for RV rental fleets in Calgary and Southern Alberta.",
              "/rv-rental-fleet",
            ),
            buildFAQJsonLd(rentalFAQs),
          ]}
        />
        <Navbar />
        <ServicePageHero
          title="RV Rental Fleet Care — Guest-Ready Every Turnover"
          image={rvHero}
          ctaType="call"
        />
        <TrustStats />

        {/* Intro */}
        <section className="py-20 sm:py-24 bg-background relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
          <div className="container grid md:grid-cols-2 gap-12 items-center relative z-10">
            <ScrollReveal direction="left">
              <div>
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-heading font-bold uppercase tracking-[0.15em] text-xs px-5 py-2 rounded-full mb-8 border border-primary/20">
                  <Star className="w-3.5 h-3.5" />
                  Built for Rental Operators
                </div>
                <h2 className="font-heading font-black text-2xl md:text-3xl lg:text-4xl uppercase text-foreground mb-6">
                  Every Guest Walks Into a Spotless Rig
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Rental fleets don't lose money on repairs — they lose it on bad reviews and empty booking windows. Xpress runs mobile turnovers directly at your storage yard so every unit is photographed, sanitized and guest-ready between renters, with zero downtime for your staff.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  From weekend Outdoorsy hosts with two trailers to multi-unit Class A fleets, we build a rotation that matches your booking calendar and keeps your 5-star average intact.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="tel:5875004523"
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl text-sm hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] transition-all"
                  >
                    <Phone className="w-4 h-4" /> Get Fleet Quote
                  </a>
                  <a
                    href="mailto:support@xpressautodetail.ca"
                    className="inline-flex items-center gap-2 border border-border bg-card font-heading font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl text-sm hover:border-primary/40 transition"
                  >
                    <Mail className="w-4 h-4" /> Email Us
                  </a>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-border">
                <img
                  src={rvHero}
                  alt="RV rental fleet being detailed"
                  className="w-full h-full object-cover aspect-[4/3]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-2">
                  {["Same-day turnovers", "Photo reports", "5+ unit volume pricing"].map((t) => (
                    <span key={t} className="text-xs font-heading font-bold uppercase tracking-wider bg-white/95 text-brand-dark px-3 py-1.5 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <ScrollReveal className="text-center mb-12 max-w-2xl mx-auto">
              <p className="text-primary font-heading font-bold text-xs uppercase tracking-[0.2em] mb-2">What's Included</p>
              <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase">
                A Program Built <span className="text-gradient">Around Your Bookings</span>
              </h2>
            </ScrollReveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s) => (
                <ScrollReveal key={s.title}>
                  <div className="bg-card border border-border rounded-2xl p-6 h-full hover:border-primary/40 hover:shadow-lg transition-all">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
                      <s.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-heading font-black text-lg uppercase mb-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Tiers */}
        <section className="py-20 bg-background">
          <div className="container">
            <ScrollReveal className="text-center mb-12 max-w-2xl mx-auto">
              <p className="text-primary font-heading font-bold text-xs uppercase tracking-[0.2em] mb-2">Fleet Packages</p>
              <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase">
                Pick a Rotation <span className="text-gradient">That Fits</span>
              </h2>
              <p className="text-muted-foreground text-sm mt-3">
                Every fleet is different. These are starting points based on typical travel trailers under 30 ft. Final pricing depends on unit type, length, condition, and how often you turn over. Call us for an accurate quote tailored to your fleet.
              </p>
            </ScrollReveal>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {tiers.map((t) => (
                <ScrollReveal key={t.name}>
                  <div
                    className={`relative rounded-2xl p-7 h-full flex flex-col ${
                      t.popular
                        ? "bg-gradient-to-br from-primary to-brand-blue-deep text-primary-foreground shadow-xl shadow-primary/30"
                        : "bg-card border border-border"
                    }`}
                  >
                    {t.popular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-urgency text-urgency-foreground text-[10px] font-heading font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                        Most Booked
                      </span>
                    )}
                    <h3 className={`font-heading font-black text-xl uppercase mb-1 ${t.popular ? "" : "text-foreground"}`}>
                      {t.name}
                    </h3>
                    <div className="flex items-baseline gap-1 mb-5">
                      <span className={`font-heading font-black text-3xl ${t.popular ? "" : "text-primary"}`}>{t.price}</span>
                      <span className={`text-xs uppercase tracking-wider ${t.popular ? "text-white/75" : "text-muted-foreground"}`}>
                        {t.perUnit}
                      </span>
                    </div>
                    <ul className="space-y-2.5 mb-6 flex-1">
                      {t.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm">
                          <Check className={`w-4 h-4 shrink-0 mt-0.5 ${t.popular ? "" : "text-primary"}`} />
                          <span className={t.popular ? "" : "text-muted-foreground"}>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href="tel:5875004523"
                      className={`inline-flex items-center justify-center gap-2 font-heading font-bold uppercase tracking-wider px-5 py-3 rounded-lg text-sm transition ${
                        t.popular
                          ? "bg-white text-primary hover:bg-white/90"
                          : "bg-primary text-primary-foreground hover:bg-brand-blue-deep"
                      }`}
                    >
                      <Phone className="w-4 h-4" /> Book {t.name}
                    </a>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <ServiceFAQ title="Rental Fleet FAQs" faqs={rentalFAQs} />

        {/* CTA */}
        <section className="py-20 bg-brand-dark">
          <div className="container max-w-3xl text-center">
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase text-white mb-4">
              Ready for a Guest-Ready Fleet?
            </h2>
            <p className="text-white/75 mb-8">
              Send us your unit list and booking pattern — we'll build a rotation quote within one business day.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href="tel:5875004523"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-8 py-4 rounded-lg text-sm hover:bg-brand-blue-deep transition shadow-xl shadow-primary/30"
              >
                <Phone className="w-4 h-4" /> Call (587) 500-4523
              </a>
              <a
                href="mailto:support@xpressautodetail.ca"
                className="inline-flex items-center gap-2 bg-white/10 border border-white/25 text-white font-heading font-bold uppercase tracking-wider px-8 py-4 rounded-lg text-sm hover:bg-white/20 backdrop-blur-md transition"
              >
                Email Fleet Team <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default RVRentalFleet;
