import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO, { localBusinessJsonLd } from "@/components/SEO";
import ChatWidget from "@/components/ChatWidget";
import CompanyLogos from "@/components/CompanyLogos";
import FAQSection from "@/components/FAQSection";
import HomeHero from "@/components/home/HomeHero";
import OurExpertise from "@/components/home/OurExpertise";
import ProtectionCards from "@/components/home/ProtectionCards";
import PhotoQuoteBand from "@/components/home/PhotoQuoteBand";
import HomeReviews from "@/components/home/HomeReviews";
import AuthorizedInstallers from "@/components/site/AuthorizedInstallers";
import WhyBand from "@/components/site/WhyBand";
import FeatureRow from "@/components/site/FeatureRow";
import JobReceipts from "@/components/site/JobReceipts";
import { featuredJobs, useJobs } from "@/hooks/useJobs";
import { WHY_XPRESS } from "@/data/why";
import dquartzPhoto from "@/assets/jobs/ceramic-bmw-m340i-hood.webp";
import rvPhoto from "@/assets/jobs/hero-rv-detailing.webp";

/** FAQ indexes (FAQSection list) shown on the homepage: the most asked before booking. */
const HOME_FAQS = [8, 0, 9, 11, 10];

const HomeReceipts = () => {
  const { data = [] } = useJobs();
  return <JobReceipts jobs={featuredJobs(data, 6)} />;
};

/** Homepage, LLumar layout: hero, installers, expertise, why band, protection, flagship, RV, receipts, reviews, FAQ, quote. */
const Index = () => (
  <PageTransition>
    <div className="min-h-screen bg-canvas">
      <SEO
        title="Mobile Car & RV Detailing Calgary | Ceramic, PPF & Tint"
        description="Mobile car and RV detailing in Calgary and Airdrie: CARPRO ceramic coating, SunTek and LLumar paint protection film and window tint, at your driveway."
        canonical="/"
        jsonLd={localBusinessJsonLd}
      />
      <Navbar />

      <HomeHero />
      <AuthorizedInstallers />
      <OurExpertise />

      <WhyBand
        subject={WHY_XPRESS.subject}
        intro={WHY_XPRESS.intro}
        apart={WHY_XPRESS.apart}
        items={WHY_XPRESS.items}
        cta={{ label: "Read our reviews", href: "/reviews" }}
      />

      <ProtectionCards />

      <FeatureRow
        title="Experience CARPRO DQUARTZ"
        image={dquartzPhoto}
        imageAlt="BMW M340i hood after a ceramic coating"
        cta={{ label: "Learn more", href: "/ceramic-coating/carpro-dquartz" }}
        tone="surface"
      >
        <p>
          DQUARTZ is CARPRO's ceramic coating reinforced with synthetic nano-diamonds. It is built to resist the fine swirls that
          washing leaves behind, on top of the gloss, water beading and road-salt resistance you expect from a professional coating.
        </p>
        <p>As an authorized CARPRO installer, we prep and correct the paint first, so the coating locks in a finish worth keeping.</p>
      </FeatureRow>

      <FeatureRow
        title="RV detailing & oxidation removal"
        image={rvPhoto}
        imageAlt="Motorhome being detailed on site in Calgary"
        cta={{ label: "Book a free assessment", href: "/rv-trailer" }}
        flip
        rule
      >
        <p>
          Alberta sun chalks gelcoat and fibreglass fast. We cut back the oxidation, restore the shine and seal it, at your house, storage
          lot or campground. Our vans carry their own water and power.
        </p>
      </FeatureRow>

      <section className="section-y bg-canvas" aria-labelledby="receipts-title">
        <div className="shell">
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 id="receipts-title" className="display-xl !text-[clamp(32px,4vw,64px)]">
              Real jobs,
              <br />
              written down
            </h2>
            <Link to="/gallery" className="pill-action inline-flex items-center gap-2 border-2 border-ink/15 text-ink hover:border-ink">
              See the gallery
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <HomeReceipts />
        </div>
      </section>

      <CompanyLogos />
      <HomeReviews />
      <div id="faq" className="scroll-mt-24">
        <FAQSection pick={HOME_FAQS} />
      </div>
      <PhotoQuoteBand />

      <Footer />
      <ChatWidget />
    </div>
  </PageTransition>
);

export default Index;
