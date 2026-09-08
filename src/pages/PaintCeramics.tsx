import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import ServicePageHero from "@/components/ServicePageHero";
import ServiceFAQ from "@/components/ServiceFAQ";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import ScrollReveal from "@/components/ScrollReveal";
import SEO, { buildServiceJsonLd, buildFAQJsonLd } from "@/components/SEO";
import ceramicHero from "@/assets/ceramic-hero.jpg";
import { Check, Phone, ArrowRight } from "lucide-react";
import { CERAMIC_PACKAGES, CERAMIC_UPCHARGE, PHONE, money } from "@/data/pricing";
import { CERAMIC_CERTIFICATIONS, GUARANTEES } from "@/data/copy";

const stages = [
  {
    n: "01",
    title: "Decontamination",
    desc: "Full hand wash, iron and tar removal, then clay bar. Coating over bonded contamination locks the dirt in — so it comes off first.",
  },
  {
    n: "02",
    title: "Correction",
    desc: "Machine polishing to remove swirls, wash marks and light scratches. One step for gloss, two steps when the paint needs real cutting.",
  },
  {
    n: "03",
    title: "Panel prep",
    desc: "Every panel is wiped down so no polishing oils are left behind. This is the step that decides whether a coating actually bonds.",
  },
  {
    n: "04",
    title: "Coating & cure",
    desc: "Coating applied panel by panel, levelled, then left to cure. Keep it dry for 24 hours and out of the car wash for a week.",
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
    a: "Every package includes machine work. Essential is a one-step enhancement, Signature and Elite are full two-step cut and polish. Correction is permanent, so it is worth doing properly before the coating goes on.",
  },
  {
    q: "How long does it take?",
    a: "Essential is a full day. Signature and Elite are two days, because the correction work and the cure time both need real time.",
  },
  {
    q: "Does it cost more for a truck or SUV?",
    a: `Yes — add ${money(CERAMIC_UPCHARGE.suv)} for an SUV or pickup and ${money(CERAMIC_UPCHARGE.minivan)} for a 3-row or van. Exotics and heavily modified paint are ${CERAMIC_UPCHARGE.exoticPct}% more.`,
  },
];

const PaintCeramics = () => (
  <PageTransition>
    <div className="min-h-screen pb-16 lg:pb-0">
      <SEO
        title="Ceramic Coating Calgary | Paint Correction"
        description="Ceramic coating and machine paint correction in Calgary. 1-year, 5-year and 9-year graphene packages, decontaminated, corrected and registered."
        canonical="/ceramic-paint-correction"
        jsonLd={[
          buildServiceJsonLd(
            "Ceramic Coating & Paint Correction",
            "Machine paint correction and certified ceramic coating packages in Calgary and area.",
            "/ceramic-paint-correction",
          ),
          buildFAQJsonLd(faqs),
        ]}
      />
      <Navbar />
      <AutoBreadcrumbs />
      <ServicePageHero
        title="Ceramic Coating & Paint Correction"
        image={ceramicHero}
        ctaType="call"
      />

      {/* Intro */}
      <section className="py-14 sm:py-20 bg-background">
        <div className="container max-w-3xl px-6 text-center">
          <ScrollReveal>
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase text-foreground mb-5">
              Correct the paint. Then protect it.
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              A coating locks in whatever the paint looks like on the day it goes on. That is why every package
              here starts with decontamination and machine work, and only then gets coated. Certified with{" "}
              {CERAMIC_CERTIFICATIONS.join(", ")}.
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

      {/* Packages */}
      <section className="py-14 sm:py-20 bg-foreground">
        <div className="container px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-10">
              <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase text-background">
                Coating Packages
              </h2>
              <p className="mt-4 mx-auto max-w-2xl text-sm sm:text-base text-background/60">
                Prices are for a sedan or coupe. Add {money(CERAMIC_UPCHARGE.suv)} for an SUV or pickup,{" "}
                {money(CERAMIC_UPCHARGE.minivan)} for a 3-row or van. Exotics {CERAMIC_UPCHARGE.exoticPct}% more.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-5 md:grid-cols-3">
            {CERAMIC_PACKAGES.map((p) => (
              <div
                key={p.id}
                className={`relative flex h-full flex-col rounded-2xl border p-6 sm:p-7 ${
                  p.popular
                    ? "border-primary/60 bg-background/[0.06] shadow-lg shadow-primary/10"
                    : "border-background/15 bg-background/[0.04]"
                }`}
              >
                {p.popular && (
                  <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-foreground">
                    Most booked
                  </span>
                )}
                <h3 className="font-heading font-black text-xl uppercase text-background">{p.name}</h3>
                <p className="mt-1 text-sm text-background/60">{p.coating}</p>
                <p className="mt-4 font-heading font-black text-3xl text-background">{money(p.price)}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-background/50">{p.correction}</p>

                <ul className="mt-6 flex-1 space-y-2.5">
                  {p.includes.map((inc) => (
                    <li key={inc} className="flex gap-2 text-sm text-background/75">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={`tel:${PHONE.replace(/-/g, "")}`}
                  className="mt-7 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Call for {p.name}
                </a>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-background/50">
            Coating work is quoted after we see the paint — call {PHONE} and we will book an inspection.
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="py-14 sm:py-20 bg-background">
        <div className="container max-w-4xl px-6">
          <ScrollReveal>
            <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-foreground text-center mb-10">
              How the work is done
            </h2>
          </ScrollReveal>
          <ol className="space-y-4">
            {stages.map((s) => (
              <li key={s.n} className="flex gap-5 rounded-2xl border border-border bg-card p-5 sm:p-6">
                <span className="font-heading font-black text-2xl text-primary/40 shrink-0">{s.n}</span>
                <div>
                  <h3 className="font-heading font-bold uppercase text-sm text-foreground mb-1">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ServiceFAQ title="Coating FAQs" faqs={faqs} />

      {/* Closing CTA */}
      <section className="py-16 sm:py-20 bg-foreground">
        <div className="container px-6 text-center">
          <ScrollReveal>
            <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-background mb-4">
              Not sure which coating you need?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-sm sm:text-base text-background/60">
              Tell us the vehicle, the age of the paint and how long you plan to keep it. We will tell you
              honestly which package is worth it.
            </p>
            <a
              href={`tel:${PHONE.replace(/-/g, "")}`}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-primary px-8 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Call {PHONE}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
      <div className="h-20 lg:hidden" />
      <StickyMobileCTA />
    </div>
  </PageTransition>
);

export default PaintCeramics;
