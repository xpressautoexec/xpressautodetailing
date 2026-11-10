import { Expand } from "lucide-react";
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
 * A real job written up like a work order. Only filled-in fields are shown, so the card never
 * displays a placeholder. With a before photo it becomes a drag slider.
 */
const JobReceiptCard = ({ job, onOpen }: { job: JobRecord; onOpen?: () => void }) => {
  const after = job.photos.map(jobPhotoUrl).find(Boolean) ?? null;
  const before = jobPhotoUrl(job.photo_before);
  const alt = job.photo_alts[0] || job.vehicle;
  const photoCount = job.photos.filter((p) => jobPhotoUrl(p)).length + (before ? 1 : 0);

  const rows: [string, string][] = [];
  if (job.time_on_site) rows.push(["Time on site", job.time_on_site]);
  if (job.city) rows.push(["Location", job.city]);
  if (job.crew?.length) rows.push(["Crew", job.crew.join(", ")]);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface">
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
              className="group block w-full overflow-hidden bg-tint"
            >
              <img
                src={after}
                alt={alt}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </button>
          )
        )}
        <span className="pointer-events-none absolute bottom-3 left-3 rounded-sm bg-surface px-2 py-1 text-[11px] font-semibold uppercase tracking-label text-ink">
          {categoryLabel(job.category)}
        </span>
        {onOpen && photoCount > 1 && (
          <button
            type="button"
            onClick={onOpen}
            className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-sm bg-charcoal/85 px-2 py-1 text-[11px] font-semibold text-primary-foreground transition-colors hover:bg-charcoal"
          >
            <Expand className="h-3 w-3" aria-hidden="true" />
            {photoCount} photos
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="eyebrow">Job receipt</p>
        <h3 className="mt-2 font-heading text-2xl font-bold leading-tight text-ink">{job.vehicle}</h3>
        <p className="mt-1 text-sm text-ink-2">{job.package_name}</p>

        {rows.length > 0 && (
          <dl className="mt-5 border-t border-dashed border-line text-sm">
            {rows.map(([k, v]) => (
              <div key={k} className="flex items-baseline gap-3 border-b border-dashed border-line py-2.5">
                <dt className="shrink-0 text-muted-ink">{k}</dt>
                <dd className="ml-auto text-right font-semibold text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        )}

        {job.price_paid !== null && job.price_paid !== undefined && (
          <div className="mt-auto flex items-baseline justify-between pt-5">
            <span className="text-xs font-semibold uppercase tracking-label text-muted-ink">Paid</span>
            <span className="num text-3xl leading-none text-ink">{money(Number(job.price_paid))}</span>
          </div>
        )}
      </div>
    </article>
  );
};

export default JobReceiptCard;
