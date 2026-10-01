import { useState } from "react";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import ServicePageHero from "@/components/ServicePageHero";
import ServiceFAQ from "@/components/ServiceFAQ";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import AssessmentForm from "@/components/AssessmentForm";
import GuaranteeStrip from "@/components/site/GuaranteeStrip";
import ProcessSteps from "@/components/site/ProcessSteps";
import ClosingCTA from "@/components/site/ClosingCTA";
import { Section, SectionHeading, btnPrimary, btnSecondaryDark } from "@/components/site/Section";
import SEO, { buildServiceJsonLd, buildFAQJsonLd } from "@/components/SEO";
import ceramicHero from "@/assets/ceramic-hero.jpg";
import { Check } from "lucide-react";
import { CERAMIC_PACKAGES, CERAMIC_UPCHARGE, money } from "@/data/pricing";
import { CERAMIC_CERTIFICATIONS, NAP } from "@/data/copy";
import QualityProducts from "@/components/site/QualityProducts";

const stages = [
  {
    title: "Decontamination",
    body: "Hand wash, iron and tar removal, then clay bar. Coating over bonded contamination locks the dirt in, so it comes off first.",
  },
  {
    title: "Correction",
    body: "Machine polishing removes swirls, wash marks and light scratches. One step for gloss, two when the paint needs real cutting.",
  },
  {
    title: "Panel prep",
    body: "Every panel is wiped down so no polishing oils are left. This step decides whether a coating actually bonds.",
  },
  {
    title: "Coating and cure",
    body: "Applied panel by panel, levelled, then left to cure. Keep it dry for 24 hours and out of the car wash for a week.",
  },
];

const faqs = [
  {
    q: "What does a ceramic coating actually do?",
    a: "It bonds to the clear coat and gives you a hard, slick, chemically resistant layer. Dirt and road film release far easier, water beads and rolls off, and the paint keeps its gloss instead of dulling out over Alberta winters.",
  },
  {
    q: "Do I still need to wash the car?",
    a: "Yes. A coating makes washing quicker and safer, it does not replace it. A regular maintenance wash keeps the coating performing for its full term.",
  },
  {
    q: "Is paint correction included?",
    a: "Every package includes machine work. Essential is a one-step enhancement, Signature and Elite are full two-step cut and polish. Correction is permanent, so it's worth doing properly before the coating goes on.",
  },
  {
    q: "How long does it take?",
    a: "Essential is a full day. Signature and Elite are two days, because the correction and the cure both need real time.",
  },
  {
    q: "Does it cost more for a truck or SUV?",
    a: `Yes. Add ${money(CERAMIC_UPCHARGE.suv)} for an SUV or pickup and ${money(CERAMIC_UPCHARGE.minivan)} for a 3-row or van. Exotics and heavily modified paint are ${CERAMIC_UPCHARGE.exoticPct}% more.`,
  },
  {
    q: "Why do you inspect the paint before booking?",
    a: "Paint condition decides how much correction a car needs. A free inspection means the price you're quoted is the price you pay, with no surprises on the day.",
  },
];

const SIZE_OPTIONS = [
  { id: "sedan" as const, label: "Sedan / Coupe", add: 0 },
  { id: "suv" as const, label: "SUV / Pickup", add: CERAMIC_UPCHARGE.suv },
  { id: "minivan" as const, label: "3-Row / Van", add: CERAMIC_UPCHARGE.minivan },
];

const PaintCeramics = () => {
  const [size, setSize] = useState<(typeof SIZE_OPTIONS)[number]["id"]>("sedan");
  const upcharge = SIZE_OPTIONS.find((s) => s.id === size)?.add ?? 0;

  return (
    <PageTransition>
      <div className="min-h-screen bg-canvas pb-16 lg:pb-0">
        <SEO
          title="Ceramic Coating Calgary | Paint Correction"
          description={`Ceramic coating and machine paint correction in Calgary, from ${money(
            Math.min(...CERAMIC_PACKAGES.map((p) => p.price)),
          )}. 1-year, 5-year and 9-year packages, decontaminated, corrected and registered.`}
          canonical="/ceramic-paint-correction"
          jsonLd={[
            buildServiceJsonLd(
              "Ceramic Coating & Paint Correction",
              "Machine paint correction and ceramic coating packages in Calgary and area.",
              "/ceramic-paint-correction",
            ),
            buildFAQJsonLd(faqs),
          ]}
        />
        <Navbar />
        <AutoBreadcrumbs />
        <ServicePageHero
          title="Ceramic coating and paint correction"
          subtitle={`A coating locks in whatever the paint looks like the day it goes on, so every package starts with decontamination and machine correction. ${CERAMIC_CERTIFICATIONS.join(", ")} coatings.`}
          image={ceramicHero}
          ctaType="call"
        />
        <GuaranteeStrip />

        <Section tone="dark" id="packages">
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <h2 className="font-heading text-3xl font-semibold tracking-tight text-primary-foreground sm:text-4xl">
                Coating packages
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-primary-foreground/65">
                Pick your vehicle size and the prices update. Exotics and heavily modified paint are{" "}
                {CERAMIC_UPCHARGE.exoticPct}% more.
              </p>
            </div>
            <div role="group" aria-label="Vehicle size" className="flex w-full shrink-0 gap-1 rounded-md bg-primary-foreground/10 p-1 sm:w-fit">
              {SIZE_OPTIONS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSize(s.id)}
                  aria-pressed={size === s.id}
                  className={`flex-1 rounded px-3 py-2 text-xs font-semibold transition-colors sm:flex-none sm:px-4 sm:text-sm ${
                    size === s.id ? "bg-electric text-primary-foreground" : "text-primary-foreground/70 hover:text-primary-foreground"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {CERAMIC_PACKAGES.map((p) => (
              <article
                key={p.id}
                className={`relative flex flex-col overflow-hidden rounded-[10px] border bg-primary-foreground/[0.04] p-6 sm:p-7 ${
                  p.popular ? "border-electric" : "border-primary-foreground/15"
                }`}
              >
                {p.popular && <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-electric" />}
                <p className="h-4 text-xs font-medium text-electric">{p.popular ? "Most booked" : ""}</p>
                <h3 className="mt-1 font-heading text-xl font-semibold text-primary-foreground">{p.name}</h3>
                <p className="mt-1 text-sm text-primary-foreground/60">{p.coating}</p>
                <p className="mt-4 font-heading text-4xl font-semibold tracking-tight tabular-nums text-primary-foreground">
                  {money(p.price + upcharge)}
                </p>
                <p className="mt-1 text-xs text-primary-foreground/50">{p.correction}</p>
                <ul className="mt-6 flex-1 space-y-2.5">
                  {p.includes.map((inc) => (
                    <li key={inc} className="flex gap-2 text-sm text-primary-foreground/75">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-electric" aria-hidden="true" />
                      {inc}
                    </li>
                  ))}
                </ul>
                <a href="#assessment" className={`${p.popular ? btnPrimary : btnSecondaryDark} mt-7`}>
                  Book a free paint inspection
                </a>
              </article>
            ))}
          </div>
          <p className="mt-6 text-xs text-primary-foreground/50">
            We confirm the package and price after a free paint inspection. Call or text {NAP.phone} to book one directly.
          </p>
        </Section>

        <Section tone="surface">
          <SectionHeading title="How the work is done" />
          <ProcessSteps steps={stages} />
        </Section>

        <ServiceFAQ title="Coating questions" faqs={faqs} />

        <Section tone="surface" id="assessment">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
            <div>
              <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                Book a free paint inspection
              </h2>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-2">
                Tell us the vehicle, how old the paint is and how long you plan to keep it. We'll look at it in person
                and tell you honestly which package is worth it.
              </p>
            </div>
            <AssessmentForm
              source="ceramic-inspection"
              title="Your vehicle"
              subtitle="Year, make and model is plenty to start."
            />
          </div>
        </Section>

        <QualityProducts lines={["systemx", "gtechniq", "gyeon", "menzerna"]} />


        <ClosingCTA
          title="Not sure which coating you need?"
          body="Call or text and we'll talk it through. No obligation."
          mode="quote"
          quoteHref="#assessment"
          quoteLabel="Book a free paint inspection"
        />

        <Footer />
        <div className="h-20 lg:hidden" />
        <StickyMobileCTA />
      </div>
    </PageTransition>
  );
};

export default PaintCeramics;
