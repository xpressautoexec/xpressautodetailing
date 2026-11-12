import { Link } from "react-router-dom";
import { ArrowRight, Caravan, CarFront, Sun, Droplets, ShieldCheck, Mountain, type LucideIcon } from "lucide-react";
import carPhoto from "@/assets/jobs/hero-ceramic-coating.webp";
import rvPhoto from "@/assets/jobs/hero-rv-trailer.webp";

type Column = {
  tag: string;
  tagIcon: LucideIcon;
  title: string;
  body: string;
  benefits: { icon: LucideIcon; label: string }[];
  /** Lands on the pricing block of the hub page. */
  href: string;
  photo: string;
  photoAlt: string;
  photoPos?: string;
};

const COLUMNS: Column[] = [
  {
    tag: "Automotive",
    tagIcon: CarFront,
    title: "Rule Calgary roads with ceramic coating, PPF and tint",
    body: "Protect and customize your car with CARPRO ceramic coating, SunTek and LLumar paint protection film and window tint.",
    benefits: [
      { icon: ShieldCheck, label: "Gloss and matte film options" },
      { icon: Mountain, label: "Built for gravel, salt and slush" },
    ],
    href: "/paint-protection-film#pricing",
    photo: carPhoto,
    photoAlt: "White Porsche Macan in the Xpress protection bay",
    photoPos: "50% 45%",
  },
  {
    tag: "RV & Trailer",
    tagIcon: Caravan,
    title: "Protect your RV from Alberta sun, salt and oxidation",
    body: "Oxidation removal, washes, roof care and RV paint protection film, done where your RV is parked.",
    benefits: [
      { icon: Sun, label: "Restore chalky, faded gelcoat" },
      { icon: Droplets, label: "We bring our own water and power" },
    ],
    href: "/rv-trailer#packages",
    photo: rvPhoto,
    photoAlt: "Xpress crew washing a Class A motorhome on a Calgary driveway",
    photoPos: "60% 50%",
  },
];

/** LLumar "Our expertise" (Architectural vs Automotive), as Auto vs RV. Whole card is the link. */
const OurExpertise = () => (
  <section className="section-y bg-canvas" aria-labelledby="expertise-title">
    <div className="shell">
      <h2 id="expertise-title" className="display-xl">
        Our expertise
      </h2>
      <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:gap-10">
        {COLUMNS.map((c) => (
          <Link
            key={c.tag}
            to={c.href}
            aria-label={`${c.tag}: see pricing`}
            className="expertise-card group flex flex-col overflow-hidden rounded-[20px] border border-line bg-canvas transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_24px_60px_-24px_hsl(var(--ink)/0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-tint">
              <img
                src={c.photo}
                alt={c.photoAlt}
                loading="lazy"
                style={{ objectPosition: c.photoPos }}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              />
              <span className="expertise-tag absolute left-5 top-5 rounded-full bg-canvas/95 px-4 py-2 backdrop-blur">
                <c.tagIcon className="h-5 w-5 text-action" aria-hidden="true" />
                {c.tag}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-7 sm:p-10">
              <h3 className="text-[26px] font-semibold leading-[1.15] text-ink sm:text-[34px]">{c.title}</h3>
              <p className="mt-5 text-lg leading-relaxed text-ink-2">{c.body}</p>
              <ul className="mt-6 space-y-3">
                {c.benefits.map((b) => (
                  <li key={b.label} className="flex items-center gap-3 text-base font-semibold text-ink">
                    <b.icon className="h-5 w-5 shrink-0 text-action" aria-hidden="true" />
                    {b.label}
                  </li>
                ))}
              </ul>
              <span className="pill-action mt-8 inline-flex items-center gap-2 self-start bg-action text-primary-foreground transition-colors group-hover:bg-ink">
                See pricing
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default OurExpertise;
