import { Building2, CalendarClock, FileText, Receipt } from "lucide-react";
import LpShell from "@/components/lp/LpShell";
import { LpClose, LpHeading, LpHero, LpProof, LpTrust, lpCta } from "@/components/lp/LpBlocks";
import LpReceipts from "@/components/lp/LpReceipts";
import QuoteForm from "@/components/QuoteForm";
import ServiceFAQ from "@/components/ServiceFAQ";
import CompanyLogos from "@/components/CompanyLogos";
import { FIVE_STAR_REVIEWS } from "@/data/pricing";
import { COVERAGE, WATER_LINE } from "@/data/copy";
import small from "@/assets/lp/fleet-640.webp";
import large from "@/assets/lp/fleet-1050.webp";

const CTA = "Request a yard walk";

const STEPS = [
  { icon: Building2, title: "Yard walk", body: "We visit, count units and note vehicle types and condition." },
  { icon: FileText, title: "Written rate", body: "You get a per-unit rate and a proposed schedule, in writing." },
  { icon: CalendarClock, title: "Off-hours rotation", body: "Early morning, evening or weekend, so trucks aren't pulled off the road." },
  { icon: Receipt, title: "One monthly invoice", body: "A single invoice with a per-unit breakdown and net terms." },
];

const faqs = [
  {
    q: "How is fleet work priced?",
    a: "Per unit, on a rate set after we see the fleet. Vehicle type, condition, frequency and how many units we can do in one visit all affect the rate. Larger and more frequent fleets get better per-unit pricing.",
  },
  { q: "Do you need water and power at our yard?", a: WATER_LINE },
  {
    q: "Can you work outside business hours?",
    a: "Yes. Most fleet work happens early morning, evenings or weekends so vehicles aren't pulled off the road during the day.",
  },
  { q: "Do you invoice monthly?", a: "Yes. Fleet accounts are invoiced monthly with a per-unit breakdown and net terms." },
];

/** Paid-ad landing page: fleet and dealership accounts. */
const FleetLp = () => (
  <LpShell
    title="Fleet Detailing Calgary | Per-Unit Rates, Monthly Invoicing"
    description="On-site fleet washing and detailing for work trucks, vans, dealer inventory and heavy equipment. Per-unit rates in writing, off-hours rotations, one monthly invoice."
    canonical="/lp/fleet"
    quoteLabel="Yard walk"
  >
    <LpHero
      eyebrow="Fleet & dealership accounts"
      title="Your fleet, cleaned on your lot — on a written per-unit rate."
      sub="Work trucks, vans, dealer inventory and heavy equipment, washed and detailed where they park. Our vans bring their own water and power."
      points={["Per-unit rates in writing", "Off-hours rotations: early, evening or weekend", "One monthly invoice with a per-unit breakdown"]}
      image={{ small, large, alt: "Ford Transit fleet van during on-site cleaning" }}
      form={
        <QuoteForm
          source="lp-fleet"
          title={CTA}
          defaultVehicle="Fleet"
          defaultNeed="Not sure"
          contactOnly
          submitLabel={CTA}
          confirmation="Got it — we'll call to book your yard walk, usually within 15 minutes during the day."
        />
      }
    />

    <LpProof
      items={[
        { strong: FIVE_STAR_REVIEWS, rest: "five-star Google reviews" },
        { strong: COVERAGE.replace(/ liability coverage$/, ""), rest: "liability coverage" },
        { strong: "Per unit", rest: "rates in writing" },
        { strong: "Monthly", rest: "invoicing, net terms" },
      ]}
    />

    <section className="section-y bg-surface">
      <div className="shell">
        <LpHeading title="How a fleet account works" />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.title} className="rounded-card border border-line bg-surface p-6">
              <div className="flex items-center justify-between">
                <s.icon className="h-6 w-6 text-electric" aria-hidden="true" />
                <span className="num text-sm text-muted-ink">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-6 font-heading text-2xl font-bold text-ink">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{s.body}</p>
            </li>
          ))}
        </ol>
        <a href="#quote" className={`${lpCta} mt-8`}>
          {CTA}
        </a>
      </div>
    </section>

    <CompanyLogos />

    <LpReceipts
      slugs={["cat-320-excavator", "dirtt-transit-vans", "acura-dealership"]}
      title="Recent fleet work"
      intro="Heavy equipment, service vans and dealer inventory, done on the client's own lot."
    />

    <LpTrust />
    <ServiceFAQ title="Questions" faqs={faqs} />
    <LpClose title="Start with a yard walk" body="We come count the units and send a written per-unit rate. No obligation." cta={CTA} />
  </LpShell>
);

export default FleetLp;
