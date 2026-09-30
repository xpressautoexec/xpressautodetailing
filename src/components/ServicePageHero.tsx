import { Phone } from "lucide-react";
import { BOOKING_URL, PHONE } from "@/data/pricing";

interface ServicePageHeroProps {
  title: string;
  image: string;
  /** Primary action. "call" suits quoted work (RV, PPF, fleet); "book" suits fixed-price packages. */
  ctaType?: "book" | "call";
  subtitle?: string;
  /** Use "p" when the page already renders its own <h1> further down. */
  titleAs?: "h1" | "p";
}

const telHref = `tel:${PHONE.replace(/-/g, "")}`;

const primary =
  "inline-flex min-h-[52px] items-center justify-center gap-2 rounded-md bg-electric px-7 text-sm font-semibold text-primary-foreground transition-colors hover:bg-electric-2";
const secondary =
  "inline-flex min-h-[52px] items-center justify-center gap-2 rounded-md border border-primary-foreground/30 px-7 text-sm font-semibold text-primary-foreground transition-colors hover:border-primary-foreground/70";

/** Full-bleed photo header shared by service pages. Left-aligned, two actions. */
const ServicePageHero = ({ title, image, ctaType = "book", subtitle, titleAs = "h1" }: ServicePageHeroProps) => {
  const Title = titleAs;
  const call = (
    <a key="call" href={telHref} className={ctaType === "call" ? primary : secondary}>
      <Phone className="h-4 w-4" aria-hidden="true" />
      {ctaType === "call" ? `Call ${PHONE}` : PHONE}
    </a>
  );
  const book = (
    <a
      key="book"
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={ctaType === "book" ? primary : secondary}
    >
      Book online
    </a>
  );

  return (
    <section className="relative isolate overflow-hidden bg-brand-dark">
      <img
        src={image}
        alt=""
        fetchPriority="high"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-dark via-brand-dark/80 to-brand-dark/25"
      />
      <div className="shell py-20 sm:py-28">
        <div className="max-w-[40rem]">
          <Title className="font-heading text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-primary-foreground sm:text-5xl">
            {title}
          </Title>
          {subtitle && (
            <p className="mt-5 max-w-[34rem] text-base leading-relaxed text-primary-foreground/75 sm:text-lg">
              {subtitle}
            </p>
          )}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">{ctaType === "call" ? [call, book] : [book, call]}</div>
        </div>
      </div>
    </section>
  );
};

export default ServicePageHero;
