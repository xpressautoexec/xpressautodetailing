import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import SEO, { buildServiceJsonLd } from "@/components/SEO";
import ServicePageHero from "@/components/ServicePageHero";
import QuoteSection from "@/components/site/QuoteSection";
import ClosingCTA from "@/components/site/ClosingCTA";
import XpressProcess from "@/components/site/XpressProcess";
import { Section, SectionHeading } from "@/components/site/Section";
import { AUTO_PACKAGES, HEADLIGHT_RESTORATION, money } from "@/data/pricing";
import { SYSTEMS } from "@/data/brand";
import heroImg from "@/assets/jobs/interior-cadillac-srx-front-cabin.webp";

const deep = AUTO_PACKAGES.find((p) => p.id === "showroom")!;

const ITEMS = [
  {
    title: "Interior reset",
    body: "Carpets and mats extracted, seats cleaned, salt stains and odours dealt with, plastics dressed.",
    price: deep.interiorOnly ? `From ${money(deep.interiorOnly.price.sedan!)}` : "Quoted",
  },
  {
    title: "Scuff and swirl correction",
    body: `${SYSTEMS.correct.tm} machine polishing takes out wash swirls and light scuffs inspectors flag under their lights.`,
    price: "Quoted after inspection",
  },
  {
    title: "Headlight restoration",
    body: "Yellowed, hazy lenses sanded, polished and sealed so the front end reads as cared for.",
    price: `${money(HEADLIGHT_RESTORATION.standalone)} per pair`,
  },
  {
    title: "PPF removal",
    body: "Old or failing paint protection film taken off and the adhesive cleaned from the paint before you hand it back.",
    price: "Quoted after inspection",
  },
];

/** Lease return prep: get ahead of the inspection. */
const LeaseReturn = () => (
  <PageTransition>
    <div className="min-h-screen bg-canvas">
      <SEO
        title="Lease Return Prep Calgary | Interior, Swirls, Headlights, PPF Removal"
        description="Lease return prep in Calgary and Airdrie: interior reset, scuff and swirl correction, headlight restoration and PPF removal before your lease inspection."
        canonical="/lease-return"
        jsonLd={buildServiceJsonLd("Lease Return Prep", "Interior reset, paint correction, headlight restoration and PPF removal before a lease inspection.", "/lease-return")}
      />
      <Navbar />
      <AutoBreadcrumbs currentLabel="Lease return prep" />
      <ServicePageHero
        eyebrow="Lease return prep"
        title="Return it without the charges."
        subtitle="Interior reset, scuff and swirl correction, headlight restoration and PPF removal, done before your lease inspection."
        image={heroImg}
        imageAlt="Cadillac SRX cream leather front cabin after interior detail"
        ctaType="call"
        bookHref="#what"
        bookLabel="What we prep"
      />

      <Section id="what" className="scroll-mt-24">
        <SectionHeading eyebrow="What we prep" title="Four things inspectors check." intro="Book it a week or two before the inspection so there's time for anything extra." />
        <div className="grid gap-4 sm:grid-cols-2">
          {ITEMS.map((i, n) => (
            <article key={i.title} className="flex flex-col rounded-card border border-line bg-surface p-7">
              <span className="num text-sm text-electric">{String(n + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 font-heading text-2xl font-bold text-ink">{i.title}</h3>
              <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-2">{i.body}</p>
              <p className="num mt-5 border-t border-line pt-4 text-xl text-ink">{i.price}</p>
            </article>
          ))}
        </div>
      </Section>

      <XpressProcess service="lease return" />

      <QuoteSection
        source="lease-return"
        title="Get a quote before the inspection"
        intro="Tell us the vehicle and the inspection date. Photos of the seats, paint and headlights get you an exact price by text."
      />

      <ClosingCTA title="Hand it back clean" body="Interior, paint, headlights and film, done in one visit where we can." mode="quote" />
      <Footer />
    </div>
  </PageTransition>
);

export default LeaseReturn;
