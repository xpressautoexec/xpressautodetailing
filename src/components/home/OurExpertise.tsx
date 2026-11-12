import { Link } from "react-router-dom";
import { ArrowRight, Caravan, CarFront, Sun, Droplets, ShieldCheck, Mountain, type LucideIcon } from "lucide-react";
import rvTall from "@/assets/gallery-newmar-dutch-star-side.jpg";
import carTall from "@/assets/jobs/ceramic-mercedes-gle-wheel.webp";
import rvCut from "@/assets/cutout-rv-citation.webp";
import carCut from "@/assets/cutout-car-audi-rs5.webp";

type Column = {
  tag: string;
  tagIcon: LucideIcon;
  title: string;
  body: string;
  benefits: { icon: LucideIcon; label: string }[];
  href: string;
  photo: string;
  photoPos?: string;
  cutout: string;
  cutoutClass: string;
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
    href: "/paint-protection-film",
    photo: carTall,
    photoPos: "center",
    cutout: carCut,
    cutoutClass: "w-[86%] max-w-[520px]",
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
    href: "/rv-trailer",
    photo: rvTall,
    photoPos: "30% center",
    cutout: rvCut,
    cutoutClass: "w-auto h-[250px] sm:h-[320px]",
  },
];

/** LLumar "Our expertise" (Architectural vs Automotive), as Auto vs RV. */
const OurExpertise = () => (
  <section className="section-y bg-canvas" aria-labelledby="expertise-title">
    <div className="shell">
      <h2 id="expertise-title" className="display-xl">
        Our expertise
      </h2>
      <div className="mt-14 grid gap-20 lg:grid-cols-2 lg:gap-14">
        {COLUMNS.map((c) => (
          <article key={c.tag} className="relative grid grid-cols-[38%_1fr] gap-6 pb-44 sm:gap-10 sm:pb-64">
            <div className="relative overflow-hidden rounded-[16px] bg-tint">
              <img src={c.photo} alt="" loading="lazy" style={{ objectPosition: c.photoPos }} className="absolute inset-0 h-full w-full object-cover" />
            </div>
            <div className="py-2">
              <span className="expertise-tag">
                <c.tagIcon className="h-6 w-6 text-action" aria-hidden="true" />
                {c.tag}
              </span>
              <h3 className="mt-8 text-[28px] font-semibold leading-[1.15] text-ink sm:text-[38px]">{c.title}</h3>
              <p className="mt-6 text-lg leading-relaxed text-ink-2">{c.body}</p>
              <ul className="mt-6 space-y-3">
                {c.benefits.map((b) => (
                  <li key={b.label} className="flex items-center gap-3 text-base font-semibold text-ink">
                    <b.icon className="h-5 w-5 shrink-0 text-action" aria-hidden="true" />
                    {b.label}
                  </li>
                ))}
              </ul>
              <Link
                to={c.href}
                className="pill-action relative z-10 mt-8 inline-flex items-center gap-2 bg-action text-primary-foreground transition-colors hover:bg-ink"
              >
                Learn more
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <img
              src={c.cutout}
              alt=""
              loading="lazy"
              className={`cutout pointer-events-none absolute bottom-0 left-[6%] ${c.cutoutClass}`}
            />
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default OurExpertise;
