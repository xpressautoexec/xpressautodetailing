import { Link } from "react-router-dom";
import { Check, CircleCheck } from "lucide-react";
import { WORK_TRUCK_PACKAGE, money, fielddUrl } from "@/data/pricing";
import { WORK_TRUCK_PHOTOS } from "@/data/photos";
import {
  Section,
  SectionHeading,
  btnPrimary,
  btnSecondary,
  cardClass,
  textLink,
} from "@/components/site/Section";

/** Work truck package: trades, landscaping and construction trucks, plus the fleet link. */
const WorkTruckPackage = ({
  showFleetLink = true,
  eyebrow,
  intro,
  points,
}: {
  showFleetLink?: boolean;
  eyebrow?: string;
  /** Replaces the package tagline as the section intro. */
  intro?: string;
  /** Short audience callouts shown under the heading. */
  points?: readonly string[];
}) => (
  <Section tone="surface" id="work-truck" className="scroll-mt-24">
    <SectionHeading
      eyebrow={eyebrow}
      title={WORK_TRUCK_PACKAGE.name}
      intro={intro ?? WORK_TRUCK_PACKAGE.tagline}
      action={
        showFleetLink ? (
          <Link to="/fleet" className={textLink}>
            Running several trucks? See fleet pricing
          </Link>
        ) : undefined
      }
    />
    {points && points.length > 0 && (
      <ul className="mb-6 flex flex-wrap gap-x-6 gap-y-2">
        {points.map((pt) => (
          <li key={pt} className="flex items-center gap-2 text-sm font-semibold text-ink">
            <CircleCheck className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            {pt}
          </li>
        ))}
      </ul>
    )}
    <div className="mb-6 grid grid-cols-3 gap-2 sm:gap-3">
      {[
        {
          src: WORK_TRUCK_PHOTOS.hero,
          alt: "Integrated Sustainability F-150 work truck after a full detail",
          pos: "50% 62%",
        },
        {
          src: WORK_TRUCK_PHOTOS.dash,
          alt: "F-150 work truck cab and dash after interior detail",
          pos: "50% 55%",
        },
        {
          src: WORK_TRUCK_PHOTOS.rearCab,
          alt: "F-150 rear cab floor liner cleaned on a work truck",
          pos: "50% 60%",
        },
      ].map((ph) => (
        <img
          key={ph.alt}
          src={ph.src}
          alt={ph.alt}
          loading="lazy"
          style={{ objectPosition: ph.pos }}
          className="aspect-[4/5] w-full rounded-card object-cover sm:aspect-[4/3]"
        />
      ))}
    </div>
    <div className="grid gap-5 md:grid-cols-2">
      {WORK_TRUCK_PACKAGE.tiers.map((tier) => (
        <article
          key={tier.id}
          className={`${cardClass} relative flex flex-col overflow-hidden p-6 sm:p-8 ${tier.popular ? "border-electric" : ""}`}
        >
          {tier.popular && (
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-1 bg-electric"
            />
          )}
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="h-4 text-xs font-medium text-electric">
                {tier.popular ? "Most chosen" : ""}
              </p>
              <h3 className="mt-1 font-heading text-xl font-semibold text-ink">
                {tier.name}
              </h3>
            </div>
            <div className="text-right">
              <p className="font-heading text-4xl font-semibold tracking-tight tabular-nums text-ink">
                {money(tier.price)}
              </p>
              <p className="mt-1 text-xs text-muted-ink">{tier.duration}</p>
            </div>
          </div>
          <ul className="mt-6 flex-1 space-y-2.5">
            {tier.includes.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm text-ink-2">
                <Check
                  className="mt-0.5 h-4 w-4 shrink-0 text-electric"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
          <a
            href={fielddUrl(tier.book)}
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
