import { Link } from "react-router-dom";
import LandingPage from "@/components/site/LandingPage";
import { Section, SectionHeading, btnPrimary } from "@/components/site/Section";
import heroImg from "@/assets/jobs/hero-paint-correction.webp";
import { PHOTOS } from "@/data/photos";
import { CERAMIC_PACKAGES, money } from "@/data/pricing";

const from = Math.min(...CERAMIC_PACKAGES.map((p) => p.price));

const DEFECTS = [
  "Swirl marks from automatic car washes",
  "Wash-induced micro-marring",
  "Buffer trails from previous shops",
  "Water spot etching",
  "Bird dropping and bug acid etching",
  "Light oxidation and dullness",
  "Road rash haze on lower panels",
  "Uneven gloss after a repaint",
];

const faqs = [
  {
    q: "What is paint correction?",
    a: "The mechanical removal of a microscopic layer of clear coat with machine polishers, compounds and pads. Levelling the surface means swirls, scratches and etching no longer scatter light.",
  },
  {
    q: "Can every scratch be polished out?",
    a: "No. If a scratch catches your fingernail it has usually gone through the clear coat, and polishing further would compromise the panel. Those need touch-up or refinishing.",
  },
  { q: "How much clear coat is removed?", a: "A few microns. We take paint depth readings first so we stay well inside a safe margin on every panel." },
  {
    q: "Should I get correction before a ceramic coating?",
    a: "Yes. A coating is clear and lasts years, so any defect present at application is sealed under it. Correction first, coating second, which is why every coating package includes it.",
  },
  {
    q: "How long do the results last?",
    a: "The correction itself is permanent. How long it stays looking corrected depends on wash technique. A coating and avoiding brush washes is what preserves it.",
  },
];

const PaintCorrection = () => (
  <LandingPage
    products={["menzerna", "systemx", "gtechniq", "gyeon"]}
    seo={{
      title: "Paint Correction Calgary | Swirl & Scratch Removal",
      description: "Machine paint correction in Calgary that removes swirls, buffer trails and etching, with paint depth readings on every panel.",
      canonical: "/paint-correction",
      serviceName: "Paint Correction",
      serviceDescription: "Machine paint correction and polishing in Calgary and area.",
    }}
    hero={{
      title: "Paint correction: swirls gone for good",
      subtitle: "Those spiderweb scratches you see in direct sun are wash swirls in the clear coat. Machine polishing removes them permanently. We measure paint depth first and correct under proper lighting.",
      image: heroImg,
      ctaType: "call",
    }}
    work={{
      title: "Recent correction work",
      intro: "Tape lines mark where correction stops, so you can see the difference on the same panel.",
      photos: [...PHOTOS.ceramic, ...PHOTOS.exterior.slice(0, 6)],
    }}
    features={{
      title: "How correction works",
      items: [
        { title: "Paint inspection", body: "Depth readings and inspection under multiple lights to map each defect before a pad touches the panel." },
        { title: "One-step polish", body: "A single cut-and-finish that removes most light swirls and restores gloss. Best value for daily drivers." },
        { title: "Two-step correction", body: "A compounding pass then a refining polish. Removes deeper defects and finishes to a true show gloss." },
        { title: "Protection", body: "Finished with a sealant or ceramic coating so the result lasts." },
      ],
    }}
    faqs={{ title: "Paint correction questions", items: faqs }}
    related={[
      { label: "Correction and coating packages", to: "/ceramic-paint-correction" },
      { label: "Ceramic coating", to: "/ceramic-coating" },
      { label: "RV gelcoat restoration", to: "/rv-trailer" },
      { label: "Car detailing", to: "/detailing" },
    ]}
    closing={{ title: "See what your paint needs", body: "Free inspection, no obligation.", mode: "quote", quoteHref: "/ceramic-paint-correction#assessment", quoteLabel: "Book a free paint inspection" }}
  >
    <Section tone="surface">
      <SectionHeading
        title="Defects we correct"
        action={
          <Link to="/ceramic-paint-correction" className={btnPrimary}>
            Packages from {money(from)}
          </Link>
        }
      />
      <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
        {DEFECTS.map((d) => (
          <li key={d} className="border-b border-line pb-3 text-[15px] text-ink">
            {d}
          </li>
        ))}
      </ul>
    </Section>
  </LandingPage>
);

export default PaintCorrection;
