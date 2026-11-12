import { ArrowRight, MessageSquareText, Phone } from "lucide-react";
import { BOOKING_URL } from "@/data/pricing";
import { NAP, SERVICE_AREA_SENTENCE } from "@/data/copy";
import { btnPrimary, btnSecondaryDark } from "@/components/site/Section";
import BookLink from "@/components/site/BookLink";
import QuoteLink, { SMS_HREF } from "@/components/site/QuoteLink";

/**
 * The one closing band at the bottom of every page: the charcoal "lower panel" of the van.
 * One primary action (Get a quote), Call outlined, texting photos and online booking as text links.
 *
 * "book"  = fixed-price work: online booking is offered as the secondary link.
 * "quote" = quoted work (RV, PPF, fleet, marine): "Get a quote" goes to `quoteHref`.
 */
const ClosingCTA = ({
  title = "Book your detail",
  body,
  mode = "book",
  quoteHref,
  quoteLabel,
  bookLabel = "Book online",
  phoneHref = NAP.phoneHref,
  bookHref = BOOKING_URL,
  primaryLabel,
}: {
  title?: string;
  body?: string;
  mode?: "book" | "quote";
  quoteHref?: string;
  /** Label for `quoteHref` when it points somewhere other than a quote form (e.g. "See the plans"). */
  quoteLabel?: string;
  bookLabel?: string;
  phoneHref?: string;
  /** Where the booking link points: this page's Fieldd service, an on-page anchor or a route. */
  bookHref?: string;
  /** Primary button text (default "Get a quote"); fleet and RV pages use their own CTA. */
  primaryLabel?: string;
}) => {
  // A quote form anchor becomes the primary target; any other destination is offered as a link.
  const quoteIsForm = !!quoteHref && /^#(assessment|quote)$/.test(quoteHref);
  // Online booking (Fieldd) lives on pricing cards and the quote confirmation only.
  const link =
    mode === "book"
      ? /fieldd\.co/.test(bookHref)
        ? null
        : { href: bookHref, label: bookLabel }
      : quoteHref && !quoteIsForm && quoteLabel
        ? { href: quoteHref, label: quoteLabel }
        : null;
  return (
  <section className="bg-charcoal section-y">
    <div className="shell flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <h2 className="font-heading text-4xl font-extrabold leading-[1.02] tracking-display text-primary-foreground sm:text-5xl">
          {title}
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-primary-foreground/70">
          {body ?? `We come to you anywhere in ${SERVICE_AREA_SENTENCE}.`}
        </p>
        <a
          href={SMS_HREF}
          className="mt-5 mr-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-foreground/70 underline decoration-primary-foreground/25 decoration-2 underline-offset-[6px] hover:text-primary-foreground"
        >
          <MessageSquareText className="h-3.5 w-3.5" aria-hidden="true" />
          Or text us photos
        </a>
        {link && (
          <BookLink
            href={link.href}
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-foreground/80 underline decoration-primary-foreground/25 decoration-2 underline-offset-[6px] hover:text-primary-foreground hover:decoration-electric"
          >
            {link.label}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </BookLink>
        )}
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <QuoteLink href={quoteIsForm ? quoteHref : undefined} className={`${btnPrimary} min-h-[52px] px-7`}>
          {primaryLabel}
        </QuoteLink>
        <a href={phoneHref} className={`${btnSecondaryDark} min-h-[52px]`}>
          <Phone className="h-4 w-4" aria-hidden="true" />
          Call {NAP.phone}
        </a>
      </div>
    </div>
  </section>
  );
};

export default ClosingCTA;
