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
import heroImg from "@/assets/jobs/hero-xpress-pass.webp";
import { PHOTOS, CLIPS } from "@/data/photos";
import WorkShowcase from "@/components/site/WorkShowcase";
import xpressPassCard from "@/assets/xpress-pass-card.png";
import { XPRESS_PASS, PASS_ADDON_DISCOUNT, AUTO_PACKAGES, VEHICLE_SIZES, type VehicleSizeId, money } from "@/data/pricing";
import { NAP, SERVICE_AREA_SENTENCE } from "@/data/copy";
import QualityProducts from "@/components/site/QualityProducts";

const maxDiscount = Math.max(...XPRESS_PASS.map((p) => p.discount));

const PERKS = [
  {
    title: "Love it? Lock it in",
    body: `Join within 7 days of a regular detail and we'll refund the plan discount on that visit: ${XPRESS_PASS.map(
      (p) => `${p.discount}% on ${p.name}`,
    ).join(", ")}.`,
  },
  { title: `${PASS_ADDON_DISCOUNT}% off every add-on`, body: "Pet hair, odour removal, clay bar, headlight restoration. Every add-on, every visit." },
  { title: "Priority scheduling", body: "Members get first pick of slots before the calendar opens to everyone else." },
  { title: "A metal membership card", body: "Every member gets the black metal Xpress Pass card. Keep it in the glovebox." },
  { title: "An Xpress air freshener", body: "A small thing, but it's ours. Every visit ends with a fresh one." },
];

const monthlyFAQs = [
  {
    q: "How does the Xpress Pass work?",
    a: `Pick the plan that matches how you use the car: ${XPRESS_PASS.map((p) => `${p.name} ${p.frequency.toLowerCase()}`).join(", ")}. We schedule each visit in about the same window every cycle, and the member rate is applied automatically.`,
  },
  {
    q: "Can I cancel or pause any time?",
    a: "Yes. There's no contract and no sign-up fee. Pause for winter, a vacation or any reason. Just tell us before your next visit.",
  },
  {
    q: "Does the discount apply to add-ons?",
    a: `Yes. Members save ${PASS_ADDON_DISCOUNT}% on every add-on, every visit.`,
  },
  {
    q: "What about SUVs and trucks?",
    a: "Larger vehicles carry the same published size surcharge as our regular packages, and your member rate is the discounted version of that price. Nothing is adjusted on arrival.",
  },
  {
    q: "When do I pay?",
    a: "Per visit, at your member rate, after the work is done. Nothing up front.",
  },
  {
    q: "What if I miss a visit?",
    a: "Moving or skipping a visit is free with 24 hours' notice. Missing two cycles in a row may pause your plan, and you can resume any time. Full details are in our cancellation policy.",
  },
];

const PROCESS = [
  { title: "Call to join", body: "A three-minute call. Pick your plan, your vehicle size and your preferred time window." },
  { title: "We schedule for you", body: "We reach out before each cycle. You confirm or move it, and never have to track dates." },
  { title: "We come to you", body: `Anywhere in ${SERVICE_AREA_SENTENCE}, with your member rate applied.` },
];

const MonthlyPlan = () => {
  const [size, setSize] = useState<VehicleSizeId>("sedan");

  return (
    <PageTransition>
      <div className="min-h-screen bg-canvas pb-16 lg:pb-0">
        <SEO
          title="The Xpress Pass | Detailing Membership Calgary"
          description={`Calgary's mobile detailing membership. Save up to ${maxDiscount}% on every visit plus ${PASS_ADDON_DISCOUNT}% off every add-on. No contract, cancel any time.`}
          canonical="/xpress-pass"
          jsonLd={[buildFAQJsonLd(monthlyFAQs)]}
        />
        <Navbar />
        <AutoBreadcrumbs />

        <section className="relative isolate overflow-hidden bg-brand-dark">
          <img src={heroImg} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-25" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-dark via-brand-dark/90 to-brand-dark/60" />
          <div className="shell grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-[1.1fr_1fr]">
            <div className="max-w-[38rem]">
              <h1 className="font-heading text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-primary-foreground sm:text-5xl lg:text-[3.5rem]">
                The Xpress Pass
              </h1>
              <p className="mt-6 text-base leading-relaxed text-primary-foreground/75 sm:text-lg">
                A detailing membership that keeps the car clean on a schedule. Save up to {maxDiscount}% on every visit
                and {PASS_ADDON_DISCOUNT}% on every add-on. No contract, no sign-up fee, cancel any time.
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
                The member price is what you pay per visit, after the work is done.
              </p>
            </div>
            <div role="tablist" aria-label="Vehicle size" className="flex w-full shrink-0 gap-1 rounded-md border border-line bg-surface p-1 sm:w-fit">
              {VEHICLE_SIZES.map((s) => (
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
                    {plan.service}, {plan.discount}% off every visit
                  </p>
                  <p className="mt-5">
                    <span className="font-heading text-4xl font-semibold tracking-tight tabular-nums text-ink">
                      {money(plan.memberPrice[size])}
                    </span>
                    <span className="text-sm text-muted-ink"> / visit</span>
                    {pkg && <span className="ml-2 text-sm text-muted-ink line-through">{money(pkg.price[size])}</span>}
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
          body="One call and your car is looked after every cycle, at member rates with priority booking."
          mode="quote"
          quoteHref="#plans"
          quoteLabel="See the plans"
        />

        <Footer />
        <div className="h-20 lg:hidden" />
        <StickyMobileCTA />
      </div>
    </PageTransition>
  );
};

export default MonthlyPlan;
