import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MessageSquareText, Phone } from "lucide-react";
import QuoteLink, { SMS_HREF, TEL_HREF } from "@/components/site/QuoteLink";

/**
 * The one mobile call-to-action: pinned to the bottom of every page on phones.
 * [Text photos] [Call] [Get a quote]. It steps out of the way while a quote form is on screen.
 */
const MobileQuoteBar = ({ quoteLabel }: { quoteLabel?: string }) => {
  const { pathname } = useLocation();
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
        setFormVisible(visible.size > 0);
      },
      { threshold: 0.15 },
    );
    const watched = new Set<Element>();
    const watch = () =>
      document.querySelectorAll("[data-quote-form]").forEach((el) => {
        if (!watched.has(el)) {
          watched.add(el);
          io.observe(el);
        }
      });
    watch();
    // Forms in lazy sections (and the success state that replaces them) mount later.
    const mo = new MutationObserver(watch);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
      setFormVisible(false);
    };
  }, [pathname]);

  const item =
    "flex min-h-[48px] flex-1 items-center justify-center gap-1.5 rounded-md text-[13px] font-semibold transition-colors";

  return (
    <div
      role="region"
      aria-label="Quick contact"
      aria-hidden={formVisible || undefined}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 px-3 pt-2.5 backdrop-blur transition-transform duration-200 lg:hidden pb-[calc(0.625rem+env(safe-area-inset-bottom))] ${
        formVisible ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="flex items-center gap-2">
        <a
          href={SMS_HREF}
          tabIndex={formVisible ? -1 : undefined}
          className={`${item} border border-ink/20 text-ink hover:border-ink`}
        >
          <MessageSquareText className="h-4 w-4" aria-hidden="true" />
          Text us photos
        </a>
        <a
          href={TEL_HREF}
          tabIndex={formVisible ? -1 : undefined}
          aria-label="Call Xpress Auto & RV Detailing"
          className={`${item} max-w-[5.5rem] border border-ink/20 text-ink hover:border-ink`}
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          Call
        </a>
        <QuoteLink className={`${item} bg-electric text-primary-foreground hover:bg-electric-2`}>{quoteLabel}</QuoteLink>
      </div>
    </div>
  );
};

export default MobileQuoteBar;
