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
import { Link } from "react-router-dom";
import { Check, Phone, ArrowRight, Star } from "lucide-react";
import rvHero from "@/assets/rv-hero.jpg";
import rvOxidation from "@/assets/gallery-rv-oxidation-correction.jpg";
import rvSurveyorFront from "@/assets/gallery-rv-surveyor-front.jpg";
import rvSurveyorFull from "@/assets/gallery-rv-surveyor-full.jpg";
import rvPaintCloseup from "@/assets/gallery-rv-paint-correction-closeup.jpg";
import { RV_SERVICES, RV_BUNDLES, PHONE, money } from "@/data/pricing";
import { WATER_LINE, GUARANTEES } from "@/data/copy";

const faqs = [
  {
    q: "How is RV and trailer detailing priced?",
    a: "By the foot. You pick the services you want, we multiply by the length of the unit. A 30 ft trailer wash and seal at $24/ft is $720. Interior work is billed hourly at $90/hr.",
  },
  {
    q: "Do you come to my storage lot?",
    a: `Yes. ${WATER_LINE}`,
  },
  {
    q: "What is oxidation removal?",
    a: "Alberta sun chalks the gelcoat and fibreglass until the sidewalls go dull and white residue rubs off on your hand. Oxidation removal machine-polishes that layer back to gloss, then we seal it so it stays that way.",
  },
  {
    q: "When should I book storage prep?",
    a: "October and November, before the unit is parked for winter. Washing off road film and bugs and sealing the sidewalls stops them from etching over the cold months.",
  },
  {
    q: "How long does an RV detail take?",
    a: "A wash and seal on a 30 ft unit is roughly half a day. Full oxidation removal and restoration on the same unit is a one to two day job.",
  },
];

const GALLERY = [
  { src: rvSurveyorFull, alt: "Travel trailer after full exterior detail in Calgary" },
  { src: rvOxidation, alt: "RV sidewall during oxidation removal and gloss restoration" },
  { src: rvPaintCloseup, alt: "Close-up of corrected RV paint after polishing" },
  { src: rvSurveyorFront, alt: "Front cap of a detailed travel trailer" },
];

const TrailerRV = () => (
  <PageTransition>
    <div className="min-h-screen pb-16 lg:pb-0">
      <SEO
        title="RV & Trailer Detailing Calgary | Mobile"
        description="Mobile RV and trailer detailing in Calgary. Per-foot pricing for wash, ceramic sealant, UV protection and oxidation removal. We come to your storage lot."
        canonical="/rv-trailer"
        jsonLd={[
          buildServiceJsonLd(
            "RV & Trailer Detailing",
            "Mobile RV, trailer and motorhome detailing priced per foot across Calgary and area.",
            "/rv-trailer",
          ),
          buildFAQJsonLd(faqs),
        ]}
      />
      <Navbar />
      <AutoBreadcrumbs />
      <ServicePageHero title="RV & Trailer Detailing" image={rvHero} ctaType="call" />

      {/* Intro */}
      <section className="py-14 sm:py-20 bg-background">
        <div className="container max-w-3xl px-6 text-center">
          <ScrollReveal>
            <h1 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase text-foreground mb-5">
              Priced by the foot. Done where it's parked.
            </h1>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              {WATER_LINE} Wash, seal, UV protect or bring chalked sidewalls all the way back — pick only the
              services your unit needs.
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

      {/* Bundles */}
      <section className="py-14 sm:py-20 bg-foreground">
        <div className="container px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center mb-10">
            <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-background">
              Packages
            </h2>
            <p className="mt-3 text-sm sm:text-base text-background/70">
              Bundled per-foot rates. Cheaper than booking the same services separately.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            {RV_BUNDLES.map((b) => (
              <article
                key={b.id}
                className={`relative flex flex-col rounded-2xl border p-6 ${
                  b.popular
                    ? "border-primary bg-primary/10"
                    : "border-background/15 bg-background/[0.04]"
                }`}
              >
                {b.popular && (
                  <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-primary-foreground">
                    <Star className="h-3 w-3" aria-hidden="true" /> Most booked
                  </span>
                )}
                {b.seasonal && !b.popular && (
                  <span className="absolute -top-3 left-6 rounded-full border border-background/25 bg-foreground px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-background/80">
                    {b.seasonal}
                  </span>
                )}
                <h3 className="font-heading text-lg font-bold text-background">{b.name}</h3>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-heading text-3xl font-black text-background tabular-nums">
                    {money(b.price)}
                  </span>
                  <span className="text-sm text-background/60">{b.unit}</span>
                </div>
                <p className="mt-1 text-xs text-background/50">
                  <span className="line-through">{money(b.listPrice)}{b.unit}</span> · save {b.save}
                </p>
                <ul className="mt-5 space-y-2">
                  {b.includes.map((i) => (
                    <li key={i} className="flex gap-2 text-sm text-background/80">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      {i}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-background/50">
            Example: a 30 ft trailer on Wash &amp; Seal is {money(24 * 30)}.
          </p>
        </div>
      </section>

      {/* Estimator + à la carte */}
      <section className="py-14 sm:py-20 bg-secondary/40">
        <div className="container max-w-3xl px-4 sm:px-6">
          <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-foreground text-center mb-8">
            Build your own
          </h2>
          <PerFootCalculator
            services={RV_SERVICES}
            defaultLength={30}
            minLength={12}
            maxLength={45}
            lengthLabel="Unit length (feet)"
            title="RV & trailer estimator"
            note="Estimate only. Interior detailing is billed at $90/hr and decals are per decal. Final price confirmed after we see the unit."
          />
        </div>
      </section>

      {/* Gallery */}
      <section className="py-14 sm:py-20 bg-background">
        <div className="container px-4 sm:px-6">
          <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-foreground text-center mb-8">
            Recent RV work
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

      {/* Related */}
      <section className="pb-4 bg-background">
        <div className="container max-w-3xl px-6 flex flex-wrap justify-center gap-3">
          <Link
            to="/rv-trailer/ppf"
            className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:border-primary"
          >
            RV Paint Protection Film
          </Link>
          <Link
            to="/rv-trailer/rental-fleet"
            className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:border-primary"
          >
            RV Rental Fleet Care
          </Link>
          <Link
            to="/marine"
            className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:border-primary"
          >
            Marine &amp; Pontoon
          </Link>
        </div>
      </section>

      <ServiceFAQ title="RV detailing FAQs" faqs={faqs} />

      {/* Assessment */}
      <section className="py-14 sm:py-20 bg-secondary/40">
        <div className="container max-w-2xl px-4 sm:px-6">
          <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-foreground text-center mb-6">
            Not sure what it needs?
          </h2>
          <AssessmentForm />
        </div>
      </section>

      {/* Closing CTA */}
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

export default TrailerRV;
