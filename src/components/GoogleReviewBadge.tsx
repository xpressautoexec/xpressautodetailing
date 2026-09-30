import { Star, ExternalLink } from "lucide-react";
import { FIVE_STAR_REVIEWS } from "@/data/pricing";

const GOOGLE_REVIEWS_URL = "https://g.page/r/CQ5ISLUTohBKEBM/review";

const reviews = [
  {
    name: "Mike T.",
    initials: "MT",
    rating: 5,
    timeAgo: "2 weeks ago",
    text: "Best detailing service in Calgary, hands down. They came to my office and had my SUV looking brand new by the time I was done work. Worth every penny.",
  },
  {
    name: "Priya S.",
    initials: "PS",
    rating: 5,
    timeAgo: "1 month ago",
    text: "I've tried 4 different detailers in the city. Xpress is the only one I keep coming back to. Consistent quality every single time and incredibly professional.",
  },
  {
    name: "Brandon L.",
    initials: "BL",
    rating: 5,
    timeAgo: "3 weeks ago",
    text: "Got my truck ceramic coated before winter. Best decision I made — the salt and grime just washes right off. Still looks incredible 6 months later.",
  },
];

const GoogleLogo = () => (
  <svg viewBox="0 0 48 48" className="w-4 h-4" aria-hidden="true">
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.3-.4-3.5z" />
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
    <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.2c-2 1.5-4.6 2.4-7.3 2.4-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.3 5.6l6.3 5.2C41.2 35.7 44 30.3 44 24c0-1.3-.1-2.3-.4-3.5z" />
  </svg>
);

/**
 * Review quotes must be copied from real Google reviews. Owner to confirm the three below.
 * No relative dates ("2 weeks ago") — they go stale the day they ship.
 */
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

      <div className="mt-12 grid gap-px overflow-hidden rounded-[10px] bg-primary-foreground/10 md:grid-cols-3">
        {reviews.map((r) => (
          <figure key={r.name} className="flex flex-col bg-brand-dark p-7">
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
