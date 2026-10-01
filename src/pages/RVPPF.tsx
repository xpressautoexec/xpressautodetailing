import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import ServicePageHero from "@/components/ServicePageHero";
import ServiceFAQ from "@/components/ServiceFAQ";
import AssessmentForm from "@/components/AssessmentForm";
import RVCoverageDiagram from "@/components/RVCoverageDiagram";
import GuaranteeStrip from "@/components/site/GuaranteeStrip";
import ProcessSteps from "@/components/site/ProcessSteps";
import ClosingCTA from "@/components/site/ClosingCTA";
import { Section, SectionHeading, btnPrimary, btnSecondary, cardClass } from "@/components/site/Section";
import SEO, { buildServiceJsonLd, buildFAQJsonLd } from "@/components/SEO";
import { Check, Minus } from "lucide-react";
import rvPPFHero from "@/assets/gallery-rv-paint-correction-closeup.jpg";
import { RV_PPF, money } from "@/data/pricing";
import { FILM_BRAND, NAP } from "@/data/copy";
import QualityProducts from "@/components/site/QualityProducts";

type Level = "front-cap" | "front-plus" | "high-impact" | "full-body";

/** Coverage detail per RV_PPF package (prices live in pricing.ts). */
const DETAIL: Record<string, { level: Level; duration: string; warranty: string; coverage: string[]; ideal: string }> = {
  "Front Cap Defender": {
    level: "front-cap",
    duration: "1–2 days",
    warranty: "7 years",
    coverage: ["Full front cap and nose", "Headlight and marker light covers", "Forward-facing windshield trim edges"],
    ideal: "Travel trailers, fifth wheels and Class C owners who want core protection.",
  },
  "Highway Shield": {
    level: "front-plus",
    duration: "2–3 days",
    warranty: "7 years",
    coverage: ["Everything in Front Cap Defender", "Hood and front cowl", "Side mirrors and mirror arms", "A-pillar leading edges"],
    ideal: "Class A and Class C motorhomes that road-trip the Rockies, the Okanagan or the US Southwest.",
  },
  "Full Trail Armor": {
    level: "high-impact",
    duration: "3–4 days",
    warranty: "7 years",
    coverage: ["Everything in Highway Shield", "Lower rocker panels, full length", "Front and rear wheel arches", "Slide-out leading edges and faces", "Storage door leading edges"],
    ideal: "Gravel-road travellers and full-time RVers putting on serious kilometres.",
  },
  "Showroom Forever": {
    level: "full-body",
    duration: "5–7 days",
    warranty: "10 years",
    coverage: ["Everything in Full Trail Armor", "Full side panels, both sides", "Rear cap and rear wall", "Exterior compartments", "Roof leading edge and front overhang"],
    ideal: "New or high-end coaches where the owner wants a showroom finish for a decade.",
  },
};

const ORDER: Level[] = ["front-cap", "front-plus", "high-impact", "full-body"];
const ROWS: { label: string; level: Level }[] = [
  { label: "Front cap and nose", level: "front-cap" },
  { label: "Headlights and marker lights", level: "front-cap" },
  { label: "Hood and front cowl", level: "front-plus" },
  { label: "Side mirrors and arms", level: "front-plus" },
  { label: "A-pillar leading edges", level: "front-plus" },
  { label: "Lower rocker panels", level: "high-impact" },
  { label: "Wheel arches", level: "high-impact" },
  { label: "Slide-out edges and faces", level: "high-impact" },
  { label: "Storage door edges", level: "high-impact" },
  { label: "Full side panels", level: "full-body" },
  { label: "Rear cap and wall", level: "full-body" },
  { label: "Roof leading edge", level: "full-body" },
];

const faqs = [
  {
    q: "What is RV paint protection film?",
    a: "A clear, self-healing urethane film installed over your RV's painted and gelcoat surfaces. It takes the rock chips, bug etching, road tar and sand that would otherwise pit and dull the finish.",
  },
  {
    q: "Why does an RV need film more than a car?",
    a: "RV front caps and fibreglass sides are large and expensive to refinish, often $8,000 to $20,000 for a front cap alone, and they take thousands of highway kilometres of rock, gravel, bugs and UV. Film costs a fraction of a refinish.",
  },
  {
    q: "Will the film yellow or peel?",
    a: `We install ${FILM_BRAND} paint protection film. It is non-yellowing, hydrophobic and self-healing under heat, with a 7 to 10 year manufacturer warranty against yellowing, cracking and delamination. It removes cleanly without damaging the original finish.`,
  },
  {
    q: "Can you install over gelcoat and decals?",
    a: "Yes. We prep the gelcoat, polish out oxidation and apply film over factory decals where appropriate. We'll recommend the safest coverage plan at your free in-person inspection.",
  },
  {
    q: "How long does installation take?",
    a: "Front cap protection is 1 to 2 days, high-impact packages 2 to 4 days, and full body 5 to 7 days depending on size and condition. Larger rigs can be done at your storage location.",
  },
];

const STEPS = [
  { title: "Free inspection", body: "We assess the surfaces and oxidation and recommend a coverage plan in writing." },
  { title: "Decon and polish", body: "Surfaces are decontaminated and polished so the film bonds properly." },
  { title: "Install", body: "Computer-cut or custom-templated film, installed panel by panel." },
  { title: "Cure and walkthrough", body: "Film cures 24 to 48 hours, then we inspect it with you." },
];

const packages = RV_PPF.map((p) => ({ ...p, ...DETAIL[p.name] }));
const from = Math.min(...RV_PPF.map((p) => p.price));

const RVPPF = () => (
  <PageTransition>
    <div className="min-h-screen bg-canvas pb-16 lg:pb-0">
      <SEO
        title="RV Paint Protection Film Calgary"
        description={`RV paint protection film in Calgary from ${money(from)}. Self-healing film for front caps, hoods, rockers and full bodies. Stops rock chips, bugs and UV. Free inspection.`}
        canonical="/rv-trailer/ppf"
        jsonLd={[
          buildServiceJsonLd(
            "RV Paint Protection Film",
            "Paint protection film for RVs, motorhomes, travel trailers and fifth wheels in Calgary and area.",
            "/rv-trailer/ppf",
          ),
          buildFAQJsonLd(faqs),
        ]}
      />
      <Navbar />
      <AutoBreadcrumbs />
      <ServicePageHero
        title="RV paint protection film"
        subtitle={`A front-cap respray can cost $8,000 to $20,000. Self-healing film takes the rock chips, bug acid and UV instead, for a fraction of that. Packages from ${money(from)}.`}
        image={rvPPFHero}
        ctaType="call"
      />
      <GuaranteeStrip />

      <Section id="packages">
        <SectionHeading
          title="Coverage packages"
          intro={`Starting prices. Final coverage and price are confirmed at a free in-person inspection, and every package carries a 7 to 10 year ${FILM_BRAND} film warranty.`}
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {packages.map((p) => (
            <article key={p.name} className={`${cardClass} relative flex flex-col overflow-hidden p-6 ${p.popular ? "border-electric" : ""}`}>
              {p.popular && <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-electric" />}
              <div className="rounded-md border border-line bg-canvas p-3">
                <RVCoverageDiagram level={p.level} />
              </div>
              <p className="mt-5 h-4 text-xs font-medium text-electric">{p.popular ? "Most booked" : ""}</p>
              <h3 className="mt-1 font-heading text-xl font-semibold text-ink">{p.name}</h3>
              <p className="mt-2">
                <span className="text-sm text-muted-ink">From </span>
                <span className="font-heading text-3xl font-semibold tracking-tight tabular-nums text-ink">{money(p.price)}</span>
              </p>
              <p className="mt-1 text-xs text-muted-ink">
                {p.duration}, {p.warranty} film warranty
              </p>
              <ul className="mt-5 flex-1 space-y-2">
                {p.coverage.map((c) => (
                  <li key={c} className="flex gap-2 text-sm text-ink-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-electric" aria-hidden="true" />
                    {c}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-relaxed text-muted-ink">{p.ideal}</p>
              <a href="#assessment" className={`${p.popular ? btnPrimary : btnSecondary} mt-6`}>
                Book a free inspection
              </a>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading title="Compare coverage" />
        <div className={`${cardClass} overflow-x-auto`}>
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-line bg-canvas">
              <tr>
                <th scope="col" className="px-5 py-4 font-medium text-muted-ink">
                  Area
                </th>
                {packages.map((p) => (
                  <th key={p.name} scope="col" className={`px-4 py-4 text-center ${p.popular ? "bg-electric-soft/60" : ""}`}>
                    <span className="block font-heading font-semibold text-ink">{p.name}</span>
                    <span className="mt-0.5 block text-xs font-normal tabular-nums text-muted-ink">From {money(p.price)}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.label} className="border-b border-line last:border-b-0">
                  <th scope="row" className="px-5 py-3 font-normal text-ink-2">
                    {r.label}
                  </th>
                  {packages.map((p) => (
                    <td key={p.name} className={`px-4 py-3 text-center ${p.popular ? "bg-electric-soft/60" : ""}`}>
                      {ORDER.indexOf(p.level) >= ORDER.indexOf(r.level) ? (
                        <Check className="mx-auto h-4 w-4 text-electric" aria-label="Included" />
                      ) : (
                        <Minus className="mx-auto h-4 w-4 text-line" aria-label="Not included" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="border-t border-line bg-canvas">
                <th scope="row" className="px-5 py-3 font-medium text-ink">
                  Install time
                </th>
                {packages.map((p) => (
                  <td key={p.name} className="px-4 py-3 text-center text-ink-2">
                    {p.duration}
                  </td>
                ))}
              </tr>
              <tr className="bg-canvas">
                <th scope="row" className="px-5 py-3 font-medium text-ink">
                  Film warranty
                </th>
                {packages.map((p) => (
                  <td key={p.name} className="px-4 py-3 text-center text-ink-2">
                    {p.warranty}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section>
        <SectionHeading title="How an install runs" />
        <ProcessSteps steps={STEPS} />
      </Section>

      <ServiceFAQ title="RV film questions" faqs={faqs} />

      <Section tone="surface" id="assessment">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Book a free inspection</h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-2">
              We'll look at the unit, measure it and give you a written coverage plan and price. Or call or text {NAP.phone}.
            </p>
          </div>
          <AssessmentForm source="rv-ppf-inspection" title="Your RV" subtitle="Year, make, length and where it's stored." />
        </div>
      </Section>

      <QualityProducts lines={["3m", "systemx", "gtechniq"]} />


      <ClosingCTA
        title="Protect the front cap before the next trip"
        body="Free in-person inspection, no pressure. We'll show you what coverage your rig actually needs."
        mode="quote"
        quoteHref="#assessment"
        quoteLabel="Book a free inspection"
      />

      <Footer />
      <div className="h-20 lg:hidden" />
      <StickyMobileCTA />
    </div>
  </PageTransition>
);

export default RVPPF;
