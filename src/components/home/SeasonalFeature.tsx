import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SEASON, type Season } from "@/data/season";
import { AUTO_PACKAGES, RV_BUNDLES, money } from "@/data/pricing";
import Swoosh from "@/components/site/Swoosh";
import saltFloor from "@/assets/jobs/interior-f150-rear-floor.webp";
import deepClean from "@/assets/jobs/interior-f150-front-seats.webp";
import shop from "@/assets/jobs/exterior-defender-shop.webp";
import fleetLot from "@/assets/jobs/fleet-dirtt-vans-lot.webp";
import rvRestore from "@/assets/jobs/rv-flagstaff-test-sections.webp";
import rvStorage from "@/assets/jobs/rv-surveyor-storage-lot.webp";

const deepCleanPkg = AUTO_PACKAGES.find((p) => p.id === "showroom")!;
const interiorDeep = deepCleanPkg.interiorOnly;
const rvFrom = Math.min(...RV_BUNDLES.map((b) => b.price));

type Card = { title: string; body: string; href: string; cta: string; img: string; alt: string; tag?: string };

const CONTENT: Record<Season, { eyebrow: string; title: string; intro: string; cards: Card[] }> = {
  winter: {
    eyebrow: "November to March",
    title: "Calgary salt season",
    intro:
      "Salt and slush end up in the carpet and on the paint by December. Here's what we do about it, mobile or in the heated Airdrie shop.",
    cards: [
      {
        title: "Salt-stain interior extraction",
        body: "Carpets and mats extracted, not just vacuumed, so the white tide lines come out instead of drying back in.",
        href: "/detailing?tab=interior",
        cta: interiorDeep ? `${interiorDeep.name} from ${money(interiorDeep.price.sedan)}` : "Interior packages",
        img: saltFloor,
        alt: "Ford F-150 rear floor with the bench flipped up after vacuum and shampoo",
      },
      {
        title: deepCleanPkg.name,
        body: deepCleanPkg.tagline,
        href: "/detailing#packages",
        cta: `From ${money(deepCleanPkg.price.sedan)}`,
        img: deepClean,
        alt: "Ford F-150 front seats and floor after interior detail",
        tag: "Most booked",
      },
      {
        title: "Ceramic, PPF and windshield film in the shop",
        body: "Coatings and film need a warm, dry bay to cure. Drop it at the Airdrie shop and we'll do it indoors.",
        href: "/ceramic-paint-correction",
        cta: "Ceramic & PPF",
        img: shop,
        alt: "Black Land Rover Defender in the shop after detail",
        tag: "Airdrie shop",
      },
      {
        title: "Fleet winter rotations",
        body: "Scheduled on-site washes and interiors for work trucks and company vehicles, so salt doesn't sit on them all season.",
        href: "/fleet",
        cta: "Fleet & dealership",
        img: fleetLot,
        alt: "Fleet vans at a company lot after on-site washes",
      },
    ],
  },
  summer: {
    eyebrow: "April to October",
    title: "RV season",
    intro: "Oxidation comes off before the first trip, and the unit goes back into storage protected in the fall.",
    cards: [
      {
        title: "RV gelcoat restoration",
        body: "Oxidized gelcoat sanded only where needed, cut, refined and sealed, priced per foot after a free assessment.",
        href: "/rv-trailer#packages",
        cta: `From ${money(rvFrom)}/ft`,
        img: rvRestore,
        alt: "Flagstaff travel trailer with tape lines marking polish test sections",
        tag: "Most booked",
      },
      {
        title: "Storage prep and pickup-ready washes",
        body: "We work at your storage lot with our own water and power, so the unit never has to move.",
        href: "/rv-trailer",
        cta: "RV & trailer",
        img: rvStorage,
        alt: "Surveyor travel trailer at a Calgary storage lot during gelcoat restoration",
      },
    ],
  },
};

/** Homepage seasonal block. Driven by SEASON in data/season.ts. */
const SeasonalFeature = ({ season = SEASON }: { season?: Season }) => {
  const c = CONTENT[season];
  const cols = c.cards.length === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2";
  return (
    <section className="section-y bg-surface" aria-labelledby="season-title">
      <div className="shell">
        <div className="mb-10 max-w-2xl sm:mb-14">
          <p className="eyebrow">{c.eyebrow}</p>
          <h2 id="season-title" className="mt-3 font-heading text-4xl font-extrabold leading-[1.0] tracking-display text-ink sm:text-6xl">
            {c.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-2">{c.intro}</p>
        </div>
        <div className={`grid gap-4 ${cols}`}>
          {c.cards.map((card) => (
            <Link
              key={card.title}
              to={card.href}
              className="group relative flex flex-col overflow-hidden rounded-card border border-line bg-surface transition-colors hover:border-ink-2"
            >
              <div className="relative">
                <img src={card.img} alt={card.alt} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                {card.tag && (
                  <span className="absolute left-3 top-3 rounded-sm bg-surface px-2 py-1 text-[11px] font-semibold text-ink">
                    {card.tag}
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-5 pb-9">
                <h3 className="font-heading text-2xl font-bold leading-tight text-ink">{card.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-2">{card.body}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-electric">
                  {card.cta}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </div>
              <Swoosh variant="card-accent" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SeasonalFeature;
