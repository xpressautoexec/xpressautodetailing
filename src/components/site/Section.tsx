import type { ReactNode } from "react";

/**
 * Site layout primitives. Every page section should be built from these so spacing,
 * alignment, type and colour stay identical across the site.
 *
 *   <Section tone="surface">
 *     <SectionHeading title="..." intro="..." />
 *     ...
 *   </Section>
 *
 * Tones follow the van wrap: white is the default, off-white alternates, and charcoal
 * is the high-contrast "lower panel" band, used once (twice at most) per page.
 */

type Tone = "canvas" | "surface" | "dark";

const toneClass: Record<Tone, string> = {
  canvas: "bg-canvas",
  surface: "border-y border-line bg-tint",
  dark: "bg-charcoal",
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
  <section id={id} className={`${toneClass[tone]} section-y ${id ? "scroll-mt-24" : ""} ${className}`}>
    <div className={`shell ${narrow ? "max-w-3xl" : ""}`}>{children}</div>
  </section>
);

export const SectionHeading = ({
  title,
  intro,
  dark = false,
  action,
  eyebrow,
  as: Tag = "h2",
}: {
  title: ReactNode;
  intro?: ReactNode;
  dark?: boolean;
  /** Optional link or button aligned to the right on desktop. */
  action?: ReactNode;
  /** Short italic uppercase label above the title. */
  eyebrow?: ReactNode;
  as?: "h1" | "h2";
}) => (
  <div className="mb-10 flex flex-col gap-4 sm:mb-14 lg:flex-row lg:items-end lg:justify-between">
    <div className="max-w-2xl">
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <Tag
        className={`font-heading text-4xl font-bold leading-[1.02] tracking-display sm:text-5xl ${
          dark ? "text-primary-foreground" : "text-ink"
        }`}
      >
        {title}
      </Tag>
      {intro && (
        <p className={`mt-5 text-base leading-relaxed ${dark ? "text-primary-foreground/70" : "text-ink-2"}`}>
          {intro}
        </p>
      )}
    </div>
    {action && <div className="shrink-0">{action}</div>}
  </div>
);

/** Standard content card: squared-off, hairline border, no shadow. */
export const cardClass = "rounded-card border border-line bg-surface";
export const cardDarkClass = "rounded-card border border-primary-foreground/10 bg-charcoal-2";

/**
 * Buttons. One primary per section ("Get a quote", blue). Secondary actions (text, call,
 * book online) are outlined so the primary is never in doubt.
 */
export const btnPrimary =
  "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md bg-electric px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-electric-2";
export const btnSecondary =
  "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md border border-ink/20 bg-surface px-6 text-sm font-semibold text-ink transition-colors hover:border-ink";
export const btnSecondaryDark =
  "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md border border-primary-foreground/30 px-6 text-sm font-semibold text-primary-foreground transition-colors hover:border-primary-foreground/70";
export const textLink = "font-semibold text-electric hover:underline hover:underline-offset-4";
