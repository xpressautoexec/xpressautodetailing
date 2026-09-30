import { useMemo, useState } from "react";
import { RV_BUNDLES, FINANCING, money, monthlyPayment } from "@/data/pricing";

const fmt = (n: number) =>
  n.toLocaleString("en-CA", { style: "currency", currency: "CAD", minimumFractionDigits: 2, maximumFractionDigits: 2 });

/**
 * Monthly payment estimate for RV restoration packages.
 * Shows APR, term, total cost of borrowing and total repaid beside the payment
 * (Alberta cost-of-credit disclosure). Uses FINANCING.representativeApr until a lender is signed.
 */
const FinancingEstimator = () => {
  const eligible = RV_BUNDLES;
  const [bundleId, setBundleId] = useState(eligible.find((b) => b.popular)?.id ?? eligible[0].id);
  const [length, setLength] = useState(30);
  const [term, setTerm] = useState(FINANCING.defaultTerm);

  const bundle = eligible.find((b) => b.id === bundleId) ?? eligible[0];
  const price = bundle.price * length;
  const qualifies = price >= FINANCING.minAmount;
  const apr = FINANCING.representativeApr;

  const { payment, totalRepaid, costOfBorrowing } = useMemo(() => {
    const p = monthlyPayment(price, apr, term);
    const total = p * term;
    return { payment: p, totalRepaid: total, costOfBorrowing: total - price };
  }, [price, apr, term]);

  return (
    <div className="rounded-[10px] bg-surface p-6 text-ink sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-ink-2">Package</span>
          <select
            value={bundleId}
            onChange={(e) => setBundleId(e.target.value)}
            className="mt-2 h-11 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink"
          >
            {eligible.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name} ({money(b.price)}/ft)
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="flex items-baseline justify-between text-sm font-medium text-ink-2">
            Unit length <span className="tabular-nums text-ink">{length} ft</span>
          </span>
          <input
            type="range"
            min={16}
            max={45}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="mt-4 w-full accent-electric"
            aria-label="Unit length in feet"
          />
        </label>
      </div>

      <fieldset className="mt-6">
        <legend className="text-sm font-medium text-ink-2">Term</legend>
        <div className="mt-2 grid grid-cols-5 gap-1.5">
          {FINANCING.terms.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTerm(t)}
              aria-pressed={term === t}
              className={`h-10 rounded-md border text-sm font-medium tabular-nums transition-colors ${
                term === t
                  ? "border-electric bg-electric text-primary-foreground"
                  : "border-line text-ink-2 hover:border-ink-2"
              }`}
            >
              {t} mo
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-7 border-t border-line pt-6">
        {qualifies ? (
          <>
            <p className="text-sm text-muted-ink">Estimated payment</p>
            <p className="mt-1 font-heading text-4xl font-semibold tracking-tight tabular-nums text-ink">
              {fmt(payment)}
              <span className="ml-1 text-base font-medium text-muted-ink">/ month</span>
            </p>
            <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              <dt className="text-muted-ink">Job total ({length} ft)</dt>
              <dd className="text-right tabular-nums">{fmt(price)}</dd>
              <dt className="text-muted-ink">APR / term</dt>
              <dd className="text-right tabular-nums">
                {apr}% / {term} months
              </dd>
              <dt className="text-muted-ink">Cost of borrowing</dt>
              <dd className="text-right tabular-nums">{fmt(costOfBorrowing)}</dd>
              <dt className="text-muted-ink">Total repaid</dt>
              <dd className="text-right tabular-nums">{fmt(totalRepaid)}</dd>
            </dl>
          </>
        ) : (
          <p className="text-sm text-muted-ink">
            Financing starts at jobs of {money(FINANCING.minAmount)}. At {length} ft this package is {money(price)}.
          </p>
        )}
      </div>

      <p className="mt-5 text-xs leading-relaxed text-muted-ink">
        Estimate only, calculated at a representative {apr}% APR before taxes. Financing is provided by a third-party
        lender and is subject to credit approval; your rate and term are set by the lender. Final job price is
        confirmed after we inspect the unit.
      </p>
    </div>
  );
};

export default FinancingEstimator;
