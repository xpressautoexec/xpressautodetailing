import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import ServicePageHero from "@/components/ServicePageHero";
import AutoPackages from "@/components/AutoPackages";
import AddOnList from "@/components/AddOnList";
import WorkTruckPackage from "@/components/WorkTruckPackage";

import ServiceFAQ from "@/components/ServiceFAQ";
import GalleryCarousel from "@/components/GalleryCarousel";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import SEO, { buildServiceJsonLd, buildFAQJsonLd } from "@/components/SEO";
import GuaranteeStrip from "@/components/site/GuaranteeStrip";
import ClosingCTA from "@/components/site/ClosingCTA";
import { Section } from "@/components/site/Section";
import completeHero from "@/assets/jobs/hero-detailing.webp";
import WorkShowcase from "@/components/site/WorkShowcase";
import { AUTO_PACKAGES, PASS_ADDON_DISCOUNT } from "@/data/pricing";
import QualityProducts from "@/components/site/QualityProducts";
import WorkMosaic from "@/components/site/WorkMosaic";
import { DETAILING_FEATURE } from "@/data/photos";

const DETAILING_SRCS = DETAILING_FEATURE.map((p) => p.src);

const detailingFAQs = [
  {
    q: "Do you need my water or power?",
    a: "No. Our vans carry their own water and power, so we can work in a driveway, parkade, storage lot or job site.",
  },
  {
    q: "How long does a detail take?",
    a: "Upkeep is about 45 minutes, Inside & Out 2.5–3 hours, Deep Clean & Seal 3.5–4 hours, and Correct & Coat is a full 8-hour day.",
  },
  {
    q: "Which package should I book?",
    a: "If the car is generally clean, book Inside & Out. If it hasn't been detailed in a year, or there are stains, salt or pet hair, book Deep Clean & Seal. If the paint is swirled and you want it protected, book Correct & Coat.",
  },
  {
    q: "Do I have to be there?",
    a: "No. Plenty of clients leave the keys and carry on with their day. We walk you through the finished vehicle whenever you're available.",
  },
  {
    q: "When do I pay?",
    a: "After the work is done and you've looked it over. Nothing up front, and changes are free up to 24 hours before.",
  },
];

const TAB_TARGETS: Record<string, string> = {
  interior: "packages",
  exterior: "packages",
  complete: "packages",
  "add-ons": "add-ons",
};

const Detailing = () => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab") ?? "";

  useEffect(() => {
    const targetId = TAB_TARGETS[tab];
    if (!targetId) return;
    const el = document.getElementById(targetId);
    if (!el) return;
    // Let the page paint before scrolling to the requested section.
    const raf = requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth", block: "start" }));
    return () => cancelAnimationFrame(raf);
  }, [tab]);

  return (
  <PageTransition>
    <div className="min-h-screen bg-canvas pb-16 lg:pb-0">
      <SEO
        title="Car Detailing Calgary | Mobile Packages"
        description="Mobile car detailing in Calgary, Airdrie, Cochrane, Chestermere, Okotoks and Rocky View County. Packages from a 45-minute Upkeep to a full-day Correct & Coat. We bring our own water and power."
        canonical="/detailing"
        jsonLd={[
          buildServiceJsonLd(
            "Car Detailing",
            "Mobile interior and exterior car detailing packages in Calgary and area.",
            "/detailing",
          ),
          buildFAQJsonLd(detailingFAQs),
        ]}
      />
      <Navbar />
      <AutoBreadcrumbs />
      <ServicePageHero
        title="Mobile car detailing"
        subtitle={`${AUTO_PACKAGES.length} packages priced by vehicle size, done in your driveway, parkade or office lot. Our vans bring their own water and power.`}
        image={completeHero}
      />
      <GuaranteeStrip />


      <Section tone="dark" id="packages">
        <AutoPackages
          dark
          heading="Detailing packages"
          intro="Pick your vehicle size and the prices update. Prices are before tax, with no travel charge in our service area."
        />
      </Section>

      <GalleryCarousel
        title="Recent detailing work"
        lead={<WorkMosaic photos={DETAILING_FEATURE} label="Featured detailing work" />}
        exclude={DETAILING_SRCS}
      />

      <WorkTruckPackage />

      <Section id="add-ons">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Add-ons</h2>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-ink-2">
              Add any of these to any package. Xpress Pass members take {PASS_ADDON_DISCOUNT}% off every add-on.
            </p>
          </div>
          <AddOnList />
        </div>
      </Section>

      <ServiceFAQ title="Detailing questions" faqs={detailingFAQs} />
      <QualityProducts />

      <ClosingCTA body="Pick a package and a time. We come to your home, office or storage lot." />

      <Footer />
      <div className="h-20 lg:hidden" />
      <StickyMobileCTA />
    </div>
  </PageTransition>
  );
};

export default Detailing;
