import LandingPage from "@/components/site/LandingPage";
import AutoPackages from "@/components/AutoPackages";
import { Section } from "@/components/site/Section";
import heroImg from "@/assets/complete-hero.jpg";
import { AUTO_PACKAGES, money } from "@/data/pricing";
import { SERVICE_AREA_SENTENCE, WATER_LINE } from "@/data/copy";

const from = Math.min(...AUTO_PACKAGES.filter((p) => !p.memberOnly).map((p) => p.price.sedan));

const faqs = [
  {
    q: "What's the difference between a car wash and auto detailing?",
    a: "A car wash removes loose surface dirt. Detailing is a full decontamination and reset: bonded contaminants are removed, interiors are extracted and steam cleaned, and paint is protected with a sealant or coating that lasts months rather than days.",
  },
  { q: "Do you need access to water and power?", a: `No. ${WATER_LINE}` },
  {
    q: "How long does a detail take?",
    a: "Inside & Out runs about 2.5 to 3 hours and Deep Clean & Seal about 3.5 to 4 hours, depending on vehicle size and condition.",
  },
  {
    q: "Do you charge more for SUVs and trucks?",
    a: "Yes. Pricing is tiered by sedan or coupe, SUV or pickup, and 3-row SUV or minivan, because surface area and interior volume differ a lot.",
  },
  { q: "Which areas do you serve?", a: `${SERVICE_AREA_SENTENCE}. Just outside those areas? Call and ask.` },
];

const AutoDetailing = () => (
  <LandingPage
    seo={{
      title: "Auto Detailing Calgary | Mobile Car Detailing",
      description: `Mobile auto detailing in Calgary from ${money(from)}. Interior and exterior packages done in your driveway or office lot. We bring our own water and power.`,
      canonical: "/auto-detailing",
      serviceName: "Mobile Auto Detailing",
      serviceDescription: "Mobile interior and exterior auto detailing in Calgary and area.",
    }}
    hero={{
      title: "Auto detailing in Calgary that comes to you",
      subtitle: "We arrive with our own water, power, extraction and polishing equipment and detail your car, truck or SUV where it already sits. No drop-off, no waiting room.",
      image: heroImg,
      ctaType: "book",
    }}
    features={{
      title: "What every detail includes",
      items: [
        { title: "We come to you", body: "Driveway, condo stall or office lot. Self-contained vans, nothing needed from you." },
        { title: "Professional products", body: "pH-balanced, professional-grade chemistry that's safe on modern clear coats, leather and screens." },
        { title: "Same-week availability", body: "Most Calgary bookings are done within a few days. Early mornings, evenings and weekends available." },
        { title: "A walkthrough before we leave", body: "If something was missed, we fix it on the spot." },
      ],
    }}
    steps={{
      title: "How mobile detailing works",
      items: [
        { title: "Book online", body: "Pick your vehicle size, package and a time window. No deposit taken." },
        { title: "We arrive equipped", body: "Water, power, extractor, polishers and steam. Nothing needed from you." },
        { title: "Walkaround", body: "We note existing defects with you and confirm priorities." },
        { title: "Inspect, then pay", body: "You look over the finished vehicle first. Payment happens after." },
      ],
    }}
    faqs={{ title: "Auto detailing questions", items: faqs }}
    related={[
      { label: "All detailing packages and add-ons", to: "/detailing" },
      { label: "Ceramic coating", to: "/ceramic-coating" },
      { label: "Paint correction", to: "/paint-correction" },
      { label: "The Xpress Pass", to: "/xpress-pass" },
      { label: "Calgary price comparison", to: "/calgary-detailing-price-comparison" },
    ]}
    closing={{ title: "Book your detail", mode: "book" }}
  >
    <Section tone="dark">
      <AutoPackages dark heading="Packages and pricing" intro="Pick your vehicle size and the prices update." />
    </Section>
  </LandingPage>
);

export default AutoDetailing;
