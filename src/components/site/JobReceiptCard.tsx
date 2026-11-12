import { ArrowUpRight, Images } from "lucide-react";
import { JOB_CATEGORIES, jobPhotoUrl, type JobRecord } from "@/data/jobs";
import { money } from "@/data/pricing";
import BeforeAfter from "@/components/site/BeforeAfter";
import type { LightboxItem } from "@/components/site/Lightbox";

const categoryLabel = (c: JobRecord["category"]) => JOB_CATEGORIES.find((x) => x.id === c)?.label ?? c;

/** The job's photos as lightbox items (before photo first when there is one). */
export const jobLightboxItems = (job: JobRecord): LightboxItem[] => {
  const detail = [job.package_name, job.city].filter(Boolean).join(" · ");
  const items: LightboxItem[] = [];
  const before = jobPhotoUrl(job.photo_before);
  if (before) items.push({ src: before, alt: `Before: ${job.vehicle}`, caption: `${job.vehicle} — before`, detail });
  job.photos.forEach((p, i) => {
    const src = jobPhotoUrl(p);
    if (src) items.push({ src, alt: job.photo_alts[i] || job.vehicle, caption: job.vehicle, detail: job.photo_alts[i] || detail });
  });
  return items;
};

/**
 * A real job written up like a work order. Every card has the same rows in the same order;
 * rows without data (price, time on site, crew, location) are left out rather than faked.
 * `cover` swaps the card photo (asset path or URL) without changing the job's photo list.
 */
const JobReceiptCard = ({ job, onOpen, cover, index }: { job: JobRecord; onOpen?: () => void; cover?: string; index?: number }) => {
  const after = jobPhotoUrl(cover) ?? job.photos.map(jobPhotoUrl).find(Boolean) ?? null;
  const before = jobPhotoUrl(job.photo_before);
  const coverIdx = cover ? job.photos.indexOf(cover) : 0;
  const alt = job.photo_alts[coverIdx >= 0 ? coverIdx : 0] || job.vehicle;
  const photoCount = job.photos.filter((p) => jobPhotoUrl(p)).length + (before ? 1 : 0);

  const rows: [string, string][] = [["Service", job.package_name]];
  if (job.city) rows.push(["Location", job.city]);
  if (job.time_on_site) rows.push(["Time on site", job.time_on_site]);
  if (job.crew?.length) rows.push(["Crew", job.crew.join(", ")]);
  const hasPrice = job.price_paid !== null && job.price_paid !== undefined;

  return (
    <article className="group/card flex h-full flex-col overflow-hidden rounded-[18px] border border-line bg-surface transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-24px_hsl(var(--ink)/0.35)]">
      <div className="relative">
        {before && after ? (
          <BeforeAfter before={before} after={after} alt={alt} />
        ) : (
          after && (
            <button
              type="button"
              onClick={onOpen}
              disabled={!onOpen}
              aria-label={`View ${photoCount} photos of the ${job.vehicle}`}
              className="block w-full overflow-hidden bg-tint"
            >
              <img
                src={after}
                alt={alt}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-[1.05]"
              />
            </button>
          )
        )}
        <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-surface/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-label text-ink">
          {categoryLabel(job.category)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-baseline justify-between gap-3">
          <p className="eyebrow">Job receipt</p>
          {index !== undefined && <span className="num text-xs text-muted-ink">No. {String(index + 1).padStart(2, "0")}</span>}
        </div>
        <h3 className="mt-2 font-heading text-[22px] font-bold leading-tight text-ink">{job.vehicle}</h3>

        <dl className="mt-5 border-t border-dashed border-line text-sm">
          {rows.map(([k, v]) => (
            <div key={k} className="grid grid-cols-[6.5rem_1fr] gap-3 border-b border-dashed border-line py-2.5">
              <dt className="text-muted-ink">{k}</dt>
              <dd className="text-right font-semibold text-ink">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          {hasPrice ? (
            <span className="flex items-baseline gap-2">
              <span className="text-xs font-semibold uppercase tracking-label text-muted-ink">Paid</span>
              <span className="num text-2xl leading-none text-ink">{money(Number(job.price_paid))}</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-sm text-muted-ink">
              <Images className="h-4 w-4" aria-hidden="true" />
              {photoCount} photo{photoCount === 1 ? "" : "s"}
            </span>
          )}
          {onOpen && photoCount > 0 && (
            <button
              type="button"
              onClick={onOpen}
              className="inline-flex items-center gap-1 text-sm font-semibold text-action transition-colors hover:text-ink"
            >
              View photos
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default JobReceiptCard;
