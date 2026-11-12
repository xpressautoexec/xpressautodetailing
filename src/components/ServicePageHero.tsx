import type { ReactNode } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { BOOKING_URL, PHONE } from "@/data/pricing";
import BookLink from "@/components/site/BookLink";
import QuoteLink, { TEL_HREF } from "@/components/site/QuoteLink";
import NextOpenings from "@/components/site/NextOpenings";

interface ServicePageHeroProps {
  /** Blue uppercase category label above the headline. */
  eyebrow?: ReactNode;
  title: ReactNode;
  image: string;
  /** Describe the photo when it shows a specific job; leave empty for decorative headers. */
  imageAlt?: string;
  /**
   * Kept for older call sites. The primary action is always "Get a quote" now; this only
   * decides whether the online-booking link is offered underneath ("book") or not needed ("call").
   */
  ctaType?: "book" | "call";
  subtitle?: ReactNode;
  /** Use "p" when the page already renders its own <h1> further down. */
  titleAs?: "h1" | "p";
  /** CSS object-position for the photo, e.g. "center 60%". */
  imagePosition?: string;
  /** Label for the secondary booking link. */
  bookLabel?: string;
  /** Override for the phone link (e.g. E.164 for ad landing pages). */
  phoneHref?: string;
  /** Where the secondary booking link goes: a Fieldd service, an on-page anchor or a route. */
  bookHref?: string;
  /** Force where "Get a quote" goes; by default it finds the page's quote form. */
  quoteHref?: string;
  /** Primary button text where the page has its own CTA (fleet "Request a yard walk", RV "Book a free assessment"). */
  quoteLabel?: string;
  /** Optional content under the actions (e.g. a package finder). */
  children?: ReactNode;
  /** "Next openings" strip under the hero (service pages). Hidden when no openings are set. */
  openings?: boolean;
  width?: number;
  height?: number;
}

const primary =
  "inline-flex min-h-[52px] items-center justify-center gap-2 pill-action rounded-full bg-action px-8 text-[15px] font-semibold text-primary-foreground transition-colors hover:bg-ink";
const secondary =
  "inline-flex min-h-[52px] items-center justify-center gap-2 pill-action pill-action rounded-full border-2 border-ink/15 bg-canvas px-7 text-[15px] font-semibold text-ink transition-colors hover:border-ink";

/**
 * Hero shared by every page: white copy column on the left, a real job photo running
 * edge-to-edge on the right, and the van-wrap swoosh along the bottom edge.
 * One primary action (Get a quote), one outlined secondary (Call), booking as a text link.
 */
const ServicePageHero = ({
  eyebrow,
  title,
  image,
  imageAlt = "",
  ctaType = "book",
  subtitle,
  titleAs = "h1",
  imagePosition,
  bookLabel = "Book online",
  phoneHref = TEL_HREF,
  bookHref = BOOKING_URL,
  quoteHref,
  quoteLabel,
  children,
  width,
  height,
  openings = true,
}: ServicePageHeroProps) => {
  const Title = titleAs;
  // Online booking (Fieldd) lives on pricing cards only; in-page links (#packages) still show.
  const showBook = !/fieldd\.co/.test(bookHref);
  void ctaType;

  const long = typeof title === "string" && title.length > 26;

  return (
    <>
      <section className="relative isolate overflow-hidden bg-canvas">
        <div className="flex flex-col lg:grid lg:min-h-[640px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center">
          {/* Shaped photo (LLumar cut): first on phones so the work sells before the scroll. */}
          <div className="relative w-full pl-6 pt-4 lg:order-2 lg:h-full lg:py-12 lg:pl-0">
            <div className="slanted-photo relative aspect-[16/11] w-full bg-tint lg:aspect-auto lg:h-full lg:min-h-[540px]">
              <img
                src={image}
                alt={imageAlt}
                width={width}
                height={height}
                {...{ fetchpriority: "high" }}
                style={imagePosition ? { objectPosition: imagePosition } : undefined}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="hero-copy relative flex flex-col justify-center pb-14 pt-10 sm:pb-20 lg:order-1 lg:py-20 lg:pr-12">
            {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
            <Title className={`llumar-hero-title ${long ? "is-long" : ""}`}>{title}</Title>
            {subtitle && <p className="mt-8 max-w-[34rem] text-lg leading-relaxed text-ink-2">{subtitle}</p>}
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <QuoteLink href={quoteHref} className={primary}>
                {quoteLabel}
              </QuoteLink>
              <a href={phoneHref} className={secondary}>
                <Phone className="h-4 w-4 text-action" aria-hidden="true" />
                Call {PHONE}
              </a>
            </div>
            {showBook && (
              <BookLink
                href={bookHref}
                className="mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-ink-2 underline decoration-line decoration-2 underline-offset-[6px] transition-colors hover:text-action hover:decoration-electric"
              >
                {bookLabel}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </BookLink>
            )}
            {children && <div className="mt-10">{children}</div>}
          </div>
        </div>
      </section>
      {openings && <NextOpenings />}
    </>
  );
};

export default ServicePageHero;
