import { Link } from "react-router-dom";
import { ExternalLink, Star } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import StatBand from "@/components/StatBand";
import ClosingCTA from "@/components/site/ClosingCTA";
import { Section, SectionHeading, btnPrimary, btnSecondaryDark, cardClass, textLink } from "@/components/site/Section";
import SEO from "@/components/SEO";
import { REAL_REVIEWS, GOOGLE_REVIEWS_URL, SERVICE_AREA_SENTENCE } from "@/data/copy";
import { BOOKING_URL, FIVE_STAR_REVIEWS, SEASON_STATS, SERVICE_AREAS } from "@/data/pricing";

const STATS = [
  { value: FIVE_STAR_REVIEWS, label: "Five-star Google reviews" },
  { value: SEASON_STATS.cars, label: "Cars detailed this season" },
  { value: SEASON_STATS.rvs, label: "RVs serviced this season" },
  { value: String(SERVICE_AREAS.length), label: "Communities served" },
];

const Reviews = () => (
  <PageTransition>
    <div className="min-h-screen bg-canvas pb-16 lg:pb-0">
      <SEO
        title="Reviews | Xpress Auto & RV Detailing Calgary"
        description={`${FIVE_STAR_REVIEWS} five-star Google reviews from mobile detailing customers in ${SERVICE_AREA_SENTENCE}.`}
        canonical="/reviews"
      />
      <Navbar />
      <AutoBreadcrumbs />

      <section className="bg-brand-dark">
        <div className="shell pb-32 pt-16 sm:pb-40 sm:pt-24">
          <div className="flex gap-1" aria-hidden="true">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-current text-primary-foreground" />
            ))}
          </div>
          <h1 className="mt-5 max-w-3xl font-heading text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-primary-foreground sm:text-5xl">
            What customers say
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-primary-foreground/75 sm:text-lg">
            {FIVE_STAR_REVIEWS} five-star reviews on Google, earned the same way every time: show up when we say we will,
            do the work properly, and don't leave until the owner has looked it over.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
              Read them on Google
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className={btnSecondaryDark}>
              Book a detail
            </a>
          </div>
        </div>
      </section>
      <StatBand stats={STATS} />

      <Section>
        <SectionHeading
          title="From our Google reviews"
          intro="Copied word for word from Google, first name and last initial only."
          action={
            <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className={textLink}>
              See all reviews on Google
            </a>
          }
        />
        <div className="grid gap-5 md:grid-cols-3">
          {REAL_REVIEWS.map((r) => (
            <figure key={r.name} className={`${cardClass} flex flex-col p-7`}>
              <div className="flex gap-0.5" aria-label="5 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current text-ink" aria-hidden="true" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink-2">{r.text}</blockquote>
              <figcaption className="mt-6 border-t border-line pt-4 text-sm">
                <span className="font-semibold text-ink">{r.name}</span>
                <span className="block text-muted-ink">{r.service}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-10 text-[15px] text-ink-2">
          Want to see the work behind them? Browse the{" "}
          <Link to="/gallery" className={textLink}>
            gallery
          </Link>
          .
        </p>
      </Section>

      <ClosingCTA />

      <Footer />
      <div className="h-20 lg:hidden" />
      <StickyMobileCTA />
    </div>
  </PageTransition>
);

export default Reviews;
