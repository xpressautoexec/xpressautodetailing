import { useMemo, useState } from "react";
import { money } from "@/data/pricing";

export interface PerFootService {
  id?: string;
  name: string;
  price: number;
  unit?: string;
  popular?: boolean;
}

interface Props {
  services: PerFootService[];
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
const PerFootCalculator = ({
  services,
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

  const toggle = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const total = useMemo(
    () =>
      services
        .filter((s) => selected.includes(key(s)))
        .reduce((sum, s) => sum + (!s.unit || s.unit === "/ft" ? s.price * length : s.price), 0),
    [services, selected, length]
  );

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

      <fieldset className="mt-6">
        <legend className="text-sm font-medium text-ink-2">Select the services you want</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {services.map((s) => {
            const id = key(s);
            const isOn = selected.includes(id);
            const line = !s.unit || s.unit === "/ft" ? s.price * length : s.price;
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
                  {money(s.price)}
                  {s.unit ?? "/ft"} {isOn && <span className="font-semibold text-ink">· {money(line)}</span>}
                </span>
              </button>
            );
          })}
        </div>
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
