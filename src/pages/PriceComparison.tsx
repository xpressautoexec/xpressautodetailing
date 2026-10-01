import { Link } from "react-router-dom";
import { Clock, MapPin, DollarSign, Car, Phone } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import SEO, { buildFAQJsonLd, localBusinessJsonLd } from "@/components/SEO";
import ServiceFAQ from "@/components/ServiceFAQ";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import ClosingCTA from "@/components/site/ClosingCTA";
import { Section, SectionHeading, btnPrimary, btnSecondaryDark, cardClass, textLink } from "@/components/site/Section";
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
import { CERAMIC_CERTIFICATIONS, NAP, SERVICE_AREA_SENTENCE } from "@/data/copy";

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
    a: "A scheduled plan like the Xpress Pass. Recurring service costs far less per visit than repeated one-off deep cleans, because the vehicle never gets far enough gone to need full decontamination each time.",
  },
  {
    q: "Is a 9-year graphene ceramic coating worth the price?",
    a: "If you keep vehicles five years or longer, it usually costs less per year than repeated sealants and makes winter salt removal far easier. We are a System X authorized installer, so the 9-year coating carries a manufacturer warranty — the coating cost is quoted per vehicle after a paint inspection.",
  },
  {
    q: "Do you charge extra to travel in Calgary?",
    a: `No travel fee within ${SERVICE_AREA_SENTENCE}. Call ${PHONE} if you're further out and we'll confirm before booking.`,
  },
];

const PriceComparison = () => (
  <PageTransition>
    <div className="min-h-screen bg-canvas pb-16 lg:pb-0">
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
            author: { "@type": "Organization", name: "Xpress Auto & RV Detailing" },
            publisher: { "@type": "Organization", name: "Xpress Auto & RV Detailing" },
            mainEntityOfPage:
              "https://xpressautodetail.ca/calgary-detailing-price-comparison",
          },
        ]}
      />
      <Navbar />
        <AutoBreadcrumbs />
      <section className="bg-brand-dark">
        <div className="shell py-16 sm:py-24">
          <h1 className="max-w-3xl font-heading text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-primary-foreground sm:text-5xl">
            Car detailing prices in Calgary: mobile vs shop
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-primary-foreground/75 sm:text-lg">
            Every package we offer, what a comparable Calgary shop typically charges, and where the real cost
            difference shows up. No "call for pricing" on standard services.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
              Book a detail
            </a>
            <a href={NAP.phoneHref} className={btnSecondaryDark}>
              <Phone className="h-4 w-4" aria-hidden="true" /> {PHONE}
            </a>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeading
          title="Side-by-side prices"
          intro="Our published sedan pricing against the range Calgary shop-based detailers typically quote for comparable work. Shop ranges are estimates from published local menus and vary by provider and condition."
        />
        <div className={`${cardClass} overflow-x-auto`}>
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-line bg-canvas text-muted-ink">
              <tr>
                <th scope="col" className="px-5 py-3.5 font-medium">Service</th>
                <th scope="col" className="px-5 py-3.5 text-right font-medium">Xpress (mobile)</th>
                <th scope="col" className="px-5 py-3.5 text-right font-medium">Typical Calgary shop</th>
              </tr>
            </thead>
            <tbody>
              {priceRows.map((row) => (
                <tr key={row.service} className="border-b border-line align-top last:border-b-0">
                  <td className="px-5 py-4">
                    <Link to={row.link} className="font-semibold text-ink hover:text-electric">
                      {row.service}
                    </Link>
                    <p className="mt-1 max-w-md text-xs leading-relaxed text-muted-ink">{row.note}</p>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-right font-heading text-lg font-semibold tabular-nums text-ink">{row.ours}</td>
                  <td className="whitespace-nowrap px-5 py-4 text-right tabular-nums text-muted-ink">{row.shop}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-muted-ink">
          Sedan pricing shown. Car package surcharges: SUVs and trucks {suvRange}, 3-row SUVs and minivans {rowRange}.
          Ceramic coating: SUVs +{money(CERAMIC_UPCHARGE.suv)}, 3-row +{money(CERAMIC_UPCHARGE.minivan)}.
        </p>
      </Section>

      <Section tone="surface">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Add-on prices</h2>
            <p className="mt-4 text-[15px] text-ink-2">
              Published up front. Full list on the{" "}
              <Link to="/detailing#add-ons" className={textLink}>
                detailing page
              </Link>
              .
            </p>
          </div>
          <ul className={`${cardClass} divide-y divide-line`}>
            {addOnRows.map((a) => (
              <li key={a.name} className="flex items-center justify-between gap-4 px-5 py-3.5">
                <span className="text-[15px] text-ink">{a.name}</span>
                <span className="whitespace-nowrap font-heading font-semibold tabular-nums text-ink">{a.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section>
        <SectionHeading title="Where mobile saves you money" intro="The sticker price is only part of it." />
        <dl className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
          {mobileWins.map((w) => (
            <div key={w.title} className="border-t-2 border-ink pt-6">
              <dt className="font-heading text-lg font-semibold text-ink">{w.title}</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-ink-2">{w.desc}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section tone="dark">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-primary-foreground sm:text-4xl">
              When a shop is the better choice
            </h2>
            <p className="mt-4 text-[15px] text-primary-foreground/65">We'd rather tell you than sell you.</p>
          </div>
          <div>
            <ul className="space-y-4">
              {shopWins.map((s) => (
                <li key={s} className="border-b border-primary-foreground/10 pb-4 text-[15px] text-primary-foreground/85">
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[15px] leading-relaxed text-primary-foreground/65">
              For everything else (interior resets, complete details, correction, coatings and maintenance) mobile service
              delivers the same result at your address.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading title="Best value by goal" />
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              title: "Selling or trading in",
              pick: `${pkg("showroom").name}, ${money(pkg("showroom").price.sedan)}`,
              desc: "A full inside-and-out reset before photos and appraisal, so the car shows at its best.",
              to: "/detailing",
            },
            {
              title: "Keeping a car long-term",
              pick: "System X 9-year graphene coating",
              desc: "Lowest cost per year of protection if you keep vehicles five years or more.",
              to: "/ceramic-paint-correction",
            },
            {
              title: "Staying clean year-round",
              pick: "The Xpress Pass",
              desc: "Scheduled visits at member rates beat repeated one-off deep cleans, plus discounts on every add-on.",
              to: "/xpress-pass",
            },
          ].map((c) => (
            <Link key={c.title} to={c.to} className={`${cardClass} group flex flex-col p-6 transition-colors hover:border-ink-2`}>
              <h3 className="font-heading text-lg font-semibold text-ink">{c.title}</h3>
              <p className="mt-1 text-sm font-semibold text-electric">{c.pick}</p>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-2">{c.desc}</p>
            </Link>
          ))}
        </div>
      </Section>

      <ServiceFAQ title="Pricing questions" faqs={faqs} />
      <ClosingCTA title="Know the price before you book" body="Pick a package online, or call for a quote on coating and correction." />

      <Footer />
      <div className="h-20 lg:hidden" />
      <StickyMobileCTA />
    </div>
  </PageTransition>
);

export default PriceComparison;
