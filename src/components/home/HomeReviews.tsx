import { ExternalLink } from "lucide-react";
import ReviewCard from "@/components/site/ReviewCard";
import GoogleG from "@/components/site/GoogleG";
import { REAL_REVIEWS, GOOGLE_REVIEWS_URL } from "@/data/copy";
import { FIVE_STAR_REVIEWS } from "@/data/pricing";

/** Three real Google reviews, word for word, then the way to the rest. No star average. */
const HomeReviews = () => (
  <section className="section-y bg-surface" aria-labelledby="reviews-title">
    <div className="shell">
      <p className="eyebrow mb-3">Proof</p>
      <h2 id="reviews-title" className="font-heading text-4xl font-extrabold leading-[1.0] tracking-display text-ink sm:text-6xl">
        {FIVE_STAR_REVIEWS} five-star Google reviews.
      </h2>
      <div className="mt-10 grid gap-4 md:grid-cols-3 sm:mt-14">
        {REAL_REVIEWS.slice(0, 3).map((r) => (
          <ReviewCard key={r.name} review={r} />
        ))}
      </div>
      <a
        href={GOOGLE_REVIEWS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex min-h-[48px] items-center gap-2 rounded-md border border-ink/20 px-6 text-sm font-semibold text-ink transition-colors hover:border-ink"
      >
        <GoogleG className="h-4 w-4" />
        Read {FIVE_STAR_REVIEWS} on Google
        <ExternalLink className="h-4 w-4" aria-hidden="true" />
      </a>
    </div>
  </section>
);

export default HomeReviews;
