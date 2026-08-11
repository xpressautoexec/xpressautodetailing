import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Car, Clock, ShieldCheck, MapPin, CheckCircle } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import FloatingContact from "@/components/FloatingContact";
import ChatWidget from "@/components/ChatWidget";
import SEO, { buildServiceJsonLd, buildFAQJsonLd } from "@/components/SEO";

const BOOKING_URL = "https://xpressauto.fieldd.co/";

const packages = [
  {
    name: "Interior Fresh Start",
    price: "$169",
    time: "~2 hrs",
    points: ["Full vacuum, doors and trunk", "Steam-cleaned touch points", "Interior glass, plastics and vents", "Light stain treatment"],
    href: "/interior-detailing",
  },
  {
    name: "Exterior Restore",
    price: "$149",
    time: "~2 hrs",
    points: ["Two-bucket hand wash", "Iron and tar decontamination", "Clay bar as required", "6-month spray sealant"],
    href: "/exterior-detailing",
  },
  {
    name: "Complete Showroom Reset",
    price: "$269",
    time: "~3.5 hrs",
    points: ["Everything interior and exterior", "Wheel wells, jambs and grilles", "Sealant on paint and glass", "Best value per hour"],
    href: "/complete-detailing",
  },
];

const included = [
  { icon: Car, title: "We Come To You", desc: "Fully self-contained mobile unit with its own water and power. Your driveway, condo stall, or office parking lot works." },
  { icon: Sparkles, title: "Professional Chemistry", desc: "P&S, Ducan and System X product lines — pH-balanced, safe on modern clearcoats, leather and screens." },
  { icon: Clock, title: "Same-Week Availability", desc: "Most Calgary bookings are serviced within a few days. Early mornings, evenings and weekends available." },
  { icon: ShieldCheck, title: "Satisfaction Guarantee", desc: "If something is missed, we come back and correct it. Every detail ends with a walkthrough before we leave." },
];

const steps = [
  { n: "01", title: "Book online in 60 seconds", desc: "Pick your vehicle size, your package and a time window. No deposit taken at booking." },
  { n: "02", title: "We arrive fully equipped", desc: "Water tank, generator, extractor, polishers and steam — nothing needed from you." },
  { n: "03", title: "Inspection and walkthrough", desc: "We note existing defects with you, confirm priorities, then get to work." },
  { n: "04", title: "Final review, then payment", desc: "You inspect the finished vehicle first. Payment happens after you are happy with it." },
];

const faqs = [
  { q: "What is the difference between a car wash and auto detailing?", a: "A car wash removes loose surface dirt. Auto detailing is a full decontamination and restoration — bonded contaminants are chemically and mechanically removed, interior surfaces are extracted and steam cleaned, and paint is protected with a sealant or coating that lasts months rather than days." },
  { q: "Do you need access to water and power?", a: "No. Our mobile unit carries its own water supply and generator, so we can detail your vehicle at a house, condo parkade, or job site with no hookups." },
  { q: "How long does a full auto detail take in Calgary?", a: "An interior-only detail runs roughly 2 to 2.75 hours. A complete interior and exterior detail runs roughly 3.5 to 4 hours depending on vehicle size and condition." },
  { q: "Do you charge more for SUVs and trucks?", a: "Yes. Pricing is tiered by sedan/coupe, SUV/pickup and 3-row SUV/minivan because the surface area and interior volume differ significantly." },
  { q: "Which areas do you serve?", a: "Calgary, Airdrie, Chestermere, Cochrane, Okotoks and the surrounding communities in Southern Alberta." },
];

const AutoDetailing = () => (
  <PageTransition>
    <div className="min-h-screen pb-16 lg:pb-0">
      <SEO
        title="Auto Detailing Calgary — Mobile Car Detailing"
        description="Professional mobile auto detailing in Calgary. Interior, exterior and complete packages from $149. We bring water, power and pro-grade products to your door."
        canonical="/auto-detailing"
        jsonLd={[
          buildServiceJsonLd(
            "Auto Detailing",
            "Mobile auto detailing in Calgary — interior extraction, exterior decontamination, paint sealant and complete packages.",
            "/auto-detailing",
          ),
          buildFAQJsonLd(faqs),
        ]}
      />
      <Navbar />
      <AutoBreadcrumbs />

      <section className="bg-brand-dark py-16 md:py-24">
        <div className="container max-w-4xl">
          <p className="font-heading font-bold text-xs uppercase tracking-[0.2em] text-primary mb-4">
            Calgary · Airdrie · Chestermere · Cochrane
          </p>
          <h1 className="font-heading font-black text-3xl md:text-5xl uppercase text-primary-foreground mb-5">
            Auto Detailing in Calgary <span className="text-primary">That Comes To You</span>
          </h1>
          <p className="text-primary-foreground/80 text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
            Xpress Auto Detailing is a fully mobile detailing operation serving Calgary and the surrounding
            communities. We arrive with our own water, power, extraction and polishing equipment, and we restore
            your car, truck or SUV where it already sits — no drop-off, no shuttle, no waiting room.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-8 py-4 rounded-lg text-sm hover:bg-primary/90 transition-colors"
            >
              Book My Detail <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="tel:5875004523"
              className="inline-flex items-center justify-center gap-2 border border-primary-foreground/20 text-primary-foreground font-heading font-bold uppercase tracking-wider px-8 py-4 rounded-lg text-sm hover:bg-primary-foreground/10 transition-colors"
            >
              Call 587-500-4523
            </a>
          </div>
        </div>
      </section>

      <section className="py-14 bg-background">
        <div className="container max-w-5xl">
          <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-foreground mb-8">
            What Every Xpress Detail Includes
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {included.map((item) => (
              <div key={item.title} className="p-6 rounded-xl border border-border bg-card">
                <item.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-heading font-bold uppercase text-sm text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-muted/30">
        <div className="container max-w-5xl">
          <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-foreground mb-3">
            Auto Detailing Packages &amp; Pricing
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl text-sm md:text-base">
            Prices shown are for sedans and coupes. SUVs, pickups and 3-row vehicles are priced one tier up.
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            {packages.map((pkg) => (
              <div key={pkg.name} className="p-6 rounded-xl border border-border bg-card flex flex-col">
                <h3 className="font-heading font-bold uppercase text-base text-foreground mb-1">{pkg.name}</h3>
                <p className="font-heading font-black text-3xl text-primary mb-1">{pkg.price}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">{pkg.time}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {pkg.points.map((point) => (
                    <li key={point} className="flex gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={pkg.href}
                  className="font-heading font-bold uppercase text-xs tracking-wider text-primary hover:underline"
                >
                  Full package details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-background">
        <div className="container max-w-4xl">
          <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-foreground mb-8">
            How Mobile Detailing Works
          </h2>
          <ol className="space-y-5">
            {steps.map((step) => (
              <li key={step.n} className="flex gap-5 p-5 rounded-xl border border-border bg-card">
                <span className="font-heading font-black text-2xl text-primary/40 shrink-0">{step.n}</span>
                <div>
                  <h3 className="font-heading font-bold uppercase text-sm text-foreground mb-1">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-14 bg-muted/30">
        <div className="container max-w-3xl">
          <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-foreground mb-8">
            Auto Detailing FAQs
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="p-5 rounded-xl border border-border bg-card">
                <h3 className="font-heading font-bold text-sm uppercase text-foreground mb-2">{faq.q}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-background">
        <div className="container max-w-4xl">
          <h2 className="font-heading font-black text-xl md:text-2xl uppercase text-foreground mb-5">
            Related Services
          </h2>
          <div className="flex flex-wrap gap-3">
            {[
              { to: "/interior-detailing", label: "Interior Detailing" },
              { to: "/exterior-detailing", label: "Exterior Detailing" },
              { to: "/complete-detailing", label: "Complete Detailing" },
              { to: "/ceramic-coating", label: "Ceramic Coating" },
              { to: "/paint-correction", label: "Paint Correction" },
              { to: "/monthly-plan", label: "The Xpress Pass" },
              { to: "/add-ons", label: "Add-Ons" },
              { to: "/calgary-detailing-price-comparison", label: "Calgary Price Comparison" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-4 py-2 rounded-full border border-border bg-card text-sm text-foreground hover:border-primary/50 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <p className="flex items-center gap-2 text-sm text-muted-foreground mt-8">
            <MapPin className="w-4 h-4 text-primary" />
            Serving Calgary, Airdrie, Chestermere, Cochrane and Okotoks.
          </p>
        </div>
      </section>

      <Footer />
      <div className="h-20 lg:hidden" />
      <StickyMobileCTA />
      <FloatingContact />
      <ChatWidget />
    </div>
  </PageTransition>
);

export default AutoDetailing;
