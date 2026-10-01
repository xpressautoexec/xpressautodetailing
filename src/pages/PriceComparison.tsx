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
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import SEO, { buildFAQJsonLd, localBusinessJsonLd } from "@/components/SEO";
import ServiceFAQ from "@/components/ServiceFAQ";
import ScrollReveal from "@/components/ScrollReveal";
import {
  ADDONS,
  AUTO_PACKAGES,
  BOOKING_URL,
  CERAMIC_PACKAGES,
  CERAMIC_UPCHARGE,
  PET_HAIR_TIERS,
  PHONE,
  money,
} from "@/data/pricing";
import { CERAMIC_CERTIFICATIONS } from "@/data/copy";

const pkg = (id: string) => AUTO_PACKAGES.find((p) => p.id === id)!;
const upcharges = (id: string) => {
  const p = pkg(id).price;
  return `SUV +${money(p.suv - p.sedan)}, 3-row +${money(p.minivan - p.sedan)}.`;
};
const range = (xs: number[]) => `${money(Math.min(...xs))} – ${money(Math.max(...xs))}`;
const suvRange = range(AUTO_PACKAGES.map((p) => p.price.suv - p.price.sedan));
const rowRange = range(AUTO_PACKAGES.map((p) => p.price.minivan - p.price.sedan));

/** "ours" is always computed from pricing.ts. "shop" is the Calgary market range and is editorial. */
const priceRows = [
  {
    service: `${pkg("maintain").name} (sedan, Xpress Pass only)`,
    ours: money(pkg("maintain").price.sedan),
    shop: "$120 – $180",
    note: `Hand wash, wheels, glass and interior tidy. ${pkg("maintain").duration}. ${upcharges("maintain")}`,
    link: "/xpress-pass",
  },
  {
    service: `${pkg("refresh").name} (sedan)`,
    ours: money(pkg("refresh").price.sedan),
    shop: "$220 – $320",
    note: `Full interior and exterior reset: shampoo, jambs, plastics dressed. ${upcharges("refresh")}`,
    link: "/detailing",
  },
  {
    service: `${pkg("showroom").name} (sedan)`,
    ours: money(pkg("showroom").price.sedan),
    shop: "$380 – $550",
    note: `Deep extraction, salt stain removal, leather conditioning and ceramic spray sealant. ${upcharges("showroom")}`,
    link: "/detailing",
  },
  {
    service: `${pkg("restore").name} (sedan)`,
    ours: money(pkg("restore").price.sedan),
    shop: "$900 – $1,400",
    note: `${pkg("showroom").name} plus 1-step machine correction and a registered 1-year ceramic coating.`,
    link: "/detailing",
  },
  {
    service: "Ceramic coating packages",
    ours: range(CERAMIC_PACKAGES.map((p) => p.price)),
    shop: "$700 – $3,000+",
    note: `1-year, 5-year or 9-year System X graphene. ${CERAMIC_CERTIFICATIONS.join(", ")} coatings.`,
    link: "/ceramic-paint-correction",
  },
];

const addon = (name: string) => money(ADDONS.find((a) => a.name === name)!.price);
const addOnRows = [
  { name: "Pet hair removal (light / moderate / heavy)", price: PET_HAIR_TIERS.map((t) => money(t.price)).join(" / ") },
  { name: "Strong odour removal", price: addon("Strong Odour Removal") },
  { name: "Headlight restoration", price: addon("Headlight Restoration") },
  { name: "Ceramic sealant upgrade", price: addon("Ceramic Sealant Upgrade") },
  { name: "Clay bar treatment", price: addon("Clay Bar Treatment") },
  { name: "Engine bay detail", price: addon("Engine Bay Detail") },
  { name: "Excessively soiled interior", price: addon("Excessively Soiled Interior") },
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
    desc: "Driveway, condo parkade, office lot, acreage in Springbank. We service Calgary, Airdrie, Chestermere, Cochrane, Okotoks and Rocky View County with our own water and power.",
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
    a: `Most Calgary detailers price a full interior-and-exterior detail between $220 and $400 for a sedan. Our published mobile pricing is ${money(pkg("refresh").price.sedan)} for ${pkg("refresh").name} and ${money(pkg("showroom").price.sedan)} for ${pkg("showroom").name}, with size surcharges of ${suvRange} for SUVs and trucks and ${rowRange} for 3-row vehicles.`,
  },
  {
    q: "Is mobile detailing more expensive than a detailing shop?",
    a: "Not with us. Our package prices sit at or below typical Calgary shop rates for comparable work, and you also save the two round trips and the time off work that a shop booking requires.",
  },
  {
    q: "Why do SUVs and trucks cost more to detail?",
    a: `More carpet, more glass, more panels and deeper crevices — a 3-row SUV can take an extra hour of labour and noticeably more product. We publish those surcharges up front rather than adjusting the price on arrival: ${suvRange} for SUVs and trucks, ${rowRange} for 3-row SUVs and minivans depending on the package.`,
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
    a: "No travel fee within Calgary, Airdrie, Chestermere, Cochrane, Okotoks and Rocky View County. Call 587-500-4523 if you're further out and we'll confirm before booking.",
  },
];

const PriceComparison = () => (
  <PageTransition>
    <div className="min-h-screen">
      <SEO
        title="Calgary Car Detailing Prices Compared"
        description="Real 2026 car detailing prices in Calgary. Compare our mobile detailing packages against shop-based rates — interior, complete, correction and ceramic coating."
        canonical="/calgary-detailing-price-comparison"
        jsonLd={[
          localBusinessJsonLd,
          buildFAQJsonLd(faqs),
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Calgary Car Detailing Prices: Mobile vs Shop Comparison",
            description:
              "A transparent price comparison of mobile and shop-based car detailing in Calgary, including interior, complete, paint correction and ceramic coating.",
            author: { "@type": "Organization", name: "Xpress Auto Detailing" },
            publisher: { "@type": "Organization", name: "Xpress Auto Detailing" },
            mainEntityOfPage:
              "https://xpressautodetail.ca/calgary-detailing-price-comparison",
          },
        ]}
      />
      <Navbar />
        <AutoBreadcrumbs />
      {/* Hero */}
      <section className="pt-28 pb-16 bg-foreground">
        <div className="container max-w-4xl text-center px-4">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 text-primary font-heading font-bold text-xs mb-4">
              <DollarSign className="w-4 h-4" /> Calgary Pricing Guide · 2026
            </span>
            <h1 className="font-heading font-semibold text-3xl sm:text-4xl md:text-5xl text-background mb-5 leading-tight">
              Car Detailing Prices in Calgary:{" "}
              Mobile vs Shop
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
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-heading font-bold px-8 py-3.5 rounded-lg text-sm hover:bg-primary/90 transition-colors"
              >
                Book Online <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={`tel:${PHONE}`}
                className="inline-flex items-center justify-center gap-2 border border-background/30 text-background font-heading font-bold px-8 py-3.5 rounded-lg text-sm hover:bg-background/10 transition-colors"
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
            <h2 className="font-heading font-semibold text-2xl sm:text-3xl text-foreground text-center mb-3">
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
                    <th className="p-4 font-heading font-bold text-xs text-foreground">
                      Service
                    </th>
                    <th className="p-4 font-heading font-bold text-xs text-primary">
                      Xpress (Mobile)
                    </th>
                    <th className="p-4 font-heading font-bold text-xs text-foreground">
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
                      <td className="p-4 font-heading font-semibold text-lg text-primary whitespace-nowrap">
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
              Sedan pricing shown. Car package surcharges: SUVs and trucks {suvRange}, 3-row SUVs and minivans{" "}
              {rowRange}. Ceramic coating: SUVs +{money(CERAMIC_UPCHARGE.suv)}, 3-row +{money(CERAMIC_UPCHARGE.minivan)}.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-16 bg-muted/40">
        <div className="container max-w-4xl px-4">
          <ScrollReveal>
            <h2 className="font-heading font-semibold text-2xl sm:text-3xl text-foreground text-center mb-10">
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
              <Link to="/detailing?tab=add-ons" className="text-primary font-semibold hover:underline">
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
            <h2 className="font-heading font-semibold text-2xl sm:text-3xl text-foreground text-center mb-3">
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
            <h2 className="font-heading font-semibold text-2xl sm:text-3xl text-background text-center mb-4">
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
              delivers the same result at your address. Call and we'll
              tell you honestly which service your vehicle needs.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Value picks */}
      <section className="py-16 bg-background">
        <div className="container max-w-5xl px-4">
          <ScrollReveal>
            <h2 className="font-heading font-semibold text-2xl sm:text-3xl text-foreground text-center mb-10">
              Best Value by What You're Trying to Do
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: Sparkles,
                title: "Selling or trading in",
                pick: `${pkg("showroom").name}, ${money(pkg("showroom").price.sedan)}`,
                desc: "A full inside-and-out reset before photos and appraisal, so the car shows at its best to buyers and dealers.",
                to: "/detailing",
              },
              {
                icon: ShieldCheck,
                title: "Keeping a car long-term",
                pick: "System X 9-Year Graphene",
                desc: "Lowest cost per year of protection if you hold vehicles 5+ years, and salt rinses off far easier through Calgary winters.",
                to: "/ceramic-paint-correction",
              },
              {
                icon: Clock,
                title: "Staying clean year-round",
                pick: "The Xpress Pass monthly plan",
                desc: "Recurring maintenance beats repeated one-off deep cleans on price per visit, plus discounts on every add-on.",
                to: "/xpress-pass",
              },
            ].map((c, i) => (
              <ScrollReveal key={c.title} delay={0.05 * i}>
                <div className="h-full flex flex-col bg-background border border-border rounded-xl p-6 hover:border-primary/40 transition-colors">
                  <c.icon className="w-6 h-6 text-primary mb-3" />
                  <h3 className="font-heading font-bold text-foreground mb-1">
                    {c.title}
                  </h3>
                  <p className="font-heading font-semibold text-primary text-sm mb-3">
                    {c.pick}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">
                    {c.desc}
                  </p>
                  <Link
                    to={c.to}
                    className="inline-flex items-center gap-1.5 text-primary font-heading font-bold text-xs hover:gap-2.5 transition-all"
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
            <h2 className="font-heading font-semibold text-2xl sm:text-3xl text-foreground text-center mb-8">
              What's Included in Every Price
            </h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {[
                "Travel within Calgary, Airdrie, Chestermere, Cochrane, Okotoks & Rocky View County",
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
          <h2 className="font-heading font-semibold text-xl sm:text-2xl text-primary-foreground mb-3">
            Know the Price Before You Book
          </h2>
          <p className="text-primary-foreground/80 max-w-lg mx-auto mb-6 text-sm">
            Pick your package online, or call for a custom quote on ceramic
            coating and correction.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-primary-foreground text-primary font-heading font-bold px-8 py-3.5 rounded-lg text-sm hover:bg-primary-foreground/90 transition-colors"
            >
              Book Now <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={`tel:${PHONE}`}
              className="inline-flex items-center justify-center gap-2 border border-primary-foreground/40 text-primary-foreground font-heading font-bold px-8 py-3.5 rounded-lg text-sm hover:bg-primary-foreground/10 transition-colors"
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
