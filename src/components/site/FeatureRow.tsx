import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/** LLumar "Experience our premier auto tint" row: rounded photo one side, giant heading + copy + pill the other. */
const FeatureRow = ({
  title,
  children,
  image,
  imageAlt = "",
  cta,
  flip = false,
  rule = false,
  tone = "canvas",
}: {
  title: string;
  children: ReactNode;
  image: string;
  imageAlt?: string;
  cta: { label: string; href: string };
  flip?: boolean;
  /** Blue rule under the heading (LLumar "Architectural window film" row). */
  rule?: boolean;
  tone?: "canvas" | "surface";
}) => (
  <section className={`section-y ${tone === "surface" ? "bg-tint" : "bg-canvas"}`}>
    <div className="shell grid items-center gap-10 lg:grid-cols-2 lg:gap-24">
      <div className={`overflow-hidden rounded-[16px] bg-tint ${flip ? "lg:order-2" : ""}`}>
        <img src={image} alt={imageAlt} loading="lazy" className="aspect-[4/3] h-full w-full object-cover" />
      </div>
      <div>
        <h2 className={`display-xl !text-[clamp(32px,3.6vw,56px)] ${rule ? "heading-rule" : ""}`}>{title}</h2>
        <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-2">{children}</div>
        <Link
          to={cta.href}
          className="pill-action mt-10 inline-flex items-center gap-2 bg-action text-primary-foreground transition-colors hover:bg-ink"
        >
          {cta.label}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  </section>
);

export default FeatureRow;
