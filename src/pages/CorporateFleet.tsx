import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import QuoteSection from "@/components/site/QuoteSection";
import ServicePageHero from "@/components/ServicePageHero";
import ServiceFAQ from "@/components/ServiceFAQ";
import CompanyLogos from "@/components/CompanyLogos";
import WorkTruckPackage from "@/components/WorkTruckPackage";
import ProcessSteps from "@/components/site/ProcessSteps";
import StatRow from "@/components/site/StatRow";
import XpressProcess from "@/components/site/XpressProcess";
import B2BTestimonials from "@/components/site/B2BTestimonials";
import { CTA, SYSTEMS } from "@/data/brand";
import ClosingCTA from "@/components/site/ClosingCTA";
import { Section, SectionHeading } from "@/components/site/Section";
import SEO, { buildServiceJsonLd, buildFAQJsonLd } from "@/components/SEO";
import fleetHero from "@/assets/fleet-kls-truck.jpg";
import { PHOTOS } from "@/data/photos";
import WorkShowcase from "@/components/site/WorkShowcase";
import { NAP, WATER_LINE } from "@/data/copy";
import QualityProducts from "@/components/site/QualityProducts";

const WHAT_WE_SERVICE = [
  { title: "Work trucks and vans", body: "Service fleets, trades vans and pickups cleaned on site so they leave the yard presentable." },
  { title: "Dealership lots", body: "Lot washes, delivery prep and reconditioning on pre-owned inventory, priced per unit and scheduled weekly." },
  { title: "Heavy equipment", body: "Excavators, loaders and haul trucks degreased, washed and cabs detailed at the site or yard." },
  { title: "Company and executive vehicles", body: "Scheduled interior and exterior details on a rotation your drivers never have to think about." },
];

const TERMS = [
  { title: "Per-unit rate", body: "A written rate per vehicle type, set after the yard walk." },
  { title: "Rotation schedule", body: "Weekly, bi-weekly or monthly, planned around your shifts." },
  { title: "Off-hours service", body: "Early morning, evening or weekend so units stay on the road." },
  { title: "Monthly invoicing", body: "One invoice with a per-unit breakdown, on net terms." },
  { title: "Own water and power", body: WATER_LINE },
  { title: "$2M liability", body: "Commercial liability coverage on every visit." },
  { title: "Yard walk first", body: "We count units and note condition before any price." },
  { title: "On your lot", body: "We come to the yard or job site, so nobody drives a unit anywhere." },
];

const HOW = [
  { title: "Yard walk", body: "We visit, count units and note vehicle types and condition." },
  { title: "Written rate", body: "You get a per-unit rate and a proposed schedule, in writing." },
  { title: "On rotation", body: "We show up on schedule with our own water and power." },
  { title: "One invoice", body: "A single monthly invoice with a per-unit breakdown." },
];

const faqs = [
  {
    q: "How is fleet work priced?",
    a: "Per unit, on a rate set after we see the fleet. Vehicle type, condition, frequency and how many units we can do in one visit all affect the rate. Larger and more frequent fleets get better per-unit pricing.",
  },
  { q: "Do you need water and power at our yard?", a: WATER_LINE },
  {
    q: "Can you work outside business hours?",
    a: "Yes. Most fleet work happens early morning, evenings or weekends so vehicles aren't pulled off the road during the day.",
  },
  { q: "Do you invoice monthly?", a: "Yes. Fleet accounts are invoiced monthly with a per-unit breakdown and net terms." },
  {
    q: "What's the minimum fleet size?",
    a: "There's no hard minimum, but scheduled rotations make the most sense from about five units up. For one or two work trucks, see our work truck package on the detailing page.",
  },
];

const CorporateFleet = () => (
  <PageTransition>
    <div className="min-h-screen bg-canvas">
      <SEO
        title="Fleet & Dealership Detailing Calgary"
        description="On-site fleet washing and detailing in Calgary for work trucks, dealership lots and heavy equipment. Per-unit rates, scheduled rotations, monthly invoicing."
        canonical="/fleet"
        jsonLd={[
          buildServiceJsonLd("Fleet & Dealership Detailing", "On-site fleet and dealership vehicle detailing across Calgary and area.", "/fleet"),
          buildFAQJsonLd(faqs),
        ]}
      />
      <Navbar />
      <AutoBreadcrumbs />
      <ServicePageHero
        eyebrow="For business"
        title="Clean units. On schedule. One invoice."
        subtitle={`The ${SYSTEMS.fleet.tm}: fleet washing in Calgary and Airdrie on your own lot, on a per-unit rate in writing, with one monthly invoice.`}
        image={fleetHero}
        ctaType="call"
        quoteLabel={CTA.fleet}
        bookHref="#how"
        bookLabel="How an account works"
      />

      <StatRow />

      <CompanyLogos />

      <Section>
        <SectionHeading eyebrow={SYSTEMS.fleet.name} title="What you get in writing." intro="The terms every fleet account runs on." />
        <ul className="grid gap-x-8 gap-y-4 border-t border-line pt-6 sm:grid-cols-2 lg:grid-cols-4">
          {TERMS.map((t) => (
            <li key={t.title} className="border-b border-line pb-4">
              <p className="font-heading text-xl font-bold text-ink">{t.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-2">{t.body}</p>
            </li>
          ))}
        </ul>
        <div className="mt-12">
          <B2BTestimonials />
        </div>
      </Section>

      <Section id="dealerships" tone="surface">
        <SectionHeading eyebrow="What we service" title="Trucks, lots, equipment, executives." />
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {WHAT_WE_SERVICE.map((s) => (
            <article key={s.title} className="border-t-2 border-ink pt-6">
              <h3 className="font-heading text-2xl font-bold text-ink">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{s.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="how" className="scroll-mt-24">
        <SectionHeading
          eyebrow="How it works"
          title="Yard walk to monthly invoice."
          intro="Fleet pricing is quoted per unit. There's no published rate card because no two fleets are alike."
        />
        <ProcessSteps steps={HOW} />
      </Section>

      <XpressProcess service="fleet" />

      <WorkShowcase
        title="Recent fleet work"
        intro="Work vans, pickups, dealer inventory and heavy equipment, cleaned on the client's own lot or job site."
        photos={Array.from({ length: Math.max(PHOTOS.fleet.length, PHOTOS.dealership.length) }, (_, i) => [PHOTOS.fleet[i], PHOTOS.dealership[i]]).flat().filter((p): p is (typeof PHOTOS.fleet)[number] => Boolean(p))}
      />

      <WorkTruckPackage showFleetLink={false} />

      <QuoteSection
        source="fleet"
        defaultVehicle="Fleet"
        title={CTA.fleet}
        intro="Tell us how many units and where they sit. We'll come count them and send a written per-unit rate."
      />

      <ServiceFAQ title="Fleet questions" faqs={faqs} />

      <QualityProducts />


      <ClosingCTA
        title="Keep the fleet on the road"
        body="We work early, late and on weekends so your vehicles never come off shift."
        mode="quote"
        quoteHref="#quote"
        primaryLabel={CTA.fleet}
      />

      <Footer />
    </div>
  </PageTransition>
);

export default CorporateFleet;
