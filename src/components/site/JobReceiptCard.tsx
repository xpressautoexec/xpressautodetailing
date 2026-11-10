import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { JobReceipt } from "@/data/receipts";
import Swoosh from "@/components/site/Swoosh";

/** A real job written up like a work order: photo on top, the facts underneath. */
const JobReceiptCard = ({ job }: { job: JobReceipt }) => {
  const rows: [string, string][] = [
    ["Vehicle", job.vehicle],
    ["Work", job.service],
    ...(job.where ? ([["Where", job.where]] as [string, string][]) : []),
    ...(job.products?.length ? ([["Products", job.products.join(", ")]] as [string, string][]) : []),
    ...(job.timeOnJob ? ([["Time on job", job.timeOnJob]] as [string, string][]) : []),
  ];
  return (
    <Link
      to={job.link.href}
      className="group relative flex flex-col overflow-hidden rounded-card border border-line bg-surface transition-colors hover:border-ink-2"
    >
      <img src={job.photo} alt={job.alt} loading="lazy" className="aspect-[4/3] w-full object-cover" />
      <div className="flex flex-1 flex-col p-5 pb-9">
        <p className="eyebrow">Job receipt</p>
        <dl className="mt-3 divide-y divide-dashed divide-line border-y border-dashed border-line text-sm">
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 py-2.5">
              <dt className="shrink-0 text-muted-ink">{k}</dt>
              <dd className="text-right font-semibold text-ink">{v}</dd>
            </div>
          ))}
        </dl>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-electric">
          {job.link.label}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
      <Swoosh variant="card-accent" />
    </Link>
  );
};

export default JobReceiptCard;
