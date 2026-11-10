import { Check, Minus } from "lucide-react";
import { AUTO_PACKAGES, type AutoPackage } from "@/data/pricing";
import { SectionHeading } from "@/components/site/Section";

/** Expands "Everything in X" so each package lists every item it includes. */
const expand = (pkg: AutoPackage, seen = new Set<string>()): string[] => {
  if (seen.has(pkg.id)) return [];
  seen.add(pkg.id);
  return pkg.includes.flatMap((item) => {
    const m = item.match(/^Everything in (.+)$/);
    if (!m) return [item];
    const base = AUTO_PACKAGES.find((p) => p.name === m[1]);
    return base ? expand(base, seen) : [item];
  });
};

/** Checkmark comparison of the detailing packages, built from pricing.ts so it can't drift. */
const PackageCompare = () => {
  const cols = AUTO_PACKAGES.map((p) => ({ pkg: p, items: new Set(expand(p)) }));
  const rows: string[] = [];
  cols.forEach((c) => c.items.forEach((i) => !rows.includes(i) && rows.push(i)));

  return (
    <div className="mt-16">
      <SectionHeading eyebrow="Compare" title="What each package includes" />
      <div className="overflow-x-auto rounded-card border border-line bg-surface">
        <table className="w-full min-w-[680px] text-left text-sm">
          <caption className="sr-only">Detailing packages compared</caption>
          <thead>
            <tr className="border-b border-line bg-tint">
              <th scope="col" className="px-5 py-4 font-medium text-muted-ink">Included</th>
              {cols.map(({ pkg }) => (
                <th key={pkg.id} scope="col" className="px-4 py-4 text-center">
                  <span className="font-heading text-lg font-bold text-ink">{pkg.name}</span>
                  {pkg.memberOnly && <span className="block text-[11px] font-semibold uppercase tracking-label text-muted-ink">Members only</span>}
                  {pkg.popular && <span className="block text-[11px] font-semibold uppercase tracking-label text-electric">Most chosen</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r} className="border-b border-line last:border-b-0">
                <th scope="row" className="px-5 py-3 font-normal text-ink-2">{r}</th>
                {cols.map(({ pkg, items }) => (
                  <td key={pkg.id} className="px-4 py-3 text-center">
                    {items.has(r) ? (
                      <Check className="mx-auto h-4 w-4 text-electric" aria-label="Included" />
                    ) : (
                      <Minus className="mx-auto h-4 w-4 text-line" aria-label="Not included" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="bg-tint">
              <th scope="row" className="px-5 py-3 font-medium text-muted-ink">Time on vehicle</th>
              {cols.map(({ pkg }) => (
                <td key={pkg.id} className="px-4 py-3 text-center font-semibold text-ink">{pkg.duration}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PackageCompare;
