import { useState } from "react";
import LandingPage from "@/components/site/LandingPage";
import { Section, SectionHeading, cardClass } from "@/components/site/Section";
import AssessmentForm from "@/components/AssessmentForm";
import partialFront from "@/assets/ppf-coverage-partial-front.svg";
import fullFront from "@/assets/ppf-coverage-full-front.svg";
import trackPack from "@/assets/ppf-coverage-track-pack.svg";
import fullBody from "@/assets/ppf-coverage-full-vehicle.svg";
import PPFCraft from "@/components/ppf/PPFCraft";
import heroImg from "@/assets/ppf-hero.jpg";
import { CAR_PPF, CAR_PPF_SIZES, PPF_UPCHARGE, WINDSHIELD_PPF, carPpfPrice, money, type CarPpfSizeId } from "@/data/pricing";
import { FILM_BRAND, FILM_CUT_SYSTEM } from "@/data/copy";

const TEL = "tel:+15875004523";
const from = Math.min(...CAR_PPF.map((p) => p.price));
const windshieldFrom = Math.min(...WINDSHIELD_PPF.map((t) => t.price));

const faqs = [
  {
    q: "What does it protect against?",
    a: "Rock chips, road salt, sand blasting on the lower panels, bug etching and light scratches. The film takes the impact instead of the paint, and light swirls in the film heal with heat.",
  },
  {
    q: "Which film do you use?",
    a: `${FILM_BRAND}. It is optically clear, self-healing and backed by 3M's manufacturer warranty against yellowing, cracking and peeling.`,
  },
  {
    q: "Is the film cut on my car?",
    a: `No. We cut it on our plotter from ${FILM_CUT_SYSTEM} patterns made for your year, make and model, so there's no knife work on your paint.`,
  },
  {
    q: "PPF or ceramic coating?",
    a: "Ceramic coating makes paint glossy and easy to wash, but it won't stop a rock chip. Film does. Many owners film the front and coat the rest.",
  },
  {
    q: "How long does it take?",
    a: "A partial or full front is one day. Track Pack is one to two days. A full vehicle is two to three days, and the film needs a few days to fully clear.",
  },
  {
    q: "Can you do the windshield too?",
    a: `Yes. Windshield protection film starts at ${money(windshieldFrom)} and pairs well with a front-end package.`,
  },
];

/** Coverage renders per package: film-covered panels shown in blue. */
const COVERAGE_IMG: Record<string, { src: string; alt: string }> = {
  "partial-front": { src: partialFront, alt: "Partial front coverage: bumper, leading edge of the hood and fenders, mirror caps in blue" },
  "full-front": { src: fullFront, alt: "Full front coverage: full hood, fenders, bumper and mirror caps in blue" },
  "track-pack": { src: trackPack, alt: "Track Pack coverage: full front plus A-pillars, roof edge, rockers and rear arches in blue" },
  "full-vehicle": { src: fullBody, alt: "Full vehicle coverage: every painted panel in blue" },
};

const CarPPF = () => {
  const [size, setSize] = useState<CarPpfSizeId>("car");
  const sizeInfo = CAR_PPF_SIZES.find((s) => s.id === size)!;

  return (
    <LandingPage
      childrenBeforeWork
      products={["3m"]}
      seo={{
        title: "Paint Protection Film Calgary | 3M Scotchgard Pro | Xpress Auto & RV Detailing",
        description: `${FILM_BRAND} paint protection film in Calgary from ${money(from)}. Computer-cut on our plotter, installed by our own crew. Partial front to full vehicle, priced by vehicle size.`,
        canonical: "/paint-protection-film",
        serviceName: "Paint Protection Film",
        serviceDescription: `${FILM_BRAND} paint protection film for cars, trucks and SUVs in Calgary and area, computer-cut and installed in-house.`,
      }}
      hero={{
        title: "Paint protection film: stop rock chips before they reach the paint",
        subtitle: `Deerfoot gravel and winter sanding trucks will chip a front end in a season. We install ${FILM_BRAND}, a clear self-healing film, cut on our plotter for your exact vehicle so it takes the hit instead of your paint. Serving Calgary, Airdrie, Cochrane, Chestermere, Okotoks and Rocky View County.`,
        image: heroImg,
        ctaType: "call",
        phoneHref: TEL,
      }}
      features={{
        title: "Why film the paint",
        items: [
          { title: "Chips stop at the film.", body: "Gravel that would chip bare paint hits the film instead. Replace a panel of film, not repaint a panel." },
          { title: "Keeps resale value.", body: "Clean, original paint on the front end is one of the first things a buyer or appraiser checks." },
          { title: "You won't see it.", body: "The film is optically clear and keeps the gloss of the paint underneath." },
        ],
      }}
      steps={{
        title: "How it works",
        items: [
          { title: "Get a quote", body: "Send the year, make and model, or call. We'll tell you which coverage fits how you drive." },
          { title: "We cut the film", body: `Patterns for your vehicle come from ${FILM_CUT_SYSTEM} and are cut on our plotter before install day.` },
          { title: "Prep and install", body: "We wash and decontaminate the paint in a clean, covered space above freezing, then fit and finish every edge." },
          { title: "Let it cure", body: "Wait a few days before washing while the film fully clears." },
        ],
      }}
      faqs={{ title: "Paint protection film questions", items: faqs }}
      related={[
        { label: "Windshield protection film", to: "/windshield-ppf" },
        { label: "Ceramic coating", to: "/ceramic-paint-correction" },
        { label: "RV paint protection film", to: "/rv-trailer/ppf" },
        { label: "Car detailing packages", to: "/detailing" },
      ]}
      closing={{
        title: "Protect the paint before the next rock",
        body: `${FILM_BRAND} coverage from ${money(from)}.`,
        mode: "quote",
        quoteHref: "#quote",
        quoteLabel: "Get a PPF quote",
        phoneHref: TEL,
      }}
    >
      <Section tone="surface" id="pricing">
        <SectionHeading
          title="Coverage and pricing"
          intro="Pick your vehicle size. Panels shown in blue are covered by film."
        />

        <div role="tablist" aria-label="Vehicle size" className="mb-8 flex flex-wrap gap-2">
          {CAR_PPF_SIZES.map((s) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={size === s.id}
              onClick={() => setSize(s.id)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                size === s.id ? "border-electric bg-electric text-primary-foreground" : "border-line bg-card text-ink hover:border-electric"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
        <p className="-mt-4 mb-8 text-sm text-muted-ink">e.g. {sizeInfo.examples}</p>

        <div className="grid gap-5 md:grid-cols-2">
          {CAR_PPF.map((p) => (
            <div key={p.id} className={`${cardClass} flex flex-col p-6 ${p.popular ? "ring-2 ring-electric" : ""}`}>
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-heading text-lg font-semibold text-ink">{p.name}</h3>
                {p.popular && <span className="text-xs font-semibold uppercase tracking-wide text-electric">Most popular</span>}
              </div>
              <div className="-mx-2 my-5 overflow-hidden rounded-xl bg-brand-dark">
                <img
                  src={COVERAGE_IMG[p.id].src}
                  alt={COVERAGE_IMG[p.id].alt}
                  width={736}
                  height={256}
                  loading="lazy"
                  className="aspect-[736/256] w-full object-contain px-3 py-4"
                />
              </div>
              <p className="font-heading text-4xl font-semibold tabular-nums text-ink">{money(carPpfPrice(p.price, size))}</p>
              <p className="mt-1 text-sm text-muted-ink">Install time {p.time}</p>
              <ul className="mt-4 flex-1 space-y-2 text-[15px] leading-relaxed text-ink-2">
                {p.covers.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-[15px]">
            <caption className="mb-3 text-left font-heading text-lg font-semibold text-ink">All sizes at a glance</caption>
            <thead>
              <tr className="border-b border-line text-sm text-muted-ink">
                <th className="py-2 pr-4 font-semibold">Package</th>
                {CAR_PPF_SIZES.map((s) => (
                  <th key={s.id} className="py-2 pr-4 font-semibold">
                    {s.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CAR_PPF.map((p) => (
                <tr key={p.id} className="border-b border-line/60">
                  <td className="py-3 pr-4 font-semibold text-ink">{p.name}</td>
                  {CAR_PPF_SIZES.map((s) => (
                    <td key={s.id} className="py-3 pr-4 tabular-nums text-ink-2">
                      {money(carPpfPrice(p.price, s.id))}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-ink">
            Trucks and large SUVs are {PPF_UPCHARGE.truckSuvPct}% more than a car, exotics {PPF_UPCHARGE.exoticPct}% more. Heavily
            modified bodies are quoted after we see the vehicle. Your price is confirmed before we start.
          </p>
        </div>
      </Section>

      <PPFCraft />

      <Section>
        <div id="quote" className="mx-auto max-w-2xl scroll-mt-24">
          <SectionHeading title="Get a PPF quote" />
          <AssessmentForm source="car-ppf-quote" title="Your vehicle" subtitle="Year, make and model, and what you'd like covered." />
        </div>
      </Section>
    </LandingPage>
  );
};

export default CarPPF;
