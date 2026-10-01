import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import StatBand from "@/components/StatBand";
import CompanyLogos from "@/components/CompanyLogos";
import GoogleReviewBadge from "@/components/GoogleReviewBadge";
import ProcessSteps from "@/components/site/ProcessSteps";
import ClosingCTA from "@/components/site/ClosingCTA";
import { Section, SectionHeading, btnPrimary, btnSecondaryDark } from "@/components/site/Section";
import SEO from "@/components/SEO";
import { BOOKING_URL, FIVE_STAR_REVIEWS, SEASON_STATS, SERVICE_AREAS } from "@/data/pricing";
import { CERAMIC_CERTIFICATIONS, NAP, SERVICE_AREA_SENTENCE, WATER_LINE } from "@/data/copy";
import QualityProducts from "@/components/site/QualityProducts";

const STATS = [
  { value: SEASON_STATS.cars, label: "Cars detailed this season" },
  { value: SEASON_STATS.rvs, label: "RVs serviced this season" },
  { value: FIVE_STAR_REVIEWS, label: "Five-star Google reviews" },
  { value: String(SERVICE_AREAS.length), label: "Communities served" },
];

const COMMITMENTS = [
  { title: "Published prices", body: "Package prices and per-foot RV rates are on the site. Quoted work is quoted in writing before we start." },
  { title: "No payment until it's done", body: "No deposit to book standard services. You pay after the work is finished and you've looked it over." },
  { title: "You inspect before we leave", body: "Walk around it with us. If something isn't right, we fix it on the spot." },
  { title: "Self-contained vans", body: WATER_LINE },
  { title: "Professional product systems", body: `${CERAMIC_CERTIFICATIONS.join(", ")} coatings and professional compounds and polishes, not retail spray-ons.` },
  { title: "Financing on RV restoration", body: "Larger RV restoration jobs can be spread over monthly payments, subject to lender approval." },
];

const VISIT = [
  { title: "Walkaround", body: "We note existing damage with you and confirm what matters most before we start." },
  { title: "The work", body: "Done with professional equipment and products, by a crew that does this every day." },
  { title: "Walkthrough", body: "You inspect the finished vehicle with us. Anything missed gets fixed before we pack up." },
  { title: "Aftercare", body: "We tell you how to keep the finish looking right until the next visit." },
];

const WhyChooseUs = () => (
  <PageTransition>
    <div className="min-h-screen bg-canvas pb-16 lg:pb-0">
      <SEO
        title="Why Xpress | Mobile Detailing Calgary"
        description={`${FIVE_STAR_REVIEWS} five-star Google reviews, published prices and a walkthrough before we leave. Mobile detailing across ${SERVICE_AREA_SENTENCE}.`}
        canonical="/why-choose-us"
      />
      <Navbar />
      <AutoBreadcrumbs />

      <section className="bg-brand-dark">
        <div className="shell pb-32 pt-16 sm:pb-40 sm:pt-24">
          <h1 className="max-w-3xl font-heading text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-primary-foreground sm:text-5xl lg:text-[3.5rem]">
            Why customers book Xpress
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-primary-foreground/75 sm:text-lg">
            Published prices, a crew that shows up with everything it needs, and a walkthrough before we leave. That's
            how we've earned {FIVE_STAR_REVIEWS} five-star reviews.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
              Book a detail
            </a>
            <a href={NAP.phoneHref} className={btnSecondaryDark}>
              {NAP.phone}
            </a>
          </div>
        </div>
      </section>
      <StatBand stats={STATS} />

      <div className="mt-14 sm:mt-20">
        <CompanyLogos />
      </div>

      <Section>
        <SectionHeading title="What you can count on" />
        <dl className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {COMMITMENTS.map((c) => (
            <div key={c.title} className="border-t-2 border-ink pt-6">
              <dt className="font-heading text-lg font-semibold text-ink">{c.title}</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-ink-2">{c.body}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section tone="surface">
        <SectionHeading title="How every visit runs" />
        <ProcessSteps steps={VISIT} />
      </Section>

      <GoogleReviewBadge />
      <QualityProducts />

      <ClosingCTA />

      <Footer />
      <div className="h-20 lg:hidden" />
      <StickyMobileCTA />
    </div>
  </PageTransition>
);

export default WhyChooseUs;
