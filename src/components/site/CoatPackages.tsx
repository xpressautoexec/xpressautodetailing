import { useState } from "react";
import { ArrowRight, Check, Phone } from "lucide-react";
import { TEL_HREF } from "@/components/site/QuoteLink";
import { Section, SectionHeading } from "@/components/site/Section";
import { COATING_OPTIONS, COATING_TIERS, type CoatingOption, type CoatingTierId } from "@/data/coatings";
import { CERAMIC_PACKAGES, CERAMIC_UPCHARGE, VEHICLE_SIZES, fielddUrl, money } from "@/data/pricing";
import { CTA } from "@/data/brand";
import { useSizeParam } from "@/hooks/useSizeParam";

const TIME: Record<CoatingTierId, string> = { essential: "1 day", signature: "2 days", elite: "2 days" };

const defaultPick = (tier: CoatingTierId) => {
  const opts = COATING_OPTIONS.filter((c) => c.tier === tier);
  return (opts.find((c) => c.flagship) ?? opts[0]).id;
};

/** Bottle (or brand logo) tile in the vertical selector. */
const Tile = ({ c, selected, onClick }: { c: CoatingOption; selected: boolean; onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={selected}
    aria-label={`${c.brand} ${c.name}`}
    className={`flex w-full flex-col items-center gap-2 rounded-md border-2 px-2 pb-2.5 pt-3 transition-colors ${
      selected ? "border-primary bg-surface" : "border-line bg-tint opacity-70 hover:opacity-100"
    }`}
  >
    <span className="flex h-24 w-full items-center justify-center sm:h-28">
      {c.bottle ? (
        <img src={c.bottle} alt="" className="h-full w-auto object-contain" loading="lazy" />
      ) : (
        <img src={c.brandLogo} alt="" className="w-full max-w-[5.5rem] object-contain" loading="lazy" />
      )}
    </span>
    <span className="text-center text-[11px] font-semibold leading-tight text-ink">
      {c.brand === "CARPRO" ? c.name.replace("CQUARTZ ", "") : `${c.brand} ${c.name}`}
    </span>
  </button>
);

/** Xpress Coat tiers as rows: vertical coating selector on the side, the pick in the middle, price and booking on the right. */
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
        title="Pick a tier. Book it."
        intro="Every tier includes a decontamination wash and machine correction. Each one has two coatings at the same price: choose now or at drop-off."
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
          if (!pkg) return null;
          const options = COATING_OPTIONS.filter((c) => c.tier === t.id);
          const pick = options.find((c) => c.id === picks[t.id]) ?? options[0];
          return (
            <article
              key={t.id}
              className={`relative grid grid-cols-[6.5rem_1fr] gap-x-5 gap-y-6 rounded-card border bg-surface p-4 sm:grid-cols-[8rem_1fr] sm:p-6 lg:grid-cols-[8rem_1fr_17rem] lg:gap-x-8 ${
                pkg.popular ? "border-electric" : "border-line"
              }`}
            >
              {pkg.popular && (
                <span className="absolute -top-3 left-6 rounded-sm bg-electric px-2 py-1 text-[11px] font-semibold uppercase tracking-label text-primary-foreground">
                  Most chosen
                </span>
              )}

              <div role="group" aria-label={`${t.label} coating choice`} className="flex flex-col gap-3">
                {options.map((c) => (
                  <Tile key={c.id} c={c} selected={c.id === pick.id} onClick={() => setPicks((p) => ({ ...p, [t.id]: c.id }))} />
                ))}
              </div>

              <div className="min-w-0" aria-live="polite">
                <p className="text-xs font-semibold uppercase tracking-label text-muted-ink">
                  {pkg.name} · {pkg.correction}
                </p>
                <h3 className="mt-1 font-heading text-3xl font-bold leading-tight text-ink">Coat {t.label}</h3>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  {pick.logo ? (
                    <img src={pick.logo} alt={`${pick.brand} ${pick.name}`} className="h-6 w-auto max-w-full object-contain sm:h-7" />
                  ) : (
                    <p className="font-semibold text-ink">
                      {pick.brand} {pick.name}
                    </p>
                  )}
                  {pick.flagship && (
                    <span className="rounded-full border border-primary px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-label text-primary">
                      Flagship
                    </span>
                  )}
                </div>
                <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-2">{pick.description}</p>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {pick.highlights.slice(0, 4).map((h) => (
                    <li key={h} className="flex gap-2 text-sm text-ink">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-span-2 flex flex-col border-t border-line pt-5 lg:col-span-1 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                <p className="num text-4xl leading-none text-ink">{money(pkg.prices[size])}</p>
                <p className="mt-2 text-xs text-muted-ink">
                  Either coating, same price · {TIME[t.id]} in the shop
                </p>
                <a
                  href={fielddUrl(pkg.book[size])}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill-action mt-5 min-h-[52px] gap-2 rounded-full bg-action text-[15px] text-primary-foreground transition-colors hover:bg-ink"
                >
                  {CTA.book}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href={TEL_HREF}
                  className="mt-3 inline-flex items-center justify-center gap-2 text-sm font-semibold text-ink-2 hover:text-ink"
                >
                  <Phone className="h-4 w-4 text-action" aria-hidden="true" />
                  {CTA.call}
                </a>
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
