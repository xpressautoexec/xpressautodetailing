import type { ReactNode } from "react";
import Swoosh from "@/components/site/Swoosh";

/**
 * Text-only page header (no photo): reviews, comparisons, articles.
 * White, big condensed headline, swoosh along the bottom edge.
 */
const PageHeader = ({
  title,
  intro,
  eyebrow,
  actions,
  children,
  narrow = false,
}: {
  title: ReactNode;
  intro?: ReactNode;
  eyebrow?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
  /** Reading width, for articles. */
  narrow?: boolean;
}) => (
  <header className="relative isolate overflow-hidden border-b border-line bg-surface">
    <div className={`shell pb-24 pt-14 sm:pb-32 sm:pt-20 ${narrow ? "max-w-3xl" : ""}`}>
      {eyebrow && <div className="mb-5">{eyebrow}</div>}
      <h1 className="max-w-4xl font-heading text-[2.6rem] font-extrabold leading-[0.98] tracking-display text-ink sm:text-6xl">
        {title}
      </h1>
      {intro && <div className="mt-6 max-w-2xl text-base leading-relaxed text-ink-2 sm:text-lg">{intro}</div>}
      {actions && <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">{actions}</div>}
      {children}
    </div>
    <Swoosh variant="hero-edge" />
  </header>
);

export default PageHeader;
