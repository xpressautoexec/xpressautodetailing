import { useState } from "react";
import { ArrowRight, Check, Phone } from "lucide-react";
import { TEL_HREF } from "@/components/site/QuoteLink";
import { Section, SectionHeading } from "@/components/site/Section";
import { COATING_OPTIONS, COATING_TIERS, type CoatingOption, type CoatingTierId } from "@/data/coatings";
import { CERAMIC_PACKAGES, CERAMIC_UPCHARGE, VEHICLE_SIZES, fielddUrl, money } from "@/data/pricing";
import { CTA } from "@/data/brand";
import { useSizeParam } from "@/hooks/useSizeParam";

const TIME: Record<CoatingTierId, string> = { essential: "1 day", signature: "2 days", elite: "2 days" };
const FOR_WHO: Record<CoatingTierId, string> = {
  essential: "Newer paint, leases and cars you may sell in a few years.",
  signature: "Daily drivers you plan to keep for years.",
  elite: "Long-term, high-value and garage-kept vehicles.",
};

const label = (c: CoatingOption) => (c.brand === "3M" ? "3M Ceramic Coating" : `${c.brand} ${c.name}`);

const defaultPick = (tier: CoatingTierId) => {
  const opts = COATING_OPTIONS.filter((c) => c.tier === tier);
  return (opts.find((c) => c.flagship) ?? opts[0])?.id ?? "";
};

/** One coating in the "Select your coating" list. */
const Option = ({ c, selected, onClick }: { c: CoatingOption; selected: boolean; onClick: () => void }) => (
  <button
    type="button"
    role="radio"
    aria-checked={selected}
    onClick={onClick}
    className={`flex w-full items-center gap-4 rounded-md border-2 bg-surface p-3 text-left transition-colors ${
      selected ? "border-primary" : "border-line hover:border-ink-2"
    }`}
  >
    <span className="flex h-20 w-14 shrink-0 items-center justify-center">
      <img
        src={c.image ?? c.brandLogo}
        alt=""
        className={c.image ? "h-full w-auto object-contain mix-blend-multiply" : "w-full object-contain"}
        loading="lazy"
      />
    </span>
    <span className="min-w-0 flex-1">
      <span className="block text-[11px] font-semibold uppercase tracking-label text-muted-ink">{c.brand}</span>
      <span className="block font-semibold leading-tight text-ink">{c.name}</span>
      <span className="mt-0.5 block text-xs text-muted-ink">{c.tag}</span>
    </span>
    <span
      aria-hidden="true"
      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${selected ? "border-primary bg-primary" : "border-line"}`}
    >
      {selected && <Check className="h-3 w-3 text-primary-foreground" />}
    </span>
  </button>
);

/** Xpress Coat tiers: the package is the card, "Select your coating" sits beside it. */
const CoatPackages = ({ id = "packages" }: { id?: string }) => {
  const [size, setSize] = useSizeParam();
  const [picks, setPicks] = useState<Record<CoatingTierId, string>>({
    essential: defaultPick("essential"),
    signature: defaultPick("signature"),
    elite: defaultPick("elite"),
  });

  return (
    <Section tone="surface" id={id}>
      <SectionHeading
        eyebrow="Packages"
        title="Pick a package. Book it."
        intro="Every package includes a decontamination wash and machine correction. Choose your coating now or at drop-off; the price is the same."
      />

      <div role="group" aria-label="Vehicle size" className="mb-8 flex w-full gap-1 rounded-md border border-line bg-surface p-1 sm:w-fit">
        {VEHICLE_SIZES.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setSize(s.id)}
            aria-pressed={size === s.id}
            className={`flex-1 rounded px-3 py-2 text-xs font-semibold transition-colors sm:flex-none sm:px-4 sm:text-sm ${
              size === s.id ? "bg-ink text-primary-foreground" : "text-ink-2 hover:text-ink"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {COATING_TIERS.map((t) => {
          const pkg = CERAMIC_PACKAGES.find((p) => p.id === t.id);
          const options = COATING_OPTIONS.filter((c) => c.tier === t.id);
          if (!pkg || !options.length) return null;
          const pick = options.find((c) => c.id === picks[t.id]) ?? options[0];
          const includes = pkg.includes.map((i) => (/ceramic coating$/i.test(i) ? `${label(pick)}, ${t.years}` : i));
          return (
            <article
              key={t.id}
              className={`relative grid overflow-hidden rounded-card border bg-surface lg:grid-cols-[1fr_25rem] ${
                pkg.popular ? "border-electric" : "border-line"
              }`}
            >
              {pkg.popular && (
                <span className="absolute left-6 top-0 rounded-b-sm bg-electric px-2 py-1 text-[11px] font-semibold uppercase tracking-label text-primary-foreground">
                  Most chosen
                </span>
              )}

              {/* The package */}
              <div className="flex flex-col p-6 pt-9 sm:p-8 sm:pt-10">
                <p className="text-xs font-semibold uppercase tracking-label text-muted-ink">{pkg.name} package</p>
                <h3 className="mt-1 font-heading text-4xl font-bold leading-none text-ink">Coat {t.label}</h3>
                <p className="mt-2 text-[15px] text-ink-2">{FOR_WHO[t.id]}</p>
                <ul className="mt-6 grid gap-2 border-t border-line pt-5 sm:grid-cols-2">
                  {includes.map((i) => (
                    <li key={i} className="flex gap-2 text-[15px] text-ink">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      {i}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-col gap-4 pt-8 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="num text-5xl leading-none text-ink">{money(pkg.prices[size])}</p>
                    <p className="mt-2 text-xs text-muted-ink">{TIME[t.id]} in our shop{options.length > 1 ? " · same price for any coating" : ""}</p>
                  </div>
                  <div className="flex flex-col items-stretch gap-2 sm:items-end">
                    <a
                      href={fielddUrl(pkg.book[size])}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pill-action min-h-[52px] gap-2 rounded-full bg-action px-9 text-[15px] text-primary-foreground transition-colors hover:bg-ink"
                    >
                      {CTA.book}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                    <a href={TEL_HREF} className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-ink-2 hover:text-ink">
                      <Phone className="h-4 w-4 text-action" aria-hidden="true" />
                      {CTA.call}
                    </a>
                  </div>
                </div>
              </div>

              {/* Coating choice */}
              <div className="border-t border-line bg-tint p-6 sm:p-8 lg:border-l lg:border-t-0">
                <p className="text-xs font-semibold uppercase tracking-label text-ink">
                  {options.length > 1 ? "Select your coating" : "Your coating"}
                </p>
                <div role="radiogroup" aria-label={`Coating for Coat ${t.label}`} className="mt-4 space-y-3">
                  {options.map((c) => (
                    <Option key={c.id} c={c} selected={c.id === pick.id} onClick={() => setPicks((p) => ({ ...p, [t.id]: c.id }))} />
                  ))}
                </div>
                <div className="mt-5" aria-live="polite">
                  {pick.logo && <img src={pick.logo} alt={label(pick)} className="h-6 w-auto max-w-full object-contain" />}
                  <p className="mt-3 text-sm leading-relaxed text-ink-2">{pick.description}</p>
                  <ul className="mt-3 space-y-1.5">
                    {pick.highlights.map((h) => (
                      <li key={h} className="flex gap-2 text-sm text-ink">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <p className="mt-6 text-sm text-muted-ink">
        Exotics and heavily modified paint are {CERAMIC_UPCHARGE.exoticPct}% more. Booking holds your spot; we confirm the price after a quick look
        at the paint.
      </p>
    </Section>
  );
};

export default CoatPackages;
