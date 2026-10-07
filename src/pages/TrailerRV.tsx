import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import PerFootCalculator from "@/components/PerFootCalculator";
import AssessmentForm from "@/components/AssessmentForm";
import FinancingEstimator from "@/components/rv/FinancingEstimator";
import StatBand from "@/components/StatBand";
import SEO, { buildServiceJsonLd, buildFAQJsonLd } from "@/components/SEO";
import ServiceFAQ from "@/components/ServiceFAQ";
import { Link } from "react-router-dom";
import { Check, Minus, Phone, ArrowUpRight } from "lucide-react";
import rvHero from "@/assets/jobs/hero-rv-trailer.webp";
import { PHOTOS, CLIPS } from "@/data/photos";
import { PhotoRail } from "@/components/site/PhotoRail";
import { VideoReel } from "@/components/site/VideoReel";
import logoGtechniq from "@/assets/brand-gtechniq.png";
import logoMenzerna from "@/assets/brand-menzerna.png";
import logo3m from "@/assets/brand-3m.png";
import logoSystemX from "@/assets/systemx-logo.png";
import {
  RV_SERVICES,
  RV_BUNDLES,
  PHONE,
  EMAIL,
  HOURS,
  FINANCING,
  FIVE_STAR_REVIEWS,
  SEASON_STATS,
  money,
  monthlyPayment,
} from "@/data/pricing";
import { WATER_LINE } from "@/data/copy";

/** Maps each bundle's included services to calculator ids so the estimator never double counts. */
const ESTIMATOR_BUNDLES = RV_BUNDLES.map((b) => ({
  id: b.id,
  name: b.name,
  unit: b.unit,
  price: b.price,
  covers: RV_SERVICES.filter((svc) => b.includes.some((inc) => svc.name.startsWith(inc))).map((svc) => svc.id),
}));

const RV_INTERIOR_RATE = RV_SERVICES.find((s) => s.id === "interior")?.price ?? 0;
const telHref = `tel:${PHONE.replace(/-/g, "")}`;
const EXAMPLE_FT = 30;

const faqs = [
  {
    q: "How is RV and trailer work priced?",
    a: `By the foot. Pick a package or individual services and we multiply by the length of the unit. A 30 ft trailer on ${RV_BUNDLES[0].name} at ${money(RV_BUNDLES[0].price)}/ft is ${money(RV_BUNDLES[0].price * 30)}. Interior work is billed at ${money(RV_INTERIOR_RATE)}/hr.`,
  },
  {
    q: "Can I finance an RV restoration?",
    a: `Yes. Jobs over ${money(FINANCING.minAmount)} can be spread over ${FINANCING.terms[0]} to ${
      FINANCING.terms[FINANCING.terms.length - 1]
    } monthly payments through a third-party lender, subject to credit approval. Ask for financing when you request your assessment and we'll send the application with your written quote.`,
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

const STATS = [
  { value: SEASON_STATS.rvs, label: "RVs serviced this season" },
  { value: SEASON_STATS.cars, label: "Cars detailed this season" },
  { value: FIVE_STAR_REVIEWS, label: "Five-star Google reviews" },
  { value: "On site", label: "Storage lot, campground or driveway" },
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

const SPEC_COLUMNS = [
  { key: "Exterior Wash", label: "Wash" },
  { key: "Ceramic Sealant", label: "Ceramic sealant" },
  { key: "UV Protectant", label: "UV protectant" },
  { key: "Oxidation Removal", label: "Oxidation removal" },
];

const BRANDS = [
  { src: logoGtechniq, alt: "Gtechniq" },
  { src: logoMenzerna, alt: "Menzerna" },
  { src: logo3m, alt: "3M" },
  { src: logoSystemX, alt: "System X" },
];

const perMonth = (perFoot: number) =>
  money(Math.round(monthlyPayment(perFoot * EXAMPLE_FT, FINANCING.representativeApr, FINANCING.defaultTerm)));

const FinancingCTA = ({ tone = "dark" }: { tone?: "dark" | "light" }) => {
  const cls =
    tone === "dark"
      ? "bg-primary-foreground text-ink hover:bg-primary-foreground/90"
      : "bg-electric text-primary-foreground hover:bg-electric-2";
  const base = `inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md px-6 text-sm font-semibold transition-colors ${cls}`;
  return FINANCING.applyUrl ? (
    <a href={FINANCING.applyUrl} target="_blank" rel="noopener noreferrer" className={base}>
      Check your rate
      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </a>
  ) : (
    <a href="#assessment" className={base}>
      Ask about financing
    </a>
  );
};

const TrailerRV = () => (
  <PageTransition>
    <div className="min-h-screen bg-canvas pb-16 lg:pb-0">
      <SEO
        title="RV Detailing & Gelcoat Restoration Calgary | Financing Available"
        description="Mobile RV detailing and gelcoat oxidation removal in Calgary, Airdrie, Cochrane and Chestermere. Per-foot pricing, done at your storage lot, with monthly financing on restoration work."
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
      <section className="relative isolate overflow-hidden bg-brand-dark">
        <img
          src={rvHero}
          alt="Xpress crew washing a Class A diesel pusher on a Calgary driveway"
          width={1080}
          height={607}
          {...{ fetchpriority: "high" }}
          className="absolute inset-0 -z-10 h-full w-full object-cover object-[60%_center]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-dark/90 via-brand-dark/55 to-brand-dark/0"
        />
        <div className="shell pb-32 pt-20 sm:pb-40 sm:pt-28 lg:pb-44 lg:pt-32">
          <div className="max-w-[40rem]">
            <h1 className="font-heading text-[2.4rem] font-semibold leading-[1.04] tracking-[-0.03em] text-primary-foreground sm:text-5xl lg:text-[3.6rem]">
              RV detailing and gelcoat restoration, done where it's parked.
            </h1>
            <p className="mt-6 max-w-[34rem] text-base leading-relaxed text-primary-foreground/75 sm:text-lg">
              Per-foot pricing, a crew that brings its own water and power, and monthly financing on restoration
              work. Serving Calgary, Airdrie, Cochrane and Chestermere.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#assessment"
                className="inline-flex min-h-[52px] items-center justify-center rounded-md bg-electric px-7 text-sm font-semibold text-primary-foreground transition-colors hover:bg-electric-2"
              >
                Book a free RV assessment
              </a>
              <a
                href={telHref}
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-md border border-primary-foreground/30 px-7 text-sm font-semibold text-primary-foreground transition-colors hover:border-primary-foreground/70"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {PHONE}
              </a>
            </div>
          </div>
        </div>
      </section>

      <StatBand stats={STATS} />

      {/* Products */}
      <section className="shell flex flex-col gap-6 py-14 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[16rem] text-sm leading-snug text-muted-ink">
          Professional compounds, polishes and coatings from
        </p>
        <ul className="flex flex-wrap items-center gap-x-10 gap-y-6">
          {BRANDS.map((b) => (
            <li key={b.alt}>
              <img
                src={b.src}
                alt={b.alt}
                loading="lazy"
                className="h-8 w-auto max-w-[120px] object-contain opacity-70 grayscale"
              />
            </li>
          ))}
        </ul>
      </section>

      {/* Who we work with */}
      <section className="border-y border-line bg-surface py-16 sm:py-24">
        <div className="shell">
          <h2 className="max-w-xl font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Built for owners, dealers and fleets
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {SECTORS.map((s) => {
              const inner = (
                <>
                  <h3 className="font-heading text-xl font-semibold text-ink">{s.title}</h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-2">{s.body}</p>
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

      {/* Packages — spec table */}
      <section id="packages" className="scroll-mt-24 py-16 sm:py-24">
        <div className="shell">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                Packages, priced by the foot
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-2">
                Bundled rates cost less than booking the same services separately. Totals shown for a {EXAMPLE_FT} ft
                unit.
              </p>
            </div>
            <a href="#build" className="text-sm font-semibold text-electric hover:underline hover:underline-offset-4">
              Or build your own from individual services
            </a>
          </div>

          {/* Desktop table */}
          <div className="mt-10 hidden overflow-hidden rounded-[10px] border border-line bg-surface lg:block">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">RV package comparison</caption>
              <thead className="border-b border-line bg-canvas text-muted-ink">
                <tr>
                  <th scope="col" className="px-6 py-4 font-medium">
                    Package
                  </th>
                  {SPEC_COLUMNS.map((c) => (
                    <th key={c.key} scope="col" className="whitespace-nowrap px-3 py-4 text-center font-medium">
                      {c.label}
                    </th>
                  ))}
                  <th scope="col" className="whitespace-nowrap px-4 py-4 text-right font-medium">
                    Per foot
                  </th>
                  <th scope="col" className="whitespace-nowrap px-4 py-4 text-right font-medium">
                    {EXAMPLE_FT} ft unit
                  </th>
                  <th scope="col" className="whitespace-nowrap px-6 py-4 text-right font-medium">
                    Or from
                  </th>
                </tr>
              </thead>
              <tbody>
                {RV_BUNDLES.map((b) => {
                  const total = b.price * EXAMPLE_FT;
                  const financeable = total >= FINANCING.minAmount;
                  return (
                    <tr
                      key={b.id}
                      className={`border-b border-line last:border-b-0 ${b.popular ? "bg-electric-soft/60" : ""}`}
                    >
                      <th scope="row" className="relative px-6 py-5 font-normal">
                        {b.popular && <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-electric" />}
                        <span className="block font-heading text-base font-semibold text-ink">{b.name}</span>
                        <span className="mt-0.5 block text-xs text-muted-ink">
                          {b.popular ? "Most booked" : b.seasonal ? b.seasonal : `Save ${b.save}`}
                          {b.popular || b.seasonal ? ` · save ${b.save}` : ""}
                        </span>
                      </th>
                      {SPEC_COLUMNS.map((c) => {
                        const has = b.includes.includes(c.key);
                        return (
                          <td key={c.key} className="px-3 py-5 text-center">
                            {has ? (
                              <Check className="mx-auto h-4 w-4 text-electric" aria-label="Included" />
                            ) : (
                              <Minus className="mx-auto h-4 w-4 text-line" aria-label="Not included" />
                            )}
                          </td>
                        );
                      })}
                      <td className="px-4 py-5 text-right tabular-nums">
                        <span className="font-semibold text-ink">{money(b.price)}</span>
                        <span className="block text-xs text-muted-ink line-through">{money(b.listPrice)}</span>
                      </td>
                      <td className="px-4 py-5 text-right font-semibold tabular-nums text-ink">{money(total)}</td>
                      <td className="px-6 py-5 text-right tabular-nums text-ink-2">
                        {financeable ? `${perMonth(b.price)}/mo` : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile list */}
          <ul className="mt-8 divide-y divide-line overflow-hidden rounded-[10px] border border-line bg-surface lg:hidden">
            {RV_BUNDLES.map((b) => {
              const total = b.price * EXAMPLE_FT;
              return (
                <li key={b.id} className={`relative p-5 ${b.popular ? "bg-electric-soft/60" : ""}`}>
                  {b.popular && <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-electric" />}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-heading text-base font-semibold text-ink">{b.name}</h3>
                      <p className="mt-0.5 text-xs text-muted-ink">
                        {b.popular ? "Most booked" : b.seasonal ?? `Save ${b.save}`}
                      </p>
                    </div>
                    <p className="text-right tabular-nums">
                      <span className="font-semibold text-ink">{money(b.price)}/ft</span>
                      <span className="block text-xs text-muted-ink">
                        {money(total)} at {EXAMPLE_FT} ft
                      </span>
                    </p>
                  </div>
                  <p className="mt-3 text-sm text-ink-2">{b.includes.join(", ")}</p>
                  {total >= FINANCING.minAmount && (
                    <p className="mt-2 text-sm text-ink-2">
                      Or from <span className="font-semibold tabular-nums text-ink">{perMonth(b.price)}/mo</span>
                    </p>
                  )}
                </li>
              );
            })}
          </ul>

          <p className="mt-4 text-xs leading-relaxed text-muted-ink">
            Monthly figures: {EXAMPLE_FT} ft unit over {FINANCING.defaultTerm} months at a representative{" "}
            {FINANCING.representativeApr}% APR, before tax, subject to lender approval. See the estimator below for
            total cost of borrowing.
          </p>
        </div>
      </section>

      {/* Build your own */}
      <section id="build" className="scroll-mt-24 border-y border-line bg-surface py-16 sm:py-24">
        <div className="shell grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Estimate your price
            </h2>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-ink-2">
              Pick a package or individual services and set the length of your unit. Packages already include the
              services listed in them, so nothing is counted twice.
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
      </section>

      {/* 3M restoration process */}
      <section id="process" className="scroll-mt-24 py-16 sm:py-24">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <img src={logo3m} alt="3M" loading="lazy" className="h-7 w-auto" />
            <h2 className="mt-6 font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              The 3M gelcoat restoration process
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-2">
              Oxidized gelcoat is restored, not just waxed over. We follow 3M's step-down sequence for gelcoat and
              fibreglass: sand only where it's needed, cut, refine, then protect. Each step uses the 3M product built
              for it, so the finish holds up through Alberta summers instead of fading again by fall.
            </p>
            <a
              href="#assessment"
              className="mt-8 inline-flex min-h-[48px] items-center justify-center rounded-md bg-electric px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-electric-2"
            >
              Book a free assessment
            </a>
          </div>
          <ol className="border-t border-line">
            {RESTORATION_STEPS.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-line py-7">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-ink font-heading text-sm font-semibold tabular-nums text-ink">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-ink">{s.title}</h3>
                  <p className="mt-1 text-sm font-semibold text-electric">{s.product}</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Financing */}
      <section id="financing" className="scroll-mt-24 bg-brand-dark py-16 sm:py-24">
        <div className="shell grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-28">
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-primary-foreground sm:text-4xl">
              Restore it now, pay monthly
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-primary-foreground/70">
              Gelcoat restoration is a once-in-several-seasons job, and oxidation only gets harder to cut the longer it
              sits. Financing lets you do it properly this year instead of patching it every spring.
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
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-electric" aria-hidden="true" />
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

      {/* Work */}
      <section className="border-t border-line bg-surface py-16 sm:py-24">
        <div className="shell">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="max-w-xl font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Recent RV work
            </h2>
            <Link to="/gallery" className="text-sm font-semibold text-electric hover:underline hover:underline-offset-4">
              Full gallery
            </Link>
          </div>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-2">
            The tape line marks where correction stops. Everything on one side is the unit as we found it.
          </p>
          <div className="mt-10">
            <VideoReel
              clips={[CLIPS.rvCrewWash, CLIPS.trailerPolish, CLIPS.rvWalkaround, CLIPS.rvInterior]}
              label="RV job videos"
            />
          </div>
          <div className="mt-10">
            <PhotoRail photos={PHOTOS.rv} label="Recent RV photos" />
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            <Link
              to="/rv-trailer/ppf"
              className="group flex items-center justify-between rounded-[10px] border border-line px-6 py-5 transition-colors hover:border-ink-2"
            >
              <span>
                <span className="block font-heading font-semibold text-ink">RV paint protection film</span>
                <span className="mt-0.5 block text-sm text-muted-ink">Front caps and leading edges, up to a 10-year film warranty</span>
              </span>
              <ArrowUpRight className="h-5 w-5 text-muted-ink group-hover:text-ink" aria-hidden="true" />
            </Link>
            <Link
              to="/marine"
              className="group flex items-center justify-between rounded-[10px] border border-line px-6 py-5 transition-colors hover:border-ink-2"
            >
              <span>
                <span className="block font-heading font-semibold text-ink">Marine and pontoon</span>
                <span className="mt-0.5 block text-sm text-muted-ink">Same gelcoat process, on the water side</span>
              </span>
              <ArrowUpRight className="h-5 w-5 text-muted-ink group-hover:text-ink" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <ServiceFAQ title="Questions RV owners ask" faqs={faqs} />

      {/* Assessment */}
      <section id="assessment" className="scroll-mt-24 border-t border-line bg-surface py-16 sm:py-24">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Book a free RV assessment
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-2">
              We'll look at the unit, measure it and give you a written per-foot quote. Mention financing and the
              application comes with it.
            </p>
            <dl className="mt-10 space-y-5 text-[15px]">
              <div>
                <dt className="text-sm text-muted-ink">Phone</dt>
                <dd>
                  <a href={telHref} className="font-semibold text-ink hover:text-electric">
                    {PHONE}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-muted-ink">Email</dt>
                <dd>
                  <a href={`mailto:${EMAIL}`} className="font-semibold text-ink hover:text-electric">
                    {EMAIL}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-muted-ink">Hours</dt>
                <dd className="font-semibold text-ink">{HOURS}</dd>
              </div>
            </dl>
          </div>
          <AssessmentForm
            source="rv-assessment"
            title="Tell us about your unit"
            subtitle="Year, make and length is plenty to start."
          />
        </div>
      </section>

      <Footer />
      <div className="h-20 lg:hidden" />
      <StickyMobileCTA />
    </div>
  </PageTransition>
);

export default TrailerRV;
