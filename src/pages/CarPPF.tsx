import LandingPage from "@/components/site/LandingPage";
import { Section, SectionHeading, cardClass } from "@/components/site/Section";
import AssessmentForm from "@/components/AssessmentForm";
import heroImg from "@/assets/ppf-hero.jpg";
import { CAR_PPF, PPF_UPCHARGE, WINDSHIELD_PPF, money } from "@/data/pricing";

const TEL = "tel:+15875004523";
const from = Math.min(...CAR_PPF.map((p) => p.price));
const windshieldFrom = Math.min(...WINDSHIELD_PPF.map((t) => t.price));

const faqs = [
  {
    q: "What does it protect against?",
    a: "Rock chips, road salt, sand blasting on the lower panels, bug etching and light scratches. The film takes the impact instead of the paint, and light swirls in the film heal in the sun.",
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
    q: "Does price change with the vehicle?",
    a: `Prices are for a car or small SUV. Trucks and large SUVs are ${PPF_UPCHARGE.truckSuvPct}% more, exotics ${PPF_UPCHARGE.exoticPct}% more. We confirm the price before we start.`,
  },
  {
    q: "Can you do the windshield too?",
    a: `Yes. Windshield protection film starts at ${money(windshieldFrom)} and pairs well with a front-end package.`,
  },
];

const CarPPF = () => (
  <LandingPage
    childrenBeforeWork
    seo={{
      title: "Paint Protection Film Calgary | Xpress Auto & RV Detailing",
      description: `Paint protection film in Calgary from ${money(from)}. Partial front, full front, Track Pack and full vehicle coverage against rock chips and road salt.`,
      canonical: "/paint-protection-film",
      serviceName: "Paint Protection Film",
      serviceDescription: "Clear, self-healing paint protection film for cars, trucks and SUVs in Calgary and area.",
    }}
    hero={{
      title: "Paint protection film: stop rock chips before they reach the paint",
      subtitle:
        "Deerfoot gravel and winter sanding trucks will chip a front end in a season. Film is a thick, clear, self-healing urethane layer that takes the hit so the paint underneath stays factory. Serving Calgary, Airdrie, Cochrane, Chestermere, Okotoks and Rocky View County.",
      image: heroImg,
      ctaType: "call",
      phoneHref: TEL,
    }}
    features={{
      title: "Why film the paint",
      items: [
        { title: "Chips stop at the film.", body: "Gravel that would chip bare paint hits the film instead. Swap the film, not the panel." },
        { title: "Keeps resale value.", body: "Clean, original paint on the front end is one of the first things a buyer or appraiser checks." },
        { title: "You won't see it.", body: "The film is optically clear and keeps the gloss of the paint underneath." },
      ],
    }}
    steps={{
      title: "How it works",
      items: [
        { title: "Get a quote", body: "Send the year, make and model, or call. We'll tell you which coverage fits how you drive." },
        { title: "Book a day", body: "Film goes on in a clean, covered space above freezing. We'll confirm where when we book." },
        { title: "We prep and install", body: "We wash and decontaminate the paint, then fit and finish the film edges." },
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
      body: `Coverage from ${money(from)}.`,
      mode: "quote",
      quoteHref: "#quote",
      quoteLabel: "Get a PPF quote",
      phoneHref: TEL,
    }}
  >
    <Section tone="surface">
      <SectionHeading title="Coverage and pricing" />
      <p className="mb-8 max-w-2xl text-[15px] leading-relaxed text-ink-2">
        Prices are for a car or small SUV. Trucks and large SUVs are {PPF_UPCHARGE.truckSuvPct}% more, exotics{" "}
        {PPF_UPCHARGE.exoticPct}% more.
      </p>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {CAR_PPF.map((p) => (
          <div key={p.id} className={`${cardClass} flex flex-col p-6`}>
            <h3 className="font-heading text-lg font-semibold text-ink">{p.name}</h3>
            {p.popular && <p className="mt-1 text-sm font-semibold text-electric">Most popular</p>}
            <p className="mt-2 font-heading text-4xl font-semibold tabular-nums text-ink">{money(p.price)}</p>
            <p className="mt-1 text-sm text-muted-ink">Install time {p.time}</p>
            <ul className="mt-4 flex-1 space-y-2 text-[15px] leading-relaxed text-ink-2">
              {p.covers.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>

    <Section>
      <div id="quote" className="mx-auto max-w-2xl scroll-mt-24">
        <SectionHeading title="Get a PPF quote" />
        <AssessmentForm source="car-ppf-quote" title="Your vehicle" subtitle="Year, make and model, and what you'd like covered." />
      </div>
    </Section>
  </LandingPage>
);

export default CarPPF;
