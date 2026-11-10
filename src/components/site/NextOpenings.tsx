import { useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import QuoteLink from "@/components/site/QuoteLink";
import { formatOpening, scopeForPath, useNextOpenings } from "@/hooks/useNextOpenings";

/**
 * Slim strip under service-page heroes: "Next openings: Thu 10am · Airdrie shop | Fri 1pm · Calgary mobile".
 * Reads the next_openings table; renders nothing when there are no upcoming openings.
 */
const NextOpenings = () => {
  const { pathname } = useLocation();
  const { data } = useNextOpenings(scopeForPath(pathname));
  if (!data?.length) return null;

  return (
    <div className="border-b border-line bg-tint">
      <div className="shell flex flex-col gap-2 py-3.5 text-sm sm:flex-row sm:items-center sm:gap-6">
        <p className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-electric opacity-40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-electric" />
          </span>
          <span className="font-heading text-[13px] font-bold uppercase italic tracking-label text-ink">Next openings</span>
        </p>
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 text-ink">
          {data.map((o, i) => (
            <li key={o.id} className="flex items-center gap-4">
              {i > 0 && <span className="hidden h-4 w-px bg-line sm:block" aria-hidden="true" />}
              <span>
                <span className="font-semibold">{formatOpening(o.starts_at)}</span>
                <span className="text-muted-ink"> · {o.location}</span>
              </span>
            </li>
          ))}
        </ul>
        <QuoteLink className="inline-flex items-center gap-1.5 font-semibold text-electric hover:underline hover:underline-offset-4 sm:ml-auto">
          Claim a spot
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </QuoteLink>
      </div>
    </div>
  );
};

export default NextOpenings;
