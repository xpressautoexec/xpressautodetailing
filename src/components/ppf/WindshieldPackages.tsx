import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Phone } from "lucide-react";
import { WINDSHIELD_PPF, WINDSHIELD_FILMS, RV_WINDSHIELD_ULTRA, fielddUrl, money, MOBILE_FEE } from "@/data/pricing";
import gt3Logo from "@/assets/exoshield-gt3plus-red.svg";
import ultraLogo from "@/assets/exoshield-ultra-white.svg";

const TEL = "tel:+15875004523";
type SizeId = (typeof WINDSHIELD_PPF)[number]["id"];

const SHORT: Record<SizeId, string> = {
  compact: "Sedan",
  midsize: "SUV",
  fullsize: "Truck",
};
const GT3 = WINDSHIELD_FILMS.find((f) => f.id === "gt3")!;
const ultraFrom = Math.min(...RV_WINDSHIELD_ULTRA.flatMap((t) => (t.price ? [t.price] : [])));

/** Automotive windshield film: GT3+ by vehicle size. RVs, vans and heavy-duty go to ULTRA on the RV page. */
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
            className={`flex-1 rounded-full px-3 py-2.5 text-xs font-semibold transition-colors sm:flex-none sm:px-6 sm:text-sm ${
              size === t.id ? "bg-ink text-primary-foreground" : "text-ink-2 hover:text-ink"
            }`}
          >
            {SHORT[t.id]}
          </button>
        ))}
      </div>
      <p className="mt-3 text-sm text-muted-ink">
        {tier.label}: {tier.examples}
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-[1.35fr_1fr]">
        <article className="relative flex flex-col rounded-card border-2 border-electric bg-surface p-6 shadow-[var(--shadow-card)] sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <h3>
              <span className="sr-only">{GT3.name}</span>
              <img src={gt3Logo} alt="" aria-hidden="true" className="h-10 w-auto" />
            </h3>
            <span className="text-xs font-semibold uppercase tracking-label text-muted-ink">For cars, SUVs and trucks</span>
          </div>
          <p className="mt-3 text-[15px] text-ink-2">{GT3.body}</p>

          <div className="mt-6 flex items-end gap-2">
            <span className="num text-6xl leading-none text-ink">{money(tier.price)}</span>
            <span className="pb-1 text-sm font-semibold text-muted-ink">CAD</span>
          </div>
          <p className="mt-2 text-sm text-ink-2">Installed at your home or work · {tier.installTime}</p>

          <ul className="mt-6 flex-1 space-y-2.5 border-t border-line pt-6">
            {GT3.highlights.map((h) => (
              <li key={h} className="flex gap-2.5 text-[15px] text-ink">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-electric" aria-hidden="true" />
                {h}
              </li>
            ))}
          </ul>

          <a
            href={fielddUrl(tier.book)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-action px-6 text-[15px] font-semibold text-primary-foreground transition-colors hover:bg-ink"
          >
            Book GT3+ · {money(tier.price)}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </article>

        <Link
          to="/rv-trailer/ppf#windshield"
          className="group flex flex-col rounded-card bg-ink p-6 text-primary-foreground transition-colors hover:bg-ink/90 sm:p-8"
        >
          <span className="text-xs font-semibold uppercase tracking-label text-primary-foreground/70">
            RV, van or heavy-duty?
          </span>
          <img src={ultraLogo} alt="ExoShield ULTRA" className="mt-5 h-5 w-auto self-start" />
          <p className="mt-5 text-[15px] leading-relaxed text-primary-foreground/85">
            Motorhomes, vans, HD trucks and equipment get ExoShield ULTRA: 8 mil, 60% thicker than GT3+, built
            for big upright glass where rocks hit hardest.
          </p>
          <p className="mt-6 text-sm text-primary-foreground/70">From</p>
          <p className="num text-4xl leading-none">
            {money(ultraFrom)} <span className="text-sm font-semibold text-primary-foreground/70">CAD</span>
          </p>
          <span className="mt-auto inline-flex items-center gap-2 pt-8 text-[15px] font-semibold">
            See ULTRA pricing
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </Link>
      </div>

      <div className="mt-6 flex flex-col gap-3 text-sm text-ink-2 sm:flex-row sm:items-center sm:justify-between">
        <p>Heated, panoramic and oversized glass may carry a small surcharge, confirmed before we start. Mobile installs add a {money(MOBILE_FEE)} mobile service fee.</p>
        <a href={TEL} className="inline-flex shrink-0 items-center gap-2 font-semibold text-ink hover:text-electric">
          <Phone className="h-4 w-4 text-action" aria-hidden="true" />
          Not sure which? Call or text
        </a>
      </div>
    </div>
  );
};

export default WindshieldPackages;
