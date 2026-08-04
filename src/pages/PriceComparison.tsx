import { Link } from "react-router-dom";
import {
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  DollarSign,
  ShieldCheck,
  Sparkles,
  Car,
  ArrowRight,
  Phone,
} from "lucide-react";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO, { buildFAQJsonLd, localBusinessJsonLd } from "@/components/SEO";
import ServiceFAQ from "@/components/ServiceFAQ";
import ScrollReveal from "@/components/ScrollReveal";

const BOOKING_URL = "https://xpressauto.fieldd.co/";
const PHONE = "587-500-4523";

const priceRows = [
  {
    service: "Interior Detail (sedan)",
    ours: "$169.99",
    shop: "$150 – $250",
    note: "Steam clean, extraction, leather conditioning. SUV +$50, 3-row +$70.",
    link: "/interior-detailing",
  },
  {
    service: "Interior Deep Clean (sedan)",
    ours: "$199.99",
    shop: "$220 – $320",
    note: "Adds full shampoo extraction and a free interior protectant treatment.",
    link: "/interior-detailing",
  },
  {
    service: "Complete Detail — interior + exterior",
    ours: "$269.00",
    shop: "$280 – $400",
    note: "Foam pre-wash, clay bar decon, wax, full interior reset. ~2.58–3.08 hrs.",
    link: "/complete-detailing",
  },
  {
    service: "1-Step Enhancement + 1 Yr Ceramic",
    ours: "$474.99",
    shop: "$500 – $700",
    note: "Machine gloss enhancement sealed with a 1-year ceramic.",
    link: "/paint-ceramics",
  },
  {
    service: "2-Step Correction + 5 Yr Ceramic",
    ours: "$849.99",
    shop: "$900 – $1,400",
    note: "Menzerna two-stage correction plus 5-year ceramic protection.",
    link: "/paint-ceramics",
  },
  {
    service: "System X 9-Year Graphene Coating",
    ours: "Custom quote",
    shop: "$1,500 – $3,000+",
    note: "Authorized-installer graphene coating with a 9-year manufacturer warranty.",
    link: "/paint-ceramics",
  },
  {
    service: "Paint Protection Film (PPF)",
    ours: "Custom quote",
    shop: "$900 – $6,000+",
    note: "XPEL and 3M film — partial front, full front, track pack or full body.",
    link: "/ppf",
  },
  {
    service: "Window Tinting",
    ours: "Custom quote",
    shop: "$250 – $900",
    note: "Carbon or ceramic IR film, priced by coverage and vehicle.",
    link: "/window-tinting",
  },
];

const addOnRows = [
  { name: "Pet Hair Removal", price: "$55" },
  { name: "Ozone Odour Elimination", price: "$75" },
  { name: "Headlight Restoration", price: "$80" },
  { name: "Ceramic Spray Sealant Upgrade", price: "$110" },
  { name: "Wheel Ceramic Coating", price: "$120 / wheel" },
  { name: "All Glass Ceramic Coating", price: "$230" },
  { name: "Interior Ceramic Coating", price: "$350" },
];

const mobileWins = [
  {
    icon: Clock,
    title: "You don't lose half a day",
    desc: "No drop-off, no shuttle, no waiting room. A shop detail costs you two trips across the city — at Calgary drive times that's easily 90 minutes of your day on top of the price on the invoice.",
  },
  {
    icon: MapPin,
    title: "We work where you already are",
    desc: "Driveway, condo parkade, office lot, acreage in Springbank. We service Calgary, Airdrie, Chestermere and Cochrane with our own water and power.",
  },
  {
    icon: DollarSign,
    title: "Transparent, published pricing",
    desc: "Every package price and size surcharge is on the site before you book. No 'we'll call you with a number after we look at it' on standard detailing.",
  },
  {
    icon: Car,
    title: "Your car isn't sitting in a queue",
    desc: "Shop detailing often means your vehicle waits between stages. Your booked slot is your vehicle's slot — start to finish, one technician, one visit.",
  },
];

const shopWins = [
  "Multi-day PPF or full-body wraps that need a controlled, dust-free bay",
  "Heated indoor space in deep winter for certain coating cure windows",
  "Bodywork, wet sanding and paint repair beyond detailing scope",
];

const faqs = [
  {
    q: "How much does car detailing cost in Calgary?",
    a: "Most Calgary detailers price a full interior detail between $150 and $250 for a sedan, and a complete interior-plus-exterior detail between $280 and $400. Our published mobile pricing starts at $169.99 for an interior detail and $269 for the Complete Showroom Reset, with size surcharges of $50–$80 for SUVs, trucks and 3-row vehicles.",
  },
  {
    q: "Is mobile detailing more expensive than a detailing shop?",
    a: "Not with us. Our package prices sit at or below typical Calgary shop rates for comparable work, and you also save the two round trips and the time off work that a shop booking requires.",
  },
  {
    q: "Why do SUVs and trucks cost more to detail?",
    a: "More carpet, more glass, more panels and deeper crevices — a 3-row SUV can take an extra hour of labour and noticeably more product. We publish those surcharges up front rather than adjusting the price on arrival: $50–$60 for SUVs and trucks, $70–$80 for 3-row SUVs and minivans.",
  },
  {
    q: "What is the cheapest way to keep a car clean in Calgary year-round?",
    a: "A monthly maintenance plan. Recurring service costs far less per visit than repeated one-off deep cleans, because the vehicle never gets far enough gone to need full decontamination each time. See our monthly plan for current pricing.",
  },
  {
    q: "Is a 9-year graphene ceramic coating worth the price?",
    a: "If you keep vehicles five years or longer, it usually costs less per year than repeated sealants and makes winter salt removal far easier. We are a System X authorized installer, so the 9-year coating carries a manufacturer warranty — the coating cost is quoted per vehicle after a paint inspection.",
  },
  {
    q: "Do you charge extra to travel in Calgary?",
    a: "No travel fee within Calgary, Airdrie, Chestermere and Cochrane. Call 587-500-4523 if you're further out and we'll confirm before booking.",
  },
];

const PriceComparison = () => (
  <PageTransition>
    <div className="min-h-screen">
      <SEO
        title="Calgary Car Detailing Prices Compared"
        description="Real 2026 car detailing prices in Calgary. Compare our mobile detailing packages against shop-based rates — interior, complete, ceramic coating, PPF and tint."
        canonical="/calgary-detailing-price-comparison"
        jsonLd={[
          localBusinessJsonLd,
          buildFAQJsonLd(faqs),
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Calgary Car Detailing Prices: Mobile vs Shop Comparison",
            description:
              "A transparent price comparison of mobile and shop-based car detailing in Calgary, including interior, complete, ceramic coating, PPF and window tinting.",
            author: { "@type": "Organization", name: "Xpress Auto Detailing" },
            publisher: { "@type": "Organization", name: "Xpress Auto Detailing" },
            mainEntityOfPage:
              "https://xpressautodetail.ca/calgary-detailing-price-comparison",
          },
        ]}
      />
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-foreground">
        <div className="container max-w-4xl text-center px-4">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 text-primary font-heading font-bold text-xs uppercase tracking-widest mb-4">
              <DollarSign className="w-4 h-4" /> Calgary Pricing Guide · 2026
            </span>
            <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl uppercase text-background mb-5 leading-tight">
              Car Detailing Prices in Calgary:{" "}
              <span className="text-primary">Mobile vs Shop</span>
            </h1>
            <p className="text-background/70 leading-relaxed max-w-2xl mx-auto mb-8">
              Every detailing package we offer, what a comparable Calgary shop
              typically charges, and where the real cost difference actually
              shows up. No hidden fees, no "call for pricing" on standard
              services.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-8 py-3.5 rounded-lg text-sm hover:bg-primary/90 transition-colors"
              >
                Book Online <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={`tel:${PHONE}`}
                className="inline-flex items-center justify-center gap-2 border border-background/30 text-background font-heading font-bold uppercase tracking-wider px-8 py-3.5 rounded-lg text-sm hover:bg-background/10 transition-colors"
              >
                <Phone className="w-4 h-4" /> {PHONE}
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Price table */}
      <section className="py-16 bg-background">
        <div className="container max-w-5xl px-4">
          <ScrollReveal>
            <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-foreground text-center mb-3">
              Side-by-Side Price Comparison
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10 text-sm">
              Our published sedan pricing versus the range Calgary shop-based
              detailers typically quote for comparable work. Shop ranges are
              market estimates gathered from published local menus and will vary
              by provider and vehicle condition.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-left min-w-[640px]">
                <thead className="bg-muted">
                  <tr>
                    <th className="p-4 font-heading font-bold text-xs uppercase tracking-wider text-foreground">
                      Service
                    </th>
                    <th className="p-4 font-heading font-bold text-xs uppercase tracking-wider text-primary">
                      Xpress (Mobile)
                    </th>
                    <th className="p-4 font-heading font-bold text-xs uppercase tracking-wider text-foreground">
                      Typical Calgary Shop
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.service} className="border-t border-border align-top">
                      <td className="p-4">
                        <Link
                          to={row.link}
                          className="font-heading font-bold text-sm text-foreground hover:text-primary transition-colors"
                        >
                          {row.service}
                        </Link>
                        <p className="text-muted-foreground text-xs mt-1.5 leading-relaxed max-w-sm">
                          {row.note}
                        </p>
                      </td>
                      <td className="p-4 font-heading font-black text-lg text-primary whitespace-nowrap">
                        {row.ours}
                      </td>
                      <td className="p-4 font-heading font-semibold text-sm text-muted-foreground whitespace-nowrap">
                        {row.shop}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground text-xs mt-4">
              Sedan pricing shown. Size surcharges: SUVs and trucks +$50–$150,
              3-row SUVs and minivans +$70–$200 depending on the package.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-16 bg-muted/40">
        <div className="container max-w-4xl px-4">
          <ScrollReveal>
            <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-foreground text-center mb-10">
              Add-On Pricing, Published Up Front
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {addOnRows.map((a) => (
                <div
                  key={a.name}
                  className="flex items-center justify-between gap-3 bg-background border border-border rounded-lg px-4 py-3"
                >
                  <span className="text-sm text-foreground font-medium">{a.name}</span>
                  <span className="font-heading font-bold text-sm text-primary whitespace-nowrap">
                    {a.price}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground text-sm text-center mt-6">
              Full list on the{" "}
              <Link to="/add-ons" className="text-primary font-semibold hover:underline">
                add-ons page
              </Link>
              .
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Where mobile wins */}
      <section className="py-16 bg-background">
        <div className="container max-w-5xl px-4">
          <ScrollReveal>
            <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-foreground text-center mb-3">
              Where Mobile Detailing Actually Saves You Money
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10 text-sm">
              The sticker price is only part of it. Here's the part that doesn't
              show up on a shop invoice.
            </p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-5">
            {mobileWins.map((w, i) => (
              <ScrollReveal key={w.title} delay={0.05 * i}>
                <div className="h-full bg-background border border-border rounded-xl p-6 hover:border-primary/40 transition-colors">
                  <w.icon className="w-6 h-6 text-primary mb-3" />
                  <h3 className="font-heading font-bold text-foreground mb-2">
                    {w.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {w.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Honest: when a shop is better */}
      <section className="py-16 bg-foreground">
        <div className="container max-w-3xl px-4">
          <ScrollReveal>
            <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-background text-center mb-4">
              When a Shop Is the Better Choice
            </h2>
            <p className="text-background/60 text-center text-sm mb-8">
              We'd rather tell you than sell you. Mobile isn't the answer for
              everything.
            </p>
            <ul className="space-y-3">
              {shopWins.map((s) => (
                <li key={s} className="flex gap-3 items-start">
                  <XCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-background/80 text-sm leading-relaxed">{s}</span>
                </li>
              ))}
            </ul>
            <p className="text-background/60 text-sm leading-relaxed mt-6">
              For everything else — interior resets, complete details, paint
              correction, ceramic coatings and maintenance — mobile service
              delivers the same result at your address. Our{" "}
              <Link to="/ppf" className="text-primary font-semibold hover:underline">
                PPF work
              </Link>{" "}
              and{" "}
              <Link
                to="/window-tinting"
                className="text-primary font-semibold hover:underline"
              >
                window tinting
              </Link>{" "}
              are scheduled with the right environment in mind — call and we'll
              tell you honestly which setup your vehicle needs.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Value picks */}
      <section className="py-16 bg-background">
        <div className="container max-w-5xl px-4">
          <ScrollReveal>
            <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-foreground text-center mb-10">
              Best Value by What You're Trying to Do
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: Sparkles,
                title: "Selling or trading in",
                pick: "Complete Showroom Reset — $269",
                desc: "A full inside-and-out reset before photos and appraisal. Clients regularly report $1,500–$3,000 more on their sale price.",
                to: "/complete-detailing",
              },
              {
                icon: ShieldCheck,
                title: "Keeping a car long-term",
                pick: "System X 9-Year Graphene",
                desc: "Lowest cost per year of protection if you hold vehicles 5+ years, and salt rinses off far easier through Calgary winters.",
                to: "/paint-ceramics",
              },
              {
                icon: Clock,
                title: "Staying clean year-round",
                pick: "The Xpress Pass monthly plan",
                desc: "Recurring maintenance beats repeated one-off deep cleans on price per visit, plus discounts on every add-on.",
                to: "/monthly-plan",
              },
            ].map((c, i) => (
              <ScrollReveal key={c.title} delay={0.05 * i}>
                <div className="h-full flex flex-col bg-background border border-border rounded-xl p-6 hover:border-primary/40 transition-colors">
                  <c.icon className="w-6 h-6 text-primary mb-3" />
                  <h3 className="font-heading font-bold text-foreground mb-1">
                    {c.title}
                  </h3>
                  <p className="font-heading font-black text-primary text-sm uppercase mb-3">
                    {c.pick}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">
                    {c.desc}
                  </p>
                  <Link
                    to={c.to}
                    className="inline-flex items-center gap-1.5 text-primary font-heading font-bold text-xs uppercase tracking-wider hover:gap-2.5 transition-all"
                  >
                    See details <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* What's included in every price */}
      <section className="py-16 bg-muted/40">
        <div className="container max-w-3xl px-4">
          <ScrollReveal>
            <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-foreground text-center mb-8">
              What's Included in Every Price
            </h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {[
                "Travel within Calgary, Airdrie, Chestermere & Cochrane",
                "Our own water and power supply",
                "Professional-grade P&S, Ducan and System X products",
                "Published size surcharges — no surprises on arrival",
                "One technician, start to finish",
                "Online booking with a confirmed time slot",
              ].map((item) => (
                <li key={item} className="flex gap-2.5 items-start">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      <ServiceFAQ title="Calgary Detailing Pricing FAQs" faqs={faqs} />

      {/* CTA */}
      <section className="py-14 bg-primary">
        <div className="container text-center px-4">
          <h2 className="font-heading font-black text-xl sm:text-2xl uppercase text-primary-foreground mb-3">
            Know the Price Before You Book
          </h2>
          <p className="text-primary-foreground/80 max-w-lg mx-auto mb-6 text-sm">
            Pick your package online, or call for a custom quote on ceramic
            coating, PPF and tint.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-primary-foreground text-primary font-heading font-bold uppercase tracking-wider px-8 py-3.5 rounded-lg text-sm hover:bg-primary-foreground/90 transition-colors"
            >
              Book Now <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={`tel:${PHONE}`}
              className="inline-flex items-center justify-center gap-2 border border-primary-foreground/40 text-primary-foreground font-heading font-bold uppercase tracking-wider px-8 py-3.5 rounded-lg text-sm hover:bg-primary-foreground/10 transition-colors"
            >
              <Phone className="w-4 h-4" /> {PHONE}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  </PageTransition>
);

export default PriceComparison;
