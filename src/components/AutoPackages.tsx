import { useState } from "react";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import {
  AUTO_PACKAGES,
  VEHICLE_SIZES,
  XPRESS_PASS,
  PASS_ADDON_DISCOUNT,
  money,
  fielddUrl,
  BOOKING_URL,
  passPlanFor,
  memberPriceFor,
} from "@/data/pricing";

const maxPassDiscount = Math.max(...XPRESS_PASS.map((p) => p.discount));
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
  /** Package ids switched to their interior-only version. */
  const [interior, setInterior] = useState<Record<string, boolean>>({});
  const all = only ? only.map((id) => AUTO_PACKAGES.find((p) => p.id === id)!).filter(Boolean) : AUTO_PACKAGES;
  // Packages without a price for this size (Upkeep for pickups) are hidden for that size.
  const packages = all.filter((p) => p.price[size] !== undefined);

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
        {packages.map((p) => {
          const io = p.interiorOnly && interior[p.id] ? p.interiorOnly : undefined;
          const plan = io ? undefined : passPlanFor(p);
          const member = io ? undefined : memberPriceFor(p, size);
          const price = io ? io.price[size] : p.price[size];
          const includes = io ? io.includes : p.includes;
          const ioKey = io?.book?.[size];
          const bookHref = p.memberOnly ? "/xpress-pass" : io ? (ioKey ? fielddUrl(ioKey) : BOOKING_URL) : fielddUrl(p.book[size]);
          return (
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
              {p.popular ? "Most booked" : p.memberOnly ? "Members only" : ""}
            </p>
            <h3 className={`mt-1 font-heading text-lg font-semibold ${text}`}>{p.name}</h3>
            {p.interiorOnly && (
              <div
                role="group"
                aria-label={`${p.name} options`}
                className={`mt-3 flex gap-1 rounded-md p-1 ${dark ? "bg-primary-foreground/10" : "border border-line"}`}
              >
                {[
                  { on: false, label: "Full detail" },
                  { on: true, label: "Interior only" },
                ].map((o) => {
                  const active = !!interior[p.id] === o.on;
                  return (
                    <button
                      key={o.label}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setInterior((s) => ({ ...s, [p.id]: o.on }))}
                      className={`min-h-[36px] flex-1 rounded px-2 text-xs font-semibold transition-colors ${
                        active
                          ? "bg-electric text-primary-foreground"
                          : dark
                            ? "text-primary-foreground/70 hover:text-primary-foreground"
                            : "text-ink-2 hover:text-ink"
                      }`}
                    >
                      {o.label}
                    </button>
                  );
                })}
              </div>
            )}
            {p.memberOnly ? (
              <>
                <p className={`mt-4 font-heading text-4xl font-semibold tracking-tight tabular-nums ${text}`}>
                  {money(member ?? p.price[size] ?? 0)}
                </p>
                <p className={`mt-1 text-xs ${muted}`}>
                  Member price per visit · {p.duration}
                </p>
              </>
            ) : (
              <>
                <p className={`mt-4 font-heading text-4xl font-semibold tracking-tight tabular-nums ${text}`}>
                  {money(price ?? 0)}
                </p>
                <p className={`mt-1 text-xs ${muted}`}>
                  {io ? "Interior only · " : member !== undefined ? "Regular price · " : ""}
                  {io ? io.duration : p.duration}
                </p>
                {member !== undefined && plan && (
                  <div
                    className={`mt-4 flex items-center justify-between gap-3 rounded-md border px-3 py-2.5 ${
                      dark ? "border-electric/40" : "border-electric/30"
                    }`}
                  >
                    <span className="text-xs font-semibold uppercase tracking-wide text-electric">
                      Members
                      <span className={`ml-1.5 font-medium normal-case tracking-normal ${muted}`}>
                        {plan.discount}% off
                      </span>
                    </span>
                    <span className="font-heading text-xl font-semibold tabular-nums text-electric">
                      {money(member)}
                    </span>
                  </div>
                )}
              </>
            )}
            <p className={`mt-4 text-sm leading-relaxed ${sub}`}>{p.tagline}</p>

            <ul className="mt-5 flex-1 space-y-2">
              {includes.map((f) => (
                <li key={f} className={`flex gap-2 text-sm ${sub}`}>
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-electric" aria-hidden="true" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <a
              href={bookHref}
              {...(!p.memberOnly && { target: "_blank", rel: "noopener noreferrer" })}
              className={`mt-6 inline-flex min-h-[44px] items-center justify-center rounded-md px-5 text-sm font-semibold transition-colors ${
                p.popular
                  ? "bg-electric text-primary-foreground hover:bg-electric-2"
                  : dark
                    ? "border border-primary-foreground/25 text-primary-foreground hover:border-primary-foreground/60"
                    : "border border-line text-ink hover:border-ink-2"
              }`}
            >
              {p.memberOnly ? "See the Xpress Pass" : io ? "Book interior only" : "Book this package"}
            </a>
          </article>
          );
        })}
      </div>
      <div
        className={`mt-6 flex flex-col gap-4 rounded-[10px] border p-5 sm:flex-row sm:items-center sm:justify-between ${
          dark ? "border-electric/40" : "border-electric/30"
        }`}
      >
        <p className={`text-sm leading-relaxed ${sub}`}>
          <span className={`font-semibold ${text}`}>Xpress Pass members save up to {maxPassDiscount}% every visit</span>{" "}
          plus {PASS_ADDON_DISCOUNT}% off every add-on. No contract, cancel any time.
        </p>
        <Link
          to="/xpress-pass"
          className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-md bg-electric px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-electric-2"
        >
          See the Xpress Pass
        </Link>
      </div>
      <p className={`mt-6 text-sm ${sub}`}>
        Not sure which package fits?{" "}
        <Link to="/contact" className="font-semibold text-electric hover:underline hover:underline-offset-4">
          Ask us a question
        </Link>
      </p>
    </div>
  );
};

export default AutoPackages;
