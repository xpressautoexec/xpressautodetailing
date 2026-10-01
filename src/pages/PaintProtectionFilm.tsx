import { useState } from "react";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import ServicePageHero from "@/components/ServicePageHero";
import ServiceFAQ from "@/components/ServiceFAQ";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import AssessmentForm from "@/components/AssessmentForm";
import GuaranteeStrip from "@/components/site/GuaranteeStrip";
import ClosingCTA from "@/components/site/ClosingCTA";
import { Section, SectionHeading, btnPrimary, btnSecondaryDark, cardClass } from "@/components/site/Section";
import SEO, { buildServiceJsonLd, buildFAQJsonLd } from "@/components/SEO";
import { Link } from "react-router-dom";
import ppfHero from "@/assets/ppf-hero.jpg";
import { Check } from "lucide-react";
import { AUTO_PPF, PPF_UPCHARGE, TINT, money } from "@/data/pricing";
import { NAP } from "@/data/copy";

const TINT_FILMS = [
  {
    id: "carbon",
    label: "Carbon",
    blurb:
      "A solid, fade-resistant carbon film. Cuts glare, blocks UV and never turns purple. The right choice if you mainly want privacy and a clean look.",
    points: ["99% UV rejection", "No signal interference", "Lifetime no-fade warranty"],
  },
  {
    id: "ceramic",
    label: "Ceramic IR",
    blurb:
      "Nano-ceramic film with infrared rejection. Same shade, far less heat, so the cabin stays noticeably cooler in July and the A/C works less.",
    points: ["Up to 90% infrared heat rejection", "99% UV rejection", "Highest clarity, no haze"],
  },
] as const;

const coverage: Record<string, string[]> = {
  "Partial Front": ["Leading 18–24 inches of the hood", "Front bumper", "Both mirror caps", "Best value against city gravel"],
  "Full Front": ["Full hood, no seam line", "Full front fenders", "Front bumper and mirror caps", "The coverage most highway drivers choose"],
  "Track Pack": ["Everything in Full Front", "A-pillars and roof leading edge", "Rocker panels", "Rear arch impact zones"],
  "Full Vehicle": ["Every painted panel", "Wrapped edges wherever possible", "Maximum resale protection", "Two to three days"],
  "Windshield PPF": ["Optically clear windshield film", "Resists rock chips and star cracks", "Less than one glass replacement"],
  "Interior Screen PPF": ["Infotainment and gauge screens", "Stops fingernail scratches and swirls", "Matte or gloss finish"],
};

const comparison = [
  { label: "Nothing", chips: "No", swirls: "No", gloss: "—", life: "—" },
  { label: "Wax or sealant", chips: "No", swirls: "No", gloss: "Good", life: "3–6 months" },
  { label: "Ceramic coating", chips: "No", swirls: "Light only", gloss: "Excellent", life: "1–9 years" },
  { label: "Paint protection film", chips: "Yes", swirls: "Yes, self-healing", gloss: "Excellent", life: "10 years" },
];

const faqs = [
  {
    q: "What does paint protection film stop?",
    a: "Rock chips, road salt, sand blasting on the lower panels, bug etching and light scratches. The film takes the impact instead of the paint, and light swirls in the film self-heal in the sun.",
  },
  {
    q: "Will it yellow or peel?",
    a: "The films we install carry a 10-year manufacturer warranty against yellowing, cracking, bubbling and peeling. Older films yellowed; modern top-coated urethane doesn't.",
  },
  {
    q: "Can I put a ceramic coating over the film?",
    a: "Yes, and we recommend it. Coating over film makes it easier to clean and keeps the finish slick. Most clients pair Full Front with a coating on the rest of the car.",
  },
  {
    q: "Does it cost more for a truck or an exotic?",
    a: `Yes. Trucks and large SUVs are ${PPF_UPCHARGE.truckSuvPct}% more because of panel size, and exotics are ${PPF_UPCHARGE.exoticPct}% more because of panel complexity.`,
  },
  {
    q: "How long does the install take?",
    a: "A partial or full front is one day. Track Pack is one to two days. A full vehicle is two to three days, and the film needs a few days to fully clear.",
  },
];

const PaintProtectionFilm = () => {
  const [film, setFilm] = useState<(typeof TINT_FILMS)[number]["id"]>("carbon");
  const activeFilm = TINT_FILMS.find((f) => f.id === film)!;

  return (
    <PageTransition>
      <div className="min-h-screen bg-canvas pb-16 lg:pb-0">
        <SEO
          title="PPF & Window Tint Calgary | Xpress"
          description={`Paint protection film from ${money(Math.min(...AUTO_PPF.map((p) => p.price)))} and window tint from ${money(
            Math.min(...TINT.map((t) => t.price)),
          )} in Calgary. 10-year film warranty, carbon and ceramic IR tint at one price.`}
          canonical="/protection/ppf"
          jsonLd={[
            buildServiceJsonLd(
              "Paint Protection Film & Window Tinting",
              "Self-healing paint protection film and carbon or ceramic window tint in Calgary and area.",
              "/protection/ppf",
            ),
            buildFAQJsonLd(faqs),
          ]}
        />
        <Navbar />
        <AutoBreadcrumbs />
        <ServicePageHero
          title="Paint protection film and window tint"
          subtitle="Deerfoot gravel and winter sanding trucks will chip a front end in a season. Film is a thick, self-healing urethane layer that takes the hit so the paint underneath stays factory."
          image={ppfHero}
          ctaType="call"
        />
        <GuaranteeStrip />

        <Section tone="dark" id="packages">
          <SectionHeading
            dark
            title="Film coverage and pricing"
            intro={`Prices are for a sedan or coupe. Trucks and large SUVs are ${PPF_UPCHARGE.truckSuvPct}% more, exotics ${PPF_UPCHARGE.exoticPct}% more. Every film carries a 10-year manufacturer warranty.`}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {AUTO_PPF.map((p) => (
              <article
                key={p.name}
                className={`relative flex flex-col overflow-hidden rounded-[10px] border bg-primary-foreground/[0.04] p-6 ${
                  p.popular ? "border-electric" : "border-primary-foreground/15"
                }`}
              >
                {p.popular && <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-electric" />}
                <p className="h-4 text-xs font-medium text-electric">{p.popular ? "Most booked" : ""}</p>
                <h3 className="mt-1 font-heading text-lg font-semibold text-primary-foreground">{p.name}</h3>
                <p className="mt-3 font-heading text-4xl font-semibold tracking-tight tabular-nums text-primary-foreground">
                  {money(p.price)}
                </p>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {(coverage[p.name] ?? []).map((c) => (
                    <li key={c} className="flex gap-2 text-sm text-primary-foreground/75">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-electric" aria-hidden="true" />
                      {c}
                    </li>
                  ))}
                </ul>
                {p.name === "Windshield PPF" ? (
                  <Link to="/protection/windshield-ppf" className={`${btnSecondaryDark} mt-6`}>
                    Windshield PPF details
                  </Link>
                ) : (
                  <a href="#quote" className={`${p.popular ? btnPrimary : btnSecondaryDark} mt-6`}>
                    Get a film quote
                  </a>
                )}
              </article>
            ))}
          </div>
        </Section>

        <Section>
          <SectionHeading title="Film, coating or wax" intro="What each one actually protects against." />
          <div className={`${cardClass} overflow-x-auto`}>
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="border-b border-line bg-canvas text-muted-ink">
                <tr>
                  {["Protection", "Rock chips", "Scratches", "Gloss", "Lifespan"].map((h) => (
                    <th key={h} scope="col" className="px-5 py-3.5 font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.label} className={`border-b border-line last:border-b-0 ${row.label === "Paint protection film" ? "bg-electric-soft/60" : ""}`}>
                    <th scope="row" className="px-5 py-4 font-semibold text-ink">
                      {row.label}
                    </th>
                    <td className="px-5 py-4 text-ink-2">{row.chips}</td>
                    <td className="px-5 py-4 text-ink-2">{row.swirls}</td>
                    <td className="px-5 py-4 text-ink-2">{row.gloss}</td>
                    <td className="px-5 py-4 text-ink-2">{row.life}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section tone="surface" id="tint">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
            <div>
              <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Window tint</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-2">
                Carbon or ceramic IR, same price either way, so pick on performance. Carbon for looks, privacy and UV.
                Ceramic IR when you want the cabin to actually stay cool.
              </p>
              <div role="tablist" aria-label="Film type" className="mt-8 flex w-fit gap-1 rounded-md border border-line bg-canvas p-1">
                {TINT_FILMS.map((f) => (
                  <button
                    key={f.id}
                    role="tab"
                    aria-selected={film === f.id}
                    onClick={() => setFilm(f.id)}
                    className={`rounded px-5 py-2 text-sm font-semibold transition-colors ${
                      film === f.id ? "bg-electric text-primary-foreground" : "text-ink-2 hover:text-ink"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              <p className="mt-5 text-[15px] leading-relaxed text-ink-2">{activeFilm.blurb}</p>
              <ul className="mt-4 space-y-2">
                {activeFilm.points.map((p) => (
                  <li key={p} className="flex gap-2 text-sm text-ink-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-electric" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <ul className={`${cardClass} divide-y divide-line overflow-hidden`}>
                {TINT.map((t) => (
                  <li key={t.name} className="flex items-center justify-between gap-4 px-5 py-4">
                    <span className="text-[15px] text-ink">{t.name}</span>
                    <span className="font-heading text-lg font-semibold tabular-nums text-ink">{money(t.price)}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs leading-relaxed text-muted-ink">
                Prices are for standard vehicles. Steep rear glass, coupes with wraparound windows and commercial vans
                are quoted after we see the vehicle. Lifetime warranty against bubbling, peeling and colour change.
              </p>
              <a href="#quote" className={`${btnPrimary} mt-6`}>
                Get a tint quote
              </a>
            </div>
          </div>
        </Section>

        <ServiceFAQ title="Film and tint questions" faqs={faqs} />

        <Section tone="surface" id="quote">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
            <div>
              <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                Get a film or tint quote
              </h2>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-2">
                Tell us the year, make and model and how you drive it. We'll tell you which coverage is worth the
                money, in writing. Or call or text {NAP.phone}.
              </p>
            </div>
            <AssessmentForm source="ppf-tint-quote" title="Your vehicle" subtitle="Year, make and model, and what you'd like covered." />
          </div>
        </Section>

        <ClosingCTA
          title="Protect it before the next chip"
          body="Most front-end chips happen in the first highway season. Call or text and we'll quote it today."
          mode="quote"
          quoteHref="#quote"
          quoteLabel="Get a quote"
        />

        <Footer />
        <div className="h-20 lg:hidden" />
        <StickyMobileCTA />
      </div>
    </PageTransition>
  );
};

export default PaintProtectionFilm;
