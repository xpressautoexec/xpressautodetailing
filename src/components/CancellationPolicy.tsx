import {
  CANCELLATION,
  CANCELLATION_FEES,
  CANCELLATION_SECTIONS,
  CANCELLATION_SUMMARY,
  CANCELLATION_TIERS,
} from "@/data/copy";

/**
 * Renders the full cancellation and rescheduling policy from copy.ts.
 * Used on /cancellation-policy and inside the Terms of Service.
 */
const CancellationPolicy = ({ headingLevel = 2 }: { headingLevel?: 2 | 3 }) => {
  const H = `h${headingLevel}` as "h2" | "h3";
  const Sub = `h${headingLevel + 1}` as "h3" | "h4";

  return (
    <div className="text-[15px] leading-relaxed text-ink-2">
      <p className="text-base text-ink">{CANCELLATION_SUMMARY}</p>
      <p className="mt-2 text-sm text-muted-ink">Effective {CANCELLATION.effective}</p>

      <H className="mt-10 font-heading text-xl font-semibold tracking-tight text-ink">Notice windows</H>
      <div className="mt-4 overflow-hidden rounded-[10px] border border-line bg-surface">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-line bg-canvas text-muted-ink">
            <tr>
              <th scope="col" className="px-5 py-3 font-medium">
                Booking type
              </th>
              <th scope="col" className="whitespace-nowrap px-5 py-3 text-right font-medium">
                Free changes until
              </th>
            </tr>
          </thead>
          <tbody>
            {CANCELLATION_TIERS.map((t) => (
              <tr key={t.label} className="border-b border-line last:border-b-0">
                <td className="px-5 py-4">
                  <span className="block font-semibold text-ink">{t.label}</span>
                  <span className="mt-0.5 block text-muted-ink">{t.services}</span>
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-right align-top font-semibold tabular-nums text-ink">
                  {t.window} before
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H className="mt-10 font-heading text-xl font-semibold tracking-tight text-ink">Fees</H>
      <div className="mt-4 overflow-hidden rounded-[10px] border border-line bg-surface">
        <table className="w-full text-left text-sm">
          <tbody>
            {CANCELLATION_FEES.map((f) => (
              <tr key={f.when} className="border-b border-line last:border-b-0">
                <th scope="row" className="px-5 py-3.5 font-normal text-ink-2">
                  {f.when}
                </th>
                <td className="px-5 py-3.5 text-right font-semibold text-ink">{f.fee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {CANCELLATION_SECTIONS.map((s) => (
        <section key={s.title} className="mt-9">
          <Sub className="font-heading text-lg font-semibold text-ink">{s.title}</Sub>
          {s.body.map((p) => (
            <p key={p} className="mt-2">
              {p}
            </p>
          ))}
        </section>
      ))}
    </div>
  );
};

export default CancellationPolicy;
