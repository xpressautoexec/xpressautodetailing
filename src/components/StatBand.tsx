interface Stat {
  value: string;
  label: string;
}

/** White stat panel that overlaps the bottom of a dark hero. Verified numbers only. */
const StatBand = ({ stats }: { stats: Stat[] }) => (
  <div className="shell relative z-10 -mt-20 sm:-mt-24">
    <dl className="grid grid-cols-2 overflow-hidden rounded-[10px] border border-line bg-surface shadow-[0_24px_48px_-24px_hsl(var(--brand-dark)/0.35)] lg:grid-cols-4">
      {stats.map((s, i) => (
        <div
          key={s.label}
          className={`flex flex-col-reverse gap-1 px-5 py-6 sm:px-8 sm:py-8 ${i % 2 === 1 ? "border-l border-line" : ""} ${
            i >= 2 ? "border-t border-line lg:border-t-0" : ""
          } ${i === 2 ? "lg:border-l" : ""}`}
        >
          <dt className="text-sm leading-snug text-muted-ink">{s.label}</dt>
          <dd className="font-heading text-3xl font-semibold tracking-tight tabular-nums text-ink sm:text-4xl">{s.value}</dd>
        </div>
      ))}
    </dl>
  </div>
);

export default StatBand;
