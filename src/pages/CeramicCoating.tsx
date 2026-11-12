import { WHY_CERAMIC } from "@/data/why";
import ProtectionProductLinks from "@/components/site/ProtectionProductLinks";
import LandingPage from "@/components/site/LandingPage";
import CoatTiers from "@/components/site/CoatTiers";
import { Section, SectionHeading, cardClass } from "@/components/site/Section";
import heroImg from "@/assets/jobs/hero-ceramic-coating.webp";
import { PHOTOS } from "@/data/photos";
import { CERAMIC_PACKAGES, money } from "@/data/pricing";
import { CERAMIC_CERTIFICATIONS } from "@/data/copy";

const from = Math.min(...CERAMIC_PACKAGES.map((p) => p.price));

const faqs = [
  {
    q: "How long does a ceramic coating last in Calgary?",
    a: "Depending on the product tier and how the vehicle is stored and washed, from one to nine years. Alberta winters are hard on coatings, so a good maintenance wash routine matters more here than in milder climates.",
  },
  {
    q: "Does ceramic coating prevent rock chips?",
    a: "No. A coating is a chemical barrier, not an impact barrier. It resists brine, bug acid, bird droppings and UV, but it won't stop gravel. Chip protection takes paint protection film, which we install on RVs and windshields.",
  },
  {
    q: "Is paint correction required before coating?",
    a: "Yes, in almost every case. A coating is optically clear, so any swirls or etching present at application are sealed in and visible for years. Every package we offer includes correction.",
  },
  { q: "Can you coat wheels, glass and trim?", a: "Yes. Wheel faces, glass and plastic trim can all be coated. Coated glass sheds water at highway speed and coated wheels release brake dust far more easily." },
  { q: "How do I wash a coated vehicle?", a: "pH-neutral soap, a clean mitt and two buckets, or a touchless wash. Avoid automatic brush washes; they put back the swirls correction removed." },
];

const COMPARE = [
  { label: "Wax or sealant", detail: "Weeks to a few months of gloss and water beading. No real chemical resistance." },
  { label: "Ceramic coating", detail: "Years of chemical, UV and brine resistance, and far easier washing. No impact protection." },
  { label: "Paint protection film", detail: "Physical, self-healing urethane that absorbs rock chips. We install it on RVs and windshields." },
];

const CeramicCoating = () => (
  <LandingPage
    why={WHY_CERAMIC}
    afterFeatures={<ProtectionProductLinks coating />}
    quote={{ defaultNeed: "Paint correction/ceramic" }}
    products={["carpro", "systemx", "gyeon", "menzerna"]}
    seo={{
      title: "Ceramic Coating Calgary | CARPRO, System X, Gyeon",
      description: `Ceramic coating in Calgary from ${money(from)}, with decontamination and machine correction included. Built for salt brine and Alberta winters.`,
      canonical: "/ceramic-coating",
      serviceName: "Ceramic Coating",
      serviceDescription: "Ceramic coating with paint correction in Calgary and area.",
    }}
    hero={{
      eyebrow: "Ceramic coating",
      title: "Gloss measured in years, not weeks.",
      subtitle: "Ceramic coating in Calgary puts a hard, hydrophobic layer between six months of salt brine and your clear coat, and makes every wash easier for years.",
      image: heroImg,
      ctaType: "call",
      bookHref: "#packages",
      bookLabel: "See Xpress Coat tiers",
    }}
    work={{
      title: "Recent coating and correction work",
      intro: "Paint correction and ceramic coating jobs only: the gloss, the reflections and the details up close.",
      photos: PHOTOS.ceramic,
    }}
    features={{
      title: "What a coating actually does",
      items: [
        { title: "Sheds water and brine", body: "Slush and road film bead and slide off instead of clinging." },
        { title: "UV and oxidation defence", body: "A sacrificial layer takes the UV so clear coat and trim don't fade." },
        { title: "Depth and gloss", body: "Cures into a hard, clear film that's noticeably glossier than wax." },
        { title: "Years, not weeks", body: `${CERAMIC_CERTIFICATIONS.join(", ")} coatings rated from 1 to 9 years.` },
      ],
    }}
    steps={{
      title: "Our coating process",
      items: [
        { title: "Decontamination", body: "Wash, iron fallout and tar removal, then clay." },
        { title: "Correction", body: "Machine polishing removes swirls and etching before they're sealed in." },
        { title: "Panel wipe", body: "Every panel stripped so the coating bonds to clear coat, not polishing oils." },
        { title: "Application", body: "Applied panel by panel, levelled at the right flash time and inspected." },
        { title: "Cure", body: "Kept dry for the initial cure, with aftercare and warranty registration." },
      ],
    }}
    faqs={{ title: "Ceramic coating questions", items: faqs }}
    related={[
      { label: "Ceramic coating packages", to: "/ceramic-paint-correction" },
      { label: "Paint correction", to: "/paint-correction" },
      { label: "Car detailing", to: "/detailing" },
    ]}
    closing={{ title: "Find the right coating", body: "Free paint inspection, no obligation.", mode: "quote", quoteHref: "#quote" }}
  >
    <CoatTiers />

    <Section tone="canvas">
      <SectionHeading
        eyebrow="Compare"
        title="Coating, wax or film"
        intro={`Coating tiers start at ${money(from)}. Here's where each option fits.`}
      />
      <dl className={`${cardClass} divide-y divide-line`}>
        {COMPARE.map((c) => (
          <div key={c.label} className="grid gap-2 px-6 py-5 sm:grid-cols-[14rem_1fr]">
            <dt className="font-semibold text-ink">{c.label}</dt>
            <dd className="text-[15px] text-ink-2">{c.detail}</dd>
          </div>
        ))}
      </dl>
    </Section>
  </LandingPage>
);

export default CeramicCoating;
