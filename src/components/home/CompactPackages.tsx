import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { AUTO_PACKAGES, VEHICLE_SIZES, fielddUrl, memberPriceFor, money } from "@/data/pricing";
import { useSizeParam } from "@/hooks/useSizeParam";

/** Display order: the three public packages, then the members-only Upkeep. */
const ORDER = ["refresh", "showroom", "restore", "maintain"];
const ROWS = ORDER.map((id) => AUTO_PACKAGES.find((p) => p.id === id)!).filter(Boolean);

/** One compact price table with the size toggle. Prices come from pricing.ts only. */
const CompactPackages = () => {
  const [size, setSize] = useSizeParam();

  return (
    <div>
      <div role="tablist" aria-label="Vehicle size" className="flex w-full gap-1 rounded-md border border-line bg-surface p-1 sm:w-fit">
        {VEHICLE_SIZES.map((v) => (
          <button
            key={v.id}
            role="tab"
            aria-selected={size === v.id}
            onClick={() => setSize(v.id)}
            className={`flex-1 rounded px-3 py-2 text-xs font-semibold transition-colors sm:flex-none sm:px-4 sm:text-sm ${
              size === v.id ? "bg-ink text-primary-foreground" : "text-ink-2 hover:text-ink"
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>

      <div className="mt-6 overflow-hidden rounded-card border border-line bg-surface">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">Car detailing package prices by vehicle size</caption>
          <thead className="border-b border-line bg-tint text-muted-ink">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium sm:px-6">Package</th>
              <th scope="col" className="hidden px-4 py-3 font-medium md:table-cell">Time</th>
              <th scope="col" className="px-4 py-3 text-right font-medium sm:px-6">Price</th>
              <th scope="col" className="w-0 px-4 py-3 sm:px-6">
                <span className="sr-only">Book</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((p) => {
              const price = p.price[size];
              if (price === undefined) return null;
              const member = memberPriceFor(p, size);
              return (
                <tr key={p.id} className="border-b border-line last:border-b-0">
                  <th scope="row" className="px-4 py-5 align-top font-normal sm:px-6">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="font-heading text-xl font-bold text-ink">{p.name}</span>
                      {p.popular && (
                        <span className="rounded-sm bg-electric-soft px-1.5 py-0.5 text-[11px] font-semibold text-electric">Most chosen</span>
                      )}
                      {p.memberOnly && (
                        <span className="rounded-sm border border-line px-1.5 py-0.5 text-[11px] font-semibold text-muted-ink">Members only</span>
                      )}
                    </span>
                    <span className="mt-1 block max-w-md text-[13px] leading-snug text-muted-ink">{p.tagline}</span>
                  </th>
                  <td className="hidden whitespace-nowrap px-4 py-5 align-top text-ink-2 md:table-cell">{p.duration}</td>
                  <td className="whitespace-nowrap px-4 py-5 text-right align-top sm:px-6">
                    <span className="num text-2xl text-ink">{money(p.memberOnly ? (member ?? price) : price)}</span>
                    {!p.memberOnly && member !== undefined && (
                      <span className="mt-0.5 block text-xs text-muted-ink">Members {money(member)}</span>
                    )}
                    {p.memberOnly && <span className="mt-0.5 block text-xs text-muted-ink">per visit</span>}
                  </td>
                  <td className="whitespace-nowrap px-4 py-5 text-right align-top sm:px-6">
                    {p.memberOnly ? (
                      <Link to="/xpress-pass" className="text-sm font-semibold text-electric hover:underline hover:underline-offset-4">
                        Join
                      </Link>
                    ) : (
                      <a
                        href={fielddUrl(p.book[size])}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Book ${p.name} online`}
                        className="text-sm font-semibold text-electric hover:underline hover:underline-offset-4"
                      >
                        Book
                      </a>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-col gap-3 text-sm sm:flex-row sm:gap-8">
        <Link to="/detailing#packages" className="inline-flex items-center gap-1.5 font-semibold text-ink hover:text-electric">
          See everything included and all add-ons
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
        <Link to="/calgary-detailing-price-comparison" className="inline-flex items-center gap-1.5 font-semibold text-ink-2 hover:text-electric">
          How we compare on price
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
};

export default CompactPackages;
