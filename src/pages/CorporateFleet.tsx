import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import ServicePageHero from "@/components/ServicePageHero";
import ServiceFAQ from "@/components/ServiceFAQ";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import CompanyLogos from "@/components/CompanyLogos";
import FleetQuoteForm from "@/components/FleetQuoteForm";
import ProcessSteps from "@/components/site/ProcessSteps";
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
    <div className="min-h-screen bg-canvas pb-16 lg:pb-0">
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
        title="Fleet and dealership detailing"
        subtitle="Scheduled on-site cleaning for work trucks, dealership inventory and heavy equipment. No drive time, no downtime, one invoice a month."
        image={fleetHero}
        ctaType="call"
      />

      <CompanyLogos />

      <Section>
        <SectionHeading title="What we service" />
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {WHAT_WE_SERVICE.map((s) => (
            <article key={s.title} className="border-t-2 border-ink pt-6">
              <h3 className="font-heading text-lg font-semibold text-ink">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{s.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading
          title="How fleet accounts work"
          intro="Fleet pricing is quoted per unit. There's no published rate card because no two fleets are alike."
        />
        <ProcessSteps steps={HOW} />
      </Section>

      <WorkShowcase
        title="Recent fleet work"
        intro="Work vans, pickups, dealer inventory and heavy equipment, cleaned on the client's own lot or job site."
        photos={Array.from({ length: Math.max(PHOTOS.fleet.length, PHOTOS.dealership.length) }, (_, i) => [PHOTOS.fleet[i], PHOTOS.dealership[i]]).flat().filter((p): p is (typeof PHOTOS.fleet)[number] => Boolean(p))}
      />

      <ServiceFAQ title="Fleet questions" faqs={faqs} />

      <Section tone="surface" id="quote">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Request a fleet quote</h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-2">
              Tell us how many units and where they sit. We'll come count them and send a written rate.
            </p>
            <dl className="mt-10 space-y-5 text-[15px]">
              <div>
                <dt className="text-sm text-muted-ink">Phone</dt>
                <dd>
                  <a href={NAP.phoneHref} className="font-semibold text-ink hover:text-electric">
                    {NAP.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-muted-ink">Email</dt>
                <dd>
                  <a href={NAP.emailHref} className="font-semibold text-ink hover:text-electric">
                    {NAP.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
          <FleetQuoteForm />
        </div>
      </Section>

      <QualityProducts />


      <ClosingCTA
        title="Keep the fleet on the road"
        body="We work early, late and on weekends so your vehicles never come off shift."
        mode="quote"
        quoteHref="#quote"
        quoteLabel="Request a fleet quote"
      />

      <Footer />
      <div className="h-20 lg:hidden" />
      <StickyMobileCTA />
    </div>
  </PageTransition>
);

export default CorporateFleet;
