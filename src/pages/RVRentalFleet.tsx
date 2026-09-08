import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import ServicePageHero from "@/components/ServicePageHero";
import ServiceFAQ from "@/components/ServiceFAQ";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import ScrollReveal from "@/components/ScrollReveal";
import FleetQuoteForm from "@/components/FleetQuoteForm";
import SEO, { buildServiceJsonLd, buildFAQJsonLd } from "@/components/SEO";
import { Check, Phone } from "lucide-react";
import rvHero from "@/assets/gallery-rv-surveyor-full.jpg";
import { RV_FLEET, PHONE, money } from "@/data/pricing";
import { WATER_LINE } from "@/data/copy";

const TIER_DETAIL: Record<string, { blurb: string; includes: string[] }> = {
  "Turnover Basic": {
    blurb: "Between-rental reset so the next customer walks into a clean unit.",
    includes: [
      "Interior vacuum throughout",
      "Kitchen and bathroom sanitized",
      "All glass and mirrors",
      "Surfaces wiped and dressed",
      "Exterior rinse",
    ],
  },
  "Turnover Plus": {
    blurb: "Everything in Basic plus the exterior and the details renters notice.",
    includes: [
      "Everything in Turnover Basic",
      "Full exterior hand wash",
      "Bug and road film removal",
      "Upholstery spot treatment",
      "Storage bays and steps",
      "Odour treatment as needed",
    ],
  },
  "Seasonal Refresh": {
    blurb: "Start or end of season deep reset for units coming out of or going into storage.",
    includes: [
      "Everything in Turnover Plus",
      "Deep interior extraction",
      "Ceramic sealant on sidewalls",
      "UV protectant on roof and seals",
      "Awning and slide-out cleaning",
      "Condition report with photos",
    ],
  },
};

const faqs = [
  {
    q: "Do you handle whole rental fleets?",
    a: "Yes. We schedule around your turnover windows and can process multiple units in a single visit at your lot.",
  },
  {
    q: "Are these prices fixed?",
    a: "They are starting points. Rental units vary enormously by length, layout and condition, so we confirm the per-unit rate after seeing the fleet. Volume changes the number too.",
  },
  {
    q: "How fast is a turnover?",
    a: "A Turnover Basic on a mid-size unit is typically 1.5–2 hours. Turnover Plus runs 3–4 hours. We can run several units in parallel on larger jobs.",
  },
  {
    q: "Do you need power and water at the lot?",
    a: WATER_LINE,
  },
  {
    q: "Can we get monthly invoicing?",
    a: "Yes. Fleet and rental accounts are invoiced monthly with a per-unit breakdown.",
  },
];

const RVRentalFleet = () => (
  <PageTransition>
    <div className="min-h-screen pb-16 lg:pb-0">
      <SEO
        title="RV Rental Fleet Care Calgary"
        description="Turnover cleaning and seasonal refresh for RV rental fleets in Calgary. Per-unit pricing, monthly invoicing, we come to your lot."
        canonical="/rv-trailer/rental-fleet"
        jsonLd={[
          buildServiceJsonLd(
            "RV Rental Fleet Care",
            "Turnover cleaning and seasonal detailing for RV rental fleets in Calgary and area.",
            "/rv-trailer/rental-fleet",
          ),
          buildFAQJsonLd(faqs),
        ]}
      />
      <Navbar />
      <AutoBreadcrumbs />
      <ServicePageHero title="RV Rental Fleet Care" image={rvHero} ctaType="call" />

      <section className="py-14 sm:py-20 bg-background">
        <div className="container max-w-3xl px-6 text-center">
          <ScrollReveal>
            <h1 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase text-foreground mb-5">
              Fast turnovers. Consistent units.
            </h1>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              Rental reviews live and die on how the unit smelled and looked at pickup. We work at your lot on
              your turnover schedule so units go back out ready.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-foreground">
        <div className="container px-4 sm:px-6">
          <div className="grid gap-5 lg:grid-cols-3 max-w-5xl mx-auto">
            {RV_FLEET.map((tier) => {
              const d = TIER_DETAIL[tier.name];
              return (
                <article
                  key={tier.name}
                  className="flex flex-col rounded-2xl border border-background/15 bg-background/[0.04] p-6"
                >
                  <h2 className="font-heading text-lg font-bold text-background">{tier.name}</h2>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-sm text-background/60">from</span>
                    <span className="font-heading text-3xl font-black text-background tabular-nums">
                      {money(tier.price)}
                    </span>
                    <span className="text-sm text-background/60">{tier.unit}</span>
                  </div>
                  <p className="mt-3 text-sm text-background/70">{d?.blurb}</p>
                  <ul className="mt-5 space-y-2">
                    {d?.includes.map((i) => (
                      <li key={i} className="flex gap-2 text-sm text-background/80">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                        {i}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-background/55">
            Rental fleets are highly customizable. These are starting rates — length, layout, condition and
            volume all move the number, so we quote your fleet properly before any work begins.
          </p>
        </div>
      </section>

      <ServiceFAQ title="Rental fleet FAQs" faqs={faqs} />

      <section className="py-14 sm:py-20 bg-secondary/40">
        <div className="container max-w-2xl px-4 sm:px-6">
          <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-foreground text-center mb-6">
            Request a fleet quote
          </h2>
          <FleetQuoteForm />
          <div className="mt-8 text-center">
            <a
              href={`tel:${PHONE.replace(/-/g, "")}`}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-border px-8 text-sm font-bold text-foreground transition-colors hover:border-primary"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Or call {PHONE}
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <div className="h-20 lg:hidden" />
      <StickyMobileCTA />
    </div>
  </PageTransition>
);

export default RVRentalFleet;
