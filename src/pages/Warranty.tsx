import { Link } from "react-router-dom";
import { Check, ShieldCheck } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PageHeader from "@/components/site/PageHeader";
import ClosingCTA from "@/components/site/ClosingCTA";
import WalkaroundGuarantee from "@/components/site/WalkaroundGuarantee";
import { Section, SectionHeading } from "@/components/site/Section";
import { SYSTEMS, WARRANTY } from "@/data/brand";

const COVER = [
  { title: "Workmanship", eyebrow: `${WARRANTY.workmanshipMonths} month`, body: WARRANTY.workmanship },
  { title: "Ceramic coating", eyebrow: "Manufacturer", body: WARRANTY.coating },
  { title: "Paint protection film", eyebrow: "Film", body: WARRANTY.film },
  { title: "Windshield film", eyebrow: "ExoShield", body: WARRANTY.windshield },
];

/** Warranty & Care: what's covered, by whom, and what keeps it valid. Plain language. */
const Warranty = () => (
  <PageTransition>
    <div className="min-h-screen bg-canvas">
      <SEO
        title="Warranty & Care | Ceramic Coating and PPF | Xpress Auto & RV Detailing"
        description="What's covered after a ceramic coating or paint protection film install: workmanship, manufacturer coating registration, film terms, and the care that keeps it valid."
        canonical="/warranty"
      />
      <Navbar />
      <AutoBreadcrumbs currentLabel="Warranty & Care" />
      <PageHeader
        eyebrow={<p className="eyebrow">Warranty &amp; Care</p>}
        title="What's covered, in plain language."
        intro={<p>Who stands behind what after a coating or film install, and the care that keeps it valid.</p>}
      />

      <Section>
        <SectionHeading eyebrow="Coverage" title="Four parts, four owners." intro="Our workmanship is ours. Products are backed by their manufacturers, under their terms." />
        <div className="grid gap-4 sm:grid-cols-2">
          {COVER.map((c) => (
            <article key={c.title} className="rounded-card border border-line bg-surface p-7">
              <p className="eyebrow">{c.eyebrow}</p>
              <h3 className="mt-2 font-heading text-2xl font-bold text-ink">{c.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{c.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading
          eyebrow={SYSTEMS.care.tm}
          title="Care that keeps it valid."
          intro="Coatings and film last when they're washed right. These are the conditions."
        />
        <ul className="grid gap-3 sm:grid-cols-2">
          {WARRANTY.care.map((c) => (
            <li key={c} className="flex items-start gap-3 rounded-card border border-line bg-surface p-5 text-[15px] text-ink">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-electric" aria-hidden="true" />
              {c}
            </li>
          ))}
        </ul>
        <p className="mt-6 flex items-start gap-2 text-sm text-ink-2">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-electric" aria-hidden="true" />
          Damage from impacts, accidents, harsh chemicals or brush washes isn't a workmanship issue. If you're unsure, text us a photo before you wash.
        </p>
      </Section>

      <Section>
        <SectionHeading eyebrow="Before we leave" title="Signed off on the spot." />
        <WalkaroundGuarantee variant="card" />
        <p className="mt-8 text-sm text-ink-2">
          See the <Link to="/ceramic-paint-correction" className="font-semibold text-electric hover:underline">Xpress Coat tiers</Link> and the{" "}
          <Link to="/paint-protection-film" className="font-semibold text-electric hover:underline">Xpress Protect film packages</Link>.
        </p>
      </Section>

      <ClosingCTA title="Questions about coverage?" body="Text us the vehicle and what was installed, and we'll tell you exactly what applies." mode="quote" />
      <Footer />
    </div>
  </PageTransition>
);

export default Warranty;
