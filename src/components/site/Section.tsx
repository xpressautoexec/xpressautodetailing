import type { ReactNode } from "react";

/**
 * Site layout primitives. Every page section should be built from these so spacing,
 * alignment, type and colour stay identical across the site.
 *
 *   <Section tone="surface">
 *     <SectionHeading title="..." intro="..." />
 *     ...
 *   </Section>
 */

type Tone = "canvas" | "surface" | "dark";

const toneClass: Record<Tone, string> = {
  canvas: "bg-canvas",
  surface: "border-y border-line bg-surface",
  dark: "bg-brand-dark",
};

export const Section = ({
  tone = "canvas",
  id,
  narrow = false,
  className = "",
  children,
}: {
  tone?: Tone;
  id?: string;
  /** Constrain to reading width (policy pages, articles, forms). */
  narrow?: boolean;
  className?: string;
  children: ReactNode;
}) => (
  <section id={id} className={`${toneClass[tone]} py-16 sm:py-24 ${id ? "scroll-mt-24" : ""} ${className}`}>
    <div className={`shell ${narrow ? "max-w-3xl" : ""}`}>{children}</div>
  </section>
);

export const SectionHeading = ({
  title,
  intro,
  dark = false,
  action,
  as: Tag = "h2",
}: {
  title: ReactNode;
  intro?: ReactNode;
  dark?: boolean;
  /** Optional link or button aligned to the right on desktop. */
  action?: ReactNode;
  as?: "h1" | "h2";
}) => (
  <div className="mb-10 flex flex-col gap-4 sm:mb-12 lg:flex-row lg:items-end lg:justify-between">
    <div className="max-w-2xl">
      <Tag
        className={`font-heading text-3xl font-semibold tracking-tight sm:text-4xl ${
          dark ? "text-primary-foreground" : "text-ink"
        }`}
      >
        {title}
      </Tag>
      {intro && (
        <p className={`mt-4 text-[15px] leading-relaxed ${dark ? "text-primary-foreground/70" : "text-ink-2"}`}>
          {intro}
        </p>
      )}
    </div>
    {action && <div className="shrink-0">{action}</div>}
  </div>
);

/** Standard content card. */
export const cardClass = "rounded-[10px] border border-line bg-surface";
export const cardDarkClass = "rounded-[10px] border border-primary-foreground/10 bg-primary-foreground/[0.04]";

/** Standard buttons. Primary = the page's main action; secondary = alternative (usually phone). */
export const btnPrimary =
  "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md bg-electric px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-electric-2";
export const btnSecondary =
  "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md border border-line bg-surface px-6 text-sm font-semibold text-ink transition-colors hover:border-ink-2";
export const btnSecondaryDark =
  "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md border border-primary-foreground/30 px-6 text-sm font-semibold text-primary-foreground transition-colors hover:border-primary-foreground/70";
export const textLink = "font-semibold text-electric hover:underline hover:underline-offset-4";
