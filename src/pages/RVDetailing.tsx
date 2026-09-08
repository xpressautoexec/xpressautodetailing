import { Link } from "react-router-dom";
import { ArrowRight, Caravan, Sun, Droplets, ShieldCheck, MapPin, CheckCircle } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import ChatWidget from "@/components/ChatWidget";
import SEO, { buildServiceJsonLd, buildFAQJsonLd } from "@/components/SEO";

const services = [
  { icon: Sun, title: "Oxidation Removal", desc: "Chalky, faded fibreglass and gel coat is compounded back to gloss. This is the single most requested RV service we perform in Alberta." },
  { icon: Droplets, title: "Black Streak Removal", desc: "Roof runoff staining down the sidewalls is dissolved and removed without scouring the decals or clear coat." },
  { icon: ShieldCheck, title: "Sealant & Ceramic Coating", desc: "A protective layer that slows UV fade and makes the next wash dramatically easier. Multi-year coatings available." },
  { icon: Caravan, title: "Interior Deep Clean", desc: "Extraction of upholstery and mattresses, cabinetry wipe-down, galley degrease, bathroom sanitation and window tracks." },
];

const vehicles = [
  "Class A motorhomes",
  "Class B camper vans",
  "Class C motorhomes",
  "Travel trailers",
  "Fifth wheels",
  "Toy haulers",
  "Truck campers",
  "Utility & cargo trailers",
];

const faqs = [
  { q: "Do you detail RVs at storage lots?", a: "Yes. We regularly service RVs at storage compounds, seasonal campgrounds and private acreages around Calgary, Airdrie, Cochrane, Chestermere, Okotoks and Rocky View County. We bring our own water and power, so no site hookups are required." },
  { q: "How much does RV detailing cost?", a: "RV work is priced per foot because a 21-foot trailer and a 40-foot Class A are entirely different jobs. Exterior wash and sealant packages start in the lower per-foot tiers, while full oxidation removal with a ceramic coating sits at the top. We quote after seeing photos or the unit itself." },
  { q: "Can badly oxidized fibreglass actually be restored?", a: "In most cases, yes. Oxidation is a degraded surface layer. Machine compounding removes it and exposes sound gel coat underneath. Units that have been left uncoated for many seasons may need two correction stages." },
  { q: "How long does an RV detail take?", a: "A wash and sealant on a mid-size trailer is typically a single day. Full oxidation removal with a coating on a large motorhome can take two to three days." },
  { q: "When is the best time to book?", a: "Spring, before the camping season, and fall, before winter storage. Both windows fill quickly, so booking a few weeks ahead is recommended." },
];

const RVDetailing = () => (
  <PageTransition>
    <div className="min-h-screen pb-16 lg:pb-0">
      <SEO
        title="RV Detailing Calgary — Mobile RV & Trailer"
        description="Mobile RV detailing in Calgary — oxidation removal, black streak removal, ceramic coating and interior deep cleans. We come to your storage lot or driveway."
        canonical="/rv-detailing"
        jsonLd={[
          buildServiceJsonLd(
            "RV Detailing",
            "Mobile RV, motorhome and trailer detailing in Calgary — oxidation removal, black streak removal, sealants and ceramic coatings.",
            "/rv-detailing",
          ),
          buildFAQJsonLd(faqs),
        ]}
      />
      <Navbar />
      <AutoBreadcrumbs />

      <section className="bg-brand-dark py-16 md:py-24">
        <div className="container max-w-4xl">
          <p className="font-heading font-bold text-xs uppercase tracking-[0.2em] text-primary mb-4">
            Mobile RV specialists · Southern Alberta
          </p>
          <h1 className="font-heading font-black text-3xl md:text-5xl uppercase text-primary-foreground mb-5">
            RV Detailing in Calgary <span className="text-primary">Done Where You Store It</span>
          </h1>
          <p className="text-primary-foreground/80 text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
            Alberta sun, hail and road brine are brutal on gel coat. We restore oxidized fibreglass, strip black
            streaks, deep clean the living space and seal the whole unit — at your storage compound, campground
            or driveway, with our own water and power on board.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="tel:5875004523"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-8 py-4 rounded-lg text-sm hover:bg-primary/90 transition-colors"
            >
              Get My RV Quote <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              to="/trailer-rv"
              className="inline-flex items-center justify-center gap-2 border border-primary-foreground/20 text-primary-foreground font-heading font-bold uppercase tracking-wider px-8 py-4 rounded-lg text-sm hover:bg-primary-foreground/10 transition-colors"
            >
              See Per-Foot Pricing
            </Link>
          </div>
        </div>
      </section>

      <section className="py-14 bg-background">
        <div className="container max-w-5xl">
          <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-foreground mb-8">
            RV Services We Perform
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {services.map((item) => (
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
        <div className="container max-w-4xl">
          <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-foreground mb-6">
            Units We Service
          </h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {vehicles.map((vehicle) => (
              <li key={vehicle} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                {vehicle}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-14 bg-background">
        <div className="container max-w-3xl">
          <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-foreground mb-8">
            RV Detailing FAQs
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

      <section className="py-14 bg-muted/30">
        <div className="container max-w-4xl">
          <h2 className="font-heading font-black text-xl md:text-2xl uppercase text-foreground mb-5">
            Related RV Services
          </h2>
          <div className="flex flex-wrap gap-3">
            {[
              { to: "/trailer-rv", label: "Trailer & RV Detailing" },
              { to: "/trailer-rv/ppf", label: "RV Paint Protection Film" },
              { to: "/rv-rental-fleet", label: "RV Rental Fleet Care" },
              { to: "/marine", label: "Marine & Pontoon Detailing" },
              { to: "/ceramic-coating", label: "Ceramic Coating" },
              { to: "/corporate-fleet", label: "Corporate & Fleet" },
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
            Serving RV storage lots and campgrounds across Calgary, Airdrie, Chestermere, Cochrane, Okotoks and Rocky View County.
          </p>
        </div>
      </section>

      <Footer />
      <div className="h-20 lg:hidden" />
      <StickyMobileCTA />
      <ChatWidget />
    </div>
  </PageTransition>
);

export default RVDetailing;
