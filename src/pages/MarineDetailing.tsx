import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import ServicePageHero from "@/components/ServicePageHero";
import { PhotoRail } from "@/components/site/PhotoRail";
import { PHOTOS } from "@/data/photos";
import ServiceFAQ from "@/components/ServiceFAQ";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import PerFootCalculator from "@/components/PerFootCalculator";
import AssessmentForm from "@/components/AssessmentForm";
import GuaranteeStrip from "@/components/site/GuaranteeStrip";
import ClosingCTA from "@/components/site/ClosingCTA";
import { Section, SectionHeading, cardDarkClass } from "@/components/site/Section";
import SEO, { buildServiceJsonLd, buildFAQJsonLd } from "@/components/SEO";
import marineHeroAsset from "@/assets/marine-pontoon-sunset.jpg.asset.json";
import { MARINE_SERVICES, money } from "@/data/pricing";
import { WATER_LINE } from "@/data/copy";
import QualityProducts from "@/components/site/QualityProducts";

const svc = (name: string) => MARINE_SERVICES.find((s) => s.name === name)!;
const full = svc("Full Interior + Exterior");
const acid = svc("Aluminum Pontoon Acid Restoration");
const seat = svc("Interior Seat Ceramic Coating");

const faqs = [
  {
    q: "How is boat detailing priced?",
    a: `Per foot of length for wash, interior, polish and coating work. A 22 ft pontoon on ${full.name} at ${money(full.price)}/ft is ${money(
      full.price * 22,
    )}. Aluminum pontoon acid restoration is priced per side, not per foot.`,
  },
  {
    q: "What is aluminum pontoon acid restoration?",
    a: `Pontoon tubes oxidize and stain below the waterline. An acid restoration strips that film and brings the aluminum back to a bright, even finish. It's a standalone service at ${money(acid.price)} per side.`,
  },
  { q: "Do you come to the marina or my storage lot?", a: `Yes. ${WATER_LINE} We detail on the trailer, on the hoist or in the yard.` },
  {
    q: "How long does a marine ceramic coating last?",
    a: "Two to three seasons on gelcoat with normal use, longer if the boat is covered or stored indoors. It keeps water spotting and UV chalking off the hull and makes wash-downs far quicker.",
  },
  {
    q: "Can you clean vinyl seating and mildew?",
    a: `Yes. Vinyl seating is cleaned and conditioned as part of interior work. For boats that keep growing mildew, interior seat ceramic coating from ${money(seat.price)} seals the vinyl so it stops taking hold.`,
  },
];

const MarineDetailing = () => (
  <PageTransition>
    <div className="min-h-screen bg-canvas pb-16 lg:pb-0">
      <SEO
        title="Boat & Pontoon Detailing Calgary"
        description="Mobile marine detailing in Calgary: wash and wax, gelcoat polish, marine ceramic coating and aluminum pontoon acid restoration. Priced per foot."
        canonical="/marine"
        jsonLd={[
          buildServiceJsonLd("Marine & Pontoon Detailing", "Mobile boat and pontoon detailing, polishing and ceramic coating in Calgary and area.", "/marine"),
          buildFAQJsonLd(faqs),
        ]}
      />
      <Navbar />
      <AutoBreadcrumbs />
      <ServicePageHero
        title="Marine and pontoon detailing"
        subtitle="Alberta boats sit dry, dusty and in hard sun. We polish chalked gelcoat, protect vinyl and restore stained pontoon tubes at the marina, the storage yard or your driveway."
        image={marineHeroAsset.url}
        ctaType="call"
      />
      <GuaranteeStrip />

      <Section tone="dark" id="pricing">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-primary-foreground sm:text-4xl">Marine pricing</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-primary-foreground/65">
              Per-foot services are multiplied by overall length. Aluminum restoration is per pontoon side.
            </p>
          </div>
          <ul className={`${cardDarkClass} divide-y divide-primary-foreground/10 overflow-hidden`}>
            {MARINE_SERVICES.map((s) => (
              <li key={s.name} className="flex items-center justify-between gap-4 px-5 py-4">
                <span className="text-[15px] text-primary-foreground/85">{s.name}</span>
                <span className="whitespace-nowrap font-heading text-lg font-semibold tabular-nums text-primary-foreground">
                  {money(s.price)}
                  <span className="ml-1 text-sm font-medium text-primary-foreground/55">{s.unit}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Estimate your boat</h2>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-ink-2">Pick the services and set the length of your boat.</p>
          </div>
          <PerFootCalculator
            services={MARINE_SERVICES}
            defaultLength={22}
            minLength={14}
            maxLength={40}
            lengthLabel="Boat length (feet)"
            title="Marine estimator"
            note="Estimate only. Aluminum restoration is per side and seat coating is a flat add. Final price confirmed after we see the boat."
          />
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading title="Recent marine work" />
        <PhotoRail photos={PHOTOS.marine} label="Recent marine photos" />
      </Section>

      <ServiceFAQ title="Marine questions" faqs={faqs} />

      <Section tone="surface" id="assessment">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Book a look at your boat</h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-2">
              We'll look at the gelcoat, vinyl and tubes in person and send a written per-foot quote.
            </p>
          </div>
          <AssessmentForm source="marine-assessment" title="Your boat" subtitle="Make, length and where it's stored is plenty to start." />
        </div>
      </Section>

      <QualityProducts lines={["3m", "menzerna", "gtechniq", "systemx"]} />


      <ClosingCTA title="Get it ready for the water" mode="quote" quoteHref="#assessment" quoteLabel="Book a free assessment" />

      <Footer />
      <div className="h-20 lg:hidden" />
      <StickyMobileCTA />
    </div>
  </PageTransition>
);

export default MarineDetailing;
