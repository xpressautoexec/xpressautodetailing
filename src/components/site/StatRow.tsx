import { STATS, SYSTEM_X_LINE } from "@/data/brand";

/** Real numbers only (data/brand.ts). Six stats plus the System X line. */
const StatRow = ({ tone = "light" }: { tone?: "light" | "tint" }) => (
  <div className={`border-b border-line ${tone === "tint" ? "bg-tint" : "bg-surface"}`}>
    <div className="shell py-8 sm:py-10">
      <dl className="grid grid-cols-2 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
        {STATS.map((s) => (
          <div key={s.label} className="flex flex-col-reverse gap-1 border-l-2 border-line pl-4">
            <dt className="text-sm leading-snug text-muted-ink">{s.label}</dt>
            <dd className="num text-4xl leading-none text-electric">{s.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-6 border-t border-line pt-4 text-xs font-semibold uppercase tracking-label text-ink-2">{SYSTEM_X_LINE}</p>
    </div>
  </div>
);

export default StatRow;
