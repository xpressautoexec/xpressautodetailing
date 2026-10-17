import { useState } from "react";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import ServiceFAQ from "@/components/ServiceFAQ";
import ProcessSteps from "@/components/site/ProcessSteps";
import ClosingCTA from "@/components/site/ClosingCTA";
import { Section, SectionHeading, btnPrimary, btnSecondary, btnSecondaryDark } from "@/components/site/Section";
import SEO, { buildFAQJsonLd } from "@/components/SEO";
import { Check, Phone } from "lucide-react";
import { PHOTOS, CLIPS } from "@/data/photos";
import WorkShowcase from "@/components/site/WorkShowcase";
import xpressPassCard from "@/assets/xpress-pass-card.png";
import { XPRESS_PASS, PASS_ADDON_DISCOUNT, AUTO_PACKAGES, PASS_SIZES, type PassSizeId, money } from "@/data/pricing";
import { NAP } from "@/data/copy";
import QualityProducts from "@/components/site/QualityProducts";

const PERKS = [
  {
    title: "One included detail each cycle",
    body: "Your plan is tied to one vehicle. Confirm an available visit within each paid cycle.",
  },
  { title: `${PASS_ADDON_DISCOUNT}% off eligible add-ons`, body: "Add-ons and extra condition work are agreed before the visit and billed separately." },
  { title: "Plan changes in writing", body: "Give 30 days' written notice to cancel after the six-month initial commitment." },
  { title: "One pause each year", body: "Pause for up to 90 days once in a rolling 12-month period. The commitment end date moves with your pause." },
];

const monthlyFAQs = [
  {
    q: "How does the Xpress Pass work?",
    a: `Pick a plan for one vehicle: ${XPRESS_PASS.map((p) => `${p.name} ${p.frequency.toLowerCase()}`).join(", ")}. The first cycle is charged at enrollment. We arrange an available visit for each paid cycle.`,
  },
  {
    q: "Can I cancel or pause?",
    a: "The initial commitment is six months. After that, give 30 days' written notice to cancel. An early exit during the initial term costs $99 plus GST unless a documented waiver applies. One pause of up to 90 days is available per rolling 12 months; it extends the commitment by the pause length.",
  },
  {
    q: "Does the discount apply to add-ons?",
    a: `Yes. Members save ${PASS_ADDON_DISCOUNT}% on every add-on, every visit.`,
  },
  {
    q: "What about SUVs and trucks?",
    a: "Choose your vehicle class when you enroll. SUVs, three-row SUVs and minivans, and pickups each have their own published member price. Tell us about heavy condition or pet hair before the visit so we can quote any extra work first.",
  },
  {
    q: "When do I pay?",
    a: "Keep a card on file. The first cycle is charged when you enroll, before its included detail. Xpress initiates each later cycle charge before arranging that cycle's included visit. Prices shown are before GST.",
  },
  {
    q: "What if I miss a visit?",
    a: "A visit can be moved free with at least 24 hours' notice. Contact us before missing a cycle so we can agree on the next available visit; a pause follows the once-per-year policy above.",
  },
];

const PROCESS = [
  { title: "Choose your plan", body: "Pick your plan and vehicle class, review the six-month commitment, and add a card on file." },
  { title: "Pay and schedule", body: "The first cycle is charged at enrollment. Xpress initiates later charges; each paid cycle includes one visit to schedule." },
  { title: "We come to you", body: "Mobile service in Calgary, Airdrie, Cochrane and Chestermere. Other locations are reviewed by photo first." },
];

const MonthlyPlan = () => {
  const [size, setSize] = useState<PassSizeId>("sedan");

  return (
    <PageTransition>
      <div className="min-h-screen bg-canvas">
        <SEO
          title="The Xpress Pass | Detailing Membership Calgary"
          description={`Xpress Pass recurring mobile detailing. One included visit every 4, 8 or 13 weeks, with a six-month initial commitment and ${PASS_ADDON_DISCOUNT}% off eligible add-ons.`}
          canonical="/xpress-pass"
          jsonLd={[buildFAQJsonLd(monthlyFAQs)]}
        />
        <Navbar />
        <AutoBreadcrumbs />

        <section className="relative isolate overflow-hidden bg-brand-dark">
          <div className="shell grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-[1.1fr_1fr]">
            <div className="max-w-[38rem]">
              <h1 className="font-heading text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-primary-foreground sm:text-5xl lg:text-[3.5rem]">
                The Xpress Pass
              </h1>
              <p className="mt-6 text-base leading-relaxed text-primary-foreground/75 sm:text-lg">
                A detailing membership for one vehicle, with an included visit every 4, 8 or 13 weeks.
                Keep a card on file and enjoy {PASS_ADDON_DISCOUNT}% off eligible add-ons. Six-month initial commitment.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href={NAP.phoneHref} className={btnPrimary}>
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Call to join
                </a>
                <a href="#plans" className={btnSecondaryDark}>
                  See the plans
                </a>
              </div>
            </div>
            <img
              src={xpressPassCard}
              alt="The black metal Xpress Pass membership card"
              className="mx-auto w-full max-w-sm drop-shadow-2xl lg:max-w-md"
              width={1024}
              height={1024}
            />
          </div>
        </section>

        <Section id="plans">
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Plans</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-2">
                Prices are before GST. Your first cycle is charged at enrollment; Xpress initiates later cycle charges before each included visit.
              </p>
            </div>
            <div role="tablist" aria-label="Vehicle size" className="flex w-full shrink-0 gap-1 rounded-md border border-line bg-surface p-1 sm:w-fit">
              {PASS_SIZES.map((s) => (
                <button
                  key={s.id}
                  role="tab"
                  aria-selected={size === s.id}
                  onClick={() => setSize(s.id)}
                  className={`flex-1 rounded px-3 py-2 text-xs font-semibold transition-colors sm:flex-none sm:px-4 sm:text-sm ${
                    size === s.id ? "bg-electric text-primary-foreground" : "text-ink-2 hover:text-ink"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {XPRESS_PASS.map((plan) => {
              const pkg = AUTO_PACKAGES.find((p) => p.name === plan.service);
              return (
                <article
                  key={plan.id}
                  className={`relative flex flex-col overflow-hidden rounded-[10px] border bg-surface p-6 sm:p-7 ${
                    plan.popular ? "border-electric" : "border-line"
                  }`}
                >
                  {plan.popular && <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-electric" />}
                  <p className={`text-xs font-medium ${plan.popular ? "text-electric" : "text-muted-ink"}`}>
                    {plan.frequency}
                    {plan.popular ? ", most popular" : ""}
                  </p>
                  <h3 className="mt-1 font-heading text-2xl font-semibold text-ink">{plan.name}</h3>
                  <p className="mt-1 text-sm text-ink-2">
                    {plan.id === "maintain" ? "Members-only Upkeep" : `${plan.service}, ${plan.discount}% off the regular price`}
                  </p>
                  <p className="mt-5">
                    <span className="font-heading text-4xl font-semibold tracking-tight tabular-nums text-ink">
                      {money(plan.memberPrice[size])}
                    </span>
                    <span className="text-sm text-muted-ink"> / cycle + GST</span>
                    {pkg && plan.id !== "maintain" && <span className="ml-2 text-sm text-muted-ink line-through">{money(pkg.price[size])}</span>}
                  </p>
                  <ul className="mt-6 flex-1 space-y-2.5">
                    {(pkg?.includes ?? []).map((inc) => (
                      <li key={inc} className="flex gap-2 text-sm text-ink-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-electric" aria-hidden="true" />
                        {inc}
                      </li>
                    ))}
                    <li className="flex gap-2 text-sm font-semibold text-ink">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-electric" aria-hidden="true" />
                      {PASS_ADDON_DISCOUNT}% off every add-on
                    </li>
                  </ul>
                  <a href={NAP.phoneHref} className={`${plan.popular ? btnPrimary : btnSecondary} mt-7`}>
                    Join {plan.name}
                  </a>
                </article>
              );
            })}
          </div>
        </Section>

        <Section tone="dark">
          <SectionHeading dark title="Every plan includes" />
          <dl className="grid gap-px overflow-hidden rounded-[10px] bg-primary-foreground/10 sm:grid-cols-2">
            {PERKS.map((p) => (
              <div key={p.title} className="bg-brand-dark p-7 first:sm:col-span-2">
                <dt className="font-heading text-lg font-semibold text-primary-foreground">{p.title}</dt>
                <dd className="mt-2 text-[15px] leading-relaxed text-primary-foreground/70">{p.body}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <WorkShowcase
          title="What a maintained car looks like"
          intro="Recent member and customer vehicles, detailed in their own driveways."
          photos={[...PHOTOS.exterior, ...PHOTOS.interior.slice(0, 8)]}
          clips={[CLIPS.teslaDetail]}
        />

        <Section tone="surface">
          <SectionHeading title="How it works" />
          <ProcessSteps steps={PROCESS} />
        </Section>

        <ServiceFAQ title="Xpress Pass questions" faqs={monthlyFAQs} />

        <QualityProducts />


        <ClosingCTA
          title="Keep it clean on a schedule"
          body="Choose a plan for your vehicle and we’ll arrange one included detail for each paid cycle."
          mode="quote"
          quoteHref="#plans"
          quoteLabel="See the plans"
        />

        <Footer />
        <StickyMobileCTA />
      </div>
    </PageTransition>
  );
};

export default MonthlyPlan;
