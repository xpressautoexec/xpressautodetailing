import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import QuoteSection from "@/components/site/QuoteSection";
import ServicePageHero from "@/components/ServicePageHero";
import ServiceFAQ from "@/components/ServiceFAQ";
import GuaranteeStrip from "@/components/site/GuaranteeStrip";
import XpressProcess from "@/components/site/XpressProcess";
import CoatTiers from "@/components/site/CoatTiers";
import CorrectionTable from "@/components/site/CorrectionTable";
import ClosingCTA from "@/components/site/ClosingCTA";
import SEO, { buildServiceJsonLd, buildFAQJsonLd } from "@/components/SEO";
import ceramicHero from "@/assets/jobs/hero-paint-ceramics.webp";
import { PHOTOS, CLIPS } from "@/data/photos";
import WorkShowcase from "@/components/site/WorkShowcase";
import { CERAMIC_PACKAGES, CERAMIC_UPCHARGE, money } from "@/data/pricing";
import { CERAMIC_CERTIFICATIONS } from "@/data/copy";
import QualityProducts from "@/components/site/QualityProducts";

const stages = [
  {
    title: "Decontamination",
    body: "Hand wash, iron and tar removal, then clay bar. Coating over bonded contamination locks the dirt in, so it comes off first.",
  },
  {
    title: "Correction",
    body: "Machine polishing removes swirls, wash marks and light scratches. One step for gloss, two when the paint needs real cutting.",
  },
  {
    title: "Panel prep",
    body: "Every panel is wiped down so no polishing oils are left. This step decides whether a coating actually bonds.",
  },
  {
    title: "Coating and cure",
    body: "Applied panel by panel, levelled, then left to cure. Keep it dry for 24 hours and out of the car wash for a week.",
  },
];

const truckAdds = CERAMIC_PACKAGES.map((p) => p.prices.truck - p.prices.sedan);
const truckUpcharge =
  Math.min(...truckAdds) === Math.max(...truckAdds)
    ? money(truckAdds[0])
    : `${money(Math.min(...truckAdds))} to ${money(Math.max(...truckAdds))}`;

const faqs = [
  {
    q: "What does a ceramic coating actually do?",
    a: "It bonds to the clear coat and gives you a hard, slick, chemically resistant layer. Dirt and road film release far easier, water beads and rolls off, and the paint keeps its gloss instead of dulling out over Alberta winters.",
  },
  {
    q: "Do I still need to wash the car?",
    a: "Yes. A coating makes washing quicker and safer, it does not replace it. A regular maintenance wash keeps the coating performing for its full term.",
  },
  {
    q: "Is paint correction included?",
    a: "Every package includes machine work. Essential is a one-step enhancement, Signature and Elite are full two-step cut and polish. Correction is permanent, so it's worth doing properly before the coating goes on.",
  },
  {
    q: "How long does it take?",
    a: "Essential is a full day. Signature and Elite are two days, because the correction and the cure both need real time.",
  },
  {
    q: "Does it cost more for a truck or SUV?",
    a: `Yes. Add ${money(CERAMIC_UPCHARGE.suv)} for an SUV, ${money(CERAMIC_UPCHARGE.minivan)} for a 3-row or van and ${truckUpcharge} for a pickup. Exotics and heavily modified paint are ${CERAMIC_UPCHARGE.exoticPct}% more.`,
  },
  {
    q: "Why do you inspect the paint before booking?",
    a: "Paint condition decides how much correction a car needs. A free inspection means the price you're quoted is the price you pay, with no surprises on the day.",
  },
];

const PaintCeramics = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-canvas">
        <SEO
          title="Ceramic Coating Calgary | Paint Correction"
          description={`Ceramic coating and machine paint correction in Calgary, from ${money(
            Math.min(...CERAMIC_PACKAGES.map((p) => p.price)),
          )}. 1-year, 5-year and 9-year packages, decontaminated, corrected and registered.`}
          canonical="/ceramic-paint-correction"
          jsonLd={[
            buildServiceJsonLd(
              "Ceramic Coating & Paint Correction",
              "Machine paint correction and ceramic coating packages in Calgary and area.",
              "/ceramic-paint-correction",
            ),
            buildFAQJsonLd(faqs),
          ]}
        />
        <Navbar />
        <AutoBreadcrumbs />
        <ServicePageHero
          eyebrow="Ceramic coating"
          title="Gloss measured in years, not weeks."
          subtitle={`Ceramic coating and paint correction in Calgary: every Xpress Coat™ tier starts with decontamination and machine correction, using ${CERAMIC_CERTIFICATIONS.join(", ")} coatings.`}
          image={ceramicHero}
          ctaType="call"
          bookHref="#packages"
          bookLabel="See packages"
        />
        <GuaranteeStrip />

        <CoatTiers />

        <CorrectionTable />

        <WorkShowcase
          title="Recent coating and correction work"
          intro="Paint correction and ceramic coating jobs only: the gloss, the reflections and the details up close."
          photos={PHOTOS.ceramic}
          clips={[CLIPS.gleHeadlight, CLIPS.paintCorrection, CLIPS.gleHeadlightClose]}
        />

        <XpressProcess service="ceramic coating" details={stages} detailsTitle="On a coating job" />

        <QuoteSection
          id="assessment"
          source="ceramic-paint-correction"
          defaultNeed="Paint correction/ceramic"
          title="Get a price for correction or coating"
          intro="Tell us the vehicle, how old the paint is and how long you plan to keep it. Photos in daylight show us the swirls; we'll tell you honestly which package is worth it."
        />

        <ServiceFAQ title="Coating questions" faqs={faqs} />

        <QualityProducts lines={["systemx", "carpro", "gyeon", "menzerna"]} />


        <ClosingCTA
          title="Not sure which coating you need?"
          body="Call or text and we'll talk it through. No obligation."
          mode="quote"
          quoteHref="#assessment"
          quoteLabel="Book a free paint inspection"
        />

        <Footer />
      </div>
    </PageTransition>
  );
};

export default PaintCeramics;
