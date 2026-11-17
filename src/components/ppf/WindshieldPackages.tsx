import { useState } from "react";
import { ArrowRight, Check, Phone } from "lucide-react";
import {
  WINDSHIELD_PPF,
  WINDSHIELD_FILMS,
  WINDSHIELD_ULTRA_UPGRADE,
  fielddUrl,
  money,
} from "@/data/pricing";
import gt3Logo from "@/assets/exoshield-gt3plus-red.svg";
import ultraLogo from "@/assets/exoshield-ultra-red.svg";

const TEL = "tel:+15875004523";
type SizeId = (typeof WINDSHIELD_PPF)[number]["id"];

const SHORT: Record<SizeId, string> = {
  compact: "Sedan",
  midsize: "SUV",
  fullsize: "Truck",
  heavy: "HD / Van / RV",
};
/** Bigger, flatter glass takes harder hits, so trucks and HD units default to ULTRA. */
const RECOMMENDED: Record<SizeId, "gt3" | "ultra"> = {
  compact: "gt3",
  midsize: "gt3",
  fullsize: "ultra",
  heavy: "ultra",
};
const LOGO = {
  gt3: { src: gt3Logo, cls: "h-10" },
  ultra: { src: ultraLogo, cls: "h-5 my-2.5" },
} as const;

/** Windshield film packages: pick a size, compare GT3+ and ULTRA, book. */
const WindshieldPackages = () => {
  const [size, setSize] = useState<SizeId>("compact");
  const tier = WINDSHIELD_PPF.find((t) => t.id === size)!;

  return (
    <div>
      <div
        role="group"
        aria-label="Vehicle size"
        className="flex w-full gap-1 rounded-full border border-line bg-surface p-1 sm:w-fit"
      >
        {WINDSHIELD_PPF.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setSize(t.id)}
            aria-pressed={size === t.id}
            className={`flex-1 rounded-full px-3 py-2.5 text-xs font-semibold transition-colors sm:flex-none sm:px-5 sm:text-sm ${
              size === t.id
                ? "bg-ink text-primary-foreground"
                : "text-ink-2 hover:text-ink"
            }`}
          >
            {SHORT[t.id]}
          </button>
        ))}
      </div>
      <p className="mt-3 text-sm text-muted-ink">
        {tier.label}: {tier.examples}
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {WINDSHIELD_FILMS.map((f) => {
          const rec = RECOMMENDED[size] === f.id;
          const price = tier.price + f.upgrade;
          return (
            <article
              key={f.id}
              className={`relative flex flex-col rounded-card bg-surface p-6 sm:p-8 ${
                rec
                  ? "border-2 border-electric shadow-[var(--shadow-card)]"
                  : "border border-line"
              }`}
            >
              {rec && (
                <span className="absolute -top-3 left-6 rounded-full bg-electric px-3 py-1 text-[11px] font-semibold uppercase tracking-label text-primary-foreground sm:left-8">
                  Recommended for {SHORT[size].toLowerCase()}s
                </span>
              )}
              <div className="flex items-center justify-between gap-4">
                <h3>
                  <span className="sr-only">{f.name}</span>
                  <img
                    src={LOGO[f.id].src}
                    alt=""
                    aria-hidden="true"
                    className={`w-auto ${LOGO[f.id].cls}`}
                  />
                </h3>
                <span className="text-xs font-semibold uppercase tracking-label text-muted-ink">
                  {f.tag}
                </span>
              </div>
              <p className="mt-3 text-[15px] text-ink-2">{f.bestFor}</p>

              <div className="mt-6 flex items-end gap-2">
                <span className="num text-6xl leading-none text-ink">
                  {money(price)}
                </span>
                <span className="pb-1 text-sm font-semibold text-muted-ink">
                  CAD
                </span>
              </div>
              <p className="mt-2 text-sm text-ink-2">
                Installed at your home or work · {tier.installTime}
              </p>

              <ul className="mt-6 flex-1 space-y-2.5 border-t border-line pt-6">
                {f.highlights.map((h) => (
                  <li key={h} className="flex gap-2.5 text-[15px] text-ink">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-electric"
                      aria-hidden="true"
                    />
                    {h}
                  </li>
                ))}
              </ul>

              <a
                href={fielddUrl(tier.book)}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-8 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full px-6 text-[15px] font-semibold transition-colors ${
                  rec
                    ? "bg-action text-primary-foreground hover:bg-ink"
                    : "border-2 border-ink/15 text-ink hover:border-ink"
                }`}
              >
                Book {f.id === "gt3" ? "GT3+" : "ULTRA"} · {money(price)}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <p className="mt-2 h-4 text-center text-xs text-muted-ink">
                {f.upgrade
                  ? `Pick your size, then add the ULTRA upgrade (+${money(WINDSHIELD_ULTRA_UPGRADE)}) at checkout`
                  : ""}
              </p>
            </article>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col gap-3 text-sm text-ink-2 sm:flex-row sm:items-center sm:justify-between">
        <p>
          Heated, panoramic and oversized glass may carry a small surcharge,
          confirmed before we start.
        </p>
        <a
          href={TEL}
          className="inline-flex shrink-0 items-center gap-2 font-semibold text-ink hover:text-electric"
        >
          <Phone className="h-4 w-4 text-action" aria-hidden="true" />
          Not sure which? Call or text
        </a>
      </div>
    </div>
  );
};

export default WindshieldPackages;
