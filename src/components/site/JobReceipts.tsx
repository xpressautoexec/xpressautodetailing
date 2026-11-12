import { useMemo, useState } from "react";
import type { JobRecord } from "@/data/jobs";
import JobReceiptCard, { jobLightboxItems } from "@/components/site/JobReceiptCard";
import Lightbox from "@/components/site/Lightbox";
import ScrollRail from "@/components/site/ScrollRail";

/** Receipt cards with a shared full-screen viewer for each job's photos. */
const JobReceipts = ({
  jobs,
  layout = "grid",
  covers,
  numbered = false,
}: {
  jobs: JobRecord[];
  layout?: "grid" | "rail";
  /** Card photo per job slug, when a different shot reads better at card size. */
  covers?: Record<string, string>;
  numbered?: boolean;
}) => {
  const [open, setOpen] = useState<{ slug: string; i: number } | null>(null);
  const active = useMemo(() => jobs.find((j) => j.slug === open?.slug), [jobs, open]);
  const items = useMemo(() => (active ? jobLightboxItems(active) : []), [active]);

  const cards = jobs.map((job, i) => (
    <JobReceiptCard
      key={job.slug}
      job={job}
      cover={covers?.[job.slug]}
      index={numbered ? i : undefined}
      onOpen={() => setOpen({ slug: job.slug, i: 0 })}
    />
  ));

  return (
    <>
      {layout === "rail" ? (
        <ScrollRail label="Job receipts" meta={`${jobs.length} job${jobs.length === 1 ? "" : "s"}`}>
          {cards}
        </ScrollRail>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{cards}</div>
      )}
      <Lightbox
        items={items}
        index={open ? open.i : null}
        onIndex={(i) => setOpen(i === null || !open ? null : { slug: open.slug, i })}
        label={active ? `${active.vehicle} photos` : "Job photos"}
      />
    </>
  );
};

export default JobReceipts;
