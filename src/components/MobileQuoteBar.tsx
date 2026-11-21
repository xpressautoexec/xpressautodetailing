import { createPortal } from "react-dom";
import { useLocation } from "react-router-dom";
import { Phone } from "lucide-react";
import QuoteLink, { TEL_HREF } from "@/components/site/QuoteLink";
import { useHydrated } from "@/hooks/use-hydrated";

/**
 * The one mobile call-to-action: locked to the bottom of every page on phones.
 * Portaled to <body> so page-transition transforms on ancestors can never move it,
 * and it stays put while scrolling (body padding keeps content clear of it).
 */
const MobileQuoteBar = ({ quoteLabel }: { quoteLabel?: string }) => {
  const hydrated = useHydrated();
  const { pathname } = useLocation();
  if (!hydrated) return null;

  const pill = "flex min-h-[48px] flex-1 items-center justify-center gap-1.5 rounded-full text-[13px] font-bold uppercase tracking-[0.04em] transition-colors";

  // Keep the theme scope (tokens and .contact-bar colours live under these classes).
  return createPortal(
    <div className={`${pathname.startsWith("/lp/") ? "legacy-lp" : "main-site"} bar-scope`}>
    <div
      role="region"
      aria-label="Quick contact"
      className="contact-bar fixed inset-x-0 bottom-0 z-40 px-3 pt-3 lg:hidden pb-[calc(0.75rem+env(safe-area-inset-bottom))]"
    >
      <div className="flex items-center gap-2">
        <QuoteLink className={`${pill} bg-primary-foreground text-action hover:bg-primary-foreground/90`}>{quoteLabel}</QuoteLink>
        <a href={TEL_HREF} className={`${pill} border-2 border-primary-foreground/80 text-primary-foreground hover:bg-primary-foreground/10`}>
          <Phone className="h-4 w-4" aria-hidden="true" />
          Call
        </a>
      </div>
    </div>
    </div>,
    document.body,
  );
};

export default MobileQuoteBar;
