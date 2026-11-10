import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import QuoteLink from "@/components/site/QuoteLink";
import { CTA } from "@/data/brand";

/**
 * The one package card format sitewide:
 * name · who it's for · what's included · time · "From $" · Get a quote. One tier per set is "Most chosen".
 */
const PackageCard = ({
  name,
  forWho,
  includes,
  time,
  price,
  priceNote,
  mostChosen,
  visual,
  footer,
  warrantyLink,
  onSelect,
  selected,
}: {
  name: ReactNode;
  forWho: string;
  includes: string[];
  time?: string;
  /** Already formatted, e.g. "From $1,899". */
  price: string;
  priceNote?: string;
  mostChosen?: boolean;
  visual?: ReactNode;
  footer?: ReactNode;
  /** Adds the "Warranty & Care" link (coating and film cards). */
  warrantyLink?: boolean;
  onSelect?: () => void;
  selected?: boolean;
}) => (
  <article
    onClick={onSelect}
    className={`relative flex h-full flex-col rounded-card border bg-surface transition-colors ${
      mostChosen || selected ? "border-electric" : "border-line"
    } ${onSelect ? "cursor-pointer hover:border-ink-2" : ""}`}
  >
    {mostChosen && (
      <span className="absolute -top-3 left-6 rounded-sm bg-electric px-2 py-1 text-[11px] font-semibold uppercase tracking-label text-primary-foreground">
        Most chosen
      </span>
    )}
    {visual}
    <div className="flex flex-1 flex-col p-6 sm:p-7">
      <h3 className="font-heading text-2xl font-bold leading-tight text-ink">{name}</h3>
      <p className="mt-1.5 text-sm leading-snug text-ink-2">{forWho}</p>
      <ul className="mt-5 flex-1 space-y-2 border-t border-line pt-5 text-[15px] text-ink-2">
        {includes.map((i) => (
          <li key={i} className="flex gap-2.5">
            <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-electric" aria-hidden="true" />
            <span>{i}</span>
          </li>
        ))}
      </ul>
      {footer}
      <div className="mt-6 flex items-end justify-between gap-4 border-t border-line pt-5">
        <div>
          <p className="num text-3xl leading-none text-ink">{price}</p>
          {priceNote && <p className="mt-1 text-xs text-muted-ink">{priceNote}</p>}
        </div>
        {time && <p className="text-right text-xs text-muted-ink">Time on vehicle<br /><span className="font-semibold text-ink">{time}</span></p>}
      </div>
      <QuoteLink className="mt-5 inline-flex min-h-[48px] items-center justify-center rounded-md bg-electric px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-electric-2">
        {CTA.quote}
      </QuoteLink>
      {warrantyLink && (
        <Link to="/warranty" className="mt-3 text-center text-xs font-semibold text-ink-2 underline decoration-line underline-offset-4 hover:text-electric">
          Warranty &amp; Care
        </Link>
      )}
    </div>
  </article>
);

export default PackageCard;
