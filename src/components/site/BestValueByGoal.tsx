import { Link } from "react-router-dom";
import { Section, SectionHeading, cardClass } from "@/components/site/Section";
import { AUTO_PACKAGES, money } from "@/data/pricing";

const showroom = AUTO_PACKAGES.find((p) => p.id === "showroom")!;

const GOALS = [
  {
    title: "Selling or trading in",
    pick: `${showroom.name}, ${money(showroom.price.sedan)}`,
    desc: "A full inside-and-out reset before photos and appraisal, so the car shows at its best.",
    to: "/detailing",
  },
  {
    title: "Keeping a car long-term",
    pick: "System X 9-year graphene coating",
    desc: "Lowest cost per year of protection if you keep vehicles five years or more.",
    to: "/ceramic-paint-correction",
  },
  {
    title: "Staying clean year-round",
    pick: "The Xpress Pass",
    desc: "Scheduled visits at member rates beat repeated one-off deep cleans, plus discounts on every add-on.",
    to: "/xpress-pass",
  },
];

/** Three goal-based picks. Shared by the home page and the price comparison page. */
const BestValueByGoal = () => (
  <Section>
    <SectionHeading title="Best value by goal" />
    <div className="grid gap-5 md:grid-cols-3">
      {GOALS.map((c) => (
        <Link key={c.title} to={c.to} className={`${cardClass} group flex flex-col p-6 transition-colors hover:border-ink-2`}>
          <h3 className="font-heading text-lg font-semibold text-ink">{c.title}</h3>
          <p className="mt-1 text-sm font-semibold text-electric">{c.pick}</p>
          <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-2">{c.desc}</p>
        </Link>
      ))}
    </div>
  </Section>
);

export default BestValueByGoal;
