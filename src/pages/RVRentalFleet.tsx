import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import ServicePageHero from "@/components/ServicePageHero";
import ServiceFAQ from "@/components/ServiceFAQ";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import FleetQuoteForm from "@/components/FleetQuoteForm";
import ClosingCTA from "@/components/site/ClosingCTA";
import { Section, SectionHeading } from "@/components/site/Section";
import SEO, { buildServiceJsonLd, buildFAQJsonLd } from "@/components/SEO";
import { Check } from "lucide-react";
import rvHero from "@/assets/jobs/hero-rv-rental.webp";
import { PHOTOS, CLIPS } from "@/data/photos";
import WorkShowcase from "@/components/site/WorkShowcase";
import { RV_FLEET, money } from "@/data/pricing";
import { NAP, WATER_LINE } from "@/data/copy";
import QualityProducts from "@/components/site/QualityProducts";

const TIER_DETAIL: Record<string, { blurb: string; includes: string[] }> = {
  "Turnover Basic": {
    blurb: "Between-rental reset so the next customer walks into a clean unit.",
    includes: ["Interior vacuum throughout", "Kitchen and bathroom sanitized", "All glass and mirrors", "Surfaces wiped and dressed", "Exterior rinse"],
  },
  "Turnover Plus": {
    blurb: "Everything in Basic plus the exterior and the details renters notice.",
    includes: ["Everything in Turnover Basic", "Full exterior hand wash", "Bug and road film removal", "Upholstery spot treatment", "Storage bays and steps", "Odour treatment as needed"],
  },
  "Seasonal Refresh": {
    blurb: "Start or end of season reset for units coming out of or going into storage.",
    includes: ["Everything in Turnover Plus", "Deep interior extraction", "Ceramic sealant on sidewalls", "UV protectant on roof and seals", "Awning and slide-out cleaning", "Condition report with photos"],
  },
};

const faqs = [
  { q: "Do you handle whole rental fleets?", a: "Yes. We schedule around your turnover windows and can process multiple units in a single visit at your lot." },
  {
    q: "Are these prices fixed?",
    a: "They're starting points. Rental units vary by length, layout and condition, so we confirm the per-unit rate after seeing the fleet. Volume changes the number too.",
  },
  {
    q: "How fast is a turnover?",
    a: "A Turnover Basic on a mid-size unit is typically 1.5 to 2 hours. Turnover Plus runs 3 to 4 hours. We can run several units in parallel on larger jobs.",
  },
  { q: "Do you need power and water at the lot?", a: WATER_LINE },
  { q: "Can we get monthly invoicing?", a: "Yes. Fleet and rental accounts are invoiced monthly with a per-unit breakdown." },
];

const RVRentalFleet = () => (
  <PageTransition>
    <div className="min-h-screen bg-canvas pb-16 lg:pb-0">
      <SEO
        title="RV Rental Fleet Care Calgary"
        description={`Turnover cleaning and seasonal refresh for RV rental fleets in Calgary, from ${money(
          Math.min(...RV_FLEET.map((t) => t.price)),
        )} per unit. Monthly invoicing, done at your lot.`}
        canonical="/rv-trailer/rental-fleet"
        jsonLd={[
          buildServiceJsonLd("RV Rental Fleet Care", "Turnover cleaning and seasonal detailing for RV rental fleets in Calgary and area.", "/rv-trailer/rental-fleet"),
          buildFAQJsonLd(faqs),
        ]}
      />
      <Navbar />
      <AutoBreadcrumbs />
      <ServicePageHero
        title="RV rental fleet care"
        subtitle="Rental reviews live and die on how the unit smelled and looked at pickup. We work at your lot on your turnover schedule so units go back out ready."
        image={rvHero}
        ctaType="call"
      />

      <Section tone="dark">
        <SectionHeading
          dark
          title="Turnover programs"
          intro="Starting per-unit rates. Length, layout, condition and volume all move the number, so we quote your fleet properly before any work begins."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {RV_FLEET.map((tier) => {
            const d = TIER_DETAIL[tier.name];
            return (
              <article key={tier.name} className="flex flex-col rounded-[10px] border border-primary-foreground/15 bg-primary-foreground/[0.04] p-6 sm:p-7">
                <h3 className="font-heading text-xl font-semibold text-primary-foreground">{tier.name}</h3>
                <p className="mt-3">
                  <span className="text-sm text-primary-foreground/60">From </span>
                  <span className="font-heading text-4xl font-semibold tracking-tight tabular-nums text-primary-foreground">{money(tier.price)}</span>
                  <span className="text-sm text-primary-foreground/60"> {tier.unit}</span>
                </p>
                <p className="mt-4 text-sm leading-relaxed text-primary-foreground/70">{d?.blurb}</p>
                <ul className="mt-5 space-y-2">
                  {d?.includes.map((i) => (
                    <li key={i} className="flex gap-2 text-sm text-primary-foreground/80">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-electric" aria-hidden="true" />
                      {i}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </Section>

      <Section tone="surface" id="quote">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Request a fleet quote</h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-2">
              Tell us how many units, their lengths and your turnover windows. Or call or text {NAP.phone}.
            </p>
          </div>
          <FleetQuoteForm title="Your rental fleet" subtitle="Unit count, lengths and how often they turn over." />
        </div>
      </Section>

      <WorkShowcase
        title="Recent RV work"
        photos={PHOTOS.rv}
        clips={[CLIPS.rvCrewWash, CLIPS.rvInterior, CLIPS.trailerPolish, CLIPS.rvWalkaround]}
      />

      <ServiceFAQ title="Rental fleet questions" faqs={faqs} />


      <QualityProducts lines={["3m", "menzerna", "gtechniq", "systemx"]} />

      <ClosingCTA title="Units back out, ready" mode="quote" quoteHref="#quote" quoteLabel="Request a fleet quote" />

      <Footer />
      <div className="h-20 lg:hidden" />
      <StickyMobileCTA />
    </div>
  </PageTransition>
);

export default RVRentalFleet;
