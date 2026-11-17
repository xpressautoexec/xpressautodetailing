import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
  AUTO_PACKAGES,
  CAR_PPF,
  CERAMIC_PACKAGES,
  GLOSS_PACKAGE,
  HEADLIGHT_RESTORATION,
  RV_BUNDLES,
  WINDSHIELD_PPF,
  fielddUrl,
  money,
} from "@/data/pricing";
import interiorPhoto from "@/assets/jobs/interior-bmw-red-front-seats.webp";
import deepCleanPhoto from "@/assets/jobs/interior-f150-cabin.webp";
import ceramicPhoto from "@/assets/jobs/card-ceramic-bmw-m340i.webp";
import ppfPhoto from "@/assets/ppf/coverage-full-front.webp";
import windshieldPhoto from "@/assets/windshield-ppf-hero.jpg";
import headlightPhoto from "@/assets/jobs/headlight-mercedes-silver.webp";
import polishPhoto from "@/assets/jobs/ceramic-mini-machine-polish-hood.webp";
import rvPhoto from "@/assets/jobs/card-rv-kodiak.webp";

const pkg = (id: string) => AUTO_PACKAGES.find((p) => p.id === id)!;
const minOf = (xs: number[]) => Math.min(...xs);

type Card = {
  name: string;
  line: string;
  price: string;
  photo: string;
  pos?: string;
  href: string;
  /** Direct online booking when the price doesn't depend on vehicle size. */
  book?: string;
  badge?: string;
};

const CARDS: Card[] = [
  {
    name: "Deep Clean & Seal",
    line: "Extraction, salt stains out, ceramic sealant on the paint",
    price: `From ${money(pkg("showroom").price.sedan)}`,
    photo: deepCleanPhoto,
    href: "/detailing#packages",
    badge: "Most booked",
  },
  {
    name: "Inside & Out",
    line: "Full interior shampoo and a hand wash, at your driveway",
    price: `From ${money(pkg("refresh").price.sedan)}`,
    photo: interiorPhoto,
    href: "/detailing#packages",
  },
  {
    name: "Ceramic coating",
    line: "CARPRO, Gyeon or 3M, with machine correction included",
    price: `From ${money(minOf(CERAMIC_PACKAGES.map((p) => p.price)))}`,
    photo: ceramicPhoto,
    href: "/ceramic-coating#packages",
  },
  {
    name: "Paint protection film",
    line: "SunTek film, partial front to full coverage",
    price: `From ${money(minOf(CAR_PPF.map((p) => p.price)))}`,
    photo: ppfPhoto,
    pos: "50% 60%",
    href: "/paint-protection-film#pricing",
  },
  {
    name: "ExoShield windshield film",
    line: "Stops rock chips, keeps your windshield camera calibrated",
    price: `From ${money(minOf(WINDSHIELD_PPF.map((t) => t.price)))}`,
    photo: windshieldPhoto,
    href: "/windshield-ppf#pricing",
  },
  {
    name: "Gloss Enhancement",
    line: "1-step polish plus a 1-year ceramic sealant",
    price: `From ${money(GLOSS_PACKAGE.price)}`,
    photo: polishPhoto,
    pos: "50% 55%",
    href: "/ceramic-coating#packages",
  },
  {
    name: "Headlight restoration",
    line: "Clear, UV-sealed lenses in about 45 minutes",
    price: `${money(HEADLIGHT_RESTORATION.standalone)} a pair`,
    photo: headlightPhoto,
    pos: "50% 45%",
    href: "/headlight-restoration",
    book: fielddUrl(HEADLIGHT_RESTORATION.book),
  },
  {
    name: "RV wash & gelcoat",
    line: "Washes, oxidation removal and sealant, where it's parked",
    price: `From ${money(minOf(RV_BUNDLES.map((b) => b.price)))}/ft`,
    photo: rvPhoto,
    pos: "50% 65%",
    href: "/rv-trailer#packages",
  },
];

/** Homepage quick-pick: the packages people book most, right under the hero. */
const PopularPackages = () => (
  <section className="section-y bg-canvas" aria-labelledby="popular-title">
    <div className="shell">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow mb-3">Packages and prices</p>
          <h2
            id="popular-title"
            className="font-heading text-4xl font-extrabold leading-[1.0] tracking-display text-ink sm:text-5xl"
          >
            Pick a service. See your price.
          </h2>
        </div>
        <p className="max-w-sm text-[15px] text-ink-2">
          Every package is priced by vehicle size and bookable online in under
          two minutes.
        </p>
      </div>
    </div>
    <ul className="shell mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4 [&::-webkit-scrollbar]:hidden">
      {CARDS.map((c) => (
        <li key={c.name} className="w-[78%] shrink-0 snap-start sm:w-auto">
          <article className="group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface transition-shadow hover:shadow-[var(--shadow-card)]">
            <Link
              to={c.href}
              className="relative block aspect-[4/3] overflow-hidden bg-tint"
              tabIndex={-1}
              aria-hidden="true"
            >
              <img
                src={c.photo}
                alt=""
                loading="lazy"
                style={{ objectPosition: c.pos }}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              {c.badge && (
                <span className="absolute left-3 top-3 rounded-full bg-electric px-2.5 py-1 text-[11px] font-semibold uppercase tracking-label text-primary-foreground">
                  {c.badge}
                </span>
              )}
            </Link>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-heading text-xl font-bold leading-tight text-ink">
                <Link to={c.href} className="hover:text-electric">
                  {c.name}
                </Link>
              </h3>
              <p className="mt-1.5 flex-1 text-sm leading-snug text-ink-2">
                {c.line}
              </p>
              <p className="num mt-4 text-2xl text-ink">{c.price}</p>
              {c.book ? (
                <a
                  href={c.book}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-action px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-ink"
                >
                  Book online
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              ) : (
                <Link
                  to={c.href}
                  className="mt-4 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border-2 border-ink/15 px-4 text-sm font-semibold text-ink transition-colors hover:border-ink"
                >
                  See prices and book
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              )}
            </div>
          </article>
        </li>
      ))}
    </ul>
  </section>
);

export default PopularPackages;
