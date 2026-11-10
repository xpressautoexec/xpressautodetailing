import JobReceipts from "@/components/site/JobReceipts";
import { useJobs } from "@/hooks/useJobs";
import { LpHeading } from "@/components/lp/LpBlocks";

/** Specific job receipts by slug (from the jobs table), in the order given. */
const LpReceipts = ({ slugs, title, intro }: { slugs: string[]; title: string; intro?: string }) => {
  const { data = [] } = useJobs();
  const jobs = slugs.map((s) => data.find((j) => j.slug === s)).filter((j): j is NonNullable<typeof j> => !!j);
  if (!jobs.length) return null;
  return (
    <section className="section-y bg-surface">
      <div className="shell">
        <LpHeading eyebrow="Job receipts" title={title} intro={intro} />
        <JobReceipts jobs={jobs} />
      </div>
    </section>
  );
};

export default LpReceipts;
