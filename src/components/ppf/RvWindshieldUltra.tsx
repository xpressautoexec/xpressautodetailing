import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check, Phone, ShieldCheck } from "lucide-react";
import {
  RV_WINDSHIELD_ULTRA,
  RV_WINDSHIELD_REPLACEMENT_COSTS,
  HEAVY_DUTY_ULTRA,
  fielddUrl,
  money,
} from "@/data/pricing";
import { MANUFACTURER_WARRANTIES } from "@/data/brand";
import { TEL_HREF } from "@/components/site/QuoteLink";
import ultraRed from "@/assets/exoshield-ultra-red.svg";
import ultraWhite from "@/assets/exoshield-ultra-white.svg";
import motorhomeFront from "@/assets/jobs/rv-newmar-front-bay.webp";

const ultraFrom = Math.min(...RV_WINDSHIELD_ULTRA.flatMap((t) => (t.price ? [t.price] : [])));
const SPECS = ["8 mil PET, 60% thicker than GT3+", "Optically clear, wiper-safe hardcoat", "3-year ExoShield limited warranty, registered by us"];

/** Price cell shared by the tier cards. */
const Price = ({ price, from, unit }: { price: number | null; from?: boolean; unit?: string }) =>
  price ? (
    <div className="mt-4">
      <p className="flex items-end gap-1.5">
        {from && <span className="pb-1 text-sm font-semibold text-muted-ink">From</span>}
        <span className="num text-5xl leading-none text-ink">{money(price)}</span>
        <span className="pb-1 text-sm font-semibold text-muted-ink">CAD</span>
      </p>
      {unit && <p className="mt-1 text-sm text-muted-ink">{unit}</p>}
    </div>
  ) : (
    <p className="mt-4 font-heading text-3xl font-bold leading-none text-ink">Quoted</p>
  );

/**
 * ExoShield ULTRA windshield film for RVs and heavy-duty work. GT3+ stays on the automotive pages.
 * - "full": tiers, cited replacement costs and how we price it (/rv-trailer/ppf#windshield)
 * - "band": compact dark highlight linking to the full section (other RV pages)
 * - "fleet": heavy-duty tiers for /fleet
 */
const RvWindshieldUltra = ({
  variant = "full",
  quoteHref = "#assessment",
}: {
  variant?: "full" | "band" | "fleet";
  quoteHref?: string;
}) => {
  if (variant === "band") {
    return (
      <section aria-label="ExoShield ULTRA windshield film for RVs" className="bg-charcoal section-y">
        <div className="shell grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
          <div>
            <p className="eyebrow mb-4 !text-electric">Windshield protection</p>
            <img src={ultraWhite} alt="ExoShield ULTRA" className="h-6 w-auto" />
            <h2 className="mt-6 max-w-xl font-heading text-4xl font-extrabold leading-[1.02] tracking-display text-primary-foreground sm:text-5xl">
              Protect the windshield before the next trip.
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-primary-foreground/70">
              Motorhome glass is huge, slow to source in Canada and expensive to replace. ExoShield ULTRA is the
              thickest windshield film ExoShield makes, installed at your storage lot or driveway.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/rv-trailer/ppf#windshield"
                className="inline-flex min-h-[52px] items-center gap-2 rounded-full bg-electric px-7 text-[15px] font-semibold text-primary-foreground transition-colors hover:bg-electric-2"
              >
                See RV windshield pricing
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={TEL_HREF}
                className="inline-flex min-h-[52px] items-center gap-2 rounded-full border-2 border-primary-foreground/25 px-7 text-[15px] font-semibold text-primary-foreground transition-colors hover:border-primary-foreground"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call or text
              </a>
            </div>
          </div>
          <ul className="grid gap-3">
            {RV_WINDSHIELD_ULTRA.map((t) => (
              <li
                key={t.id}
                className="flex items-center justify-between gap-4 rounded-card border border-primary-foreground/15 px-5 py-4"
              >
                <div>
                  <p className="font-heading text-lg font-bold text-primary-foreground">{t.label}</p>
                  <p className="mt-0.5 text-sm text-primary-foreground/60">{t.examples}</p>
                </div>
                <p className="num shrink-0 text-2xl text-primary-foreground">
                  {t.price ? `${t.from ? "From " : ""}${money(t.price)}` : "Quoted"}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  if (variant === "fleet") {
    return (
      <section id="windshield" aria-label="ExoShield ULTRA windshield film for heavy-duty" className="scroll-mt-24 bg-charcoal section-y">
        <div className="shell">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow mb-4 !text-electric">Windshield protection for the fleet</p>
              <img src={ultraWhite} alt="ExoShield ULTRA" className="h-6 w-auto" />
              <h2 className="mt-6 font-heading text-4xl font-extrabold leading-[1.02] tracking-display text-primary-foreground sm:text-5xl">
                Keep trucks and machines working when the gravel flies.
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-primary-foreground/70">
                ExoShield ULTRA is 8 mil windshield film built for big, upright glass. Fewer chips means fewer
                replacements, fewer calibrations and less downtime. Installed on site, between shifts.
              </p>
            </div>
            <a
              href={quoteHref}
              className="inline-flex min-h-[52px] shrink-0 items-center gap-2 self-start rounded-full bg-electric px-7 text-[15px] font-semibold text-primary-foreground transition-colors hover:bg-electric-2 lg:self-auto"
            >
              Get a fleet windshield quote
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {HEAVY_DUTY_ULTRA.map((t) => (
              <article key={t.id} className="flex flex-col rounded-card bg-surface p-6">
                <h3 className="font-heading text-xl font-bold text-ink">{t.label}</h3>
                <p className="mt-1 text-sm text-ink-2">{t.examples}</p>
                <div className="flex-1">
                  <Price price={t.price} from={t.from} unit={t.price ? t.unit : undefined} />
                </div>
                <a
                  href={fielddUrl(t.book)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border-2 border-ink/15 px-5 text-sm font-semibold text-ink transition-colors hover:border-ink"
                >
                  {t.cta}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-sm text-primary-foreground/60">
            Film goes on glass only. Polycarbonate cab panels on forestry and demolition machines are left as they
            are. Fleet rates for several units, and every quote is confirmed before we start.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="windshield" className="scroll-mt-24 bg-canvas section-y">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:gap-16">
          <div>
            <p className="eyebrow mb-4">Motorhome windshield protection</p>
            <img src={ultraRed} alt="ExoShield ULTRA" className="h-6 w-auto" />
            <h2 className="mt-6 font-heading text-4xl font-extrabold leading-[1.02] tracking-display text-ink sm:text-5xl">
              Protect the most expensive glass you own.
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-2">
              A Class A windshield can cost more to replace than a full front-cap PPF job, and the glass often has to
              ship in from the U.S. ExoShield ULTRA is ExoShield's thickest film, made for the big upright glass on
              motorhomes, from {money(ultraFrom)} CAD.
            </p>
            <ul className="mt-6 space-y-2.5">
              {SPECS.map((s) => (
                <li key={s} className="flex gap-2.5 text-[15px] text-ink">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-electric" aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <img
            src={motorhomeFront}
            alt="Newmar Dutch Star motorhome front windshield in the shop"
            width={1050}
            height={1400}
            loading="lazy"
            className="aspect-[4/5] w-full rounded-card object-cover object-[50%_35%] lg:aspect-[4/4.4]"
          />
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {RV_WINDSHIELD_ULTRA.map((t, i) => {
            const featured = i === 0;
            return (
              <article
                key={t.id}
                className={`flex flex-col rounded-card bg-surface p-6 sm:p-8 ${
                  featured ? "border-2 border-electric shadow-[var(--shadow-card)]" : "border border-line"
                }`}
              >
                <h3 className="font-heading text-2xl font-bold leading-tight text-ink">{t.label}</h3>
                <p className="mt-2 text-sm text-ink-2">{t.examples}</p>
                <Price price={t.price} from={t.from} />
                <p className="mt-2 flex-1 text-sm text-ink-2">
                  {t.note} · {t.installTime}
                </p>
                {t.book ? (
                  <a
                    href={fielddUrl(t.book)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-8 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full px-6 text-[15px] font-semibold transition-colors ${
                      featured
                        ? "bg-action text-primary-foreground hover:bg-ink"
                        : "border-2 border-ink/15 text-ink hover:border-ink"
                    }`}
                  >
                    Book ULTRA{t.price ? ` · ${t.from ? "from " : ""}${money(t.price)}` : ""}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                ) : (
                  <a
                    href={quoteHref}
                    className="mt-8 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full border-2 border-ink/15 px-6 text-[15px] font-semibold text-ink transition-colors hover:border-ink"
                  >
                    Send photos for a price
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                )}
              </article>
            );
          })}
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
          <div className="overflow-hidden rounded-card border border-line bg-surface">
            <div className="border-b border-line px-6 py-5">
              <h3 className="font-heading text-xl font-bold text-ink">What a new motorhome windshield costs</h3>
              <p className="mt-1 text-sm text-muted-ink">CAD. US figures converted. Last checked November 2026.</p>
            </div>
            <ul className="text-sm">
              {RV_WINDSHIELD_REPLACEMENT_COSTS.map((c) => (
                <li
                  key={c.what}
                  className="flex flex-col gap-1 border-b border-line px-6 py-4 last:border-b-0 sm:flex-row sm:items-start sm:justify-between sm:gap-6"
                >
                  <div className="text-ink-2">
                    {c.what}
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 flex items-center gap-1 text-xs font-semibold text-electric hover:underline"
                    >
                      {c.source}
                      <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                    </a>
                  </div>
                  <div className="sm:text-right">
                    <span className="num block whitespace-nowrap text-lg text-ink">{c.cad}</span>
                    {c.note && <span className="mt-0.5 block text-xs text-muted-ink">{c.note}</span>}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-5">
            <div className="rounded-card bg-ink p-6 text-primary-foreground sm:p-8">
              <h3 className="font-heading text-xl font-bold">Why we price per windshield</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-primary-foreground/75">
                Windshield size follows the chassis, so length tells us nothing. A 24 ft and a 32 ft Class C on a Ford
                E-450 share the same glass, so they pay the same flat price. You know the number before we arrive.
              </p>
            </div>
            <div className="rounded-card border-2 border-electric bg-surface p-6 sm:p-8">
              <p className="flex items-center gap-2 font-heading text-xl font-bold text-ink">
                <ShieldCheck className="h-5 w-5 text-electric" aria-hidden="true" />
                {MANUFACTURER_WARRANTIES.exoshield.title}
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-2">
                Covers cracking, delamination, hazing and yellowing of the film, with no mileage limit. We register it
                with ExoShield after your install.
              </p>
              <Link to="/warranty" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-electric hover:underline">
                Warranty details
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RvWindshieldUltra;
