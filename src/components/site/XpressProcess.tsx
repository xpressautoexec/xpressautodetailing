import { XPRESS_PROCESS } from "@/data/brand";
import { Section, SectionHeading } from "@/components/site/Section";

type Detail = { title: string; body: string };

/**
 * The Xpress Process, 01–06, on every service page. `details` keeps the page's own
 * service-specific steps (existing copy) underneath.
 */
const XpressProcess = ({
  service,
  details,
  detailsTitle,
  tone = "surface",
}: {
  /** e.g. "paint protection film" — used in the subhead. */
  service: string;
  details?: Detail[];
  detailsTitle?: string;
  tone?: "canvas" | "surface";
}) => (
  <Section tone={tone}>
    <SectionHeading
      eyebrow="The Xpress Process"
      title="Six steps, every job."
      intro={`The same sequence on every ${service} job, so the result doesn't depend on who shows up.`}
    />
    <ol className="grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">
      {XPRESS_PROCESS.map((s, i) => (
        <li key={s.title} className="border-b border-line py-6 sm:pr-8 lg:py-8">
          <span className="num text-sm text-electric">{String(i + 1).padStart(2, "0")}</span>
          <p className="mt-2 font-heading text-2xl font-bold text-ink">{s.title}</p>
          <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-ink-2">{s.body}</p>
        </li>
      ))}
    </ol>
    {details && details.length > 0 && (
      <div className="mt-12">
        <h3 className="font-heading text-xl font-bold text-ink">{detailsTitle ?? "On this service"}</h3>
        <dl className="mt-5 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {details.map((d) => (
            <div key={d.title} className="border-t-2 border-ink pt-4">
              <dt className="font-semibold text-ink">{d.title}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-ink-2">{d.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    )}
  </Section>
);

export default XpressProcess;
