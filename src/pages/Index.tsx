import { Link } from "react-router-dom";
import { Phone, Check, ShieldCheck } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import HeroSection from "@/components/HeroSection";
import StatBand from "@/components/StatBand";
import CompanyLogos from "@/components/CompanyLogos";
import HomeSectors from "@/components/home/HomeSectors";
import RecentWork from "@/components/home/RecentWork";
import AutoPackages from "@/components/AutoPackages";
import GoogleReviewBadge from "@/components/GoogleReviewBadge";
import AssessmentForm from "@/components/AssessmentForm";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import WorkTruckPackage from "@/components/WorkTruckPackage";
import FleetAccounts from "@/components/home/FleetAccounts";
import ChatWidget from "@/components/ChatWidget";
import SEO, { localBusinessJsonLd } from "@/components/SEO";
import { HOW_IT_WORKS, GUARANTEES, COVERAGE } from "@/data/copy";
import {
  BOOKING_URL,
  PHONE,
  SERVICE_AREAS,
  FIVE_STAR_REVIEWS,
  SEASON_STATS,
  FINANCING,
  FINANCING_LIVE,
  RV_BUNDLES,
  money,
  monthlyPayment,
} from "@/data/pricing";
import QualityProducts from "@/components/site/QualityProducts";
import BestValueByGoal from "@/components/site/BestValueByGoal";

const STATS = [
  { value: SEASON_STATS.cars, label: "Cars detailed this season" },
  { value: SEASON_STATS.rvs, label: "RVs serviced this season" },
  { value: FIVE_STAR_REVIEWS, label: "Five-star Google reviews" },
  { value: String(SERVICE_AREAS.length), label: "Communities served" },
];

const restoration = RV_BUNDLES.find((b) => b.popular) ?? RV_BUNDLES[RV_BUNDLES.length - 1];
const restorationMonthly = money(
  Math.round(monthlyPayment(restoration.price * 30, FINANCING.representativeApr, FINANCING.defaultTerm)),
);

const telHref = `tel:${PHONE.replace(/-/g, "")}`;

const Index = () => (
  <PageTransition>
    <div className="min-h-screen bg-canvas pb-16 lg:pb-0">
      <SEO
        title="Mobile Car & RV Detailing Calgary"
        description="Mobile detailing in Calgary, Airdrie, Cochrane, Chestermere, Okotoks and Rocky View County. Cars, RVs, boats and fleets — our vans carry their own water and power, so we work wherever you park."
        canonical="/"
        jsonLd={localBusinessJsonLd}
      />
      <Navbar />
      <AutoBreadcrumbs />
      <HeroSection />
      <StatBand stats={STATS} />

      <div className="mt-14 sm:mt-20">
        <CompanyLogos />
      </div>

      <HomeSectors />
      <RecentWork />

      {/* Car packages */}
      <section className="bg-brand-dark py-16 sm:py-24">
        <div className="shell">
          <AutoPackages
            dark
            heading="Car detailing packages"
            intro="Pick your vehicle size and the prices update. Everything included and all add-ons are on the detailing page."
          />
          <div className="mt-10">
            <Link
              to="/detailing"
              className="text-sm font-semibold text-primary-foreground/80 underline decoration-electric decoration-2 underline-offset-[6px] hover:text-primary-foreground"
            >
              See everything included and all add-ons
            </Link>
          </div>
        </div>
      </section>

      <BestValueByGoal />

      <WorkTruckPackage />

      <FleetAccounts />

      {/* Financing */}
      <section className="border-y border-line bg-surface">
        <div className="shell grid gap-8 py-14 sm:py-16 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          {FINANCING_LIVE ? (
            <div>
              <h2 className="font-heading text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                RV restoration from {restorationMonthly}/month
              </h2>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-2">
                {restoration.name} on a 30 ft unit is {money(restoration.price * 30)}, or {restorationMonthly}/month over{" "}
                {FINANCING.defaultTerm} months at a representative {FINANCING.representativeApr}% APR (
                {money(Math.round(monthlyPayment(restoration.price * 30, FINANCING.representativeApr, FINANCING.defaultTerm) * FINANCING.defaultTerm))}{" "}
                total). Subject to lender approval.
              </p>
            </div>
          ) : (
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-electric">Coming soon</p>
              <h2 className="mt-2 font-heading text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                Monthly financing on RV restoration
              </h2>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-2">
                We're setting up monthly payments for gelcoat restoration. Until then, {restoration.name} on a 30 ft unit
                is {money(restoration.price * 30)}, quoted per foot in writing after a free assessment. Mention financing in
                your request and we'll let you know as soon as it's available.
              </p>
            </div>
          )}
          <div className="lg:justify-self-end">
            <Link
              to={FINANCING_LIVE ? "/rv-trailer#financing" : "/rv-trailer#assessment"}
              className="inline-flex min-h-[48px] items-center justify-center rounded-md bg-electric px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-electric-2"
            >
              {FINANCING_LIVE ? "Estimate your payment" : "Book a free RV assessment"}
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 sm:py-24">
        <div className="shell">
          <h2 className="max-w-xl font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            How it works
          </h2>
          <ol className="mt-12 grid gap-y-10 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4">
            {HOW_IT_WORKS.map((step, i) => (
              <li key={step.title}>
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink font-heading text-sm font-semibold tabular-nums text-ink">
                    {i + 1}
                  </span>
                  {i < HOW_IT_WORKS.length - 1 && (
                    <span aria-hidden="true" className="hidden h-px flex-1 bg-line lg:block" />
                  )}
                </div>
                <h3 className="mt-5 font-heading text-lg font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{step.body}</p>
              </li>
            ))}
          </ol>
          <ul className="mt-12 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:flex-wrap sm:gap-x-8">
            {GUARANTEES.map((g) => (
              <li key={g} className="flex items-center gap-2 text-sm font-medium text-ink-2">
                <Check className="h-4 w-4 shrink-0 text-electric" aria-hidden="true" />
                {g}
              </li>
            ))}
            <li className="flex items-center gap-2 text-sm font-medium text-ink-2">
              <ShieldCheck className="h-4 w-4 shrink-0 text-electric" aria-hidden="true" />
              {COVERAGE}
            </li>
            <li className="sm:ml-auto">
              <Link to="/cancellation-policy" className="text-sm font-medium text-muted-ink hover:text-ink hover:underline">
                Cancellation policy
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <GoogleReviewBadge />

      {/* Free assessment */}
      <section id="assessment" className="scroll-mt-24 bg-surface py-16 sm:py-24">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Not sure what it needs?
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-2">
              Send us the basics and we'll look at the vehicle, RV or boat in person, free and with no obligation. You'll
              get a straight answer on what's worth doing and what isn't.
            </p>
            <p className="mt-8 text-sm text-muted-ink">Serving</p>
            <p className="mt-1 max-w-md text-[15px] font-medium text-ink">{SERVICE_AREAS.join(", ")}</p>
          </div>
          <AssessmentForm source="home-assessment" />
        </div>
      </section>

      <FAQSection />

      {/* Closing */}
      <section className="bg-brand-dark py-16 sm:py-20">
        <div className="shell flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-primary-foreground sm:text-4xl">
              Book your detail
            </h2>
            <p className="mt-3 max-w-xl text-[15px] text-primary-foreground/70">
              We come to you anywhere in {SERVICE_AREAS.slice(0, -1).join(", ")} and{" "}
              {SERVICE_AREAS[SERVICE_AREAS.length - 1]}.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[52px] items-center justify-center rounded-md bg-electric px-7 text-sm font-semibold text-primary-foreground transition-colors hover:bg-electric-2"
            >
              Book a detail
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
      </section>

      <QualityProducts />


      <Footer />
      <div className="h-24 lg:hidden" />
      <StickyMobileCTA />
      <ChatWidget />
    </div>
  </PageTransition>
);

export default Index;
