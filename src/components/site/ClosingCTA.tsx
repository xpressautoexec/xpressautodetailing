import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import { BOOKING_URL } from "@/data/pricing";
import { NAP, SERVICE_AREA_SENTENCE } from "@/data/copy";
import { btnPrimary, btnSecondaryDark } from "@/components/site/Section";

/**
 * The one closing band used at the bottom of every service page.
 * "book"  = fixed-price work, primary action opens online booking.
 * "quote" = quoted work (RV, PPF, fleet, marine), primary action goes to an assessment/quote target.
 */
const ClosingCTA = ({
  title = "Book your detail",
  body,
  mode = "book",
  quoteHref = "/contact",
  quoteLabel = "Book a free assessment",
}: {
  title?: string;
  body?: string;
  mode?: "book" | "quote";
  quoteHref?: string;
  quoteLabel?: string;
}) => {
  const primary =
    mode === "book" ? (
      <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
        Book a detail
      </a>
    ) : quoteHref.startsWith("#") ? (
      <a href={quoteHref} className={btnPrimary}>
        {quoteLabel}
      </a>
    ) : (
      <Link to={quoteHref} className={btnPrimary}>
        {quoteLabel}
      </Link>
    );

  return (
    <section className="bg-brand-dark py-16 sm:py-20">
      <div className="shell flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-primary-foreground sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-primary-foreground/70">
            {body ?? `We come to you anywhere in ${SERVICE_AREA_SENTENCE}.`}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          {primary}
          <a href={NAP.phoneHref} className={btnSecondaryDark}>
            <Phone className="h-4 w-4" aria-hidden="true" />
            {NAP.phone}
          </a>
        </div>
      </div>
    </section>
  );
};

export default ClosingCTA;
