import { useState } from "react";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import ServiceFAQ from "@/components/ServiceFAQ";
import ProcessSteps from "@/components/site/ProcessSteps";
import ClosingCTA from "@/components/site/ClosingCTA";
import { Section, SectionHeading, btnPrimary, btnSecondary } from "@/components/site/Section";
import QuoteLink from "@/components/site/QuoteLink";
import Swoosh from "@/components/site/Swoosh";
import SEO, { buildFAQJsonLd } from "@/components/SEO";
import { Check, Phone } from "lucide-react";
import { PHOTOS, CLIPS } from "@/data/photos";
import WorkShowcase from "@/components/site/WorkShowcase";
import xpressPassCard from "@/assets/xpress-pass-card.png";
import { XPRESS_PASS, PASS_SIZES, PASS_TERM_MONTHS, MOBILE_FEE, passAnnualValue, passVisitsPerYear, type PassSizeId, money } from "@/data/pricing";
import { NAP, PASS_COPY } from "@/data/copy";
import QualityProducts from "@/components/site/QualityProducts";

const [SILVER, GOLD] = XPRESS_PASS;
const monthlyFAQs = [
  {
    q: "How does the Xpress Pass work?",
    a: `Pick Silver or Gold for your vehicle. You pay monthly for ${PASS_TERM_MONTHS} months and get a set of included details each year, member pricing on everything else, priority booking and no mobile fee.`,
  },
  {
    q: "What's the difference between Silver and Gold?",
    a: `Silver includes four Inside & Out details a year, a headlight restoration and two engine bay details, with ${SILVER.detailDiscount}% off everything else. Gold includes four Deep Clean & Seal details, four Upkeep visits, headlight restoration with a 3-year UV protectant, ceramic coating on all glass and two engine bay details, with ${GOLD.detailDiscount}% off detailing and ${GOLD.protectionDiscount}% off ceramic coating, PPF and windshield film.`,
  },
  {
    q: "How fast can I book?",
    a: `Gold members get a visit within ${GOLD.bookingWindowHrs} hours of asking and Silver members within ${SILVER.bookingWindowHrs} hours, subject to weather for mobile visits.`,
  },
  {
    q: "Can I add a second vehicle?",
    a: `Yes. Add another vehicle to the same membership for ${money(SILVER.secondVehicle)}/month on Silver or ${money(GOLD.secondVehicle)}/month on Gold. It gets the full benefits of the tier.`,
  },
  {
    q: "Can I cancel?",
    a: PASS_COPY.terms[0].body,
  },
  {
    q: "What about SUVs, minivans and trucks?",
    a: "Pick your vehicle class above to see its monthly price. Tell us about heavy condition or pet hair before a visit so we can quote any extra work first.",
  },
];

const PROCESS = [
  { title: "Choose your tier", body: `Pick Silver or Gold and your vehicle class, then call us to join. ${PASS_TERM_MONTHS}-month term, card on file.` },
  { title: "Book your included visits", body: "Book each visit when it suits you. Members get priority booking." },
  { title: "We come to you, or you come to us", body: `Mobile with no $${MOBILE_FEE} fee, or drop off at our heated Airdrie shop.` },
];

const MonthlyPlan = () => {
  const [size, setSize] = useState<PassSizeId>("sedan");

  return (
    <PageTransition>
      <div className="min-h-screen bg-canvas">
        <SEO
          title="The Xpress Pass | Detailing Membership Calgary"
          description={`Xpress Pass Silver and Gold detailing memberships in Calgary and Airdrie. Included details every season, up to ${GOLD.detailDiscount}% off everything else, priority booking and no mobile fee.`}
          canonical="/xpress-pass"
          jsonLd={[buildFAQJsonLd(monthlyFAQs)]}
        />
        <Navbar />
        <AutoBreadcrumbs />

        <section className="relative isolate overflow-hidden border-b border-line bg-surface">
          <div className="shell grid items-center gap-12 pb-24 pt-14 sm:pb-32 sm:pt-20 lg:grid-cols-[1.1fr_1fr]">
            <div className="max-w-[38rem]">
              <p className="eyebrow mb-4">Membership · Xpress Pass</p>
              <h1 className="font-heading text-[2.6rem] font-extrabold leading-[0.98] tracking-display text-ink sm:text-6xl lg:text-[4.25rem]">
                Keep it detailed, all year.
              </h1>
              <p className="mt-6 text-base leading-relaxed text-ink-2 sm:text-lg">
                {PASS_COPY.subtitle}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <QuoteLink className={`${btnPrimary} min-h-[52px] px-7`} />
                <a href={NAP.phoneHref} className={`${btnSecondary} min-h-[52px]`}>
                  <Phone className="h-4 w-4 text-electric" aria-hidden="true" />
                  Call {NAP.phone}
                </a>
              </div>
              <a
                href="#plans"
                className="mt-5 inline-flex text-sm font-semibold text-ink-2 underline decoration-line decoration-2 underline-offset-[6px] hover:text-electric hover:decoration-electric"
              >
                See the plans
              </a>
            </div>
            <img
              src={xpressPassCard}
              alt="The black metal Xpress Pass membership card"
              className="mx-auto w-full max-w-sm lg:max-w-md"
              width={1024}
              height={1024}
            />
          </div>
          <Swoosh variant="hero-edge" />
        </section>

        <Section id="plans">
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Silver and Gold</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-2">
                Monthly price per vehicle, before GST. Values are our regular published prices.
              </p>
            </div>
            <div role="tablist" aria-label="Vehicle size" className="flex w-full shrink-0 gap-1 rounded-full border border-line bg-surface p-1 sm:w-fit">
              {PASS_SIZES.map((s) => (
                <button
                  key={s.id}
                  role="tab"
                  aria-selected={size === s.id}
                  onClick={() => setSize(s.id)}
                  className={`flex-1 rounded-full px-3 py-2 text-xs font-semibold transition-colors sm:flex-none sm:px-4 sm:text-sm ${
                    size === s.id ? "bg-electric text-primary-foreground" : "text-ink-2 hover:text-ink"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mx-auto grid max-w-5xl items-start gap-6 md:grid-cols-2">
            {XPRESS_PASS.map((plan) => {
              const copy = PASS_COPY.tiers[plan.id];
              const value = passAnnualValue(plan.id, size);
              return (
                <article
                  key={plan.id}
                  data-tier={plan.id}
                  className={`bf-card flex flex-col overflow-hidden rounded-card border bg-canvas ${plan.popular ? "bf-card-popular border-electric" : "border-line"}`}
                >
                  <div className="bf-tier-stripe h-2" aria-hidden="true" />
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-heading text-3xl font-bold text-ink">{plan.name}</h3>
                      {plan.popular && <span className="rounded-full bg-electric px-3 py-1 text-xs font-semibold text-primary-foreground">Best value</span>}
                    </div>
                    <p className="mt-4 text-xs font-bold uppercase tracking-widest text-electric">Goal</p>
                    <p className="mt-1 text-xl font-bold leading-tight text-ink">{copy.goal}</p>
                    <p className="mt-2 text-sm leading-snug text-muted-ink">{copy.goalBody}</p>

                    <div className="mt-6 rounded-md bg-surface p-5">
                      <p>
                        <span className="font-heading text-5xl font-extrabold tracking-tight tabular-nums text-ink">{money(plan.monthly[size])}</span>
                        <span className="text-sm text-muted-ink"> / month + GST</span>
                      </p>
                      <p className="mt-2 text-sm text-ink-2">
                        You get <span className="font-semibold text-ink">{money(value.included)}</span> of included work a year for {money(value.cost)}.
                      </p>
                      <p className="mt-3 inline-flex rounded-full bg-electric/10 px-3 py-1 text-sm font-bold tabular-nums text-electric">
                        {money(value.net)} ahead every year
                      </p>
                    </div>

                    <div className="mt-6">
                      <div className="flex items-baseline justify-between border-b border-line pb-2 text-xs font-semibold uppercase tracking-wider text-muted-ink">
                        <span>Included every year</span>
                        <span>Regular value</span>
                      </div>
                      <ul className="divide-y divide-line">
                        {[...value.items, { item: "mobile" as const, qty: passVisitsPerYear(plan), value: value.mobile }]
                          .sort((a, b) => a.value - b.value)
                          .map((i) => (
                            <li key={i.item} className="flex items-start gap-3 py-3 text-[15px] leading-snug text-ink-2">
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-electric" aria-hidden="true" />
                              <span className="flex-1">
                                {i.item === "mobile"
                                  ? `$${MOBILE_FEE} mobile fee waived on ${i.qty} visits`
                                  : `${i.qty > 1 ? `${i.qty} ` : ""}${PASS_COPY.items[i.item]}`}
                              </span>
                              <span className="shrink-0 font-semibold tabular-nums text-ink">{money(i.value)}</span>
                            </li>
                          ))}
                      </ul>
                    </div>

                    <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-muted-ink">Member benefits</p>
                    <ul className="mt-3 space-y-2.5">
                      {copy.perks.map((perk) => (
                        <li key={perk} className="flex gap-3 text-[15px] leading-snug text-ink-2">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-electric" aria-hidden="true" />
                          {perk}
                        </li>
                      ))}
                    </ul>

                    <p className="mt-6 border-t border-line pt-4 text-sm text-ink-2">
                      <span className="font-semibold text-ink">Second vehicle:</span> add it for {money(plan.secondVehicle)}/month.
                    </p>

                    <a href={NAP.phoneHref} className={`${plan.popular ? btnPrimary : btnSecondary} mt-6 min-h-[52px]`}>
                      <Phone className="h-4 w-4" aria-hidden="true" />
                      Call to join {plan.name}
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </Section>

        <Section tone="dark">
          <SectionHeading dark title="Membership terms" />
          <dl className="grid gap-px overflow-hidden rounded-card bg-primary-foreground/10 sm:grid-cols-2">
            {PASS_COPY.terms.map((t) => (
              <div key={t.title} className="bg-charcoal p-7">
                <dt className="font-heading text-lg font-semibold text-primary-foreground">{t.title}</dt>
                <dd className="mt-2 text-[15px] leading-relaxed text-primary-foreground/70">{t.body}</dd>
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
          body="Pick Silver or Gold, and we'll book your first included detail."
          mode="quote"
          quoteHref="#plans"
          quoteLabel="See the plans"
        />

        <Footer />
      </div>
    </PageTransition>
  );
};

export default MonthlyPlan;
