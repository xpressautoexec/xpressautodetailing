import { Link } from "react-router-dom";
import { Check, ShieldCheck } from "lucide-react";
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
import WorkTruckPackage from "@/components/WorkTruckPackage";
import FleetAccounts from "@/components/home/FleetAccounts";
import ChatWidget from "@/components/ChatWidget";
import ConcernFinder from "@/components/ConcernFinder";
import ClosingCTA from "@/components/site/ClosingCTA";
import SEO, { localBusinessJsonLd } from "@/components/SEO";
import { HOW_IT_WORKS, GUARANTEES, COVERAGE } from "@/data/copy";
import {
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

const Index = () => (
  <PageTransition>
    <div className="min-h-screen bg-canvas">
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

      {/* Package finder (moved out of the hero so the photo can carry it) */}
      <section aria-label="Find the right package" className="bg-tint py-12 sm:py-16">
        <div className="shell max-w-3xl">
          <ConcernFinder />
        </div>
      </section>

      <div className="mt-14 sm:mt-20">
        <CompanyLogos />
      </div>

      <HomeSectors />
      <RecentWork />

      {/* Car packages */}
      <section className="border-y border-line bg-tint section-y">
        <div className="shell">
          <AutoPackages
            heading="Car detailing packages"
            intro="Pick your vehicle size and the prices update. Everything included and all add-ons are on the detailing page."
          />
          <div className="mt-10">
            <Link
              to="/detailing"
              className="text-sm font-semibold text-ink-2 underline decoration-electric decoration-2 underline-offset-[6px] hover:text-ink"
            >
              See everything included and all add-ons
            </Link>
          </div>
        </div>
      </section>

      <BestValueByGoal />

      <WorkTruckPackage />

      <FleetAccounts />

      {/* Financing: shown only once a lender is live (no "coming soon" on the public site) */}
      {FINANCING_LIVE && (
        <section className="border-y border-line bg-tint">
          <div className="shell grid gap-8 py-14 sm:py-16 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <h2 className="font-heading text-3xl font-bold tracking-display text-ink sm:text-4xl">
                RV restoration from {restorationMonthly}/month
              </h2>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-2">
                {restoration.name} on a 30 ft unit is {money(restoration.price * 30)}, or {restorationMonthly}/month over{" "}
                {FINANCING.defaultTerm} months at a representative {FINANCING.representativeApr}% APR (
                {money(Math.round(monthlyPayment(restoration.price * 30, FINANCING.representativeApr, FINANCING.defaultTerm) * FINANCING.defaultTerm))}{" "}
                total). Subject to lender approval.
              </p>
            </div>
            <div className="lg:justify-self-end">
              <Link
                to="/rv-trailer#financing"
                className="inline-flex min-h-[48px] items-center justify-center rounded-md border border-ink/20 bg-surface px-6 text-sm font-semibold text-ink transition-colors hover:border-ink"
              >
                Estimate your payment
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* How it works */}
      <section className="section-y">
        <div className="shell">
          <h2 className="max-w-xl font-heading text-4xl font-bold leading-[1.02] tracking-display text-ink sm:text-5xl">
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
      <section id="assessment" className="scroll-mt-24 border-t border-line bg-tint section-y">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <h2 className="font-heading text-4xl font-bold leading-[1.02] tracking-display text-ink sm:text-5xl">
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

      <QualityProducts />

      <ClosingCTA
        body={`We come to you anywhere in ${SERVICE_AREAS.slice(0, -1).join(", ")} and ${SERVICE_AREAS[SERVICE_AREAS.length - 1]}.`}
        bookLabel="Book a detail online"
      />

      <Footer />
      <ChatWidget />
    </div>
  </PageTransition>
);

export default Index;
