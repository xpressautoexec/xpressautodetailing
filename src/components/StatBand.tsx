interface Stat {
  value: string;
  label: string;
}

/** Proof strip under the hero. Key numbers in the accent blue. Verified numbers only. */
const StatBand = ({ stats }: { stats: Stat[] }) => (
  <div className="border-b border-line bg-surface">
    <dl className="shell grid grid-cols-2 lg:grid-cols-4">
      {stats.map((s, i) => (
        <div
          key={s.label}
          className={`flex flex-col-reverse gap-1 py-7 sm:py-9 ${i % 2 === 1 ? "border-l border-line pl-5 sm:pl-8" : ""} ${
            i >= 2 ? "border-t border-line lg:border-t-0" : ""
          } ${i === 2 ? "lg:border-l lg:pl-8" : ""}`}
        >
          <dt className="text-sm leading-snug text-muted-ink">{s.label}</dt>
          <dd className="num text-4xl leading-none text-electric sm:text-5xl">{s.value}</dd>
        </div>
      ))}
    </dl>
  </div>
);

export default StatBand;
