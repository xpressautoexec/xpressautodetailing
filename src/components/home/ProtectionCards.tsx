import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

const CARDS = [
  {
    title: "Ceramic Coating",
    href: "/ceramic-coating",
    body: "A hard, glossy, water-repellent layer bonded to your clear coat, so salt and slush wash off instead of etching in.",
    points: ["CARPRO DQUARTZ nano-diamond coating", "Deep gloss and easier washing", "Paint correction before coating"],
  },
  {
    title: "Paint Protection Film",
    href: "/paint-protection-film",
    body: "SunTek and LLumar self-healing film that takes the rock chips, gravel and road salt so your paint does not.",
    points: ["Front, full front or full body coverage", "Gloss or matte finish", "Manufacturer warranty on the film"],
  },
  {
    title: "Window Tint",
    href: "/window-tint",
    body: "LLumar and SunTek window film for a cooler cabin, less glare off snow and low sun, and UV protection.",
    points: ["Ceramic and carbon film options", "Clean edges, no bubbles", "Manufacturer warranty on the film"],
  },
];

/** LLumar's two link cards (Window Tint / PPF), extended to our three protection lines. */
const ProtectionCards = () => (
  <section className="section-y bg-canvas" aria-label="Protection services">
    <div className="shell grid gap-6 md:grid-cols-3">
      {CARDS.map((c) => (
        <Link
          key={c.title}
          to={c.href}
          className="group flex flex-col rounded-[16px] bg-tint p-8 shadow-[var(--shadow-card)] transition-transform duration-200 hover:-translate-y-1 sm:p-10"
        >
          <h3 className="flex items-center gap-2 text-[28px] font-semibold leading-tight text-action">
            {c.title}
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </h3>
          <p className="mt-5 text-[17px] leading-relaxed text-ink-2">{c.body}</p>
          <ul className="mt-6 space-y-2.5">
            {c.points.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-[16px] text-ink">
                <Check className="mt-1 h-4 w-4 shrink-0 text-action" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        </Link>
      ))}
    </div>
  </section>
);

export default ProtectionCards;
