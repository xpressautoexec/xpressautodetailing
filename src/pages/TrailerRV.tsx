import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import QuoteSection from "@/components/site/QuoteSection";
import PerFootCalculator from "@/components/PerFootCalculator";
import FinancingEstimator from "@/components/rv/FinancingEstimator";
import StatRow from "@/components/site/StatRow";
import RvLengthEstimate from "@/components/rv/RvLengthEstimate";
import XpressProcess from "@/components/site/XpressProcess";
import { CTA, FILM, SYSTEMS } from "@/data/brand";
import ServicePageHero from "@/components/ServicePageHero";
import QuoteLink from "@/components/site/QuoteLink";
import SEO, { buildServiceJsonLd, buildFAQJsonLd } from "@/components/SEO";
import ServiceFAQ from "@/components/ServiceFAQ";
import { Link } from "react-router-dom";
import {
  Check,
  Minus,
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  Sun,
  Droplets,
  ShieldCheck,
} from "lucide-react";
import tapeLine from "@/assets/jobs/rv-surveyor-tape-line.webp";
import rvHero from "@/assets/jobs/hero-rv-trailer.webp";
import { PHOTOS, CLIPS } from "@/data/photos";
import { PhotoRail } from "@/components/site/PhotoRail";
import { VideoReel } from "@/components/site/VideoReel";
import logo3m from "@/assets/brand-3m.png";
import {
  RV_SERVICES,
  RV_BUNDLES,
  RV_PPF,
  PHONE,
  FINANCING,
  FINANCING_LIVE,
  FIVE_STAR_REVIEWS,
  SEASON_STATS,
  money,
  monthlyPayment,
  fielddUrl,
} from "@/data/pricing";
import { WATER_LINE } from "@/data/copy";

/** Maps each bundle's included services to calculator ids so the estimator never double counts. */
const ESTIMATOR_BUNDLES = RV_BUNDLES.map((b) => ({
  id: b.id,
  name: b.name,
  unit: b.unit,
  price: b.price,
  covers: RV_SERVICES.filter((svc) =>
    b.includes.some((inc) => svc.name.startsWith(inc)),
  ).map((svc) => svc.id),
}));

const RV_INTERIOR_RATE =
  RV_SERVICES.find((s) => s.id === "interior")?.price ?? 0;
const telHref = `tel:${PHONE.replace(/-/g, "")}`;
const EXAMPLE_FT = 30;

const faqs = [
  {
    q: "How is RV and trailer work priced?",
    a: `By the foot. Pick a package or individual services and we multiply by the length of the unit. A 30 ft trailer on ${RV_BUNDLES[0].name} at ${money(RV_BUNDLES[0].price)}/ft is ${money(RV_BUNDLES[0].price * 30)}. Interior work is billed at ${money(RV_INTERIOR_RATE)}/hr.`,
  },
  {
    q: "Can I finance an RV restoration?",
    a: FINANCING_LIVE
      ? `Yes. Jobs over ${money(FINANCING.minAmount)} can be spread over ${FINANCING.terms[0]} to ${
          FINANCING.terms[FINANCING.terms.length - 1]
        } monthly payments through a third-party lender, subject to credit approval. Ask for financing when you request your assessment and we'll send the application with your written quote.`
      : "Not yet. Monthly financing on restoration work is coming soon. Mention financing when you request your assessment and we'll let you know as soon as it's available.",
  },
  {
    q: "Do you come to my storage lot?",
    a: `Yes. ${WATER_LINE}`,
  },
  {
    q: "What is oxidation removal?",
    a: "Alberta sun chalks gelcoat and fibreglass until the sidewalls go dull and white residue rubs off on your hand. Oxidation removal machine-compounds that layer back to gloss, with wet sanding on the worst panels, then we seal it so it stays that way.",
  },
  {
    q: "When should I book storage prep?",
    a: "October and November, before the unit is parked for winter. Washing off road film and bugs and sealing the sidewalls stops them etching over the cold months.",
  },
  {
    q: "How long does an RV job take?",
    a: "A wash and seal on a 30 ft unit is roughly half a day. Full oxidation removal and restoration on the same unit is a one to two day job.",
  },
];

const SECTORS = [
  {
    title: "RV owners",
    body: "Travel trailers, fifth wheels and motorhomes, serviced where they're parked.",
    href: "#packages",
    cta: "See packages",
  },
  {
    title: "Dealerships",
    body: "Reconditioning for pre-owned units so they're lot-ready without a trip to the shop.",
    href: "/fleet",
    cta: "Dealer programs",
  },
  {
    title: "Rental fleets",
    body: "Turnover cleaning and scheduled exterior care, planned around your booking calendar.",
    href: "/rv-trailer/rental-fleet",
    cta: "Fleet care",
  },
];

/** 3M gelcoat restoration sequence. Product names must match what the crew actually carries. */
const RESTORATION_STEPS = [
  {
    title: "Assess and quote",
    product: "Walkaround, measured by the foot",
    body: "We check the gelcoat for chalking, fading and stress cracks, then quote per foot in writing before any work starts.",
  },
  {
    title: "Decontamination wash",
    product: "3M Perfect-It Boat Wash",
    body: "Road film, bugs and black streaks come off first, so every later step works on clean gelcoat.",
  },
  {
    title: "Wet sand",
    product: "3M Trizact abrasive discs",
    body: "Heavily chalked panels are wet sanded in progressively finer grades to level the oxidized layer evenly.",
  },
  {
    title: "Compound",
    product: "3M Perfect-It Gelcoat Heavy Cutting Compound",
    body: "Machine compounding cuts out the remaining oxidation and the sanding marks, bringing colour back to the surface.",
  },
  {
    title: "Polish",
    product: "3M Perfect-It Gelcoat finishing polish",
    body: "A finer polish refines the compound haze into a clear, deep gloss across caps and sidewalls.",
  },
  {
    title: "Seal and walkthrough",
    product: "Ceramic sealant and UV protectant",
    body: "Protection goes on to slow the next round of oxidation, then we walk the unit with you before we leave.",
  },
];

const svc = (id: string) => RV_SERVICES.find((x) => x.id === id)!;

type Fix = {
  /** Shown as a pill when a worry has more than one fix. */
  tag?: string;
  solution: string;
  price: string;
  lasts?: string;
  body: string;
  included?: string;
  action: { label: string; href: string; external: boolean };
};

/** Problem -> solution pairs shown after restoration. Prices come from pricing.ts. */
const THEN_WHAT: {
  icon: typeof Sun;
  concern: string;
  cause: string;
  fixes: Fix[];
}[] = [
  {
    icon: Sun,
    concern: "Worried it fades and chalks again?",
    cause:
      "Alberta sun is what oxidized it in the first place, and it starts on fresh gelcoat the day the unit goes back outside.",
    fixes: [
      {
        solution: "UV protectant",
        price: `${money(svc("uv").price)}/ft`,
        body: "Blocks the UV that breaks gelcoat down, so the colour and gloss you just paid for stay put. Reapply each season.",
        included: "Included in Storage Prep and Full Restoration",
        action: {
          label: "Book UV protectant",
          href: fielddUrl(svc("uv").book),
          external: true,
        },
      },
    ],
  },
  {
    icon: Droplets,
    concern:
      "Worried about black streaks and water etching in from the gutters?",
    cause:
      "Roof runoff carries grime down the sidewalls and leaves minerals behind as it dries, which slowly etch into the finish.",
    fixes: [
      {
        tag: "Seasonal",
        solution: "Ceramic sealant",
        price: `${money(svc("sealant").price)}/ft`,
        lasts: "Lasts about a season",
        body: "A slick layer that water and grime slide straight off, so streaks rinse away with a hose. Reapplied each year.",
        included: "Included in every package",
        action: {
          label: "Book ceramic sealant",
          href: fielddUrl(svc("sealant").book),
          external: true,
        },
      },
      {
        tag: "Long-term",
        solution: "Ceramic coating",
        price: "Quoted on site",
        lasts: "Lasts multiple years",
        body: "A separate, harder product from the sealant, bonded to the gelcoat for multi-year protection. Priced per unit after we see it.",
        action: {
          label: "Request a coating quote",
          href: "#assessment",
          external: false,
        },
      },
    ],
  },
  {
    icon: ShieldCheck,
    concern:
      "Worried about rock chips, tree sap, bird droppings, sun and water damage?",
    cause:
      "Highway gravel chips the front cap, and sap and droppings left to bake in the sun eat into the finish.",
    fixes: [
      {
        solution: "Paint protection film",
        price: `from ${money(Math.min(...RV_PPF.map((x) => x.price)))}`,
        body: `A clear, self-healing film over the front cap and leading edges that takes the hit so the gelcoat doesn't. One layer for all of it. Backed by SunTek's film warranty, up to 12 years.`,
        action: {
          label: "See RV PPF packages",
          href: "/rv-trailer/ppf",
          external: false,
        },
      },
    ],
  },
];

const perMonth = (perFoot: number) =>
  money(
    Math.round(
      monthlyPayment(
        perFoot * EXAMPLE_FT,
        FINANCING.representativeApr,
        FINANCING.defaultTerm,
      ),
    ),
  );

const FinancingCTA = ({ tone = "dark" }: { tone?: "dark" | "light" }) => {
  const cls =
    tone === "dark"
      ? "bg-primary-foreground text-ink hover:bg-primary-foreground/90"
      : "bg-electric text-primary-foreground hover:bg-electric-2";
  const base = `inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md px-6 text-sm font-semibold transition-colors ${cls}`;
  return FINANCING.applyUrl ? (
    <a
      href={FINANCING.applyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={base}
    >
      Check your rate
      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </a>
  ) : (
    <a href="#assessment" className={base}>
      Ask about financing
    </a>
  );
};

/**
 * Booking action for a bundle or single service. Restoration work leads with the free assessment
 * form; everything else books straight into Fieldd.
 */
const BookAction = ({
  book,
  assessment,
  name,
}: {
  book: string;
  assessment?: boolean;
  name: string;
}) => {
  const primary =
    "inline-flex min-h-[48px] w-full items-center justify-center rounded-full px-5 text-sm font-semibold transition-colors";
  return assessment ? (
    <div className="flex flex-col gap-2">
      <a
        href="#assessment"
        className={`${primary} bg-action text-primary-foreground hover:bg-ink`}
      >
        Book a free assessment
      </a>
      <a
        href={fielddUrl(book)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Book a free on-site assessment for ${name} online`}
        className="text-center text-xs text-muted-ink hover:text-ink hover:underline hover:underline-offset-4"
      >
        or pick a time online
      </a>
    </div>
  ) : (
    <a
      href={fielddUrl(book)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Book ${name}`}
      className={`${primary} border-2 border-ink/15 text-ink hover:border-ink`}
    >
      Book now
    </a>
  );
};

const TrailerRV = () => (
  <PageTransition>
    <div className="min-h-screen bg-canvas">
      <SEO
        title={
          FINANCING_LIVE
            ? "RV Detailing & Gelcoat Restoration Calgary | Financing Available"
            : "RV Detailing & Gelcoat Restoration Calgary | Mobile, Per-Foot Pricing"
        }
        description={`Mobile RV detailing and gelcoat oxidation removal in Calgary, Airdrie, Cochrane and Chestermere. Per-foot pricing, done at your storage lot${FINANCING_LIVE ? ", with monthly financing on restoration work" : ""}.`}
        canonical="/rv-trailer"
        jsonLd={[
          buildServiceJsonLd(
            "RV Detailing & Gelcoat Restoration",
            "Mobile RV, trailer and motorhome detailing and oxidation removal, priced per foot across Calgary and area.",
            "/rv-trailer",
          ),
          buildFAQJsonLd(faqs),
        ]}
      />
      <Navbar />
      <AutoBreadcrumbs />

      {/* Hero */}
      <ServicePageHero
        eyebrow="RV & trailer"
        title="We fix the gelcoat. Then we keep it fixed."
        subtitle={`RV gelcoat restoration, oxidation removal and detailing, priced by the foot and done where it's parked in Calgary, Airdrie and surrounding areas.${
          FINANCING_LIVE ? " Monthly financing on restoration work." : ""
        }`}
        quoteLabel={CTA.rv}
        image={rvHero}
        imageAlt="Xpress crew washing a Class A diesel pusher on a Calgary driveway"
        width={1080}
        height={607}
        imagePosition="60% center"
        bookHref="#packages"
        bookLabel="See RV packages"
      />

      <StatRow />

      {/* The problem */}
      <section className="py-16 sm:py-24">
        <div className="shell grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <figure className="relative overflow-hidden rounded-card">
            <img
              src={tapeLine}
              alt="Forest River Surveyor front cap with a tape line: oxidized gelcoat on the left, restored on the right"
              width={1050}
              height={1400}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover object-[center_60%] sm:aspect-[4/3] lg:aspect-[4/5]"
            />
            <figcaption className="absolute inset-x-0 bottom-0 flex justify-between bg-gradient-to-t from-black/70 to-transparent px-5 pb-4 pt-10 text-xs font-semibold uppercase tracking-label text-white">
              <span>As we found it</span>
              <span>Restored</span>
            </figcaption>
          </figure>
          <div>
            <p className="eyebrow mb-3">The problem</p>
            <h2 className="font-heading text-4xl font-extrabold leading-[1.0] tracking-display text-ink sm:text-5xl">
              Chalky, faded, streaked gelcoat.
            </h2>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-ink-2">
              Sun breaks gelcoat down until the colour goes flat and white
              residue rubs off on your hand. Wax just sits on top of it. The fix
              is cutting the oxidized layer off and bringing the gloss back.
            </p>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {RV_BUNDLES.filter((b) => "oxidation" in b && b.oxidation).map(
                (b) => (
                  <li
                    key={b.id}
                    className="flex items-start justify-between gap-4 py-4"
                  >
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-label text-electric">
                        {b.bestFor}
                      </span>
                      <span className="mt-1 block font-heading text-lg font-semibold text-ink">
                        {b.name}
                      </span>
                      <span className="block text-sm text-ink-2">
                        {"oxidation" in b ? b.oxidation : ""}, roof included
                      </span>
                    </span>
                    <span className="shrink-0 pt-5 text-right">
                      <span className="num text-2xl text-ink">
                        {money(b.price)}
                      </span>
                      <span className="text-sm text-ink-2">/ft</span>
                    </span>
                  </li>
                ),
              )}
            </ul>
            <p className="mt-4 text-sm text-muted-ink">
              Not sure which? The free on-site assessment tells you before any
              work starts.
            </p>
            <a
              href="#packages"
              className="mt-8 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md bg-electric px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-electric-2"
            >
              See all packages
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* Packages — spec table */}
      <section id="packages" className="scroll-mt-24 py-16 sm:py-24">
        <div className="shell">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="eyebrow mb-3">{SYSTEMS.restore.tm} and packages</p>
              <h2 className="font-heading text-4xl font-extrabold leading-[1.0] tracking-display text-ink sm:text-5xl">
                Packages, priced by the foot
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-2">
                Bundled rates cost less than booking the same services
                separately. Totals shown for a {EXAMPLE_FT} ft unit.
              </p>
            </div>
            <a
              href="#build"
              className="text-sm font-semibold text-electric hover:underline hover:underline-offset-4"
            >
              Or build your own from individual services
            </a>
          </div>

          {/* Package cards: same rows on every card so they compare at a glance */}
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {RV_BUNDLES.map((b) => {
              const total = b.price * EXAMPLE_FT;
              const has = (key: string) => b.includes.includes(key);
              const rows: { label: string; on: boolean; detail?: string }[] = [
                { label: "Exterior detail & wash", on: true },
                { label: "Roof restored", on: !!("roof" in b && b.roof) },
                {
                  label: "Oxidation removal",
                  on: has("Oxidation Removal"),
                  detail: "oxidation" in b ? b.oxidation : undefined,
                },
                { label: "Ceramic sealant", on: has("Ceramic Sealant") },
                { label: "UV protectant", on: has("UV Protectant") },
              ];
              return (
                <li
                  key={b.id}
                  className={`relative flex flex-col rounded-card border bg-surface p-6 ${
                    b.popular
                      ? "border-2 border-electric shadow-[var(--shadow-card)]"
                      : "border-line"
                  }`}
                >
                  {b.popular && (
                    <span className="absolute -top-3 left-6 rounded-sm bg-electric px-2 py-1 text-[11px] font-semibold uppercase tracking-label text-primary-foreground">
                      Most chosen
                    </span>
                  )}
                  <p className="text-xs font-semibold uppercase tracking-label text-electric">
                    {b.bestFor}
                  </p>
                  <h3 className="mt-1.5 font-heading text-2xl font-bold leading-tight text-ink">
                    {b.name}
                  </h3>
                  <div className="mt-4 flex items-end gap-2">
                    <span className="num text-4xl leading-none text-ink">
                      {money(b.price)}
                    </span>
                    <span className="pb-0.5 text-sm text-ink-2">/ft</span>
                    <span className="pb-0.5 text-sm text-muted-ink line-through">
                      {money(b.listPrice)}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm text-ink-2">
                    <span className="font-semibold tabular-nums text-ink">
                      {money(total)}
                    </span>{" "}
                    for a {EXAMPLE_FT} ft unit · save {b.save}
                  </p>
                  {"seasonal" in b && b.seasonal && (
                    <p className="mt-1 text-xs font-semibold text-muted-ink">
                      {b.seasonal}
                    </p>
                  )}
                  <ul className="mt-5 flex-1 space-y-2.5 border-t border-line pt-5">
                    {rows.map((r) => (
                      <li
                        key={r.label}
                        className={`flex gap-2.5 text-sm ${r.on ? "text-ink" : "text-muted-ink"}`}
                      >
                        {r.on ? (
                          <Check
                            className="mt-0.5 h-4 w-4 shrink-0 text-electric"
                            aria-label="Included"
                          />
                        ) : (
                          <Minus
                            className="mt-0.5 h-4 w-4 shrink-0 text-line"
                            aria-label="Not included"
                          />
                        )}
                        <span>
                          {r.label}
                          {r.on && r.detail && (
                            <span className="block text-xs text-ink-2">
                              {r.detail}
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {FINANCING_LIVE && total >= FINANCING.minAmount && (
                    <p className="mt-4 text-sm text-ink-2">
                      Or from{" "}
                      <span className="font-semibold tabular-nums text-ink">
                        {perMonth(b.price)}/mo
                      </span>
                    </p>
                  )}
                  <div className="mt-5">
                    <BookAction
                      book={b.book}
                      assessment={b.assessment}
                      name={b.name}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-muted-ink">
            Priced by approximate length, front to back, without the hitch. Not
            sure which oxidation package you need? The free on-site assessment
            tells you before any work starts.
          </p>

          {FINANCING_LIVE && (
            <p className="mt-4 text-xs leading-relaxed text-muted-ink">
              Monthly figures: {EXAMPLE_FT} ft unit over {FINANCING.defaultTerm}{" "}
              months at a representative {FINANCING.representativeApr}% APR,
              before tax, subject to lender approval. See the estimator below
              for total cost of borrowing.
            </p>
          )}
        </div>
      </section>

      {/* Then what: problem -> protection */}
      <section id="protect" className="scroll-mt-24 bg-charcoal section-y">
        <div className="shell">
          <p className="eyebrow mb-3 !text-electric">After the restoration</p>
          <h2 className="max-w-2xl font-heading text-4xl font-extrabold leading-[1.0] tracking-display text-primary-foreground sm:text-5xl">
            We fixed your gelcoat. Then what?
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-primary-foreground/70">
            Restored gelcoat starts wearing again the day it goes back outside.
            Pick the protection that matches what worries you.
          </p>
          <ol className="mt-12 space-y-5">
            {THEN_WHAT.map((t) => {
              const Icon = t.icon;
              const btn =
                "mt-6 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md bg-electric px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-electric-2";
              return (
                <li
                  key={t.concern}
                  className="grid gap-3 lg:grid-cols-[1fr_auto_1.15fr] lg:items-stretch lg:gap-6"
                >
                  <div className="rounded-card border border-primary-foreground/15 p-6 sm:p-8">
                    <Icon
                      className="h-6 w-6 text-electric"
                      aria-hidden="true"
                    />
                    <h3 className="mt-4 font-heading text-2xl font-bold leading-tight text-primary-foreground">
                      {t.concern}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-primary-foreground/65">
                      {t.cause}
                    </p>
                  </div>
                  <div
                    className="flex items-center justify-center text-electric"
                    aria-hidden="true"
                  >
                    <ArrowDown className="h-6 w-6 lg:hidden" />
                    <ArrowRight className="hidden h-7 w-7 lg:block" />
                  </div>
                  <div className="flex flex-col rounded-card bg-surface p-6 sm:p-8">
                    <p className="text-xs font-semibold uppercase tracking-label text-electric">
                      {t.fixes.length > 1
                        ? `${t.fixes.length} ways to fix it`
                        : "The fix"}
                    </p>
                    <div
                      className={
                        t.fixes.length > 1
                          ? "mt-4 grid gap-4"
                          : "flex flex-1 flex-col"
                      }
                    >
                      {t.fixes.map((f) => (
                        <div
                          key={f.solution}
                          className={
                            t.fixes.length > 1
                              ? "flex flex-col rounded-md border border-line bg-canvas p-5"
                              : "flex flex-1 flex-col"
                          }
                        >
                          {f.tag && (
                            <span
                              className={`w-fit rounded-sm px-2 py-1 text-[11px] font-semibold uppercase tracking-label ${
                                f.tag === "Long-term"
                                  ? "bg-ink text-primary-foreground"
                                  : "bg-electric/10 text-electric"
                              }`}
                            >
                              {f.tag}
                            </span>
                          )}
                          <div
                            className={`flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 ${f.tag ? "mt-3" : "mt-1.5"}`}
                          >
                            <h4 className="font-heading text-2xl font-bold leading-tight text-ink">
                              {f.solution}
                            </h4>
                            <span className="num text-xl text-ink">
                              {f.price}
                            </span>
                          </div>
                          {f.lasts && (
                            <p className="mt-1 text-sm font-semibold text-ink-2">
                              {f.lasts}
                            </p>
                          )}
                          <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-2">
                            {f.body}
                          </p>
                          {f.included && (
                            <p className="mt-4 flex gap-2 text-sm font-semibold text-ink">
                              <Check
                                className="mt-0.5 h-4 w-4 shrink-0 text-electric"
                                aria-hidden="true"
                              />
                              {f.included}
                            </p>
                          )}
                          <div>
                            {f.action.external ? (
                              <a
                                href={f.action.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={btn}
                              >
                                {f.action.label}
                                <ArrowUpRight
                                  className="h-4 w-4"
                                  aria-hidden="true"
                                />
                              </a>
                            ) : f.action.href.startsWith("#") ? (
                              <a href={f.action.href} className={btn}>
                                {f.action.label}
                              </a>
                            ) : (
                              <Link to={f.action.href} className={btn}>
                                {f.action.label}
                                <ArrowRight
                                  className="h-4 w-4"
                                  aria-hidden="true"
                                />
                              </Link>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Instant estimate by length */}
      <section id="estimate" className="scroll-mt-24 section-y">
        <div className="shell grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <p className="eyebrow">Instant estimate</p>
            <h2 className="mt-3 font-heading text-4xl font-extrabold leading-[1.0] tracking-display text-ink sm:text-5xl">
              Enter your length. See every price.
            </h2>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-ink-2">
              Every RV service and package for a unit your size. Restoration
              depends on how oxidized the gelcoat is, so it shows a starting
              price.
            </p>
            <QuoteLink
              href="#assessment"
              className="mt-8 inline-flex min-h-[48px] items-center justify-center rounded-md bg-electric px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-electric-2"
            >
              {CTA.rv}
            </QuoteLink>
          </div>
          <RvLengthEstimate />
        </div>
      </section>

      {/* Build your own */}
      <section
        id="build"
        className="scroll-mt-24 border-y border-line bg-surface py-16 sm:py-24"
      >
        <div className="shell grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <p className="eyebrow">Build your own</p>
            <h2 className="mt-3 font-heading text-4xl font-extrabold leading-[1.0] tracking-display text-ink sm:text-5xl">
              Combine services.
            </h2>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-ink-2">
              Pick a package or individual services and set the length of your
              unit. Packages already include the services listed in them, so
              nothing is counted twice.
            </p>
          </div>
          <PerFootCalculator
            services={RV_SERVICES}
            bundles={ESTIMATOR_BUNDLES}
            defaultLength={30}
            minLength={12}
            maxLength={45}
            lengthLabel="Unit length (feet)"
            title="RV & trailer estimator"
            defaultSelected={["washseal"]}
            note={`Estimate only. Interior detailing is billed at ${money(RV_INTERIOR_RATE)}/hr and decal removal or replacement is quoted on site. Final price confirmed after we see the unit.`}
          />
        </div>
        <div className="shell mt-14">
          <h3 className="font-heading text-xl font-semibold text-ink">
            Book a single service
          </h3>
          <p className="mt-2 max-w-xl text-sm text-ink-2">
            Washes, sealant and interiors book straight into the schedule.
            Restoration work starts with a free assessment so the quote matches
            the unit. Questions first?{" "}
            <a
              href={telHref}
              className="font-semibold text-electric hover:underline hover:underline-offset-4"
            >
              Call or text {PHONE}
            </a>
            .
          </p>
          <ul className="mt-6 divide-y divide-line overflow-hidden rounded-card border border-line bg-canvas">
            {RV_SERVICES.map((svc) => (
              <li
                key={svc.id}
                className="flex items-center justify-between gap-4 px-5 py-4"
              >
                <div>
                  <p className="font-semibold text-ink">{svc.name}</p>
                  <p className="text-sm tabular-nums text-muted-ink">
                    {svc.quote
                      ? "Quoted on site"
                      : `${money(svc.price)}${svc.unit}`}
                  </p>
                </div>
                <BookAction
                  book={svc.book}
                  assessment={svc.assessment}
                  name={svc.name}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <XpressProcess service="RV" tone="canvas" />

      {/* 3M restoration process */}
      <section id="process" className="scroll-mt-24 py-16 sm:py-24">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div className="lg:sticky lg:top-8 lg:self-start">
            <img src={logo3m} alt="3M" loading="lazy" className="h-7 w-auto" />
            <p className="eyebrow mt-6">{SYSTEMS.restore.tm}</p>
            <h2 className="mt-3 font-heading text-4xl font-extrabold leading-[1.0] tracking-display text-ink sm:text-5xl">
              The 3M gelcoat restoration process
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-2">
              Oxidized gelcoat gets cut back and restored. We follow 3M's
              step-down sequence for gelcoat and fibreglass: sand only where
              it's needed, cut, refine, then protect. Each step uses the 3M
              product built for it, so the finish holds up through Alberta
              summers.
            </p>
            <QuoteLink
              href="#assessment"
              className="mt-8 inline-flex min-h-[48px] items-center justify-center rounded-md bg-electric px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-electric-2"
            >
              {CTA.rv}
            </QuoteLink>
          </div>
          <ol className="border-t border-line">
            {RESTORATION_STEPS.map((s, i) => (
              <li
                key={s.title}
                className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-line py-7"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-ink font-heading text-sm font-semibold tabular-nums text-ink">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-electric">
                    {s.product}
                  </p>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-2">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Financing (hidden until a lender is live: no "coming soon" on the public site) */}
      {FINANCING_LIVE && (
        <section id="financing" className="scroll-mt-24 bg-charcoal section-y">
          <div className="shell grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <div className="lg:sticky lg:top-8">
              <h2 className="font-heading text-3xl font-semibold tracking-tight text-primary-foreground sm:text-4xl">
                Restore it now, pay monthly
              </h2>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-primary-foreground/70">
                Gelcoat restoration is a once-in-several-seasons job, and
                oxidation only gets harder to cut the longer it sits. Financing
                lets you do it properly this year.
              </p>
              <ul className="mt-8 space-y-4 text-[15px] text-primary-foreground/85">
                {[
                  `Jobs from ${money(FINANCING.minAmount)}, over ${FINANCING.terms[0]} to ${
                    FINANCING.terms[FINANCING.terms.length - 1]
                  } months`,
                  "Applied for with your written quote, before any work starts",
                  "Same crew, same per-foot price as paying up front",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <Check
                      className="mt-0.5 h-5 w-5 shrink-0 text-electric"
                      aria-hidden="true"
                    />
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <FinancingCTA tone="dark" />
              </div>
            </div>
            <FinancingEstimator />
          </div>
        </section>
      )}

      {/* Work */}
      <section className="border-t border-line bg-surface py-16 sm:py-24">
        <div className="shell">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow mb-3">Proof</p>
              <h2 className="max-w-xl font-heading text-4xl font-extrabold leading-[1.0] tracking-display text-ink sm:text-5xl">
                Recent RV work
              </h2>
            </div>
            <Link
              to="/gallery"
              className="text-sm font-semibold text-electric hover:underline hover:underline-offset-4"
            >
              Full gallery
            </Link>
          </div>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-2">
            The tape line marks where correction stops. Everything on one side
            is the unit as we found it.
          </p>
          <div className="mt-10">
            <VideoReel
              clips={[
                CLIPS.rvCrewWash,
                CLIPS.trailerPolish,
                CLIPS.rvWalkaround,
                CLIPS.rvInterior,
              ]}
              label="RV job videos"
            />
          </div>
          <div className="mt-10">
            <PhotoRail photos={PHOTOS.rv} label="Recent RV photos" />
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            <Link
              to="/rv-trailer/ppf"
              className="group flex items-center justify-between rounded-card border border-line px-6 py-5 transition-colors hover:border-ink-2"
            >
              <span>
                <span className="block font-heading font-semibold text-ink">
                  RV paint protection film
                </span>
                <span className="mt-0.5 block text-sm text-muted-ink">
                  Front caps and leading edges in {FILM.name}
                  , up to a 12-year SunTek warranty
                </span>
              </span>
              <ArrowUpRight
                className="h-5 w-5 text-muted-ink group-hover:text-ink"
                aria-hidden="true"
              />
            </Link>
            <Link
              to="/marine"
              className="group flex items-center justify-between rounded-card border border-line px-6 py-5 transition-colors hover:border-ink-2"
            >
              <span>
                <span className="block font-heading font-semibold text-ink">
                  Marine and pontoon
                </span>
                <span className="mt-0.5 block text-sm text-muted-ink">
                  Same gelcoat process, on the water side
                </span>
              </span>
              <ArrowUpRight
                className="h-5 w-5 text-muted-ink group-hover:text-ink"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Who we work with */}
      <section className="py-16 sm:py-24">
        <div className="shell">
          <p className="eyebrow mb-3">Who we work with</p>
          <h2 className="max-w-xl font-heading text-4xl font-extrabold leading-[1.0] tracking-display text-ink sm:text-5xl">
            Built for owners, dealers and fleets
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {SECTORS.map((s) => {
              const inner = (
                <>
                  <h3 className="font-heading text-xl font-semibold text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-2">
                    {s.body}
                  </p>
                  <span className="mt-6 text-sm font-semibold text-electric group-hover:underline group-hover:underline-offset-4">
                    {s.cta}
                  </span>
                </>
              );
              const cls = "group flex flex-col border-t-2 border-ink pt-6";
              return s.href.startsWith("#") ? (
                <a key={s.title} href={s.href} className={cls}>
                  {inner}
                </a>
              ) : (
                <Link key={s.title} to={s.href} className={cls}>
                  {inner}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <QuoteSection
        id="assessment"
        source="rv-trailer"
        defaultVehicle="RV/Trailer"
        title="Get a price for your RV"
        intro="Year, make and length is plenty to start. Add photos of the worst side and we'll send a per-foot price by text, or book a free on-site assessment from there."
      />

      <ServiceFAQ title="Questions RV owners ask" faqs={faqs} />

      <Footer />
    </div>
  </PageTransition>
);

export default TrailerRV;
