import { Link } from "react-router-dom";
import { Check, ShieldCheck, X } from "lucide-react";
import { MANUFACTURER_WARRANTIES } from "@/data/brand";
import exoshieldLockup from "@/assets/brand-exoshield-lockup.svg";
import carproLogo from "@/assets/carpro/logo-carpro.png";

type Brand = keyof typeof MANUFACTURER_WARRANTIES;

/**
 * Highlighted manufacturer warranty band. `full` adds conditions, exclusions and the claim process
 * (used on /warranty); the compact version links there.
 */
const ManufacturerWarranty = ({
  brand,
  full = false,
}: {
  brand: Brand;
  full?: boolean;
}) => {
  const w = MANUFACTURER_WARRANTIES[brand];
  const logo = brand === "exoshield" ? exoshieldLockup : carproLogo;
  return (
    <article className="overflow-hidden rounded-card border-2 border-electric bg-surface">
      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-electric/10">
              <ShieldCheck
                className="h-6 w-6 text-electric"
                aria-hidden="true"
              />
            </span>
            <img
              src={logo}
              alt={w.brand}
              className="h-7 w-auto max-w-[180px] object-contain"
              loading="lazy"
            />
          </div>
          <h3 className="mt-5 font-heading text-3xl font-bold leading-tight text-ink">
            {w.title}
          </h3>
          {"terms" in w ? (
            <dl className="mt-5 divide-y divide-line border-y border-line">
              {w.terms.map((t) => (
                <div
                  key={t.product}
                  className="flex items-baseline justify-between gap-4 py-3"
                >
                  <dt className="text-[15px] font-semibold text-ink">
                    {t.product}
                  </dt>
                  <dd className="num shrink-0 text-2xl text-ink">{t.term}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="num mt-3 text-5xl text-ink">{w.term}</p>
          )}
          <p className="mt-5 text-[15px] leading-relaxed text-ink-2">
            {w.summary}
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-label text-muted-ink">
              Covered
            </p>
            <ul className="mt-3 space-y-2">
              {w.covers.map((c) => (
                <li key={c} className="flex gap-2.5 text-[15px] text-ink">
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-electric"
                    aria-hidden="true"
                  />
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-label text-muted-ink">
              Included
            </p>
            <ul className="mt-3 space-y-2">
              {w.perks.map((c) => (
                <li key={c} className="flex gap-2.5 text-[15px] text-ink">
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-electric"
                    aria-hidden="true"
                  />
                  {c}
                </li>
              ))}
            </ul>
          </div>
          {full && "conditions" in w && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-label text-muted-ink">
                Keep it valid
              </p>
              <ul className="mt-3 space-y-2">
                {w.conditions.map((c) => (
                  <li key={c} className="flex gap-2.5 text-sm text-ink-2">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-electric"
                      aria-hidden="true"
                    />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {full && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-label text-muted-ink">
                Not covered
              </p>
              <ul className="mt-3 space-y-2">
                {w.excludes.map((c) => (
                  <li key={c} className="flex gap-2.5 text-sm text-ink-2">
                    <X
                      className="mt-0.5 h-4 w-4 shrink-0 text-muted-ink"
                      aria-hidden="true"
                    />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2 border-t border-line bg-tint px-6 py-4 text-sm text-ink-2 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          {full ? (
            <>
              <span className="font-semibold text-ink">Making a claim: </span>
              {w.claim}
            </>
          ) : (
            "Manufacturer terms and conditions apply."
          )}
        </p>
        {full ? (
          <a
            href={w.source}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 font-semibold text-electric hover:underline hover:underline-offset-4"
          >
            {w.brand} warranty
          </a>
        ) : (
          <Link
            to="/warranty"
            className="shrink-0 font-semibold text-electric hover:underline hover:underline-offset-4"
          >
            Full terms and care
          </Link>
        )}
      </div>
    </article>
  );
};

export default ManufacturerWarranty;
