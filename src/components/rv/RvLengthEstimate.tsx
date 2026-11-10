import { useId, useState } from "react";
import { RV_BUNDLES, RV_SERVICES, money } from "@/data/pricing";
import { SYSTEMS } from "@/data/brand";

const MIN = 12;
const MAX = 45;
/** Interior runs about one hour per 10 ft of unit (owner's job-time rule). */
const INTERIOR_HRS_PER_FT = 1 / 10;

/** Display name: the Full Restoration Package is Xpress Restore™. */
export const rvBundleName = (b: { id: string; name: string }) => (b.id === "fullrestore" ? `${SYSTEMS.restore.tm}` : b.name);

/**
 * Type a length, see every RV service and package priced for it. Fixed per-foot work shows the
 * estimate; work that depends on condition shows "From". All confirmed after a free assessment.
 */
const RvLengthEstimate = () => {
  const id = useId();
  const [ft, setFt] = useState(30);
  const len = Math.min(MAX, Math.max(MIN, Number.isFinite(ft) ? ft : 30));

  const rows = [
    ...RV_BUNDLES.map((b) => ({
      key: b.id,
      name: rvBundleName(b),
      sub: b.id === "fullrestore" ? `${b.name}: ${b.includes.join(" + ")}` : b.includes.join(" + "),
      value: b.price * len,
      from: !!b.assessment,
      rate: `${money(b.price)}/ft`,
      emphasis: b.popular,
    })),
    ...RV_SERVICES.filter((s) => s.unit === "/ft").map((s) => ({
      key: s.id,
      name: s.name,
      sub: "",
      value: s.price * len,
      from: !!s.assessment,
      rate: `${money(s.price)}/ft`,
      emphasis: false,
    })),
    ...RV_SERVICES.filter((s) => s.unit === "/hr").map((s) => ({
      key: s.id,
      name: s.name,
      sub: `About ${Math.max(1, Math.round(len * INTERIOR_HRS_PER_FT * 2) / 2)} hrs at ${money(s.price)}/hr`,
      value: s.price * Math.max(1, Math.round(len * INTERIOR_HRS_PER_FT * 2) / 2),
      from: false,
      rate: `${money(s.price)}/hr`,
      emphasis: false,
    })),
  ];

  return (
    <div className="rounded-card border border-line bg-surface">
      <div className="flex flex-col gap-4 border-b border-line p-6 sm:flex-row sm:items-end sm:justify-between sm:p-7">
        <label htmlFor={id} className="block">
          <span className="text-sm font-medium text-ink-2">RV length (ft)</span>
          <span className="mt-1.5 flex items-center gap-3">
            <input
              id={id}
              type="number"
              inputMode="numeric"
              min={MIN}
              max={MAX}
              value={ft}
              onChange={(e) => setFt(parseInt(e.target.value || "0", 10))}
              className="num h-14 w-28 rounded-md border border-line bg-surface px-3 text-3xl text-ink outline-none focus:border-electric focus:ring-2 focus:ring-electric/20"
            />
            <input
              type="range"
              aria-label="RV length slider"
              min={MIN}
              max={MAX}
              value={len}
              onChange={(e) => setFt(parseInt(e.target.value, 10))}
              className="w-40 accent-[hsl(var(--electric))] sm:w-56"
            />
          </span>
        </label>
        <p className="max-w-xs text-xs leading-relaxed text-muted-ink">Estimate — confirmed in writing after a free assessment.</p>
      </div>
      <ul>
        {rows.map((r) => (
          <li key={r.key} className={`flex items-baseline justify-between gap-4 border-b border-line px-6 py-4 last:border-b-0 sm:px-7 ${r.emphasis ? "bg-electric-soft/60" : ""}`}>
            <span>
              <span className="font-semibold text-ink">{r.name}</span>
              {r.emphasis && <span className="ml-2 text-[11px] font-semibold uppercase tracking-label text-electric">Most chosen</span>}
              <span className="block text-xs text-muted-ink">{r.sub ? `${r.sub} · ` : ""}{r.rate}</span>
            </span>
            <span className="num shrink-0 text-right text-2xl text-ink">
              {r.from && <span className="mr-1 font-body text-xs font-semibold uppercase text-muted-ink">From</span>}
              {money(r.value)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RvLengthEstimate;
