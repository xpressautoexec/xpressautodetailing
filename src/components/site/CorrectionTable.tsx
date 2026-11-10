import { SYSTEMS } from "@/data/brand";
import { Section, SectionHeading } from "@/components/site/Section";

const STAGES = [
  {
    name: "Stage 1 Enhancement",
    removes: "Light wash swirls, haze and dullness",
    typical: "50–70%",
    best: "Newer or well-kept paint, and before a 1-year coating",
  },
  {
    name: "Stage 2 Correction",
    removes: "Moderate swirls, light scratches, water-spot etching",
    typical: "85–95%",
    best: "Daily drivers with visible swirls in the sun, and before a multi-year coating",
  },
  {
    name: "Stage 3 Refinement",
    removes: "Deeper defects, sanding marks and stubborn etching",
    typical: "95%+",
    best: "Dark paint, show cars and long-term keepers",
  },
];

const ROWS: { label: string; key: "removes" | "typical" | "best" }[] = [
  { label: "What it removes", key: "removes" },
  { label: "Typical defect removal", key: "typical" },
  { label: "Best for", key: "best" },
];
// TODO: add a "Time on vehicle" row once stage times are confirmed.

/** Xpress Correct™ stage comparison. */
const CorrectionTable = ({ tone = "canvas" }: { tone?: "canvas" | "surface" }) => (
  <Section tone={tone} id="correction-stages">
    <SectionHeading
      eyebrow={SYSTEMS.correct.tm}
      title="Three stages of correction."
      intro="Paint correction in Calgary, matched to what the clear coat can safely give."
    />
    <div className="overflow-x-auto rounded-card border border-line bg-surface">
      <table className="w-full min-w-[640px] text-left text-[15px]">
        <caption className="sr-only">Paint correction stages compared</caption>
        <thead>
          <tr className="border-b border-line bg-tint">
            <th scope="col" className="w-44 px-5 py-4" />
            {STAGES.map((s, i) => (
              <th key={s.name} scope="col" className="px-5 py-4 align-bottom">
                <span className="num block text-sm text-electric">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-heading text-xl font-bold text-ink">{s.name}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((r) => (
            <tr key={r.key} className="border-b border-line last:border-b-0">
              <th scope="row" className="px-5 py-4 align-top text-sm font-medium text-muted-ink">{r.label}</th>
              {STAGES.map((s) => (
                <td key={s.name} className={`px-5 py-4 align-top ${r.key === "typical" ? "num text-2xl text-ink" : "text-ink-2"}`}>
                  {s[r.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="mt-4 text-sm text-muted-ink">Typical ranges. Your exact result is confirmed under inspection lighting before we start.</p>
  </Section>
);

export default CorrectionTable;
