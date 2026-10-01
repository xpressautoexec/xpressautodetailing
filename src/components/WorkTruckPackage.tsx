import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { WORK_TRUCK_PACKAGE, money, BOOKING_URL } from "@/data/pricing";
import { Section, SectionHeading, btnPrimary, btnSecondary, cardClass, textLink } from "@/components/site/Section";

/** Work truck package: trades, landscaping and construction trucks, plus the fleet link. */
const WorkTruckPackage = () => (
  <Section tone="surface">
    <SectionHeading
      title={WORK_TRUCK_PACKAGE.name}
      intro={WORK_TRUCK_PACKAGE.tagline}
      action={
        <Link to="/fleet" className={textLink}>
          Running several trucks? See fleet pricing
        </Link>
      }
    />
    <div className="grid gap-5 md:grid-cols-2">
      {WORK_TRUCK_PACKAGE.tiers.map((tier) => (
        <article
          key={tier.id}
          className={`${cardClass} relative flex flex-col overflow-hidden p-6 sm:p-8 ${tier.popular ? "border-electric" : ""}`}
        >
          {tier.popular && <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-electric" />}
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="h-4 text-xs font-medium text-electric">{tier.popular ? "Most booked" : ""}</p>
              <h3 className="mt-1 font-heading text-xl font-semibold text-ink">{tier.name}</h3>
            </div>
            <div className="text-right">
              <p className="font-heading text-4xl font-semibold tracking-tight tabular-nums text-ink">{money(tier.price)}</p>
              <p className="mt-1 text-xs text-muted-ink">{tier.duration}</p>
            </div>
          </div>
          <ul className="mt-6 flex-1 space-y-2.5">
            {tier.includes.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm text-ink-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-electric" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`${tier.popular ? btnPrimary : btnSecondary} mt-7`}
          >
            Book {tier.name}
          </a>
        </article>
      ))}
    </div>
  </Section>
);

export default WorkTruckPackage;
