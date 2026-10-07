import { useMemo, useState } from "react";
import { money } from "@/data/pricing";

export interface PerFootService {
  id?: string;
  name: string;
  price: number;
  unit?: string;
  popular?: boolean;
  /** Priced on site; shown as "Quote" and left out of the total. */
  quote?: boolean;
  /** Service ids a bundle already includes. Selecting the bundle clears them. */
  covers?: string[];
}

interface Props {
  services: PerFootService[];
  /** Optional bundles shown above the individual services. */
  bundles?: PerFootService[];
  defaultLength?: number;
  minLength?: number;
  maxLength?: number;
  lengthLabel?: string;
  title?: string;
  note?: string;
  /** Service ids selected on first render, so the total is not $0. */
  defaultSelected?: string[];
}

/**
 * Length x per-foot estimator. Multiple services can be selected at once.
 * Non-per-foot units (/hr, /side, /decal, +) are added as flat line items.
 */
const isPerFoot = (s: PerFootService) => !s.unit || s.unit === "/ft";

const PerFootCalculator = ({
  services,
  bundles = [],
  defaultLength = 24,
  minLength = 12,
  maxLength = 45,
  lengthLabel = "Length (feet)",
  title = "Estimate your price",
  note = "Estimate only. Final price is confirmed after we see the unit.",
  defaultSelected = [],
}: Props) => {
  const [length, setLength] = useState(defaultLength);
  const [selected, setSelected] = useState<string[]>(defaultSelected);

  const key = (s: PerFootService) => s.id ?? s.name;

  const all = useMemo(() => [...bundles, ...services], [bundles, services]);

  /** Bundles and the services they include are mutually exclusive, so nothing is counted twice. */
  const toggle = (id: string) =>
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      const item = all.find((s) => key(s) === id);
      const covers = item?.covers ?? [];
      const next = prev.filter((x) => {
        const other = all.find((s) => key(s) === x);
        if (covers.length && (covers.includes(x) || other?.covers?.length)) return false;
        if (other?.covers?.includes(id)) return false;
        return true;
      });
      return [...next, id];
    });

  const total = useMemo(
    () =>
      all
        .filter((s) => selected.includes(key(s)) && !s.quote)
        .reduce((sum, s) => sum + (isPerFoot(s) ? s.price * length : s.price), 0),
    [all, selected, length]
  );

  const renderItem = (s: PerFootService) => {
    const id = key(s);
    const isOn = selected.includes(id);
    const line = isPerFoot(s) ? s.price * length : s.price;
    return (
      <button
        key={id}
        type="button"
        aria-pressed={isOn}
        onClick={() => toggle(id)}
        className={`flex min-h-[44px] items-center justify-between gap-3 rounded-md border px-4 py-3 text-left transition-colors ${
          isOn ? "border-electric bg-electric-soft" : "border-line bg-surface hover:border-ink-2"
        }`}
      >
        <span className="text-sm text-ink">{s.name}</span>
        <span className="whitespace-nowrap text-sm tabular-nums text-muted-ink">
          {s.quote ? (
            "Upon quote"
          ) : (
            <>
              {money(s.price)}
              {s.unit ?? "/ft"} {isOn && <span className="font-semibold text-ink">· {money(line)}</span>}
            </>
          )}
        </span>
      </button>
    );
  };

  return (
    <div className="rounded-[10px] border border-line bg-surface p-6 sm:p-8">
      <h3 className="font-heading text-xl font-semibold text-ink">{title}</h3>

      <div className="mt-6">
        <label htmlFor="pf-length" className="flex items-center justify-between text-sm font-medium text-ink-2">
          <span>{lengthLabel}</span>
          <span className="tabular-nums text-ink">{length} ft</span>
        </label>
        <input
          id="pf-length"
          type="range"
          min={minLength}
          max={maxLength}
          step={1}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="mt-3 w-full accent-electric"
        />
      </div>

      {bundles.length > 0 && (
        <fieldset className="mt-6">
          <legend className="text-sm font-medium text-ink-2">Packages</legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">{bundles.map(renderItem)}</div>
        </fieldset>
      )}

      <fieldset className="mt-6">
        <legend className="text-sm font-medium text-ink-2">
          {bundles.length > 0 ? "Or pick individual services" : "Select the services you want"}
        </legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">{services.map(renderItem)}</div>
      </fieldset>

      <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
        <span className="text-sm text-muted-ink">Estimated total</span>
        <span className="font-heading text-3xl font-semibold tabular-nums text-ink">{money(Math.round(total))}</span>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-muted-ink">{note}</p>
    </div>
  );
};

export default PerFootCalculator;
