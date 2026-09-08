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
}: Props) => {
  const [length, setLength] = useState(defaultLength);
  const [selected, setSelected] = useState<string[]>([]);

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
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
      <h3 className="font-heading text-xl font-bold text-foreground">{title}</h3>

      <div className="mt-6">
        <label htmlFor="pf-length" className="flex items-center justify-between text-sm font-medium text-foreground">
          <span>{lengthLabel}</span>
          <span className="font-mono text-base text-primary">{length} ft</span>
        </label>
        <input
          id="pf-length"
          type="range"
          min={minLength}
          max={maxLength}
          step={1}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="mt-3 w-full accent-[hsl(var(--primary))]"
        />
      </div>

      <fieldset className="mt-6">
        <legend className="text-sm font-medium text-foreground">Select the services you want</legend>
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
                className={`flex min-h-[44px] items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition-colors ${
                  isOn ? "border-primary bg-primary/5" : "border-border bg-background hover:border-primary/40"
                }`}
              >
                <span className="text-sm text-foreground">{s.name}</span>
                <span className="font-mono text-sm text-muted-foreground whitespace-nowrap">
                  {money(s.price)}
                  {s.unit ?? "/ft"} {isOn && <span className="text-primary">· {money(line)}</span>}
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
        <span className="text-sm text-muted-foreground">Estimated total</span>
        <span className="font-mono text-2xl font-bold text-foreground">{money(Math.round(total))}</span>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">{note}</p>
    </div>
  );
};

export default PerFootCalculator;
