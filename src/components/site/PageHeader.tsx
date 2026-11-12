import type { ReactNode } from "react";

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
      <h1 className="llumar-hero-title is-long max-w-5xl">
        {title}
      </h1>
      {intro && <div className="mt-6 max-w-2xl text-base leading-relaxed text-ink-2 sm:text-lg">{intro}</div>}
      {actions && <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">{actions}</div>}
      {children}
    </div>
  </header>
);

export default PageHeader;
