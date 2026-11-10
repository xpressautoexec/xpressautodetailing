import type { ReactNode } from "react";
import { Phone } from "lucide-react";
import SEO from "@/components/SEO";
import MobileQuoteBar from "@/components/MobileQuoteBar";
import { NAP, SHOP } from "@/data/copy";
import { TEL_HREF } from "@/components/site/QuoteLink";

/**
 * Paid-ad landing page frame: logo + phone only, no site navigation, noindex,
 * minimal footer, and the sticky mobile quote bar.
 */
const LpShell = ({
  title,
  description,
  canonical,
  quoteLabel,
  children,
}: {
  title: string;
  description: string;
  canonical: string;
  /** Label for the mobile bar's primary button, matching the page's one CTA. */
  quoteLabel?: string;
  children: ReactNode;
}) => (
  <div className="min-h-screen bg-canvas">
    <SEO title={title} description={description} canonical={canonical} noindex />
    <header className="sticky top-0 z-50 border-b border-line bg-surface/95 backdrop-blur">
      <div className="shell flex h-header items-center justify-between">
        <img src="/xpress-logo-dark.png" alt="Xpress Auto & RV Detailing" width={476} height={175} className="h-10 w-auto lg:h-11" />
        <a href={TEL_HREF} className="flex items-center gap-2 text-[15px] font-semibold text-ink hover:text-electric">
          <Phone className="h-4 w-4 text-electric" aria-hidden="true" />
          {NAP.phone}
        </a>
      </div>
    </header>

    <main>{children}</main>

    <footer className="bg-charcoal">
      <div className="shell flex flex-col gap-3 pb-[calc(var(--mobile-bar-h)+1.5rem+env(safe-area-inset-bottom))] pt-8 text-xs text-primary-foreground/60 sm:flex-row sm:items-center sm:justify-between lg:pb-8">
        <p>
          © {new Date().getFullYear()} {NAP.name} · {SHOP.full}
        </p>
        <p className="flex gap-5">
          <a href="/privacy-policy" className="hover:text-primary-foreground">
            Privacy policy
          </a>
          <a href="/terms-of-service" className="hover:text-primary-foreground">
            Terms of service
          </a>
        </p>
      </div>
    </footer>
    <MobileQuoteBar quoteLabel={quoteLabel} />
  </div>
);

export default LpShell;
