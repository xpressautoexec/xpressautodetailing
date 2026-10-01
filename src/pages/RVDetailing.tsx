import { Link } from "react-router-dom";
import LandingPage from "@/components/site/LandingPage";
import { Section, SectionHeading, btnPrimary } from "@/components/site/Section";
import rvHero from "@/assets/rv-hero.jpg";
import { RV_BUNDLES, money } from "@/data/pricing";
import { SERVICE_AREA_SENTENCE, WATER_LINE } from "@/data/copy";

const from = Math.min(...RV_BUNDLES.map((b) => b.price));

const UNITS = ["Class A motorhomes", "Class B camper vans", "Class C motorhomes", "Travel trailers", "Fifth wheels", "Toy haulers", "Truck campers", "Utility and cargo trailers"];

const faqs = [
  { q: "Do you detail RVs at storage lots?", a: `Yes. We regularly work at storage compounds, seasonal campgrounds and acreages across ${SERVICE_AREA_SENTENCE}. ${WATER_LINE}` },
  {
    q: "How much does RV detailing cost?",
    a: `RV work is priced per foot, because a 21 ft trailer and a 40 ft Class A are different jobs. Packages start at ${money(from)}/ft. Full rates and a calculator are on our RV page.`,
  },
  {
    q: "Can badly oxidized fibreglass be restored?",
    a: "In most cases, yes. Oxidation is a degraded surface layer. Machine compounding removes it and exposes sound gelcoat underneath. Units left uncoated for many seasons may need wet sanding first.",
  },
  {
    q: "How long does an RV detail take?",
    a: "A wash and sealant on a mid-size trailer is typically half a day. Full oxidation removal on a large motorhome can take one to two days.",
  },
  { q: "When is the best time to book?", a: "Spring, before camping season, and fall, before winter storage. Both fill quickly, so book a few weeks ahead." },
];

const RVDetailing = () => (
  <LandingPage
    seo={{
      title: "RV Detailing Calgary | Mobile RV & Trailer Detailing",
      description: `Mobile RV detailing in Calgary from ${money(from)}/ft: oxidation removal, black streak removal, sealant and interior cleaning, done at your storage lot.`,
      canonical: "/rv-detailing",
      serviceName: "Mobile RV Detailing",
      serviceDescription: "Mobile RV, trailer and motorhome detailing and oxidation removal in Calgary and area.",
    }}
    hero={{
      title: "RV detailing done where you store it",
      subtitle: "Alberta sun, hail and road brine are hard on gelcoat. We restore oxidized fibreglass, strip black streaks, clean the living space and seal the unit at your storage lot, campground or driveway.",
      image: rvHero,
      ctaType: "call",
    }}
    features={{
      title: "RV services",
      items: [
        { title: "Oxidation removal", body: "Chalky, faded fibreglass and gelcoat compounded back to gloss. Our most requested RV service." },
        { title: "Black streak removal", body: "Roof runoff staining removed without scouring decals." },
        { title: "Sealant and UV protection", body: "Slows UV fade and makes the next wash far easier." },
        { title: "Interior cleaning", body: "Upholstery extraction, cabinetry, galley, bathroom and window tracks." },
      ],
    }}
    faqs={{ title: "RV detailing questions", items: faqs }}
    related={[
      { label: "RV packages, pricing and financing", to: "/rv-trailer" },
      { label: "RV paint protection film", to: "/rv-trailer/ppf" },
      { label: "RV rental fleet care", to: "/rv-trailer/rental-fleet" },
      { label: "Marine and pontoon", to: "/marine" },
    ]}
    closing={{ title: "Get your RV ready for the season", mode: "quote", quoteHref: "/rv-trailer#assessment", quoteLabel: "Book a free RV assessment" }}
  >
    <Section tone="surface">
      <SectionHeading
        title="Units we service"
        action={
          <Link to="/rv-trailer" className={btnPrimary}>
            See RV packages from {money(from)}/ft
          </Link>
        }
      />
      <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
        {UNITS.map((u) => (
          <li key={u} className="border-b border-line pb-3 text-[15px] text-ink">
            {u}
          </li>
        ))}
      </ul>
    </Section>
  </LandingPage>
);

export default RVDetailing;
