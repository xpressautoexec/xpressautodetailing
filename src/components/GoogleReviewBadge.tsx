import { Star, ExternalLink } from "lucide-react";
import { FIVE_STAR_REVIEWS } from "@/data/pricing";
import { REAL_REVIEWS, GOOGLE_REVIEWS_URL } from "@/data/copy";
import GoogleG from "@/components/site/GoogleG";

const reviews = REAL_REVIEWS;

const GoogleLogo = () => <GoogleG className="h-4 w-4" />;

/** Verbatim Google reviews from REAL_REVIEWS. No relative dates — they go stale. */
const GoogleReviewBadge = () => (
  <section className="bg-brand-dark py-16 sm:py-24">
    <div className="shell">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex gap-1" aria-hidden="true">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-current text-primary-foreground" />
            ))}
          </div>
          <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-primary-foreground sm:text-4xl">
            {FIVE_STAR_REVIEWS} five-star Google reviews
          </h2>
        </div>
        <a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary-foreground/80 hover:text-primary-foreground"
        >
          <GoogleLogo />
          Read them on Google
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>

      <div className="mt-12 grid gap-px overflow-hidden rounded-card bg-primary-foreground/10 md:grid-cols-3">
        {reviews.map((r) => (
          <figure key={r.text} className="flex flex-col bg-brand-dark p-7">
            <blockquote className="flex-1 text-[15px] leading-relaxed text-primary-foreground/85">
              {r.text}
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-2 text-sm font-semibold text-primary-foreground">
              {r.name}
              <GoogleLogo />
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);

export default GoogleReviewBadge;
