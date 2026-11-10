import type { ReactNode } from "react";
import { Check, ExternalLink, Star } from "lucide-react";
import Swoosh from "@/components/site/Swoosh";
import WalkaroundGuarantee from "@/components/site/WalkaroundGuarantee";
import { REAL_REVIEWS, GOOGLE_REVIEWS_URL } from "@/data/copy";
import { FIVE_STAR_REVIEWS } from "@/data/pricing";

export const lpCta =
  "inline-flex min-h-[54px] items-center justify-center rounded-md bg-electric px-8 text-base font-semibold text-primary-foreground transition-colors hover:bg-electric-2";

/**
 * LP hero: the ad's promise, three proof points, a real photo, and the form beside it.
 * Phones: copy, then the form, then the photo. Only the hero photo loads eagerly.
 */
export const LpHero = ({
  eyebrow,
  title,
  sub,
  points,
  image,
  form,
}: {
  eyebrow: string;
  title: ReactNode;
  sub: ReactNode;
  points: string[];
  image: { small: string; large: string; alt: string };
  form: ReactNode;
}) => (
  <section className="relative isolate overflow-hidden bg-surface">
    <div className="shell grid gap-8 pb-20 pt-8 sm:pb-28 sm:pt-12 lg:grid-cols-[1fr_minmax(0,30rem)] lg:gap-14 lg:pb-32 lg:pt-14">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 font-heading text-[2.6rem] font-extrabold leading-[0.96] tracking-display text-ink sm:text-6xl lg:text-[4.1rem]">
          {title}
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-2 sm:text-lg">{sub}</p>
        <ul className="mt-6 grid gap-2.5">
          {points.map((p) => (
            <li key={p} className="flex items-start gap-2.5 text-[15px] font-medium text-ink">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-electric" aria-hidden="true" />
              {p}
            </li>
          ))}
        </ul>
      </div>
      <div
        id="quote"
        className="scroll-mt-24 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start"
      >
        {form}
      </div>
      <img
        src={image.large}
        srcSet={`${image.small} 640w, ${image.large} 1050w`}
        sizes="(min-width: 1024px) 55vw, 100vw"
        alt={image.alt}
        width={1050}
        height={787}
        {...{ fetchpriority: "high" }}
        className="aspect-[4/3] w-full rounded-card bg-tint object-cover lg:col-start-1 lg:row-start-2"
      />
    </div>
    <Swoosh variant="hero-edge" />
  </section>
);

/** Proof strip. Allowed claims only; never a star average. */
export const LpProof = ({ items }: { items: { strong: string; rest: string }[] }) => (
  <div className="border-b border-line bg-surface">
    <ul className="shell grid grid-cols-2 lg:grid-cols-4">
      {items.map((p, i) => (
        <li
          key={p.rest}
          className={`py-6 ${i % 2 === 1 ? "border-l border-line pl-5 sm:pl-8" : ""} ${i >= 2 ? "border-t border-line lg:border-t-0" : ""} ${
            i === 2 ? "lg:border-l lg:pl-8" : ""
          }`}
        >
          <span className="num block text-3xl leading-none text-electric">{p.strong}</span>
          <span className="mt-1.5 block text-sm text-muted-ink">{p.rest}</span>
        </li>
      ))}
    </ul>
  </div>
);

export const LpHeading = ({ eyebrow, title, intro }: { eyebrow?: string; title: ReactNode; intro?: ReactNode }) => (
  <div className="mb-10 max-w-2xl sm:mb-12">
    {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
    <h2 className="font-heading text-4xl font-extrabold leading-[1.0] tracking-display text-ink sm:text-5xl">{title}</h2>
    {intro && <p className="mt-5 text-base leading-relaxed text-ink-2">{intro}</p>}
  </div>
);

/** Three real Google reviews + the guarantee. */
export const LpTrust = () => (
  <section className="section-y border-t border-line bg-tint" aria-labelledby="lp-reviews">
    <div className="shell">
      <div className="mb-10 flex flex-col gap-5 sm:mb-12 lg:flex-row lg:items-end lg:justify-between">
        <h2 id="lp-reviews" className="font-heading text-4xl font-extrabold leading-[1.0] tracking-display text-ink sm:text-5xl">
          {FIVE_STAR_REVIEWS} five-star Google reviews
        </h2>
        <a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-2 hover:text-electric"
        >
          Read them on Google
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {REAL_REVIEWS.slice(0, 3).map((r) => (
          <figure key={r.text} className="flex flex-col rounded-card border border-line bg-surface p-6">
            <div className="flex gap-0.5" aria-label="5 out of 5 stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current text-electric" aria-hidden="true" />
              ))}
            </div>
            <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink-2">{r.text}</blockquote>
            <figcaption className="mt-5 border-t border-line pt-4 text-sm font-semibold text-ink">{r.name}</figcaption>
          </figure>
        ))}
      </div>
      <WalkaroundGuarantee variant="card" className="mt-6" />
    </div>
  </section>
);

/** Closing band: one action, back to the form at the top. */
export const LpClose = ({ title, body, cta }: { title: string; body: string; cta: string }) => (
  <section className="bg-charcoal section-y">
    <div className="shell flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <h2 className="font-heading text-4xl font-extrabold leading-[1.02] tracking-display text-primary-foreground sm:text-5xl">{title}</h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-primary-foreground/70">{body}</p>
      </div>
      <a href="#quote" className={lpCta}>
        {cta}
      </a>
    </div>
  </section>
);
