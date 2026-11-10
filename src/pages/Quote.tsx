import { Check, ShieldCheck } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import QuoteSection from "@/components/site/QuoteSection";
import CompanyLogos from "@/components/CompanyLogos";
import { COVERAGE, GUARANTEES, SERVICE_AREA_SENTENCE } from "@/data/copy";
import { FIVE_STAR_REVIEWS } from "@/data/pricing";

/** Standalone quote page: the fallback for every "Get a quote" button and the ad landing target. */
const Quote = () => (
  <PageTransition>
    <div className="min-h-screen bg-canvas">
      <SEO
        title="Get a Quote | Xpress Auto & RV Detailing Calgary"
        description={`Get a detailing, ceramic, PPF or RV price by text, usually within 15 minutes during the day. Mobile across ${SERVICE_AREA_SENTENCE}, or our heated Airdrie shop.`}
        canonical="/quote"
      />
      <Navbar />
      <AutoBreadcrumbs currentLabel="Get a quote" />
      <QuoteSection
        as="h1"
        source="quote-page"
        title="Get a price, by text"
        intro={`Two quick steps. Add a few photos and the price comes back exact, usually within 15 minutes during the day. Mobile across ${SERVICE_AREA_SENTENCE}, or drop it at the heated Airdrie shop.`}
        aside={
          <ul className="space-y-2.5">
            {[`${FIVE_STAR_REVIEWS} five-star Google reviews`, ...GUARANTEES].map((g) => (
              <li key={g} className="flex items-center gap-2.5 text-[15px] font-medium text-ink">
                <Check className="h-4 w-4 shrink-0 text-electric" aria-hidden="true" />
                {g}
              </li>
            ))}
            <li className="flex items-center gap-2.5 text-[15px] font-medium text-ink">
              <ShieldCheck className="h-4 w-4 shrink-0 text-electric" aria-hidden="true" />
              {COVERAGE}
            </li>
          </ul>
        }
      />
      <CompanyLogos />
      <Footer />
    </div>
  </PageTransition>
);

export default Quote;
