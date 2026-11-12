import type { ReactNode } from "react";
import { MessageSquareText, Phone } from "lucide-react";
import WalkaroundGuarantee from "@/components/site/WalkaroundGuarantee";
import QuoteForm, { type QuoteNeed, type QuoteVehicle } from "@/components/QuoteForm";
import { SMS_HREF, TEL_HREF } from "@/components/site/QuoteLink";
import { NAP, SHOP } from "@/data/copy";

/**
 * The quote form with its standard left column. Used on service and landing pages
 * (above the FAQ) and on /quote. Keep `id` when replacing an older "#assessment" or "#quote" section.
 */
const QuoteSection = ({
  id = "quote",
  title = "Get a price for your vehicle",
  intro = "Two quick steps. Photos are optional but help us give you an exact price.",
  source,
  defaultVehicle,
  defaultNeed,
  defaultLocation,
  aside,
  as: Tag = "h2",
}: {
  id?: string;
  title?: ReactNode;
  intro?: ReactNode;
  source: string;
  defaultVehicle?: QuoteVehicle;
  defaultNeed?: QuoteNeed;
  defaultLocation?: "mobile" | "shop";
  /** Extra content under the intro (page-specific notes). */
  aside?: ReactNode;
  as?: "h1" | "h2";
}) => (
  <section id={id} className="scroll-mt-24 border-y border-line bg-tint section-y">
    <div className="shell grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
      <div>
        <Tag className="font-heading text-4xl font-extrabold leading-[1.0] tracking-display text-ink sm:text-5xl">{title}</Tag>
        <div className="mt-5 max-w-md text-base leading-relaxed text-ink-2">{intro}</div>
        {aside && <div className="mt-6 max-w-md">{aside}</div>}
        <WalkaroundGuarantee className="mt-8 max-w-md" />
        <dl className="mt-10 space-y-5 text-[15px]">
          <div>
            <dt className="text-sm text-muted-ink">Rather call or text?</dt>
            <dd className="mt-1 flex flex-wrap gap-x-6 gap-y-2">
              <a href={TEL_HREF} className="inline-flex items-center gap-2 font-semibold text-ink hover:text-electric">
                <Phone className="h-4 w-4 text-electric" aria-hidden="true" />
                Call {NAP.phone}
              </a>
              <a href={SMS_HREF} className="inline-flex items-center gap-2 font-semibold text-ink hover:text-electric">
                <MessageSquareText className="h-4 w-4 text-electric" aria-hidden="true" />
                Text us photos
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted-ink">Hours</dt>
            <dd className="mt-1 font-semibold text-ink">{NAP.hours}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted-ink">Airdrie shop</dt>
            <dd className="mt-1 font-semibold text-ink">{SHOP.full}</dd>
          </div>
        </dl>
      </div>
      <QuoteForm source={source} defaultVehicle={defaultVehicle} defaultNeed={defaultNeed} defaultLocation={defaultLocation} />
    </div>
  </section>
);

export default QuoteSection;
