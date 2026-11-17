import { useState } from "react";
import { ArrowRight, Check, Phone, ShieldCheck } from "lucide-react";
import { TEL_HREF } from "@/components/site/QuoteLink";
import { Section, SectionHeading } from "@/components/site/Section";
import {
  COATING_OPTIONS,
  COATING_TIERS,
  type CoatingOption,
  type CoatingTierId,
} from "@/data/coatings";
import {
  CERAMIC_PACKAGES,
  CERAMIC_UPCHARGE,
  GLOSS_PACKAGE,
  VEHICLE_SIZES,
  fielddUrl,
  money,
  type SizePrice,
} from "@/data/pricing";
import { CTA } from "@/data/brand";
import { useSizeParam } from "@/hooks/useSizeParam";

const TIME: Record<CoatingTierId, string> = {
  essential: "1 day",
  signature: "2 days",
  elite: "2 days",
};
const FOR_WHO: Record<CoatingTierId, string> = {
  essential: "Newer paint, leases and cars you may sell in a couple of years.",
  signature: "Daily drivers you plan to keep for a few years.",
  elite:
    "The hardest coating we install, for paint that sees a lot of washing.",
};

type Row = {
  key: string;
  title: string;
  years: string;
  forWho: string;
  time?: string;
  pkg: {
    name: string;
    prices: SizePrice;
    popular?: boolean;
    includes: string[];
    book?: Record<string, string>;
  };
  options: CoatingOption[];
};

const ROWS: Row[] = [
  {
    key: GLOSS_PACKAGE.id,
    title: GLOSS_PACKAGE.name,
    years: "1 year",
    forWho:
      "Bring back the gloss and protect it for a season or two, without a full coating.",
    pkg: GLOSS_PACKAGE,
    options: [],
  },
  ...COATING_TIERS.flatMap((t) => {
    const pkg = CERAMIC_PACKAGES.find((p) => p.id === t.id);
    const options = COATING_OPTIONS.filter((c) => c.tier === t.id);
    return pkg && options.length
      ? [
          {
            key: t.id,
            title: t.title,
            years: t.years,
            forWho: FOR_WHO[t.id],
            time: TIME[t.id],
            pkg,
            options,
          },
        ]
      : [];
  }),
];

const label = (c: CoatingOption) =>
  c.brand === "3M" ? "3M Ceramic Coating" : `${c.brand} ${c.name}`;

const defaultPick = (tier: CoatingTierId) => {
  const opts = COATING_OPTIONS.filter((c) => c.tier === tier);
  return (
    (opts.find((c) => c.flagship) ?? opts.find((c) => c.recommended) ?? opts[0])
      ?.id ?? ""
  );
};

/** One coating in the "Select your coating" list. */
const Option = ({
  c,
  selected,
  onClick,
}: {
  c: CoatingOption;
  selected: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    role="radio"
    aria-checked={selected}
    onClick={onClick}
    className={`relative flex min-h-[64px] w-full items-center gap-3 rounded-md border-2 bg-surface p-2.5 text-left sm:gap-4 sm:p-3 transition-colors ${
      selected ? "border-primary" : "border-line hover:border-ink-2"
    }`}
  >
    {c.recommended && (
      <span className="absolute -top-2.5 right-3 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-label text-primary-foreground">
        Recommended
      </span>
    )}
    <span className="flex h-16 w-12 shrink-0 items-center justify-center sm:h-20 sm:w-14">
      <img
        src={c.image ?? c.brandLogo}
        alt=""
        className={
          c.image
            ? "h-full w-auto object-contain mix-blend-multiply"
            : "w-full object-contain"
        }
        loading="lazy"
      />
    </span>
    <span className="min-w-0 flex-1">
      <span className="block text-[11px] font-semibold uppercase tracking-label text-muted-ink">
        {c.brand}
      </span>
      <span className="block font-semibold leading-tight text-ink">
        {c.name}
      </span>
      <span className="mt-0.5 block text-xs text-muted-ink">{c.tag}</span>
      {c.warranty && (
        <span className="mt-1.5 inline-flex items-center gap-1 rounded-sm bg-electric/10 px-1.5 py-0.5 text-[11px] font-semibold text-electric">
          <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
          {c.warranty}
        </span>
      )}
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
  const [picks, setPicks] = useState<Record<string, string>>({
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

      <div
        role="group"
        aria-label="Vehicle size"
        className="mb-8 flex w-full gap-1 rounded-md border border-line bg-surface p-1 sm:w-fit"
      >
        {VEHICLE_SIZES.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setSize(s.id)}
            aria-pressed={size === s.id}
            className={`flex-1 rounded px-3 py-2 text-xs font-semibold transition-colors sm:flex-none sm:px-4 sm:text-sm ${
              size === s.id
                ? "bg-ink text-primary-foreground"
                : "text-ink-2 hover:text-ink"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {ROWS.map((r) => {
          const { pkg, options } = r;
          const pick = options.find((c) => c.id === picks[r.key]) ?? options[0];
          const includes = pick
            ? pkg.includes.flatMap((i) =>
                /ceramic coating$/i.test(i)
                  ? [
                      `${label(pick)}${pick.topCoat ? ` + ${pick.topCoat}` : ""}, ${r.years}`,
                    ]
                  : /registered & warrantied/i.test(i)
                    ? pick.warranty
                      ? [`${pick.warranty}, registered by us`]
                      : ["Coating registered with the manufacturer"]
                    : [i],
              )
            : pkg.includes;
          const book = pkg.book?.[size];
          return (
            <article
              key={r.key}
              className={`relative grid overflow-hidden rounded-card border bg-surface ${pick ? "lg:grid-cols-[1fr_24rem] lg:grid-rows-[auto_1fr]" : ""} ${
                pkg.popular ? "border-electric" : "border-line"
              }`}
            >
              {pkg.popular && (
                <span className="absolute left-5 top-0 rounded-b-sm bg-electric px-2 py-1 text-[11px] font-semibold uppercase tracking-label text-primary-foreground sm:left-8">
                  Most chosen
                </span>
              )}

              {/* 1. Package name and price (first on phones) */}
              <div className="px-5 pb-5 pt-9 sm:px-8 sm:pt-10 lg:col-start-1 lg:row-start-1">
                <p className="text-xs font-semibold uppercase tracking-label text-muted-ink">
                  {pkg.name === r.title ? "Entry" : pkg.name} · {r.years}
                </p>
                <div className="mt-1 flex items-end justify-between gap-4">
                  <h3 className="font-heading text-3xl font-bold leading-none text-ink sm:text-4xl">
                    {r.title}
                  </h3>
                  <p className="num shrink-0 text-3xl leading-none text-ink sm:text-5xl">
                    {money(pkg.prices[size])}
                  </p>
                </div>
                <p className="mt-2 text-[15px] text-ink-2">{r.forWho}</p>
              </div>

              {/* 2. Coating choice (second on phones, right column on desktop) */}
              {pick && (
                <div className="border-y border-line bg-tint px-5 py-5 sm:px-8 sm:py-6 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:border-y-0 lg:border-l">
                  <p className="text-xs font-semibold uppercase tracking-label text-ink">
                    {options.length > 1
                      ? "Select your coating"
                      : "Your coating"}
                  </p>
                  <div
                    role="radiogroup"
                    aria-label={`Coating for ${r.title}`}
                    className="mt-4 space-y-4"
                  >
                    {options.map((c) => (
                      <Option
                        key={c.id}
                        c={c}
                        selected={c.id === pick.id}
                        onClick={() =>
                          setPicks((p) => ({ ...p, [r.key]: c.id }))
                        }
                      />
                    ))}
                  </div>
                  <div className="mt-4" aria-live="polite">
                    {pick.logo && (
                      <img
                        src={pick.logo}
                        alt={label(pick)}
                        className="h-5 w-auto max-w-full object-contain sm:h-6"
                      />
                    )}
                    <p className="mt-2.5 text-sm leading-relaxed text-ink-2">
                      {pick.description}
                    </p>
                    <ul className="mt-2.5 space-y-1.5">
                      {pick.highlights.map((h) => (
                        <li key={h} className="flex gap-2 text-sm text-ink">
                          <Check
                            className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                            aria-hidden="true"
                          />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* 3. What's included and booking */}
              <div
                className={`flex flex-col px-5 pb-6 pt-5 sm:px-8 sm:pb-8 lg:col-start-1 lg:row-start-2 ${pick ? "lg:border-t lg:border-line" : "border-t border-line"}`}
              >
                <ul className="grid gap-2 sm:grid-cols-2">
                  {includes.map((i) =>
                    /warranty/i.test(i) ? (
                      <li
                        key={i}
                        className="flex gap-2 text-[15px] font-semibold text-electric"
                      >
                        <ShieldCheck
                          className="mt-0.5 h-5 w-5 shrink-0"
                          aria-hidden="true"
                        />
                        {i}
                      </li>
                    ) : (
                      <li key={i} className="flex gap-2 text-[15px] text-ink">
                        <Check
                          className="mt-1 h-4 w-4 shrink-0 text-primary"
                          aria-hidden="true"
                        />
                        {i}
                      </li>
                    ),
                  )}
                </ul>
                <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-muted-ink">
                    {r.time ? `${r.time} in our shop` : "Done in our shop"}
                    {options.length > 1
                      ? " · same price for either coating"
                      : ""}
                  </p>
                  <div className="flex flex-col items-stretch gap-2 sm:items-end">
                    <a
                      href={book ? fielddUrl(book) : TEL_HREF}
                      {...(book
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="pill-action min-h-[52px] w-full gap-2 rounded-full bg-action px-9 text-[15px] text-primary-foreground transition-colors hover:bg-ink sm:w-auto"
                    >
                      {book ? CTA.book : "Call to book"} ·{" "}
                      {money(pkg.prices[size])}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                    {book && (
                      <a
                        href={TEL_HREF}
                        className="inline-flex min-h-[44px] items-center justify-center gap-2 text-sm font-semibold text-ink-2 hover:text-ink"
                      >
                        <Phone
                          className="h-4 w-4 text-action"
                          aria-hidden="true"
                        />
                        {CTA.call}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <p className="mt-6 text-sm text-muted-ink">
        Exotics and heavily modified paint are {CERAMIC_UPCHARGE.exoticPct}%
        more. Booking holds your spot; we confirm the price after a quick look
        at the paint.
      </p>
    </Section>
  );
};

export default CoatPackages;
