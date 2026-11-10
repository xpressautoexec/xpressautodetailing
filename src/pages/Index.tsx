import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import SEO, { localBusinessJsonLd } from "@/components/SEO";
import ChatWidget from "@/components/ChatWidget";
import CompanyLogos from "@/components/CompanyLogos";
import FAQSection from "@/components/FAQSection";
import HomeHero from "@/components/home/HomeHero";
import SeasonalFeature from "@/components/home/SeasonalFeature";
import PhotoQuoteBand from "@/components/home/PhotoQuoteBand";
import CrewBlock from "@/components/home/CrewBlock";
import HomeReviews from "@/components/home/HomeReviews";
import CompactPackages from "@/components/home/CompactPackages";
import StatRow from "@/components/site/StatRow";
import JobReceipts from "@/components/site/JobReceipts";
import { featuredJobs, useJobs } from "@/hooks/useJobs";
import QualityProducts from "@/components/site/QualityProducts";


/** FAQ indexes (FAQSection list) shown on the homepage: the six most asked before booking. */
const HOME_FAQS = [8, 0, 9, 11, 10, 5];

const HomeReceipts = () => {
  const { data = [] } = useJobs();
  return <JobReceipts jobs={featuredJobs(data, 3)} />;
};

/** Homepage: routes people to the right page and to a quote. Not a catalogue. */
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

      {/* 1. Hero: promise, three paths, one quote action */}
      <HomeHero />

      {/* 2. Stat row + client logos */}
      <StatRow />
      <CompanyLogos />

      {/* 3. Seasonal feature (SEASON flag in data/season.ts) */}
      <SeasonalFeature />

      {/* 4. Photo quote band + form */}
      <PhotoQuoteBand />

      {/* 5. Job receipts */}
      <section className="section-y bg-surface" aria-labelledby="receipts-title">
        <div className="shell">
          <div className="mb-10 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow mb-3">Job receipts</p>
              <h2 id="receipts-title" className="font-heading text-4xl font-extrabold leading-[1.0] tracking-display text-ink sm:text-6xl">
                Real jobs, written down.
              </h2>
            </div>
            <Link to="/gallery" className="inline-flex items-center gap-1.5 text-sm font-semibold text-electric hover:underline hover:underline-offset-4">
              See the gallery
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
          <HomeReceipts />
        </div>
      </section>

      {/* 6. Crew + Walkaround Guarantee */}
      <CrewBlock />

      {/* 7. Reviews */}
      <HomeReviews />

      {/* 8. Car packages, one compact table */}
      <section id="packages" className="section-y scroll-mt-24 border-t border-line bg-tint" aria-labelledby="packages-title">
        <div className="shell">
          <p className="eyebrow mb-3">Detailing</p>
          <h2 id="packages-title" className="font-heading text-4xl font-extrabold leading-[1.0] tracking-display text-ink sm:text-6xl">
            A reset, not a wash.
          </h2>
          <p className="mb-8 mt-5 max-w-xl text-base leading-relaxed text-ink-2">
            Car detailing packages priced by vehicle size: pick yours and the prices update.
          </p>
          <CompactPackages />
        </div>
      </section>

      {/* 9. FAQ + products */}
      <FAQSection pick={HOME_FAQS} />
      <QualityProducts />

      <Footer />
      <ChatWidget />
    </div>
  </PageTransition>
);

export default Index;
