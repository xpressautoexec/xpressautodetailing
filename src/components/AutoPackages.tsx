import { useState } from "react";
import { Check, Clock, ArrowRight } from "lucide-react";
import {
  AUTO_PACKAGES,
  VEHICLE_SIZES,
  type VehicleSizeId,
  money,
  bookingUrl,
} from "@/data/pricing";

interface Props {
  /** Dark section background — switches card colours. */
  dark?: boolean;
  /** Show only these package ids, in order. */
  only?: string[];
  heading?: string;
  intro?: string;
}

/** The four auto packages, priced by vehicle size. Prices come from pricing.ts only. */
const AutoPackages = ({ dark = false, only, heading, intro }: Props) => {
  const [size, setSize] = useState<VehicleSizeId>("sedan");
  const packages = only
    ? only.map((id) => AUTO_PACKAGES.find((p) => p.id === id)!).filter(Boolean)
    : AUTO_PACKAGES;

  const text = dark ? "text-background" : "text-foreground";
  const sub = dark ? "text-background/60" : "text-muted-foreground";

  return (
    <div>
      {heading && (
        <div className="text-center mb-8">
          <h2 className={`font-heading font-semibold text-2xl sm:text-3xl md:text-4xl ${text}`}>
            {heading}
          </h2>
          {intro && <p className={`mt-4 max-w-2xl mx-auto text-sm sm:text-base ${sub}`}>{intro}</p>}
        </div>
      )}

      {/* Vehicle size selector */}
      <div
        role="tablist"
        aria-label="Vehicle size"
        className={`mx-auto mb-10 flex w-fit gap-1 rounded-full p-1 ${
          dark ? "bg-background/10" : "bg-muted"
        }`}
      >
        {VEHICLE_SIZES.map((v) => (
          <button
            key={v.id}
            role="tab"
            aria-selected={size === v.id}
            onClick={() => setSize(v.id)}
            className={`rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold transition-colors ${
              size === v.id
                ? "bg-primary text-primary-foreground"
                : dark
                  ? "text-background/70 hover:text-background"
                  : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {packages.map((p) => (
          <div
            key={p.id}
            className={`relative flex h-full flex-col rounded-2xl border p-6 transition-colors ${
              p.popular
                ? "border-primary/60 shadow-lg shadow-primary/10"
                : dark
                  ? "border-background/15"
                  : "border-border"
            } ${dark ? "bg-background/[0.04]" : "bg-card"}`}
          >
            {p.popular && (
              <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-[11px] font-bold text-primary-foreground">
                Most booked
              </span>
            )}
            {p.memberOnly && (
              <span className={`absolute -top-3 left-6 rounded-full px-3 py-1 text-[11px] font-bold ${dark ? "bg-background/20 text-background" : "bg-muted text-foreground"}`}>
                Xpress Pass only
              </span>
            )}

            <h3 className={`font-heading text-lg font-bold ${text}`}>{p.name}</h3>
            <p className={`mt-1 text-sm ${sub}`}>{p.tagline}</p>

            <div className="mt-4 flex items-baseline gap-2">
              <span className={`font-heading text-3xl font-semibold ${text}`}>{money(p.price[size])}</span>
            </div>
            <p className={`mt-1 flex items-center gap-1.5 text-xs ${sub}`}>
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {p.duration}
            </p>

            <ul className="mt-5 space-y-2">
              {p.includes.map((f) => (
                <li key={f} className={`flex gap-2 text-sm ${sub}`}>
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <a
              href={p.memberOnly ? "/xpress-pass" : bookingUrl(size, p.id)}
              {...(!p.memberOnly && { target: "_blank", rel: "noopener noreferrer" })}
              className={`group mt-6 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors ${
                p.popular
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : dark
                    ? "border border-background/25 text-background hover:border-background/60"
                    : "border border-border text-foreground hover:border-primary"
              }`}
            >
              {p.memberOnly ? "See the Xpress Pass" : "Book this package"}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutoPackages;
