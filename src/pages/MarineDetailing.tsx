import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import ServicePageHero from "@/components/ServicePageHero";
import ServiceFAQ from "@/components/ServiceFAQ";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import ScrollReveal from "@/components/ScrollReveal";
import PerFootCalculator from "@/components/PerFootCalculator";
import AssessmentForm from "@/components/AssessmentForm";
import SEO, { buildServiceJsonLd, buildFAQJsonLd } from "@/components/SEO";
import { Phone, ArrowRight } from "lucide-react";
import marineHeroAsset from "@/assets/marine-pontoon-sunset.jpg.asset.json";
import marineTubesAsset from "@/assets/marine-pontoon-tubes.jpg.asset.json";
import marineInteriorAsset from "@/assets/marine-interior-seats.jpg.asset.json";
import marineLoungeAsset from "@/assets/marine-seating-lounge.jpg.asset.json";
import marineSideAsset from "@/assets/marine-side-profile.jpg.asset.json";
import marineDecalAsset from "@/assets/marine-decal-detail.jpg.asset.json";
import boatAquaholicAsset from "@/assets/boat-aquaholic-side.jpg.asset.json";
import marineHelmAsset from "@/assets/marine-helm-seat.jpg.asset.json";
import { MARINE_SERVICES, PHONE, money } from "@/data/pricing";
import { WATER_LINE, GUARANTEES } from "@/data/copy";

const faqs = [
  {
    q: "How is boat detailing priced?",
    a: "Per foot of length for wash, interior, polish and coating work. A 22 ft pontoon on Full Interior + Exterior at $42/ft is $924. Aluminum pontoon acid restoration is priced per side, not per foot.",
  },
  {
    q: "What is aluminum pontoon acid restoration?",
    a: "Pontoon tubes oxidize and stain below the waterline. An acid restoration strips that film and brings the aluminum back to a bright, even finish. It is a standalone service at $300 per side.",
  },
  {
    q: "Do you come to the marina or my storage lot?",
    a: `Yes. ${WATER_LINE} We detail on the trailer, on the hoist or in the yard.`,
  },
  {
    q: "How long does a marine ceramic coating last?",
    a: "Two to three seasons on gelcoat with normal use, longer if the boat is covered or stored indoors. It keeps water spotting and UV chalking off the hull and makes wash-downs far quicker.",
  },
  {
    q: "Can you clean vinyl seating and mildew?",
    a: "Yes. Vinyl seating is cleaned and conditioned as part of interior work. For boats that keep growing mildew, interior seat ceramic coating at $650 seals the vinyl so it stops taking hold.",
  },
];

const GALLERY = [
  { src: marineSideAsset.url, alt: "Pontoon boat side profile after full detail in Calgary" },
  { src: marineTubesAsset.url, alt: "Restored aluminum pontoon tubes after acid restoration" },
  { src: marineInteriorAsset.url, alt: "Cleaned and conditioned marine vinyl seating" },
  { src: marineLoungeAsset.url, alt: "Boat lounge seating after interior detail" },
  { src: boatAquaholicAsset.url, alt: "Detailed boat hull with polished gelcoat" },
  { src: marineDecalAsset.url, alt: "Close-up of restored boat decal and gelcoat" },
  { src: marineHelmAsset.url, alt: "Detailed marine helm seat and console" },
];

const MarineDetailing = () => (
  <PageTransition>
    <div className="min-h-screen pb-16 lg:pb-0">
      <SEO
        title="Boat & Pontoon Detailing Calgary"
        description="Mobile marine detailing in Calgary: wash and wax, gelcoat polish, marine ceramic coating and aluminum pontoon acid restoration. Priced per foot."
        canonical="/marine"
        jsonLd={[
          buildServiceJsonLd(
            "Marine & Pontoon Detailing",
            "Mobile boat and pontoon detailing, polishing and ceramic coating in Calgary and area.",
            "/marine",
          ),
          buildFAQJsonLd(faqs),
        ]}
      />
      <Navbar />
      <AutoBreadcrumbs />
      <ServicePageHero title="Marine & Pontoon Detailing" image={marineHeroAsset.url} ctaType="call" />

      <section className="py-14 sm:py-20 bg-background">
        <div className="container max-w-3xl px-6 text-center">
          <ScrollReveal>
            <h1 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase text-foreground mb-5">
              Gelcoat, vinyl and aluminum — back to new.
            </h1>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              Alberta boats sit dry, dusty and in hard sun. We polish chalked gelcoat, clean and protect vinyl,
              and restore stained pontoon tubes — at the marina, the storage yard or your driveway.
            </p>
            <ul className="mt-6 flex flex-wrap justify-center gap-2">
              {GUARANTEES.map((g) => (
                <li
                  key={g}
                  className="rounded-full border border-border px-4 py-1.5 text-xs font-semibold text-muted-foreground"
                >
                  {g}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* Services & pricing */}
      <section className="py-14 sm:py-20 bg-foreground">
        <div className="container max-w-3xl px-4 sm:px-6">
          <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-background text-center mb-8">
            Marine pricing
          </h2>
          <ul className="divide-y divide-background/10 overflow-hidden rounded-2xl border border-background/15 bg-background/[0.04]">
            {MARINE_SERVICES.map((s) => (
              <li key={s.name} className="flex items-center justify-between gap-4 p-4 sm:px-6">
                <span className="text-sm sm:text-base text-background/85">{s.name}</span>
                <span className="whitespace-nowrap font-heading text-lg font-black text-background tabular-nums">
                  {money(s.price)}
                  <span className="ml-1 text-sm font-semibold text-background/60">{s.unit}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center text-xs text-background/50">
            Per-foot services are multiplied by overall length. Aluminum restoration is per pontoon side.
          </p>
        </div>
      </section>

      {/* Estimator */}
      <section className="py-14 sm:py-20 bg-secondary/40">
        <div className="container max-w-3xl px-4 sm:px-6">
          <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-foreground text-center mb-8">
            Estimate your boat
          </h2>
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
      </section>

      {/* Gallery */}
      <section className="py-14 sm:py-20 bg-background">
        <div className="container px-4 sm:px-6">
          <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-foreground text-center mb-8">
            Recent marine work
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            {GALLERY.map((g) => (
              <img
                key={g.alt}
                src={g.src}
                alt={g.alt}
                loading="lazy"
                width={800}
                height={600}
                className="aspect-[4/3] w-full rounded-2xl object-cover"
              />
            ))}
          </div>
        </div>
      </section>

      <ServiceFAQ title="Marine detailing FAQs" faqs={faqs} />

      <section className="py-14 sm:py-20 bg-secondary/40">
        <div className="container max-w-2xl px-4 sm:px-6">
          <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-foreground text-center mb-6">
            Book a look at your boat
          </h2>
          <AssessmentForm />
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-background">
        <div className="container px-6 text-center">
          <a
            href={`tel:${PHONE.replace(/-/g, "")}`}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-primary px-8 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call {PHONE}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </section>

      <Footer />
      <div className="h-20 lg:hidden" />
      <StickyMobileCTA />
    </div>
  </PageTransition>
);

export default MarineDetailing;
