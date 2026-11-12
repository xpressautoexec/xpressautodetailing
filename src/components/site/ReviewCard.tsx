import { Star } from "lucide-react";
import type { Review } from "@/data/copy";
import GoogleG from "@/components/site/GoogleG";

/** One verbatim Google review: stars + G mark, quote, reviewer name, and vehicle · service. */
const ReviewCard = ({ review, className = "" }: { review: Review; className?: string }) => {
  const initial = review.name.trim().charAt(0).toUpperCase();
  const detail = [review.vehicle, review.service].filter(Boolean).join(" · ");
  return (
    <figure className={`flex flex-col rounded-card border border-line bg-surface p-7 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5" aria-label="5 out of 5 stars">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-current text-electric" aria-hidden="true" />
          ))}
        </div>
        <GoogleG className="h-5 w-5" />
      </div>
      <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink-2">{review.text}</blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-4 text-sm">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-tint font-semibold text-ink" aria-hidden="true">
          {initial}
        </span>
        <span className="min-w-0">
          <span className="block font-semibold text-ink">{review.name}</span>
          <span className="block text-muted-ink">{detail}</span>
        </span>
      </figcaption>
    </figure>
  );
};

export default ReviewCard;
