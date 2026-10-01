import { Section, SectionHeading } from "@/components/site/Section";
import { PRODUCT_LINES, type ProductLine } from "@/data/copy";
import logoSystemX from "@/assets/systemx-logo.png";
import logoGtechniq from "@/assets/brand-gtechniq.png";
import logoMenzerna from "@/assets/brand-menzerna.png";
import logo3m from "@/assets/brand-3m.png";

const LOGOS: Partial<Record<ProductLine, string>> = {
  systemx: logoSystemX,
  gtechniq: logoGtechniq,
  menzerna: logoMenzerna,
  "3m": logo3m,
};

/** Default set for general detailing pages. */
const DEFAULT_LINES: ProductLine[] = ["systemx", "gtechniq", "menzerna", "3m"];

/**
 * "Products we use" band. One per service page, placed just above the closing CTA.
 * Pass the product lines relevant to that page, most relevant first.
 */
const QualityProducts = ({
  lines = DEFAULT_LINES,
  title = "The products we use",
  intro = "These are the compounds, coatings and film that go on your vehicle. Professional lines from manufacturers who back their products.",
  tone = "surface",
}: {
  lines?: ProductLine[];
  title?: string;
  intro?: string;
  tone?: "canvas" | "surface";
}) => {
  const cols = lines.length >= 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-3";
  return (
    <Section tone={tone}>
      <SectionHeading title={title} intro={intro} />
      <ul className={`grid gap-x-8 gap-y-10 ${cols}`}>
        {lines.map((key) => {
          const p = PRODUCT_LINES[key];
          const logo = LOGOS[key];
          return (
            <li key={key} className="flex flex-col border-t-2 border-ink pt-6">
              <div className="flex h-10 items-center">
                {logo ? (
                  <img src={logo} alt={p.name} loading="lazy" className="max-h-10 w-auto max-w-[160px] object-contain" />
                ) : (
                  <span className="font-heading text-2xl font-semibold tracking-tight text-ink">{p.name}</span>
                )}
              </div>
              <h3 className="mt-5 font-heading text-lg font-semibold text-ink">
                {logo && <span className="sr-only">{p.name}: </span>}
                {p.role}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{p.body}</p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
};

export default QualityProducts;
