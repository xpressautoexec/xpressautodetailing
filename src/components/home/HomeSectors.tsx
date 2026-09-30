import { Link } from "react-router-dom";
import rvImg from "@/assets/gallery-rv-surveyor-full.jpg";
import carImg from "@/assets/gallery-range-rover-exterior.jpg";
import ceramicImg from "@/assets/gallery-21.jpg";
import protectionImg from "@/assets/gallery-bmw-emblem.jpg";
import fleetImg from "@/assets/gallery-23.jpg";
import { RV_BUNDLES, AUTO_PACKAGES, money } from "@/data/pricing";

const rvFrom = Math.min(...RV_BUNDLES.map((b) => b.price));
/** Cheapest publicly bookable car package (member-only tiers excluded). */
const autoFrom = Math.min(
  ...AUTO_PACKAGES.filter((p) => !p.memberOnly).map((p) => p.price.sedan),
);

const TILES = [
  {
    title: "Car detailing",
    body: "Interior, exterior and complete packages, priced by vehicle size.",
    href: "/detailing",
    img: carImg,
    alt: "Range Rover after a complete detail in a Calgary driveway",
  },
  {
    title: "Ceramic coating and paint correction",
    body: "Machine correction and multi-year coatings, applied on site.",
    href: "/ceramic-paint-correction",
    img: ceramicImg,
    alt: "Black Tesla Model S after paint correction and ceramic coating",
  },
  {
    title: "Paint protection film and tint",
    body: "Self-healing film for high-impact panels, plus carbon and ceramic tint.",
    href: "/protection/ppf",
    img: protectionImg,
    alt: "Close-up of a BMW hood after protection work",
  },
  {
    title: "Fleet and dealership",
    body: "Scheduled on-site care for work trucks, company vehicles and dealer lots.",
    href: "/fleet",
    img: fleetImg,
    alt: "Ford F-150 fleet truck detailed inside a client's shop bay",
  },
];

const MORE = [
  { label: "Marine and pontoon", href: "/marine" },
  { label: "The Xpress Pass", href: "/xpress-pass" },
  { label: "RV rental fleet care", href: "/rv-trailer/rental-fleet" },
  { label: "Gift cards", href: "/gift-cards" },
];

/** What we do: RV leads (largest revenue line), the rest in a 2x2. */
const HomeSectors = () => (
  <section className="py-16 sm:py-24">
    <div className="shell">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <h2 className="max-w-xl font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          One mobile crew for everything you park
        </h2>
        <p className="max-w-md text-[15px] leading-relaxed text-ink-2">
          Same vans, same standard, whether it's a daily driver, a 38 ft fifth
          wheel or a yard full of work trucks.
        </p>
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-[1.05fr_1fr]">
        {/* RV feature */}
        <Link
          to="/rv-trailer"
          className="group relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-[10px] bg-brand-dark lg:min-h-full"
        >
          <img
            src={rvImg}
            alt="Travel trailer front cap after gelcoat restoration"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent"
          />
          <div className="relative p-7 sm:p-9">
            <h3 className="font-heading text-2xl font-semibold tracking-tight text-primary-foreground sm:text-3xl">
              RV detailing and gelcoat restoration
            </h3>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-primary-foreground/75">
              Oxidation removal, ceramic sealant and storage prep, done at your
              storage lot. From {money(rvFrom)}/ft, with monthly financing on
              restoration work.
            </p>
            <span className="mt-6 inline-flex text-sm font-semibold text-primary-foreground underline decoration-electric decoration-2 underline-offset-[6px]">
              RV packages and financing
            </span>
          </div>
        </Link>

        <div className="grid gap-5 sm:grid-cols-2">
          {TILES.map((t) => (
            <Link
              key={t.href}
              to={t.href}
              className="group flex flex-col overflow-hidden rounded-[10px] border border-line bg-surface transition-colors hover:border-ink-2"
            >
              <img
                src={t.img}
                alt={t.alt}
                loading="lazy"
                className="aspect-[16/10] w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-heading text-lg font-semibold leading-snug text-ink">
                  {t.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-2">
                  {t.body}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm">
        {MORE.map((m) => (
          <li key={m.href}>
            <Link
              to={m.href}
              className="font-semibold text-electric hover:underline hover:underline-offset-4"
            >
              {m.label}
            </Link>
          </li>
        ))}
        <li className="text-muted-ink">Car packages from {money(autoFrom)}</li>
      </ul>
    </div>
  </section>
);

export default HomeSectors;
