import { Check } from "lucide-react";
import { AUTO_PACKAGES, VEHICLE_SIZES, money, bookingUrl } from "@/data/pricing";
import { useSizeParam } from "@/hooks/useSizeParam";

interface Props {
  /** Dark section background — switches card colours. */
  dark?: boolean;
  /** Show only these package ids, in order. */
  only?: string[];
  heading?: string;
  intro?: string;
}

/** The auto packages, priced by vehicle size. Prices come from pricing.ts only. */
const AutoPackages = ({ dark = false, only, heading, intro }: Props) => {
  const [size, setSize] = useSizeParam();
  const packages = only ? only.map((id) => AUTO_PACKAGES.find((p) => p.id === id)!).filter(Boolean) : AUTO_PACKAGES;

  const text = dark ? "text-primary-foreground" : "text-ink";
  const sub = dark ? "text-primary-foreground/65" : "text-ink-2";
  const muted = dark ? "text-primary-foreground/50" : "text-muted-ink";

  return (
    <div>
      <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        {heading && (
          <div className="max-w-xl">
            <h2 className={`font-heading text-3xl font-semibold tracking-tight sm:text-4xl ${text}`}>{heading}</h2>
            {intro && <p className={`mt-4 text-[15px] leading-relaxed ${sub}`}>{intro}</p>}
          </div>
        )}
        <div
          role="tablist"
          aria-label="Vehicle size"
          className={`flex w-full shrink-0 gap-1 rounded-md p-1 sm:w-fit ${dark ? "bg-primary-foreground/10" : "border border-line bg-surface"}`}
        >
          {VEHICLE_SIZES.map((v) => (
            <button
              key={v.id}
              role="tab"
              aria-selected={size === v.id}
              onClick={() => setSize(v.id)}
              className={`flex-1 rounded px-3 py-2 text-xs font-semibold transition-colors sm:flex-none sm:px-4 sm:text-sm ${
                size === v.id
                  ? "bg-electric text-primary-foreground"
                  : dark
                    ? "text-primary-foreground/70 hover:text-primary-foreground"
                    : "text-ink-2 hover:text-ink"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {packages.map((p) => (
          <article
            key={p.id}
            className={`relative flex h-full flex-col overflow-hidden rounded-[10px] border p-6 ${
              p.popular
                ? "border-electric"
                : dark
                  ? "border-primary-foreground/15"
                  : "border-line"
            } ${dark ? "bg-primary-foreground/[0.04]" : "bg-surface"}`}
          >
            {p.popular && <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-electric" />}
            <p className={`h-4 text-xs font-medium ${p.popular ? "text-electric" : muted}`}>
              {p.popular ? "Most booked" : p.memberOnly ? "Xpress Pass members" : ""}
            </p>
            <h3 className={`mt-1 font-heading text-lg font-semibold ${text}`}>{p.name}</h3>
            <p className={`mt-4 font-heading text-4xl font-semibold tracking-tight tabular-nums ${text}`}>
              {money(p.price[size])}
            </p>
            <p className={`mt-1 text-xs ${muted}`}>{p.duration}</p>
            <p className={`mt-4 text-sm leading-relaxed ${sub}`}>{p.tagline}</p>

            <ul className="mt-5 flex-1 space-y-2">
              {p.includes.map((f) => (
                <li key={f} className={`flex gap-2 text-sm ${sub}`}>
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-electric" aria-hidden="true" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <a
              href={p.memberOnly ? "/xpress-pass" : bookingUrl(size, p.id)}
              {...(!p.memberOnly && { target: "_blank", rel: "noopener noreferrer" })}
              className={`mt-6 inline-flex min-h-[44px] items-center justify-center rounded-md px-5 text-sm font-semibold transition-colors ${
                p.popular
                  ? "bg-electric text-primary-foreground hover:bg-electric-2"
                  : dark
                    ? "border border-primary-foreground/25 text-primary-foreground hover:border-primary-foreground/60"
                    : "border border-line text-ink hover:border-ink-2"
              }`}
            >
              {p.memberOnly ? "See the Xpress Pass" : "Book this package"}
            </a>
          </article>
        ))}
      </div>
    </div>
  );
};

export default AutoPackages;
