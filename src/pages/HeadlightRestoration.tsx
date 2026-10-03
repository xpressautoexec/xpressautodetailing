import LandingPage from "@/components/site/LandingPage";
import { Section, SectionHeading, btnPrimary, cardClass } from "@/components/site/Section";
import heroImg from "@/assets/jobs/hero-headlight-restoration.webp";
import { HEADLIGHT_PHOTOS } from "@/data/photos";
import { BOOKING_URL, HEADLIGHT_RESTORATION, money } from "@/data/pricing";

const { standalone, addOn, time } = HEADLIGHT_RESTORATION;

const SIGNS = [
  "Yellow or amber tint across the lens",
  "Cloudy, milky haze",
  "Chalky or rough texture to the touch",
  "Peeling or flaking factory coating",
  "Dim, scattered low beams at night",
  "Lenses that look older than the car",
];

const faqs = [
  {
    q: "Why do headlights turn yellow?",
    a: "Modern lenses are polycarbonate with a thin factory UV coating. Sun, road salt and car washes wear that coating away, and the bare plastic oxidizes and yellows. Calgary sun and winter road salt speed it up.",
  },
  {
    q: "What does the restoration involve?",
    a: "We wet sand the lens in four stages to remove the oxidized layer, machine polish it back to clear, then apply a UV-resistant ceramic coating so the bare plastic is protected again.",
  },
  {
    q: "How long does it take?",
    a: `About ${time} per pair. We do it at your home or workplace, the same as any other mobile job.`,
  },
  {
    q: "How long will the lenses stay clear?",
    a: "The finish is sealed with a 3-year UV-resistant ceramic. Cars parked outside year-round see more sun and salt, so regular hand washing helps the coating last.",
  },
  {
    q: "Can every headlight be restored?",
    a: "Most can. Haze or moisture on the inside of the housing, and cracked lenses, can't be fixed from the outside. We check before we start and tell you if yours needs a replacement instead.",
  },
  {
    q: "Is it cheaper with a detail?",
    a: `Yes. On its own it's ${money(standalone)} per pair. Added to any detail booking it's ${money(addOn)} per pair.`,
  },
];

const HeadlightRestoration = () => (
  <LandingPage
    childrenBeforeWork
    products={["menzerna", "3m"]}
    seo={{
      title: "Headlight Restoration Calgary | Mobile, From $" + addOn,
      description: `Mobile headlight restoration in Calgary: four-stage wet sand, machine polish and a 3-year UV-resistant ceramic. ${money(standalone)} per pair, ${money(addOn)} with any detail.`,
      canonical: "/headlight-restoration",
      serviceName: "Headlight Restoration",
      serviceDescription: "Mobile headlight lens restoration with wet sanding, machine polishing and a UV-resistant ceramic coating in Calgary and area.",
    }}
    hero={{
      title: "Headlight restoration: clear lenses in under an hour",
      subtitle: `Yellow, cloudy headlights make a car look older and cut how far you can see at night. We sand off the oxidized layer, polish the lens clear and seal it with a 3-year UV-resistant ceramic. ${money(standalone)} per pair, at your driveway.`,
      image: heroImg,
      ctaType: "book",
    }}
    work={{
      title: "Lenses after polishing",
      photos: HEADLIGHT_PHOTOS,
    }}
    features={{
      title: "How we restore a headlight",
      items: [
        { title: "Inspect and mask", body: "We check the lens for cracks and inside haze, then tape off the paint and trim around it." },
        { title: "Four-stage wet sand", body: "Progressively finer grits take off the yellowed, oxidized layer evenly across the whole lens." },
        { title: "Machine polish", body: "A cutting polish removes the sanding marks and brings the lens back to optically clear." },
        { title: "3-year ceramic", body: "A UV-resistant ceramic coating replaces the worn factory layer so the lens stays clear." },
      ],
    }}
    faqs={{ title: "Headlight restoration questions", items: faqs }}
    related={[
      { label: "Car detailing packages", to: "/detailing" },
      { label: "Paint correction", to: "/paint-correction" },
      { label: "Ceramic coating", to: "/ceramic-paint-correction" },
      { label: "The Xpress Pass", to: "/xpress-pass" },
    ]}
    closing={{ title: "Get your headlights clear again", body: `${money(standalone)} per pair, or ${money(addOn)} with any detail.`, mode: "book" }}
  >
    <Section tone="surface">
      <SectionHeading title="Pricing" intro="Per pair of headlights. Same process either way." />
      <div className="grid gap-5 md:grid-cols-2">
        <div className={`${cardClass} flex flex-col p-6`}>
          <h3 className="font-heading text-lg font-semibold text-ink">On its own</h3>
          <p className="mt-2 font-heading text-4xl font-semibold tabular-nums text-ink">{money(standalone)}</p>
          <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-2">
            A standalone visit, about {time}. Wet sand, polish and 3-year UV-resistant ceramic.
          </p>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className={`${btnPrimary} mt-6 self-start`}>
            Book online
          </a>
        </div>
        <div className={`${cardClass} flex flex-col p-6`}>
          <h3 className="font-heading text-lg font-semibold text-ink">Added to a detail</h3>
          <p className="mt-2 font-heading text-4xl font-semibold tabular-nums text-ink">{money(addOn)}</p>
          <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-2">
            Add it to any detail booking and save {money(standalone - addOn)}. Same process, done during the same visit.
          </p>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className={`${btnPrimary} mt-6 self-start`}>
            Book a detail
          </a>
        </div>
      </div>
      <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-ink-2">
        Pop-up headlight stations in store parking lots around Calgary are on the way. Until then, we come to you.
      </p>
    </Section>

    <Section>
      <SectionHeading title="Signs your headlights need it" />
      <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
        {SIGNS.map((d) => (
          <li key={d} className="border-b border-line pb-3 text-[15px] text-ink">
            {d}
          </li>
        ))}
      </ul>
    </Section>
  </LandingPage>
);

export default HeadlightRestoration;
