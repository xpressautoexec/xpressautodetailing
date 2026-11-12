import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export type WhyItem = { icon: LucideIcon; label: string };

/**
 * LLumar "WHY LLUMAR" band: dark, giant two-line heading and copy on the left,
 * a 3 x 2 grid of white line icons on the right with a blue rule under each row.
 */
const WhyBand = ({
  subject,
  intro,
  apartTitle = "What sets us apart",
  apart,
  items,
  cta,
  id,
}: {
  subject: string;
  intro: string;
  apartTitle?: string;
  apart?: string;
  items: WhyItem[];
  cta?: { label: string; href: string };
  id?: string;
}) => {
  const rows = [items.slice(0, 3), items.slice(3, 6)].filter((r) => r.length);
  return (
    <section id={id} className="why-band section-y scroll-mt-24" aria-label={`Why ${subject}`}>
      <div className="shell grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <div>
          <h2 className="why-title">
            Why
            <br />
            {subject}
          </h2>
          <p className="mt-10 max-w-xl text-lg leading-relaxed text-primary-foreground/85">{intro}</p>
          {apart && (
            <>
              <p className="mt-8 text-lg font-semibold text-primary-foreground">{apartTitle}</p>
              <p className="mt-1 max-w-xl text-lg leading-relaxed text-primary-foreground/85">{apart}</p>
            </>
          )}
          {cta && (
            <Link
              to={cta.href}
              className="pill-action mt-10 inline-flex items-center gap-2 bg-action text-primary-foreground transition-colors hover:bg-primary-foreground hover:text-ink"
            >
              {cta.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          )}
        </div>
        <div className="flex flex-col justify-center">
          {rows.map((row, i) => (
            <ul key={i} className="why-row grid grid-cols-3 gap-4 py-10 sm:gap-8">
              {row.map(({ icon: Icon, label }) => (
                <li key={label} className="flex flex-col items-center text-center">
                  <Icon className="why-icon" aria-hidden="true" />
                  <span className="mt-6 text-base font-semibold leading-snug text-primary-foreground sm:text-lg">{label}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyBand;
